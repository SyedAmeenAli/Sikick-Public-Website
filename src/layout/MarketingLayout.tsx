import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { Chatbot } from '../components/Chatbot';

/**
 * Shared shell. Header, footer and assistant stay mounted across routes; only
 * the page content is keyed by pathname so it replays the short route-in
 * animation. The animation is CSS keyframes that end visible — if it is
 * interrupted the page is still fully visible.
 */
export function MarketingLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" key={pathname} className="route-view">
        <Outlet />
      </main>
      <SiteFooter />
      <Chatbot />
    </>
  );
}
