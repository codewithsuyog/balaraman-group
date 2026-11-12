// One analogy picture per research theme, drawn in code with shared rules so they match:
// same 100 × 64 frame, 1.6 line weight, round caps; lines in the text colour, amber (accent) for the key idea.
// Every stroked shape has pathLength={1} so the `.draw` class (globals.css) can draw it in on scroll.
import type { ReactElement } from 'react';

export type ThemeArtName = 'coupling' | 'borrowing' | 'storage' | 'upcycling' | 'light' | 'unlock';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', pathLength: 1 } as const;
const A = { ...S, stroke: 'var(--accent)' } as const;
const label = { fontSize: 9.5, fontWeight: 600, fill: 'var(--accent)', textAnchor: 'middle' } as const;

export const themeArt: Record<ThemeArtName, { label: string; el: ReactElement }> = {
  // Two partners couple; hydrogen leaves as gas
  coupling: {
    label: 'Two puzzle pieces joining while hydrogen bubbles rise away',
    el: (
      <>
        <path {...S} d="M20 28 H46 V35 A5 5 0 1 1 46 45 V52 H20 Z" />
        <path {...S} d="M54 28 H80 V52 H54 V45 A5 5 0 1 0 54 35 Z" />
        <circle {...A} cx="50" cy="18" r="3.4" />
        <circle {...A} cx="57" cy="9" r="2.5" />
        <circle {...A} cx="44" cy="7" r="1.8" />
      </>
    ),
  },
  // The catalyst borrows hydrogen and gives it back
  borrowing: {
    label: 'A borrow-and-return loop carrying a hydrogen token',
    el: (
      <>
        <path {...S} d="M30 32 A20 20 0 0 1 67.3 22" />
        <path {...S} d="M67.8 16 L67.3 22 L61.9 19.5" />
        <path {...S} d="M70 32 A20 20 0 0 1 32.7 42" />
        <path {...S} d="M32.2 48 L32.7 42 L38.1 44.5" />
        <circle {...A} cx="50" cy="32" r="8" />
        <text x="50" y="35.4" {...label}>H</text>
      </>
    ),
  },
  // Hydrogen stored and released on demand
  storage: {
    label: 'A battery filling up with hydrogen',
    el: (
      <>
        <rect {...S} x="29" y="14" width="40" height="26" rx="3" />
        <path {...S} d="M69 22 h4 v10 h-4" />
        <rect x="33.5" y="18.5" width="8" height="17" rx="1.5" fill="var(--accent)" />
        <rect x="45" y="18.5" width="8" height="17" rx="1.5" fill="var(--accent)" />
        <rect {...A} x="56.5" y="18.5" width="8" height="17" rx="1.5" />
        <text x="50" y="55" {...label}>H₂</text>
      </>
    ),
  },
  // Waste plastic turned into useful products
  upcycling: {
    label: 'A plastic bottle turning into droplets of product',
    el: (
      <>
        <path {...S} d="M24 12 h8 v6 q6 3 6 10 v20 q0 3 -3 3 h-14 q-3 0 -3 -3 v-20 q0 -7 6 -10 z" />
        <path {...S} d="M22.5 12 h11" />
        <path {...S} d="M46 32 H60" />
        <path {...S} d="M55 27 L60 32 L55 37" />
        <path {...A} d="M73 12 q6 8 6 12 a6 6 0 0 1 -12 0 q0 -4 6 -12 z" />
        <path {...A} d="M82 36 q4.5 6 4.5 9 a4.5 4.5 0 0 1 -9 0 q0 -3 4.5 -9 z" />
      </>
    ),
  },
  // Light supplies the energy
  light: {
    label: 'A lamp shining on a flask',
    el: (
      <>
        <circle {...A} cx="22" cy="16" r="6" />
        <path {...A} d="M30.5 19.5 L44 26" />
        <path {...A} d="M29 24.5 L41 34" />
        <path {...A} d="M25.5 28 L36 41" />
        <path {...S} d="M58 12 h12" />
        <path {...S} d="M60.5 12 v13 L48.5 47 q-2.5 5 3.5 5 h24 q6 0 3.5 -5 L67.5 25 v-13" />
        <path {...S} d="M53 39 h22" />
      </>
    ),
  },
  // Unlocking a bond that is normally inert
  unlock: {
    label: 'A key opening a padlock',
    el: (
      <>
        <rect {...S} x="56" y="28" width="26" height="22" rx="3" />
        <path {...S} d="M62 28 v-8 a7 7 0 0 1 14 0 v2" />
        <circle {...S} cx="69" cy="37" r="2.4" />
        <path {...S} d="M69 39.4 v4.6" />
        <circle {...A} cx="22" cy="39" r="7" />
        <path {...A} d="M29 39 H50" />
        <path {...A} d="M44 39 v5" />
        <path {...A} d="M48.5 39 v4" />
      </>
    ),
  },
};

export const THEME_ART_VIEWBOX = '0 0 100 64';
