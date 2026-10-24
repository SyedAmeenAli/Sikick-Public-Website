import React from 'react';
import ReactDOM from 'react-dom/client';
import { SiBorgObject3D } from '../components/SiBorgObject3D';
import type { SiBorgState } from '../components/hairline/SiBorgMark';

// Dev-only still renderer: /siborg-render.html?yaw=0.62&state=idle&bg=0d0a0c
// scripts/render-siborg-stills.mjs drives it with a headless browser.
const q = new URLSearchParams(location.search);
const yaw = q.has('yaw') ? Number(q.get('yaw')) : 0.62;
const bg = q.get('bg');
const state = (q.get('state') ?? 'idle') as SiBorgState;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SiBorgObject3D state={state} yaw={yaw} preserve background={bg ? `#${bg}` : null} follow={false} />
  </React.StrictMode>,
);
(window as unknown as { __ready: boolean }).__ready = true;
