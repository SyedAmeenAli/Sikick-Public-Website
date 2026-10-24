import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';

export default function NotFoundPage() {
  useSeo({ title: 'Page not found — Sikick', description: 'The requested page does not exist.', path: '/404', index: false });
  return (
    <div className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>{/* t */}Page not found</h1>
        <p className="section-lede" style={{ margin: '0 auto var(--space-24)' }}>
          The page you asked for does not exist. Try the directory, pricing or the configurator.
        </p>
        <Link className="btn btn-primary" to="/">Back to home</Link>
      </div>
    </div>
  );
}
