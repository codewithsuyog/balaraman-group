// Research theme illustration: a small pedestal carrying the theme's analogy picture, with element tiles.
// Follows the site theme (currentColor + accent). In the theme map it is decorative (the link has text);
// in each theme section it is labelled with what the picture shows.
import { themeArt, THEME_ART_VIEWBOX, type ThemeArtName } from '@/components/ThemeArt';
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

export function ResearchThemeArt({ art, tiles, labelled = false, className = '' }: {
  art: ThemeArtName;
  tiles: Tile[];
  labelled?: boolean;
  className?: string;
}) {
  const a = themeArt[art];
  const start = 80 - (tiles.length * 26 - 4) / 2;
  const a11y = labelled ? { role: 'img', 'aria-label': a.label } : { 'aria-hidden': true };
  return (
    // .draw: the picture's lines draw in as it scrolls into view
    <svg viewBox="0 0 160 124" className={`draw text-muted ${className}`} {...a11y}>
      {/* the picture, in the foreground colour, above the pedestal */}
      <svg x="22" y="4" width="116" height="74" viewBox={THEME_ART_VIEWBOX} className="text-foreground">
        {a.el}
      </svg>
      {/* pedestal */}
      <path d="M24 90 L80 74 L136 90 L80 106 Z" fill="var(--raised)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 90 V96 L80 112 L136 96 V90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      {tiles.map((t) => <ElementTile key={t.sym} t={t} x={start + tiles.indexOf(t) * 26} />)}
    </svg>
  );
}
