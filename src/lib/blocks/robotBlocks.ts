import * as Blockly from "blockly";
import { GamepadButtons, GamepadAxes } from "../hardware/gamepad";

export function registerRobotBlocks() {
  Blockly.Blocks["harmonia_drive"] = {
    init: function () {
      this.appendValueInput("LEFT")
        .setCheck("Number")
        .appendField("Drive Robot   Left Speed:");
      this.appendValueInput("RIGHT")
        .setCheck("Number")
        .appendField("Right Speed:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Drives the robot using differential power (-100 to 100).");
    },
  };

  Blockly.Blocks["harmonia_sleep"] = {
    init: function () {
      this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("Wait for");
      this.appendDummyInput()
        .appendField("seconds");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Pauses the execution for the specified number of seconds.");
    },
  };

  const buttonOptions = Object.keys(GamepadButtons).map((btn) => [btn, btn]) as [string, string][];
  Blockly.Blocks["gamepad_get_button"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Gamepad Button")
        .appendField(new Blockly.FieldDropdown(buttonOptions), "BUTTON");
      this.setOutput(true, "Boolean");
      this.setColour(160);
      this.setTooltip("Reads the state of a gamepad button (True if pressed).");
    },
  };

  const axisOptions = Object.keys(GamepadAxes).map((axis) => [axis, axis]) as [string, string][];
  Blockly.Blocks["gamepad_get_axis"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Gamepad Axis")
        .appendField(new Blockly.FieldDropdown(axisOptions), "AXIS");
      this.setOutput(true, "Number");
      this.setColour(160);
      this.setTooltip("Reads the value of a gamepad axis (-1.0 to 1.0).");
    },
  };
}
