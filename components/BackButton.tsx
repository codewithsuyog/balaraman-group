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
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <ThemeToggle />
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full shadow-lg text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300"
        aria-label="Go back"
        title="Go back"
      >
        <ArrowLeft size={20} />
      </button>
    </div>
  );
}
