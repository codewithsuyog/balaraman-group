"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center text-foreground cursor-default opacity-0" aria-label="Toggle theme"></button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center text-foreground hover:bg-raised hover:text-accent transition duration-(--dur-fast) active:scale-[0.96]"
      aria-label="Toggle theme"
    >
      {/* key restarts the turn-in animation each time the icon swaps */}
      {resolvedTheme === "dark" ? (
        <Sun key="sun" className="turn-in h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon key="moon" className="turn-in h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
