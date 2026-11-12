"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6 relative overflow-hidden">

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <p className="font-mono text-sm text-muted mb-4">404 · Page not found</p>
        
        <h1 className="text-4xl md:text-6xl text-foreground leading-[1.08] mb-6">
          Lost in the reaction mixture?
        </h1>
        
        <p className="text-lg text-secondary mb-10 leading-relaxed">
          This page doesn&apos;t exist or has moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-foreground text-background font-medium transition duration-(--dur-fast) hover:opacity-90 active:scale-[0.98]"
          >
            <Home size={16} />
            Go to homepage
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-line text-foreground font-medium hover:bg-raised transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
