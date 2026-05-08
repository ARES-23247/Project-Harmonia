import * as Blockly from "blockly";

export function registerUniversalBlocks() {
  // --- Drivetrain (Universal) ---
  Blockly.Blocks["robot_drive_straight"] = {
    init: function () {
      this.appendValueInput("DIST")
        .setCheck("Number")
        .appendField("Drive Straight:");
      this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("at Speed:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Drives the robot straight for a certain distance.");
    },
  };

  Blockly.Blocks["robot_drive_turn"] = {
    init: function () {
      this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("Turn Angle:");
      this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("at Speed:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Turns the robot for a certain number of degrees.");
    },
  };

  Blockly.Blocks["robot_drive_arcade"] = {
    init: function () {
      this.appendValueInput("STRAIGHT")
        .setCheck("Number")
        .appendField("Arcade Drive   Straight:");
      this.appendValueInput("TURN")
        .setCheck("Number")
        .appendField("Turn:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Drives the robot using arcade-style (straight + turn) inputs.");
    },
  };

  Blockly.Blocks["robot_stop"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Stop All Motors");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Stops all motors on the robot.");
    },
  };

  // --- Motors (Universal) ---
  const portOptions: Blockly.MenuOption[] = [
    ["Port A", "A"],
    ["Port B", "B"],
    ["Port C", "C"],
    ["Port D", "D"],
    ["Port 1", "1"],
    ["Port 2", "2"],
    ["Port 3", "3"],
    ["Port 4", "4"],
  ];

  Blockly.Blocks["robot_motor_set_speed"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Set Motor")
        .appendField(new Blockly.FieldDropdown(portOptions), "PORT");
      this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("to Speed:");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
      this.setTooltip("Sets the speed of a specific motor port.");
    },
  };

  Blockly.Blocks["robot_motor_get_position"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Motor")
        .appendField(new Blockly.FieldDropdown(portOptions), "PORT")
        .appendField("Position");
      this.setOutput(true, "Number");
      this.setColour(190);
      this.setTooltip("Gets the encoder position of a specific motor port.");
    },
  };

  Blockly.Blocks["robot_motor_reset"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Reset Motor")
        .appendField(new Blockly.FieldDropdown(portOptions), "PORT");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
      this.setTooltip("Resets the encoder of a specific motor port.");
    },
  };

  // --- Sensors (Universal) ---
  Blockly.Blocks["robot_get_distance"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Distance (cm)");
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Reads the distance from the ultrasonic/sonar sensor.");
    },
  };

  Blockly.Blocks["robot_get_reflectance"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Reflectance")
        .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Right", "RIGHT"]] as Blockly.MenuOption[]), "SIDE");
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Reads the reflectance sensor value.");
    },
  };

  Blockly.Blocks["robot_get_yaw"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Gyro Yaw");
      this.setOutput(true, "Number");
      this.setColour(45);
      this.setTooltip("Reads the current yaw (heading) from the IMU.");
    },
  };
}
