import { PythonGenerator } from "blockly/python";

export function registerXrpGenerators(pythonGenerator: PythonGenerator) {
  // --- DriveTrain ---
  pythonGenerator.forBlock["xrp_straight_effort"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
    gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
    const dist = generator.valueToCode(block, "dist", 0) || "0";
    const effort = generator.valueToCode(block, "effort", 0) || "0";
    return `differentialDrive.straight(${dist}, ${effort})\n`;
  };

  pythonGenerator.forBlock["xrp_turn_effort"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
    gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
    const degrees = generator.valueToCode(block, "degrees", 0) || "0";
    const effort = generator.valueToCode(block, "effort", 0) || "0";
    return `differentialDrive.turn(${degrees}, ${effort})\n`;
  };

  pythonGenerator.forBlock["xrp_arcade"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
    gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
    const straight = generator.valueToCode(block, "STRAIGHT", 0) || "0";
    const turn = generator.valueToCode(block, "TURN", 0) || "0";
    return `differentialDrive.arcade(${straight}, ${turn})\n`;
  };

  pythonGenerator.forBlock["xrp_stop_motors"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
    gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
    return "differentialDrive.stop()\n";
  };

  // --- Motors ---
  pythonGenerator.forBlock["xrp_motor_effort"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_motor"] = "from XRPLib.encoded_motor import EncodedMotor";
    const index = block.getFieldValue("MOTOR");
    gen.definitions_[`motor${index}_setup`] = `motor${index} = EncodedMotor.get_default_encoded_motor(${index})`;
    const effort = generator.valueToCode(block, "effort", 0) || "0";
    return `motor${index}.set_effort(${effort})\n`;
  };

  pythonGenerator.forBlock["xrp_motor_reset_position"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_motor"] = "from XRPLib.encoded_motor import EncodedMotor";
    const index = block.getFieldValue("MOTOR");
    gen.definitions_[`motor${index}_setup`] = `motor${index} = EncodedMotor.get_default_encoded_motor(${index})`;
    return `motor${index}.reset_encoder_position()\n`;
  };

  pythonGenerator.forBlock["xrp_motor_get_position"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_motor"] = "from XRPLib.encoded_motor import EncodedMotor";
    const index = block.getFieldValue("MOTOR");
    gen.definitions_[`motor${index}_setup`] = `motor${index} = EncodedMotor.get_default_encoded_motor(${index})`;
    const code = `motor${index}.get_position()`;
    return [code, 0];
  };

  // --- Servo ---
  pythonGenerator.forBlock["xrp_servo_deg"] = function (block, generator) {
    const gen = generator as any;
    gen.definitions_["import_servo"] = "from XRPLib.servo import Servo";
    const index = block.getFieldValue("SERVO");
    gen.definitions_[`servo${index}_setup`] = `servo${index} = Servo.get_default_servo(${index})`;
    const degrees = generator.valueToCode(block, "degrees", 0) || "0";
    return `servo${index}.set_angle(${degrees})\n`;
  };

  // --- Sensors ---
  pythonGenerator.forBlock["xrp_getsonardist"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_rangefinder"] = "from XRPLib.rangefinder import Rangefinder";
    gen.definitions_["rangefinder_setup"] = "rangefinder = Rangefinder.get_default_rangefinder()";
    const code = "rangefinder.distance()";
    return [code, 0];
  };

  pythonGenerator.forBlock["xrp_l_refl"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_reflectance"] = "from XRPLib.reflectance import Reflectance";
    gen.definitions_["reflectance_setup"] = "reflectance = Reflectance.get_default_reflectance()";
    const code = "reflectance.get_left()";
    return [code, 0];
  };

  pythonGenerator.forBlock["xrp_r_refl"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_reflectance"] = "from XRPLib.reflectance import Reflectance";
    gen.definitions_["reflectance_setup"] = "reflectance = Reflectance.get_default_reflectance()";
    const code = "reflectance.get_right()";
    return [code, 0];
  };

  // --- IMU ---
  pythonGenerator.forBlock["xrp_yaw"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_imu"] = "from XRPLib.imu import IMU";
    gen.definitions_["imu_setup"] = "imu = IMU.get_default_imu()\nimu.calibrate(1)";
    gen.definitions_["yaw_setup"] = "imu.reset_yaw()";
    const code = "imu.get_yaw()";
    return [code, 0];
  };

  // --- Board ---
  pythonGenerator.forBlock["xrp_led_on"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_board"] = "from XRPLib.board import Board";
    gen.definitions_["board_setup"] = "board = Board.get_default_board()";
    return "board.led_on()\n";
  };

  pythonGenerator.forBlock["xrp_led_off"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_board"] = "from XRPLib.board import Board";
    gen.definitions_["board_setup"] = "board = Board.get_default_board()";
    return "board.led_off()\n";
  };

  pythonGenerator.forBlock["xrp_button_pressed"] = function (_block, generator) {
    const gen = generator as any;
    gen.definitions_["import_board"] = "from XRPLib.board import Board";
    gen.definitions_["board_setup"] = "board = Board.get_default_board()";
    const code = "board.is_button_pressed()";
    return [code, 0];
  };
}
