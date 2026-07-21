'use client';

import { animate, motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const galleryItems = [
  { id: 1, url: '/images/gallery/1.webp', title: 'Group Celebrations' },
  { id: 2, url: '/images/gallery/2.webp', title: 'Lab Group Photo' },
  { id: 3, url: '/images/gallery/3.webp', title: 'Conference Presentation' },
  { id: 4, url: '/images/gallery/4.webp', title: 'Award Ceremony' },
  { id: 5, url: '/images/gallery/5.webp', title: 'Lab Outing' },
  { id: 6, url: '/images/gallery/6.webp', title: 'Research Discussion' },
  { id: 7, url: '/images/gallery/7.webp', title: 'Seminar Talk' },
  { id: 8, url: '/images/gallery/8.webp', title: 'Lab Activities' },
  { id: 9, url: '/images/gallery/9.webp', title: 'Team Building' },
  { id: 10, url: '/images/gallery/10.webp', title: 'Thesis Defense' },
  { id: 11, url: '/images/gallery/11.webp', title: 'Workshop' },
  { id: 12, url: '/images/gallery/12.webp', title: 'Festive Celebrations' },
  { id: 13, url: '/images/gallery/13.webp', title: 'Lab Milestones' },
  { id: 14, url: '/images/gallery/14.webp', title: 'Farewell Party' },
  { id: 15, url: '/images/gallery/15.webp', title: 'New Member Welcome' },
  { id: 16, url: '/images/gallery/16.webp', title: 'Annual Day' },
  { id: 17, url: '/images/gallery/17.webp', title: 'Campus Moments' },
  { id: 18, url: '/images/gallery/18.webp', title: 'Group Dinner' },
  { id: 19, url: '/images/gallery/19.webp', title: 'Sports Day' },
  { id: 20, url: '/images/gallery/20.webp', title: 'Cultural Event' },
  { id: 21, url: '/images/gallery/21.webp', title: 'Lab Visit' },
  { id: 22, url: '/images/gallery/22.webp', title: 'Graduation Day' },
  { id: 23, url: '/images/gallery/23.webp', title: 'Scientific Outreach' },
  { id: 24, url: '/images/gallery/24.webp', title: 'Research Symposium' },
  { id: 25, url: '/images/gallery/25.webp', title: 'Lab Memories' },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

function FramerCarouselThumbnails() {
  const [index, setIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
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

  return (
    <div className='w-full mx-auto'>
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
              <div key={item.id} className='shrink-0 w-full h-[350px] md:h-[450px] bg-foreground/5'>
                <img
                  src={imgErrors[item.id] ? '/logo.webp' : item.url}
                  alt={item.title}
                  className={`w-full h-full object-cover select-none pointer-events-none ${
                    imgErrors[item.id] ? 'object-contain opacity-20 p-12' : ''
                  }`}
                  draggable={false}
                  onError={() => handleImgError(item.id)}
                />
              </div>
            ))}
          </motion.div>

          {/* Image caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pointer-events-none z-10">
            <p className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.2em] mb-1">
              Moment #{galleryItems[index]?.id}
            </p>
            <p className="text-white text-lg font-bold tracking-tight">
              {galleryItems[index]?.title}
            </p>
          </div>

          {/* Previous Button */}
          <motion.button
            disabled={index === 0}
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
            <img
              src={imgErrors[item.id] ? '/logo.webp' : item.url}
              alt={item.title}
              className={`w-full h-full object-cover pointer-events-none select-none ${
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
