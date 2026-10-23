/* GYM APP clickable prototype · Fusion Tech · SAMPLE DATA ONLY, no real payments */
const $app=document.getElementById('app');
const AM={ // key labels EN -> Amharic (draft; needs native review)
 'Home':'ቤት','Workout':'ልምምድ','Progress':'እድገት','Gym & Me':'ጂም እና እኔ','Dashboard':'ዳሽቦርድ','Members':'አባላት','Check-in':'መግቢያ','Equipment':'መሳሪያዎች','More':'ተጨማሪ','Plans':'ዕቅዶች','Classes':'ክላሶች','Profile':'መገለጫ',
 'Member':'አባል','Owner':'ባለቤት','Trainer':'አሰልጣኝ',
 'What do you want':'ምን ማሳካት','to':'','achieve?':'ይፈልጋሉ?','Fat loss':'ስብ መቀነስ','Muscle gain':'ጡንቻ መገንባት','Strength':'ጥንካሬ','Endurance':'ጽናት',
 'Experience level':'የልምድ ደረጃ','Beginner':'ጀማሪ','Intermediate':'መካከለኛ','Advanced':'ከፍተኛ','Days per week':'በሳምንት ቀናት','Any injuries?':'ጉዳት አለብዎት?','None':'የለም','Lower back':'የታችኛው ጀርባ','Knee':'ጉልበት','Shoulder':'ትከሻ','Continue':'ቀጥል',
 'Find your gym':'ጂምዎን ያግኙ','Join Thrive & build my plan':'Thriveን ይቀላቀሉ · ዕቅድ ይገንቡ','Equipment you\'ll inherit':'የሚወርሷቸው መሳሪያዎች',"My gym isn't listed":'ጂሜ አልተዘረዘረም',
 'Scan equipment':'መሳሪያዎችን ይቃኙ','Photo':'ፎቶ','Video':'ቪዲዮ','Checklist':'ዝርዝር','Detected':'የተገኙ','Confirm all':'ሁሉንም አረጋግጥ','Save to Thrive':'ወደ Thrive አስቀምጥ',
 "Today's workout":'የዛሬ ልምምድ','Start workout':'ልምምድ ጀምር','Built from Thrive\'s equipment':'ከThrive መሳሪያዎች የተገነባ','Swapped':'ተቀይሯል','Your swap':'የእርስዎ ለውጥ',
 'Rest timer':'የእረፍት ሰዓት','Log set':'ዙር መዝግብ','Next exercise':'ቀጣይ ልምምድ','Finish workout':'ልምምድ ጨርስ','Machine busy?':'ማሽኑ ተይዟል?','Report broken':'ብልሽት ሪፖርት','Set':'ዙር','Last time':'ባለፈው',
 'Personal records':'የግል ሪከርዶች','Workouts':'ልምምዶች','Volume':'መጠን','Streak':'ተከታታይ',
 'Membership':'አባልነት','Expires':'የሚያበቃው','days left':'ቀናት ቀርተዋል','Freeze':'አግድ','Renew plan':'ዕቅድ አድስ','Pay with':'በዚህ ይክፈሉ','Renew with':'አድስ በ','Total':'ጠቅላላ',
 'PIN prompt sent':'የፒን ጥያቄ ተልኳል','Payment successful':'ክፍያ ተሳክቷል','Done':'ተጠናቋል',
 'Classes this week':'የዚህ ሳምንት ክላሶች','Announcements':'ማስታወቂያዎች','Active':'ንቁ',
 'Active members':'ንቁ አባላት','Revenue · Oct':'ገቢ · ጥቅምት','Expiring · 7 days':'በ7 ቀን የሚያልቁ','Expiring this week':'በዚህ ሳምንት የሚያልቁ','Broken machine reports':'የተበላሹ ማሽኖች ሪፖርት','Remind':'አስታውስ','Remind all':'ሁሉንም አስታውስ','Mark fixed':'ተጠግኗል','Review':'ገምግም',
 'In service':'በአገልግሎት ላይ','Out of service':'ከአገልግሎት ውጭ','All':'ሁሉም','Out':'ውጭ',
 'Adherence · this week':'የዚህ ሳምንት ተገዢነት','Assessment':'ግምገማ','Assign plan':'ዕቅድ ስጥ','View log':'መዝገብ እይ','Needs attention':'ትኩረት የሚሹ','New':'አዲስ'
};
const t=k=>S.lang==='am'&&AM[k]!==undefined?AM[k]:k;
const fmt=n=>n.toLocaleString('en-US');

/* ---------- state ---------- */
const EQ={ // Thrive inventory (sample)
 pecdeck:{n:'Pec deck',q:'×1',cat:'Machines',on:false,note:'3 member reports'},
 treadmill:{n:'Treadmill #4',q:'1 of 6',cat:'Cardio',on:false,note:'Under repair · technician Wed',repair:true},
 squat:{n:'Squat rack',q:'×2',cat:'Strength · Olympic bar incl.',on:true},
 db:{n:'Dumbbells',q:'2–40 kg',cat:'Free weights · 20 pairs',on:true},
 bench:{n:'Flat bench',q:'×3',cat:'Benches · adjustable',on:true},
 cable:{n:'Cable crossover',q:'×1',cat:'Machines · used 212× this week',on:true},
 smith:{n:'Smith machine',q:'×1',cat:'Machines',on:true},
 legpress:{n:'Leg press',q:'×1',cat:'Machines · used 168× this week',on:true},
};
const EX={
 bench:{n:'Barbell bench press',am:'የደረት ፕሬስ',eq:['bench'],sets:4,reps:'8–10',kg:62.5,r:9,last:['60 × 10','60 × 9','60 × 8','57.5 × 8'],cues:['Shoulder blades back','Feet planted','Bar to mid-chest']},
 smithbench:{n:'Smith machine bench press',am:'የስሚዝ ፕሬስ',eq:['smith','bench'],sets:4,reps:'8–10',kg:50,r:9},
 incline:{n:'Incline dumbbell press',am:'የተዘረጋ ፕሬስ',eq:['db','bench'],sets:3,reps:'10–12',kg:22,r:11},
 smithincline:{n:'Smith incline press',am:'የስሚዝ ተዘረጋ ፕሬስ',eq:['smith','bench'],sets:3,reps:'10–12',kg:40,r:10},
 pecdeck:{n:'Pec deck fly',am:'ፔክ ዴክ',eq:['pecdeck'],sets:3,reps:'12',kg:40,r:12},
 cablefly:{n:'Cable fly',am:'የኬብል ፍላይ',eq:['cable'],sets:3,reps:'12',kg:15,r:12},
 dbfly:{n:'Dumbbell fly',am:'የዳምቤል ፍላይ',eq:['db','bench'],sets:3,reps:'12',kg:12,r:12},
 shoulder:{n:'Seated shoulder press',am:'የትከሻ ፕሬስ',eq:['db','bench'],sets:3,reps:'8–10',kg:18,r:9},
 smithshoulder:{n:'Smith shoulder press',am:'የስሚዝ ትከሻ ፕሬስ',eq:['smith'],sets:3,reps:'8–10',kg:30,r:9},
 pushdown:{n:'Triceps pushdown',am:'ትራይሴፕስ',eq:['cable'],sets:3,reps:'12',kg:25,r:12},
 dips:{n:'Bench dips',am:'ቤንች ዲፕስ',eq:['bench'],sets:3,reps:'12',kg:0,r:12},
 lateral:{n:'Lateral raise',am:'የጎን ማንሳት',eq:['db'],sets:3,reps:'15',kg:8,r:15},
 cablelateral:{n:'Cable lateral raise',am:'የኬብል ጎን ማንሳት',eq:['cable'],sets:3,reps:'15',kg:5,r:15},
};
const SLOTS=[['bench','smithbench'],['incline','smithincline'],['pecdeck','cablefly','dbfly'],['shoulder','smithshoulder'],['pushdown','dips'],['lateral','cablelateral']];
const S={lang:'en',role:'member',scr:'onb',
 goal:'Muscle gain',level:'Intermediate',days:4,inj:new Set(['Lower back']),
 gymQ:'Thrive',gymSel:'thrive',joined:false,
 scanTab:'video',det:{squat:true,db:true,bench:true},cable:null,rec:18,
 pick:[0,0,0,0,0,0],userSwap:[0,0,0,0,0,0],
 wo:null, // active workout
 workouts:26,volume:41.2,benchPR:{kg:62.5,r:8},
 plan:'1',method:'telebirr',pay:null,expiry:new Date(2026,9,24),receipts:[],
 qrSeed:7,qrLeft:30,scanned:false,bells:{0:true},
 reminded:{},reports:{pecdeck:3},eqFilter:'all',eqQ:'',
 tr:{assessed:false,assigned:false},toast:null,sheet:null};
const TODAY=new Date(2026,9,19);

/* plan logic: pick first option whose equipment is all in service */
const avail=k=>EX[k].eq.every(e=>EQ[e].on);
function slotEx(i){const o=SLOTS[i];const pref=o[S.userSwap[i]%o.length];
 if(avail(pref))return{k:pref,swapped:S.userSwap[i]%o.length?'user':null};
 const alt=o.find(avail);return{k:alt||null,swapped:alt?'auto':null,from:pref}}
const planList=()=>SLOTS.map((_,i)=>({i,...slotEx(i)})).filter(x=>x.k);
const outItems=()=>Object.entries(EQ).filter(([k,v])=>!v.on);

/* ---------- helpers ---------- */
const nav=(k,on)=>{const sets={member:[['home','Home','plan'],['dumbbell','Workout','work'],['fab','','checkin'],['chart','Progress','prog'],['user','Gym & Me','memb']],
 owner:[['grid','Dashboard','dash'],['users','Members','-'],['scan','Check-in','-'],['wrench','Equipment','equip'],['more','More','-']],
 trainer:[['users','Members','trainer'],['clipboard','Plans','-'],['calendar','Classes','-'],['scan','Check-in','-'],['user','Profile','-']]}[k];
 return '<nav class="nav">'+sets.map(([i,l,g])=>i==='fab'?`<a data-a="go" data-v="checkin"><span class="fab"><i data-i="qr"></i></span></a>`:`<a class="${g===on?'on':''}" data-a="go" data-v="${g}"><i data-i="${i}"></i>${t(l)}</a>`).join('')+'</nav>'};
const lang=()=>`<div class="lang" data-a="lang"><span class="${S.lang==='en'?'on':''}">EN</span><span class="am ${S.lang==='am'?'on':''}">አማ</span></div>`;
const back=v=>`<div class="iconbtn" data-a="go" data-v="${v}"><i data-i="back"></i></div>`;
function toast(m){S.toast=m;render();clearTimeout(toast.t);toast.t=setTimeout(()=>{S.toast=null;render()},2600)}
const daysLeft=()=>Math.round((S.expiry-TODAY)/864e5);
const dstr=d=>d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});

/* ---------- screens ---------- */
const V={};
V.onb=()=>{const G=[['Fat loss','flame','orange'],['Muscle gain','dumbbell','volt'],['Strength','trophy','violet'],['Endurance','run','cyan']];
return `<div class="scr s01"><div class="scroll nonav"><div class="content">
 <div class="row between" style="margin-top:6px"><div class="iconbtn dis"><i data-i="back"></i></div>${lang()}</div>
 <div class="row between" style="margin-top:18px"><span class="label">Step 1 of 3 · Your goal</span><span class="label volt">33%</span></div>
 <div class="steps" style="margin-top:8px"><i class="on"></i><i></i><i></i></div>
 <div class="h1" style="margin-top:20px">${t('What do you want')}<br>${t('to')} <span class="volt">${t('achieve?')}</span></div>
 <div class="am muted" style="margin-top:6px;font-size:13px">ግብዎን ይምረጡ — your plan is built around it</div>
 <div class="goals">${G.map(([g,ic,c])=>`<div class="goal ${S.goal===g?'on':''}" data-a="goal" data-v="${g}">${S.goal===g?'<div class="tick"><i data-i="check" data-w="3"></i></div>':''}<div class="ico ${c}"><i data-i="${ic}"></i></div><div class="t">${t(g)}</div><div class="a">${S.lang==='am'?g:AM[g]}</div></div>`).join('')}</div>
 <div class="sec-h" style="margin-top:20px"><span class="h3">${t('Experience level')}</span></div>
 <div class="seg" style="margin-top:0">${['Beginner','Intermediate','Advanced'].map(l=>`<span class="${S.level===l?'on':''}" data-a="level" data-v="${l}">${t(l)}</span>`).join('')}</div>
 <div class="sec-h"><span class="h3">${t('Days per week')}</span><span class="xs muted">Session · <b class="volt">45 min</b></span></div>
 <div class="days" style="margin-top:0">${[2,3,4,5,6].map(d=>`<span class="${S.days===d?'on':''}" data-a="days" data-v="${d}">${d}</span>`).join('')}</div>
 <div class="sec-h"><span class="h3">${t('Any injuries?')}</span><span class="xs muted">We'll avoid risky moves</span></div>
 <div class="row gap6" style="flex-wrap:wrap">${['None','Lower back','Knee','Shoulder'].map(x=>`<span class="chip ${S.inj.has(x)?'orange':''}" data-a="inj" data-v="${x}">${t(x)}</span>`).join('')}</div>
 <div class="btn primary" style="margin-top:22px" data-a="go" data-v="gym">${t('Continue')} <i data-i="chev" data-w="2.5"></i></div>
</div></div></div>`};

V.gym=()=>{const q=S.gymQ.toLowerCase();const showT='thrive health fitness ayat'.includes(q)||!q, showB='bole iron gym'.includes(q)||!q;
return `<div class="scr s02"><div class="scroll nonav"><div class="content">
 <div class="row between" style="margin-top:6px">${back('onb')}${lang()}</div>
 <div class="h1" style="margin-top:16px;font-size:26px">${t('Find your gym')}</div>
 <div class="am muted small" style="margin-top:4px">ጂምዎን ይቀላቀሉ · members inherit its equipment</div>
 <div class="search"><i data-i="search"></i><input class="sinput" id="gq" value="${S.gymQ}" placeholder="Search gyms…" data-in="gymQ"><i data-i="pin"></i></div>
 <div class="map"><svg class="roads" viewBox="0 0 350 118" fill="none"><path d="M-10 80 C80 60 140 100 360 40" stroke="#232A34" stroke-width="10"/><path d="M120 -10 L170 130" stroke="#232A34" stroke-width="7"/><path d="M-10 25 L360 95" stroke="#1C222B" stroke-width="5"/></svg>
  <div class="pin" style="left:150px;top:30px;background:var(--volt);color:var(--volt-ink)"><i data-i="dumbbell" data-w="2.5"></i></div>
  <span class="chip" style="position:absolute;left:10px;bottom:10px;background:rgba(10,12,15,.8)"><i data-i="pin"></i>Ayat, Addis Ababa</span></div>
 ${showT?`<div class="card gym ${S.gymSel==='thrive'?'sel':''}" data-a="gymsel" data-v="thrive">
  <div class="row gap12"><div class="logo" style="background:var(--volt);color:var(--volt-ink)">T</div>
   <div class="grow"><div class="row gap6"><span class="h3">Thrive Health &amp; Fitness</span><span class="chip green" style="padding:2px 7px"><i data-i="check" data-w="3"></i>Verified</span></div>
   <div class="xs muted" style="margin-top:3px">Near Ayat Noah Real Estate · 1.2 km</div></div></div>
  ${S.gymSel==='thrive'?`<div class="row between" style="margin-top:14px"><span class="label">${t("Equipment you'll inherit")}</span><span class="xs volt sb">46 items</span></div>
  <div class="eq">${['Squat rack ×2','Smith machine','Leg press','Cable crossover','Dumbbells 2–40 kg','Pec deck','Treadmill ×6'].map(x=>`<span class="chip">${x}</span>`).join('')}<span class="chip volt">+39 more</span></div>
  <div class="row gap8" style="margin-top:12px"><span class="chip cyan"><i data-i="calendar"></i>8 classes / week</span></div>`:''}</div>`:''}
 ${showB?`<div class="card tight ${S.gymSel==='bole'?'gym sel':''}" style="margin-top:10px" data-a="gymsel" data-v="bole"><div class="row gap12"><div class="logo" style="background:var(--card2);color:var(--muted);width:42px;height:42px;font-size:15px">B</div>
  <div class="grow"><div class="h3" style="font-size:14px">Bole Iron Gym</div><div class="xs muted">Bole · 3.8 km · 21 items · not in prototype</div></div><i data-i="chev" style="color:var(--dim)"></i></div></div>`:''}
 ${!showT&&!showB?'<div class="small muted" style="margin-top:14px">No gyms match — add yours below.</div>':''}
 <div class="row gap10" style="margin-top:12px;padding:12px 14px;border:1.5px dashed var(--line);border-radius:16px" data-a="go" data-v="scan">
  <div class="ico orange" style="width:36px;height:36px"><i data-i="camera"></i></div>
  <div class="grow"><div class="sb small">${t("My gym isn't listed")}</div><div class="xs muted">Add it &amp; scan the equipment in 1 min</div></div><i data-i="plus" style="color:var(--orange)"></i></div>
 <div class="btn primary ${S.gymSel==='thrive'?'':'dis'}" style="margin-top:14px" data-a="join">${t('Join Thrive & build my plan')}</div>
</div></div></div>`};

V.scan=()=>{const D=[['squat','Squat rack','Qty <b style="color:var(--text)">2</b> · Olympic bar incl.','97%'],['db','Dumbbells','Range <b style="color:var(--text)">2 – 40 kg</b> · step 2 kg','91%'],['bench','Flat bench','Qty <b style="color:var(--text)">3</b> · adjustable','94%']];
const n=Object.values(S.det).filter(Boolean).length+(S.cable?1:0);
const body=S.scanTab==='checklist'?`<div class="sec-h" style="margin-top:14px"><span class="h3">Pick from the catalog</span><span class="xs muted">${n} selected</span></div>`+
 [['squat','Squat rack'],['db','Dumbbells'],['bench','Flat bench'],['cable','Cable crossover'],['smith','Smith machine'],['legpress','Leg press']].map(([k,nm])=>{const on=k==='cable'?S.cable:S.det[k];return `<div class="eqchk" data-a="det" data-v="${k}"><div class="cb ${on?'on':''}">${on?'<i data-i="check" data-w="3"></i>':''}</div><span class="sb small grow">${nm}</span></div>`}).join('')
:`<div class="vf">
  <svg class="scene" viewBox="0 0 350 250" fill="none" stroke="#3A4452" stroke-width="3" stroke-linecap="round"><path d="M0 200 H350" stroke="#232A33" stroke-width="2"/><path d="M30 40 V200 M95 40 V200 M30 45 H95 M22 95 H103"/><path d="M140 170 H230 M150 170 V200 M220 170 V200 M140 165 H230" stroke-width="5"/><path d="M255 120 H340 M255 160 H340 M260 120 V200 M335 120 V200"/><path d="M150 30 V140 M225 30 V140 M150 32 H225 M187 32 V110" stroke="#2F3743"/><circle cx="187" cy="115" r="6" stroke="#2F3743"/></svg>
  <div class="bb" style="left:10px;top:34px;width:106px;height:170px"><b>Squat rack · 97%</b></div>
  <div class="bb" style="left:134px;top:156px;width:104px;height:50px"><b>Flat bench · 94%</b></div>
  <div class="bb" style="left:250px;top:96px;width:94px;height:108px"><b>Dumbbells · 91%</b></div>
  <div class="bb ${S.cable?'':'q'}" style="left:142px;top:22px;width:92px;height:104px"><b>${S.cable?'Cable crossover':'Cable? · 62%'}</b></div>
  ${S.scanTab==='video'?`<span class="chip red rec" style="background:rgba(10,12,15,.75)"><span style="width:8px;height:8px;border-radius:50%;background:var(--red)"></span>REC 0:${String(S.rec).padStart(2,'0')}</span>`:`<span class="chip rec" style="background:rgba(10,12,15,.75)"><i data-i="camera"></i>Photo · 4 items</span>`}
  <span class="chip" style="position:absolute;left:12px;bottom:12px;background:rgba(10,12,15,.75)"><i data-i="scan"></i>${S.scanTab==='video'?'Walk slowly around the room':'Hold steady · tap to capture'}</span></div>
 <div class="sec-h" style="margin-top:14px"><span class="h3">${t('Detected')} · ${n}</span><span class="a" data-a="detall">${t('Confirm all')}</span></div>
 ${D.map(([k,nm,sub,c])=>`<div class="det" data-a="det" data-v="${k}"><div class="mini" style="background:rgba(200,255,61,.13);color:var(--volt)"><i data-i="dumbbell"></i></div><div class="grow"><div class="sb small">${nm}</div><div class="xs muted">${sub}</div></div><span class="conf">${c}</span><div class="cb ${S.det[k]?'on':''}">${S.det[k]?'<i data-i="check" data-w="3"></i>':''}</div></div>`).join('')}
 ${S.cable===null?`<div class="det" style="background:rgba(255,185,56,.07);border:1px solid rgba(255,185,56,.35);border-radius:14px;padding:10px;margin-top:8px">
  <div class="mini" style="background:rgba(255,185,56,.15);color:var(--amber)"><i data-i="info"></i></div>
  <div class="grow"><div class="sb small">Is this a <span class="amber">Cable crossover</span>?</div><div class="xs muted">Low confidence · 62%</div></div>
  <div class="row gap6"><span class="chip" style="padding:6px 9px" data-a="cable" data-v="0"><i data-i="x" data-w="2.5"></i></span><span class="chip solid" style="padding:6px 10px" data-a="cable" data-v="1"><i data-i="check" data-w="3"></i>Yes</span></div></div>`
 :`<div class="det" data-a="det" data-v="cable"><div class="mini" style="background:rgba(200,255,61,.13);color:var(--volt)"><i data-i="dumbbell"></i></div><div class="grow"><div class="sb small">Cable crossover</div><div class="xs muted">${S.cable?'Confirmed by you':'Rejected'}</div></div><span class="conf">62%</span><div class="cb ${S.cable?'on':''}">${S.cable?'<i data-i="check" data-w="3"></i>':''}</div></div>`}`;
return `<div class="scr s03"><div class="scroll nonav"><div class="content">
 <div class="row between" style="margin-top:6px">${back('gym')}
  <div style="text-align:center"><div class="h3">${t('Scan equipment')}</div><div class="xs muted am">Thrive Health &amp; Fitness</div></div>${lang()}</div>
 <div class="tabs">${[['photo','camera','Photo'],['video','video','Video'],['checklist','list','Checklist']].map(([k,i,l])=>`<span class="${S.scanTab===k?'on':''}" data-a="tab" data-v="${k}"><i data-i="${i}"></i>${t(l)}</span>`).join('')}</div>
 ${body}
 <div class="btn primary" style="margin-top:14px" data-a="savescan">${t('Save to Thrive')} · ${n} items</div>
 <div class="xs dim" style="text-align:center;margin-top:8px">Shared with all Thrive members · owner verifies</div>
</div></div></div>`};

V.plan=()=>{const L=planList();const outs=outItems().filter(([k])=>SLOTS.some(o=>o.some(x=>EX[x].eq.includes(k))));
const autos=L.filter(x=>x.swapped==='auto');
return `<div class="scr s04"><div class="scroll pad-fab"><div class="content">
 <div class="row between" style="margin-top:4px">
  <div class="row gap10"><div class="avatar" style="background:linear-gradient(135deg,var(--orange),#FFB938)">HT</div>
   <div><div class="xs muted">Selam, Hana 👋 <span class="am">እንደምን አደሩ</span></div><div class="h3">${t("Today's workout")}</div></div></div>
  ${lang()}</div>
 <div class="week"><div class="done">Thu<b>✓</b></div><div class="done">Fri<b>✓</b></div><div class="done">Sat<b>✓</b></div><div>Sun<b class="dim">–</b></div><div class="on">Mon<b>19</b></div><div>Tue<b>20</b></div><div>Wed<b>21</b></div></div>
 <div class="hero"><div class="bigic"><i data-i="dumbbell" data-w="1.6"></i></div>
  <div class="row gap6"><span class="chip" style="background:rgba(10,12,15,.12);border:none;color:var(--volt-ink)">Week 2 · Day 3</span><span class="chip" style="background:rgba(10,12,15,.85);border:none;color:var(--volt)">${t(S.goal)}</span></div>
  <div style="font:800 26px/1.05 var(--f-head);letter-spacing:-.5px;margin-top:12px">Upper Body · Push</div>
  <div class="small" style="opacity:.75;margin-top:4px;font-weight:600">Chest · Shoulders · Triceps</div>
  <div class="stat3"><div><b>48</b><span>min</span></div><div><b>${L.length}</b><span>exercises</span></div><div><b>${L.reduce((a,x)=>a+EX[x.k].sets,0)}</b><span>sets</span></div><div><b>${S.days}×</b><span>/ week</span></div></div></div>
 ${outs.length?autos.map(x=>`<div class="row gap8" style="margin-top:10px;padding:10px 12px;border-radius:14px;background:rgba(255,106,43,.08);border:1px solid rgba(255,106,43,.3)">
  <i data-i="wrench" style="width:17px;height:17px;color:var(--orange);flex:none"></i>
  <div class="xs" style="line-height:1.4"><b class="orange">${EX[x.from].eq.filter(e=>!EQ[e].on).map(e=>EQ[e].n).join(', ')} ${t('Out of service').toLowerCase()}</b> at Thrive — swapped <b>${EX[x.from].n}</b> → <b>${EX[x.k].n}</b>.</div></div>`).join(''):`<div class="row gap8" style="margin-top:10px;padding:10px 12px;border-radius:14px;background:rgba(46,229,157,.08);border:1px solid rgba(46,229,157,.3)"><i data-i="check" style="width:17px;height:17px;color:var(--green);flex:none"></i><div class="xs">All equipment for today is in service at Thrive.</div></div>`}
 <div class="sec-h"><span class="h3">${t("Built from Thrive's equipment")}</span><span class="xs muted">${L.length} ex.</span></div>
 ${L.map((x,n)=>{const e=EX[x.k];return `<div class="ex" ${x.swapped?'style="border-color:rgba(255,106,43,.35)"':''}><span class="num">${n+1}</span><div class="thumb"><i data-i="${x.swapped?'refresh':'dumbbell'}"></i></div><div class="grow"><div class="row gap6"><span class="sb small ellipsis">${S.lang==='am'?e.am:e.n}</span>${x.swapped?`<span class="chip orange" style="padding:1px 6px;font-size:9.5px">${t(x.swapped==='auto'?'Swapped':'Your swap')}</span>`:''}</div><div class="xs muted">${e.sets} × ${e.reps} · <b class="volt">${e.kg?e.kg+' kg':'BW'}</b> · ${e.eq.map(k=>EQ[k].n).join(' + ')}</div></div><div class="swap" data-a="swap" data-v="${x.i}"><i data-i="swap"></i></div></div>`}).join('')}
</div></div>
<div class="btn primary" style="position:absolute;left:20px;right:20px;bottom:98px;z-index:6" data-a="start"><i data-i="play"></i>${S.wo?'Resume workout':t('Start workout')} · 48 min</div>
${nav('member','plan')}</div>`};

function newWorkout(){const L=planList();S.wo={list:L.map(x=>x.k),idx:0,start:Date.now(),rest:0,restMax:90,playing:false,
 sets:L.map(x=>{const e=EX[x.k];return Array.from({length:e.sets},(_,j)=>({kg:e.kg,r:e.r,rir:'',done:false,last:e.last?e.last[j]:(e.kg?e.kg+' × '+e.r:'– × '+e.r)}))})}}
V.work=()=>{if(!S.wo)newWorkout();const W=S.wo,k=W.list[W.idx],e=EX[k],sets=W.sets[W.idx];const cur=sets.findIndex(s=>!s.done);
const el=Math.floor((Date.now()-W.start)/1000);const prev=cur>0?sets[cur-1]:null;
const hint=prev&&prev.rir!==''?(+prev.rir>=3?`RIR ${prev.rir} means headroom — <b class="volt">+2.5 kg</b> applied to set ${cur+1}`:+prev.rir<=0?`RIR 0 — <b class="orange">−2.5 kg</b> for set ${cur+1}`:`RIR ${prev.rir} — right in the zone, keep ${sets[cur].kg} kg`):'Enter RIR (reps left in the tank) after each set — the next set adapts';
const C=176,off=W.rest?C*(1-W.rest/W.restMax):C;
const last=W.idx===W.list.length-1;
return `<div class="scr s05"><div class="scroll nonav"><div class="content">
 <div class="row between" style="margin-top:4px"><div class="iconbtn" data-a="go" data-v="plan"><i data-i="x"></i></div>
  <div style="text-align:center"><div class="label">Exercise ${W.idx+1} of ${W.list.length}</div><div class="h3 mono volt" style="font-size:17px" id="elapsed">${Math.floor(el/60)}:${String(el%60).padStart(2,'0')}</div></div>${lang()}</div>
 <div class="steps" style="margin-top:10px">${W.list.map((_,i)=>`<i class="${i<=W.idx?'on':''}"></i>`).join('')}</div>
 <div class="video ${W.playing?'playing':''}" data-a="play">
  <svg class="fig" viewBox="0 0 250 140" fill="none" stroke="#5B6573" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M30 112 H220" stroke="#3A4350" stroke-width="7"/><path d="M60 112 v22 M190 112 v22" stroke="#3A4350"/><circle cx="200" cy="96" r="11"/><path d="M188 100 H95 L70 112 M95 100 l-10 30 M150 100 l-6 -42 M130 100 l6 -42"/><g class="fig-bar"><path d="M95 58 H190" stroke="#C8FF3D" stroke-width="6"/><rect x="82" y="44" width="10" height="28" rx="3" fill="#C8FF3D" stroke="none"/><rect x="193" y="44" width="10" height="28" rx="3" fill="#C8FF3D" stroke="none"/></g></svg>
  ${W.playing?'':'<div class="playb"><i data-i="play"></i></div>'}
  <span class="chip" style="position:absolute;top:12px;left:12px;background:rgba(10,12,15,.7)"><i data-i="video"></i>Form video · ${W.playing?'playing (sample)':'tap to play'}</span></div>
 <div class="row between" style="margin-top:14px"><div><div class="h2">${S.lang==='am'?e.am:e.n}</div><div class="xs muted" style="margin-top:2px">${e.eq.map(x=>EQ[x].n).join(' + ')} · Thrive</div></div><span class="chip volt">${e.reps} reps</span></div>
 ${e.cues?`<div class="row gap6" style="margin-top:8px;flex-wrap:wrap">${e.cues.map(c=>`<span class="chip">${c}</span>`).join('')}</div>`:''}
 <div class="tbl">
  <div class="tr h"><span>${t('Set')}</span><span>${t('Last time')}</span><span>kg</span><span>Reps</span><span>RIR</span><span></span></div>
  ${sets.map((s,j)=>{const act=j===cur;const inp=(f,v)=>act?`<input class="inp ${f==='kg'?'volt':''}" type="number" inputmode="decimal" step="${f==='kg'?2.5:1}" data-set="${f}" value="${v}">`:`<span class="inp ${s.done?'':'dim'}">${v===''?'–':v}</span>`;
   return `<div class="tr ${s.done?'done':''} ${act?'act':''}"><span class="n">${j+1}</span><span class="xs ${s.done?'':'muted'}">${s.last}</span>${inp('kg',s.kg)}${inp('r',s.r)}${inp('rir',s.rir)}<span class="ok" ${act?'data-a="logset"':''}><i data-i="check" data-w="3"></i></span></div>`}).join('')}
 </div>
 <div class="row gap8" style="margin-top:8px;padding:9px 12px;border-radius:12px;background:rgba(200,255,61,.07)"><i data-i="zap" style="width:16px;height:16px;color:var(--volt);flex:none"></i><span class="xs">${hint}</span></div>
 <div class="card tight rest">
  <div class="ring"><svg viewBox="0 0 66 66"><circle cx="33" cy="33" r="28" stroke="#2A313C" stroke-width="6" fill="none"/><circle class="prog" cx="33" cy="33" r="28" stroke="${W.rest?'#FF6A2B':'#2A313C'}" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}"/></svg><b id="restt">${W.rest?Math.floor(W.rest/60)+':'+String(W.rest%60).padStart(2,'0'):'—'}</b></div>
  <div class="grow"><div class="label">${t('Rest timer')} ${W.rest?'· running':''}</div><div class="sb small" style="margin-top:3px">${cur>=0?`Next: set ${cur+1} · ${sets[cur].kg} kg × ${sets[cur].r}`:'All sets done 💪'}</div><div class="row gap6" style="margin-top:7px"><span class="chip" data-a="rest" data-v="-15">−15s</span><span class="chip" data-a="rest" data-v="15">+15s</span><span class="chip orange" data-a="rest" data-v="skip">Skip</span></div></div>
 </div>
 <div class="row gap8" style="margin-top:10px">
  <div class="btn ghost" style="width:52px;flex:none" data-a="busy"><i data-i="swap"></i></div>
  <div class="btn ghost" style="width:52px;flex:none;color:var(--orange)" data-a="report"><i data-i="alert"></i></div>
  ${cur>=0?`<div class="btn primary" style="flex:1" data-a="logset"><i data-i="check" data-w="3"></i>${t('Log set')} ${cur+1}</div>`:`<div class="btn primary" style="flex:1" data-a="${last?'finish':'nextex'}">${last?t('Finish workout'):t('Next exercise')+' ›'}</div>`}
 </div>
 <div class="row between tiny dim" style="margin-top:6px;padding:0 6px"><span>${t('Machine busy?')} · ${t('Report broken')}</span><span>${last?'Last exercise':'Next: '+EX[W.list[W.idx+1]].n}</span></div>
</div></div></div>`};

V.prog=()=>`<div class="scr s06"><div class="scroll"><div class="content">
 <div class="row between" style="margin-top:4px"><div><div style="font:700 24px var(--f-head)">${t('Progress')}</div><div class="xs muted am">እድገት · last 3 months</div></div>${lang()}</div>
 <div class="stats">
  <div class="card"><span class="label">${t('Workouts')}</span><b>${S.workouts}</b><span class="xs green">↑ ${S.workouts-22} vs prev</span></div>
  <div class="card"><span class="label">${t('Volume')}</span><b>${S.volume.toFixed(1)}<span class="small muted"> t</span></b><span class="xs green">↑ 18%</span></div>
  <div class="card"><span class="label">${t('Streak')}</span><b class="orange">${S.workouts>26?10:9}<span class="small muted"> days</span></b><span class="xs muted">Best 14</span></div></div>
 <div class="card chart"><div class="row between"><div><div class="label">Bench press · est. 1RM</div><div class="row gap8" style="margin-top:4px;align-items:baseline"><span style="font:800 28px var(--f-head)">${Math.round(S.benchPR.kg*(1+S.benchPR.r/30))} kg</span><span class="chip green" style="padding:2px 8px">+${Math.round(S.benchPR.kg*(1+S.benchPR.r/30))-72} kg</span></div></div><div class="seg"><span>4W</span><span class="on">3M</span><span>1Y</span></div></div>
  <svg viewBox="0 0 320 96" style="width:100%;height:96px;margin-top:6px" fill="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C8FF3D" stop-opacity=".35"/><stop offset="1" stop-color="#C8FF3D" stop-opacity="0"/></linearGradient></defs><g stroke="#232A34"><path d="M0 16H320M0 44H320M0 72H320"/></g><path d="M0 77 L30 74 L58 75 L88 67 L118 64 L148 58 L176 59 L206 48 L236 42 L264 37 L292 27 L320 ${S.workouts>26?14:21} L320 96 L0 96Z" fill="url(#g)"/><path d="M0 77 L30 74 L58 75 L88 67 L118 64 L148 58 L176 59 L206 48 L236 42 L264 37 L292 27 L320 ${S.workouts>26?14:21}" stroke="#C8FF3D" stroke-width="3" stroke-linejoin="round"/><circle cx="292" cy="27" r="5" fill="#0A0C0F" stroke="#C8FF3D" stroke-width="3"/><g fill="#5E6773" font-family="Inter" font-size="10" font-weight="600"><text x="0" y="94">Jul</text><text x="104" y="94">Aug</text><text x="208" y="94">Sep</text><text x="296" y="94">Oct</text></g></svg></div>
 <div class="sec-h"><span class="h3">${t('Personal records')}</span><span class="a">All PRs</span></div>
 <div class="card" style="padding:4px 14px">
  <div class="pr"><div class="ico volt" style="width:38px;height:38px"><i data-i="trophy"></i></div><div class="grow"><div class="row gap6"><span class="sb small">Bench press</span>${S.newPR?'<span class="chip solid" style="padding:1px 6px;font-size:9.5px">NEW</span>':''}</div><div class="xs muted">${S.newPR?'Today':'12 Oct'} · Thrive</div></div><span class="h3 mono">${S.benchPR.kg} kg × ${S.benchPR.r}</span></div>
  <div class="pr"><div class="ico violet" style="width:38px;height:38px"><i data-i="trophy"></i></div><div class="grow"><div class="sb small">Back squat</div><div class="xs muted">14 Oct</div></div><span class="h3 mono">90 kg × 5</span></div>
  <div class="pr"><div class="ico cyan" style="width:38px;height:38px"><i data-i="trophy"></i></div><div class="grow"><div class="sb small">Lat pulldown</div><div class="xs muted">9 Oct</div></div><span class="h3 mono">60 kg × 10</span></div></div>
 <div class="sec-h"><span class="h3">Weekly sets per muscle</span><span class="xs muted">target 10–20</span></div>
 <div class="musc"><span>Chest</span><div class="bar"><i style="width:${S.workouts>26?86:72}%"></i></div><span class="mono muted">${S.workouts>26?17:14}</span></div>
 <div class="musc"><span>Back</span><div class="bar"><i style="width:80%"></i></div><span class="mono muted">16</span></div>
 <div class="musc"><span>Legs</span><div class="bar"><i style="width:55%;background:var(--amber)"></i></div><span class="mono amber">9</span></div>
</div></div>${nav('member','prog')}</div>`;

const PLANS={'1':[1,15000],'3':[3,38000],'6':[6,59500]};
const METH={telebirr:['Telebirr','#1B7BFF','tb','PIN prompt to 09•• ••• 412'],mpesa:['M-PESA','#E3262B','M','PIN prompt to 07•• ••• 905'],cbe:['CBE Birr / bank','#7A2D8C','CBE','Chapa checkout · CBE, Awash, card']};
V.memb=()=>{const dl=daysLeft();const [mo,pr]=PLANS[S.plan];
return `<div class="scr s07"><div class="scroll"><div class="content">
 <div class="row between" style="margin-top:4px"><div><div style="font:700 24px var(--f-head)">${t('Membership')}</div><div class="xs muted am">አባልነት · Thrive Health &amp; Fitness</div></div>${lang()}</div>
 <div class="mcard"><div class="row between"><span class="chip volt">Single · ${S.receipts.length?S.receipts[0].mo+' mo':'1 month'}</span><span class="chip ${dl<=7?'amber':'green'}"><i data-i="timer"></i>${dl} ${t('days left')}</span></div>
  <div class="row between" style="margin-top:14px;align-items:flex-end"><div><div class="label">${t('Expires')}</div><div style="font:800 22px var(--f-head);margin-top:2px">${dstr(S.expiry)}</div><div class="xs muted" style="margin-top:3px">Hana Tesfaye · ID THR-0412</div></div>
   <div class="btn ghost sm" style="height:34px;padding:0 10px;font-size:12px" data-a="freeze"><i data-i="snow"></i>${t('Freeze')}</div></div>
  <div class="row between xs muted" style="margin-top:12px"><span>Freeze left: <b style="color:var(--text)">60 of 60 days</b></span><span>Auto-reminder <b class="green">On</b></span></div></div>
 ${S.receipts.length?`<div class="row gap8" style="margin-top:10px;padding:10px 12px;border-radius:14px;background:rgba(46,229,157,.08);border:1px solid rgba(46,229,157,.3)"><i data-i="check" style="width:17px;height:17px;color:var(--green);flex:none"></i><div class="xs">Last payment <b>${fmt(S.receipts[0].amt)} ETB</b> via ${S.receipts[0].m} · receipt ${S.receipts[0].id} (sample)</div></div>`:''}
 <div class="sec-h"><span class="h3">${t('Renew plan')}</span><span class="xs muted">Prices set by Thrive</span></div>
 <div class="plans" style="margin-top:0">${Object.entries(PLANS).map(([k,[m,p]])=>`<div class="plan ${S.plan===k?'on':''}" data-a="plan" data-v="${k}">${m>1?`<span class="save">−${fmt(15000*m-p)}</span>`:''}<div class="xs muted">${m} month${m>1?'s':''}</div><div class="p">${fmt(p)}</div><div class="tiny muted">ETB</div></div>`).join('')}</div>
 <div class="sec-h"><span class="h3">${t('Pay with')}</span><span class="row gap4 xs muted"><i data-i="lock" style="width:13px;height:13px"></i>via Chapa (simulated)</span></div>
 ${Object.entries(METH).map(([k,[n,c,l,s]],i)=>`<div class="pm ${S.method===k?'on':''}" style="${i?'':'margin-top:0'}" data-a="method" data-v="${k}"><div class="plogo" style="background:${c};color:#fff">${l}</div><div class="grow"><div class="sb small">${n}</div><div class="xs muted">${s}</div></div><div class="radio ${S.method===k?'on':''}"></div></div>`).join('')}
 <div class="row between small" style="margin-top:12px;padding:0 2px"><span class="muted">${t('Total')} <span class="xs">(fee covered by Thrive)</span></span><span style="font:800 18px var(--f-head)">${fmt(pr)} ETB</span></div>
 <div class="btn primary" style="margin-top:10px" data-a="pay"><i data-i="refresh" data-w="2.5"></i>${t('Renew with')} ${METH[S.method][0].split(' ')[0]}</div>
 <div class="tiny dim" style="text-align:center;margin-top:8px">Prototype · no real payment is made</div>
</div></div>${nav('member','memb')}</div>`};

V.checkin=()=>`<div class="scr s08"><div class="scroll"><div class="content">
 <div class="row between" style="margin-top:4px"><div><div style="font:700 24px var(--f-head)">${t('Check-in')}</div><div class="xs muted am">መግቢያ · show this at the front desk</div></div>${lang()}</div>
 <div class="qrwrap"><div class="qr" data-a="scanme"><canvas id="qr" width="29" height="29"></canvas></div>
  <div class="grow"><span class="chip ${daysLeft()>0?'green':'red'}"><span style="width:7px;height:7px;border-radius:50%;background:currentColor"></span>${t('Active')}</span>
   <div class="h3" style="margin-top:10px">Hana Tesfaye</div><div class="xs muted">Single · until ${S.expiry.getDate()} ${S.expiry.toLocaleString('en',{month:'short'})}</div>
   <div class="row gap6" style="margin-top:12px"><i data-i="refresh" style="width:15px;height:15px;color:var(--volt)"></i><span class="xs">New code in <b class="volt mono" id="qrleft">0:${String(S.qrLeft).padStart(2,'0')}</b></span></div>
   <div class="tiny dim" style="margin-top:6px;line-height:1.4">Tap the code to simulate the front-desk scan</div></div></div>
 <div class="sec-h"><span class="h3">${t('Classes this week')}</span><span class="chip" style="padding:3px 8px;font-size:10px">View only · booking soon</span></div>
 ${[['TODAY','6:00','Strength Foundations','Mon · Coach Elias B. · 60 min'],['TUE','6:00','Conditioning Lab','Coach Maya T. · 45 min'],['WED','7:00','Mobility &amp; Flow','Coach Selam D. · 45 min']].map(([d,tm,n,s],i)=>`<div class="cls" ${i?'':'style="border-color:rgba(200,255,61,.4)"'}><div class="time"><span class="tiny ${i?'muted':'volt'} b">${d}</span><b>${tm}<span class="tiny muted"> AM</span></b></div><div class="grow"><div class="sb small">${n}</div><div class="xs muted">${s}</div></div><span class="chip ${S.bells[i]?'volt':''}" style="padding:4px 8px" data-a="bell" data-v="${i}"><i data-i="bell"></i></span></div>`).join('')}
 <div class="sec-h"><span class="h3">${t('Announcements')}</span></div>
 ${EQ.pecdeck.on?'':`<div class="ann"><div class="ico orange" style="width:34px;height:34px"><i data-i="mega"></i></div><div class="grow"><div class="row between"><span class="sb small">Pec deck under repair</span><span class="tiny dim">2h</span></div><div class="xs muted" style="margin-top:2px;line-height:1.4">Back by Thursday. Your plan was updated automatically.</div></div></div>`}
 <div class="ann"><div class="ico cyan" style="width:34px;height:34px"><i data-i="calendar"></i></div><div class="grow"><div class="row between"><span class="sb small am">የበዓል ሰዓት · Holiday hours</span><span class="tiny dim">1d</span></div><div class="xs muted" style="margin-top:2px">Sunday: 8:00 AM – 12:00 PM only.</div></div></div>
</div></div>${nav('member','checkin')}
${S.scanned?`<div class="scanok" data-a="unscan"><i data-i="check" data-w="3"></i>Checked in ✓<div style="font:600 15px var(--f-body)">Welcome to Thrive, Hana · ${new Date().toLocaleTimeString('en',{hour:'numeric',minute:'2-digit'})}</div><div style="font:500 12px var(--f-body);opacity:.7">Simulated front-desk scan · tap to close</div></div>`:''}</div>`;

const ownerHead=(title,role)=>``;
V.dash=()=>{const exp=[['DA','#FFB938','Dawit Alemu','Single · expires Tue 20 Oct'],['MG','#3DD6FF','Meron &amp; Yonas G.','Couple · expires Thu 22 Oct'],['SK','#C8FF3D','Selamawit K.','Happy Hour · expires Sat 24 Oct']];
const reps=[];if(!EQ.pecdeck.on)reps.push(['pecdeck','red','wrench',`${S.reports.pecdeck} member reports · out of service`]);if(!EQ.treadmill.on)reps.push(['treadmill','amber','alert','1 report · "belt slipping" · 📷']);
Object.keys(S.reports).forEach(k=>{if(k!=='pecdeck'&&EQ[k]&&EQ[k].on)reps.push([k,'amber','alert',S.reports[k]+' new member report']);});
return `<div class="scr s09"><div class="scroll"><div class="content">
 <div class="row between" style="margin-top:4px"><div class="row gap10"><div class="avatar" style="background:var(--volt);border-radius:13px">T</div><div><span class="h3">Thrive Health &amp; Fitness</span><div class="xs muted"><span class="chip cyan" style="padding:1px 7px;font-size:9.5px">${t('Owner').toUpperCase()}</span> · Mon, 19 Oct</div></div></div>${lang()}</div>
 <div class="kpis">
  <div class="kpi"><div class="ico cyan"><i data-i="users"></i></div><span class="label">${t('Active members')}</span><b>312</b><span class="xs green">↑ 18 this month</span></div>
  <div class="kpi"><div class="ico volt"><i data-i="wallet"></i></div><span class="label">${t('Revenue · Oct')}</span><b>${(1.86+S.receipts.reduce((a,r)=>a+r.amt,0)/1e6).toFixed(2)}M<span class="small muted"> ETB</span></b><span class="xs green">↑ 12% vs Sep</span></div>
  <div class="kpi"><div class="ico violet"><i data-i="scan"></i></div><span class="label">${t('Check-in')}</span><b>${86+(S.didScan?1:0)}</b><svg viewBox="0 0 100 18" preserveAspectRatio="none" style="width:100%;height:16px;margin-top:2px" fill="none"><path d="M0 16 L10 12 L20 6 L30 9 L40 14 L50 15 L60 13 L70 10 L80 5 L90 8 L100 11" stroke="#9B7BFF" stroke-width="2"/></svg></div>
  <div class="kpi" style="border-color:rgba(255,185,56,.45)"><div class="ico amber"><i data-i="timer"></i></div><span class="label">${t('Expiring · 7 days')}</span><b class="amber">23</b><span class="xs muted">Reminders sent: ${19+Object.keys(S.reminded).length}</span></div></div>
 <div class="card" style="margin-top:8px;padding:12px 14px"><div class="row between"><span class="label">Payments by method · Oct</span><span class="xs muted">Settled to CBE ••4471</span></div>
  <div class="split"><span style="width:56%;background:#1B7BFF"></span><span style="width:20%;background:#B356C8"></span><span style="width:16%;background:var(--muted)"></span><span style="width:8%;background:#E3262B"></span></div>
  <div class="leg"><span><i style="background:#1B7BFF"></i>Telebirr 56%</span><span><i style="background:#B356C8"></i>CBE/bank 20%</span><span><i style="background:var(--muted)"></i>Cash 16%</span><span><i style="background:#E3262B"></i>M-Pesa 8%</span></div></div>
 <div class="sec-h" style="margin-top:14px"><span class="h3">${t('Expiring this week')}</span><span class="a" style="color:var(--cyan)" data-a="remindall">${t('Remind all')}</span></div>
 <div class="card" style="padding:2px 14px">${exp.map(([i,c,n,s])=>`<div class="mem"><div class="av" style="background:${c}">${i}</div><div class="grow"><div class="sb small">${n}</div><div class="xs muted">${s}</div></div>${S.reminded[i]?'<span class="chip amber" style="font-size:10px">SMS sent</span>':`<span class="chip cyan" style="font-size:10px" data-a="remind" data-v="${i}"><i data-i="bell"></i>${t('Remind')}</span>`}</div>`).join('')}</div>
 <div class="sec-h" style="margin-top:14px"><span class="h3">${t('Broken machine reports')}</span><span class="chip ${reps.length?'red':'green'}" style="font-size:10px">${reps.length} open</span></div>
 <div class="card" style="padding:2px 14px">${reps.length?reps.map(([k,c,i,s])=>`<div class="mem"><div class="ico ${c}" style="width:32px;height:32px"><i data-i="${i}"></i></div><div class="grow"><div class="sb small">${EQ[k].n}</div><div class="xs muted">${s}</div></div><span class="chip green" style="font-size:10px" data-a="fix" data-v="${k}">${t('Mark fixed')}</span></div>`).join(''):'<div class="mem"><span class="small muted">No open reports 🎉</span></div>'}</div>
</div></div>${nav('owner','dash')}</div>`};

V.equip=()=>{const all=Object.entries(EQ);const on=all.filter(([k,v])=>v.on).length;const q=S.eqQ.toLowerCase();
const list=all.filter(([k,v])=>(S.eqFilter==='all'||(S.eqFilter==='on'?v.on:!v.on))&&v.n.toLowerCase().includes(q));
const affected=k=>Math.max(0,{pecdeck:41,cable:37,db:96,bench:88,smith:22,squat:64,legpress:51,treadmill:12}[k]||0);
return `<div class="scr s10"><div class="scroll"><div class="content">
 <div class="row between" style="margin-top:4px"><div><div style="font:700 24px var(--f-head)">${t('Equipment')}</div><div class="xs muted am">መሳሪያዎች · Thrive · ${all.length} shown of 46</div></div>${lang()}</div>
 <div class="search"><i data-i="search"></i><input class="sinput" placeholder="Search equipment…" value="${S.eqQ}" data-in="eqQ"></div>
 <div class="filters"><span class="chip ${S.eqFilter==='all'?'cyan':''}" data-a="eqf" data-v="all">${t('All')} ${all.length}</span><span class="chip ${S.eqFilter==='on'?'green':''}" data-a="eqf" data-v="on">${t('In service')} ${on}</span><span class="chip ${S.eqFilter==='off'?'red':''}" data-a="eqf" data-v="off">${t('Out')} ${all.length-on}</span></div>
 ${list.map(([k,v])=>{const swaps=planList().filter(x=>x.swapped==='auto'&&EX[x.from].eq.includes(k));
 return `<div class="eq ${v.on?'':(v.repair?'rep':'out')}" style="display:block"><div class="row gap12"><div class="ico ${v.on?'cyan':v.repair?'amber':'red'}"><i data-i="${v.on?'dumbbell':'wrench'}"></i></div>
  <div class="grow"><div class="row gap6"><span class="sb small">${v.n}</span><span class="qty">${v.q}</span></div><div class="xs ${v.on?'muted':v.repair?'amber sb':'red sb'}" style="margin-top:2px">${v.on?v.cat:(v.repair?v.note:t('Out of service')+(S.reports[k]?` · ${S.reports[k]} reports`:''))}</div></div>
  <div class="tgl ${v.on?'on':'off'}" data-a="tgl" data-v="${k}"></div></div>
  ${v.on?'':`<div class="impact"><b style="color:var(--text)">${affected(k)} member plans</b> affected → auto-swapped${swaps.length?' (e.g. '+swaps.map(x=>`<b class="volt">${EX[x.k].n}</b>`).join(', ')+' in Hana\'s plan)':''}. Members notified.</div>`}</div>`}).join('')}
 <div class="tiny dim" style="text-align:center;margin-top:12px">Toggle a machine → open Member · Home to see the plan swap</div>
</div></div>${nav('owner','equip')}</div>`};

V.trainer=()=>`<div class="scr s11"><div class="scroll"><div class="content">
 <div class="row between" style="margin-top:4px"><div class="row gap10"><div class="avatar" style="background:linear-gradient(135deg,var(--violet),var(--cyan))">EB</div><div><div class="h3">Coach Elias B.</div><div class="xs muted"><span class="chip" style="padding:1px 7px;font-size:9.5px;color:var(--violet);border-color:rgba(155,123,255,.5);background:rgba(155,123,255,.12)">${t('Trainer').toUpperCase()}</span> · Thrive</div></div></div>${lang()}</div>
 <div class="card sum"><div class="ring"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" stroke="#2A313C" stroke-width="6" fill="none"/><circle cx="32" cy="32" r="27" stroke="#2EE59D" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="170" stroke-dashoffset="${S.workouts>26?33:37}"/></svg><b>${S.workouts>26?80:78}%</b></div>
  <div><div class="label">${t('Adherence · this week')}</div><div class="sb small" style="margin-top:4px">14 members · ${S.workouts>26?42:41} of 53 sessions done</div><div class="xs muted" style="margin-top:3px"><span class="orange sb">3 ${t('Needs attention').toLowerCase()}</span> · <span class="volt sb">${S.newPR?6:5} new PRs</span></div></div></div>
 <div class="tabs"><span class="chip" style="background:var(--violet);color:#0A0C0F;border:none">${t('All')} 14</span><span class="chip orange">${t('Needs attention')} 3</span><span class="chip" style="color:var(--violet)">${t('New')} 1</span></div>
 <div class="m new"><div class="row gap10"><div class="av" style="background:#9B7BFF">BT</div><div class="grow"><div class="row gap6"><span class="sb small">Bethlehem Tadesse</span><span class="chip" style="padding:1px 6px;font-size:9.5px;color:var(--violet)">${t('New').toUpperCase()}</span></div><div class="xs muted">Fat loss · beginner · joined today</div></div></div>
  <div class="row gap8" style="margin-top:10px"><div class="btn sm" style="flex:1;background:${S.tr.assessed?'var(--card2)':'var(--violet)'};color:${S.tr.assessed?'var(--green)':'#0A0C0F'}" data-a="assess"><i data-i="${S.tr.assessed?'check':'clipboard'}"></i>${S.tr.assessed?t('Done'):t('Assessment')}</div><div class="btn ghost sm" style="flex:1;${S.tr.assigned?'color:var(--green)':''}" data-a="assign"><i data-i="${S.tr.assigned?'check':'dumbbell'}"></i>${S.tr.assigned?'Plan sent':t('Assign plan')}</div></div></div>
 <div class="m warn"><div class="row gap10"><div class="av" style="background:#FFB938">SM</div><div class="grow"><div class="sb small">Samuel Mulugeta</div><div class="xs muted">Strength · last workout <b class="orange">6 days ago</b></div></div><div style="text-align:right"><div class="dots"><i class="d"></i><i class="x"></i><i class="x"></i><i></i></div><div class="tiny muted" style="margin-top:4px">1 of 4</div></div></div>
  <div class="row between" style="margin-top:9px"><span class="xs orange sb">⚠ Missed 2 sessions</span><span class="chip" style="font-size:10.5px" data-a="viewlog"><i data-i="list"></i>${t('View log')}</span></div></div>
 <div class="m"><div class="row gap10"><div class="av" style="background:#C8FF3D">HT</div><div class="grow"><div class="sb small">Hana Tesfaye</div><div class="xs muted">${S.goal} · ${S.days}×/week plan</div></div><div style="text-align:right"><div class="dots">${[0,1,2,3].map(i=>`<i class="${i<(S.workouts>26?4:3)?'d':''}"></i>`).join('')}</div><div class="tiny muted" style="margin-top:4px">${S.workouts>26?4:3} of 4</div></div></div>
  <div class="row between" style="margin-top:9px"><span class="xs volt sb">🏆 PR · Bench ${S.benchPR.kg} kg × ${S.benchPR.r}</span><span class="xs muted">Plan ›</span></div></div>
 <div class="m"><div class="row gap10"><div class="av" style="background:#3DD6FF">KW</div><div class="grow"><div class="sb small">Kidus Worku</div><div class="xs muted">General fitness · Full body 3×</div></div><div style="text-align:right"><div class="dots"><i class="d"></i><i class="d"></i><i class="d"></i></div><div class="tiny muted" style="margin-top:4px">3 of 3</div></div></div></div>
</div></div>${nav('trainer','trainer')}</div>`;

/* ---------- sheets ---------- */
function sheetHTML(){if(!S.sheet)return'';const P=S.sheet;
 if(P.type==='pay'){const [n]=METH[P.m];
  if(P.step==='pin')return `<div class="sheet-bg"><div class="sheet" style="text-align:center"><div class="spin"></div><div class="h2" style="margin-top:16px">${t('PIN prompt sent')}</div><div class="small muted" style="margin-top:6px;line-height:1.5">${P.m==='cbe'?'Opening Chapa checkout for CBE Birr / bank…':`Check your phone: ${n} asked you to enter your PIN to pay <b style="color:var(--text)">${fmt(P.amt)} ETB</b> to Thrive Health &amp; Fitness (via Chapa).`}</div><div class="tiny dim" style="margin-top:6px">SIMULATED · no money moves</div><div class="btn primary" style="margin-top:18px" data-a="paydone">I entered my PIN</div><div class="btn ghost" style="margin-top:8px" data-a="paycancel">Cancel</div></div></div>`;
  return `<div class="sheet-bg"><div class="sheet" style="text-align:center"><div class="bigok"><i data-i="check" data-w="3"></i></div><div class="h2" style="margin-top:14px">${t('Payment successful')}</div><div class="small muted" style="margin-top:6px;line-height:1.5">${fmt(P.amt)} ETB via ${n} · receipt ${P.id}<br>Membership extended to <b style="color:var(--text)">${dstr(S.expiry)}</b></div><div class="tiny dim" style="margin-top:6px">Split: gym bank account · platform fee (sample)</div><div class="btn primary" style="margin-top:18px" data-a="sheetclose">${t('Done')}</div></div></div>`}
 if(P.type==='finish')return `<div class="sheet-bg"><div class="sheet" style="text-align:center"><div class="bigok" style="background:var(--volt)"><i data-i="trophy" data-w="2.5"></i></div><div class="h2" style="margin-top:14px">Workout complete 💪</div><div class="small muted" style="margin-top:6px;line-height:1.5">${P.sets} sets · ${fmt(P.vol)} kg volume · ${P.min} min${P.pr?`<br><b class="volt">New PR: bench ${S.benchPR.kg} kg × ${S.benchPR.r}</b>`:''}</div><div class="btn primary" style="margin-top:18px" data-a="toprog">See progress</div></div></div>`;
 return''}

/* ---------- render ---------- */
function render(){const ae=document.activeElement;const focus=ae&&ae.dataset&&(ae.dataset.in||ae.dataset.set);const pos=ae&&ae.selectionStart;
 const scrollEl=$app.querySelector('.scroll');const st=scrollEl?scrollEl.scrollTop:0;const prevScr=render.last;
 $app.className='phone'+(S.role==='member'?'':' owner');
 $app.innerHTML=`<div class="pbar"><div class="roles">${['member','owner','trainer'].map(r=>`<button class="${S.role===r?'on':''}" data-a="role" data-v="${r}">${t(r[0].toUpperCase()+r.slice(1))}</button>`).join('')}</div><span class="sample">Sample data</span></div>`+V[S.scr]()+sheetHTML()+(S.toast?`<div class="toast">${S.toast}</div>`:'');
 hydrateIcons($app);
 const sc=$app.querySelector('.scroll');if(sc&&prevScr===S.scr)sc.scrollTop=st;render.last=S.scr;
 if(focus){const el=$app.querySelector(`[data-in="${focus}"],[data-set="${focus}"]`);if(el){el.focus();try{el.setSelectionRange(pos,pos)}catch(e){}}}
 if(S.scr==='checkin')drawQR();}
function drawQR(){const cv=document.getElementById('qr');if(!cv)return;const c=cv.getContext('2d'),N=29;c.fillStyle='#fff';c.fillRect(0,0,N,N);c.fillStyle='#0A0C0F';let s=S.qrSeed;const r=()=>{s=(s*9301+49297)%233280;return s/233280};
 for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(r()<.48)c.fillRect(x,y,1,1);
 const f=(x,y)=>{c.fillStyle='#fff';c.fillRect(x-1,y-1,9,9);c.fillStyle='#0A0C0F';c.fillRect(x,y,7,7);c.fillStyle='#fff';c.fillRect(x+1,y+1,5,5);c.fillStyle='#0A0C0F';c.fillRect(x+2,y+2,3,3)};f(0,0);f(N-7,0);f(0,N-7);c.fillStyle='#fff';c.fillRect(11,11,7,7);c.fillStyle='#A6E000';c.fillRect(12,12,5,5)}
function go(v){if(v==='-'){toast('Not part of this prototype yet');return}S.scr=v;S.sheet=null;
 if(v==='plan'||v==='work'||v==='prog'||v==='memb'||v==='checkin')S.role='member';render();const sc=$app.querySelector('.scroll');if(sc)sc.scrollTop=0}

/* ---------- actions ---------- */
const A={
 go:v=>go(v==='work'&&!S.wo?'plan':v), lang:()=>{S.lang=S.lang==='en'?'am':'en';render()},
 role:v=>{S.role=v;S.sheet=null;go(v==='member'?(S.joined?'plan':'onb'):v==='owner'?'dash':'trainer')},
 goal:v=>{S.goal=v;render()},level:v=>{S.level=v;render()},days:v=>{S.days=+v;render()},
 inj:v=>{if(v==='None')S.inj=new Set(['None']);else{S.inj.delete('None');S.inj.has(v)?S.inj.delete(v):S.inj.add(v)}render()},
 gymsel:v=>{if(v==='bole'){toast('Bole Iron Gym is sample-only — pick Thrive');return}S.gymSel=v;render()},
 join:()=>{S.joined=true;toast('Joined Thrive · 46 items inherited. Add anything missing ↓');go('scan')},
 tab:v=>{S.scanTab=v;render()},det:v=>{if(v==='cable')S.cable=!S.cable;else S.det[v]=!S.det[v];render()},
 detall:()=>{Object.keys(S.det).forEach(k=>S.det[k]=true);S.cable=true;render()},cable:v=>{S.cable=v==='1';render()},
 savescan:()=>{if(S.cable)EQ.cable.on=true;S.joined=true;toast('Saved to Thrive — owner will verify. Plan built ✓');go('plan')},
 swap:v=>{const i=+v,o=SLOTS[i];const av=o.map((k,j)=>j).filter(j=>avail(o[j]));if(av.length<2){toast('No other option with Thrive\'s equipment');return}
  const cur=slotEx(i).k;const ci=av.indexOf(o.indexOf(cur));S.userSwap[i]=av[(ci+1)%av.length];if(S.wo)S.wo=null;toast(`Swapped to ${EX[slotEx(i).k].n}`)},
 start:()=>{if(!S.wo)newWorkout();go('work')},
 play:()=>{S.wo.playing=!S.wo.playing;render()},
 logset:()=>{const W=S.wo,sets=W.sets[W.idx],cur=sets.findIndex(s=>!s.done);if(cur<0)return;
  $app.querySelectorAll('[data-set]').forEach(el=>{const f=el.dataset.set;sets[cur][f]=f==='rir'?el.value:+el.value});
  sets[cur].done=true;const nx=sets[cur+1];if(nx){const r=sets[cur].rir===''?1:+sets[cur].rir;const kg=Math.max(0,sets[cur].kg+(r>=3?2.5:r<=0?-2.5:0));sets.slice(cur+1).forEach(s=>{s.kg=kg;s.r=sets[cur].r})}
  W.rest=nx?90:0;W.restMax=90;render();if(!nx)toast('Exercise done ✓')},
 rest:v=>{const W=S.wo;if(v==='skip')W.rest=0;else{W.rest=Math.max(0,W.rest+ +v);W.restMax=Math.max(W.restMax,W.rest)}render()},
 nextex:()=>{S.wo.idx++;S.wo.rest=0;S.wo.playing=false;render();$app.querySelector('.scroll').scrollTop=0},
 busy:()=>{const W=S.wo,slot=SLOTS.findIndex(o=>o.includes(W.list[W.idx]));const o=SLOTS[slot];const alt=o.find(k=>k!==W.list[W.idx]&&avail(k));
  if(!alt){toast('No alternative on free equipment — wait or skip');return}const e=EX[alt];W.list[W.idx]=alt;S.userSwap[slot]=o.indexOf(alt);
  W.sets[W.idx]=W.sets[W.idx].map(s=>s.done?s:{...s,kg:e.kg,r:e.r,rir:'',last:e.kg?e.kg+' × '+e.r:'– × '+e.r});toast(`Machine busy → swapped to ${e.n}`);render()},
 report:()=>{const k=EX[S.wo.list[S.wo.idx]].eq[0];S.reports[k]=(S.reports[k]||0)+1;toast(`Reported ${EQ[k].n} to Thrive owner · photo optional`)},
 finish:()=>{const W=S.wo;let sets=0,vol=0;W.sets.forEach(a=>a.forEach(s=>{if(s.done){sets++;vol+=s.kg*s.r}}));
  const bi=W.list.indexOf('bench');let pr=false;if(bi>=0)W.sets[bi].forEach(s=>{if(s.done&&s.kg*(1+s.r/30)>S.benchPR.kg*(1+S.benchPR.r/30)){S.benchPR={kg:s.kg,r:s.r};pr=true}});
  S.newPR=S.newPR||pr;S.workouts++;S.volume+=vol/1000;S.sheet={type:'finish',sets,vol,pr,min:Math.max(1,Math.round((Date.now()-W.start)/60000))};S.wo=null;render()},
 toprog:()=>go('prog'),
 plan:v=>{S.plan=v;render()},method:v=>{S.method=v;render()},freeze:()=>toast('Freeze: pick dates (up to 60 days/yr) — coming in next build'),
 pay:()=>{S.sheet={type:'pay',step:'pin',m:S.method,amt:PLANS[S.plan][1]};render();clearTimeout(A.pt);A.pt=setTimeout(()=>{if(S.sheet&&S.sheet.step==='pin')A.paydone()},6000)},
 paydone:()=>{if(!S.sheet)return;const P=S.sheet,mo=PLANS[S.plan][0];const d=new Date(S.expiry);d.setMonth(d.getMonth()+mo);S.expiry=d;
  P.step='ok';P.id='CHP-'+Math.random().toString(36).slice(2,8).toUpperCase();S.receipts.unshift({amt:P.amt,m:METH[P.m][0],id:P.id,mo});render()},
 paycancel:()=>{S.sheet=null;clearTimeout(A.pt);render()},sheetclose:()=>{S.sheet=null;render()},
 scanme:()=>{S.scanned=true;S.didScan=true;render()},unscan:()=>{S.scanned=false;render()},
 bell:v=>{S.bells[v]=!S.bells[v];toast(S.bells[v]?'Reminder set · 1 h before class':'Reminder off')},
 remind:v=>{S.reminded[v]=1;toast('SMS + push reminder sent (simulated)')},remindall:()=>{['DA','MG','SK'].forEach(i=>S.reminded[i]=1);toast('Reminders sent to 3 members (simulated)')},
 fix:v=>{EQ[v].on=true;delete S.reports[v];S.wo=null;toast(`${EQ[v].n} back in service — plans restored`)},
 tgl:v=>{EQ[v].on=!EQ[v].on;S.wo=null;const sw=planList().filter(x=>x.swapped==='auto'&&EX[x.from].eq.includes(v));
  toast(EQ[v].on?`${EQ[v].n} in service · plans restored`:`${EQ[v].n} out of service${sw.length?' · swapped to '+EX[sw[0].k].n:''}`)},
 eqf:v=>{S.eqFilter=v;render()},
 assess:()=>{S.tr.assessed=true;toast('Movement assessment saved for Bethlehem (sample)')},assign:()=>{S.tr.assigned=true;toast('Fat-loss plan (Thrive equipment) sent to Bethlehem')},
 viewlog:()=>toast('Samuel: last workout Tue 13 Oct · Lower body · 5/6 exercises'),
};
$app.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||el.classList.contains('dis'))return;const f=A[el.dataset.a];if(f)f(el.dataset.v)});
$app.addEventListener('input',e=>{const k=e.target.dataset.in;if(k){S[k]=e.target.value;render()}});
/* timers */
setInterval(()=>{let dirty=false;
 if(S.scr==='scan'&&S.scanTab==='video'){S.rec=(S.rec+1)%60;const r=$app.querySelector('.rec');if(r)r.lastChild.textContent='REC 0:'+String(S.rec).padStart(2,'0')}
 if(S.wo&&S.scr==='work'){const el=Math.floor((Date.now()-S.wo.start)/1000);const x=document.getElementById('elapsed');if(x)x.textContent=Math.floor(el/60)+':'+String(el%60).padStart(2,'0');
  if(S.wo.rest>0){S.wo.rest--;if(S.wo.rest===0){toast('Rest over — next set! 🔔');try{navigator.vibrate&&navigator.vibrate(300)}catch(e){}}else{const b=document.getElementById('restt');const c=$app.querySelector('.s05 circle.prog');if(b)b.textContent=Math.floor(S.wo.rest/60)+':'+String(S.wo.rest%60).padStart(2,'0');if(c)c.setAttribute('stroke-dashoffset',176*(1-S.wo.rest/S.wo.restMax))}}}
 S.qrLeft--;if(S.qrLeft<=0){S.qrLeft=30;S.qrSeed=(S.qrSeed*7+13)%9973;if(S.scr==='checkin')drawQR()}const q=document.getElementById('qrleft');if(q)q.textContent='0:'+String(S.qrLeft).padStart(2,'0');
},1000);
render();
