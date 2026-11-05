'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Mail, MapPin, Globe,
  ArrowUpRight, Briefcase, GraduationCap,
  ExternalLink, Menu, X
} from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import FramerCarouselThumbnails from '@/components/ui/framer-thumbnails';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { 
  patents, piBio, cvLink, 
  team, awards, piStats, news 
} from './data';
import { featuredPublications as publications } from './publications_featured';
import ChemText from '../components/ChemText';
import { useDialogFocus } from '@/components/useDialogFocus';

import { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};


interface PubData {
  id: number;
  year?: number | string;
  title?: string;
  fullText?: string;
  doi?: string;
  journal?: string;
  authors?: string;
  volume?: string;
  pages?: string;
  details?: string;
  coverImage?: string;
  schemeImage?: string;
}

const FeaturedPublication = ({ pub }: { pub: PubData }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const [schemeFailed, setSchemeFailed] = useState(false);

  const hasCover = !!pub.coverImage && !coverFailed;
  const hasScheme = !!pub.schemeImage && !schemeFailed;

  return (
    <motion.article
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
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
        </p>
        {pub.title && (
          <h3 className="text-lg font-medium leading-snug text-foreground mb-2">
            <ChemText text={pub.title} />
          </h3>
        )}
        {pub.authors && <p className="text-sm text-secondary leading-relaxed mb-4">{pub.authors}</p>}
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

const IMG_EXTENSIONS = ['.webp', '.jpg', '.png', '.jpeg'];
const hasFileExt = (path: string) => /\.\w{2,5}$/.test(path);

interface TeamMember {
  name?: string;
  image?: string;
  info?: string;
  email?: string;
  thesis?: string;
  duration?: string;
  present?: string;
}

const TeamMemberThumb = ({ member, role }: { member: TeamMember, role: string }) => {
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
    <div className="flex flex-col items-start text-left group h-full">
      <div className="w-full aspect-[3/4] rounded-xl bg-raised flex items-center justify-center overflow-hidden mb-3 shrink-0">
        <img 
          src={showImage ? src : "/logo.webp"} 
          alt={member.name} 
          loading="lazy" decoding="async"
          className={`w-full h-full object-cover ${!showImage ? 'opacity-50 p-4 object-contain' : ''}`}
          onError={handleError}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <span className="text-sm font-medium text-foreground w-full mb-0.5 block">{member.name}</span>
          <span className="text-xs font-mono text-muted mb-2 block">{role}</span>
          {member.info && (
            <p className="text-xs text-secondary leading-relaxed mb-3">
              {member.info.split(',').map((part: string, idx: number) => (
                <React.Fragment key={idx}>{part.trim()}<br/></React.Fragment>
              ))}
            </p>
          )}
        </div>
        
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-xs text-muted hover:text-accent transition-colors w-full flex items-center gap-1.5 mt-auto pt-2 min-w-0" title={member.email}>
            <Mail size={12} className="shrink-0" />
            <span className="truncate flex-1">{member.email}</span>
          </a>
        )}
      </div>
    </div>
  );
};



export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const logoDialogRef = useDialogFocus<HTMLDivElement>(logoModalOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLogoModalOpen(false);
    };
    if (logoModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [logoModalOpen]);


  const heroImage = '/images/gallery/30.webp';

  useEffect(() => {
    const handleScroll = () => {
      // If user has scrolled to the bottom of the page, activate the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      const sections = ['home', 'pi', 'news', 'research', 'publications', 'patents', 'team', 'gallery', 'contact'];
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
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const researchCategories = useMemo(() => {
    return [
      {
        id: 'homogeneous',
        title: "Homogeneous Catalysis",
        keyPubIds: [118, 117],
        coverIds: [117, 112, 111],
        desc: "Molecularly-defined pincer complexes and metal-ligand cooperation for selective transformations.",
        details: "We design and develop well-defined transition-metal pincer complexes for C-C, C-N bond forming reactions, acceptorless dehydrogenation, hydrogenation, and borrowing hydrogen strategies using earth-abundant metals."
      },
      {
        id: 'heterogeneous',
        title: "Heterogeneous Catalysis",
        keyPubIds: [116, 115],
        coverIds: [115, 106, 85],
        desc: "Robust nanocatalysts and supported systems for sustainable industrial transformations.",
        details: "Our group develops reusable heterogeneous nanocatalysts on graphene/carbon supports for hydrogen generation, CO2 conversion, biomass upgrading, and co-pyrolysis of waste materials."
      }
    ];
  }, []);

  return (
    <>
    <main id="main" className="flex flex-col items-center w-full overflow-hidden bg-background selection:bg-[var(--accent)]/30">
      
      {/* NAVIGATION */}
      <nav
        aria-label="Main"
        className="fixed top-3 inset-x-3 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 rounded-xl bg-surface/95 border border-line px-2 md:px-3 py-1.5 flex flex-col md:flex-row md:items-center gap-1 text-sm"
      >
        <div className="flex items-center justify-between md:justify-start gap-2">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 p-1 rounded-lg"
            aria-label="Raman's Research Lab, back to top"
          >
            <img src="/images/lab-logo-hex-96.webp" alt="" width={28} height={32} className="w-7 h-8 shrink-0 min-w-7" />
          </a>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-foreground hover:bg-raised transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-0.5 pb-2 md:pb-0`}>
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  active
                    ? 'text-foreground underline decoration-2 decoration-[var(--accent)] underline-offset-[6px]'
                    : 'text-secondary hover:text-foreground hover:bg-raised'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <span className="hidden md:block w-px h-5 bg-line mx-1" aria-hidden="true"></span>
          <span className="hidden md:block"><ThemeToggle /></span>
        </div>
      </nav>

      {/* 1. HERO: the group photo full-bleed, the RAMAN wordmark behind the title */}
      <section id="home" className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden px-6">
        <Image
          src={heroImage}
          alt="Dr. Ekambaram Balaraman with the members of Raman's Research Lab on the IISER Tirupati campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Even darkening so the centred title stays readable over faces and sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" aria-hidden="true"></div>

        {/* Wordmark behind the title, as on the original site */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="font-sans font-black uppercase tracking-tighter leading-none text-[120px] sm:text-[200px] md:text-[300px]"
            style={{ color: 'rgba(255, 255, 255, 0.16)', WebkitTextStroke: '2px rgba(0, 0, 0, 0.2)' }}
          >
            RAMAN
          </span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center pt-24 pb-16">
          {/* Hexagon emblem on its own, no box */}
          <button
            type="button"
            onClick={() => setLogoModalOpen(true)}
            aria-label="View the EBR lab emblem"
            className="mx-auto mb-6 md:mb-8 block w-24 sm:w-28 md:w-32 rounded-lg"
          >
            <img
              src="/images/lab-logo-hex-320.webp"
              alt=""
              width={282}
              height={320}
              className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            />
          </button>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-8">
            Raman&apos;s<br />
            <span className="text-[#fbbf24]">Research</span> Lab
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Transition-metal <span className="font-semibold text-white">catalysis</span>, <span className="font-semibold text-white">sustainable chemistry</span>, and <span className="font-semibold text-white">organometallic synthesis</span> at IISER Tirupati.
          </p>
        </div>
      </section>

      {/* 2. PI SECTION */}
      <section id="pi" className="w-full py-20 md:py-28 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          <div className="flex flex-col">
            <div className="w-full aspect-square rounded-2xl overflow-hidden relative bg-raised">
              <Image
                src="/images/pi/PI Photo 2.webp"
                alt="Dr. Ekambaram Balaraman, Principal Investigator of Raman's Research Lab at IISER Tirupati"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            <div className="mt-5 flex items-center gap-2">
              <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors" title="Google Scholar" aria-label="Google Scholar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
              </a>
              <a href={`https://orcid.org/${piStats.orcid}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors" title="ORCID" aria-label="ORCID">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.188-3.722-3.978-3.722h-2.341z"/></svg>
              </a>
              <a href="mailto:eb.raman@iisertirupati.ac.in" className="ml-1 text-sm font-mono text-secondary hover:text-accent transition-colors">eb.raman@iisertirupati.ac.in</a>
            </div>

            {/* LAB NEWS */}
            <div id="news" className="mt-10 pt-8 border-t border-line flex flex-col flex-1">
              <h2 className="text-2xl text-foreground mb-5">Latest updates</h2>
              <div className="relative flex-1 min-h-[380px]">
                <div tabIndex={0} role="region" aria-label="Lab news" className="absolute inset-0 overflow-y-auto pr-2 rounded-lg">
                  <ul className="flex flex-col divide-y divide-[var(--line)]">
                    {news.map((item, idx) => (
                      <li key={`${item.id}-${idx}`} className="py-4 first:pt-0">
                        <p className="font-mono text-xs text-muted mb-1.5">{item.date} · {item.type}</p>
                        <h3 className="text-[15px] font-medium text-foreground leading-snug mb-1.5">{item.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed">{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden="true"></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <p className="text-sm text-muted mb-3">Principal investigator</p>
            <h2 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-3">Dr. Ekambaram Balaraman</h2>
            <p className="text-lg text-secondary mb-8">Associate Professor &amp; Chair, Department of Chemistry, IISER Tirupati</p>

            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-12 max-w-2xl">
              Developing transition-metal catalytic systems for sustainable synthesis and molecular transformations
            </p>

            {/* Scholarly metrics: plain figures, accent only on citations */}
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line mb-4">
              <div className="bg-surface p-5">
                <dt className="text-sm text-muted mb-1">Publications</dt>
                <dd className="text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={piStats.publications} suffix="+" /></dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-sm text-muted mb-1">Citations</dt>
                <dd className="text-3xl font-medium tabular-nums text-accent"><AnimatedCounter target={piStats.citations} formatCommas /></dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-sm text-muted mb-1">h-index</dt>
                <dd className="text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={piStats.hIndex} /></dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-sm text-muted mb-1">US patents granted</dt>
                <dd className="text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={piStats.grantedUSPatents} /></dd>
              </div>
            </dl>
            <p className="font-mono text-xs text-muted mb-12 tabular-nums">
              {piStats.phdCompleted} Ph.D. completed · {piStats.phdPursuing} Ph.D. pursuing · {piStats.postdocs} postdocs · {piStats.mscStudents} MSc students · {piStats.projectFellows} project fellows
            </p>

            <h3 className="text-lg font-medium text-foreground mb-5">Education and career</h3>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-12">
              {piBio.map((item: { year?: string; role?: string; institution?: string; details?: string }, idx) => (
                <li key={idx} className="border-l border-line pl-5">
                  <p className="font-mono text-xs text-muted mb-1 tabular-nums">{item.year}</p>
                  <p className="text-base font-medium text-foreground leading-snug">{item.role}</p>
                  <p className="text-sm text-secondary leading-relaxed">{item.institution}</p>
                  {item.details && <p className="text-sm text-muted leading-relaxed mt-2 max-w-md">{item.details}</p>}
                </li>
              ))}
            </ol>

            <blockquote className="mb-12 border-l-2 border-accent pl-5 max-w-2xl">
              <p className="text-lg text-foreground leading-relaxed">Take risk in life. If you win, you will lead; if you lose, you will guide.</p>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Honours and awards</h3>
                <ul className="space-y-2.5 list-disc pl-5 marker:text-muted">
                  {awards.slice(0, 8).map((award, i) => (
                    <li key={i} className="text-sm text-secondary leading-relaxed">{award}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Courses taught</h3>
                <ul className="space-y-2.5 text-sm text-secondary">
                  <li><span className="font-mono text-muted mr-2">CHM 111</span>Inorganic Chemistry</li>
                  <li><span className="font-mono text-muted mr-2">CHM 211</span>Coordination Chemistry</li>
                  <li><span className="font-mono text-muted mr-2">CHM 411</span>Organometallic Chemistry</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={cvLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-foreground text-background font-medium transition-opacity hover:opacity-90">
                <ExternalLink size={16} /> View CV
              </a>
              <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-line text-foreground font-medium hover:bg-raised transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
                Google Scholar
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. RESEARCH SECTION */}
      <section id="research" className="w-full py-20 md:py-28 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14">
            <h2 className="text-4xl md:text-5xl text-foreground">Research</h2>
            <div className="space-y-4 text-lg text-secondary leading-relaxed">
              <p>
                We explore organometallic chemistry, designing molecular architectures that open new pathways for sustainable catalysis{" "}and selective organic transformations.
              </p>
              <p>
                The lab develops well-defined transition-metal catalytic systems for hydrogen generation, hydrogenation, photocatalysis and C–H activation, bridging homogeneous precision and heterogeneous scalability.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchCategories.map((cat) => (
              <motion.article
                key={cat.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
                className="flex flex-col p-6 md:p-8 rounded-2xl bg-surface border border-line"
              >
                {/* The lab's own journal covers are the visual for each pillar */}
                <div className="flex gap-3 mb-8" aria-hidden="true">
                  {cat.coverIds.map((id) => (
                    <div key={id} className="w-[30%] max-w-[120px] aspect-[3/4] rounded-md bg-white border border-line p-1">
                      <img src={`/images/publications/covers/${id}.webp`} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-3">{cat.title}</h3>
                <p className="text-secondary leading-relaxed mb-6">{cat.details}</p>
                <p className="text-sm text-muted mb-2">Key publications</p>
                <ul className="space-y-2 mb-8">
                  {cat.keyPubIds.map((id) => {
                    const pub = publications.find((p) => p.id === id);
                    return pub && (
                      <li key={id} className="text-sm text-foreground leading-snug">
                        <span className="font-mono text-accent mr-1.5">[{pub.id}]</span><ChemText text={pub.title} />
                      </li>
                    );
                  })}
                </ul>
                <Link href={`/research#${cat.id}`} className="mt-auto inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4">
                  About {cat.title.toLowerCase()} <ArrowRight size={14} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PUBLICATIONS SECTION */}
      <section id="publications" className="w-full py-20 md:py-28 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl text-foreground mb-3">Publications</h2>
              <p className="text-secondary">Recent work from {piStats.publications}+ published papers</p>
            </div>
            <Link href="/publications" className="inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
              All {piStats.publications} publications <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {publications.slice(0, 5).map((pub) => (
              <FeaturedPublication key={pub.id} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* PATENTS PREVIEW SECTION */}
      <section id="patents" className="w-full py-20 md:py-28 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl text-foreground mb-3">Patents</h2>
              <p className="text-secondary">33+ patents filed, including {piStats.grantedUSPatents} granted US patents</p>
            </div>
            <Link href="/patents" className="inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
              All patents <ArrowRight size={16} />
            </Link>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line mb-8">
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">Indian patents filed</dt>
              <dd><span className="block text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={patents.iiser.length + patents.industry.length} suffix="+" /></span><span className="block text-sm text-secondary mt-1">At IISER Tirupati and with industry partners</span></dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">US patents granted</dt>
              <dd className="text-3xl font-medium tabular-nums text-accent"><AnimatedCounter target={piStats.grantedUSPatents} /></dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">Industry collaborations</dt>
              <dd><span className="block text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={patents.industry.length} /></span><span className="block text-sm text-secondary mt-1">GAIL India, Tata Steel and others</span></dd>
            </div>
          </dl>

          <ul className="divide-y divide-[var(--line)] border-y border-line">
            {patents.iiser.slice(0, 3).map((p) => (
              <li key={p.id} className="py-5">
                <p className="font-mono text-xs text-muted mb-1.5 tabular-nums">{p.year} · <span className="text-accent">{p.number}</span></p>
                <h3 className="text-base font-medium text-foreground leading-snug mb-1">{p.title}</h3>
                <p className="text-sm text-secondary">{p.authors}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. PEOPLE */}
      <section id="team" className="w-full py-20 md:py-28 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-foreground mb-12">People</h2>

          <div className="space-y-16">
            {[
              { label: 'Postdoctoral fellows', list: team.postdocs, role: 'Postdoc' },
              { label: 'Ph.D. scholars', list: team.currentPhd, role: 'Ph.D. scholar' },
              { label: 'Project associates', list: team.projectAssociates ?? [], role: 'Project associate' },
              { label: "Master's thesis students", list: team.masters ?? [], role: 'MSc' },
            ].filter((g) => g.list.length > 0).map((group) => (
              <div key={group.label}>
                <h3 className="text-lg font-medium text-foreground mb-6">
                  {group.label} <span className="font-mono text-sm text-muted ml-1 tabular-nums">{group.list.length}</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-8">
                  {group.list.map((member, i) => (
                    <TeamMemberThumb key={i} member={member} role={group.role} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link href="/team#alumni" className="mt-12 inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
            See all alumni <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="w-full py-20 md:py-28 px-6 border-t border-line">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl text-foreground">Gallery</h2>
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
              All photos <ArrowRight size={16} />
            </Link>
          </div>
          <FramerCarouselThumbnails />
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="w-full py-20 md:py-28 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl text-foreground mb-4">Contact</h2>
            <p className="text-lg text-secondary mb-10 max-w-md">
              Interested in joining the group or collaborating? We&apos;d like to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted mb-1">Address</p>
                  <div className="text-foreground leading-relaxed">
                    Department of Chemistry, IISER Tirupati<br />
                    Srinivasapuram Venkatagiri Road, Jangalapalli (G.P), Yerpedu Mandal<br />
                    Durgiperi, Andhra Pradesh 517619, India
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted mb-1">Email</p>
                  <div className="space-y-1">
                    <a href="mailto:eb.raman@iisertirupati.ac.in" className="block text-foreground hover:text-accent transition-colors">eb.raman@iisertirupati.ac.in</a>
                    <a href="mailto:balaramanekambaram@gmail.com" className="block text-foreground hover:text-accent transition-colors">balaramanekambaram@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Globe size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted mb-1">Follow the lab</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={piStats.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-line text-foreground hover:bg-raised transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> X
                    </a>
                    <a href={piStats.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-line text-foreground hover:bg-raised transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-line self-start">
            <h3 className="text-2xl font-medium text-foreground mb-3">Join the lab</h3>
            <p className="text-secondary mb-6 leading-relaxed">
              We welcome motivated Ph.D. students, postdocs and Master&apos;s students. Email Dr. Balaraman your CV and a short note on your research interests.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <GraduationCap size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">Ph.D.</p>
                  <p className="text-sm text-secondary">Apply through IISER Tirupati&apos;s regular Ph.D. admissions</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Briefcase size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">Postdoc</p>
                  <p className="text-sm text-secondary">Apply with a fellowship such as NPDF or an institute fellowship</p>
                </div>
              </li>
            </ul>
            <a
              href="mailto:eb.raman@iisertirupati.ac.in?subject=Joining%20the%20lab"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-accent-fill text-on-accent font-medium transition-opacity hover:opacity-90"
            >
              <Mail size={16} aria-hidden="true" /> Email Dr. Balaraman
            </a>
          </div>
        </div>
      </section>

      {/* LAB EMBLEM DIALOG */}
      <AnimatePresence>
        {logoModalOpen && (
          <motion.div
            ref={logoDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="EBR lab emblem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80"
            onClick={() => setLogoModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl bg-surface border border-line p-6 flex flex-col items-center text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLogoModalOpen(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-xl bg-white p-3 mt-6 flex items-center justify-center">
                <img src="/images/lab-logo-square.webp" alt="EBR lab emblem: Sustainable Chemistry via Catalysis" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl text-foreground mt-6">Raman&apos;s Research Lab</h2>
              <p className="text-sm text-secondary text-center mt-2 max-w-sm">
                Transition-metal catalysis, sustainable chemistry and organometallic synthesis at IISER Tirupati
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
      {/* FOOTER */}
      <footer className="w-full border-t border-line bg-surface pt-14 pb-10">

        <div className="max-w-7xl mx-auto px-6">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-line">
            
            {/* Col 1 & 2: Brand Identity */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3.5">
                {/* White Logo Badge */}
                <button
                  type="button"
                  onClick={() => setLogoModalOpen(true)}
                  aria-label="View the EBR lab emblem"
                  className="shrink-0 rounded-lg"
                >
                  <img src="/images/lab-logo-hex-96.webp" alt="" width={42} height={48} className="w-[42px] h-12" />
                </button>
                <div>
                  <p className="text-lg font-medium text-foreground">Raman&apos;s Research Lab</p>
                  <p className="text-sm text-muted">Department of Chemistry, IISER Tirupati</p>
                </div>
              </div>
            </div>

            {/* Col 3: Quick Navigation */}
            <div>
              <p className="text-sm text-muted mb-3">Navigation</p>
              <ul className="space-y-2.5 text-sm text-secondary">
                <li><a href="#home" className="hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#pi" className="hover:text-foreground transition-colors">About PI</a></li>
                <li><Link href="/team" className="hover:text-foreground transition-colors">People</Link></li>
                <li><Link href="/research" className="hover:text-foreground transition-colors">Research</Link></li>
                <li><Link href="/publications" className="hover:text-foreground transition-colors">Publications</Link></li>
                <li><Link href="/gallery" className="hover:text-foreground transition-colors">Gallery</Link></li>
                <li><Link href="/alumni" className="hover:text-foreground transition-colors">Alumni</Link></li>
              </ul>
            </div>

            {/* Col 4: Research Pillars */}
            <div>
              <p className="text-sm text-muted mb-3">Research Focus</p>
              <ul className="space-y-2.5 text-sm text-secondary">
                <li><Link href="/research" className="hover:text-foreground transition-colors">Homogeneous catalysis</Link></li>
                <li><Link href="/research" className="hover:text-foreground transition-colors">Heterogeneous catalysis</Link></li>
                <li><Link href="/research" className="hover:text-foreground transition-colors">Pincer complex chemistry</Link></li>
                <li><Link href="/research" className="hover:text-foreground transition-colors">Hydrogen generation</Link></li>
                <li><Link href="/research" className="hover:text-foreground transition-colors">CO₂ and C1 chemistry</Link></li>
                <li><Link href="/patents" className="hover:text-foreground transition-colors">Patents</Link></li>
              </ul>
            </div>

            {/* Col 5: Location & Contact */}
            <div>
              <p className="text-sm text-muted mb-3">Contact</p>
              <p className="text-sm text-secondary leading-relaxed mb-3">
                IISER Tirupati, Yerpedu Mandal,<br />
                Andhra Pradesh 517619, India
              </p>
              <a 
                href="mailto:eb.raman@iisertirupati.ac.in" 
                className="text-sm text-accent hover:underline underline-offset-4 block break-all mb-3"
              >
                eb.raman@iisertirupati.ac.in
              </a>
              <a 
                href="https://www.iisertirupati.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
              >
                iisertirupati.ac.in <ArrowUpRight size={12} />
              </a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <p>{`© ${new Date().getFullYear()} Raman's Research Lab. All rights reserved`}</p>
              <span className="hidden md:inline" aria-hidden="true">·</span>
              <p>
                Designed and developed by <span className="font-medium text-foreground">Suyog Andhare</span>
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                title="Google Scholar" aria-label="Google Scholar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
              </a>
              <a href={`https://orcid.org/${piStats.orcid}`} target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                title="ORCID" aria-label="ORCID">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.188-3.722-3.978-3.722h-2.341z"/></svg>
              </a>
              <a href={piStats.twitter} target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                title="X" aria-label="X">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={piStats.linkedin} target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                title="LinkedIn" aria-label="LinkedIn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
              </a>
              <a href="mailto:eb.raman@iisertirupati.ac.in" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                title="Email" aria-label="Email">
                <Mail size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
