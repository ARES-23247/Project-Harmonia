import { motion, AnimatePresence } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";
import { X, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SideDrawerProps {
  children: ReactNode;
}

export function SideDrawer({ children }: SideDrawerProps) {
  const isOpen = useEditorStore((state) => state.isRightDrawerOpen);
  const setIsOpen = useEditorStore((state) => state.setIsRightDrawerOpen);

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isOpen ? "30vw" : "0px",
        opacity: isOpen ? 1 : 0
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="h-full border-l bg-card flex flex-col relative overflow-hidden shrink-0"
    >
      <div className="w-[30vw] min-w-[320px] h-full flex flex-col">
        <div className="h-12 flex items-center px-4 border-b justify-between shrink-0 bg-muted/20">
          <div className="flex items-center gap-2">
            <PanelRightOpen className="w-4 h-4 text-primary" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Tools & Simulation</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
      
      {/* Floating Toggle Button when closed - This might be better in the main UI or header */}
    </motion.div>
  );
}
