'use client';

import { PageHeader, pageMain } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Briefcase, BookOpen, Beaker } from 'lucide-react';
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

// Photo on the left, details on the right; a plain initial when there is no photo
function AlumnusCard({ alumnus, children }: { alumnus: TeamMember; children: React.ReactNode }) {
  return (
    <li className="p-4 rounded-lg bg-surface border border-line flex gap-4">
      {alumnus.image ? (
        <img src={alumnus.image} alt={alumnus.name} loading="lazy" decoding="async" className="w-20 h-24 rounded-lg object-cover shrink-0 bg-raised" />
      ) : (
        <div className="w-20 h-24 rounded-lg bg-raised shrink-0 flex items-center justify-center text-2xl text-muted" aria-hidden="true">{alumnus.name.replace(/^(Dr|Mr|Ms)\.\s*/, '')[0]}</div>
      )}
      <div className="min-w-0">
        <h3 className="text-base font-medium text-foreground mb-1">{alumnus.name}</h3>
        {children}
      </div>
    </li>
  );
}


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
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <GraduationCap className="text-muted shrink-0" size={24} aria-hidden="true" /> Doctoral alumni
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.alumniPhd.map((alumnus) => (
                  <AlumnusCard key={alumnus.name} alumnus={alumnus}>
                    <p className="font-mono text-xs text-accent tabular-nums">{alumnus.duration || alumnus.year}</p>
                    {alumnus.present && <p className="text-sm text-foreground mt-1">{alumnus.present}</p>}
                    {(alumnus.thesis || alumnus.title) && <p className="text-sm text-secondary leading-relaxed mt-2">{alumnus.thesis || alumnus.title}</p>}
                  </AlumnusCard>
                ))}
              </ul>
            </div>
          )}

          {/* Postdoctoral Alumni */}
          {team.alumniPostdoc && team.alumniPostdoc.length > 0 && (
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <Briefcase className="text-muted shrink-0" size={24} aria-hidden="true" /> Postdoctoral alumni
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.alumniPostdoc.map((alumnus) => (
                  <AlumnusCard key={alumnus.name} alumnus={alumnus}>
                    <p className="font-mono text-xs text-accent tabular-nums">{alumnus.duration}</p>
                    {alumnus.info && <p className="text-sm text-secondary leading-relaxed mt-1">{alumnus.info}</p>}
                  </AlumnusCard>
                ))}
              </ul>
            </div>
          )}

          {/* M.Sc. Thesis Alumni */}
          {team.alumniMsc && team.alumniMsc.length > 0 && (
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <BookOpen className="text-muted shrink-0" size={24} aria-hidden="true" /> M.Sc. thesis students
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniMsc.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface border border-line flex justify-between items-center gap-4">
                    {alumnus.image && <img src={alumnus.image} alt="" loading="lazy" decoding="async" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-foreground">{alumnus.name}</h3>
                      <p className="text-xs text-secondary truncate max-w-[200px]">{alumnus.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-secondary shrink-0">{alumnus.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Fellows & Research Associates */}
          {team.alumniProjectFellows && team.alumniProjectFellows.length > 0 && (
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                <Beaker className="text-muted shrink-0" size={24} aria-hidden="true" /> Project fellows and research associates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniProjectFellows.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface border border-line flex justify-between items-center gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">{alumnus.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-secondary shrink-0">{alumnus.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Semester & Summer Project Students */}
          {team.alumniSemester && team.alumniSemester.length > 0 && (
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-6 flex items-center gap-3">
                Semester and summer project students
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.alumniSemester.map((alumnus: TeamMember, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface border border-line flex justify-between items-center gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">{alumnus.name}</h3>
                      {alumnus.batch && <p className="text-xs text-secondary font-mono">{alumnus.batch}</p>}
                    </div>
                    <span className="text-xs font-mono text-accent shrink-0">{alumnus.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Lab Rotation Students */}
            {team.alumniLabRotation && team.alumniLabRotation.length > 0 && (
              <div className="reveal">
                <h3 className="text-xl font-medium mb-6 text-foreground border-b border-line pb-3">Lab Rotation i-Ph.D. Alumni</h3>
                <div className="space-y-3">
                  {team.alumniLabRotation.map((alumnus: TeamMember, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{alumnus.name}</span>
                      <span className="text-xs font-mono text-secondary">{alumnus.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Undergraduate Alumni */}
            {team.alumniBtech && team.alumniBtech.length > 0 && (
              <div className="reveal">
                <h3 className="text-xl font-medium mb-6 text-foreground border-b border-line pb-3">Undergraduate Alumni (B.Tech)</h3>
                <div className="space-y-3">
                  {team.alumniBtech.map((alumnus: TeamMember, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{alumnus.name}</span>
                      <span className="text-xs text-secondary">{alumnus.institution}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
