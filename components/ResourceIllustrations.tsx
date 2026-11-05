// Small line illustrations for the Resources sections, drawn in code so they follow the
// site theme (lines use currentColor, highlights use the accent). Decorative: aria-hidden.
import type { ReactElement } from 'react';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const A = { ...S, stroke: 'var(--accent)' } as const;

const art: Record<string, ReactElement> = {
  // 1H NMR spectrum with one highlighted peak and a ppm axis
  nmr: (
    <>
      <path {...S} d="M10 78 H150" />
      <path {...S} d="M14 76 L30 76 L33 40 L36 76 L58 76 L60 58 L62 76 L64 52 L66 76 L96 76 L98 64 L100 76 L128 76 L130 70 L132 76 L146 76" />
      <path {...A} d="M44 76 L47 18 L50 76" />
      {[20, 50, 80, 110, 140].map((x) => <path key={x} {...S} strokeWidth={1.5} d={`M${x} 78 v5`} />)}
      <text x="150" y="94" fontSize="9" textAnchor="end" fill="currentColor">ppm</text>
    </>
  ),
  // Flash column with separated bands, stopcock and collection tubes
  chromatography: (
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
  'air-sensitive': (
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
  catalysis: (
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
  // Syringe pump feeding a coil reactor
  flow: (
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
  // Mass spectrum: molecular ion with its isotope cluster highlighted
  characterization: (
    <>
      <path {...S} d="M12 82 H148" />
      {[[26, 30], [44, 52], [60, 40], [78, 64]].map(([x, h]) => <path key={x} {...S} d={`M${x} 82 V${82 - h}`} />)}
      <path {...A} strokeWidth={3} d="M108 82 V20 M118 82 V44 M128 82 V70" />
      <text x="118" y="14" fontSize="9" textAnchor="middle" fill="var(--accent)">M⁺</text>
    </>
  ),
  // Separatory funnel with two layers
  workup: (
    <>
      <path {...S} d="M74 8 H86 M76 8 V16 Q48 30 52 54 Q56 70 76 74 V86 M84 8 V16 Q112 30 108 54 Q104 70 84 74 V86" />
      <path d="M53 46 Q80 40 107 46 Q106 66 84 72 H76 Q54 66 53 46 Z" fill="var(--accent)" opacity="0.3" />
      <path {...S} strokeWidth={1.5} d="M54 46 Q80 40 106 46" />
      <path {...S} d="M70 80 H90" />
    </>
  ),
  // Crystals: hexagonal prisms
  isolation: (
    <>
      <path {...A} d="M62 82 L54 70 V34 L62 22 L70 34 V70 Z M54 34 H70" />
      <path {...S} d="M84 84 L76 74 V46 L84 36 L92 46 V74 Z M76 46 H92" />
      <path {...S} d="M104 84 L98 76 V58 L104 50 L110 58 V76 Z M98 58 H110" />
      <path {...S} d="M40 86 H124" />
    </>
  ),
  // Round-bottom flask on a stirrer hotplate
  reactions: (
    <>
      <circle {...S} cx="80" cy="46" r="20" />
      <path {...S} d="M74 27 V8 M86 27 V8 M70 8 H90" />
      <path d="M62 52 Q80 44 98 52 A20 20 0 0 1 62 52 Z" fill="var(--accent)" opacity="0.3" />
      <rect x="74" y="58" width="12" height="4" rx="2" fill="var(--accent)" />
      <rect {...S} x="40" y="70" width="80" height="16" rx="3" />
      <circle {...S} cx="104" cy="78" r="3" />
    </>
  ),
  // Lab notebook with a checklist
  practice: (
    <>
      <rect {...S} x="48" y="10" width="64" height="78" rx="3" />
      <path {...S} d="M58 10 V88" />
      <path {...A} d="M66 28 l4 4 l8 -8 M66 48 l4 4 l8 -8" />
      <path {...S} strokeWidth={1.5} d="M84 30 H102 M84 50 H102 M66 70 H102" />
    </>
  ),
  // Reagent bottle with label
  reagents: (
    <>
      <path {...S} d="M70 8 H90 V20 Q104 24 104 40 V84 H56 V40 Q56 24 70 20 Z" />
      <rect x="62" y="46" width="36" height="24" rx="2" fill="var(--accent)" opacity="0.25" />
      <path {...S} strokeWidth={1.5} d="M68 54 H92 M68 62 H84" />
    </>
  ),
  // Leaf and droplet
  greener: (
    <>
      <path {...A} d="M60 78 Q50 30 104 18 Q114 70 60 78 Z" />
      <path {...S} d="M60 78 Q80 50 98 28" />
      <path {...S} d="M118 56 Q112 66 112 72 a6 6 0 0 0 12 0 Q124 66 118 56 Z" />
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
