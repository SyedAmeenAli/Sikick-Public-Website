import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { MarketingLayout } from './layout/MarketingLayout';
import HomePage from './pages/HomePage';
import ProductOverviewPage from './pages/ProductOverviewPage';
import ProductInventoryPage from './pages/ProductInventoryPage';
import ProductPosPage from './pages/ProductPosPage';
import ProductPurchasingPage from './pages/ProductPurchasingPage';
import ProductStockControlPage from './pages/ProductStockControlPage';
import ProductReportsPage from './pages/ProductReportsPage';
import ProductSiBorgPage from './pages/ProductSiBorgPage';
import { SolutionsPage } from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import PricingPage from './pages/PricingPage';
import SetupPage from './pages/SetupPage';
import IntegrationsPage from './pages/IntegrationsPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SecurityPage from './pages/SecurityPage';
import RequestQuotePage from './pages/RequestQuotePage';
import TrialHandoffPage, { LoginHandoffPage } from './pages/TrialHandoffPage';
import LegalPrivacyPage from './pages/LegalPrivacyPage';
import LegalTermsPage from './pages/LegalTermsPage';
import NotFoundPage from './pages/NotFoundPage';

function wrap(element: React.ReactNode) {
  return <MarketingLayout>{element}</MarketingLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={wrap(<HomePage />)} />
        <Route path="/product" element={wrap(<ProductOverviewPage />)} />
        <Route path="/product/inventory" element={wrap(<ProductInventoryPage />)} />
        <Route path="/product/pos" element={wrap(<ProductPosPage />)} />
        <Route path="/product/purchasing" element={wrap(<ProductPurchasingPage />)} />
        <Route path="/product/stock-control" element={wrap(<ProductStockControlPage />)} />
        <Route path="/product/reports" element={wrap(<ProductReportsPage />)} />
        <Route path="/product/siborg" element={wrap(<ProductSiBorgPage />)} />
        <Route path="/solutions/:slug" element={<SolutionsRoute />} />
        <Route path="/industries" element={wrap(<IndustriesPage />)} />
        <Route path="/industries/:slug" element={<IndustryRoute />} />
        <Route path="/pricing" element={wrap(<PricingPage />)} />
        <Route path="/setup" element={wrap(<SetupPage />)} />
        <Route path="/configurator" element={<Navigate to="/setup" replace />} />
        <Route path="/integrations" element={wrap(<IntegrationsPage />)} />
        <Route path="/resources" element={wrap(<ResourcesPage />)} />
        <Route path="/about" element={wrap(<AboutPage />)} />
        <Route path="/contact" element={wrap(<ContactPage />)} />
        <Route path="/security" element={wrap(<SecurityPage />)} />
        <Route path="/request-quote" element={wrap(<RequestQuotePage />)} />
        <Route path="/trial" element={wrap(<TrialHandoffPage />)} />
        <Route path="/login" element={wrap(<LoginHandoffPage />)} />
        <Route path="/legal/privacy" element={wrap(<LegalPrivacyPage />)} />
        <Route path="/legal/terms" element={wrap(<LegalTermsPage />)} />
        <Route path="*" element={wrap(<NotFoundPage />)} />
      </Routes>
    </BrowserRouter>
  );
}

function SolutionsRoute() {
  const slug = window.location.pathname.split('/').pop() ?? 'retail';
  return wrap(<SolutionsPage slug={slug} />);
}

function IndustryRoute() {
  const slug = window.location.pathname.split('/').pop() ?? '';
  return wrap(<IndustryDetailPage slug={slug} />);
}
