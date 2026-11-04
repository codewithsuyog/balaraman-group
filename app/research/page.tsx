'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, Leaf, FlaskConical, Beaker, 
  FileText, Globe, Award, Database, Microscope, 
  ArrowRight, ExternalLink, ChevronRight 
} from 'lucide-react';
import { patents } from '../data';
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
  journal: string;
  year: string | number;
  volume?: string;
  pages?: string;
  doi?: string;
}

const PublicationItem = ({ pub }: { pub: Publication }) => (
  <div className="flex gap-4 group/pub py-4 border-b border-foreground/5 last:border-0 hover:bg-foreground/[0.02] transition-colors rounded-lg px-3 -mx-3">
    <span className="text-xs font-mono text-amber-500 mt-1 shrink-0">{pub.id}.</span>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-foreground/90 font-light leading-relaxed">
        {pub.authors}. <ChemText text={pub.title} />. <span className="italic">{pub.journal}</span>, {pub.year}. {pub.volume && `${pub.volume}`}{pub.pages && `, ${pub.pages}`}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <a 
          href={pub.doi?.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-amber-500 hover:text-amber-400 transition-colors"
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
          p.fullText?.toLowerCase().includes(k.toLowerCase())
        )
      ).slice(0, 4);

    return [
      {
        id: 'homogeneous',
        number: "01",
        title: "Homogeneous Catalysis",
        image: "/images/research/organometallic.webp",
        icon: <FlaskConical className="text-amber-400" />,
        desc: "Molecularly-defined pincer complexes and metal-ligand cooperation for selective transformations.",
        details: "We design and develop well-defined transition-metal pincer complexes for C-C, C-N bond forming reactions, acceptorless dehydrogenation, hydrogenation, and borrowing hydrogen strategies using earth-abundant metals like Mn, Co, Ni, and Fe.",
        pubs: filter(["pincer", "metal-ligand", "MLC", "dehydrogenation", "borrowing", "hydrogenation", "Mn", "Ni", "Co"])
      },
      {
        id: 'heterogeneous',
        number: "02",
        title: "Heterogeneous Catalysis",
        image: "/images/research/green_synthesis.webp",
        icon: <Beaker className="text-emerald-400" />,
        desc: "Robust nanocatalysts and supported systems for sustainable industrial transformations.",
        details: "Our group develops reusable heterogeneous nanocatalysts on graphene/carbon supports for hydrogen generation, CO2 conversion, biomass upgrading, photocatalysis, and co-pyrolysis of waste materials.",
        pubs: filter(["nanocatalyst", "heterogeneous", "graphene", "photocatalytic", "co-pyrolysis", "biomass", "CO2", "supported"])
      }
    ];
  }, []);

  return (
    <main id="main" className="min-h-screen bg-background text-foreground selection:bg-amber-500/30 pb-32">
      {/* PROFESSIONAL HEADER */}
      <section className="relative pt-32 pb-24 px-6 border-b border-foreground/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={false} animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:border-amber-500/30 text-foreground hover:text-amber-400 font-mono text-xs uppercase tracking-widest mb-12 transition-all group">
              <img src="/images/lab-logo-128.webp" alt="EBR Lab Logo" className="w-5 h-5 rounded-md object-contain bg-white/90 p-0.5" />
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Laboratory
            </Link>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
              Research <br/> <span className="text-amber-500">Pillars</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground font-light max-w-3xl leading-relaxed border-l-2 border-amber-500 pl-8 italic">
              Focused on Organic/Organometallic Chemistry and Sustainable Catalysis to address global energy and environmental challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE MISSION SUMMARY */}
      <section className="py-24 px-6 bg-foreground/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6 text-lg text-foreground/90 font-light leading-relaxed">
            <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em] mb-4">Laboratory Mission</h2>
            <p>
              We explore the frontiers of <span className="text-accent font-semibold">organometallic chemistry</span> — designing molecular architectures that unlock new pathways for <span className="text-accent font-semibold">sustainable catalysis</span>{" "}and selective organic transformations.
            </p>
            <p>
              Our laboratory develops <span className="text-foreground font-medium">well-defined transition-metal catalytic systems</span> spanning hydrogen generation, hydrogenation, photocatalysis, and C–H activation — bridging the gap between <span className="text-foreground font-medium">homogeneous precision</span> and <span className="text-foreground font-medium">heterogeneous scalability</span>.
            </p>
          </div>
          <div className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10 flex flex-col justify-center">
            <h3 className="font-sans text-xs font-bold text-foreground mb-4 uppercase tracking-widest flex items-center gap-2">
              <Database size={16} className="text-amber-400" /> Focus Areas
            </h3>
            <ul className="space-y-3 text-xs font-mono text-foreground">
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-amber-500" /> Homogeneous Catalysis</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-amber-500" /> Heterogeneous Catalysis</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-amber-500" /> C-H Activation</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-amber-500" /> Hydrogen Generation</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-amber-500" /> Photocatalysis</li>
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">{cat.icon}</div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase">{cat.title}</h2>
                </div>
                
                <p className="text-lg text-foreground/90 font-medium mb-6 leading-snug">{cat.desc}</p>
                <p className="text-base text-foreground/90 font-light leading-relaxed mb-10 border-l-2 border-foreground/10 pl-6 italic">
                  {cat.details}
                </p>

                <div className="space-y-4 p-6 rounded-3xl bg-foreground/[0.03] border border-foreground/5">
                  <h3 className="text-xs font-mono text-amber-500 uppercase tracking-[0.3em] mb-2">Representative Works</h3>
                  <div className="flex flex-col">
                    {cat.pubs.map((pub, i) => <PublicationItem key={i} pub={pub} />)}
                  </div>
                  <Link href="/publications" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/90 hover:text-amber-400 mt-4 transition-colors">
                    Access Complete Archive <ArrowRight size={10} />
                  </Link>
                </div>
              </div>

              {/* Visual Sidebar */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-foreground/10 shadow-2xl">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat.image})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTELLECTUAL PROPERTY & IMPACT SUMMARY */}
      <section className="py-32 px-6 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em] mb-4">Outcome & Impact</h3>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Advancing Science</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 rounded-[3rem] bg-foreground/[0.02] border border-foreground/5 hover:border-amber-500/20 transition-all">
              <Award className="text-amber-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Core Contribution</h3>
              <p className="text-foreground/90 font-light leading-relaxed">
                Development of diverse C-C and C-N bond-forming reactions via dehydrogenation strategies. These protocols are highly atom-efficient, eliminating hazardous waste.
              </p>
            </div>
            <div className="p-12 rounded-[3rem] bg-foreground/[0.02] border border-foreground/5 hover:border-amber-500/20 transition-all">
              <Microscope className="text-emerald-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Robust Nanocatalysis</h3>
              <p className="text-foreground/90 font-light leading-relaxed">
                Converting homogeneous catalytic systems into heterogeneous versions through stable supports. Our core-shell architectures represent a new frontier in 3d-transition-metal catalysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
