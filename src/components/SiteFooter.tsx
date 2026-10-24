import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SIKICK_APP_URL, SIKICK_POS_URL } from '../config/site';

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/">
              <img src="/brand/sikick-logo-light.svg" alt="Sikick" width="150" height="60" />
            </Link>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.product')}</h4>
            <ul>
              <li><Link to="/product">{t('nav.product.overview')}</Link></li>
              <li><Link to="/product/inventory">{t('nav.product.inventory')}</Link></li>
              <li><Link to="/product/pos">{t('nav.product.pos')}</Link></li>
              <li><Link to="/product/purchasing">{t('nav.product.purchasing')}</Link></li>
              <li><Link to="/product/stock-control">{t('nav.product.stock')}</Link></li>
              <li><Link to="/product/reports">{t('nav.product.reports')}</Link></li>
              <li><Link to="/product/siborg">{t('nav.product.siborg')}</Link></li>
              <li><Link to="/pricing">{t('nav.pricing')}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.solutions')}</h4>
            <ul>
              <li><Link to="/solutions/retail">{t('nav.solutions.retail')}</Link></li>
              <li><Link to="/solutions/wholesale">{t('nav.solutions.wholesale')}</Link></li>
              <li><Link to="/solutions/distribution">{t('nav.solutions.distribution')}</Link></li>
              <li><Link to="/solutions/manufacturing">{t('nav.solutions.manufacturing')}</Link></li>
              <li><Link to="/industries">{t('nav.industries.browse')}</Link></li>
              <li><Link to="/integrations">{t('nav.integrations')}</Link></li>
              <li><Link to="/switch-to-sikick">{t('nav.switch')}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.company')}</h4>
            <ul>
              <li><Link to="/about">{t('nav.resources.about')}</Link></li>
              <li><Link to="/contact">{t('nav.resources.contact')}</Link></li>
              <li><Link to="/security">{t('nav.security')}</Link></li>
              <li><Link to="/resources">{t('nav.resources.guides')}</Link></li>
              <li><a href={SIKICK_APP_URL}>{t('footer.app')}</a></li>
              <li><a href={SIKICK_POS_URL}>{t('footer.pos')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.legal')}</h4>
            <ul>
              <li><Link to="/legal/privacy">{t('footer.privacy')}</Link></li>
              <li><Link to="/legal/terms">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Sikick. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
