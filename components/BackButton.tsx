"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Don't show on home page
  if (pathname === "/") return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 [&_button]:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]">
      <ThemeToggle />
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 bg-surface border border-line rounded-full text-foreground hover:bg-raised transition-colors duration-300"
        aria-label="Go back"
        title="Go back"
      >
        <ArrowLeft size={20} />
      </button>
    </div>
  );
}
