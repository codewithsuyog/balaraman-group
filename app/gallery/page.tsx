'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Maximize2, Image as ImageIcon, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [activeTab, setActiveTab] = React.useState<'images' | 'memories'>('memories');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'images') {
        setTimeout(() => setActiveTab('images'), 0);
      }
    }
  }, []);

  const labImagesCount = 7;
  const memoriesCount = 36;
  const photos = Array.from(
    { length: activeTab === 'images' ? labImagesCount : memoriesCount },
    (_, i) => i + 1
  );

  const folder = activeTab === 'images' ? 'lab-images' : 'gallery';

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => prev !== null ? (prev + 1) % photos.length : null);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  const GalleryCard = ({ num, folder, index }: { num: number, folder: string, index: number }) => {
    const [failed, setFailed] = React.useState(false);
    const src = `/images/${folder}/${num}.webp`;
  
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (num % 6) * 0.05 }}
        whileHover={{ scale: 1.03 }}
        className="group relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-foreground/10 shadow-2xl bg-foreground/5 cursor-pointer"
        onClick={() => !failed && setSelectedIndex(index)}
      >
        <div className="w-full h-full relative p-2 bg-surface-alt/40">
          <Image 
            src={failed ? "/logo.webp" : src} 
            alt={`Lab Moment ${num}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-contain transition-transform duration-500 group-hover:scale-105 ${failed ? 'opacity-20' : ''}`}
            priority={num <= 4}
            onError={() => setFailed(true)}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
          <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">Moment #{num}</p>
          <p className="text-white text-sm font-light uppercase tracking-tighter">Memory Archive</p>
        </div>

        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
          <Maximize2 size={20} className="text-white" />
        </div>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/#gallery" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-6 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-gradient">
              {activeTab === 'images' ? 'Lab Images & Videos' : 'Lab Moments'}
            </h1>
            <p className="text-[var(--color-muted)] max-w-2xl font-light text-lg italic">
              {activeTab === 'images' 
                ? "Explore our scientific facilities, instruments, and research media."
                : "A comprehensive archive of Raman's Research Lab—milestones, celebrations, and daily scientific life."}
            </p>
          </motion.div>
          <div className="px-6 py-3 rounded-full border border-foreground/10 bg-foreground/5 text-xs font-mono text-foreground uppercase tracking-widest h-max">
            {photos.length} Captured {activeTab === 'images' ? 'Media' : 'Memories'}
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-4 mb-12 border-b border-foreground/10 pb-4">
          <button 
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
              activeTab === 'images' 
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                : 'bg-foreground/5 text-foreground hover:bg-foreground/10 border border-transparent'
            }`}
          >
            <ImageIcon size={16} /> Lab Images & Videos
          </button>
          <button 
            onClick={() => setActiveTab('memories')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
              activeTab === 'memories' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'bg-foreground/5 text-foreground hover:bg-foreground/10 border border-transparent'
            }`}
          >
            <Users size={16} /> Lab Memories
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((num, idx) => {
            return <GalleryCard key={num} num={num} folder={folder} index={idx} />;
          })}
        </div>
      </div>

      {/* LIGHTBOX WITH ARROW NAVIGATION */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-[#090c10]/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-20"
          >
            <motion.div 
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img loading="lazy" decoding="async" 
                src={`/images/${folder}/${photos[selectedIndex]}.webp`}
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(37,99,235,0.2)]"
              />

              {/* Close */}
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-0 right-0 -translate-y-12 md:translate-y-0 md:translate-x-12 w-12 h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors border border-foreground/10"
              >
                <X size={24} className="text-foreground" />
              </button>

              {/* Previous arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length); }}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>

              {/* Next arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % photos.length); }}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronRight size={24} className="text-foreground" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-2 md:-bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-foreground/10 border border-foreground/10 text-xs font-mono text-foreground/60">
                {selectedIndex + 1} / {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
