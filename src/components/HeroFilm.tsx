import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { prefersReducedMotion, useMedia } from '../lib/motion';

/**
 * Homepage hero film. A silent, looping, pre-rendered sequence (scan, sale,
 * receipt, stock movement, SiBorg proposal) that sits under the real HTML
 * headline and CTAs. Behaviour:
 *  - the poster is a real <img>, so the frame is never empty and nothing shifts
 *  - the video source is only attached once the film is near the viewport
 *  - it plays only while visible and can be paused (WCAG 2.2.2)
 *  - reduced motion, or a failed load, keeps the poster as the final state
 *  - a 9:16 cut is served below 900px so the interface stays legible
 */
export function HeroFilm() {
  const portrait = useMedia('(max-width: 899px)');
  const reduced = prefersReducedMotion();
  const box = useRef<HTMLElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const visible = useRef(false);
  const userPaused = useRef(false);

  const src = portrait ? '/media/sikick-hero-portrait.mp4' : '/media/sikick-hero.mp4';
  const poster = portrait ? '/media/sikick-hero-portrait-poster.jpg' : '/media/sikick-hero-poster.jpg';
  const dims = portrait ? { width: 900, height: 1600 } : { width: 1600, height: 900 };

  useEffect(() => {
    const el = box.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setNear(true);
          visible.current = e.isIntersecting && e.intersectionRatio > 0.25;
          const v = video.current;
          if (!v) return;
          if (visible.current && !userPaused.current) void v.play().catch(() => setFailed(true));
          else v.pause();
        });
      },
      { threshold: [0, 0.25, 0.6], rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    setReady(false);
  }, [src]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      void v.play();
      setPaused(false);
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  };

  const showVideo = !reduced && near && !failed;
  return (
    <figure className={`hero-film ${portrait ? 'is-portrait' : ''}`} ref={box}>
      <div className="hero-film-frame" style={{ aspectRatio: `${dims.width} / ${dims.height}` }}>
        <img
          src={poster}
          alt="Sikick in a fictional workspace: a barcode scan, a sale, a receipt, a stock movement and a SiBorg reorder proposal"
          width={dims.width}
          height={dims.height}
          decoding="async"
          fetchPriority="high"
        />
        {showVideo && (
          <video
            key={src}
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            data-ready={ready}
            onCanPlay={() => {
              setReady(true);
              if (visible.current && !userPaused.current) void video.current?.play().catch(() => setFailed(true));
            }}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption>
        <span>Morrow Goods is a fictional workspace used for illustration.</span>
        {showVideo && ready && (
          <button type="button" className="hero-film-toggle" onClick={toggle} aria-label={paused ? 'Play film' : 'Pause film'}>
            {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
