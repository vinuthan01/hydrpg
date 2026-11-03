// ===== CORE: state, accounts, maps, quests, puzzles, movement, AI, battle logic =====
const cv = document.getElementById('c'); let X = cv.getContext('2d'); let K = 2;
const T = 32, $ = id => document.getElementById(id);
let VW = 15, VH = 11, ZS = 2, LW = 480, LH = 352;                    // view size in tiles / logical pixels
let MENU = null, PNL = null, INV = null, CHO = null, CODE = null, S = null, cache = {}, ents = [], D = null, B = null, SH = null, GD = {tab: 0};
let keys = {}, cam = {x: 0, y: 0}, tick = 0, toastS = '', toastT = 0, fade = 0;
const H = (x, y) => ((x * 73856093) ^ (y * 19349663)) >>> 0, R = (a, b) => a + Math.random() * (b - a);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const vec = {up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0]};
const dirs = {ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right'};
const rc = (c, x, y, w, h) => {X.fillStyle = c; X.fillRect(Math.round(x), Math.round(y), w, h)};
const GONE = {};                                                    // enemies that ran away / were beaten: 'map:slot' -> frames until they return
const MAPS = {hyd: genMap('hyd', CFG.hyd), sec: genMap('sec', CFG.sec)};
function getMap(id) {
  if (cache[id]) return cache[id]; const d = MAPS[id];
  if (d.G) {if (S && S.flags['gate_' + id] && d.gate) d.G[d.gate[1]][d.gate[0]].s = 0; return cache[id] = {d, g: d.G}}
  const g = []; for (let y = 0; y < d.h; y++) {g.push([]); for (let x = 0; x < d.w; x++) g[y].push({s: 0, t: 0, f: 0})}
  (d.furn || []).forEach(f => {for (let y = f[1]; y < f[1] + f[3]; y++) for (let x = f[0]; x < f[0] + f[2]; x++) if (g[y] && g[y][x]) g[y][x].s = 1});
  return cache[id] = {d, g};
}
const cur = () => getMap(S.map);
const cityOf = () => S.map.startsWith('in_') ? S.ret.map : S.map;
function ensureMap(id) {if (MAPS[id]) return; const [, m, i] = id.split('_'); MAPS[id] = makeInterior(MAPS[m].blds[+i], m, +i)}
function free(x, y, self) {
  const m = cur(); if (x < 0 || y < 0 || x >= m.d.w || y >= m.d.h) return false; const c = m.g[y][x];
  if (c.s && !(!self && S.swim && c.t == 5)) return false;
  if (S.x == x && S.y == y && self) return false; return !ents.some(e => e !== self && e.x == x && e.y == y)}
// ---------- difficulty scaling: enemies grow with your story progress ----------
const doneCount = () => Object.keys(QUESTS).filter(k => S.flags[k] == 'done').length;
const cityIdx = () => Math.max(0, ORDER.indexOf(cityOf()));
const tierOf = () => S ? doneCount() + cityIdx() * 2 + ORDER.filter(c => S.flags['boss_' + c]).length : 0;
function foeStats(e) {
  const F = FOES[e.f], t = tierOf(), m = e.m || 1;
  if (F.boss) return {lv: F.lv || (cityIdx() * 6 + 8), hp: F.hp, atk: F.atk, xp: F.xp, coin: F.coin};
  return {lv: F.lv + t, hp: Math.round(F.hp * (1 + .12 * t) * m), atk: F.atk * (1 + .07 * t) * (1 + (m - 1) * .5), xp: F.xp * (1 + .12 * t), coin: F.coin * (1 + .08 * t)};
}
// ---------- entities ----------
function makeEnts() {
  const d = cur().d; ents = []; const add = o => ents.push(Object.assign({px: o.x, py: o.y, dir: 'down', a: 0, w: R(20, 90) | 0}, o));
  d.npcs.forEach(n => add(Object.assign({t: 'npc', sp: 1 / 20}, n)));
  d.animals.forEach(a => add({t: 'an', k: a[0], x: a[1], y: a[2], wander: 1, home: [a[1], a[2]], sp: {cow: 1 / 44, goat: 1 / 28, dog: 1 / 24, cat: 1 / 30}[a[0]] || 1 / 30, w: R(60, 240) | 0}));
  d.foes.forEach((f, i) => {if (!GONE[S.map + ':' + i]) add({t: 'foe', f: f[3], m: f[2], x: f[0], y: f[1], wander: 1, slot: i})});
  (d.guards || []).forEach((gd, i) => {if (!S.flags['g_' + S.map + '_' + i]) add({t: 'foe', f: gd[2], m: 1.15, x: gd[0], y: gd[1], guard: i})});
  if (d.boss && !S.flags['boss_' + S.map]) add({t: 'boss', f: d.bossKey, x: d.boss[0], y: d.boss[1]});
  (d.autos || []).forEach((a, i) => add({t: 'auto', x: a[0], y: a[1], dir: i % 2 ? 'left' : 'right', sp: 1 / 17, seed: i * 37, path: [], wait: 0, rest: R(20, 200) | 0}));
}
function toast(t) {toastS = t; toastT = 170}
function say(lines, cb, who, L) {D = {l: Array.isArray(lines) ? lines : [lines], i: 0, cb, who: who || '', L: L || null, t0: tick}}
function advanceSay() {
  if (!D) return; const full = D.l[D.i].length; if ((tick - D.t0) * 1.4 < full) {D.t0 = tick - 9999; return}   // first press shows the whole line
  if (++D.i >= D.l.length) {const cb = D.cb; D = null; cb && cb()} else D.t0 = tick}
// ---------- accounts & saves (browser-only: each player's data stays in this browser) ----------
const USERS_KEY = 'bq_users', saveKey = n => 'bq_save_' + n.toLowerCase();
const getUsers = () => {try {return JSON.parse(localStorage.getItem(USERS_KEY) || '{}')} catch (e) {return {}}};
const save = () => {if (!S) return; try {localStorage.setItem(saveKey(S.user), JSON.stringify(S))} catch (e) {}};
async function hashPw(name, pw) {
  const s = 'bq6|' + name.toLowerCase() + '|' + pw;
  try {if (window.crypto && crypto.subtle) {const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')}} catch (e) {}
  let h1 = 5381, h2 = 52711; for (let i = 0; i < s.length; i++) {h1 = (h1 * 33) ^ s.charCodeAt(i); h2 = (h2 * 31 + s.charCodeAt(i)) | 0} return 'f' + (h1 >>> 0).toString(16) + (h2 >>> 0).toString(16)
}
function newGame(name, look) {
  const s = MAPS.hyd.start;
  S = {ver: 6, user: name.toLowerCase(), name, look, map: 'hyd', x: s[0], y: s[1], px: s[0], py: s[1], dir: 'down', anim: 0, hp: 50, maxhp: 50, lv: 1, xp: 0, money: 0, chai: 1, items: ['bat'], eq: 'bat', flags: {}, seen: {}, grace: 60, swim: 0};
  cache = {}; begin(true)}
function loadGame(name) {
  const sv = JSON.parse(localStorage.getItem(saveKey(name))); S = sv; S.user = name; S.name = S.name || name; S.flags = S.flags || {}; S.seen = S.seen || {}; S.items = S.items || ['bat']; if (!S.eq) S.eq = S.items[0];
  cache = {}; if (String(S.map).startsWith('in_')) ensureMap(S.map); if (!MAPS[S.map]) {S.map = 'hyd'; const s = MAPS.hyd.start; S.x = S.px = s[0]; S.y = S.py = s[1]}
  if (S.swim && cur().g[S.y][S.x].t != 5) S.swim = 0; S.grace = 90; begin(false)}
function begin(isNew) {
  $('title').style.display = 'none'; makeEnts(); reveal(); toast(cur().d.name); save();
  if (isNew || !S.flags.tut) setTimeout(startTutorial, 500)}
function startTutorial() {
  const n = S.name; say([
    'Welcome to Hyderabad, ' + n + '! You have just arrived at the Charminar, the heart of old Hyderabad.',
    'Street gangs have taken over the city. Chapris, chillars and awaras roam the lanes, and a mafia boss rules from a hidden adda.',
    'Your job: beat the gang, find the hideout in the forest, and take down the boss. It will not be easy!',
    'Move with W A S D or the arrow keys. Hold Shift to run. Walk into a door to go inside a building.',
    'Press Space or F to talk to people, read signs and open things. People with a yellow ! have a mission for you.',
    'Use the icons at the top right, or the keys: E bag, C stats, J journal, M map, G guide, Esc menu.',
    'Hospitals heal you fully. Walk into Gandhi Hospital or NIMS when you are hurt. You can swim too: face the water and press Space.',
    'Good luck, ' + n + '! Press Space to start your adventure.'
  ], () => {S.flags.tut = 1; save()}, 'Welcome', null)}
// ---------- fog of war ----------
function reveal() {const d = cur().d; if (d.indoor) return; const bw = Math.ceil(d.w / 4), a = S.seen[S.map] || (S.seen[S.map] = new Array(bw * Math.ceil(d.h / 4)).fill(0));
  const hx = VW / 2 + 1, hy = VH / 2 + 1; for (let by = Math.max(0, (S.y - hy) / 4 | 0); by <= Math.min(Math.ceil(d.h / 4) - 1, (S.y + hy) / 4 | 0); by++) for (let bx = Math.max(0, (S.x - hx) / 4 | 0); bx <= Math.min(bw - 1, (S.x + hx) / 4 | 0); bx++) a[by * bw + bx] = 1}
// ---------- quests / puzzles ----------
const pcN = id => S.flags['pc_' + id + '_n'] || 0, lairKnown = id => pcN(id) >= 3, digit = (id, i) => i < 3 && S.flags['dg_' + id + '_' + i] ? MAPS[id].cfg.code[i] : '?';
function giveDigit(id, i) {S.flags['dg_' + id + '_' + i] = 1}
function finishQuest(id) {
  const Q = QUESTS[id], r = Q.reward; S.flags[id] = 'done'; sfx('coin');
  if (r.item && !S.items.includes(r.item)) S.items.push(r.item);
  if (r.money) S.money += r.money; if (r.chai) S.chai += r.chai; if (r.digit != null) giveDigit(S.map, r.digit); if (r.xp) gainXP(r.xp);
  toast('Mission complete: ' + Q.title + (r.item ? ' + ' + ITEMS[r.item].n : '') + (r.digit != null ? '  (lock digit learned!)' : '') + '  Enemies grow stronger...'); save()}
function gainXP(n) {S.xp += Math.round(n); while (S.xp >= S.lv * 25) {S.xp -= S.lv * 25; S.lv++; S.maxhp += 10; S.hp = S.maxhp; sfx('level'); toast('LEVEL UP! Lv' + S.lv + '  Max HP +10, HP fully restored!')}}
function askRiddle(id) {const Q = QUESTS[id]; CHO = {q: Q.q, opts: Q.opts, cb: i => {CHO = null; if (i == Q.ans) {S.flags[id] = 'found'; say(Q.turnin, () => finishQuest(id), 'Pandit / Keeper', null)} else {sfx('wrong'); say(['Wrong answer! Think again, bhai.'])}}}}
function talk(e) {
  if (e.shop) return openShop(e);
  if (e.rude || e.nurse || e.pzhint || !e.q) return say(e.say || ['...'], null, e.name, e.L);
  const f = S.flags, Q = QUESTS[e.q], st = f[e.q], w = (l, cb) => say(l, cb, e.name, e.L);
  if (!st) return w(Q.ask, () => {f[e.q] = 'active'; if (Q.type == 'riddle') askRiddle(e.q); save()});
  if (st == 'active') return w(Q.wait, () => {if (Q.type == 'riddle') askRiddle(e.q)});
  if (st == 'found') return w(Q.turnin, () => finishQuest(e.q));
  w(Q.after)}
function pzPress(i) {
  const id = S.map, d = cur().d, pz = d.cfg.pz, key = 'pz_' + id;
  if (S.flags[key + '_ok']) return say(['It already glows. The puzzle is solved.']);
  const seq = S.flags[key] || (S.flags[key] = []);
  if (seq.includes(i)) return toast(pz.names[i] + ' is already lit.');
  if (pz.order[seq.length] != i) {S.flags[key] = []; sfx('wrong'); return say(['The ' + pz.names[i] + ' fizzles... all the lights go out! Wrong order.', pz.hint[0]])}
  seq.push(i); sfx('select'); toast(pz.names[i] + ' activated (' + seq.length + '/' + pz.n + ')');
  if (seq.length == pz.n) {S.flags[key + '_ok'] = 1; giveDigit(id, pz.digit); gainXP(60); S.money += 40; sfx('unlock'); say([pz.ok, '(+60 XP, Rs.40)']); save()}}
// ---- the hideout lock: 4 digits. Three come from missions; the 4th you must find by trying 0-9 ----
function gateTry() {const id = S.map; const known = [0, 1, 2].map(i => digit(id, i));
  CODE = {buf: '', cb: b => {const code = MAPS[id].cfg.code.join('');
    if (b == code) {CODE = null; S.flags['gate_' + id] = 1; const g = cur().d.gate; cur().g[g[1]][g[0]].s = 0; sfx('unlock'); say(['Click... the last tumbler falls into place and the gate swings open!', 'Two goons and the boss wait inside. Heal up first, bhai!']); save()}
    else {S.flags['tries_' + id] = (S.flags['tries_' + id] || 0) + 1; sfx('wrong');
      if (b.slice(0, 3) == code.slice(0, 3)) {CODE.msg = 'Three tumblers click! Only the last digit is wrong. Try 0-9.'; CODE.buf = code.slice(0, 3)}
      else {CODE.msg = 'The lock stays shut. Wrong code!'; CODE.buf = ''}}}, known, msg: ''}}
function codeKey(k) {if (k == 'Escape') {CODE = null; return} if (/^[0-9]$/.test(k) && CODE.buf.length < 4) CODE.buf += k; else if (k == 'Backspace') CODE.buf = CODE.buf.slice(0, -1); else if ((k == 'Enter' || k == 'f' || k == ' ') && CODE.buf.length == 4) CODE.cb(CODE.buf)}
function objective() {const d = cur().d, id = S.map; if (d.indoor) return 'Walk down through the door to leave';
  const qs = Object.keys(QUESTS).filter(k => QUESTS[k].map == id), f = S.flags;
  for (const k of qs) if (f[k] == 'found') return QUESTS[k].hudBack;
  for (const k of qs) if (f[k] == 'active') return QUESTS[k].hudWait + (QUESTS[k].type == 'kill' ? ' (' + (f[k + '_n'] || 0) + '/' + QUESTS[k].n + ')' : '');
  for (const k of qs) if (!f[k]) return QUESTS[k].hudAsk;
  if (!f['pz_' + id + '_ok']) return 'Solve the puzzle: ' + d.cfg.pz.title;
  if (pcN(id) < 3) return 'Find the torn map pieces (' + pcN(id) + '/3)';
  if (!f['gate_' + id]) return 'Find ' + d.cfg.lair.name + ' and open the 4-digit lock';
  if (!f['boss_' + id]) return 'Defeat ' + d.bossName;
  return 'Head east to the next city'}
// journal: only what you need to do right now. No spoilers.
function journalData() {const id = cityOf(), qs = Object.keys(QUESTS).filter(k => QUESTS[k].map == id), f = S.flags, act = [], done = [];
  qs.forEach(k => {const Q = QUESTS[k]; if (f[k] == 'done') done.push(Q.title); else if (f[k]) act.push({t: Q.title, s: f[k] == 'found' ? Q.hudBack : Q.hudWait + (Q.type == 'kill' ? ' (' + (f[k + '_n'] || 0) + '/' + Q.n + ')' : '')})});
  const next = qs.find(k => !f[k]); if (next) act.push({t: 'New mission', s: QUESTS[next].hudAsk});
  const mains = []; if (!next) {const d = MAPS[id];
    if (!f['pz_' + id + '_ok']) mains.push('Solve the puzzle: ' + d.cfg.pz.title); else done.push(d.cfg.pz.title);
    if (pcN(id) < 3) mains.push('Find the torn map pieces (' + pcN(id) + '/3)'); else done.push('Torn map pieces');
    if (pcN(id) >= 3 && !f['gate_' + id]) mains.push('Open the lock at ' + d.cfg.lair.name);
    if (f['gate_' + id] && !f['boss_' + id]) mains.push('Defeat ' + d.cfg.bossName); if (f['boss_' + id]) done.push('Defeat ' + d.cfg.bossName)}
  return {act, mains, done, clue: [0, 1, 2, 3].map(i => digit(id, i)).join(' '), clues: [0, 1, 2].some(i => digit(id, i) != '?')}}
function missionMarks() {const d = cur().d, id = S.map, out = []; if (d.indoor) return out; const f = S.flags;
  for (const k in QUESTS) {const Q = QUESTS[k]; if (Q.map != id) continue;
    if (!f[k] || f[k] == 'found' || (f[k] == 'active' && Q.type == 'riddle')) {const n = d.npcs.find(n => n.giver == Q.giver); if (n) out.push([n.x, n.y, Q.title])}
    else if (f[k] == 'active' && Q.type == 'fetch' && d.spots[Q.spot]) out.push([d.spots[Q.spot][0], d.spots[Q.spot][1], Q.title])}
  if (qs3(id) && !f['pz_' + id + '_ok']) (d.pz || []).forEach(p => out.push([p.x, p.y, d.cfg.pz.title]));
  return out}
const qs3 = id => Object.keys(QUESTS).filter(k => QUESTS[k].map == id).every(k => S.flags[k] == 'done');
// ---------- bag ----------
function bagList(q) {
  const L = []; S.items.forEach(id => L.push({id, type: 'weapon', n: ITEMS[id].n, cnt: 1, eq: S.eq == id, desc: ITEMS[id].desc}));
  L.push({id: 'chai', type: 'item', n: CHAI.n, cnt: S.chai, desc: CHAI.desc});
  const pc = pcN(cityOf()); if (pc > 0) L.push({id: 'pieces', type: 'quest', n: 'Torn map pieces', cnt: pc, desc: 'Pieces of a map to the hideout (' + pc + '/3).'});
  for (const k in QUESTS) {const Q = QUESTS[k]; if (Q.type == 'fetch' && S.flags[k] == 'found') L.push({id: 'q_' + k, type: 'quest', n: k == 'tiffin' ? "Raju's Tiffin" : "Babu's Parcel", cnt: 1, desc: 'Return it to its owner.'})}
  const f = S.flags, cid = cityOf(); if ([0, 1, 2].some(i => digit(cid, i) != '?')) L.push({id: 'notes', type: 'quest', n: 'Lock digit notes', cnt: 1, desc: 'Lock code: ' + [0, 1, 2, 3].map(i => digit(cid, i)).join(' ')});
  q = (q || '').trim().toLowerCase(); return q ? L.filter(o => o.n.toLowerCase().includes(q) || o.type.includes(q)) : L}
function equip(id) {if (!ITEMS[id] || !S.items.includes(id)) return; S.eq = id; sfx('select'); toast('Equipped: ' + ITEMS[id].n); save()}
function quickHeal() {if (S.chai <= 0) return toast('No chai left!'); if (S.hp >= S.maxhp) return toast('HP is already full'); S.chai--; S.hp = Math.min(S.maxhp, S.hp + CHAI.heal); sfx('heal'); toast('Drank chai. HP ' + S.hp + '/' + S.maxhp); save()}
function openShop(e) {const stock = (SHOP[S.map] || SHOP[cur().d.shopOf] || ['chai']); SH = {stock, who: e && e.name, L: e && e.L, line: 'Welcome! What would you like?'}}
function buy(i) {const k = SH.stock[i]; if (!k) return; const p = k == 'chai' ? CHAI.price : ITEMS[k].price;
  if (k != 'chai' && S.items.includes(k)) {SH.line = 'You already own that.'; return}
  if (S.money < p) {sfx('wrong'); SH.line = 'Not enough money, bhai!'; return} S.money -= p; sfx('coin');
  if (k == 'chai') {S.chai++; SH.line = 'Fresh chai! Rs.' + p} else {S.items.push(k); SH.line = 'Sold! ' + ITEMS[k].n} save()}
// ---------- interaction ----------
const STALLTALK = {chai: 'A chai stall. The smell of cardamom fills the air.', bangle: 'Glass bangles in every colour, shining in the light.', flower: 'Fresh marigold and jasmine garlands for the temple.', puri: 'Pani puri! Crunchy, tangy and spicy.', fruit: 'Juicy mangoes, bananas and sweet limes.', balloon: 'A balloon seller. The kids love him.', kite: 'Colourful kites. Sankranti is not far away!', toy: 'Wooden toys and spinning tops for children.'};
function interact() {
  const [dx, dy] = vec[S.dir], fx = S.x + dx, fy = S.y + dy, m = cur(), d = m.d;
  const e = ents.find(e => e.x == fx && e.y == fy);
  if (e) {if (e.t == 'npc') {e.dir = ({up: 'down', down: 'up', left: 'right', right: 'left'})[S.dir]; return talk(e)}
    if (e.t == 'an') return say([ANIMAL_TALK[e.k]]);
    if (e.t == 'auto') {sfx('honk'); return say(['Beep beep! Meter is down, bhai. I am just roaming the city today.'], null, 'Auto Driver', {f: 0, skin: '#a9713a', hair: '#111', hs: 'crop', top: '#c9b36a', bot: '#444', cap: '#c9b36a', stache: 1})}
    if (e.t == 'boss') return say(d.bossIntro, () => startBattle(e), d.bossName, LOOKF[FOES[e.f].look]); return}
  const pi = (d.pz || []).findIndex(p => p.x == fx && p.y == fy); if (pi >= 0) return pzPress(pi);
  if (d.gate && d.gate[0] == fx && d.gate[1] == fy && !S.flags['gate_' + S.map]) return gateTry();
  const b = d.blds.find(b => fx >= b[0] && fx < b[0] + b[2] && fy >= b[1] && fy < b[1] + b[3]); if (b) return say([b[6] + ': walk into the door to go inside.'], null, 'Sign');
  const st = (d.stalls || []).find(s => s[0] == fx && s[1] == fy); if (st) return say([STALLTALK[st[2]] || 'A little shop.'], null, 'Stall');
  const c = m.g[fy] && m.g[fy][fx];
  if (c && c.s == 3) return say(['A glowing street lamp.']); if (c && c.wl) return say(['A thick stone wall of the old fort.']); if (c && c.gate) return gateTry();
  if (c && c.t == 5 && c.s && !S.swim) {S.swim = 1; if (free(fx, fy)) {S.x = fx; S.y = fy; sfx('splash'); toast('Swimming! Walk to the shore to climb out.')} else S.swim = 0}}
// ---------- movement ----------
function changeMap(to, x, y) {fade = 40; S.map = to; S.x = S.px = x; S.y = S.py = y; S.grace = 70; S.swim = 0; makeEnts(); reveal(); toast(MAPS[to].name); save()}
function enter(bi) {const id = 'in_' + S.map + '_' + bi; ensureMap(id); const I = MAPS[id]; S.ret = {map: S.map, x: S.x, y: S.y + 1}; sfx('door'); changeMap(id, I.start[0], I.start[1]);
  if (I.kind == 'hosp') {S.hp = S.maxhp; sfx('heal'); setTimeout(() => toast('The hospital heals you. HP full!'), 60)}
  if (I.kind == 'home') {const o = I.npcs[0]; setTimeout(() => say(o.say, null, o.name, o.L), 450)}}
function arrive() {
  const d = cur().d; reveal();
  if (S.swim && cur().g[S.y][S.x].t != 5) {S.swim = 0; toast('You climb out of the water.')}
  if (!d.indoor) {
    for (const k in QUESTS) {const Q = QUESTS[k]; if (Q.map == S.map && Q.type == 'fetch' && S.flags[k] == 'active') {const s = d.spots[Q.spot]; if (s && S.x == s[0] && S.y == s[1]) {S.flags[k] = 'found'; sfx('coin'); say([Q.found]); save()}}}
    for (let i = 0; i < 3; i++) {const s = d.spots['pc' + i]; if (s && !S.flags['pc_' + S.map + '_' + i] && S.x == s[0] && S.y == s[1]) {S.flags['pc_' + S.map + '_' + i] = 1; const n = S.flags['pc_' + S.map + '_n'] = pcN(S.map) + 1; sfx('coin');
      if (n >= 3) {const l = d.lair; for (let y = l[1] - 8; y <= l[1] + 8; y++) for (let x = l[0] - 14; x <= l[0] + 14; x++) {const bw = Math.ceil(d.w / 4); const a = S.seen[S.map]; if (a && x >= 0 && y >= 0 && x < d.w && y < d.h) a[(y >> 2) * bw + (x >> 2)] = 1}
        say(['You join the three torn pieces...', 'The map reveals ' + d.cfg.lair.name + ', hidden in the forest! It is marked on your map (M).', 'The gate has a 4-digit lock. You know three digits from your missions. The last one you must find by trying 0-9.'])} else toast('Torn map piece found (' + n + '/3)'); save()}}
    d.chests.forEach((c, i) => {if (!S.flags['ch_' + S.map + '_' + i] && S.x == c[0] && S.y == c[1]) {S.flags['ch_' + S.map + '_' + i] = 1; S.money += c[2]; sfx('coin'); toast('Treasure chest! +Rs.' + c[2]); save()}})}
  const ex = d.exits.find(e => e.x == S.x && e.y == S.y);
  if (ex && ex.to == 'RET') {const r = S.ret || {map: 'hyd', x: 50, y: 36}; sfx('door'); return changeMap(r.map, r.x, r.y)}
  if (ex) {if (!MAPS[ex.to]) return toast('Medchal is not built yet. Coming soon!');
    const fwd = ORDER.indexOf(ex.to) > ORDER.indexOf(S.map); if (fwd && !S.flags['boss_' + S.map]) {S.dir = ex.side == 'W' ? 'left' : 'right'; S.x = S.px = S.x + (ex.side == 'W' ? -1 : 1); return toast('The road is blocked. Defeat the boss of this city first.')}
    const e2 = ex.side == 'W' ? MAPS[ex.to].entryW : MAPS[ex.to].entryE; return changeMap(ex.to, e2[0], S.y == d.entryE[1] || S.y == d.entryW[1] ? e2[1] : e2[1] + 1)}
  const bi = d.blds.findIndex(b => S.x == b[0] + (b[2] >> 1) && S.y == b[1] + b[3] - 1); if (bi >= 0 && !S.swim) enter(bi)}
// ---------- AI ----------
const calm = () => !D && !SH && !INV && !MENU && !PNL && !CODE && !CHO;
function entUpdate(e) {
  const sp = e.sp || 1 / 16;
  if (e.px != e.x || e.py != e.y) {e.px += Math.sign(e.x - e.px) * Math.min(sp, Math.abs(e.x - e.px)); e.py += Math.sign(e.y - e.py) * Math.min(sp, Math.abs(e.y - e.py)); e.a++; return}
  if (e.t == 'auto') return autoAI(e);
  if (e.t == 'foe' && !S.grace && calm() && !S.swim) {const dist = Math.abs(e.x - S.x) + Math.abs(e.y - S.y); if (dist == 1 && S.px == S.x && S.py == S.y) return startBattle(e);
    if (!e.guard && dist < 7 && dist > 1 && Math.random() < .05) {const tx = S.x - e.x, ty = S.y - e.y, dd = Math.abs(tx) > Math.abs(ty) ? (tx > 0 ? 'right' : 'left') : (ty > 0 ? 'down' : 'up'), [ax, ay] = vec[dd]; e.dir = dd; if (free(e.x + ax, e.y + ay, e)) {e.x += ax; e.y += ay} return}}
  if (e.wander && --e.w <= 0) {if (e.t == 'an') return aiAnimal(e); e.w = R(60, 200) | 0; const dd = Object.keys(vec)[Math.random() * 4 | 0], [ax, ay] = vec[dd]; e.dir = dd; if (free(e.x + ax, e.y + ay, e)) {e.x += ax; e.y += ay}}}
// calm, believable animal behaviour: slow walking with long rests
function aiAnimal(e) {
  const k = e.k, P = () => Object.keys(vec)[Math.random() * 4 | 0], go = dd => {const [dx, dy] = vec[dd]; e.dir = dd; if (free(e.x + dx, e.y + dy, e) && Math.abs(e.x + dx - e.home[0]) + Math.abs(e.y + dy - e.home[1]) <= 9) {e.x += dx; e.y += dy; return 1} return 0},
    toward = (tx, ty) => go(Math.abs(tx - e.x) > Math.abs(ty - e.y) ? (tx > e.x ? 'right' : 'left') : (ty > e.y ? 'down' : 'up')), dist = Math.abs(e.x - S.x) + Math.abs(e.y - S.y);
  if (k == 'cow') {if (!(e.run > 0)) {e.run = 2 + Math.random() * 3 | 0; e.dir = Math.random() < .5 ? 'left' : 'right'; if (Math.random() < .3) e.dir = P()} if (go(e.dir)) {e.run--; e.w = 1} else {e.run = 0; e.w = 120} if (e.run <= 0) e.w = 220 + Math.random() * 320 | 0}
  else if (k == 'dog') {if (dist < 6 && dist > 2 && Math.random() < .5) {toward(S.x, S.y); e.w = 14} else if (dist <= 2) {e.w = 80 + Math.random() * 80 | 0} else if (Math.abs(e.home[0] - e.x) + Math.abs(e.home[1] - e.y) > 6) {toward(e.home[0], e.home[1]); e.w = 12} else {if (Math.random() < .5) go(Math.random() < .5 ? e.dir : P()); e.w = 70 + Math.random() * 160 | 0}}
  else if (k == 'goat') {if (Math.random() < .7) go(Math.random() < .6 ? e.dir : P()); e.w = 30 + Math.random() * 90 | 0}
  else {if (e.run > 0) {if (!go(e.dir)) e.run = 0; e.run--; e.w = 10; return} if (Math.random() < .55) e.w = 200 + Math.random() * 300 | 0; else {e.run = 1 + Math.random() * 2 | 0; e.dir = Math.random() < .8 ? (Math.random() < .5 ? 'left' : 'right') : P(); e.w = 4}}}
// autos drive from place to place along the main roads
function roadTiles(d) {if (!d._r1) {d._r1 = []; const g = cur().g; for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) if (g[y][x].t == 1 && !g[y][x].s) d._r1.push([x, y])} return d._r1}
function bfsPath(d, sx, sy, tx, ty) {
  const g = cur().g, W = d.w, prev = new Int32Array(W * d.h).fill(-2), q = [sy * W + sx]; prev[sy * W + sx] = -1;
  for (let h = 0; h < q.length; h++) {const c = q[h], x = c % W, y = c / W | 0; if (x == tx && y == ty) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= d.h) continue; const n = ny * W + nx; if (prev[n] != -2 || g[ny][nx].t != 1 || g[ny][nx].s) continue; prev[n] = c; q.push(n)}}
  if (prev[ty * W + tx] == -2) return []; const p = []; for (let c = ty * W + tx; c != sy * W + sx; c = prev[c]) p.push([c % W, c / W | 0]); return p.reverse()}
function autoAI(e) {
  const d = cur().d; if (e.rest > 0) {e.rest--; return}
  if (!e.path.length) {const rt = roadTiles(d); for (let t = 0; t < 12 && !e.path.length; t++) {const p = rt[Math.random() * rt.length | 0]; if (Math.abs(p[0] - e.x) + Math.abs(p[1] - e.y) > 14) e.path = bfsPath(d, e.x, e.y, p[0], p[1])} if (!e.path.length) {e.rest = 200; return}}
  const [nx, ny] = e.path[0]; if (free(nx, ny, e) && !(S.x == nx && S.y == ny) && !(Math.abs(S.px - nx) < .8 && Math.abs(S.py - ny) < .8)) {e.dir = nx > e.x ? 'right' : nx < e.x ? 'left' : ny > e.y ? 'down' : 'up'; e.x = nx; e.y = ny; e.path.shift(); e.wait = 0; if (!e.path.length) e.rest = 120 + Math.random() * 260 | 0}
  else {e.wait++; const near = Math.abs(S.x - e.x) + Math.abs(S.y - e.y) < 6; if (e.wait == 30 && near) {sfx('honk'); toast('Beep beep! Move aside!')} if (e.wait > 140) {e.path = []; e.wait = 0; e.rest = 40}}}
function update() {
  tick++; const SPD = S && S.swim ? .042 : keys.Shift ? .1 : .055; if (toastT) toastT--; if (S && S.grace) S.grace--; if (fade) fade--;
  if (!S || B || MENU || PNL || INV || CHO || CODE) return;
  for (const k in GONE) {if (--GONE[k] <= 0) {const [mp, sl] = k.split(':'); if (S.map == mp) {const d = cur().d, f = d.foes[+sl]; if (f && Math.abs(f[0] - S.x) + Math.abs(f[1] - S.y) > 9 && free(f[0], f[1])) {delete GONE[k]; ents.push({t: 'foe', f: f[3], m: f[2], x: f[0], y: f[1], px: f[0], py: f[1], dir: 'down', a: 0, w: 60, wander: 1, slot: +sl})} else GONE[k] = 30} else delete GONE[k]}}
  ents.forEach(entUpdate);
  if (S.px != S.x || S.py != S.y) {S.px += Math.sign(S.x - S.px) * Math.min(SPD, Math.abs(S.x - S.px)); S.py += Math.sign(S.y - S.py) * Math.min(SPD, Math.abs(S.y - S.py)); S.anim++; if (S.px == S.x && S.py == S.y) arrive()}
  else if (!D && !SH) {for (const k in dirs) if (keys[k]) {const dd = dirs[k], [dx, dy] = vec[dd]; S.dir = dd; if (free(S.x + dx, S.y + dy)) {S.x += dx; S.y += dy} break}}}
// ---------- battle logic ----------
function startBattle(e) {
  const F = FOES[e.f], st = foeStats(e);
  B = {e, F, lv: st.lv, atk: st.atk, xp: st.xp, coin: st.coin, max: st.hp, hp: st.hp, dh: st.hp, msg: (F.boss ? 'Boss fight! ' : '') + F.n + ' blocks your way!', busy: 0, over: 0, parts: [], ft: [], shake: 0, flash: 0, lunge: 0, flunge: 0, hitF: 0, hitM: 0, t0: performance.now(), bag: 0, bsel: 0};
  S.grace = 9999; sfx('select'); setTimeout(() => {if (B && !B.over) B.msg = (F.boss ? 'Boss fight! ' : '') + 'Choose your move!'}, 900)}
function floatText(t, on, c) {B.ft.push({x: on == 'foe' ? 368 : 98, y: on == 'foe' ? 70 : 140, t, c: c || (on == 'foe' ? '#fff' : '#ff5a5a'), l: 50})}
async function atk(i) {
  if (!B || B.busy || B.over) return; if (B.bag) {B.bag = 0; return} if (i == 3) return drinkChai(); if (i == 4) return runAway(); if (i == 5) {B.bag = 1; B.bsel = 0; sfx('select'); return}
  const it = ITEMS[S.eq], m = it.moves[i]; if (!m) return;
  B.busy = 1; B.lunge = performance.now(); B.msg = 'You use ' + m.n + '!'; spawnFx(m.fx, 'foe'); sfx(m.k == 'sharp' ? 'slash' : 'hit'); await sleep(420);
  const stat = m.k == 'sharp' ? it.sharp : m.k == 'heavy' ? it.wt : it.pow, acc = m.k == 'heavy' ? .78 : m.k == 'sharp' ? .92 : .88;
  if (Math.random() > acc) {floatText('MISS', 'foe', '#bbb'); sfx('miss'); B.msg = 'You missed!'}
  else {const crit = Math.random() < (m.k == 'sharp' ? .22 : .12), dm = Math.round((m.b + stat * .6 + S.lv * 1.4 + it.str * .4) * R(.85, 1.15) * (crit ? 1.6 : 1)); B.hp = Math.max(0, B.hp - dm); B.hitF = performance.now(); B.shake = Math.max(B.shake, 10); sfx(crit ? 'crit' : 'hit'); floatText(dm + (crit ? '!' : ''), 'foe', crit ? '#ffd34d' : '#fff'); B.msg = (crit ? 'Critical hit! ' : '') + dm + ' damage to ' + B.F.n + '!'}
  await sleep(800); if (B.hp <= 0) return win(); await foeTurn()}
async function switchWeapon(id) {if (!B || B.busy || B.over || id == S.eq) {if (B) B.bag = 0; return} B.bag = 0; B.busy = 1; S.eq = id; sfx('select'); B.msg = 'You switch to ' + ITEMS[id].n + '! (this uses your turn)'; await sleep(900); await foeTurn()}
async function drinkChai() {if (!B || B.busy || B.over) return; B.bag = 0; if (S.chai <= 0) {B.msg = 'No chai left!'; return} if (S.hp >= S.maxhp) {B.msg = 'HP is already full!'; return}
  B.busy = 1; S.chai--; S.hp = Math.min(S.maxhp, S.hp + CHAI.heal); spawnFx('heal', 'me'); sfx('heal'); B.msg = 'You drink Healing Chai. +' + CHAI.heal + ' HP!'; await sleep(900); await foeTurn()}
async function runAway() {
  if (!B || B.busy || B.over) return; if (B.F.boss || B.F.guard) {B.msg = 'You cannot run from this fight!'; return}
  B.busy = 1; B.msg = 'You try to run...'; sfx('run'); await sleep(600);
  if (Math.random() < .8) {B.msg = 'Got away safely! ' + B.F.n + ' loses you for 30 seconds.'; B.over = 1; await sleep(1000); const e = B.e; if (e.slot != null) GONE[S.map + ':' + e.slot] = 1800; ents = ents.filter(x => x !== e); S.grace = 120; B = null; save()}
  else {B.msg = "Couldn't escape!"; await sleep(800); await foeTurn()}}
async function foeTurn() {
  const F = B.F; B.busy = 1;
  if (F.boss && !B.healed && B.hp < B.max * .35) {B.healed = 1; const hv = Math.round(B.max * .18); B.hp = Math.min(B.max, B.hp + hv); B.msg = F.n + ' takes a swig of chai and heals ' + hv + '!'; spawnFx('heal', 'foe'); sfx('heal'); await sleep(1100); B.busy = 0; B.msg = 'Keep fighting!'; return}
  const mv = F.moves[Math.random() * F.moves.length | 0], enr = F.boss && B.hp < B.max * .5 ? 1.3 : 1, hits = mv.hits || 1;
  B.flunge = performance.now(); B.msg = F.n + ' uses ' + mv.n + '!'; spawnFx(mv.fx, 'me'); await sleep(480);
  let tot = 0; for (let i = 0; i < hits; i++) {const dm = Math.max(1, Math.round(B.atk * mv.m * enr * R(.8, 1.2))); S.hp -= dm; tot += dm; floatText(dm, 'me')}
  B.shake = Math.max(B.shake, 12); B.hitM = performance.now(); sfx('hit'); B.msg = F.n + ' uses ' + mv.n + '! You take ' + tot + ' damage' + (enr > 1 ? ' (enraged!)' : ''); await sleep(900);
  if (S.hp <= 0) return lose(); B.busy = 0; B.msg = 'Your move!'}
async function win() {
  const F = B.F, e = B.e, lvDiff = B.lv - S.lv, xp = Math.round(B.xp * Math.max(.5, Math.min(2.5, 1 + lvDiff * .18)));
  B.over = 1; B.msg = F.n + ' is defeated!'; sfx('win'); await sleep(1100);
  const coin = Math.round(B.coin); S.money += coin; gainXP(xp); toast('+' + xp + ' XP   +Rs.' + coin);
  if (F.boss) {S.flags['boss_' + S.map] = 1; if (F.reward && !S.items.includes(F.reward)) S.items.push(F.reward)}
  if (e.guard != null) S.flags['g_' + S.map + '_' + e.guard] = 1;
  for (const k in QUESTS) {const Q = QUESTS[k]; if (Q.type == 'kill' && Q.map == S.map && S.flags[k] == 'active' && Q.foe == e.f) {const n = S.flags[k + '_n'] = (S.flags[k + '_n'] || 0) + 1; if (n >= Q.n) {S.flags[k] = 'found'; setTimeout(() => toast(Q.found), 900)}}}
  if (e.slot != null) GONE[S.map + ':' + e.slot] = 2700;
  const was = F.boss; ents = ents.filter(x => x !== e); B = null; S.grace = 100; save(); if (was) say(F.win, null, F.n, null)}
async function lose() {
  B.msg = 'You collapse...'; B.over = 1; sfx('lose'); await sleep(1200); const lost = Math.min(S.money, Math.floor(S.money * .25)); S.money -= lost;
  const mid = cityOf(), d = MAPS[mid]; let best = null, bd = 1e9; d.blds.forEach(b => {if (b[7] == 'h') {const ox = S.map.startsWith('in_') ? S.ret.x : S.x, oy = S.map.startsWith('in_') ? S.ret.y : S.y, dd = Math.abs(b[0] - ox) + Math.abs(b[1] - oy); if (dd < bd) {bd = dd; best = b}}});
  B = null; const f = best ? [best[0] + (best[2] >> 1), best[1] + best[3]] : d.start; S.hp = S.maxhp; changeMap(mid, f[0], f[1]);
  say(['You wake up outside a hospital. The nurses patched you up completely.', 'HP is full again, but you lost Rs.' + lost + '. Be careful out there!'], null, 'Nurse', NPCL.nurse)}

