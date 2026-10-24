import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X } from 'lucide-react';
import { SiBorgMark, type SiBorgState } from './hairline/SiBorgMark';

// three.js only loads when the drawer is first opened
const SiBorgObject3D = lazy(() => import('./SiBorgObject3D').then((m) => ({ default: m.SiBorgObject3D })));

const CHATBOT_NAME = 'SiBorg';
const CHATBOT_MARKER = '₹5';
const CHATBOT_LABEL = `${CHATBOT_NAME} ${CHATBOT_MARKER}`;

type Message = { role: 'bot' | 'user'; text: string };

const QUICK_ACTIONS = [
  'Find the right plan',
  'Explore my industry',
  'Compare Core and AI',
  'Ask about a feature',
  'Build my setup',
  'Talk to Enterprise',
];

function replyFor(input: string): { text: string; navigate?: string } {
  const text = input.toLowerCase();
  if (text.includes('plan') || text.includes('price') || text.includes('pricing')) {
    return {
      text: 'Core is ₹650/month or ₹6,500/year for everyday operations. AI is ₹2,550/month or ₹25,500/year and adds GST, batch tracking, analytics and SiBorg. Enterprise is a custom quote. Prices are before applicable GST.',
      navigate: '/pricing',
    };
  }
  if (text.includes('industry') || text.includes('sector')) {
    return {
      text: 'Sikick serves 78 inventory-heavy sectors. Search the directory and open a sector page for relevant workflows.',
      navigate: '/industries',
    };
  }
  if (text.includes('core') && text.includes('ai')) {
    return {
      text: 'Core covers catalog, stock, purchasing, POS, customers and reports. AI adds GST, expenses, batch tracking, transfers, stocktakes, analytics and SiBorg.',
      navigate: '/pricing',
    };
  }
  if (text.includes('feature') || text.includes('barcode') || text.includes('variant')) {
    return {
      text: 'Verified features include variants, SKUs, barcodes, stock ledger, adjustments, purchase orders, receiving, customers, quotations, orders, returns and reports, with CSV export of financial reports and GST returns. Advanced modules are labeled by plan.',
      navigate: '/product',
    };
  }
  if (text.includes('enterprise') || text.includes('quote') || text.includes('manufactur')) {
    return {
      text: 'Enterprise is for governance, custom workflows, integrations, advanced accounting and manufacturing requirements. It leads to a tailored quote request, not a standard trial.',
      navigate: '/request-quote',
    };
  }
  if (text.includes('config') || text.includes('setup') || text.includes('business')) {
    return {
      text: 'Use the configurator to choose a business type, select workflows, answer a few details, and get a recommended plan with a downloadable blueprint.',
      navigate: '/setup',
    };
  }
  if (text.includes('trial')) {
    return {
      text: 'Core and AI offer a 14-day trial with no payment method required. Email/password signups verify email first.',
      navigate: '/trial',
    };
  }
  return {
    text: 'I can help you compare plans, explore sectors, understand verified features, or open the configurator. Choose a quick action or describe your business.',
  };
}

export function Chatbot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi, I’m SiBorg. Tell me about your business and I’ll help you explore the right Sikick setup.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);
  const [mark, setMark] = useState<SiBorgState>('idle');
  const [everOpened, setEverOpened] = useState(false);
  const settle = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    hasOpened.current = true;
    setEverOpened(true);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open || !hasOpened.current) return;
    launcherRef.current?.focus();
  }, [open]);

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setInput('');
    setMark('thinking');
    window.setTimeout(() => {
      const response = replyFor(trimmed);
      setMessages((current) => [...current, { role: 'bot', text: response.text }]);
      setMark(response.navigate ? 'recommend' : 'insight');
      if (settle.current) window.clearTimeout(settle.current);
      settle.current = window.setTimeout(() => setMark('idle'), 4500);
      if (response.navigate) {
        window.setTimeout(() => navigate(response.navigate!), 360);
      }
    }, 300);
  };

  return (
    <div className="chatbot-root" data-open={open}>
      <div className="chatbot-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
      <button
        ref={launcherRef}
        type="button"
        className="chatbot-launcher"
        aria-expanded={open}
        aria-controls="sikick-siborg-panel"
        aria-label={`Open ${CHATBOT_LABEL}`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="chatbot-launcher-icon" aria-hidden="true">
          <SiBorgMark size={30} state="idle" />
        </span>
        <span>{CHATBOT_LABEL}</span>
      </button>

      <div
        id="sikick-siborg-panel"
        ref={panelRef}
        className="chatbot-panel"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="sikick-siborg-title"
      >
        <div className="chatbot-head">
          <SiBorgMark size={44} state={open ? mark : 'idle'} />
          <div className="chatbot-head-text">
            <strong id="sikick-siborg-title">{CHATBOT_LABEL}</strong>
            <span>Public setup assistant</span>
          </div>
          <button type="button" className="chatbot-close" aria-label="Close SiBorg" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="chatbot-stage" aria-hidden="true">
          {everOpened && (
            <Suspense fallback={<SiBorgMark size={120} state={mark} />}>
              <SiBorgObject3D state={open ? mark : 'idle'} />
            </Suspense>
          )}
        </div>
        <div className="chatbot-log" aria-live="polite" data-lenis-prevent>
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-msg chatbot-msg-${message.role}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot-actions">
          {QUICK_ACTIONS.map((action) => (
            <button key={action} type="button" className="chatbot-chip" onClick={() => send(action)}>
              {action}
            </button>
          ))}
        </div>
        <form
          className="chatbot-form"
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about plans, sectors or features"
            aria-label="SiBorg message"
            onFocus={() => setMark((m) => (m === 'idle' ? 'listening' : m))}
            onBlur={() => setMark((m) => (m === 'listening' ? 'idle' : m))}
          />
          <button type="submit" className="chatbot-send" aria-label="Send message">
            <Send size={16} />
          </button>
        </form>
        <p className="chatbot-note">
          Public-site guidance only. No private shop data is accessed and nothing here changes an account.
        </p>
      </div>
    </div>
  );
}