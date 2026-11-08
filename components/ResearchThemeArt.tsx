// Research theme illustrations: a small pedestal with a line drawing and element tiles.
// Drawn in code so they follow the site theme (currentColor + accent). Decorative: aria-hidden.
import type { ReactElement } from 'react';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const A = { ...S, stroke: 'var(--accent)' } as const;

type Tile = { sym: string; num?: number };

const drawings: Record<string, { art: ReactElement; tiles: Tile[] }> = {
  // Pincer complex: metal centre held by a P–N–P ligand, with a bound substrate
  homogeneous: {
    art: (
      <>
        <path {...S} d="M58 64 L80 40 L102 64" />
        <path {...S} d="M58 64 Q80 82 102 64" />
        <circle {...S} cx="58" cy="64" r="7" />
        <circle {...S} cx="102" cy="64" r="7" />
        <circle {...S} cx="80" cy="82" r="7" />
        <text x="58" y="67.5" fontSize="9" textAnchor="middle" fill="currentColor">P</text>
        <text x="102" y="67.5" fontSize="9" textAnchor="middle" fill="currentColor">P</text>
        <text x="80" y="85.5" fontSize="9" textAnchor="middle" fill="currentColor">N</text>
        <circle cx="80" cy="40" r="11" fill="var(--accent)" opacity="0.2" />
        <circle {...A} cx="80" cy="40" r="11" />
        <text x="80" y="44" fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--accent)">M</text>
        <path {...S} d="M80 29 V14 M74 10 H86" />
      </>
    ),
    tiles: [{ sym: 'Mn', num: 25 }, { sym: 'Fe', num: 26 }, { sym: 'Co', num: 27 }, { sym: 'Ni', num: 28 }],
  },
  // Metal nanoparticles sitting on a carbon sheet
  heterogeneous: {
    art: (
      <>
        <path {...S} strokeWidth={1.5} d="M40 70 L60 58 L80 70 L100 58 L120 70 M40 70 L40 50 M60 58 L60 38 M80 70 L80 50 M100 58 L100 38 M120 70 L120 50 M40 50 L60 38 L80 50 L100 38 L120 50" />
        {[[52, 36], [80, 30], [108, 36], [66, 24], [94, 22]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="var(--accent)" opacity="0.85" />
        ))}
      </>
    ),
    tiles: [{ sym: 'Ni', num: 28 }, { sym: 'Co', num: 27 }, { sym: 'N/C' }],
  },
  // Methanol releasing hydrogen
  'c1-hydrogen': {
    art: (
      <>
        <circle {...S} cx="64" cy="58" r="10" />
        <text x="64" y="62" fontSize="10" textAnchor="middle" fill="currentColor">C</text>
        <circle {...A} cx="88" cy="46" r="9" />
        <text x="88" y="50" fontSize="10" textAnchor="middle" fill="var(--accent)">O</text>
        <path {...S} d="M73 53 L80 49 M56 66 L48 74 M64 68 V80 M55 51 L47 44 M95 40 L102 34" />
        <path {...A} d="M108 22 L120 22" />
        <circle {...A} cx="105" cy="22" r="5" />
        <circle {...A} cx="123" cy="22" r="5" />
        <path {...S} strokeWidth={1.5} strokeDasharray="2 4" d="M100 32 Q104 28 104 27" />
      </>
    ),
    tiles: [{ sym: 'H', num: 1 }, { sym: 'C', num: 6 }],
  },
  // Light falling on a porous framework
  light: {
    art: (
      <>
        <circle {...A} cx="44" cy="22" r="8" />
        <path {...A} strokeWidth={1.5} d="M44 8 V4 M30 22 H26 M34 12 L31 9 M54 12 L57 9" />
        <path {...A} strokeWidth={1.5} strokeDasharray="4 4" d="M52 30 L70 46 M44 32 L58 52" />
        <path {...S} d="M80 34 L94 42 L94 58 L80 66 L66 58 L66 42 Z" />
        <path {...S} d="M94 42 L108 34 L122 42 L122 58 L108 66 L94 58" />
        <path {...S} strokeWidth={1.5} d="M80 34 V24 M108 34 V24 M80 66 V76 M108 66 V76" />
      </>
    ),
    tiles: [{ sym: 'hν' }, { sym: 'Cu', num: 29 }],
  },
  // Benzene ring with the C–H bond being turned into a new bond
  'ch-activation': {
    art: (
      <>
        <path {...S} d="M70 30 L88 40 L88 60 L70 70 L52 60 L52 40 Z" />
        <path {...S} strokeWidth={1.5} d="M57 43 V57 M70 64 L83 57 M83 43 L70 36" />
        <path {...S} d="M88 40 L100 33" />
        <text x="106" y="33" fontSize="10" fill="currentColor">H</text>
        <path {...A} d="M100 50 C110 50 114 44 118 38" />
        <path {...A} d="M113 38 H119 V44" />
      </>
    ),
    tiles: [{ sym: 'Co', num: 27 }, { sym: 'Rh', num: 45 }],
  },
};

// Element tile in the style of a periodic-table square
function ElementTile({ t, x }: { t: Tile; x: number }) {
  return (
    <g transform={`translate(${x} 96)`}>
      <rect width="22" height="22" rx="3" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      {t.num !== undefined && <text x="3" y="7.5" fontSize="5.5" fill="currentColor">{t.num}</text>}
      <text x="11" y={t.num !== undefined ? 17 : 14.5} fontSize={t.sym.length > 2 ? 7 : 9} fontWeight="700" textAnchor="middle" fill="var(--accent)">{t.sym}</text>
    </g>
  );
}

export function ResearchThemeArt({ id, className = '' }: { id: string; className?: string }) {
  const d = drawings[id];
  if (!d) return null;
  const start = 80 - (d.tiles.length * 26 - 4) / 2;
  return (
    <svg viewBox="0 0 160 124" aria-hidden="true" className={`text-muted ${className}`}>
      {/* pedestal */}
      <path d="M24 88 L80 72 L136 88 L80 104 Z" fill="var(--raised)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 88 V94 L80 110 L136 94 V88" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      {d.art}
      {d.tiles.map((t, i) => <ElementTile key={t.sym} t={t} x={start + i * 26} />)}
    </svg>
  );
}
