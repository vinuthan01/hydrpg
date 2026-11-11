// ===== procedural map generator (winding village roads, lake, villages, hidden fort) =====
function mkRng(s){return()=>{s=(s+0x6D2B79F5)|0;let t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
const NODEPOS=(cx,cy)=>[[cx-8,cy+2],[cx-4,cy+4],[cx,cy+5],[cx+4,cy+4],[cx+8,cy+2]];
const PZPOS=(cx,cy)=>[[cx,cy-9],[cx+6,cy-8],[cx+8,cy-3],[cx+7,cy+2],[cx+1,cy+5],[cx-6,cy+4],[cx-9,cy-3],[cx-7,cy-8]];
function genMap(id,C){
  const w=C.w,h=C.h,R=mkRng(C.seed),ri=(a,b)=>a+Math.floor(R()*(b-a+1)),pk=a=>a[Math.floor(R()*a.length)],cx=C.cx,cy=C.cy;
  const G=[];for(let y=0;y<h;y++){const r=[];for(let x=0;x<w;x++)r.push({s:0,t:0,f:0});G.push(r)}
  const at=(x,y)=>x>=0&&y>=0&&x<w&&y<h?G[y][x]:null;
  const d={name:C.name,w,h,th:TH[C.th],G,blds:[],stalls:[],pp:[],autos:[],lamps:[],npcs:[],animals:[],foes:[],exits:[],palms:[],props:[],spots:{},chests:[],pz:[],guards:[],cfg:C,bossKey:C.bossKey,bossName:C.bossName,bossIntro:C.bossIntro,tint:''};
  const ell=(c,x,y)=>((x-c[0])/c[2])**2+((y-c[1])/c[3])**2+Math.sin(x*.37+y*.23)*.08+Math.sin(x*.11-y*.17)*.1;
  // ---- lake + ponds
  if(C.lake){const L=C.lake;for(let y=0;y<h;y++)for(let x=0;x<w;x++){const q=ell([L.cx,L.cy,L.rx,L.ry],x,y),c=G[y][x];if(q<1){c.t=5;c.s=1}else if(q<1.25)c.t=4}}
  (C.ponds||[]).forEach(p=>{for(let y=0;y<h;y++)for(let x=0;x<w;x++){const q=ell(p,x,y),c=G[y][x];if(q<1){c.t=5;c.s=1}else if(q<1.5&&!c.t)c.t=4}});
  if(C.island){const[ix,iy]=C.island;for(let y=iy-4;y<=iy+4;y++)for(let x=ix-4;x<=ix+4;x++){const c=at(x,y);if(c&&Math.hypot(x-ix,y-iy)<3.6){c.t=4;c.s=0}}
    d.props.push(['statue',ix,iy]);at(ix,iy).s=1;d.spots.pc0=[ix+1,iy+2];
    for(let x=ix+3;x<w;x++){const c1=at(x,iy),c2=at(x,iy+1);if(c1.t==5||c2.t==5){c1.t=9;c1.s=0;c2.t=9;c2.s=0}else if(x>ix+4)break}}
  // ---- reserve the hidden fort area
  const LR={x:C.lair.corner[1]=='e'?w-26:4,y:C.lair.corner[0]=='n'?4:h-22,w:22,h:17};
  for(let y=LR.y-3;y<LR.y+LR.h+3;y++)for(let x=LR.x-3;x<LR.x+LR.w+3;x++){const c=at(x,y);if(c)c.rs=1}
  if(C.track){d.trackY=C.track;for(let x=0;x<w;x++){const c=G[C.track][x];c.t=3;c.s=0;c.f=0;c.rs=0}}
  // ---- roads
  const carve=(x,y,wd,t)=>{for(let j=0;j<wd;j++)for(let i=0;i<wd;i++){const c=at(x+i,y+j);if(!c||c.rs)continue;if(t==6&&c.t!=0&&c.t!=4)continue;if(t==1&&c.t==2)continue;if(C.track&&c.t==3)continue;c.t=t;c.s=0;c.f=0}};
  const ew=(yb,amp,ph,x0,x1,wd)=>{let py=null,ys=[];for(let x=x0;x<=x1;x++){const yc=Math.max(6,Math.min(h-8,Math.round(yb+amp*Math.sin(x/13+ph)+amp*.45*Math.sin(x/5.3+ph*2)))),a=py==null?yc:py;for(let y=Math.min(a,yc);y<=Math.max(a,yc);y++)carve(x,y,wd,1);py=yc;ys[x]=yc}return ys};
  const ns=(xb,amp,ph,y0,y1,wd)=>{let px=null;for(let y=y0;y<=y1;y++){const xc=Math.max(6,Math.min(w-8,Math.round(xb+amp*Math.sin(y/11+ph)+amp*.45*Math.sin(y/4.7+ph*2)))),a=px==null?xc:px;for(let x=Math.min(a,xc);x<=Math.max(a,xc);x++)carve(x,y,wd,1);px=xc}};
  const lx0=C.lake?Math.ceil(C.lake.cx+C.lake.rx*1.25)+1:0;
  const ys=ew(C.road1,5,.5,lx0,w-1,2);
  ew(cy-18,5,2.1,lx0+3,w-6,1.5|0||1);ew(cy+18,5,4.2,lx0+3,w-6,2);ew(cy+8,4,1.3,lx0+6,w-10,1);
  ns(cx,4,1.0,4,h-6,2);ns(cx-26,5,3.1,4,h-6,2);ns(cx+28,5,5.2,4,h-6,2);
  d.entryW=[1,ys[1]||ys[lx0]];d.entryE=[w-2,ys[w-2]];
  // ---- plaza + landmark
  d.lairBox=[LR.x-3,LR.y-3,LR.x+LR.w+3,LR.y+LR.h+3];
  const lm=C.lm;for(let y=cy-10;y<=cy+6;y++)for(let x=cx-10;x<=cx+9;x++){const c=at(x,y);if(c&&!c.rs&&c.t!=5){c.t=2;c.s=0;c.f=0}}
  const mark=(b)=>{for(let j=0;j<b[3];j++)for(let i=0;i<b[2];i++)G[b[1]+j][b[0]+i].s=1;const dx=b[0]+(b[2]>>1);G[b[1]+b[3]-1][dx].s=0};
  const lb=[cx-(lm[1]>>1),cy-3-lm[2]+0,lm[1],lm[2],lm[3],lm[4],lm[0],lm[5]];lb[1]=cy-2-lm[2];d.blds.push(lb);mark(lb);
  d.start=[cx,cy+3];
  // ---- Charminar plaza life: little shops, glowing lamps, benches, planters
  const KK=['chai','bangle','flower','puri','fruit','balloon','kite','toy'],plazaRes=(C.pz.kind=='node'?NODEPOS(cx,cy):PZPOS(cx,cy)).concat([[cx,cy]]),taken=[];
  const plazaOk=(x,y,sp)=>{const c=at(x,y);if(!c||c.t!=2||c.s||c.rs)return false;if(Math.abs(x-cx)<=2&&y>=cy-2)return false;if(x>=lb[0]-1&&x<=lb[0]+lb[2]&&y>=lb[1]-1&&y<=lb[1]+lb[3])return false;
    if(plazaRes.some(r=>Math.abs(r[0]-x)<=1&&Math.abs(r[1]-y)<=1))return false;return taken.every(o=>Math.max(Math.abs(o[0]-x),Math.abs(o[1]-y))>=sp)};
  const plazaPut=(n,sp,f)=>{for(let k=0;k<900&&n>0;k++){const x=cx-10+ri(0,19),y=cy-10+ri(0,16);if(plazaOk(x,y,sp)){taken.push([x,y]);G[y][x].s=1;f(x,y);n--}}};
  if(!C.track){plazaPut(16,3,(x,y)=>d.stalls.push([x,y,KK[d.stalls.length%KK.length]]));plazaPut(6,3,(x,y)=>d.pp.push(['bench',x,y]));plazaPut(8,2,(x,y)=>d.pp.push(['planter',x,y]));
    for(let k=0;k<900&&d.lamps.length<9;k++){const x=cx-10+ri(0,19),y=cy-10+ri(0,16);if(plazaOk(x,y,4)){taken.push([x,y]);G[y][x].s=3;d.lamps.push([x,y])}}}
  else{plazaPut(10,3,(x,y)=>d.stalls.push([x,y,KK[d.stalls.length%KK.length]]));plazaPut(4,3,(x,y)=>d.pp.push(['bench',x,y]));plazaPut(6,2,(x,y)=>d.pp.push(['planter',x,y]));
    for(let k=0;k<900&&d.lamps.length<6;k++){const x=cx-10+ri(0,19),y=cy-10+ri(0,16);if(plazaOk(x,y,4)){taken.push([x,y]);G[y][x].s=3;d.lamps.push([x,y])}}}
  // ---- lanes (winding village paths)
  const roadT=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(G[y][x].t==1)roadT.push([x,y]);
  const lane=(x,y,len,pers)=>{let dx=pk([-1,1]),dy=0;for(let i=0;i<len;i++){carve(x,y,1,6);if(R()>pers){if(dx){dx=0;dy=pk([-1,1])}else{dy=0;dx=pk([-1,1])}}x=Math.max(3,Math.min(w-4,x+dx));y=Math.max(3,Math.min(h-5,y+dy))}};
  for(let i=0;i<24;i++){const p=pk(roadT);lane(p[0],p[1],ri(14,40),.78)}
  // ---- BFS lane from a door to the nearest road/lane
  function connect(sx,sy,lair){const S0=sy*w+sx,prev=new Int32Array(w*h).fill(-1),q=[S0];prev[S0]=S0;let hd=0,found=-1;
    while(hd<q.length){const cu=q[hd++],x=cu%w,y=(cu/w)|0,c=G[y][x];if(cu!=S0&&(c.t==1||c.t==2||c.t==6||c.t==9)){found=cu;break}
      for(const[ax,ay]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+ax,ny=y+ay;if(nx<2||ny<2||nx>=w-2||ny>=h-2)continue;const k=ny*w+nx;if(prev[k]>=0)continue;const n=G[ny][nx];if(n.s==1||n.t==5||(n.rs&&!lair&&!n.t))continue;prev[k]=cu;q.push(k)}}
    if(found<0)return;let k=found;while(k!=S0){const x=k%w,y=(k/w)|0,c=G[y][x];if(c.t==0||c.t==4){c.t=6;c.f=0}if(c.s==2)c.s=0;k=prev[k]}const c0=G[sy][sx];if(c0.t==0||c0.t==4)c0.t=6;if(c0.s==2)c0.s=0}
  const freeRect=(x,y,ww,hh)=>{for(let j=0;j<hh;j++)for(let i=0;i<ww;i++){const c=at(x+i,y+j);if(!c||c.t!=0||c.s||c.rs||c.gd)return false}return true};
  const prefXY=p=>p=='c'?[cx+ri(-14,14),cy+ri(-8,12)]:p=='e'?[w-28,cy]:p=='t'?[cx+ri(-30,30),(C.track||cy)-6]:p=='v'?(()=>{const v=pk(C.villages);return[v[0]+ri(-9,9),v[1]+ri(-7,7)]})():null;
  function place(sp){const bw=sp[1],bh=sp[2];let best=null,bd=1e9,n=0;
    for(let k=0;k<6000&&n<30;k++){const x=ri(4,w-bw-5),y=ri(4,h-bh-7);if(!freeRect(x-1,y-1,bw+2,bh+3))continue;n++;const pf=prefXY(sp[6]);const dd=pf?Math.abs(x-pf[0])+Math.abs(y-pf[1]):0;if(dd<bd){bd=dd;best=[x,y]}if(!pf)break}
    if(!best)for(let k=0;k<8000&&!best;k++){const x=ri(4,w-bw-5),y=ri(4,h-bh-7);if(freeRect(x,y,bw,bh+2))best=[x,y]}
    if(!best)return;const b=[best[0],best[1],bw,bh,sp[3],sp[4],sp[0],sp[5]];d.blds.push(b);mark(b);const dx=b[0]+(bw>>1);connect(dx,b[1]+bh);
    for(let j=-1;j<3;j++){const c=at(dx,b[1]+bh+j);if(c&&c.s!=1&&!c.gate){c.s=0;c.dr=1;if(c.t==0||c.t==4)c.t=6;c.f=0}}}
  C.blds.forEach(place);
  // ---- helpers
  const nearDoor=(x,y)=>d.blds.some(b=>Math.abs(x-(b[0]+(b[2]>>1)))<=2&&y>=b[1]+b[3]-1&&y<=b[1]+b[3]+3);
  const dist0=(x,y)=>Math.abs(x-d.start[0])+Math.abs(y-d.start[1]);
  const freeTile=(pred,tries=2000)=>{for(let k=0;k<tries;k++){const x=ri(3,w-4),y=ri(3,h-4),c=G[y][x];if(!c.s&&!c.rs&&!c.dr&&pred(c,x,y)&&!nearDoor(x,y))return[x,y]}return null};
  const near=(x,y,rad=4)=>{for(let r=0;r<=rad;r++)for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const c=at(x+i,y+j);if(c&&!c.s&&c.t!=5&&!c.rs&&c.t!=3&&!c.dr&&!d.npcs.some(n=>n.x==x+i&&n.y==y+j))return[x+i,y+j]}return[x,y]};
  const bfront=name=>{const b=d.blds.find(b=>b[6]==name);return b?[b[0]+(b[2]>>1),b[1]+b[3]+1]:d.start};
  // ---- gardens, fields, forests
  for(let i=0;i<14;i++){const x=ri(6,w-10),y=ri(6,h-8);if(freeRect(x,y,4,3)&&Math.hypot(x-cx,y-cy)<34)for(let j=0;j<3;j++)for(let k=0;k<4;k++){const c=G[y+j][x+k];c.gd=1;c.s=1}}
  for(let i=0;i<10;i++){const x=ri(6,w-14),y=ri(6,h-10);if(Math.hypot(x-cx,y-cy)>22&&freeRect(x,y,8,5))for(let j=0;j<5;j++)for(let k=0;k<8;k++)G[y+j][x+k].t=7}
  for(let i=0;i<46;i++){const bx=ri(3,w-4),by=ri(3,h-4),r=ri(2,5);for(let y=by-r;y<=by+r;y++)for(let x=bx-r;x<=bx+r;x++){const c=at(x,y);if(c&&c.t==0&&!c.s&&!c.gd&&Math.hypot(x-bx,y-by)<=r&&R()<.88&&dist0(x,y)>7)c.s=2}}
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const c=G[y][x];if((x<2||y<2||x>=w-2||y>=h-2)&&c.t==0)c.s=2;else if(c.t==0&&!c.s&&R()<.06)c.f=1}
  // flowers: along paths, in clumps and meadows (kinds 1-6)
  for(let y=2;y<h-2;y++)for(let x=2;x<w-2;x++){const c=G[y][x];if(c.t!=0||c.s||c.gd||c.rs)continue;let nr=false;for(let j=-2;j<=2&&!nr;j++)for(let i=-2;i<=2;i++){const t=G[y+j][x+i].t;if(t==1||t==6){nr=true;break}}if(R()<(nr?.17:.03))c.fl=1+Math.floor(R()*6)}
  for(let k=0;k<46;k++){const bx=ri(4,w-5),by=ri(4,h-5),r=ri(2,3),kind=1+Math.floor(R()*6);for(let y=by-r;y<=by+r;y++)for(let x=bx-r;x<=bx+r;x++){const c=at(x,y);if(c&&c.t==0&&!c.s&&!c.gd&&!c.rs&&Math.hypot(x-bx,y-by)<=r&&R()<.62)c.fl=R()<.75?kind:1+Math.floor(R()*6)}}
  // ---- lair
  const wx=LR.x+2,wy=LR.y+1,ww=18,wh=14,gx=wx+(ww>>1),gy=wy+wh-1;
  for(let y=wy;y<wy+wh;y++)for(let x=wx;x<wx+ww;x++){const c=G[y][x],edge=x==wx||x==wx+ww-1||y==wy||y==wy+wh-1;c.s=edge?1:0;c.wl=edge?1:0;c.t=edge?0:2;c.f=0;c.gd=0}
  const gc=G[gy][gx];gc.gate=1;gc.s=1;gc.wl=0;d.gate=[gx,gy];d.boss=[gx,wy+3];d.lair=[gx,wy+7];d.lairRect=[wx,wy,ww,wh];d.lairStyle=C.lair.style||'mafia';d.fires=d.fires||[];
  {const P=(k,x,y,solid)=>{d.props.push([k,x,y]);if(solid!==0)G[y][x].s=1;if(k=='firebarrel')d.fires.push([x,y])};
   for(let y=wy+3;y<gy;y++)for(let i=-1;i<=1;i++)d.props.push(['carpet',gx+i,y]);
   P('firebarrel',wx+1,wy+1);P('firebarrel',wx+ww-2,wy+1);P('firebarrel',wx+1,wy+wh-3);P('firebarrel',wx+ww-2,wy+wh-3);P('firebarrel',gx-5,wy+5);P('firebarrel',gx+5,wy+5);
   P('skullpole',gx-3,wy+2);P('skullpole',gx+3,wy+2);P('throne',gx,wy+2);P('banner',gx-2,wy+1);P('banner',gx+2,wy+1);
   P('crates',wx+2,wy+4);P('crates',wx+3,wy+4);P('crates',wx+ww-3,wy+4);P('crates',wx+ww-4,wy+4);P('crates',wx+2,wy+10);P('crates',wx+ww-3,wy+10);
   P('cage',wx+2,wy+7);P('cage',wx+ww-3,wy+7);P('weaprack',gx-7,wy+8);P('weaprack',gx+7,wy+8);
   for(const[bx,by]of[[gx-2,wy+5],[gx+3,wy+6],[gx-3,wy+10],[gx+2,wy+11],[gx-6,wy+3],[gx+6,wy+11]])P('blood',bx,by,0)}
  d.guards=[[gx-4,wy+8,C.guardFoe||'goonda'],[gx+4,wy+8,C.guardFoe||'goonda']];
  d.lamps.push([wx+2,wy+2],[wx+ww-3,wy+2],[gx-3,gy-2],[gx+3,gy-2]);G[wy+2][wx+2].s=3;G[wy+2][wx+ww-3].s=3;G[gy-2][gx-3].s=3;G[gy-2][gx+3].s=3;
  for(let y=LR.y-3;y<LR.y+LR.h+3;y++)for(let x=LR.x-3;x<LR.x+LR.w+3;x++){const c=at(x,y);if(c&&c.rs&&c.t==0&&!c.s&&R()<.97)c.s=2}
  connect(gx,gy+1,true);
  // ---- lamps, props
  const rt=[];for(let y=2;y<h-2;y++)for(let x=2;x<w-2;x++)if(G[y][x].t==1||G[y][x].t==2)rt.push([x,y]);
  for(let k=0;k<5000&&d.lamps.length<84;k++){const p=pk(rt),o=pk([[1,0],[-1,0],[0,1],[0,-1]]),c=at(p[0]+o[0],p[1]+o[1]);if(!c||c.t!=0||c.s||c.rs||c.gd)continue;if(d.lamps.some(l=>Math.abs(l[0]-p[0]-o[0])+Math.abs(l[1]-p[1]-o[1])<9))continue;c.s=3;d.lamps.push([p[0]+o[0],p[1]+o[1]])}
  const kinds=['bike','cart','fruit','bike'];
  for(let k=0;k<5000&&d.props.filter(p=>p[0]!='statue').length<30;k++){const p=pk(rt),o=pk([[1,0],[-1,0],[0,1],[0,-1]]),c=at(p[0]+o[0],p[1]+o[1]);if(!c||c.t!=0||c.s||c.rs||c.gd)continue;c.s=1;d.props.push([pk(kinds),p[0]+o[0],p[1]+o[1]])}
  for(let k=0;k<600&&d.stalls.length<(C.track?20:30);k++){const p=pk(rt),o=pk([[1,0],[-1,0],[0,1],[0,-1]]),c=at(p[0]+o[0],p[1]+o[1]);if(!c||c.t!=0||c.s||c.rs||c.gd||c.dr||Math.hypot(p[0]-cx,p[1]-cy)>40)continue;c.s=1;d.stalls.push([p[0]+o[0],p[1]+o[1],KK[d.stalls.length%KK.length]])}
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const c=G[y][x];if(c.t==4&&!c.s&&R()<.025&&[[1,0],[-1,0],[0,1],[0,-1]].some(o=>G[y+o[1]][x+o[0]].t==5)){c.s=1;d.palms.push([x,y])}}
  // ---- puzzle objects
  const pz=C.pz;if(C.track){for(let i=0;i<pz.n;i++){const x=cx-16+i*16,y=C.track-1;const c=G[y][x];c.s=1;c.t=c.t==5?0:c.t;d.pz.push({x,y,name:pz.names[i]})}}
  else{const P=C.pz.kind=='node'?NODEPOS(cx,cy):PZPOS(cx,cy);for(let i=0;i<pz.n;i++){const[x,y]=P[i];G[y][x].s=1;d.pz.push({x,y,name:pz.names[i]})}}
  // ---- spots (quest sparkles, torn map pieces) and chests
  const spot=(min,max)=>freeTile((c,x,y)=>(c.t==0||c.t==4)&&!c.gd&&dist0(x,y)>=min&&dist0(x,y)<=max&&G[y][x].s==0);
  const qs=Object.keys(QUESTS).filter(k=>QUESTS[k].map==id&&QUESTS[k].spot);qs.forEach(k=>{let s=null;
    if(id=='hyd'){s=freeTile((c,x,y)=>c.t==4&&x<36&&Math.hypot(x-C.island[0],y-C.island[1])>8&&dist0(x,y)>10&&dist0(x,y)<48&&!c.s)}
    d.spots[QUESTS[k].spot]=s||spot(16,40)});
  if(!d.spots.pc0)d.spots.pc0=spot(30,70);const apart=(min,max,list)=>{for(let k=0;k<200;k++){const s=spot(min,max);if(s&&list.every(o=>Math.abs(o[0]-s[0])+Math.abs(o[1]-s[1])>=28))return s}return spot(min,max)};d.spots.pc1=apart(36,80,[d.spots.pc0]);d.spots.pc2=apart(45,95,[d.spots.pc0,d.spots.pc1]);
  for(let i=0;i<14;i++){const p=freeTile((c,x,y)=>(c.t==0||c.t==4||c.t==7)&&!c.gd&&dist0(x,y)>10);if(p)d.chests.push([p[0],p[1],pk([25,35,45,60,80])])}
  // ---- npcs, animals, foes
    C.npcs.forEach(n=>{const f=n.near=='start'?[d.start[0]+2,d.start[1]]:n.near=='island'&&C.island?[C.island[0]-1,C.island[1]+2]:bfront(n.near),p=near(f[0],f[1]);d.npcs.push({x:p[0],y:p[1],L:NPCL[n.L],name:n.n,q:n.q,pzhint:n.pzhint,giver:n.L,shop:n.shop,stock:n.stock,keyGiver:n.keyGiver,cards:n.cards,side:n.side,target:n.target,say:n.pzhint?C.pz.hint:(n.say||['...'])})});
  const sayPool=POOL.say.concat(C.chat).sort(()=>R()-.5),usedNames=new Set();
  for(let i=0;i<26;i++){const p=freeTile((c,x,y)=>(c.t==1||c.t==6||c.t==2)&&!c.s&&!c.dr);if(!p)continue;const L=genLook(R),pool=L.f?POOL.nameF:POOL.nameM;let nm=pk(pool);for(let t=0;t<20&&usedNames.has(nm);t++)nm=pk(pool);usedNames.add(nm);
    d.npcs.push({x:p[0],y:p[1],L,name:nm,say:[sayPool[i%sayPool.length]],wander:1})}
  const an=(k,n,pred)=>{for(let i=0;i<n;i++){const p=freeTile(pred);if(p)d.animals.push([k,p[0],p[1]])}};
  an('cow',9,(c)=>c.t==1||c.t==6);an('goat',10,(c,x,y)=>(c.t==0||c.t==6)&&C.villages.some(v=>Math.hypot(v[0]-x,v[1]-y)<14));an('dog',10,c=>c.t==6||c.t==1);an('cat',7,(c,x,y)=>c.t==6&&d.blds.some(b=>Math.abs(b[0]-x)<5&&Math.abs(b[1]-y)<6));
  for(let i=0;i<30;i++){const p=freeTile((c,x,y)=>(c.t==0||c.t==6||c.t==7)&&!c.gd&&dist0(x,y)>12);if(p)d.foes.push([p[0],p[1],+(1+dist0(p[0],p[1])/150).toFixed(2),pk(C.foes)])}
  // ---- autos drive along the main roads (width-2 roads, tile type 1)
  const road1=[];for(let y=3;y<h-3;y++)for(let x=3;x<w-3;x++)if(G[y][x].t==1&&!G[y][x].s)road1.push([x,y]);
  for(let i=0;i<3&&road1.length;i++){const p=pk(road1);if(Math.hypot(p[0]-d.start[0],p[1]-d.start[1])>6)d.autos.push([p[0],p[1]])}
  d.cars=[];for(let i=0;i<7&&road1.length;i++){const p=pk(road1);if(Math.hypot(p[0]-d.start[0],p[1]-d.start[1])>6)d.cars.push([p[0],p[1],i+ri(0,3)])}
  // ---- exits
  if(C.east)for(let j=0;j<2;j++)d.exits.push({x:w-1,y:d.entryE[1]+j,to:C.east,side:'W'});
  if(C.west)for(let j=0;j<2;j++)d.exits.push({x:0,y:d.entryW[1]+j,to:C.west,side:'E'});
  const vexit=side=>{const yy=side=='S'?h-8:7;let xx=-1,bd=1e9;for(let x=6;x<w-8;x++){const c=at(x,yy),c2=at(x+1,yy);if(c&&c2&&c.t==1&&c2.t==1&&!c.s&&Math.abs(x-cx)<bd){bd=Math.abs(x-cx);xx=x}}if(xx<0)xx=cx;
    const y0=side=='S'?yy:0,y1=side=='S'?h-1:yy;for(let y=y0;y<=y1;y++)for(let i=0;i<2;i++){const c=at(xx+i,y);if(c){c.t=1;c.s=0;c.f=0;c.rs=0}}return xx};
  if(C.south){const xx=vexit('S');d.entryS=[xx,h-2];for(let i=0;i<2;i++)d.exits.push({x:xx+i,y:h-1,to:C.south,side:'N',x0:xx,req:C.southReq})}
  if(C.north){const xx=vexit('N');d.entryN=[xx,1];for(let i=0;i<2;i++)d.exits.push({x:xx+i,y:0,to:C.north,side:'S',x0:xx})}
  d.exits.forEach(e=>{const c=at(e.x,e.y);if(c){c.t=1;c.s=0}});
  // make sure the start area is open
  for(let j=-1;j<=1;j++)for(let i=-1;i<=3;i++){const c=at(d.start[0]+i,d.start[1]+j);if(c&&c.s&&c.s!=1)c.s=0}
  // ---- connectivity repair: everything must be reachable from the start
  const flood=()=>{const r=new Uint8Array(w*h),q=[d.start[1]*w+d.start[0]];r[q[0]]=1;for(let i=0;i<q.length;i++){const c=q[i],x=c%w,y=(c/w)|0;for(const[ax,ay]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+ax,ny=y+ay;if(nx<0||ny<0||nx>=w||ny>=h)continue;const k=ny*w+nx;if(r[k]||G[ny][nx].s)continue;r[k]=1;q.push(k)}}return r};
  let reach=flood();
  const fix=(x,y)=>{if(x<1||y<1||x>=w-1||y>=h-1||reach[y*w+x])return;const S0=y*w+x,prev=new Int32Array(w*h).fill(-1),q=[S0];prev[S0]=S0;let hd=0,found=-1;
    while(hd<q.length){const cu=q[hd++];if(reach[cu]){found=cu;break}const px=cu%w,py=(cu/w)|0;for(const[ax,ay]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=px+ax,ny=py+ay;if(nx<1||ny<1||nx>=w-1||ny>=h-1)continue;const k=ny*w+nx;if(prev[k]>=0)continue;const n=G[ny][nx];if(n.s==1||n.s==3||n.t==5)continue;prev[k]=cu;q.push(k)}}
    if(found<0)return;let k=found;for(;;){const cx2=k%w,cy2=(k/w)|0,c=G[cy2][cx2];if(c.t==0||c.t==4){c.t=6;c.f=0}if(c.s==2)c.s=0;if(k==S0)break;k=prev[k]}reach=flood()};
  d.blds.forEach(b=>fix(b[0]+(b[2]>>1),b[1]+b[3]));Object.values(d.spots).forEach(s=>s&&fix(s[0],s[1]));d.npcs.forEach(n=>fix(n.x,n.y));d.chests.forEach(c=>fix(c[0],c[1]));d.pz.forEach(p=>{fix(p.x,p.y+1);fix(p.x,p.y-1)});d.exits.forEach(e=>fix(e.x,e.y));fix(gx,gy+1);d.animals.forEach(a=>fix(a[1],a[2]));
  return d;
}
