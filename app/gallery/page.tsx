'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Maximize2 } from 'lucide-react';
import Link from 'next/link';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const photos = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#020202] text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/#gallery" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <h1 className="text-6xl font-bold tracking-tighter mb-4 text-gradient">Lab Moments</h1>
            <p className="text-[var(--color-muted)] max-w-2xl font-light text-lg italic">
              A comprehensive archive of Raman's Research Lab—milestones, celebrations, and daily scientific life.
            </p>
          </motion.div>
          <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/40 uppercase tracking-widest h-max">
            {photos.length} Captured Memories
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((num) => {
            const ext = num === 18 ? 'png' : 'jpg';
            const src = `/gallery/${num}.${ext}`;
            return (
              <motion.div 
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (num % 6) * 0.05 }}
                onClick={() => setSelectedImage(src)}
                className="group relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center p-2 bg-black/40">
                  <img 
                    src={src} 
                    alt={`Lab Moment ${num}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/logo.png";
                      (e.target as HTMLImageElement).style.opacity = "0.2";
                    }}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">Moment #{num}</p>
                  <p className="text-white text-sm font-light uppercase tracking-tighter">Memory Archive</p>
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <Maximize2 size={20} className="text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-20"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(37,99,235,0.2)]"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 -translate-y-12 md:translate-y-0 md:translate-x-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
              >
                <X size={24} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
