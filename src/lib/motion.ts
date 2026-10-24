import { useEffect, useRef, useState, type RefObject } from 'react';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal-on-scroll: sets data-visible="true" once the element enters the
 * viewport. CSS handles the actual transition; reduced motion is respected
 * in the stylesheet.
 */
export function useReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true';
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options?.threshold ?? 0.12, rootMargin: options?.rootMargin ?? '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}

/**
 * Tracks which step of a scroll narrative is active, based on each step's
 * position relative to the viewport centre. Returns the container ref to
 * attach to the steps wrapper and the active index.
 */
export function useScrollSpySteps(stepCount: number): {
  stepsRef: RefObject<HTMLDivElement | null>;
  active: number;
  setActive: (index: number) => void;
} {
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;
    const children = Array.from(container.querySelectorAll<HTMLElement>('[data-step-index]'));
    if (children.length === 0) return;

    const onScroll = () => {
      const centre = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        const childCentre = rect.top + rect.height / 2;
        const dist = Math.abs(childCentre - centre);
        if (dist < bestDist) {
          bestDist = dist;
          best = Number(child.dataset.stepIndex ?? 0);
        }
      });
      setActive((prev) => (prev === best ? prev : best));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [stepCount]);

  return { stepsRef, active, setActive };
}

/** Tracks whether the page has been scrolled past a small threshold (header state). */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}
