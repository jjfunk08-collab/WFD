/* ============ Constants ============ */
const AISLES=["Produce","Meat & Seafood","Dairy & Eggs","Bakery","Pantry","Baking & Spices","Canned & Jarred","Frozen","Beverages","Household","Other"];
const AISLE_KW=[
 ["Meat & Seafood",/\b(chicken|beef|pork|turkey|sausage|bacon|ham|steak|lamb|veal|salmon|cod|haddock|shrimp|scallop|tuna steak|fish|ground|chorizo|prosciutto|pancetta|clam|mussel|lobster|tilapia|meatball)/],
 ["Dairy & Eggs",/\b(milk|butter|cheese|cheddar|mozzarella|parmesan|parmigiano|ricotta|feta|yogurt|cream|sour cream|egg|half and half|half-and-half|buttermilk|ghee)/],
 ["Bakery",/\b(bread|bun|roll|baguette|tortilla|pita|naan|bagel|english muffin|croissant|brioche)/],
 ["Frozen",/\bfrozen\b|\bice cream/],
 ["Canned & Jarred",/\b(canned|can of|tomato paste|tomato sauce|crushed tomato|diced tomato|broth|stock|salsa|pesto|marinara|beans|chickpea|coconut milk|olives|capers|jam|peanut butter|pickles)/],
 ["Baking & Spices",/\b(flour|sugar|baking soda|baking powder|yeast|vanilla|cinnamon|cumin|paprika|oregano|thyme|chili powder|nutmeg|salt|pepper flakes|black pepper|garlic powder|onion powder|cornstarch|cocoa|chocolate chip|bay leaf|seasoning|spice|curry powder|turmeric)/],
 ["Produce",/\b(onion|garlic|tomato|potato|carrot|celery|pepper|lettuce|spinach|kale|apple|banana|lemon|lime|orange|berry|berries|avocado|cucumber|zucchini|squash|broccoli|cauliflower|cabbage|mushroom|herb|basil|parsley|cilantro|dill|mint|rosemary|scallion|green onion|ginger|corn|bean sprout|green bean|asparagus|pea|sweet potato|pumpkin|pear|peach|grape|melon|leek|shallot|jalape|arugula|brussels|beet|radish|turnip|parsnip|chard|eggplant|fennel)/],
 ["Pantry",/\b(rice|pasta|spaghetti|penne|noodle|oat|cereal|quinoa|couscous|oil|vinegar|soy sauce|honey|maple|syrup|mustard|ketchup|mayo|mayonnaise|hot sauce|worcestershire|breadcrumb|panko|cracker|nut|almond|walnut|pecan|raisin|lentil|tortilla chip)/],
 ["Beverages",/\b(coffee|tea|juice|soda|seltzer|sparkling water|wine|beer)/],
 ["Household",/\b(paper towel|toilet paper|dish soap|detergent|foil|plastic wrap|trash bag|sponge|napkin)/]
];
const UNIT_MAP={cup:"cup",cups:"cup",c:"cup",tablespoon:"tbsp",tablespoons:"tbsp",tbsp:"tbsp",tbs:"tbsp",teaspoon:"tsp",teaspoons:"tsp",tsp:"tsp",ounce:"oz",ounces:"oz",oz:"oz",pound:"lb",pounds:"lb",lb:"lb",lbs:"lb",gram:"g",grams:"g",g:"g",kg:"kg",ml:"ml",liter:"l",liters:"l",quart:"qt",quarts:"qt",qt:"qt",pint:"pt",pints:"pt",can:"can",cans:"can",jar:"jar",jars:"jar",package:"pkg",packages:"pkg",pkg:"pkg",bag:"bag",bags:"bag",box:"box",boxes:"box",bunch:"bunch",bunches:"bunch",clove:"clove",cloves:"clove",head:"head",heads:"head",stick:"stick",sticks:"stick",slice:"slice",slices:"slice",pinch:"pinch",dash:"dash",sprig:"sprig",sprigs:"sprig"};
/* Southern New England harvest calendar (by month index) */
const SEASON={
 0:["apple","potato","onion","cabbage","carrot","parsnip","beet","turnip","butternut","winter squash","sweet potato","leek","kale"],
 1:["apple","potato","onion","cabbage","carrot","parsnip","beet","turnip","butternut","winter squash","sweet potato","leek"],
 2:["apple","potato","onion","cabbage","carrot","parsnip","maple","leek","spinach"],
 3:["asparagus","rhubarb","spinach","radish","scallion","ramp","lettuce","maple","pea shoot"],
 4:["asparagus","rhubarb","spinach","radish","pea","lettuce","strawberry","scallion","arugula"],
 5:["strawberry","pea","lettuce","zucchini","spinach","garlic scape","radish","broccoli","chard","snap pea"],
 6:["corn","tomato","zucchini","summer squash","blueberry","cucumber","green bean","basil","peach","cherry","bell pepper","eggplant"],
 7:["corn","tomato","peach","blueberry","eggplant","bell pepper","cucumber","green bean","melon","basil","zucchini","watermelon"],
 8:["apple","corn","tomato","bell pepper","pear","winter squash","eggplant","grape","broccoli","cauliflower","potato"],
 9:["apple","pumpkin","butternut","acorn squash","winter squash","brussels sprout","cauliflower","pear","sweet potato","kale","cranberry","cabbage","beet","leek","delicata"],
 10:["apple","cranberry","butternut","winter squash","brussels sprout","sweet potato","parsnip","turnip","kale","pear","carrot","cabbage","potato"],
 11:["apple","butternut","winter squash","potato","cabbage","carrot","parsnip","sweet potato","onion","turnip","kale","pear"]
};
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const VERDICT={love:{v:5,label:"Love it",e:"😍"},like:{v:4,label:"Like it",e:"🙂"},meh:{v:2.5,label:"It's fine",e:"😐"},no:{v:1,label:"Not again",e:"🙅"}};
const ATTRS=[["taste","Taste","bland → amazing"],["ease","Ease to cook","fussy → easy"],["cleanup","Cleanup","pile of dishes → one pan"],["leftovers","Leftovers","skip → great next day"]];
const COMMON_STAPLES=[["Milk","Dairy & Eggs"],["Eggs","Dairy & Eggs"],["Butter","Dairy & Eggs"],["Bread","Bakery"],["Bananas","Produce"],["Apples","Produce"],["Coffee","Beverages"],["Yogurt","Dairy & Eggs"],["Cereal","Pantry"],["Shredded cheese","Dairy & Eggs"],["Paper towels","Household"],["Orange juice","Beverages"]];
const COLORS=["#2E6A4C","#A2304F","#2D5A86","#9A6A00","#6B3FA0","#B24B1E","#1F7A7A","#5B6B1E"];

/* ============ Utils ============ */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-5);
const ymd=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const parseYmd=s=>{const[y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};
function weekStartOf(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function weekDates(ws){const b=parseYmd(ws);return [...Array(7)].map((_,i)=>{const d=new Date(b);d.setDate(b.getDate()+i);return d})}
const lsGet=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:v}catch{return d}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2600)}
function season(){const m=new Date().getMonth();return m>=2&&m<=4?"spring":m>=5&&m<=7?"summer":m>=8&&m<=10?"fall":"winter"}

function norm(name){
  let s=String(name||"").toLowerCase().replace(/\(.*?\)/g," ").split(",")[0];
  s=s.replace(/\b(fresh|freshly|chopped|minced|diced|sliced|large|small|medium|ripe|boneless|skinless|finely|roughly|thinly|grated|shredded|packed|optional|to taste|divided|peeled|cubed|crushed|ground black)\b/g," ");
  s=s.replace(/[^a-z\s-]/g," ").replace(/\s+/g," ").trim();
  if(/ies$/.test(s))s=s.replace(/ies$/,"y");else if(/oes$/.test(s))s=s.replace(/es$/,"");else if(/[^s]s$/.test(s))s=s.slice(0,-1);
  return s;
}
function displayName(item){const s=String(item||"").split(",")[0].replace(/\(.*?\)/g,"").trim();return s.charAt(0).toUpperCase()+s.slice(1)}
function guessAisle(item){const n=String(item||"").toLowerCase();for(const[a,re]of AISLE_KW)if(re.test(n))return a;return "Other"}
const FR={"½":.5,"¼":.25,"¾":.75,"⅓":1/3,"⅔":2/3,"⅛":.125};
function qtyNum(q){
  q=String(q??"").trim();if(!q)return null;let t=0,ok=false;
  for(const p of q.replace(/([½¼¾⅓⅔⅛])/g," $1").split(/\s+/)){
    if(!p)continue;
    if(FR[p]!=null){t+=FR[p];ok=true}
    else if(/^\d+\/\d+$/.test(p)){const[a,b]=p.split("/").map(Number);if(!b)return null;t+=a/b;ok=true}
    else if(/^\d*\.?\d+$/.test(p)){t+=parseFloat(p);ok=true}
    else return null;
  }
  return ok?t:null;
}
function fmtQty(n){
  if(n==null)return "";const w=Math.floor(n),f=n-w;
  const fr=[[0,""],[.25,"¼"],[1/3,"⅓"],[.5,"½"],[2/3,"⅔"],[.75,"¾"],[1,""]];
  let best=fr[0];for(const x of fr)if(Math.abs(f-x[0])<Math.abs(f-best[0]))best=x;
  if(Math.abs(f-best[0])>.06)return String(Math.round(n*100)/100);
  const whole=w+(best[0]===1?1:0);return ((whole?String(whole):"")+best[1])||"0";
}
function parseIngLine(line){
  let s=line.trim().replace(/^[-•*▢☐]\s*/,"");if(!s)return null;
  let qty="",rest=s;
  const m=s.match(/^((?:\d+\s+)?\d+\/\d+|\d+\s*-\s*\d+|\d*\.?\d+(?:\s*[½¼¾⅓⅔⅛])?|[½¼¾⅓⅔⅛])\s*(.*)$/);
  if(m){qty=m[1].replace(/\s+/g," ").trim();rest=m[2]}
  let unit="";const um=rest.match(/^([A-Za-z]+)\.?\s+(.*)$/);
  if(um&&UNIT_MAP[um[1].toLowerCase()]){unit=UNIT_MAP[um[1].toLowerCase()];rest=um[2]}
  rest=rest.replace(/^of\s+/i,"").trim();if(!rest)return null;
  return {qty,unit,item:rest,aisle:guessAisle(rest)};
}
function ingToLine(i){return [i.qty,i.unit,i.item].filter(Boolean).join(" ")}
function wordHit(hay,w){return new RegExp("\\b"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b").test(hay)}

/* ============ Storage (server API + local cache) ============ */
let AI_OFF=false, ONLINE=true, VER=0;
const SAMPLE={json:aiJson,limits:async()=>({images:{mediaTypes:["image/jpeg","image/png","image/webp","image/gif","image/heic"]}})};
const local={data:{},subs:new Set()};
const pending={};
function deepMerge(a,b){const o={...(a||{})};for(const k in b){const v=b[k];o[k]=(v&&typeof v==="object"&&!Array.isArray(v)&&a&&a[k]&&typeof a[k]==="object"&&!Array.isArray(a[k]))?deepMerge(a[k],v):v}return o}
function cacheSave(){try{localStorage.setItem("wfd-cache",JSON.stringify({ver:VER,data:local.data}))}catch{}}
function localNotify(){cacheSave();for(const s of local.subs)s()}
async function api(url,body,method){
  const r=await fetch(url,{method:method||(body?"POST":"GET"),headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined,cache:"no-store",credentials:"same-origin"});
  let j={};try{j=await r.json()}catch{}
  if(r.status===401){showLogin();throw {code:"unauthorized"}}
  if(!r.ok)throw {code:j.code||"error",message:j.error||""};
  return j;
}
function writeFail(e){
  const c=e&&e.code;
  if(c==="unauthorized")toast("Sign in again to save changes.");
  else if(c==="too_large")toast("That's too much to save at once.");
  else toast("Couldn't save that change. Check your connection and try again.");
  sync(true);
  throw e;
}
async function write(op,path,data){
  pending[path]=(pending[path]||0)+1;
  try{await api("/api/db",{op,path,data})}
  catch(e){writeFail(e)}
  finally{pending[path]--;if(!pending[path])delete pending[path]}
}
async function docSet(path,data){local.data[path]=JSON.parse(JSON.stringify(data));localNotify();return write("set",path,data)}
async function docUpdate(path,partial){local.data[path]=deepMerge(local.data[path],partial);localNotify();return write("update",path,partial)}
async function docDelete(path){delete local.data[path];localNotify();return write("delete",path)}
function watchDoc(path,cb){const f=()=>cb(local.data[path]||null);local.subs.add(f);f();return()=>local.subs.delete(f)}
function watchCol(col,cb){const f=()=>{const o={};for(const k in local.data){if(k.startsWith(col+"/")&&k.split("/").length===col.split("/").length+1)o[k.slice(col.length+1)]=local.data[k]}cb(o)};local.subs.add(f);f();return()=>local.subs.delete(f)}

let syncing=false;
async function sync(full){
  if(syncing||S.locked)return;syncing=true;
  try{
    const j=await api("/api/sync?since="+(full?0:VER));
    const docs=j.docs||{};let skipped=false,changed=false;
    if(full){
      const nd={};
      for(const k in local.data)if(pending[k])nd[k]=local.data[k];
      for(const[k,v]of Object.entries(docs)){if(pending[k]){skipped=true;continue}if(v!=null)nd[k]=v}
      local.data=nd;changed=true;
    }else{
      for(const[k,v]of Object.entries(docs)){
        if(pending[k]){skipped=true;continue}
        if(v==null)delete local.data[k];else local.data[k]=v;changed=true;
      }
    }
    if(!skipped)VER=j.ver||VER;
    if(!ONLINE){ONLINE=true;changed=true}
    if(changed)localNotify();
  }catch(e){
    if(e&&e.code!=="unauthorized"&&ONLINE){ONLINE=false;render()}
  }finally{syncing=false}
}

/* ---- AI via /api/ai ---- */
async function fileToB64(file){
  try{
    const bmp=await createImageBitmap(file);
    const scale=Math.min(1,1600/Math.max(bmp.width,bmp.height));
    const c=document.createElement("canvas");c.width=Math.round(bmp.width*scale);c.height=Math.round(bmp.height*scale);
    c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
    const url=c.toDataURL("image/jpeg",.85);
    return {media_type:"image/jpeg",data:url.split(",")[1]};
  }catch{throw {code:"image_rejected"}}
}
async function aiJson(prompt,opts={}){
  const images=[];for(const f of opts.images||[])images.push(await fileToB64(f));
  let r;
  try{r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",signal:opts.signal,
    body:JSON.stringify({prompt,tier:opts.modelTier==="quick"?"quick":"default",images})})}
  catch(e){if(e&&e.name==="AbortError")throw {code:"cancelled"};throw {code:"network"}}
  let j={};try{j=await r.json()}catch{}
  if(r.status===401){showLogin();throw {code:"unauthorized"}}
  if(!r.ok)throw {code:j.code||"error"};
  return j.result;
}

/* ---- Sign-in ---- */
function showLogin(){if(!S.locked){S.locked=true;render()}}
function renderLogin(){
  return `<div class="login"><div class="panel"><div class="brand" style="justify-content:center;margin-bottom:6px"><span class="dot" aria-hidden="true">🍽</span>What's for dinner</div>
  <p>Enter the family passcode to open the meal plan.</p>
  <input class="in" id="pass" type="password" autocomplete="current-password" data-enter="login" placeholder="Family passcode" aria-label="Family passcode">
  <div id="loginErr"></div>
  <button class="btn primary" data-act="login" style="width:100%;justify-content:center;margin-top:12px">Open</button></div></div>`;
}

/* ============ State ============ */
const S={
  tab:lsGet("wfd-tab","plan"),
  week:ymd(weekStartOf(new Date())),
  recipes:{},reviews:{},settings:{},staples:{},plan:{},grocery:{},deals:{},restaurants:{},
  me:lsGet("wfd-me",""),
  ui:{q:"",kind:"all",sort:"fav"},locked:false
};
let weekUnsubs=[];
function subscribeWeek(){
  weekUnsubs.forEach(u=>u());
  weekUnsubs=[
    watchDoc("plans/"+S.week,d=>{S.plan=d||{};render()}),
    watchDoc("grocery/"+S.week,d=>{S.grocery=d||{};render()}),
    watchDoc("deals/"+S.week,d=>{S.deals=d||{};render()})
  ];
}
const members=()=>(S.settings.members||[]).filter(Boolean);
const memberById=id=>members().find(m=>m.id===id);
function memberColor(id){let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))>>>0;return COLORS[h%COLORS.length]}

/* ============ Scoring helpers ============ */
function revs(rid){return Object.entries((S.reviews[rid]||{}).byMember||{}).filter(([mid,r])=>r&&memberById(mid))}
function fam(rid){const r=revs(rid).filter(([,x])=>VERDICT[x.verdict]);if(!r.length)return null;return r.reduce((a,[,x])=>a+VERDICT[x.verdict].v,0)/r.length}
function avgAttr(rid,k){const v=revs(rid).map(([,x])=>x[k]).filter(n=>typeof n==="number");return v.length?v.reduce((a,b)=>a+b,0)/v.length:null}
function vetoes(rid){return revs(rid).filter(([,x])=>x.verdict==="no").map(([m])=>memberById(m)?.name).filter(Boolean)}
function seasonHits(r){const list=SEASON[new Date().getMonth()];const names=(r.ingredients||[]).map(i=>norm(i.item));return list.filter(w=>names.some(n=>wordHit(n,w)))}
function dealItems(){return (S.deals.items||[]).filter(d=>d&&d.match)}
function dealFor(name){const n=norm(name);return dealItems().find(d=>wordHit(n,norm(d.match)))||null}
function dealHits(r){return (r.ingredients||[]).map(i=>dealFor(i.item)).filter(Boolean)}
function leftGood(id,r){const a=avgAttr(id,"leftovers");return a!=null?a>=4:!!r.leftoverFriendly}
function totalMin(r){return (r.prepMin||0)+(r.cookMin||0)}
function scoreHtml(id){const f=fam(id);const n=revs(id).filter(([,x])=>x.verdict).length;return f==null?`<span>Not rated yet</span>`:`<span class="score">★ ${f.toFixed(1)}</span><span>${n} vote${n>1?"s":""}</span>`}
function badgesHtml(id,r){
  const sh=seasonHits(r).length||(r.seasons||[]).includes(season()),dh=dealHits(r).length,v=vetoes(id);
  return `${sh?'<span class="b season">In season</span>':""}${dh?'<span class="b sale">On sale</span>':""}${leftGood(id,r)?'<span class="b left">Good leftovers</span>':""}${v.length?`<span class="b veto">${esc(v.join(", "))} said no</span>`:""}`;
}
function planScore(id,r){
  let s=fam(id)??3.2;
  s+=Math.min(seasonHits(r).length,3)*.35+((r.seasons||[]).includes(season())?.3:0);
  s+=Math.min(dealHits(r).length,3)*.45;
  s-=vetoes(id).length*.8;
  return s+Math.random()*.7;
}

/* ============ Rendering ============ */
let renderQueued=false,renderDeferred=false;
function render(){
  if(renderQueued)return;renderQueued=true;
  requestAnimationFrame(()=>{
    renderQueued=false;
    const a=document.activeElement;
    if(a&&$("#main").contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&!a.dataset.live&&a.type!=="checkbox"){
      if(!renderDeferred){renderDeferred=true;a.addEventListener("blur",()=>{renderDeferred=false;render()},{once:true})}
      return;
    }
    renderHeader();
    if(S.locked){$("#main").innerHTML=renderLogin();document.querySelector(".top .tabs").hidden=true;$("#pass")&&!renderDeferred&&$("#pass").focus();return}
    document.querySelector(".top .tabs").hidden=false;
    const fn={plan:renderPlan,recipes:renderRecipes,takeout:renderTakeout,grocery:renderGrocery,family:renderFamily}[S.tab]||renderPlan;
    $("#main").innerHTML=(ONLINE?"":`<div class="notice"><b>You're offline.</b> Showing the last saved copy. Changes won't save until you reconnect.</div>`)+fn();
    if(S.tab==="recipes")renderGrid();
  });
}
function renderHeader(){
  document.querySelectorAll(".tab").forEach(b=>b.setAttribute("aria-current",b.dataset.t===S.tab?"page":"false"));
  const sel=$("#me"),ms=members();
  sel.innerHTML=(ms.length?`<option value="">Choose…</option>`:`<option value="">Add family first</option>`)+ms.map(m=>`<option value="${esc(m.id)}"${m.id===S.me?" selected":""}>${esc(m.name)}</option>`).join("");
  const n=groceryItems().filter(i=>!i.have&&!i.got).length,c=$("#gcount");c.hidden=!n;c.textContent=n;
}

/* ---- Plan ---- */
function renderPlan(){
  const dates=weekDates(S.week),today=ymd(new Date()),days=S.plan.days||{};
  const label=dates[0].toLocaleDateString(undefined,{month:"long",day:"numeric"});
  const isThis=S.week===ymd(weekStartOf(new Date()));
  const open=dates.filter(d=>!days[ymd(d)]).length;
  const cards=dates.map(d=>{
    const k=ymd(d),day=days[k]||{},r=day.main&&S.recipes[day.main];
    let body;
    if(day.special==="takeout"){body=takeoutDayHtml(k,day)}
    else if(day.special){body=`<div class="special">${day.special==="leftovers"?"🍲 Leftovers night":"🍽 Eating out"}</div>`}
    else if(r){
      const sides=(day.sides||[]).filter(id=>S.recipes[id]);
      body=`<button class="mainpick" data-act="openRecipe" data-id="${esc(day.main)}"><span class="nm">${esc(r.name)}</span><span class="mt">${totalMin(r)?totalMin(r)+" min · ":""}${fam(day.main)!=null?"★ "+fam(day.main).toFixed(1):"not rated"}</span></button>
      <div class="sides">${sides.map(id=>`<span class="chip"><button class="lnk" data-act="openRecipe" data-id="${esc(id)}">${esc(S.recipes[id].name)}</button><button data-act="rmSide" data-date="${k}" data-id="${esc(id)}" aria-label="Remove side">✕</button></span>`).join("")}
      <button class="chip add" data-act="pickSide" data-date="${k}">+ Side</button></div>`;
    } else if(day.main){body=`<div class="special">That recipe was deleted.</div>`}
    else body=`<button class="empty-day" data-act="pickMain" data-date="${k}">Choose dinner</button>`;
    const acts=(r||day.special)?`<div class="day-actions">${r&&SAMPLE&&!AI_OFF?`<button class="btn sm ai" data-act="suggestSides" data-id="${esc(day.main)}" data-date="${k}">Suggest sides</button>`:""}<button class="btn sm ghost" data-act="pickMain" data-date="${k}">Change</button><button class="btn sm ghost" data-act="clearDay" data-date="${k}">Clear</button></div>`:"";
    return `<article class="day${k===today?" today":""}"><div class="day-h"><span class="dnum">${d.getDate()}</span><span class="dow">${d.toLocaleDateString(undefined,{weekday:"short"})}</span></div>${body}${acts}</article>`;
  }).join("");
  const produce=SEASON[new Date().getMonth()];
  const deals=dealItems();
  return `<div class="pagehead"><div><h1>Week of ${esc(label)}</h1><div class="sub">${open?`${open} night${open>1?"s":""} still open`:"Every night is planned"}</div></div>
    <div class="spacer"></div>
    <div class="weeknav"><button class="icon-btn" data-act="week" data-d="-1" aria-label="Previous week">‹</button>${isThis?"":`<button class="btn sm ghost" data-act="week" data-d="0">This week</button>`}<button class="icon-btn" data-act="week" data-d="1" aria-label="Next week">›</button></div>
    ${open?`<button class="btn primary" data-act="fillWeek">Fill open nights</button>`:""}</div>
  ${Object.values(S.recipes).some(r=>r.kind!=="side")?"":`<div class="empty" style="margin-bottom:16px"><h3>Start with the meals you already love</h3><p>Add a few family favorites, import recipes you've found online, or have Claude suggest some. Then fill the week in one tap.</p><button class="btn primary" data-act="tab" data-t="recipes">Add recipes</button></div>`}
  <div class="days">${cards}</div>
  <div class="panel-grid">
    <section class="panel"><h3>In season in ${MONTHS[new Date().getMonth()]}</h3><p>Southern New England harvest. Recipes using these get a boost when filling the week.</p><div class="produce">${produce.map(p=>`<span>${esc(p)}</span>`).join("")}</div></section>
    <section class="panel"><h3>This week's deals</h3>${deals.length?`<ul class="deal-list">${deals.slice(0,8).map(d=>`<li><span>${esc(d.item)}</span><span class="p">${esc(d.price||"")}</span><span class="s">${esc(d.store||"")}</span></li>`).join("")}</ul>${deals.length>8?`<p>+ ${deals.length-8} more</p>`:""}`:`<p>Paste the weekly flyer from your store and recipes using sale items get flagged and favored.</p>`}<div class="row" style="margin-top:10px"><button class="btn sm" data-act="tab" data-t="family">${deals.length?"Edit deals":"Add this week's deals"}</button></div></section>
  </div>`;
}

/* ---- Recipes ---- */
function renderRecipes(){
  const ai=SAMPLE&&!AI_OFF;
  return `<div class="pagehead"><div><h1>Recipes</h1><div class="sub">${Object.keys(S.recipes).length} saved · tap one to rate it</div></div><div class="spacer"></div>
    <button class="btn" data-act="newRecipe">Add recipe</button>
    ${ai?`<button class="btn ai" data-act="importRecipe">Import from web or photo</button><button class="btn ai" data-act="discover">Discover new recipes</button>`:""}</div>
  <div class="toolbar">
    <input class="search" id="q" type="search" placeholder="Search recipes or ingredients" value="${esc(S.ui.q)}" aria-label="Search recipes">
    <div class="seg" role="group" aria-label="Type">${[["all","All"],["main","Mains"],["side","Sides"]].map(([v,l])=>`<button data-act="kind" data-v="${v}" aria-pressed="${S.ui.kind===v}">${l}</button>`).join("")}</div>
    <select class="sel" id="sort" aria-label="Sort">${[["fav","Family favorites"],["season","In season"],["sale","On sale this week"],["quick","Quickest"],["ease","Easiest to cook"],["cleanup","Easiest cleanup"],["left","Best leftovers"],["health","Lightest (calories)"],["new","Newest"]].map(([v,l])=>`<option value="${v}"${S.ui.sort===v?" selected":""}>${l}</option>`).join("")}</select>
  </div>
  <div id="grid"></div>`;
}
function renderGrid(){
  const g=$("#grid");if(!g)return;
  const q=S.ui.q.trim().toLowerCase();
  let list=Object.entries(S.recipes).filter(([,r])=>S.ui.kind==="all"||(r.kind||"main")===S.ui.kind);
  if(q)list=list.filter(([,r])=>(r.name+" "+(r.tags||[]).join(" ")+" "+(r.ingredients||[]).map(i=>i.item).join(" ")).toLowerCase().includes(q));
  const key={
    fav:([id])=>-(fam(id)??0),season:([,r])=>-(seasonHits(r).length+((r.seasons||[]).includes(season())?1:0)),
    sale:([,r])=>-dealHits(r).length,quick:([,r])=>totalMin(r)||999,ease:([id])=>-(avgAttr(id,"ease")??0),
    cleanup:([id])=>-(avgAttr(id,"cleanup")??0),left:([id,r])=>-(avgAttr(id,"leftovers")??(r.leftoverFriendly?3.5:0)),
    health:([,r])=>r.nutrition?.calories||9999,new:([,r])=>-(r.createdAt||0)
  }[S.ui.sort];
  list.sort((a,b)=>key(a)-key(b)||a[1].name.localeCompare(b[1].name));
  if(!Object.keys(S.recipes).length){g.innerHTML=`<div class="empty"><h3>No recipes yet</h3><p>Type in a family favorite, paste one from a website, or snap a photo of a cookbook page.</p><div class="row" style="justify-content:center"><button class="btn primary" data-act="newRecipe">Add recipe</button>${SAMPLE&&!AI_OFF?`<button class="btn ai" data-act="importRecipe">Import from web or photo</button>`:""}</div></div>`;return}
  if(!list.length){g.innerHTML=`<div class="empty"><h3>Nothing matches</h3><p>Try a different search or switch between mains and sides.</p></div>`;return}
  g.innerHTML=`<div class="grid">${list.map(([id,r])=>`<button class="rcard" data-act="openRecipe" data-id="${esc(id)}"><span class="rk ${r.kind==="side"?"side":""}">${r.simple?"Simple "+(r.kind==="side"?"side":"main"):(r.kind==="side"?"Side":"Main")}${totalMin(r)?" · "+totalMin(r)+" min":""}${r.nutrition?.calories?" · "+Math.round(r.nutrition.calories)+" cal":""}</span><span class="rn">${esc(r.name)}</span><span class="rmeta">${scoreHtml(id)}</span><span class="badges">${badgesHtml(id,r)}</span></button>`).join("")}</div>`;
}

/* ---- Grocery ---- */
function groceryItems(){
  const days=S.plan.days||{},map=new Map(),checks=S.grocery.checks||{};
  const add=(key,base)=>{if(!map.has(key))map.set(key,{key,amounts:{},text:[],from:new Set(),...base});return map.get(key)};
  for(const d of weekDates(S.week)){
    const day=days[ymd(d)];if(!day||day.special)continue;
    for(const id of [day.main,...(day.sides||[])].filter(Boolean)){
      const r=S.recipes[id];if(!r)continue;
      for(const ing of r.ingredients||[]){
        const n=norm(ing.item);if(!n)continue;
        const e=add("r:"+n,{name:displayName(ing.item),aisle:ing.aisle||guessAisle(ing.item),source:"recipe"});
        const q=qtyNum(ing.qty);
        if(q!=null){const u=ing.unit||"";e.amounts[u]=(e.amounts[u]||0)+q}else if(ing.qty)e.text.push([ing.qty,ing.unit].filter(Boolean).join(" "));
        e.from.add(r.name);
      }
    }
  }
  const extraSt=S.grocery.addStaples||{};
  for(const s of S.staples.items||[]){
    if(!s||!(s.every||extraSt[s.id]))continue;
    const n=norm(s.name),ex=map.get("r:"+n);
    if(ex){ex.from.add("Staple");continue}
    add("s:"+s.id,{name:s.name,aisle:s.aisle||guessAisle(s.name),source:"staple"}).from.add("Staple");
  }
  for(const x of S.grocery.extras||[]){if(x)add("x:"+x.id,{name:x.name,aisle:x.aisle||guessAisle(x.name),source:"extra",xid:x.id}).from.add("Added")}
  return [...map.values()].map(e=>{
    const c=checks[e.key]||{};
    const amt=[...Object.entries(e.amounts).map(([u,n])=>fmtQty(n)+(u?" "+u:"")),...e.text].join(" + ");
    return {...e,amt,from:[...e.from],have:!!c.have,got:!!c.got,deal:dealFor(e.name)};
  });
}
function renderGrocery(){
  const items=groceryItems(),need=items.filter(i=>!i.have),have=items.filter(i=>i.have);
  const got=need.filter(i=>i.got).length,pct=need.length?Math.round(got/need.length*100):0;
  const byAisle={};need.forEach(i=>(byAisle[i.aisle]||(byAisle[i.aisle]=[])).push(i));
  const row=i=>`<li class="gi${i.got?" got":""}"><input type="checkbox" data-act="got" data-key="${esc(i.key)}" ${i.got?"checked":""} aria-label="In cart: ${esc(i.name)}"><span class="nm">${esc(i.name)}${i.amt?`<span class="amt">${esc(i.amt)}</span>`:""}</span>
    <span>${i.source==="extra"?`<button class="icon-btn" data-act="rmExtra" data-id="${esc(i.xid)}" aria-label="Remove ${esc(i.name)}">✕</button>`:""}<button class="have${i.have?" on":""}" data-act="have" data-key="${esc(i.key)}">${i.have?"At home ✓":"Have it"}</button></span>
    <span class="from">${esc(i.from.join(", "))}${i.deal?`<span class="b sale">Sale ${esc(i.deal.price||"")}${i.deal.store?" @ "+esc(i.deal.store):""}</span>`:""}</span></li>`;
  const staples=(S.staples.items||[]).filter(Boolean),addSt=S.grocery.addStaples||{};
  const dates=weekDates(S.week);
  return `<div class="pagehead"><div><h1>Grocery list</h1><div class="sub">For ${dates[0].toLocaleDateString(undefined,{month:"short",day:"numeric"})} – ${dates[6].toLocaleDateString(undefined,{month:"short",day:"numeric"})} · tap “Have it” for anything already in the house</div></div><div class="spacer"></div>
    <button class="btn" data-act="copyList">Copy list</button><button class="btn ghost" data-act="newTrip">Start new trip</button></div>
  <div class="gwrap"><div>
    <div class="addline"><input id="extraName" placeholder="Add something (e.g. birthday candles)" aria-label="Item name"><select class="sel" id="extraAisle" aria-label="Aisle"><option value="">Auto aisle</option>${AISLES.map(a=>`<option>${a}</option>`).join("")}</select><button class="btn primary" data-act="addExtra">Add</button></div>
    ${need.length?`<div class="row" style="font-size:.9rem;color:var(--muted)"><span>${got} of ${need.length} in the cart</span></div><div class="progress"><span style="width:${pct}%"></span></div>`:""}
    ${need.length?AISLES.filter(a=>byAisle[a]).map(a=>`<section class="aisle"><h3><span>${a}</span><span>${byAisle[a].length}</span></h3><ul class="glist">${byAisle[a].sort((x,y)=>x.got-y.got||x.name.localeCompare(y.name)).map(row).join("")}</ul></section>`).join(""):`<div class="empty"><h3>Nothing to buy yet</h3><p>Plan some dinners and their ingredients land here automatically, grouped by aisle. Staples you mark “every week” show up too.</p><button class="btn primary" data-act="tab" data-t="plan">Plan the week</button></div>`}
    ${have.length?`<details class="athome"><summary>Already at home (${have.length})</summary><ul class="glist">${have.map(row).join("")}</ul></details>`:""}
  </div>
  <aside class="panel"><h3>House staples</h3><p>Things you buy regardless of dinners. “Every week” keeps them on the list; “This week” adds them once.</p>
    ${staples.length?staples.map(s=>`<div class="staple"><span class="nm">${esc(s.name)}</span><button class="tog${s.every?" on":""}" data-act="stapleEvery" data-id="${esc(s.id)}" aria-pressed="${!!s.every}">Every week</button><button class="tog${!s.every&&addSt[s.id]?" on":""}" data-act="stapleWeek" data-id="${esc(s.id)}" ${s.every?"disabled":""} aria-pressed="${!!addSt[s.id]}">This week</button><button class="icon-btn" data-act="rmStaple" data-id="${esc(s.id)}" aria-label="Remove ${esc(s.name)}">✕</button></div>`).join(""):`<div class="row" style="margin:8px 0"><button class="btn sm" data-act="commonStaples">Add common staples</button></div>`}
    <div class="addline" style="margin:12px 0 0"><input id="stapleName" placeholder="Add a staple" aria-label="Staple name"><button class="btn sm primary" data-act="addStaple">Add</button></div>
  </aside></div>`;
}

/* ---- Family & deals ---- */
function renderFamily(){
  const ms=members(),deals=S.deals.items||[];
  return `<div class="pagehead"><div><h1>Family &amp; deals</h1><div class="sub">Who's voting, and what's on sale this week</div></div><div class="spacer"></div><button class="btn ghost" data-act="logout">Sign out on this device</button></div>
  <div class="panel-grid" style="margin-top:0">
    <section class="panel"><h3>Family members</h3><p>Everyone gets their own ratings. Pick your name in “Rating as” at the top before voting — handy on a shared kitchen tablet.</p>
      ${ms.map(m=>`<div class="member"><span class="avatar" style="background:${memberColor(m.id)}">${esc(m.name.slice(0,1).toUpperCase())}</span><span style="flex:1">${esc(m.name)}${m.id===S.me?' <span class="b season">you</span>':""}</span><span class="hint" style="margin:0">${Object.values(S.reviews).filter(r=>r?.byMember?.[m.id]).length} ratings</span><button class="icon-btn" data-act="rmMember" data-id="${esc(m.id)}" aria-label="Remove ${esc(m.name)}">✕</button></div>`).join("")}
      <div class="addline" style="margin:12px 0 0"><input id="memberName" placeholder="Name (e.g. Mom, Steve, Grace)" aria-label="Family member name"><button class="btn primary" data-act="addMember">Add</button></div>
    </section>
    <section class="panel"><h3>Weekly deals for ${weekDates(S.week)[0].toLocaleDateString(undefined,{month:"short",day:"numeric"})}</h3>
      <p>Copy the sale items from your store's weekly flyer or app (Stop &amp; Shop, Big Y, ShopRite, Aldi…) and paste them here. One per line works well, like “Chicken thighs $1.99/lb – Big Y”.</p>
      <textarea class="ta" id="dealText" placeholder="Paste flyer text here">${esc(S.deals.text||"")}</textarea>
      <div class="row" style="margin-top:10px">${SAMPLE&&!AI_OFF?`<button class="btn ai" data-act="readDeals">Read deals with Claude</button>`:""}<button class="btn" data-act="readDealsPlain">Save lines as deals</button>${deals.length?`<button class="btn ghost danger" data-act="clearDeals">Clear deals</button>`:""}</div>
      <div id="dealStatus"></div>
      ${deals.length?`<ul class="deal-list" style="margin-top:14px">${deals.map((d,i)=>`<li><span style="flex:1">${esc(d.item)}</span><span class="p">${esc(d.price||"")}</span><span class="s">${esc(d.store||"")}</span><button class="icon-btn" data-act="rmDeal" data-i="${i}" aria-label="Remove">✕</button></li>`).join("")}</ul>`:""}
    </section>
  </div>`;
}

/* ---- Takeout ---- */
function safeUrl(u){u=String(u||"").trim();if(!u)return "";if(/^https?:\/\//i.test(u))return u;if(/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(u))return "https://"+u;return ""}
function menuSearchUrl(r){return "https://www.google.com/search?q="+encodeURIComponent([r.name,r.town,"menu"].filter(Boolean).join(" "))}
function telLink(p){const d=String(p||"").replace(/[^\d+]/g,"");return d.length>=7?"tel:"+d:""}
function fansOf(r){return Object.entries(r.fans||{}).filter(([m,v])=>v&&memberById(m)).map(([m])=>m)}
function sortedRests(){return Object.entries(S.restaurants).sort((a,b)=>fansOf(b[1]).length-fansOf(a[1]).length||a[1].name.localeCompare(b[1].name))}
function needMe(){if(S.me&&memberById(S.me))return true;toast(members().length?"Pick your name in “Rating as” first.":"Add family members under Family & deals first.");return false}
function copyText(text){Promise.resolve().then(()=>navigator.clipboard.writeText(text)).then(()=>toast("Copied."),()=>openModal("Copy",`<p class="hint" style="margin-top:0">Select all and copy.</p><textarea class="ta" style="min-height:240px" readonly>${esc(text)}</textarea>`,b=>{const t=b.querySelector("textarea");t.focus();t.select()}))}
function restLinks(r){const m=safeUrl(r.menuUrl),o=safeUrl(r.orderUrl),t=telLink(r.phone);return `<div class="links"><a href="${esc(m||menuSearchUrl(r))}" target="_blank" rel="noopener noreferrer">${m?"Menu":"Find menu"} ↗</a>${o?`<a href="${esc(o)}" target="_blank" rel="noopener noreferrer">Order online ↗</a>`:""}${t?`<a href="${esc(t)}">Call</a>`:""}</div>`}
function takeoutDayHtml(k,day){
  const r=day.restaurant&&S.restaurants[day.restaurant];
  if(!r)return `<div class="takeout"><span class="nm">🥡 Takeout night</span><button class="btn sm" data-act="pickTakeout" data-date="${k}">Choose restaurant</button></div>`;
  const orders=Object.entries(day.orders||{}).filter(([m,v])=>v&&memberById(m));
  return `<div class="takeout"><span class="nm">🥡 ${esc(r.name)}</span>${restLinks(r)}${orders.length?`<ul>${orders.map(([m,v])=>`<li><b>${esc(memberById(m).name)}:</b> ${esc(v)}</li>`).join("")}</ul>`:""}<button class="btn sm" data-act="openOrders" data-date="${k}">${orders.length?"Edit orders":"Who wants what?"}</button></div>`;
}
function renderTakeout(){
  const list=sortedRests(),near="https://www.google.com/maps/search/"+encodeURIComponent("takeout restaurants near me");
  const head=`<div class="pagehead"><div><h1>Takeout</h1><div class="sub">The family's go-to spots and what everyone orders</div></div><div class="spacer"></div><a class="btn" href="${near}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">Find takeout nearby ↗</a><button class="btn primary" data-act="newRestaurant">Add restaurant</button></div>`;
  if(!list.length)return head+`<div class="empty"><h3>Add your favorite takeout spots</h3><p>Save the places your family orders from, link their menus, and let everyone add the dishes they always get. Then pick one for takeout night on the weekly plan.</p><button class="btn primary" data-act="newRestaurant">Add restaurant</button></div>`;
  return head+`<div class="rests">${list.map(([id,r])=>restCard(id,r)).join("")}</div>`;
}
function restCard(id,r){
  const fans=fansOf(r),mine=!!(r.fans||{})[S.me],meals=(r.meals||[]).filter(Boolean),me=memberById(S.me);
  return `<article class="rest"><div><h3>${esc(r.name)}</h3><div class="cu">${esc([r.cuisine,r.town].filter(Boolean).join(" · "))}</div></div>
  ${restLinks(r)}
  <div class="fans"><button class="heart" data-act="fanToggle" data-id="${esc(id)}" aria-pressed="${mine}">${mine?"♥ Favorite":"♡ Favorite"}</button>${fans.map(m=>`<span class="avatar" style="background:${memberColor(m)}" title="${esc(memberById(m).name)}">${esc(memberById(m).name.slice(0,1).toUpperCase())}</span>`).join("")}${fans.length?`<span class="hint" style="margin:0 0 0 4px">${esc(fans.map(m=>memberById(m).name).join(", "))}</span>`:""}</div>
  <div><b style="font-size:.92rem">Favorite orders</b>${meals.length?`<ul class="meals">${meals.map(m=>`<li><span>${esc(m.name)}</span><span class="by">${esc(memberById(m.by)?.name||"")}</span><button class="icon-btn" data-act="rmMeal" data-id="${esc(id)}" data-mid="${esc(m.id)}" aria-label="Remove ${esc(m.name)}">✕</button></li>`).join("")}</ul>`:`<p class="hint">None yet.</p>`}
  <div class="addline" style="margin:8px 0 0"><input id="meal-${esc(id)}" data-enter="addMeal" data-id="${esc(id)}" placeholder="${me?esc("Add "+me.name+"'s go-to order"):"Pick your name in “Rating as” to add"}" aria-label="Favorite order"><button class="btn sm" data-act="addMeal" data-id="${esc(id)}">Add</button></div></div>
  ${r.notes?`<p class="hint" style="margin:0">${esc(r.notes)}</p>`:""}
  <div class="row"><button class="btn sm ghost" data-act="editRestaurant" data-id="${esc(id)}">Edit</button><span class="spacer"></span><button class="btn sm ghost danger" data-act="delRestaurant" data-id="${esc(id)}">Delete</button></div></article>`;
}
function openTakeoutPicker(date){
  const label=parseYmd(date).toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"});
  openModal("Takeout for "+label,`<div class="pick">${sortedRests().map(([id,r])=>`<button data-act="setTakeout" data-date="${date}" data-id="${esc(id)}"><span><span class="nm">${esc(r.name)}</span><span class="hint" style="display:block;margin:0">${esc([r.cuisine,fansOf(r).length?"♥ "+fansOf(r).map(m=>memberById(m).name).join(", "):""].filter(Boolean).join(" · "))}</span></span><span class="rmeta" style="flex:none">${(r.meals||[]).filter(Boolean).length} favorite orders</span></button>`).join("")||`<p class="hint">No restaurants saved yet.</p>`}</div>
  <div class="row" style="margin-top:12px"><button class="btn sm" data-act="newRestaurant" data-date="${date}">Add a restaurant</button><button class="btn sm ghost" data-act="setSpecial" data-date="${date}" data-v="takeout">Decide later</button></div>`);
}
function openRestEditor(id,date){
  const r=(id&&S.restaurants[id])||{};
  openModal(id?"Edit restaurant":"Add restaurant",`<label class="lb" for="rname">Name</label><input class="in" id="rname" data-autofocus value="${esc(r.name||"")}" placeholder="Romeo's Pizza">
  <div class="cols"><div><label class="lb" for="rcui">Type of food</label><input class="in" id="rcui" value="${esc(r.cuisine||"")}" placeholder="Pizza, Thai, Chinese…"></div><div><label class="lb" for="rtown">Town</label><input class="in" id="rtown" value="${esc(r.town||"")}" placeholder="Madison"></div></div>
  <label class="lb" for="rmenu">Menu link</label><input class="in" id="rmenu" value="${esc(r.menuUrl||"")}" placeholder="https://…">
  <p class="hint">Paste the link to their menu page. If you leave it blank, the app links a menu search instead. <a id="menuSearch" href="#" target="_blank" rel="noopener noreferrer">Search for this menu ↗</a></p>
  <label class="lb" for="rorder">Online ordering link (optional)</label><input class="in" id="rorder" value="${esc(r.orderUrl||"")}" placeholder="Their site, DoorDash, Grubhub…">
  <label class="lb" for="rphone">Phone (optional)</label><input class="in" id="rphone" type="tel" value="${esc(r.phone||"")}">
  <label class="lb" for="rnotes">Notes (optional)</label><input class="in" id="rnotes" value="${esc(r.notes||"")}" placeholder="Closed Mondays, ask for extra sauce…">
  <div class="row" style="margin-top:16px"><button class="btn primary" data-act="saveRestaurant" data-id="${esc(id||"")}" data-date="${esc(date||"")}">Save restaurant</button><button class="btn ghost" data-close>Cancel</button></div>`,b=>{
    b.querySelectorAll("[data-close]").forEach(x=>x.onclick=closeModal);
    const upd=()=>{b.querySelector("#menuSearch").href=menuSearchUrl({name:b.querySelector("#rname").value.trim()||"restaurant",town:b.querySelector("#rtown").value.trim()})};
    b.querySelector("#rname").addEventListener("input",upd);b.querySelector("#rtown").addEventListener("input",upd);upd();
  });
}
function openOrders(date){
  const day=(S.plan.days||{})[date]||{},r=S.restaurants[day.restaurant];if(!r)return;
  const ms=members(),meals=(r.meals||[]).filter(Boolean);
  if(!ms.length){toast("Add family members under Family & deals first.");return}
  openModal("Orders from "+r.name,`${restLinks(r)}<datalist id="mealOpts">${[...new Set(meals.map(m=>m.name))].map(n=>`<option value="${esc(n)}">`).join("")}</datalist>
  ${ms.map(m=>{const mine=meals.filter(x=>x.by===m.id).map(x=>x.name);return `<label class="lb" for="ord-${esc(m.id)}">${esc(m.name)}${mine.length?` <span class="hint" style="font-weight:400">usually gets ${esc(mine.join(", "))}</span>`:""}</label><input class="in" id="ord-${esc(m.id)}" data-mid="${esc(m.id)}" list="mealOpts" value="${esc((day.orders||{})[m.id]||"")}" placeholder="${esc(mine[0]||"What do you want?")}">`}).join("")}
  <div class="row" style="margin-top:16px"><button class="btn primary" data-act="saveOrders" data-date="${date}">Save orders</button><button class="btn" data-act="copyOrder" data-date="${date}">Copy order</button></div>`);
}

/* ============ Modals ============ */
let MODAL_CTL=null;
function openModal(title,html,mount){
  const m=$("#modal");MODAL_CTL?.abort();MODAL_CTL=null;
  m.innerHTML=`<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="mt"><header class="sheet-h"><h2 id="mt">${esc(title)}</h2><button class="icon-btn" data-close aria-label="Close">✕</button></header><div class="sheet-b">${html}</div></div>`;
  m.hidden=false;document.body.classList.add("modal-open");
  m.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModal);
  const body=m.querySelector(".sheet-b");mount&&mount(body);
  (body.querySelector("[data-autofocus]")||m.querySelector(".sheet-h .icon-btn")).focus();
}
function closeModal(){const m=$("#modal");MODAL_CTL?.abort();MODAL_CTL=null;m.hidden=true;m.innerHTML="";document.body.classList.remove("modal-open")}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modal").hidden)closeModal()});

/* ---- Recipe detail + rating ---- */
let RF=null;
function openRecipe(id){
  const r=S.recipes[id];if(!r)return;
  const mine=(S.reviews[id]?.byMember||{})[S.me]||{};
  RF={verdict:mine.verdict||"",taste:mine.taste||0,ease:mine.ease||0,cleanup:mine.cleanup||0,leftovers:mine.leftovers||0,comment:mine.comment||""};
  const rv=revs(id),n=r.nutrition||{};
  const dates=weekDates(S.week);
  const html=`<div class="kv"><span><b>${r.kind==="side"?"Side":"Main"}</b></span>${r.servings?`<span>Serves <b>${r.servings}</b></span>`:""}${r.prepMin?`<span>Prep <b>${r.prepMin} min</b></span>`:""}${r.cookMin?`<span>Cook <b>${r.cookMin} min</b></span>`:""}${r.source?(/^https?:\/\//.test(r.source)?`<a href="${esc(r.source)}" target="_blank" rel="noopener noreferrer">Original recipe</a>`:`<span>${esc(r.source)}</span>`):""}</div>
  ${r.description?`<p style="margin-top:0">${esc(r.description)}</p>`:""}
  <div class="badges" style="margin-bottom:12px">${badgesHtml(id,r)}${seasonHits(r).length?`<span class="hint" style="margin:0">uses ${esc(seasonHits(r).join(", "))}</span>`:""}</div>
  <div class="row"><select class="sel" id="planDay" aria-label="Night">${dates.map(d=>`<option value="${ymd(d)}">${d.toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})}</option>`).join("")}</select><button class="btn primary" data-act="addToDay" data-id="${esc(id)}">${r.kind==="side"?"Add as side":"Plan for this night"}</button>
  ${r.kind!=="side"&&SAMPLE&&!AI_OFF?`<button class="btn ai" data-act="suggestSides" data-id="${esc(id)}">Suggest sides</button>`:""}</div>

  <h3>Family ratings</h3>
  ${rv.length?`<ul class="fam">${rv.map(([mid,x])=>`<li><span class="avatar" style="background:${memberColor(mid)}">${esc((memberById(mid)?.name||"?").slice(0,1).toUpperCase())}</span><div><b>${esc(memberById(mid)?.name||"")}</b> ${x.verdict?VERDICT[x.verdict].e+" "+VERDICT[x.verdict].label:""}<div class="c">${ATTRS.filter(([k])=>x[k]).map(([k,l])=>`${l} ${x[k]}/5`).join(" · ")}</div>${x.comment?`<div>“${esc(x.comment)}”</div>`:""}</div></li>`).join("")}</ul>
  <div class="bars">${ATTRS.map(([k,l])=>{const a=avgAttr(id,k);return a==null?"":`<span>${l}</span><span class="bar"><span style="width:${a/5*100}%"></span></span><b>${a.toFixed(1)}</b>`}).join("")}</div>`:`<p class="hint">No one has rated this yet.</p>`}

  <div class="rate" id="rateBox">${S.me&&memberById(S.me)?rateForm(id):`<b>Who's rating?</b><p class="hint">${members().length?"Pick your name in “Rating as” at the top of the page, then reopen this recipe.":"Add your family members first so everyone can vote."}</p>${members().length?"":`<button class="btn sm" data-act="goFamily">Add family members</button>`}`}</div>

  <div class="cols">
    <div><h3>${r.simple?"What to buy":"Ingredients"}</h3><ul class="ing">${(r.ingredients||[]).map(i=>`<li><span class="q">${esc([i.qty,i.unit].filter(Boolean).join(" "))}</span>${esc(i.item)}${dealFor(i.item)?` <span class="b sale">Sale ${esc(dealFor(i.item).price||"")}</span>`:""}</li>`).join("")||'<li class="hint">None listed</li>'}</ul></div>
    <div><h3>Nutrition <span class="hint">per serving, estimated</span></h3>${n.calories!=null?`<table class="nut"><tr><td>Calories</td><td>${Math.round(n.calories)}</td></tr>${[["protein_g","Protein","g"],["carbs_g","Carbs","g"],["fat_g","Fat","g"],["fiber_g","Fiber","g"],["sodium_mg","Sodium","mg"]].map(([k,l,u])=>n[k]!=null?`<tr><td>${l}</td><td>${Math.round(n[k])} ${u}</td></tr>`:"").join("")}</table>`:`<p class="hint">Not added yet.${SAMPLE&&!AI_OFF?" Edit the recipe to estimate it with Claude.":""}</p>`}</div>
  </div>
  ${(r.steps||[]).length?`<h3>Steps</h3><ol class="steps">${r.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol>`:""}
  ${(r.tags||[]).length?`<p class="hint" style="margin-top:14px">Tags: ${esc(r.tags.join(", "))}</p>`:""}
  <div class="row" style="margin-top:18px;border-top:1px solid var(--line);padding-top:14px"><button class="btn" data-act="editRecipe" data-id="${esc(id)}">Edit recipe</button><span class="spacer"></span><button class="btn ghost danger" data-act="delRecipe" data-id="${esc(id)}">Delete</button></div>`;
  openModal(r.name,html,b=>{const t=ymd(new Date());const sel=b.querySelector("#planDay");if(sel&&[...sel.options].some(o=>o.value===t))sel.value=t});
}
function rateForm(id){
  const name=memberById(S.me)?.name||"";
  return `<b>Your rating, ${esc(name)}</b><div class="verdicts" style="margin-top:8px">${Object.entries(VERDICT).map(([k,v])=>`<button data-act="rf" data-k="verdict" data-v="${k}" aria-pressed="${RF.verdict===k}">${v.e} ${v.label}</button>`).join("")}</div>
  ${ATTRS.map(([k,l,h])=>`<div class="scale"><span class="lbl">${l}<small>${h}</small></span><span class="dots" role="group" aria-label="${l}">${[1,2,3,4,5].map(v=>`<button data-act="rf" data-k="${k}" data-v="${v}" aria-pressed="${RF[k]===v}">${v}</button>`).join("")}</span></div>`).join("")}
  <label class="lb" for="rfc">Comment</label><input class="in" id="rfc" maxlength="240" placeholder="Less spicy next time, double the sauce…" value="${esc(RF.comment)}">
  <div class="row" style="margin-top:10px"><button class="btn primary" data-act="saveRating" data-id="${esc(id)}">Save rating</button>${(S.reviews[id]?.byMember||{})[S.me]?`<button class="btn ghost" data-act="clearRating" data-id="${esc(id)}">Remove my rating</button>`:""}</div>`;
}

/* ---- Recipe editor ---- */
function openEditor(id,draft){
  const r=draft||(id&&S.recipes[id])||{kind:"main",servings:4,ingredients:[],steps:[]};
  const n=r.nutrition||{};
  const html=`<label class="lb" for="ename">Name</label><input class="in" id="ename" data-autofocus value="${esc(r.name||"")}" placeholder="Grandma's chicken pot pie">
  <div class="row" style="margin-top:10px;gap:14px">
    <div class="seg" role="group" aria-label="Type"><button data-act="ekind" data-v="main" aria-pressed="${r.kind!=="side"}">Main</button><button data-act="ekind" data-v="side" aria-pressed="${r.kind==="side"}">Side</button></div>
    <label>Serves <input class="in" id="eserv" type="number" min="1" style="width:72px;display:inline-block" value="${esc(r.servings||4)}"></label>
    <label>Prep <input class="in" id="eprep" type="number" min="0" style="width:72px;display:inline-block" value="${esc(r.prepMin??"")}"> min</label>
    <label>Cook <input class="in" id="ecook" type="number" min="0" style="width:72px;display:inline-block" value="${esc(r.cookMin??"")}"> min</label>
  </div>
  <label class="lb" for="esrc">Source (link or cookbook)</label><input class="in" id="esrc" value="${esc(r.source||"")}" placeholder="https://… or “Joy of Cooking p. 212”">
  <label class="lb" for="edesc">Short description</label><input class="in" id="edesc" value="${esc(r.description||"")}">
  <label class="lb" for="eing">Ingredients, one per line</label><textarea class="ta" id="eing" style="min-height:160px" placeholder="2 lb chicken thighs&#10;1 cup rice&#10;3 cloves garlic, minced">${esc((r.ingredients||[]).map(ingToLine).join("\n"))}</textarea>
  <p class="hint">Write the amount first, then the ingredient. Anything after a comma is treated as prep and ignored on the grocery list.</p>
  <label class="lb" for="esteps">Steps, one per line</label><textarea class="ta" id="esteps">${esc((r.steps||[]).join("\n"))}</textarea>
  <label class="lb" for="etags">Tags (comma separated)</label><input class="in" id="etags" value="${esc((r.tags||[]).join(", "))}" placeholder="weeknight, slow cooker, kid-friendly">
  <label style="display:flex;gap:8px;align-items:center;margin-top:12px"><input type="checkbox" id="esimple" ${r.simple?"checked":""}> Simple food, no recipe needed (hot dogs, frozen pizza)</label>
  <label style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="checkbox" id="eleft" ${r.leftoverFriendly?"checked":""}> Usually good as leftovers</label>
  <h3>Nutrition per serving</h3>
  <div class="row">${[["calories","Calories"],["protein_g","Protein g"],["carbs_g","Carbs g"],["fat_g","Fat g"],["fiber_g","Fiber g"],["sodium_mg","Sodium mg"]].map(([k,l])=>`<label style="font-size:.88rem">${l}<input class="in" data-nut="${k}" type="number" min="0" style="width:96px;display:block" value="${esc(n[k]??"")}"></label>`).join("")}</div>
  ${SAMPLE&&!AI_OFF?`<div class="row" style="margin-top:10px"><button class="btn sm ai" data-act="estNut">Estimate nutrition with Claude</button><span id="nutStatus" class="hint"></span></div>`:""}
  <div class="row" style="margin-top:18px"><button class="btn primary" data-act="saveRecipe" data-id="${esc(id||"")}">Save recipe</button><button class="btn ghost" data-close>Cancel</button></div>`;
  openModal(id?"Edit recipe":draft?"Check the import":"New recipe",html,b=>{
    b.dataset.kind=r.kind==="side"?"side":"main";
    b._aisles=Object.fromEntries((r.ingredients||[]).map(i=>[norm(i.item),i.aisle]));
    b._seasons=r.seasons||[];
    b.querySelectorAll("[data-close]").forEach(x=>x.onclick=closeModal);
  });
}
function readEditor(){
  const b=$("#modal .sheet-b"),v=s=>b.querySelector(s).value.trim(),num=s=>{const x=parseFloat(v(s));return Number.isFinite(x)?x:null};
  const ings=v("#eing").split("\n").map(parseIngLine).filter(Boolean).map(i=>({...i,aisle:b._aisles[norm(i.item)]||i.aisle}));
  const nutrition={};b.querySelectorAll("[data-nut]").forEach(i=>{const x=parseFloat(i.value);if(Number.isFinite(x))nutrition[i.dataset.nut]=x});
  return {name:v("#ename"),kind:b.dataset.kind,servings:num("#eserv")||4,prepMin:num("#eprep"),cookMin:num("#ecook"),source:v("#esrc"),description:v("#edesc"),
    ingredients:ings,steps:v("#esteps").split("\n").map(s=>s.replace(/^\s*\d+[.)]\s*/,"").trim()).filter(Boolean),
    tags:v("#etags").split(",").map(s=>s.trim()).filter(Boolean),leftoverFriendly:b.querySelector("#eleft").checked,simple:b.querySelector("#esimple").checked,
    nutrition:Object.keys(nutrition).length?nutrition:null,seasons:b._seasons||[]};
}
async function saveRecipe(id,r){
  const rid=id||uid(),prev=S.recipes[rid];
  await docSet("recipes/"+rid,{...r,createdAt:prev?.createdAt||Date.now(),updatedAt:Date.now()});
  return rid;
}

/* ---- Pickers ---- */
function openPicker(date,side){
  const d=parseYmd(date),label=d.toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"});
  const day=(S.plan.days||{})[date]||{};
  const list=Object.entries(S.recipes).filter(([,r])=>side?r.kind==="side":r.kind!=="side")
    .filter(([id])=>!(side&&(day.sides||[]).includes(id)))
    .sort((a,b)=>(fam(b[0])??0)-(fam(a[0])??0)||a[1].name.localeCompare(b[1].name));
  const html=`${side?"":`<div class="row" style="margin-bottom:14px"><button class="btn" data-act="pickTakeout" data-date="${date}">🥡 Takeout night</button><button class="btn" data-act="setSpecial" data-date="${date}" data-v="leftovers">🍲 Leftovers</button><button class="btn" data-act="setSpecial" data-date="${date}" data-v="out">🍽 Eating out</button></div>`}
  <div class="quick"><input class="in" id="quickName" data-autofocus data-enter="quickAdd" data-date="${date}" data-side="${side?1:""}" placeholder="${side?"Something simple: chips, baby carrots":"Something simple: hot dogs, buns, relish"}" aria-label="Add a simple food"><button class="btn primary" data-act="quickAdd" data-date="${date}" data-side="${side?1:""}">Add</button></div>
  <p class="hint" style="margin:-6px 0 14px">No recipe needed. Put the food first, then anything else to buy, separated by commas. Or pick a saved one below.</p>
  <input class="in" id="pq" data-autofocus placeholder="Search" style="margin-bottom:10px" aria-label="Search">
  <div class="pick" id="plist">${list.map(([id,r])=>`<button data-act="${side?"addSide":"setMain"}" data-date="${date}" data-id="${esc(id)}" data-s="${esc((r.name+" "+(r.ingredients||[]).map(i=>i.item).join(" ")).toLowerCase())}"><span><span class="nm">${esc(r.name)}</span><span class="badges" style="margin-top:4px">${badgesHtml(id,r)}</span></span><span class="rmeta" style="flex:none">${fam(id)!=null?`<span class="score">★ ${fam(id).toFixed(1)}</span>`:""}${totalMin(r)?`<span>${totalMin(r)}m</span>`:""}</span></button>`).join("")||`<p class="hint">No ${side?"sides":"mains"} saved yet.</p>`}</div>
  <div class="row" style="margin-top:12px"><button class="btn sm" data-act="newRecipe">Add a new ${side?"side":"recipe"}</button>${side&&day.main&&SAMPLE&&!AI_OFF?`<button class="btn sm ai" data-act="suggestSides" data-id="${esc(day.main)}" data-date="${date}">Suggest sides</button>`:""}</div>`;
  openModal((side?"Side for ":"Dinner for ")+label,html,b=>{
    b.querySelector("#pq").oninput=e=>{const q=e.target.value.toLowerCase();b.querySelectorAll("#plist button").forEach(x=>x.hidden=!x.dataset.s.includes(q))};
  });
}

/* ============ Claude-powered features ============ */
const RECIPE_SHAPE=`{"name":string,"kind":"main"|"side","description":string (one sentence),"servings":number,"prepMin":number,"cookMin":number,"ingredients":[{"qty":string,"unit":string,"item":string,"aisle":one of ${JSON.stringify(AISLES)}}],"steps":[string],"nutrition":{"calories":number,"protein_g":number,"carbs_g":number,"fat_g":number,"fiber_g":number,"sodium_mg":number},"tags":[string] (up to 5),"seasons":["spring"|"summer"|"fall"|"winter"|"any"],"leftoverFriendly":boolean}`;
const RECIPE_RULES=`Rules: "item" is the plain ingredient name, with any prep after a comma (e.g. "yellow onion, diced"). "unit" is "" for counted whole items. "qty" is a string like "1 1/2". Nutrition is your best per-serving estimate. Steps are short, plain sentences without numbering.`;
function cleanRecipe(x,src){
  const num=v=>{const n=Number(v);return Number.isFinite(n)&&n>=0?n:null};
  const nu=x&&x.nutrition||{},nutrition={};
  for(const k of ["calories","protein_g","carbs_g","fat_g","fiber_g","sodium_mg"]){const v=num(nu[k]);if(v!=null)nutrition[k]=v}
  return {name:String(x?.name||"Untitled recipe").slice(0,120),kind:x?.kind==="side"?"side":"main",description:String(x?.description||"").slice(0,300),
    servings:num(x?.servings)||4,prepMin:num(x?.prepMin),cookMin:num(x?.cookMin),
    ingredients:(Array.isArray(x?.ingredients)?x.ingredients:[]).slice(0,60).map(i=>({qty:String(i?.qty??"").slice(0,24),unit:String(i?.unit??"").slice(0,20),item:String(i?.item??"").slice(0,140),aisle:AISLES.includes(i?.aisle)?i.aisle:guessAisle(i?.item)})).filter(i=>i.item),
    steps:(Array.isArray(x?.steps)?x.steps:[]).slice(0,40).map(s=>String(s).slice(0,900)).filter(Boolean),
    nutrition:Object.keys(nutrition).length?nutrition:null,tags:(Array.isArray(x?.tags)?x.tags:[]).slice(0,6).map(t=>String(t).slice(0,30)),
    seasons:(Array.isArray(x?.seasons)?x.seasons:[]).filter(s=>["spring","summer","fall","winter","any"].includes(s)),
    leftoverFriendly:!!x?.leftoverFriendly,source:String(src??x?.source??"").slice(0,500)};
}
function aiErr(e){
  const c=e&&e.code;
  if(["ai_not_configured"].includes(c)){AI_OFF=true;render();return "Claude suggestions are off. Add ANTHROPIC_API_KEY in Vercel to turn them on."}
  if(c==="unauthorized")return "Sign in again, then retry.";
  if(c==="network")return "Can't reach the server. Check your connection.";
  return ({rate_limited:"Too many requests right now. Wait a minute, then try again.",invalid_json:"Claude's answer came back incomplete. Try again.",refused:"Claude declined that request. Try different wording.",session_expired:"Sign in to Claude again, then retry.",prompt_too_large:"That's too much text. Paste just the recipe part.",image_rejected:"That photo couldn't be read. Try a clearer JPG or PNG.",images_unavailable:"Photos can't be sent from this view. Paste the recipe text instead.",empty_completion:"Claude returned nothing. Try again with more detail.",cancelled:"Stopped."})[c]||"Couldn't reach Claude. Try again.";
}
const thinking=(msg)=>`<div class="thinking"><span class="spin" aria-hidden="true"></span><span>${esc(msg)}</span><button class="btn sm ghost" data-act="stopAi">Stop</button></div>`;
function likesContext(){
  const rated=Object.entries(S.recipes).map(([id,r])=>({id,r,f:fam(id)})).filter(x=>x.f!=null);
  const favs=rated.filter(x=>x.f>=3.8).sort((a,b)=>b.f-a.f).slice(0,12).map(x=>`${x.r.name} (${x.r.kind}, ${x.f.toFixed(1)}/5)`);
  const nos=rated.filter(x=>x.f<2.6).slice(0,10).map(x=>x.r.name);
  const comments=Object.entries(S.reviews).flatMap(([rid,rv])=>Object.values(rv?.byMember||{}).filter(x=>x?.comment).map(x=>`${S.recipes[rid]?.name}: "${x.comment}"`)).slice(0,15);
  const unrated=Object.values(S.recipes).filter(r=>!rated.find(x=>x.r===r)).slice(0,20).map(r=>r.name);
  return `Family favorites: ${favs.join("; ")||"none rated yet"}
Disliked: ${nos.join("; ")||"none"}
Saved but unrated: ${unrated.join("; ")||"none"}
Family comments: ${comments.join(" | ")||"none"}
Month: ${MONTHS[new Date().getMonth()]} in Southern New England (Connecticut). In season locally: ${SEASON[new Date().getMonth()].join(", ")}
On sale this week: ${dealItems().map(d=>`${d.item} ${d.price||""}${d.store?" at "+d.store:""}`).join("; ")||"no deals entered"}`;
}

function openImport(){
  const html=`<p style="margin-top:0">Open the recipe online, select the whole thing (ingredients and steps), copy, and paste it below. Or add a photo of a cookbook page or recipe card.</p>
  <label class="lb" for="isrc">Recipe link (optional, saved for reference)</label><input class="in" id="isrc" placeholder="https://…">
  <label class="lb" for="itext">Recipe text</label><textarea class="ta" id="itext" data-autofocus style="min-height:180px" placeholder="Paste here"></textarea>
  <div id="imgRow" hidden><label class="lb" for="iimg">Or a photo</label><input id="iimg" type="file" accept="image/*"></div>
  <div class="row" style="margin-top:14px"><button class="btn ai" data-act="runImport">Read recipe</button></div><div id="iout"></div>`;
  openModal("Import a recipe",html,async b=>{
    const lim=await SAMPLE.limits().catch(()=>null);
    if(lim?.images){const row=b.querySelector("#imgRow");row.hidden=false;b.querySelector("#iimg").accept=lim.images.mediaTypes.join(",")}
  });
}
async function runImport(){
  const b=$("#modal .sheet-b"),text=b.querySelector("#itext").value.trim().slice(0,60000),src=b.querySelector("#isrc").value.trim(),file=b.querySelector("#iimg")?.files?.[0];
  const out=b.querySelector("#iout");
  if(!text&&!file){out.innerHTML=`<p class="err">Paste the recipe text or choose a photo first.</p>`;return}
  MODAL_CTL=new AbortController();out.innerHTML=thinking("Reading the recipe…");
  try{
    const x=await SAMPLE.json(`Convert this recipe into structured data for a family meal-planning app. Reply with ONLY one JSON object shaped like:
${RECIPE_SHAPE}
${RECIPE_RULES}
Ignore ads, life stories, comments, and navigation text.${file?" The recipe is in the attached photo.":""}
${text?"\nRecipe text:\n"+text:""}`,{signal:MODAL_CTL.signal,...(file?{images:[file]}:{})});
    const r=cleanRecipe(x,src);
    if(!r.ingredients.length){out.innerHTML=`<p class="err">Couldn't find ingredients in that. Make sure you copied the ingredient list.</p>`;return}
    openEditor(null,r);
  }catch(e){out.innerHTML=`<p class="err">${esc(aiErr(e))}</p>`}
}

let DISC=[];
function openDiscover(kind){
  const html=`<div class="row"><div class="seg" role="group" aria-label="Type"><button data-act="dkind" data-v="main" aria-pressed="${kind!=="side"}">Mains</button><button data-act="dkind" data-v="side" aria-pressed="${kind==="side"}">Sides</button></div></div>
  <label class="lb" for="dhint">Anything in particular? (optional)</label><input class="in" id="dhint" data-autofocus placeholder="30-minute weeknights, slow cooker, more fish, cheap…">
  <p class="hint">Suggestions build on what your family rates highly, skip what they disliked, and lean on local produce and this week's sale items.</p>
  <div class="row" style="margin-top:12px"><button class="btn ai" data-act="runDiscover">Find recipes</button></div><div id="dout"></div>`;
  openModal("Discover new recipes",html,b=>b.dataset.kind=kind||"main");
}
async function runDiscover(){
  const b=$("#modal .sheet-b"),kind=b.dataset.kind,hint=b.querySelector("#dhint").value.trim(),out=b.querySelector("#dout");
  MODAL_CTL=new AbortController();out.innerHTML=thinking("Thinking about what your family likes…");
  try{
    const arr=await SAMPLE.json(`You help a family in Connecticut plan dinners. Suggest 4 NEW ${kind==="side"?"side dishes":"dinner main dishes"} they are likely to love, based on their ratings below.
${likesContext()}
Already saved (do not repeat): ${Object.values(S.recipes).map(r=>r.name).join("; ").slice(0,3000)||"none"}
${hint?"Their request: "+hint:""}
Favor in-season produce and sale items when it fits. Keep them practical for a home cook.
Reply with ONLY a JSON array of 4 objects. Each object is a full recipe shaped like:
${RECIPE_SHAPE}
plus "why": one sentence on why this family would like it (mention the favorite it resembles, the season, or the deal).
${RECIPE_RULES}`,{signal:MODAL_CTL.signal,cache:false});
    DISC=(Array.isArray(arr)?arr:[]).map(x=>({r:cleanRecipe({...x,kind:x?.kind||kind},"Suggested by Claude"),why:String(x?.why||"").slice(0,300)})).filter(x=>x.r.ingredients.length);
    if(!DISC.length){out.innerHTML=`<p class="err">No usable suggestions came back. Try again.</p>`;return}
    out.innerHTML=`<h3>Ideas for you</h3>`+DISC.map((x,i)=>suggCard(x,i,"saveDisc")).join("");
  }catch(e){out.innerHTML=`<p class="err">${esc(aiErr(e))}</p>`}
}
function suggCard(x,i,act,extra=""){
  const r=x.r;
  return `<div class="sugg"><h4>${esc(r.name)}</h4><p class="why">${esc(x.why||r.description)}</p>
  <div class="kv">${totalMin(r)?`<span><b>${totalMin(r)} min</b></span>`:""}${r.nutrition?.calories?`<span><b>${Math.round(r.nutrition.calories)}</b> cal/serving</span>`:""}<span>${r.ingredients.length} ingredients</span>${seasonHits(r).length?'<span class="b season">In season</span>':""}${dealHits(r).length?'<span class="b sale">On sale</span>':""}</div>
  <details><summary class="hint" style="cursor:pointer">Ingredients</summary><p class="hint">${esc(r.ingredients.map(ingToLine).join(" · "))}</p></details>
  <div class="row" style="margin-top:8px"><button class="btn sm primary" data-act="${act}" data-i="${i}" ${extra}>Save to recipes</button></div></div>`;
}

let SIDES={main:null,date:null,lib:[],fresh:[]};
function openSides(mainId,date){
  const r=S.recipes[mainId];if(!r)return;
  SIDES={main:mainId,date:date||null,lib:[],fresh:[]};
  openModal("Sides for "+r.name,`<div id="sout">${thinking("Finding sides that go with it…")}</div>`,()=>runSides());
}
async function runSides(){
  const r=S.recipes[SIDES.main],out=$("#sout");if(!r||!out)return;
  const lib=Object.entries(S.recipes).filter(([,x])=>x.kind==="side").map(([id,x])=>`${id} | ${x.name} | ${fam(id)==null?"unrated":fam(id).toFixed(1)+"/5"}`).join("\n").slice(0,8000);
  MODAL_CTL=new AbortController();
  try{
    const x=await SAMPLE.json(`Suggest side dishes for this dinner main: "${r.name}". Its ingredients: ${(r.ingredients||[]).map(i=>i.item).join(", ")}.
${likesContext()}
The family's saved sides (id | name | rating):
${lib||"none"}
Reply with ONLY a JSON object: {"fromLibrary":[{"id":string from the list above,"why":string}] (up to 3, only good pairings, best rated first; empty if none fit), "new":[2 objects, each a full side recipe shaped like ${RECIPE_SHAPE} plus "why": one sentence]}.
New sides must not duplicate saved ones, should balance the main (e.g. add a vegetable if the main lacks one), and favor in-season produce.
${RECIPE_RULES}`,{signal:MODAL_CTL.signal,cache:false});
    SIDES.lib=(x?.fromLibrary||[]).filter(s=>s&&S.recipes[s.id]&&S.recipes[s.id].kind==="side").slice(0,3);
    SIDES.fresh=(x?.new||[]).map(s=>({r:cleanRecipe({...s,kind:"side"},"Suggested by Claude"),why:String(s?.why||"").slice(0,300)})).filter(s=>s.r.ingredients.length);
    const dateLbl=SIDES.date?parseYmd(SIDES.date).toLocaleDateString(undefined,{weekday:"short"}):"";
    out.innerHTML=(SIDES.lib.length?`<h3 style="margin-top:0">From your recipes</h3><div class="pick">${SIDES.lib.map(s=>`<button data-act="${SIDES.date?"addSide":"openRecipe"}" data-id="${esc(s.id)}" data-date="${SIDES.date||""}"><span><span class="nm">${esc(S.recipes[s.id].name)}</span><span class="hint" style="display:block;margin:0">${esc(s.why||"")}</span></span><span class="rmeta" style="flex:none">${SIDES.date?"Add to "+dateLbl:"View"}</span></button>`).join("")}</div>`:"")+
      (SIDES.fresh.length?`<h3>Something new</h3>`+SIDES.fresh.map((s,i)=>suggCard(s,i,"saveSideSugg")).join(""):"")||`<p class="err">No suggestions came back. Try again.</p>`;
  }catch(e){out.innerHTML=`<p class="err">${esc(aiErr(e))}</p>`}
}

async function readDeals(useAi){
  const ta=$("#dealText"),text=ta.value.trim(),st=$("#dealStatus");
  if(!text){st.innerHTML=`<p class="err">Paste the flyer text first.</p>`;return}
  let items;
  if(useAi){
    st.innerHTML=`<div class="thinking"><span class="spin" aria-hidden="true"></span><span>Reading the flyer…</span></div>`;
    try{
      const arr=await SAMPLE.json(`Extract grocery sale items from this store flyer text. Reply with ONLY a JSON array of objects: {"item":string (short, e.g. "Boneless chicken thighs"),"price":string (e.g. "$1.99/lb" or "BOGO"),"store":string or "","match":string (one or two lowercase words naming the base ingredient for recipe matching, singular, e.g. "chicken thigh","strawberry","cheddar")}. Skip non-food unless it's a household staple. At most 60 items.
Flyer text:
${text.slice(0,40000)}`,{modelTier:"quick"});
      items=(Array.isArray(arr)?arr:[]).slice(0,80).map(d=>({item:String(d?.item||"").slice(0,80),price:String(d?.price||"").slice(0,30),store:String(d?.store||"").slice(0,40),match:String(d?.match||d?.item||"").toLowerCase().slice(0,40)})).filter(d=>d.item);
    }catch(e){st.innerHTML=`<p class="err">${esc(aiErr(e))}</p>`;return}
  }else{
    items=text.split("\n").map(l=>l.trim()).filter(Boolean).slice(0,80).map(l=>{
      const parts=l.split(/\s+[–—-]\s+|\t|\s*\|\s*/);const price=(l.match(/\$\s?\d+(?:\.\d{2})?(?:\s*\/\s*\w+)?|bogo|\d+\s*for\s*\$\d+(?:\.\d{2})?/i)||[""])[0];
      const item=parts[0].replace(price,"").trim()||l;return {item:item.slice(0,80),price,store:(parts[2]||"").slice(0,40),match:norm(item).split(" ").slice(-2).join(" ")};
    });
  }
  await docSet("deals/"+S.week,{text,items,updatedAt:Date.now()});
  st.innerHTML=`<p class="hint">${items.length} deals saved for this week.</p>`;
}

/* ============ Plan actions ============ */
const dayPatch=(date,v)=>docUpdate("plans/"+S.week,{days:{[date]:v}});
async function fillWeek(){
  const days={...(S.plan.days||{})},used=new Set(Object.values(days).map(d=>d&&d.main).filter(Boolean));
  const mains=Object.entries(S.recipes).filter(([,r])=>r.kind!=="side");
  const sides=Object.entries(S.recipes).filter(([,r])=>r.kind==="side");
  if(!mains.length){toast("Add some main dishes first.");S.tab="recipes";lsSet("wfd-tab","recipes");render();return}
  const patch={};let prevSide=null,filled=0;
  for(const d of weekDates(S.week)){
    const k=ymd(d);if(days[k])continue;
    let pool=mains.filter(([id])=>!used.has(id));if(!pool.length){used.clear();pool=mains}
    const [mid]=pool.map(([id,r])=>[id,planScore(id,r)]).sort((a,b)=>b[1]-a[1])[0];
    used.add(mid);
    const sp=sides.filter(([id])=>id!==prevSide).map(([id,r])=>[id,planScore(id,r)]).sort((a,b)=>b[1]-a[1]);
    const sid=sp.length?sp[0][0]:null;prevSide=sid;
    patch[k]={main:mid,sides:sid?[sid]:[],special:null};filled++;
  }
  if(!filled)return;
  await docUpdate("plans/"+S.week,{days:patch});
  toast(`Planned ${filled} night${filled>1?"s":""}. Swap anything you don't like.`);
}

/* ============ Click handling ============ */
const ACTS={
  tab:d=>{closeModal();S.tab=d.t;lsSet("wfd-tab",d.t);render();window.scrollTo(0,0)},
  goFamily:()=>ACTS.tab({t:"family"}),
  week:d=>{const n=+d.d;if(n===0)S.week=ymd(weekStartOf(new Date()));else{const x=parseYmd(S.week);x.setDate(x.getDate()+7*n);S.week=ymd(x)}subscribeWeek();render()},
  fillWeek:()=>fillWeek(),
  pickMain:d=>openPicker(d.date,false),
  pickSide:d=>openPicker(d.date,true),
  setMain:async d=>{closeModal();const cur=(S.plan.days||{})[d.date]||{};await dayPatch(d.date,{main:d.id,special:null,sides:cur.special?[]:(cur.sides||[])})},
  setSpecial:async d=>{closeModal();await dayPatch(d.date,{main:null,sides:[],special:d.v,restaurant:null,orders:null})},
  pickTakeout:d=>openTakeoutPicker(d.date),
  setTakeout:async d=>{closeModal();await dayPatch(d.date,{special:"takeout",main:null,sides:[],restaurant:d.id,orders:null})},
  openOrders:d=>openOrders(d.date),
  saveOrders:async d=>{const o={};document.querySelectorAll("#modal [data-mid]").forEach(i=>o[i.dataset.mid]=i.value.trim().slice(0,200));await dayPatch(d.date,{orders:o});closeModal();toast("Orders saved.")},
  copyOrder:d=>{const day=(S.plan.days||{})[d.date]||{},r=S.restaurants[day.restaurant];const lines=[...document.querySelectorAll("#modal [data-mid]")].filter(i=>i.value.trim()).map(i=>`${memberById(i.dataset.mid)?.name||""}: ${i.value.trim()}`);if(!lines.length){toast("No orders entered yet.");return}copyText(`Order from ${r?.name||"takeout"}\n`+lines.join("\n"))},
  newRestaurant:d=>openRestEditor(null,d.date),
  editRestaurant:d=>openRestEditor(d.id),
  saveRestaurant:async d=>{
    const v=s=>$("#modal "+s).value.trim(),name=v("#rname");if(!name){toast("Give the restaurant a name.");return}
    const id=d.id||uid(),prev=S.restaurants[id]||{};
    await docSet("restaurants/"+id,{...prev,name:name.slice(0,80),cuisine:v("#rcui").slice(0,40),town:v("#rtown").slice(0,40),menuUrl:v("#rmenu").slice(0,500),orderUrl:v("#rorder").slice(0,500),phone:v("#rphone").slice(0,30),notes:v("#rnotes").slice(0,200),createdAt:prev.createdAt||Date.now(),updatedAt:Date.now()});
    closeModal();if(d.date)await dayPatch(d.date,{special:"takeout",main:null,sides:[],restaurant:id,orders:null});toast("Restaurant saved.");
  },
  delRestaurant:async(d,b)=>{if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Tap again to delete";return}await docDelete("restaurants/"+d.id);toast("Restaurant deleted.")},
  fanToggle:async d=>{if(!needMe())return;const r=S.restaurants[d.id];await docUpdate("restaurants/"+d.id,{fans:{[S.me]:!(r.fans||{})[S.me]}})},
  addMeal:async d=>{if(!needMe())return;const inp=document.getElementById("meal-"+d.id),n=inp.value.trim();if(!n)return;inp.value="";inp.blur();const r=S.restaurants[d.id];await docUpdate("restaurants/"+d.id,{meals:[...(r.meals||[]).filter(Boolean),{id:uid(),name:n.slice(0,100),by:S.me}]})},
  rmMeal:async d=>{const r=S.restaurants[d.id];await docUpdate("restaurants/"+d.id,{meals:(r.meals||[]).filter(m=>m&&m.id!==d.mid)})},
  quickAdd:async d=>{
    const inp=$("#quickName"),parts=inp.value.split(",").map(s=>s.trim()).filter(Boolean);if(!parts.length){inp.focus();return}
    const side=!!d.side,name=parts[0].slice(0,80);
    const id=await saveRecipe(null,{name:name.charAt(0).toUpperCase()+name.slice(1),kind:side?"side":"main",simple:true,servings:4,prepMin:null,cookMin:null,source:"",description:"",ingredients:parts.map(p=>({qty:"",unit:"",item:p.slice(0,80),aisle:guessAisle(p)})),steps:[],tags:[],leftoverFriendly:false,nutrition:null,seasons:[]});
    await ACTS[side?"addSide":"setMain"]({date:d.date,id});
  },
  addSide:async d=>{const cur=(S.plan.days||{})[d.date]||{};if(!cur.main){toast("Pick a main for that night first.");return}if((cur.sides||[]).includes(d.id)){toast("Already on that night.");return}await dayPatch(d.date,{sides:[...(cur.sides||[]),d.id]});closeModal();toast("Side added.")},
  rmSide:async d=>{const cur=(S.plan.days||{})[d.date]||{};await dayPatch(d.date,{sides:(cur.sides||[]).filter(x=>x!==d.id)})},
  clearDay:async d=>dayPatch(d.date,null),
  addToDay:async d=>{
    const date=$("#planDay").value,r=S.recipes[d.id],cur=(S.plan.days||{})[date]||{};
    if(r.kind==="side"){if(!cur.main){toast("Plan a main for that night first.");return}await dayPatch(date,{sides:[...new Set([...(cur.sides||[]),d.id])]})}
    else await dayPatch(date,{main:d.id,special:null,sides:cur.special?[]:(cur.sides||[])});
    closeModal();toast("Added to "+parseYmd(date).toLocaleDateString(undefined,{weekday:"long"})+".");
  },
  openRecipe:d=>openRecipe(d.id),
  suggestSides:d=>openSides(d.id,d.date),
  newRecipe:()=>openEditor(null),
  editRecipe:d=>openEditor(d.id),
  delRecipe:async(d,b)=>{
    if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Tap again to delete";return}
    closeModal();await docDelete("recipes/"+d.id);await docDelete("reviews/"+d.id).catch(()=>{});toast("Recipe deleted.");
  },
  ekind:(d,b)=>{const body=$("#modal .sheet-b");body.dataset.kind=d.v;b.parentElement.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b))},
  saveRecipe:async d=>{
    const r=readEditor();if(!r.name){toast("Give the recipe a name.");return}
    if(r.simple&&!r.ingredients.length)r.ingredients=[{qty:"",unit:"",item:r.name,aisle:guessAisle(r.name)}];
    const id=await saveRecipe(d.id||null,r);closeModal();toast("Recipe saved.");openRecipe(id);
  },
  estNut:async()=>{
    const r=readEditor(),st=$("#nutStatus");if(!r.ingredients.length){st.textContent="Add ingredients first.";return}
    st.textContent="Estimating…";
    try{
      const n=await SAMPLE.json(`Estimate nutrition PER SERVING for this recipe that serves ${r.servings}. Reply with ONLY {"calories":number,"protein_g":number,"carbs_g":number,"fat_g":number,"fiber_g":number,"sodium_mg":number}.
Recipe: ${r.name}
Ingredients:
${r.ingredients.map(ingToLine).join("\n")}`,{modelTier:"quick"});
      document.querySelectorAll("[data-nut]").forEach(i=>{const v=Number(n?.[i.dataset.nut]);if(Number.isFinite(v))i.value=Math.round(v)});st.textContent="Estimated. Adjust if you know better.";
    }catch(e){st.textContent=aiErr(e)}
  },
  importRecipe:()=>openImport(),
  runImport:()=>runImport(),
  discover:()=>openDiscover("main"),
  dkind:(d,b)=>{$("#modal .sheet-b").dataset.kind=d.v;b.parentElement.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b))},
  runDiscover:()=>runDiscover(),
  saveDisc:async(d,b)=>{const x=DISC[+d.i];if(!x)return;b.disabled=true;await saveRecipe(null,x.r);b.textContent="Saved ✓"},
  saveSideSugg:async(d,b)=>{
    const x=SIDES.fresh[+d.i];if(!x)return;b.disabled=true;const id=await saveRecipe(null,x.r);
    if(SIDES.date){const cur=(S.plan.days||{})[SIDES.date]||{};if(cur.main)await dayPatch(SIDES.date,{sides:[...(cur.sides||[]),id]});b.textContent="Saved and added ✓"}else b.textContent="Saved ✓";
  },
  stopAi:()=>{MODAL_CTL?.abort()},
  kind:d=>{S.ui.kind=d.v;document.querySelectorAll(".seg [data-act=kind]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.v===d.v));renderGrid()},
  rf:(d,b)=>{const k=d.k,v=k==="verdict"?d.v:+d.v;RF[k]=RF[k]===v?(k==="verdict"?"":0):v;b.parentElement.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",(k==="verdict"?x.dataset.v:+x.dataset.v)===RF[k]))},
  saveRating:async d=>{
    RF.comment=$("#rfc").value.trim().slice(0,240);
    if(!RF.verdict&&!ATTRS.some(([k])=>RF[k])){toast("Pick a verdict or a score first.");return}
    await docUpdate("reviews/"+d.id,{byMember:{[S.me]:{...RF,at:Date.now()}}});toast("Rating saved.");closeModal();
  },
  clearRating:async d=>{await docUpdate("reviews/"+d.id,{byMember:{[S.me]:null}});toast("Rating removed.");closeModal()},
  got:async d=>{const c=(S.grocery.checks||{})[d.key]||{};await docUpdate("grocery/"+S.week,{checks:{[d.key]:{got:!c.got}}})},
  have:async d=>{const c=(S.grocery.checks||{})[d.key]||{};await docUpdate("grocery/"+S.week,{checks:{[d.key]:{have:!c.have,got:false}}})},
  addExtra:async()=>{const n=$("#extraName").value.trim();if(!n)return;const a=$("#extraAisle").value;$("#extraName").value="";$("#extraName").blur();await docUpdate("grocery/"+S.week,{extras:[...(S.grocery.extras||[]),{id:uid(),name:n.slice(0,80),aisle:a||guessAisle(n)}]})},
  rmExtra:async d=>docUpdate("grocery/"+S.week,{extras:(S.grocery.extras||[]).filter(x=>x&&x.id!==d.id)}),
  addStaple:async()=>{const n=$("#stapleName").value.trim();if(!n)return;$("#stapleName").value="";$("#stapleName").blur();await docSet("household/staples",{items:[...(S.staples.items||[]),{id:uid(),name:n.slice(0,60),aisle:guessAisle(n),every:true}]})},
  commonStaples:async()=>docSet("household/staples",{items:[...(S.staples.items||[]),...COMMON_STAPLES.map(([name,aisle])=>({id:uid(),name,aisle,every:["Milk","Eggs","Bread","Bananas"].includes(name)}))]}),
  stapleEvery:async d=>docSet("household/staples",{items:(S.staples.items||[]).map(s=>s&&s.id===d.id?{...s,every:!s.every}:s)}),
  stapleWeek:async d=>docUpdate("grocery/"+S.week,{addStaples:{[d.id]:!(S.grocery.addStaples||{})[d.id]}}),
  rmStaple:async d=>docSet("household/staples",{items:(S.staples.items||[]).filter(s=>s&&s.id!==d.id)}),
  copyList:async()=>{
    const items=groceryItems().filter(i=>!i.have&&!i.got),by={};items.forEach(i=>(by[i.aisle]||(by[i.aisle]=[])).push(i));
    const text=AISLES.filter(a=>by[a]).map(a=>a+"\n"+by[a].map(i=>"☐ "+i.name+(i.amt?" ("+i.amt+")":"")+(i.deal?" — sale "+i.deal.price:"")).join("\n")).join("\n\n");
    if(!text){toast("Nothing left to buy.");return}
    try{await navigator.clipboard.writeText(text);toast("List copied. Paste it into Notes or a text.")}
    catch{openModal("Copy your list",`<p class="hint" style="margin-top:0">Select all and copy.</p><textarea class="ta" style="min-height:320px" readonly>${esc(text)}</textarea>`,b=>{const t=b.querySelector("textarea");t.focus();t.select()})}
  },
  newTrip:async(d,b)=>{
    if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Tap again to uncheck everything";return}
    await docSet("grocery/"+S.week,{...S.grocery,checks:{},addStaples:{},extras:[]});toast("Fresh list. Dinner ingredients and every-week staples are back.");
  },
  addMember:async()=>{
    const n=$("#memberName").value.trim();if(!n)return;$("#memberName").value="";$("#memberName").blur();
    const m={id:uid(),name:n.slice(0,30)};await docUpdate("household/settings",{members:[...members(),m]});
    if(!S.me){S.me=m.id;lsSet("wfd-me",m.id)}
  },
  rmMember:async(d,b)=>{
    if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Remove?";return}
    await docUpdate("household/settings",{members:members().filter(m=>m.id!==d.id)});if(S.me===d.id){S.me="";lsSet("wfd-me","")}
  },
  readDeals:()=>readDeals(true),
  readDealsPlain:()=>readDeals(false),
  rmDeal:async d=>docUpdate("deals/"+S.week,{items:(S.deals.items||[]).filter((_,i)=>i!==+d.i)}),
  clearDeals:async()=>docSet("deals/"+S.week,{text:"",items:[],updatedAt:Date.now()})
};
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;
  const fn=ACTS[b.dataset.act];if(!fn)return;
  if(b.tagName!=="INPUT")e.preventDefault();
  Promise.resolve(fn(b.dataset,b,e)).catch(err=>console.warn(err));
});
document.addEventListener("input",e=>{if(e.target.id==="q"){S.ui.q=e.target.value;renderGrid()}});
document.addEventListener("change",e=>{
  if(e.target.id==="sort"){S.ui.sort=e.target.value;renderGrid()}
  if(e.target.id==="me"){S.me=e.target.value;lsSet("wfd-me",S.me);render()}
});
document.addEventListener("keydown",e=>{
  if(e.key!=="Enter")return;
  if(e.target.dataset&&e.target.dataset.enter){e.preventDefault();Promise.resolve(ACTS[e.target.dataset.enter](e.target.dataset,e.target)).catch(err=>console.warn(err));return}
  const map={extraName:"addExtra",stapleName:"addStaple",memberName:"addMember"};
  const a=map[e.target.id];if(a){e.preventDefault();ACTS[a]({},e.target)}
});

/* ============ Boot ============ */
ACTS.login=async()=>{
  const p=$("#pass"),err=$("#loginErr");const passcode=p.value;if(!passcode){p.focus();return}
  try{
    const r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({passcode})});
    const j=await r.json().catch(()=>({}));
    if(!r.ok){err.innerHTML=`<p class="err">${esc(j.error||"That passcode didn't work.")}</p>`;p.select();return}
    S.locked=false;p.blur();await sync(true);render();
  }catch{err.innerHTML=`<p class="err">Can't reach the server. Check your connection.</p>`}
};
ACTS.logout=async()=>{
  await fetch("/api/login",{method:"DELETE",credentials:"same-origin"}).catch(()=>{});
  local.data={};VER=0;try{localStorage.removeItem("wfd-cache")}catch{}
  S.locked=true;render();
};
(async()=>{
  try{const c=JSON.parse(localStorage.getItem("wfd-cache")||"null");if(c&&c.data){local.data=c.data;VER=c.ver||0}}catch{}
  watchCol("recipes",m=>{S.recipes=m;render()});
  watchCol("reviews",m=>{S.reviews=m;render()});
  watchCol("restaurants",m=>{S.restaurants=m;render()});
  watchDoc("household/settings",d=>{S.settings=d||{};render()});
  watchDoc("household/staples",d=>{S.staples=d||{};render()});
  subscribeWeek();
  render();
  await sync(true);
  setInterval(()=>{if(document.visibilityState==="visible")sync()},4000);
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")sync()});
  window.addEventListener("online",()=>sync());
  if("serviceWorker" in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>{});
})();
