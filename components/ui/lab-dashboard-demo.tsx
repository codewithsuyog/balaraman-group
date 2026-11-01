'use client';

/**
 * LabDashboardDemo — stageshow-style faux UI illustration
 *
 * Rules followed (Emil / stageshow craft):
 * - Dark theme, one accent color (amber), quiet grays for filler
 * - Real strings only on what the story is about (3–5 strings)
 * - Bars (placeholder lines) for everything else
 * - Transitions, not keyframes, for rapid-trigger elements
 * - No scale(0); enters from scale(0.97) + opacity
 * - Animate transform + opacity only (GPU only)
 * - prefers-reduced-motion: cross-fades only, no movement
 * - Story: counter rolls → new publication row appears → team badge pops in
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FlaskConical, BookOpen, Users, TrendingUp, Zap } from 'lucide-react';

// ── tiny bar filler ──────────────────────────────────────────────────────────
function Bar({ w, opacity = 0.18 }: { w: number; opacity?: number }) {
  return (
    <div
      style={{
        width: `${w}%`,
        height: 7,
        borderRadius: 4,
        background: `rgba(255,255,255,${opacity})`,
      }}
    />
  );
}

// ── animated rolling number ──────────────────────────────────────────────────
function RollingNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value - 1);
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (started.current || reduce) { setDisplay(value); return; }
    started.current = true;
    const start = value - 3;
    let cur = start;
    const step = () => {
      cur += 1;
      setDisplay(cur);
      if (cur < value) setTimeout(step, 160);
    };
    setTimeout(step, 800);
  }, [value, reduce]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

// ── publication row ──────────────────────────────────────────────────────────
interface PubRow {
  journal: string;
  year: string;
  tag: string;
  tagColor: string;
  bars: [number, number];
}

const PUB_ROWS: PubRow[] = [
  {
    journal: 'J. Am. Chem. Soc.',
    year: '2024',
    tag: 'Catalysis',
    tagColor: 'rgba(251,191,36,0.15)',
    bars: [72, 48],
  },
  {
    journal: 'Angew. Chem. Int. Ed.',
    year: '2024',
    tag: 'Organometallics',
    tagColor: 'rgba(52,211,153,0.12)',
    bars: [65, 55],
  },
  {
    journal: 'ACS Catal.',
    year: '2023',
    tag: 'Heterogeneous',
    tagColor: 'rgba(139,92,246,0.12)',
    bars: [58, 42],
  },
];

function PubRowItem({ row, delay = 0 }: { row: PubRow; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(8px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1], delay }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        marginBottom: 6,
      }}
    >
      {/* journal icon */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: 'rgba(251,191,36,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <BookOpen size={12} color="#fbbf24" />
      </div>

      {/* text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.journal}
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'monospace',
              flexShrink: 0,
            }}
          >
            {row.year}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Bar w={row.bars[0]} />
          <Bar w={row.bars[1]} />
        </div>
      </div>

      {/* tag */}
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.5)',
          background: row.tagColor,
          padding: '2px 7px',
          borderRadius: 20,
          letterSpacing: '0.05em',
          flexShrink: 0,
          textTransform: 'uppercase',
        }}
      >
        {row.tag}
      </span>
    </motion.div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export function LabDashboardDemo() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [showNewPub, setShowNewPub] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setPhase(2); setShowNewPub(true); return; }
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setShowNewPub(true), 2400);
    const t3 = setTimeout(() => setPhase(2), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        maxWidth: 660,
        margin: '0 auto',
        borderRadius: 24,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0d14 0%, #0f1520 50%, #0a0d14 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
      }}
    >
      {/* ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(251,191,36,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── titlebar ── */}
      <div
        style={{
          height: 38,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 6,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}
          >
            lab.ebalaraman.com — Dashboard
          </span>
        </div>
      </div>

      {/* ── body ── */}
      <div style={{ display: 'flex', height: 300, position: 'relative', zIndex: 1 }}>

        {/* ── sidebar ── */}
        <div
          style={{
            width: 44,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '14px 0',
            gap: 16,
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          {[FlaskConical, BookOpen, Users, TrendingUp, Zap].map((Icon, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: i === 0 ? 'rgba(251,191,36,0.15)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={13} color={i === 0 ? '#fbbf24' : 'rgba(255,255,255,0.2)'} />
            </div>
          ))}
        </div>

        {/* ── main content ── */}
        <div style={{ flex: 1, padding: '14px 16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* ── stat row ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {/* Publications stat */}
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '10px 12px',
              }}
            >
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Publications
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>
                <RollingNumber value={phase >= 1 ? 117 : 114} />
              </div>
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 3, borderRadius: 2, background: 'rgba(251,191,36,0.15)', overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: '#fbbf24', borderRadius: 2 }}
                    animate={{ width: phase >= 1 ? '92%' : '89%' }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </div>
            </div>

            {/* Citations stat */}
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '10px 12px',
              }}
            >
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Citations
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>
                5.4K
              </div>
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '74%', background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
                </div>
              </div>
            </div>

            {/* Team stat */}
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '10px 12px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Team
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>
                <RollingNumber value={phase >= 2 ? 24 : 23} />
              </div>
              {/* new member badge */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, transform: 'scale(0.85) translateY(4px)' }}
                    animate={{ opacity: 1, transform: 'scale(1) translateY(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontSize: 8,
                      fontWeight: 800,
                      color: '#34d399',
                      background: 'rgba(52,211,153,0.12)',
                      border: '1px solid rgba(52,211,153,0.2)',
                      padding: '2px 5px',
                      borderRadius: 8,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    +1
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: 'rgba(52,211,153,0.5)', borderRadius: 2 }}
                    animate={{ width: phase >= 2 ? '68%' : '64%' }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── publications list ── */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Recent Publications
              </span>
              <span style={{ fontSize: 9, color: 'rgba(251,191,36,0.6)', fontWeight: 700, fontFamily: 'monospace' }}>
                View all →
              </span>
            </div>

            {/* new pub notification */}
            <AnimatePresence>
              {showNewPub && (
                <motion.div
                  initial={{ opacity: 0, transform: 'translateY(-6px) scale(0.97)' }}
                  animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
                  transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    borderRadius: 10,
                    background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    marginBottom: 6,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                    Nature Chem. — Accepted
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: 9, color: 'rgba(251,191,36,0.7)', fontFamily: 'monospace', fontWeight: 700 }}>
                    NEW
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {PUB_ROWS.map((row, i) => (
              <PubRowItem key={row.journal} row={row} delay={i * 0.06} />
            ))}
          </div>
        </div>

        {/* ── right panel (activity feed) ── */}
        <div
          style={{
            width: 140,
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            padding: '14px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: 'rgba(255,255,255,0.01)',
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Activity
          </span>

          {[
            { label: 'Reaction yield', value: '94%', color: '#34d399', barW: 88 },
            { label: 'H₂ turnover', value: '1240', color: '#fbbf24', barW: 72 },
            { label: 'Selectivity', value: '>99%', color: '#a78bfa', barW: 96 },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{item.label}</span>
                <span style={{ fontSize: 10, color: item.color, fontWeight: 800, fontFamily: 'monospace' }}>{item.value}</span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.barW}%`, background: item.color, opacity: 0.5, borderRadius: 2 }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Ongoing
            </span>
            {[68, 52, 78].map((w, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 3 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.06)' }} />
                  <Bar w={w} opacity={0.12} />
                </div>
                <Bar w={w - 12} opacity={0.07} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom fade mask — fades into page */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'linear-gradient(to bottom, transparent, rgba(10,13,20,0.95))',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </div>
  );
}
