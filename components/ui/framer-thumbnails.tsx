'use client';

import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';

export const galleryItems = [
  { id: 36, url: '/images/gallery/36.webp', title: 'Group photo beside the department building' },
  { id: 35, url: '/images/gallery/35.webp', title: 'Group photo on the lawn, seen from above' },
  { id: 34, url: '/images/gallery/34.webp', title: 'Group photo on the lawn, seen from above' },
  { id: 33, url: '/images/gallery/33.webp', title: 'Postdocs with Dr. Balaraman' },
  { id: 32, url: '/images/gallery/32.webp', title: 'BS-MS students with Dr. Balaraman at the Coliseum' },
  { id: 31, url: '/images/gallery/31.webp', title: 'Ph.D. scholars with Dr. Balaraman at the Coliseum' },
  { id: 30, url: '/images/gallery/30.webp', title: 'Full group on the IISER Tirupati lawn' },
  { id: 29, url: '/images/gallery/29.webp', title: 'Full group on the IISER Tirupati lawn' },
  { id: 28, url: '/images/gallery/28.webp', title: 'Group photo outside the department building' },
  { id: 27, url: '/images/gallery/27.webp', title: 'Dr. Balaraman' },
  { id: 26, url: '/images/gallery/26.webp', title: 'Group photo in the lift' },
  { id: 25, url: '/images/gallery/25.webp', title: 'Members in the lab' },
  { id: 24, url: '/images/gallery/24.webp', title: 'Holi celebration' },
  { id: 23, url: '/images/gallery/23.webp', title: 'Collage of member portraits' },
  { id: 22, url: '/images/gallery/22.webp', title: 'Four members on campus' },
  { id: 21, url: '/images/gallery/21.webp', title: 'Collage: Organometallics and Sustainable Catalysis Group, with journal covers' },
  { id: 20, url: '/images/gallery/20.webp', title: 'Group photo with a framed gift' },
  { id: 19, url: '/images/gallery/19.webp', title: 'Members in the lab' },
  { id: 18, url: '/images/gallery/18.webp', title: "Collage: Raman's Research Group lab life" },
  { id: 17, url: '/images/gallery/17.webp', title: 'Group photo in the courtyard garden' },
  { id: 16, url: '/images/gallery/16.webp', title: 'Group photo in the department' },
  { id: 15, url: '/images/gallery/15.webp', title: 'Group photo in a classroom' },
  { id: 14, url: '/images/gallery/14.webp', title: 'Convocation: graduates with their certificates' },
  { id: 13, url: '/images/gallery/13.webp', title: 'Convocation: graduates with their certificates' },
  { id: 12, url: '/images/gallery/12.webp', title: 'Presenting a framed group photo' },
  { id: 11, url: '/images/gallery/11.webp', title: 'Group photo in the department corridor' },
  { id: 10, url: '/images/gallery/10.webp', title: "Collage: Raman's Research Group, 2021–2022" },
  { id: 9, url: '/images/gallery/9.webp', title: 'Members holding framed group collages' },
  { id: 8, url: '/images/gallery/8.webp', title: 'Group photo at a restaurant' },
  { id: 7, url: '/images/gallery/7.webp', title: 'Group dinner' },
  { id: 6, url: '/images/gallery/6.webp', title: 'Group celebration with a gift' },
  { id: 5, url: '/images/gallery/5.webp', title: 'Students on the lawn by the Vivante sign' },
  { id: 4, url: '/images/gallery/4.webp', title: 'Group photo in a seminar hall' },
  { id: 3, url: '/images/gallery/3.webp', title: 'Group photo indoors' },
  { id: 2, url: '/images/gallery/2.webp', title: 'Collage: Organometallic Catalysis for Sustainability, 2022–2023' },
  { id: 1, url: '/images/gallery/1.webp', title: 'Group outing at a café' },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

function FramerCarouselThumbnails() {
  const [index, setIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  // Autoplay stops while hovered or focused, when the visitor pauses it, or when they prefer reduced motion (WCAG 2.2.2).
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const playing = !userPaused && !reduceMotion;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Autoplay functionality
  useEffect(() => {
    if (isDragging || hovered || !playing) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isDragging, hovered, playing]);

  return (
    <div
      className='w-full mx-auto'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false); }}
    >
      <div className='flex flex-col gap-3'>
        {/* Main Carousel */}
        <div className='relative overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl' ref={containerRef}>
          <motion.div
            className='flex'
            drag='x'
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = index;

              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              } else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              newIndex = Math.max(0, Math.min(galleryItems.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {galleryItems.map((item) => (
              <div key={item.id} className='shrink-0 w-full h-[350px] md:h-[500px] bg-foreground/5 relative overflow-hidden'>
                {/* Cinematic blurred background to fill space */}
                <img
                  loading="lazy"
                  decoding="async"
                  src={imgErrors[item.id] ? '/logo.webp' : item.url} 
                  className='absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110'
                  alt="" 
                />
                {/* Main uncropped image */}
                <img
                  loading="lazy"
                  decoding="async"
                  src={imgErrors[item.id] ? '/logo.webp' : item.url}
                  alt={item.title}
                  className={`relative z-10 w-full h-full object-contain select-none pointer-events-none drop-shadow-2xl ${
                    imgErrors[item.id] ? 'opacity-20 p-12' : ''
                  }`}
                  draggable={false}
                  onError={() => handleImgError(item.id)}
                />
              </div>
            ))}
          </motion.div>

          {/* Image caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pointer-events-none z-10">
            <p className="text-xs font-mono text-amber-400 uppercase tracking-[0.2em] mb-1">
              Moment #{galleryItems[index]?.id}
            </p>
            <p className="text-white text-lg font-bold tracking-tight">
              {galleryItems[index]?.title}
            </p>
          </div>

          {/* Previous Button */}
          <motion.button
            disabled={index === 0}
            aria-label='Previous photo'
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-md border
              ${
                index === 0
                  ? 'opacity-30 cursor-not-allowed bg-foreground/10 border-foreground/10'
                  : 'bg-foreground/20 border-foreground/10 hover:bg-amber-500/30 hover:border-amber-500/40 hover:scale-110 opacity-70 hover:opacity-100'
              }`}
          >
            <ChevronLeft size={20} className="text-white" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            disabled={index === galleryItems.length - 1}
            aria-label='Next photo'
            onClick={() => setIndex((i) => Math.min(galleryItems.length - 1, i + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-md border
              ${
                index === galleryItems.length - 1
                  ? 'opacity-30 cursor-not-allowed bg-foreground/10 border-foreground/10'
                  : 'bg-foreground/20 border-foreground/10 hover:bg-amber-500/30 hover:border-amber-500/40 hover:scale-110 opacity-70 hover:opacity-100'
              }`}
          >
            <ChevronRight size={20} className="text-white" />
          </motion.button>
        </div>

        <button
          type='button'
          onClick={() => setUserPaused((p) => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className='self-end inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-foreground/70 hover:text-foreground border border-foreground/10 transition-colors'
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          {playing ? 'Pause' : 'Play'}
        </button>

        {/* Thumbnails */}
        <Thumbnails index={index} setIndex={setIndex} imgErrors={imgErrors} onImgError={handleImgError} />
      </div>
    </div>
  );
}

function Thumbnails({
  index,
  setIndex,
  imgErrors,
  onImgError,
}: {
  index: number;
  setIndex: (index: number) => void;
  imgErrors: Record<number, boolean>;
  onImgError: (id: number) => void;
}) {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className='overflow-x-auto'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className='flex gap-1 h-20 pb-2' style={{ width: 'fit-content' }}>
        {galleryItems.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative shrink-0 h-full overflow-hidden rounded-lg border transition-colors ${
              i === index
                ? 'border-amber-500/50'
                : 'border-transparent hover:border-foreground/20'
            }`}
          >
            {/* next/image serves a small resized copy instead of the full-size photo */}
            <Image
              fill
              sizes='120px'
              src={imgErrors[item.id] ? '/logo.webp' : item.url}
              alt={item.title}
              className={`object-cover pointer-events-none select-none ${
                imgErrors[item.id] ? 'object-contain opacity-20 p-2' : ''
              }`}
              onError={() => onImgError(item.id)}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default FramerCarouselThumbnails;
