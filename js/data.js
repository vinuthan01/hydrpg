// ===== DATA (v6) : looks, items, enemies, quests, cities, interiors =====
// Everything that describes the game world lives here so it is easy to extend.

// ---------- player looks (4 teenagers, 15-18). They are never reused for NPCs ----------
const LOOKS = [
  {n:'Ananya',f:1,teen:1,skin:'#c68642',hair:'#1b1b1b',hs:'pony', top:'#e63946',bot:'#2a6f97',acc:'#f2c94c',pack:'#2a9d8f'},
  {n:'Priya', f:1,teen:1,skin:'#a9713a',hair:'#2b1a10',hs:'bob',  top:'#8e6bbf',bot:'#3f4658',acc:'#ff8fb1',hood:1},
  {n:'Arjun', f:0,teen:1,skin:'#b9793c',hair:'#111',   hs:'messy',top:'#3d85c6',bot:'#264653',pack:'#c1440e'},
  {n:'Ravi',  f:0,teen:1,skin:'#8d5524',hair:'#1b1b1b',hs:'spiky',top:'#f2c94c',bot:'#3b4a7a',band:'#e63946'}];

// ---------- hand-designed characters (every one looks different) ----------
const NPCL = {
  raju:   {f:0,skin:'#8d5524',hair:'#222',hs:'side',top:'#e9a23b',bot:'#f4f4f4',pat:'check',stache:1,apron:'#ffffff'},
  sharma: {f:0,skin:'#b9793c',hair:'#bbb',hs:'bald',top:'#f5f1e6',bot:'#f5f1e6',glasses:1,stache:1,big:1,sc:.98,tilak:'#c1121f'},
  pandit: {f:0,skin:'#a9713a',hair:'#eee',hs:'bald',top:'#ff9933',bot:'#fff',tilak:'#c1121f',beard:'#e8e8e8',shawl:'#ff9933',stick:1},
  babu:   {f:0,skin:'#a9713a',hair:'#111',hs:'crop',top:'#c1121f',bot:'#2c2c36',cap:'#c1121f',stache:1,badge:1,sc:1.02},
  guide:  {f:0,skin:'#d49a6a',hair:'#2b1a10',hs:'side',top:'#b9a46a',bot:'#4a5a3a',cap:'#b9a46a',shades:1,pat:'stripe'},
  keeper: {f:0,skin:'#8d5524',hair:'#dcdcdc',hs:'crop',top:'#c9a26b',bot:'#fff',beard:'#dcdcdc',stick:1,glasses:1,sc:.96},
  gupta:  {f:0,skin:'#c68642',hair:'#222',hs:'bald',top:'#fff',bot:'#2d3a6b',chef:1,stache:1,big:1,apron:'#e8e8e8'},
  smaster:{f:0,skin:'#b9793c',hair:'#333',hs:'crop',top:'#e8e8f0',bot:'#1f2a44',cap:'#1f2a44',badge:1,stache:1,pat:'stripe',whistle:1},
  nurse:  {f:1,skin:'#c68642',hair:'#111',hs:'bun',top:'#ffffff',bot:'#e8f2f8',nursecap:1,cross:1},
  doctor: {f:0,skin:'#a9713a',hair:'#1b1b1b',hs:'side',top:'#ffffff',bot:'#3a4a6a',coat:1,glasses:1,steth:1},
  doctorF:{f:1,skin:'#d49a6a',hair:'#2b1a10',hs:'long',top:'#ffffff',bot:'#6a4c93',coat:1,steth:1,bindi:'#c1121f'},
  imam:   {f:0,skin:'#b9793c',hair:'#ddd',hs:'topi',top:'#f5f5f0',bot:'#f5f5f0',beard:'#e8e8e8',topi:'#ffffff'},
  father: {f:0,skin:'#d9a878',hair:'#444',hs:'crop',top:'#1e1e24',bot:'#1e1e24',collar:1,glasses:1},
  granthi:{f:0,skin:'#c68642',hair:'#222',hs:'turban',top:'#f5f5f0',bot:'#f5f5f0',turban:'#ff9933',beard:'#2a2a2a',sash:'#1b4f8a'},
  jainMonk:{f:0,skin:'#c68642',hair:'#222',hs:'bald',top:'#f8f8f2',bot:'#f8f8f2',robe:1,tilak:'#e9c46a'},
  bhikkhu:{f:0,skin:'#c68642',hair:'#222',hs:'bald',top:'#a4361e',bot:'#a4361e',robe:1,beads:1},
  cook:   {f:0,skin:'#a9713a',hair:'#222',hs:'crop',top:'#f2f2f2',bot:'#6b3a2a',chef:1,apron:'#fff',stache:1},
  clerk:  {f:0,skin:'#b9793c',hair:'#222',hs:'side',top:'#8fb3d9',bot:'#2c2c36',glasses:1,pat:'check'},
  fisher: {f:0,skin:'#7a4a22',hair:'#ddd',hs:'bald',top:'#2a6a8a',bot:'#d8c89a',stache:1,cap:'#e8d9a0',pat:'stripe',sc:.98},
  cto:    {f:1,skin:'#c68642',hair:'#111',hs:'bun',top:'#2a2a3a',bot:'#2a2a3a',coat:1,glasses:1,bindi:'#c1121f'},
  anita:  {f:1,skin:'#a9713a',hair:'#2b1a10',hs:'long',top:'#e8e8f0',bot:'#3a3a4a',glasses:1,bindi:'#c1121f',acc:'#2a9d8f'},
  neha:   {f:1,skin:'#d49a6a',hair:'#111',hs:'pony',top:'#8e44ad',bot:'#222',dupatta:'#f4a261',bindi:'#c1121f'},
  kiran:  {f:0,teen:1,skin:'#b9793c',hair:'#111',hs:'messy',top:'#2a9d8f',bot:'#2c3a5a',glasses:1,pack:'#c1440e'},
  vikram: {f:0,skin:'#c68642',hair:'#222',hs:'bald',top:'#ffffff',bot:'#222',chef:1,stache:1,big:1,apron:'#e8e8e8'},
  murthy: {f:0,skin:'#a9713a',hair:'#dcdcdc',hs:'crop',top:'#e8dcc0',bot:'#f5f1e6',glasses:1,beard:'#dcdcdc',stick:1,sc:.97},
  rao:    {f:0,skin:'#8d5524',hair:'#111',hs:'crop',top:'#1b2a44',bot:'#1b2a44',cap:'#1b2a44',badge:1,stache:1,big:1,sc:1.04},
  pavan:  {f:0,teen:1,skin:'#a9713a',hair:'#222',hs:'spiky',top:'#39d98a',bot:'#2c2c36',hood:1,glasses:1},
  catlady:{f:1,skin:'#c68642',hair:'#ddd',hs:'bun',top:'#8e44ad',bot:'#444',dupatta:'#f4a261'}, oldfish:{f:0,skin:'#7a4a22',hair:'#ddd',hs:'bald',top:'#2a6a8a',bot:'#d8c89a',stache:1,cap:'#e8d9a0'}, sweet:{f:0,skin:'#b9793c',hair:'#222',hs:'crop',top:'#fff',bot:'#fff',chef:1,stache:1,big:1}, ravi:{f:0,skin:'#a9713a',hair:'#111',hs:'short',top:'#2a9d8f',bot:'#2c3a5a'}, porter:{f:0,skin:'#7a4a22',hair:'#111',hs:'crop',top:'#c1121f',bot:'#444',cap:'#c1121f'}, sonu:{f:0,teen:1,skin:'#b9793c',hair:'#111',hs:'spiky',top:'#8e44ad',bot:'#222'}, tina:{f:1,skin:'#d49a6a',hair:'#111',hs:'pony',top:'#2a6fdb',bot:'#222',glasses:1},
  shopW:  {f:1,skin:'#a9713a',hair:'#222',hs:'braid',top:'#2a9d8f',bot:'#e9c46a',acc:'#e63946',bindi:'#c1121f',dupatta:'#e63946'}
};

// ---------- unique NPC generator ----------
const USED_LOOKS = new Set();
const sig = L => [L.f,L.hs,L.hair,L.top,L.bot,L.pat||'',L.saree||'',L.cap||'',L.stache?1:0,L.beard||'',L.glasses?1:0].join('|');
LOOKS.forEach(L => USED_LOOKS.add(sig(L)));
Object.values(NPCL).forEach(L => USED_LOOKS.add(sig(L)));
const POOL = {
  skin:['#c68642','#a9713a','#8d5524','#b9793c','#d49a6a','#7a4a22','#e0ac69','#9a6a3a'],
  hairM:['#111','#1b1b1b','#2b1a10','#3a2414','#5a3a1e'], hairOld:['#8a8a8a','#cfcfcf','#e6e6e6'],
  hsM:['short','side','messy','spiky','curly','bald','crop'], hsF:['long','pony','bob','bun','braid','curlyL'],
  top:['#e63946','#f4a261','#2a9d8f','#264653','#8e44ad','#2e8b57','#3d85c6','#ff9933','#c1440e','#6a4c93','#e9c46a','#d62828','#118ab2','#ef476f','#06d6a0','#7f5539','#5e548e','#bc6c25','#4a7c59','#9b2226'],
  bot:['#264653','#2c2c36','#3b4a7a','#5a3a2a','#6a4c93','#355070','#4a4a5a','#f4f4f4','#8d6e4a','#1f2a44'],
  pat:['','','stripe','check','dots'],
  saree:['#c1121f','#e76f51','#7b2cbf','#2a9d8f','#f2a900','#d62828','#4361ee','#2d6a4f','#c9184a','#ff6b35'],
  nameM:['Ramesh','Suresh','Mahesh','Venkat','Srinu','Imran','Farhan','Joseph','Thomas','Harpreet','Kiran','Naveen','Pavan','Vijay','Anil','Sunil','Mohan','Rafiq','Basha','Yadagiri','Narsimha','Ganesh','Dinesh','Prakash','Ashok','Sandeep','Mukesh','Rajesh','Satish','Balaji','Murali','Hari','Nagesh','Kishore','Lokesh','Tarun'],
  nameF:['Lakshmi','Padma','Sushila','Fatima','Ayesha','Mary','Sita','Radha','Kavitha','Swapna','Anitha','Rukhsar','Jyothi','Sunitha','Bhavani','Meena','Savitri','Geeta','Pooja','Vani','Sarala','Nirmala','Rani','Shobha','Usha','Parvati','Zainab','Sheela'],
  say:['Hyderabad evenings are the best, no?','Have you tried the biryani here? Do not leave without it.','Careful at night. The gangs roam the lanes.','I sell flowers near the Charminar every morning.','My cousin drives an auto. Always honking, that one!','The lake is so peaceful at sunset.','Mind the traffic, bhai.','Looking for someone? Ask Raju near the start.','These roads twist like a snake, do not get lost!','Hospitals will heal you for free. Just walk in.','Did you hear the Chapri boys on the next lane?','My grandson wants to be a cricketer.','The old city never sleeps.','I walk here every day for my knees.','Wah, what a breeze today!','The temple bells ring so nicely at dusk.','There is a hidden hideout in the forest, they say.']
};
function genLook(R, o) {
  o = o || {};
  for (let t = 0; t < 60; t++) {
    const f = o.f != null ? o.f : R() < .5 ? 1 : 0, pick = a => a[Math.floor(R() * a.length)], old = o.old || R() < .18;
    const L = {f, skin: pick(POOL.skin), top: pick(POOL.top), bot: pick(POOL.bot), pat: pick(POOL.pat)};
    if (f) {
      L.hs = pick(POOL.hsF); L.hair = old ? pick(POOL.hairOld) : pick(POOL.hairM); L.acc = pick(POOL.top);
      if (R() < .38) { L.saree = pick(POOL.saree); L.top = L.saree; L.bot = L.saree; L.pat = '' }
      else if (R() < .35) L.dupatta = pick(POOL.saree);
      if (R() < .75) L.bindi = '#c1121f'; if (R() < .18) L.glasses = 1;
    } else {
      L.hs = pick(POOL.hsM); L.hair = old ? pick(POOL.hairOld) : pick(POOL.hairM);
      if (R() < .38) L.stache = 1; if (R() < .16) L.beard = L.hair; if (R() < .22) L.glasses = 1;
      if (R() < .18 && L.hs != 'bald') L.cap = pick(POOL.top); if (R() < .1) L.tilak = '#c1121f'; if (old) L.stick = 1;
    }
    if (R() < .25) L.sc = +(.94 + R() * .12).toFixed(2); if (R() < .15) L.big = 1;
    const s = sig(L); if (!USED_LOOKS.has(s)) { USED_LOOKS.add(s); return L }
  }
  return {f: 0, skin: '#a9713a', hair: '#111', hs: 'short', top: '#999', bot: '#333'};
}

// ---------- items (no durability any more) ----------
const KIND_TIP = {pow: 'POWER move: steady damage, 88% to hit.', sharp: 'SHARP move: quick, 92% to hit, often a critical.', heavy: 'HEAVY move: huge damage but only 78% to hit.'};
const ITEMS = {
  bat:   {n:'Cricket Bat',  str:6,wt:5,sharp:2,pow:7,desc:'Your trusty gully-cricket bat.',moves:[{n:'Straight Drive',k:'pow',b:8,fx:'smash',t:'A clean, textbook drive.'},{n:'Hook Shot',k:'sharp',b:6,fx:'slash',t:'A quick flick of the wrists.'},{n:'Heavy Swing',k:'heavy',b:12,fx:'spin',t:'A big six-hitting swing.'}]},
  tawa:  {n:'Iron Tawa',    str:7,wt:8,sharp:1,pow:9,desc:'Raju\'s heavy iron griddle.',moves:[{n:'Tawa Bonk',k:'pow',b:9,fx:'smash',t:'A solid clang on the head.'},{n:'Flip & Fling',k:'sharp',b:7,fx:'spin',t:'Flip the tawa like a dosa.'},{n:'Sizzle Slam',k:'heavy',b:14,fx:'flame',t:'Red-hot slam. Burns!'}]},
  talwar:{n:'Nawabi Talwar',str:8,wt:4,sharp:9,pow:8,desc:'A royal sword from the old city.',moves:[{n:'Royal Slash',k:'sharp',b:9,fx:'slash',t:'Three swift royal cuts.'},{n:'Spark Parry',k:'pow',b:9,fx:'spark',t:'Steel on steel, sparks fly.'},{n:'Charminar Crash',k:'heavy',b:15,fx:'crash',t:'A thunderous overhead blow.'}]},
  belan: {n:'Belan (Rolling Pin)',str:5,wt:4,sharp:1,pow:6,price:60,desc:'Every aunty\'s favourite weapon.',moves:[{n:'Roti Roll',k:'pow',b:7,fx:'spin',t:'Roll right over them.'},{n:'Dough Dash',k:'sharp',b:6,fx:'slash',t:'A quick sneaky whack.'},{n:'Flour Bomb',k:'heavy',b:11,fx:'puff',t:'A cloud of flour blinds them.'}]},
  carrom:{n:'Carrom Striker',str:4,wt:2,sharp:6,pow:6,price:140,desc:'Flick discs like a carrom champion.',moves:[{n:'Striker Shot',k:'sharp',b:8,fx:'disc',t:'A precise flick of discs.'},{n:'Queen Cover',k:'pow',b:9,fx:'spark',t:'Pocket the queen with style.'},{n:'Break Shot',k:'heavy',b:12,fx:'disc',t:'Break the whole stack at once.'}]},
  lathi: {n:'Lathi',        str:8,wt:6,sharp:3,pow:9,desc:'A long bamboo stick. Classic.',moves:[{n:'Lathi Whack',k:'pow',b:10,fx:'smash',t:'A hard whack across the shins.'},{n:'Sweep Strike',k:'sharp',b:8,fx:'spin',t:'Sweep their legs from under them.'},{n:'Thunder Thump',k:'heavy',b:15,fx:'quake',t:'Slam the ground. Shakes everything.'}]},
  gada:  {n:'Nizami Gada',  str:10,wt:9,sharp:2,pow:12,desc:'A royal mace that shakes the ground.',moves:[{n:'Gada Slam',k:'pow',b:11,fx:'crash',t:'A crushing mace blow.'},{n:'Royal Whirl',k:'sharp',b:9,fx:'spin',t:'Spin the mace around you.'},{n:'Nizam Crush',k:'heavy',b:18,fx:'quake',t:'The strongest hit in the game.'}]}
};
Object.assign(ITEMS, {
  hockey:{n:'Hockey Stick',str:7,wt:5,sharp:5,pow:8,price:220,desc:'A curved stick from the college ground.',moves:[{n:'Dribble Crack',k:'sharp',b:7,fx:'slash',t:'A quick crack on the shin.'},{n:'Penalty Smash',k:'pow',b:10,fx:'smash',t:'A penalty-corner smash.'},{n:'Goal Blast',k:'heavy',b:14,fx:'crash',t:'A full-swing goal shot.'}]},
  kada:  {n:'Iron Kada',str:9,wt:7,sharp:3,pow:9,price:300,desc:'A heavy steel bracelet. Punch like a hammer.',moves:[{n:'Kada Rap',k:'sharp',b:8,fx:'punch',t:'A fast knuckle rap.'},{n:'Kada Jab',k:'pow',b:10,fx:'punch',t:'A hard straight jab.'},{n:'Hammer Fist',k:'heavy',b:16,fx:'quake',t:'A skull-rattling fist drop.'}]},
  kukri: {n:'Gurkha Kukri',str:8,wt:4,sharp:10,pow:7,price:380,desc:'A razor-sharp curved blade.',moves:[{n:'Curved Slice',k:'sharp',b:10,fx:'slash',t:'A clean curved cut.'},{n:'Guard Break',k:'pow',b:9,fx:'spark',t:'Knock their guard aside.'},{n:'Kukri Whirl',k:'heavy',b:15,fx:'spin',t:'A whirling blade storm.'}]},
  probat:{n:'Willow Pro Bat',str:9,wt:6,sharp:4,pow:10,price:480,desc:'A tournament-grade willow bat.',moves:[{n:'Cover Drive',k:'pow',b:11,fx:'smash',t:'Elegant and powerful.'},{n:'Pull Shot',k:'sharp',b:9,fx:'slash',t:'A lightning pull shot.'},{n:'Helicopter Six',k:'heavy',b:17,fx:'spin',t:'A helicopter shot out of the stadium.'}]},
  trishul:{n:'Trishul',str:10,wt:8,sharp:8,pow:10,price:650,desc:'A three-pronged spear of the old temples.',moves:[{n:'Triple Stab',k:'sharp',b:11,fx:'slash',t:'Three prongs, three wounds.'},{n:'Lord\'s Push',k:'pow',b:12,fx:'crash',t:'A divine shove.'},{n:'Tandav Strike',k:'heavy',b:19,fx:'quake',t:'A thunderous cosmic strike.'}]},
  taser: {n:'Taser Baton',str:8,wt:5,sharp:9,pow:8,price:700,desc:'Shock stick from a security guard.',moves:[{n:'Shock Jab',k:'sharp',b:11,fx:'bolt',t:'A crackling jab.'},{n:'Stun Press',k:'pow',b:12,fx:'spark',t:'Press and zap.'},{n:'Voltage Surge',k:'heavy',b:19,fx:'bolt',t:'Maximum voltage!'}]},
  keyboard:{n:'Mech Keyboard',str:8,wt:6,sharp:5,pow:11,price:520,desc:'A clicky mechanical keyboard. Heavy and loud.',moves:[{n:'Enter Strike',k:'sharp',b:9,fx:'slash',t:'Hit Enter. Hard.'},{n:'Key Smash',k:'pow',b:12,fx:'smash',t:'Every key at once.'},{n:'Ctrl+Alt+Del',k:'heavy',b:18,fx:'crash',t:'Force quit the enemy.'}]},
  nunchaku:{n:'Ethernet Nunchaku',str:9,wt:6,sharp:8,pow:9,price:820,desc:'Two routers on a LAN cable.',moves:[{n:'Cable Whip',k:'sharp',b:12,fx:'chain',t:'A stinging cable lash.'},{n:'Patch Smash',k:'pow',b:13,fx:'smash',t:'Patch the enemy. Permanently.'},{n:'Bandwidth Burst',k:'heavy',b:21,fx:'spin',t:'A whirling cable storm.'}]}
});
ITEMS.rigbook={n:'RIG Laptop',str:11,wt:8,sharp:9,pow:12,desc:'RIG Ritesh\'s own laptop. Heavy, glowing, dangerous.',moves:[{n:'Hotfix',k:'sharp',b:13,fx:'bolt',t:'A patch that cuts deep.'},{n:'Crash Dump',k:'pow',b:14,fx:'crash',t:'Dump the whole stack on them.'},{n:'Blue Screen',k:'heavy',b:22,fx:'quake',t:'The blue screen of defeat.'}]};
const moveTip = m => m.t + ' ' + KIND_TIP[m.k];
const CHAI = {n:'Healing Chai', price:15, heal:30, desc:'Hot, sweet chai. Heals 30 HP.'};
// ---------- food: eat from the bag (key Q still drinks chai) ----------
const FOODS = {
  biscuit:{n:'Osmania Biscuits',price:8,heal:12,desc:'Crumbly tea biscuits. +12 HP.'}, samosa:{n:'Hot Samosa',price:20,heal:25,desc:'Crispy and spicy. +25 HP.'},
  bunmaska:{n:'Bun Maska',price:25,heal:30,desc:'Soft bun with butter. +30 HP.'}, lassi:{n:'Mango Lassi',price:35,heal:38,desc:'Thick and cold. +38 HP.'},
  puri:{n:'Pani Puri Plate',price:25,heal:28,desc:'Six crunchy puris. +28 HP.'}, bajji:{n:'Mirchi Bajji',price:30,heal:30,desc:'Fried chilli fritters. +30 HP.'},
  vegbiryani:{n:'Veg Biryani',price:60,heal:60,desc:'Fragrant and filling. +60 HP.'}, chickenbiryani:{n:'Chicken Biryani',price:95,heal:95,desc:'The Hyderabadi classic. +95 HP.'},
  muttonbiryani:{n:'Mutton Biryani',price:130,heal:130,desc:'Royal dum biryani. +130 HP.'}, haleem:{n:'Haleem Bowl',price:85,heal:80,desc:'Slow-cooked and rich. +80 HP.'},
  kebab:{n:'Seekh Kebab',price:70,heal:65,desc:'Smoky grilled kebabs. +65 HP.'}, dkmeetha:{n:'Double ka Meetha',price:45,heal:45,desc:'Sweet bread pudding. +45 HP.'},
  qubani:{n:'Qubani ka Meetha',price:55,heal:55,desc:'Apricot dessert. +55 HP.'}, jalebi:{n:'Hot Jalebi',price:30,heal:32,desc:'Syrupy swirls. +32 HP.'},
  laddu:{n:'Motichoor Laddu',price:28,heal:30,desc:'Festival sweet. +30 HP.'}, gulab:{n:'Gulab Jamun',price:35,heal:36,desc:'Soft and sticky. +36 HP.'},
  dal:{n:'Dal Tadka & Roti',price:55,heal:55,desc:'Dhaba special. +55 HP.'}, paneer:{n:'Paneer Butter Masala',price:75,heal:70,desc:'Creamy and rich. +70 HP.'},
  mango:{n:'Fresh Mango',price:30,heal:34,desc:'Juicy Banganapalli. +34 HP.'}, banana:{n:'Bananas',price:12,heal:15,desc:'A quick snack. +15 HP.'},
  coconut:{n:'Coconut Water',price:25,heal:28,desc:'Cool and sweet. +28 HP.'}, sweetlime:{n:'Sweet Lime Juice',price:28,heal:30,desc:'Fresh mosambi. +30 HP.'},
  ors:{n:'ORS Packet',price:30,heal:40,desc:'Medicine shop special. +40 HP.'}, kadha:{n:'Herbal Kadha',price:50,heal:55,desc:'Bitter but it works. +55 HP.'},
  nazar:{n:'Nazar Battu Charm',price:150,heal:0,special:'charm',desc:'Use it: enemies stay away for 3 minutes.'},
  hintcard:{n:'Hint Token',price:40,heal:0,special:'hint',desc:'Use it for a hint about your current mission.'}
};
// ---------- outfits (cosmetic): worn by the player in the world and in fights ----------
const OUTFITS = {
  kurta:{n:'Festive Kurta',price:180,desc:'A saffron kurta with white pants.',top:'#ff9933',bot:'#f4f4f4'}, jersey:{n:'Cricket Jersey',price:150,desc:'Team blue with a red cap.',top:'#2a6fdb',bot:'#1f2a44',cap:'#c1121f'},
  sherwani:{n:'Nawabi Sherwani',price:420,desc:'Maroon sherwani. Royal.',top:'#7a1022',bot:'#f2e6c9',acc:'#ffd36b'}, hoodie:{n:'Street Hoodie',price:130,desc:'Black hoodie, grey joggers.',top:'#2b2b33',bot:'#6b6b78',hood:1},
  tee:{n:'Green Tee & Jeans',price:110,desc:'Simple and fresh.',top:'#2e8b57',bot:'#2c4a7a'}, pathani:{n:'Pathani Suit',price:260,desc:'Cream pathani suit.',top:'#efe6c9',bot:'#efe6c9'},
  techbro:{n:'Techie Hoodie',price:350,desc:'Grey hoodie with a lanyard.',top:'#7a8594',bot:'#1f2a44',hood:1}, blazer:{n:'Corporate Blazer',price:520,desc:'Navy blazer, formal trousers.',top:'#1f2a5a',bot:'#222'}
};
// every shop sells different things. Stock is chosen by shop name (see openShop in core.js)
const STOCKS = {
  'Sharma Kirana':['chai','biscuit','samosa','nazar','belan'], 'Venkat Medicals':['ors','kadha','nazar','hintcard'], 'Irani Cafe':['chai','biscuit','bunmaska','samosa','lassi'],
  'Biryani Point':['vegbiryani','chickenbiryani','haleem','bajji'], 'Mithai House':['dkmeetha','qubani','jalebi','laddu','gulab'], 'Laad Bangles':['nazar','hintcard','coconut'],
  'Pearl Palace':['kurta','pathani','sherwani'], 'Cloth Market':['kurta','jersey','hoodie','tee','sherwani'], 'Nawabi Armoury':['belan','hockey','kada','kukri','probat','trishul'],
  'Auto Garage':['hintcard','kadha'], 'Water Tank Co.':['coconut','hintcard'],
  'Paradise Biryani':['chickenbiryani','muttonbiryani','kebab','haleem','dkmeetha'], 'Jewel Mahal':['qubani','nazar','sherwani'], 'Chappal Bazaar':['hoodie','tee','pathani'],
  'Fruit Market':['mango','banana','coconut','sweetlime'], 'Dhaba Express':['dal','paneer','lassi','chai','puri'], 'Sweet Corner':['jalebi','gulab','laddu','dkmeetha'], 'Sher Arms Depot':['carrom','hockey','kada','kukri','probat','trishul'],
  'Ticket Office':['chai','hintcard'], 'Porter Rest House':['chai','samosa'],
  'Cafe Byte':['chai','lassi','bunmaska','kebab','coconut'], 'Biryani Zone':['vegbiryani','chickenbiryani','muttonbiryani','haleem'], 'Gadget Armoury':['taser','keyboard','nunchaku','trishul','probat'],
  'Suit & Tie Store':['techbro','blazer','jersey','tee'], 'Cyber Pharmacy':['ors','kadha','nazar','hintcard'], 'Fishing Hut':['rod'],
  'Dessert Lab':['qubani','gulab','jalebi','dkmeetha'], 'Gully Store':['puri','bajji','samosa','biscuit','chai']
};
const SHOP = {hyd:['chai','belan'], sec:['chai','belan','carrom']};

// ---------- enemies: humans, never animals ----------
// lv is the base level; real level = lv + tier (see core.js scaling)
const FOES = {
  chillar:{weak:'sharp',res:'heavy',n:'Chillar',lv:1,hp:30,atk:5,xp:12,coin:12,look:'chillar',moves:[{n:'Pickpocket Dash',m:.9,fx:'kick'},{n:'Stone Pelt',m:1,fx:'punch'},{n:'Cap Smack',m:1.1,fx:'punch'}]},
  chapri:{weak:'pow',res:'sharp',n:'Chapri',lv:2,hp:42,atk:6,xp:16,coin:16,look:'chapri',moves:[{n:'Stylish Slap',m:1,fx:'punch'},{n:'Chain Swing',m:1.2,fx:'chain'},{n:'Bike Rev Charge',m:1.3,fx:'kick'}]},
  awara:{weak:'heavy',res:'pow',n:'Awara',lv:2,hp:50,atk:7,xp:20,coin:20,look:'awara',moves:[{n:'Lungi Whirl',m:1,fx:'kick'},{n:'Cycle Chain Whip',m:1.2,fx:'chain'},{n:'Dhakka Push',m:1.1,fx:'punch'}]},
  goonda:{weak:'sharp',res:'pow',n:'Goonda Enforcer',lv:6,hp:96,atk:10,xp:52,coin:70,guard:1,look:'goonda',moves:[{n:'Lathi Swing',m:1.1,fx:'chain'},{n:'Collar Grab',m:1,fx:'punch'},{n:'Brass Knuckles',m:1.4,fx:'punch'}]},
  don1:{weak:'heavy',res:'sharp',n:'Bade Bhai',hp:179,atk:11,xp:170,coin:240,boss:1,look:'don1',reward:'talwar',
           moves:[{n:'Gold Chain Whip',m:.8,hits:2,fx:'chain'},{n:'Suitcase Smash',m:1.2,fx:'punch'},{n:'Goons, Attack!',m:.7,hits:3,fx:'kick'},{n:'Black Car Charge',m:1.9,fx:'crash'}],
           win:['Bade Bhai drops his gold chain and runs shouting for his car!','You pick up the Nawabi Talwar from his collection.','Two roads open: EAST to Secunderabad (follow the road to the right edge of the map), and SOUTH to Hitech City (follow the road to the bottom edge).','You can beat the boss of either city first. The choice is yours!']},
  don2:{weak:'pow',res:'heavy',n:'Tiger Anna',hp:240,atk:13,xp:260,coin:340,boss:1,look:'don2',reward:'gada',
           moves:[{n:'Tiger Roar',m:.8,hits:2,fx:'roar'},{n:'Lungi Lasso',m:1.2,fx:'chain'},{n:'Gold Fist',m:1.5,fx:'punch'},{n:'Bike Chain Frenzy',m:.7,hits:3,fx:'chain'}],
           win:['Tiger Anna tears his tiger scarf in rage and flees!','You take the Nizami Gada. The road east to Ameerpet is open.','(Ameerpet comes in a later version!)']}
};
// how the enemy sprites look (used by drawChar)
const LOOKF = {
  chillar:{f:0,teen:1,skin:'#a9713a',hair:'#111',hs:'messy',top:'#4b5563',bot:'#2a3550',hood:1,cap:'#c1121f',capSide:1,sc:.92},
  chapri: {f:0,skin:'#b9793c',hair:'#111',hs:'gel',top:'#d8f03a',bot:'#222a3a',track:'#111',shades:1,chain:1,sc:1},
  awara:  {f:0,skin:'#8d5524',hair:'#222',hs:'messy',top:'#f1eee4',bot:'#2b6f6f',lungi:'#2b6f6f',vest:1,bandana:'#c1121f',stubble:1,sc:1},
  goonda: {f:0,skin:'#7a4a22',hair:'#111',hs:'bald',top:'#15151b',bot:'#2a2a33',beard:'#111',chain:2,big:1,sc:1.1},
  don1:   {f:0,skin:'#a9713a',hair:'#0b0b0b',hs:'gel',top:'#b3121f',bot:'#101014',suit:'#14141a',shades:1,chain:3,stache:1,big:1,sc:1.16},
  jebkat: {f:0,teen:1,skin:'#b9793c',hair:'#111',hs:'crop',top:'#c8c8d4',bot:'#6b4a2a',cap:'#e8d9a0',pat:'check',sc:.94},
  tapori: {f:0,skin:'#8d5524',hair:'#111',hs:'spiky',top:'#ff7a1a',bot:'#1f4a7a',vest:1,bandana:'#2ecc71',shades:1,chain:1,sc:1},
  dada:   {f:0,skin:'#7a4a22',hair:'#111',hs:'crop',top:'#b8a06a',bot:'#4a4a3a',stache:1,big:1,badge:1,chain:2,sc:1.08},
  godown: {f:0,skin:'#6a3a1a',hair:'#111',hs:'crop',top:'#3a4a2a',bot:'#222',cap:'#d9b300',stache:1,big:1,badge:1,sc:1.12},
  enemp:  {f:0,skin:'#b9793c',hair:'#222',hs:'side',top:'#e8eef5',bot:'#3a3a4a',pat:'stripe',glasses:1,stache:0,sc:1},
  techmad:{f:0,skin:'#a9713a',hair:'#2b1a10',hs:'messy',top:'#19232d',bot:'#2c2c36',hood:1,glasses:1,sc:1},
  scraper:{f:0,skin:'#8d5524',hair:'#111',hs:'spiky',top:'#2a6a4a',bot:'#1a1a22',shades:1,bandana:'#39ff88',big:1,sc:1.06},
  secguard:{f:0,skin:'#7a4a22',hair:'#111',hs:'crop',top:'#2a3040',bot:'#1a1e28',cap:'#2a3040',badge:1,big:1,shades:1,sc:1.14},
  rig:    {f:0,skin:'#c68642',hair:'#0b0b0b',hs:'side',top:'#f5f5f5',bot:'#0b0b10',suit:'#0b0b10',tie:'#0b0b10',glasses:1,laptop:1,big:0,sc:1.1},
  don2:   {f:0,skin:'#8d5524',hair:'#111',hs:'crop',top:'#f5f5ee',bot:'#f5f5ee',lungi:'#f5f5ee',shades:1,chain:3,stache:1,stubble:1,big:1,scarf:'tiger',sc:1.16}
};

Object.assign(FOES, {
  jebkat:{weak:'sharp',res:'heavy',n:'Jeb-Katra',lv:1,hp:34,atk:5,xp:14,coin:14,look:'jebkat',moves:[{n:'Wallet Snatch',m:.9,fx:'kick'},{n:'Blade Flick',m:1.1,fx:'slash'},{n:'Crowd Shove',m:1,fx:'punch'}]},
  tapori:{weak:'pow',res:'sharp',n:'Station Tapori',lv:2,hp:46,atk:6,xp:19,coin:18,look:'tapori',moves:[{n:'Tapori Swagger',m:1,fx:'punch'},{n:'Bottle Swing',m:1.2,fx:'crash'},{n:'Platform Kick',m:1.2,fx:'kick'}]},
  dada:  {weak:'heavy',res:'pow',n:'Railway Dada',lv:3,hp:58,atk:7,xp:24,coin:24,look:'dada',moves:[{n:'Gamcha Whip',m:1.1,fx:'chain'},{n:'Signal Rod Swing',m:1.3,fx:'crash'},{n:'Dada Dhakka',m:1.2,fx:'punch'}]},
  godownguard:{weak:'heavy',res:'sharp',n:'Godown Guard',lv:7,hp:104,atk:11,xp:60,coin:80,guard:1,look:'godown',moves:[{n:'Torch Bonk',m:1.1,fx:'punch'},{n:'Crate Throw',m:1.3,fx:'crash'},{n:'Whistle Rush',m:1.2,fx:'kick'}]},
  enemp: {weak:'pow',res:'sharp',n:'Enemployee',lv:6,hp:70,atk:8,xp:34,coin:34,look:'enemp',moves:[{n:'Overtime Slap',m:1,fx:'punch'},{n:'Stapler Throw',m:1.2,fx:'disc'},{n:'Exit Interview',m:1.3,fx:'kick'}]},
  techmad:{weak:'sharp',res:'heavy',n:'Tech-Mad',lv:7,hp:76,atk:9,xp:38,coin:38,look:'techmad',moves:[{n:'Keyboard Rage',m:1.1,fx:'smash'},{n:'Cable Strangle',m:1.2,fx:'chain'},{n:'Energy Drink Dash',m:1.3,fx:'kick'}]},
  scraper:{weak:'heavy',res:'pow',n:'Scraper',lv:8,hp:88,atk:10,xp:44,coin:44,look:'scraper',moves:[{n:'Data Scrape',m:1,fx:'claw'},{n:'Bot Swarm',m:1.2,fx:'puff'},{n:'Crawler Crash',m:1.4,fx:'crash'}]},
  secguard:{weak:'sharp',res:'pow',n:'Security Bot Guard',lv:12,hp:150,atk:14,xp:84,coin:110,guard:1,look:'secguard',moves:[{n:'Baton Sweep',m:1.1,fx:'chain'},{n:'Taser Touch',m:1.3,fx:'bolt'},{n:'Lockdown Slam',m:1.5,fx:'crash'}]},
  rig:{weak:'heavy',res:'sharp',n:'RIG Ritesh',hp:450,atk:17,xp:600,coin:900,boss:1,look:'rig',reward:'rigbook',
    moves:[{n:'Phishing Strike',m:1,fx:'bolt'},{n:'DDoS Barrage',m:.6,hits:4,fx:'orb'},{n:'Ransomware Lock',m:1.5,fx:'crash'},{n:'Firewall Slam',m:1.3,fx:'quake'},{n:'Zero-Day Exploit',m:2,fx:'bolt'}],
    win:['RIG Ritesh slams his laptop shut. "Cache cleared... I am done."','His corporate empire crashes. The whole city sees blue skies again.','You have beaten the boss of Hitech City!']}
});
const ANIMAL_TALK = {cow:'The cow chews calmly. Moo.',goat:'The goat stares at you. Meh-eh!',dog:'The street dog wags its tail.',cat:'The cat ignores you completely.'};
const ORDER = ['hyd','sec','hit','med','meh','ame','kuk','bor'];

// ---------- quests. state: undefined -> 'active' -> 'found' -> 'done'. type: fetch | kill | riddle ----------
const QUESTS = {
 tiffin:{map:'hyd',type:'fetch',spot:'tiffin',title:"Raju's lost tiffin",giver:'raju',
  ask:['Arre bhai! My steel tiffin fell somewhere near the water, I think so.','Find the sparkle and bring it back. I will reward you!'],
  wait:['Please find my tiffin! It is near the water, I think so. Look for the sparkle.'],found:"You found Raju's steel tiffin! Take it back to him.",
  turnin:['My tiffin! Thank you, bhai!','Take this Iron Tawa, Rs.30 and some chai. Careful: the Chapri gang is stronger than it looks.'],
  after:['Rumour says the gang boss hides in a hideout deep in the forest. Three torn map pieces are scattered around.','Chests and clues hide everywhere. Explore the lanes, the lake and the villages!'],
  reward:{item:'tawa',money:30,xp:25,chai:1},hudAsk:'Talk to Raju (!)',hudWait:'Find the tiffin (near water, I think so)',hudBack:'Return the tiffin to Raju'},
 scouts:{map:'hyd',type:'kill',foe:'chapri',n:3,title:"Sharma's robbed shop",giver:'sharma',
  ask:['Those Chapri boys robbed my shop! Beat 3 of them and I will give you a clue.'],
  wait:['Three Chapris, bhai. They roam the lanes and villages.'],found:'Three Chapris beaten! Return to Sharma.',
  turnin:['Wah! Take Rs.50. And listen: the first number of the hideout lock code is 4.'],after:['Lock code, first number: 4. Do not forget!'],
  reward:{money:50,xp:40,digit:0},hudAsk:'Talk to Sharma at Sharma Kirana (!)',hudWait:'Beat the Chapri boys',hudBack:'Return to Sharma'},
 riddleH:{map:'hyd',type:'riddle',title:"Pandit Ji's riddle",giver:'pandit',
  ask:['Answer my riddle and I will tell you a number of the lock code.'],wait:['Think again, beta.'],
  q:'I have hands but cannot clap. I have a face but cannot smile. What am I?',opts:['A mirror','A clock','A tree','A calendar'],ans:1,
  turnin:['Correct! The second number of the lock code is 1.'],after:['The second number is 1. Om shanti.'],
  reward:{money:30,xp:35,digit:1},hudAsk:'Talk to Pandit Ji near Hanuman Mandir (!)',hudWait:'Answer the riddle',hudBack:'Talk to Pandit Ji'},
 parcel:{map:'sec',type:'fetch',spot:'parcel',inside:{bld:'Clock Tower',floor:0,at:[2,10]},title:"Babu's lost parcel",giver:'babu',
  ask:['Arre bhai! I am the station porter. A parcel fell off my trolley.','A little boy ran off with it into the Clock Tower. Search inside the tower!'],
  wait:['Search inside the Clock Tower. It is somewhere on the floor.'],found:'You found the lost parcel inside the Clock Tower! Take it back to Babu.',
  turnin:['My parcel! You are a hero, bhai!','Take this Lathi and Rs.60. Goons hate it!'],
  after:['Tiger Anna hides in a godown deep in the woods. Collect the three torn timetable pages to find it.'],
  reward:{item:'lathi',money:60,xp:45},hudAsk:'Talk to Babu the porter (!)',hudWait:'Find the parcel inside the Clock Tower',hudBack:'Return to Babu'},
 roosters:{map:'sec',type:'kill',foe:'jebkat',n:4,title:"Gupta's Dhaba",giver:'gupta',
  ask:['Rowdy Jeb-Katras keep robbing my Dhaba customers! Beat 4 of them and I will help you.'],
  wait:['Four Jeb-Katras, bhai.'],found:'Four Jeb-Katras beaten! Return to Gupta.',
  turnin:['Shabash! Rs.70. The first letter of the lock code is S.'],after:['Lock code, first letter: S.'],
  reward:{money:70,xp:60,digit:0},hudAsk:'Talk to Gupta at Dhaba Express (!)',hudWait:'Beat the Jeb-Katras',hudBack:'Return to Gupta'},
 riddleS:{map:'sec',type:'riddle',title:"The clock keeper's riddle",giver:'keeper',
  ask:['Solve my riddle for a number of the lock code.'],wait:['Think again.'],
  q:'Four minarets, one famous name. I stand where Hyderabad began. What am I?',opts:['Golconda Fort','Gateway of India','Charminar','Mecca Masjid'],ans:2,
  turnin:['Correct! The second letter of the lock code is E.'],after:['Second letter: E. Remember it.'],
  reward:{money:40,xp:50,digit:1},hudAsk:'Talk to the clock keeper near the tower (!)',hudWait:'Answer the riddle',hudBack:'Talk to the keeper'}
};

// ---------- Hitech City quests ----------
Object.assign(QUESTS, {
 badge:{map:'hit',type:'fetch',spot:'badge',title:"Anita's lost ID badge",giver:'anita',
  ask:['Oh no, oh no! My employee ID badge fell somewhere outside while I was running to catch a cab.','Without it I cannot enter Cyber Towers. Please look for a glint near the open ground. I will reward you!'],
  wait:['Look for a glint on the open ground. My badge has a blue lanyard.'],found:'You found Anita\'s ID badge! Take it back to her.',
  turnin:['My badge! You saved my day, thank you so much!','Take this Hockey Stick and Rs.150. And listen, the Scrapers are stealing data everywhere...'],after:['Mind the Scrapers and the Enemployees. They are everywhere these days!'],
  reward:{item:'hockey',money:150,xp:90},hudAsk:'Talk to Anita at Cyber Towers (!)',hudWait:'Find the ID badge (a glint on open ground)',hudBack:'Return the badge to Anita'},
 scrapers:{map:'hit',type:'kill',foe:'scraper',n:5,title:"Neha's data thieves",giver:'neha',
  ask:['I am the HR head at Bhooja. Scrapers keep stealing our residents\' data with their little bots!','Beat 5 of them and I will give you something useful.'],wait:['Five Scrapers, please. They roam the streets of Hitech City.'],found:'Five Scrapers beaten! Return to Neha.',
  turnin:['Brilliant! Take Rs.200 and this Taser Baton. It will come in handy against RIG\'s security.'],after:['The Scrapers are scared of you now. Good!'],
  reward:{item:'taser',money:200,xp:120},hudAsk:'Talk to Neha at My Home Bhooja (!)',hudWait:'Beat the Scrapers',hudBack:'Return to Neha'},
 laptop:{map:'hit',type:'fetch',spot:'laptop',inside:{bld:'Sattva Knowledge Park',floor:2,at:[3,10]},title:"Kiran's stolen laptop",giver:'kiran',
  ask:['I am an intern at Sattva Knowledge Park. Someone stole my laptop with the company\'s firewall keys inside!','I saw a thief run into the building and up the lift. Check the different floors. It must be on one of the upper floors.'],
  wait:['Search the upper floors of Sattva Knowledge Park. Use the lift in the corner. It is on the floor somewhere.'],found:'You found Kiran\'s laptop on the third floor! Take it back to him.',
  turnin:['My laptop! The firewall keys are safe. You are a lifesaver!','Take Rs.250. Be careful, RIG\'s men are watching everything.'],after:['The firewall keys are safe now. Thank you!'],
  reward:{money:250,xp:150,chai:2},hudAsk:'Talk to Kiran at Sattva Knowledge Park (!)',hudWait:'Find the laptop in Sattva Knowledge Park (upper floors)',hudBack:'Return the laptop to Kiran'},
 enemps:{map:'hit',type:'kill',foe:'enemp',n:4,title:"Chef Vikram's union riot",giver:'vikram',
  ask:['The Enemployees are rioting outside ITC Kohenur! They hate overtime and they take it out on my guests.','Beat 4 of them and I will serve you a royal feast.'],wait:['Four Enemployees, bhai. They hang around the offices.'],found:'Four Enemployees beaten! Return to Chef Vikram.',
  turnin:['Magnificent! The guests are safe. Here, Rs.220 and a royal meal for the road.'],after:['The kitchen is quiet again. Thanks to you!'],
  reward:{money:220,xp:140,chai:2},hudAsk:'Talk to Chef Vikram at ITC Kohenur (!)',hudWait:'Beat the Enemployees',hudBack:'Return to Chef Vikram'},
 riddleT:{map:'hit',type:'riddle',title:"The Tech Guru's riddle",giver:'murthy',
  ask:['I have written code for forty years. Answer my riddle and I will give you a piece of knowledge.'],wait:['Think like a programmer, beta.'],
  q:'I have keys but no locks. I have space but no room. You can enter but you can never leave. What am I?',opts:['A piano','A keyboard','A house','A map'],ans:1,
  turnin:['Correct! You think like a developer. Take Rs.100 and this Mech Keyboard.'],after:['Keep typing, young one.'],
  reward:{item:'keyboard',money:100,xp:130},hudAsk:'Talk to Tech Guru Murthy near Cafe Byte (!)',hudWait:'Answer the Tech Guru\'s riddle',hudBack:'Talk to the Tech Guru'},
 cards:{map:'hit',type:'cards',n:4,title:"Chief Rao's four keycards",giver:'rao',
  ask:['I am the security chief of Cyber Gateway. RIG\'s men scattered four access keycards across the tower floors: RED, BLUE, GREEN and GOLD.','Each one is on a different floor and each floor looks different. Use the lift in the corner of every floor. Bring me all four!'],
  wait:['Find all four keycards inside Cyber Gateway. They are on different floors. Check every floor.'],found:'All four keycards collected! Take them to Chief Rao.',
  turnin:['All four! RIG will never see this coming. Take Rs.400.','Now find CTO Meera. When every mission in Hitech City is complete, she holds the Master KEY.'],after:['Find CTO Meera when every mission is done.'],
  reward:{money:400,xp:250},hudAsk:'Talk to Chief Rao at Cyber Gateway (!)',hudWait:'Find the 4 keycards inside Cyber Gateway',hudBack:'Return the keycards to Chief Rao'}
});

// ---------- themes ----------
const TH={
 hyd:{g:['#24a889','#1b8c70','#5ad0a6'],rd:['#c9857d','#a8645f','#e6b0a4'],pl:['#6f6a8a','#58547a','#9792b3'],ln:['#b8895a','#9a6e44','#d2a373'],tree:'round',rim:'#17c3ae'},
 sec:{g:['#2f9f8a','#23846f','#62c9ae'],rd:['#8f98b9','#6e789f','#b4bde0'],pl:['#7d6f68','#625650','#a39790'],ln:['#b09068','#8f7250','#cdb089'],tree:'pine',rim:'#17c3ae'},
 hit:{g:['#2a8f92','#1f7478','#5fd0cf'],rd:['#59627a','#444c61','#7b86a4'],pl:['#8d97b0','#717b96','#b7c0d8'],ln:['#7c8499','#646c80','#9ea6bc'],tree:'round',rim:'#17c3ae'}};

// ---------- homes: every house has its own name, colours and (rude) owner ----------
const HOME_NAMES=['Anand Nilayam','Surya Nivas','Shanti Kutir','Gulshan Manzil','Sai Krupa','Lakshmi Nilayam','Rose Villa','Noor Manzil','Sri Ram Nivas','Green Cottage','Basha House','Mary Cottage','Ganga Sadan','Pooja Nilayam','Raj Mahal','Sunrise Villa','Padma Nivas','Heera Manzil','Krishna Kunj','Blue Haven'];
const HOMES = n => Array.from({length:n},(_,i)=>[HOME_NAMES[i%HOME_NAMES.length],3+(i%2),3,['#b5651d','#c1440e','#8e5a3c','#3d85c6','#7f8c8d','#9b2226','#2d6a4f'][i%7],['#f4c2c2','#f2d4a0','#e8e8d8','#d5f0d0','#cfe8f0','#fde2c8','#e3d5f5'][i%7],'','v']);
POOL.say.push('Kya miya, kahan ja rahe ho itni jaldi mein?','Nakko bhai, nakko! Aaj traffic mein mat jao.','Hau, bilkul sahi bola miya!','Are bhaai, etla unav ra saley?','Arre miya, chai pilao pehle, phir baat karte.','Kya bolra tu? Mereko samajh nai aara!','Ey, nuvvu ekkada ki veltunnav ra? Traffic lo chachipotav!','Aye jaan, biryani kha ke jao, mood ban jayega!','Nee brain em chesthundi ra? Pichhi pullaiah la unnav!','Arey, baagunnava? Aa mouth open chesi nilabadaku, ee dust lo!','Hyderabad lo biryani lekunda em life ra babu?','Kaiko miya, kya jhagda ho raha hai?','Are, pakkaki po ra babu, nenu busy!','Haan haan, bol miya, kya chahiye?','Mere bhai, mausam acha hai, mood kharab mat kar.','Ey, nuvvu entra ila chustunnav? Mukham meeda em undi?','Arre baba, ye galli ka shehzada aaya re!','Nee yavva, ee traffic ento ra!','Kya bolti public, sab theek?','Nakko re, itna paisa nakko mereko, chai de bas!','Salle, ee autolu chala speed ga veltunnayi, careful!','Boss, galat jagah aa gaye ho, wapas jao!','Em ra, nuvvu hero anukuntunnava? Ikkada sab heroes ey!','Bhai, aaj ka plan: biryani, chai, aur kuch nahi.','Arey saley, ippudu em time ra? Dhaba band avuthundi!','Ey miya, tension nai lene ka, sab set hai!','Kya re, aise kya dekh raha hai? Photo khinch le!','Nuvvu mari over ga chesthunnav ra, calm down!','Mama, evaru ra nuvvu? Colony lo new face?','Arre, bolo bolo, kaun si gali ka ho tum?','Pakkaki po ra, nenu cricket ball choostunna!','Etla unnav ra annayya? Mukham chusthe sandhyakalam la undi!','Kya haal hai miya? Biryani khaya aaj?','Are bhaai, ee road lo gundlu chala undi, careful ra!','Arey, nuvvu ekkado chusina face la unnav... nee aunty evaru?','Hau miya, sab theek, bas EMI nai bhara!','Aye, khamosh! Meri cricket match chal rahi hai!','Ee Hyderabad lo auto fare adigithe heart attack vastundi ra!','Kya baat hai miya, aaj bade smart lag rahe ho!','Arey, saar, ee wifi password em ra?','Oye hoye, kya style hai miya, hero lagta!');
const RUDE = {
 mix:[['Excuse me?! Kaun ho tum? Get out of my flat right now, yaar!','Security ko bulaun kya? Nikal!'],['Bro, seriously? Bina bell bajaye andar aa gaya? Get out, jaldi!'],['Arre yaar, this is private property! Bahar niklo, abhi!','Warna complaint kar dunga!'],['Who gave you permission to enter, huh? Nikal yahan se, immediately!']],
 tgl:[['Ey bro, em ra idi? Get out of my house, ippude!','Inkosari vaste security ni piluchutaa!'],['Excuse me, evaru nuvvu? Ma flat lo ela vachchav? Bayataki po, right now!'],['Arey, doorbell kuda kottaledu! Bayataki velli po, babu!','Manners ledu ra neeku!'],['Ee flat lo nee pani em ra? Get out, ippude!']],
 en:[['Excuse me?! This is a private residence! Please leave immediately!','I am calling the security right now!'],['What do you think you are doing? Get out of my house this instant!'],['Do you not know how to knock? Out! Now!','Honestly, the nerve of some people.'],['This is my home, not a tourist spot! Leave at once!']],
 hi:[['Kaun hai be tu? Mere ghar mein kyun ghus raha hai? Nikal yahan se!','Sunai nahi diya? NIKAL!'],['Oye! Darwaza khatkhatana nahi aata kya? Bahar nikal, abhi!','Bahar! Ab!'],['Tere baap ka ghar hai kya? Chal bhaag yahan se, warna chappal padegi!'],['Arre pagal hai kya? Bina poochhe ghar mein aa gaya! Nikal!','Jaldi bahar jao!'],['Kaun ho tum? Bewakoof, bahar jao! Police bulaun kya?'],['Yeh koi dharamshala hai kya? Chal nikal yahan se!','Aur mat aana yahan!'],['Abbe gadhe, ghar ke andar kaise aa gaya? Bahar ja!'],['Mujhe disturb mat kar, nikal yahan se! Jaldi!','Bahar!']],
 te:[['Evaru babu ma intloki vastunav? Bayataki velluu!','Inkosari vaste chappal tho kodataanu!'],['Ey! Ela vachchav ra ma intloki? Poo bayataki, lekapothe police ni piluchutaa!'],['Em kavali ra neeku ikkada? Manners leva? Velli po!','Vinapadda? BAYATAKI POO!'],['Arey, door kuda kottakunda lopaliki vastava? Pichodu la unnav! Bayataki po!'],['Ma intlo em pani ra neeku? Velli po babu, ippude!'],['Evadra nuvvu? Ma intlo ela ghusav? Gaadida la tayaru ayyav! Bayataki!','Velli po antunna ga!'],['Ey, entra idi? Ma inti loki raakoodadu, teliyada? Velli po!'],['Naaku chala pani undi, nuvvu bayataki velli po ra baabu!','Bayataki!']]
};

// ---------- signboards: each shop gets its own style and font ----------
const SIGNS={
 wood:  {bg:'#6b4423',fg:'#fff1c9',bd:'#3a2410',ft:"'Rozha One'",sz:10},
 green: {bg:'#1f6f4a',fg:'#ffffff',bd:'#0e3a28',ft:"'Teko'",sz:14},
 hand:  {bg:'#f6ecd0',fg:'#3a2410',bd:'#a9885a',ft:"'Caveat'",sz:14},
 neon:  {bg:'#16122a',fg:'#ff7ad9',bd:'#ff7ad9',ft:"'Pacifico'",sz:9,glow:1},
 hazard:{bg:'#f2c94c',fg:'#1a1a1a',bd:'#1a1a1a',ft:"'Teko'",sz:14,stripe:1},
 stone: {bg:'#b7b1a6',fg:'#2a2622',bd:'#6e685f',ft:"'Rozha One'",sz:10},
 banner:{bg:'#a4161a',fg:'#ffd36b',bd:'#ffd36b',ft:"'Pacifico'",sz:9},
 blue:  {bg:'#1b4f8a',fg:'#ffffff',bd:'#e8e8e8',ft:"'Teko'",sz:14},
 med:   {bg:'#ffffff',fg:'#0d7a4a',bd:'#0d7a4a',ft:"'Teko'",sz:14,cross:1},
 saffron:{bg:'#ff9933',fg:'#5a1a00',bd:'#8a3a00',ft:"'Rozha One'",sz:10},
 moss:  {bg:'#2e4a2a',fg:'#f2e6b0',bd:'#a9c08a',ft:"'Caveat'",sz:14}};
const SIGN_OVR={'Secunderabad Tunnel':'hazard','Hitech Tunnel':'hazard','Cafe Byte':'neon','Biryani Zone':'banner','Gadget Armoury':'hazard','Suit & Tie Store':'blue','Cyber Pharmacy':'med','Dessert Lab':'neon','Gully Store':'wood','Vehicle World':'hazard','Game Arena':'neon','Fun Zone Arcade':'neon','Nawabi Armoury':'banner','Sher Arms Depot':'hazard','Cyber Towers':'blue','Cyber Gateway':'blue','Sattva Knowledge Park':'green','ITC Kohenur':'saffron','My Home Bhooja':'moss','Peddamma Temple':'saffron','Charminar':'hand','Clock Tower':'stone','Secunderabad Jn':'blue','Auto Garage':'hazard','Irani Cafe':'banner','Laad Bangles':'neon','Mithai House':'saffron','Sweet Corner':'neon','Paradise Biryani':'banner','Dhaba Express':'hazard','Pearl Palace':'stone','Biryani Point':'moss','Jewel Mahal':'neon','Cloth Market':'green','Water Tank Co.':'blue','Sharma Kirana':'wood','Chappal Bazaar':'hand','Fruit Market':'moss','Ticket Office':'blue','Porter Rest House':'wood'};
function signStyle(name){
  if(SIGN_OVR[name])return SIGN_OVR[name];if(/Hospital|Medical/.test(name))return 'med';
  if(/Mandir|Temple/.test(name))return 'saffron';if(/Masjid|Vihar|Jain|Gurudwara|Church/.test(name))return 'stone';
  const ks=Object.keys(SIGNS);let h=0;for(const c of name)h=(h*31+c.charCodeAt(0))>>>0;return ks[h%ks.length]}
const FONTS_TO_LOAD=["14px 'Caveat'","14px 'Rozha One'","14px 'Teko'","14px 'Pacifico'"];

// ---------- cities ----------
// building spec: [name,w,h,roof,wall,kind,placement]. kinds: c=Charminar k=clock m=masjid t=mandir x=church g=gurudwara j=jain b=buddhist h=hospital s=station
const CFG={
 hyd:{name:'Hyderabad - Charminar Bazaar',w:96,h:72,seed:20261,th:'hyd',cx:58,cy:36,road1:36,
  lake:{cx:3,cy:36,rx:17,ry:44},island:[11,36],ponds:[[78,14,5,3],[40,60,4,3]],villages:[[30,14],[84,56],[40,60]],
  east:'sec',south:'hit',lair:{corner:'ne',name:"Bade Bhai's Adda"},bossKey:'don1',bossName:'Bade Bhai',code:[4,1,7,3],
  lm:['Charminar',6,5,'#d9c7a3','#f3e2b8','c'],
  bossIntro:['Bade Bhai: Hahaha! So you are the kid who has been cleaning up my boys.','Nobody walks into my adda and walks out. Come on, show me what you have!'],
  blds:[['Sharma Kirana',5,4,'#c1440e','#f2d4a0','','c'],['Masjid-e-Noor',6,4,'#2e8b57','#f5f5f0','m','c'],['Hanuman Mandir',7,5,'#ff9933','#f7e1c3','t','c'],
   ['Venkat Medicals',5,4,'#3d85c6','#f0e6d2','','c'],['Irani Cafe',5,4,'#b5651d','#f4c2c2','','c'],['Laad Bangles',5,4,'#c1440e','#cfe8f0','','c'],
   ['Pearl Palace',5,4,'#8e44ad','#f6e7a0','',''],['Mithai House',5,4,'#c1440e','#ffd1a6','',''],['Biryani Point',5,3,'#c1440e','#d5f0d0','','c'],
   ['Auto Garage',5,3,'#b5651d','#f0d0d0','',''],['Cloth Market',5,3,'#3d85c6','#fff3c4','',''],['Water Tank Co.',4,3,'#7f8c8d','#e0e0e0','',''],['Nawabi Armoury',5,4,'#7a1022','#f0d0b0','','c'],['Fun Zone Arcade',6,4,'#8e44ad','#d8c8f0','','c'],
   ['Gandhi Hospital',8,5,'#e8e8f0','#f2f6ff','h','c'],['NIMS Hospital',8,5,'#e8e8f0','#eef3ff','h','e'],
   ['St. Joseph Church',6,4,'#3d85c6','#f5f5f0','x','c'],['Gurudwara Sahib',6,4,'#f5f5f0','#fff8e0','g','v'],['Jain Mandir',5,4,'#f5f5f0','#f0ece0','j','v'],['Buddha Vihara',6,4,'#e9d9a6','#f5f0e0','b','e'],
   ['Sai Baba Mandir',5,4,'#ff9933','#f7e1c3','t','v'],['Masjid-e-Alam',5,4,'#2e8b57','#f5f5f0','m','v']].concat(HOMES(20)),
  pz:{n:8,names:['North Diya','North-East Diya','East Diya','South-East Diya','South Diya','South-West Diya','West Diya','North-West Diya'],order:[2,3,4,5,6,7,0,1],digit:2,title:'Eight diyas of Charminar',
    hint:['Eight diyas ring the Charminar plaza. Light them the way the sun travels through one day, all the way round the compass.','It rises in the EAST... sets in the WEST... and the night sky turns through the NORTH. If you light a wrong one, all eight go dark and you start again.'],ok:'The eight diyas glow together and a hidden niche opens: the THIRD lock number is 7!'},
  npcs:[{n:'Raju',L:'raju',near:'start',q:'tiffin'},{n:'Sharma',L:'sharma',near:'Sharma Kirana',q:'scouts'},{n:'Pandit Ji',L:'pandit',near:'Hanuman Mandir',q:'riddleH'},
   {n:'Charminar Guide',L:'guide',near:'Charminar',pzhint:1},{n:'Fisherman Yadagiri',L:'fisher',near:'island',shop:1,stock:'Fishing Hut'},{n:'Cat Aunty Lakshmi',L:'catlady',near:'Laad Bangles',side:'cats'},{n:'Old Fisher Ganga',L:'oldfish',near:'Irani Cafe',side:'fish5'},{n:'Sweet Seller Mohan',L:'sweet',near:'Mithai House',side:'sweets'},{n:'Gift Receiver Ravi',L:'ravi',near:'Venkat Medicals',side:'sweets',target:1}],
  chat:['Charminar looks beautiful at night.','Gandhi Hospital and NIMS heal the wounded. Just walk in!','The hideout is somewhere in the forest to the north-east.','Many lanes, many villages. Explore!','The lake has a statue on an island. A pier leads there. You can even swim!'],
  foes:['chapri','chapri','chillar','awara']},
 sec:{name:'Secunderabad - Clock Tower Chowk',w:96,h:72,seed:77123,th:'sec',cx:48,cy:34,road1:34,track:44,
  ponds:[[16,18,5,3],[80,20,4,3]],villages:[[14,34],[84,24],[22,60]],west:'hyd',east:'med',lair:{corner:'se',name:"Tiger Anna's Godown"},bossKey:'don2',bossName:'Tiger Anna',code:['S','E','C'],guardFoe:'godownguard',
  lm:['Clock Tower',3,4,'#d9c7a3','#c2ad84','k'],
  bossIntro:['Tiger Anna: Arey, who is this small fry? Nobody enters my godown!','Come, I will show you what a real roar sounds like!'],
  blds:[['Paradise Biryani',5,4,'#c1440e','#f2d4a0','','c'],['St. Mary Church',6,4,'#3d85c6','#f5f5f0','x','c'],['Jewel Mahal',5,4,'#8e44ad','#f6e7a0','','c'],
   ['Ganesh Mandir',7,5,'#ff9933','#f7e1c3','t','c'],['Chappal Bazaar',5,4,'#b5651d','#f4c2c2','',''],['Fruit Market',5,4,'#2e8b57','#e8f5d0','',''],
   ['Dhaba Express',5,4,'#c1440e','#cfe8f0','','c'],['Sweet Corner',5,4,'#8e44ad','#ffd1a6','',''],['Secunderabad Jn',8,3,'#7f8c8d','#e8e0d0','s','t'],
   ['Ticket Office',4,3,'#3d85c6','#fff3c4','','t'],['Porter Rest House',5,3,'#b5651d','#f0d0d0','','t'],['Cloth Market',5,3,'#c1440e','#d5f0d0','',''],['Hitech Tunnel',5,4,'#3a3a46','#6a6a7a','u',''],['Sher Arms Depot',5,4,'#2d3a1f','#d0d8c0','','c'],['Game Arena',6,4,'#1b4f8a','#c8d8f0','','c'],
   ['Yashoda Hospital',8,5,'#e8e8f0','#f2f6ff','h','c'],['Railway Hospital',8,5,'#e8e8f0','#eef3ff','h','t'],
   ['Jama Masjid',6,4,'#2e8b57','#f5f5f0','m','c'],['Gurudwara Singh Sabha',6,4,'#f5f5f0','#fff8e0','g','v'],['Mahavir Jain Mandir',5,4,'#f5f5f0','#f0ece0','j','v'],['Bauddha Vihar',6,4,'#e9d9a6','#f5f0e0','b','e'],
   ['Hanuman Temple',5,4,'#ff9933','#f7e1c3','t','v']].concat(HOMES(20)),
  pz:{n:3,names:['Signal A','Signal B','Signal C'],order:[2,0,1],digit:2,title:'Railway signals',
    hint:['The express runs only if signals are set in order: C first, then A, then B.','Switch them in that order, nothing else!'],ok:'The signals turn green together and a toolbox pops open: the THIRD letter of the lock code is C!'},
  npcs:[{n:'Babu',L:'babu',near:'start',q:'parcel'},{n:'Gupta',L:'gupta',near:'Dhaba Express',q:'roosters'},{n:'Porter Hari',L:'porter',near:'Ticket Office',side:'dogs'},{n:'Arcade Fan Sonu',L:'sonu',near:'Game Arena',side:'arcade'},{n:'Clock Keeper',L:'keeper',near:'Clock Tower',q:'riddleS'},
   {n:'Station Master',L:'smaster',near:'Secunderabad Jn',pzhint:1}],
  chat:['The Clock Tower keeps time for the whole chowk.','Yashoda Hospital and Railway Hospital heal the wounded. Just walk in!','The godown hides deep in the south-east forest.','The tracks cut the city in two. Cross carefully!','Fields and villages lie beyond the lanes.'],
  foes:['tapori','jebkat','dada','tapori']}
};

CFG.hit={name:'Hitech City - Cyber Gateway',w:96,h:72,seed:41357,th:'hit',cx:48,cy:34,road1:36,
  ponds:[[16,60,5,3],[82,16,4,3],[78,58,4,3]],villages:[[18,20],[80,56],[28,58]],north:'hyd',lair:{corner:'se',name:'RIG Tower'},bossKey:'rig',bossName:'RIG Ritesh',code:['K','E','Y'],keyGate:1,guardFoe:'secguard',
  lm:['Cyber Gateway',7,6,'#2b6a9a','#8ec5e8','z'],
  bossIntro:['RIG Ritesh: Ah. So you are the one who has been disturbing my quarterly targets.','I own the servers, the streets and every Wi-Fi password in this city. Your performance review ends today.'],
  blds:[['Cyber Towers',7,5,'#2b5f8f','#9cd0f0','z','c'],['Sattva Knowledge Park',7,5,'#2f7a6a','#a8e0d0','z','c'],['ITC Kohenur',7,5,'#8a6a1c','#f0dca0','z','c'],['My Home Bhooja',7,5,'#7a4a8a','#e0c8f0','z','v'],
   ['Yashoda Hospital',8,5,'#e8e8f0','#f2f6ff','h','c'],['Vehicle World',6,4,'#a4161a','#f0d0d0','','c'],['Cafe Byte',5,4,'#8e44ad','#f6e7a0','','c'],['Biryani Zone',5,4,'#c1440e','#d5f0d0','','c'],
   ['Gadget Armoury',5,4,'#2d3a1f','#d0d8c0','',''],['Suit & Tie Store',5,4,'#1b4f8a','#e8e8f0','','c'],['Cyber Pharmacy',5,4,'#3d85c6','#f0e6d2','',''],['Dessert Lab',5,4,'#8e44ad','#ffd1a6','',''],
   ['Gully Store',5,3,'#b5651d','#f4c2c2','',''],['Game Arena',6,4,'#1b4f8a','#c8d8f0','','c'],['Secunderabad Tunnel',5,4,'#3a3a46','#6a6a7a','u',''],['Peddamma Temple',5,4,'#ff9933','#f7e1c3','t','v'],['Hitech Masjid',5,4,'#2e8b57','#f5f5f0','m','v']].concat(HOMES(16)),
  pz:{n:5,names:['Gateway Node','Database Node','Cache Node','Router Node','Server Node'],kind:'node',order:[3,0,4,1,2],digit:2,title:'Reboot the five network nodes',
    hint:['Sysadmin Pavan: To bring the network back, reboot the nodes in the order a web request travels.','The ROUTER receives it first, then the GATEWAY checks it, the SERVER processes it, the DATABASE stores it, and the CACHE remembers it. Get it wrong and everything crashes.'],ok:'All five nodes reboot together! The city firewall hums back to life.'},
  npcs:[{n:'CTO Meera',L:'cto',near:'start',keyGiver:1},{n:'Anita',L:'anita',near:'Cyber Towers',q:'badge'},{n:'Neha',L:'neha',near:'My Home Bhooja',q:'scrapers'},{n:'Kiran',L:'kiran',near:'Sattva Knowledge Park',q:'laptop'},
   {n:'Office Aquarium Girl Tina',L:'tina',near:'Cafe Byte',side:'fishhit'},{n:'Chef Vikram',L:'vikram',near:'ITC Kohenur',q:'enemps'},{n:'Tech Guru Murthy',L:'murthy',near:'Cafe Byte',q:'riddleT'},{n:'Chief Rao',L:'rao',near:'Cyber Gateway',cards:1,q:'cards'},{n:'Sysadmin Pavan',L:'pavan',near:'Gadget Armoury',pzhint:1}],
  chat:['Yashoda Hospital heals the wounded. Just walk in!','RIG Ritesh runs the tower in the south-east. Nobody enters without the Master KEY.','Cyber Gateway has many floors. Use the lift in the corner!','Vehicle World sells scooties, bikes, autos, cars... if you can afford them.','Scrapers, Tech-Mads and Enemployees roam the streets now.'],
  foes:['enemp','techmad','scraper','enemp']};
MAPS_HIT_READY=1;

// ---------- interiors ----------
const INT={
 shop:   {fl:['#c9a26b','#bd965f'],wall:'#e8d8b5',nm:'Shopkeeper'},
 eatery: {fl:['#d8c3a0','#cdb68f'],wall:'#f0d9b5',nm:'Cook'},
 temple: {fl:['#e8dcc4','#ddd0b4'],wall:'#ffb870',nm:'Pandit'},
 masjid: {fl:['#d9e8d5','#cfe0cb'],wall:'#f5f5f0',nm:'Imam'},
 church: {fl:['#d8c9b0','#cdbd9f'],wall:'#e6ecf5',nm:'Father'},
 gurudwara:{fl:['#efe6cf','#e5dabd'],wall:'#fff3d6',nm:'Granthi'},
 jain:   {fl:['#f1efe8','#e8e5da'],wall:'#fbfaf5',nm:'Jain Muni'},
 vihara: {fl:['#e8dcc0','#dccfae'],wall:'#f0e2c0',nm:'Bhikkhu'},
 station:{fl:['#b8b4a8','#aeaa9e'],wall:'#d0d8dc',nm:'Clerk'},
 home:   {fl:['#c4a07a','#b8946d'],wall:'#f2e1c4',nm:'Owner'},
 hall:   {fl:['#d9c7a3','#cdbb92'],wall:'#e8d8b5',nm:'Guide'},
 hosp:   {fl:['#e6eef2','#d8e4ea'],wall:'#f4f8fb',nm:'Nurse'}};
function kindOf(n,k){return k=='c'||k=='k'?'hall':k=='m'?'masjid':k=='t'?'temple':k=='x'?'church':k=='g'?'gurudwara':k=='j'?'jain':k=='b'?'vihara':k=='h'?'hosp':k=='s'||/Ticket/.test(n)?'station':/Church/.test(n)?'church':/Cafe|Biryani|Dhaba/.test(n)?'eatery':/Tank|Garage|Rest/.test(n)?'home':k==''&&/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(n)&&HOME_NAMES.includes(n)?'home':'shop'}
const SHOP_LINES=['Welcome, bhai! Everything fresh, everything cheap.','Come, come! Best prices in the whole bazaar.','Arre, look at this quality! Take your time.','Namaste! What can I show you today?','Aao ji aao! Chai pee ke jao.'];
const EAT_LINES=['Garam garam! The food is almost ready, bhai.','Biryani is the only answer to every question.','Sit, sit! Mind the steam, it is hot.'];
const TEMPLE_LINES={temple:['Om namah shivaya. May the evening bring you peace.','Take some prasad, beta, and sit a while.'],masjid:['Peace be upon you. Rest a while, traveller.','The call to prayer echoes over the old city at dusk.'],church:['Welcome. The evening bells are lovely, are they not?','Light a candle if you wish, child.'],
 gurudwara:['Waheguru. Welcome, traveller. The langar is open to everyone.','Eat something before you go. Nobody leaves hungry.'],jain:['Ahimsa paramo dharma. Walk gently here, friend.','Even the smallest creature deserves kindness.'],vihara:['Peace to you. Sit, breathe, and let the noise settle.','Every journey begins with a single calm step.']};
function interiorSize(k){return k=='hosp'?[21,15]:k=='temple'||k=='gurudwara'||k=='jain'||k=='vihara'||k=='masjid'||k=='church'||k=='hall'?[17,13]:k=='station'?[17,11]:k=='home'?[13,10]:[15,11]}
function makeInterior(b,pm,idx){
  const k=kindOf(b[6],b[7]),I=INT[k],[w,h]=interiorSize(k),dx=w>>1,v=(idx||0)+(b[0]*7+b[1]*3);
  const R=mkRng(v*2654435761>>>0),pick=a=>a[Math.floor(R()*a.length)];
  const f=[[0,0,w,2,'wall'],[0,2,1,h-3,'wall'],[w-1,2,1,h-3,'wall'],[0,h-1,dx,1,'wall'],[dx+1,h-1,w-dx-1,1,'wall']],dc=[],wd=[];
  const L=(x,y,ww,hh,kk)=>f.push([x,y,ww,hh,kk]),D=(x,y,ww,hh,kk)=>dc.push([x,y,ww,hh,kk]);
  for(let x=2;x<w-2;x+=4)wd.push([x,'window']);
  let npc={x:dx,y:4,L:null,name:I.nm,say:['...']},extra=[],roleLook=null;
  const C=[[3,4,4,1,'counter'],[w-7,4,4,1,'counter']];
  if(k=='shop'){f.push(...C);L(2,2,w-4,1,'shelf');L(2,7,2,2,'crate');L(w-4,7,2,2,'crate');
    pick([()=>{L(1,9,1,1,'plant');L(w-2,9,1,1,'plant');L(5,7,1,1,'sack');L(w-6,7,1,1,'jar')},()=>{L(5,7,2,1,'books');L(w-7,7,1,1,'cycle');L(1,5,1,1,'jar');L(w-2,5,1,1,'jar')},()=>{L(1,9,1,1,'cooler');L(w-2,9,1,1,'plant');L(5,8,1,1,'sack');L(w-6,8,1,1,'sack')}])();
    wd.push([w-3,'calendar'],[1,'clock']);D(dx-1,6,3,3,'rug');
    roleLook=genLook(R,{f:R()<.3?1:0});npc.name=pick(['Ramu','Gopal','Sridhar','Latif','Hemant','Anwar','Bhaskar','Kamla'])+' '+pick(['Seth','Anna','Bhai','ji']);npc.say=[pick(SHOP_LINES)];npc.shop=1}
  if(k=='eatery'){f.push(...C);L(2,2,w-4,1,'pots');L(2,6,2,2,'table');L(w-4,6,2,2,'table');L(2,8,2,1,'table');L(w-4,9,1,1,'stool');L(5,8,1,1,'stool');L(w-6,8,1,1,'stool');
    L(1,3,1,2,'fridge');wd.push([dx,'menu'],[1,'clock']);D(dx-1,6,3,2,'rug');npc={...npc,L:NPCL.cook,name:pick(['Chef Salim','Ustad Rahim','Cook Venu','Bawarchi Nabi']),say:[pick(EAT_LINES)],shop:1}}
  if(k=='station'){f.push(...C);L(2,7,4,1,'bench');L(w-6,7,4,1,'bench');L(2,9,1,1,'plant');L(w-3,9,1,1,'sack');L(w-3,2,1,2,'almirah');wd.push([dx,'clock'],[3,'board'],[w-5,'board']);npc={...npc,L:NPCL.clerk,name:'Clerk Prasad',say:['No tickets today, bhai. The evening express is always late.','Platform number three? Straight ahead. Or behind. Not sure.']}}
  if(k=='temple'){L(dx-2,2,5,2,'statue');L(3,5,1,1,'pillar');L(w-4,5,1,1,'pillar');L(3,8,1,1,'pillar');L(w-4,8,1,1,'pillar');L(2,2,1,1,'diya');L(w-3,2,1,1,'diya');L(dx,9,1,1,'bell');L(w-4,10,3,1,'prasad');L(1,11,1,1,'plant');
    D(dx-2,5,5,5,'kolam');D(dx-1,10,3,2,'rug');wd.push([5,'garland'],[w-6,'garland'],[dx,'om']);npc={...npc,L:NPCL.pandit,name:'Pandit Shastri',say:TEMPLE_LINES.temple,x:dx+3,y:6}}
  if(k=='masjid'){L(dx-1,2,3,1,'altar');L(3,5,1,1,'pillar');L(w-4,5,1,1,'pillar');L(1,2,1,2,'books');L(w-2,2,1,2,'books');for(let r=0;r<3;r++)D(3,6+r*2,w-6,1,'mat');wd.push([dx,'crescent'],[4,'garland'],[w-5,'garland']);L(w-3,11,1,1,'plant');
    npc={...npc,L:NPCL.imam,name:'Imam Sahab',say:TEMPLE_LINES.masjid,x:dx+2,y:4}}
  if(k=='church'){L(dx-1,2,3,1,'altar');L(dx+2,2,1,1,'lectern');for(let r=0;r<3;r++){L(3,6+r*2,4,1,'bench');L(w-7,6+r*2,4,1,'bench')}D(dx-1,5,3,8,'rug');wd.push([dx,'cross'],[3,'window'],[w-4,'window']);L(1,2,1,1,'diya');L(w-2,2,1,1,'diya');
    npc={...npc,L:NPCL.father,name:'Father Thomas',say:TEMPLE_LINES.church,x:dx+3,y:4}}
  if(k=='gurudwara'){L(dx-2,2,4,2,'altar');L(2,2,1,1,'diya');L(w-3,2,1,1,'diya');L(3,6,1,1,'pillar');L(w-4,6,1,1,'pillar');L(w-5,10,3,1,'prasad');D(dx-3,5,6,6,'rug');wd.push([dx,'khanda'],[4,'garland'],[w-5,'garland']);
    npc={...npc,L:NPCL.granthi,name:'Giani Harbans',say:TEMPLE_LINES.gurudwara,x:dx+3,y:5}}
  if(k=='jain'){L(dx-1,2,3,2,'statue');L(3,5,1,1,'pillar');L(w-4,5,1,1,'pillar');L(3,8,1,1,'pillar');L(w-4,8,1,1,'pillar');L(2,2,1,1,'diya');L(w-3,2,1,1,'diya');D(dx-2,5,5,5,'kolam');wd.push([dx,'jainw'],[5,'garland'],[w-6,'garland']);L(1,11,1,1,'plant');
    npc={...npc,L:NPCL.jainMonk,name:'Muni Shri',say:TEMPLE_LINES.jain,x:dx+3,y:5}}
  if(k=='vihara'){L(dx-1,2,3,2,'statue');L(3,4,1,1,'pillar');L(w-4,4,1,1,'pillar');L(2,2,1,1,'diya');L(w-3,2,1,1,'diya');L(dx,9,1,1,'bell');D(dx-2,5,5,5,'kolam');for(let r=0;r<2;r++){D(2,6+r*3,2,2,'mat');D(w-4,6+r*3,2,2,'mat')}wd.push([dx,'buddhaw'],[5,'garland'],[w-6,'garland']);
    npc={...npc,L:NPCL.bhikkhu,name:'Bhante Ananda',say:TEMPLE_LINES.vihara,x:dx+3,y:5}}
  if(k=='hall'){L(3,3,1,1,'pillar');L(w-4,3,1,1,'pillar');L(3,8,1,1,'pillar');L(w-4,8,1,1,'pillar');L(dx-1,2,3,1,'books');L(1,4,1,2,'almirah');L(w-2,4,1,2,'almirah');D(dx-2,3,5,7,'rug');wd.push([dx,'frame'],[4,'frame'],[w-5,'frame']);
    npc={...npc,L:NPCL.guide,name:'Heritage Guide',say:['This monument has watched over the city for centuries.','Four minarets, and a thousand stories.']}}
  if(k=='home'){
    const lay=v%3;
    if(lay==0){L(1,2,3,2,'cot');L(w-4,3,2,1,'tv');L(w-3,2,1,1,'plant');L(1,6,1,2,'almirah');L(w-4,6,2,1,'sofa');D(3,5,6,3,'rug')}
    if(lay==1){L(1,2,3,2,'cot');L(5,2,2,1,'desk');L(w-3,2,1,2,'fridge');L(w-4,5,3,1,'stove');L(1,6,1,1,'plant');L(w-3,7,1,1,'cooler');D(3,5,5,3,'rug')}
    if(lay==2){L(1,2,2,2,'sofa');L(4,2,2,1,'tv');L(w-3,2,1,2,'almirah');L(w-4,5,2,1,'table');L(1,7,1,1,'cycle');L(w-3,7,1,1,'plant');D(3,4,6,4,'rug')}
    wd.push([w-4,'frame'],[1,'calendar']);
    const lang=pm=='hit'?['mix','tgl','en'][v%3]:v%2?'te':'hi',lines=pick(RUDE[lang]);roleLook=genLook(R,{});
    npc={...npc,name:pick(lang=='te'?POOL.nameM.concat(POOL.nameF):POOL.nameM.concat(POOL.nameF)),say:lines,rude:1,x:dx-1,y:5}}
  if(k=='hosp'){
    for(const[hx,hy]of[[2,2],[7,2],[w-6,2],[w-10,2]])L(hx,hy,3,2,'bedh');for(const[hx,hy]of[[2,9],[7,9],[w-6,9],[w-10,9]])L(hx,hy,3,2,'bedh');
    L(dx-3,5,6,1,'reception');L(1,6,1,1,'xray');L(w-3,6,2,1,'xray');L(1,12,2,1,'medcab');L(w-4,12,3,1,'medcab');L(dx-1,12,1,1,'trolley');L(dx+1,12,1,1,'plant');
    D(dx-2,7,5,3,'rug');wd.push([dx,'redcross'],[4,'board'],[w-5,'board'],[dx-6,'clock'],[dx+6,'clock']);
    npc={...npc,x:dx,y:6,L:NPCL.nurse,name:'Nurse Mary',say:['You are healed, bhai. Come back whenever you are hurt!','Rest well. A good fighter knows when to retreat.'],nurse:1};
    extra.push({x:4,y:7,L:NPCL.doctor,name:'Dr. Rao',say:['Drink water and avoid fighting goons. Doctor\'s orders!']},{x:w-5,y:7,L:NPCL.doctorF,name:'Dr. Sunitha',say:['Your pulse is fine. Your taste in weapons is questionable.']})}
  const nl=npc.L||roleLook||NPCL.shopW;
  const shopOwners=[{...npc,L:nl}].concat(extra);
  return{name:b[6]+' (inside)',w,h,start:[dx,h-2],indoor:1,shopOf:pm,kind:k,fl:I.fl,wall:I.wall,roads:[],plaza:[],blds:[],stalls:[],kiosks:[],lamps:[],animals:[],foes:[],furn:f,deco:dc,wd,props:[],palms:[],pz:[],autos:[],
    exits:[{x:dx,y:h-1,to:'RET'}],npcs:shopOwners.map(n=>({x:n.x,y:n.y,L:n.L,name:n.name,say:n.say,game:/Arcade|Arena/.test(b[6])&&n.shop?1:0,shop:/Arcade|Arena/.test(b[6])?0:n.shop?1:0,nurse:n.nurse?1:0,rude:n.rude?1:0}))};
}
