import * as Blockly from "blockly";
import { registerRobotBlocks } from "./robotBlocks";
import { registerLegoBlocks } from "./legoBlocks";
import { registerRobotGenerators } from "./robotGenerators";
import { registerLegoGenerators } from "./legoGenerators";
import { registerXrpBlocks } from "./xrpBlocks";
import { registerXrpGenerators } from "./xrpGenerators";
import { registerUniversalBlocks } from "./universalBlocks";
import { registerUniversalGenerators } from "./universalGenerators";
import { pythonGenerator } from "blockly/python";
import { KeyboardNavigation } from "@blockly/keyboard-navigation";

import Theme from "@blockly/theme-dark";

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
  theme: Theme,
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
        name: "Drivetrain",
        colour: "230",
        contents: [
          { kind: "block", type: "robot_drive_straight", inputs: { DIST: { kind: "shadow", type: "math_number", fields: { NUM: 10 } }, SPEED: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } } } },
          { kind: "block", type: "robot_drive_turn", inputs: { ANGLE: { kind: "shadow", type: "math_number", fields: { NUM: 90 } }, SPEED: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } } } },
          { kind: "block", type: "robot_drive_arcade", inputs: { STRAIGHT: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } }, TURN: { kind: "shadow", type: "math_number", fields: { NUM: 0 } } } },
          { kind: "block", type: "robot_stop" },
        ],
      },
      {
        kind: "category",
        name: "Motors",
        colour: "190",
        contents: [
          { kind: "block", type: "robot_motor_set_speed", inputs: { SPEED: { kind: "shadow", type: "math_number", fields: { NUM: 50 } } } },
          { kind: "block", type: "robot_motor_get_position" },
          { kind: "block", type: "robot_motor_reset" },
        ],
      },
      {
        kind: "category",
        name: "Sensors",
        colour: "65",
        contents: [
          { kind: "block", type: "robot_get_distance" },
          { kind: "block", type: "robot_get_reflectance" },
          { kind: "block", type: "robot_get_yaw" },
        ],
      },
      {
        kind: "category",
        name: "XRP Features",
        colour: "120",
        contents: [
          { kind: "block", type: "xrp_straight_effort", inputs: { dist: { kind: "shadow", type: "math_number", fields: { NUM: 10 } }, effort: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } } } },
          { kind: "block", type: "xrp_turn_effort", inputs: { degrees: { kind: "shadow", type: "math_number", fields: { NUM: 90 } }, effort: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } } } },
          { kind: "block", type: "xrp_arcade", inputs: { STRAIGHT: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } }, TURN: { kind: "shadow", type: "math_number", fields: { NUM: 0 } } } },
          { kind: "block", type: "xrp_motor_effort", inputs: { effort: { kind: "shadow", type: "math_number", fields: { NUM: 0.5 } } } },
          { kind: "block", type: "xrp_servo_deg", inputs: { degrees: { kind: "shadow", type: "math_number", fields: { NUM: 90 } } } },
          { kind: "sep" },
          { kind: "block", type: "xrp_led_on" },
          { kind: "block", type: "xrp_led_off" },
          { kind: "block", type: "xrp_button_pressed" },
        ],
      },
      {
        kind: "category",
        name: "Lego Features",
        colour: "20",
        contents: [
          { kind: "block", type: "lego_motor_run_target", inputs: { SPEED: { kind: "shadow", type: "math_number", fields: { NUM: 500 } }, TARGET: { kind: "shadow", type: "math_number", fields: { NUM: 90 } } } },
          { kind: "block", type: "lego_motor_run_stalled", inputs: { SPEED: { kind: "shadow", type: "math_number", fields: { NUM: 500 } } } },
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
    colour: "#444",
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
  registerRobotGenerators(pythonGenerator);
  registerLegoBlocks();
  registerLegoGenerators(pythonGenerator);
  registerXrpBlocks();
  registerXrpGenerators(pythonGenerator);
  registerUniversalBlocks();
  registerUniversalGenerators(pythonGenerator);

  const workspace = Blockly.inject(container, WORKSPACE_CONFIG);
  
/*
  try {
    // Enable keyboard navigation for the workspace
    new KeyboardNavigation(workspace);
  } catch (err) {
    console.error("Failed to initialize KeyboardNavigation:", err);
  }
*/
  
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
