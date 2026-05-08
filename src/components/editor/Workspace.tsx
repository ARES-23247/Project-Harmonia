import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HardwareToolbar } from "./HardwareToolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { CollaborationProvider } from "./CollaborationContext";
import { useEditorStore } from "@/store/editorStore";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { OnboardingTour } from "../onboarding/OnboardingTour";
import { useOnboardingStore } from "@/store/onboardingStore";
import { SideDrawer } from "./SideDrawer";
import { FloatingPanel } from "./FloatingPanel";
import { BottomConsole } from "./BottomConsole";
import { AboutUsModal } from "../modals/AboutUsModal";

const MonacoEditor = lazy(() => import("./MonacoEditor"));
const BlocklyEditor = lazy(() => import("./BlocklyEditor"));
const SimulationPanel = lazy(() => import("./SimulationPanel"));
const ConsolePanel = lazy(() => import("./ConsolePanel"));
const TelemetryPanel = lazy(() => import("./TelemetryPanel"));

function PanelFallback() {
  return (
    <div className="w-full h-full p-8 flex flex-col gap-4 bg-card animate-pulse">
      <Skeleton className="h-12 w-32" />
      <Skeleton className="flex-1 w-full" />
    </div>
  );
}

export function Workspace() {
  const shouldReduceMotion = useReducedMotion();
  const { hasCompletedTutorial, startTutorial } = useOnboardingStore();
  const { roomId } = useParams<{ roomId?: string }>();
  const activeRoomId = roomId || "harmonia-global";
  
  const viewMode = useEditorStore((state) => state.viewMode);
  const poppedOutPanels = useEditorStore((state) => state.poppedOutPanels);
  const isAboutUsOpen = useEditorStore((state) => state.isAboutUsOpen);
  const setIsAboutUsOpen = useEditorStore((state) => state.setIsAboutUsOpen);

  const isSimPopped = poppedOutPanels.includes("simulation");
  const isTelePopped = poppedOutPanels.includes("telemetry");

  useEffect(() => {
    if (!hasCompletedTutorial) {
      const timeout = setTimeout(startTutorial, 1500);
      return () => clearTimeout(timeout);
    }
  }, [hasCompletedTutorial, startTutorial]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <CollaborationProvider roomId={activeRoomId}>
      <motion.div 
        className="w-full flex-1 flex flex-col bg-background overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <HardwareToolbar />
        </motion.div>
      
        <div className="flex-1 w-full flex flex-col overflow-hidden relative">
          <div className="flex-1 w-full flex overflow-hidden relative">
            <PanelGroup orientation="horizontal" className="flex-1 h-full">
              {/* Main Editor Area */}
              <Panel minSize={30} className="flex flex-col">
                <div className="flex-1 relative overflow-hidden bg-card/50">
                  <Suspense fallback={<PanelFallback />}>
                    {viewMode === "blocks" && (
                      <div className="absolute inset-0">
                        <BlocklyEditor />
                      </div>
                    )}
                    {viewMode === "text" && (
                      <div className="absolute inset-0">
                        <MonacoEditor />
                      </div>
                    )}
                    {viewMode === "split" && (
                      <PanelGroup orientation="horizontal">
                        <Panel defaultSize={50} minSize={20}>
                          <div className="h-full border-r relative">
                            <BlocklyEditor />
                          </div>
                        </Panel>
                        <PanelResizeHandle className="w-1.5 bg-border hover:bg-primary/30 transition-colors cursor-col-resize flex items-center justify-center group z-10">
                          <div className="h-10 w-1 bg-muted group-hover:bg-primary/50 rounded-full transition-colors" />
                        </PanelResizeHandle>
                        <Panel defaultSize={50} minSize={20}>
                          <div className="h-full relative">
                            <MonacoEditor />
                          </div>
                        </Panel>
                      </PanelGroup>
                    )}
                  </Suspense>
                </div>
              </Panel>
            </PanelGroup>

            {/* Auxiliary Side Drawer */}
            <SideDrawer>
              <PanelGroup orientation="vertical">
                {!isSimPopped && (
                  <Panel defaultSize={40} minSize={20}>
                    <Suspense fallback={<PanelFallback />}>
                      <SimulationPanel />
                    </Suspense>
                  </Panel>
                )}
                
                {!isSimPopped && (
                  <PanelResizeHandle className="h-1.5 bg-border hover:bg-primary/30 transition-colors cursor-row-resize flex flex-col items-center justify-center group">
                    <div className="w-10 h-1 bg-muted group-hover:bg-primary/50 rounded-full transition-colors" />
                  </PanelResizeHandle>
                )}

                <Panel defaultSize={60} minSize={20}>
                  <div className="h-full flex flex-col">
                    {!isTelePopped && (
                      <div className="flex-1">
                        <Suspense fallback={<PanelFallback />}>
                          <TelemetryPanel />
                        </Suspense>
                      </div>
                    )}
                  </div>
                </Panel>
              </PanelGroup>
            </SideDrawer>
          </div>

          {/* Bottom Console Drawer */}
          <BottomConsole>
            <Suspense fallback={<PanelFallback />}>
              <ConsolePanel />
            </Suspense>
          </BottomConsole>
        </div>
        
        <OnboardingTour />

        {/* Floating Panels - Rendered outside main layout to avoid clipping */}
        <AnimatePresence mode="popLayout">
          {isSimPopped && (
            <FloatingPanel id="simulation" title="Simulation" defaultPosition={{ x: window.innerWidth - 500, y: 100 }}>
              <Suspense fallback={<PanelFallback />}>
                <SimulationPanel />
              </Suspense>
            </FloatingPanel>
          )}
          {isTelePopped && (
            <FloatingPanel id="telemetry" title="Telemetry" defaultPosition={{ x: window.innerWidth - 500, y: 450 }}>
              <Suspense fallback={<PanelFallback />}>
                <TelemetryPanel />
              </Suspense>
            </FloatingPanel>
          )}
        </AnimatePresence>

        <AboutUsModal isOpen={isAboutUsOpen} onOpenChange={setIsAboutUsOpen} />
      </motion.div>
    </CollaborationProvider>
  );
}
