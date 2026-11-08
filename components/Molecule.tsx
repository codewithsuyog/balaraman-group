// Skeletal formulas of substrates from our papers, drawn in code with one set of rules so they match:
// - same frame (100 × 64) and scale for every molecule, each centred in it
// - bond length 14, 120° zig-zags, pointy-top benzene rings with substituents leaving the upper-right corner
// - one label style (size 9.5, weight 600)
// - amber (accent) marks only the group that reacts; every other bond is in the text colour
// Coordinates are y-down.
import type { ReactElement } from 'react';

export type MoleculeName = 'benzylAlcohol' | 'propanediol' | 'methanol' | 'tetrahydroquinoline' | 'stilbene' | 'allylbenzene';

type P = [number, number];
const L = 14; // bond length
const FRAME = { w: 100, h: 64 };
const rad = (d: number) => (d * Math.PI) / 180;
const polar = ([x, y]: P, deg: number, len = L): P => [x + len * Math.cos(rad(deg)), y + len * Math.sin(rad(deg))];
const f = (n: number) => +n.toFixed(2);

const S = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', fill: 'none' } as const;
const A = { ...S, stroke: 'var(--accent)' } as const;

function Bond({ a, b, accent = false }: { a: P; b: P; accent?: boolean }) {
  return <line x1={f(a[0])} y1={f(a[1])} x2={f(b[0])} y2={f(b[1])} {...(accent ? A : S)} />;
}

// Double bond: main line plus a shorter parallel line on one side
function Double({ a, b, side = 1, accent = false }: { a: P; b: P; side?: 1 | -1; accent?: boolean }) {
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 3 * side, ny = (dx / len) * 3 * side;
  const k = 0.15;
  return (
    <>
      <Bond a={a} b={b} accent={accent} />
      <Bond a={[a[0] + dx * k + nx, a[1] + dy * k + ny]} b={[b[0] - dx * k + nx, b[1] - dy * k + ny]} accent={accent} />
    </>
  );
}

// Pointy-top hexagon; vertex i at angle -90 + 60i (0 top, 1 upper-right, 2 lower-right, 3 bottom, 4 lower-left, 5 upper-left)
const ringVertices = (c: P): P[] => Array.from({ length: 6 }, (_, i) => polar(c, -90 + 60 * i));

function Ring({ c, doubles = [0, 2, 4] }: { c: P; doubles?: number[] }) {
  const v = ringVertices(c);
  const inner = (p: P): P => [p[0] + (c[0] - p[0]) * 0.22, p[1] + (c[1] - p[1]) * 0.22];
  return (
    <>
      {v.map((p, i) => <Bond key={`e${i}`} a={p} b={v[(i + 1) % 6]} />)}
      {doubles.map((i) => {
        const a = inner(v[i]), b = inner(v[(i + 1) % 6]), t = 0.12;
        return <Bond key={`d${i}`} a={[a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]} b={[b[0] - (b[0] - a[0]) * t, b[1] - (b[1] - a[1]) * t]} />;
      })}
    </>
  );
}

const LABEL = { fontSize: 9.5, fontWeight: 600 } as const;
const CHAR_W = 6.2; // approximate label character width, for centring

function Label({ p, text, accent = false, anchor = 'start' }: { p: P; text: string; accent?: boolean; anchor?: 'start' | 'middle' }) {
  return (
    <text x={f(p[0])} y={f(p[1] + 3.4)} textAnchor={anchor} fill={accent ? 'var(--accent)' : 'currentColor'} {...LABEL}>
      {text}
    </text>
  );
}

// Stop a bond short of a label so the line doesn't run into the letters
const shorten = (a: P, b: P, cut = 4.5): P => {
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
  return [b[0] - (dx / len) * cut, b[1] - (dy / len) * cut];
};

type Drawing = { el: ReactElement; pts: P[] };

// Points of a label's box, so centring accounts for text
const labelPts = (p: P, text: string, anchor: 'start' | 'middle'): P[] => {
  const w = text.length * CHAR_W, x0 = anchor === 'start' ? p[0] : p[0] - w / 2;
  return [[x0, p[1] - 5], [x0 + w, p[1] + 5]];
};

function benzylAlcohol(): Drawing {
  const c: P = [0, 0], v = ringVertices(c);
  const ch2 = polar(v[1], -30), o = polar(ch2, 30);
  return {
    el: (
      <>
        <Ring c={c} />
        <Bond a={v[1]} b={ch2} />
        <Bond a={ch2} b={shorten(ch2, o)} />
        <Label p={[o[0] - 2, o[1]]} text="OH" accent />
      </>
    ),
    pts: [...v, ch2, ...labelPts([o[0] - 2, o[1]], 'OH', 'start')],
  };
}

function propanediol(): Drawing {
  const c1: P = [0, 0], c2 = polar(c1, -30), c3 = polar(c2, 30), o1 = polar(c3, -30), o2 = polar(c2, -90);
  return {
    el: (
      <>
        <Bond a={c1} b={c2} />
        <Bond a={c2} b={c3} />
        <Bond a={c3} b={shorten(c3, o1)} />
        <Bond a={c2} b={shorten(c2, o2, 5.5)} />
        <Label p={[o1[0] - 2, o1[1]]} text="OH" accent />
        <Label p={[o2[0], o2[1] - 2]} text="OH" accent anchor="middle" />
      </>
    ),
    pts: [c1, c2, c3, ...labelPts([o1[0] - 2, o1[1]], 'OH', 'start'), ...labelPts([o2[0], o2[1] - 2], 'OH', 'middle')],
  };
}

function methanol(): Drawing {
  // skeletal: the line end is the CH3 carbon
  const c: P = [0, 0], o = polar(c, -30);
  return {
    el: (
      <>
        <Bond a={c} b={shorten(c, o)} />
        <Label p={[o[0] - 2, o[1]]} text="OH" accent />
      </>
    ),
    pts: [c, ...labelPts([o[0] - 2, o[1]], 'OH', 'start')],
  };
}

function tetrahydroquinoline(): Drawing {
  // Ring A aromatic; ring B saturated, fused on ring A's right edge (C4a top, C8a bottom); N1 next to C8a
  const cA: P = [0, 0], cB: P = [2 * L * Math.cos(rad(30)), 0];
  const vA = ringVertices(cA), vB = ringVertices(cB);
  const n = vB[3];
  return {
    el: (
      <>
        <Ring c={cA} doubles={[0, 2, 4]} />
        <Bond a={vB[5]} b={vB[0]} />
        <Bond a={vB[0]} b={vB[1]} />
        <Bond a={vB[1]} b={vB[2]} />
        <Bond a={vB[2]} b={shorten(vB[2], n)} />
        <Bond a={vB[4]} b={shorten(vB[4], n)} />
        <Label p={[n[0], n[1] + 1.5]} text="NH" accent anchor="middle" />
      </>
    ),
    pts: [...vA, ...vB, ...labelPts([n[0], n[1] + 1.5], 'NH', 'middle')],
  };
}

function stilbene(): Drawing {
  const c1: P = [0, 0], v1 = ringVertices(c1);
  const a = polar(v1[1], -30), b = polar(a, 30), attach = polar(b, -30);
  const c2 = polar(attach, -30); // attach is ring 2's lower-left vertex
  return {
    el: (
      <>
        <Ring c={c1} />
        <Bond a={v1[1]} b={a} />
        <Double a={a} b={b} side={1} accent />
        <Bond a={b} b={attach} />
        <Ring c={c2} />
      </>
    ),
    pts: [...v1, ...ringVertices(c2)],
  };
}

function allylbenzene(): Drawing {
  // Ph–CH2–CH=CH2 with the benzylic/allylic C–H drawn explicitly
  const c: P = [0, 0], v = ringVertices(c);
  const ch2 = polar(v[1], -30), ch = polar(ch2, 30), term = polar(ch, -30);
  const h = polar(ch2, -90, 10);
  return {
    el: (
      <>
        <Ring c={c} />
        <Bond a={v[1]} b={ch2} />
        <Bond a={ch2} b={ch} />
        <Double a={ch} b={term} side={1} />
        <Bond a={ch2} b={h} accent />
        <Label p={[h[0], h[1] - 5]} text="H" accent anchor="middle" />
      </>
    ),
    pts: [...v, ch2, ch, term, ...labelPts([h[0], h[1] - 5], 'H', 'middle')],
  };
}

const draw: Record<MoleculeName, () => Drawing> = { benzylAlcohol, propanediol, methanol, tetrahydroquinoline, stilbene, allylbenzene };

// Centre a drawing in the shared frame without scaling it
function placed(name: MoleculeName): ReactElement {
  const { el, pts } = draw[name]();
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return <g transform={`translate(${f(FRAME.w / 2 - cx)} ${f(FRAME.h / 2 - cy)})`}>{el}</g>;
}

export const molecules: Record<MoleculeName, { label: string; draw: () => ReactElement; viewBox: string }> = Object.fromEntries(
  ([
    ['benzylAlcohol', 'Benzyl alcohol'],
    ['propanediol', 'Propane-1,2-diol'],
    ['methanol', 'Methanol'],
    ['tetrahydroquinoline', '1,2,3,4-Tetrahydroquinoline'],
    ['stilbene', '(E)-Stilbene'],
    ['allylbenzene', 'Allylbenzene'],
  ] as const).map(([k, label]) => [k, { label, draw: () => placed(k), viewBox: `0 0 ${FRAME.w} ${FRAME.h}` }]),
) as Record<MoleculeName, { label: string; draw: () => ReactElement; viewBox: string }>;

export function Molecule({ name, className = '' }: { name: MoleculeName; className?: string }) {
  const m = molecules[name];
  return (
    <svg viewBox={m.viewBox} role="img" aria-label={m.label} className={className}>
      {m.draw()}
    </svg>
  );
}
