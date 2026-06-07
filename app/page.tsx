'use client';

import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, ArrowLeft, FileText, Mail, MapPin, Phone, 
  Microscope, FlaskConical, 
  Beaker, Globe, Award, Zap, Shield, BookOpen,
  ArrowUpRight, Download, Users, Briefcase, GraduationCap,
  ExternalLink, ChevronRight, Menu, X, Leaf, Database, ZapOff,
  Play, Pause, Volume2, VolumeX, Video
} from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  patents, piBio, cvLink, 
  opportunities, team, awards, piStats, news 
} from './data';
import { featuredPublications as publications } from './publications_featured';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const PublicationLink = ({ pub }: { pub: any }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const extensions = ['.webp', '.jpg', '.png', '.gif', '.jpeg'];
  const [coverExtIdx, setCoverExtIdx] = useState(0);

  return (
    <div className="group/pub flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] bg-foreground/5 border border-foreground/5 hover:border-amber-500/20 hover:bg-foreground/10 transition-all">
      <div className="w-20 h-24 rounded-lg bg-foreground overflow-hidden flex-shrink-0 border border-foreground/10 p-1">
            <img 
               src={coverFailed ? "/logo.png" : `/images/publications/covers/${pub.id}${extensions[coverExtIdx]}`} 
               alt="Cover" 
               loading="lazy"
               className="w-full h-full object-contain opacity-50 group-hover/pub:opacity-100 transition-opacity"
               onError={() => coverExtIdx < extensions.length - 1 ? setCoverExtIdx(coverExtIdx + 1) : setCoverFailed(true)}
            />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{pub.year}</span>
        </div>
        {pub.title && (
          <p className="text-sm font-bold text-foreground mb-1 leading-snug">{pub.title}</p>
        )}
        <p className="text-xs text-foreground/90 font-light leading-relaxed line-clamp-2">{pub.fullText}</p>
        {pub.doi && (
          <a 
            href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 mt-3 text-[10px] font-bold text-amber-500/80 hover:text-amber-400 transition-colors"
          >
            DOI: {pub.doi} <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  );
};

const FeaturedPublication = ({ pub }: { pub: any }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const [schemeFailed, setSchemeFailed] = useState(false);
  const extensions = ['.webp', '.jpg', '.png', '.gif', '.jpeg'];
  const [coverExtIdx, setCoverExtIdx] = useState(0);
  const [schemeExtIdx, setSchemeExtIdx] = useState(0);

  const hasCover = !coverFailed;
  const hasScheme = !schemeFailed;

  return (
    <motion.div 
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="group relative flex flex-col gap-8 p-5 md:p-10 rounded-2xl md:rounded-[3rem] bg-foreground/[0.03] border border-foreground/10 hover:border-amber-500/30 hover:bg-foreground/5 transition-all duration-500 shadow-xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Cover Image - Left */}
        {hasCover && (
          <div className="w-[120px] h-48 rounded-2xl bg-foreground border border-foreground/10 overflow-hidden relative group-hover:border-amber-500/40 transition-all p-2 shadow-2xl shrink-0">
            <img 
              key={`cover-home-${pub.id}-${coverExtIdx}`}
              src={`/images/publications/covers/${pub.id}${extensions[coverExtIdx]}`} 
              alt="Cover" 
              loading="lazy"
              className="w-full h-full object-contain"
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
            {pub.journal && pub.journal.length < 20 && (
              <span className="text-xs text-foreground/90 font-mono italic">{pub.journal}</span>
            )}
          </div>
          
          <div className="text-base text-foreground leading-relaxed mb-6 font-light border-l-2 border-amber-500/30 pl-6">
            <span className="text-amber-400 font-bold mr-2 text-lg">{pub.id}.</span>
            {pub.title && (
              <strong className="block text-foreground text-lg font-bold mb-2 leading-snug tracking-tight not-italic">{pub.title}</strong>
            )}
            <span className="text-sm text-foreground">{pub.fullText || `${pub.authors}. ${pub.title}. ${pub.journal}, ${pub.year}${pub.details}`}</span>
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
              key={`scheme-home-${pub.id}-${schemeExtIdx}`}
              src={`/images/publications/schemes/${pub.id}${extensions[schemeExtIdx]}`} 
              alt="Scheme" 
              loading="lazy"
              className="w-full h-full object-contain"
              onError={() => schemeExtIdx < extensions.length - 1 ? setSchemeExtIdx(prev => prev + 1) : setSchemeFailed(true)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const IMG_EXTENSIONS = ['.webp', '.jpg', '.png', '.jpeg'];
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
    <div className="flex flex-col items-start text-left group h-full">
      <div className="w-full aspect-[3/4] rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-amber-500/30 transition-all shrink-0">
        <img 
          src={showImage ? src : "/logo.png"} 
          alt={member.name} 
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ${!showImage ? 'opacity-50 p-4 object-contain brightness-150' : ''}`}
          onError={handleError}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <span className="text-[10px] font-bold text-foreground uppercase tracking-wider truncate w-full mb-1 block">{member.name}</span>
          <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest mb-2 block">{role}</span>
          {member.info && (
            <p className="text-[10px] text-foreground leading-relaxed mb-4 font-light">
              {member.info.split(',').map((part: string, idx: number) => (
                <React.Fragment key={idx}>{part.trim()}<br/></React.Fragment>
              ))}
            </p>
          )}
        </div>
        
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-[11px] font-semibold text-accent hover:text-accent-light transition-colors w-full flex items-center gap-1.5 mt-auto pt-3 min-w-0" title={member.email}>
            <Mail size={12} className="shrink-0" />
            <span className="truncate flex-1">{member.email}</span>
          </a>
        )}
      </div>
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
      <div className="w-full aspect-[3/4] rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center overflow-hidden mb-4 group-hover:border-emerald-500/30 transition-all">
        <img 
          src={showImage ? src : "/logo.png"} 
          alt={member.name} 
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ${!showImage ? 'opacity-20 p-4 object-contain' : ''}`}
          onError={handleError}
        />
      </div>
      <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">{member.name}</h3>
      <p className="text-[10px] text-foreground font-light leading-relaxed mb-2 line-clamp-2">{member.thesis}</p>
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[9px] font-mono text-emerald-500/50">{member.duration}</span>
      </div>
      {member.present && (
        <p className="text-[9px] text-foreground/90 mt-1 italic line-clamp-1 flex gap-1">
          <span className="text-emerald-500/30">Currently:</span> {member.present}
        </p>
      )}
    </div>
  );
};


const SlideImage = ({ srcBase, isActive }: { srcBase: string, isActive: boolean }) => {
  const extensions = ['.webp', '.jpg', '.png', '.jpeg'];
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const src = `${srcBase}${extensions[extIdx]}`;

  return (
    <motion.img
      src={failed ? '/logo.png' : src}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.05 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`absolute inset-0 w-full h-full ${failed ? 'object-contain opacity-20 p-8' : 'object-cover'}`}
      onError={() => {
        if (extIdx < extensions.length - 1) {
          setExtIdx(prev => prev + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
};

const GallerySlideshow = () => {
  const images = Array.from({ length: 25 }, (_, i) => i + 1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative overflow-hidden rounded-3xl bg-foreground/[0.02] border border-foreground/10 mb-8 aspect-video md:aspect-[21/9] shadow-2xl group">
      <AnimatePresence mode="wait">
        <SlideImage key={currentIndex} srcBase={`/images/gallery/${images[currentIndex]}`} isActive={true} />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-pink-500 w-6' : 'bg-foreground/30 hover:bg-foreground/60 w-1.5'}`}
          />
        ))}
      </div>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/50"
      >
        <ArrowLeft size={16} />
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/50"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

/* ─── LAB MEDIA SHOWCASE (Images + Videos) ───────────────────────── */
const LAB_IMAGES = [
  { src: '/images/lab-images/1.jpg', caption: 'Glove Box & Schlenk Line Setup' },
  { src: '/images/lab-images/2.jpg', caption: 'Catalytic Reactor Assembly' },
  { src: '/images/lab-images/3.jpg', caption: 'High-Pressure Reaction Vessels' },
  { src: '/images/lab-images/4.jpg', caption: 'Analytical Instrumentation' },
  { src: '/images/lab-images/5.jpg', caption: 'Synthesis Workstation' },
  { src: '/images/lab-images/6.jpg', caption: 'Characterization Facility' },
  { src: '/images/lab-images/7.jpg', caption: 'Research Lab Overview' },
];

const LAB_VIDEOS = [
  { src: '/videos/1.mp4', title: 'Lab Tour', caption: 'A walkthrough of our state-of-the-art catalysis laboratory' },
  { src: '/videos/2.mp4', title: 'Synthesis in Action', caption: 'Dehydrogenative coupling reactions under inert atmosphere' },
  { src: '/videos/3.mp4', title: 'Instrument Facility', caption: 'NMR, GC-MS, and HPLC characterization suite' },
  { src: '/videos/4.mp4', title: 'Group Activities', caption: 'Conference talks, celebrations, and lab life' },
];

const LabMediaShowcase = () => {
  // ── Image slideshow state ──
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setImgIdx((p) => (p + 1) % LAB_IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // ── Video player state ──
  const [vidIdx, setVidIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState<Record<number, boolean>>({});
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const allVideosErrored = LAB_VIDEOS.every((_, i) => videoError[i]);

  useEffect(() => {
    if (!videoRef.current || videoError[vidIdx]) return;
    videoRef.current.load();
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, [vidIdx]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnded = () => setVidIdx((p) => (p + 1) % LAB_VIDEOS.length);
    vid.addEventListener('ended', onEnded);
    return () => vid.removeEventListener('ended', onEnded);
  }, [vidIdx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 relative group">
      {/* ── Images Section ── */}
      <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl bg-background border border-foreground/10 shadow-2xl aspect-square md:aspect-[4/3] bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border text-[10px] font-mono uppercase tracking-widest transition-all bg-cyan-500/20 border-cyan-500/40 text-cyan-300">
          <Microscope size={12} /> Lab Images
          <span className="text-[9px] text-cyan-300/50">{imgIdx + 1}/{LAB_IMAGES.length}</span>
        </div>

        {/* ═══ IMAGE SLIDESHOW ═══ */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={LAB_IMAGES[imgIdx].src}
              alt={LAB_IMAGES[imgIdx].caption}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Caption + dots */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h4 className="text-lg font-bold text-foreground mb-1 tracking-tight">{LAB_IMAGES[imgIdx].caption}</h4>
            <div className="flex gap-2 mt-4">
              {LAB_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === imgIdx ? 'bg-cyan-400 w-8' : 'bg-foreground/25 hover:bg-foreground/50 w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button onClick={() => setImgIdx((p) => (p - 1 + LAB_IMAGES.length) % LAB_IMAGES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/50 z-20">
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => setImgIdx((p) => (p + 1) % LAB_IMAGES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/50 z-20">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Videos Section ── */}
      <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl bg-background border border-foreground/10 shadow-2xl aspect-square md:aspect-[4/3] bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border text-[10px] font-mono uppercase tracking-widest transition-all bg-red-500/20 border-red-500/40 text-red-300">
          <Video size={12} /> Videos
        </div>

        {/* ═══ VIDEO PLAYER ═══ */}
        <div className="absolute inset-0">
          {!allVideosErrored ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div key={vidIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <video ref={videoRef} src={LAB_VIDEOS[vidIdx].src} muted={isMuted} playsInline autoPlay
                    className="w-full h-full object-cover"
                    onError={() => setVideoError((p) => ({ ...p, [vidIdx]: true }))} />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-end justify-between">
                  <div className="flex-1 pr-4">
                    <h4 className="text-xl font-bold text-foreground mb-1 tracking-tight truncate">{LAB_VIDEOS[vidIdx].title}</h4>
                    <p className="text-sm text-foreground/90 font-light line-clamp-2">{LAB_VIDEOS[vidIdx].caption}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground/90 hover:text-foreground hover:bg-foreground/20 transition-all">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-foreground/15 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground hover:bg-foreground/25 transition-all">
                      {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  {LAB_VIDEOS.map((_, i) => (
                    <button key={i} onClick={() => setVidIdx(i)}
                      className={`h-1 rounded-full transition-all duration-500 ${i === vidIdx ? 'bg-red-500 w-8' : videoError[i] ? 'bg-foreground/10 w-2' : 'bg-foreground/30 hover:bg-foreground/50 w-2'}`} />
                  ))}
                </div>
              </div>

              <button onClick={() => setVidIdx((p) => (p - 1 + LAB_VIDEOS.length) % LAB_VIDEOS.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/50 z-20">
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => setVidIdx((p) => (p + 1) % LAB_VIDEOS.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/50 z-20">
                <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background">
              <iframe 
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/your-lab-tour-id" 
                title="Lab Tour Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const heroImage = '/images/Background/group-photo.webp';

  useEffect(() => {
    const handleScroll = () => {
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
    { id: 'contact', label: 'Contact Us' },
  ];

  const researchCategories = useMemo(() => {
    return [
      {
        id: 'homogeneous',
        title: "Homogeneous Catalysis",
        image: "/images/research/organometallic.png",
        icon: <FlaskConical className="text-amber-400" />,
        desc: "Molecularly-defined pincer complexes and metal-ligand cooperation for selective transformations.",
        details: "We design and develop well-defined transition-metal pincer complexes for C-C, C-N bond forming reactions, acceptorless dehydrogenation, hydrogenation, and borrowing hydrogen strategies using earth-abundant metals."
      },
      {
        id: 'heterogeneous',
        title: "Heterogeneous Catalysis",
        image: "/images/research/green_synthesis.png",
        icon: <Beaker className="text-emerald-400" />,
        desc: "Robust nanocatalysts and supported systems for sustainable industrial transformations.",
        details: "Our group develops reusable heterogeneous nanocatalysts on graphene/carbon supports for hydrogen generation, CO2 conversion, biomass upgrading, and co-pyrolysis of waste materials."
      }
    ];
  }, []);

  return (
    <main className="flex flex-col items-center w-full overflow-hidden bg-background selection:bg-[var(--accent)]/30">
      
      {/* FLOATING NAVIGATION MENU */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl md:rounded-full px-2 md:px-4 py-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-[10px] md:text-xs font-mono border border-foreground/10 w-[90vw] md:w-auto md:max-w-[95vw] shadow-2xl"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between w-full md:w-auto md:hidden">
          <div className="px-3 font-bold text-amber-500 tracking-widest uppercase text-[10px]">
            Raman's Lab
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-amber-500/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`flex-col md:flex-row md:flex items-stretch md:items-center gap-1 md:gap-2 ${mobileMenuOpen ? 'flex mt-2 mb-2' : 'hidden'}`}>
          {navLinks.map((link: any) => {
            const isExternal = link.href?.startsWith('/');
            const baseClass = `px-4 py-3 md:py-2 rounded-xl md:rounded-full transition-all duration-500 ease-out whitespace-nowrap relative group cursor-pointer text-left md:text-center ${
              activeSection === link.id 
                ? 'text-white font-bold' 
                : 'text-foreground/70 hover:text-foreground'
            }`;
            
            const activeIndicator = activeSection === link.id && (
              <motion.div 
                layoutId="activePill"
                className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl md:rounded-full -z-10 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            );

            if (isExternal) {
              return (
                <Link key={link.id} href={link.href as string} className={baseClass} onClick={() => setMobileMenuOpen(false)}>
                  {activeIndicator}
                  {link.label}
                </Link>
              );
            }

            return (
              <a 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const el = document.getElementById(link.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={baseClass}
              >
                {activeIndicator}
                {link.label}
              </a>
            );
          })}
          <div className="hidden md:block w-px h-6 bg-foreground/20 self-center mx-1"></div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <motion.div className="absolute inset-0 z-0">
          <Image 
            src={heroImage} 
            alt="Raman Lab Group" 
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 via-70% to-black/90"></div>
        </motion.div>

        {/* Background watermark text */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none select-none overflow-hidden mt-0">
          <span className="text-[120px] sm:text-[200px] md:text-[300px] font-black uppercase tracking-tighter leading-none opacity-80" style={{ color: 'rgba(255, 255, 255, 0.2)', WebkitTextStroke: '2px rgba(0,0,0,0.2)' }}>RAMAN</span>
        </div>

        <div className="z-10 max-w-6xl mx-auto text-center relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-white relative z-10 drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] leading-[0.9]">
              Raman's<br/>
              <span style={{ color: '#fbbf24' }}>Research</span> Lab
            </h1>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
              Exploring new frontiers in <span className="font-semibold text-white">catalysis</span>, <span className="font-semibold text-white">sustainable chemistry</span>, and complex <span className="font-semibold text-white">organometallic systems</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PI SECTION */}
      <section id="pi" className="w-full py-20 md:py-24 px-6 relative z-10 bg-foreground/[0.02]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch relative">
          
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="absolute inset-0 bg-amber-500/20 dark:bg-amber-500/5 blur-[80px] rounded-full -z-10"></div>
             <div className="w-full aspect-square rounded-[2rem] md:rounded-[3rem] border border-foreground/10 relative overflow-hidden group shadow-2xl bg-black/5">
               <Image 
                 src="/images/pi/PI Photo 2.jpeg" 
                 alt="Dr. Ekambaram Balaraman" 
                 fill
                 sizes="(max-width: 768px) 100vw, 33vw"
                 className="object-cover object-center" 
               />
             </div>
            
            <div className="mt-8 flex flex-col items-center gap-3">
               <div className="flex justify-center gap-6">
                 <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:text-amber-400 hover:border-amber-500 transition-all" title="Google Scholar">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
                 </a>
                 <a href={`https://orcid.org/${piStats.orcid}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:text-emerald-400 hover:border-emerald-500 transition-all" title="ORCID">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.188-3.722-3.978-3.722h-2.341z"/></svg>
                 </a>
                 <a href="mailto:eb.raman@iisertirupati.ac.in" className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:text-amber-400 hover:border-amber-500 transition-all" title="Email"><Mail size={20} /></a>
               </div>
               <a href="mailto:eb.raman@iisertirupati.ac.in" className="text-sm md:text-base font-mono text-foreground tracking-wider hover:text-amber-400 transition-colors">eb.raman@iisertirupati.ac.in</a>
            </div>

            {/* LAB NEWS - Vertical scroll below PI photo */}
            <div id="news" className="mt-12 pt-8 border-t border-foreground/10 w-full flex flex-col flex-1 pb-4">
              <div className="mb-8 shrink-0">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="h-px w-8 bg-accent"></div>
                   <p className="text-sm font-extrabold text-accent tracking-[0.2em] uppercase">Lab News</p>
                 </div>
                 <h3 className="text-2xl font-bold text-foreground tracking-tight">Latest Updates</h3>
              </div>
              <div className="relative flex-1 min-h-[400px] w-full group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none opacity-0 transition-opacity"></div>
                
                <div className="absolute inset-0 overflow-y-auto overflow-x-hidden pr-3 scrollbar-thin scrollbar-thumb-foreground/10 hover:scrollbar-thumb-amber-500/50 scrollbar-track-transparent">
                  <div className="flex flex-col gap-4 pb-12">
                    {news.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="w-full p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/8 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 cursor-default group/news shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                            item.type === 'Award' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            item.type === 'Joining' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                            'bg-purple-500/10 border-purple-500/20 text-purple-400'
                          }`}>{item.type}</span>
                          <span className="text-[10px] text-foreground/50 font-mono">{item.date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-2 leading-snug tracking-tight group-hover/news:text-amber-600 transition-colors">{item.title}</h3>
                        <p className="text-xs text-foreground/70 font-light leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>

          </div>
          
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-accent font-extrabold text-sm uppercase tracking-[0.2em] mb-6">Principal Investigator</div>
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-foreground">Dr. Ekambaram Balaraman</h2>
            <h3 className="text-xl text-amber-500 mb-6 font-light tracking-tight">Associate Professor & Chair, Department of Chemistry, IISER Tirupati</h3>
            
            <p className="text-lg md:text-xl text-foreground font-light leading-relaxed mb-8 italic border-l-4 border-amber-500 pl-6">
              "Leading the frontier of sustainable catalysis and molecular engineering through innovative transition-metal systems."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-10">
              {piBio.map((item: any, idx) => (
                <div key={idx} className="flex flex-col group">
                  <span className="text-[11px] font-bold text-amber-400 mb-2 font-mono tracking-widest uppercase">{item.year}</span>
                  <div className="flex-1 border-l-2 border-foreground/10 pl-6 group-hover:border-amber-500 transition-colors py-2">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-amber-400 transition-colors leading-tight mb-2">{item.role}</h4>
                    <p className="text-sm text-foreground/90 font-light leading-relaxed">{item.institution}</p>
                    {item.details && (
                      <p className="text-xs text-foreground/90 italic font-light leading-relaxed mt-3 max-w-md border-l-2 border-amber-500/20 pl-4">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-10 p-6 md:p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 italic text-foreground/90 relative group">
               <span className="absolute -top-4 -left-2 text-7xl text-amber-500/10 font-serif font-black">&quot;</span>
               <p className="text-lg md:text-xl font-light leading-relaxed relative z-10 text-foreground/90 pl-4">
                 Take risk in life. If you win, you will lead; if you lose, you will guide.
               </p>
            </div>

            {/* Scholarly Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="p-6 rounded-2xl bg-foreground/[0.04] border border-foreground/10 hover:border-amber-500/30 transition-all text-center group hover:bg-amber-500/5">
                <div className="text-3xl md:text-4xl font-black text-amber-400 mb-2 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">{piStats.publications}</div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/90 font-mono font-semibold">Publications</p>
              </div>
              <div className="p-6 rounded-2xl bg-foreground/[0.04] border border-foreground/10 hover:border-emerald-500/30 transition-all text-center group hover:bg-emerald-500/5">
                <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{piStats.hIndex}</div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/90 font-mono font-semibold">h-Index</p>
              </div>
              <div className="p-6 rounded-2xl bg-foreground/[0.04] border border-foreground/10 hover:border-orange-500/30 transition-all text-center group hover:bg-orange-500/5">
                <div className="text-3xl md:text-4xl font-black text-orange-400 mb-2 drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]">{piStats.citations.toLocaleString()}</div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/90 font-mono font-semibold">Citations</p>
              </div>
              <div className="p-6 rounded-2xl bg-foreground/[0.04] border border-foreground/10 hover:border-purple-500/30 transition-all text-center group hover:bg-purple-500/5">
                <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2 drop-shadow-[0_0_10px_rgba(192,132,252,0.3)]">{piStats.grantedUSPatents}</div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/90 font-mono font-semibold">US Patents</p>
              </div>
            </div>

            {/* Human Resource Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
              <div className="p-4 rounded-xl bg-foreground/[0.04] border border-foreground/10 text-center hover:border-cyan-500/20 transition-all">
                <div className="text-xl font-black text-foreground mb-1">{piStats.phdCompleted}</div>
                <p className="text-[9px] uppercase tracking-widest text-foreground font-mono font-medium">Ph.D. Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-foreground/[0.04] border border-foreground/10 text-center hover:border-cyan-500/20 transition-all">
                <div className="text-xl font-black text-foreground mb-1">{piStats.phdPursuing}</div>
                <p className="text-[9px] uppercase tracking-widest text-foreground font-mono font-medium">Ph.D. Pursuing</p>
              </div>
              <div className="p-4 rounded-xl bg-foreground/[0.04] border border-foreground/10 text-center hover:border-cyan-500/20 transition-all">
                <div className="text-xl font-black text-foreground mb-1">{piStats.postdocs}</div>
                <p className="text-[9px] uppercase tracking-widest text-foreground font-mono font-medium">Post-docs</p>
              </div>
              <div className="p-4 rounded-xl bg-foreground/[0.04] border border-foreground/10 text-center hover:border-cyan-500/20 transition-all">
                <div className="text-xl font-black text-foreground mb-1">{piStats.mscStudents}</div>
                <p className="text-[9px] uppercase tracking-widest text-foreground font-mono font-medium">MSc Students</p>
              </div>
              <div className="p-4 rounded-xl bg-foreground/[0.04] border border-foreground/10 text-center hover:border-cyan-500/20 transition-all">
                <div className="text-xl font-black text-foreground mb-1">{piStats.projectFellows}</div>
                <p className="text-[9px] uppercase tracking-widest text-foreground font-mono font-medium">Project Fellows</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Honours & Awards */}
              <div>
                 <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-tight flex items-center gap-2">
                   <Shield size={18} className="text-amber-500" /> Honours & Awards
                 </h3>
                 <ul className="space-y-3">
                   {awards.slice(0, 8).map((award, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-foreground/90 font-light leading-relaxed">
                       <ChevronRight size={14} className="text-amber-500 mt-1 shrink-0" />
                       <span>{award}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              {/* Courses Offered */}
              <div>
                 <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-tight flex items-center gap-2">
                   <BookOpen size={18} className="text-amber-500" /> Courses Offered
                 </h3>
                 <div className="bg-foreground/[0.02] border border-foreground/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all h-full">
                    <ul className="flex flex-col gap-4 text-sm text-foreground font-light">
                       <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div> CHM 111: Inorganic Chemistry</li>
                       <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div> CHM 211: Coordination Chemistry</li>
                       <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div> CHM 411: Organometallic Chemistry</li>
                    </ul>
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
               <a href={cvLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background font-bold hover:bg-amber-600 hover:text-foreground transition-all shadow-2xl">
                  <Download size={20} /> Download Academic CV
               </a>
               <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-5 rounded-full border border-amber-500/30 text-amber-400 font-bold hover:bg-amber-500/10 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
                  Google Scholar
               </a>
            </div>
          </div>
        </motion.div>
      </section>


      {/* 3. RESEARCH SECTION */}
      <section id="research" className="w-full py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-32">
            <div className="flex items-center gap-4 mb-4">
               <div className="h-px w-12 bg-accent"></div>
               <p className="text-sm font-extrabold text-accent tracking-[0.2em] uppercase">Laboratory Focus</p>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-12 text-gradient leading-[0.9]">Research</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed border-l-4 border-amber-500 pl-8 italic">
                 "We explore the frontiers of <span className="text-accent font-semibold not-italic">organometallic chemistry</span> — designing molecular architectures that unlock new pathways for <span className="text-accent font-semibold not-italic">sustainable catalysis</span> and selective organic transformations."
               </p>
               <div className="space-y-6 text-lg text-foreground/80 font-light leading-relaxed">
                  <p>
                    Our laboratory develops <span className="text-foreground font-medium">well-defined transition-metal catalytic systems</span> spanning hydrogen generation, hydrogenation, photocatalysis, and C–H activation — bridging the gap between <span className="text-foreground font-medium">homogeneous precision</span> and <span className="text-foreground font-medium">heterogeneous scalability</span>.
                  </p>
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchCategories.map((cat, idx) => (
              <motion.div 
                key={cat.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                className="group relative h-[450px] md:h-[550px] rounded-[3.5rem] overflow-hidden border border-foreground/10 shadow-2xl hover:border-amber-500/30 transition-all duration-700"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat.image})` }}></div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 group-hover:via-amber-900/40 transition-all duration-700"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start text-left z-20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">Pillar {idx + 1}</span>
                  <h3 className="text-2xl md:text-5xl font-black mb-4 tracking-tighter text-white uppercase leading-[0.8]">{cat.title}</h3>
                  <p className="text-sm md:text-base text-white font-normal leading-relaxed mb-6 max-w-sm line-clamp-2 md:line-clamp-3 group-hover:opacity-100 transition-all shadow-black drop-shadow-md">
                    {cat.details}
                  </p>
                  
                  {/* Relevant Papers Preview */}
                  <div className="hidden md:block w-full max-w-md space-y-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
                    <p className="text-[9px] text-amber-400 font-mono uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Key Publications</p>
                    {idx === 0 ? (
                      <>
                        <p className="text-xs text-white leading-tight font-medium truncate drop-shadow-md">1. Transition-metal pincer complexes in acceptorless dehydrogenation...</p>
                        <p className="text-xs text-white leading-tight font-medium truncate drop-shadow-md">2. Direct access to N-alkylated amines and imines via...</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-white leading-tight font-medium truncate drop-shadow-md">1. Robust nanocatalysts for sustainable industrial transformations...</p>
                        <p className="text-xs text-white leading-tight font-medium truncate drop-shadow-md">2. Reusable heterogeneous nanocatalysts on graphene/carbon supports...</p>
                      </>
                    )}
                  </div>

                  <Link href={`/research#${cat.id}`} className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all mt-auto shadow-lg">
                     Dive Deeper <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PUBLICATIONS SECTION */}
      <section id="publications" className="w-full py-32 px-6 relative z-10 bg-background border-y border-foreground/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-gradient uppercase">Publications</h2>
              <p className="text-foreground font-light">Highlights from our 117+ published works.</p>
            </div>
            <Link href="/publications" className="px-8 py-4 rounded-full border border-amber-500/30 text-amber-400 font-bold hover:bg-amber-500/10 transition-all flex items-center gap-2 uppercase text-[10px] tracking-widest font-mono">
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
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-accent"></div>
                <p className="text-sm font-extrabold text-accent tracking-[0.2em] uppercase">Intellectual Property</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-gradient uppercase">Patents</h2>
              <p className="text-foreground font-light">33+ patents filed including {patents.grantedUS.length} granted US patents.</p>
            </div>
            <Link href="/patents" className="px-8 py-4 rounded-full border border-amber-500/30 text-amber-400 font-bold hover:bg-amber-500/10 transition-all flex items-center gap-2 uppercase text-[10px] tracking-widest font-mono">
              View All Patents <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-10 rounded-[3rem] bg-foreground/[0.03] border border-foreground/5 hover:border-amber-500/20 transition-all group">
              <div className="text-5xl font-black text-amber-500 mb-4">{patents.iiser.length + patents.industry.length}</div>
              <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-tight">Indian Patents</h3>
              <p className="text-foreground text-sm font-light">Filed at IISER Tirupati & with industry partners</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-foreground/[0.03] border border-foreground/5 hover:border-amber-500/20 transition-all group">
              <div className="text-5xl font-black text-emerald-500 mb-4">{patents.grantedUS.length}</div>
              <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-tight">Granted US Patents</h3>
              <p className="text-foreground text-sm font-light">International intellectual property portfolio</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-foreground/[0.03] border border-foreground/5 hover:border-amber-500/20 transition-all group">
              <div className="text-5xl font-black text-orange-500 mb-4">{patents.industry.length}</div>
              <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-tight">Industry Collaborations</h3>
              <p className="text-foreground text-sm font-light">GAIL India, Tata Steel & more</p>
            </div>
          </div>

          <div className="space-y-4">
            {patents.iiser.slice(0, 3).map((p) => (
              <div key={p.id} className="flex gap-6 p-6 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 hover:border-amber-500/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Shield size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{p.year}</span>
                    <span className="text-[10px] text-foreground font-mono">#{p.number}</span>
                  </div>
                  <h4 className="text-base font-bold text-foreground group-hover:text-amber-400 transition-colors leading-snug mb-1">{p.title}</h4>
                  <p className="text-xs text-foreground/90 font-light">{p.authors}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM & GALLERY PREVIEW SECTION */}
      <section id="team" className="w-full py-32 px-6 relative z-10 bg-foreground/[0.01]">
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter text-gradient">Lab Members</h2>
            
            <div className="w-full space-y-24">
              {/* Postdocs */}
              <div>
                <h3 className="text-sm font-extrabold text-accent uppercase tracking-[0.2em] mb-10 text-left">Post-doctoral Fellows</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.postdocs.map((member, i) => (
                    <TeamMemberThumb key={i} member={member} role="Postdoc" />
                  ))}
                </div>
              </div>

              {/* Ph.D. Scholars */}
              <div>
                <h3 className="text-sm font-extrabold text-accent uppercase tracking-[0.2em] mb-10 text-left">Ph.D. Scholars</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                  {team.currentPhd.map((member, i) => (
                    <TeamMemberThumb key={i} member={member} role="Ph.D. Scholar" />
                  ))}
                </div>
              </div>

              {/* Masters Section */}
              {team.masters && team.masters.length > 0 && (
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-px w-12 bg-amber-500"></div>
                     <h2 className="text-sm font-extrabold text-accent uppercase tracking-[0.2em]">Master&apos;s Thesis</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {team.masters.map((member, i) => <TeamMemberThumb key={i} member={member} role="MSc" />)}
                  </div>
                </div>
              )}


              <div className="mt-16 flex justify-start">
                 <Link href="/team#alumni" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-amber-500/30 text-amber-400 font-bold hover:bg-amber-500/10 transition-all uppercase text-[10px] tracking-widest font-mono">
                   Open Full Alumni Registry <ArrowRight size={18} />
                 </Link>
              </div>

            </div>
         </div>
      </section>

      {/* 5.5. GALLERY SECTION */}
      <section id="gallery" className="w-full py-32 px-6 relative z-10 bg-background border-t border-foreground/5">
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-accent"></div>
              <h3 className="text-sm font-extrabold text-accent uppercase tracking-[0.2em]">Lab Images & Photos</h3>
              <div className="h-px w-12 bg-accent"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter text-gradient">Lab Memories</h2>

            {/* Slideshow 1: Gallery memories */}
            <div className="w-full max-w-5xl mb-12">
               <GallerySlideshow />
            </div>
            {/* Slideshow 2: Lab Research Media (Images + Videos) */}
            <div className="w-full max-w-5xl mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-accent/50" />
                <h3 className="text-sm font-extrabold text-accent uppercase tracking-[0.2em]">Lab Research Media</h3>
                <div className="h-px w-12 bg-accent/50" />
              </div>
              <LabMediaShowcase />
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-pink-500/30 text-pink-400 font-bold hover:bg-pink-500/10 transition-all uppercase text-[10px] tracking-widest font-mono">
               View Full Gallery <ArrowRight size={18} />
            </Link>
         </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="w-full py-32 px-6 relative z-10 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-accent"></div>
              <p className="text-sm font-extrabold text-accent tracking-[0.2em] uppercase">Get in Touch</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-gradient uppercase">Contact Us</h2>
            <p className="text-xl text-foreground/90 font-light mb-12">
              Interested in joining our group or collaborating with us? We'd love to hear from you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Location</h4>
                  <p className="text-foreground font-light leading-relaxed">
                    Department of Chemistry,<br />
                    IISER Tirupati,<br />
                    Srinivasapuram Venkatagiri Road,<br />
                    Jangalapalli (G.P), Yerpedu Mandal,<br />
                    Durgiperi, Andhra Pradesh 517619, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Email</h4>
                  <a href="mailto:eb.raman@iisertirupati.ac.in" className="text-foreground hover:text-amber-400 font-light transition-colors block">
                    eb.raman@iisertirupati.ac.in
                  </a>
                  <a href="mailto:balaramanekambaram@gmail.com" className="text-foreground hover:text-amber-400 font-light transition-colors block mt-1">
                    balaramanekambaram@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Globe size={20} />
                </div>
                <div className="w-full">
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Follow Our Lab</h4>
                  <div className="flex flex-wrap gap-3">

                    {/* X Card */}
                    <a href={piStats.twitter} target="_blank" rel="noopener noreferrer"
                      className="group/x flex items-center gap-3 px-4 py-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 min-w-[140px]"
                      title="X">
                      <div className="w-9 h-9 rounded-xl border border-foreground/10 bg-foreground/5 flex items-center justify-center group-hover/x:border-amber-500/30 group-hover/x:bg-amber-500/10 transition-all shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-foreground/60 group-hover/x:text-amber-400 transition-colors"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Follow on</span>
                        <span className="text-sm font-bold text-foreground group-hover/x:text-amber-400 transition-colors tracking-tight">𝕏</span>
                      </div>
                    </a>

                    {/* LinkedIn Card */}
                    <a href={piStats.linkedin} target="_blank" rel="noopener noreferrer"
                      className="group/li flex items-center gap-3 px-4 py-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 min-w-[140px]"
                      title="LinkedIn">
                      <div className="w-9 h-9 rounded-xl border border-foreground/10 bg-foreground/5 flex items-center justify-center group-hover/li:border-amber-500/30 group-hover/li:bg-amber-500/10 transition-all shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-foreground/60 group-hover/li:text-amber-400 transition-colors"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Connect on</span>
                        <span className="text-sm font-bold text-foreground group-hover/li:text-amber-400 transition-colors tracking-tight">LinkedIn</span>
                      </div>
                    </a>

                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-10 rounded-[3rem] bg-foreground/[0.02] border border-foreground/5">
             <h3 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-tight">Open Positions</h3>
             <p className="text-foreground font-light mb-8 leading-relaxed">
               We are always looking for motivated Postdocs, Ph.D. students, and Master's students to join our lab. Please send your CV and a brief description of your research interests to Prof. Balaraman.
             </p>
             <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-4">
                 <GraduationCap size={24} className="text-amber-400" />
                 <div>
                   <h4 className="text-sm font-bold text-foreground">Ph.D. Positions</h4>
                   <p className="text-xs text-foreground/90">Through regular IISER Tirupati admissions</p>
                 </div>
               </div>
               <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-4">
                 <Briefcase size={24} className="text-amber-400" />
                 <div>
                   <h4 className="text-sm font-bold text-foreground">Postdoc Positions</h4>
                   <p className="text-xs text-foreground/90">NPDF / Institute Fellowships</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 px-6 border-t border-foreground/5 bg-foreground/50 backdrop-blur-md relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-mono text-foreground uppercase tracking-[0.4em]">
               © {new Date().getFullYear()} Raman's Research Lab
            </p>
            <div className="flex items-center gap-2">
               <a href={piStats.twitter} target="_blank" rel="noopener noreferrer"
                 className="group/ft w-9 h-9 rounded-xl border border-foreground/10 bg-foreground/[0.04] flex items-center justify-center text-foreground/40 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-200"
                 title="X">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
               <a href={piStats.linkedin} target="_blank" rel="noopener noreferrer"
                 className="group/ft w-9 h-9 rounded-xl border border-foreground/10 bg-foreground/[0.04] flex items-center justify-center text-foreground/40 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-200"
                 title="LinkedIn">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
               </a>
            </div>
         </div>
      </footer>

    </main>
  );
}

