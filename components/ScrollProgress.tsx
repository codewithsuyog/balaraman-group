'use client';

import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const scrollBar = document.getElementById('scroll-bar');
      if (scrollBar) {
        scrollBar.style.transform = 'scaleY(' + (scrolled / 100) + ')';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
