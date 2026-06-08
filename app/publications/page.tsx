'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { publications } from '../publications_master';
import ChemText from '../../components/ChemText';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const PublicationCard = ({ pub, idx, fadeUp }: any) => {
  const [coverFailed, setCoverFailed] = React.useState(false);
  const [schemeFailed, setSchemeFailed] = React.useState(false);
  const [coverExtIdx, setCoverExtIdx] = React.useState(0);
  const [schemeExtIdx, setSchemeExtIdx] = React.useState(0);
  
  const extensions = ['.webp', '.jpg', '.png', '.gif', '.jpeg'];

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
      className="group relative flex flex-col gap-8 p-5 md:p-10 rounded-2xl md:rounded-[3rem] bg-foreground/[0.03] border border-foreground/10 hover:border-amber-500/30 hover:bg-foreground/5 transition-all duration-500 shadow-xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Cover Image - Left */}
        {hasCover && (
          <div className="w-[120px] h-48 rounded-2xl bg-foreground border border-foreground/10 overflow-hidden relative group-hover:border-amber-500/40 transition-all p-2 shadow-2xl shrink-0">
            <img 
              key={`cover-archive-${pub.id}-${coverExtIdx}`}
              src={coverFailed ? "/logo.png" : `/images/publications/covers/${pub.id}${extensions[coverExtIdx]}`} 
              alt="Cover" 
              loading="lazy"
              className={`w-full h-full object-contain ${coverFailed ? 'opacity-20 p-4' : ''}`}
              onError={() => coverExtIdx < extensions.length - 1 ? setCoverExtIdx(prev => prev + 1) : setCoverFailed(true)}
            />

          </div>
        )}

        {/* Paper Details - Center */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-black tracking-widest uppercase border border-amber-500/20">
              {pub.year}
            </span>
            {pub.journal && (
              <span className="text-xs text-foreground/90 font-mono italic">{pub.journal}</span>
            )}
          </div>
          
          <div className="text-base text-foreground leading-relaxed mb-6 font-light border-l-2 border-amber-500/30 pl-6">
            <span className="text-amber-400 font-bold mr-2 text-lg">{pub.id}.</span>
            {pub.title && (
              <ChemText text={pub.title} as="strong" className="block text-foreground text-lg font-bold mb-2 leading-snug tracking-tight not-italic" />
            )}
            <span className="text-sm text-foreground"><ChemText text={pub.fullText || `${pub.authors}. ${pub.title}. ${pub.journal}, ${pub.year}${pub.details}`} /></span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap mt-auto">
            {pub.doi && (
              <a 
                href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 rounded-full bg-amber-600/10 border border-amber-600/30 text-amber-400 text-xs font-bold flex items-center gap-2 hover:bg-amber-500 hover:text-foreground shadow-lg shadow-amber-600/10 transition-all uppercase tracking-widest w-max"
              >
                Read Publication <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Scheme Image - Right */}
        {hasScheme && (
          <div className="w-full md:w-[300px] h-48 rounded-2xl bg-foreground border border-foreground/10 overflow-hidden relative group-hover:border-amber-500/40 transition-all shadow-2xl p-2 shrink-0">
            <img 
              key={`scheme-archive-${pub.id}-${schemeExtIdx}`}
              src={schemeFailed ? "/logo.png" : `/images/publications/schemes/${pub.id}${extensions[schemeExtIdx]}`} 
              alt="Scheme" 
              loading="lazy"
              className={`w-full h-full object-contain ${schemeFailed ? 'opacity-20 p-4' : ''}`}
              onError={() => schemeExtIdx < extensions.length - 1 ? setSchemeExtIdx(prev => prev + 1) : setSchemeFailed(true)}
            />

          </div>
        )}
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
    // Sort years descending, and within each year sort by ID descending
    return Object.entries(grouped)
      .sort((a, b) => {
        if (a[0] === 'Unknown Year') return 1;
        if (b[0] === 'Unknown Year') return -1;
        return parseInt(b[0]) - parseInt(a[0]);
      })
      .map(([year, pubs]) => [year, [...pubs].sort((a, b) => b.id - a.id)] as [string, typeof publications]);
  }, []);

  const [activeTab, setActiveTab] = React.useState<'independent' | 'early'>('independent');

  const filteredByYear = useMemo(() => {
    return publicationsByYear.map(([year, pubs]) => {
      const filtered = pubs.filter(pub => 
        activeTab === 'independent' ? pub.id >= 28 : pub.id < 28
      );
      return [year, filtered] as [string, typeof publications];
    }).filter(([_, pubs]) => pubs.length > 0);
  }, [publicationsByYear, activeTab]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-20">
          <Link href="/#publications" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Publications Archive</h1>
          <p className="text-foreground text-lg font-light max-w-2xl">
            A comprehensive record of all scholarly articles, peer-reviewed papers, and research outputs from Raman's Research Lab.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-16 flex-wrap">
          <button 
            onClick={() => setActiveTab('independent')} 
            className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === 'independent' 
                ? 'bg-amber-600 text-foreground shadow-lg shadow-amber-600/30' 
                : 'bg-foreground/5 text-foreground border border-foreground/10 hover:border-amber-500/30 hover:text-foreground/90'
            }`}
          >
            Independent Career Publications
          </button>
          <button 
            onClick={() => setActiveTab('early')} 
            className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === 'early' 
                ? 'bg-amber-600 text-foreground shadow-lg shadow-amber-600/30' 
                : 'bg-foreground/5 text-foreground border border-foreground/10 hover:border-amber-500/30 hover:text-foreground/90'
            }`}
          >
            Doctoral & Postdoctoral Publications
          </button>
        </div>

        {/* Content */}
        <div className="space-y-32">
          {filteredByYear.map(([year, pubs], yearIdx) => (
            <div key={year} className="relative">
              <div className="sticky top-24 z-20 mb-12 inline-block">
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-foreground/50 drop-shadow-sm">
                  {year}
                </h2>
                <div className="h-1 w-1/2 bg-amber-500/50 mt-2 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-8 md:pl-12 border-l border-foreground/5">
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
