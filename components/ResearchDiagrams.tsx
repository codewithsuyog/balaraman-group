// Concept diagrams for the two research areas. Plain SVG that follows the site theme:
// lines and text use currentColor / theme variables, the catalyst uses the accent.

const Arrow = ({ id }: { id: string }) => (
  <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
  </marker>
);

export function HomogeneousDiagram() {
  const species = [
    { x: 70, label: 'R–CH₂OH', sub: 'alcohol' },
    { x: 245, label: 'R–CHO', sub: 'aldehyde' },
    { x: 410, label: 'R–CH=NR′', sub: 'imine' },
    { x: 575, label: 'R–CH₂–NHR′', sub: 'amine' },
  ];
  return (
    <svg
      viewBox="0 0 650 300"
      role="img"
      aria-label="Borrowing hydrogen: a pincer metal catalyst takes hydrogen from an alcohol to give an aldehyde, which condenses with an amine to an imine; the catalyst returns the hydrogen to give the amine product, or releases it as hydrogen gas in acceptorless dehydrogenation."
      className="w-full h-auto text-foreground"
    >
      <defs><Arrow id="hom-arrow" /></defs>

      {/* catalyst */}
      <rect x="255" y="52" width="140" height="48" rx="10" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <text x="325" y="82" textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--accent)">[M]–H₂</text>
      <text x="325" y="122" textAnchor="middle" fontSize="13" fill="var(--muted)">pincer catalyst</text>

      {/* acceptorless branch */}
      <line x1="325" y1="50" x2="325" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#hom-arrow)" />
      <text x="337" y="26" fontSize="14" fill="currentColor">H₂ ↑</text>
      <text x="372" y="26" fontSize="13" fill="var(--muted)">acceptorless</text>

      {/* hydrogen borrowed and returned */}
      <path d="M150 205 C 160 120, 200 78, 252 76" fill="none" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#hom-arrow)" />
      <text x="168" y="128" fontSize="14" fill="var(--accent)">−H₂</text>
      <path d="M398 76 C 450 78, 490 120, 495 202" fill="none" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#hom-arrow)" />
      <text x="462" y="128" fontSize="14" fill="var(--accent)">+H₂</text>

      {/* substrate pathway */}
      {species.map((s) => (
        <g key={s.label}>
          <text x={s.x} y="232" textAnchor="middle" fontSize="18" fontWeight="600" fill="currentColor">{s.label}</text>
          <text x={s.x} y="254" textAnchor="middle" fontSize="13" fill="var(--muted)">{s.sub}</text>
        </g>
      ))}
      <line x1="120" y1="226" x2="190" y2="226" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#hom-arrow)" />
      <line x1="292" y1="226" x2="350" y2="226" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#hom-arrow)" />
      <line x1="468" y1="226" x2="510" y2="226" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#hom-arrow)" />
      <text x="321" y="282" textAnchor="middle" fontSize="13" fill="var(--muted)">+ R′NH₂, − H₂O</text>
    </svg>
  );
}

export function HeterogeneousDiagram() {
  // Two rows of a pointy-top hexagon lattice for the graphene support
  const s = 17;
  const w = Math.sqrt(3) * s;
  const hexes: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 12; col++) {
      hexes.push({ cx: 150 + col * w + (row % 2) * (w / 2), cy: 222 + row * 1.5 * s });
    }
  }
  const hexPoints = (cx: number, cy: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 180) * (60 * k - 30);
      return `${(cx + s * Math.cos(a)).toFixed(1)},${(cy + s * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  const nitrogen = [hexes[2], hexes[6], hexes[9], hexes[15], hexes[20]];
  const particles = [240, 350, 460];

  return (
    <svg
      viewBox="0 0 650 300"
      role="img"
      aria-label="Heterogeneous catalysis: 3d-metal nanoparticles on a nitrogen-doped graphene support convert alcohols, carbon dioxide and biomass or plastics into amines, fuels, chemicals and hydrogen; the solid catalyst is recovered and reused."
      className="w-full h-auto text-foreground"
    >
      <defs><Arrow id="het-arrow" /></defs>

      {/* support */}
      {hexes.map((h, i) => (
        <polygon key={i} points={hexPoints(h.cx, h.cy)} fill="none" stroke="var(--muted)" strokeWidth="1.2" />
      ))}
      {nitrogen.map((h, i) => (
        <g key={`n${i}`}>
          <circle cx={h.cx} cy={h.cy - s} r="6" fill="var(--surface)" stroke="currentColor" strokeWidth="1.2" />
          <text x={h.cx} y={h.cy - s + 3.5} textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">N</text>
        </g>
      ))}

      {/* metal nanoparticles, core and shell */}
      {particles.map((x) => (
        <g key={x}>
          <circle cx={x} cy="182" r="22" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <circle cx={x} cy="182" r="13" fill="var(--accent)" opacity="0.85" />
        </g>
      ))}
      <text x="350" y="140" textAnchor="middle" fontSize="13" fill="var(--muted)">3d-metal nanoparticles</text>

      {/* feedstocks in */}
      <text x="20" y="110" fontSize="15" fontWeight="600" fill="currentColor">alcohols</text>
      <text x="20" y="136" fontSize="15" fontWeight="600" fill="currentColor">CO₂</text>
      <text x="20" y="162" fontSize="15" fontWeight="600" fill="currentColor">biomass, plastics</text>
      <path d="M150 140 C 180 140, 195 160, 214 172" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#het-arrow)" />

      {/* products out */}
      <path d="M486 172 C 505 160, 520 140, 548 138" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#het-arrow)" />
      <text x="556" y="110" fontSize="15" fontWeight="600" fill="currentColor">amines</text>
      <text x="556" y="136" fontSize="15" fontWeight="600" fill="currentColor">fuels,</text>
      <text x="556" y="156" fontSize="15" fontWeight="600" fill="currentColor">chemicals</text>
      <text x="556" y="182" fontSize="15" fontWeight="600" fill="currentColor">H₂</text>

      <text x="350" y="290" textAnchor="middle" fontSize="13" fill="var(--muted)">N-doped carbon / graphene support · recovered and reused</text>
    </svg>
  );
}
