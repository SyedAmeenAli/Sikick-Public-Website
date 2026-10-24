import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, X } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { SIKICK_LOGIN_URL, SIKICK_TRIAL_URL } from '../config/site';
import { INDUSTRIES } from '../data/industries';
import { useLenis } from '../lib/smoothScroll';

export type NavItem = { to: string; labelKey: string; descKey?: string };

type Group = { key: string; label: string; prefixes: string[]; items: Array<{ to: string; label: string; desc?: string }> };

const FEATURED_SECTORS = [
  'pharmacies-and-drugstores',
  'apparel-and-fashion-retail',
  'consumer-electronics',
  'supermarkets-and-hypermarkets',
  'wholesale-trading',
  'automotive-parts-and-spares',
];

/**
 * Left-hand navigation drawer for phones and tablets. Rendered in a portal so
 * it sits above the SiBorg launcher and the sticky header. It stays mounted
 * and animates with CSS: opening and closing are the same transition run in
 * either direction, so a tap responds immediately and nothing is left blocking
 * the page after it closes (closed = inert + visibility hidden once the
 * transition ends).
 */
export function MobileNav({
  open,
  onClose,
  returnFocusTo,
  product,
  solutions,
  resources,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLElement | null>;
  product: NavItem[];
  solutions: NavItem[];
  resources: NavItem[];
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const lenis = useLenis();
  const panel = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const map = (items: NavItem[]) => items.map((i) => ({ to: i.to, label: t(i.labelKey), desc: i.descKey ? t(i.descKey) : undefined }));
  const sectors = FEATURED_SECTORS.map((slug) => INDUSTRIES.find((i) => i.slug === slug)).filter((x): x is NonNullable<typeof x> => !!x);
  const groups: Group[] = [
    { key: 'product', label: t('nav.product'), prefixes: ['/product'], items: map(product) },
    { key: 'solutions', label: t('nav.solutions'), prefixes: ['/solutions'], items: map(solutions) },
    {
      key: 'industries',
      label: t('nav.industries'),
      prefixes: ['/industries'],
      items: [
        { to: '/industries', label: t('nav.industries.browse'), desc: t('nav.industries.browse.desc') },
        ...sectors.map((s) => ({ to: `/industries/${s.slug}`, label: s.name })),
      ],
    },
    { key: 'resources', label: t('nav.resources'), prefixes: ['/resources', '/integrations', '/security', '/about', '/contact'], items: map(resources) },
  ];
  const activeGroup = groups.find((g) => g.prefixes.some((p) => location.pathname.startsWith(p)))?.key ?? null;

  // each time the drawer opens, start with only the current section expanded
  useEffect(() => {
    if (open) setExpanded(activeGroup);
  }, [open, activeGroup]);

  // scroll lock, SiBorg launcher hidden while open
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add('nav-locked');
      lenis?.stop();
    } else {
      root.classList.remove('nav-locked');
      lenis?.start();
    }
    return () => {
      root.classList.remove('nav-locked');
      lenis?.start();
    };
  }, [open, lenis]);

  // focus the close button on open, return focus to the toggle on close
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const id = window.setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 60);
      return () => window.clearTimeout(id);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      returnFocusTo.current?.focus({ preventScroll: true });
    }
    return undefined;
  }, [open, returnFocusTo]);

  // Escape closes; Tab stays inside the drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel.current) return;
      const focusables = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !panel.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const toggle = useCallback((key: string) => setExpanded((cur) => (cur === key ? null : key)), []);
  const isHere = (to: string) => (to === '/industries' ? location.pathname === '/industries' : location.pathname === to);

  let n = 0;
  const step = () => ({ ['--i' as string]: n++ });

  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="mnav-root" data-open={open} inert={!open}>
      <div className="mnav-backdrop" onClick={onClose} aria-hidden="true" />
      <aside ref={panel} id="mobile-nav" className="mnav" role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="mnav-top" style={step()}>
          <Link to="/" className="mnav-logo" aria-label="Sikick home" onClick={onClose}>
            <img src="/brand/sikick-logo.svg" alt="Sikick" width="120" height="48" />
          </Link>
          <button ref={closeBtn} type="button" className="mnav-close" aria-label="Close navigation" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="mnav-scroll" aria-label="Primary" data-lenis-prevent>
          <ul className="mnav-list">
            {groups.map((g) => {
              const isOpen = expanded === g.key;
              const active = activeGroup === g.key;
              const panelId = `mnav-sub-${g.key}`;
              return (
                <li key={g.key} className="mnav-item" data-active={active} style={step()}>
                  <button type="button" className="mnav-group" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(g.key)}>
                    <span>{g.label}</span>
                    <ChevronDown size={18} aria-hidden="true" className="mnav-chev" />
                  </button>
                  <div id={panelId} className="mnav-sub" data-open={isOpen} role="region" aria-label={g.label}>
                    <ul>
                      {g.items.map((item) => (
                        <li key={item.to}>
                          <Link to={item.to} className="mnav-link" data-current={isHere(item.to)} onClick={onClose} tabIndex={isOpen ? 0 : -1}>
                            <strong>{item.label}</strong>
                            {item.desc && <span>{item.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
            <li className="mnav-item" data-active={location.pathname.startsWith('/pricing')} style={step()}>
              <Link to="/pricing" className="mnav-direct" data-current={location.pathname.startsWith('/pricing')} onClick={onClose}>
                {t('nav.pricing')}
              </Link>
            </li>
          </ul>
          <div className="mnav-lang" style={step()}>
            <span className="mnav-lang-label">{t('footer.language')}</span>
            <LanguageSelector align="left" />
          </div>
        </nav>

        <div className="mnav-actions" style={step()}>
          <a className="btn btn-secondary" href={SIKICK_LOGIN_URL}>
            {t('nav.login')}
          </a>
          <a className="btn btn-primary" href={SIKICK_TRIAL_URL}>
            {t('nav.trial')}
          </a>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
