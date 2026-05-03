import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { useEditorStore } from "@/store/editorStore";
import { registerRobotBlocks } from "@/lib/blocks/robotBlocks";
import { registerRobotGenerators } from "@/lib/blocks/robotGenerators";
import { registerLegoBlocks } from "@/lib/blocks/legoBlocks";
import { registerLegoGenerators } from "@/lib/blocks/legoGenerators";

export function BlocklyEditor() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const setPythonCode = useEditorStore((state) => state.setPythonCode);
  const setBlocklyWorkspace = useEditorStore((state) => state.setBlocklyWorkspace);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    registerRobotBlocks();
    registerRobotGenerators();
    registerLegoBlocks();
    registerLegoGenerators();

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "🤖 Robot",
            colour: "230",
            contents: [
              { kind: "block", type: "harmonia_drive" },
              { kind: "block", type: "harmonia_sleep" },
            ],
          },
          {
            kind: "category",
            name: "🧱 Advanced Lego",
            colour: "290",
            contents: [
              { kind: "block", type: "lego_motor_run_target" },
              { kind: "block", type: "lego_motor_run_stalled" },
              { kind: "block", type: "lego_color_sensor" },
            ],
          },
          {
            kind: "category",
            name: "🎮 Gamepad",
            colour: "160",
            contents: [
              { kind: "block", type: "gamepad_get_button" },
              { kind: "block", type: "gamepad_get_axis" },
            ],
          },
          {
            kind: "category",
            name: "Logic",
            colour: "210",
            contents: [
              { kind: "block", type: "controls_if" },
              { kind: "block", type: "logic_compare" },
              { kind: "block", type: "logic_operation" },
              { kind: "block", type: "logic_boolean" },
            ],
          },
          {
            kind: "category",
            name: "Loops",
            colour: "120",
            contents: [
              { kind: "block", type: "controls_repeat_ext" },
              { kind: "block", type: "controls_whileUntil" },
            ],
          },
          {
            kind: "category",
            name: "Math",
            colour: "230",
            contents: [
              { kind: "block", type: "math_number" },
              { kind: "block", type: "math_arithmetic" },
            ],
          },
          {
            kind: "category",
            name: "Text",
            colour: "160",
            contents: [
              { kind: "block", type: "text" },
              { kind: "block", type: "text_print" },
            ],
          },
        ],
      },
    });

    setBlocklyWorkspace(workspace);

    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
    });
    if (blocklyDiv.current) {
      resizeObserver.observe(blocklyDiv.current);
    }

    const onWorkspaceChange = (event: any) => {
      // Don't generate code for purely UI events to prevent lag
      if (event.isUiEvent) return;
      
      const code = pythonGenerator.workspaceToCode(workspace);
      setPythonCode(code || "# Drag blocks to generate code.");
    };

    workspace.addChangeListener(onWorkspaceChange);

    return () => {
      resizeObserver.disconnect();
      workspace.removeChangeListener(onWorkspaceChange);
      workspace.dispose();
    };
  }, [setBlocklyWorkspace, setPythonCode]);

  return <div ref={blocklyDiv} className="w-full h-full" />;
}
