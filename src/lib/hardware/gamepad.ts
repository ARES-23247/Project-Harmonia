import { useEditorStore } from "@/store/editorStore";

let pollingInterval: number | null = null;

export function startGamepadPolling() {
  if (pollingInterval) return;

  const poll = () => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    
    // Find the first connected gamepad to map to "gamepad1"
    const gp = gamepads.find(g => g !== null);
    
    if (gp) {
      useEditorStore.getState().setGamepadState({
        buttons: gp.buttons.map(b => b.pressed),
        axes: gp.axes.slice() // copy array
      });
    }

    pollingInterval = requestAnimationFrame(poll);
  };

  poll();
}

export function stopGamepadPolling() {
  if (pollingInterval) {
    cancelAnimationFrame(pollingInterval);
    pollingInterval = null;
  }
}

// Maps physical button indices to FTC standard names
export const GamepadButtons = {
  A: 0,
  B: 1,
  X: 2,
  Y: 3,
  LEFT_BUMPER: 4,
  RIGHT_BUMPER: 5,
  LEFT_TRIGGER: 6,
  RIGHT_TRIGGER: 7,
  BACK: 8,
  START: 9,
  LEFT_STICK_BUTTON: 10,
  RIGHT_STICK_BUTTON: 11,
  DPAD_UP: 12,
  DPAD_DOWN: 13,
  DPAD_LEFT: 14,
  DPAD_RIGHT: 15,
};

export const GamepadAxes = {
  LEFT_X: 0,
  LEFT_Y: 1,
  RIGHT_X: 2,
  RIGHT_Y: 3,
};
