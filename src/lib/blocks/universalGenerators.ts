import { PythonGenerator } from "blockly/python";
import { useEditorStore } from "@/store/editorStore";

export function registerUniversalGenerators(pythonGenerator: PythonGenerator) {
  const getProfile = () => useEditorStore.getState().hardwareProfile;

  // --- Drivetrain ---
  pythonGenerator.forBlock["robot_drive_straight"] = function (block, generator) {
    const profile = getProfile();
    const dist = generator.valueToCode(block, "DIST", 0) || "0";
    const speed = generator.valueToCode(block, "SPEED", 0) || "0";

    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
      gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
      return `differentialDrive.straight(${dist}, ${speed})\n`;
    } else if (profile === "lego") {
      gen.definitions_["import_lego"] = "from pybricks.robotics import DriveBase\nfrom pybricks.pupdevices import Motor\nfrom pybricks.parameters import Port";
      gen.definitions_["lego_setup"] = "left_motor = Motor(Port.A)\nright_motor = Motor(Port.B)\nrobot = DriveBase(left_motor, right_motor, wheel_diameter=56, axle_track=114)";
      return `robot.straight(${dist})\n`;
    }
    return `# Drive Straight (${dist}, ${speed}) - Not implemented for ${profile}\n`;
  };

  pythonGenerator.forBlock["robot_drive_turn"] = function (block, generator) {
    const profile = getProfile();
    const angle = generator.valueToCode(block, "ANGLE", 0) || "0";
    const speed = generator.valueToCode(block, "SPEED", 0) || "0";

    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
      gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
      return `differentialDrive.turn(${angle}, ${speed})\n`;
    } else if (profile === "lego") {
      gen.definitions_["lego_setup"] = "left_motor = Motor(Port.A)\nright_motor = Motor(Port.B)\nrobot = DriveBase(left_motor, right_motor, wheel_diameter=56, axle_track=114)";
      return `robot.turn(${angle})\n`;
    }
    return `# Turn (${angle}) - Not implemented for ${profile}\n`;
  };

  pythonGenerator.forBlock["robot_drive_arcade"] = function (block, generator) {
    const profile = getProfile();
    const straight = generator.valueToCode(block, "STRAIGHT", 0) || "0";
    const turn = generator.valueToCode(block, "TURN", 0) || "0";

    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
      gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
      return `differentialDrive.arcade(${straight}, ${turn})\n`;
    }
    return `# Arcade Drive (${straight}, ${turn}) - Not implemented for ${profile}\n`;
  };

  pythonGenerator.forBlock["robot_stop"] = function (_block, generator) {
    const profile = getProfile();
    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_drivetrain"] = "from XRPLib.differential_drive import DifferentialDrive";
      gen.definitions_["drivetrain_setup"] = "differentialDrive = DifferentialDrive.get_default_differential_drive()";
      return `differentialDrive.stop()\n`;
    } else if (profile === "lego") {
      return `robot.stop()\n`;
    }
    return `# Stop Motors - Not implemented for ${profile}\n`;
  };

  // --- Motors ---
  pythonGenerator.forBlock["robot_motor_set_speed"] = function (block, generator) {
    const profile = getProfile();
    const port = block.getFieldValue("PORT");
    const speed = generator.valueToCode(block, "SPEED", 0) || "0";

    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_motor"] = "from XRPLib.encoded_motor import EncodedMotor";
      gen.definitions_[`motor${port}_setup`] = `motor${port} = EncodedMotor.get_default_encoded_motor(${port})`;
      return `motor${port}.set_speed(${speed})\n`;
    } else if (profile === "lego") {
      gen.definitions_[`motor${port}_setup`] = `motor_${port} = Motor(Port.${port})`;
      return `motor_${port}.run(${speed})\n`;
    }
    return `# Motor ${port} Speed ${speed} - Not implemented for ${profile}\n`;
  };

  pythonGenerator.forBlock["robot_motor_get_position"] = function (block, generator) {
    const profile = getProfile();
    const port = block.getFieldValue("PORT");

    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_motor"] = "from XRPLib.encoded_motor import EncodedMotor";
      gen.definitions_[`motor${port}_setup`] = `motor${port} = EncodedMotor.get_default_encoded_motor(${port})`;
      return [`motor${port}.get_position()`, 0];
    } else if (profile === "lego") {
      gen.definitions_[`motor${port}_setup`] = `motor_${port} = Motor(Port.${port})`;
      return [`motor_${port}.angle()`, 0];
    }
    return [`0 # Get Position ${port} - Not implemented for ${profile}`, 0];
  };

  // --- Sensors ---
  pythonGenerator.forBlock["robot_get_distance"] = function (_block, generator) {
    const profile = getProfile();
    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_rangefinder"] = "from XRPLib.rangefinder import Rangefinder";
      gen.definitions_["rangefinder_setup"] = "rangefinder = Rangefinder.get_default_rangefinder()";
      return ["rangefinder.distance()", 0];
    } else if (profile === "lego") {
      gen.definitions_["import_ultra"] = "from pybricks.pupdevices import UltrasonicSensor";
      gen.definitions_["ultra_setup"] = "sonar = UltrasonicSensor(Port.S4)";
      return ["sonar.distance()", 0];
    }
    return [`0 # Get Distance - Not implemented for ${profile}`, 0];
  };

  pythonGenerator.forBlock["robot_get_reflectance"] = function (block, generator) {
    const profile = getProfile();
    const side = block.getFieldValue("SIDE");

    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_reflectance"] = "from XRPLib.reflectance import Reflectance";
      gen.definitions_["reflectance_setup"] = "reflectance = Reflectance.get_default_reflectance()";
      const method = side === "LEFT" ? "get_left" : "get_right";
      return [`reflectance.${method}()`, 0];
    } else if (profile === "lego") {
      gen.definitions_["import_color"] = "from pybricks.pupdevices import ColorSensor";
      gen.definitions_[`color_${side}_setup`] = `color_${side.toLowerCase()} = ColorSensor(Port.S${side === 'LEFT' ? '1' : '2'})`;
      return [`color_${side.toLowerCase()}.reflection()`, 0];
    }
    return [`0 # Get Reflectance ${side} - Not implemented for ${profile}`, 0];
  };

  pythonGenerator.forBlock["robot_get_yaw"] = function (_block, generator) {
    const profile = getProfile();
    const gen = generator as any;
    if (profile === "xrp") {
      gen.definitions_["import_imu"] = "from XRPLib.imu import IMU";
      gen.definitions_["imu_setup"] = "imu = IMU.get_default_imu()\nimu.calibrate(1)";
      return ["imu.get_yaw()", 0];
    } else if (profile === "lego") {
      return ["hub.imu.heading()", 0];
    }
    return [`0 # Get Yaw - Not implemented for ${profile}`, 0];
  };
}
