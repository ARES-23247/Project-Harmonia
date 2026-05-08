import { PythonGenerator, Order } from "blockly/python";

export function registerLegoGenerators(pythonGenerator: PythonGenerator) {
  pythonGenerator.forBlock["lego_motor_run_target"] = function (block, generator) {
    const port = block.getFieldValue("PORT");
    const speed = generator.valueToCode(block, "SPEED", 0) || "500";
    const target = generator.valueToCode(block, "TARGET", 0) || "90";
    
    // We import the motor class if not already handled by shim
    return `from pybricks.pupdevices import Motor\nfrom pybricks.parameters import Port\nMotor(Port.${port}).run_target(${speed}, ${target})\n`;
  };

  pythonGenerator.forBlock["lego_motor_run_stalled"] = function (block, generator) {
    const port = block.getFieldValue("PORT");
    const speed = generator.valueToCode(block, "SPEED", 0) || "500";
    
    return `from pybricks.pupdevices import Motor\nfrom pybricks.parameters import Port\nMotor(Port.${port}).run_until_stalled(${speed})\n`;
  };

  pythonGenerator.forBlock["lego_color_sensor"] = function (block, _generator) {
    const port = block.getFieldValue("PORT");
    const code = `__import__('pybricks.pupdevices').pupdevices.ColorSensor(__import__('pybricks.parameters').parameters.Port.${port}).color()`;
    return [code, Order.ATOMIC];
  };
}
