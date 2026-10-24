// Generates the SiBorg 2D vector identity set from the same parametric
// geometry the 3D scene uses (src/lib/siborgGeometry.ts).
//   node scripts/generate-siborg-assets.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AXIS, BASE, EYES, FACE, ORBITS, RIBBONS, faceFront, orbitPoint, ribbonPoint } from '../src/lib/siborgGeometry.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'brand', 'siborg');
mkdirSync(OUT, { recursive: true });

const W = 240;
const H = 280;
const SCALE = 58;
const YAW = 0.2;
const PITCH = 0.1;
const CY = 140;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
const ramp = (stops, t) => {
  const x = Math.min(0.9999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(x);
  return mix(hex(stops[i]), hex(stops[i + 1]), x - i);
};
const PEARL = ['#9a8378', '#d3c0b4', '#efe5dc', '#fdf8f3'];
const WINE = ['#1f0810', '#4f0c1e', '#82143a', '#b3265a'];
const WINE_DEEP = ['#12050a', '#2c0b15', '#4c0d20', '#6d1535'];

const norm = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const LIGHT = norm([-0.5, 0.65, 0.6]);

function cam(p) {
  const cy = Math.cos(YAW), sy = Math.sin(YAW);
  const x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, y = p[1];
  const cp = Math.cos(PITCH), sp = Math.sin(PITCH);
  return [x, y * cp - z * sp, y * sp + z * cp];
}
const toScreen = (c) => [W / 2 + c[0] * SCALE, CY - c[1] * SCALE];
const f = (n) => n.toFixed(1);
const pts = (arr) => arr.map((p) => `${f(p[0])},${f(p[1])}`).join(' ');

function ribbonQuads(spec, nt, ns) {
  const quads = [];
  for (let i = 0; i < nt; i++) {
    for (let j = 0; j < ns; j++) {
      const t0 = i / nt, t1 = (i + 1) / nt, s0 = j / ns, s1 = (j + 1) / ns;
      const w = [ribbonPoint(spec, t0, s0), ribbonPoint(spec, t1, s0), ribbonPoint(spec, t1, s1), ribbonPoint(spec, t0, s1)];
      const p = w.map(cam);
      let n = cross(sub(p[1], p[0]), sub(p[3], p[0]));
      if (!Math.hypot(...n)) continue;
      n = norm(n);
      const facing = n[2] >= 0; // intrinsic front of the strip faces the viewer
      if (!facing) n = n.map((x) => -x);
      const centre = [0, 1, 2].map((k) => (p[0][k] + p[1][k] + p[2][k] + p[3][k]) / 4);
      // ribbon a: pearl on its front, burgundy on its back. ribbon b is the reverse.
      const inward = spec.name === 'a' ? facing : !facing;
      quads.push({ p, n, depth: centre[2], spec, inward });
    }
  }
  return quads;
}

function faceOutline(steps) {
  const out = [];
  for (let k = 0; k < steps; k++) {
    const a = (k / steps) * Math.PI * 2;
    // silhouette of the ovoid: its widest section, at z = 0
    out.push(toScreen(cam([Math.cos(a) * FACE.rx, FACE.y + Math.sin(a) * FACE.ry, 0])));
  }
  return out;
}

function eyeRects(scaleUp = 1) {
  return [-1, 1].map((sgn) => {
    const c = toScreen(cam(faceFront(sgn * EYES.dx, EYES.dy).p));
    const w = EYES.radius * 2 * SCALE * Math.cos(YAW) * scaleUp;
    const h = (EYES.halfLen * 2 + EYES.radius * 2) * SCALE * Math.cos(PITCH) * scaleUp;
    return { x: +(c[0] - w / 2).toFixed(2), y: +(c[1] - h / 2).toFixed(2), w: +w.toFixed(2), h: +h.toFixed(2), cx: +c[0].toFixed(2), cy: +c[1].toFixed(2) };
  });
}

function orbitPaths(side) {
  const out = [];
  for (const o of ORBITS) {
    let cur = [];
    for (let k = 0; k <= 120; k++) {
      const wp = orbitPoint(o, (k / 120) * Math.PI * 2);
      const c = cam(wp);
      // behind the face, or clear to its side: never across the face
      const keep = side === 'back' ? c[2] < 0 : c[2] >= 0 && Math.abs(c[0]) > 1.05;
      if (keep) cur.push(toScreen(c));
      else if (cur.length) { out.push(cur); cur = []; }
    }
    if (cur.length) out.push(cur);
  }
  return out;
}

function axisSegments() {
  const top = [toScreen(cam([0, AXIS.yTopStart, -0.2])), toScreen(cam([0, AXIS.yTop, -0.2]))];
  const bottom = [toScreen(cam([0, AXIS.yBottomEnd, -0.2])), toScreen(cam([0, AXIS.yBottom, 0]))];
  return { top, bottom };
}

function build(variant) {
  const light = variant === 'light';
  const full = variant === 'full' || variant === 'light' || variant === 'illustration';
  const mono = variant === 'monoLight' || variant === 'monoDark';
  const contour = variant === 'contour';
  const flat = variant === 'glyph';
  const iconV = variant === 'icon';
  const nt = variant === 'illustration' ? 110 : flat ? 16 : iconV ? 30 : 60;
  const ns = variant === 'illustration' ? 7 : flat ? 2 : 4;
  const monoColor = variant === 'monoLight' ? '#f3ece6' : '#1a1114';
  const ink = light ? '#4a2430' : '#f3ece6';
  const rose = light ? '#a3194a' : '#e9a7b8';

  const quads = RIBBONS.flatMap((r) => ribbonQuads(r, nt, ns)).sort((a, b) => a.depth - b.depth);
  const outline = faceOutline(56);
  const eyes = eyeRects(flat ? 1.5 : 1);
  const parts = [];
  const defs = `<defs>
    <radialGradient id="face" cx="0.38" cy="0.3" r="0.9"><stop offset="0" stop-color="#fffaf5"/><stop offset="0.6" stop-color="#e9dacf"/><stop offset="1" stop-color="#a38b80"/></radialGradient>
    <radialGradient id="eye" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff3e6" stop-opacity="0.9"/><stop offset="1" stop-color="#e9a7b8" stop-opacity="0"/></radialGradient>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d1236"/><stop offset="1" stop-color="#1c070c"/></linearGradient>
  </defs>`;

  const line = (arr, col, w, op) => `<polyline points="${pts(arr)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;

  if (full) {
    parts.push(`<g>${orbitPaths('back').map((p) => line(p, rose, 0.8, 0.4)).join('')}</g>`);
    const ax = axisSegments();
    parts.push(line(ax.top, ink, 0.9, 0.75), line(ax.bottom, ink, 0.9, 0.75));
    parts.push(`<path d="M${f(ax.top[1][0])} ${f(ax.top[1][1] - 6)} l-3.2 7 l3.2 7 l3.2 -7 z" fill="${ink}"/>`);
    const b = toScreen(cam([0, BASE.y, 0]));
    parts.push(`<ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(BASE.rx * SCALE)}" ry="${f(BASE.rx * SCALE * 0.2)}" fill="url(#base)" stroke="#c9506f" stroke-width="0.8"/>`);
    parts.push(`<ellipse cx="${f(b[0])}" cy="${f(b[1] - 3)}" rx="${f(BASE.rx * SCALE * 0.4)}" ry="${f(BASE.rx * SCALE * 0.08)}" fill="#c9506f" opacity="0.5"/>`);
  }

  let faceDone = false;
  const drawFace = () => {
    faceDone = true;
    const fillFace = mono ? monoColor : flat ? '#f3ece6' : contour ? 'none' : 'url(#face)';
    const stroke = contour ? ` stroke="${ink}" stroke-width="0.9"` : light ? ' stroke="#8c7367" stroke-width="0.8"' : '';
    parts.push(`<polygon points="${pts(outline)}" fill="${fillFace}"${stroke}/>`);
    if (full || iconV) {
      for (const e of eyes) parts.push(`<ellipse cx="${e.cx}" cy="${e.cy}" rx="${f(e.w * 2.1)}" ry="${f(e.h * 0.8)}" fill="url(#eye)"/>`);
    }
    const eyeFill = mono ? (variant === 'monoLight' ? '#14090d' : '#f3ece6') : contour ? ink : light ? '#fff7ea' : '#fff7ea';
    const eyeBack = light && !mono ? '#c9506f' : null;
    for (const e of eyes) {
      if (eyeBack) parts.push(`<rect x="${e.x - 0.8}" y="${e.y - 0.8}" width="${e.w + 1.6}" height="${e.h + 1.6}" rx="${(e.w + 1.6) / 2}" fill="${eyeBack}"/>`);
      parts.push(`<rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="${e.w / 2}" fill="${eyeFill}"/>`);
    }
  };

  if (contour) {
    for (const spec of RIBBONS) {
      for (let j = 0; j <= 6; j++) {
        const lineP = [];
        for (let i = 0; i <= 90; i++) lineP.push(toScreen(cam(ribbonPoint(spec, i / 90, j / 6))));
        const edge = j === 0 || j === 6;
        parts.push(`<polyline points="${pts(lineP)}" fill="none" stroke="${spec.name === 'a' ? '#f3ece6' : '#e9a7b8'}" stroke-width="${edge ? 1 : 0.5}" opacity="${edge ? 0.95 : 0.45}" stroke-linejoin="round"/>`);
      }
    }
    drawFace();
    return wrap(variant, defs, parts.join(''));
  }

  for (const q of quads) {
    if (!faceDone && q.depth >= FACE.rz * 0.9) drawFace();
    const lam = Math.max(0, dot(q.n, LIGHT));
    const t = 0.2 + lam * 0.8;
    let fill;
    if (mono) fill = monoColor;
    else if (flat) fill = q.inward ? '#e9ddd2' : q.spec.name === 'a' ? '#8b1538' : '#5a0f27';
    else if (q.inward) fill = ramp(PEARL, t);
    else fill = q.spec.name === 'a' ? ramp(WINE, t) : ramp(WINE_DEEP, t);
    const op = mono && !q.inward ? ' fill-opacity="0.62"' : '';
    parts.push(`<polygon points="${pts(q.p.map(toScreen))}" fill="${fill}"${op} stroke="${fill}" stroke-width="0.5" stroke-linejoin="round"/>`);
  }
  if (!faceDone) drawFace();
  if (full) parts.push(`<g>${orbitPaths('front').map((p) => line(p, rose, 0.8, 0.7)).join('')}</g>`);
  return wrap(variant, defs, parts.join(''));
}

function wrap(variant, defs, body) {
  if (variant === 'icon') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="SiBorg">${defs}<rect width="96" height="96" rx="22" fill="#14090d"/><rect x="0.5" y="0.5" width="95" height="95" rx="21.5" fill="none" stroke="#f3ece6" stroke-opacity="0.14"/><g transform="translate(48 49) scale(0.33) translate(-120 -138)">${body}</g></svg>\n`;
  }
  const bg = variant === 'light' ? '<rect x="0" y="0" width="240" height="280" fill="#f3ece6"/>' : '';
  const vb = variant === 'glyph' ? '36 58 168 160' : `0 0 ${W} ${H}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="SiBorg">${defs}${bg}${body}</svg>\n`;
}

for (const [name, variant] of [
  ['siborg-mark', 'full'],
  ['siborg-illustration', 'illustration'],
  ['siborg-mark-light', 'light'],
  ['siborg-contour', 'contour'],
  ['siborg-mono-light', 'monoLight'],
  ['siborg-mono-dark', 'monoDark'],
  ['siborg-icon', 'icon'],
  ['siborg-glyph', 'glyph'],
]) {
  writeFileSync(join(OUT, `${name}.svg`), build(variant));
  console.log('wrote', name);
}

// Inline-able shape data for the React mark (state-animated, see SiBorgMark.tsx).
function shapes(nt, ns, flatShade, eyeScale) {
  const quads = RIBBONS.flatMap((r) => ribbonQuads(r, nt, ns)).sort((a, b) => a.depth - b.depth);
  const out = [];
  let faceIn = false;
  for (const q of quads) {
    if (!faceIn && q.depth >= FACE.rz * 0.9) { out.push({ k: 'face' }); faceIn = true; }
    const lam = Math.max(0, dot(q.n, LIGHT));
    const t = 0.2 + lam * 0.8;
    let fill;
    if (flatShade) fill = q.inward ? '#e9ddd2' : q.spec.name === 'a' ? '#8b1538' : '#5a0f27';
    else if (q.inward) fill = ramp(PEARL, t);
    else fill = q.spec.name === 'a' ? ramp(WINE, t) : ramp(WINE_DEEP, t);
    out.push({ k: 'poly', g: q.spec.name, pts: pts(q.p.map(toScreen)), fill });
  }
  if (!faceIn) out.push({ k: 'face' });
  const e = eyeRects(eyeScale);
  const c = toScreen(cam([0, FACE.y, FACE.rz]));
  return { shapes: out, face: pts(faceOutline(48)), eyes: e, cx: +c[0].toFixed(1), cy: +c[1].toFixed(1) };
}
const data = { small: shapes(16, 2, true, 1.5), medium: shapes(40, 3, false, 1), viewBox: `0 0 ${W} ${H}` };
writeFileSync(
  join(ROOT, 'src', 'components', 'hairline', 'siborgShapes.ts'),
  `// Generated by scripts/generate-siborg-assets.mjs. Do not edit by hand.\nexport type SbEye = { x: number; y: number; w: number; h: number; cx: number; cy: number };\nexport type SbShape = { k: 'face' } | { k: 'poly'; g: 'a' | 'b'; pts: string; fill: string };\nexport type SbData = { shapes: SbShape[]; face: string; eyes: SbEye[]; cx: number; cy: number };\nexport const SB_VIEWBOX = '${data.viewBox}';\nexport const SB_SMALL: SbData = ${JSON.stringify(data.small)};\nexport const SB_MEDIUM: SbData = ${JSON.stringify(data.medium)};\n`,
);
console.log('wrote siborgShapes.ts');
