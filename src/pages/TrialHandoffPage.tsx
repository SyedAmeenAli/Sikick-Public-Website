import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { SIKICK_LOGIN_URL, SIKICK_TRIAL_URL } from '../config/site';

export default function TrialHandoffPage() {
  useSeo({
    title: 'Start a 14-day trial — Sikick',
    description: 'Trial handoff to the Sikick app.',
    path: '/trial',
    index: false,
  });
  useEffect(() => {
    window.location.replace(SIKICK_TRIAL_URL);
  }, []);
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '40rem' }}>
        <p className="eyebrow">Trial</p>
        <h1>Starting your 14-day trial…</h1>
        <p className="section-lede">
          You are being redirected to the Sikick signup flow. There you can create your account,
          choose a plan and start exploring — no payment method required.
        </p>
        <p className="section-lede">
          If nothing happens,{' '}
          <a href={SIKICK_TRIAL_URL}>continue manually <ExternalLink size={14} style={{ verticalAlign: 'middle' }} /></a>.
        </p>
      </div>
    </div>
  );
}

export function LoginHandoffPage() {
  useSeo({
    title: 'Log in — Sikick',
    description: 'Login handoff to the Sikick app.',
    path: '/login',
    index: false,
  });
  useEffect(() => {
    window.location.replace(SIKICK_LOGIN_URL);
  }, []);
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '40rem' }}>
        <p className="eyebrow">Log in</p>
        <h1>Opening Sikick…</h1>
        <p className="section-lede">
          Redirecting to the Sikick login screen. If nothing happens,{' '}
          <a href={SIKICK_LOGIN_URL}>continue manually <ExternalLink size={14} style={{ verticalAlign: 'middle' }} /></a>.
        </p>
      </div>
    </div>
  );
}
