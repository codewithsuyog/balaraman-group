'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { piStats, news } from './data';
import { featuredPublications as publications } from './publications_featured';
import ChemText from '../components/ChemText';
import { useDialogFocus } from '@/components/useDialogFocus';
import FramerCarouselThumbnails from '@/components/ui/framer-thumbnails';

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

  const hasCover = !!pub.coverImage && !coverFailed;

  return (
    <motion.article
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="flex gap-4 md:gap-5 items-start p-4 md:p-5 rounded-lg bg-surface border border-line"
    >
      {hasCover && (
        <div className="w-14 h-[74px] shrink-0 rounded-md bg-white border border-line p-1">
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
        <p className="font-mono text-xs text-muted mb-1 tabular-nums">
          <span className="text-accent">[{pub.id}]</span> {pub.year}{pub.journal && <> · {pub.journal}</>}
        </p>
        {pub.title && (
          <h3 className="text-base md:text-lg font-medium leading-snug text-foreground">
            {pub.doi ? (
              <a
                href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label={`${pub.title} (opens in a new tab)`}
              >
                <ChemText text={pub.title} />
              </a>
            ) : <ChemText text={pub.title} />}
          </h3>
        )}
        {pub.authors && <p className="text-sm text-secondary leading-relaxed mt-1 line-clamp-1 md:line-clamp-none">{pub.authors}</p>}
      </div>
    </motion.article>
  );
};

export default function Home() {
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
    <main id="main" className="flex flex-col items-center w-full overflow-hidden bg-background">
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

      {/* 3. RESEARCH SECTION */}
      <section id="research" className="w-full py-14 md:py-20 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14">
            <h2 className="text-5xl md:text-6xl leading-[0.95] text-foreground">Research</h2>
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
                className="flex flex-col p-6 md:p-8 rounded-lg bg-surface border border-line"
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
      <section id="publications" className="w-full py-14 md:py-20 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-5xl md:text-6xl leading-[0.95] text-foreground mb-3">Publications</h2>
              <p className="text-secondary">Recent work from {piStats.publications}+ published papers</p>
            </div>
            <Link href="/publications" className="inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
              All {piStats.publications} publications <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {publications.slice(0, 5).map((pub) => (
              <FeaturedPublication key={pub.id} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="w-full py-14 md:py-20 px-6 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-5xl md:text-6xl leading-[0.95] text-foreground">News</h2>
            <Link href="/news" className="inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
              All news <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {news.slice(0, 3).map((item) => (
              <li key={item.id} className="p-6 rounded-lg bg-surface border border-line">
                <p className="font-mono text-xs text-muted mb-2">{item.date} · {item.type}</p>
                <h3 className="text-base font-medium text-foreground leading-snug mb-2">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALLERY */}
      <section className="w-full py-14 md:py-20 px-6 border-t border-line">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-5xl md:text-6xl leading-[0.95] text-foreground">Gallery</h2>
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
              All photos <ArrowRight size={16} />
            </Link>
          </div>
          <FramerCarouselThumbnails />
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
              className="relative w-full max-w-md rounded-lg bg-surface border border-line p-6 flex flex-col items-center text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLogoModalOpen(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg bg-white p-3 mt-6 flex items-center justify-center">
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
  );
}
