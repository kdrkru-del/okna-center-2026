/**
 * Centralized Animation Tokens and Presets (Architecture of Light 2026)
 * Strict, restrained, high-end editorial feel (no bouncy or aggressive transforms).
 */

export const ANIMATION_TOKENS = {
  duration: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.5,
    slow: 0.9,
    cinematic: 1.4,
  },
  ease: {
    primary: "cubic-bezier(0.16, 1, 0.3, 1)",      // easeOutExpo / power3
    reveal: "cubic-bezier(0.25, 1, 0.5, 1)",       // smooth mask reveal
    subtle: "cubic-bezier(0.4, 0, 0.2, 1)",       // standard material
    glass: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
  stagger: {
    tight: 0.06,
    small: 0.1,
    medium: 0.18,
    cards: 0.12,
  },
} as const;

export const TRANSITION_DEFAULTS = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
};
