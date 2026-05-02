'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, Leaf, FlaskConical, Beaker, 
  FileText, Globe, Award, Database, Microscope, 
  ArrowRight, ExternalLink, ChevronRight 
} from 'lucide-react';
import { patents, publications } from '../data';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const PublicationItem = ({ pub }: { pub: any }) => (
  <div className="flex gap-4 group/pub py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors rounded-lg px-3 -mx-3">
    <span className="text-xs font-mono text-blue-500/50 mt-1 shrink-0">{pub.id}.</span>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-white/70 font-light leading-relaxed">
        {pub.authors}. {pub.title}. <span className="italic">{pub.journal}</span>, {pub.year}{pub.details}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <a 
          href={pub.doi?.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
          target="_blank" 
          rel="noreferrer"
          className="text-[10px] font-mono text-blue-500/40 hover:text-blue-400 transition-colors"
        >
          DOI: {pub.doi}
        </a>
      </div>
    </div>
  </div>
);

export default function ResearchPage() {
  const categories = useMemo(() => {
    const filter = (keywords: string[]) => 
      publications.filter(p => 
        keywords.some(k => 
          p.title?.toLowerCase().includes(k.toLowerCase()) || 
          p.journal?.toLowerCase().includes(k.toLowerCase()) ||
          p.details?.toLowerCase().includes(k.toLowerCase())
        )
      ).slice(0, 4);

    return [
      {
        id: 'catalysis',
        number: "01",
        title: "Catalysis & Sustainability",
        image: "/images/research/catalysis.png",
        icon: <FlaskConical className="text-blue-400" />,
        desc: "Advancing the frontiers of Green Chemistry through high-performance catalytic systems.",
        details: "Our group has pioneered diverse C-C and C-N bond-forming reactions via dehydrogenation/borrowing hydrogenation strategies. Using bio-derived and renewable alcohols as feedstocks, we aim to eliminate hazardous byproducts, producing only water or hydrogen.",
        pubs: filter(["hydrogenation", "dehydrogenation", "ADC", "borrowing"])
      },
      {
        id: 'c1',
        number: "02",
        title: "Sustainable C1 Chemistry",
        image: "/images/research/green_synthesis.png",
        icon: <Leaf className="text-emerald-400" />,
        desc: "Harnessing abundant building blocks like CO2 for complex molecule synthesis.",
        details: "We focus on the catalytic conversion of atmospheric CO2 and methanol into value-added chemical feedstocks. This research replaces traditional hazardous reagents with eco-friendly alternatives for the synthesis of bioactive molecules.",
        pubs: filter(["CO2", "methanol", "formate", "polycarbonate", "C1"])
      },
      {
        id: 'energy',
        number: "03",
        title: "Renewable Energy Solutions",
        image: "/images/research/renewable.png",
        icon: <Zap className="text-orange-400" />,
        desc: "Pioneering chemical solutions for hydrogen production and energy storage.",
        details: "Our research lies in efficient hydrogen generation from liquid organic hydrogen carriers (LOHCs). We develop molecular catalysts that enable sustainable energy storage and release, facilitating the global transition to green energy.",
        pubs: filter(["hydrogen production", "hydrogen storage", "fuel", "LOHC"])
      },
      {
        id: 'organometallic',
        number: "04",
        title: "Organometallic Chemistry",
        image: "/images/research/organometallic.png",
        icon: <Beaker className="text-purple-400" />,
        desc: "Designing transition-metal complexes with tailored pincer ligands.",
        details: "We explore fundamental metal-ligand cooperation (MLC) patterns to unlock new reactivity. By tailoring the electronic and steric properties of pincer complexes, we achieve atom-efficient transformations for industrial applications.",
        pubs: filter(["pincer", "metal-ligand", "MLC", "complex"])
      }
    ];
  }, []);

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 pb-32">
      {/* PROFESSIONAL HEADER */}
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-12 transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Laboratory
            </Link>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
              Research <br/> <span className="text-blue-500">Pillars</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed border-l-2 border-blue-500 pl-8 italic">
              Focused on Organic/Organometallic Chemistry and Sustainable Catalysis to address global energy and environmental challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE MISSION SUMMARY */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6 text-lg text-white/70 font-light leading-relaxed">
            <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-4">Laboratory Mission</h3>
            <p>
              We are dedicated to creating solutions for green energy and recycling atmospheric waste through sustainable chemical synthesis and atom-efficient transformations. 
            </p>
            <p>
              Specifically, we work on the design and development of catalytic materials for hydrogen generation from feedstocks, sustainable chemical synthesis, and conversion of CO2 to value-added products. We are also interested in the development of electron-donors for Ziegler-Natta olefin polymerization catalysis.
            </p>
          </div>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
              <Database size={16} className="text-blue-400" /> Focus Areas
            </h4>
            <ul className="space-y-3 text-xs font-mono text-white/40">
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-blue-500" /> C1-Chemistry</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-blue-500" /> Hydrogen Storage</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-blue-500" /> Pincer Catalysis</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-blue-500" /> Sustainable Synthesis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEQUENTIAL RESEARCH SECTIONS */}
      <section className="px-6 py-32">
        <div className="max-w-6xl mx-auto space-y-48">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              id={cat.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 md:gap-24 items-start`}
            >
              {/* Numbering & Content */}
              <div className="w-full lg:w-1/2">
                <div className="text-7xl font-black text-white/5 font-mono mb-4 leading-none">{cat.number}</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">{cat.icon}</div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">{cat.title}</h2>
                </div>
                
                <p className="text-lg text-white/90 font-medium mb-6 leading-snug">{cat.desc}</p>
                <p className="text-base text-white/50 font-light leading-relaxed mb-10 border-l-2 border-white/10 pl-6 italic">
                  {cat.details}
                </p>

                <div className="space-y-4 p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-2">Representative Works</h4>
                  <div className="flex flex-col">
                    {cat.pubs.map((pub, i) => <PublicationItem key={i} pub={pub} />)}
                  </div>
                  <Link href="/publications" className="inline-flex items-center gap-2 text-[10px] font-mono text-white/30 hover:text-blue-400 mt-4 transition-colors">
                    Access Complete Archive <ArrowRight size={10} />
                  </Link>
                </div>
              </div>

              {/* Visual Sidebar */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${cat.image})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTELLECTUAL PROPERTY & IMPACT SUMMARY */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-4">Outcome & Impact</h3>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Advancing Science</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all">
              <Award className="text-blue-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Core Contribution</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Development of diverse C-C and C-N bond-forming reactions via dehydrogenation strategies. These protocols are highly atom-efficient, eliminating hazardous waste.
              </p>
            </div>
            <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all">
              <Microscope className="text-emerald-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Robust Nanocatalysis</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Converting homogeneous catalytic systems into heterogeneous versions through stable supports. Our core-shell architectures represent a new frontier in 3d-transition-metal catalysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
