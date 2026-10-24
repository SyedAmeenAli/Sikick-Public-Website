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

/**
 * Scroll progress (0..1) of an element. 'through': 0 when its top meets the
 * viewport bottom, 1 when its bottom leaves the top. 'sticky': 0 when its top
 * reaches the viewport top, 1 when its bottom reaches the viewport bottom
 * (for tall wrappers that contain a sticky stage). Writes `--p` on the element
 * (no React re-render) and optionally reports the value. One passive listener
 * and rAF throttling; cleaned up on unmount.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress?: (progress: number) => void,
  mode: 'through' | 'sticky' | 'leave' = 'through',
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', mode === 'sticky' ? '1' : mode === 'leave' ? '0' : '0.5');
      return;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'sticky') {
        const total = rect.height - vh;
        p = total <= 0 ? 1 : -rect.top / total;
      } else if (mode === 'leave') {
        p = -rect.top / Math.max(1, rect.height);
      } else {
        p = (vh - rect.top) / (vh + rect.height);
      }
      p = Math.min(1, Math.max(0, p));
      el.style.setProperty('--p', p.toFixed(4));
      cb.current?.(p);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode]);

  return ref;
}

/** True once the element has been in view; stays true (play-once draw animations). */
export function useInView<T extends HTMLElement>(threshold = 0.25): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** Subscribes to a media query; used to swap pinned desktop sequences for touch-friendly ones. */
export function useMedia(query: string): boolean {
  const get = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
