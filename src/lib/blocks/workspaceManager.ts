import * as Blockly from "blockly";
import { registerRobotBlocks } from "./robotBlocks";
import { registerLegoBlocks } from "./legoBlocks";
import { registerRobotGenerators } from "./robotGenerators";
import { registerLegoGenerators } from "./legoGenerators";
import { KeyboardNavigation } from "@blockly/keyboard-navigation";

// Register keyboard navigation styles and deferring toolbox once at module level
if (typeof window !== "undefined" && !(window as any).__keyboard_nav_registered) {
  try {
    KeyboardNavigation.registerKeyboardNavigationStyles();
    KeyboardNavigation.registerNavigationDeferringToolbox();
    (window as any).__keyboard_nav_registered = true;
  } catch (err) {
    console.error("Failed to register KeyboardNavigation globals:", err);
  }
}

export const WORKSPACE_CONFIG: any = {
  toolbox: {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "%{BKY_LOGIC_HUE}",
        contents: [
          { kind: "block", type: "controls_if" },
          { kind: "block", type: "logic_compare" },
          { kind: "block", type: "logic_operation" },
          { kind: "block", type: "logic_negate" },
          { kind: "block", type: "logic_boolean" },
        ],
      },
      {
        kind: "category",
        name: "Loops",
        colour: "%{BKY_LOOPS_HUE}",
        contents: [
          { kind: "block", type: "controls_repeat_ext", inputs: { TIMES: { kind: "shadow", type: "math_number", fields: { NUM: 10 } } } },
          { kind: "block", type: "controls_whileUntil" },
          { kind: "block", type: "controls_for", inputs: { FROM: { kind: "shadow", type: "math_number", fields: { NUM: 1 } }, TO: { kind: "shadow", type: "math_number", fields: { NUM: 10 } }, BY: { kind: "shadow", type: "math_number", fields: { NUM: 1 } } } },
          { kind: "block", type: "controls_forEach" },
          { kind: "block", type: "controls_flow_statements" },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "%{BKY_MATH_HUE}",
        contents: [
          { kind: "block", type: "math_number" },
          { kind: "block", type: "math_arithmetic" },
          { kind: "block", type: "math_single" },
          { kind: "block", type: "math_trig" },
          { kind: "block", type: "math_constant" },
          { kind: "block", type: "math_number_property" },
          { kind: "block", type: "math_round" },
          { kind: "block", type: "math_on_list" },
          { kind: "block", type: "math_modulo" },
          { kind: "block", type: "math_constrain", inputs: { LOW: { kind: "shadow", type: "math_number", fields: { NUM: 1 } }, HIGH: { kind: "shadow", type: "math_number", fields: { NUM: 100 } } } },
          { kind: "block", type: "math_random_int", inputs: { FROM: { kind: "shadow", type: "math_number", fields: { NUM: 1 } }, TO: { kind: "shadow", type: "math_number", fields: { NUM: 100 } } } },
          { kind: "block", type: "math_random_float" },
        ],
      },
      {
        kind: "category",
        name: "Robot",
        colour: "230",
        contents: [
          { kind: "block", type: "harmonia_drive" },
          { kind: "block", type: "harmonia_sleep" },
          { kind: "block", type: "gamepad_get_button" },
          { kind: "block", type: "gamepad_get_axis" },
        ],
      },
      {
        kind: "category",
        name: "Lego",
        colour: "230",
        contents: [
          { kind: "block", type: "lego_motor_run_target" },
          { kind: "block", type: "lego_motor_run_stalled" },
          { kind: "block", type: "lego_color_sensor" },
        ],
      },
      { kind: "sep" },
      { kind: "category", name: "Variables", colour: "%{BKY_VARIABLES_HUE}", custom: "VARIABLE" },
      { kind: "category", name: "Functions", colour: "%{BKY_PROCEDURES_HUE}", custom: "PROCEDURE" },
    ],
  },
  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
  move: {
    scrollbars: {
      horizontal: true,
      vertical: true,
    },
    drag: true,
    wheel: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  trashcan: true,
  renderer: "geras",
};

export function initializeWorkspace(container: HTMLElement): Blockly.WorkspaceSvg {
  // Register custom blocks and generators
  registerRobotBlocks();
  registerRobotGenerators();
  registerLegoBlocks();
  registerLegoGenerators();

  const workspace = Blockly.inject(container, WORKSPACE_CONFIG);
  
  try {
    // Enable keyboard navigation for the workspace
    new KeyboardNavigation(workspace);
  } catch (err) {
    console.error("Failed to initialize KeyboardNavigation:", err);
  }
  
  // Register ARIA live announcer for screen readers
  workspace.addChangeListener((event) => {
    if (event.type === Blockly.Events.BLOCK_CREATE) {
      announce("New block created.");
    } else if (event.type === Blockly.Events.BLOCK_DELETE) {
      announce("Block deleted.");
    } else if (event.type === Blockly.Events.BLOCK_MOVE) {
      const moveEvent = event as any; // Cast for simplicity in this version
      if (moveEvent.newParentId) {
        announce("Blocks connected.");
      }
    }
  });

  // Force a resize initially
  Blockly.svgResize(workspace);

  return workspace;
}

function announce(message: string) {
  let announcer = document.getElementById("a11y-announcer");
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.id = "a11y-announcer";
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    document.body.appendChild(announcer);
  }
  announcer.textContent = "";
  setTimeout(() => {
    if (announcer) announcer.textContent = message;
  }, 100);
}
