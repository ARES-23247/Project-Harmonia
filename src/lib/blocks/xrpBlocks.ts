import * as Blockly from "blockly";

export function registerXrpBlocks() {
  // --- DriveTrain Blocks ---
  Blockly.Blocks["xrp_straight_effort"] = {
    init: function () {
      this.appendValueInput("dist")
        .setCheck("Number")
        .appendField("Drive Straight Distance:");
      this.appendValueInput("effort")
        .setCheck("Number")
        .appendField("Speed (-1 to 1):");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Drives the XRP straight for a certain distance at a given speed.");
    },
  };

  Blockly.Blocks["xrp_turn_effort"] = {
    init: function () {
      this.appendValueInput("degrees")
        .setCheck("Number")
        .appendField("Turn Degrees:");
      this.appendValueInput("effort")
        .setCheck("Number")
        .appendField("Speed (-1 to 1):");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Turns the XRP for a certain number of degrees at a given speed.");
    },
  };

  Blockly.Blocks["xrp_arcade"] = {
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
      this.setTooltip("Drives the XRP using arcade-style controls.");
    },
  };

  Blockly.Blocks["xrp_stop_motors"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Stop Motors");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Stops all motors on the XRP.");
    },
  };

  // --- Motor Blocks ---
  const motorOptions: Blockly.MenuOption[] = [
    ["Motor 1", "1"],
    ["Motor 2", "2"],
    ["Motor 3", "3"],
    ["Motor 4", "4"],
  ];

  Blockly.Blocks["xrp_motor_effort"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Set")
        .appendField(new Blockly.FieldDropdown(motorOptions), "MOTOR");
      this.appendValueInput("effort")
        .setCheck("Number")
        .appendField("to Speed (-1 to 1):");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
      this.setTooltip("Sets the raw effort of a specific motor.");
    },
  };

  Blockly.Blocks["xrp_motor_reset_position"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Reset Encoder")
        .appendField(new Blockly.FieldDropdown(motorOptions), "MOTOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
      this.setTooltip("Resets the encoder position of a specific motor.");
    },
  };

  Blockly.Blocks["xrp_motor_get_position"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown(motorOptions), "MOTOR")
        .appendField("Position");
      this.setOutput(true, "Number");
      this.setColour(190);
      this.setTooltip("Gets the encoder position of a specific motor.");
    },
  };

  // --- Servo Blocks ---
  const servoOptions: Blockly.MenuOption[] = [
    ["Servo 1", "1"],
    ["Servo 2", "2"],
  ];

  Blockly.Blocks["xrp_servo_deg"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Set")
        .appendField(new Blockly.FieldDropdown(servoOptions), "SERVO");
      this.appendValueInput("degrees")
        .setCheck("Number")
        .appendField("Angle (0-180):");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(100);
      this.setTooltip("Sets the angle of a servo.");
    },
  };

  // --- Sensor Blocks ---
  Blockly.Blocks["xrp_getsonardist"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Ultrasonic Distance (cm)");
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Gets the distance from the ultrasonic sensor in centimeters.");
    },
  };

  Blockly.Blocks["xrp_l_refl"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Left Reflectance");
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Gets the left reflectance sensor value.");
    },
  };

  Blockly.Blocks["xrp_r_refl"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get Right Reflectance");
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip("Gets the right reflectance sensor value.");
    },
  };

  // --- IMU Blocks ---
  Blockly.Blocks["xrp_yaw"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Get IMU Yaw");
      this.setOutput(true, "Number");
      this.setColour(45);
      this.setTooltip("Gets the current yaw angle from the IMU.");
    },
  };

  // --- Board Blocks ---
  Blockly.Blocks["xrp_led_on"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Turn On Board LED");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("Turns on the board LED.");
    },
  };

  Blockly.Blocks["xrp_led_off"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Turn Off Board LED");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("Turns off the board LED.");
    },
  };

  Blockly.Blocks["xrp_button_pressed"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Board Button Pressed?");
      this.setOutput(true, "Boolean");
      this.setColour(20);
      this.setTooltip("Checks if the board button is currently pressed.");
    },
  };
}
