'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Briefcase, BookOpen, Beaker, UserCheck } from 'lucide-react';
import { Variants } from 'framer-motion';
import { team as teamData } from '../data';

interface TeamMember {
  name: string;
  duration?: string;
  year?: string | number;
  thesis?: string;
  title?: string;
  present?: string;
  image?: string;
  institution?: string;
  info?: string;
  batch?: string;
}

const team = teamData as Record<string, TeamMember[]>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <motion.div initial={false} animate="visible" variants={fadeUp} className="mb-20">
          <Link href="/team" className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:border-amber-500/30 text-amber-400 hover:text-amber-300 font-bold mb-8 transition-all text-xs font-mono uppercase tracking-wider group">
            <img src="/images/lab-logo-128.webp" alt="EBR Lab Logo" className="w-5 h-5 rounded-md object-contain bg-white/90 p-0.5" />
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Lab Members
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Alumni Registry</h1>
          <p className="text-foreground/80 text-lg font-light max-w-2xl leading-relaxed">
            A complete record of doctoral scholars, post-doctoral fellows, post-graduates, undergraduates, and project fellows who have completed their research at Raman&apos;s Research Lab.
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* Doctoral Alumni */}
          {team.alumniPhd && team.alumniPhd.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-foreground/10 pb-4">
                <GraduationCap className="text-emerald-400" size={28} /> Doctoral Alumni (Ph.D. Thesis)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px] bg-foreground/[0.02] rounded-2xl overflow-hidden border border-foreground/5">
                  <thead className="bg-foreground/5">
                    <tr className="border-b border-foreground/10 text-xs font-mono uppercase tracking-widest text-foreground/90">
                      <th className="p-6 font-medium">Scholar Name</th>
                      <th className="p-6 font-medium">Duration</th>
                      <th className="p-6 font-medium max-w-sm">Thesis Title</th>
                      <th className="p-6 font-medium">Present Designation / Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {team.alumniPhd.map((alumnus: TeamMember, idx: number) => (
                      <tr key={idx} className="hover:bg-foreground/[0.04] transition-colors">
                        <td className="p-6 font-bold text-foreground text-base">{alumnus.name}</td>
                        <td className="p-6 text-xs text-amber-400 font-mono">{alumnus.duration || alumnus.year}</td>
                        <td className="p-6 text-xs text-foreground/80 leading-relaxed max-w-sm italic">{alumnus.thesis || alumnus.title}</td>
                        <td className="p-6 text-xs text-foreground/90 font-medium">{alumnus.present || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Postdoctoral Alumni */}
          {team.alumniPostdoc && team.alumniPostdoc.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-foreground/10 pb-4">
                <Briefcase className="text-teal-400" size={28} /> Post-doctoral Alumni
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.alumniPostdoc.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:border-teal-500/20 transition-all flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{alumnus.name}</h3>
                      <p className="text-xs text-foreground/70 font-light mt-1 leading-relaxed">{alumnus.info}</p>
                      <span className="text-xs font-mono text-teal-400 mt-2 block">{alumnus.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* M.Sc. Thesis Alumni */}
          {team.alumniMsc && team.alumniMsc.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-foreground/10 pb-4">
                <BookOpen className="text-purple-400" size={28} /> Post-graduate Students (M.Sc. Thesis)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniMsc.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5 hover:border-purple-500/20 transition-all flex justify-between items-center gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{alumnus.name}</h3>
                      <p className="text-xs text-foreground/60 font-light truncate max-w-[200px]">{alumnus.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-purple-400 shrink-0">{alumnus.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Fellows & Research Associates */}
          {team.alumniProjectFellows && team.alumniProjectFellows.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-foreground/10 pb-4">
                <Beaker className="text-blue-400" size={28} /> Project Fellows & Research Associates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniProjectFellows.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5 hover:border-blue-500/20 transition-all flex justify-between items-center gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{alumnus.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-blue-400 shrink-0">{alumnus.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Semester & Summer Project Students */}
          {team.alumniSemester && team.alumniSemester.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground border-b border-foreground/10 pb-4">
                Semester & Summer Project Alumni
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniSemester.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5 hover:border-amber-500/20 transition-all flex justify-between items-center gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{alumnus.name}</h3>
                      {alumnus.batch && <p className="text-xs text-foreground/70 font-mono">{alumnus.batch}</p>}
                    </div>
                    <span className="text-xs font-mono text-amber-400 shrink-0">{alumnus.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Lab Rotation Students */}
            {team.alumniLabRotation && team.alumniLabRotation.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-3">Lab Rotation i-Ph.D. Alumni</h3>
                <div className="space-y-3">
                  {team.alumniLabRotation.map((alumnus: TeamMember, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-foreground/[0.02] border border-foreground/5 flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{alumnus.name}</span>
                      <span className="text-xs font-mono text-emerald-400">{alumnus.duration}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Undergraduate Alumni */}
            {team.alumniBtech && team.alumniBtech.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-3">Undergraduate Alumni (B.Tech)</h3>
                <div className="space-y-3">
                  {team.alumniBtech.map((alumnus: TeamMember, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-foreground/[0.02] border border-foreground/5 flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{alumnus.name}</span>
                      <span className="text-xs text-foreground/60">{alumnus.institution}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
