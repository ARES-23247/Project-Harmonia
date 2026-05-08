import { PythonGenerator, Order } from "blockly/python";

export function registerLegoGenerators(pythonGenerator: PythonGenerator) {
  pythonGenerator.forBlock["lego_motor_run_target"] = function (block, generator) {
    const gen = generator as any;
    const port = block.getFieldValue("PORT");
    const speed = generator.valueToCode(block, "SPEED", 0) || "500";
    const target = generator.valueToCode(block, "TARGET", 0) || "90";
    
    gen.definitions_["import_motor"] = "from pybricks.pupdevices import Motor";
    gen.definitions_["import_port"] = "from pybricks.parameters import Port";
    gen.definitions_[`motor_${port}_setup`] = `motor_${port} = Motor(Port.${port})`;
    
    return `motor_${port}.run_target(${speed}, ${target})\n`;
  };

  pythonGenerator.forBlock["lego_motor_run_stalled"] = function (block, generator) {
    const gen = generator as any;
    const port = block.getFieldValue("PORT");
    const speed = generator.valueToCode(block, "SPEED", 0) || "500";
    
    gen.definitions_["import_motor"] = "from pybricks.pupdevices import Motor";
    gen.definitions_["import_port"] = "from pybricks.parameters import Port";
    gen.definitions_[`motor_${port}_setup`] = `motor_${port} = Motor(Port.${port})`;
    
    return `motor_${port}.run_until_stalled(${speed})\n`;
  };

  pythonGenerator.forBlock["lego_color_sensor"] = function (block, generator) {
    const gen = generator as any;
    const port = block.getFieldValue("PORT");
    
    gen.definitions_["import_color"] = "from pybricks.pupdevices import ColorSensor";
    gen.definitions_["import_port"] = "from pybricks.parameters import Port";
    gen.definitions_[`color_${port}_setup`] = `color_${port} = ColorSensor(Port.${port})`;
    
    const code = `color_${port}.color()`;
    return [code, Order.ATOMIC];
  };
}
