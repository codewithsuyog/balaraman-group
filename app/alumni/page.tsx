'use client';

import { motion } from 'framer-motion';
import { PageHeader, pageMain } from '@/components/ui';
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
    <main id="main" className={pageMain}>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <Link href="/team" className="inline-flex items-center gap-1.5 py-2 text-sm text-secondary hover:text-foreground mb-4 transition-colors"><ArrowLeft size={14} aria-hidden="true" /> Back to People
        </Link>
        <PageHeader
          title="Alumni"
          intro="Doctoral scholars, postdoctoral fellows, Master's and undergraduate students, and project fellows who completed their research at Raman's Research Lab."
        />

        <div className="space-y-14">
          {/* Doctoral Alumni */}
          {team.alumniPhd && team.alumniPhd.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <GraduationCap className="text-muted shrink-0" size={24} aria-hidden="true" /> Doctoral alumni
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px] bg-surface rounded-lg overflow-hidden border border-line">
                  <thead className="bg-surface">
                    <tr className="border-b border-line text-xs font-mono text-foreground">
                      <th className="p-6 font-medium">Scholar Name</th>
                      <th className="p-6 font-medium">Duration</th>
                      <th className="p-6 font-medium max-w-sm">Thesis Title</th>
                      <th className="p-6 font-medium">Present Designation / Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {team.alumniPhd.map((alumnus: TeamMember, idx: number) => (
                      <tr key={idx} className="hover:bg-surface transition-colors">
                        <td className="p-6 font-medium text-foreground text-base">{alumnus.name}</td>
                        <td className="p-6 text-xs text-accent font-mono">{alumnus.duration || alumnus.year}</td>
                        <td className="p-6 text-xs text-secondary leading-relaxed max-w-sm">{alumnus.thesis || alumnus.title}</td>
                        <td className="p-6 text-xs text-foreground font-medium">{alumnus.present || '—'}</td>
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
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <Briefcase className="text-muted shrink-0" size={24} aria-hidden="true" /> Postdoctoral alumni
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.alumniPostdoc.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-6 rounded-lg bg-surface border border-line hover:border-line transition-colors flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-raised flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground">{alumnus.name}</h3>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">{alumnus.info}</p>
                      <span className="text-xs font-mono text-secondary mt-2 block">{alumnus.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* M.Sc. Thesis Alumni */}
          {team.alumniMsc && team.alumniMsc.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <BookOpen className="text-muted shrink-0" size={24} aria-hidden="true" /> M.Sc. thesis students
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniMsc.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface border border-line hover:border-line transition-colors flex justify-between items-center gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">{alumnus.name}</h3>
                      <p className="text-xs text-secondary truncate max-w-[200px]">{alumnus.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-secondary shrink-0">{alumnus.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Fellows & Research Associates */}
          {team.alumniProjectFellows && team.alumniProjectFellows.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <Beaker className="text-muted shrink-0" size={24} aria-hidden="true" /> Project fellows and research associates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniProjectFellows.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface border border-line hover:border-line transition-colors flex justify-between items-center gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">{alumnus.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-secondary shrink-0">{alumnus.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Semester & Summer Project Students */}
          {team.alumniSemester && team.alumniSemester.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                Semester and summer project students
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniSemester.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface border border-line hover:border-line transition-colors flex justify-between items-center gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">{alumnus.name}</h3>
                      {alumnus.batch && <p className="text-xs text-secondary font-mono">{alumnus.batch}</p>}
                    </div>
                    <span className="text-xs font-mono text-accent shrink-0">{alumnus.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Lab Rotation Students */}
            {team.alumniLabRotation && team.alumniLabRotation.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-xl font-medium mb-6 text-foreground border-b border-line pb-3">Lab Rotation i-Ph.D. Alumni</h3>
                <div className="space-y-3">
                  {team.alumniLabRotation.map((alumnus: TeamMember, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{alumnus.name}</span>
                      <span className="text-xs font-mono text-secondary">{alumnus.duration}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Undergraduate Alumni */}
            {team.alumniBtech && team.alumniBtech.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-xl font-medium mb-6 text-foreground border-b border-line pb-3">Undergraduate Alumni (B.Tech)</h3>
                <div className="space-y-3">
                  {team.alumniBtech.map((alumnus: TeamMember, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{alumnus.name}</span>
                      <span className="text-xs text-secondary">{alumnus.institution}</span>
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
