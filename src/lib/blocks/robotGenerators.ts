import { PythonGenerator, Order } from "blockly/python";
import { GamepadButtons, GamepadAxes } from "../hardware/gamepad";

export function registerRobotGenerators(pythonGenerator: PythonGenerator) {
  pythonGenerator.forBlock["harmonia_drive"] = function (block, generator) {
    const left = generator.valueToCode(block, "LEFT", Order.NONE) || "0";
    const right = generator.valueToCode(block, "RIGHT", Order.NONE) || "0";
    return `harmonia.drive(${left}, ${right})\n`;
  };

  pythonGenerator.forBlock["harmonia_sleep"] = function (block, generator) {
    const seconds = generator.valueToCode(block, "SECONDS", Order.NONE) || "0";
    return `import time\ntime.sleep(${seconds})\n`;
  };

  pythonGenerator.forBlock["gamepad_get_button"] = function (block, _generator) {
    const buttonStr = block.getFieldValue("BUTTON") as keyof typeof GamepadButtons;
    const index = GamepadButtons[buttonStr];
    const code = `gamepad1.get_button(${index})`;
    return [code, Order.ATOMIC];
  };

  pythonGenerator.forBlock["gamepad_get_axis"] = function (block, _generator) {
    const axisStr = block.getFieldValue("AXIS") as keyof typeof GamepadAxes;
    const index = GamepadAxes[axisStr];
    const code = `gamepad1.get_axis(${index})`;
    return [code, Order.ATOMIC];
  };
}
