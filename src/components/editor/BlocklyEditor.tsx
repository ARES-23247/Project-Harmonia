import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { useEditorStore } from "@/store/editorStore";

export function BlocklyEditor() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const setPythonCode = useEditorStore((state) => state.setPythonCode);
  const setBlocklyWorkspace = useEditorStore((state) => state.setBlocklyWorkspace);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        kind: "categoryToolbox",
        contents: [
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

    const onWorkspaceChange = (event: any) => {
      // Don't generate code for purely UI events to prevent lag
      if (event.isUiEvent) return;
      
      const code = pythonGenerator.workspaceToCode(workspace);
      setPythonCode(code || "# Drag blocks to generate code.");
    };

    workspace.addChangeListener(onWorkspaceChange);

    return () => {
      workspace.removeChangeListener(onWorkspaceChange);
      workspace.dispose();
    };
  }, [setBlocklyWorkspace, setPythonCode]);

  return <div ref={blocklyDiv} className="w-full h-full" />;
}
