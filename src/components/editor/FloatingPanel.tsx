import { motion } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";
import { Minimize2, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface FloatingPanelProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
}

export function FloatingPanel({ id, title, children, defaultPosition = { x: 100, y: 100 } }: FloatingPanelProps) {
  const togglePopOut = useEditorStore((state) => state.togglePopOut);

  const panel = (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={defaultPosition}
      className="fixed z-[100] w-[450px] min-h-[300px] bg-card border shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden flex flex-col border-primary/20"
      style={{ touchAction: "none" }}
    >
      <div className="h-10 bg-muted/40 border-b flex items-center px-3 cursor-grab active:cursor-grabbing shrink-0 group select-none">
        <GripHorizontal className="w-4 h-4 mr-2 text-muted-foreground group-active:text-primary transition-colors" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{title}</span>
        <div className="ml-auto flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 hover:bg-primary/10 transition-colors" 
            onClick={() => togglePopOut(id)}
            title="Dock to Sidebar"
          >
            <Minimize2 className="w-3.5 h-3.5 text-primary" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-background/50 backdrop-blur-sm">
        {children}
      </div>
      
      {/* Resize Handle (Optional/Future) */}
      <div className="h-2 w-full cursor-ns-resize absolute bottom-0 left-0" />
      <div className="w-2 h-full cursor-ew-resize absolute top-0 right-0" />
      <div className="w-4 h-4 cursor-nwse-resize absolute bottom-0 right-0" />
    </motion.div>
  );

  return createPortal(panel, document.body);
}
