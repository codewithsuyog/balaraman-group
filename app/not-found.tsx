"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
        <span className="text-[300px] md:text-[500px] font-black uppercase tracking-tighter leading-none text-foreground/5 blur-sm select-none">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8 text-xs font-mono font-bold uppercase tracking-widest border border-amber-500/30 text-amber-500 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          Page Not Found
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
          Lost in the <span className="text-gradient">Reaction Mixture?</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 font-light mb-12 leading-relaxed">
          This page doesn&apos;t exist or has moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
          >
            <Home size={18} />
            Go to homepage
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-foreground/20 text-foreground font-bold hover:bg-foreground/5 transition-all"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
