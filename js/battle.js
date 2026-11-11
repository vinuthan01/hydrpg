// ===== BATTLE: nostalgic Hyderabad sunset scene, Indian-themed UI, attack effects =====
// ---------- effects ----------
function spawnFx(kind, on) {
  const cx = on == 'foe' ? 368 : 98, cy = on == 'foe' ? 100 : 170, P = B.parts;
  const dot = (n, spd, col, sz, life, gy = 0) => {for (let i = 0; i < n; i++) {const a = R(0, 6.28), v = R(spd * .4, spd); P.push({k: 'dot', x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: gy, l: life * R(.6, 1), m: life, c: col, s: sz * R(.6, 1.2), dl: 0})}};
  const ring = (r0, vr, col, w, life, dl = 0) => P.push({k: 'ring', x: cx, y: cy, r: r0, vr, c: col, w, l: life, m: life, dl});
  switch (kind) {
    case 'smash': ring(6, 5, '#fff', 5, 22); ring(2, 3.4, '#f2c94c', 3, 26, 4); dot(14, 5, '#f2c94c', 4, 26); B.shake = Math.max(B.shake, 12); break;
    case 'slash': for (let i = 0; i < 3; i++) P.push({k: 'slash', x: cx + (i - 1) * 14, y: cy, a: -1, l: 14, m: 14, dl: i * 5, c: i == 1 ? '#fff' : '#9ad8ff'}); dot(8, 4, '#fff', 3, 18); break;
    case 'spin': for (let i = 0; i < 8; i++) P.push({k: 'orb', x: cx, y: cy, a: i * .785, r: 44, l: 40, m: 40, dl: 0, c: '#7fe0ff'}); dot(6, 3, '#9ad', 3, 20); break;
    case 'spark': for (let i = 0; i < 4; i++) P.push({k: 'bolt', x: cx + R(-30, 30), y: cy - 80, tx: cx + R(-20, 20), ty: cy + R(-10, 20), l: 12, m: 12, dl: i * 4, c: '#ffd34d'}); dot(16, 6, '#ff9933', 3, 22); break;
    case 'flame': for (let i = 0; i < 30; i++) P.push({k: 'dot', x: cx + R(-22, 22), y: cy + 28, vx: R(-.6, .6), vy: R(-3.4, -1), g: -.03, l: 34, m: 34, c: ['#ff4d1a', '#ff9933', '#ffe14d'][i % 3], s: R(5, 12), dl: 0}); B.shake = Math.max(B.shake, 5); break;
    case 'disc': for (let i = 0; i < 5; i++) P.push({k: 'disc', x0: 128, y0: 176, x1: cx + R(-18, 18), y1: cy + R(-18, 18), l: 18, m: 18, dl: i * 5, c: ['#f2c94c', '#e63946', '#fff'][i % 3]}); break;
    case 'puff': for (let i = 0; i < 16; i++) P.push({k: 'dot', x: cx + R(-14, 14), y: cy + R(-8, 10), vx: R(-1.4, 1.4), vy: R(-1.6, .6), g: 0, l: 36, m: 36, c: '#f8f4ea', s: R(8, 17), dl: 0}); break;
    case 'quake': for (let i = 0; i < 7; i++) P.push({k: 'crack', x: cx - 70 + i * 22, y: cy + 36, l: 26, m: 26, dl: i * 2}); dot(14, 3, '#b79a6b', 5, 30, .12); B.shake = Math.max(B.shake, 16); break;
    case 'crash': ring(4, 7, '#fff', 8, 22); ring(4, 5, '#ff6b3d', 6, 26, 3); ring(4, 3.5, '#f2c94c', 4, 30, 6); dot(22, 7, '#ffd34d', 4, 28); B.flash = 10; B.shake = Math.max(B.shake, 20); break;
    case 'heal': for (let i = 0; i < 16; i++) P.push({k: 'plus', x: cx + R(-34, 34), y: cy + 30, vy: -R(.8, 2), l: 44, m: 44, c: i % 2 ? '#6bf29a' : '#d6ffe4', dl: i}); break;
    case 'punch': ring(4, 6, '#fff', 6, 14); ring(2, 4, '#ff9933', 4, 18, 3); for (let i = 0; i < 5; i++) P.push({k: 'star', x: cx + R(-24, 24), y: cy + R(-24, 24), l: 18, m: 18, dl: i * 2, c: '#ffd34d'}); B.shake = Math.max(B.shake, 9); break;
    case 'kick': P.push({k: 'slash', x: cx, y: cy + 10, a: 1, l: 12, m: 12, dl: 0, c: '#fff'}); P.push({k: 'slash', x: cx + 8, y: cy - 6, a: 1, l: 12, m: 12, dl: 3, c: '#ffb86b'}); dot(12, 5, '#d9b27a', 4, 22, .1); B.shake = Math.max(B.shake, 10); break;
    case 'chain': for (let i = 0; i < 4; i++) P.push({k: 'slash', x: cx + (i - 1.5) * 12, y: cy - 6, a: i % 2 ? 1 : -1, l: 14, m: 14, dl: i * 4, c: i % 2 ? '#f2c94c' : '#d9d9e8'}); for (let i = 0; i < 6; i++) P.push({k: 'star', x: cx + R(-30, 30), y: cy + R(-20, 20), l: 16, m: 16, dl: 4 + i * 2, c: '#f2c94c'}); B.shake = Math.max(B.shake, 11); break;
    case 'roar': for (let i = 0; i < 4; i++) ring(4, 5 + i * 1.2, i % 2 ? '#ff9933' : '#fff', 5, 26, i * 5); dot(18, 6, '#ff6b3d', 4, 24); B.flash = 6; B.shake = Math.max(B.shake, 18); break;
    case 'claw': for (let i = 0; i < 3; i++) P.push({k: 'slash', x: cx + (i - 1) * 12, y: cy - 10, a: 1, l: 14, m: 14, dl: i * 3, c: '#ff5a5a'}); break;
    default: ring(4, 4, '#ff5a5a', 4, 16); dot(10, 4, '#ff8a8a', 3, 18)}}
function drawParts() {
  const P = B.parts; for (let i = P.length - 1; i >= 0; i--) {const p = P[i]; if (p.dl > 0) {p.dl--; continue} p.l--; if (p.l <= 0) {P.splice(i, 1); continue} const al = Math.min(1, p.l / (p.m * .6)), pr = 1 - p.l / p.m; X.globalAlpha = al;
    if (p.k == 'dot') {p.x += p.vx || 0; p.y += p.vy || 0; p.vy += p.g || 0; X.fillStyle = p.c; X.beginPath(); X.arc(p.x, p.y, p.s / 2, 0, 6.3); X.fill()}
    else if (p.k == 'ring') {p.r += p.vr; X.strokeStyle = p.c; X.lineWidth = p.w * al; X.beginPath(); X.arc(p.x, p.y, p.r, 0, 6.3); X.stroke()}
    else if (p.k == 'slash') {const L = 60 * Math.min(1, pr * 2.2); X.strokeStyle = p.c; X.lineWidth = 6 * (1 - pr) + 2; X.beginPath(); X.moveTo(p.x - 30, p.y - 30 * p.a * -1); X.lineTo(p.x - 30 + L, p.y - 30 * p.a * -1 + L * p.a); X.stroke(); X.lineWidth = 2; X.strokeStyle = '#fff'; X.stroke()}
    else if (p.k == 'orb') {p.a += .3; const r = p.r * (1 - pr * .3), x = p.x + Math.cos(p.a) * r, y = p.y + Math.sin(p.a) * r * .6; X.fillStyle = p.c; X.beginPath(); X.arc(x, y, 6, 0, 6.3); X.fill(); X.strokeStyle = p.c; X.lineWidth = 3; X.beginPath(); X.arc(p.x, p.y, r, p.a - .9, p.a); X.stroke()}
    else if (p.k == 'bolt') {X.strokeStyle = p.c; X.lineWidth = 3; X.beginPath(); X.moveTo(p.x, p.y); for (let s = 1; s < 6; s++) X.lineTo(p.x + (p.tx - p.x) * s / 6 + R(-9, 9), p.y + (p.ty - p.y) * s / 6); X.lineTo(p.tx, p.ty); X.stroke(); X.strokeStyle = '#fff'; X.lineWidth = 1; X.stroke()}
    else if (p.k == 'disc') {const x = p.x0 + (p.x1 - p.x0) * pr, y = p.y0 + (p.y1 - p.y0) * pr - Math.sin(pr * Math.PI) * 34; X.fillStyle = p.c; X.beginPath(); X.arc(x, y, 7, 0, 6.3); X.fill(); X.strokeStyle = '#222'; X.lineWidth = 1; X.stroke(); if (p.l == 1) B.parts.push({k: 'ring', x: p.x1, y: p.y1, r: 2, vr: 3, c: p.c, w: 3, l: 12, m: 12, dl: 0})}
    else if (p.k == 'crack') {const hh = 34 * Math.min(1, pr * 2); X.strokeStyle = '#2a1a0a'; X.lineWidth = 3; X.beginPath(); X.moveTo(p.x, p.y); X.lineTo(p.x + 6, p.y - hh * .4); X.lineTo(p.x - 4, p.y - hh * .7); X.lineTo(p.x + 3, p.y - hh); X.stroke()}
    else if (p.k == 'plus') {p.y += p.vy; X.fillStyle = p.c; X.fillRect(p.x - 2, p.y - 7, 4, 14); X.fillRect(p.x - 7, p.y - 2, 14, 4)}
    else if (p.k == 'star') {const r = 4 + 8 * (1 - pr); X.fillStyle = p.c; X.beginPath(); for (let k = 0; k < 8; k++) {const a = k * .785, rr = k % 2 ? r * .4 : r; X.lineTo(p.x + Math.cos(a) * rr, p.y + Math.sin(a) * rr)} X.closePath(); X.fill()}
    X.globalAlpha = 1}}
// ---------- background: Hyderabad at sunset (painted once, animated on top) ----------
const BGS = {};
function makeBG(kind) {
  const c = document.createElement('canvas'); c.width = 480; c.height = 236; const g = c.getContext('2d'); let seed = kind == 'hyd' ? 7 : 19; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647, R_ = (col, x, y, w, h) => {g.fillStyle = col; g.fillRect(x, y, w, h)};
  const sg = g.createLinearGradient(0, 0, 0, 150); [[0, '#1d1b4a'], [.2, '#46277a'], [.42, '#a83f7c'], [.62, '#f0704f'], [.82, '#ffae52'], [1, '#ffd98a']].forEach(([o, col]) => sg.addColorStop(o, col)); g.fillStyle = sg; g.fillRect(0, 0, 480, 150);
  for (let i = 0; i < 40; i++) R_('rgba(255,255,255,' + (.2 + rnd() * .4) + ')', rnd() * 480, rnd() * 50, 1, 1);
  const sx = 336, sy = 138; let rg = g.createRadialGradient(sx, sy, 6, sx, sy, 150); rg.addColorStop(0, 'rgba(255,240,190,.9)'); rg.addColorStop(.25, 'rgba(255,190,100,.45)'); rg.addColorStop(1, 'rgba(255,120,60,0)'); g.fillStyle = rg; g.fillRect(0, 0, 480, 170);
  g.fillStyle = '#fff4c8'; g.beginPath(); g.arc(sx, sy, 30, 0, 7); g.fill(); g.fillStyle = '#ffe08a'; g.beginPath(); g.arc(sx, sy, 24, 0, 7); g.fill();
  // cloud streaks (lit from below)
  [[20, 40, 150, 9], [190, 62, 190, 8], [350, 34, 140, 8], [60, 92, 210, 7], [300, 102, 160, 6], [140, 22, 110, 6]].forEach(([x, y, w, h]) => {g.fillStyle = 'rgba(70,30,100,.55)'; g.beginPath(); g.ellipse(x + w / 2, y, w / 2, h / 2, 0, 0, 7); g.fill(); g.fillStyle = 'rgba(255,150,80,.55)'; g.beginPath(); g.ellipse(x + w / 2, y + h * .4, w / 2.2, h / 4, 0, 0, 7); g.fill()});
  // distant boulder hills (the Deccan plateau)
  const hills = (col, y0, n, rmin, rmax) => {g.fillStyle = col; for (let i = 0; i < n; i++) {const x = rnd() * 520 - 20, r = rmin + rnd() * (rmax - rmin); g.beginPath(); g.arc(x, y0 + rnd() * 6, r, Math.PI, 0); g.fill()} R_(col, 0, y0, 480, 40)};
  hills('#7a4a78', 124, 26, 8, 20); hills('#4a2a64', 134, 30, 6, 15);
  if (kind == 'hyd') {
    // Golconda fort on the left hill
    g.fillStyle = '#2d1a42'; g.beginPath(); g.moveTo(0, 150); g.quadraticCurveTo(70, 90, 150, 150); g.fill(); R_('#2d1a42', 30, 106, 90, 22); for (let i = 0; i < 90; i += 8) R_('#2d1a42', 30 + i, 102, 5, 5); R_('#2d1a42', 62, 84, 22, 24); R_('#2d1a42', 60, 80, 26, 4); for (let i = 0; i < 26; i += 8) R_('#2d1a42', 60 + i, 76, 5, 5); R_('#2d1a42', 72, 66, 3, 12); R_('#e63946', 75, 66, 8, 4);
    for (const [wx, wy] of [[40, 112], [90, 114], [68, 92]]) R_('rgba(255,210,100,.8)', wx, wy, 2, 3);
    // Charminar silhouette on the right shore
    const ccx = 432; R_('#2a1740', ccx - 20, 120, 40, 22); R_('#2a1740', ccx - 24, 108, 5, 34); R_('#2a1740', ccx + 19, 108, 5, 34); R_('#2a1740', ccx - 25, 104, 7, 5); R_('#2a1740', ccx + 18, 104, 7, 5); R_('#2a1740', ccx - 14, 112, 28, 8);
    g.fillStyle = '#2a1740'; for (const dx of [-22, 22]) {g.beginPath(); g.arc(ccx + dx, 104, 4, Math.PI, 0); g.fill()} R_('rgba(255,214,120,.85)', ccx - 6, 126, 12, 16); g.fillStyle = '#ffbf5a'; g.beginPath(); g.arc(ccx, 126, 6, Math.PI, 0); g.fill();
    // lake (Hussain Sagar) with the Buddha statue
    const lg = g.createLinearGradient(0, 142, 0, 172); lg.addColorStop(0, '#ffc372'); lg.addColorStop(.3, '#d97a6a'); lg.addColorStop(1, '#4a2a64'); g.fillStyle = lg; g.fillRect(0, 142, 480, 32);
    R_('#2b1a3a', 190, 140, 22, 6); R_('#2b1a3a', 196, 124, 10, 17); R_('#2b1a3a', 198, 118, 6, 7); R_('#2b1a3a', 193, 130, 20, 4);
    for (let i = 0; i < 18; i++) {const x = rnd() * 480, y = 146 + rnd() * 24; R_('rgba(255,235,190,' + (.12 + rnd() * .2) + ')', x, y, 8 + rnd() * 20, 1)}
  } else {
    // Secunderabad: Clock Tower, station roof, signals, water tank
    R_('#2a1740', 404, 70, 24, 78); R_('#2a1740', 400, 66, 32, 6); g.fillStyle = '#2a1740'; g.beginPath(); g.moveTo(402, 66); g.lineTo(416, 40); g.lineTo(430, 66); g.fill(); R_('#2a1740', 415, 28, 2, 14); R_('#fff0b0', 408, 78, 16, 16); R_('#2a1740', 415, 80, 2, 8); R_('#2a1740', 415, 87, 6, 2);
    R_('#2a1740', 0, 118, 220, 8); for (let i = 0; i < 220; i += 14) R_('#2a1740', i, 112, 8, 8); R_('#2a1740', 10, 126, 4, 22); R_('#2a1740', 100, 126, 4, 22); R_('#2a1740', 190, 126, 4, 22);
    R_('#2a1740', 250, 96, 36, 18); R_('#2a1740', 252, 114, 3, 30); R_('#2a1740', 280, 114, 3, 30); R_('#2a1740', 244, 92, 48, 5);
    R_('#2a1740', 312, 100, 3, 48); R_('#ff3b3b', 306, 98, 7, 7); R_('#2a1740', 340, 112, 3, 36); R_('#3dff7a', 334, 110, 7, 7);
    const gg = g.createLinearGradient(0, 146, 0, 174); gg.addColorStop(0, '#6a4a5a'); gg.addColorStop(1, '#2a1a30'); g.fillStyle = gg; g.fillRect(0, 146, 480, 28);
    for (let k = 0; k < 2; k++) {const y = 156 + k * 9; R_('#cfc7d8', 0, y, 480, 1); R_('#cfc7d8', 0, y + 3, 480, 1); for (let i = 0; i < 480; i += 9 + k * 3) R_('#3a2616', i, y - 1, 3, 6)}}
  // ground: dusty brick street in perspective
  const gr = g.createLinearGradient(0, 172, 0, 236); gr.addColorStop(0, '#9a5a42'); gr.addColorStop(1, '#5a2f2a'); g.fillStyle = gr; g.fillRect(0, 172, 480, 64); R_('rgba(255,190,110,.35)', 0, 172, 480, 2);
  for (let r = 0, y = 174, step = 5; y < 236; r++, y += step, step += 1.4) {R_('rgba(40,15,15,.45)', 0, y, 480, 1); const sp = 16 + r * 3.4; for (let x = (r % 2) * sp / 2 - sp; x < 480; x += sp) R_('rgba(40,15,15,.35)', x, y, 1, step)}
  R_('rgba(255,200,120,.12)', 250, 180, 180, 40);
  // framing palms and a tamarind tree
  const palm = (x, h, lean) => {g.strokeStyle = '#1c0f26'; g.lineWidth = 4; g.beginPath(); g.moveTo(x, 176); g.quadraticCurveTo(x + lean * .5, 176 - h * .6, x + lean, 176 - h); g.stroke(); g.lineWidth = 2; for (let k = 0; k < 7; k++) {const a = -3.14 + k * .52; g.beginPath(); g.moveTo(x + lean, 176 - h); g.quadraticCurveTo(x + lean + Math.cos(a) * 14, 176 - h - 10 + Math.sin(a) * 6, x + lean + Math.cos(a) * 28, 176 - h + 6 + Math.sin(a) * 14); g.stroke()}};
  palm(14, 108, 14); palm(40, 84, -6); palm(468, 100, -14); palm(446, 76, 8);
  // little houses with lit windows along the shore
  for (let i = 0; i < 9; i++) {const x = 140 + i * 30 + rnd() * 10, w = 14 + rnd() * 14, h = 14 + rnd() * 22; R_('#2d1a42', x, 142 - h, w, h); if (rnd() < .7) R_('rgba(255,210,100,.85)', x + 3, 146 - h, 2, 3); if (rnd() < .6) R_('rgba(255,210,100,.85)', x + w - 5, 152 - h, 2, 3)}
  return c}
function drawBattleBG(kind, t) {
  const bg = BGS[kind] || (BGS[kind] = makeBG(kind)); X.drawImage(bg, 0, 0);
  // drifting clouds
  for (let i = 0; i < 3; i++) {const x = ((i * 190 + t * (.12 + i * .05)) % 620) - 70, y = 26 + i * 30; X.fillStyle = 'rgba(80,36,110,.5)'; X.beginPath(); X.ellipse(x, y, 60, 5, 0, 0, 7); X.fill(); X.fillStyle = 'rgba(255,160,90,.5)'; X.beginPath(); X.ellipse(x, y + 3, 52, 2.4, 0, 0, 7); X.fill()}
  // sun reflection shimmering on the water
  if (kind == 'hyd') for (let k = 0; k < 9; k++) {X.fillStyle = 'rgba(255,240,190,' + (.55 - k * .04) + ')'; X.fillRect(336 - (12 - k) * .5 + Math.sin(t / 9 + k * 1.3) * (2 + k * .7), 143 + k * 3, 14 - k, 1.4)}
  // birds (kites and crows) flying home
  for (let i = 0; i < 6; i++) {const x = ((t * (.35 + i * .04) + i * 90) % 560) - 40, y = 50 + i * 7 + Math.sin(t / 30 + i) * 6, f = Math.sin(t / 5 + i * 2) * 3; X.strokeStyle = '#1c0f26'; X.lineWidth = 1.5; X.beginPath(); X.moveTo(x - 6, y - f); X.lineTo(x, y); X.lineTo(x + 6, y - f); X.stroke()}
  // two kites on strings
  [[62, 54, '#e63946'], [418, 44, '#f2c94c']].forEach(([x, y, c], i) => {const sw = Math.sin(t / 26 + i * 2) * 6, kx = x + sw, ky = y + Math.sin(t / 19 + i) * 3; X.strokeStyle = 'rgba(255,255,255,.5)'; X.lineWidth = 1; X.beginPath(); X.moveTo(kx, ky + 10); X.quadraticCurveTo(kx + 10 * (i ? 1 : -1), ky + 60, kx + (i ? 40 : -20), 150); X.stroke(); X.fillStyle = c; X.beginPath(); X.moveTo(kx, ky - 10); X.lineTo(kx + 8, ky); X.lineTo(kx, ky + 12); X.lineTo(kx - 8, ky); X.closePath(); X.fill(); X.fillStyle = 'rgba(255,255,255,.4)'; X.fillRect(kx - 1, ky - 8, 2, 18); for (let k = 0; k < 4; k++) {X.fillStyle = k % 2 ? '#fff' : '#3d85c6'; X.fillRect(kx + Math.sin(t / 8 + k) * 3 - 1, ky + 12 + k * 4, 3, 3)}});
  // lens glow around the sun, pulsing softly
  X.globalCompositeOperation = 'lighter'; const gl = X.createRadialGradient(336, 138, 4, 336, 138, 90 + Math.sin(t / 40) * 6); gl.addColorStop(0, 'rgba(255,200,120,.30)'); gl.addColorStop(1, 'rgba(255,140,60,0)'); X.fillStyle = gl; X.fillRect(200, 40, 280, 190);
  // floating dust and pollen glowing in the evening light
  for (let i = 0; i < 22; i++) {const x = (i * 71 + t * (.1 + (i % 3) * .05)) % 500 - 10, y = 80 + ((i * 53) % 150) + Math.sin(t / 40 + i) * 8, a = .25 + Math.sin(t / 25 + i) * .15; X.fillStyle = 'rgba(255,214,140,' + a + ')'; X.fillRect(x, y, 1.6, 1.6)}
  X.globalCompositeOperation = 'source-over';
  // marigold garlands across the top corners
  // nostalgic finish: warm tint, vignette, film grain
  X.fillStyle = 'rgba(255,150,70,.07)'; X.fillRect(0, 0, 480, 236); const vg = X.createRadialGradient(240, 118, 90, 240, 118, 290); vg.addColorStop(0, 'rgba(20,5,25,0)'); vg.addColorStop(1, 'rgba(20,5,25,.6)'); X.fillStyle = vg; X.fillRect(0, 0, 480, 236);
  for (let i = 0; i < 70; i++) {X.fillStyle = Math.random() < .5 ? 'rgba(255,255,255,.09)' : 'rgba(0,0,0,.1)'; X.fillRect(Math.random() * 480, Math.random() * 236, 1, 1)}}
// ---------- battle screen ----------
const BCOL = {pow: '#c1440e', sharp: '#1f6f9a', heavy: '#7b2cbf'};
function bagBattle() {return bagList('').filter(o => o.type == 'weapon' || o.id == 'chai' || (o.type == 'food' && o.heal > 0))}
function drawBattle() {
  rc('#12060c', 0, 0, LW, LH); hit(0, 0, LW, LH, null);
  panel(() => {
    const t = tick, kind = cityOf() == 'sec' ? 'sec' : cityOf() == 'hit' ? 'hit' : 'hyd', now = performance.now(), F = B.F, boss = !!F.boss;
    if (B.shake > .5) {X.translate(R(-B.shake, B.shake) * .5, R(-B.shake, B.shake) * .4); B.shake *= .86}
    X.save(); X.beginPath(); X.rect(0, 0, 480, 236); X.clip(); drawBattleBG(kind, t);
    B.dh += (B.hp - B.dh) * .12; B.pd = B.pd == null ? S.hp : B.pd + (S.hp - B.pd) * .12;
    // fighters
    const intro = Math.min(1, (now - B.t0) / 700), ease = 1 - Math.pow(1 - intro, 3), sF = boss ? 3.2 : 2.9, sP = 3.3, bob = Math.sin(t / 14) * 1.6;
    const lunge = (t0, d) => {const k = (now - t0) / 380; return k > 0 && k < 1 ? Math.sin(k * Math.PI) * d : 0};
    const dead = B.over && B.hp <= 0, dk = dead ? Math.min(1, (now - (B.deadAt || (B.deadAt = now))) / 900) : 0;
    X.fillStyle = 'rgba(0,0,0,.35)'; X.beginPath(); X.ellipse(368, 162, 34 * (boss ? 1.15 : 1), 7, 0, 0, 7); X.fill(); X.beginPath(); X.ellipse(98, 216, 38, 8, 0, 0, 7); X.fill();
    const hurt = now - B.hitF < 260 && (t >> 1) & 1;
    if (!hurt) {X.save(); X.globalAlpha = 1 - dk; drawChar(368 - 16 * sF + (1 - ease) * 220 - lunge(B.flunge, 46), 160 - 30 * sF + bob + dk * 18, LOOKF[F.look], 'down', 0, sF); X.restore()}
    const hurtM = now - B.hitM < 260 && (t >> 1) & 1; if (!hurtM) drawChar(98 - 16 * sP - (1 - ease) * 220 + lunge(B.lunge, 60), 216 - 30 * sP - bob * .7, myLook(), 'up', 0, sP);
    drawParts(); B.ft = B.ft.filter(f => f.l > 0); B.ft.forEach(f => {f.l--; f.y -= .7; X.globalAlpha = Math.min(1, f.l / 16); tx(String(f.t), f.x, f.y, f.c, 26, F_R, 'center'); X.globalAlpha = 1});
    if (B.flash > 0) {X.fillStyle = 'rgba(255,255,255,' + B.flash / 14 + ')'; X.fillRect(0, 0, 480, 236); B.flash--}
    X.restore();
    // scalloped Indian arch border on the scene
    X.strokeStyle = 'rgba(150,175,230,.65)'; X.lineWidth = 2; X.strokeRect(1, 1, 478, 234);

    // name plates
    ibox(10, 14, 214, 58, {a: .82}); tx(F.n, 22, 36, '#ffd36b', 16, F_R); tx(boss ? 'BOSS' : 'Lv ' + B.lv, 214, 36, boss ? '#ff6a5a' : PAL.cream, 15, F_T, 'right');
    bar(22, 44, 190, B.hp <= 0 ? 0 : B.dh, B.max, B.dh < B.max * .3 ? '#ff7a1a' : '#e63946', 10); tx('HP ' + Math.max(0, Math.round(B.hp)) + '/' + B.max, 212, 66, PAL.cream, 12, F_T, 'right');
    ibox(262, 174, 208, 58, {a: .86}); tx(S.name, 274, 194, '#ffd36b', 16, F_R); tx('Lv ' + S.lv, 462, 194, PAL.cream, 15, F_T, 'right');
    bar(274, 201, 184, B.pd, S.maxhp, S.hp < S.maxhp * .3 ? '#ff7a1a' : '#4ade80', 10); tx('HP ' + Math.max(0, Math.round(S.hp)) + '/' + S.maxhp, 458, 224, PAL.cream, 12, F_T, 'right'); bar(274, 225, 120, S.xp, S.lv * 25, '#e0b04a', 4);
    // command area
    ibox(2, 238, 476, 112, {a: .92}); const it = ITEMS[S.eq], ok = !B.busy && !B.over && !B.bag, specs = [];
    it.moves.forEach((m, i) => {const mi = moveInfo(m); specs.push({n: m.n, kind: m.k.toUpperCase(), eff: mi.eff, sub: mi.eff.toUpperCase() + '  ' + Math.round(mi.acc * 100) + '%  ' + mi.lo + '-' + mi.hi + ' dmg', c: BCOL[m.k], tip: m.n + ' (' + mi.eff.toUpperCase() + ' vs ' + B.F.n + '): ' + moveTip(m) + ' Accuracy ' + Math.round(mi.acc * 100) + '%, damage ' + mi.lo + '-' + mi.hi + '.', act: () => atk(i)})});
    specs.push({n: 'Chai', sub: 'x' + S.chai + '  +30 HP', c: '#2f8f5a', tip: 'Healing Chai: heals 30 HP. Uses your turn.', act: () => atk(3)});
    specs.push({n: 'Run', sub: boss || F.guard ? 'blocked' : '80%', c: boss || F.guard ? '#555' : '#a07a1a', tip: boss || F.guard ? 'You cannot run from guards or bosses.' : 'Run away: 80% chance. The enemy leaves for 30 seconds and then returns.', act: () => atk(4)});
    specs.push({n: 'Bag', sub: 'weapons / items', c: '#6b4423', tip: 'Open your bag. Switching weapon uses your turn.', act: () => atk(5)});
    specs.forEach((s, i) => {const bx = 10 + (i % 3) * 155, by = 282 + (i / 3 | 0) * 33, ov = ok && hit(bx, by, 148, 29, s.act, s.tip); X.fillStyle = ok ? (ov ? '#fff' : s.c) : '#3a3a3a'; if (ov) {X.fillStyle = s.c; X.fillRect(bx - 1, by - 2, 150, 33)} else X.fillRect(bx, by, 148, 29);
      X.strokeStyle = ok ? (ov ? '#fff' : PAL.gold) : '#555'; X.lineWidth = 2; X.strokeRect(bx + 1, by + 1, 146, 27); X.fillStyle = 'rgba(255,255,255,.14)'; X.fillRect(bx + 3, by + 3, 142, 4); X.fillStyle = 'rgba(0,0,0,.35)'; X.fillRect(bx + 3, by + 3, 18, 23); tx(String(i + 1), bx + 12, by + 20, '#ffd36b', 16, F_R, 'center', false); tx(s.n, bx + 26, by + 14, ok ? PAL.cream : '#999', 15, F_T, 'left', false); if (s.kind) tx(s.kind, bx + 142, by + 13, ok ? 'rgba(255,255,255,.6)' : '#777', 9, F_T, 'right', false); tx(s.sub, bx + 26, by + 25, !ok ? '#777' : s.eff == 'effective' ? '#8dffa0' : s.eff == 'waste' ? '#ff8a7a' : '#ffe9a8', 11, F_T, 'left', false)});
    // message / hover tip
    const msg = ok && TIP ? TIP : B.msg; if (B._m != msg) {B._m = msg; B._mt = tick} const shown = Math.floor((tick - B._mt) * 2.2);
    ibox(10, 241, 460, 36, {a: .0, plain: 1}); const mls = wrapT(msg, 440, 15).slice(0, 2); let mcnt = 0;
    mls.forEach((l, i) => {const part = l.slice(0, Math.max(0, shown - mcnt)); mcnt += l.length + 1; txm(part, 240 - tw(l, 15) / 2, 259 + (i - (mls.length - 1) / 2) * 16, ok && TIP ? '#ffe9a8' : '#fff7e0', 15)}); TIP = null;
    if (B.bag) drawBagBattle()}, 480, 352, 1.8); drawCredit()}
function drawBagBattle() {
  const L = bagBattle(); hit(0, 0, 480, 352, () => {B.bag = 0}); ibox(80, 40, 320, 190, {a: .97}); plate(240, 28, 'Bag', 15); tx('Switching weapon uses your turn', 240, 66, '#ffb88a', 13, F_T, 'center');
  B.bsel = Math.max(0, Math.min(B.bsel, L.length - 1)); L.slice(0, 6).forEach((o, i) => {const y = 74 + i * 26, ov = hit(94, y, 292, 24, () => {if (o.type == 'weapon') switchWeapon(o.id); else eatInBattle(o)}, ''); X.fillStyle = i == B.bsel ? 'rgba(193,68,14,.7)' : ov ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.3)'; X.fillRect(94, y, 292, 24); X.strokeStyle = o.eq ? '#7ee08a' : '#6b4a2a'; X.strokeRect(94.5, y + .5, 291, 23); itemIcon(o.id, 98, y + 2, .95); tx(o.n, 124, y + 17, PAL.cream, 15); tx(o.eq ? 'EQUIPPED' : o.type == 'item' ? 'x' + o.cnt : 'Use', 380, y + 17, o.eq ? '#7ee08a' : '#ffd36b', 13, F_T, 'right')});
  btn(180, 204, 120, 20, 'Back', () => {B.bag = 0}, 'Esc', '#4a2a10', 14)}
function battleKey(k) {
  if (B.bag) {const L = bagBattle(); if (k == 'Escape' || k == 'b') B.bag = 0; else if (k == 'ArrowUp' || k == 'w') B.bsel = Math.max(0, B.bsel - 1); else if (k == 'ArrowDown' || k == 's') B.bsel = Math.min(L.length - 1, B.bsel + 1); else if (k == 'Enter' || k == ' ') {const o = L[B.bsel]; if (o) o.type == 'weapon' ? switchWeapon(o.id) : eatInBattle(o)} return}
  if (/^[1-6]$/.test(k)) atk(+k - 1); else if (k == 'r') atk(4); else if (k == 'q') atk(3); else if (k == 'b') atk(5)}
