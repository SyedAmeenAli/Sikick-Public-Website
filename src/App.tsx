import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { SmoothScrollProvider, ScrollToTopOnRoute } from './lib/smoothScroll';
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

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <ScrollToTopOnRoute />
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductOverviewPage />} />
            <Route path="/product/inventory" element={<ProductInventoryPage />} />
            <Route path="/product/pos" element={<ProductPosPage />} />
            <Route path="/product/purchasing" element={<ProductPurchasingPage />} />
            <Route path="/product/stock-control" element={<ProductStockControlPage />} />
            <Route path="/product/reports" element={<ProductReportsPage />} />
            <Route path="/product/siborg" element={<ProductSiBorgPage />} />
            <Route path="/solutions/:slug" element={<SolutionsRoute />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<IndustryRoute />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/configurator" element={<Navigate to="/setup" replace />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/request-quote" element={<RequestQuotePage />} />
            <Route path="/trial" element={<TrialHandoffPage />} />
            <Route path="/login" element={<LoginHandoffPage />} />
            <Route path="/legal/privacy" element={<LegalPrivacyPage />} />
            <Route path="/legal/terms" element={<LegalTermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

function SolutionsRoute() {
  const { slug = 'retail' } = useParams();
  return <SolutionsPage slug={slug} />;
}

function IndustryRoute() {
  const { slug = '' } = useParams();
  return <IndustryDetailPage slug={slug} />;
}
