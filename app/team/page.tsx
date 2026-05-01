'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Mail, Globe, Users, GraduationCap, 
  ExternalLink, ChevronRight, Briefcase 
} from 'lucide-react';
import { team } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const MemberCard = ({ member, role }: { member: any, role: string }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div 
      variants={fadeUp}
      className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-xl"
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
             {role === 'PhD' ? <GraduationCap size={80} /> : role === 'Postdoc' ? <Briefcase size={80} /> : <Users size={80} />}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{role}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{member.name}</h3>
        <p className="text-xs text-white/40 font-light leading-relaxed mb-6">{member.info}</p>
        
        <div className="flex gap-4 border-t border-white/5 pt-4">
          <button className="text-white/20 hover:text-blue-400 transition-colors"><Mail size={16} /></button>
          <button className="text-white/20 hover:text-blue-400 transition-colors"><Globe size={16} /></button>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 pb-32">
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-12 transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Laboratory
            </Link>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
              Lab <br/> <span className="text-blue-500">Members</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed border-y border-white/5 py-8 italic">
              A diverse group of researchers dedicated to pioneering sustainable chemistry and advanced catalysis.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {team.postdocs && team.postdocs.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px w-12 bg-blue-500"></div>
               <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em]">Post-doctoral Fellows</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.postdocs.map((member, i) => <MemberCard key={i} member={member} role="Postdoc" />)}
            </div>
          </section>
        )}

        {team.currentPhd && team.currentPhd.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px w-12 bg-blue-500"></div>
               <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em]">Doctoral Scholars</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.currentPhd.map((member, i) => <MemberCard key={i} member={member} role="PhD" />)}
            </div>
          </section>
        )}

        {team.masters && team.masters.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px w-12 bg-blue-500"></div>
               <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em]">Master's Students</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.masters.map((member, i) => <MemberCard key={i} member={member} role="Masters" />)}
            </div>
          </section>
        )}

        <section className="pt-16 border-t border-white/5 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
             <h2 className="text-3xl font-bold mb-6">Our Alumni Network</h2>
             <p className="text-white/40 font-light max-w-xl mx-auto mb-10 leading-relaxed">
               Celebrating the achievements and career progression of our past group members across academia and industry globally.
             </p>
             <Link href="/alumni" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-2xl">
                Explore Alumni Registry <ChevronRight size={18} />
             </Link>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
