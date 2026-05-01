'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Users } from 'lucide-react';
import { team } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-20">
          <Link href="/#team" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Lab Members
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Alumni Registry</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl">
            A complete record of the brilliant doctoral scholars, post-graduates, undergraduates, and project fellows who have contributed to Raman's Research Lab.
          </p>
        </motion.div>

        <div className="space-y-32">
          {/* Doctoral Alumni */}
          {team.alumniPhd && team.alumniPhd.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
                <GraduationCap className="text-blue-400" size={32} /> Doctoral Alumni
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px] bg-white/[0.02] rounded-2xl overflow-hidden border border-white/5">
                  <thead className="bg-white/5">
                    <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-widest text-white/50">
                      <th className="p-6 font-medium">Scholar Name</th>
                      <th className="p-6 font-medium">Duration</th>
                      <th className="p-6 font-medium max-w-sm">Thesis Title</th>
                      <th className="p-6 font-medium">Present Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {team.alumniPhd.map((alumnus, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                        <td className="p-6 font-bold text-white/90 text-lg">{alumnus.name}</td>
                        <td className="p-6 text-sm text-[var(--color-muted)] font-mono">{alumnus.duration || alumnus.year}</td>
                        <td className="p-6 text-xs text-white/70 leading-relaxed max-w-sm italic">{alumnus.thesis || alumnus.title}</td>
                        <td className="p-6 text-sm text-blue-400 font-medium">{alumnus.present}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Post-graduate (MSc Thesis) */}
            {team.mscAlumni && team.mscAlumni.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">M.Sc. Thesis Alumni</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {team.mscAlumni.map((name, idx) => (
                    <li key={idx} className="text-sm text-white/70 font-light bg-white/5 px-4 py-3 rounded-lg border border-white/5 hover:border-blue-500/20 transition-colors">
                      {name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Project Fellows & RAs */}
            {team.projectFellows && team.projectFellows.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Project Fellows & Research Associates</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {team.projectFellows.map((name, idx) => (
                    <li key={idx} className="text-sm text-white/70 font-light bg-white/5 px-4 py-3 rounded-lg border border-white/5 hover:emerald-500/20 transition-colors">
                      {name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Semester & Summer Project Students */}
            {team.summerStudents && team.summerStudents.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Semester & Summer Project Students</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {team.summerStudents.map((name, idx) => (
                    <li key={idx} className="text-sm text-white/70 font-light bg-white/5 px-4 py-3 rounded-lg border border-white/5 hover:border-blue-500/20 transition-colors">
                      {name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div className="space-y-16">
              {/* Lab Rotation Students */}
              {team.labRotation && team.labRotation.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Lab Rotation i-PhD Students</h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {team.labRotation.map((name, idx) => (
                      <li key={idx} className="text-sm text-white/70 font-light bg-white/5 px-4 py-3 rounded-lg border border-white/5 hover:border-emerald-500/20 transition-colors">
                        {name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Undergraduate Students */}
              {team.ugAlumni && team.ugAlumni.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Undergraduate Alumni</h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {team.ugAlumni.map((name, idx) => (
                      <li key={idx} className="text-sm text-white/70 font-light bg-white/5 px-4 py-3 rounded-lg border border-white/5 hover:border-blue-500/20 transition-colors">
                        {name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
