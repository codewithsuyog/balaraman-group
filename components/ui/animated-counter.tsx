'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  formatCommas?: boolean;
  className?: string;
}

const format = (n: number, commas: boolean) => (commas ? n.toLocaleString('en-US') : String(n));

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  formatCommas = false,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  // Server HTML shows the real value so crawlers and link previews never see "0".
  // The spring starts at 0, so the count-up still plays once the counter scrolls into view.
  const [displayValue, setDisplayValue] = useState(() => format(target, formatCommas));

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(format(Math.round(latest), formatCommas));
    });
    return unsubscribe;
  }, [springValue, formatCommas]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
