// ===== SPRITES: characters, enemies, animals, autos (all drawn with rectangles) =====
// One flexible drawChar() draws the player, every NPC, the gang members and the mafia bosses.
let GAIT=1; // 1 = walking, ~1.8 = running (set by drawPlayer)
function drawChar(x,y,L,dir,anim,s=1){
  X.save();X.translate(x,y);X.scale(s,s);if(L.sc){X.translate(16,30);X.scale(L.sc,L.sc);X.translate(-16,-30)}
  const run=GAIT>1,ph=anim?anim*.174*GAIT:0,sn=anim?Math.sin(ph):0,amp=run?3:2,bob=anim?-Math.round(Math.abs(sn)*(run?2:1.3)):0,sw=Math.round(sn*(run?2:1.4)),liftA=sn>0?Math.round(sn*amp):0,liftB=sn<0?Math.round(-sn*amp):0,side=dir=='left'||dir=='right',acc=L.acc||'#f2c94c',shoe=L.teen?'#f4f4f4':'#2b1b12';
  if(dir=='left'){X.translate(32,0);X.scale(-1,1)}
  const r=(c,a,b,w,h)=>{X.fillStyle=c;X.fillRect(a,b+bob,w,h)},hs=L.hs||'short',hc=L.hair||'#111',front=dir=='down',back=dir=='up';
  X.fillStyle='rgba(0,0,0,.28)';X.fillRect(L.big?6:8,28,L.big?20:16,4);
  const bw=L.big?14:12,tx=16-bw/2;
  // ---------- shared pieces ----------
  const patt=(x0,y0,w,h)=>{if(L.pat=='stripe')for(let i=1;i<h;i+=3)r('rgba(255,255,255,.35)',x0,y0+i,w,1);
    else if(L.pat=='check'){for(let i=1;i<h;i+=4)r('rgba(0,0,0,.2)',x0,y0+i,w,1);for(let i=1;i<w;i+=4)r('rgba(0,0,0,.2)',x0+i,y0,1,h)}
    else if(L.pat=='dots')for(let i=1;i<h;i+=3)for(let j=(i%2)+1;j<w;j+=4)r('rgba(255,255,255,.55)',x0+j,y0+i,1,1)};
  const lower=()=>{
    if(L.saree){r(L.saree,tx-1,19,bw+2,9);for(let i=2;i<bw;i+=3)r('rgba(0,0,0,.2)',tx+i,20,1,8);r('rgba(255,255,255,.25)',tx-1,27,bw+2,1);r(shoe,12,27-liftA,3,2);r(shoe,17,27-liftB,3,2)}
    else if(L.robe){r(L.top,tx-1,18,bw+2,10);r('rgba(0,0,0,.18)',tx+bw/2,19,1,9);r(L.skin,12,27-liftA,3,2);r(L.skin,17,27-liftB,3,2)}
    else if(L.lungi){r(L.lungi,tx-1,19,bw+2,8);for(let i=2;i<bw;i+=3)r('rgba(255,255,255,.35)',tx+i,19,1,8);for(let i=1;i<8;i+=3)r('rgba(0,0,0,.25)',tx-1,19+i,bw+2,1);r(L.skin,12,27-liftA,3,2);r(L.skin,17,27-liftB,3,2)}
    else{r(L.bot,tx+1,20,bw-2,3); // hips, then two legs that swing and lift as you walk or run
      if(side){const o=anim?Math.round(sn*(run?4:3)):0,hA=Math.max(1,3-liftA),hB=Math.max(1,3-liftB);
        r(L.bot,14-o,23,4,hB);r(shoe,13-o,23+hB,5,3);r(L.bot,14+o,23,4,hA);r(shoe,13+o,23+hA,5,3)}
      else{const hA=Math.max(1,3-liftA),hB=Math.max(1,3-liftB);r(L.bot,12,23,4,hA);r(shoe,11,23+hA,5,3);r(L.bot,17,23,4,hB);r(shoe,16,23+hB,5,3)}
      if(L.f&&!L.teen&&!L.dupatta)r(L.bot,tx-1,21,bw+2,5);if(L.teen&&L.f)r('rgba(255,255,255,.15)',tx+1,20,bw-2,1)}};
  const sleeves=()=>{const sl=L.vest||L.track?L.skin:L.top;r(sl,tx-2,13,2,6+sw);r(sl,tx+bw,13,2,6-sw);if(L.track){r(L.track,tx-2,13,1,6);r(L.track,tx+bw+1,13,1,6)}r(L.skin,tx-2,19+sw,2,2);r(L.skin,tx+bw,19-sw,2,2)};
  const torso=()=>{r(L.top,tx,12,bw,10);patt(tx,12,bw,10);r('rgba(0,0,0,.14)',tx+bw-3,12,3,10);r('rgba(255,255,255,.3)',tx,21,bw,1);
    if(L.track){r(L.track,tx+1,12,1,10);r(L.track,tx+bw-2,12,1,10);r(L.track,tx,12,bw,1)}
    if(L.apron)r(L.apron,tx+1,15,bw-2,7);if(L.hood){r(L.top,tx-1,11,bw+2,3);r('rgba(0,0,0,.2)',tx-1,13,bw+2,1);if(front){r('#eee',14,14,1,4);r('#eee',17,14,1,4)}}
    if(L.pack&&front){r(L.pack,tx+1,12,2,9);r(L.pack,tx+bw-3,12,2,9)}
    if(L.suit){r(L.suit,tx,12,4,11);r(L.suit,tx+bw-4,12,4,11);r('rgba(255,255,255,.15)',tx+1,12,1,11)}
    if(L.coat){r('#fff',tx,12,3,13);r('#fff',tx+bw-3,12,3,13);r('rgba(0,0,0,.1)',tx+2,12,1,13)}
    if(L.f&&!L.saree&&!L.nursecap&&!L.coat&&!L.teen){r(acc,tx,12,bw,2)}
    if(L.cross&&front){r('#e63946',15,15,2,5);r('#e63946',14,16,4,2)}
    if(L.sash){for(let i=0;i<10;i++)r(L.sash,tx+i+1,12+i,2,1)}
    if(L.shawl){r(L.shawl,tx-1,12,bw+2,3);r(L.shawl,tx-1,12,4,10)}
    if(L.scarf=='tiger'){r('#f28c28',tx-1,12,bw+2,4);for(let i=0;i<bw+2;i+=3)r('#111',tx-1+i,12,1,4);r('#f28c28',tx+bw-4,15,4,7);for(let i=0;i<7;i+=3)r('#111',tx+bw-4,15+i,4,1)}
    if(L.dupatta){r(L.dupatta,tx,13,bw,2);r(L.dupatta,tx+bw-4,14,4,9)}if(L.saree){r('rgba(0,0,0,.28)',tx-2,12,5,11)}
    if(front&&L.chain){r('#f2c94c',tx+3,12,bw-6,1);r('#f2c94c',tx+4,13,bw-8,1);r('#ffe488',15,14,2,2);if(L.chain>1){r('#f2c94c',tx+3,15,bw-6,1);r('#d9a62b',15,16,2,2)}if(L.chain>2){r('#f2c94c',tx+2,17,bw-4,1);r('#ffe488',15,18,2,2)}}
    if(front&&L.beads)for(let i=0;i<5;i++)r('#6b4423',tx+3+i*1,13+(i==2?2:i==1||i==3?1:0),1,1);
    if(front&&L.badge)r('#f2c94c',tx+bw-4,15,2,2);if(front&&L.whistle){r('#cfd8dc',tx+2,14,1,3);r('#cfd8dc',tx+2,17,2,1)}
    if(front&&L.collar){r('#fff',14,12,4,2)}if(front&&L.steth){r('#222',tx+3,12,1,5);r('#222',tx+bw-4,12,1,5);r('#9aa',15,17,3,2)}
    if(L.belly)r('rgba(0,0,0,.08)',tx+2,18,bw-4,3)};
  const hairBack=()=>{ // hair drawn before the head (behind it)
    if(L.turban)return;
    if(hs=='long'||hs=='curlyL')r(hc,9,4,14,15);if(hs=='bob')r(hc,9,4,14,9);if(hs=='pony'&&front)r(hc,22,6,3,10);if(hs=='braid'&&front){r(hc,9,6,3,15);r(acc,9,20,3,2)}};
  const hairTop=()=>{
    if(L.turban){r(L.turban,9,0,14,7);r('rgba(0,0,0,.18)',9,3,14,1);r('rgba(0,0,0,.18)',9,5,14,1);r(L.turban,13,-2,6,3);return}
    if(L.topi){r(L.topi,11,1,10,4);r('rgba(0,0,0,.12)',11,3,10,1);return}
    if(L.chef){r('#fff',10,-4,12,6);r('#fff',9,-2,14,4);r('#e8e8e8',10,3,12,2);return}
    if(L.nursecap){r('#fff',10,1,12,4);r('#e63946',15,2,2,2);r(hc,10,4,12,2);return}
    const h=hc;
    if(hs=='bald'){r(h,10,6,2,4);r(h,20,6,2,4);if(L.tilak&&0)return;return}
    if(hs=='short'||hs=='side'||hs=='crop'||hs=='gel'||hs=='bob'||hs=='long'||hs=='curlyL'||hs=='pony'||hs=='bun'||hs=='braid'){r(h,10,2,12,hs=='crop'?3:4);r(h,10,3,2,4);r(h,20,3,2,4);if(hs=='side'||hs=='long'||hs=='curlyL')r(h,10,2,8,5);if(hs=='gel'){r('rgba(255,255,255,.35)',12,2,6,1);r(h,10,1,12,2)}}
    if(hs=='messy'){r(h,10,2,12,3);r(h,9,3,2,5);r(h,21,3,2,5);r(h,11,1,3,2);r(h,16,0,4,3);r(h,19,1,3,2)}
    if(hs=='spiky'){r(h,10,3,12,3);for(const sx of[10,13,16,19])r(h,sx,0+(sx%2),3,4);r(h,10,3,2,4);r(h,20,3,2,4)}
    if(hs=='curly'){r(h,10,2,12,3);for(let i=0;i<12;i+=3)r(h,10+i,0+(i%2),3,3);r(h,9,3,3,5);r(h,20,3,3,5)}
    if(hs=='curlyL'){for(let i=0;i<12;i+=3)r(h,10+i,1,3,3)}
    if(hs=='bun'){r(h,10,2,12,4);r(h,10,3,2,5);r(h,20,3,2,5);r(h,13,-2,6,4);r('rgba(255,255,255,.2)',14,-1,2,1)}
    if(hs=='pony'){r(h,15,1,2,2);r(acc,22,6,3,2)}
    if(L.band){r(L.band,10,5,12,2)}if(L.bandana){r(L.bandana,10,4,12,3);r(L.bandana,21,6,3,3)}
    if(L.cap){r(L.cap,10,0,12,4);r(L.cap,L.capSide?13:9,3,L.capSide?14:14,1);if(L.capSide)r('rgba(255,255,255,.4)',12,1,3,1)}};
  const faceFront=()=>{ // eyes, mouth, face details on the front of the head
    const e=L.teen?3:2;r('#fff',13,8,e,e+(L.teen?0:0));r('#111',14,8+(L.teen?1:0),1,e-(L.teen?1:0)+(L.teen?1:0));r('#fff',17,8,e,e);r('#111',18,8+(L.teen?1:0),1,e-(L.teen?1:0)+(L.teen?1:0));
    if(L.teen)r('rgba(255,120,120,.35)',12,10,2,1),r('rgba(255,120,120,.35)',18,10,2,1);
    if(L.stubble){for(let i=0;i<8;i+=2){r('rgba(0,0,0,.25)',12+i,10,1,1);r('rgba(0,0,0,.25)',13+i,11,1,1)}}
    if(L.glasses){r('#333',12,7,5,1);r('#333',16,7,5,1);r('#333',12,10,5,1);r('#333',16,10,5,1);r('#333',12,7,1,4);r('#333',20,7,1,4);r('#333',16,8,1,1)}
    if(L.shades){r('#0b0b10',12,7,9,3);r('rgba(255,255,255,.3)',13,7,2,1);r('#0b0b10',11,7,1,1);r('#0b0b10',21,7,1,1)}
    if(L.beard){r(L.beard,12,10,9,4);r(L.skin,14,11,5,1);r('#8a3b2a',15,11,3,1);r(L.beard,12,9,1,2);r(L.beard,20,9,1,2)}else if(!L.teen||1)r('#8a3b2a',15,11,2,1);
    if(L.stache)r(L.beard||hc,13,10,7,1);
    if(L.tilak)r(L.tilak,15,4,2,3);if(L.bindi)r(L.bindi,15,5,2,2);if(L.hs=='bald'&&!L.cap&&L.tilak)r('#f6efe0',13,3,6,1)};
  // ---------- front / back ----------
  if(!side){
    lower();hairBack();
    if(back&&L.pack){r(L.pack,tx+1,11,bw-2,11);r('rgba(0,0,0,.22)',tx+1,17,bw-2,1)}
    torso();sleeves();
    r(L.skin,11,3,10,10);r('rgba(0,0,0,.1)',11,11,10,2);
    if(back){if(L.turban||L.chef||L.topi||L.nursecap){}else{r(hc,10,2,12,L.hs=='bald'?3:10);if(hs=='long'||hs=='curlyL')r(hc,9,4,14,15);if(hs=='bob')r(hc,9,4,14,9);if(hs=='pony')r(hc,15,10,3,10);if(hs=='braid')r(hc,15,10,3,12);if(hs=='bun')r(hc,13,-2,6,4)}
      hairTop();if(L.stick)r('#8b5e3c',tx+bw+2,10,2,18)}
    else{hairTop();faceFront();if(L.stick)r('#8b5e3c',tx+bw+2,10,2,18);
      if(L.pack){r(L.pack,tx+1,12,2,9);r(L.pack,tx+bw-3,12,2,9)}}
  }else{
    // ---------- side (facing right; mirrored for left) ----------
    lower();
    if(L.pack)r(L.pack,10,12,4,10);
    if(hs=='long'||hs=='curlyL')r(hc,9,4,5,15);if(hs=='pony')r(hc,8,5,4,12);if(hs=='braid')r(hc,9,5,3,15);if(hs=='bob')r(hc,9,4,5,9);
    r(L.top,12,12,bw-3,10);patt(12,12,bw-3,10);r('rgba(255,255,255,.3)',12,21,bw-3,1);if(L.apron)r(L.apron,15,15,5,7);
    if(L.coat){r('#fff',12,12,bw-3,13)}if(L.suit)r(L.suit,12,12,bw-3,11);if(L.hood)r(L.top,11,11,bw-1,3);
    if(L.saree)r('rgba(0,0,0,.28)',11,12,4,11);if(L.dupatta)r(L.dupatta,12,13,bw-3,2);if(L.scarf=='tiger'){r('#f28c28',12,12,bw-3,4);for(let i=0;i<bw-3;i+=3)r('#111',12+i,12,1,4)}if(L.shawl)r(L.shawl,12,12,bw-3,3);
    if(L.chain){r('#f2c94c',17,12,3,1);r('#ffe488',19,13,1,3)}
    r(L.skin,12,3,10,10);r(L.skin,22,7,1,3);
    if(hs!='bald'||L.cap){r(hc,11,2,10,4);r(hc,11,3,4,9)}else{r(hc,11,6,3,5)}
    if(L.turban){r(L.turban,10,0,13,7);r('rgba(0,0,0,.18)',10,3,13,1)}if(L.topi)r(L.topi,11,1,10,4);if(L.chef){r('#fff',11,-4,11,6);r('#fff',10,-2,13,4)}if(L.nursecap)r('#fff',11,1,10,4);
    if(L.bandana)r(L.bandana,11,4,11,3);if(L.band)r(L.band,11,5,11,2);if(L.cap){r(L.cap,11,0,11,4);r(L.cap,L.capSide?15:18,3,6,1)}
    if(hs=='bun')r(hc,10,-2,6,4);if(hs=='spiky')for(const sx of[11,14,17])r(hc,sx,0,3,3);if(hs=='messy')r(hc,12,0,5,3);
    if(L.teen){r('#fff',18,8,3,3);r('#111',20,9,1,2)}else{r('#fff',18,8,2,2);r('#111',19,8,1,2)}
    if(L.shades){r('#0b0b10',17,7,6,3)}if(L.glasses){r('#333',17,7,5,1);r('#333',17,10,5,1);r('#333',21,7,1,4)}
    if(L.beard){r(L.beard,15,10,7,4)}if(L.stache)r(L.beard||hc,19,10,3,1);if(L.stubble)r('rgba(0,0,0,.25)',17,10,4,2);if(L.tilak)r(L.tilak,20,4,2,3);if(L.bindi)r(L.bindi,20,5,2,2);
    r('#8a3b2a',20,12-(L.beard?1:0)+(L.beard?0:0),2,1);
    {const sl=L.vest||L.track?L.skin:L.top,ax=anim?Math.round(-sn*(run?3:2)):0;r(sl,14+ax,13,4,6);r(L.skin,14+ax+(ax>0?1:0),19,3,2)}
    if(L.stick)r('#8b5e3c',19,10,2,18)}
  X.restore()}

// ---- animals (cow, goat, dog, cat) : code reused from v5 ----
function drawAnimal(k,x,y,a,dir){if(dir=='left'){X.save();X.translate(2*x+32,0);X.scale(-1,1);drawAnimal0(k,x,y,a);X.restore()}else drawAnimal0(k,x,y,a)}
function drawAnimal0(k,x,y,a){const f=(a>>3)&1,r=(c,px,py,w,h)=>rc(c,x+px,y+py,w,h),O='#1f1a17';r('rgba(0,0,0,.25)',4,27,24,4);
  if(k=='cow'){r(O,3,12,2,10);r('#f6f2ea',3,13,1,8);r('#4a3322',2,20,3,3);
    r(O,6,10,22,14);r('#f6f2ea',7,11,20,12);r('#f6f2ea',19,8,6,4);r(O,18,7,8,2);r('#6a4a31',10,12,6,5);r('#6a4a31',20,16,5,4);r('rgba(0,0,0,.12)',7,20,20,3);
    for(const lx of[8,13,20,24]){const o=lx==13||lx==24?f:1-f;r(O,lx,22,4,7+o);r('#f6f2ea',lx+1,22,2,6+o);r('#3a2a1c',lx,27+o,4,2)}
    r(O,24,6,8,11);r('#f6f2ea',25,7,6,9);r('#f0a8a0',28,12,4,4);r('#7a3b3b',29,13,1,1);r('#111',26,9,2,2);r('#fff',26,9,1,1);r('#d9d2b8',24,4,2,3);r('#d9d2b8',30,4,2,3);r('#f0a8a0',22,8,3,2);r('#f2c94c',26,17,2,2);r('#e8d9c8',25,16,3,3)}
  else if(k=='goat'){r(O,4,13,2,3);r('#e8e0d0',4,14,1,2);r(O,6,12,18,11);r('#ece6d8',7,13,16,9);r('#cfc5ae',8,18,14,3);
    for(const lx of[8,12,19,22]){const o=(lx==12||lx==22)?f:1-f;r(O,lx,22,3,7+o);r('#cfc5ae',lx+1,22,1,6+o);r('#2a2018',lx,27+o,3,2)}
    r(O,22,7,8,9);r('#ece6d8',23,8,6,7);r('#2a2018',29,12,2,2);r('#111',25,9,2,2);r('#ffd34d',25,9,1,1);r('#cfc5ae',20,9,3,5);r(O,24,3,2,5);r('#8a7a5a',24,4,1,4);r(O,28,3,2,5);r('#8a7a5a',28,4,1,4);r('#cfc5ae',27,15,2,4)}
  else if(k=='dog'){r(O,3,10,2,4);r('#c98a3f',3,10,1,3);r(O,6,12,17,9);r('#d9a050',7,13,15,7);r('#f4e6c4',7,17,15,3);r('#c98a3f',9,13,5,3);
    for(const lx of[8,12,18,21]){const o=(lx==12||lx==21)?f:1-f;r(O,lx,20,3,7+o);r('#d9a050',lx+1,20,1,6+o)}
    r(O,21,8,9,8);r('#d9a050',22,9,7,6);r('#f4e6c4',26,12,4,3);r('#111',29,12,2,2);r('#111',24,10,2,2);r('#fff',24,10,1,1);r('#8a5a22',21,8,3,6);r('#e63946',22,15,6,2)}
  else{r(O,3,9,2,10);r('#7d7d86',3,10,1,8);r(O,6,14,16,9);r('#8f8f99',7,15,14,7);r('#5d5d66',9,15,2,6);r('#5d5d66',13,15,2,6);r('#5d5d66',17,15,2,6);r('#d8d8de',9,20,10,2);
    for(const lx of[8,11,17,20]){const o=(lx==11||lx==20)?f:1-f;r(O,lx,22,3,6+o);r('#8f8f99',lx+1,22,1,5+o)}
    r(O,20,9,9,9);r('#8f8f99',21,10,7,7);r(O,20,6,3,4);r(O,26,6,3,4);r('#e8a0a8',21,7,1,2);r('#e8a0a8',27,7,1,2);r('#ffd34d',22,12,2,2);r('#111',22,12,1,2);r('#ffd34d',26,12,2,2);r('#111',26,12,1,2);r('#e8a0a8',24,15,2,1);r('#d8d8de',23,15,4,2)}}

// ---- auto-rickshaw: big, with a driver. Side view (left/right) and front/back view ----
function drawAuto(px,py,dir,t){
  X.save();const side=dir=='left'||dir=='right',bump=Math.sin(t/4)*.6;
  if(side){X.translate(px+(dir=='left'?44:-12),py-12+bump);if(dir=='left'){X.scale(-1,1)}
    const r=(c,a,b,w,h)=>{X.fillStyle=c;X.fillRect(a,b,w,h)};
    X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(28,38,28,5,0,0,7);X.fill();
    r('#1b1b1b',4,3,38,6);r('#2a2a2a',2,7,42,2);r('#f2c94c',6,9,3,11);r('#f2c94c',38,9,3,11);       // canopy + poles
    r('#bfe6f5',41,8,7,11);r('#8cc5d9',43,9,1,9);                                                    // windscreen
    r('#d9a620',6,19,44,12);r('#f2c94c',6,18,44,8);r('#1b1b1b',6,26,44,2);r('#fff3a8',8,19,38,1);    // body
    r('#2f9e44',14,21,14,4);r('#e8f5d0',16,22,10,2);                                                   // stripe decal
    r('#8a1c1c',9,12,14,7);r('#a82a2a',9,12,14,2);                                                      // rear seat
    r('#5a3a1a',22,16,3,5);                                                                            // steering
    r('#a9713a',31,5,6,6);r('#1a1a1a',31,4,6,2);r('#fff',35,7,1,1);                                    // driver head+hair
    r('#c9b36a',29,11,8,8);r('#a39050',29,14,8,1);r('#a9713a',37,13,3,2);                              // driver torso+arm
    r('#fff6a8',48,22,3,4);r('rgba(255,246,168,.35)',50,20,8,8);r('#d62828',4,22,2,3);                 // lights
    r('#111',12,28,18,2);
    for(const wx of[12,43]){X.fillStyle='#111';X.beginPath();X.arc(wx,31,7,0,7);X.fill();X.fillStyle='#777';X.beginPath();X.arc(wx,31,3,0,7);X.fill();X.fillStyle='#bbb';X.fillRect(wx-1,30,2,2)}
    r('#fff',20,28,8,3);r('#111',21,29,6,1);
  }else{X.translate(px-4,py-14+bump);const back=dir=='up';
    const r=(c,a,b,w,h)=>{X.fillStyle=c;X.fillRect(a,b,w,h)};
    X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(20,42,19,5,0,0,7);X.fill();
    r('#1b1b1b',3,2,34,7);r('#2a2a2a',1,7,38,2);
    if(back){r('#8a1c1c',6,10,28,12);r('#a82a2a',6,10,28,3);r('#a9713a',16,5,8,6);r('#1a1a1a',16,4,8,2);r('#c9b36a',14,11,12,8)}
    else{r('#bfe6f5',6,9,28,14);r('#8cc5d9',19,9,2,14);r('#a9713a',16,11,8,7);r('#1a1a1a',16,10,8,2);r('#fff',17,13,2,2);r('#fff',21,13,2,2);r('#111',18,14,1,1);r('#111',22,14,1,1);r('#c9b36a',14,18,12,5)}
    r('#f2c94c',4,22,32,14);r('#d9a620',4,22,32,3);r('#1b1b1b',4,32,32,2);r('#2f9e44',10,26,20,3);
    if(back){r('#d62828',6,25,4,3);r('#d62828',30,25,4,3);r('#fff',16,28,8,4);r('#111',17,29,6,2);for(const wx of[7,33]){r('#111',wx-4,32,8,9);r('#777',wx-1,35,2,3)}}
    else{r('#fff6a8',16,26,8,4);r('rgba(255,246,168,.35)',12,28,16,10);r('#111',15,33,10,9);r('#777',19,36,2,3);r('#f2c94c',4,34,6,3);r('#f2c94c',30,34,6,3)}}
  X.restore()}

// ---- entities ----
function elv(e){return(FOES[e.f].lv||0)+(FOES[e.f].boss?0:tierOf())}
function drawEnt(e){const x=e.px*T,y=e.py*T,mv=e.px!=e.x||e.py!=e.y;
  if(e.t=='npc'){drawChar(x,y,e.L||LOOKS[e.look||0],e.dir,mv?e.a:0);
    if(e.q&&S.flags[e.q]!='done'){const st=S.flags[e.q];X.fillStyle=st=='found'?'#7ee08a':'#f2c94c';X.fillRect(x+14,y-8+(tick>>4&1)*2,4,6);X.fillRect(x+14,y+1+(tick>>4&1)*2,4,2)}
    if(e.shop||e.nurse){X.fillStyle=e.nurse?'#e63946':'#f2c94c';X.fillRect(x+14,y-8,4,6);X.fillRect(x+14,y+1,4,2)}}
  else if(e.t=='an'){drawAnimal(e.k,x,y-(e.k=='goat'&&mv?Math.abs(Math.sin(e.a/3))*3:0)+(e.k!='goat'&&mv?Math.sin(e.a/5)*.6:0),mv?e.a:0,e.dir)}
  else if(e.t=='auto'){drawAuto(x,y,e.dir,tick+e.seed)}
  else if(e.t=='foe'||e.t=='boss'){const F=FOES[e.f],lk=LOOKF[F.look];drawChar(x,y,lk,e.dir,mv?e.a:0);
    const lab=F.boss?'BOSS':'Lv'+elv(e);X.font="bold 8px monospace";X.textAlign='center';X.lineWidth=2.5;X.lineJoin='round';X.strokeStyle='rgba(0,0,0,.85)';X.strokeText(lab,x+16,y-(F.boss?8:3));X.fillStyle=F.boss?'#ff5a5a':F.guard?'#f2a93b':'#ffd36b';X.fillText(lab,x+16,y-(F.boss?8:3));X.textAlign='left'}}
function drawPlayer(){const x=S.px*T,y=S.py*T,mv=S.px!=S.x||S.py!=S.y,a=mv?S.anim:0,run=mv&&!S.swim&&!!keys.Shift;
  if(S.swim)return drawSwimmer(x,y,mv);
  if(run){ // little dust puffs kicked up behind the runner
    const[dx,dy]=vec[S.dir];for(let k=0;k<4;k++){const age=(tick*1.2+k*5)%20,al=1-age/20;X.fillStyle='rgba(230,205,160,'+(al*.55)+')';const sz=2+age*.18;X.fillRect(Math.round(x+16-dx*(6+age*.7)-sz/2+(k%2?3:-3)*(dy?1:0)),Math.round(y+28-dy*(age*.5)-age*.25-sz/2+(dx?(k%2?2:-1):0)),sz,sz)}}
  GAIT=run?1.8:1;drawChar(x,y,LOOKS[S.look],S.dir,a);GAIT=1}
// swimming: head and shoulders above the surface, arms doing a front-crawl stroke, a wake behind and splashes
function drawSwimmer(x,y,mv){const t=tick,ph=t*(mv?.26:.09),bob=Math.sin(t/9)*(mv?.9:1.4),vy=y+8+bob,L=LOOKS[S.look],[dx,dy]=vec[S.dir],sideV=dx!=0;
  // wake rings + V trail behind the swimmer
  X.save();X.lineWidth=1.2;for(let i=0;i<5;i++){const age=(t*(mv?.9:.35)+i*6)%30,al=1-age/30;X.strokeStyle='rgba(255,255,255,'+(al*.8)+')';const r=3+age*.45;
    if(mv){X.beginPath();X.ellipse(x+16-dx*age*.8,y+25-dy*age*.55,r,r*.38,0,0,7);X.stroke()}else{X.beginPath();X.ellipse(x+16,y+25,r+2,(r+2)*.35,0,0,7);X.stroke()}}
  X.restore();
  X.save();X.beginPath();X.rect(x-14,y-16,60,35);X.clip();
  X.save();X.translate(x,vy);drawChar(0,0,L,S.dir,0);X.restore();
  // arms (drawn over the clipped body so they reach out of the water)
  const sh=[[x+11,vy+14],[x+21,vy+14]],reach=mv?10:4;
  sh.forEach(([sx,sy],i)=>{const ang=ph+(i?Math.PI:0),c=Math.cos(ang),s=Math.sin(ang);let tx_,ty_;
    if(sideV){tx_=sx+dx*c*reach;ty_=sy-Math.max(-2,s*reach*.9)-1}else{tx_=sx+(i?1:-1)*(3+Math.abs(c)*reach*.5);ty_=sy-Math.max(-2,s*reach*.8)-(dy>0?-1:1)}
    X.lineCap='round';X.strokeStyle='rgba(20,10,5,.55)';X.lineWidth=4.2;X.beginPath();X.moveTo(sx,sy);X.lineTo(tx_,ty_);X.stroke();X.strokeStyle=L.top||'#3d85c6';X.lineWidth=3.2;X.beginPath();X.moveTo(sx,sy);X.lineTo((sx*2+tx_)/2,(sy*2+ty_)/2);X.stroke();
    X.strokeStyle=L.skin;X.lineWidth=3;X.beginPath();X.moveTo((sx*2+tx_)/2,(sy*2+ty_)/2);X.lineTo(tx_,ty_);X.stroke();
    if(mv&&ty_>vy+6){X.fillStyle='rgba(255,255,255,.85)';for(let k=0;k<3;k++){const age=(t*1.3+k*5+i*8)%14;X.fillRect(Math.round(tx_+(k-1)*2),Math.round(ty_+age*.3-age*.6+2),1.5,1.5)}}});
  X.restore();
  // water surface across the body: cuts the swimmer off at the chest so they look submerged
  rc('rgba(36,120,205,.82)',x-2,y+17,36,5);rc('rgba(36,120,205,.45)',x-4,y+22,40,3);
  for(let i=0;i<9;i++){const wx=x-2+i*4+((t>>2)%4),wy=y+17+Math.round(Math.sin(t/5+i*1.7)*1);rc('rgba(255,255,255,.7)',wx,wy,3,1)}
  X.globalAlpha=.9;if(mv){for(let k=0;k<4;k++){const age=(t*1.1+k*6)%18;rc('rgba(255,255,255,'+(1-age/18)+')',x+16+(k-1.5)*4+dx*5,y+17-age*.45,1.5,1.5)}}X.globalAlpha=1}
function entsSorted(){[...ents.map(e=>({y:e.py+(e.t=='auto'?.5:0),f:()=>drawEnt(e)})),{y:S.py,f:drawPlayer}].sort((a,b)=>a.y-b.y).forEach(o=>o.f())}

