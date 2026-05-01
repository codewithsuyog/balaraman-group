'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { publications } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const PublicationCard = ({ pub, idx, fadeUp }: any) => {
  const [coverFailed, setCoverFailed] = React.useState(false);
  const [schemeFailed, setSchemeFailed] = React.useState(false);
  const [coverExtIdx, setCoverExtIdx] = React.useState(0);
  const [schemeExtIdx, setSchemeExtIdx] = React.useState(0);
  
  const extensions = ['.jpg', '.png', '.gif', '.jpeg', '.webp'];

  const hasCover = !coverFailed;
  const hasScheme = !schemeFailed;
  const noImages = !hasCover && !hasScheme;

  return (
    <motion.div 
      key={pub.id || idx} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ delay: (idx % 10) * 0.05 }}
      className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all flex flex-col gap-6 group shadow-xl overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Visuals: Cover & Scheme */}
        {!noImages && (
          <div className="w-full lg:w-[35%] flex gap-4 justify-center items-center h-40 lg:h-auto">
             {hasCover && (
               <div className="w-[80px] h-40 rounded-xl bg-white border border-white/10 overflow-hidden relative group-hover:border-blue-500/40 transition-all shadow-xl flex items-center justify-center shrink-0 p-2">
                   <img 
                    key={`cover-archive-${pub.id}-${coverExtIdx}`}
                    src={coverFailed ? "/logo.png" : `/publications/covers/${pub.id}${extensions[coverExtIdx]}`} 
                    alt="Cover" 
                    className={`w-full h-full object-contain ${coverFailed ? 'opacity-20 p-4' : ''}`}
                    onError={() => coverExtIdx < extensions.length - 1 ? setCoverExtIdx(prev => prev + 1) : setCoverFailed(true)}
                  />
               </div>
             )}
             {hasScheme && (
               <div className="flex-1 h-40 rounded-xl bg-white border border-white/10 overflow-hidden relative group-hover:border-blue-500/40 transition-all shadow-xl flex items-center justify-center p-2">
                   <img 
                    key={`scheme-archive-${pub.id}-${schemeExtIdx}`}
                    src={schemeFailed ? "/logo.png" : `/publications/schemes/${pub.id}${extensions[schemeExtIdx]}`} 
                    alt="Scheme" 
                    className={`w-full h-full object-contain ${schemeFailed ? 'opacity-20' : ''}`}
                    onError={() => schemeExtIdx < extensions.length - 1 ? setSchemeExtIdx(prev => prev + 1) : setSchemeFailed(true)}
                  />
               </div>
             )}
          </div>
        )}

        {/* Paper Details */}
        <div className={`w-full ${noImages ? 'lg:w-full' : 'lg:w-[65%]'} flex flex-col justify-center`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black tracking-widest uppercase border border-blue-500/30">
              {pub.year}
            </span>
            {pub.journal && pub.journal.length < 20 && (
              <span className="text-sm text-white/40 font-mono">{pub.journal}</span>
            )}
          </div>
          
          <div className="text-sm md:text-base text-[var(--color-muted)] leading-relaxed mb-6 font-light border-l-2 border-blue-500/30 pl-4">
            <span className="text-blue-400 font-bold mr-2 text-lg">{pub.id}.</span>
            {pub.authors}. {pub.title}. <span className="italic">{pub.journal}</span>, {pub.year}{pub.details}
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            {pub.doi && (
              <a 
                href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex w-max px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-400 text-xs font-bold items-center gap-2 hover:bg-blue-500 hover:text-white shadow-lg transition-all"
              >
                View Publication <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PublicationsPage() {
  const publicationsByYear = useMemo(() => {
    const grouped: Record<string, typeof publications> = {};
    publications.forEach(pub => {
      const year = pub.year || 'Unknown Year';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(pub);
    });
    // Sort years descending
    return Object.entries(grouped).sort((a, b) => {
      if (a[0] === 'Unknown Year') return 1;
      if (b[0] === 'Unknown Year') return -1;
      return parseInt(b[0]) - parseInt(a[0]);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-20">
          <Link href="/#publications" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Publications Archive</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl">
            A comprehensive record of all scholarly articles, peer-reviewed papers, and research outputs from Raman's Research Lab.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-32">
          {publicationsByYear.map(([year, pubs], yearIdx) => (
            <div key={year} className="relative">
              <div className="sticky top-24 z-20 mb-12 inline-block">
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white/50 drop-shadow-2xl">
                  {year}
                </h2>
                <div className="h-1 w-1/2 bg-blue-500/50 mt-2 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-8 md:pl-12 border-l border-white/5">
                {pubs.map((pub, idx) => (
                  <PublicationCard key={pub.id || idx} pub={pub} idx={idx} fadeUp={fadeUp} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
