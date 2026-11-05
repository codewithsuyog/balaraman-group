'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Users, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { team } from '../data';

import { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const EXTENSIONS = ['.webp', '.jpg', '.png', '.jpeg'];

const hasExtension = (path: string) => /\.\w{2,5}$/.test(path);

interface TeamMember {
  name?: string;
  image?: string;
  info?: string;
  email?: string;
  duration?: string;
  present?: string;
  thesis?: string;
  institution?: string;
  year?: string | number;
  batch?: string;
}

const MemberCard = ({ member, role }: { member: TeamMember, role: string }) => {
  const [extIdx, setExtIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const imagePath = member.image || '';
  const needsExtProbe = imagePath && !hasExtension(imagePath);
  const currentSrc = !imagePath
    ? ''
    : needsExtProbe
      ? `${imagePath}${EXTENSIONS[extIdx]}`
      : imagePath;

  const handleError = () => {
    if (needsExtProbe && extIdx < EXTENSIONS.length - 1) {
      setExtIdx(extIdx + 1);
    } else {
      setImgFailed(true);
    }
  };

  const roleTitle = role === 'Ph.D.' ? 'Ph.D. Scholar' : role === 'Postdoc' ? 'Postdoctoral Fellow' : role === 'Masters' ? "Master's Student" : role;
  const altText = member.name ? `${roleTitle} ${member.name}` : 'Team Member';

  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-surface border border-line rounded-2xl overflow-hidden hover:bg-surface hover:border-line transition-colors duration-200 flex flex-col h-full"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-surface shrink-0">
        {!imgFailed && currentSrc ? (
          <img 
            src={currentSrc} 
            alt={altText} 
            loading="lazy" decoding="async"
            className="w-full h-full object-cover"
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
             {role === 'Ph.D.' ? <GraduationCap size={80} /> : role === 'Postdoc' ? <Briefcase size={80} /> : <Users size={80} />}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-xs font-mono text-accent">{role}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground mb-1 group-hover:text-accent transition-colors">{member.name}</h3>
          <p className="text-xs text-foreground leading-relaxed mb-4">
            {member.info ? member.info.split(',').map((part: string, idx: number) => (
              <React.Fragment key={idx}>{part.trim()}<br/></React.Fragment>
            )) : null}
          </p>
        </div>
        
        <div className="mt-auto pt-4">
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-xs font-mono text-accent hover:text-accent transition-colors truncate block mb-3 w-full" title={member.email}>
              {member.email}
            </a>
          )}
          
          <div className="flex gap-4 border-t border-line pt-4">
            {member.email && (
              <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`} className="text-foreground hover:text-accent transition-colors"><Mail size={16} /></a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};




export default function TeamPage() {
  
  return (
    <main id="main" className="min-h-screen bg-background text-foreground selection:bg-raised pb-32">
      <section className="relative pt-40 sm:pt-32 pb-10 px-6 border-b border-line overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={false} animate="visible" variants={fadeUp}>
            
            <h1 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-6">
              People
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed border-y border-line py-8">
              A diverse group of researchers dedicated to pioneering sustainable chemistry and advanced catalysis.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
            {/* Postdocs */}
            {team.postdocs && team.postdocs.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <h2 className="text-xs font-mono text-accent">Post-doctoral Fellows</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {team.postdocs.map((member, i) => <MemberCard key={i} member={member} role="Postdoc" />)}
            </div>
          </section>
        )}

        {/* Ph.D. Scholars */}
        {team.currentPhd && team.currentPhd.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <h2 className="text-xs font-mono text-accent">Doctoral Scholars</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {team.currentPhd.map((member, i) => <MemberCard key={i} member={member} role="Ph.D." />)}
            </div>
          </section>
        )}

        {/* Project Associates */}
        {team.projectAssociates && team.projectAssociates.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <h2 className="text-xs font-mono text-accent">Project Associates</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {team.projectAssociates.map((member, i) => <MemberCard key={i} member={member} role="Project Associate" />)}
            </div>
          </section>
        )}

        {/* Masters */}
        {team.masters && team.masters.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <h2 className="text-xs font-mono text-accent">Master&apos;s Students</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {team.masters.map((member, i) => <MemberCard key={i} member={member} role="Masters" />)}
            </div>
          </section>
        )}


        <section id="alumni" className="border-t border-line pt-10">
          <h2 className="text-3xl md:text-4xl text-foreground mb-3">Alumni</h2>
          <p className="text-secondary mb-4 max-w-xl">Former Ph.D. students, postdocs and Master&apos;s students, and where they are now.</p>
          <Link href="/alumni" className="flex w-fit items-center gap-1.5 text-accent underline underline-offset-4 decoration-1 hover:decoration-2">
            See all alumni <ArrowRight size={16} />
          </Link>
        </section>

      </div>
    </main>
  );
}
