import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyLanguage, storedLanguage, browserLanguage } from './i18n';
import App from './App';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/500.css';
import '@fontsource/newsreader/500-italic.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/motion.css';

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
