import { Link } from 'react-router-dom';
import { Package, Scale, Bot, HardDrive } from 'lucide-react';
import { useSeo } from '../lib/seo';

export default function AboutPage() {
  useSeo({
    title: 'About Sikick',
    description: 'Sikick is one coherent product for inventory, purchasing, POS and business insights.',
    path: '/about',
  });

  return (
    <div>
      <section className="section">
        <div className="container" style={{ maxWidth: '46rem' }}>
          <p className="eyebrow">About</p>
          <h1>Built for operators who move stock.</h1>
          <p className="section-lede">
            Sikick connects inventory, purchasing, point-of-sale and business insights in one system.
            The public website, the browser-based IMS console and the POS terminal share one brand
            and one customer journey — no stitched-together tools.
          </p>
        </div>
      </section>

      <section className="section section-blush" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <div className="card-icon"><Package size={22} /></div>
              <h3>Product-first</h3>
              <p>
                The software is the hero. We do not rely on staged photography, invented metrics,
                or customer logos we cannot show.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Scale size={22} /></div>
              <h3>Truthful claims</h3>
              <p>
                We advertise a capability only after it is verified. Planned work is labelled as in
                development or scoped through consultation.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Bot size={22} /></div>
              <h3>Human in control</h3>
              <p>
                SiBorg prepares reviewable actions — reorder drafts, insights and alerts. Any
                consequential business change requires human approval before it is executed.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><HardDrive size={22} /></div>
              <h3>Data ownership</h3>
              <p>
                Customers retain practical access to their own business data, including exports and
                catalog backup. We do not lock data behind opaque formats.
              </p>
            </div>
          </div>

          <div className="notice" style={{ marginTop: 'var(--space-40)' }}>
            <strong>What you will not find here</strong>
            <ul className="check-list" style={{ marginTop: 'var(--space-12)' }}>
              <li>Founder bios or a dramatised company history.</li>
              <li>Customer testimonials, case studies or review scores we cannot source.</li>
              <li>Award badges, certification seals or partner logos without proof.</li>
              <li>Guaranteed ROI, growth metrics or usage statistics that are not verified.</li>
            </ul>
          </div>

          <div style={{ marginTop: 'var(--space-32)', display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/product">Explore the platform</Link>
            <Link className="btn btn-secondary" to="/security">Security</Link>
            <Link className="btn btn-secondary" to="/contact">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
