import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  hasCompletedTutorial: boolean;
  isTutorialActive: boolean;
  currentStep: number;
  
  completeTutorial: () => void;
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  skipTutorial: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedTutorial: false,
      isTutorialActive: false,
      currentStep: 0,
      
      completeTutorial: () => set({ hasCompletedTutorial: true, isTutorialActive: false }),
      startTutorial: () => set({ isTutorialActive: true, currentStep: 0 }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      setStep: (step) => set({ currentStep: step }),
      skipTutorial: () => set({ isTutorialActive: false, hasCompletedTutorial: true }),
    }),
    {
      name: "harmonia-onboarding",
    }
  )
);
