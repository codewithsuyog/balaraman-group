// Small line illustrations for the Resources sections, drawn in code so they follow the
// site theme (lines use currentColor, highlights use the accent). Decorative: aria-hidden.
import type { ReactElement } from 'react';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const A = { ...S, stroke: 'var(--accent)' } as const;

const art: Record<string, ReactElement> = {
  // 1H NMR spectrum with one highlighted peak and a ppm axis
  'nmr-analysis': (
    <>
      <path {...S} d="M10 78 H150" />
      <path {...S} d="M14 76 L30 76 L33 40 L36 76 L58 76 L60 58 L62 76 L64 52 L66 76 L96 76 L98 64 L100 76 L128 76 L130 70 L132 76 L146 76" />
      <path {...A} d="M44 76 L47 18 L50 76" />
      {[20, 50, 80, 110, 140].map((x) => <path key={x} {...S} strokeWidth={1.5} d={`M${x} 78 v5`} />)}
      <text x="150" y="94" fontSize="9" textAnchor="end" fill="currentColor">ppm</text>
    </>
  ),
  // Flash column with separated bands, stopcock and collection tubes
  purification: (
    <>
      <path {...S} d="M66 6 H94 M70 6 V64 L76 72 V78 M90 6 V64 L84 72 V78" />
      <rect x="72" y="16" width="16" height="6" fill="var(--accent)" opacity="0.85" />
      <rect x="72" y="32" width="16" height="7" fill="currentColor" opacity="0.35" />
      <rect x="72" y="48" width="16" height="5" fill="currentColor" opacity="0.6" />
      <path {...S} d="M74 74 H86" />
      {[40, 64, 88, 112].map((x, i) => (
        <path key={x} {...(i === 1 ? A : S)} d={`M${x} 82 V92 a4 4 0 0 0 8 0 V82`} />
      ))}
    </>
  ),
  // Schlenk flask with side arm and tap under nitrogen
  'air-sensitive-techniques': (
    <>
      <circle {...S} cx="70" cy="64" r="22" />
      <path {...S} d="M64 43 V14 M76 43 V14 M60 14 H80" />
      <path {...S} d="M76 30 H110 M110 24 V36" />
      <circle {...A} cx="96" cy="30" r="5" />
      <path {...A} d="M93 30 H99" />
      <path d="M52 70 Q70 62 88 70 A22 22 0 0 1 52 70 Z" fill="var(--accent)" opacity="0.25" />
      <text x="116" y="34" fontSize="11" fill="currentColor">N₂</text>
    </>
  ),
  // Safety goggles
  safety: (
    <>
      <path {...S} d="M22 44 Q22 30 40 30 H120 Q138 30 138 44 V54 Q138 70 120 70 H98 Q90 70 86 62 Q80 54 74 62 Q70 70 62 70 H40 Q22 70 22 54 Z" />
      <path {...S} d="M22 46 H10 M138 46 H150" />
      <path {...A} d="M40 40 L52 52 M112 40 L124 52" />
    </>
  ),
  // Catalytic cycle around a metal centre
  'catalysis-toolkit': (
    <>
      <path {...S} d="M80 14 A34 34 0 0 1 113 56" />
      <path {...S} d="M108 66 A34 34 0 0 1 52 74" />
      <path {...S} d="M46 64 A34 34 0 0 1 72 15" />
      <path {...S} d="M110 49 l3 7 l6 -5 M58 76 l-7 0 l2 -7 M66 13 l7 2 l-4 6" />
      <circle cx="80" cy="48" r="12" fill="var(--accent)" opacity="0.2" />
      <text x="80" y="52" fontSize="12" fontWeight="700" textAnchor="middle" fill="var(--accent)">M</text>
    </>
  ),
  // Data table with a highlighted header row
  data: (
    <>
      <rect {...S} x="30" y="12" width="100" height="72" rx="4" />
      <rect x="31" y="13" width="98" height="14" fill="var(--accent)" opacity="0.25" />
      <path {...S} strokeWidth={1.5} d="M30 27 H130 M30 46 H130 M30 65 H130 M64 12 V84 M98 12 V84" />
    </>
  ),
  // TLC plate: baseline, solvent front and spots
  experimental: (
    <>
      <rect {...S} x="56" y="8" width="48" height="80" rx="3" />
      <path {...S} strokeWidth={1.5} strokeDasharray="3 3" d="M60 74 H100 M60 18 H100" />
      <circle cx="68" cy="34" r="4" fill="var(--accent)" />
      <circle cx="80" cy="52" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="92" cy="28" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="92" cy="60" r="3" fill="currentColor" opacity="0.35" />
    </>
  ),
  // Syringe pump feeding a coil reactor
  'flow-chemistry': (
    <>
      <rect {...S} x="8" y="36" width="30" height="16" rx="2" />
      <path {...S} d="M38 44 H50" />
      <path {...A} d="M50 44 C56 24 70 24 72 44 C74 64 88 64 90 44 C92 24 106 24 108 44 C110 64 124 64 126 44" />
      <path {...S} d="M126 44 H140 V60" />
      <path {...S} d="M134 60 H146 L142 76 H138 Z" />
    </>
  ),
  // Open book
  learning: (
    <>
      <path {...S} d="M80 24 Q60 14 28 18 V78 Q60 74 80 84 Q100 74 132 78 V18 Q100 14 80 24 Z" />
      <path {...S} d="M80 24 V84" />
      <path {...A} strokeWidth={1.5} d="M40 32 Q56 30 70 36 M40 44 Q56 42 70 48 M90 36 Q104 30 120 32" />
    </>
  ),
  // Manuscript page and pen
  'writing-presenting': (
    <>
      <path {...S} d="M42 10 H96 L112 26 V86 H42 Z M96 10 V26 H112" />
      <path {...S} strokeWidth={1.5} d="M52 40 H100 M52 52 H100 M52 64 H84" />
      <path {...A} d="M104 78 L134 48 L142 56 L112 86 L102 88 Z" />
    </>
  ),
};

export function ResourceIllustration({ id }: { id: string }) {
  const content = art[id];
  if (!content) return null;
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true" className="w-full h-full text-muted">
      {content}
    </svg>
  );
}
