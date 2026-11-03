// ===== WORLD DRAWING: tiles, buildings, kiosks, lighting, interiors =====
function drawCharminar(px,py,W,Hh){const S1='#f3e2b8',S2='#d6bd88',S3='#a98f5c',DK='#3a2433',TL='#2fa59a',GD='#f2c94c',R_=(c,a,b,w,h)=>rc(c,px+a,py+b,w,h);
  R_('rgba(0,0,0,.3)',6,Hh-8,W,10);R_(S3,2,Hh-14,W-4,14);R_(S2,8,Hh-20,W-16,8);R_(S1,8,Hh-20,W-16,2);
  R_(S3,36,40,W-72,Hh-60);R_(S2,36,40,W-72,4);R_(S1,38,44,W-76,Hh-66);R_('rgba(0,0,0,.08)',W-48,44,10,Hh-66);
  for(let i=0;i<5;i++){R_(S2,40+i*24,48,12,3)}
  const arch=(ax,aw,ah)=>{R_(S3,ax-3,Hh-20-ah-3,aw+6,ah+3);R_(DK,ax,Hh-20-ah,aw,ah);R_(DK,ax+3,Hh-20-ah-3,aw-6,3);R_('#ffd36b',ax+3,Hh-20-ah+6,aw-6,ah-6);R_(DK,ax+aw/2-1,Hh-20-ah+6,2,ah-6)};
  arch(W/2-17,34,52);arch(48,22,38);arch(W-70,22,38);
  for(let i=0;i<7;i++){const ax=50+i*((W-100)/7|0);R_(DK,ax,60,10,14);R_('#ffd36b',ax+2,63,6,9)}
  for(let i=0;i<W-72;i+=10)R_(S1,36+i,34,6,8);R_(S2,36,38,W-72,3);
  for(let i=0;i<5;i++){const dx=W/2-40+i*20,dy=i==2?16:24;R_(S2,dx,dy+8,14,10);R_(TL,dx+1,dy,12,10);R_('#53d8c8',dx+3,dy+1,4,4);R_(GD,dx+6,dy-6,2,6)}
  const mnr=(mx,tall,lit)=>{const top=lit?6:18;R_(S3,mx-1,top+14,26,Hh-top-30);R_(S1,mx+1,top+14,22,Hh-top-32);R_('rgba(0,0,0,.12)',mx+16,top+14,8,Hh-top-32);
    for(const by of[top+44,top+84]){R_(S3,mx-6,by,36,6);R_(S2,mx-5,by,34,2);R_(S1,mx-3,by-6,2,6);R_(S1,mx+25,by-6,2,6);for(let k=0;k<4;k++)R_('#2f2530',mx-4+k*9,by+6,5,3)}
    R_(S2,mx+2,top+16,20,4);for(let k=0;k<3;k++){R_(DK,mx+4+k*6,top+22,4,10);R_('#ffd36b',mx+5+k*6,top+24,2,6)}
    R_(S3,mx+4,top+8,16,8);R_(S2,mx+5,top+8,14,6);R_(TL,mx+3,top-2,18,12);R_('#53d8c8',mx+6,top,5,5);R_(GD,mx+11,top-10,2,9);R_(GD,mx+9,top-6,6,2);
    for(const sx of[-2,22]){R_(TL,mx+sx,top+10,6,6);R_(GD,mx+sx+2,top+7,2,3)}};
  mnr(46,0,0);mnr(W-72,0,0);mnr(2,1,1);mnr(W-28,1,1);
  R_('#fff7d6',W/2-30,Hh-18,60,12);R_('#3a2410',W/2-31,Hh-19,62,1);R_('#3a2410',W/2-31,Hh-6,62,1)}

// ---- sign boards: every building gets its own style + font ----
function drawSign(cx,cy,maxW,name,key,big){
  const st=SIGNS[key]||SIGNS.wood;let sz=st.sz+(big?3:0);X.save();X.textBaseline='middle';X.font=sz+'px '+st.ft;let tw=X.measureText(name).width;
  while(tw>maxW-10&&sz>6){sz--;X.font=sz+'px '+st.ft;tw=X.measureText(name).width}
  const w=Math.round(Math.min(maxW,tw+12)),h=sz+7,x=Math.round(cx-w/2),y=Math.round(cy-h/2);
  if(key=='wood'||key=='hand'||key=='moss'){rc('#2a1a0a',cx-w/2+3,y-4,1,4);rc('#2a1a0a',cx+w/2-4,y-4,1,4)}
  rc('rgba(0,0,0,.3)',x+1,y+2,w,h);rc(st.bd,x-1,y-1,w+2,h+2);rc(st.bg,x,y,w,h);
  if(st.stripe){for(let i=0;i<w;i+=8){rc('#1a1a1a',x+i,y,4,2);rc('#1a1a1a',x+i+4,y+h-2,4,2)}}
  if(key=='stone'||key=='wood'){rc('rgba(255,255,255,.25)',x+1,y+1,1,1);rc('rgba(255,255,255,.25)',x+w-2,y+1,1,1);rc('rgba(0,0,0,.3)',x+1,y+h-2,1,1);rc('rgba(0,0,0,.3)',x+w-2,y+h-2,1,1)}
  if(st.cross){rc('#e63946',x+3,y+2,2,h-4);rc('#e63946',x+1,y+h/2-1,6,2)}
  if(key=='banner'){rc(st.bd,x,y+h-2,w,2)}if(key=='saffron'){rc('#138808',x,y+h-2,w,2)}
  X.textAlign='center';X.fillStyle=st.fg;if(st.glow){X.shadowColor=st.fg;X.shadowBlur=6+Math.sin(tick/20)*2}
  X.fillText(name,Math.round(cx+(st.cross?4:0)),Math.round(cy+1));X.shadowBlur=0;X.restore()}
// roof decorations that make each kind of place recognisable
function roofTop(k,px,py,W,Hh,w,roof,wall){const big=k&&'mtxgjb'.includes(k),cx=px+W/2,top=py+3;if(big){X.save();X.translate(cx,top);X.scale(1.4,1.4);X.translate(-cx,-top)}roofTop0(k,px,py,W,Hh,w,roof,wall);if(big)X.restore()}
function roofTop0(k,px,py,W,Hh,w,roof,wall){const cx=px+W/2,top=py+3;
  const dome=(x,y,r,c,hl)=>{X.fillStyle=c;X.beginPath();X.arc(x,y,r,Math.PI,0);X.fill();X.fillStyle=hl;X.beginPath();X.arc(x-r*.3,y-r*.3,r*.25,0,7);X.fill()};
  if(k=='m'){dome(cx,top,22,'#3fc17f','#c8ffe0');rc('#f2c94c',cx-1,top-30,2,9);rc('#f2c94c',cx-4,top-24,8,2);for(const mx of[px-6,px+W-2]){rc('#e8e0cc',mx,top-34,8,36);rc('#c9bfa6',mx+5,top-34,3,36);rc('#2e8b57',mx-1,top-38,10,5);rc('#f2c94c',mx+3,top-44,2,7)}
    for(let i=-14;i<=14;i+=14)dome(cx+i*1.0,top+2,7,'#5ad69a','#d8fff0')}
  if(k=='t'){const cols=['#ff9933','#c1440e','#f7e1c3','#e63946','#ff9933'],n=5;for(let i=0;i<n;i++){const ww=W*.62-i*W*.1,hh=10;rc(cols[i%5],cx-ww/2,top-i*hh,ww,hh);rc('rgba(0,0,0,.18)',cx-ww/2,top-i*hh+hh-2,ww,2);for(let j=4;j<ww-4;j+=8)rc('#f2c94c',cx-ww/2+j,top-i*hh+3,3,4)}
    rc('#f2c94c',cx-1,top-n*10-10,2,10);rc('#f2c94c',cx-4,top-n*10-4,8,3);rc('#c1121f',cx+1,top-n*10-10,6,3)
    for(const sx of[px+4,px+W-12]){rc('#ff9933',sx,top-8,8,10);rc('#f2c94c',sx+2,top-14,4,6)}}
  if(k=='x'){rc(wall,cx-12,top-26,24,28);rc('#9aa5b5',cx-14,top-30,28,5);rc('#7a8595',cx-2,top-46,4,18);rc('#7a8595',cx-9,top-40,18,3);rc('#7a8595',cx-1,top-52,2,8);rc('#ddd',cx-3,top-23,6,10);rc('#3a2410',cx-2,top-21,4,8);
    rc('#b9c7e0',px+W*.2,top+6,5,10);rc('#b9c7e0',px+W*.8-5,top+6,5,10)}
  if(k=='g'){dome(cx,top,20,'#f2c94c','#fff3a8');rc('#d9a62b',cx-1,top-28,2,10);rc('#f2c94c',cx-3,top-22,6,2);for(const sx of[px+6,px+W-20])dome(sx+7,top+3,8,'#f2c94c','#fff3a8');
    rc('#6b4423',px+W+4,top-36,2,46);for(let i=0;i<10;i++)rc('#ff9933',px+W+6,top-34+i,8-(i>>1),1);rc('#1b4f8a',px+W+8,top-28,2,2)}
  if(k=='j'){for(let i=0;i<4;i++){const ww=W*.5-i*8;rc('#fbfaf5',cx-ww/2,top-i*9,ww,9);rc('#d9d2bd',cx-ww/2,top-i*9+7,ww,2);for(let j=3;j<ww-3;j+=6)rc('#e9c46a',cx-ww/2+j,top-i*9+2,2,3)}
    rc('#e9c46a',cx-1,top-48,2,12);rc('#ff9933',cx+1,top-48,7,3);for(const sx of[px+6,px+W-14]){rc('#fbfaf5',sx,top-12,8,14);rc('#e9c46a',sx+3,top-18,2,6)}}
  if(k=='b'){dome(cx,top+3,24,'#fbf6e8','#fff');rc('#d9d2bd',cx-24,top+1,48,2);rc('#f2c94c',cx-5,top-30,10,6);for(let i=0;i<4;i++)rc('#f2c94c',cx-4+i,top-36-i*4,8-i*2,3);rc('#f2c94c',cx-1,top-52,2,6);
    X.strokeStyle='#555';X.lineWidth=1;X.beginPath();X.moveTo(px-6,top-2);X.lineTo(cx,top-18);X.lineTo(px+W+6,top-2);X.stroke();for(let i=0;i<10;i++){const t=i/9,fx=px-6+t*(W+12),fy=top-2-(1-Math.abs(t*2-1))*16;rc(['#e63946','#2a9d8f','#f2c94c','#3d85c6','#fff'][i%5],fx,fy,4,5)}}
  if(k=='h'){rc('#cfd8dc',px+W*.5-22,top-16,44,18);rc('#fff',cx-16,top-14,32,14);rc('#e63946',cx-3,top-13,6,12);rc('#e63946',cx-8,top-10,16,6);rc('#7a8590',px+10,top-10,14,12);rc('#9aa5b0',px+10,top-12,14,3);
    rc('#2f8f5a',px,top+Hh*.44,W,3);for(let i=0;i<W-6;i+=10)rc('#fff',px+3+i,top-2,6,4)}}
function drawBld(b){
  const[x,y,w,h,roof,wall,name,k]=b,px=x*T,py=y*T,W=w*T,Hh=h*T;
  if(k=='c'&&name=='Charminar'){drawCharminar(px,py,W,Hh);drawSign(px+W/2,py+Hh-5,W-4,'Charminar','hand',1);return}
  if(k=='k'){const cxx=px+W/2;rc('rgba(0,0,0,.25)',px+4,py+Hh-4,W,8);rc('#8c7a5a',px+8,py+Hh-16,W-16,16);rc('#c2ad84',px+14,py+30,W-28,Hh-44);rc('rgba(0,0,0,.14)',px+W-26,py+30,12,Hh-44);
    for(let i=0;i<6;i++)rc('#a8946c',px+14,py+40+i*10,W-28,2);rc('#7a5a3a',px+10,py+22,W-20,10);rc('#d9c7a3',px+18,py-14,W-36,38);rc('#f4efe0',cxx-18,py-8,36,36);rc('#222',cxx-20,py-10,40,2);rc('#222',cxx-20,py+26,40,2);rc('#222',cxx-20,py-10,2,38);rc('#222',cxx+18,py-10,2,38);
    X.save();X.translate(cxx,py+10);X.strokeStyle='#222';X.lineWidth=2;X.beginPath();X.moveTo(0,0);X.lineTo(Math.cos(tick/60)*10,Math.sin(tick/60)*10);X.stroke();X.beginPath();X.moveTo(0,0);X.lineTo(Math.cos(tick/720-1)*7,Math.sin(tick/720-1)*7);X.stroke();X.restore();
    rc('#2fa59a',cxx-20,py-28,40,16);rc('#53d8c8',cxx-14,py-26,8,6);rc('#f2c94c',cxx-2,py-40,4,14);rc('#3a2410',cxx-10,py+Hh-34,20,34);rc('#6b4423',cxx-8,py+Hh-32,16,32);
    drawSign(cxx,py+Hh-40,W-6,'Clock Tower','stone');return}
  const dc=w>>1,dx=px+dc*T+6,ac=[roof,'#e63946','#2a9d8f','#ff9933'][(x+y)%4],home=!k&&HOME_NAMES.includes(name);
  rc('rgba(0,0,0,.25)',px+4,py+Hh-4,W,8);
  rc(wall,px,py+Hh*.46,W,Hh*.54);rc('rgba(0,0,0,.12)',px+W-7,py+Hh*.46,7,Hh*.54);rc('rgba(0,0,0,.14)',px,py+Hh*.46,W,3);
  if('tgjb'.includes(k)&&k){for(let i=8;i<W-8;i+=24){rc('rgba(0,0,0,.08)',px+i,py+Hh*.46+4,3,Hh*.54-4)}}
  rc(roof,px-4,py+4,W+8,Hh*.44);for(let i=12;i<Hh*.44;i+=7)rc('rgba(0,0,0,.2)',px-4,py+4+i,W+8,2);rc('rgba(255,255,255,.2)',px-4,py+5,W+8,3);rc('rgba(0,0,0,.4)',px-5,py+3,W+10,1);
  for(let i=0;i<W+8;i+=12)rc(wall,px-4+i,py-3,8,8);rc('rgba(0,0,0,.2)',px-4,py+4,W+8,2);
  roofTop(k,px,py,W,Hh,w,roof,wall);
  if(k=='s'){rc('#5d6d6e',px-8,py+Hh*.46-8,W+16,8);for(let i=0;i<W+16;i+=16)rc('#cfd8dc',px-8+i,py+Hh*.46-8,8,4)}
  // windows: churches get arched stained windows, hospitals bigger glass, others shuttered
  for(let i=0;i<w;i++)if(i!=dc){const wx=px+i*T+8,wy=py+Hh*.6;
    if(k=='h'){rc('#9fc9de',wx-2,wy-4,20,22);rc('#d8f1ff',wx,wy-2,16,8);rc('#5b7f94',wx+7,wy-4,2,22);rc('#fff',wx-2,wy-4,20,2);rc('#2f8f5a',wx-2,wy+16,20,2)}
    else if(k=='x'){rc('#3d4f7a',wx,wy-4,16,22);rc('#7aa3ff',wx+2,wy-2,12,18);rc('#e63946',wx+6,wy+2,4,8);rc('#f2c94c',wx+2,wy+4,3,3);rc('#3d4f7a',wx+7,wy-2,2,18)}
    else if(k=='g'||k=='j'||k=='b'||k=='t'||k=='m'){rc('#7a5a2c',wx,wy-3,16,22);rc('#3a2410',wx+2,wy-1,12,18);rc('#ffd36b',wx+3,wy,10,16);rc('#7a5a2c',wx,wy-3,16,3)}
    else{rc('#5b3a1e',wx-1,wy-3,18,23);rc('#ffd36b',wx+1,wy,14,17);rc('#fff2b0',wx+1,wy,14,5);rc('#5b3a1e',wx+7,wy,2,17);rc(wall,wx-1,wy-3,18,3);rc(home?'#9b2226':'#2a6f97',wx-6,wy-1,4,18);rc(home?'#9b2226':'#2a6f97',wx+18,wy-1,4,18)}}
  // door
  if(k=='h'){rc('#2f8f5a',dx-6,py+Hh-36,36,36);rc('#bfe6f5',dx-4,py+Hh-34,16,34);rc('#bfe6f5',dx+14,py+Hh-34,16,34);rc('#fff',dx+11,py+Hh-34,2,34)}
  else if(k=='m'||k=='g'||k=='j'||k=='b'){rc('#3a2410',dx-3,py+Hh-38,26,38);rc('#6b4423',dx,py+Hh-34,20,34);rc('#f2c94c',dx+5,py+Hh-44,10,6);rc('#3a2410',dx+9,py+Hh-34,2,34)}
  else{rc('#3a2410',dx-2,py+Hh-34,24,34);rc('#6b4423',dx,py+Hh-32,20,32);rc('#3a2410',dx+9,py+Hh-32,2,32);rc('#f2c94c',dx+14,py+Hh-16,3,3)}
  if(k=='t'||k=='g'){for(let i=0;i<24;i+=4)rc(i%8?'#ff9f1c':'#e63946',dx-2+i,py+Hh-40+((i>>2)&1)*2,3,4)}
  else if(!k&&!home){for(let i=0;i<28;i+=7)rc(i%14?'#fff':ac,dx-4+i,py+Hh-40,7,7)}
  if(!home&&name!='Home')drawSign(px+W/2,py+Hh*.46-1,W-4,name,signStyle(name));
  else if(home){drawSign(px+W/2,py+Hh*.46,W-6,name,'moss')}}

function drawLamp(x,y){const px=x*T,py=y*T;rc('rgba(0,0,0,.25)',px+8,py+27,16,4);rc('#5a2323',px+14,py+8,4,20);rc('#5a2323',px+10,py+26,12,3);
  rc('#c1121f',px+3,py+8,26,3);rc('#e63946',px+3,py+8,26,1);rc('#ffd36b',px+2,py+3,6,6);rc('#ffd36b',px+24,py+3,6,6);rc('#ffd36b',px+13,py+1,6,6);rc('#fff4b0',px+14,py+2,3,3)}
function drawTrain(d){if(!d.trackY)return;const ty=d.trackY*T,tx=((tick*1.6)%((d.w+14)*T))-12*T;if(tx>cam.x+VW*T||tx+11*T<cam.x)return;
  rc('#2b4a6b',tx,ty-6,T*10,28);rc('#3d6a96',tx,ty-6,T*10,6);for(let i=0;i<9;i++){rc('#ffd36b',tx+10+i*34,ty+2,20,10);rc('#111',tx+6+i*34,ty+22,10,6)}rc('#c1121f',tx+T*10,ty-2,14,24)}
function drawTile(m,d,x,y){
  const c=m.g[y][x],h=H(x,y),px=x*T,py=y*T,th=d.th,gr=th.g,nt=(dx,dy)=>{const r=m.g[y+dy]&&m.g[y+dy][x+dx];return r?r.t:-1};
  if(c.t==1||c.t==2){const rd=c.t==1?th.rd:th.pl;rc(rd[0],px,py,T,T);for(let r=0;r<T;r+=8){rc(rd[1],px,py+r,T,1);for(let k=(r>>3&1)*8;k<T;k+=16)rc(rd[1],px+k,py+r,1,8)}
    if(h%3==0)rc(rd[2],px+(h>>3)%24,py+(h>>6)%24,5,2);if(c.t==2){rc('rgba(255,255,255,.10)',px+3,py+3,T-6,1);rc('rgba(255,255,255,.10)',px+3,py+T-4,T-6,1);rc('rgba(255,255,255,.10)',px+3,py+3,1,T-6);rc('rgba(255,255,255,.10)',px+T-4,py+3,1,T-6);if((x+y)%2==0){rc('rgba(255,210,120,.16)',px+12,py+12,8,8);rc('rgba(255,210,120,.22)',px+14,py+14,4,4)}}
    const e=(dx,dy)=>{const t=nt(dx,dy);return t!=1&&t!=2&&t!=3&&t!=9&&t!=-1&&t!=6};
    if(e(0,-1))rc(th.rim,px,py,T,2);if(e(0,1))rc(th.rim,px,py+T-2,T,2);if(e(-1,0))rc(th.rim,px,py,2,T);if(e(1,0))rc(th.rim,px+T-2,py,2,T);
    if(c.t==1&&nt(0,-1)==5){rc('#7b4a24',px,py,T,5);rc('#c08a4a',px,py,T,2)}if(c.t==1&&nt(0,1)==5){rc('#7b4a24',px,py+T-5,T,5);rc('#c08a4a',px,py+T-5,T,2)}}
  else if(c.t==3){rc('#7a6a58',px,py,T,T);for(let i=0;i<T;i+=8)rc('#4a3b2a',px+i+1,py+2,4,T-4);rc('#b8b8c0',px,py+8,T,3);rc('#b8b8c0',px,py+20,T,3)}
  else if(c.t==4){rc('#e8d08a',px,py,T,T);for(let i=0;i<6;i++)rc(i%2?'#d2b86c':'#f4e6b0',px+(h>>(i*3))%28,py+(h>>(i*2+1))%28,2,2)}
  else if(c.t==5){rc('#2f8fd8',px,py,T,T);for(let k=0;k<T;k+=8)rc('#7fd0f5',px+((k*3+(tick>>3)+h)%24),py+k+2,10,2);rc('#2373b8',px+(h>>2)%20,py+(h>>5)%24,6,2);
    if(nt(-1,0)==4)rc('#f4e6b0',px,py,3,T);if(nt(1,0)==4)rc('#f4e6b0',px+T-3,py,3,T);if(nt(0,-1)==4)rc('#f4e6b0',px,py,T,3);if(nt(0,1)==4)rc('#f4e6b0',px,py+T-3,T,3)}
  else if(c.t==6){const l=th.ln;rc(l[0],px,py,T,T);for(let i=0;i<5;i++)rc(i%2?l[1]:l[2],px+(h>>(i*3))%28,py+(h>>(i*2+1))%28,3,2);rc(gr[0],px,py,T,0);
    const e=(dx,dy)=>{const t=nt(dx,dy);return t==0||t==7};if(e(0,-1))rc(gr[2],px,py,T,2);if(e(0,1))rc(gr[2],px,py+T-2,T,2);if(e(-1,0))rc(gr[2],px,py,2,T);if(e(1,0))rc(gr[2],px+T-2,py,2,T)}
  else if(c.t==7){rc('#7a5a2c',px,py,T,T);for(let r=0;r<T;r+=8){rc('#3f9a3c',px,py+r,T,5);rc('#6bcf5a',px,py+r,T,2);for(let k=0;k<T;k+=6)rc('#2e7d32',px+k+(r&8)/4,py+r+2,2,3)}}
  else if(c.t==9){rc('#8b5e3c',px,py,T,T);for(let k=0;k<T;k+=8){rc('#6b4423',px,py+k,T,1);rc('#a9764a',px,py+k+1,T,2)}rc('#5b3a1e',px,py,T,2);rc('#5b3a1e',px,py+T-2,T,2)}
  else{rc(h%7<2?gr[1]:gr[0],px,py,T,T);for(let i=0;i<5;i++)rc(i%2?gr[1]:gr[2],px+(h>>(i*3))%27,py+(h>>(i*2+3))%27,2,2);
    if(h%4==0){const a=(h>>5)%24,b=(h>>9)%24;rc('#0f6e58',px+a,py+b+2,1,3);rc('#0f6e58',px+a+2,py+b+1,1,4);rc('#58d6a9',px+a+1,py+b,1,3)}
    if(c.wl){rc('#7a7480',px,py,T,T);for(let r=0;r<T;r+=8){rc('#4f4a58',px,py+r,T,1);for(let k=(r>>3&1)*8;k<T;k+=16)rc('#4f4a58',px+k,py+r,1,8)}rc('#a49dae',px,py,T,3)}
    else if(c.gate){rc('#2a1a0a',px,py,T,T);rc('#5b3a1e',px+2,py+2,28,30);for(let k=0;k<28;k+=7)rc('#3a2410',px+2+k,py+2,2,30);rc('#c1121f',px+12,py+10,8,10);rc('#f2c94c',px+14,py+13,4,4)}
    else if(c.gd){rc('#1f8a5e',px,py,T,T);for(let i=0;i<6;i++){rc(['#f2c94c','#ff8fb1','#ffffff','#7ec8ff'][(h>>i)%4],px+5+(i%3)*10,py+6+(i>>1)*9,4,4);rc('#0f6e58',px+7+(i%3)*10,py+10+(i>>1)*9,1,3)}
      const q=(dx,dy)=>{const r=m.g[y+dy]&&m.g[y+dy][x+dx];return r&&r.gd};
      if(!q(0,-1)){rc('#d98a1c',px,py,T,5);rc('#f2b84a',px,py,T,2)}if(!q(0,1)){rc('#d98a1c',px,py+T-5,T,5);rc('#f2b84a',px,py+T-5,T,2)}if(!q(-1,0)){rc('#d98a1c',px,py,5,T);rc('#f2b84a',px,py,2,T)}if(!q(1,0)){rc('#d98a1c',px+T-5,py,5,T);rc('#f2b84a',px+T-2,py,2,T)}}
    else if(c.f){rc('#fff',px+10,py+14,3,3);rc('#ff5a7a',px+20,py+8,3,3);rc('#f2c94c',px+14,py+22,3,3);rc('#7ec8ff',px+6,py+6,3,3);rc('#f2c94c',px+24,py+20,3,3)}}}
function drawTree(px,py,h,d){const tp=d.th.tree;rc('rgba(0,0,0,.25)',px+3,py+24,26,6);
  if(tp=='pine'){rc('#4a2f1b',px+14,py+22,4,8);for(let i=0;i<3;i++){const w=12+i*7,ty=py+3+i*7;rc('#0a3d2a',px+16-w/2-1,ty,w+2,9);rc('#157a4d',px+16-w/2,ty+1,w,7);rc('#2fa86a',px+16-w/2,ty+1,w/2|0,3)}}
  else if(h%4==0)drawPalm(px,py);
  else{rc('#4a2f1b',px+13,py+22,6,8);rc('#0b4a2c',px,py+6,32,18);rc('#0b4a2c',px+4,py,24,28);rc('#1c8a4a',px+2,py+8,28,14);rc('#1c8a4a',px+6,py+3,20,22);rc('#46c06f',px+8,py+6,8,5);rc('#46c06f',px+19,py+12,6,4);rc('#0e5c35',px+10,py+17,5,3);rc('#0e5c35',px+20,py+19,5,3)}}
function drawPalm(px,py){rc('rgba(0,0,0,.22)',px+6,py+26,20,5);rc('#8b5e3c',px+14,py+12,4,18);rc('#6b4423',px+14,py+16,4,2);rc('#6b4423',px+14,py+22,4,2);
  X.strokeStyle='#1c9a4a';X.lineWidth=3;const sw=Math.sin(tick/25+px)*1.5;for(let i=0;i<6;i++){const a=i*Math.PI/3+.3;X.beginPath();X.moveTo(px+16,py+10);X.lineTo(px+16+Math.cos(a)*14+sw,py+10+Math.sin(a)*7+3);X.stroke()}rc('#6b4423',px+13,py+11,3,3);rc('#6b4423',px+17,py+12,3,3)}
// a steel tiffin carrier: three stacked tiers, side clips and a carry handle (24x26 box)
function tiffinShape(r){
  r('rgba(0,0,0,.3)',3,24,18,3);
  const tier=(y,h,x,w,stripe)=>{r('#6f7c89',x,y,w,h);r('#cfd8e0',x+1,y+1,w-2,h-2);r('#f4f8fb',x+2,y+1,2,h-2);r('#8c99a6',x+w-4,y+1,3,h-2);r('#b3bec9',x+1,y+Math.floor(h/2),w-2,1);if(stripe)r(stripe,x+1,y+h-3,w-2,1)};
  tier(17,7,3,18,'#e07b1a');tier(11,7,3,18,'#c1121f');tier(5,7,4,16,'#e07b1a');
  r('#6f7c89',5,3,14,3);r('#dde5ec',6,3,12,2);r('#f4f8fb',7,3,3,1);r('#6f7c89',10,1,4,3);r('#9aa6b2',11,1,2,2);   // lid + knob
  r('#59636e',2,6,1,17);r('#59636e',21,6,1,17);r('#aab5c0',3,6,1,17);r('#aab5c0',20,6,1,17);                    // side rods
  r('#59636e',3,0,1,1);r('#59636e',4,0,16,1);r('#59636e',20,0,1,1);r('#59636e',2,1,1,5);r('#59636e',21,1,1,5)}      // handle
function drawTiffin(px,py){const bob=Math.sin(tick/18)*1.2,r=(c,a,b,w,h)=>rc(c,px+4+a,py+3+bob+b,w,h);tiffinShape((c,a,b,w,h)=>{if(c.startsWith('rgba(0,0,0'))rc(c,px+4+a,py+3+b,w,h);else r(c,a,b,w,h)});
  const g=(tick%70)/70;if(g<.5){const gx=7+g*20,al=Math.sin(g*Math.PI*2);X.globalAlpha=Math.max(0,al);r('#fff',gx,8,3,1);r('#fff',gx+1,7,1,3);X.globalAlpha=1}}
function parcelShape(r){r('rgba(0,0,0,.3)',2,22,20,3);r('#8a6a3f',2,8,20,15);r('#c9a26b',3,9,18,13);r('#dcbb85',3,9,18,3);r('#a9824d',3,19,18,3);r('#c1121f',11,9,2,13);r('#c1121f',3,15,18,2);r('#e63946',8,5,4,4);r('#e63946',12,5,4,4);r('#7a1022',11,8,2,2);r('#f4efe0',14,17,6,4);r('#777',15,18,4,1)}
function drawParcel(px,py){const bob=Math.sin(tick/18)*1;parcelShape((c,a,b,w,h)=>rc(c,px+4+a,py+3+(c.startsWith('rgba(0,0,0')?0:bob)+b,w,h))}
function drawSpark(x,y,col){const t=tick/10,px=x*T+16,py=y*T+16;rc('rgba(255,255,255,.25)',px-10,py-10,20,20);rc(col,px-2,py-9+Math.sin(t)*2,4,18);rc(col,px-9,py-2+Math.cos(t)*2,18,4);rc('#fff',px-1,py-1,3,3)}

function drawProps(d){(d.palms||[]).forEach(p=>{if(vis(p[0]*T,p[1]*T,T,T))drawPalm(p[0]*T,p[1]*T)});
  (d.props||[]).concat(d.pp||[]).forEach(([k,x,y])=>{const px=x*T,py=y*T;if(!vis(px,py,T,T))return;const r=(c,a,b,w,h)=>rc(c,px+a,py+b,w,h);r('rgba(0,0,0,.25)',2,26,28,4);
    if(k=='bike'){r('#111',4,20,8,8);r('#111',22,20,8,8);r('#c1121f',8,12,18,6);r('#444',12,8,10,4);r('#c1121f',24,10,3,8);r('#222',20,8,8,2);r('#f2c94c',27,12,3,2)}
    if(k=='cart'){r('#8b5e3c',3,14,26,9);r('#6b4423',3,22,26,2);r('#111',6,22,7,7);r('#111',19,22,7,7);for(let i=0;i<6;i++)r(['#e63946','#f2c94c','#2a9d8f','#ff9933'][i%4],5+i*4,9,4,6);r('#6b4423',0,16,4,2)}
    if(k=='fruit'){r('#8b5e3c',3,16,26,12);for(let i=0;i<26;i+=3)r(['#e63946','#f2c94c','#2e8b57','#ff9933'][(i/3|0)%4],3+i,13,3,4);for(let i=0;i<28;i+=7)r(i%14?'#fff':'#2a9d8f',2+i,3,7,6);r('#5b3a1e',3,3,2,25);r('#5b3a1e',26,3,2,25)}
    if(k=='statue'){r('#8c8c96',6,22,20,8);r('#a8a8b2',9,18,14,6);r('#e8c14a',11,3,10,16);r('#f2d86a',12,4,4,10);r('#c9a23a',10,0,12,5);r('#e8c14a',8,12,4,6);r('#e8c14a',20,12,4,6)}
    if(k=='bench'){r('#5a2f12',3,12,26,4);r('#8b5e3c',3,8,26,4);r('#5a2f12',5,16,3,10);r('#5a2f12',24,16,3,10);r('#a9764a',3,8,26,1)}
    if(k=='planter'){r('#b5651d',7,18,18,10);r('#8a4a12',7,18,18,2);r('#2e8b57',9,8,14,11);r('#3aa86a',11,6,10,8);for(let i=0;i<4;i++)r(['#f2c94c','#ff8fb1','#fff','#ff6b35'][i],10+i*4,5+(i%2)*3,3,3)}})}
function drawStalls(d){(d.stalls||[]).forEach(([x,y,kind],i)=>{const px=x*T,py=y*T;if(!vis(px,py,T,T))return;const r=(c,a,b,w,h)=>rc(c,px+a,py+b,w,h),t=tick/18+i;
  const AW={chai:['#e63946','#fff'],bangle:['#8e44ad','#f2c94c'],flower:['#f2a900','#fff'],puri:['#3d85c6','#fff'],fruit:['#2e8b57','#fff'],balloon:['#ff6b35','#fff'],kite:['#2a9d8f','#fff'],toy:['#ef476f','#ffd166']}[kind]||['#e63946','#fff'];
  const skin=['#a9713a','#8d5524','#c68642','#b9793c'][(x*3+y)%4];
  r('rgba(0,0,0,.25)',2,26,28,4);r('#5b3a1e',3,3,2,25);r('#5b3a1e',26,3,2,25);
  r(skin,13,10,6,5);r(['#111','#2b1a10','#5a3a1e'][(x+y)%3],13,9,6,2);r(['#fff','#e9c46a','#7ec8e3','#e76f51'][(x+2*y)%4],12,15,8,4);   // vendor
  r('#8b5e3c',3,17,26,11);r('#a9672f',3,17,26,3);
  for(let k=0;k<28;k+=7)r(k%14?AW[1]:AW[0],2+k,2,7,8);r('rgba(0,0,0,.2)',2,10,28,1);
  if(kind=='chai'){r('#c0c0c8',6,12,8,7);r('#8e8e98',6,12,8,2);r('#fff',20,15,2,3);r('#fff',24,15,2,3);r('#c1440e',20,17,2,1);for(let k=0;k<2;k++){X.globalAlpha=.5;rc('#fff',px+9+k*2,py+7-((t*3+k*4)%6),2,2);X.globalAlpha=1}}
  if(kind=='bangle')for(let k=0;k<5;k++){r(['#e63946','#f2c94c','#2a9d8f','#8e44ad','#ff6b35'][k],5+k*5,13,3,5);r('#fff',5+k*5,13,1,5)}
  if(kind=='flower')for(let k=0;k<4;k++){r(['#ff9933','#f2c94c','#ff6b9a','#fff'][k],5+k*6,13,5,5);r('#2e8b57',6+k*6,17,3,1)}
  if(kind=='puri'){r('#2a6f97',5,12,8,6);r('#7ec8e3',6,12,6,2);for(let k=0;k<4;k++)r('#e9c46a',16+k*3,14+(k%2),3,3);r('#2e8b57',22,11,4,4)}
  if(kind=='fruit')for(let k=0;k<7;k++)r(['#e63946','#f2c94c','#2e8b57','#ff9933'][k%4],4+k*3,13+(k%2),3,3);
  if(kind=='balloon'){for(let k=0;k<5;k++){const bx=9+k*3,by=-12+Math.sin(t+k)*2-(k%2)*6;rc('#555',px+bx,py+by+8,1,12);rc(['#e63946','#f2c94c','#2a9d8f','#8e44ad','#ff6b35'][k],px+bx-2,py+by,6,8);rc('rgba(255,255,255,.5)',px+bx-1,py+by+1,1,2)}}
  if(kind=='kite'){for(let k=0;k<3;k++){const kx=6+k*9,ky=-6+Math.sin(t+k*2)*2;X.fillStyle=['#e63946','#f2c94c','#3d85c6'][k];X.beginPath();X.moveTo(px+kx+4,py+ky-6);X.lineTo(px+kx+9,py+ky+2);X.lineTo(px+kx+4,py+ky+10);X.lineTo(px+kx-1,py+ky+2);X.fill();rc('#555',px+kx+4,py+ky+10,1,6)}}
  if(kind=='toy'){r('#e63946',6,13,5,5);r('#f2c94c',13,12,4,6);r('#3d85c6',20,14,6,4);r('#111',7,18,2,1);r('#111',9,18,2,1)}})}

function drawPz(d){(d.pz||[]).forEach((p,i)=>{const px=p.x*T,py=p.y*T,lit=(S.flags['pz_'+S.map]||[]).includes(i)||S.flags['pz_'+S.map+'_ok'];if(!vis(px,py,T,T))return;rc('rgba(0,0,0,.25)',px+4,py+26,24,4);
  if(d.trackY){rc('#444',px+14,py+6,4,22);rc('#222',px+9,py+2,14,10);rc(lit?'#3dff7a':'#c1121f',px+12,py+4,8,6);if(lit)rc('rgba(61,255,122,.35)',px+6,py-2,20,20)}
  else{rc('#8c7a5a',px+8,py+16,16,12);rc('#a8946c',px+6,py+14,20,4);rc('#c2792c',px+10,py+8,12,8);if(lit){rc('#ffe14d',px+14,py+0,4,9);rc('#ff9933',px+13,py+4,6,5);rc('rgba(255,200,60,.35)',px+2,py-6,28,28)}else rc('#555',px+15,py+4,2,5)}})}
const vis=(px,py,w,h)=>px+w>cam.x-60&&px<cam.x+VW*T+60&&py+h>cam.y-80&&py<cam.y+VH*T+60;

function drawStreetTop(d){if(d.indoor)return;const cs=['#e63946','#f2c94c','#2a9d8f','#ff9933','#8e44ad'],lamps=d.lamps.filter(l=>vis(l[0]*T,l[1]*T,T,T));
  const line=(x1,y1,x2,y2,sag,flags,bulbs)=>{X.strokeStyle=flags?'#3a2a1a':'#1a1a1a';X.lineWidth=1;X.beginPath();X.moveTo(x1,y1);X.quadraticCurveTo((x1+x2)/2,(y1+y2)/2+2*sag,x2,y2);X.stroke();
    const n=Math.max(2,Math.round(Math.abs(x2-x1)/(bulbs?9:12)));
    for(let i=1;i<n;i++){const t=i/n,px=x1+t*(x2-x1),py=y1+t*(y2-y1)+4*sag*t*(1-t);
      if(flags){X.fillStyle=cs[i%5];X.beginPath();X.moveTo(px-4,py);X.lineTo(px+4,py);X.lineTo(px,py+9);X.fill()}
      if(bulbs){const on=(Math.floor(tick/20)+i)%3?1:.55;rc('#fff1a8',px-1,py,3,3);X.globalCompositeOperation='lighter';const g=X.createRadialGradient(px,py+1,0,px,py+1,9);g.addColorStop(0,'rgba(255,200,90,'+.55*on+')');g.addColorStop(1,'rgba(255,170,60,0)');X.fillStyle=g;X.fillRect(px-9,py-8,18,18);X.globalCompositeOperation='source-over'}}};
  const L=lamps.slice().sort((a,b)=>a[0]-b[0]);for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++)if(Math.abs(L[i][1]-L[j][1])<=1&&L[j][0]-L[i][0]<=12){line(L[i][0]*T+16,L[i][1]*T+6,L[j][0]*T+16,L[j][1]*T+6,6,0,1);break}
  const cb=d.blds[0];if(cb&&d.cfg.lm){line((d.cfg.cx-9)*T,(d.cfg.cy-1)*T,(d.cfg.cx+9)*T,(d.cfg.cy-1)*T,12,1);line((d.cfg.cx-9)*T,(d.cfg.cy+4)*T,(d.cfg.cx+9)*T,(d.cfg.cy+4)*T,10,0,1)}}

function lighting(d){const W=VW*T,Hh=VH*T,sx=Math.round(cam.x),sy=Math.round(cam.y);
  if(d.indoor){X.fillStyle='rgba(255,150,60,.13)';X.fillRect(0,0,W,Hh);return}
  const L=[];d.lamps.forEach((l,i)=>{const x=l[0]*T+16-sx,y=l[1]*T+8-sy;if(x>-100&&x<W+100&&y>-100&&y<Hh+100)L.push([x,y,96+Math.sin(tick/6+i*2)*3,.97,i])});
  (d.stalls||[]).forEach(t=>{const x=t[0]*T+16-sx,y=t[1]*T+12-sy;if(x>-100&&x<W+100&&y>-100&&y<Hh+100)L.push([x,y,52,.7,-1])});
  d.blds.forEach(b=>{const x=(b[0]+b[2]/2)*T-sx,y=(b[1]+b[3]*.72)*T-sy;if(x>-150&&x<W+150&&y>-150&&y<Hh+150)L.push([x,y,b[2]*T*.6,.6,-1])});
  L.push([S.px*T+16-sx,S.py*T+16-sy,64,.4,-1]);
  LX.setTransform(K,0,0,K,0,0);LX.globalCompositeOperation='source-over';LX.clearRect(0,0,W,Hh);LX.fillStyle='rgba(42,24,84,.42)';LX.fillRect(0,0,W,Hh);LX.globalCompositeOperation='destination-out';
  L.forEach(([x,y,r,a])=>{const g=LX.createRadialGradient(x,y,2,x,y,r);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(1,'rgba(0,0,0,0)');LX.fillStyle=g;LX.fillRect(x-r,y-r,2*r,2*r)});
  X.save();X.setTransform(1,0,0,1,0,0);X.drawImage(lc,0,0);X.restore();X.globalCompositeOperation='lighter';
  L.forEach(([x,y,r,a,i])=>{if(i<0)return;const rr=62,g=X.createRadialGradient(x,y,1,x,y,rr);g.addColorStop(0,'rgba(255,180,70,'+(.42+Math.sin(tick/6+i*2)*.04)+')');g.addColorStop(1,'rgba(255,150,40,0)');X.fillStyle=g;X.fillRect(x-rr,y-rr,2*rr,2*rr)});
  X.globalCompositeOperation='source-over'}

function drawIn(d){
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){rc((x+y)%2?d.fl[0]:d.fl[1],x*T,y*T,T,T);rc('rgba(0,0,0,.07)',x*T,y*T+T-1,T,1)}
  d.deco.forEach(([x,y,w,h,k])=>{const px=x*T,py=y*T,W=w*T,Hh=h*T;
    if(k=='rug'){rc('#8e2f2f',px,py,W,Hh);rc('#e9c46a',px+3,py+3,W-6,Hh-6);rc('#8e2f2f',px+7,py+7,W-14,Hh-14);rc('#e9c46a',px+W/2-4,py+Hh/2-4,8,8)}
    if(k=='mat')for(let i=0;i<w;i++){rc('#2e8b57',px+i*T+4,py+3,24,26);rc('#e8f5d0',px+i*T+4,py+3,24,4)}
    if(k=='kolam'){const cx=px+W/2,cy=py+Hh/2;for(let i=0;i<w*2;i++)for(let j=0;j<h*2;j++){const dx=i-w+.5,dy=j-h+.5;if(Math.abs(dx)+Math.abs(dy)<=Math.max(w,h)-.2)rc(['#fff','#ff6b9a','#f2c94c','#7ec8e3'][(i+j)%4],px+i*16+6,py+j*16+6,4,4)}rc('#fff',cx-3,cy-3,6,6)}});
  d.wd.forEach(([x,k])=>{const px=x*T;
    if(k=='window'){rc('#5b3a1e',px+10,8,28,30);rc('#7ec8e3',px+13,11,22,24);rc('#fff',px+23,11,2,24);rc('#fff',px+13,22,22,2)}
    if(k=='clock'){rc('#3a2410',px+8,10,24,24);rc('#f4efe0',px+11,13,18,18);rc('#222',px+19,15,2,8);rc('#222',px+19,22,6,2)}
    if(k=='frame'){rc('#5b3a1e',px+8,12,24,20);rc('#e9c46a',px+11,15,18,14);rc('#c1440e',px+14,18,12,8)}
    if(k=='calendar'){rc('#fff',px+10,10,20,26);rc('#c1121f',px+10,10,20,6);for(let i=0;i<9;i++)rc('#888',px+13+(i%3)*5,20+(i/3|0)*5,3,3)}
    if(k=='garland'){for(let i=0;i<30;i+=4)rc(i%8?'#ff9933':'#f2c94c',px+i,6+Math.round(Math.sin(i/5)*3)+8,4,4)}
    if(k=='menu'){rc('#2a2a2a',px+4,8,40,28);rc('#f4efe0',px+8,12,32,3);rc('#f4efe0',px+8,19,26,3);rc('#f4efe0',px+8,26,30,3)}
    if(k=='redcross'){rc('#fff',px+6,6,36,36);rc('#e63946',px+21,10,6,28);rc('#e63946',px+10,21,28,6)}
    if(k=='board'){rc('#2f6f4a',px+6,8,36,26);rc('#f4efe0',px+10,13,22,2);rc('#f4efe0',px+10,19,28,2);rc('#f4efe0',px+10,25,16,2)}
    if(k=='om'){rc('#c1440e',px+8,6,32,32);rc('#ffd36b',px+12,10,24,24);rc('#c1440e',px+18,16,12,4);rc('#c1440e',px+18,24,12,4)}
    if(k=='crescent'){rc('#2e8b57',px+8,6,32,32);rc('#f5f5f0',px+14,10,20,22);rc('#2e8b57',px+20,12,16,20);rc('#f2c94c',px+30,14,3,3)}
    if(k=='cross'){rc('#7a8595',px+20,4,8,38);rc('#7a8595',px+10,14,28,8);rc('#e9c46a',px+22,6,4,34)}
    if(k=='khanda'){rc('#1b4f8a',px+8,6,32,32);rc('#f2c94c',px+22,10,4,24);rc('#f2c94c',px+12,18,24,3);rc('#fff',px+14,12,3,18);rc('#fff',px+31,12,3,18)}
    if(k=='jainw'){rc('#fbfaf5',px+8,6,32,32);rc('#e9c46a',px+16,10,16,3);rc('#e9c46a',px+22,10,4,24);rc('#c1121f',px+18,30,12,3)}
    if(k=='buddhaw'){rc('#e9d9a6',px+8,6,32,32);rc('#c1440e',px+16,22,16,12);rc('#d49a6a',px+19,10,10,12);rc('#f2c94c',px+22,6,4,4)}});
  d.furn.forEach(([x,y,w,h,k])=>{const px=x*T,py=y*T,W=w*T,Hh=h*T;
    if(k=='wall'){rc(d.wall,px,py,W,Hh);rc('rgba(0,0,0,.14)',px,py+Hh-4,W,4);if(y==0){rc('rgba(0,0,0,.06)',px,py+T*1.4,W,2)}}
    if(k=='counter'){rc('#7b4a24',px,py+8,W,Hh-8);rc('#a9672f',px,py+4,W,8);for(let i=0;i<W;i+=16)rc(['#e63946','#f2c94c','#2a9d8f'][(i/16|0)%3],px+i+3,py,8,5)}
    if(k=='shelf'){rc('#5b3a1e',px,py+2,W,Hh-2);for(let i=0;i<W;i+=8)rc(['#e63946','#f2c94c','#2a9d8f','#ff9933','#8e44ad'][(i/8|0)%5],px+i+1,py+6,6,10);rc('#8b5e3c',px,py+20,W,3)}
    if(k=='crate'){rc('#8b5e3c',px+2,py+4,W-4,Hh-6);rc('#6b4423',px+2,py+Hh/2,W-4,3);rc('#ff9933',px+8,py,10,6);rc('#2e8b57',px+W-18,py+1,9,6)}
    if(k=='pots'){rc('#444',px,py+2,W,Hh-2);for(let i=0;i<W;i+=26){rc('#b87333',px+i+4,py+8,18,16);rc('#e63946',px+i+6,py+6,14,4)}}
    if(k=='table'){rc('#8b5e3c',px+2,py+6,W-4,Hh-8);rc('#a9672f',px+2,py+4,W-4,6);rc('#fff',px+10,py+10,10,6);rc('#e63946',px+W-22,py+12,8,6)}
    if(k=='altar'){rc('#ff9933',px,py+4,W,Hh-4);rc('#c1440e',px,py+Hh-8,W,8);rc('#f2c94c',px+W/2-4,py+2,8,10);rc('#fff',px+W/2-2,py-4+(tick>>3&1),4,6)}
    if(k=='pillar'){rc('#d9c7a3',px+6,py,20,T);rc('#a08a62',px+6,py+T-6,20,6);rc('#e9d8b0',px+8,py,4,T)}
    if(k=='bench'){rc('#6b4423',px+2,py+10,W-4,Hh-14);rc('#8b5e3c',px+2,py+6,W-4,6)}
    if(k=='bed'||k=='bedh'){rc('#cfd8dc',px,py+2,W,Hh-2);rc('#6bb8d8',px+3,py+20,W-6,Hh-24);rc('#fff',px+4,py+6,24,12);rc('#9aa5b0',px,py+Hh-6,W,6);rc('#e63946',px+W-12,py+Hh/2-2,8,2)}
    if(k=='cot'){rc('#7b4a24',px,py+2,W,Hh-2);rc('#c1440e',px+3,py+8,W-6,Hh-12);rc('#f2c94c',px+3,py+8,W-6,3);rc('#fff',px+5,py+5,22,9)}
    if(k=='almirah'){rc('#6b4423',px+2,py+2,W-4,Hh-2);rc('#8b5e3c',px+4,py+4,W/2-5,Hh-6);rc('#8b5e3c',px+W/2+1,py+4,W/2-5,Hh-6);rc('#f2c94c',px+W/2-4,py+Hh/2,2,4);rc('#f2c94c',px+W/2+2,py+Hh/2,2,4)}
    if(k=='fridge'){rc('#e8eef2',px+3,py+2,W-6,Hh-2);rc('#c0c8d0',px+3,py+Hh/2,W-6,2);rc('#888',px+W-9,py+8,2,8);rc('#888',px+W-9,py+Hh/2+6,2,8)}
    if(k=='tv'){rc('#3a2410',px+2,py+16,W-4,Hh-16);rc('#111',px+6,py+2,W-12,16);rc('#2a6f97',px+8,py+4,W-16,12);rc('rgba(255,255,255,.3)',px+10,py+5,10,2)}
    if(k=='sofa'){rc('#8e2f2f',px+2,py+8,W-4,Hh-10);rc('#a83c3c',px+2,py+4,W-4,8);rc('#6e1f1f',px+2,py+Hh-6,W-4,4);rc('#e9c46a',px+8,py+10,8,6)}
    if(k=='plant'){rc('#b5651d',px+9,py+18,14,10);rc('#8a4a12',px+9,py+18,14,2);rc('#2e8b57',px+7,py+6,18,13);rc('#3aa86a',px+11,py+2,10,10);rc('#7ee0a0',px+14,py+4,3,3)}
    if(k=='stool'){rc('#8b5e3c',px+8,py+14,16,5);rc('#5b3a1e',px+10,py+19,3,9);rc('#5b3a1e',px+19,py+19,3,9)}
    if(k=='stove'){rc('#444',px+2,py+8,W-4,Hh-8);rc('#222',px+10,py+6,12,6);rc('#ff9933',px+14,py+4,4,4);rc('#c0c0c8',px+W-26,py+2,14,10)}
    if(k=='cooler'){rc('#6a8caf',px+4,py+8,24,20);rc('#9fb8d0',px+6,py+10,20,6);rc('#555',px+6,py+28,3,3);rc('#555',px+23,py+28,3,3)}
    if(k=='desk'){rc('#8b5e3c',px+2,py+14,W-4,Hh-14);rc('#222',px+10,py+2,16,12);rc('#7ec8e3',px+12,py+4,12,8);rc('#444',px+14,py+14,8,2)}
    if(k=='books'){rc('#5b3a1e',px,py+4,W,Hh-4);for(let i=0;i<W;i+=6)rc(['#e63946','#f2c94c','#2a9d8f','#3d85c6','#8e44ad'][(i/6|0)%5],px+i+1,py+8,4,12)}
    if(k=='cycle'){rc('#111',px+4,py+18,10,10);rc('#111',px+18,py+18,10,10);rc('#c1121f',px+9,py+12,14,3);rc('#444',px+14,py+8,6,4)}
    if(k=='sack'){rc('#d9c28a',px+6,py+10,20,18);rc('#b49a5a',px+6,py+10,20,3);rc('#8a7a40',px+12,py+6,8,5)}
    if(k=='jar'){rc('#b87333',px+9,py+10,14,18);rc('#8a4a12',px+10,py+8,12,4);rc('#e63946',px+11,py+14,10,6)}
    if(k=='bell'){rc('#5b3a1e',px+6,py+4,20,3);rc('#5b3a1e',px+7,py+4,3,24);rc('#5b3a1e',px+22,py+4,3,24);rc('#f2c94c',px+12,py+8,8,12);rc('#d9a62b',px+11,py+18,10,3)}
    if(k=='diya'){rc('#8c7a5a',px+11,py+16,10,12);rc('#a8946c',px+9,py+14,14,4);rc('#c2792c',px+11,py+8,10,8);rc('#ffe14d',px+15,py+1+(tick>>3&1),3,8);rc('rgba(255,200,60,.35)',px+8,py-4,16,18)}
    if(k=='prasad'){rc('#7b4a24',px,py+10,W,Hh-10);rc('#f2c94c',px,py+6,W,5);for(let i=0;i<W-8;i+=14){rc('#ffd36b',px+i+4,py,8,7);rc('#ff9933',px+i+6,py+2,4,3)}}
    if(k=='statue'){rc('#8c8c96',px+4,py+Hh-14,W-8,14);rc('#a8a8b2',px+8,py+Hh-20,W-16,8);rc('#e8c14a',px+W/2-10,py+6,20,Hh-24);rc('#f2d86a',px+W/2-8,py+8,6,Hh-30);rc('#c9a23a',px+W/2-12,py+2,24,6);rc('rgba(255,220,100,.2)',px+W/2-16,py,32,Hh-8)}
    if(k=='reception'){rc('#2f8f5a',px,py+8,W,Hh-8);rc('#e8eef2',px,py+4,W,6);rc('#fff',px+10,py,12,6);rc('#e63946',px+W-22,py+1,3,5);rc('#e63946',px+W-24,py+2,7,3)}
    if(k=='xray'){rc('#cfd8dc',px+3,py+6,W-6,Hh-8);rc('#222',px+8,py+10,W-16,10);rc('#7ee0ff',px+10,py+12,W-20,6)}
    if(k=='medcab'){rc('#e8eef2',px+2,py+2,W-4,Hh-2);for(let i=0;i<W-8;i+=12){rc('#9fc9de',px+5+i,py+5,9,14);rc('#2f8f5a',px+8+i,py+9,3,6)}}
    if(k=='trolley'){rc('#cfd8dc',px+4,py+12,24,5);rc('#888',px+6,py+17,2,9);rc('#888',px+24,py+17,2,9);rc('#444',px+5,py+26,5,3);rc('#444',px+22,py+26,5,3);rc('#7ec8e3',px+8,py+6,10,6)}
    if(k=='lectern'){rc('#6b4423',px+8,py+10,16,18);rc('#8b5e3c',px+6,py+6,20,6);rc('#fff',px+10,py+4,12,4)}
    if(k=='fountain'){rc('#9aa5b0',px,py+Hh-16,W,16);rc('#7ec8e3',px+4,py+Hh-14,W-8,8)}});
  const dx=d.w>>1;rc('#6b4423',dx*T+3,(d.h-1)*T,26,T);rc('#2a1a0a',dx*T+3,(d.h-1)*T,26,3)}


function drawWorld(){
  X.fillStyle='#0d0f18';X.fillRect(0,0,VW*T,VH*T);const m=cur(),d=m.d;
  const cx=(mm,v,p)=>mm<=v?-(v-mm)/2:Math.max(0,Math.min(mm-v,p));cam.x=cx(d.w*T,VW*T,S.px*T+16-VW*T/2);cam.y=cx(d.h*T,VH*T,S.py*T+16-VH*T/2);
  X.save();X.translate(-Math.round(cam.x),-Math.round(cam.y));
  if(d.indoor){drawIn(d);entsSorted();X.restore();lighting(d);return}
  const x0=Math.max(0,cam.x/T|0),y0=Math.max(0,cam.y/T|0),x1=Math.min(d.w-1,x0+VW+1),y1=Math.min(d.h-1,y0+VH+1);
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)drawTile(m,d,x,y);
  drawTrain(d);d.blds.forEach(b=>{if(vis(b[0]*T,b[1]*T-70,b[2]*T+30,b[3]*T+90))drawBld(b)});
  drawStalls(d);d.lamps.forEach(l=>{if(vis(l[0]*T,l[1]*T,T,T))drawLamp(l[0],l[1])});drawProps(d);drawPz(d);
  for(const k in QUESTS){const Q=QUESTS[k];if(Q.map==S.map&&Q.type=='fetch'&&S.flags[k]=='active'&&d.spots[Q.spot]){const sp=d.spots[Q.spot];const gl=.25+Math.sin(tick/14)*.12;X.fillStyle='rgba(255,220,120,'+gl+')';X.beginPath();X.ellipse(sp[0]*T+16,sp[1]*T+25,17,7,0,0,7);X.fill();if(Q.spot=='tiffin')drawTiffin(sp[0]*T,sp[1]*T);else if(Q.spot=='parcel')drawParcel(sp[0]*T,sp[1]*T);else drawSpark(sp[0],sp[1],'#f2c94c')}}
  for(let i=0;i<3;i++){const s=d.spots['pc'+i];if(s&&!S.flags['pc_'+S.map+'_'+i])drawSpark(s[0],s[1],'#7ee0ff')}
  d.chests.forEach((c,i)=>{if(!S.flags['ch_'+S.map+'_'+i]&&vis(c[0]*T,c[1]*T,T,T)){const px=c[0]*T,py=c[1]*T;rc('rgba(0,0,0,.25)',px+4,py+24,24,4);rc('#6b4423',px+5,py+14,22,12);rc('#8b5e3c',px+5,py+10,22,6);rc('#f2c94c',px+14,py+14,4,5);rc('#f2c94c',px+5,py+10,22,2);if(tick%90<8)rc('#fff',px+22,py+6,3,3)}});
  entsSorted();
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(m.g[y][x].s==2)drawTree(x*T,y*T,H(x,y),d);
  drawStreetTop(d);X.restore();lighting(d)}

