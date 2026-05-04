"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Don't show on home page
  if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft size={24} />
    </button>
  );
}
