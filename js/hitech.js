// ===== Hitech City - multi-floor towers with lifts, keycards, vehicles, auto rides, art =====
const TOWERS = {
  'Cyber Gateway':{floors:7,names:['Grand Lobby','Open Office','Food Court','Server Hall','Boardroom Floor','Innovation Lab','Sky Terrace'],themes:['lobby','office','food','server','boss','lab','terrace']},
  'Cyber Towers':{floors:5,names:['Reception','Call Centre','Canteen','Executive Suites','Roof Garden'],themes:['lobby','office','food','boss','terrace']},
  'Sattva Knowledge Park':{floors:4,names:['Reception','Training Rooms','Research Lab','Auditorium'],themes:['lobby','class','lab','audit']},
  'ITC Kohenur':{floors:5,names:['Grand Lobby','Royal Restaurant','Luxury Suites','Spa & Gym','Rooftop Pool'],themes:['hotel','restaurant','suites','spa','pool']},
  'My Home Bhooja':{floors:5,names:['Reception','Flats A','Flats B','Flats C','Terrace'],themes:['lobby','apt','apt','apt','terrace']}};
const FLOOR_FL = {lobby:[['#e8e4dc','#ddd8cc'],'#c8d4e0'],office:[['#6f86a8','#667c9d'],'#cfd8e6'],food:[['#d8c3a0','#cdb68f'],'#f0d9b5'],server:[['#20283a','#1b2233'],'#2a3550'],boss:[['#7a5230','#6e4a2c'],'#4a3a30'],
  lab:[['#e6eef2','#d8e4ea'],'#e8f2f6'],terrace:[['#8a8f98','#80858e'],'#35405a'],hotel:[['#e8d9b0','#dfcd9e'],'#7a1022'],restaurant:[['#c9a26b','#bd965f'],'#5a1a24'],suites:[['#b9a0c8','#af96be'],'#e8d8f0'],
  spa:[['#bfe0e8','#b3d6de'],'#e0f4f8'],pool:[['#d8c8a0','#cebe96'],'#2a3a5a'],apt:[['#c4a07a','#b8946d'],'#f2e1c4'],class:[['#c9b890','#bfae86'],'#e8dcc0'],audit:[['#5a2a3a','#512333'],'#3a1a26']};
const OFFICE_SAY = ['Please do not disturb me, I have a deadline in five minutes.','The Wi-Fi is down again. Of course it is.','Meeting at 4. Meeting at 5. Meeting at 6. Send help.','Bro, is this a team outing? Because I am NOT on the invite.','Arre yaar, who left the printer jammed again?','Ee Monday ela undi ra baabu... coffee kavali!','Sir, appraisal kab aayega? Still waiting since 2019.','I am on mute. Please speak slowly.','Nakko re, aaj overtime nakko!','Hau miya, the server is down, ask the sysadmin!'];
const bldIdx = (map, name) => MAPS[map].blds.findIndex(b => b[6] == name);
function ensureMap(id) {if (MAPS[id]) return; const m = id.match(/^in_([a-z]+)_(\d+)(?:_f(\d+))?$/); if (!m) return; const mp = m[1], i = +m[2], f = +(m[3] || 0), b = MAPS[mp].blds[i];
  const I = b[7] == 'z' ? makeTowerFloor(b, mp, i, f) : makeInterior(b, mp, i); if (mp == 'sec' && b[6] == 'Clock Tower') I.deco.push([2, 10, 1, 1, 'parcelq']); MAPS[id] = I}
function makeTowerFloor(b, pm, idx, f) {
  const name = b[6], T0 = TOWERS[name] || {floors: 3, names: ['Lobby', 'Floor 2', 'Roof'], themes: ['lobby', 'office', 'terrace']}, n = T0.floors, w = 19, h = 13, dx = w >> 1, th = T0.themes[f], [fl, wallc] = FLOOR_FL[th],
    R = mkRng((idx * 977 + f * 131 + name.length * 17) >>> 0), pick = a => a[Math.floor(R() * a.length)], furn = [[0, 0, w, 2, 'wall'], [0, 2, 1, h - 3, 'wall'], [w - 1, 2, 1, h - 3, 'wall']], deco = [], wd = [], npcs = [];
  if (f == 0) furn.push([0, h - 1, dx, 1, 'wall'], [dx + 1, h - 1, w - dx - 1, 1, 'wall']); else furn.push([0, h - 1, w, 1, 'wall']);
  furn.push([w - 4, 2, 2, 2, 'lift']); const L = (x, y, ww, hh, k) => furn.push([x, y, ww, hh, k]), D = (x, y, ww, hh, k) => deco.push([x, y, ww, hh, k]);
  const npc = (x, y, nm, say, o) => npcs.push(Object.assign({x, y, L: genLook(R), name: nm, say: Array.isArray(say) ? say : [say]}, o || {}));
  for (let x = 2; x < w - 6; x += 4) wd.push([x, th == 'terrace' || th == 'pool' ? 'skyline' : 'cityview']);
  let cards = null, rude = 0;
  if (th == 'lobby' || th == 'hotel') {L(4, 3, 6, 1, 'reception'); L(2, 3, 1, 1, 'plant'); L(11, 3, 1, 1, 'plant'); L(3, 9, 2, 1, 'sofa'); L(w - 8, 9, 2, 1, 'sofa'); L(6, 7, 1, 1, 'pillar'); L(12, 7, 1, 1, 'pillar'); L(1, 11, 1, 1, 'plant'); L(w - 2, 11, 1, 1, 'plant'); D(dx - 3, 6, 6, 3, 'rug');
    wd.push([dx, 'logo']); npc(7, 5, th == 'hotel' ? 'Concierge Arjun' : 'Receptionist Divya', th == 'hotel' ? ['Welcome to ITC Kohenur, sir. May I take your bag? Er, your... cricket bat?'] : ['Welcome to ' + name + '. Please use the lift in the corner to reach the other floors.', 'No, you cannot just walk in and ask for the CEO. Yes, I have heard that before.'])}
  if (th == 'office') {for (const [cx0, cy0] of [[2, 6], [6, 6], [10, 6], [2, 9], [6, 9], [10, 9], [14, 9]]) L(cx0, cy0, 2, 1, 'cubicle'); L(14, 6, 2, 1, 'cooler'); L(2, 4, 1, 1, 'plant'); wd.push([dx, 'wboard']);
    npc(5, 8, 'Analyst Rohit', pick(OFFICE_SAY), {}); npc(9, 8, 'Manager Sunita', pick(OFFICE_SAY), {}); npc(13, 11, 'Intern Sai', pick(OFFICE_SAY), {})}
  if (th == 'food') {for (const [tx0, ty0] of [[3, 5], [8, 5], [3, 9], [8, 9], [13, 9]]) L(tx0, ty0, 2, 2, 'table'); L(2, 3, 6, 1, 'counter'); L(9, 3, 3, 1, 'pots'); L(1, 4, 1, 2, 'fridge'); D(12, 6, 5, 2, 'rug'); npc(5, 4, 'Cook Ramesh', ['Hot idlis, crispy dosas, spicy biryani. Everything the engineers need.', 'Eat first. Debug later.']); npc(11, 8, 'Techie Pooja', pick(OFFICE_SAY))}
  if (th == 'server') {for (let x = 2; x < 13; x += 2) {L(x, 3, 1, 2, 'rack'); L(x, 8, 1, 2, 'rack')} D(2, 5, 11, 3, 'grid'); wd.push([dx, 'screens']); npc(14, 7, 'Sysadmin Bot-7', ['BEEP. Server Hall is cold on purpose. Do not touch the racks.', 'Uptime: 99.9 percent. Morale: 3 percent.'])}
  if (th == 'boss') {L(dx - 3, 4, 6, 1, 'bigdesk'); L(4, 7, 9, 2, 'longtable'); L(2, 3, 5, 1, 'books'); L(12, 3, 1, 1, 'plant'); L(1, 11, 1, 1, 'plant'); D(dx - 4, 6, 8, 4, 'rug'); wd.push([dx, 'logo']); npc(dx, 6, 'Executive Assistant Karthik', ['The CEO is not in. Or in a meeting. Or on a call. Or abroad. Pick one.', 'Honestly, RIG Ritesh has been in a "meeting" for weeks.'])}
  if (th == 'lab') {for (const [bx, by] of [[3, 5], [9, 5], [3, 8], [9, 8]]) L(bx, by, 4, 1, 'labbench'); L(14, 8, 2, 1, 'xray'); L(1, 11, 2, 1, 'medcab'); npc(7, 11, 'Dr. Lakshmi', ['Our experiment is stable. Mostly. Please do not touch anything that glows.', 'The last intern touched something that glowed. We do not talk about it.'])}
  if (th == 'terrace') {L(3, 3, 1, 1, 'plant'); L(8, 3, 1, 1, 'plant'); L(13, 3, 1, 1, 'plant'); L(3, 8, 3, 1, 'bench'); L(10, 8, 3, 1, 'bench'); L(7, 5, 2, 2, 'fountain'); D(4, 5, 10, 5, 'helipad'); npc(14, 10, 'Security Guard Naidu', ['The view from up here is the best in Hyderabad. At night especially.', 'Do not lean on the railing. Last guy tried. He is fine. He is in Yashoda.'])}
  if (th == 'class') {for (const [bx, by] of [[3, 5], [7, 5], [11, 5], [3, 8], [7, 8], [11, 8]]) L(bx, by, 2, 1, 'desk'); L(2, 3, 8, 1, 'books'); wd.push([dx, 'wboard']); npc(14, 8, 'Trainer Prasad', ['Today we learn recursion. To learn recursion, see: today we learn recursion.', 'Please do not sleep in the back row.'])}
  if (th == 'audit') {for (let r = 0; r < 3; r++) L(3, 7 + r * 2, 9, 1, 'seats'); L(3, 3, 9, 2, 'stage'); npc(14, 9, 'Event Manager Zoya', ['The keynote starts at 9. The projector starts at never.'])}
  if (th == 'restaurant') {for (const [tx0, ty0] of [[3, 5], [8, 5], [3, 9], [8, 9], [13, 9]]) L(tx0, ty0, 2, 2, 'table'); L(2, 3, 5, 1, 'counter'); L(9, 3, 4, 1, 'pots'); D(11, 6, 6, 2, 'rug'); npc(6, 4, 'Chef Vikram\'s Sous-Chef', ['Royal Dum Biryani, Haleem, Kebabs... the Nizam would be proud.']); npc(12, 8, 'Guest Mr. Reddy', ['I came for dinner. Stayed for the biryani. Staying for dessert.'])}
  if (th == 'suites') {L(2, 3, 3, 2, 'bed'); L(7, 3, 3, 2, 'bed'); L(2, 8, 3, 2, 'bed'); L(7, 8, 3, 2, 'bed'); L(12, 8, 2, 1, 'sofa'); L(14, 6, 2, 1, 'tv'); D(5, 6, 8, 2, 'rug'); npc(13, 10, 'Housekeeping Meena', ['Please do not jump on the beds. Last guest did. He is still bouncing in my nightmares.'])}
  if (th == 'spa') {L(3, 4, 8, 3, 'poolwater'); L(3, 8, 2, 1, 'lounger'); L(7, 8, 2, 1, 'lounger'); L(2, 3, 1, 1, 'plant'); L(13, 6, 1, 2, 'plant'); npc(12, 9, 'Therapist Anjali', ['Breathe in. Breathe out. Do NOT check your email.'])}
  if (th == 'pool') {L(3, 4, 11, 4, 'poolwater'); L(3, 9, 2, 1, 'lounger'); L(7, 9, 2, 1, 'lounger'); L(11, 9, 2, 1, 'lounger'); L(2, 3, 1, 1, 'plant'); L(15, 7, 1, 1, 'plant'); npc(15, 10, 'Lifeguard Bheem', ['The pool is closed for swimming. You may stare at it.'])}
  if (th == 'apt') {rude = 1; L(2, 3, 3, 2, 'cot'); L(7, 3, 2, 1, 'tv'); L(2, 8, 2, 1, 'sofa'); L(8, 8, 1, 2, 'fridge'); L(12, 8, 2, 1, 'table'); L(12, 3, 2, 1, 'almirah'); D(4, 6, 6, 3, 'rug'); const lg = ['mix', 'tgl', 'en'];
    for (let k = 0; k < 3; k++) npc([6, 11, 13][k], [6, 10, 11][k], pick(POOL.nameM.concat(POOL.nameF)), pick(RUDE[lg[(idx + f + k) % 3]]), {rude: 1})}
  // keycards of Cyber Gateway: one on four different floors
  if (name == 'Cyber Gateway') {const C = {1: ['RED', 3, 4], 3: ['BLUE', 5, 6], 5: ['GREEN', 2, 11], 6: ['GOLD', 3, 10]}[f]; if (C) {L(C[1], C[2], 1, 1, 'card:' + C[0]); cards = {x: C[1], y: C[2], col: C[0]}}}
  const I = {name: name + ' (inside)', w, h, start: f == 0 ? [dx, h - 2] : [w - 4, 4], indoor: 1, shopOf: pm, kind: 'tower', floor: f, floors: n, floorName: T0.names[f], towerOf: name, noDoor: f > 0, fl, wall: wallc, roads: [], plaza: [], blds: [], stalls: [], kiosks: [], lamps: [], animals: [], foes: [], furn, deco, wd, props: [], palms: [], pz: [], autos: [], spots: {}, chests: [],
    liftRect: [w - 4, 2, 2, 2], cardAt: cards, rudeOnEnter: rude, exits: f == 0 ? [{x: dx, y: h - 1, to: 'RET'}] : [], npcs};
  if (name == 'Sattva Knowledge Park' && f == 2) deco.push([3, 10, 1, 1, 'laptopq']); return I}
function openLift(d) {const base = S.map.replace(/_f\d+$/, ''), opts = [], ids = [];
  for (let f = 0; f < d.floors; f++) if (f != d.floor) {opts.push('Floor ' + (f + 1) + ': ' + TOWERS[d.towerOf].names[f]); ids.push(f)} opts.push('Stay here'); sfx('select');
  CHO = {title: 'Lift', q: 'You press the lift button. You are on floor ' + (d.floor + 1) + ' of ' + d.floors + '. Where to?', opts, cb: i => {CHO = null; if (i >= ids.length) return; goFloor(base, ids[i])}}}
function goFloor(base, f) {const id = base + (f ? '_f' + f : ''); ensureMap(id); const I = MAPS[id]; sfx('door'); S.dir = 'down'; changeMap(id, S.map == id ? S.x : I.liftStart ? I.liftStart[0] : I.w - 4, 4);
  setTimeout(() => {toast('Floor ' + (f + 1) + ': ' + I.floorName); if (I.rudeOnEnter) {const o = I.npcs[0]; if (o) say(o.say, null, o.name, o.L)}}, 100)}
function interactX(fx, fy, d) {
  if (d.liftRect) {const [l, t, w, h] = d.liftRect; if (fx >= l && fx < l + w && fy >= t && fy < t + h) {openLift(d); return true}}
  if (d.cardAt && d.cardAt.x == fx && d.cardAt.y == fy) {const c = d.cardAt;
    if (S.cards[c.col]) {toast('You already took the ' + c.col + ' keycard.'); return true}
    if (S.flags.cards != 'active') {say(['A glowing ' + c.col + ' keycard lies here. This must be what Chief Rao is looking for. Talk to him first (near the Cyber Gateway entrance).']); return true}
    S.cards[c.col] = 1; sfx('coin'); const n = Object.keys(S.cards).length; if (n >= 4) {S.flags.cards = 'found'; say(['You picked up the ' + c.col + ' keycard! (4/4)', 'That is all four! Take them to Chief Rao outside.'])} else toast('You picked up the ' + c.col + ' keycard! (' + n + '/4)'); save(); return true}
  return false}
function insideFind() {const d = cur().d; for (const k in QUESTS) {const Q = QUESTS[k]; if (Q.inside && S.flags[k] == 'active' && Q.map == cityOf()) {const i = bldIdx(Q.map, Q.inside.bld), id = 'in_' + Q.map + '_' + i + (Q.inside.floor ? '_f' + Q.inside.floor : '');
    if (S.map == id && S.x == Q.inside.at[0] && S.y == Q.inside.at[1]) {S.flags[k] = 'found'; sfx('coin'); say([Q.found]); save()}}}}
function cardsTalk(e) {const f = S.flags, Q = QUESTS.cards, w = (l, cb) => say(l, cb, e.name, e.L), st = f.cards;
  if (!st) return w(Q.ask, () => {f.cards = 'active'; save()}); if (st == 'active') return w(Q.wait); if (st == 'found') return w(Q.turnin, () => {finishQuest('cards')}); w(Q.after)}
// ---------- auto rickshaw rides ----------
function autoTalk(e) {sfx('honk'); CHO = {title: 'Auto Driver', q: 'Beep beep! Where to, bhai? A ride anywhere in the city is Rs.100.', opts: ['Take me somewhere (Rs.100)', 'No thanks'], cb: i => {CHO = null; if (i == 0) {if (S.money < 100) {sfx('wrong'); return toast('You need Rs.100 for the auto.')} pickDrop(e)}}}}
function dropSpot(d, g, tx, ty) {for (let r = 0; r <= 5; r++) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {if (Math.max(Math.abs(i), Math.abs(j)) != r) continue; const x = tx + i, y = ty + j; if (x < 2 || y < 2 || x >= d.w - 2 || y >= d.h - 2) continue; const c = g[y][x]; const lr = d.lairRect, inLair = lr && !S.flags['gate_' + cityOf()] && x >= lr[0] - 1 && x <= lr[0] + lr[2] && y >= lr[1] - 1 && y <= lr[1] + lr[3]; if (!inLair && !c.s && !c.dr && (c.t == 1 || c.t == 2 || c.t == 6) && !ents.some(e => e.x == x && e.y == y)) return [x, y]} return null}
function pickDrop(auto) {
  const id = cityOf(), d = MAPS[id], g = cur().g, img = mapImg(id), bw = Math.ceil(d.w / 4), seen = S.seen[id] || [];
  MOD = {key(k) {if (k == 'Escape') MOD = null}, press() {},
    draw() {rc('#100810', 0, 0, LW, LH); const top = 44, bot = 44, aw = LW - 16, ah = LH - top - bot, s = Math.min(aw / img.width, ah / img.height), ox = (LW - img.width * s) / 2, oy = top + (ah - img.height * s) / 2, k = T * .5 * s;
      X.imageSmoothingEnabled = false; X.drawImage(img, ox, oy, img.width * s, img.height * s); X.fillStyle = 'rgba(10,5,14,.96)'; X.beginPath(); for (let by = 0; by < Math.ceil(d.h / 4); by++) for (let bx = 0; bx < bw; bx++) if (!seen[by * bw + bx]) X.rect(ox + bx * 4 * k, oy + by * 4 * k, 4 * k + 1, 4 * k + 1); X.fill();
      tx('Where to? Click a spot on the map. Auto fare: Rs.100', LW / 2, 24, '#ffd36b', 17, F_R, 'center');
      const mx = Math.floor((MOUSE.x - ox) / k), my = Math.floor((MOUSE.y - oy) / k), inside = mx >= 0 && my >= 0 && mx < d.w && my < d.h, isSeen = inside && !!seen[(my >> 2) * bw + (mx >> 2)], spot = inside && isSeen ? dropSpot(d, g, mx, my) : null;
      hit(ox, oy, img.width * s, img.height * s, () => {if (!spot) return toast('Pick a spot you have already explored (road or plaza).'); S.money -= 100; sfx('honk'); MOD = null; fade = 40; S.x = S.px = spot[0]; S.y = S.py = spot[1]; S.grace = 60; reveal();
        const q = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(o => [spot[0] + o[0], spot[1] + o[1]]).find(q => free(q[0], q[1], auto)); if (q) {auto.x = auto.px = q[0]; auto.y = auto.py = q[1]; auto.path = []; auto.rest = 300} say(['Beep beep! We have arrived, bhai. That will be Rs.100. Mind the traffic!'], null, 'Auto Driver', null); save()}, '');
      if (spot) {const px = ox + (spot[0] + .5) * k, py = oy + (spot[1] + .5) * k; X.strokeStyle = '#ffd34d'; X.lineWidth = 2; X.beginPath(); X.arc(px, py, 7 + Math.sin(tick / 6) * 2, 0, 7); X.stroke(); rc('#ffd34d', px - 2, py - 2, 4, 4);
        const nb = d.blds.filter(b => !HOME_NAMES.includes(b[6]) && Math.abs(b[0] + b[2] / 2 - spot[0]) < 9 && Math.abs(b[1] + b[3] / 2 - spot[1]) < 7)[0]; tx(nb ? 'Drop near: ' + nb[6] : 'Drop here', LW / 2, LH - 30, '#fff', 15, F_T, 'center')}
      const px2 = ox + (S.x + .5) * k, py2 = oy + (S.y + .5) * k; rc('#e63946', px2 - 3, py2 - 3, 6, 6); btn(LW / 2 - 40, LH - 26, 80, 20, 'Cancel', () => {MOD = null}, 'Esc', '#4a2a10', 14)}}}
// ---------- drawing: towers, interiors, vehicles, extras ----------
function drawTower(b) {
  const [x, y, w, h, roof, wall, name] = b, px = x * T, py = y * T, W = w * T, Hh = h * T, fl = (TOWERS[name] || {floors: 4}).floors, up = fl * 15 + 30, top = py + Hh * .42 - up, bh = py + Hh - top;
  rc('rgba(0,0,0,.28)', px + 4, py + Hh - 4, W + 6, 8); rc(wall, px, top, W, bh); rc('rgba(0,0,0,.18)', px + W - 10, top, 10, bh); rc('rgba(255,255,255,.18)', px, top, 5, bh);
  for (let j = 0; j < Math.floor((bh - 44) / 13); j++) for (let i = 0; i < Math.floor((W - 14) / 14); i++) {const lit = (H(x * 7 + i, y * 3 + j) % 5) != 0 && ((H(i * 5, j * 11 + x) + (tick >> 8)) % 7 != 0); rc(lit ? '#ffe9a0' : '#2a4a6a', px + 8 + i * 14, top + 10 + j * 13, 9, 8); rc('rgba(255,255,255,.35)', px + 8 + i * 14, top + 10 + j * 13, 9, 2)}
  rc(roof, px - 3, top - 6, W + 6, 8); rc('rgba(255,255,255,.3)', px - 3, top - 6, W + 6, 2); rc('#444', px + W / 2 - 1, top - 22, 2, 16); rc((tick >> 4) & 1 ? '#ff2a2a' : '#661010', px + W / 2 - 2, top - 24, 4, 4);
  const dc = w >> 1, dxx = px + dc * T; rc('#1b2a3a', dxx - 4, py + Hh - 36, 40, 36); rc('#8fd0f0', dxx - 2, py + Hh - 34, 17, 34); rc('#8fd0f0', dxx + 17, py + Hh - 34, 17, 34); rc('#fff', dxx + 14, py + Hh - 34, 3, 34); rc(roof, dxx - 8, py + Hh - 40, 48, 5);
  drawSign(px + W / 2, py + Hh - 50, W - 6, name, signStyle(name))}
function furnX(k, px, py, W, Hh, d) {
  if (k == 'lift') {rc('#6a7280', px, py, W, Hh); rc('#b8c0cc', px + 3, py + 3, W / 2 - 4, Hh - 4); rc('#b8c0cc', px + W / 2 + 1, py + 3, W / 2 - 4, Hh - 4); rc('#8a929e', px + W / 2 - 1, py + 3, 2, Hh - 4); rc('#111', px + W / 2 - 14, py - 2 + 4, 28, 10); tx(String((d.floor || 0) + 1), px + W / 2, py + 12, '#ff5a3a', 12, F_T, 'center', false); rc('#ffd34d', px + W + 2, py + Hh / 2, 3, 6)}
  else if (k == 'rack') {rc('#10141c', px + 2, py + 2, W - 4, Hh - 2); for (let j = 0; j < Hh / 8 - 1; j++) {rc('#222a38', px + 4, py + 6 + j * 8, W - 8, 5); rc((tick / 12 + j + px) % 3 < 1.5 ? '#3aff6a' : '#1a6a30', px + 6, py + 7 + j * 8, 3, 2); rc((tick / 9 + j * 2) % 4 < 1 ? '#ff9a3a' : '#5a3010', px + 12, py + 7 + j * 8, 3, 2)}}
  else if (k == 'cubicle') {rc('#9aa8c0', px, py + 2, W, 5); rc('#7f8ca8', px, py + 7, 3, Hh - 4); rc('#c9a26b', px + 4, py + 14, W - 8, Hh - 14); rc('#1a1a22', px + 14, py + 6, 18, 12); rc((tick >> 5) & 1 ? '#7ec8e3' : '#5aa8c8', px + 16, py + 8, 14, 8); rc('#333', px + 20, py + 18, 6, 2)}
  else if (k == 'bigdesk') {rc('#4a2c14', px, py + 8, W, Hh - 8); rc('#6a4020', px, py + 4, W, 8); rc('#111', px + W / 2 - 10, py - 4, 20, 14); rc('#7ec8e3', px + W / 2 - 8, py - 2, 16, 10); rc('#ffd36b', px + 6, py + 6, 10, 3)}
  else if (k == 'longtable') {rc('#3a2410', px, py + 6, W, Hh - 6); rc('#7a5230', px + 2, py + 3, W - 4, Hh - 8); for (let i = 20; i < W - 10; i += 30) {rc('#222', px + i, py + 8, 10, 6); rc('#222', px + i, py + Hh - 16, 10, 6)}}
  else if (k == 'labbench') {rc('#9aa8b0', px, py + 10, W, Hh - 10); rc('#e8eef2', px, py + 6, W, 6); for (let i = 6; i < W - 10; i += 22) {rc('#7ee0a0', px + i, py - 2, 8, 10); rc('#e8f4ff', px + i + 3, py - 6, 3, 6); rc('#ff7aa0', px + i + 12, py + 0, 7, 8)}}
  else if (k == 'poolwater') {rc('#e8eef2', px - 3, py - 3, W + 6, Hh + 6); rc('#2aa0d8', px, py, W, Hh); for (let i = 0; i < W; i += 18) for (let j = 0; j < Hh; j += 16) rc('rgba(255,255,255,.35)', px + i + 4 + Math.sin(tick / 14 + i + j) * 3, py + j + 6, 8, 2)}
  else if (k == 'lounger') {rc('#f4efe0', px + 2, py + 12, W - 4, 12); rc('#e63946', px + 2, py + 10, 10, 6); rc('#c9a26b', px + 4, py + 24, 3, 5); rc('#c9a26b', px + W - 8, py + 24, 3, 5)}
  else if (k == 'seats') {for (let i = 0; i < W; i += 20) {rc('#7a1022', px + i + 2, py + 6, 16, 18); rc('#a02838', px + i + 2, py + 6, 16, 6); rc('#3a1018', px + i + 2, py + 22, 16, 4)}}
  else if (k == 'stage') {rc('#4a2a14', px, py + 8, W, Hh - 8); rc('#7a4a24', px, py + 4, W, 8); rc('#111', px + W / 2 - 16, py - 6, 32, 14); rc('#7ec8e3', px + W / 2 - 14, py - 4, 28, 10); rc('#ffd34d', px + W / 2 - 3, py + 2, 6, 3)}
  else if (k.startsWith('card:')) {const col = k.slice(5), on = !S.cards[col]; rc('#4a5060', px + 8, py + 14, 16, 14); rc('#6a7080', px + 6, py + 12, 20, 4); if (on) {const c = {RED: '#ff3a3a', BLUE: '#3a8aff', GREEN: '#3aff6a', GOLD: '#ffd34d'}[col], by = Math.sin(tick / 10) * 2; rc(c, px + 10, py + 2 + by, 12, 9); rc('#fff', px + 11, py + 3 + by, 4, 2); X.globalAlpha = .35; rc(c, px + 4, py - 4 + by, 24, 22); X.globalAlpha = 1}}}
function decoX(k, px, py, W, Hh) {
  if (k == 'grid') {for (let i = 0; i < W; i += 16) rc('rgba(80,160,255,.25)', px + i, py, 1, Hh); for (let j = 0; j < Hh; j += 16) rc('rgba(80,160,255,.25)', px, py + j, W, 1)}
  else if (k == 'helipad') {rc('#555a64', px, py, W, Hh); rc('#ffd34d', px + 4, py + 4, W - 8, 3); rc('#ffd34d', px + 4, py + Hh - 7, W - 8, 3); rc('#fff', px + W / 2 - 14, py + Hh / 2 - 12, 6, 24); rc('#fff', px + W / 2 + 8, py + Hh / 2 - 12, 6, 24); rc('#fff', px + W / 2 - 10, py + Hh / 2 - 3, 20, 6)}
  else if (k == 'laptopq' && S.flags.laptop == 'active') {const by = Math.sin(tick / 12) * 1.5; rc('rgba(255,255,255,.18)', px + 2, py + 4, 28, 24); rc('#222', px + 6, py + 8 + by, 20, 14); rc('#3a8aff', px + 8, py + 10 + by, 16, 10); rc('#888', px + 4, py + 22 + by, 24, 3)}
  else if (k == 'parcelq' && S.flags.parcel == 'active') {parcelShape((c, a, b, w, h) => rc(c, px + 4 + a, py + 3 + b + (c.startsWith('rgba(0,0,0') ? 0 : Math.sin(tick / 14)), w, h)); X.globalAlpha = .3 + Math.sin(tick / 12) * .15; rc('#ffe14d', px, py, 32, 30); X.globalAlpha = 1}}
function wdX(k, px) {
  if (k == 'cityview' || k == 'skyline') {rc('#2a3550', px + 4, 6, 58, 34); rc(k == 'skyline' ? '#10204a' : '#1c2a4a', px + 6, 8, 54, 30); for (let i = 0; i < 6; i++) {const hh = 8 + (i * 7) % 16; rc('#0b1226', px + 8 + i * 9, 38 - hh, 8, hh); for (let j = 0; j < hh / 5 | 0; j++) rc((i + j + (tick >> 6)) % 3 ? '#ffe9a0' : '#335', px + 10 + i * 9, 40 - hh + j * 5 + 2, 2, 2)} rc('rgba(255,255,255,.12)', px + 6, 8, 54, 4)}
  else if (k == 'logo') {rc('#10141c', px + 6, 8, 36, 28); rc('#3a8aff', px + 10, 12, 28, 20); rc('#fff', px + 15, 17, 6, 10); rc('#fff', px + 23, 17, 10, 4); rc('#fff', px + 23, 23, 10, 4)}
  else if (k == 'wboard') {rc('#cfd6e0', px + 2, 8, 44, 28); rc('#fff', px + 4, 10, 40, 24); rc('#3a8aff', px + 8, 14, 20, 2); rc('#e63946', px + 8, 20, 28, 2); rc('#2e8b57', px + 8, 26, 14, 2)}
  else if (k == 'screens') {for (let i = 0; i < 3; i++) {rc('#10141c', px + 2 + i * 22, 8, 20, 22); rc((tick >> 4) % 3 == i ? '#3aff6a' : '#18603a', px + 4 + i * 22, 10, 16, 16)}}}
const NODE_COL = '#39d98a';
function nodeShape(px, py, lit) {rc('#10141c', px + 8, py + 4, 16, 24); for (let j = 0; j < 3; j++) {rc('#222a38', px + 10, py + 7 + j * 7, 12, 5); rc(lit ? NODE_COL : '#c1121f', px + 12, py + 8 + j * 7, 3, 2)} if (lit) {X.globalAlpha = .35; rc(NODE_COL, px + 2, py - 2, 28, 34); X.globalAlpha = 1}}
// vehicles
function drawVeh(id, x, y, dir, t, mv) {
  const side = dir == 'left' || dir == 'right'; X.save(); if (dir == 'left') {X.translate(2 * x + 32, 0); X.scale(-1, 1)} const wob = mv ? Math.round(Math.sin(t / 3)) : 0, wheel = (cx, cy, r) => {rc('#111', cx - r, cy - r, r * 2, r * 2); rc('#888', cx - 2, cy - 2, 4, 4)};
  if (!side) {const c = {cycle: '#2a6a9a', scooty: '#e63946', bike: '#1a1a22', auto: '#f2c94c', tractor: '#2e8b57', car: '#3d85c6'}[id]; rc('rgba(0,0,0,.28)', x + 6, y + 26, 20, 5); const ww = id == 'car' || id == 'tractor' || id == 'auto' ? 24 : 8; rc('#111', x + 16 - ww / 2 - 1, y + 20, 4, 10); rc('#111', x + 16 + ww / 2 - 3, y + 20, 4, 10); rc(c, x + 16 - ww / 2 + 2, y + 16 + wob, ww - 4, 10); if (id == 'car' || id == 'auto') {rc('#9fd8ff', x + 16 - ww / 2 + 4, y + 18 + wob, ww - 8, 4); rc(dir == 'down' ? '#ffe9a0' : '#ff3a3a', x + 16 - ww / 2 + 3, y + 25 + wob, 4, 2); rc(dir == 'down' ? '#ffe9a0' : '#ff3a3a', x + 16 + ww / 2 - 7, y + 25 + wob, 4, 2)}}
  else {rc('rgba(0,0,0,.28)', x + 2, y + 27, 28, 5);
    if (id == 'cycle') {wheel(x + 6, y + 24, 5); wheel(x + 26, y + 24, 5); rc('#2a6a9a', x + 8, y + 17, 16, 2); rc('#2a6a9a', x + 14, y + 12, 2, 12); rc('#444', x + 22, y + 11, 6, 2)}
    if (id == 'scooty') {wheel(x + 6, y + 25, 4); wheel(x + 26, y + 25, 4); rc('#e63946', x + 8, y + 19, 18, 6); rc('#e63946', x + 22, y + 10, 4, 10); rc('#c1121f', x + 6, y + 15, 8, 6); rc('#222', x + 22, y + 8, 8, 2)}
    if (id == 'bike') {wheel(x + 5, y + 25, 5); wheel(x + 27, y + 25, 5); rc('#1a1a22', x + 8, y + 17, 18, 6); rc('#c1121f', x + 11, y + 13, 10, 5); rc('#333', x + 24, y + 11, 6, 8); rc('#ffe9a0', x + 29, y + 13, 3, 3)}
    if (id == 'auto') {wheel(x + 6, y + 25, 4); wheel(x + 24, y + 25, 4); rc('#111', x + 2, y + 6, 24, 4); rc('#f2c94c', x + 2, y + 10, 26, 13); rc('#9fd8ff', x + 18, y + 11, 8, 6); rc('#222', x + 6, y + 12, 8, 8); rc('#ffe9a0', x + 29, y + 18, 3, 3)}
    if (id == 'tractor') {wheel(x + 7, y + 22, 8); wheel(x + 26, y + 26, 5); rc('#2e8b57', x + 10, y + 16, 20, 7); rc('#2e8b57', x + 22, y + 11, 8, 6); rc('#222', x + 4, y + 6, 4, 10); rc('#c1121f', x + 14, y + 10, 8, 6)}
    if (id == 'car') {wheel(x + 7, y + 25, 5); wheel(x + 25, y + 25, 5); rc('#3d85c6', x + 1, y + 16, 30, 9); rc('#3d85c6', x + 6, y + 9, 18, 8); rc('#9fd8ff', x + 8, y + 10, 6, 6); rc('#9fd8ff', x + 15, y + 10, 7, 6); rc('#ffe9a0', x + 29, y + 18, 3, 3); rc('#ff3a3a', x + 1, y + 18, 2, 3)}}
  X.restore()}
function drawRider(x, y, mv, a) {const d = S.dir, id = S.riding, big = id == 'car' || id == 'auto' || id == 'tractor', L = myLook(); if (big) {GAIT = 1; drawChar(x, y - 8, L, d, 0); drawVeh(id, x, y, d, tick, mv)} else {drawVeh(id, x, y, d, tick, mv); drawChar(x, y - 6 + (mv ? Math.round(Math.sin(tick / 3) * .8) : 0), L, d, 0)}
  if (mv && (id == 'bike' || id == 'car')) {const [dx, dy] = vec[d]; for (let k = 0; k < 3; k++) {const age = (tick * 1.5 + k * 6) % 16; X.fillStyle = 'rgba(230,205,160,' + (1 - age / 16) * .5 + ')'; X.fillRect(Math.round(x + 16 - dx * (14 + age)), Math.round(y + 26 - dy * age * .4), 3, 3)}}}
let myLook = () => Object.assign({}, LOOKS[S.look], OUTFITS[S.outfit] || {});
// extra bits for RIG Ritesh (tie + laptop)
const _dc = drawChar; drawChar = function (x, y, L, dir, anim, s = 1) {_dc(x, y, L, dir, anim, s); if (L && (L.tie || L.laptop) && dir != 'up') {X.save(); X.translate(x, y); X.scale(s, s);
    if (L.tie && dir == 'down') {rc(L.tie, 15, 14, 2, 8); rc(L.tie, 14, 13, 4, 2)}
    if (L.laptop) {const gl = (tick >> 3) & 1; if (dir == 'down') {rc('#1a1a22', 2, 15, 12, 8); rc(gl ? '#3a8aff' : '#2a6ad0', 3, 16, 10, 6); rc('#aaa', 1, 23, 14, 2); rc('#fff', 6, 18, 4, 2)} else {rc('#1a1a22', 6, 17, 4, 8); rc('#aaa', 5, 24, 6, 2)}}
    X.restore()}};
function iconX(id, r, line) {
  const F = FOODS[id.replace(/^f_/, 'f_')]; 
  if (id.startsWith('f_')) {const bad = FOODS[id].bad, c = bad ? '#7a9a4a' : '#7ec8e3'; r('rgba(0,0,0,.2)', 3, 18, 18, 3); X.fillStyle = c; X.beginPath(); X.ellipse(11, 11, 9, 5, 0, 0, 7); X.fill(); X.fillStyle = bad ? '#4a6a2a' : '#4aa0c8'; X.beginPath(); X.moveTo(19, 11); X.lineTo(24, 6); X.lineTo(24, 16); X.fill(); r('#fff', 5, 9, 2, 2); r('#111', 5, 10, 1, 1); if (bad) {r('#c1121f', 9, 8, 2, 2); r('#c1121f', 13, 12, 2, 2)} return true}
  if (FOODS[id]) {if (FOODS[id].special == 'charm') {X.fillStyle = '#2a6fdb'; X.beginPath(); X.arc(11, 11, 8, 0, 7); X.fill(); r('#fff', 5, 9, 12, 5); r('#1a1a40', 9, 8, 4, 7); r('#111', 10, 10, 2, 3); return true}
    if (FOODS[id].special == 'hint') {r('#f2c94c', 3, 5, 18, 14); r('#fff3a0', 5, 7, 14, 10); tx('?', 12, 17, '#7a4a00', 13, F_R, 'center', false); return true}
    const h = (id.charCodeAt(0) * 7 + id.length * 13) % 5, c = ['#e0a060', '#c1440e', '#e6c27a', '#d94a4a', '#8fbf4a'][h]; r('rgba(0,0,0,.2)', 3, 18, 18, 3); X.fillStyle = '#e8e8f0'; X.beginPath(); X.ellipse(11, 14, 10, 4, 0, 0, 7); X.fill(); X.fillStyle = c; X.beginPath(); X.ellipse(11, 11, 7, 5, 0, 0, 7); X.fill(); r('rgba(255,255,255,.3)', 8, 8, 4, 2); line('rgba(255,255,255,.5)', 9, 4, 9, 1, 1); line('rgba(255,255,255,.5)', 13, 5, 13, 0, 1); return true}
  if (OUTFITS[id]) {const O = OUTFITS[id]; r(O.top, 4, 4, 16, 12); r(O.top, 1, 4, 4, 8); r(O.top, 19, 4, 4, 8); r('rgba(0,0,0,.2)', 4, 14, 16, 2); r(O.bot, 6, 16, 5, 6); r(O.bot, 13, 16, 5, 6); if (O.hood) r(O.top, 8, 2, 8, 3); return true}
  if (id == 'rod') {line('#8b5e3c', 4, 21, 20, 3, 2); line('#ddd', 20, 3, 22, 14, 1); r('#c1121f', 21, 14, 3, 3); r('#444', 8, 16, 4, 4); return true}
  if (id.startsWith('veh_')) {X.save(); X.scale(.7, .7); drawVeh(id.slice(4), 0, 0, 'right', 0, 0); X.restore(); return true}
  if (ITEMS[id]) {const c = ['#c9a26b', '#9aa5b0', '#8b5e3c', '#3a8aff', '#ffd34d'][id.length % 5]; line(c, 4, 21, 19, 4, 3); r('#333', 3, 19, 5, 5); line('#e8e8f0', 14, 9, 20, 3, 2); return true}
  if (id == 'q_badge') {r('#2a6fdb', 8, 1, 3, 6); r('#fff', 4, 6, 16, 14); r('#2a6fdb', 4, 6, 16, 3); r('#aaa', 7, 12, 8, 2); r('#aaa', 7, 15, 6, 2); return true}
  if (id == 'q_laptop') {r('#222', 3, 5, 18, 12); r('#3a8aff', 5, 7, 14, 8); r('#aaa', 1, 17, 22, 3); return true}
  if (id == 'q_cards') {r('#ff3a3a', 2, 4, 14, 9); r('#3a8aff', 5, 8, 14, 9); r('#3aff6a', 8, 12, 14, 9); return true}
  if (id == 'q_key') {r('#ffd34d', 3, 6, 7, 7); r('#10141c', 5, 8, 3, 3); r('#ffd34d', 10, 8, 12, 3); r('#ffd34d', 18, 11, 3, 5); r('#ffd34d', 14, 11, 3, 4); return true}
  return false}
