// Skeletal formulas of substrates from our papers, drawn in code (bond length 14, standard 120° angles).
// Lines use currentColor; the reacting atoms/bonds use the accent colour. Coordinates are y-down.
import type { ReactElement } from 'react';

export type MoleculeName = 'benzylAlcohol' | 'propanediol' | 'methanol' | 'tetrahydroquinoline' | 'stilbene' | 'allylbenzene';

type P = [number, number];
const L = 14; // bond length
const rad = (d: number) => (d * Math.PI) / 180;
const polar = ([x, y]: P, deg: number, len = L): P => [x + len * Math.cos(rad(deg)), y + len * Math.sin(rad(deg))];
const f = (n: number) => +n.toFixed(2);

const S = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', fill: 'none' } as const;
const A = { ...S, stroke: 'var(--accent)' } as const;

function Bond({ a, b, accent = false }: { a: P; b: P; accent?: boolean }) {
  return <line x1={f(a[0])} y1={f(a[1])} x2={f(b[0])} y2={f(b[1])} {...(accent ? A : S)} />;
}

// Double bond: the main line plus a shorter parallel line on one side (side = +1 or -1)
function Double({ a, b, side = 1, accent = false }: { a: P; b: P; side?: 1 | -1; accent?: boolean }) {
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 3 * side, ny = (dx / len) * 3 * side;
  const shrink = 0.15;
  const a2: P = [a[0] + dx * shrink + nx, a[1] + dy * shrink + ny];
  const b2: P = [b[0] - dx * shrink + nx, b[1] - dy * shrink + ny];
  return <><Bond a={a} b={b} accent={accent} /><Bond a={a2} b={b2} accent={accent} /></>;
}

// Pointy-top hexagon; vertex i sits at angle -90 + 60i. Aromatic rings get three inner double bonds.
function ringVertices(c: P): P[] {
  return Array.from({ length: 6 }, (_, i) => polar(c, -90 + 60 * i));
}
function Ring({ c, aromatic = true, doubles = [0, 2, 4] }: { c: P; aromatic?: boolean; doubles?: number[] }) {
  const v = ringVertices(c);
  return (
    <>
      {v.map((p, i) => <Bond key={`e${i}`} a={p} b={v[(i + 1) % 6]} />)}
      {aromatic && doubles.map((i) => {
        const a = v[i], b = v[(i + 1) % 6];
        const pull = (p: P): P => [p[0] + (c[0] - p[0]) * 0.22, p[1] + (c[1] - p[1]) * 0.22];
        const a2 = pull(a), b2 = pull(b);
        const t = 0.12;
        return <Bond key={`d${i}`} a={[a2[0] + (b2[0] - a2[0]) * t, a2[1] + (b2[1] - a2[1]) * t]} b={[b2[0] - (b2[0] - a2[0]) * t, b2[1] - (b2[1] - a2[1]) * t]} />;
      })}
    </>
  );
}

function Label({ p, text, accent = false, anchor = 'middle', dy = 3.5 }: { p: P; text: string; accent?: boolean; anchor?: 'start' | 'middle' | 'end'; dy?: number }) {
  return (
    <text x={f(p[0])} y={f(p[1] + dy)} fontSize="9.5" textAnchor={anchor} fill={accent ? 'var(--accent)' : 'currentColor'} fontWeight={accent ? 700 : 500}>
      {text}
    </text>
  );
}

// Shortens a bond so it stops before a text label at its end
const toward = (a: P, b: P, cut = 5): P => {
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
  return [b[0] - (dx / len) * cut, b[1] - (dy / len) * cut];
};

function benzylAlcohol(): ReactElement {
  // Ph–CH2–OH; the O–H and benzylic C–H are removed in dehydrogenation
  const c: P = [24, 34];
  const v = ringVertices(c);
  const ch2 = polar(v[1], -30), o = polar(ch2, 30);
  return (
    <>
      <Ring c={c} />
      <Bond a={v[1]} b={ch2} />
      <Bond a={ch2} b={toward(ch2, o)} accent />
      <Label p={o} text="OH" accent anchor="start" dy={3.5} />
    </>
  );
}

function propanediol(): ReactElement {
  // CH3–CH(OH)–CH2–OH (propane-1,2-diol)
  const c1: P = [10, 40], c2 = polar(c1, -30), c3 = polar(c2, 30), o1 = polar(c3, -30), o2 = polar(c2, -90);
  return (
    <>
      <Bond a={c1} b={c2} />
      <Bond a={c2} b={c3} />
      <Bond a={c3} b={toward(c3, o1)} accent />
      <Bond a={c2} b={toward(c2, o2)} accent />
      <Label p={o1} text="OH" accent anchor="start" />
      <Label p={o2} text="OH" accent dy={0} />
    </>
  );
}

function methanol(): ReactElement {
  // H3C–OH
  const c: P = [16, 30], o = polar(c, 0, 20);
  return (
    <>
      <Label p={c} text="H₃C" anchor="middle" />
      <Bond a={[c[0] + 9, c[1]]} b={[o[0] - 1, o[1]]} accent />
      <Label p={o} text="OH" accent anchor="start" dy={3.5} />
    </>
  );
}

function tetrahydroquinoline(): ReactElement {
  // Benzene ring fused to a saturated ring with N1–H next to C8a
  const cA: P = [20, 32];
  const cB: P = [cA[0] + 2 * L * Math.cos(rad(30)), cA[1]];
  const vB = ringVertices(cB);
  // vB[4] (C8a) and vB[5] (C4a) are shared with ring A; N1 sits at vB[3]; C2–C3–C4 (accent) become aromatic on dehydrogenation
  const n = vB[3];
  return (
    <>
      <Ring c={cA} doubles={[0, 2, 4]} />
      <Bond a={vB[5]} b={vB[0]} />
      <Bond a={vB[0]} b={vB[1]} accent />
      <Bond a={vB[1]} b={vB[2]} accent />
      <Bond a={vB[2]} b={toward(vB[2], n)} />
      <Bond a={vB[4]} b={toward(vB[4], n)} />
      <Label p={n} text="NH" accent dy={7} />
    </>
  );
}

function stilbene(): ReactElement {
  // (E)-Ph–CH=CH–Ph
  const c1: P = [16, 40];
  const v1 = ringVertices(c1);
  const a = polar(v1[1], -30), b = polar(a, 30), attach = polar(b, -30);
  const c2 = polar(attach, -30, L); // centre of ring 2: attach vertex is its lower-left vertex (index 4)
  return (
    <>
      <Ring c={c1} />
      <Bond a={v1[1]} b={a} />
      <Double a={a} b={b} side={1} accent />
      <Bond a={b} b={attach} />
      <Ring c={c2} />
    </>
  );
}

function allylbenzene(): ReactElement {
  // Ph–CH2–CH=CH2, with the allylic/benzylic C–H highlighted
  const c: P = [20, 38];
  const v = ringVertices(c);
  const ch2 = polar(v[1], -30), ch = polar(ch2, 30), term = polar(ch, -30);
  const h = polar(ch2, -90, 10);
  return (
    <>
      <Ring c={c} />
      <Bond a={v[1]} b={ch2} />
      <Bond a={ch2} b={ch} />
      <Double a={ch} b={term} side={1} />
      <Bond a={ch2} b={h} accent />
      <Label p={polar(ch2, -90, 14)} text="H" accent dy={0} />
    </>
  );
}

// name, accessible label, drawing and its viewBox
export const molecules: Record<MoleculeName, { label: string; draw: () => ReactElement; viewBox: string }> = {
  benzylAlcohol: { label: 'Benzyl alcohol', draw: benzylAlcohol, viewBox: '0 10 82 46' },
  propanediol: { label: 'Propane-1,2-diol', draw: propanediol, viewBox: '0 12 70 40' },
  methanol: { label: 'Methanol', draw: methanol, viewBox: '0 16 56 26' },
  tetrahydroquinoline: { label: '1,2,3,4-Tetrahydroquinoline', draw: tetrahydroquinoline, viewBox: '0 10 66 48' },
  stilbene: { label: '(E)-Stilbene', draw: stilbene, viewBox: '-2 4 92 54' },
  allylbenzene: { label: 'Allylbenzene', draw: allylbenzene, viewBox: '0 -2 82 58' },
};

export function Molecule({ name, className = '' }: { name: MoleculeName; className?: string }) {
  const m = molecules[name];
  return (
    <svg viewBox={m.viewBox} role="img" aria-label={m.label} className={className}>
      {m.draw()}
    </svg>
  );
}
