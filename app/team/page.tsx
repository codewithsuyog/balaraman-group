'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, Users, GraduationCap, 
  Briefcase, BookOpen, Beaker, FlaskConical, Microscope
} from 'lucide-react';
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

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors tracking-tight">{member.name}</h3>
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

const AlumniPhDCard = ({ member }: { member: TeamMember }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const altText = member.name ? `Ph.D. Scholar Alumni ${member.name}` : 'Ph.D. Alumni';
  
  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-surface border border-line rounded-2xl overflow-hidden hover:bg-surface hover:border-line transition-colors duration-200"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-surface">
        {!imgFailed && member.image ? (
          <img 
            src={member.image} 
            alt={altText} 
            loading="lazy" decoding="async"
            className="w-full h-full object-cover transition-colors duration-200"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
             <GraduationCap size={80} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-xs font-mono text-secondary">Ph.D. Alumni</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors tracking-tight">{member.name}</h3>
        <p className="text-xs text-foreground leading-relaxed mb-1">{member.thesis}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs font-mono text-accent">{member.duration}</span>
        </div>
        {member.present && (
          <p className="text-xs text-foreground mt-2">Present: {member.present}</p>
        )}
      </div>
    </motion.div>
  );
};

const AlumniPostdocCard = ({ member }: { member: TeamMember }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const altText = member.name ? `Postdoctoral Fellow Alumni ${member.name}` : 'Postdoc Alumni';
  
  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-surface border border-line rounded-2xl overflow-hidden hover:bg-surface hover:border-line transition-colors duration-200"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-surface">
        {!imgFailed && member.image ? (
          <img 
            src={member.image} 
            alt={altText} 
            loading="lazy" decoding="async"
            className="w-full h-full object-cover transition-colors duration-200"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
             <Briefcase size={80} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-xs font-mono text-secondary">Postdoc Alumni</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors tracking-tight">{member.name}</h3>
        <p className="text-xs text-foreground leading-relaxed mb-1">{member.info}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs font-mono text-accent">{member.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

const AlumniMScCard = ({ member }: { member: TeamMember }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const altText = member.name ? `MSc Alumni ${member.name}` : 'MSc Alumni';
  
  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-surface border border-line rounded-2xl overflow-hidden hover:bg-surface hover:border-line transition-colors duration-200"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-surface">
        {!imgFailed && member.image ? (
          <img 
            src={member.image} 
            alt={altText} 
            loading="lazy" decoding="async"
            className="w-full h-full object-cover transition-colors duration-200"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
             <BookOpen size={80} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-xs font-mono text-secondary">MSc Alumni</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-secondary transition-colors tracking-tight">{member.name}</h3>
        <p className="text-xs text-foreground leading-relaxed mb-1">{member.institution}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs font-mono text-secondary">{member.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamPage() {
  const [showAllAlumni, setShowAllAlumni] = useState(false);
  const [isAlumniOnly, setIsAlumniOnly] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#alumni') {
      setTimeout(() => {
        setIsAlumniOnly(true);
        setShowAllAlumni(true);
      }, 0);
    }
  }, []);
  
  return (
    <main id="main" className="min-h-screen bg-background text-foreground selection:bg-raised pb-32">
      <section className="relative pt-32 pb-24 px-6 border-b border-line overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {!isAlumniOnly && (
          <>
            {/* Postdocs */}
            {team.postdocs && team.postdocs.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <h2 className="text-xs font-mono text-accent">Post-doctoral Fellows</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.masters.map((member, i) => <MemberCard key={i} member={member} role="Masters" />)}
            </div>
          </section>
        )}

          </>
        )}

        {/* ===== ALUMNI SECTIONS ===== */}
        <section id="alumni" className={`pt-16 border-t border-line ${isAlumniOnly ? 'mt-0 border-t-0 pt-0' : ''}`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
             <h2 className="text-3xl md:text-4xl text-foreground mb-4">Alumni</h2>
             <p className="text-foreground max-w-xl mx-auto leading-relaxed">
               Celebrating the achievements of our past group members across academia and industry globally.
             </p>
          </motion.div>

          {/* Ph.D. Alumni */}
          {team.alumniPhd && team.alumniPhd.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-secondary">Doctoral Students (Ph.D. Thesis)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {team.alumniPhd.filter(m => m.image).map((member: TeamMember, i: number) => <AlumniPhDCard key={`phd-img-${i}`} member={member} />)}
              </div>
              {team.alumniPhd.filter(m => !m.image).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {team.alumniPhd.filter(m => !m.image).map((m: TeamMember, i: number) => (
                    <div key={`phd-noimg-${i}`} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-secondary shrink-0">
                        <GraduationCap size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">{m.name}</h4>
                        <p className="text-xs text-foreground truncate">{m.thesis}</p>
                        <p className="text-xs font-mono text-secondary mt-1">{m.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Postdoc Alumni */}
          {(team as typeof team & { alumniPostdoc?: TeamMember[] }).alumniPostdoc?.length ? (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-secondary">Post-doctoral Alumni</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {(team as typeof team & { alumniPostdoc: TeamMember[] }).alumniPostdoc.filter(m => m.image).map((member: TeamMember, i: number) => (
                  <AlumniPostdocCard key={`postdoc-img-${i}`} member={member} />
                ))}
              </div>
              {(team as typeof team & { alumniPostdoc: TeamMember[] }).alumniPostdoc.filter(m => !m.image).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(team as typeof team & { alumniPostdoc: TeamMember[] }).alumniPostdoc.filter(m => !m.image).map((m: TeamMember, i: number) => (
                    <div key={`postdoc-noimg-${i}`} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-secondary shrink-0">
                        <Microscope size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">{m.name}</h4>
                        {m.institution && <p className="text-xs text-foreground truncate">{m.institution}</p>}
                        <p className="text-xs font-mono text-secondary mt-1">{m.duration || m.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* MSc Alumni */}
          {team.alumniMsc && team.alumniMsc.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-secondary">Post-graduate Students (MSc Thesis)</h3>
              </div>
              {(team.alumniMsc as TeamMember[]).filter(m => !m.image).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {(team.alumniMsc as TeamMember[]).filter(m => !m.image).map((m, i) => (
                    <div key={`msc-noimg-${i}`} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-secondary shrink-0">
                        <BookOpen size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">{m.name}</h4>
                        <p className="text-xs text-foreground truncate">{m.institution}</p>
                        <p className="text-xs font-mono text-secondary mt-1">{m.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {(team.alumniMsc as TeamMember[]).filter(m => m.image).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {(team.alumniMsc as TeamMember[]).filter(m => m.image).map((m, i) => (
                    <AlumniMScCard key={`msc-img-${i}`} member={m} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BTech Alumni */}
          {team.alumniBtech && team.alumniBtech.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-accent">Undergraduate Students (B.Tech)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniBtech as TeamMember[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-accent shrink-0">
                      <Beaker size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{m.name}</h4>
                      <p className="text-xs text-foreground">{m.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Fellows */}
          {team.alumniProjectFellows && team.alumniProjectFellows.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-secondary">Project Fellows / Research Associates</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniProjectFellows as TeamMember[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-secondary shrink-0">
                      <FlaskConical size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{m.name}</h4>
                      <p className="text-xs text-foreground">{m.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Semester/Summer Project Students */}
          {team.alumniSemester && team.alumniSemester.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-secondary">Semester &amp; Summer Project Students @ IISER Tirupati</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniSemester as TeamMember[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-secondary shrink-0">
                      <GraduationCap size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{m.name}</h4>
                      <p className="text-xs text-foreground">{m.batch} � {m.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Rotation iPhD Students */}
          {team.alumniLabRotation && team.alumniLabRotation.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-12">
                 <h3 className="text-xs font-mono text-accent">Lab Rotation iPhD Students @ IISER Tirupati</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniLabRotation as TeamMember[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-line transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-raised flex items-center justify-center text-accent shrink-0">
                      <Users size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{m.name}</h4>
                      <p className="text-xs text-foreground">{m.batch} � {m.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
