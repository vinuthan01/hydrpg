// ===== LOGIN: name + password. New names register; known names continue their saved game =====
// NOTE: accounts live in this browser's localStorage (a static GitHub Pages site has no server).
// The password is hashed, but this is a convenience feature, not real security.
function drawOn(tg, L) {const o = X; X = tg; drawChar(0, 0, L, 'down', 0); X = o}
let chosen = 0, pending = null;
const msg = t => {$('msg').textContent = t || ''};
function paintLooks() {
  const box = $('looks'); box.innerHTML = '';
  LOOKS.forEach((L, i) => {const c = document.createElement('canvas'); c.width = c.height = 32; c.className = 'look'; c.style.outline = i == chosen ? '3px solid #f2c94c' : '3px solid transparent'; c.onclick = () => {chosen = i; paintLooks()}; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; drawOn(g, L); box.appendChild(c)})}
function showLooks() {$('stepLogin').style.display = 'none'; $('stepLook').style.display = 'block'; paintLooks()}
async function doLogin() {
  auInit(); setTrack('world'); setTimeout(() => sfx('select'), 50);
  const name = $('uName').value.trim().replace(/\s+/g, ' '), pw = $('uPass').value;
  if (name.length < 2) return msg('Please type a name (at least 2 characters).');
  if (!/^[A-Za-z0-9 _.-]+$/.test(name)) return msg('Use only letters, numbers and spaces in your name.');
  if (pw.length < 3) return msg('Password must be at least 3 characters.');
  const users = getUsers(), key = name.toLowerCase(), h = await hashPw(name, pw);
  if (users[key]) {
    if (users[key].hash !== h) {sfx('wrong'); return msg('Wrong password for ' + users[key].name + '.')}
    try {localStorage.setItem('bq_last', users[key].name)} catch (e) {}
    if (localStorage.getItem(saveKey(key))) return loadGame(key);
    pending = {name: users[key].name, h, key}; return showLooks()}
  pending = {name, h, key, isNew: true}; msg(''); showLooks()}
function doStart() {
  const p = pending; if (!p) return; const users = getUsers(); users[p.key] = {name: p.name, hash: p.h};
  try {localStorage.setItem(USERS_KEY, JSON.stringify(users)); localStorage.setItem('bq_last', p.name)} catch (e) {}
  newGame(p.name, chosen)}
$('goBtn').onclick = doLogin; $('startBtn').onclick = doStart; $('backBtn').onclick = () => {$('stepLook').style.display = 'none'; $('stepLogin').style.display = 'block'};
const eye = $('eyeBtn'); eye.onclick = () => {const p = $('uPass'), show = p.type == 'password'; p.type = show ? 'text' : 'password'; $('eyeSlash').style.display = show ? 'none' : ''; eye.title = eye.ariaLabel = show ? 'Hide password' : 'Show password'; p.focus()};
for (const id of ['uName', 'uPass']) $(id).addEventListener('keydown', e => {if (e.key == 'Enter') doLogin()});
try {const last = localStorage.getItem('bq_last'); if (last) {$('uName').value = last; setTimeout(() => $('uPass').focus(), 50)} else setTimeout(() => $('uName').focus(), 50)} catch (e) {}

