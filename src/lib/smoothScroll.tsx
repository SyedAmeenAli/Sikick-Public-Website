import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useLocation } from 'react-router-dom';
import { prefersReducedMotion } from './motion';

const LenisContext = createContext<Lenis | null>(null);

/** Returns the single app-wide Lenis instance, or null when reduced motion is on. */
export const useLenis = (): Lenis | null => useContext(LenisContext);

/**
 * Creates exactly one Lenis instance at the app root. Lenis runs its own rAF
 * loop (autoRaf) — no other library on this site owns a frame loop, so there
 * is nothing to bridge. Nested scroll areas opt out with `data-lenis-prevent`.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window.matchMedia !== 'function') return;
    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: { offset: -88 },
    });
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Resets scroll on route change; honours in-page #anchors; leaves back/forward alone. */
export function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -88 });
        else target.scrollIntoView();
        return;
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
}
