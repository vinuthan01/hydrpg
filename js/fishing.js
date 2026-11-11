// ===== fishing + mini-games (cricket, football, bowling) =====
const FISH = {
  rohu:{n:'Rohu',heal:30,xp:6,w:30,price:0,desc:'A common river fish. Tasty. +30 HP, +6 XP.'}, catla:{n:'Catla',heal:42,xp:8,w:22,desc:'A big silvery fish. +42 HP, +8 XP.'},
  tilapia:{n:'Tilapia',heal:22,xp:4,w:24,desc:'A small lake fish. +22 HP, +4 XP.'}, murrel:{n:'Murrel',heal:55,xp:12,w:9,desc:'A fighting fish. +55 HP, +12 XP.'},
  mahseer:{n:'Golden Mahseer',heal:95,xp:25,w:3,desc:'A rare golden fish! +95 HP, +25 XP.'}, prawns:{n:'River Prawns',heal:35,xp:6,w:8,desc:'Sweet prawns. +35 HP, +6 XP.'},
  puffer:{n:'Pufferfish',heal:0,hurt:18,xp:3,w:6,bad:1,desc:'Spiky and strange. Looks risky to eat...'}, catfish:{n:'Rotten Catfish',heal:0,hurt:8,slow:10,xp:3,w:6,bad:1,desc:'Smells awful. Might make you sluggish...'},
  eel:{n:'Glowing Eel',heal:10,blind:5,xp:5,w:5,bad:1,desc:'It glows an odd green. Eat at your own risk...'}, mudfish:{n:'Slimy Mudfish',heal:5,slow:7,xp:3,w:6,bad:1,desc:'Slimy and slow. Hmm...'}, boot:{n:'Blind-Fish Roe',heal:0,blind:3,hurt:5,xp:2,w:4,bad:1,desc:'Odd roe. Your eyes tingle just looking at it.'}};
Object.keys(FISH).forEach(k => {const F = FISH[k]; FOODS['f_' + k] = {n: F.n, price: 0, heal: F.heal, hurt: F.hurt, slow: F.slow, blind: F.blind, xp: F.xp, desc: F.desc, fish: 1, bad: F.bad}});
function pickFish() {const t = rodT(), rain = typeof WX != 'undefined' && WX.rain > .3 ? 2 : 1, ks = Object.keys(FISH), W = k => FISH[k].w * (FISH[k].bad ? (t >= 4 ? 0 : 1 / (1 + .6 * (t - 1))) : (FISH[k].w <= 9 ? (1 + .6 * (t - 1)) * rain : 1)), tot = ks.reduce((a, k) => a + W(k), 0); let r = Math.random() * tot; for (const k of ks) {r -= W(k); if (r <= 0) return k} return 'rohu'}
function fishOrSwim(fx, fy) {CHO = {title: 'Water', q: 'You have a fishing rod. What do you want to do here?', opts: ['Fish here', 'Swim', 'Cancel'], cb: i => {CHO = null; if (i == 0) startFishing(fx, fy); else if (i == 1) {S.swim = 1; if (free(fx, fy)) {S.x = fx; S.y = fy; sfx('splash'); toast('Swimming! Walk to the shore to climb out.')} else S.swim = 0}}}}
function startFishing(fx, fy) {
  MOD = {t0: performance.now(), st: 'cast', wait: (1500 + Math.random() * 2800) / (1 + .2 * (rodT() - 1)), bite: 0, msg: 'Casting...', fx, fy, res: null, caught: 0,
    key(k) {if (k == 'Escape') {MOD = null; return} if (k != ' ' && k != 'f' && k != 'Enter') return; this.press()},
    press() {const now = performance.now(), e = now - this.t0;
      if (this.st == 'cast') {this.st = 'done'; this.msg = 'Too early! The fish got scared.'; this.end = now + 1500; sfx('wrong')}
      else if (this.st == 'bite') {const f = pickFish(); this.st = 'done'; this.fish = f; this.msg = 'You caught a ' + FISH[f].n + '!'; this.end = now + 1900; S.inv['f_' + f] = (S.inv['f_' + f] || 0) + 1; sfx('catch'); gainXP((FISH[f].bad ? 2 : 3) * (rodT() >= 4 ? 2 : 1)); S.stat.fish = (S.stat.fish || 0) + 1; sideProgress('fish'); save()}
      else if (this.st == 'done' && now > this.end - 1200) {MOD = null}},
    draw() {const now = performance.now(), e = now - this.t0;
      if (this.st == 'cast' && e > this.wait) {this.st = 'bite'; this.biteAt = now; this.window = (1000 + Math.random() * 450) * (1 + .3 * (rodT() - 1)) * (typeof WX != 'undefined' && WX.rain > .3 ? 1.3 : 1); sfx('splash')}
      if (this.st == 'bite' && now - this.biteAt > this.window) {this.st = 'done'; this.msg = 'Too slow... the fish got away!'; this.end = now + 1500; sfx('miss')}
      if (this.st == 'done' && now > this.end) {MOD = null; return}
      rc('rgba(6,14,30,.78)', 0, 0, LW, LH); hit(0, 0, LW, LH, () => this.press());
      const cx = LW / 2, cy = LH / 2; panelAt(cx, cy, 340, 300, () => {
        X.fillStyle = '#2a7fc0'; X.fillRect(-160, -30, 320, 130); X.fillStyle = '#4aa6e0'; for (let i = 0; i < 8; i++) X.fillRect(-150 + i * 40 + Math.sin(tick / 12 + i) * 6, -10 + (i % 3) * 30, 24, 3);
        const dip = this.st == 'bite' ? 12 + Math.sin(tick / 2) * 4 : Math.sin(tick / 14) * 2; X.strokeStyle = '#ddd'; X.lineWidth = 1; X.beginPath(); X.moveTo(-100, -86); X.lineTo(0, -30 + dip); X.stroke();
        rc('#c1121f', -5, -34 + dip, 10, 8); rc('#fff', -5, -30 + dip, 10, 4); if (this.st == 'bite') {for (let i = 0; i < 3; i++) {X.strokeStyle = 'rgba(255,255,255,' + (.8 - i * .25) + ')'; X.beginPath(); X.ellipse(0, -26 + dip, 10 + i * 8 + (tick % 12), 4 + i * 3, 0, 0, 7); X.stroke()}}
        tx(this.st == 'bite' ? 'NOW!  Press Space / tap!' : this.st == 'cast' ? 'Wait for the bobber to dip...' : this.msg, 0, -100, this.st == 'bite' ? '#ffd34d' : '#fff', this.st == 'bite' ? 22 : 17, F_R, 'center');
        if (this.st == 'bite') {const f = 1 - (now - this.biteAt) / this.window; rc('#000', -80, 70, 160, 10); rc('#ff5a3a', -79, 71, 158 * Math.max(0, f), 8)}
        if (this.st == 'done' && this.fish) {tx(FISH[this.fish].bad ? 'Hmm, that looks risky to eat...' : 'Fresh and tasty! Feed it to a cat or dog, or eat it.', 0, 90, '#cfe', 13, F_T, 'center')}
        tx('Esc: stop fishing', 0, 108, '#9bd', 12, F_T, 'center')})}}}
// a small centred panel in screen space
function panelAt(cx, cy, w, h, fn) {const U0 = UT; UT = {ox: cx, oy: cy, s: 1}; X.save(); X.translate(cx, cy); ibox(-w / 2, -h / 2 + 10, w, h - 20, {a: .9}); X.beginPath(); X.rect(-w / 2 + 6, -h / 2 + 16, w - 12, h - 32); X.clip(); fn(); X.restore(); UT = U0}
// ---------- mini-games ----------
function openGames(e) {CHO = {title: 'Game Zone', q: 'Welcome to the arcade! Entry costs Rs.20. Win Rs and XP. Pick a game:', opts: ['Cricket (batting)', 'Football (penalties)', 'Bowling (3 rolls)', 'Leave'], cb: i => {CHO = null; if (i == 3) return; if (S.money < 20) {sfx('wrong'); return toast('You need Rs.20 to play.')} S.money -= 20; sfx('coin'); [startCricket, startFootball, startBowling][i]()}}}
function mgEnd(MG, score, max, label) {const frac = score / max, win = Math.round(20 + frac * 120), xp = Math.round(8 + frac * 30 + S.lv * 2); MG.over = 1; MG.res = {win, xp, label}; S.money += win; gainXP(xp); sfx('win'); save()}
function mgFrame(MG, title, body) {rc('rgba(6,10,24,.9)', 0, 0, LW, LH); hit(0, 0, LW, LH, () => MG.press()); const cx = LW / 2, cy = LH / 2;
  panelAt(cx, cy, 400, 330, () => {tx(title, 0, -118, '#ffd36b', 22, F_R, 'center'); body(); if (MG.over) {X.fillStyle = 'rgba(0,0,0,.6)'; X.fillRect(-190, -60, 380, 130); tx(MG.res.label, 0, -22, '#fff', 20, F_R, 'center'); tx('+Rs.' + MG.res.win + '   +' + MG.res.xp + ' XP', 0, 10, '#7ee08a', 20, F_R, 'center'); tx('Space / tap to leave', 0, 44, '#ffd36b', 14, F_T, 'center')}
    tx('Esc: quit', 0, 124, '#8a9ab8', 12, F_T, 'center')})}
// cricket: hit the ball when it is in the green zone
function startCricket() {
  MOD = {balls: 6, runs: 0, ball: 0, st: 'wait', t: 0, msg: 'Get ready...', over: 0, hist: [],
    key(k) {if (k == 'Escape') {MOD = null; return} if (k == ' ' || k == 'Enter' || k == 'f') this.press()},
    press() {if (this.over) {MOD = null; return} if (this.st == 'fly') {const x = this.bx, d = Math.abs(x - 300), r = d < 14 ? 6 : d < 34 ? 4 : d < 60 ? 2 : d < 90 ? 1 : 0; this.st = 'res'; this.t = 0; this.runs += r; this.hist.push(r); this.msg = r == 6 ? 'SIX! What a shot!' : r == 4 ? 'FOUR! Beautiful!' : r ? r + ' run' + (r > 1 ? 's' : '') : 'Missed!'; sfx(r ? 'hit' : 'miss'); this.ball++}},
    draw() {this.t++; if (this.st == 'wait' && this.t > 50) {this.st = 'fly'; this.t = 0; this.bx = 40; this.sp = 4.2 + Math.random() * 2.4 + this.ball * .25}
      if (this.st == 'fly') {this.bx += this.sp; if (this.bx > 420) {this.st = 'res'; this.t = 0; this.hist.push(0); this.msg = 'Bowled! You missed it.'; this.ball++; sfx('miss')}}
      if (this.st == 'res' && this.t > 60) {if (this.ball >= this.balls) {if (!this.over) mgEnd(this, this.runs, 36, 'You scored ' + this.runs + ' runs!')} else {this.st = 'wait'; this.t = 0; this.msg = 'Next ball...'}}
      mgFrame(this, 'Gully Cricket', () => {X.fillStyle = '#2f8f4a'; X.fillRect(-190, -90, 380, 150); X.fillStyle = '#c9a26b'; X.fillRect(-190, -10, 380, 36);
        X.fillStyle = 'rgba(80,220,120,.5)'; X.fillRect(300 - 190 - 14, -10, 28, 36); X.fillStyle = 'rgba(255,220,80,.3)'; X.fillRect(300 - 190 - 34, -10, 20, 36); X.fillRect(300 - 190 + 14, -10, 20, 36);
        rc('#e8d8a8', 300 - 190 + 40, -2, 3, 20); rc('#e8d8a8', 300 - 190 + 46, -2, 3, 20); rc('#e8d8a8', 300 - 190 + 52, -2, 3, 20);
        const bx = (this.st == 'fly' ? this.bx : this.st == 'res' ? (this.hist[this.hist.length - 1] ? 300 + this.t * 6 : 440) : 40) - 190; const by = this.st == 'res' && this.hist[this.hist.length - 1] ? 6 - this.t * 3 : 8 + (this.st == 'fly' ? Math.abs(Math.sin(this.bx / 40)) * -10 : 0); rc('#c1121f', bx, by, 8, 8);
        const sw = this.st == 'res' && this.hist[this.hist.length - 1] ? 1 : 0; rc('#8b5e3c', 300 - 190 - 2 - sw * 10, -20 + sw * 14, 5, 36); rc('#d9a05a', 300 - 190 - 3 - sw * 10, -20 + sw * 14, 7, 20);
        tx(this.msg, 0, 56, '#fff', 17, F_T, 'center'); tx('Runs: ' + this.runs + '   Ball ' + Math.min(this.ball + (this.st == 'fly' ? 1 : 0), this.balls) + '/' + this.balls, 0, 84, '#ffd36b', 17, F_T, 'center'); tx('Press Space / tap when the ball is in the GREEN zone', 0, 106, '#bfe6f5', 13, F_T, 'center')})}}}
// football: stop the moving aim, then the keeper dives
function startFootball() {
  MOD = {kicks: 5, goals: 0, k: 0, st: 'aim', t: 0, ax: 0, msg: 'Stop the aim marker with Space!', over: 0, keeper: 0,
    key(k) {if (k == 'Escape') {MOD = null; return} if (k == ' ' || k == 'Enter' || k == 'f') this.press()},
    press() {if (this.over) {MOD = null; return} if (this.st == 'aim') {this.st = 'shot'; this.t = 0; this.tx = this.ax; this.kd = Math.random() < .55 ? Math.round(this.tx / 50) * 50 + (Math.random() - .5) * 40 : (Math.random() - .5) * 220; sfx('hit')}},
    draw() {this.t++; if (this.st == 'aim') this.ax = Math.sin(this.t / (14 - this.k)) * 100; if (this.st == 'shot' && this.t > 34) {const miss = Math.abs(this.tx) > 96, saved = !miss && Math.abs(this.kd - this.tx) < 34; this.k++; if (!miss && !saved) {this.goals++; this.msg = 'GOAL!'; sfx('win')} else {this.msg = miss ? 'Wide! You missed the goal.' : 'Saved by the keeper!'; sfx('miss')} this.st = 'res'; this.t = 0}
      if (this.st == 'res' && this.t > 55) {if (this.k >= this.kicks) {if (!this.over) mgEnd(this, this.goals, 5, this.goals + ' goals out of 5!')} else {this.st = 'aim'; this.t = 0; this.msg = 'Stop the aim marker with Space!'}}
      mgFrame(this, 'Penalty Shootout', () => {X.fillStyle = '#2f8f4a'; X.fillRect(-190, -90, 380, 160); X.fillStyle = '#e8e8e8'; X.fillRect(-110, -80, 220, 4); X.fillRect(-110, -80, 4, 60); X.fillRect(106, -80, 4, 60); for (let i = 0; i < 11; i++) {X.fillStyle = 'rgba(255,255,255,.18)'; X.fillRect(-106 + i * 20, -76, 1, 56)}
        const kd = this.st == 'shot' || this.st == 'res' ? this.kd : Math.sin(this.t / 30) * 30, kx = this.st == 'aim' ? kd : kd * Math.min(1, this.t / 14); rc('#f2c94c', kx - 8, -50, 16, 26); rc('#7a3a1a', kx - 5, -58, 10, 10);
        const bt = this.st == 'shot' ? Math.min(1, this.t / 24) : 0, bxp = this.tx * bt, byp = 40 - bt * 76; rc('#fff', (bt ? bxp : 0) - 5, byp - 5, 10, 10); rc('#222', (bt ? bxp : 0) - 2, byp - 2, 4, 4);
        if (this.st == 'aim') {rc('#ff4d4d', this.ax - 3, -66, 6, 6); rc('#ff4d4d', this.ax - 1, -70, 2, 14)}
        tx(this.msg, 0, 60, '#fff', 17, F_T, 'center'); tx('Goals: ' + this.goals + '   Kick ' + Math.min(this.k + 1, this.kicks) + '/' + this.kicks, 0, 86, '#ffd36b', 17, F_T, 'center'); tx('Press Space / tap to shoot. Aim inside the goal!', 0, 106, '#bfe6f5', 13, F_T, 'center')})}}}
// bowling: stop the aim, then the power
function startBowling() {
  MOD = {rolls: 3, pins: 10, score: 0, r: 0, st: 'aim', t: 0, ax: 0, pw: 0, msg: 'Stop the aim at the centre!', over: 0, down: [],
    key(k) {if (k == 'Escape') {MOD = null; return} if (k == ' ' || k == 'Enter' || k == 'f') this.press()},
    press() {if (this.over) {MOD = null; return} if (this.st == 'aim') {this.aim = this.ax; this.st = 'power'; this.t = 0; sfx('select')} else if (this.st == 'power') {this.pwv = this.pw; this.st = 'roll'; this.t = 0; sfx('hit')}},
    draw() {this.t++; if (this.st == 'aim') this.ax = Math.sin(this.t / 12) * 40; if (this.st == 'power') this.pw = (Math.sin(this.t / 10) + 1) / 2;
      if (this.st == 'roll' && this.t > 40) {const acc = 1 - Math.min(1, Math.abs(this.aim) / 38), pw = 1 - Math.abs(this.pwv - .8) * 1.6, q = Math.max(0, acc * .6 + Math.max(0, pw) * .4), left = 10 - this.down.length, n = Math.min(left, Math.round(q * q * left + Math.random() * 1.5)); const pool = [...Array(10).keys()].filter(i => !this.down.includes(i)); for (let i = 0; i < n; i++) {const j = pool.splice(Math.random() * pool.length | 0, 1)[0]; this.down.push(j)}
        this.score += n; this.r++; this.msg = n >= left ? 'STRIKE / SPARE! All pins down!' : n + ' pin' + (n == 1 ? '' : 's') + ' down!'; sfx(n ? 'hit' : 'miss'); this.st = 'res'; this.t = 0}
      if (this.st == 'res' && this.t > 60) {if (this.r >= this.rolls || this.down.length >= 10) {if (!this.over) mgEnd(this, Math.min(10, this.score), 10, this.score + ' pins knocked down!')} else {this.st = 'aim'; this.t = 0; this.msg = 'Stop the aim at the centre!'}}
      mgFrame(this, 'Bowling Alley', () => {X.fillStyle = '#c9923a'; X.fillRect(-60, -90, 120, 160); X.fillStyle = '#3a2410'; X.fillRect(-70, -90, 10, 160); X.fillRect(60, -90, 10, 160);
        [[0, -76], [-8, -68], [8, -68], [-16, -60], [0, -60], [16, -60], [-24, -52], [-8, -52], [8, -52], [24, -52]].forEach(([px, py], i) => {const d = this.down.includes(i); rc(d ? '#aa8' : '#fff', px - 3 + (d ? 6 : 0), py + (d ? 4 : 0), 6, 8); rc('#c1121f', px - 3 + (d ? 6 : 0), py + (d ? 5 : 2), 6, 2)});
        const bt = this.st == 'roll' ? Math.min(1, this.t / 36) : 0, bx = this.st == 'roll' ? this.aim * (1 - bt) * .9 + (this.aim * .2) * bt : this.ax, by = 56 - bt * 100; if (this.st != 'res') {X.fillStyle = '#1a1a40'; X.beginPath(); X.arc(bx, by, 7, 0, 7); X.fill(); rc('#fff', bx - 2, by - 3, 2, 2)}
        if (this.st == 'power') {rc('#000', -100, 54, 200, 12); rc('#3aff6a', -99 + 200 * .66, 55, 24, 10); rc('#ff5a3a', -99, 55, 198 * this.pw, 10); rc('#fff', -100 + 198 * this.pw, 52, 3, 16)}
        tx(this.msg, 0, 82, '#fff', 17, F_T, 'center'); tx('Pins: ' + Math.min(10, this.score) + '   Roll ' + Math.min(this.r + 1, this.rolls) + '/' + this.rolls, 0, 106, '#ffd36b', 16, F_T, 'center')})}}}
