import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import { PLATFORMS, platform } from '../data/migration';
import { FaqAccordion, type FaqItem } from '../components/FaqAccordion';
import { PlatformSwitcher } from '../components/migration/PlatformSwitcher';
import { MigrationJourney } from '../components/migration/MigrationJourney';
import { ImportMapper } from '../components/migration/ImportMapper';
import { ExportBuilder } from '../components/migration/ExportBuilder';
import { AssistedMigrationForm } from '../components/migration/AssistedMigrationForm';
import { MigrationFlow } from '../components/migration/MigrationFlow';

const FAQS: FaqItem[] = [
  { question: 'Can I move my existing products and stock into Sikick?', answer: 'Yes, from a spreadsheet. Sikick imports items and parties from Excel (.xlsx), CSV and Tally XML, up to 5,000 rows per file. It checks the whole file first, writes nothing until you confirm, and applies the file as a single transaction.' },
  { question: 'Does Sikick connect directly to Zoho, Tally, Vyapar, BUSY or Marg?', answer: 'Not today. Tally and Vyapar are file imports that have been checked against real exports. Marg is a file import with column mapping and an unverified preset. BUSY has not been verified. A direct Zoho Inventory connection is built but not switched on and has not been proven against a real account.' },
  { question: 'Will my data keep syncing from my old software?', answer: 'No. Every route described here is a one-time move. After you import, Sikick is the system you trade in. Continuous synchronisation is not offered for these sources.' },
  { question: 'What happens to stock I already have in Sikick?', answer: 'Rows whose SKU already exists have their catalogue fields corrected and their opening stock ignored, so an import cannot silently overwrite a live stock count.' },
  { question: 'Can I undo an import?', answer: 'A recent import can be undone from the import history, with an honest result: items with no stock and no history are removed, items whose opening stock was posted are zeroed and kept, and anything already sold or moved is kept because it is part of your trading record.' },
  { question: 'Can I export my data from Sikick?', answer: 'The console exports financial reports (trial balance, profit and loss, balance sheet, cash flow), GST returns, the audit log and cashier activity as CSV, with JSON as well for GST returns. A one-click export of products, stock, customers and transactions is not available yet; ask for an assisted export if you need one.' },
  { question: 'Is the walkthrough on this page a real import?', answer: 'No. It is an illustration using a fictional catalogue. It never uploads anything from your device and never claims a record has been imported.' },
];

export default function SwitchToSikickPage() {
  useSeo({
    title: 'Switch to Sikick — move your business data',
    description: 'How to move products, stock and parties into Sikick from TallyPrime, Vyapar, Marg, Zoho Inventory, BUSY or a spreadsheet, and what you can export. Statuses reflect what has been verified.',
    path: '/switch-to-sikick',
  });
  const [sel, setSel] = useState('tally');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash.startsWith('#from=')) {
      const id = hash.slice(6);
      if (PLATFORMS.some((p) => p.id === id)) setSel(id);
    }
  }, [hash]);
  const p = platform(sel);

  return (
    <div className="switch-page">
      <section className="section sw-hero">
        <div className="container">
          <p className="eyebrow">Data migration</p>
          <h1>Your business data. Ready for its next chapter.</h1>
          <p className="section-lede">
            Bring your existing products, stock records and business information into Sikick with a migration process designed to make the transition clear, reviewable and manageable.
          </p>
          <div className="sw-hero-cta">
            <a className="btn btn-primary" href="#switch">Check your import options</a>
            <a className="btn btn-secondary" href="#assisted">Plan your migration</a>
          </div>
          <div className="sw-hero-flow"><MigrationFlow platform={p} stage={4} /></div>
          <ul className="sw-answers">
            <li><strong>Can I move my data in?</strong><span>Yes, from Excel, CSV or Tally XML, checked before anything is written.</span></li>
            <li><strong>Can I take it out?</strong><span>Financial reports, GST returns and logs export today. Products and customers do not yet.</span></li>
            <li><strong>Can I connect other software?</strong><span>Not live yet. Every connection is labelled with exactly what works.</span></li>
          </ul>
        </div>
      </section>

      <section className="section section-blush" id="switch" aria-labelledby="sw-switch-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Switch from your current software</p>
            <h2 id="sw-switch-title">Already using another system? Bring your business to Sikick.</h2>
            <p className="section-lede">Explore the migration options for your existing software and understand how your business information can move into Sikick. Statuses show what has been checked, not what might work.</p>
          </div>
          <PlatformSwitcher sel={sel} onSel={setSel} />
          <p className="sw-logo-note">Product names and logos belong to their owners and are shown only to identify the software you may be moving from. Their appearance here does not imply endorsement or a partnership.</p>
        </div>
      </section>

      <section className="section" id="journey" aria-labelledby="sw-journey-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">01 / The journey</p>
            <h2 id="sw-journey-title">Five steps from your old system to a counted catalogue.</h2>
            <p className="section-lede">Step through it for {p.name}. Go back, jump to a step, or start again.</p>
          </div>
          <MigrationJourney sel={sel} />
        </div>
      </section>

      <section className="section section-blush" id="import" aria-labelledby="sw-import-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">02 / Bring data into Sikick</p>
            <h2 id="sw-import-title">Map the columns. See the problems before they cost you.</h2>
            <p className="section-lede">The importer reads items and parties, recognises the column names of the systems above, and lets you point any other column at the right field. Try it on this illustrative file.</p>
          </div>
          <ImportMapper sel={sel} />
        </div>
      </section>

      <section className="section" id="export" aria-labelledby="sw-export-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">03 / Take your data with you</p>
            <h2 id="sw-export-title">What you can export today, and what you cannot yet.</h2>
            <p className="section-lede">These are the exports that exist in the console. Anything else is listed as not yet available rather than implied.</p>
          </div>
          <ExportBuilder />
        </div>
      </section>

      <section className="section section-blush" id="assisted" aria-labelledby="sw-assist-title">
        <div className="container sw-assist">
          <div>
            <p className="eyebrow">04 / Ask for help</p>
            <h2 id="sw-assist-title">Not sure your software will work? Ask before you commit.</h2>
            <p className="section-lede">Tell us what you use and what needs to move. We will say what is possible, and what is not, before you start.</p>
          </div>
          <AssistedMigrationForm initialSoftware={p.name} key={p.id} />
        </div>
      </section>

      <section className="section" aria-labelledby="sw-faq-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="sw-faq-title">What owners ask before they switch.</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>
    </div>
  );
}
