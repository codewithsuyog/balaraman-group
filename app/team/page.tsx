'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Mail, Globe, Users, GraduationCap, 
  ExternalLink, ChevronRight, Briefcase, BookOpen, Beaker, FlaskConical
} from 'lucide-react';
import { team } from '../data';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const EXTENSIONS = ['.jpg', '.png', '.jpeg', '.webp'];

const hasExtension = (path: string) => /\.\w{2,5}$/.test(path);

const MemberCard = ({ member, role }: { member: any, role: string }) => {
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

  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 shadow-xl"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-white/5">
        {!imgFailed && currentSrc ? (
          <img 
            src={currentSrc} 
            alt={member.name} 
            className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
             {role === 'PhD' ? <GraduationCap size={80} /> : role === 'Postdoc' ? <Briefcase size={80} /> : <Users size={80} />}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{role}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors tracking-tight">{member.name}</h3>
        <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
          {member.info ? member.info.split(',').map((part: string, idx: number) => (
            <React.Fragment key={idx}>{part.trim()}<br/></React.Fragment>
          )) : null}
        </p>
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-[10px] font-mono text-amber-500/50 hover:text-amber-400 transition-colors break-all leading-relaxed">
            {member.email}
          </a>
        )}
        
        <div className="flex gap-4 border-t border-white/5 pt-4 mt-4">
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-white/20 hover:text-amber-400 transition-colors"><Mail size={16} /></a>
          )}
          <button className="text-white/20 hover:text-amber-400 transition-colors"><Globe size={16} /></button>
        </div>
      </div>
    </motion.div>
  );
};

const AlumniPhDCard = ({ member }: { member: any }) => {
  const [imgFailed, setImgFailed] = useState(false);
  
  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 shadow-xl"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-white/5">
        {!imgFailed && member.image ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
             <GraduationCap size={80} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">PhD Alumni</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors tracking-tight">{member.name}</h3>
        <p className="text-[10px] text-white/50 font-light leading-relaxed mb-1">{member.thesis}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] font-mono text-amber-500/50">{member.duration}</span>
        </div>
        {member.present && (
          <p className="text-[10px] text-white/20 mt-2 italic">Currently: {member.present}</p>
        )}
      </div>
    </motion.div>
  );
};

export default function TeamPage() {
  const [showAllAlumni, setShowAllAlumni] = useState(false);
  const [isAlumniOnly, setIsAlumniOnly] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#alumni') {
      setIsAlumniOnly(true);
      setShowAllAlumni(true);
    }
  }, []);
  
  return (
    <main className="min-h-screen bg-[#0d1117] text-white selection:bg-amber-500/30 pb-32">
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-amber-400 font-mono text-[10px] uppercase tracking-widest mb-12 transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Laboratory
            </Link>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
              Lab <br/> <span className="text-amber-500">Members</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed border-y border-white/5 py-8 italic">
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
               <div className="h-px w-12 bg-amber-500"></div>
               <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em]">Post-doctoral Fellows</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.postdocs.map((member, i) => <MemberCard key={i} member={member} role="Postdoc" />)}
            </div>
          </section>
        )}

        {/* PhD Scholars */}
        {team.currentPhd && team.currentPhd.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px w-12 bg-amber-500"></div>
               <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em]">Doctoral Scholars</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.currentPhd.map((member, i) => <MemberCard key={i} member={member} role="PhD" />)}
            </div>
          </section>
        )}

        {/* Masters */}
        {team.masters && team.masters.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px w-12 bg-amber-500"></div>
               <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em]">Master&apos;s Students</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.masters.map((member, i) => <MemberCard key={i} member={member} role="Masters" />)}
            </div>
          </section>
        )}

        {/* Semester Project Students */}
        {(team as any).semesterProject && (team as any).semesterProject.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px w-12 bg-indigo-500"></div>
               <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.4em]">Semester Project Students</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(team as any).semesterProject.map((member: any, i: number) => (
                <MemberCard key={i} member={member} role="Semester Project" />
              ))}
            </div>
          </section>
        )}
          </>
        )}

        {/* ===== ALUMNI SECTIONS ===== */}
        <section id="alumni" className={`pt-16 border-t border-white/5 ${isAlumniOnly ? 'mt-0 border-t-0 pt-0' : ''}`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">Alumni</h2>
             <p className="text-white/40 font-light max-w-xl mx-auto leading-relaxed">
               Celebrating the achievements of our past group members across academia and industry globally.
             </p>
          </motion.div>

          {/* PhD Alumni */}
          {team.alumniPhd && team.alumniPhd.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-px w-12 bg-emerald-500"></div>
                 <h3 className="text-xs font-mono text-emerald-500 uppercase tracking-[0.4em]">Doctoral Students (PhD Thesis)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.alumniPhd.map((member: any, i: number) => <AlumniPhDCard key={i} member={member} />)}
              </div>
            </div>
          )}

          {/* Postdoc Alumni */}
          {(team as any).alumniPostdoc && (team as any).alumniPostdoc.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-px w-12 bg-teal-500"></div>
                 <h3 className="text-xs font-mono text-teal-500 uppercase tracking-[0.4em]">Post-doctoral Alumni</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {((team as any).alumniPostdoc as any[]).map((m: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-teal-500/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                      <Briefcase size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white/80 truncate">{m.name}</h4>
                      <p className="text-[10px] text-white/30 font-light">{m.info} • {m.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MSc Alumni */}
          {team.alumniMsc && team.alumniMsc.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-px w-12 bg-purple-500"></div>
                 <h3 className="text-xs font-mono text-purple-500 uppercase tracking-[0.4em]">Post-graduate Students (MSc Thesis)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniMsc as any[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                      <BookOpen size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white/80 truncate">{m.name}</h4>
                      <p className="text-[10px] text-white/30 font-light">{m.institution} • {m.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BTech Alumni */}
          {team.alumniBtech && team.alumniBtech.length > 0 && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-px w-12 bg-orange-500"></div>
                 <h3 className="text-xs font-mono text-orange-500 uppercase tracking-[0.4em]">Undergraduate Students (B.Tech)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniBtech as any[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                      <Beaker size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white/80">{m.name}</h4>
                      <p className="text-[10px] text-white/30 font-light">{m.institution}</p>
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
                 <div className="h-px w-12 bg-cyan-500"></div>
                 <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-[0.4em]">Project Fellows / Research Associates</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniProjectFellows as any[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <FlaskConical size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white/80 truncate">{m.name}</h4>
                      <p className="text-[10px] text-white/30 font-light">{m.duration}</p>
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
                 <div className="h-px w-12 bg-pink-500"></div>
                 <h3 className="text-xs font-mono text-pink-500 uppercase tracking-[0.4em]">Semester &amp; Summer Project Students @ IISER Tirupati</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniSemester as any[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-pink-500/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
                      <GraduationCap size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white/80 truncate">{m.name}</h4>
                      <p className="text-[10px] text-white/30 font-light">{m.batch} • {m.duration}</p>
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
                 <div className="h-px w-12 bg-amber-500"></div>
                 <h3 className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em]">Lab Rotation iPhD Students @ IISER Tirupati</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(team.alumniLabRotation as any[]).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                      <Users size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white/80 truncate">{m.name}</h4>
                      <p className="text-[10px] text-white/30 font-light">{m.batch} • {m.duration}</p>
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
