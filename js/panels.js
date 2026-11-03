// ===== PANELS: bag (left side), stats, journal, map, guide, menu =====
// ---------- item glyphs ----------
function itemIcon(id, x, y, s = 1) {
  X.save(); X.translate(x, y); X.scale(s, s); const r = (c, a, b, w, h) => {X.fillStyle = c; X.fillRect(a, b, w, h)}, line = (c, x1, y1, x2, y2, w) => {X.strokeStyle = c; X.lineWidth = w; X.beginPath(); X.moveTo(x1, y1); X.lineTo(x2, y2); X.stroke()};
  if (id == 'bat') {line('#c9a26b', 4, 17, 15, 3, 4); line('#8b5e3c', 3, 18, 6, 15, 2)}
  else if (id == 'tawa') {X.fillStyle = '#333'; X.beginPath(); X.arc(10, 9, 7, 0, 7); X.fill(); X.fillStyle = '#555'; X.beginPath(); X.arc(10, 9, 4, 0, 7); X.fill(); line('#222', 12, 14, 18, 19, 3)}
  else if (id == 'talwar') {line('#dfe6ee', 4, 17, 16, 3, 3); line('#fff', 4, 17, 16, 3, 1); line('#f2c94c', 3, 14, 8, 19, 3); line('#8e1c1c', 2, 19, 4, 17, 3)}
  else if (id == 'belan') {line('#e0c08a', 3, 12, 17, 8, 4); line('#8b5e3c', 1, 13, 4, 12, 3); line('#8b5e3c', 16, 7, 19, 6, 3)}
  else if (id == 'carrom') {X.fillStyle = '#f2c94c'; X.beginPath(); X.arc(10, 10, 7, 0, 7); X.fill(); X.fillStyle = '#c1121f'; X.beginPath(); X.arc(10, 10, 4, 0, 7); X.fill(); X.fillStyle = '#fff'; X.beginPath(); X.arc(10, 10, 1.5, 0, 7); X.fill()}
  else if (id == 'lathi') {line('#c9a26b', 3, 19, 17, 2, 3); for (const k of [6, 11, 15]) line('#8b5e3c', k - 1, 20 - k + 2, k + 1, 18 - k, 1)}
  else if (id == 'gada') {line('#8b5e3c', 4, 19, 12, 9, 3); X.fillStyle = '#f2c94c'; X.beginPath(); X.arc(14, 6, 5, 0, 7); X.fill(); X.fillStyle = '#c9a23a'; X.beginPath(); X.arc(14, 6, 2.5, 0, 7); X.fill(); r('#f2c94c', 13, 0, 2, 3)}
  else if (id == 'q_tiffin') {X.scale(.8, .8); tiffinShape(r)}
  else if (id == 'q_parcel') {X.scale(.8, .8); parcelShape(r)}
  else if (id == 'chai') {r('#fff', 7, 1, 1, 3); r('#fff', 11, 0, 1, 4); r('#c1440e', 4, 6, 11, 11); r('#e8a070', 4, 6, 11, 3); r('#c1440e', 15, 8, 3, 5); r('#8a2f0a', 5, 16, 9, 2)}
  else if (id == 'pieces') {r('#f4e6b0', 2, 3, 16, 14); r('#d2b86c', 7, 3, 1, 14); r('#d2b86c', 13, 3, 1, 14); r('#c1121f', 10, 9, 4, 1); r('#c1121f', 11, 8, 1, 3)}
  else if (id == 'notes') {r('#f4efe0', 3, 2, 14, 16); for (let i = 0; i < 4; i++) r('#777', 5, 5 + i * 3, 10, 1); r('#c1121f', 13, 3, 3, 3)}
  else {r('#c9a26b', 3, 6, 14, 11); r('#8b5e3c', 3, 6, 14, 3); r('#f2c94c', 9, 9, 2, 3)}
  X.restore()}
// ---------- bag: slides in on the left, searchable ----------
function drawInv() {
  INV.w = Math.max(Math.min(190, LW - 12), Math.min(INV.w || SET.bagW || Math.min(244, LW * .5), LW - 12)); INV.h = Math.max(Math.min(280, LH - 12), Math.min(INV.h || SET.bagH || LH - 12, LH - 12));
  const w = INV.w, h = INV.h, x = 6, y = 6, L = bagList(INV.q); INV.rect = {x, y, w, h}; hit(x, y, w, h, null); ibox(x, y, w, h, {a: .98});
  tx('BAG', x + 16, y + 26, '#ffd36b', 17, F_R); tx('Rs.' + S.money, x + w - 38, y + 26, '#ffd36b', 15, F_T, 'right'); closeBtn(x + w - 28, y + 10, () => {INV = null}); btn(x + 58, y + 10, 46, 18, 'Reset', () => {INV.w = Math.min(244, LW * .5); INV.h = LH - 12; delete SET.bagW; delete SET.bagH; saveSettings()}, 'Reset the bag to its normal size', '#4a2a10', 12);
  const sy = y + 36, fo = hit(x + 10, sy, w - 20, 22, () => {if (IS_TOUCH) {const v = prompt('Search items', INV.q || ''); if (v !== null) {INV.q = v.slice(0, 18); INV.sel = 0; INV.scroll = 0}} else INV.focus = true}, 'Click, then type to search'); X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(x + 10, sy, w - 20, 22); X.strokeStyle = INV.focus ? '#ffd36b' : fo ? '#c9a26b' : '#7a5a3a'; X.lineWidth = 1.5; X.strokeRect(x + 10.75, sy + .75, w - 21.5, 20.5);
  tx(INV.q || (INV.focus ? '' : 'Search items...'), x + 18, sy + 16, INV.q ? PAL.cream : '#9c8a74', 15); if (INV.focus && (tick >> 5) & 1) rc('#ffd36b', x + 19 + tw(INV.q, 15), sy + 5, 2, 13);
  if (!L.length) tx('Nothing matches "' + INV.q + '"', x + w / 2, y + 120, '#9c8a74', 15, F_T, 'center');
  INV.sel = Math.max(0, Math.min(INV.sel, L.length - 1)); const ly = sy + 30, lh = h - 36 - 30 - 138, rows = Math.max(1, Math.floor(lh / 28)); INV.scroll = Math.max(0, Math.min(INV.scroll, Math.max(0, L.length - rows)));
  if (INV.sel < INV.scroll) INV.scroll = INV.sel; if (INV.sel >= INV.scroll + rows) INV.scroll = INV.sel - rows + 1;
  L.slice(INV.scroll, INV.scroll + rows).forEach((o, k) => {const i = INV.scroll + k, ry = ly + k * 28, sel = i == INV.sel, ov = hit(x + 10, ry, w - 20 - (L.length > rows ? 8 : 0), 26, () => {INV.sel = i; INV.focus = false}, '');
    X.fillStyle = sel ? 'rgba(193,68,14,.65)' : ov ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.25)'; X.fillRect(x + 10, ry, w - 20, 26); if (sel) {X.strokeStyle = '#ffd36b'; X.lineWidth = 1.5; X.strokeRect(x + 10.75, ry + .75, w - 21.5, 24.5)}
    itemIcon(o.id, x + 15, ry + 3, 1); tx(o.n, x + 40, ry + 18, PAL.cream, 15); if (o.eq) tx('EQUIPPED', x + w - 20, ry + 18, '#7ee08a', 12, F_T, 'right'); else if (o.cnt > 1 || o.type == 'item') tx('x' + o.cnt, x + w - 20, ry + 18, '#ffd36b', 15, F_T, 'right')});
  if (L.length > rows) {const th = lh * rows / L.length, ty = ly + (lh - th) * INV.scroll / Math.max(1, L.length - rows); rc('rgba(255,255,255,.2)', x + w - 16, ly, 4, lh); rc('#e0b04a', x + w - 16, ty, 4, th)}
  // details of the selected item
  const dy = y + h - 134, o = L[INV.sel]; X.fillStyle = 'rgba(0,0,0,.3)'; X.fillRect(x + 10, dy, w - 20, 124); X.strokeStyle = 'rgba(224,176,74,.5)'; X.lineWidth = 1; X.strokeRect(x + 10.5, dy + .5, w - 21, 123);
  if (o) {tx(o.n, x + 18, dy + 18, '#ffd36b', 15, F_R); wrapT(o.desc, w - 40, 13).slice(0, 2).forEach((l, i) => tx(l, x + 18, dy + 33 + i * 13, '#d8c9ad', 13));
    if (o.type == 'weapon') {const it = ITEMS[o.id]; [['STR', it.str], ['WT', it.wt], ['SHP', it.sharp], ['POW', it.pow]].forEach(([n, v], i) => {const bx = x + 18 + (i % 2) * ((w - 36) / 2), by = dy + 62 + (i >> 1) * 14; tx(n, bx, by + 7, '#bfe6f5', 12); bar(bx + 28, by, (w - 36) / 2 - 38, v, 12, i % 2 ? '#e0b04a' : '#e63946', 6)});
      it.moves.forEach((m, i) => {const my = dy + 98 + i * 11, ov2 = hit(x + 14, my - 9, w - 28, 11, null, m.n + ': ' + moveTip(m)); tx(m.n, x + 18, my, ov2 ? '#fff' : '#bfa57a', 12); tx(m.k.toUpperCase(), x + w - 20, my, m.k == 'pow' ? '#ff9a6a' : m.k == 'sharp' ? '#7ec8ff' : '#c9a0ff', 11, F_T, 'right')});
      if (!o.eq) btn(x + w - 82, dy + 6, 66, 20, 'Equip', () => equip(o.id), 'Equip this weapon (Enter)', '#1f6f4a', 14)}
    else if (o.id == 'chai') btn(x + 18, dy + 70, 90, 24, 'Drink chai', () => quickHeal(), 'Heal 30 HP (Q)', '#1f6f4a', 14)}
  const z = INV.drag || invZone(MOUSE.x, MOUSE.y), hl = z ? '#fff' : '#ffd36b'; if (z) {X.fillStyle = 'rgba(255,255,255,.18)'; if (z.w) X.fillRect(x + w - 4, y, 8, h); if (z.h) X.fillRect(x, y + h - 4, w, 8)}
  X.strokeStyle = hl; X.lineWidth = 2; X.beginPath(); for (let k = 1; k <= 3; k++) {X.moveTo(x + w - 4 * k - 3, y + h - 3); X.lineTo(x + w - 3, y + h - 4 * k - 3)} X.stroke()}
// resize zones of the bag: right edge, bottom edge, or the corner (bigger on touch screens)
function invZone(mx, my) {if (!INV || !INV.rect) return null; const {x, y, w, h} = INV.rect, b = IS_TOUCH ? 14 : 8, c = IS_TOUCH ? 26 : 18;
  const nr = mx > x + w - b && mx < x + w + b && my > y && my < y + h + b, nb = my > y + h - b && my < y + h + b && mx > x && mx < x + w + b, co = mx > x + w - c && my > y + h - c && mx < x + w + b && my < y + h + b;
  if (co || (nr && nb)) return {w: 1, h: 1}; if (nr) return {w: 1, h: 0}; if (nb) return {w: 0, h: 1}; return null}
function invDragMove() {const d = INV && INV.drag; if (!d) return; if (d.w) INV.w = Math.max(190, Math.min(LW - 12, d.sw + MOUSE.x - d.mx)); if (d.h) INV.h = Math.max(280, Math.min(LH - 12, d.sh + MOUSE.y - d.my))}
function invDragEnd() {if (INV && INV.drag) {INV.drag = null; SET.bagW = Math.round(INV.w); SET.bagH = Math.round(INV.h); saveSettings()}}
function invKey(e) {
  const L = bagList(INV.q);
  if (INV.focus) {if (e.key == 'Escape' || e.key == 'Enter') INV.focus = false; else if (e.key == 'Backspace') INV.q = INV.q.slice(0, -1); else if (e.key.length == 1 && INV.q.length < 18) {INV.q += e.key; INV.sel = 0; INV.scroll = 0} return}
  if (e.key == 'e' || e.key == 'Escape') INV = null; else if (e.key == '/') INV.focus = true;
  else if (e.key == 'ArrowUp' || e.key == 'w') INV.sel = Math.max(0, INV.sel - 1); else if (e.key == 'ArrowDown' || e.key == 's') INV.sel = Math.min(L.length - 1, INV.sel + 1);
  else if (e.key == ' ' || e.key == 'Enter') {const o = L[INV.sel]; if (o && o.type == 'weapon') equip(o.id); else if (o && o.id == 'chai') quickHeal()}}
// ---------- stats ----------
function drawSheet() {
  uiModal(); panel(() => {ibox(30, 16, 420, 320); plate(240, 2, 'Character', 16); closeBtn(424, 26, () => {PNL = null});
    X.fillStyle = 'rgba(255,200,120,.12)'; X.fillRect(50, 50, 132, 150); X.strokeStyle = PAL.gold; X.strokeRect(50.5, 50.5, 131, 149); drawChar(54, 60, LOOKS[S.look], 'down', 0, 4); tx(S.name, 116, 224, '#ffd36b', 17, F_R, 'center');
    const done = doneCount(), bosses = ORDER.filter(c => S.flags['boss_' + c]).length, chests = Object.keys(S.flags).filter(k => k.startsWith('ch_')).length, ep = it => ITEMS[S.eq][it];
    const rows = [['Level', S.lv], ['HP', S.hp + ' / ' + S.maxhp], ['XP', S.xp + ' / ' + S.lv * 25], ['Money', 'Rs.' + S.money], ['Chai', 'x' + S.chai], ['Weapon', ITEMS[S.eq].n], ['Missions done', done], ['Bosses beaten', bosses], ['Chests opened', chests], ['Street cred', bosses * 50 + done * 20]];
    rows.forEach(([a, b], i) => {const y = 72 + i * 25; tx(a, 214, y, '#c9b79a', 15); tx(String(b), 428, y, PAL.cream, 16, F_T, 'right'); rc('rgba(224,176,74,.25)', 214, y + 6, 214, 1)});
    bar(214, 330 - 52, 214, S.xp, S.lv * 25, '#e0b04a', 8); tx('Next level: full HP and +10 max HP', 321, 330 - 28, '#7ee08a', 13, F_T, 'center'); tx('Gang strength +' + tierOf() + '  (enemies get stronger as you progress)', 240, 320, '#ffb88a', 13, F_T, 'center')}, 480, 352)}
// ---------- journal: only your current tasks, no spoilers ----------
let JRopen = false;
function drawJour() {
  uiModal(); panel(() => {const J = journalData(); ibox(30, 16, 420, 320); plate(240, 2, 'Journal', 16); closeBtn(424, 26, () => {PNL = null}); let y = 62;
    tx('Missions', 52, y, PAL.saffron, 16, F_R); y += 8; if (!J.act.length && !J.mains.length) {y += 20; tx('Nothing right now. Explore the city!', 52, y, '#c9b79a', 15)}
    J.act.concat(J.mains.map(s => ({t: 'Main goal', s}))).forEach(a => {y += 20; diamond(58, y - 5, 4, a.t == 'Main goal' ? '#e63946' : '#ffd36b'); tx(a.t, 68, y, '#ffd36b', 15); wrapT(a.s, 340, 14).forEach(l => {y += 15; tx(l, 68, y, PAL.cream, 14)}); y += 2});
    if (J.clues) {y += 24; tx('Lock clues', 52, y, PAL.saffron, 16, F_R); y += 8; J.clue.split(' ').forEach((c, i) => {const x = 60 + i * 40; X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(x, y, 32, 26); X.strokeStyle = c == '?' ? '#888' : PAL.gold; X.strokeRect(x + .5, y + .5, 31, 25); tx(c, x + 16, y + 20, c == '?' ? '#888' : '#ffd36b', 18, F_R, 'center')}); y += 26}
    y += 26; const ov = hit(48, y - 16, 380, 22, () => {JRopen = !JRopen}, 'Show / hide completed'); tx((JRopen ? '[-] ' : '[+] ') + 'Completed (' + J.done.length + ')', 52, y, ov ? '#fff' : PAL.saffron, 15, F_R);
    if (JRopen) J.done.slice(0, 7).forEach(t => {y += 16; tx('- ' + t, 68, y, '#9fd9a8', 14)})}, 480, 352)}
// ---------- map ----------
let MAP = {z: 1, cx: 0, cy: 0, drag: null}; const mapImgs = {};
function mapImg(id) {if (mapImgs[id]) return mapImgs[id]; const m = getMap(id), d = m.d, sc = .5, c = document.createElement('canvas'); c.width = d.w * T * sc; c.height = d.h * T * sc;
  const oX = X, ot = tick, oc = cam.x, oc2 = cam.y, ov = VW, oh = VH; X = c.getContext('2d'); X.imageSmoothingEnabled = false; X.scale(sc, sc); tick = 0; cam.x = -1e5; cam.y = -1e5; VW = 1e4; VH = 1e4;
  for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) drawTile(m, d, x, y); drawTrain(d); d.blds.forEach(drawBld); drawStalls(d); d.lamps.forEach(l => drawLamp(l[0], l[1])); drawProps(d);
  for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) if (m.g[y][x].s == 2) drawTree(x * T, y * T, H(x, y), d);
  X = oX; tick = ot; cam.x = oc; cam.y = oc2; VW = ov; VH = oh; return mapImgs[id] = c}
const KIND_COL = {t: '#ff9933', m: '#2e8b57', x: '#3d85c6', g: '#f2c94c', j: '#fbfaf5', b: '#a4361e', h: '#ffffff'};
const KIND_SHORT = {h: 'Hospital', t: 'Mandir', m: 'Mosque', x: 'Church', g: 'Gurudwara', j: 'Jain', b: 'Vihara'}, KIND_NAME = {t: 'Hindu temple', m: 'Mosque', x: 'Church', g: 'Gurudwara', j: 'Jain temple', b: 'Buddhist vihara', h: 'Hospital (heals you)'};
// religion / hospital glyph used on the map and in the guide
function placeGlyph(k, cx, cy, r) {
  X.fillStyle = KIND_COL[k] || '#fff'; X.beginPath(); X.arc(cx, cy, r, 0, 7); X.fill(); X.strokeStyle = '#2a1a0a'; X.lineWidth = Math.max(1, r / 6); X.stroke(); const u = r / 8, c = (col, a, b, w, h) => {X.fillStyle = col; X.fillRect(cx + a * u, cy + b * u, w * u, h * u)};
  if (k == 'h') {c('#e63946', -1, -5, 2, 10); c('#e63946', -5, -1, 10, 2)}
  if (k == 't') {c('#7a1022', -1, -6, 2, 3); c('#7a1022', -3, -3, 6, 3); c('#7a1022', -5, 0, 10, 3); c('#7a1022', -6, 3, 12, 2)}
  if (k == 'm') {X.fillStyle = '#fff'; X.beginPath(); X.arc(cx, cy + u, 4.4 * u, Math.PI, 0); X.fill(); c('#fff', -4.4, 1, 8.8, 3); c('#f2c94c', -.5, -6.2, 1, 2)}
  if (k == 'x') {c('#fff', -1, -6, 2, 12); c('#fff', -4, -3, 8, 2)}
  if (k == 'g') {X.fillStyle = '#7a4a00'; X.beginPath(); X.arc(cx, cy + u, 4 * u, Math.PI, 0); X.fill(); c('#7a4a00', -4, 1, 8, 3); c('#1b4f8a', -.5, -6, 1, 3)}
  if (k == 'j') {X.fillStyle = '#c9a23a'; for (let i = 0; i < 5; i++) {const a = i * 1.2566 - 1.57; X.beginPath(); X.arc(cx + Math.cos(a) * 3.6 * u, cy + Math.sin(a) * 3.6 * u, 1.5 * u, 0, 7); X.fill()}}
  if (k == 'b') {X.strokeStyle = '#f2c94c'; X.lineWidth = Math.max(1, u * .8); X.beginPath(); X.arc(cx, cy, 4 * u, 0, 7); X.stroke(); X.beginPath(); X.moveTo(cx - 4 * u, cy); X.lineTo(cx + 4 * u, cy); X.moveTo(cx, cy - 4 * u); X.lineTo(cx, cy + 4 * u); X.stroke()}}
function drawMapP() {
  rc('#100810', 0, 0, LW, LH); hit(0, 0, LW, LH, null);
  const id = cityOf(), d = MAPS[id], img = mapImg(id), sc = .5, top = 36, bot = 46, aw = LW - 16, ah = LH - top - bot, base = Math.min(aw / img.width, ah / img.height), s = base * MAP.z;
  const cxs = LW / 2, cys = top + ah / 2, bw = Math.ceil(d.w / 4), seen = S.seen[id] || [], seenAt = (tx, ty) => !!seen[(ty >> 2) * bw + (tx >> 2)];
  MAP.s = s; MAP.cx = Math.max(0, Math.min(img.width, MAP.cx)); MAP.cy = Math.max(0, Math.min(img.height, MAP.cy)); MAP.rect = {x: 8, y: top, w: aw, h: ah};
  const sx = (tx) => cxs + (tx * T * sc - MAP.cx) * s, sy = (ty) => cys + (ty * T * sc - MAP.cy) * s;
  X.save(); X.beginPath(); X.rect(8, top, aw, ah); X.clip(); rc('#1a0f1a', 8, top, aw, ah); X.imageSmoothingEnabled = false; X.drawImage(img, cxs - MAP.cx * s, cys - MAP.cy * s, img.width * s, img.height * s);
  X.fillStyle = 'rgba(10,5,14,.97)'; X.beginPath(); for (let by = 0; by < Math.ceil(d.h / 4); by++) for (let bx = 0; bx < bw; bx++) if (!seen[by * bw + bx]) X.rect(Math.floor(sx(bx * 4)), Math.floor(sy(by * 4)), Math.ceil(4 * T * sc * s) + 1, Math.ceil(4 * T * sc * s) + 1); X.fill();
  const rs = Math.max(8, Math.min(17, 7 + MAP.z * 3.2)), blink = .55 + Math.sin(tick / 9) * .45; let hover = null;
  d.blds.forEach(b => {const cx = (b[0] + b[2] / 2), cy = (b[1] + b[3] / 2), special = 'tmxgjbh'.includes(b[7]) && b[7]; if (!seenAt(cx | 0, cy | 0)) return; const px = sx(cx), py = sy(cy);
    if (special) placeGlyph(special, px, py, rs * .8)
    else if (b[6] != 'Home' && !HOME_NAMES.includes(b[6])) {X.fillStyle = '#ffe9a8'; X.fillRect(px - 2, py - 2, 4, 4)}
    const ov = Math.hypot(MOUSE.x - px, MOUSE.y - py) < rs + 4 && MOUSE.y > top && MOUSE.y < top + ah; if (ov) hover = {px, py, n: b[6], k: special};
    if ((special && MAP.z >= 1.2) || (!special && MAP.z >= 2.4 && !HOME_NAMES.includes(b[6]))) {X.font = (special ? 11 : 10) + 'px ' + F_T; X.textAlign = 'center'; X.lineWidth = 3; X.strokeStyle = 'rgba(10,4,8,.9)'; X.strokeText(b[6], px, py + rs + 11); X.fillStyle = special ? '#fff3d6' : '#cfc3a8'; X.fillText(b[6], px, py + rs + 11); X.textAlign = 'left'}});
  if (lairKnown(id)) {const px = sx(d.lair[0]), py = sy(d.lair[1]); X.fillStyle = '#c1121f'; X.beginPath(); X.arc(px, py, rs, 0, 7); X.fill(); X.strokeStyle = '#fff'; X.lineWidth = 2.5; X.beginPath(); X.moveTo(px - 4, py - 4); X.lineTo(px + 4, py + 4); X.moveTo(px + 4, py - 4); X.lineTo(px - 4, py + 4); X.stroke(); tx(d.cfg.lair.name, px, py + rs + 12, '#ff8a6a', 12, F_T, 'center')}
  missionMarks().forEach(([x, y, n]) => {const px = sx(x + .5), py = sy(y + .5) - Math.abs(Math.sin(tick / 12)) * 3; X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(px, py, rs * .8, 0, 7); X.fill(); X.strokeStyle = '#3a1a00'; X.lineWidth = 1.5; X.stroke(); X.fillStyle = '#3a1a00'; X.fillRect(px - rs * .12, py - rs * .5, rs * .24, rs * .6); X.fillRect(px - rs * .12, py + rs * .2, rs * .24, rs * .24); if (Math.hypot(MOUSE.x - px, MOUSE.y - py) < rs + 3) hover = {px, py, n: 'Mission: ' + n}});
  const pt = S.map.startsWith('in_') ? S.ret : S, px = sx((S.map.startsWith('in_') ? pt.x : S.px) + .5), py = sy((S.map.startsWith('in_') ? pt.y : S.py) + .5), pr = 7 + Math.sin(tick / 6) * 2;
  X.strokeStyle = 'rgba(255,60,60,' + (.4 + blink * .5) + ')'; X.lineWidth = 3; X.beginPath(); X.arc(px, py, pr + 5, 0, 7); X.stroke(); X.fillStyle = blink > .5 ? '#ff3b3b' : '#fff'; X.beginPath(); X.arc(px, py, pr * .7, 0, 7); X.fill(); X.strokeStyle = '#000'; X.lineWidth = 1.5; X.stroke();
  if (Math.hypot(MOUSE.x - px, MOUSE.y - py) < 14) hover = {px, py, n: S.name + ' (you)'};
  X.restore(); X.strokeStyle = PAL.gold; X.lineWidth = 2; X.strokeRect(8, top, aw, ah);
  if (hover) {const t = hover.n + (hover.k ? '  -  ' + KIND_NAME[hover.k] : ''), w = tw(t, 14) + 18, bx = Math.max(10, Math.min(LW - w - 10, hover.px - w / 2)), by = Math.max(top + 4, hover.py - 38); ibox(bx, by, w, 22, {a: .92, plain: 1}); tx(t, bx + w / 2, by + 16, '#fff3d6', 14, F_T, 'center')}
  tx('Map - ' + d.name, 14, 24, '#ffd36b', 17, F_R); closeBtn(LW - 28, 8, () => {PNL = null});
  btn(LW - 118, 6, 24, 22, '+', () => {MAP.z = Math.min(5, MAP.z * 1.4)}, 'Zoom in (+)', '#7a1022', 18); btn(LW - 90, 6, 24, 22, '-', () => {MAP.z = Math.max(.8, MAP.z / 1.4)}, 'Zoom out (-)', '#7a1022', 18); btn(LW - 62, 6, 28, 22, '1:1', () => {MAP.z = 1}, 'Reset', '#7a1022', 12);
  // legend
  let lx = 14; const ly = LH - 22; ['h', 't', 'm', 'x', 'g', 'j', 'b'].forEach(k => {placeGlyph(k, lx + 8, ly, 8); tx(KIND_SHORT[k], lx + 20, ly + 4, '#e8dcc0', 12, F_T); lx += 28 + tw(KIND_SHORT[k], 12)});
  X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(lx + 8, ly, 8, 0, 7); X.fill(); X.fillStyle = '#3a1a00'; X.fillRect(lx + 7, ly - 5, 2, 6); X.fillRect(lx + 7, ly + 3, 2, 2); tx('Mission', lx + 20, ly + 4, '#e8dcc0', 12); lx += 70; X.fillStyle = '#ff3b3b'; X.beginPath(); X.arc(lx + 8, ly, 6, 0, 7); X.fill(); tx('You', lx + 20, ly + 4, '#e8dcc0', 12);
  tx('Drag to move   Wheel to zoom   M / Esc to close', LW / 2, LH - 6, '#8a7a64', 11, F_T, 'center')}
// ---------- guide ----------
const GUIDE_TABS = ['Controls', 'Battle', 'Weapons', 'Enemies', 'Missions', 'Places', 'Map and Journal', 'Music and Menu'];
function keycap(x, y, t, w) {const ww = w || Math.max(18, tw(t, 14) + 10); X.fillStyle = '#e8dcc0'; X.fillRect(x, y, ww, 20); X.fillStyle = '#b9a98a'; X.fillRect(x, y + 17, ww, 3); X.strokeStyle = '#4a2a10'; X.lineWidth = 1; X.strokeRect(x + .5, y + .5, ww - 1, 19); tx(t, x + ww / 2, y + 14, '#3a1a00', 14, F_T, 'center', false); return ww}
function gline(x, y, t, w, c = PAL.cream, sz = 15) {wrapT(t, w, sz).forEach((l, i) => tx(l, x, y + i * (sz + 2), c, sz)); return wrapT(t, w, sz).length * (sz + 2)}
const GUIDE_PAGES = [
  function controls(x, y) {let yy = y; const rows = [[['W', 'A', 'S', 'D'], 'Walk (or use the arrow keys)'], [['Shift'], 'Hold to run'], [['Space', 'F'], 'Talk, read, open, swim'], [['E'], 'Bag: items, weapons and search'], [['C'], 'Your stats'], [['J'], 'Journal: current missions'], [['M'], 'Map of the city'], [['Q'], 'Drink chai to heal 30 HP'], [['G'], 'This guide'], [['N'], 'Music on / off'], [['Esc'], 'Menu, settings and save']];
    rows.forEach(([ks, t]) => {let kx = x; ks.forEach(k => {kx += keycap(kx, yy, k) + 4}); tx(t, x + 120, yy + 15, PAL.cream, 15); yy += 26}); gline(x, yy + 8, 'You can also click the icons at the top right of the screen.', 300, '#ffd36b'); return yy - y + 40},
  function battle(x, y) {let yy = y; const btns = [['pow', '#c1440e', 'POWER', 'Steady damage. 88% to hit.'], ['sharp', '#1f6f9a', 'SHARP', 'Quick, 92% to hit and often a critical.'], ['heavy', '#7b2cbf', 'HEAVY', 'Huge damage but only 78% to hit.'], ['chai', '#2f8f5a', 'CHAI', 'Heals 30 HP. Uses your turn.'], ['run', '#a07a1a', 'RUN', '80% to escape gangsters. The enemy leaves for 30 seconds. Not from guards or bosses.'], ['bag', '#6b4423', 'BAG', 'Switch weapon or use items. It uses your turn.']];
    btns.forEach(([k, c, n, t]) => {X.fillStyle = c; X.fillRect(x, yy, 64, 22); X.strokeStyle = PAL.gold; X.lineWidth = 1.5; X.strokeRect(x + .75, yy + .75, 62.5, 20.5); tx(n, x + 32, yy + 16, PAL.cream, 15, F_T, 'center'); const h = gline(x + 76, yy + 15, t, 236); yy += Math.max(30, h + 10)});
    yy += 6; return yy - y + gline(x, yy + 10, 'Hover over a move with the mouse to read what it does. Number keys 1-6 also work. Enemies show their level; higher level means more XP. Bosses get angry below half HP and heal once.', 312, '#ffd36b')},
  function weapons(x, y) {let yy = y; const ids = Object.keys(ITEMS); ids.forEach((id, i) => {const bx = x + i * 40, sel = GD.w == i; hit(bx, yy, 36, 34, () => {GD.w = i}, ITEMS[id].n); X.fillStyle = sel ? 'rgba(193,68,14,.7)' : 'rgba(0,0,0,.3)'; X.fillRect(bx, yy, 36, 34); X.strokeStyle = sel ? '#ffd36b' : '#6b4a2a'; X.strokeRect(bx + .5, yy + .5, 35, 33); itemIcon(id, bx + 8, yy + 7, 1)}); yy += 48;
    const id = ids[GD.w || 0], it = ITEMS[id]; tx(it.n, x, yy, '#ffd36b', 17, F_R); yy += 18; yy += gline(x, yy + 4, it.desc + (it.price ? '  (Shop price: Rs.' + it.price + ')' : '  (Reward: find it by playing)'), 312, '#d8c9ad');
    [['Strength', it.str, '#e63946'], ['Weight', it.wt, '#e0b04a'], ['Sharpness', it.sharp, '#7ec8ff'], ['Power', it.pow, '#c9a0ff']].forEach(([n, v, c], i) => {tx(n, x, yy + 22 + i * 17, '#c9b79a', 14); bar(x + 76, yy + 15 + i * 17, 150, v, 12, c, 7)}); yy += 96;
    it.moves.forEach(m => {tx(m.n, x, yy, m.k == 'pow' ? '#ff9a6a' : m.k == 'sharp' ? '#7ec8ff' : '#c9a0ff', 15); yy += 15; yy += gline(x + 8, yy + 2, moveTip(m), 304, '#d8c9ad', 13) + 6}); return yy - y},
  function enemies(x, y) {let yy = y; const rows = [['chillar', 'Chillar', 'A small-time street kid. Fast but weak. Good XP for beginners.'], ['chapri', 'Chapri', 'Loud, flashy, with a gold chain. Medium strength.'], ['awara', 'Awara', 'A roaming layabout with a cycle chain. Hits harder.'], ['goonda', 'Goonda Enforcer', 'Guards the hideout gate. Very tough. Cannot be escaped.'], ['don1', 'Bade Bhai', 'Boss of Hyderabad. 179 HP, enrages below half health.'], ['don2', 'Tiger Anna', 'Boss of Secunderabad. Fierce, with tiger-print scarf.']];
    rows.forEach(([k, n, t]) => {X.fillStyle = 'rgba(255,200,120,.1)'; X.fillRect(x, yy, 54, 62); X.save(); X.beginPath(); X.rect(x, yy, 54, 62); X.clip(); drawChar(x + 2, yy - 4, LOOKF[FOES[k].look], 'down', 0, 1.7); X.restore(); tx(n, x + 64, yy + 16, '#ffd36b', 16, F_R); gline(x + 64, yy + 32, t, 248, PAL.cream, 14); yy += 70});
    return yy - y + gline(x, yy + 6, 'Enemies get stronger every time you finish a mission or reach a new city. They are never animals, only gangsters.', 312, '#ffb88a')},
  function missions(x, y) {let yy = y; const row = (f, t) => {f(x, yy); const h = gline(x + 46, yy + 16, t, 266); yy += Math.max(44, h + 12)};
    row((a, b) => {X.fillStyle = '#ffd36b'; X.beginPath(); X.arc(a + 16, b + 14, 13, 0, 7); X.fill(); tx('!', a + 16, b + 22, '#3a1a00', 20, F_R, 'center', false)}, 'People with a yellow ! have a mission. Talk to them with Space.');
    row((a, b) => {rc('rgba(255,255,255,.3)', a + 6, b + 4, 20, 20); rc('#f2c94c', a + 14, b + 2, 4, 24)}, 'A golden sparkle on the ground hides an item. Walk onto it.');
    row((a, b) => {rc('#8c7a5a', a + 8, b + 14, 16, 12); rc('#c2792c', a + 10, b + 6, 12, 8); rc('#ffe14d', a + 14, b - 2, 4, 9)}, 'Puzzles: light the diyas or set the signals in the right order. Ask the guide for the riddle.');
    row((a, b) => {rc('#f4e6b0', a + 2, b + 4, 28, 22); rc('#d2b86c', a + 12, b + 4, 1, 22); rc('#c1121f', a + 18, b + 14, 6, 2)}, 'Collect 3 torn map pieces to reveal the hideout on your map.');
    row((a, b) => {rc('#5b3a1e', a + 4, b + 2, 24, 28); rc('#c1121f', a + 12, b + 10, 8, 10); rc('#f2c94c', a + 14, b + 13, 4, 4)}, 'The hideout gate has a 4-digit lock. Missions give you the first three digits. Find the last by trying 0 to 9.');
    return yy - y},
  function places(x, y) {let yy = y; ['h', 't', 'm', 'x', 'g', 'j', 'b'].forEach(k => {placeGlyph(k, x + 16, yy + 16, 14); tx(KIND_NAME[k], x + 40, yy + 14, '#ffd36b', 15, F_R); const t = {h: 'Walk inside to heal fully. The nurse waits at the desk.', t: 'Pandit-ji, bells, diyas and prasad.', m: 'A peaceful prayer hall with an Imam.', x: 'Pews, candles and Father Thomas.', g: 'The langar hall and the Granthi.', j: 'White marble and a quiet Muni.', b: 'A calm hall with a Bhikkhu.'}[k]; gline(x + 40, yy + 29, t, 270, PAL.cream, 14); yy += 46});
    return yy - y + gline(x, yy + 4, 'Houses have owners who do not like visitors! Shops sell chai and weapons. Auto-rickshaws drive around the roads. Face water and press Space to swim.', 312, '#ffb88a')},
  function mapjour(x, y) {let yy = y + gline(x, y + 14, 'M opens the map. It shows everything you have explored, with names. Small symbols mark hospitals and places of worship. Yellow ! marks missions. The red blinking circle is you.', 312); yy += 12;
    yy += gline(x, yy + 14, 'Zoom with the wheel or the + and - buttons, and drag to move. Hover over a circle to read its name.', 312, '#d8c9ad') + 12;
    yy += gline(x, yy + 14, 'J opens the journal. It shows only your current missions and any lock digits you have found. Completed missions are folded away.', 312) + 12; return yy - y},
  function music(x, y) {let yy = y + gline(x, y + 14, 'The game plays original warm music. Press N to turn it on or off, or open the menu with Esc to change the volume.', 312); yy += 8;
    yy += gline(x, yy + 14, 'In the menu you can also change how far you can see (view distance), save your game, or log out. Your progress is saved in this browser under your name.', 312, '#d8c9ad') + 8;
    tx('Music', x, yy + 24, '#ffd36b', 15, F_R); bar(x + 60, yy + 17, 200, SET.mus, 1, '#e0b04a', 8); tx('Effects', x, yy + 46, '#ffd36b', 15, F_R); bar(x + 60, yy + 39, 200, SET.sfx, 1, '#7ec8ff', 8); return yy - y + 60}];
function drawGuide() {
  uiModal(); panel(() => {ibox(10, 8, 460, 336); plate(240, -6, 'Guide', 16); closeBtn(442, 14, () => {PNL = null});
    GUIDE_TABS.forEach((n, i) => {const y = 40 + i * 33, sel = GD.tab == i, ov = hit(20, y, 110, 28, () => {GD.tab = i; GD.sc = 0}, ''); X.fillStyle = sel ? '#c1440e' : ov ? '#8a1c30' : 'rgba(0,0,0,.35)'; X.fillRect(20, y, 110, 28); X.strokeStyle = sel ? '#ffd36b' : '#6b4a2a'; X.lineWidth = 1.5; X.strokeRect(20.75, y + .75, 108.5, 26.5); tx(n, 75, y + 19, PAL.cream, 14, F_T, 'center')});
    X.fillStyle = 'rgba(0,0,0,.28)'; X.fillRect(140, 38, 318, 296); X.strokeStyle = 'rgba(224,176,74,.5)'; X.strokeRect(140.5, 38.5, 317, 295);
    X.save(); X.beginPath(); X.rect(141, 39, 316, 294); X.clip(); const hh = GUIDE_PAGES[GD.tab](150, 46 - (GD.sc || 0)); X.restore(); GD.max = Math.max(0, hh - 270);
    if (GD.max > 0) {const th = 294 * 270 / (270 + GD.max); rc('rgba(255,255,255,.18)', 452, 40, 4, 292); rc('#e0b04a', 452, 40 + (292 - th) * (GD.sc / GD.max), 4, th); tx('scroll for more', 300, 332, '#9c8a74', 11, F_T, 'center')}}, 480, 352)}
// ---------- menu ----------
const MENU_ROWS = ['Resume', 'View distance', 'Music volume', 'Sound effects', 'Music', 'Guide', 'Save game', 'Save and log out'], ZN = ['Very far', 'Far', 'Normal', 'Close', 'Very close'];
function menuAct(i, dir) {
  if (i == 0 && !dir) MENU = null;
  else if (i == 1 && dir) {SET.zoom = Math.max(0, Math.min(4, SET.zoom + dir)); saveSettings(); fit()}
  else if (i == 2 && dir) setVol('mus', SET.mus + dir * .1); else if (i == 3 && dir) {setVol('sfx', SET.sfx + dir * .1); sfx('select')}
  else if (i == 4) setMusic(!SET.musOn); else if (i == 5 && !dir) {MENU = null; togglePnl('guide')}
  else if (i == 6 && !dir) {save(); toast('Game saved'); MENU = null} else if (i == 7 && !dir) {save(); location.reload()}}
function menuKey(k) {const n = MENU_ROWS.length; if (k == 'Escape') MENU = null; else if (k == 'ArrowUp' || k == 'w') MENU.sel = (MENU.sel + n - 1) % n; else if (k == 'ArrowDown' || k == 's') MENU.sel = (MENU.sel + 1) % n;
  else if (k == 'ArrowLeft' || k == 'a') menuAct(MENU.sel, -1); else if (k == 'ArrowRight' || k == 'd') menuAct(MENU.sel, 1); else if (k == ' ' || k == 'Enter' || k == 'f') menuAct(MENU.sel, 0)}
function drawMenu() {
  uiModal(); panel(() => {ibox(70, 18, 340, 316); plate(240, 4, 'Paused', 16);
    MENU_ROWS.forEach((n, i) => {const y = 54 + i * 33, sel = MENU.sel == i, ov = hit(86, y, 308, 28, () => {MENU.sel = i; menuAct(i, 0)}, ''); X.fillStyle = sel ? 'rgba(193,68,14,.7)' : ov ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.3)'; X.fillRect(86, y, 308, 28); X.strokeStyle = sel ? '#ffd36b' : '#6b4a2a'; X.lineWidth = 1.5; X.strokeRect(86.75, y + .75, 306.5, 26.5); tx(n, 100, y + 19, PAL.cream, 16);
      const arrows = i == 1 || i == 2 || i == 3; let val = '';
      if (i == 1) val = ZN[SET.zoom]; if (i == 4) val = SET.musOn ? 'ON' : 'OFF (paused)';
      if (arrows) {btn(244, y + 3, 22, 22, '<', () => {MENU.sel = i; menuAct(i, -1)}, '', '#4a2a10', 14); btn(370, y + 3, 22, 22, '>', () => {MENU.sel = i; menuAct(i, 1)}, '', '#4a2a10', 14);
        if (i == 1) tx(val, 318, y + 19, '#ffd36b', 15, F_T, 'center'); else {const v = i == 2 ? SET.mus : SET.sfx; hit(270, y + 6, 96, 16, () => {const f = Math.max(0, Math.min(1, (MOUSE.x - UT.ox - 270 * UT.s) / (96 * UT.s))); setVol(i == 2 ? 'mus' : 'sfx', f)}, 'Click to set the volume'); bar(270, y + 10, 96, v, 1, i == 2 ? '#e0b04a' : '#7ec8ff', 8); tx(Math.round(v * 100) + '%', 318, y + 8, '#ffd36b', 10, F_T, 'center')}}
      else if (val) tx(val, 380, y + 19, SET.musOn || i != 4 ? '#7ee08a' : '#ff8a6a', 15, F_T, 'right')});
    tx('Up / Down: choose   Left / Right: change   Enter: select', 240, 322, '#9c8a74', 12, F_T, 'center')}, 480, 352)}

