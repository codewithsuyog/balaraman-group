// Research theme illustration: a small pedestal carrying a substrate from our papers, with element tiles.
// Follows the site theme (currentColor + accent). In the theme map it is decorative (the link has text);
// in each theme section it is labelled with the molecule name.
import { molecules, type MoleculeName } from '@/components/Molecule';
import type { Tile } from '@/app/research-themes';

function ElementTile({ t, x }: { t: Tile; x: number }) {
  return (
    <g transform={`translate(${x} 98)`}>
      <rect width="22" height="22" rx="3" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      {t.num !== undefined && <text x="3" y="7.5" fontSize="5.5" fill="currentColor">{t.num}</text>}
      <text x="11" y={t.num !== undefined ? 17 : 14.5} fontSize="9" fontWeight="700" textAnchor="middle" fill="var(--accent)">{t.sym}</text>
    </g>
  );
}

export function ResearchThemeArt({ molecule, tiles, labelled = false, className = '' }: {
  molecule: MoleculeName;
  tiles: Tile[];
  labelled?: boolean;
  className?: string;
}) {
  const m = molecules[molecule];
  const start = 80 - (tiles.length * 26 - 4) / 2;
  const a11y = labelled ? { role: 'img', 'aria-label': m.label } : { 'aria-hidden': true };
  return (
    <svg viewBox="0 0 160 124" className={`text-muted ${className}`} {...a11y}>
      {/* pedestal */}
      <path d="M24 90 L80 74 L136 90 L80 106 Z" fill="var(--raised)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 90 V96 L80 112 L136 96 V90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      {/* the molecule, in the foreground colour, fitted above the pedestal */}
      <svg x="22" y="2" width="116" height="76" viewBox={m.viewBox} className="text-foreground">
        {m.draw()}
      </svg>
      {tiles.map((t) => <ElementTile key={t.sym} t={t} x={start + tiles.indexOf(t) * 26} />)}
    </svg>
  );
}
