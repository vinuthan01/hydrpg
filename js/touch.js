// ===== TOUCH CONTROLS: on-screen joystick, action (A) and run buttons for phones and tablets =====
(function () {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || matchMedia('(pointer:coarse)').matches; if (!isTouch) return;
  document.body.classList.add('touch'); IS_TOUCH = true;
  const root = document.createElement('div'); root.id = 'touch';
  root.innerHTML = '<div id="pad"><div id="nub"></div></div><button class="tb" id="bR">Run</button><button class="tb" id="bA">A</button>'; document.body.appendChild(root);
  const pad = $('pad'), nub = $('nub'), DK = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const clear = () => {DK.forEach(k => delete keys[k]); nub.style.transform = ''};
  const move = e => {const r = pad.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), m = Math.hypot(dx, dy), lim = r.width / 2 - 20, k = m > lim ? lim / m : 1;
    nub.style.transform = 'translate(' + dx * k + 'px,' + dy * k + 'px)'; DK.forEach(x => delete keys[x]); if (m < 14) return;
    keys[Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'ArrowRight' : 'ArrowLeft') : (dy > 0 ? 'ArrowDown' : 'ArrowUp')] = 1};
  pad.addEventListener('pointerdown', e => {e.preventDefault(); pad.setPointerCapture(e.pointerId); auInit(); move(e)});
  pad.addEventListener('pointermove', e => {if (pad.hasPointerCapture(e.pointerId)) move(e)});
  for (const ev of ['pointerup', 'pointercancel']) pad.addEventListener(ev, clear);
  const key = (k, d) => dispatchEvent(new KeyboardEvent(d ? 'keydown' : 'keyup', {key: k}));
  $('bA').addEventListener('pointerdown', e => {e.preventDefault(); if (document.activeElement) document.activeElement.blur(); key(' ', 1)}); $('bA').addEventListener('pointerup', () => key(' ', 0));
  let run = false; $('bR').addEventListener('pointerdown', e => {e.preventDefault(); run = !run; if (run) keys.Shift = 1; else delete keys.Shift; $('bR').classList.toggle('on', run)});
  // show the pad only while you are walking around (not in menus, battles or dialogue)
  setInterval(() => {const on = !!S && !B && !D && !SH && !CODE && !CHO && !MENU && !PNL && !INV; document.body.classList.toggle('ingame', on); if (!on) clear()}, 120);
  if (!localStorage.getItem('bq_settings')) {SET.zoom = 1; fit()}
})();

