// ===== MAIN: window fitting, input (keyboard + mouse), frame loop =====
const lc = document.createElement('canvas'), LX = lc.getContext('2d'), ZOOMS = [1, 1.5, 2, 3, 4];
function fit() {const r = window.devicePixelRatio || 1; ZS = ZOOMS[SET.zoom]; LW = Math.ceil(innerWidth / ZS); LH = Math.ceil(innerHeight / ZS); VW = LW / T; VH = LH / T; K = ZS * r;
  cv.width = lc.width = Math.round(LW * K); cv.height = lc.height = Math.round(LH * K); cv.style.width = LW * ZS + 'px'; cv.style.height = LH * ZS + 'px'}
addEventListener('resize', fit); fit();
Promise.all(FONTS_TO_LOAD.map(f => document.fonts.load(f))).catch(() => {});
// ---------- keyboard ----------
const PKEY = {char: 'c', jour: 'j', map: 'm', guide: 'g'};
addEventListener('keydown', ev => {
  const tg = document.activeElement && document.activeElement.tagName; if (tg == 'INPUT') return;
  const k = ev.key.length == 1 ? ev.key.toLowerCase() : ev.key; keys[k] = 1;
  if (ev.key.startsWith('Arrow') || ev.key == ' ' || ev.key == 'Tab' || ev.key == 'Escape' || ev.key == 'Backspace' || ev.key == '/') ev.preventDefault();
  if (!S || (ev.repeat && !(INV && INV.focus) && !(CODE && k == 'Backspace'))) return; auInit();
  if (CODE) return codeKey(k);
  if (CHO) {if (/^[1-9]$/.test(k) && +k <= CHO.opts.length) CHO.cb(+k - 1); return}
  if (SH) {if (k == 'Escape' || k == ' ') SH = null; else if (/^[1-9]$/.test(k)) buy(+k - 1); return}
  if (MENU) return menuKey(k);
  if (B) return battleKey(k);
  if (PNL) {
    if (k == 'Escape' || k == PKEY[PNL]) PNL = null; else if (PKEY[k] === undefined && 'cjmg'.includes(k)) togglePnl(Object.keys(PKEY).find(p => PKEY[p] == k));
    else if (k == 'e') toggleInv();
    else if (PNL == 'map') {if (k == '+' || k == '=') MAP.z = Math.min(5, MAP.z * 1.3); else if (k == '-') MAP.z = Math.max(.8, MAP.z / 1.3); else if (dirs[k]) {const [dx, dy] = vec[dirs[k]], st = 40 / (MAP.s || 1); MAP.cx += dx * st; MAP.cy += dy * st}}
    else if (PNL == 'guide') {if (k == 'ArrowLeft' || k == 'a') {GD.tab = (GD.tab + 7) % 8; GD.sc = 0} else if (k == 'ArrowRight' || k == 'd') {GD.tab = (GD.tab + 1) % 8; GD.sc = 0} else if (k == 'ArrowDown' || k == 's') GD.sc = Math.min(GD.max || 0, (GD.sc || 0) + 30); else if (k == 'ArrowUp' || k == 'w') GD.sc = Math.max(0, (GD.sc || 0) - 30)}
    return}
  if (INV) return invKey({key: k});
  if (D) {if (k == ' ' || k == 'Enter' || k == 'z' || k == 'f') advanceSay(); return}
  if (k == ' ' || k == 'Enter' || k == 'z' || k == 'f') {if (S.px == S.x && S.py == S.y) interact()}
  else if (k == 'e') toggleInv(); else if (k == 'c') togglePnl('char'); else if (k == 'j') togglePnl('jour'); else if (k == 'm') togglePnl('map'); else if (k == 'g') togglePnl('guide');
  else if (k == 'n') setMusic(!SET.musOn); else if (k == 'q') quickHeal(); else if (k == 'Escape') MENU = {sel: 0}});
addEventListener('keyup', e => {delete keys[e.key.length == 1 ? e.key.toLowerCase() : e.key]});
addEventListener('blur', () => {keys = {}});
// ---------- mouse (and touch) ----------
let DRAGGED = false;
const setMouse = e => {MOUSE.x = e.clientX / ZS; MOUSE.y = e.clientY / ZS};
cv.addEventListener('mousemove', e => {setMouse(e); invDragMove(); const d = MAP.drag; if (d && PNL == 'map') {const dx = MOUSE.x - d.mx, dy = MOUSE.y - d.my; if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true; MAP.cx = d.cx - dx / MAP.s; MAP.cy = d.cy - dy / MAP.s}});
cv.addEventListener('mousedown', e => {setMouse(e); auInit(); if (grabBag()) return; if (PNL == 'map' && MAP.rect && MOUSE.x > MAP.rect.x && MOUSE.x < MAP.rect.x + MAP.rect.w && MOUSE.y > MAP.rect.y && MOUSE.y < MAP.rect.y + MAP.rect.h) MAP.drag = {mx: MOUSE.x, my: MOUSE.y, cx: MAP.cx, cy: MAP.cy, moved: false}});
addEventListener('mouseup', () => {invDragEnd(); if (MAP.drag && MAP.drag.moved) DRAGGED = true; MAP.drag = null});
cv.addEventListener('click', e => {setMouse(e); if (DRAGGED) {DRAGGED = false; return} if (!S) return; if (INV && INV.focus) INV.focus = false; uiClick()});
cv.addEventListener('wheel', e => {e.preventDefault(); if (!S) return;
  if (PNL == 'map') {MAP.z = Math.max(.8, Math.min(5, MAP.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15)))} else if (PNL == 'guide') GD.sc = Math.max(0, Math.min(GD.max || 0, (GD.sc || 0) + e.deltaY * .5)); else if (INV) INV.scroll += e.deltaY > 0 ? 1 : -1}, {passive: false});
function grabBag() {const z = invZone(MOUSE.x, MOUSE.y); if (!z) return false; INV.drag = {w: z.w, h: z.h, mx: MOUSE.x, my: MOUSE.y, sw: INV.w, sh: INV.h}; return true}
let TD = null;
cv.addEventListener('touchstart', e => {const t = e.touches[0]; MOUSE.x = t.clientX / ZS; MOUSE.y = t.clientY / ZS; auInit(); if (!S) return; e.preventDefault(); frameNow(); TD = {y: MOUSE.y, acc: 0};
  if (grabBag()) return; if (PNL == 'map' && MAP.rect && MOUSE.x > MAP.rect.x && MOUSE.x < MAP.rect.x + MAP.rect.w && MOUSE.y > MAP.rect.y && MOUSE.y < MAP.rect.y + MAP.rect.h) MAP.drag = {mx: MOUSE.x, my: MOUSE.y, cx: MAP.cx, cy: MAP.cy, moved: false};
  uiClick()}, {passive: false});
cv.addEventListener('touchmove', e => {const t = e.touches[0]; if (!S || !t) return; e.preventDefault(); setMouse(t); const dy = MOUSE.y - (TD ? TD.y : MOUSE.y); if (TD) TD.y = MOUSE.y;
  if (INV && INV.drag) invDragMove(); else if (PNL == 'map' && MAP.drag) {const d = MAP.drag, dx = MOUSE.x - d.mx, dy2 = MOUSE.y - d.my; if (Math.abs(dx) + Math.abs(dy2) > 4) d.moved = true; MAP.cx = d.cx - dx / MAP.s; MAP.cy = d.cy - dy2 / MAP.s}
  else if (PNL == 'guide') GD.sc = Math.max(0, Math.min(GD.max || 0, (GD.sc || 0) - dy)); else if (INV && TD) {TD.acc += dy; while (Math.abs(TD.acc) > 26) {INV.scroll += TD.acc > 0 ? -1 : 1; TD.acc -= Math.sign(TD.acc) * 26}}}, {passive: false});
const tEnd = () => {invDragEnd(); MAP.drag = null; TD = null}; cv.addEventListener('touchend', tEnd); cv.addEventListener('touchcancel', tEnd);
// ---------- frame loop ----------
function drawTip() {if (!TIP || B) return; const ls = wrapT(TIP, 250, 14), w = Math.min(262, Math.max(...ls.map(l => tw(l, 14))) + 18), h = ls.length * 15 + 10, x = Math.max(4, Math.min(LW - w - 4, MOUSE.x + 14)), y = Math.max(4, Math.min(LH - h - 4, MOUSE.y + 18));
  ibox(x, y, w, h, {a: .95, plain: 1}); ls.forEach((l, i) => tx(l, x + 9, y + 16 + i * 15, '#fff3d6', 14))}
function frameNow() {
  update(); X.setTransform(1, 0, 0, 1, 0, 0); X.clearRect(0, 0, cv.width, cv.height); X.setTransform(K, 0, 0, K, 0, 0); X.imageSmoothingEnabled = false; uiBegin();
  if (S) {
    if (AU.ctx) setTrack(B ? 'battle' : 'world');
    if (B) drawBattle();
    else {drawWorld(); hud();
      if (CODE) drawCode(); else if (CHO) drawChoice(); else if (SH) drawShop(); else if (D) drawDialogue();
      if (MENU) drawMenu(); else if (PNL == 'map') drawMapP(); else if (PNL == 'char') drawSheet(); else if (PNL == 'jour') drawJour(); else if (PNL == 'guide') drawGuide();
      if (INV) drawInv(); drawTip()}
    if (fade) {X.fillStyle = 'rgba(0,0,0,' + fade / 40 + ')'; X.fillRect(0, 0, LW, LH)}}
  $('devtag').style.display = S ? 'none' : ''; if (S && !B) drawCredit(); const z = INV && (INV.drag || invZone(MOUSE.x, MOUSE.y)); cv.style.cursor = z ? (z.w && z.h ? 'nwse-resize' : z.w ? 'ew-resize' : 'ns-resize') : CUR ? 'pointer' : 'default'}
function frame() {frameNow(); requestAnimationFrame(frame)}
requestAnimationFrame(frame);

