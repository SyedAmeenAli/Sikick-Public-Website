import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Menu } from 'lucide-react';
import { useScrolled } from '../lib/motion';
import { LanguageSelector } from './LanguageSelector';
import { MobileNav } from './MobileNav';
import { SIKICK_LOGIN_URL, SIKICK_TRIAL_URL } from '../config/site';

const productItems = [
  { to: '/product', labelKey: 'nav.product.overview', descKey: 'nav.product.overview.desc' },
  { to: '/product/inventory', labelKey: 'nav.product.inventory', descKey: 'nav.product.inventory.desc' },
  { to: '/product/pos', labelKey: 'nav.product.pos', descKey: 'nav.product.pos.desc' },
  { to: '/product/purchasing', labelKey: 'nav.product.purchasing', descKey: 'nav.product.purchasing.desc' },
  { to: '/product/stock-control', labelKey: 'nav.product.stock', descKey: 'nav.product.stock.desc' },
  { to: '/product/reports', labelKey: 'nav.product.reports', descKey: 'nav.product.reports.desc' },
  { to: '/product/siborg', labelKey: 'nav.product.siborg', descKey: 'nav.product.siborg.desc' },
];

const solutionItems = [
  { to: '/solutions/retail', labelKey: 'nav.solutions.retail', descKey: 'nav.solutions.retail.desc' },
  { to: '/solutions/wholesale', labelKey: 'nav.solutions.wholesale', descKey: 'nav.solutions.wholesale.desc' },
  { to: '/solutions/distribution', labelKey: 'nav.solutions.distribution', descKey: 'nav.solutions.distribution.desc' },
  { to: '/solutions/manufacturing', labelKey: 'nav.solutions.manufacturing', descKey: 'nav.solutions.manufacturing.desc' },
];

const resourceItems = [
  { to: '/resources', labelKey: 'nav.resources.guides', descKey: 'nav.resources.guides.desc' },
  { to: '/switch-to-sikick', labelKey: 'nav.switch', descKey: 'nav.switch.desc' },
  { to: '/integrations', labelKey: 'nav.integrations', descKey: '' },
  { to: '/security', labelKey: 'nav.security', descKey: '' },
  { to: '/about', labelKey: 'nav.resources.about', descKey: '' },
  { to: '/contact', labelKey: 'nav.resources.contact', descKey: '' },
];

type MenuKey = 'product' | 'solutions' | 'resources';

export function SiteHeader() {
  const { t } = useTranslation();
  const scrolled = useScrolled();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hoverTimer = useRef<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (event.target instanceof Node && !document.querySelector('.site-header')?.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  const openWithDelay = (menu: MenuKey) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(menu), 90);
  };
  const closeWithDelay = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(null), 180);
  };

  const isActive = (prefix: string) => location.pathname.startsWith(prefix);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container header-inner">
        <Link to="/" className="header-logo" aria-label="Sikick home">
          <img src="/brand/sikick-logo.svg" alt="Sikick" width="150" height="60" />
        </Link>

        <nav className="header-nav" aria-label="Primary">
          {(['product', 'solutions', 'resources'] as MenuKey[]).map((menu) => {
            const items = menu === 'product' ? productItems : menu === 'solutions' ? solutionItems : resourceItems;
            const label = menu === 'product' ? t('nav.product') : menu === 'solutions' ? t('nav.solutions') : t('nav.resources');
            const active =
              (menu === 'product' && isActive('/product')) ||
              (menu === 'solutions' && isActive('/solutions')) ||
              (menu === 'resources' && (isActive('/resources') || isActive('/switch-to-sikick') || isActive('/integrations') || isActive('/security') || isActive('/about') || isActive('/contact')));
            return (
              <div
                key={menu}
                className="header-nav-item"
                onMouseEnter={() => openWithDelay(menu)}
                onMouseLeave={closeWithDelay}
              >
                <button
                  type="button"
                  className={`header-nav-link ${active ? 'active' : ''}`}
                  aria-expanded={openMenu === menu}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(openMenu === menu ? null : menu)}
                >
                  {label} <ChevronDown className="chev" size={14} aria-hidden="true" />
                </button>
                <div className="mega" data-open={openMenu === menu} role="menu" aria-hidden={openMenu !== menu}>
                  <div className="mega-grid" style={menu === 'resources' ? { gridTemplateColumns: '1fr' } : undefined}>
                    {items.map((item) => (
                      <Link key={item.to} to={item.to} className="mega-item" role="menuitem" onClick={() => setOpenMenu(null)}>
                        <span>
                          <strong>{t(item.labelKey)}</strong>
                          {item.descKey && <span>{t(item.descKey)}</span>}
                        </span>
                      </Link>
                    ))}
                    {menu === 'product' && (
                      <Link to="/industries" className="mega-item" role="menuitem" onClick={() => setOpenMenu(null)}>
                        <span>
                          <strong>{t('nav.industries.browse')}</strong>
                          <span>{t('nav.industries.browse.desc')}</span>
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <NavLink to="/industries" className={({ isActive }) => `header-nav-link${isActive ? ' active' : ''}`}>
            {t('nav.industries')}
          </NavLink>
          <NavLink to="/pricing" className={({ isActive }) => `header-nav-link${isActive ? ' active' : ''}`}>
            {t('nav.pricing')}
          </NavLink>
        </nav>

        <div className="header-actions">
          <div className="header-lang-desktop">
            <LanguageSelector />
          </div>
          <a className="header-login" href={SIKICK_LOGIN_URL}>
            {t('nav.login')}
          </a>
          <a className="btn btn-primary btn-sm" href={SIKICK_TRIAL_URL}>
            {t('nav.trial')}
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-haspopup="dialog"
          aria-label={t('nav.menu')}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={closeMobile} returnFocusTo={toggleRef} product={productItems} solutions={solutionItems} resources={resourceItems} />
    </header>
  );
}
