import { ChevronDown } from 'lucide-react';

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <details key={index} className="accordion-item">
          <summary className="accordion-trigger">
            {item.question}
            <ChevronDown size={18} className="chev" aria-hidden="true" />
          </summary>
          <div className="accordion-panel" style={{ maxHeight: 'none' }}>
            <div className="accordion-panel-inner">{item.answer}</div>
          </div>
        </details>
      ))}
    </div>
  );
}
