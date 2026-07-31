"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const ORDER = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof ORDER)[number];

const ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

const LABELS = {
  system: "system",
  light: "light",
  dark: "dark",
} as const;

const noopSubscribe = () => () => {};

/**
 * True only after hydration. The server snapshot is false, so this reports the
 * mounted state without a setState in an effect.
 */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  // The resolved theme is unknown before hydration, so render a placeholder of
  // the same size rather than guessing and flashing the wrong icon.
  const current: ThemeChoice = mounted ? ((theme as ThemeChoice) ?? "system") : "system";
  const Icon = ICONS[current] ?? Monitor;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted
          ? `Theme: ${LABELS[current]}. Switch to ${
              LABELS[ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]]
            }.`
          : "Switch theme"
      }
      onClick={() => setTheme(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length])}
    >
      {mounted ? <Icon className="size-4" /> : <span className="size-4" />}
    </Button>
  );
}
