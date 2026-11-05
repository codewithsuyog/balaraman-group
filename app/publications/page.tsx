'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';
import { publications } from '../publications_master';
import ChemText from '../../components/ChemText';

import { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

interface Publication {
  id: number;
  authors: string;
  title: string;
  journal?: string;
  year: string | number;
  volume?: string;
  pages?: string;
  doi?: string;
  fullText?: string;
  details?: string;
  coverImage?: string;
  schemeImage?: string;
}

interface PublicationCardProps {
  pub: Publication;
  idx: number;
  fadeUp: Variants;
}

const PublicationCard = ({ pub, idx, fadeUp }: PublicationCardProps) => {
  const [coverFailed, setCoverFailed] = React.useState(false);
  const [schemeFailed, setSchemeFailed] = React.useState(false);

  const hasCover = !!pub.coverImage && !coverFailed;
  const hasScheme = !!pub.schemeImage && !schemeFailed;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ delay: (idx % 6) * 0.04 }}
      className="flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 md:p-8 rounded-2xl bg-surface border border-line"
    >
      {hasCover && (
        <div className="w-24 h-32 shrink-0 rounded-lg bg-white border border-line p-1.5">
          <img
            src={pub.coverImage}
            alt={`Journal cover art for: ${pub.title ?? "publication " + pub.id}`}
            loading="lazy" decoding="async"
            className="w-full h-full object-contain"
            onError={() => setCoverFailed(true)}
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-muted mb-2 tabular-nums">
          <span className="text-accent">[{pub.id}]</span> {pub.year}{pub.journal && <> · {pub.journal}</>}
          {(pub.volume || pub.pages) && <> · {[pub.volume, pub.pages].filter(Boolean).join(', ')}</>}
        </p>
        {pub.title && (
          <h3 className="text-lg font-medium leading-snug text-foreground mb-2">
            <ChemText text={pub.title} />
          </h3>
        )}
        <p className="text-sm text-secondary leading-relaxed mb-4">{pub.authors}</p>
        {pub.doi && (
          <a
            href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
            aria-label={`Read paper: ${pub.title} (opens in a new tab)`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4"
          >
            Read paper <ExternalLink size={14} />
          </a>
        )}
      </div>

      {hasScheme && (
        <div className="w-full md:w-72 h-44 shrink-0 rounded-lg bg-white border border-line p-2">
          <img
            src={pub.schemeImage}
            alt={`Reaction scheme from: ${pub.title ?? "publication " + pub.id}`}
            loading="lazy" decoding="async"
            className="w-full h-full object-contain"
            onError={() => setSchemeFailed(true)}
          />
        </div>
      )}
    </motion.article>
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
    <main id="main" className="min-h-screen bg-background text-foreground selection:bg-raised">

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <motion.div initial={false} animate="visible" variants={fadeUp} className="mb-20">
          <h1 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-6">Publications</h1>
          <p className="text-secondary text-lg max-w-2xl">
            Every paper from Raman&apos;s Research Lab, newest first
          </p>
        </motion.div>

        {/* Career stage filter */}
        <div className="flex gap-2 mb-12 flex-wrap" role="group" aria-label="Filter by career stage">
          {([['independent', 'Independent career'], ['early', 'Doctoral and postdoctoral']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              aria-pressed={activeTab === key}
              className={`h-10 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key ? 'bg-foreground text-background' : 'border border-line text-secondary hover:text-foreground hover:bg-raised'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-16">
          {filteredByYear.map(([year, pubs], yearIdx) => (
            <div key={year} className="relative">
              <h2 className="text-3xl text-foreground mb-6">
                {year} <span className="font-mono text-sm text-muted ml-1 tabular-nums">{pubs.length}</span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
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
