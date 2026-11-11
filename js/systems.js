// ===== items, shops, bag, hints, charm, hazards, pets, error popups, menu, letter-code locks =====
let MOD = null, ERRP = null, HEARTS = [];
function ensureS() {S.stat = S.stat || {}; S.wear = S.wear || {}; S.side = S.side || {}; S.ach = S.ach || {}; S.inv = S.inv || {}; S.outfits = S.outfits || []; S.followers = S.followers || []; S.tamed = S.tamed || {}; S.veh = S.veh || []; S.cards = S.cards || {}; S.charmUntil = S.charmUntil || 0; if (S.rod == null) S.rod = 0}
const charmLeft = () => S ? Math.max(0, Math.ceil(((S.charmUntil || 0) - Date.now()) / 1000)) : 0;
const codeLen = id => MAPS[id].cfg.code.length;
function codeShown(id) {return Array.from({length: codeLen(id)}, (_, i) => digit(id, i)).join(' ')}
function showErr(title, msg) {ERRP = {title, msg, t: 150}; sfx('wrong'); S && (S.flash = 12)}
// ---------- vehicles (sold in Hitech City) ----------
const VEHICLES = {
  cycle:{n:'Cycle',price:1200,spd:.075,desc:'A sturdy city cycle. A little faster than walking.'}, scooty:{n:'Scooty',price:3500,spd:.09,desc:'A zippy scooty. Faster than running.'},
  bike:{n:'Sports Bike',price:8000,spd:.115,desc:'A loud, fast bike. Hold on tight!'}, auto:{n:'Auto Rickshaw',price:12000,spd:.095,desc:'Your own auto, meter and all.'},
  tractor:{n:'Tractor',price:15000,spd:.07,desc:'Slow but mighty. Farmers approve.'}, car:{n:'Hatchback Car',price:30000,spd:.13,desc:'The fastest ride in the city.'}};
Object.keys(VEHICLES).forEach(k => {STOCKS['Vehicle World'] = (STOCKS['Vehicle World'] || []).concat('v_' + k)});
const ridingSpeed = () => VEHICLES[S.riding] ? VEHICLES[S.riding].spd : .055;
function toggleRide(id) {if (S.riding && (!id || S.riding == id)) {S.riding = null; return toast('You got off.')} if (cur().d.indoor) return toast('You cannot ride indoors.'); if (S.swim) return; S.riding = id || S.veh[0]; if (S.riding) {sfx('honk'); toast('Riding the ' + VEHICLES[S.riding].n + '. Press V to get off.')}}
// ---------- catalogue entry for the shop ----------
function entry(k) {
  if (k == 'chai') return {n: CHAI.n, desc: CHAI.desc, price: CHAI.price, type: 'food'};
  if (ITEMS[k]) return {n: ITEMS[k].n, desc: ITEMS[k].desc, price: ITEMS[k].price || 0, type: 'weapon', own: S.items.includes(k)};
  if (FOODS[k]) return {n: FOODS[k].n, desc: FOODS[k].desc, price: FOODS[k].price, type: 'food'};
  if (OUTFITS[k]) return {n: OUTFITS[k].n, desc: OUTFITS[k].desc, price: OUTFITS[k].price, type: 'outfit', own: S.outfits.includes(k)};
  if (k == 'rod') return {n: 'Fishing Rod', desc: 'Face water, press Space or F, then click when the bobber dips.', price: 899, type: 'tool', own: !!S.rod};
  if (k.startsWith('v_')) {const V = VEHICLES[k.slice(2)]; return {n: V.n, desc: V.desc, price: V.price, type: 'vehicle', own: S.veh.includes(k.slice(2))}}
  return {n: k, desc: '', price: 0, type: 'food'}}
function openShop(e) {const name = (e && e.stock) || cur().d.name.replace(' (inside)', ''), stock = STOCKS[name] || SHOP[S.map] || ['chai']; SH = {stock, who: e && e.name, L: e && e.L, line: 'Welcome! What would you like?', page: 0, shopName: name}}
function buy(i) {const k = SH.stock[(SH.page || 0) * 5 + i]; if (!k) return; const e = entry(k);
  if (e.own) {SH.line = 'You already own that.'; return} if (S.money < e.price) {sfx('wrong'); SH.line = 'Not enough money, bhai!'; return}
  S.money -= e.price; sfx('coin');
  if (k == 'chai') S.chai++; else if (ITEMS[k]) S.items.push(k); else if (FOODS[k]) S.inv[k] = (S.inv[k] || 0) + 1; else if (OUTFITS[k]) {S.outfits.push(k); S.outfit = k} else if (k == 'rod') S.rod = 1; else if (k.startsWith('v_')) S.veh.push(k.slice(2));
  SH.line = k.startsWith('v_') ? 'Sold! Press V to ride it.' : e.type == 'outfit' ? 'Looks great on you!' : k == 'rod' ? 'Happy fishing! Face water and press Space.' : 'Sold! ' + e.n; save()}
function drawShop() {
  const per = 5, pages = Math.max(1, Math.ceil(SH.stock.length / per)); SH.page = Math.max(0, Math.min(SH.page || 0, pages - 1));
  uiModal(); panel(() => {ibox(50, 14, 380, 322); drawSign(240, 28, 330, SH.shopName || 'Shop', signStyle(SH.shopName || ''), 1); closeBtn(404, 24, () => {SH = null}); tx('Rs.' + S.money, 410, 74, '#ffd36b', 16, F_T, 'right');
    if (SH.L) {X.fillStyle = 'rgba(255,200,120,.14)'; X.fillRect(66, 44, 56, 56); X.save(); X.beginPath(); X.rect(66, 44, 56, 56); X.clip(); drawChar(66, 44, SH.L, 'down', 0, 1.75); X.restore()}
    if (SH.who) tx(SH.who, 132, 62, '#ffd36b', 14, F_R); wrapT(SH.line, 250, 15).slice(0, 2).forEach((l, i) => tx(l, 132, 80 + i * 16, '#fff7e0', 15));
    SH.stock.slice(SH.page * per, SH.page * per + per).forEach((k, i) => {const y = 106 + i * 41, e = entry(k), ov = hit(66, y, 348, 37, () => buy(i), e.own ? 'Already owned' : 'Click to buy');
      X.fillStyle = ov ? 'rgba(193,68,14,.5)' : 'rgba(0,0,0,.28)'; X.fillRect(66, y, 348, 37); X.strokeStyle = 'rgba(224,176,74,.6)'; X.strokeRect(66.5, y + .5, 347, 36);
      tx((i + 1) + '.  ' + fitT(e.n, 215, 16), 76, y + 16, PAL.cream, 16); tx(fitT(e.desc, 255, 12), 76, y + 30, '#c9b79a', 12);
      tx(e.own ? (e.type == 'outfit' && S.outfit == k.toString() ? 'Wearing' : 'Owned') : 'Rs.' + e.price, 406, y + 22, e.own ? '#7ee08a' : S.money >= e.price ? '#ffd36b' : '#ff8a6a', 17, F_T, 'right')});
    if (pages > 1) {btn(66, 314, 54, 18, '< Prev', () => {SH.page = Math.max(0, SH.page - 1)}, '', '#4a2a10', 12); btn(360, 314, 54, 18, 'Next >', () => {SH.page = Math.min(pages - 1, SH.page + 1)}, '', '#4a2a10', 12)}
    tx('Page ' + (SH.page + 1) + '/' + pages + '   Press 1-5 to buy, Esc to leave', 240, 327, '#c9b79a', 12, F_T, 'center')}, 480, 352)}
// ---------- bag ----------
const QNAME = {tiffin: "Raju's Tiffin", parcel: "Babu's Parcel", badge: "Anita's ID Badge", laptop: "Kiran's Laptop"};
function bagList(q) {
  const L = []; S.items.forEach(id => L.push({id, type: 'weapon', n: ITEMS[id].n, cnt: 1, eq: S.eq == id, desc: ITEMS[id].desc}));
  L.push({id: 'chai', type: 'food', n: CHAI.n, cnt: S.chai, desc: CHAI.desc, heal: CHAI.heal, use: 'Drink chai'});
  for (const k in S.inv) if (S.inv[k] > 0 && FOODS[k]) {const F = FOODS[k]; L.push({id: k, type: 'food', n: F.n, cnt: S.inv[k], desc: F.desc, heal: F.heal || 0, use: F.special == 'charm' ? 'Use charm' : F.special == 'hint' ? 'Use hint' : 'Eat', fish: F.fish})}
  S.outfits.forEach(id => L.push({id, type: 'outfit', n: OUTFITS[id].n, cnt: 1, eq: S.outfit == id, desc: OUTFITS[id].desc, use: S.outfit == id ? 'Take off' : 'Wear'}));
  if (S.rod) L.push({id: 'rod', type: 'tool', n: 'Fishing Rod', cnt: 1, desc: 'Face any water and press Space or F. Click when the bobber dips!'});
  S.veh.forEach(id => L.push({id: 'veh_' + id, type: 'vehicle', n: VEHICLES[id].n, cnt: 1, eq: S.riding == id, desc: VEHICLES[id].desc + ' Press V to ride.', use: S.riding == id ? 'Get off' : 'Ride'}));
  const pc = pcN(cityOf()); if (pc > 0) L.push({id: 'pieces', type: 'quest', n: 'Torn map pieces', cnt: pc, desc: 'Pieces of a map to the hideout (' + pc + '/3).'});
  for (const k in QUESTS) {const Q = QUESTS[k]; if (Q.type == 'fetch' && S.flags[k] == 'found') L.push({id: 'q_' + k, type: 'quest', n: QNAME[k] || 'Lost item', cnt: 1, desc: 'Return it to its owner.'})}
  const ckeys = Object.keys(S.cards || {}).filter(c => S.cards[c]); if (ckeys.length && S.flags.cards != 'done') L.push({id: 'q_cards', type: 'quest', n: 'Keycards', cnt: ckeys.length, desc: 'Cyber Gateway keycards: ' + ckeys.join(', ') + ' (' + ckeys.length + '/4).'});
  if (S.flags.hasKey) L.push({id: 'q_key', type: 'quest', n: 'Master KEY', cnt: 1, desc: 'Opens the gate of RIG Tower.'});
  const cid = cityOf(); if (!MAPS[cid].cfg.keyGate && [0, 1, 2].some(i => digit(cid, i) != '?')) L.push({id: 'notes', type: 'quest', n: 'Lock notes', cnt: 1, desc: 'Lock code: ' + codeShown(cid)});
  q = (q || '').trim().toLowerCase(); return q ? L.filter(o => o.n.toLowerCase().includes(q) || o.type.includes(q)) : L}
function applyFood(id) {
  const F = id == 'chai' ? CHAI : FOODS[id]; if (!F) return ''; if (id == 'chai') S.chai--; else S.inv[id]--; let m = '';
  if (F.special == 'charm') {S.charmUntil = Date.now() + 180000; return 'The charm glows. Enemies keep away for 3 minutes!'}
  if (F.special == 'hint') {setTimeout(() => giveHint(true), 100); return 'Hint token used.'}
  if (F.hurt) {S.hp = Math.max(1, S.hp - F.hurt); m += ' Ouch! -' + F.hurt + ' HP.'}
  if (F.heal) {S.hp = Math.min(S.maxhp, S.hp + F.heal); m += ' +' + F.heal + ' HP.'}
  if (F.slow) {S.slowUntil = Date.now() + F.slow * 1000; m += ' You feel sluggish for ' + F.slow + 's.'}
  if (F.blind) {S.blindUntil = Date.now() + F.blind * 1000; m += ' Everything goes dark for ' + F.blind + 's!'}
  if (F.xp) {gainXP(F.xp); m += ' +' + F.xp + ' XP.'}
  return F.n + '.' + m}
function useItem(o) {
  if (!o) return; if (o.type == 'weapon') return equip(o.id);
  if (o.type == 'outfit') {S.outfit = S.outfit == o.id ? null : o.id; sfx('select'); save(); return toast(S.outfit ? 'Wearing: ' + OUTFITS[o.id].n : 'Back to your normal clothes')}
  if (o.type == 'vehicle') return toggleRide(o.id.slice(4));
  if (o.type == 'food') {if (o.id == 'chai') return quickHeal(); const F = FOODS[o.id]; if (!F) return;
    if (!F.special && !F.hurt && !F.slow && !F.blind && S.hp >= S.maxhp && !F.xp) return toast('HP is already full');
    if (F.special == 'charm' && charmLeft() > 0) return toast('A charm is already working.'); sfx('heal'); toast('You ' + (F.fish ? 'eat the ' : 'use ') + applyFood(o.id)); save()}}
async function eatInBattle(o) {if (!B || B.busy || B.over) return; B.bag = 0; if (o.id == 'chai') return drinkChai(); if (S.hp >= S.maxhp && !FOODS[o.id].hurt) {B.msg = 'HP is already full!'; return}
  B.busy = 1; const m = applyFood(o.id); spawnFx('heal', 'me'); sfx('heal'); B.msg = 'You eat ' + m; await sleep(1000); await foeTurn()}
function moveInfo(m) {const F = B.F, it = ITEMS[S.eq], eff = F.weak == m.k ? 'effective' : F.res == m.k ? 'waste' : 'normal', base = m.k == 'heavy' ? .78 : m.k == 'sharp' ? .92 : .88,
    acc = Math.max(.45, Math.min(.99, base + (eff == 'effective' ? .06 : eff == 'waste' ? -.12 : 0))), stat = m.k == 'sharp' ? it.sharp : m.k == 'heavy' ? it.wt : it.pow, mult = eff == 'effective' ? 1.5 : eff == 'waste' ? .55 : 1,
    mid = (m.b + stat * .6 + S.lv * 1.4 + it.str * .4) * mult; return {eff, acc, mult, lo: Math.round(mid * .85), hi: Math.round(mid * 1.15)}}
// ---------- hints (buy them with money, or use a Hint Token) ----------
const hintCost = () => 30 + cityIdx() * 20;
function askHint() {if (!S || B || D || SH || CODE || CHO || MOD || cur().d.indoor && false) return; const tok = (S.inv.hintcard || 0) > 0;
  CHO = {title: 'Hint', q: 'Buy a hint for your current mission? ' + (tok ? '(You will use one Hint Token.)' : 'It costs Rs.' + hintCost() + '.'), opts: ['Yes, give me a hint', 'No, I will figure it out'], cb: i => {CHO = null; if (i == 0) giveHint(false)}}}
function giveHint(free) {const tok = (S.inv.hintcard || 0) > 0; if (!free && !tok && S.money < hintCost()) {sfx('wrong'); return toast('Not enough money for a hint.')}
  const h = hintInfo(); if (!free) {if (tok) S.inv.hintcard--; else S.money -= hintCost()} sfx('coin'); if (h.mark) S.hintMark = Object.assign({until: Date.now() + 30000, map: S.map}, h.mark); say(h.lines, null, 'Hint', null); save()}
function dirWord(dx, dy) {const a = Math.abs(dx), b = Math.abs(dy), v = dy < 0 ? 'north' : 'south', h = dx < 0 ? 'west' : 'east'; return a < b * .5 ? v : b < a * .5 ? h : v + '-' + h}
function doorOf(map, name) {const i = bldIdx(map, name); if (i < 0) return null; const b = MAPS[map].blds[i]; return {x: b[0] + (b[2] >> 1), y: b[1] + b[3]}}
function hintInfo() {
  const d = cur().d, id = cityOf(), f = S.flags, D0 = MAPS[id];
  if (d.indoor) {const q0 = Object.keys(QUESTS).find(k => QUESTS[k].map == id && QUESTS[k].inside && f[k] == 'active');
    if (q0 && d.towerOf == QUESTS[q0].inside.bld) return {lines: ['The item is on floor ' + (QUESTS[q0].inside.floor + 1) + ' of ' + d.towerOf + '. Use the lift in the corner to change floors, then search the room.']};
    if (q0) return {lines: ['The item is inside ' + QUESTS[q0].inside.bld + '. Go in and search the floor.']};
    if (d.towerOf == 'Cyber Gateway' && f.cards == 'active') return {lines: ['Each floor of Cyber Gateway hides one keycard. Look for a small glowing card on a desk, shelf or table. Floors with a card you have not found are listed by the lift.']};
    return {lines: ['Leave the building through the door at the bottom, then check the Mission text at the top-left.']}}
  const pre = Math.abs; const rel = (x, y) => {const dx = x - S.x, dy = y - S.y; return 'about ' + (pre(dx) + pre(dy)) + ' steps ' + dirWord(dx, dy) + ' of you'};
  const qs = Object.keys(QUESTS).filter(k => QUESTS[k].map == id), nm = Q => {const n = d.npcs.find(n => n.giver == Q.giver); return n ? n.name : 'the quest giver'};
  for (const k of qs) if (f[k] == 'found') {const Q = QUESTS[k], n = d.npcs.find(n => n.giver == Q.giver); return {lines: ['Take it back to ' + nm(Q) + ', ' + (n ? rel(n.x, n.y) : '') + '. They are marked for 30 seconds.'], mark: n && {x: n.x, y: n.y}}}
  for (const k of qs) if (f[k] == 'active') {const Q = QUESTS[k];
    if (Q.type == 'fetch') {if (Q.inside) {const dr = doorOf(id, Q.inside.bld); return {lines: ['It is inside ' + Q.inside.bld + (Q.inside.floor ? ' on floor ' + (Q.inside.floor + 1) + ' (use the lift)' : '') + '. The door is ' + (dr ? rel(dr.x, dr.y) : 'nearby') + '. Search the floor carefully.'], mark: dr}}
      const sp = d.spots[Q.spot]; return {lines: ['The ' + (QNAME[k] || 'item') + ' is ' + rel(sp[0], sp[1]) + '. Look for the sparkle. It is marked for 30 seconds.'], mark: {x: sp[0], y: sp[1]}}}
    if (Q.type == 'kill') {let best = null, bd = 1e9; ents.forEach(e => {if (e.t == 'foe' && e.f == Q.foe) {const dd = Math.abs(e.x - S.x) + Math.abs(e.y - S.y); if (dd < bd) {bd = dd; best = e}}}); return {lines: [best ? 'The nearest ' + FOES[Q.foe].n + ' is ' + rel(best.x, best.y) + '.' : 'No ' + FOES[Q.foe].n + ' nearby right now. They respawn in a few minutes. Explore the lanes.', 'Tip: use an attack marked EFFECTIVE to win faster.'], mark: best && {x: best.x, y: best.y}}}
    if (Q.type == 'riddle') return {lines: ['The correct answer starts with the letter "' + Q.opts[Q.ans][0] + '".']};
    if (Q.type == 'cards') {const miss = ['RED', 'BLUE', 'GREEN', 'GOLD'].filter(c => !S.cards[c]); const dr = doorOf(id, 'Cyber Gateway'); return {lines: ['Still missing: ' + miss.join(', ') + '. Cyber Gateway has one card on each of four different floors. Ride the lift and check every floor.'], mark: dr}}}
  for (const k of qs) if (!f[k]) {const Q = QUESTS[k], n = d.npcs.find(n => n.giver == Q.giver); return {lines: ['Talk to ' + nm(Q) + ', ' + (n ? rel(n.x, n.y) : 'in town') + '. They have a mission for you.'], mark: n && {x: n.x, y: n.y}}}
  if (!f['pz_' + id + '_ok']) {const pz = d.cfg.pz, seq = f['pz_' + id] || [], nx = pz.order[seq.length], p = d.pz[nx]; return {lines: ['The next one to ' + (pz.kind == 'node' ? 'reboot' : 'light') + ' is the ' + pz.names[nx] + ' (' + rel(p.x, p.y) + ').'], mark: {x: p.x, y: p.y}}}
  if (pcN(id) < 3) {let best = null, bd = 1e9; for (let i = 0; i < 3; i++) {const s = d.spots['pc' + i]; if (s && !f['pc_' + id + '_' + i]) {const dd = Math.abs(s[0] - S.x) + Math.abs(s[1] - S.y); if (dd < bd) {bd = dd; best = s}}} return {lines: ['A torn map piece glints ' + rel(best[0], best[1]) + '. Look for the cyan sparkle.'], mark: {x: best[0], y: best[1]}}}
  if (d.cfg.keyGate && !f.hasKey) {const n = d.npcs.find(n => n.keyGiver); return {lines: ['CTO Meera gives the Master KEY. She is ' + (n ? rel(n.x, n.y) : 'near the start') + '.'], mark: n && {x: n.x, y: n.y}}}
  if (!f['gate_' + id]) {const c = d.cfg.code; return {lines: d.cfg.keyGate ? ['Use the Master KEY at the gate of ' + d.cfg.lair.name + '.'] : ['The lock needs ' + c.length + ' ' + (typeof c[0] == 'string' ? 'letters' : 'digits') + '. You learn them from missions, riddles and the puzzle.' + (typeof c[0] == 'string' ? '' : ' The last digit is ' + c[3] + '.')], mark: {x: d.lair[0], y: d.lair[1] + 2}}}
  if (!f['boss_' + id]) return {lines: ['Go inside ' + d.cfg.lair.name + ' and defeat ' + d.cfg.bossName + '. Heal up and pick EFFECTIVE attacks.'], mark: {x: d.lair[0], y: d.lair[1]}};
  if (id == 'hyd') return {lines: ['Both roads are open. EAST edge of the map leads to Secunderabad. SOUTH edge leads to Hitech City. Pick whichever boss you want to fight next.']};
  return {lines: ['You have finished this city. Follow the road to the next one.']}}
// ---------- hazards: autos and trains hurt, followers, pets ----------
function hurtPlayer(n, msg) {S.hp -= n; S.hurtCD = 100; S.flash = 14; sfx('hit'); toast(msg + '  -' + n + ' HP'); const [dx, dy] = vec[S.dir]; [[-dx, -dy], [dy, dx], [-dy, -dx]].some(([ax, ay]) => {if (free(S.x + ax, S.y + ay)) {S.x += ax; S.y += ay; return true}}); if (S.hp <= 0) faintWorld()}
function hazards() {if (!S || S.hurtCD > 0) {if (S && S.hurtCD > 0) S.hurtCD--; return} const d = cur().d; if (d.indoor || S.swim || D) return;
  for (const e of ents) if (e.t == 'auto' && (e.px != e.x || e.py != e.y) && Math.hypot(e.px - S.px, e.py - S.py) < .7) return hurtPlayer(Math.round(6 + S.lv * .6 + tierOf()), 'An auto ran into you!');
  if (d.trackY != null) {const tx = ((tick * 1.6) % ((d.w + 14) * T)) - 12 * T, px = S.px * T + 16; if (Math.abs(S.py - d.trackY) < .85 && px > tx - 4 && px < tx + T * 10 + 18) return hurtPlayer(Math.round(S.maxhp * .25), 'The train hit you!')}}
function faintWorld() {S.riding = null; const lost = Math.min(S.money, 400, Math.floor(S.money * .1)); S.money -= lost; const mid = cityOf(), d = MAPS[mid]; let best = null, bd = 1e9;
  d.blds.forEach(b => {if (b[7] == 'h') {const ox = d.indoor ? S.ret.x : S.x, oy = S.y, dd = Math.abs(b[0] - ox) + Math.abs(b[1] - oy); if (dd < bd) {bd = dd; best = b}}}); S.hp = S.maxhp; const f = best ? [best[0] + (best[2] >> 1), best[1] + best[3]] : d.start; changeMap(mid, f[0], f[1]);
  say(['You blacked out... and woke up outside a hospital.', 'HP is full again, but you lost Rs.' + lost + '. Watch out for traffic and trains!'], null, 'Nurse', NPCL.nurse)}
function followAI(e) {const dx = S.x - e.x, dy = S.y - e.y, dist = Math.abs(dx) + Math.abs(dy); if (dist > 14) {const p = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(o => [S.x + o[0], S.y + o[1]]).find(p => free(p[0], p[1], e)); if (p) {e.x = e.px = p[0]; e.y = e.py = p[1]} return}
  if (dist > 2 && --e.w <= 0) {e.w = 3; const dd = Math.abs(dx) > Math.abs(dy) ? [dx > 0 ? 'right' : 'left', dy > 0 ? 'down' : 'up'] : [dy > 0 ? 'down' : 'up', dx > 0 ? 'right' : 'left']; for (const k of dd) {const [ax, ay] = vec[k]; if ((e.x + ax != S.x || e.y + ay != S.y) && free(e.x + ax, e.y + ay, e)) {e.dir = k; e.x += ax; e.y += ay; break}}}
  else if (dist <= 2 && Math.random() < .004) HEARTS.push({x: e.px * T + 16, y: e.py * T, t: 0})}
function petTalk(e) {
  if (e.k != 'cat' && e.k != 'dog') return say([ANIMAL_TALK[e.k]]);
  const fish = Object.keys(S.inv).find(k => S.inv[k] > 0 && FOODS[k] && FOODS[k].fish), opts = ['Pet it']; if (fish && !e.fol) opts.push('Give a fish'); opts.push('Leave it');
  CHO = {title: e.k == 'cat' ? 'Cat' : 'Dog', q: e.fol ? 'Your ' + e.k + ' looks happy. What do you do?' : 'A ' + e.k + ' looks at you. What do you do?', opts, cb: i => {CHO = null; const o = opts[i]; if (o == 'Pet it') petIt(e); else if (o == 'Give a fish') feedPet(e, fish)}}}
function petIt(e) {sfx('select'); for (let i = 0; i < 5; i++) HEARTS.push({x: e.px * T + 8 + i * 4, y: e.py * T - i * 3, t: -i * 6}); S.pets = (S.pets || 0) + 1;
  say([e.fol ? 'Your ' + e.k + ' purrs and nuzzles your hand.' : e.k == 'cat' ? 'The cat purrs softly. Maybe a tasty fish would make it your friend?' : 'The dog wags its tail happily. A fish would make it follow you!'])}
function feedPet(e, fish) {S.inv[fish]--; for (let i = 0; i < 9; i++) HEARTS.push({x: e.px * T + 4 + i * 3, y: e.py * T - (i % 3) * 5, t: -i * 5}); sfx('heal');
  if ((S.followers || []).length >= 3) return say(['The ' + e.k + ' gobbles the fish and loves you, but you already have 3 friends following you.']);
  e.fol = 1; e.wander = 0; e.sp = 1 / 13; S.followers.push({k: e.k}); if (e.slot != null) S.tamed[S.map + ':' + e.slot] = 1; save(); say(['The ' + e.k + ' gobbles the fish... and now follows you everywhere! (' + S.followers.length + '/3 friends)'])}
function drawHeart(x, y, a) {X.globalAlpha = a; rc('#ff4d6d', x, y + 1, 2, 3); rc('#ff4d6d', x + 4, y + 1, 2, 3); rc('#ff4d6d', x + 1, y, 4, 4); rc('#ff4d6d', x + 2, y + 4, 2, 2); rc('#ffd0dc', x + 1, y + 1, 1, 1); X.globalAlpha = 1}
function drawWorldExtras(d) {
  HEARTS = HEARTS.filter(h => h.t < 60); HEARTS.forEach(h => {h.t++; if (h.t > 0) drawHeart(Math.round(h.x + Math.sin(h.t / 6) * 5), Math.round(h.y - h.t * .7), 1 - h.t / 60)});
  const hm = S.hintMark; if (hm && hm.map == S.map && Date.now() < hm.until) {const px = hm.x * T, py = hm.y * T, p = Math.sin(tick / 8);
    X.strokeStyle = 'rgba(255,230,100,' + (.55 + p * .3) + ')'; X.lineWidth = 3; X.beginPath(); X.ellipse(px + 16, py + 24, 18 + p * 3, 9 + p * 1.5, 0, 0, 7); X.stroke();
    const ay = py - 18 + Math.round(p * 3); rc('#ffd34d', px + 12, ay, 8, 8); rc('#ffd34d', px + 14, ay + 8, 4, 4); rc('#fff3a0', px + 14, ay + 2, 2, 2)}}
function drawExtras() {
  if (S.flash > 0) {X.fillStyle = 'rgba(255,40,40,' + S.flash / 28 + ')'; X.fillRect(0, 0, LW, LH); S.flash--}
  if (S.blindUntil > Date.now()) {const g = X.createRadialGradient(LW / 2, LH / 2, 10, LW / 2, LH / 2, Math.max(LW, LH) * .55); g.addColorStop(0, 'rgba(0,0,0,.2)'); g.addColorStop(.25, 'rgba(0,0,0,.97)'); X.fillStyle = g; X.fillRect(0, 0, LW, LH); tx('You cannot see!', LW / 2, LH / 2 - 60, '#ffb0b0', 16, F_T, 'center')}
  const hm = S.hintMark; if (hm && hm.map == S.map && Date.now() < hm.until && !INV) {const sx = hm.x * T + 16 - cam.x, sy = hm.y * T + 16 - cam.y; if (sx < 8 || sy < 8 || sx > LW - 8 || sy > LH - 8) {const cx = LW / 2, cy = LH / 2, an = Math.atan2(sy - cy, sx - cx), ex = Math.max(20, Math.min(LW - 20, cx + Math.cos(an) * 400)), ey = Math.max(60, Math.min(LH - 20, cy + Math.sin(an) * 400));
    X.save(); X.translate(ex, ey); X.rotate(an); X.fillStyle = '#ffd34d'; X.strokeStyle = '#000'; X.lineWidth = 2; X.beginPath(); X.moveTo(12, 0); X.lineTo(-8, -9); X.lineTo(-4, 0); X.lineTo(-8, 9); X.closePath(); X.fill(); X.stroke(); X.restore()}}
  const d = cur().d; if (d.indoor && d.floors) {const t = 'FLOOR ' + (d.floor + 1) + ' / ' + d.floors, w = tw(t, 17, F_R) + 22, narrow = LW < 440, x = narrow ? LW - w - 36 : LW - w - 6, y = narrow ? 6 : 38; ibox(x, y, w, 26, {a: .85, plain: 1}); tx(t, x + w / 2, y + 19, '#ffd36b', 17, F_R, 'center'); if (d.floorName) tx(d.floorName, x + w, y + 40, '#bfe6f5', 13, F_T, 'right')}
  if (S.riding) tx('V: get off', LW - 8, LH - 24, '#ffd36b', 12, F_T, 'right');
  if (ERRP) {const e = ERRP, a = Math.min(1, e.t / 18), sh = e.t > 120 ? Math.sin(e.t * 2) * 3 : 0; X.globalAlpha = a; const w = Math.min(LW - 20, 360), x = (LW - w) / 2 + sh, y = LH / 2 - 56; X.fillStyle = 'rgba(120,0,10,.35)'; X.fillRect(0, 0, LW, LH);
    X.fillStyle = '#140507'; X.fillRect(x, y, w, 112); X.fillStyle = '#c1121f'; X.fillRect(x, y, w, 30); X.strokeStyle = '#ffd36b'; X.lineWidth = 2; X.strokeRect(x + 1, y + 1, w - 2, 110); tx('X  ' + e.title, x + w / 2, y + 22, '#fff', 20, F_R, 'center');
    wrapT(e.msg, w - 30, 15).slice(0, 3).forEach((l, i) => tx(l, x + w / 2, y + 54 + i * 18, '#ffe0d0', 15, F_T, 'center')); tx('Tap or press any key', x + w / 2, y + 104, '#ffb0a0', 12, F_T, 'center'); X.globalAlpha = 1; if (--e.t <= 0) ERRP = null; hit(0, 0, LW, LH, () => {ERRP = null})}}
// ---------- full screen / text size ----------
function toggleFull() {const el = document.documentElement; if (document.fullscreenElement || document.webkitFullscreenElement) {(document.exitFullscreen || document.webkitExitFullscreen).call(document); return}
  const rq = el.requestFullscreen || el.webkitRequestFullscreen; if (!rq) return toast('Full screen is not supported here. On iPhone: Share > Add to Home Screen.'); const p = rq.call(el); if (p && p.then) p.then(() => {try {screen.orientation.lock('landscape').catch(() => {})} catch (e) {}}).catch(() => toast('Full screen was blocked by the browser.'))}
document.addEventListener('fullscreenchange', () => {fit(); document.body.classList.toggle('isfull', !!document.fullscreenElement)});
const FSN = ['Small', 'Normal', 'Large'], FSV = [.85, 1, 1.15];
FS = FSV[SET.fsi == null ? 1 : SET.fsi];
function setFS(i) {SET.fsi = Math.max(0, Math.min(2, i)); FS = FSV[SET.fsi]; saveSettings()}
// ---------- menu (more rows, tighter spacing so nothing overlaps) ----------
MENU_ROWS.length = 0; MENU_ROWS.push('Resume', 'View distance', 'Music volume', 'Sound effects', 'Music', 'Text size', 'Buy a hint  (H)', 'Full screen', 'Guide', 'Save game', 'Save and log out');
function menuAct(i, dir) {
  if (i == 0 && !dir) MENU = null; else if (i == 1 && dir) {SET.zoom = Math.max(0, Math.min(4, SET.zoom + dir)); saveSettings(); fit()}
  else if (i == 2 && dir) setVol('mus', SET.mus + dir * .1); else if (i == 3 && dir) {setVol('sfx', SET.sfx + dir * .1); sfx('select')}
  else if (i == 4) setMusic(!SET.musOn); else if (i == 5 && dir) setFS((SET.fsi == null ? 1 : SET.fsi) + dir);
  else if (i == 6 && !dir) {MENU = null; askHint()} else if (i == 7 && !dir) toggleFull(); else if (i == 8 && !dir) {MENU = null; togglePnl('guide')}
  else if (i == 9 && !dir) {save(); toast('Game saved'); MENU = null} else if (i == 10 && !dir) {save(); location.reload()}}
function drawMenu() {
  uiModal(); panel(() => {ibox(70, 8, 340, 336); plate(240, -4, 'Paused', 16);
    MENU_ROWS.forEach((n, i) => {const y = 34 + i * 27, sel = MENU.sel == i, ov = hit(86, y, 308, 24, () => {MENU.sel = i; menuAct(i, 0)}, ''); X.fillStyle = sel ? 'rgba(193,68,14,.7)' : ov ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.3)'; X.fillRect(86, y, 308, 24); X.strokeStyle = sel ? '#ffd36b' : '#6b4a2a'; X.lineWidth = 1.5; X.strokeRect(86.75, y + .75, 306.5, 22.5); tx(n, 98, y + 17, PAL.cream, 15);
      const arrows = i == 1 || i == 2 || i == 3 || i == 5; let val = '';
      if (i == 1) val = ZN[SET.zoom]; if (i == 4) val = SET.musOn ? 'ON' : 'OFF'; if (i == 5) val = FSN[SET.fsi == null ? 1 : SET.fsi];
      if (arrows) {btn(262, y + 2, 20, 20, '<', () => {MENU.sel = i; menuAct(i, -1)}, '', '#4a2a10', 13); btn(368, y + 2, 20, 20, '>', () => {MENU.sel = i; menuAct(i, 1)}, '', '#4a2a10', 13);
        if (i == 1 || i == 5) tx(val, 325, y + 17, '#ffd36b', 14, F_T, 'center'); else {const v = i == 2 ? SET.mus : SET.sfx; hit(288, y + 6, 76, 12, () => {const f = Math.max(0, Math.min(1, (MOUSE.x - UT.ox - 288 * UT.s) / (76 * UT.s))); setVol(i == 2 ? 'mus' : 'sfx', f)}, 'Click to set the volume'); bar(288, y + 8, 76, v, 1, i == 2 ? '#e0b04a' : '#7ec8ff', 8); tx(Math.round(v * 100) + '%', 326, y + 7, '#ffd36b', 9, F_T, 'center')}}
      else if (val) tx(val, 380, y + 17, SET.musOn || i != 4 ? '#7ee08a' : '#ff8a6a', 14, F_T, 'right')});
    tx('Up / Down: choose   Left / Right: change   Enter: select', 240, 338, '#9c8a74', 11, F_T, 'center')}, 480, 352)}
// ---------- riddle / choice box (any number of options, optional title) ----------
function drawChoice() {const n = CHO.opts.length, bh = 110 + n * 36 + (wrapT(CHO.q, 350, 17).length - 1) * 20, top = Math.max(8, (352 - bh) / 2);
  uiModal(); panel(() => {ibox(40, top, 400, bh); plate(240, top - 14, CHO.title || 'Riddle', 16); const ls = wrapT(CHO.q, 350, 17); ls.forEach((l, i) => tx(l, 64, top + 48 + i * 20, '#fff7e0', 17));
    CHO.opts.forEach((o, i) => btn(64, top + 56 + ls.length * 20 + i * 36, 352, 30, (i + 1) + '.  ' + o, () => CHO.cb(i), '', '#7a1022', 16))}, 480, 352)}
// ---------- hideout lock: digits or letters, or a Master KEY ----------
function gateTry() {const id = S.map, cfg = MAPS[id].cfg, d = cur().d;
  if (cfg.keyGate) {if (S.flags.hasKey) {S.flags['gate_' + id] = 1; cur().g[d.gate[1]][d.gate[0]].s = 0; sfx('unlock'); save(); return say(['The Master KEY turns and RIG Tower\'s security gate slides open!', 'Two Security Bot Guards and RIG Ritesh wait inside. Heal up first!'])}
    return say(['A biometric lock glows red: "MASTER KEY REQUIRED".', 'CTO Meera has the KEY, but only for someone who has completed every mission in Hitech City.'])}
  const len = cfg.code.length, letters = typeof cfg.code[0] == 'string', known = [0, 1, 2].map(i => digit(id, i));
  CODE = {buf: '', len, letters, known, msg: '', cb: b => {const code = cfg.code.join('');
    if (b == code) {CODE = null; S.flags['gate_' + id] = 1; cur().g[d.gate[1]][d.gate[0]].s = 0; sfx('unlock'); say(['Click... the last tumbler falls into place and the gate swings open!', 'Two guards and the boss wait inside. Heal up first!']); save()}
    else {S.flags['tries_' + id] = (S.flags['tries_' + id] || 0) + 1; sfx('wrong'); S.flash = 10; if (len == 4 && b.slice(0, 3) == code.slice(0, 3)) {CODE.msg = 'Three tumblers click! Only the last digit is wrong. Try 0-9.'; CODE.buf = code.slice(0, 3)} else {CODE.msg = 'INCORRECT CODE. The lock stays shut.'; CODE.buf = ''}}}}}
function codeKey(k) {if (k == 'Escape') {CODE = null; return} if (CODE.letters ? /^[a-zA-Z]$/.test(k) : /^[0-9]$/.test(k)) {if (CODE.buf.length < CODE.len) CODE.buf += k.toUpperCase()} else if (k == 'Backspace') CODE.buf = CODE.buf.slice(0, -1); else if ((k == 'Enter' || k == 'f' || k == ' ') && CODE.buf.length == CODE.len) CODE.cb(CODE.buf)}
function drawCode() {const L = CODE.len, bw = 44, gap = 12, x0 = 240 - (L * bw + (L - 1) * gap) / 2;
  uiModal(); panel(() => {ibox(30, 14, 420, 326); plate(240, 0, 'Hideout Gate Lock', 16); closeBtn(424, 24, () => {CODE = null});
    tx('Clues from your missions:', 240, 66, PAL.cream, 15, F_T, 'center'); for (let i = 0; i < L; i++) {const k = i < 3 ? CODE.known[i] : '?', x = x0 + i * (bw + gap); X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(x, 74, bw, 30); X.strokeStyle = k == '?' ? '#888' : PAL.gold; X.strokeRect(x + .5, 74.5, bw - 1, 29); tx(k, x + bw / 2, 97, k == '?' ? '#888' : '#ffd36b', 22, F_R, 'center')}
    tx(CODE.letters ? 'Enter the ' + L + ' LETTERS. Each one came from a mission, riddle or puzzle.' : 'The last digit is scratched out. Try every digit from 0 to 9!', 240, 124, '#ffb88a', 13, F_T, 'center');
    for (let i = 0; i < L; i++) {const x = x0 + i * (bw + gap); X.fillStyle = '#1a0a12'; X.fillRect(x, 134, bw, 38); X.strokeStyle = PAL.saffron; X.lineWidth = 2; X.strokeRect(x + 1, 135, bw - 2, 36); tx(CODE.buf[i] || ((tick >> 5 & 1) && i == CODE.buf.length ? '_' : ''), x + bw / 2, 163, '#fff', 26, F_R, 'center')}
    if (CODE.msg) tx(CODE.msg, 240, 188, '#ff8a7a', 14, F_T, 'center');
    if (CODE.letters) for (let i = 0; i < 26; i++) {const x = 52 + (i % 9) * 42, y = 198 + (i / 9 | 0) * 30; btn(x, y, 38, 26, String.fromCharCode(65 + i), () => {if (CODE.buf.length < L) CODE.buf += String.fromCharCode(65 + i)}, '', '#4a2a10', 15)}
    else for (let i = 0; i < 10; i++) {const x = 112 + (i % 5) * 52, y = 202 + (i / 5 | 0) * 34; btn(x, y, 44, 28, String(i), () => {if (CODE.buf.length < L) CODE.buf += i}, '', '#4a2a10', 17)}
    btn(60, 300, 70, 28, 'Clear', () => {CODE.buf = ''}, '', '#4a2a10', 14); btn(190, 300, 100, 28, 'Try the lock', () => {if (CODE.buf.length == L) CODE.cb(CODE.buf)}, 'Enter', '#1f6f4a', 15); btn(350, 300, 70, 28, 'Back', () => {CODE.buf = CODE.buf.slice(0, -1)}, 'Backspace', '#4a2a10', 14)}, 480, 352)}
// ---------- the Master KEY lady ----------
function keyTalk(e) {const d = cur().d, f = S.flags, id = S.map, w = l => say(l, null, e.name, e.L);
  if (f.hasKey) return w(['You carry the Master KEY. RIG Tower is in the south-east. Good luck, and heal up first!']);
  const qs = Object.keys(QUESTS).filter(k => QUESTS[k].map == id), left = qs.filter(k => f[k] != 'done').map(k => QUESTS[k].title), need = [];
  if (left.length) need.push('missions: ' + left.join(', ')); if (!f['pz_' + id + '_ok']) need.push('the network nodes puzzle'); if (pcN(id) < 3) need.push('the 3 torn map pieces (' + pcN(id) + '/3)');
  if (need.length) return w(['I am the CTO. The Master KEY opens RIG Tower, but I only give it to someone who has cleared EVERY mission.', 'Still to do: ' + need.join('; ') + '.']);
  w(['You cleared every mission, rebooted the nodes and found the map pieces. Impressive.', 'Take the Master KEY. RIG Tower is in the south-east. Heal up and use EFFECTIVE attacks!'], () => {}); D.cb = () => {S.flags.hasKey = 1; sfx('unlock'); toast('You got the Master KEY!'); save()}}

// testing code (type UNLOCK in the bag search and press Enter): unlock every map, level 100, +Rs.10000, every item
function devUnlock() {S.flags.unlockAll = 1; S.lv = 100; S.xp = 0; S.maxhp = 50 + 99 * 10; S.hp = S.maxhp; S.money += 10000; S.rod = 1;
  Object.keys(ITEMS).forEach(k => {if (!S.items.includes(k)) S.items.push(k)}); Object.keys(OUTFITS).forEach(k => {if (!S.outfits.includes(k)) S.outfits.push(k)}); Object.keys(VEHICLES).forEach(k => {if (!S.veh.includes(k)) S.veh.push(k)});
  for (const id of ['hyd', 'sec', 'hit']) if (S.seen && S.seen[id]) S.seen[id] = S.seen[id].map(() => 1); sfx('level'); toast('Everything unlocked: all maps, Lv100, +Rs.10000'); save()}
