'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Award, FileText, ExternalLink, 
  ChevronRight, ArrowRight, Zap, Briefcase
} from 'lucide-react';
import { patents } from '../data';

import { Variants } from 'framer-motion';

interface Patent {
  title: string;
  authors?: string;
  number?: string;
  year?: string | number;
  coapplicant?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const PatentCard = ({ patent, type }: { patent: Patent, type: string }) => (
  <motion.div 
    variants={fadeUp}
    className="group p-5 md:p-8 rounded-lg bg-surface border border-line hover:border-line transition-colors duration-200 flex flex-col h-full"
  >
    <div className="flex items-center gap-3 mb-6">
      <span className="px-3 py-1 rounded bg-raised text-accent text-xs font-medium border border-line">
        {type}
      </span>
      {patent.year && <span className="text-xs font-mono text-foreground">{patent.year}</span>}
    </div>
    
    <h3 className="text-xl font-medium text-foreground mb-4 leading-tight group-hover:text-accent transition-colors">
      {patent.title}
    </h3>
    
    <div className="space-y-4 flex-1">
      {patent.authors && (
        <div className="flex gap-2">
          <span className="text-xs font-mono text-foreground shrink-0 mt-1">Authors:</span>
          <p className="text-sm text-foreground leading-relaxed">{patent.authors}</p>
        </div>
      )}
      {patent.number && (
        <div className="flex gap-2">
          <span className="text-xs font-mono text-foreground shrink-0 mt-1">Number:</span>
          <p className="text-sm text-accent font-mono">{patent.number}</p>
        </div>
      )}
      {patent.coapplicant && (
        <div className="flex gap-2">
          <span className="text-xs font-mono text-foreground shrink-0 mt-1">Partner:</span>
          <p className="text-sm text-secondary font-medium">{patent.coapplicant}</p>
        </div>
      )}
    </div>

    <div className="mt-8 pt-6 border-t border-line">
       <button className="flex items-center gap-2 text-xs font-medium text-foreground group-hover:text-foreground transition-colors">
          View Details <ArrowRight size={12} />
       </button>
    </div>
  </motion.div>
);

export default function PatentsPage() {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={false} animate="visible" variants={fadeUp} className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <p className="text-xs font-mono text-accent">Intellectual Property</p>
          </div>
          <h1 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-6">
            Patents
          </h1>
          <p className="text-xl md:text-2xl text-foreground max-w-3xl leading-relaxed">
            Bridging fundamental research and industrial applications through a robust portfolio of granted and filed patents.
          </p>
        </motion.div>

        <div className="space-y-32">
          {/* IISER Tirupati Patents */}
          <section>
            <div className="flex items-center justify-between mb-12 border-b border-line pb-6">
              <h2 className="text-2xl font-medium text-accent flex items-center gap-4">
                <FileText size={24} /> Recent Filings (IISER Tirupati)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patents.iiser.map((p, i) => (
                <PatentCard key={i} patent={p} type="IISER Filing" />
              ))}
            </div>
          </section>

          {/* Industry Sponsored */}
          <section>
            <div className="flex items-center justify-between mb-12 border-b border-line pb-6">
              <h2 className="text-2xl font-medium text-secondary flex items-center gap-4">
                <Briefcase size={24} /> Industry Sponsored & Co-applicants
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patents.industry.map((p, i) => (
                <PatentCard key={i} patent={p} type="Industry" />
              ))}
            </div>
          </section>

          {/* Granted US Patents */}
          <section>
            <div className="flex items-center justify-between mb-12 border-b border-line pb-6">
              <h2 className="text-2xl font-medium text-accent flex items-center gap-4">
                <Shield size={24} /> US Patents
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patents.grantedUS.map((p, i) => (
                <PatentCard key={i} patent={p} type={p.number.includes('App.') ? 'US Application' : 'US Granted'} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
