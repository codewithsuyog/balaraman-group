'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a' | 'div';
  strength?: number;
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  className = '',
  as = 'div',
  strength = 8,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = ((e.clientX - centerX) / (rect.width / 2)) * strength;
      const deltaY = ((e.clientY - centerY) / (rect.height / 2)) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const Component = motion.create(as as 'div');

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
