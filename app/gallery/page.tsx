'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { galleryItems } from '@/components/ui/framer-thumbnails';
import { useDialogFocus } from '@/components/useDialogFocus';

const captionOf = (num: number) => galleryItems.find((g) => g.id === num)?.title ?? `Lab photo ${num}`;

const GalleryCard = ({ num, folder, index, onOpen }: { num: number, folder: string, index: number, onOpen: (index: number) => void }) => {
  const [failed, setFailed] = React.useState(false);
  const src = `/images/${folder}/${num}.webp`;

  return (
    <motion.div 
      initial={index < 3 ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (num % 6) * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-surface cursor-pointer"
      onClick={() => !failed && onOpen(index)}
      role="button"
      tabIndex={0}
      aria-label={`Open photo: ${captionOf(num)}`}
      onKeyDown={(e) => { if (!failed && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(index); } }}
    >
      <div className="w-full h-full relative p-2 bg-surface-alt/40">
        <Image 
          src={failed ? "/logo.webp" : src} 
          alt="" // the card's aria-label already names the photo
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-contain transition-transform duration-200  ${failed ? 'opacity-20' : ''}`}
          priority={index < 3}
          onError={() => setFailed(true)}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
        <p className="text-white text-sm">{captionOf(num)}</p>
      </div>

      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-colors duration-200 scale-50 group-hover:scale-100">
        <Maximize2 size={20} className="text-white" />
      </div>
    </motion.div>
  );
};

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const lightboxRef = useDialogFocus<HTMLDivElement>(selectedIndex !== null);


  const memoriesCount = 36;
  const photos = Array.from({ length: memoriesCount }, (_, i) => memoriesCount - i);

  const folder = 'gallery';

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


  return (
    <main id="main" className="min-h-screen bg-background text-foreground py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={false}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-6">
              Gallery
            </h1>
            <p className="text-[var(--color-muted)] max-w-2xl text-lg">
              A comprehensive archive of Raman&apos;s Research Lab—milestones, celebrations, and daily scientific life.
            </p>
          </motion.div>
          <div className="px-6 py-3 rounded-lg border border-line bg-surface text-xs font-mono text-foreground h-max">
            {photos.length} photos
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((num, idx) => {
            return <GalleryCard key={num} num={num} folder={folder} index={idx} onOpen={setSelectedIndex} />;
          })}
        </div>
      </div>

      {/* LIGHTBOX WITH ARROW NAVIGATION */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div 
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${captionOf(photos[selectedIndex])}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-[#090c10]/98 flex items-center justify-center p-6 md:p-20"
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
                alt={captionOf(photos[selectedIndex])} 
                className="max-w-full max-h-full object-contain rounded-2xl"
              />

              {/* Close */}
              <button 
                aria-label="Close photo"
                onClick={() => setSelectedIndex(null)}
                className="absolute top-0 right-0 -translate-y-12 md:translate-y-0 md:translate-x-12 w-12 h-12 rounded-full bg-raised hover:bg-raised flex items-center justify-center transition-colors border border-line"
              >
                <X size={24} className="text-foreground" />
              </button>

              {/* Previous arrow */}
              <button
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length); }}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-raised hover:bg-raised border border-line flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>

              {/* Next arrow */}
              <button
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % photos.length); }}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-raised hover:bg-raised border border-line flex items-center justify-center transition-colors"
              >
                <ChevronRight size={24} className="text-foreground" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-2 md:-bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-raised border border-line text-xs font-mono text-secondary">
                {selectedIndex + 1} / {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
