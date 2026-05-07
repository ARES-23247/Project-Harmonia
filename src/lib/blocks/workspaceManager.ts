import * as Blockly from "blockly";
import { registerRobotBlocks } from "./robotBlocks";
import { registerLegoBlocks } from "./legoBlocks";
import { registerRobotGenerators } from "./robotGenerators";
import { registerLegoGenerators } from "./legoGenerators";

export const WORKSPACE_CONFIG: Blockly.BlocklyOptions = {
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
  
  // Force a resize initially
  Blockly.svgResize(workspace);

  return workspace;
}
