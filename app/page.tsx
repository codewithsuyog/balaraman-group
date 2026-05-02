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

const IMG_EXTENSIONS = ['.jpg', '.png', '.jpeg', '.webp'];
const hasFileExt = (path: string) => /\.\w{2,5}$/.test(path);

const TeamMemberThumb = ({ member, role }: { member: any, role: string }) => {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const imagePath = member.image || '';
  const needsProbe = imagePath && !hasFileExt(imagePath);
  const src = !imagePath
    ? ''
    : needsProbe
      ? `${imagePath}${IMG_EXTENSIONS[extIdx]}`
      : imagePath;

  const handleError = () => {
    if (needsProbe && extIdx < IMG_EXTENSIONS.length - 1) {
      setExtIdx(extIdx + 1);
    } else {
      setFailed(true);
    }
  };

  const showImage = src && !failed;

  return (
    <div className="flex flex-col items-start text-left group">
      <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-blue-500/30 transition-all">
        <img 
          src={showImage ? src : "/logo.png"} 
          alt={member.name} 
          className={`w-full h-full object-cover transition-all duration-700 ${!showImage ? 'opacity-20 p-4 object-contain' : ''}`}
          onError={handleError}
        />
      </div>
      <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate w-full mb-1">{member.name}</span>
      <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest mb-2">{role}</span>
      {member.info && (
        <p className="text-[9px] text-white/50 leading-relaxed line-clamp-3 mb-1 font-light">
          {member.info.split(',').map((part: string, idx: number) => (
            <React.Fragment key={idx}>{part.trim()}<br/></React.Fragment>
          ))}
        </p>
      )}
      {member.email && (
        <a href={`mailto:${member.email}`} className="text-[9px] text-blue-400/70 hover:text-blue-400 transition-colors truncate w-full flex items-center gap-1 mt-auto pt-2">
          <Mail size={10} /> {member.email}
        </a>
      )}
    </div>
  );
};

const AlumniThumb = ({ member }: { member: any }) => {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const imagePath = member.image || '';
  const needsProbe = imagePath && !hasFileExt(imagePath);
  const src = !imagePath
    ? ''
    : needsProbe
      ? `${imagePath}${IMG_EXTENSIONS[extIdx]}`
      : imagePath;

  const handleError = () => {
    if (needsProbe && extIdx < IMG_EXTENSIONS.length - 1) {
      setExtIdx(extIdx + 1);
    } else {
      setFailed(true);
    }
  };

  const showImage = src && !failed;

  return (
    <div className="flex flex-col items-start text-left group">
      <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-emerald-500/30 transition-all">
        <img 
          src={showImage ? src : "/logo.png"} 
          alt={member.name} 
          className={`w-full h-full object-cover transition-all duration-700 ${!showImage ? 'opacity-20 p-4 object-contain' : ''}`}
          onError={handleError}
        />
      </div>
      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">{member.name}</h3>
      <p className="text-[10px] text-white/40 font-light leading-relaxed mb-2 line-clamp-2">{member.thesis}</p>
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[9px] font-mono text-emerald-500/50">{member.duration}</span>
      </div>
      {member.present && (
        <p className="text-[9px] text-white/30 mt-1 italic line-clamp-1 flex gap-1">
          <span className="text-emerald-500/30">Currently:</span> {member.present}
        </p>
      )}
    </div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const heroImage = '/images/group-photo.jpg';

  useEffect(() => {
    const handleScroll = () => {
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
          const isExternal = link.href?.startsWith('/');
          const href = isExternal ? link.href : `/#${link.id}`;
          
          return (
            <Link 
              key={link.id}
              href={href as string}
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
            </Link>
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

        {/* Background watermark text */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[200px] md:text-[300px] font-black uppercase tracking-tighter leading-none" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}>RAMAN</span>
        </div>

        <div className="z-10 max-w-6xl mx-auto text-center mt-12 relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10 text-xs sm:text-sm font-mono text-[var(--color-accent-light)] uppercase tracking-widest border border-white/10">
              IISER Tirupati • Department of Chemistry
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative">
            
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
            
            <div className="mt-8 flex flex-col items-center gap-3">
               <div className="flex justify-center gap-6">
                 <a href="mailto:eb.raman@iisertirupati.ac.in" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500 transition-all"><Mail size={20} /></a>
                 <a href="https://www.iisertirupati.ac.in/faculty/chemistry/eb-raman" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500 transition-all"><Globe size={20} /></a>
               </div>
               <p className="text-sm md:text-base font-mono text-white/60 tracking-wider">eb.raman@iisertirupati.ac.in</p>
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

            <div className="mb-12">
               <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                 <Shield size={20} className="text-blue-500" /> Honours & Awards
               </h3>
               <ul className="space-y-3">
                 {awards.slice(0, 6).map((award, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm text-white/70 font-light leading-relaxed">
                     <ChevronRight size={14} className="text-blue-500 mt-1 shrink-0" />
                     <span>{award}</span>
                   </li>
                 ))}
               </ul>
            </div>

            <div className="mb-16">
               <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                 <BookOpen size={20} className="text-blue-500" /> Courses & Projects
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                     <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">Courses Offered</h4>
                     <ul className="space-y-2 text-sm text-white/60 font-light">
                        <li>• CHM 111: Inorganic Chemistry</li>
                        <li>• CHM 211: Coordination Chemistry</li>
                        <li>• CHM 411: Organometallic Chemistry</li>
                     </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                     <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">Sponsored Projects</h4>
                     <ul className="space-y-2 text-sm text-white/60 font-light">
                        <li>• DST-SERB Core Research Grant</li>
                        <li>• CSIR Extramural Research Grant</li>
                        <li>• GAIL India Collaborative Project</li>
                     </ul>
                  </div>
               </div>
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
              View All 117 Publications <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex flex-col gap-12">
            {publications.slice(0, 5).map((pub) => (
              <FeaturedPublication key={pub.id} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* PATENTS PREVIEW SECTION */}
      <section id="patents" className="w-full py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-blue-500"></div>
                <p className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase">Intellectual Property</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">Patents</h2>
              <p className="text-white/40 font-light">33+ patents filed including {patents.grantedUS.length} granted US patents.</p>
            </div>
            <Link href="/patents" className="px-8 py-4 rounded-full border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-500/10 transition-all flex items-center gap-2 uppercase text-[10px] tracking-widest font-mono">
              View All Patents <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="text-5xl font-black text-blue-500 mb-4">{patents.iiser.length + patents.industry.length}</div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Indian Patents</h3>
              <p className="text-white/40 text-sm font-light">Filed at IISER Tirupati & with industry partners</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="text-5xl font-black text-emerald-500 mb-4">{patents.grantedUS.length}</div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Granted US Patents</h3>
              <p className="text-white/40 text-sm font-light">International intellectual property portfolio</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="text-5xl font-black text-orange-500 mb-4">{patents.industry.length}</div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Industry Collaborations</h3>
              <p className="text-white/40 text-sm font-light">GAIL India, Tata Steel & more</p>
            </div>
          </div>

          <div className="space-y-4">
            {patents.iiser.slice(0, 3).map((p) => (
              <div key={p.id} className="flex gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Shield size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{p.year}</span>
                    <span className="text-[10px] text-white/20 font-mono">#{p.number}</span>
                  </div>
                  <h4 className="text-base font-bold text-white/80 group-hover:text-blue-400 transition-colors leading-snug mb-1">{p.title}</h4>
                  <p className="text-xs text-white/30 font-light">{p.authors}</p>
                </div>
              </div>
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
                    <TeamMemberThumb key={i} member={member} role="Postdoc" />
                  ))}
                </div>
              </div>

              {/* PhD Scholars */}
              <div>
                <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 text-left">PhD Scholars</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.currentPhd.map((member, i) => (
                    <TeamMemberThumb key={i} member={member} role="PhD Scholar" />
                  ))}
                </div>
              </div>

              {/* Masters */}
              <div>
                <h3 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 text-left">Master&apos;s Students</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.masters.map((member, i) => (
                    <TeamMemberThumb key={i} member={member} role="Master's Student" />
                  ))}
                </div>
              </div>

              {/* Lab Memories Preview */}
              <div className="pt-16 border-t border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-pink-500"></div>
                  <h3 className="text-xs font-mono text-pink-500 uppercase tracking-[0.4em]">Lab Memories & Outings</h3>
                </div>
                <p className="text-white/30 font-light text-sm mb-10 text-left">Glimpses of our vibrant group life inside and outside the lab.</p>
                
                <div className="w-full relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 p-4 mb-8">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="min-w-[300px] h-[200px] rounded-2xl bg-white/5 overflow-hidden snap-center flex-shrink-0">
                        <img 
                          src={`/gallery/${i}.jpg`} 
                          alt={`Lab Memory ${i}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          onError={(e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.className = "w-full h-full object-contain opacity-20 p-8"; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/gallery" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-pink-500/30 text-pink-400 font-bold hover:bg-pink-500/10 transition-all uppercase text-[10px] tracking-widest font-mono mx-auto">
                  View Full Gallery <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <Link href="/team" className="mt-20 px-10 py-5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-2xl flex items-center gap-3">
               Explore Full Team & Alumni Registry <ArrowRight size={18} />
            </Link>
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
