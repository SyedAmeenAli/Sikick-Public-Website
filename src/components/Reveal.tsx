import { useReveal } from '../lib/motion';

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ ['--reveal-delay' as string]: `${delay}ms` }}>
      {children}
    </div>
  );
}