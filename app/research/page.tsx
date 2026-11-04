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
  <div className="flex gap-4 group/pub py-4 border-b border-line last:border-0 hover:bg-surface transition-colors rounded-lg px-3 -mx-3">
    <span className="text-xs font-mono text-accent mt-1 shrink-0">{pub.id}.</span>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-foreground leading-relaxed">
        {pub.authors}. <ChemText text={pub.title} />. <span className="">{pub.journal}</span>, {pub.year}. {pub.volume && `${pub.volume}`}{pub.pages && `, ${pub.pages}`}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <a 
          href={pub.doi?.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-accent hover:text-accent transition-colors"
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
        coverIds: [117, 112, 111],
        icon: <FlaskConical className="text-accent" />,
        desc: "Molecularly-defined pincer complexes and metal-ligand cooperation for selective transformations.",
        details: "We design and develop well-defined transition-metal pincer complexes for C-C, C-N bond forming reactions, acceptorless dehydrogenation, hydrogenation, and borrowing hydrogen strategies using earth-abundant metals like Mn, Co, Ni, and Fe.",
        pubs: filter(["pincer", "metal-ligand", "MLC", "dehydrogenation", "borrowing", "hydrogenation", "Mn", "Ni", "Co"])
      },
      {
        id: 'heterogeneous',
        number: "02",
        title: "Heterogeneous Catalysis",
        coverIds: [115, 106, 85],
        icon: <Beaker className="text-secondary" />,
        desc: "Robust nanocatalysts and supported systems for sustainable industrial transformations.",
        details: "Our group develops reusable heterogeneous nanocatalysts on graphene/carbon supports for hydrogen generation, CO2 conversion, biomass upgrading, photocatalysis, and co-pyrolysis of waste materials.",
        pubs: filter(["nanocatalyst", "heterogeneous", "graphene", "photocatalytic", "co-pyrolysis", "biomass", "CO2", "supported"])
      }
    ];
  }, []);

  return (
    <main id="main" className="min-h-screen bg-background text-foreground selection:bg-raised pb-32">
      {/* PROFESSIONAL HEADER */}
      <section className="relative pt-32 pb-24 px-6 border-b border-line overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={false} animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground mb-8 transition-colors"><ArrowLeft size={14} aria-hidden="true" /> Back to home
            </Link>
            
            <h1 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-6">
              Research
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground max-w-3xl leading-relaxed border-l-2 border-line pl-8">
              Focused on Organic/Organometallic Chemistry and Sustainable Catalysis to address global energy and environmental challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE MISSION SUMMARY */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6 text-lg text-foreground leading-relaxed">
            <h2 className="text-xs font-mono text-accent mb-4">Laboratory Mission</h2>
            <p>
              We explore the frontiers of <span className="text-accent font-semibold">organometallic chemistry</span> — designing molecular architectures that unlock new pathways for <span className="text-accent font-semibold">sustainable catalysis</span>{" "}and selective organic transformations.
            </p>
            <p>
              Our laboratory develops <span className="text-foreground font-medium">well-defined transition-metal catalytic systems</span> spanning hydrogen generation, hydrogenation, photocatalysis, and C–H activation — bridging the gap between <span className="text-foreground font-medium">homogeneous precision</span> and <span className="text-foreground font-medium">heterogeneous scalability</span>.
            </p>
          </div>
          <div className="bg-surface rounded-2xl p-8 border border-line flex flex-col justify-center">
            <h3 className="font-sans text-xs font-medium text-foreground mb-4 flex items-center gap-2">
              <Database size={16} className="text-accent" /> Focus Areas
            </h3>
            <ul className="space-y-3 text-xs font-mono text-foreground">
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-accent" /> Homogeneous Catalysis</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-accent" /> Heterogeneous Catalysis</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-accent" /> C-H Activation</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-accent" /> Hydrogen Generation</li>
              <li className="flex items-center gap-3"><ChevronRight size={10} className="text-accent" /> Photocatalysis</li>
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
                  <div className="p-3 rounded-2xl bg-raised border border-line">{cat.icon}</div>
                  <h2 className="text-3xl md:text-4xl text-foreground mb-4">{cat.title}</h2>
                </div>
                
                <p className="text-lg text-foreground font-medium mb-6 leading-snug">{cat.desc}</p>
                <p className="text-base text-foreground leading-relaxed mb-10 border-l-2 border-line pl-6">
                  {cat.details}
                </p>

                <div className="space-y-4 p-6 rounded-2xl bg-surface border border-line">
                  <h3 className="text-xs font-mono text-accent mb-2">Representative Works</h3>
                  <div className="flex flex-col">
                    {cat.pubs.map((pub, i) => <PublicationItem key={i} pub={pub} />)}
                  </div>
                  <Link href="/publications" className="inline-flex items-center gap-2 text-xs font-mono text-foreground hover:text-accent mt-4 transition-colors">
                    Access Complete Archive <ArrowRight size={10} />
                  </Link>
                </div>
              </div>

              {/* Visual Sidebar */}
              <div className="w-full lg:w-1/2 group">
                {/* The lab's own journal covers for this pillar */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-surface border border-line" aria-hidden="true">
                  {cat.coverIds.map((id) => (
                    <div key={id} className="aspect-[3/4] rounded-md bg-white border border-line p-1">
                      <img src={`/images/publications/covers/${id}.webp`} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTELLECTUAL PROPERTY & IMPACT SUMMARY */}
      <section className="py-32 px-6 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-xs font-mono text-accent mb-4">Outcome & Impact</h3>
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">Advancing Science</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
              <Award className="text-accent mb-6" size={40} />
              <h3 className="text-2xl font-medium mb-4 tracking-tight">Core Contribution</h3>
              <p className="text-foreground leading-relaxed">
                Development of diverse C-C and C-N bond-forming reactions via dehydrogenation strategies. These protocols are highly atom-efficient, eliminating hazardous waste.
              </p>
            </div>
            <div className="p-12 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
              <Microscope className="text-secondary mb-6" size={40} />
              <h3 className="text-2xl font-medium mb-4 tracking-tight">Robust Nanocatalysis</h3>
              <p className="text-foreground leading-relaxed">
                Converting homogeneous catalytic systems into heterogeneous versions through stable supports. Our core-shell architectures represent a new frontier in 3d-transition-metal catalysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
