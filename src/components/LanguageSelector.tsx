import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { applyLanguage, currentLanguage, LANGUAGES, LANGUAGE_NAMES } from '../i18n';

export function LanguageSelector({ align = 'right' }: { align?: 'left' | 'right' }) {
  const { t } = useTranslation();
  const current = currentLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('mousedown', close);
      document.addEventListener('keydown', escape);
    }
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const select = async (language: string) => {
    if (language === current) {
      setOpen(false);
      return;
    }
    await applyLanguage(language as (typeof LANGUAGES)[number]);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="lang-control"
      data-open={open}
      style={{ position: 'relative' }}
    >
      <button
        type="button"
        className="lang-button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('footer.language')}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe size={14} aria-hidden="true" />
        <span>{LANGUAGE_NAMES[current]}</span>
        <ChevronDown size={14} aria-hidden="true" style={{ transition: 'transform 150ms' }} />
      </button>
      <div
        className="lang-menu"
        role="listbox"
        aria-label={t('footer.language')}
        style={{ [align === 'left' ? 'left' : 'right']: 0 }}
      >
        {LANGUAGES.map((language) => (
          <button
            key={language}
            type="button"
            className="lang-option"
            role="option"
            aria-selected={current === language}
            onClick={() => select(language)}
          >
            <span>{LANGUAGE_NAMES[language]}</span>
            <Check size={14} className="check" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
