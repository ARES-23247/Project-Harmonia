import { motion } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";
import { X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface BottomConsoleProps {
  children: ReactNode;
}

export function BottomConsole({ children }: BottomConsoleProps) {
  const isOpen = useEditorStore((state) => state.isConsoleOpen);
  const setIsOpen = useEditorStore((state) => state.setIsConsoleOpen);

  return (
    <motion.div
      initial={false}
      animate={{ 
        height: isOpen ? "25vh" : "0px",
        opacity: isOpen ? 1 : 0
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="w-full border-t bg-card flex flex-col relative overflow-hidden shrink-0 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]"
    >
      <div className="h-[25vh] min-h-[150px] w-full flex flex-col">
        <div className="h-9 flex items-center px-4 border-b justify-between shrink-0 bg-muted/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Output Terminal</span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950/50">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
