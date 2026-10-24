import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyLanguage, storedLanguage, browserLanguage } from './i18n';
import App from './App';
import './styles/tokens.css';
import './styles/base.css';

async function bootstrap() {
  const preferred = storedLanguage() ?? browserLanguage() ?? 'en';
  await applyLanguage(preferred);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

void bootstrap();
