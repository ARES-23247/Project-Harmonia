import * as Blockly from "blockly";

export function registerLegoBlocks() {
  Blockly.Blocks["lego_motor_run_target"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Motor on Port")
        .appendField(new Blockly.FieldDropdown([
          ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
        ]), "PORT");
      this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("Run at speed");
      this.appendValueInput("TARGET")
        .setCheck("Number")
        .appendField("to target angle");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Runs a Pybricks motor to a specific target angle.");
    },
  };

  Blockly.Blocks["lego_motor_run_stalled"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Motor on Port")
        .appendField(new Blockly.FieldDropdown([
          ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
        ]), "PORT");
      this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("Run until stalled at speed");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Runs a Pybricks motor until it stalls against an obstacle.");
    },
  };

  Blockly.Blocks["lego_color_sensor"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Read Color Sensor on Port")
        .appendField(new Blockly.FieldDropdown([
          ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
        ]), "PORT");
      this.setOutput(true, "String"); // Returns color name
      this.setColour(160);
      this.setTooltip("Reads the detected color from a Pybricks Color Sensor.");
    },
  };
}
