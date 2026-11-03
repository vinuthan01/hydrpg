// ===== UI: immediate-mode interface with mouse support, Indian-themed boxes, HUD, dialogue =====
// Every clickable thing calls hit(); it returns true while the mouse is over it and stores tooltips.
const F_T = "'Teko',monospace", F_R = "'Rozha One',serif", F_H = "'Caveat',cursive";
const PAL = {maroon: '58,12,24', gold: '#e0b04a', saffron: '#ff9933', cream: '#fff3d6', teal: '#1f8a8a', green: '#2f8f5a'};
let IS_TOUCH = false, MOUSE = {x: -1, y: -1}, HIT = [], UT = {ox: 0, oy: 0, s: 1}, TIP = null, CUR = false;
function uiBegin() {HIT = []; TIP = null; CUR = false; UT = {ox: 0, oy: 0, s: 1}}
function hit(x, y, w, h, cb, tip) {
  const s = UT.s, sx = UT.ox + x * s, sy = UT.oy + y * s, sw = w * s, sh = h * s; HIT.push({x: sx, y: sy, w: sw, h: sh, cb, tip});
  const ov = MOUSE.x >= sx && MOUSE.x < sx + sw && MOUSE.y >= sy && MOUSE.y < sy + sh; if (ov) {if (cb) CUR = true; if (tip) TIP = tip} return ov}
function uiClick() {for (let i = HIT.length - 1; i >= 0; i--) {const h = HIT[i]; if (MOUSE.x >= h.x && MOUSE.x < h.x + h.w && MOUSE.y >= h.y && MOUSE.y < h.y + h.h) {if (h.cb) {sfx('click'); h.cb()} return true}} return false}
// run drawing code inside a centred, scaled panel (so every screen fits any window size)
function panel(fn, w = 480, h = 352, cap = 1.7) {
  const us = Math.max(.45, Math.min(cap, LW / (w + 12), LH / (h + 12))), ox = (LW - w * us) / 2, oy = (LH - h * us) / 2;
  X.save(); X.translate(ox, oy); X.scale(us, us); UT = {ox, oy, s: us}; fn(); X.restore(); UT = {ox: 0, oy: 0, s: 1}}
// ---------- text ----------
function tx(t, x, y, c = PAL.cream, sz = 15, f = F_T, a = 'left', o = true) {
  X.font = sz + 'px ' + f; X.textAlign = a; X.textBaseline = 'alphabetic';
  if (o) {X.lineJoin = 'round'; X.lineWidth = 3; X.strokeStyle = 'rgba(30,6,12,.85)'; X.strokeText(t, x, y)} X.fillStyle = c; X.fillText(t, x, y); X.textAlign = 'left'}
// vertically centred text: baseline is placed so the capital letters sit in the middle of cy
function capH(sz, f) {X.font = sz + 'px ' + (f || F_T); return X.measureText('H').actualBoundingBoxAscent || sz * .7}
function txm(t, x, cy, c, sz = 15, f = F_T, a = 'left', o = true) {tx(t, x, cy + capH(sz, f) / 2, c, sz, f, a, o)}
const DEV_CREDIT = 'dev- vinuthan01';
function drawCredit() {X.font = '13px ' + F_T; const w = X.measureText(DEV_CREDIT).width; X.globalAlpha = .8; tx(DEV_CREDIT, LW - 6, LH - 6, '#ffd36b', 13, F_T, 'right'); X.globalAlpha = 1}
const tw = (t, sz, f) => {X.font = sz + 'px ' + (f || F_T); return X.measureText(t).width};
function wrapT(t, maxW, sz, f) {const ws = String(t).split(' '), L = []; let l = ''; X.font = sz + 'px ' + (f || F_T);
  for (const w of ws) {const n = l ? l + ' ' + w : w; if (X.measureText(n).width > maxW && l) {L.push(l); l = w} else l = n} if (l) L.push(l); return L}
// ---------- Indian-themed frames ----------
function diamond(x, y, r, c) {X.fillStyle = c; X.beginPath(); X.moveTo(x, y - r); X.lineTo(x + r, y); X.lineTo(x, y + r); X.lineTo(x - r, y); X.closePath(); X.fill()}
function ibox(x, y, w, h, o = {}) {
  const a = o.a == null ? .95 : o.a; X.fillStyle = 'rgba(' + (o.rgb || PAL.maroon) + ',' + a + ')'; X.fillRect(x, y, w, h);
  X.lineWidth = 2; X.strokeStyle = o.bd || PAL.gold; X.strokeRect(x + 1, y + 1, w - 2, h - 2); X.lineWidth = 1; X.strokeStyle = PAL.saffron; X.strokeRect(x + 5.5, y + 5.5, w - 11, h - 11);
  if (!o.plain) {for (let i = 14; i < w - 12; i += 10) {X.fillStyle = 'rgba(224,176,74,.55)'; X.fillRect(x + i, y + 3, 3, 2); X.fillRect(x + i, y + h - 5, 3, 2)}
    for (const [cx, cy] of [[x + 3, y + 3], [x + w - 3, y + 3], [x + 3, y + h - 3], [x + w - 3, y + h - 3]]) {diamond(cx, cy, 6, PAL.gold); diamond(cx, cy, 3, '#c1121f')}}}
function plate(cx, y, text, sz = 15) {const w = tw(text, sz, F_R) + 36; X.fillStyle = PAL.gold; X.beginPath(); X.moveTo(cx - w / 2, y + 12); X.lineTo(cx - w / 2 + 10, y); X.lineTo(cx + w / 2 - 10, y); X.lineTo(cx + w / 2, y + 12); X.lineTo(cx + w / 2 - 10, y + 24); X.lineTo(cx - w / 2 + 10, y + 24); X.closePath(); X.fill();
  X.fillStyle = '#7a1022'; X.beginPath(); X.moveTo(cx - w / 2 + 4, y + 12); X.lineTo(cx - w / 2 + 12, y + 3); X.lineTo(cx + w / 2 - 12, y + 3); X.lineTo(cx + w / 2 - 4, y + 12); X.lineTo(cx + w / 2 - 12, y + 21); X.lineTo(cx - w / 2 + 12, y + 21); X.closePath(); X.fill(); tx(text, cx, y + 18, '#ffd36b', sz, F_R, 'center')}
function btn(x, y, w, h, label, cb, tip, col = '#7a1022', sz = 15) {
  const ov = hit(x, y, w, h, cb, tip); X.fillStyle = ov ? '#c1440e' : col; X.fillRect(x, y, w, h); X.strokeStyle = PAL.gold; X.lineWidth = 2; X.strokeRect(x + 1, y + 1, w - 2, h - 2);
  X.fillStyle = 'rgba(255,255,255,.12)'; X.fillRect(x + 3, y + 3, w - 6, 3); tx(label, x + w / 2, y + h / 2 + sz * .32, PAL.cream, sz, F_T, 'center'); return ov}
function closeBtn(x, y, cb) {const ov = hit(x, y, 18, 18, cb, 'Close (Esc)'); X.fillStyle = ov ? '#e63946' : '#7a1022'; X.fillRect(x, y, 18, 18); X.strokeStyle = PAL.gold; X.lineWidth = 1.5; X.strokeRect(x + .75, y + .75, 16.5, 16.5); X.strokeStyle = '#fff'; X.lineWidth = 2; X.beginPath(); X.moveTo(x + 5, y + 5); X.lineTo(x + 13, y + 13); X.moveTo(x + 13, y + 5); X.lineTo(x + 5, y + 13); X.stroke()}
function bar(x, y, w, v, m, c, h = 7) {rc('#000', x - 1, y - 1, w + 2, h + 2); rc('#3a1a22', x, y, w, h); rc(c, x, y, Math.max(0, w * v / m), h); rc('rgba(255,255,255,.28)', x, y, Math.max(0, w * v / m), 2)}
// ---------- small icons (16x16) ----------
function icon(k, x, y) {const r = (c, a, b, w, h) => rc(c, x + a, y + b, w, h);
  if (k == 'e') {r('#8b5e3c', 2, 6, 12, 9); r('#6b4423', 2, 5, 12, 3); r('#f2c94c', 7, 7, 2, 3); r('#5a3a1e', 4, 2, 8, 3); r('#5a3a1e', 4, 2, 2, 4); r('#5a3a1e', 10, 2, 2, 4)}
  if (k == 'c') {r('#ffd7a8', 5, 2, 6, 6); r('#3d85c6', 3, 8, 10, 7); r('#2a6f97', 3, 8, 10, 2); r('#ff9933', 5, 10, 2, 4)}
  if (k == 'j') {r('#a4161a', 2, 2, 12, 13); r('#7a1022', 2, 2, 2, 13); r('#f4efe0', 5, 4, 8, 9); for (let i = 0; i < 3; i++) r('#999', 6, 6 + i * 3, 6, 1)}
  if (k == 'm') {r('#f4e6b0', 1, 3, 14, 11); r('#d2b86c', 5, 3, 1, 11); r('#d2b86c', 10, 3, 1, 11); r('#c1121f', 11, 8, 3, 1); r('#c1121f', 12, 7, 1, 3); r('#2f8fd8', 2, 10, 3, 2)}
  if (k == 'q') {r('#fff', 4, 1, 1, 2); r('#fff', 8, 0, 1, 3); r('#8b5e3c', 3, 5, 9, 9); r('#a9672f', 3, 5, 9, 2); r('#fff3d6', 11, 7, 3, 4); r('#fff3d6', 12, 7, 1, 1)}
  if (k == 'g') {r('#1f8a8a', 2, 2, 12, 12); r('#fff', 7, 4, 3, 2); r('#fff', 9, 5, 2, 2); r('#fff', 8, 7, 2, 2); r('#fff', 7, 10, 2, 2)}
  if (k == 'n') {r('#ffd36b', 5, 3, 2, 9); r('#ffd36b', 11, 2, 2, 9); r('#ffd36b', 5, 3, 8, 2); r('#ffd36b', 3, 10, 4, 3); r('#ffd36b', 9, 9, 4, 3); if (!SET.musOn) {for (let i = 0; i < 14; i++) r('#e63946', 1 + i, 14 - i, 2, 2)}}
  if (k == 'esc') {for (let i = 0; i < 3; i++) r('#fff3d6', 2, 3 + i * 4, 12, 2)}}
const HUDI = [{k: 'e', n: 'Bag', key: 'E', f: () => toggleInv()}, {k: 'c', n: 'Stats', key: 'C', f: () => togglePnl('char')}, {k: 'j', n: 'Journal', key: 'J', f: () => togglePnl('jour')}, {k: 'm', n: 'Map', key: 'M', f: () => togglePnl('map')},
  {k: 'q', n: 'Drink chai (heal)', key: 'Q', f: () => quickHeal()}, {k: 'g', n: 'Guide', key: 'G', f: () => togglePnl('guide')}, {k: 'n', n: 'Music on/off', key: 'N', f: () => setMusic(!SET.musOn)}, {k: 'esc', n: 'Menu', key: 'Esc', f: () => {MENU = {sel: 0}}}];
function toggleInv() {INV = INV ? null : {sel: 0, q: '', focus: false, scroll: 0}; PNL = null}
function togglePnl(p) {INV = null; PNL = PNL == p ? null : p; if (p == 'map' && PNL) MAP = {z: 1, cx: S.px * T * .5, cy: S.py * T * .5, drag: null}; if (p == 'guide' && PNL) GD = {tab: GD.tab || 0, sc: 0, w: 0}}
// ---------- HUD ----------
function hud() {
  const d = cur().d;
  ibox(4, 4, 186, 74, {a: .74}); tx(S.name, 13, 22, '#ffd36b', 13, F_R); tx('Lv ' + S.lv, 181, 22, PAL.cream, 15, F_T, 'right');
  bar(13, 28, 168, S.hp, S.maxhp, S.hp < S.maxhp * .3 ? '#ff7a1a' : '#e63946', 12); tx('HP ' + S.hp + '/' + S.maxhp, 97, 38, '#fff', 12, F_T, 'center');
  bar(13, 45, 168, S.xp, S.lv * 25, '#e0b04a', 6); tx('XP ' + S.xp + '/' + S.lv * 25, 181, 44, '#e0b04a', 11, F_T, 'right', false);
  tx('Rs.' + S.money, 13, 69, '#ffd36b', 14); tx('Chai x' + S.chai, 72, 69, '#ffb88a', 14); tx(ITEMS[S.eq].n, 181, 69, '#bfe6f5', 13, F_T, 'right');
  // mission box: shrink-wrapped to its text, with the text centred inside it
  const ob = objective(), lbl = 'Mission', lw = tw(lbl, 13, F_R), padX = 14, gap = 12, maxBox = Math.min(320, LW - 8), ls = wrapT(ob, maxBox - padX * 2 - lw - gap, 15),
    tl = Math.max(...ls.map(l => tw(l, 15))), bw = Math.ceil(padX * 2 + lw + gap + tl), bh = Math.max(32, ls.length * 16 + 16), by = 82, cyb = by + bh / 2;
  ibox(4, by, bw, bh, {a: .66, plain: 1}); txm(lbl, 4 + padX, cyb, PAL.saffron, 13, F_R);
  ls.forEach((l, i) => txm(l, 4 + padX + lw + gap, cyb + (i - (ls.length - 1) / 2) * 16, PAL.cream, 15));
  // icon buttons: a row on wide screens, a column down the right edge on narrow (phone) screens
  const n = HUDI.length, narrow = LW < 440, x0 = LW - n * 31 - 4;
  HUDI.forEach((h, i) => {const x = narrow ? LW - 32 : x0 + i * 31, y = narrow ? 5 + i * 31 : 5, on = h.k == 'e' ? INV : h.k == 'c' ? PNL == 'char' : h.k == 'j' ? PNL == 'jour' : h.k == 'm' ? PNL == 'map' : h.k == 'g' ? PNL == 'guide' : h.k == 'esc' ? MENU : 0;
    const ov = hit(x, y, 28, 28, () => {if (!B && !D && !SH && !CODE && !CHO) h.f()}, h.n + '  [' + h.key + ']'); X.fillStyle = on ? '#c1440e' : ov ? '#8a1c30' : 'rgba(58,12,24,.82)'; X.fillRect(x, y, 28, 28); X.strokeStyle = PAL.gold; X.lineWidth = 1.5; X.strokeRect(x + .75, y + .75, 26.5, 26.5);
    icon(h.k, x + 6, y + 5); tx(h.key, x + 26, y + 26, '#ffd36b', 10, F_T, 'right')});
  if (toastT) {const t = toastS, w = Math.min(LW - 20, tw(t, 15) + 30), a = Math.min(1, toastT / 20); X.globalAlpha = a; ibox((LW - w) / 2, 112, w, 26, {a: .85, plain: 1}); tx(t, LW / 2, 130, '#ffe9a8', 15, F_T, 'center'); X.globalAlpha = 1}}
// ---------- dialogue (bottom of the screen, slightly transparent) ----------
function drawDialogue() {
  const bw = Math.min(LW - 24, 640), bh = D.L ? 92 : 80, bx = (LW - bw) / 2, by = LH - bh - 14, line = D.l[D.i], shown = Math.min(line.length, Math.floor((tick - D.t0) * 1.4));
  hit(0, 0, LW, LH, () => advanceSay());
  ibox(bx, by, bw, bh, {a: .8}); const px = D.L ? 92 : 20;
  if (D.who) {const nw = tw(D.who, 15, F_R) + 30; X.fillStyle = PAL.gold; X.fillRect(bx + 16, by - 15, nw, 22); X.fillStyle = '#7a1022'; X.fillRect(bx + 18, by - 13, nw - 4, 18); tx(D.who, bx + 16 + nw / 2, by + 2, '#ffd36b', 14, F_R, 'center')}
  if (D.L) {X.fillStyle = 'rgba(255,200,120,.14)'; X.fillRect(bx + 12, by + 10, 72, 72); X.strokeStyle = PAL.gold; X.lineWidth = 1; X.strokeRect(bx + 12.5, by + 10.5, 71, 71); X.save(); X.beginPath(); X.rect(bx + 13, by + 11, 70, 70); X.clip(); drawChar(bx + 12, by + 12, D.L, 'down', 0, 2.2); X.restore()}
  const ls = wrapT(line, bw - px - 24, 17); let cnt = 0; ls.forEach((l, i) => {const s = l.slice(0, Math.max(0, shown - cnt)); cnt += l.length + 1; tx(s, bx + px, by + 30 + i * 19, '#fff7e0', 17)});
  if (shown >= line.length && (tick >> 4) & 1) tx(D.i < D.l.length - 1 ? 'Space  >' : 'Space  OK', bx + bw - 16, by + bh - 12, '#ffd36b', 14, F_T, 'right')}
// ---------- riddle choice ----------
function drawChoice() {
  uiModal(); panel(() => {ibox(40, 70, 400, 210); plate(240, 56, 'Riddle', 16); wrapT(CHO.q, 350, 17).forEach((l, i) => tx(l, 64, 118 + i * 20, '#fff7e0', 17));
    CHO.opts.forEach((o, i) => btn(64, 170 + i * 34, 352, 28, (i + 1) + '.  ' + o, () => CHO.cb(i), '', '#7a1022', 16))}, 480, 352)}
const uiModal = () => {rc('rgba(10,2,6,.55)', 0, 0, LW, LH); hit(0, 0, LW, LH, null)};
// ---------- gate lock ----------
function drawCode() {
  uiModal(); panel(() => {ibox(70, 30, 340, 290); plate(240, 16, 'Hideout Gate Lock', 16); closeBtn(384, 40, () => {CODE = null});
    tx('Clues from your missions:', 240, 82, PAL.cream, 15, F_T, 'center'); const kn = CODE.known.concat(['?']); kn.forEach((k, i) => {const x = 126 + i * 56; X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(x, 92, 44, 30); X.strokeStyle = k == '?' ? '#888' : PAL.gold; X.strokeRect(x + .5, 92.5, 43, 29); tx(k, x + 22, 115, k == '?' ? '#888' : '#ffd36b', 22, F_R, 'center')});
    tx('The 4th digit is scratched out. Try every digit from 0 to 9!', 240, 140, '#ffb88a', 14, F_T, 'center');
    for (let i = 0; i < 4; i++) {const x = 126 + i * 56; X.fillStyle = '#1a0a12'; X.fillRect(x, 154, 44, 40); X.strokeStyle = PAL.saffron; X.lineWidth = 2; X.strokeRect(x + 1, 155, 42, 38); tx(CODE.buf[i] || ((tick >> 5 & 1) && i == CODE.buf.length ? '_' : ''), x + 22, 184, '#fff', 28, F_R, 'center')}
    for (let i = 0; i < 10; i++) {const x = 112 + (i % 5) * 52, y = 208 + (i / 5 | 0) * 36; btn(x, y, 44, 30, String(i), () => {if (CODE.buf.length < 4) CODE.buf += i}, '', '#4a2a10', 18)}
    btn(112, 282, 70, 28, 'Clear', () => {CODE.buf = ''}, '', '#4a2a10', 14); btn(190, 282, 100, 28, 'Try the lock', () => {if (CODE.buf.length == 4) CODE.cb(CODE.buf)}, 'Enter', '#1f6f4a', 15); btn(298, 282, 70, 28, 'Back', () => {CODE.buf = CODE.buf.slice(0, -1)}, 'Backspace', '#4a2a10', 14);
    if (CODE.msg) tx(CODE.msg, 240, 52 + 18, '#ff8a6a', 14, F_T, 'center')}, 480, 352)}
// ---------- shop ----------
function drawShop() {
  uiModal(); panel(() => {ibox(50, 24, 380, 300); plate(240, 10, 'Shop', 16); closeBtn(404, 34, () => {SH = null}); tx('Rs.' + S.money, 410, 74, '#ffd36b', 16, F_T, 'right');
    if (SH.L) {X.fillStyle = 'rgba(255,200,120,.14)'; X.fillRect(66, 44, 56, 56); X.save(); X.beginPath(); X.rect(66, 44, 56, 56); X.clip(); drawChar(66, 44, SH.L, 'down', 0, 1.75); X.restore()}
    if (SH.who) tx(SH.who, 132, 62, '#ffd36b', 14, F_R); wrapT(SH.line, 250, 15).forEach((l, i) => tx(l, 132, 80 + i * 16, '#fff7e0', 15));
    SH.stock.forEach((k, i) => {const y = 112 + i * 44, it = k == 'chai' ? CHAI : ITEMS[k], p = k == 'chai' ? CHAI.price : it.price, own = k != 'chai' && S.items.includes(k), ov = hit(66, y, 348, 38, () => buy(i), own ? 'Already owned' : 'Click to buy');
      X.fillStyle = ov ? 'rgba(193,68,14,.5)' : 'rgba(0,0,0,.28)'; X.fillRect(66, y, 348, 38); X.strokeStyle = 'rgba(224,176,74,.6)'; X.strokeRect(66.5, y + .5, 347, 37); tx((i + 1) + '.  ' + it.n, 76, y + 17, PAL.cream, 16); tx(it.desc, 76, y + 32, '#c9b79a', 13); tx(own ? 'Owned' : 'Rs.' + p, 404, y + 24, own ? '#7ee08a' : S.money >= p ? '#ffd36b' : '#ff8a6a', 17, F_T, 'right')});
    tx('Press 1-' + SH.stock.length + ' to buy, Esc to leave', 240, 310, '#c9b79a', 13, F_T, 'center')}, 480, 352)}

