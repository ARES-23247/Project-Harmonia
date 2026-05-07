# Phase 11 Plan: UI Polish & Animations

## 1. Global Styles & Typography
- **Google Fonts**: Import 'Inter' or 'Outfit' in `index.html`.
- **Global Transitions**: Add base transitions for background/text color changes in `index.css`.
- **Glassmorphism**: Define utilities for backdrop blur.

## 2. Component Polish
- **Header**: Refine height, blur, and border. Add subtle animation to the logo.
- **Sidebar**: Improve padding, icons, and hover states.
- **Panels**: Add smooth transitions between Blockly and Monaco views.

## 3. Loading States (Skeletons)
- Create `src/components/ui/skeleton.tsx`.
- Implement skeletons for:
  - Blockly workspace (large block-like rectangles).
  - Monaco editor (line-like rectangles).
- Show skeletons while `EditorStore` connection state is initializing or components are mounting.

## 4. Animations (Framer Motion)
- **Panel Entry**: Orchestrated entry of sidebar and editor.
- **Hover Effects**: Scale/glow effects for hardware connection buttons.
- **Motion Reduction**: Wrap animations in `useReducedMotion` checks.

## 5. Verification Plan
- **A11Y-01**: Re-verify contrast after polish.
- **POLISH-04**: Test with "Reduce Motion" system setting.
- **Visual Regression**: Compare screens before/after polish.
