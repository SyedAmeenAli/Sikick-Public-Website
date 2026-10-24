import { Shield, Users, Database, Lock, FileText, AlertTriangle } from 'lucide-react';
import { useSeo } from '../lib/seo';

export default function SecurityPage() {
  useSeo({
    title: 'Security — Sikick',
    description: 'How Sikick protects your account, data and operations.',
    path: '/security',
  });

  return (
    <div>
      <section className="section">
        <div className="container" style={{ maxWidth: '46rem' }}>
          <p className="eyebrow">Security</p>
          <h1>Security basics, without invented badges.</h1>
          <p className="section-lede">
            Sikick protects accounts and business data through access controls, tenant isolation
            and reviewable automation. We describe only what is implemented; we do not claim
            certifications, guarantees or perfect security.
          </p>
        </div>
      </section>

      <section className="section section-blush" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '46rem' }}>
          <div className="grid grid-2">
            <div className="card">
              <div className="card-icon"><Lock size={22} /></div>
              <h3>Access control</h3>
              <p>
                Multi-factor authentication is available on all plans and required for administrator
                accounts. Enterprise plans can enforce SSO and organization-wide access policies.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Users size={22} /></div>
              <h3>Role-based permissions</h3>
              <p>
                The console supports admin, manager, warehouse staff and POS operator roles. Each
                role limits what a user can view, change or approve.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Database size={22} /></div>
              <h3>Tenant isolation</h3>
              <p>
                Customer data is separated at the database layer using row-level security policies.
                One tenant cannot read another tenant&rsquo;s records.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><FileText size={22} /></div>
              <h3>Audit trail</h3>
              <p>
                Stock movements, adjustments and SiBorg actions are written to an append-only ledger
                with attribution, so changes can be reviewed.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Shield size={22} /></div>
              <h3>Backup and recovery</h3>
              <p>
                Automated backups and a documented recovery process apply across plans. Specific
                schedules, retention windows and recovery-time targets are available on request once
                verified for your plan.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><AlertTriangle size={22} /></div>
              <h3>What we do not claim</h3>
              <p>
                We do not display security certifications we have not earned, publish encryption
                key details, promise 100% uptime, or guarantee recovery times we cannot verify.
              </p>
            </div>
          </div>

          <div className="notice" style={{ marginTop: 'var(--space-32)' }}>
            <strong>Questions or a security concern?</strong>
            <p className="mt-0" style={{ marginBottom: 0 }}>
              Reach out through the <a href="/contact">contact page</a>. For vulnerabilities,
              include enough detail for us to reproduce the issue.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
