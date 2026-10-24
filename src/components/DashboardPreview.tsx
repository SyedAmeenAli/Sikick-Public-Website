import { useEffect, useState } from 'react';
import { useReveal } from '../lib/motion';

const metrics = [
  { label: 'SKUs in stock', target: 1284, suffix: '', sub: '+2.4% vs last month', tone: 'good' },
  { label: 'Low-stock items', target: 17, suffix: '', sub: 'Needs attention', tone: 'warn' },
  { label: 'Sales today', target: 480000, suffix: '₹', sub: '+11% vs last month', tone: 'good', currency: true },
  { label: 'Purchase orders open', target: 9, suffix: '', sub: '3 overdue', tone: 'neutral' },
];

const rows = [
  { sku: 'SKU-1042', name: 'Cotton T-shirt (M, Navy)', qty: '+240', badge: 'ok' },
  { sku: 'SKU-2081', name: 'Wireless earbuds (Black)', qty: '12', badge: 'low' },
  { sku: 'SKU-3310', name: 'Ceramic mug 350ml', qty: '0', badge: 'out' },
  { sku: 'SKU-1187', name: 'A4 notebook 200pg', qty: '64', badge: 'ok' },
];

export function DashboardPreview() {
  const ref = useReveal<HTMLDivElement>();
  const [values, setValues] = useState(metrics.map(() => 0));
  const [chart, setChart] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setChart(true);
      setValues(metrics.map((metric) => metric.target));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setChart(true);
        metrics.forEach((metric, index) => {
          const duration = 900;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValues((current) => {
              const next = [...current];
              next[index] = Math.round(metric.target * eased);
              return next;
            });
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  const format = (metric: (typeof metrics)[number], value: number) => {
    if (metric.currency) return `₹${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString('en-IN');
  };

  return (
    <div ref={ref} className="ui-frame dashboard-preview" aria-label="Sikick dashboard preview">
      <div className="ui-chrome">
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-dot" />
        <span className="ui-chrome-url">app.sikick.com · dashboard</span>
        <span className="ui-demo-tag">Morrow Goods</span>
      </div>
      <div className="ui-body">
        <div className="ui-topbar">
          <span className="ui-topbar-title">Inventory overview</span>
          <span className="ui-demo-tag">Last 30 days</span>
        </div>
        <div className="ui-cards">
          {metrics.map((metric, index) => (
            <div className="ui-metric" key={metric.label}>
              <div className="ui-metric-label">{metric.label}</div>
              <div className="ui-metric-value">{format(metric, values[index])}</div>
              <div className={`ui-metric-sub ${metric.tone}`}>{metric.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--space-12)' }}>
          <div className="ui-panel">
            <div className="ui-panel-title">Recent inventory activity</div>
            {rows.map((row) => (
              <div className="ui-row" key={row.sku}>
                <span className="ui-sku">{row.sku}</span>
                <span className="ui-name">{row.name}</span>
                <span className="ui-qty">{row.qty}</span>
                <span className={`ui-badge ui-badge-${row.badge}`}>
                  {row.badge === 'ok' ? 'OK' : row.badge === 'low' ? 'Low' : 'Out'}
                </span>
              </div>
            ))}
            <div className="ui-bars" aria-hidden="true">
              {[34, 58, 42, 76, 51, 68, 45].map((height, index) => (
                <div
                  key={index}
                  className={`ui-bar ${index === 3 ? '' : 'dim'}`}
                  style={{ height: chart ? `${height}%` : '4%' }}
                />
              ))}
            </div>
          </div>
          <div className="ui-panel ui-siborg">
            <div className="ui-panel-title">
              <span aria-hidden="true">●</span> SiBorg — reviewable reorder draft
            </div>
            <p style={{ fontSize: '0.78rem', color: '#e9dee2', margin: '0 0 10px' }}>
              Wireless earbuds are below the reorder threshold. Suggested quantity: 60 units.
            </p>
            <div style={{ fontSize: '0.72rem', color: 'rgb(233 222 226 / 0.65)', marginBottom: '10px' }}>
              Coverage: 14 days of stock · confidence: medium · lead time: 7 days
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="ui-approve-btn">Approve draft</span>
              <span className="ui-ghost-btn">Edit &amp; recalculate</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-preview { position: relative; }
        @keyframes floatIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .dashboard-float-panel { display: none; }
        }
      `}</style>
    </div>
  );
}

export default DashboardPreview;
