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
  const [displayValue, setDisplayValue] = useState('0');

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
      const rounded = Math.round(latest);
      if (formatCommas) {
        setDisplayValue(rounded.toLocaleString());
      } else {
        setDisplayValue(String(rounded));
      }
    });
    return unsubscribe;
  }, [springValue, formatCommas]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
