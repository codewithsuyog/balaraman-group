'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, ArrowLeft, FileText, Mail, MapPin, Phone, 
  Microscope, FlaskConical, 
  Beaker, Globe, Award, Zap, Shield, BookOpen,
  ArrowUpRight, Download, Users, Briefcase, GraduationCap,
  ExternalLink, ChevronRight, Menu, X, Leaf, Database, ZapOff
} from 'lucide-react';
import { 
  publications, patents, piBio, cvLink, 
  opportunities, team 
} from './data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const PublicationLink = ({ pub }: { pub: any }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const extensions = ['.jpg', '.png', '.gif', '.jpeg', '.webp'];
  const [coverExtIdx, setCoverExtIdx] = useState(0);

  return (
    <div className="group/pub flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-blue-500/20 hover:bg-white/10 transition-all">
      <div className="w-20 h-24 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-white/10 p-1">
            <img 
               src={coverFailed ? "/logo.png" : `/publications/covers/${pub.id}${extensions[coverExtIdx]}`} 
               alt="Cover" 
               className="w-full h-full object-contain opacity-50 group-hover/pub:opacity-100 transition-opacity"
               onError={() => coverExtIdx < extensions.length - 1 ? setCoverExtIdx(coverExtIdx + 1) : setCoverFailed(true)}
            />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{pub.year}</span>
          <span className="text-[10px] text-white/30 font-mono italic truncate max-w-[200px]">{pub.journal}</span>
        </div>
        <p className="text-sm text-white/70 font-light leading-relaxed">
          <span className="text-blue-400 font-bold mr-2">{pub.id}.</span>
          {pub.authors}. {pub.title}. <span className="italic">{pub.journal}</span>, {pub.year}{pub.details}
        </p>
        <a 
          href={pub.doi?.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-2 mt-3 text-[10px] font-bold text-blue-500/80 hover:text-blue-400 transition-colors"
        >
          DOI: {pub.doi} <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
};

const FeaturedPublication = ({ pub }: { pub: any }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const [schemeFailed, setSchemeFailed] = useState(false);
  const extensions = ['.jpg', '.png', '.gif', '.jpeg', '.webp'];
  const [coverExtIdx, setCoverExtIdx] = useState(0);
  const [schemeExtIdx, setSchemeExtIdx] = useState(0);

  return (
    <motion.div 
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="group relative flex flex-col gap-8 p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase border border-blue-500/20">
              {pub.year}
            </span>
            <span className="text-xs text-white/30 font-mono italic">{pub.journal}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
            {pub.title}
          </h3>
          <p className="text-base text-white/60 font-light leading-relaxed mb-8">
            <span className="text-blue-400 font-bold mr-2">{pub.id}.</span>
            {pub.authors}. <span className="italic">{pub.journal}</span>, {pub.year}{pub.details}
          </p>
          <div className="flex items-center gap-4">
            <a 
              href={pub.doi?.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
              target="_blank" 
              rel="noreferrer" 
              className="px-8 py-4 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest"
            >
              Read Publication <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-[45%] flex flex-col sm:flex-row gap-6 items-center">
           <div className="w-[140px] h-56 rounded-2xl bg-white border border-white/10 overflow-hidden relative group-hover:border-blue-500/40 transition-all p-2 shadow-2xl shrink-0">
             <img 
               src={coverFailed ? "/logo.png" : `/publications/covers/${pub.id}${extensions[coverExtIdx]}`} 
               alt="Cover" 
               className={`w-full h-full object-contain ${coverFailed ? 'opacity-20' : ''}`}
               onError={() => coverExtIdx < extensions.length - 1 ? setCoverExtIdx(coverExtIdx + 1) : setCoverFailed(true)}
             />
             <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/50 backdrop-blur-md rounded text-[6px] font-mono uppercase tracking-widest text-white/40">Cover</div>
           </div>
           <div className="flex-1 w-full h-56 rounded-2xl bg-white border border-white/10 overflow-hidden relative group-hover:border-blue-500/40 transition-all p-2 shadow-2xl">
             <img 
               src={schemeFailed ? "/logo.png" : `/publications/schemes/${pub.id}${extensions[schemeExtIdx]}`} 
               alt="Scheme" 
               className={`w-full h-full object-contain ${schemeFailed ? 'opacity-20' : ''}`}
               onError={() => schemeExtIdx < extensions.length - 1 ? setSchemeExtIdx(schemeExtIdx + 1) : setSchemeFailed(true)}
             />
             <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/50 backdrop-blur-md rounded text-[6px] font-mono uppercase tracking-widest text-white/40">Scheme</div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const heroImage = '/images/group-photo.jpg';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'pi', 'research', 'publications', 'team', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'pi', label: 'PI' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'patents', label: 'Patents' },
    { id: 'team', label: 'People' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const researchCategories = useMemo(() => {
    return [
      {
        id: 'catalysis',
        title: "Catalysis & Sustainability",
        image: "/images/research/catalysis.png",
        icon: <FlaskConical className="text-blue-400" />,
        desc: "Advancing Green Chemistry through high-performance catalytic systems.",
        details: "We have developed diverse C-C and C-N bond-forming reactions via dehydrogenation/borrowing hydrogenation strategy using bioderived alcohols."
      },
      {
        id: 'c1',
        title: "Sustainable C1 Chemistry",
        image: "/images/research/green_synthesis.png",
        icon: <Leaf className="text-emerald-400" />,
        desc: "Harnessing C1 building blocks like CO2 for complex molecule synthesis.",
        details: "Our research focuses on the catalytic conversion of atmospheric CO2 into value-added chemicals, replacing hazardous reagents."
      },
      {
        id: 'energy',
        title: "Renewable Energy",
        image: "/images/research/renewable.png",
        icon: <Zap className="text-orange-400" />,
        desc: "Pioneering chemical solutions for the global energy transition.",
        details: "Developing efficient methods for hydrogen production from feedstocks and storage through molecular catalysis."
      },
      {
        id: 'organometallic',
        title: "Organometallic Chemistry",
        image: "/images/research/organometallic.png",
        icon: <Beaker className="text-purple-400" />,
        desc: "Designing transition-metal complexes with tailored pincer ligands.",
        details: "Exploring metal-ligand cooperation (MLC) patterns to unlock new reactivity for atom-efficient transformations."
      }
    ];
  }, []);

  return (
    <main className="flex flex-col items-center w-full overflow-hidden bg-[var(--background)] selection:bg-[var(--accent)]/30">
      
      {/* FLOATING NAVIGATION MENU */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-2 md:px-4 py-2 flex gap-1 md:gap-2 text-[10px] md:text-xs font-mono border border-white/10 max-w-[95vw] overflow-x-auto no-scrollbar shadow-2xl"
      >
        {navLinks.map((link) => {
          return (
            <a 
              key={link.id}
              href={`#${link.id}`}
              className={`px-4 py-2 rounded-full transition-all duration-500 ease-out whitespace-nowrap relative group ${
                activeSection === link.id 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.label}
            </a>
          );
        })}
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        <motion.div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute inset-0 bg-cover bg-center blur-[8px]"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/70 via-[var(--background)]/90 to-[var(--background)]"></div>
        </motion.div>

        <div className="z-10 max-w-6xl mx-auto text-center mt-12 relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10 text-xs sm:text-sm font-mono text-[var(--color-accent-light)] uppercase tracking-widest border border-white/10">
              IISER Tirupati • Department of Chemistry
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative">
            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.12] z-1 blur-[10px]">
              <h1 className="text-[35vw] font-black uppercase leading-none tracking-tighter text-blue-500/20">Raman</h1>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/20 relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] leading-[0.9]">
              Raman's <br className="hidden md:block"/> Research Lab
            </h1>
          </motion.div>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-lg md:text-2xl text-[var(--color-muted)] max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Pioneering the future of <span className="text-white font-medium">catalysis</span>, <span className="text-white font-medium">sustainable chemistry</span>, and complex <span className="text-white font-medium">organometallic systems</span>.
          </motion.p>
        </div>
      </section>

      {/* 2. PI SECTION */}
      <section id="pi" className="w-full py-32 px-6 relative z-10 bg-white/[0.02]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
          
          <div className="w-full lg:w-1/3 sticky top-32">
            <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full -z-10"></div>
            <div className="w-full aspect-[3/4] rounded-[3rem] border border-white/10 relative overflow-hidden group cursor-crosshair shadow-2xl bg-white/5">
               <div className="absolute inset-0 bg-[url('/pi/pi-profile-1.jpg')] bg-cover bg-top transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"></div>
               <div className="absolute inset-0 bg-[url('/pi/pi-profile-2.jpg')] bg-cover bg-top opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"></div>
            </div>
            
            <div className="mt-8 flex justify-center gap-6">
               <a href="mailto:eb.raman@iisertirupati.ac.in" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500 transition-all"><Mail size={20} /></a>
               <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500 transition-all"><Globe size={20} /></a>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-6">Principal Investigator</div>
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-white">Dr. E. Balaraman</h2>
            <h3 className="text-xl text-blue-400 mb-8 font-light tracking-tight">Associate Professor & Chair, Department of Chemistry</h3>
            
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 italic border-l-4 border-blue-500 pl-8">
              "Leading the frontier of sustainable catalysis and molecular engineering through innovative transition-metal systems."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
              {piBio.map((item, idx) => (
                <div key={idx} className="flex flex-col group">
                  <span className="text-[10px] font-bold text-blue-400 mb-2 font-mono tracking-widest uppercase">{item.year}</span>
                  <div className="flex-1 border-l-2 border-white/5 pl-6 group-hover:border-blue-500 transition-colors">
                    <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-tight mb-1">{item.role}</h4>
                    <p className="text-xs text-white/30 font-light leading-tight">{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-16 p-10 rounded-[3rem] bg-blue-500/5 border border-blue-500/10 italic text-white/90 relative group">
               <span className="absolute -top-6 -left-4 text-8xl text-blue-500/10 font-serif font-black">"</span>
               <p className="text-xl md:text-2xl font-light leading-relaxed relative z-10 text-white/70">
                 Take risk in life. If you win, you will lead; if you lose, you will guide.
               </p>
            </div>

            <div className="flex flex-wrap gap-6">
               <a href={cvLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                  <Download size={20} /> Download Academic CV
               </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. RESEARCH SECTION */}
      <section id="research" className="w-full py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-32">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px w-12 bg-blue-500"></div>
               <p className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase">Laboratory Focus</p>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-12 text-gradient leading-[0.9]">Research</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <p className="text-xl md:text-2xl text-[var(--color-muted)] font-light leading-relaxed border-l-4 border-blue-500 pl-8 italic">
                 "Our group works in the areas of Organic/Organometallic Chemistry and Sustainable Catalysis. Our research primarily focuses on generating resources for green energy and recycling atmospheric waste."
               </p>
               <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
                  <p>
                    Specifically, we work on the design and development of catalytic materials for hydrogen generation from feedstocks, sustainable chemical synthesis, and conversion of CO2 to value-added products.
                  </p>
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchCategories.map((cat, idx) => (
              <motion.div 
                key={cat.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                className="group relative h-[450px] md:h-[550px] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-700"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${cat.image})` }}></div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 group-hover:via-blue-900/40 transition-all duration-700"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-left">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">Pillar {idx + 1}</span>
                  <h3 className="text-2xl md:text-5xl font-black mb-6 tracking-tighter text-white uppercase leading-[0.8]">{cat.title}</h3>
                  <p className="text-base text-white/70 font-light leading-relaxed mb-8 max-w-sm line-clamp-3 opacity-80 group-hover:opacity-100 transition-all">
                    {cat.details}
                  </p>
                  <Link href="/research" className="flex items-center gap-3 px-8 py-4 rounded-full glass border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:border-blue-600 transition-all">
                     Dive Deeper <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PUBLICATIONS SECTION */}
      <section id="publications" className="w-full py-32 px-6 relative z-10 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">Publications</h2>
              <p className="text-white/40 font-light">Highlights from our 117+ published works.</p>
            </div>
            <Link href="/publications" className="px-8 py-4 rounded-full border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-500/10 transition-all flex items-center gap-2 uppercase text-[10px] tracking-widest font-mono">
              Full Archive <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex flex-col gap-12">
            {publications.slice(0, 5).map((pub) => (
              <FeaturedPublication key={pub.id} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM & GALLERY PREVIEW SECTION */}
      <section id="team" className="w-full py-32 px-6 relative z-10 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter text-white">Lab Members</h2>
            
            <div className="w-full space-y-24">
              {/* Postdocs */}
              <div>
                <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 text-left">Post-doctoral Fellows</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.postdocs.map((member, i) => (
                    <div key={i} className="flex flex-col items-start text-left group">
                        <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-blue-500/30 transition-all">
                          <img 
                            src={member.image || "/logo.png"} 
                            alt={member.name} 
                            className={`w-full h-full object-cover transition-all duration-700 ${!member.image ? 'opacity-20 p-4' : ''}`}
                            onError={(e) => (e.currentTarget.src = "/logo.png")}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate w-full mb-1">{member.name}</span>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Postdoc</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PhD Scholars */}
              <div>
                <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 text-left">PhD Scholars</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.currentPhd.slice(0, 6).map((member, i) => (
                    <div key={i} className="flex flex-col items-start text-left group">
                        <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-blue-500/30 transition-all">
                          <img 
                            src={member.image || "/logo.png"} 
                            alt={member.name} 
                            className={`w-full h-full object-cover transition-all duration-700 ${!member.image ? 'opacity-20 p-4' : ''}`}
                            onError={(e) => (e.currentTarget.src = "/logo.png")}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate w-full mb-1">{member.name}</span>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">PhD Scholar</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Masters */}
              <div>
                <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 text-left">Master's Students</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.masters.slice(0, 6).map((member, i) => (
                    <div key={i} className="flex flex-col items-start text-left group">
                        <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-blue-500/30 transition-all">
                          <img 
                            src={member.image || "/logo.png"} 
                            alt={member.name} 
                            className={`w-full h-full object-cover transition-all duration-700 ${!member.image ? 'opacity-20 p-4' : ''}`}
                            onError={(e) => (e.currentTarget.src = "/logo.png")}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate w-full mb-1">{member.name}</span>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Master's Student</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/team" className="mt-20 px-10 py-5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-2xl">
               View All Members
            </Link>
         </div>
      </section>

      <section id="contact" className="w-full py-32 px-6 relative z-10 bg-[#050505]">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-10">Contact Us</h2>
                  <p className="text-xl text-white/40 font-light mb-12 max-w-md leading-relaxed">
                     Interested in our research or looking for opportunities? Get in touch with us at IISER Tirupati.
                  </p>
                  
                  <div className="space-y-8">
                     <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">Location</h4>
                           <p className="text-white/60 text-sm leading-relaxed">
                              Indian Institute of Science Education and Research (IISER) Tirupati<br/>
                              Transit Campus: Sree Rama Engineering College Campus, <br/>
                              Karakambadi Road, Tirupati - 517507, India
                           </p>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                           <Mail size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">Email</h4>
                           <p className="text-white/60 text-sm leading-relaxed">eb.raman@labs.iisertirupati.ac.in</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                           <Phone size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">Phone</h4>
                           <p className="text-white/60 text-sm leading-relaxed">+91 (877) 2500 452</p>
                        </div>
                     </div>
                  </div>
               </motion.div>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Send a Message</h3>
                     <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                           <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-blue-500 transition-all outline-none" />
                           <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-blue-500 transition-all outline-none" />
                        </div>
                        <textarea placeholder="Your message..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-blue-500 transition-all outline-none"></textarea>
                        <button className="w-full py-5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs">
                           Send Message
                        </button>
                     </form>
                  </div>
                  {/* Decorative background blur */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="w-full py-32 px-6 relative z-10">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-blue-600/5 border border-blue-500/10 p-12 md:p-16 rounded-[4rem] backdrop-blur-xl">
               <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter text-white">Get in Touch</h2>
               <div className="space-y-10">
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><MapPin /></div>
                     <div>
                        <h4 className="font-bold text-white mb-1">Office Location</h4>
                        <p className="text-sm text-white/40 font-light leading-relaxed">Room No. 308, Transit Campus <br/> IISER Tirupati, Andhra Pradesh - 517507, India</p>
                     </div>
                  </div>
                  <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><Mail /></div>
                     <div>
                        <h4 className="font-bold text-white mb-1">Email Inquiry</h4>
                        <p className="text-sm text-white/40 font-light leading-relaxed hover:text-blue-400 cursor-pointer transition-colors">eb.raman@iisertirupati.ac.in</p>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 px-6 border-t border-white/5 bg-black/50 backdrop-blur-md relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
               © 2024 Raman's Research Lab | IISER Tirupati
            </p>
         </div>
      </footer>

    </main>
  );
}
