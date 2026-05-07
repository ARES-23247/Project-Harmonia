import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Step {
  title: string;
  content: string;
  targetId: string;
  position: "top" | "bottom" | "left" | "right" | "center";
}

const STEPS: Step[] = [
  {
    title: "Welcome to Harmonia",
    content: "Let's take a quick tour of your new universal robotics IDE. We'll show you how to build and run your first robot program.",
    targetId: "root",
    position: "center",
  },
  {
    title: "The Block Palette",
    content: "This is where all your coding blocks live. Drag them into the workspace to build your logic.",
    targetId: "blocklyEditor",
    position: "right",
  },
  {
    title: "Real-time Code",
    content: "As you drag blocks, the Python code is generated instantly here. Perfect for learning how the blocks work!",
    targetId: "monaco-editor-container", // I'll need to add this ID
    position: "left",
  },
  {
    title: "Connect & Run",
    content: "Once your code is ready, connect to your robot via Bluetooth or Serial and hit 'Run' to see it in action.",
    targetId: "hardware-toolbar", // I'll need to add this ID
    position: "bottom",
  },
  {
    title: "Simulation Environment",
    content: "Don't have a robot yet? No problem! Use the simulation to test your code in a virtual environment.",
    targetId: "simulation-panel", // I'll need to add this ID
    position: "right",
  },
];

export function OnboardingTour() {
  const { isTutorialActive, currentStep, nextStep, prevStep, skipTutorial, completeTutorial } = useOnboardingStore();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isTutorialActive) return;

    const updateRect = () => {
      const step = STEPS[currentStep];
      if (step.position === "center") {
        setTargetRect(null);
        return;
      }
      const el = document.getElementById(step.targetId);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [isTutorialActive, currentStep]);

  if (!isTutorialActive) return null;

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Overlay with Spotlight */}
      <motion.div 
        className="absolute inset-0 bg-black/60 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {targetRect && (
          <motion.div 
            className="absolute bg-transparent ring-[2000px] ring-black/60 rounded-lg"
            animate={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          />
        )}
      </motion.div>

      {/* Tooltip Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute pointer-events-auto w-80 glass p-6 rounded-2xl shadow-2xl border-primary/20"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            ...(targetRect ? getPopoverPosition(targetRect, step.position) : { top: "50%", left: "50%", x: "-50%", y: "-50%" })
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button 
            onClick={skipTutorial}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              {currentStep + 1}
            </div>
            <h3 className="font-bold text-lg">{step.title}</h3>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {step.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all ${i === currentStep ? "w-4 bg-primary" : "w-1 bg-primary/20"}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="ghost" size="sm" onClick={prevStep}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              <Button size="sm" onClick={isLastStep ? completeTutorial : nextStep} className="shadow-lg shadow-primary/20">
                {isLastStep ? (
                  <>
                    Finish
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getPopoverPosition(rect: DOMRect, position: string) {
  const gap = 20;
  switch (position) {
    case "right":
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + gap,
        y: "-50%",
      };
    case "left":
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - 320 - gap,
        y: "-50%",
      };
    case "bottom":
      return {
        top: rect.bottom + gap,
        left: rect.left + rect.width / 2,
        x: "-50%",
      };
    case "top":
      return {
        top: rect.top - gap,
        left: rect.left + rect.width / 2,
        x: "-50%",
        y: "-100%",
      };
    default:
      return { top: "50%", left: "50%", x: "-50%", y: "-50%" };
  }
}
