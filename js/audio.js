// ===== AUDIO: original procedural music + sound effects (Web Audio, no files needed) =====
// Music is generated live: a tanpura-style drone, a soft bansuri-like flute melody, plucked strings and gentle tabla.
// Two moods: 'world' (warm, calm, nostalgic) and 'battle' (faster, tenser). All volumes live in SET.
const SET = {zoom: 2, mus: .6, sfx: .8, musOn: true};
try { Object.assign(SET, JSON.parse(localStorage.getItem('bq_settings') || '{}')) } catch (e) {}
const saveSettings = () => { try { localStorage.setItem('bq_settings', JSON.stringify(SET)) } catch (e) {} };
const AU = {ctx: null, track: null, step: 0, next: 0, timer: null, drone: [], noise: null};
const TRACKS = {
  world:  {bpm: 74,  root: 146.83, scale: [0, 2, 4, 7, 9],           droneVol: .055, kick: [0, 10], tin: [4, 12], arp: [0, 2, 4, 2, 3, 2, 1, 2]},
  battle: {bpm: 118, root: 146.83, scale: [0, 1, 3, 5, 7, 8, 10],    droneVol: .075, kick: [0, 4, 8, 12, 14], tin: [2, 6, 10, 14], arp: [0, 2, 0, 3, 0, 4, 2, 5]}
};
function auInit() {
  if (AU.ctx) { if (AU.ctx.state == 'suspended') AU.ctx.resume(); return }
  try {
    const C = AU.ctx = new (window.AudioContext || window.webkitAudioContext)();
    AU.master = C.createGain(); AU.master.connect(C.destination);
    AU.musG = C.createGain(); AU.musG.connect(AU.master);
    AU.sfxG = C.createGain(); AU.sfxG.connect(AU.master);
    // warm echo bus for the melody
    AU.echo = C.createDelay(1); AU.echo.delayTime.value = .42; const fb = C.createGain(); fb.gain.value = .34; const lp = C.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
    AU.echo.connect(lp); lp.connect(fb); fb.connect(AU.echo); lp.connect(AU.musG);
    const n = C.sampleRate, buf = C.createBuffer(1, n, C.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; AU.noise = buf;
    applyVolumes(); AU.timer = setInterval(auTick, 40);
  } catch (e) { AU.ctx = null }
}
function applyVolumes() { if (!AU.ctx) return; const t = AU.ctx.currentTime; AU.musG.gain.cancelScheduledValues(t); AU.musG.gain.setTargetAtTime(SET.musOn ? SET.mus * .55 : 0, t, .15); AU.sfxG.gain.setTargetAtTime(SET.sfx * .7, t, .05) }
function setMusic(on) { SET.musOn = on; applyVolumes(); saveSettings() }
function setVol(kind, v) { SET[kind] = Math.max(0, Math.min(1, +v.toFixed(2))); applyVolumes(); saveSettings() }
const nfreq = (T, i) => T.root * Math.pow(2, (T.scale[((i % T.scale.length) + T.scale.length) % T.scale.length] + 12 * Math.floor(i / T.scale.length)) / 12);
function setTrack(name) {
  if (!AU.ctx || AU.track == name) return; const C = AU.ctx, t = C.currentTime;
  AU.drone.forEach(o => { try { o.g.gain.setTargetAtTime(0, t, .6); o.o.stop(t + 2.5) } catch (e) {} }); AU.drone = [];
  AU.track = name; AU.step = 0; AU.next = t + .1; const T = TRACKS[name];
  [[1, 'sawtooth', 0], [1.5, 'sawtooth', 4], [.5, 'sine', 0], [2, 'triangle', -3]].forEach(([m, w, det], k) => {
    const o = C.createOscillator(), g = C.createGain(), f = C.createBiquadFilter(); o.type = w; o.frequency.value = T.root * m * .5; o.detune.value = det; f.type = 'lowpass'; f.frequency.value = k == 3 ? 900 : 420;
    g.gain.value = 0; g.gain.setTargetAtTime(T.droneVol * (k == 2 ? 1.4 : k == 3 ? .5 : 1), t, 1.2); o.connect(f); f.connect(g); g.connect(AU.musG); o.start(t);
    const lfo = C.createOscillator(), lg = C.createGain(); lfo.frequency.value = .12 + k * .05; lg.gain.value = T.droneVol * .3; lfo.connect(lg); lg.connect(g.gain); lfo.start(t); AU.drone.push({o, g})
  })
}
function auTick() {
  if (!AU.ctx || !AU.track) return; const C = AU.ctx, T = TRACKS[AU.track], dt = 60 / T.bpm / 4;
  if (C.state != 'running' || !SET.musOn) { AU.next = Math.max(AU.next, C.currentTime); return }
  while (AU.next < C.currentTime + .25) { sched(T, AU.step++, AU.next); AU.next += dt }
}
function tone(w, f, t, dur, vol, att, dest, vib) {
  const C = AU.ctx, o = C.createOscillator(), g = C.createGain(); o.type = w; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + att); g.gain.exponentialRampToValueAtTime(.0008, t + dur);
  if (vib) { const l = C.createOscillator(), lg = C.createGain(); l.frequency.value = 5.2; lg.gain.value = f * .006; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur + .1) }
  o.connect(g); g.connect(dest || AU.musG); o.start(t); o.stop(t + dur + .1); return g
}
function noiseHit(t, dur, vol, ft, fq, dest) {
  const C = AU.ctx, s = C.createBufferSource(), f = C.createBiquadFilter(), g = C.createGain(); s.buffer = AU.noise; f.type = ft; f.frequency.value = fq; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0008, t + dur); s.connect(f); f.connect(g); g.connect(dest || AU.musG); s.start(t); s.stop(t + dur + .05)
}
function sched(T, st, t) {
  const bar = st % 32, battle = AU.track == 'battle', C = AU.ctx;
  if (T.kick.includes(bar % 16)) { const o = C.createOscillator(), g = C.createGain(); o.frequency.setValueAtTime(battle ? 150 : 120, t); o.frequency.exponentialRampToValueAtTime(52, t + .18); g.gain.setValueAtTime(battle ? .34 : .2, t); g.gain.exponentialRampToValueAtTime(.001, t + .25); o.connect(g); g.connect(AU.musG); o.start(t); o.stop(t + .3) }
  if (T.tin.includes(bar % 16)) noiseHit(t, .06, battle ? .13 : .06, 'highpass', 4200, AU.musG);
  if (!battle && bar % 16 == 14) noiseHit(t, .05, .035, 'highpass', 5200, AU.musG);
  if (st % 2 == 0) { const i = T.arp[(st / 2) % 8] + (battle ? 5 : 5), f = nfreq(T, i + (bar >= 16 ? 1 : 0)); tone('triangle', f, t, battle ? .22 : .55, battle ? .05 : .04, .004, AU.echo) }
  if (bar == 0) { // a new melodic phrase every two bars
    const ph = AU.phrase = AU.phrase && Math.random() < .35 && !battle ? AU.phrase : []; if (!ph.length || battle) { let pos = 0, deg = 7 + (Math.random() * 3 | 0); const durs = battle ? [2, 2, 4, 2, 6] : [4, 6, 4, 8, 2, 6, 12];
      while (pos < 30) { const d = durs[Math.random() * durs.length | 0]; if (Math.random() > .22 || battle) ph.push({at: pos, deg, d}); pos += d; deg += [-2, -1, -1, 0, 1, 1, 2][Math.random() * 7 | 0]; deg = Math.max(5, Math.min(11, deg)) } }
    const dt = 60 / T.bpm / 4; ph.forEach(n => { const f = nfreq(T, n.deg + 5); tone(battle ? 'sawtooth' : 'sine', f, t + n.at * dt, n.d * dt * (battle ? .9 : 1.15), battle ? .035 : .085, battle ? .01 : .09, AU.echo, !battle); if (!battle) tone('triangle', f * 2, t + n.at * dt, n.d * dt, .012, .1, AU.echo) })
  }
}
// ---- sound effects ----
function sfx(name) {
  if (!AU.ctx || SET.sfx <= 0) return; const C = AU.ctx, t = C.currentTime, D = AU.sfxG, bl = (fs, w, vol, gap) => fs.forEach((f, i) => tone(w || 'sine', f, t + i * (gap || .09), .22, vol || .3, .005, D));
  if (name == 'click') tone('square', 880, t, .05, .1, .002, D);
  else if (name == 'select') bl([660, 880], 'square', .09, .06);
  else if (name == 'coin') bl([988, 1319], 'square', .12, .07);
  else if (name == 'heal') bl([523, 659, 784, 1047], 'sine', .22, .09);
  else if (name == 'level') bl([523, 659, 784, 1047, 1319], 'square', .12, .1);
  else if (name == 'hit') { noiseHit(t, .18, .5, 'lowpass', 1800, D); tone('sine', 140, t, .2, .5, .002, D) }
  else if (name == 'crit') { noiseHit(t, .25, .6, 'lowpass', 2600, D); tone('sawtooth', 200, t, .25, .25, .002, D); bl([1200, 1600], 'square', .1, .05) }
  else if (name == 'miss' || name == 'run') noiseHit(t, .3, .25, 'bandpass', 1200, D);
  else if (name == 'slash') { noiseHit(t, .15, .4, 'highpass', 3000, D) }
  else if (name == 'honk') { tone('square', 340, t, .22, .12, .01, D); tone('square', 420, t, .22, .12, .01, D) }
  else if (name == 'splash') noiseHit(t, .35, .35, 'lowpass', 700, D);
  else if (name == 'door') { tone('sine', 220, t, .2, .3, .005, D); tone('sine', 150, t + .08, .25, .3, .005, D) }
  else if (name == 'lose') bl([392, 330, 262, 196], 'sawtooth', .12, .22);
  else if (name == 'win') bl([523, 659, 784, 659, 784, 1047], 'square', .12, .12);
  else if (name == 'unlock') bl([440, 554, 659, 880], 'triangle', .25, .1);
  else if (name == 'wrong') bl([200, 150], 'sawtooth', .15, .12);
}
