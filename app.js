/* =====================
   Clean & Calm logic v3.5
   ===================== */

/* -------- Image helpers (FIXED: Using Placeholders) -------- */
// Uses placehold.co so the app looks good immediately without needing local files
const imgForCategory = (cat) => {
  return `https://placehold.co/480x260/e2e8f0/16a34a?text=${encodeURIComponent(cat)}`;
};

const imgForProduct = (p, catName) => {
  return `https://placehold.co/200x200/f1f5f9/0f172a?text=${encodeURIComponent(p.name)}`;
};

/* Helper to recover category name */
const getCategoryFromBaseKey = (baseKey) => {
  // FIXED: Robust check for categories that might contain hyphens
  for(const cat of Object.keys(categories)) {
    if(baseKey.startsWith(cat + "-")) {
      return cat;
    }
  }
  const idx = baseKey.indexOf("-");
  if (idx === -1) return baseKey;
  return baseKey.slice(0, idx);
};

/* -------- Data -------- */
const categoryImages = {
  "Staples":"grain,sacks,market",
  "Fresh Produce":"fresh vegetables,greens,market",      // veg-only now
  "Fruits":"fresh fruit,market,assorted",                // NEW
  "Toiletries":"toiletries,soap,cosmetics",
  "Beverages":"beverages,drinks,bottles",
  "Cleaning":"cleaning products,detergent",
  "Bakery":"bread,loaf,bakery",
  "Meat & Poultry":"butcher,meat,chicken",
  "Dairy & Eggs":"dairy,eggs,milk",
  "Snacks":"snacks,crisps,biscuits",
  "Frozen":"frozen food,freezer",
  "Household & Paper":"paper towels,toilet paper,household",
  "Health & Beauty":"cosmetics,beauty,shampoo",
  "Pet Care":"pet food,dog,cat",
  "Essentials":"daily essentials,home,utility"           // NEW
};

const stores = [
  { id:"shoprite-longacres", name:"Shoprite Longacres", distanceKm:4.1, baseEta:35, deliveryFee:20, rating:4.3 },
  { id:"picknpay-woodlands", name:"Pick n Pay Woodlands", distanceKm:6.0, baseEta:45, deliveryFee:25, rating:4.6 },
  { id:"choppies-levy", name:"Choppies Levy", distanceKm:7.8, baseEta:50, deliveryFee:18, rating:4.0 },
  { id:"foodlovers-eastpark", name:"Food Lover’s EastPark", distanceKm:2.8, baseEta:30, deliveryFee:28, rating:4.7 }
];

const categories = {
  "Staples":[
    { name:"Roller Meal 25kg", price:280 },
    { name:"Breakfast Mealie Meal 25kg", price:320 },
    { name:"Kapenta (Dry Fish)", price:150 },
    { name:"Dry Beans 5kg", price:120 },
    { name:"Groundnuts 5kg", price:140 },
    { name:"Rice 5kg", price:110 },
    { name:"Cooking Oil 2L", price:85 },
    { name:"Sugar 2kg", price:55 },
    { name:"Salt 1kg", price:15 },
    { name:"Flour 5kg", price:95 }
  ],
  "Fresh Produce":[
    { name:"Tomatoes 1kg", price:25 },
    { name:"Onions 1kg", price:20 },
    { name:"Rape Vegetables", price:15 },
    { name:"Cabbage", price:20 },
    { name:"Spinach", price:18 },
    { name:"Lettuce", price:15 },
    { name:"Carrots 1kg", price:22 },
    { name:"Green Peppers 500g", price:24 },
    { name:"Cucumbers 1kg", price:23 },
    { name:"Eggplant 1kg", price:26 }
  ],
  "Fruits":[
    { name:"Apples 1kg", price:45 },
    { name:"Bananas (bunch)", price:30 },
    { name:"Oranges 1kg", price:25 },
    { name:"Avocados 1kg", price:35 },
    { name:"Mangoes 1kg", price:28 },
    { name:"Pineapple (whole)", price:40 },
    { name:"Grapes 500g", price:48 },
    { name:"Watermelon (whole)", price:55 },
    { name:"Lemons 1kg", price:22 },
    { name:"Blueberries 125g", price:52 }
  ],
  "Toiletries":[
    { name:"Geisha Soap 250g", price:15 },
    { name:"Protex Soap", price:20 },
    { name:"Colgate Toothpaste 100ml", price:30 },
    { name:"Toothbrush", price:10 },
    { name:"Always Pads (10 pack)", price:35 },
    { name:"Baby Diapers (Pack of 20)", price:150 },
    { name:"Vaseline Jelly 500ml", price:50 },
    { name:"Body Lotion 400ml", price:70 },
    { name:"Toilet Tissue 4 pack", price:35 },
    { name:"Sanitary Wipes", price:45 }
  ],
  "Beverages":[
    { name:"Coca Cola 2L", price:25 },
    { name:"Fanta 2L", price:25 },
    { name:"Sprite 2L", price:25 },
    { name:"Mineral Water 1.5L", price:10 },
    { name:"Jungle Oats 1kg", price:45 },
    { name:"Rooibos Tea 100 bags", price:65 },
    { name:"Fresh Milk 1L", price:18 },
    { name:"Milo 500g", price:85 },
    { name:"Instant Coffee 100g", price:70 },
    { name:"Maheu 2L", price:20 }
  ],
  "Cleaning":[
    { name:"Boom Washing Powder 2kg", price:50 },
    { name:"Sunlight Dishwashing Liquid 750ml", price:40 },
    { name:"Domestos Toilet Cleaner 750ml", price:55 },
    { name:"Hand Wash 500ml", price:35 },
    { name:"Broom", price:25 },
    { name:"Mop Set", price:95 },
    { name:"Floor Polish 1L", price:65 },
    { name:"Detergent Bar Soap", price:20 },
    { name:"Toilet Brush", price:30 },
    { name:"Bleach 1L", price:25 }
  ],
  "Bakery":[
    { name:"White Bread Loaf", price:25 },
    { name:"Wholewheat Bread", price:30 },
    { name:"Burger Buns (6)", price:28 },
    { name:"Croissants (4)", price:40 },
    { name:"Scones (6)", price:35 },
    { name:"Tortillas (10)", price:45 },
    { name:"Cupcakes (6)", price:50 },
    { name:"French Baguette", price:22 }
  ],
  "Meat & Poultry":[
    { name:"Beef Steak 1kg", price:160 },
    { name:"Chicken Thighs 1kg", price:95 },
    { name:"Whole Chicken", price:120 },
    { name:"Beef Mince 1kg", price:130 },
    { name:"Pork Chops 1kg", price:145 },
    { name:"Boerewors 1kg", price:110 },
    { name:"Goat Meat 1kg", price:150 },
    { name:"Tilapia Fish 1kg", price:90 }
  ],
  "Dairy & Eggs":[
    { name:"Eggs Tray (30)", price:85 },
    { name:"Cheddar Cheese 500g", price:95 },
    { name:"Butter 500g", price:75 },
    { name:"Yogurt 500ml", price:40 },
    { name:"Fresh Milk 1L", price:18 },
    { name:"Margarine 500g", price:38 },
    { name:"Sour Milk (Mabisi) 1L", price:25 },
    { name:"Fresh Cream 250ml", price:30 }
  ],
  "Snacks":[
    { name:"Potato Crisps 125g", price:25 },
    { name:"Chocolate Bar 90g", price:30 },
    { name:"Biscuits 200g", price:28 },
    { name:"Popcorn Kernels 500g", price:22 },
    { name:"Roasted Peanuts 200g", price:18 },
    { name:"Crackers 200g", price:20 },
    { name:"Dried Fruit Mix 150g", price:35 },
    { name:"Granola Bars (6)", price:45 }
  ],
  "Frozen":[
    { name:"Mixed Veg 1kg", price:45 },
    { name:"Chicken Nuggets 500g", price:70 },
    { name:"Frozen Chips 1kg", price:40 },
    { name:"Peas 1kg", price:35 },
    { name:"Ice Cream 1L", price:65 },
    { name:"Fish Fingers 400g", price:60 },
    { name:"Spinach Frozen 500g", price:32 },
    { name:"Berry Mix 500g", price:80 }
  ],
  "Household & Paper":[
    { name:"Paper Towels 2pk", price:35 },
    { name:"Toilet Paper 9pk", price:65 },
    { name:"Napkins 100s", price:25 },
    { name:"Aluminium Foil 30cm", price:40 },
    { name:"Cling Wrap 30cm", price:38 },
    { name:"Bin Bags (20)", price:45 },
    { name:"Matches (10 boxes)", price:15 },
    { name:"Batteries AA (4)", price:55 }
  ],
  "Health & Beauty":[
    { name:"Shampoo 400ml", price:55 },
    { name:"Conditioner 400ml", price:55 },
    { name:"Deodorant 150ml", price:45 },
    { name:"Hand Sanitizer 250ml", price:30 },
    { name:"Pads (10 pack)", price:35 },
    { name:"Cotton Buds 200s", price:20 },
    { name:"Body Wash 500ml", price:50 },
    { name:"Hand Cream 100ml", price:28 }
  ],
  "Pet Care":[
    { name:"Dog Food 2kg", price:120 },
    { name:"Cat Food 2kg", price:115 },
    { name:"Cat Litter 10kg", price:95 },
    { name:"Dog Treats 200g", price:35 },
    { name:"Pet Shampoo 250ml", price:40 },
    { name:"Pet Bowls (2)", price:45 },
    { name:"Chew Toy", price:30 },
    { name:"Flea Collar", price:50 }
  ],
  "Essentials":[
    { name:"Mineral Water 1.5L", price:10 },
    { name:"Cooking Oil 2L", price:85 },
    { name:"Sugar 2kg", price:55 },
    { name:"Salt 1kg", price:15 },
    { name:"Matches (10 boxes)", price:15 },
    { name:"Candles 6pk", price:28 },
    { name:"Charcoal 25kg", price:150 },
    { name:"Gas Refill 6kg", price:190 },
    { name:"Batteries AA (4)", price:55 },
    { name:"Paracetamol 10s (OTC)", price:20 },
    { name:"Hand Wash Refill 1L", price:55 },
    { name:"Toilet Tissue 4 pack", price:35 }
  ]
};

/* -------- State -------- */
const state = {
  route: "home",
  currentCategory: null,
  selectedProduct: null,
  query: "",
  searchQuery: "",
  compareSort: "smart",
  weightsPct: { price:45, distance:20, eta:15, fee:10, rating:10 },
  cart: {},
  cartPriceOverrides: {},
  address: "",
  note: "",
  payment: ""
};

/* -------- Index & helpers -------- */
const productIndex = (()=>{ const i={}; for (const [cat,list] of Object.entries(categories)) for (const p of list) i[`${cat}-${p.name}`]=p; return i; })();
const enc = s => encodeURIComponent(s); const dec = s => decodeURIComponent(s);
const ZMWfmt = new Intl.NumberFormat('en-ZM', { style:'currency', currency:'ZMW', maximumFractionDigits:0 });
const Z = n => ZMWfmt.format(n);
const parseCartKey = key => { const [base, store] = key.split("@"); return { base, store }; };
const getCatalogProduct = key => productIndex[parseCartKey(key).base];
const getCartPrice = key => state.cartPriceOverrides[key] ?? (getCatalogProduct(key)?.price ?? 0);
const flatCount = () => Object.values(state.cart).reduce((a,b)=>a+b,0);
const subtotal = () => Object.entries(state.cart).reduce((sum,[key,qty]) => sum + getCartPrice(key)*qty, 0);
const deliveryFee = () => subtotal() > 300 ? 0 : (flatCount()>0 ? 25 : 0);
const total = () => subtotal() + deliveryFee();
const debounce = (fn, ms=120) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; };
const idle = cb => (window.requestIdleCallback?requestIdleCallback(cb,{timeout:300}):setTimeout(cb,0));
const fmtStore = s => s ? s.replace(/-/g," ") : "Marketplace";

/* -------- Offers + scoring -------- */
const resetWeights = ()=>{ state.weightsPct = { price:45, distance:20, eta:15, fee:10, rating:10 }; savePersisted(); };
function makeOffers(product){
  const h = product.name.split("").reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0) >>> 0, 0);
  const base = product.price;
  return stores.map((s,i)=>{
    const factor = ((h + i*13) % 15 - 7) / 100; // -0.07..+0.07
    const price = Math.max(5, Math.round(base * (1 + factor)));
    const etaMin = Math.max(15, Math.round(s.baseEta + ((h % 7) - 3)));
    return { storeId:s.id, storeName:s.name, price, distanceKm:s.distanceKm, etaMin, deliveryFee:s.deliveryFee, rating:s.rating };
  });
}
function scoreOffers(offers, w){
  if(!offers.length) return offers;
  let minPrice=Infinity,minDist=Infinity,minEta=Infinity,minFee=Infinity,maxRating=-Infinity;
  for(const o of offers){
    if(o.price<minPrice)minPrice=o.price;
    if(o.distanceKm<minDist)minDist=o.distanceKm;
    if(o.etaMin<minEta)minEta=o.etaMin;
    if(o.deliveryFee<minFee)minFee=o.deliveryFee;
    if(o.rating>maxRating)maxRating=o.rating;
  }
  const withScore = new Array(offers.length);
  for (let i=0;i<offers.length;i++){
    const o = offers[i];
    const score  = w.price*(o.price/(minPrice||1))
                 + w.distance*(o.distanceKm/(minDist||1))
                 + w.eta*(o.etaMin/(minEta||1))
                 + w.fee*((o.deliveryFee||1)/(minFee||1))
                 + w.rating*((maxRating||5)/(o.rating||1));
    withScore[i] = {...o, __score: score};
  }
  withScore.sort((a,b)=>(a.__score??0)-(b.__score??0));
  return withScore;
}
const sortOffers = offers => {
  const s = state.compareSort;
  if (s==="price") return [...offers].sort((a,b)=>a.price-b.price);
  if (s==="distance") return [...offers].sort((a,b)=>a.distanceKm-b.distanceKm);
  if (s==="eta") return [...offers].sort((a,b)=>a.etaMin-b.etaMin);
  if (s==="rating") return [...offers].sort((a,b)=>b.rating-a.rating);
  return [...offers].sort((a,b)=>(a.__score??0)-(b.__score??0));
};

/* -------- Persistence -------- */
const PERSIST_KEYS = ['cart','cartPriceOverrides','address','note','payment','weightsPct'];
const LS_KEY = 'marketplace_clean_calm_v35';
function loadPersisted(){ try{ const raw=localStorage.getItem(LS_KEY); if(!raw) return; const saved=JSON.parse(raw); for(const k of PERSIST_KEYS) if(k in saved) state[k]=saved[k]; }catch{} }
const savePersisted = debounce(()=>{ idle(()=>{ try{ const bag={}; for(const k of PERSIST_KEYS) bag[k]=state[k]; localStorage.setItem(LS_KEY, JSON.stringify(bag)); }catch{} }); },150);

/* -------- Hash Router -------- */
function setHashFromState(){
  let h = '#' + state.route;
  if (state.route === 'category' && state.currentCategory) h += `?cat=${enc(state.currentCategory)}`;
  if (state.route === 'compare' && state.currentCategory && state.selectedProduct)
    h += `?cat=${enc(state.currentCategory)}&p=${enc(state.selectedProduct.name)}`;
  if (state.route === 'search' && state.searchQuery) h += `?q=${enc(state.searchQuery)}`;
  if (location.hash !== h) location.hash = h;
}
function applyHash(){
  const raw = location.hash.replace(/^#/, '');
  if (!raw) { state.route='home'; return; }
  const [route, query=''] = raw.split('?');
  state.route = route || 'home';
  const params = new URLSearchParams(query);
  if (route === 'category') {
    const cat = dec(params.get('cat')||''); if (cat) state.currentCategory = cat;
  }
  if (route === 'compare') {
    const cat = dec(params.get('cat')||''); const name = dec(params.get('p')||'');
    if (cat) state.currentCategory = cat;
    if (cat && name) state.selectedProduct = (categories[cat]||[]).find(p=>p.name===name) || null;
  }
  if (route === 'search') state.searchQuery = dec(params.get('q')||'');
}
window.addEventListener('hashchange', ()=>{ applyHash(); render(); }, {passive:true});

/* -------- Mutations & Sync Fixes -------- */
function updateModalCount(key) {
  const modal = document.getElementById('modal');
  if (!modal || !modal.classList.contains('show')) return;
  // Fallback selector to find the quantity number inside the modal
  const qtyDisplay = modal.querySelector('.card-content .row div[aria-live="polite"]')
                  || modal.querySelector('.w-100 div[style*="text-align:center"]');
  const matchingBtn = modal.querySelector(`button[data-key="${enc(key)}"]`);
  if (matchingBtn && qtyDisplay) {
    qtyDisplay.textContent = state.cart[key] ?? 0;
  }
}

function addToCart(key, priceOverride){
  state.cart[key] = (state.cart[key] ?? 0) + 1;
  if (priceOverride != null) state.cartPriceOverrides[key] = priceOverride;
  popBubble();
  toast(`${getCatalogProduct(key).name} added`, "success");
  savePersisted();
  render();
  updateModalCount(key); // FIXED: Sync modal
}

function decFromCart(key){
  state.cart[key] = Math.max(0,(state.cart[key] ?? 0) - 1);
  savePersisted();
  render();
  updateModalCount(key); // FIXED: Sync modal
}

function navigate(route){
  state.route = route;
  if (route==="home"){ state.selectedProduct=null; state.query=""; }
  setHashFromState();
}
function popBubble(){
  const b = document.getElementById("cartBubble");
  if(!b) return; b.classList.remove("hidden");
  const count = flatCount(); b.textContent = count;
  if (count<=0) b.classList.add("hidden");
  const live = document.getElementById("a11yLive");
  if (live) live.textContent = `${count} item${count===1?'':'s'} in cart`;
}

/* -------- Toast (subtle) -------- */
let toastT;
function toast(msg, kind="info"){
  clearTimeout(toastT);
  let node = document.getElementById('toaster');
  if(!node){
    node = document.createElement('div');
    node.id = 'toaster';
    node.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(var(--bar-height) + var(--safe-bottom) + 70px);background:#ffffff;border:1px solid var(--border);box-shadow:0 8px 24px rgba(2,6,23,.10);padding:10px 14px;border-radius:12px;z-index:60;color:var(--text)";
    document.body.appendChild(node);
  }
  node.textContent = msg;
  node.style.borderColor = kind==="success" ? "#bbf7d0" : (kind==="error" ? "#fecaca" : "var(--border)");
  node.style.boxShadow = kind==="success" ? "0 8px 24px rgba(22,163,74,.18)" : (kind==="error" ? "0 8px 24px rgba(239,68,68,.18)" : "0 8px 24px rgba(2,6,23,.10)");
  node.style.opacity = "1";
  toastT = setTimeout(()=>{ node.style.opacity="0"; }, 1400);
}

/* -------- Views -------- */
function headerAdjust(){
  document.querySelectorAll(".nav-btn").forEach(el=>el.classList.remove("active"));
  if (state.route==="home") document.getElementById("navHome").classList.add("active");
  if (state.route==="search") document.getElementById("navSearch").classList.add("active");
}

function viewHome(){
  let html = '<div class="container grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:14px">';
  for (const cat of Object.keys(categoryImages)){
    const count = (categories[cat]||[]).length;
    html += `
      <div class="card" data-action="open-category" data-category="${enc(cat)}" style="cursor:pointer" aria-label="Open ${cat}">
        <div class="card-content">
          <img loading="lazy" decoding="async" width="480" height="260" class="cat-img" src="${imgForCategory(cat)}" alt="${cat}"/>
          <div class="row-between" style="margin-top:8px">
            <div>
              <div class="section-title" style="font-size:15px">${cat}</div>
              <div class="subtitle">${count} items</div>
            </div>
            <span class="badge">Browse</span>
          </div>
        </div>
      </div>`;
  }
  html += '</div>';
  return html;
}

function viewCategory(){
  const cat = state.currentCategory;
  const list = state.query
    ? (categories[cat]||[]).filter(p=>p.name.toLowerCase().includes(state.query.toLowerCase()))
    : (categories[cat]||[]);

  let html = `
    <div class="container">
      <div class="section-title" style="font-family:Poppins">${cat}</div>
      <div class="row" style="margin-top:8px">
        <input id="catSearchInput" class="input w-100" placeholder="Search in ${cat}…" value="${(state.query||'').replace(/"/g,'&quot;')}" data-model="query" aria-label="Search in ${cat}"/>
      </div>
    </div>
    <div class="container grid grid-2">`;
  for (const p of list){
    const key = `${cat}-${p.name}`;
    const qty = state.cart[key] ?? 0;
    html += `
      <div class="card">
        <div class="card-content center">
          <img loading="lazy" decoding="async" width="200" height="200" class="img" src="${imgForProduct(p, cat)}" alt="${p.name}"/>
          <div style="margin-top:6px;font-weight:900;font-family:Poppins">${p.name}</div>
          <div class="subtitle">Base from ${Z(p.price)}</div>
          <div class="row" style="gap:6px;margin-top:8px">
            <button class="btn secondary icon-btn" data-action="dec" data-key="${enc(key)}" aria-label="Decrease ${p.name}">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/></svg>
            </button>
            <div class="w-100 center" style="font-weight:900" aria-live="polite">${qty}</div>
            <button class="btn icon-btn" style="background:linear-gradient(180deg,#22c55e,#16a34a)" data-action="add" data-key="${enc(key)}" aria-label="Add ${p.name}">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="#fff" fill="none" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
          <button class="btn secondary" style="margin-top:8px;padding:6px 10px;border-radius:999px;font-weight:700" data-action="open-compare" data-product="${enc(p.name)}" data-category="${enc(cat)}">Compare</button>
        </div>
      </div>`;
  }
  html += `</div>`;
  return html;
}

const normalizedWeights = ()=>{
  const w = state.weightsPct, sum = (w.price+w.distance+w.eta+w.fee+w.rating)||1;
  return { price:w.price/sum, distance:w.distance/sum, eta:w.eta/sum, fee:w.fee/sum, rating:w.rating/sum };
};

function viewCompare(){
  const p = state.selectedProduct;
  const wN = normalizedWeights();
  const offers = sortOffers(scoreOffers(makeOffers(p), wN));
  const cheapest = offers.reduce((a,b)=>a.price<b.price?a:b);
  const closest  = offers.reduce((a,b)=>a.distanceKm<b.distanceKm?a:b);
  const fastest  = offers.reduce((a,b)=>a.etaMin<b.etaMin?a:b);
  const top      = offers[0];

  let html = `
    <div class="container">
      <div class="row">
        <img loading="lazy" decoding="async" width="56" height="56" class="img" style="width:56px;height:56px" src="${imgForProduct(p, state.currentCategory)}" alt="${p.name}"/>
        <div style="padding-left:8px">
          <div class="section-title" style="margin:0;font-family:Poppins">${p.name}</div>
          <div class="subtitle">Compare by price, distance, ETA, ratings.</div>
        </div>
      </div>

      <div class="card" style="margin-top:10px">
        <div class="card-content">
          <div class="row">
            <strong style="font-family:Poppins">Smart ranking</strong>
            <span class="subtitle" style="margin-left:auto">Adjust weights</span>
            <button class="icon-btn" data-action="reset-weights" title="Reset weights" style="margin-left:6px">Reset</button>
          </div>
          <div class="grid" style="grid-template-columns:repeat(1,minmax(0,1fr));gap:8px;margin-top:6px">
            ${[["Price","price"],["Distance","distance"],["ETA","eta"],["Fee","fee"],["Rating","rating"]].map(([label,key])=>`
              <div class="row">
                <label style="width:88px;color:#475569">${label}</label>
                <input type="range" min="0" max="100" value="${state.weightsPct[key]}" data-weight="${key}" class="w-100" aria-label="${label} weight"/>
                <span style="width:36px;text-align:right" class="subtitle">${state.weightsPct[key]}%</span>
              </div>
            `).join("")}
            <div class="subtitle">Now → Price ${(wN.price*100).toFixed(0)}%, Distance ${(wN.distance*100).toFixed(0)}%, ETA ${(wN.eta*100).toFixed(0)}%, Fee ${(wN.fee*100).toFixed(0)}%, Rating ${(wN.rating*100).toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="display:grid;gap:10px">
  `;

  for (const o of offers){
    const key = `${state.currentCategory}-${p.name}@${o.storeId}`;
    const isTop = o.storeId === top.storeId;
    const estTotal = o.price + o.deliveryFee;
    const isCheapest = o.storeId === cheapest.storeId;
    const isClosest  = o.storeId === closest.storeId;
    const isFastest  = o.storeId === fastest.storeId;

    html += `
      <div class="card" style="${isTop?'border-color:#a7f3d0;background:#ecfdf5':''}">
        <div class="card-content row" style="gap:10px">
          <div class="w-100">
            <div class="row" style="gap:8px">
              <div style="font-weight:900;font-family:Poppins">${o.storeName}</div>
              ${isTop?'<span class="badge" style="background:#ecfdf5;border-color:#a7f3d0;color:#065f46">Recommended</span>':''}
            </div>
            <div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:6px">
              <div>Price: <span class="price">${Z(o.price)}</span></div>
              <div>Est. Total: <span class="price">${Z(estTotal)}</span></div>
              <div class="row"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" class="mr-8" aria-hidden="true"><path d="M21 10c0 5-9 12-9 12S3 15 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${o.distanceKm.toFixed(1)} km</div>
              <div class="row"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" class="mr-8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${o.etaMin} min</div>
              <div class="row"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" class="mr-8" aria-hidden="true"><path d="M12 17.3l-6.16 3.24 1.18-6.88L2 9.24l6.92-1L12 2l3.08 6.24L22 9.24l-5.02 4.42 1.18 6.88z"/></svg>${o.rating.toFixed(1)}</div>
              <div>Delivery fee: ${Z(o.deliveryFee)}</div>
            </div>
            <div class="row" style="gap:6px;margin-top:6px">
              ${isCheapest?'<span class="badge blue">Cheapest</span>':''}
              ${isClosest?'<span class="badge gray">Closest</span>':''}
              ${isFastest?'<span class="badge red">Fastest ETA</span>':''}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <button class="btn" data-action="add-offer" data-key="${enc(key)}" data-price="${o.price}" style="padding:8px 10px">Add</button>
            <div class="subtitle">Adds at ${Z(o.price)}</div>
          </div>
        </div>
      </div>`;
  }

  html += `
    <div class="card">
      <div class="card-content subtitle">
        <div style="font-weight:900;margin-bottom:4px;color:#0f172a;font-family:Poppins">Choosing tips</div>
        <ul style="margin:6px 0 0 18px">
          <li>If prices are within ZMW 5, pick the <b>closer or faster</b> store.</li>
          <li>For heavy items, shorter <b>distance</b> helps handling.</li>
          <li>Check <b>store rating</b> for freshness and reliability.</li>
          <li>Compare the <b>total</b> (item + delivery), not item price alone.</li>
        </ul>
      </div>
    </div>
  </div>`;
  return html;
}

/* Floating checkout dock (cart) */
function dockCart(){
  if (flatCount()===0) return '';
  return `
  <div class="dock">
    <div class="dockCard">
      <div class="row-between"><span class="subtitle">Subtotal</span><span>${Z(subtotal())}</span></div>
      <div class="row-between"><span class="subtitle">Delivery</span><span ${deliveryFee()===0?'style="color:#16a34a;font-weight:900"':''}>${deliveryFee()===0?'FREE':Z(deliveryFee())}</span></div>
      <div class="row-between" style="font-weight:900;margin-top:4px"><span>Total</span><span>${Z(total())}</span></div>
      <div class="row" style="gap:8px;margin-top:8px">
        <button class="btn secondary" data-action="goto" data-route="home">Continue</button>
        <button class="btn w-100" data-action="goto" data-route="checkout">Checkout</button>
      </div>
    </div>
  </div>`;
}

function viewCart(){
  let html = `<div class="container"><div class="section-title">Your Cart</div>`;
  if (flatCount()===0){
    html += `<div class="subtitle" style="margin-top:8px">Your cart is empty.</div></div>`;
    return html;
  }
  for (const [key, qty] of Object.entries(state.cart)){
    if (!qty) continue;
    const p = getCatalogProduct(key);
    const price = getCartPrice(key);
    const { base, store } = parseCartKey(key);
    const catName = getCategoryFromBaseKey(base);
    html += `
      <div class="card" style="margin-top:8px">
        <div class="card-content row" style="gap:12px">
          <img loading="lazy" decoding="async" width="48" height="48" class="img" style="width:48px;height:48px" src="${imgForProduct(p, catName)}" alt="${p.name}"/>
          <div class="w-100">
            <div style="font-weight:900;font-family:Poppins">${p.name}</div>
            <div class="subtitle">Store: ${fmtStore(store)}</div>
            <div class="subtitle">${Z(price)} each</div>
          </div>
          <div class="row" style="gap:6px">
            <button class="icon-btn" data-action="dec" data-key="${enc(key)}" aria-label="Decrease ${p.name}">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/></svg>
            </button>
            <div style="width:28px;text-align:center">${qty}</div>
            <button class="btn" style="padding:8px 10px" data-action="add" data-key="${enc(key)}" aria-label="Increase ${p.name}">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="#fff" fill="none" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
          <div style="width:84px;text-align:right;font-weight:900">${Z(price*qty)}</div>
        </div>
      </div>`;
  }
  html += `</div>${dockCart()}`;
  return html;
}

function viewCheckout(){
  let html = `<div class="container"><div class="section-title">Checkout</div>`;
  html += `
    <div class="card" style="margin-top:12px">
      <div class="card-content">
        <div class="row" style="gap:8px;margin-bottom:6px">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" aria-hidden="true"><path d="M21 10c0 5-9 12-9 12S3 15 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <div class="section-title" style="margin:0">Delivery Address</div>
        </div>
        <input class="input" placeholder="e.g., House 12, Great East Rd, Kabulonga" value="${(state.address||'').replace(/"/g,'&quot;')}" data-model="address"/>
        <input class="input" style="margin-top:8px" placeholder="Add delivery note (gate code, landmark, etc.)" value="${(state.note||'').replace(/"/g,'&quot;')}" data-model="note"/>
      </div>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="card-content">
        <div class="row" style="gap:8px;margin-bottom:6px">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
          <div class="section-title" style="margin:0">Payment Method</div>
        </div>
        <div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
          ${["MTN MoMo","Airtel Money","Zamtel Kwacha","Cash on Delivery"].map(m=>`
            <button class="btn secondary" data-action="select-payment" data-value="${m}" style="justify-self:stretch;text-align:left;border:${state.payment===m?'2px solid #a7f3d0':'1px solid var(--border)'};background:${state.payment===m?'#ecfdf5':'var(--panel)'}">${m}</button>
          `).join("")}
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="card-content">`;
  for (const [key, qty] of Object.entries(state.cart)){
    if (!qty) continue;
    const p = getCatalogProduct(key);
    const price = getCartPrice(key);
    const { store } = parseCartKey(key);
    html += `<div class="row-between" style="padding:4px 0"><span class="subtitle">${p.name} × ${qty} <span class="pill" style="margin-left:6px">${fmtStore(store)}</span></span><span>${Z(price*qty)}</span></div>`;
  }
  html += `
        <div class="divider"></div>
        <div class="row-between" style="font-weight:900"><span>Total</span><span>${Z(total())}</span></div>
      </div>
    </div>
  </div>

  <div class="dock">
    <div class="dockCard">
      <div class="row-between" style="font-weight:900"><span>Total</span><span>${Z(total())}</span></div>
      <button class="btn w-100" style="margin-top:8px" data-action="place-order" ${(!state.address || !state.payment || flatCount()===0)?'disabled':''}>Place Order</button>
    </div>
  </div>`;
  return html;
}

function viewConfirm(){
  return `
    <div class="container center">
      <div style="width:64px;height:64px;border-radius:999px;background:#ecfdf5;margin:12px auto;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(22,163,74,.18)">
        <svg viewBox="0 0 24 24" width="34" height="34" stroke="#16a34a" fill="none" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="section-title">Order Confirmed</div>
      <div class="subtitle" style="margin-top:8px">Thanks for shopping at THE MARKETPLACE.</div>

      <div class="card" style="max-width:460px;margin:12px auto 0">
        <div class="card-content">
          <div class="row-between"><span class="subtitle">Order #</span><span>TM-${Math.floor(Math.random()*90000 + 10000)}</span></div>
          <div class="row-between"><span class="subtitle">Delivery</span><span>${deliveryFee()===0?'FREE':Z(deliveryFee())}</span></div>
          <div class="divider"></div>
          <div class="row-between" style="font-weight:900"><span>Total</span><span>${Z(total())}</span></div>
        </div>
      </div>

      <div class="row" style="gap:8px;justify-content:center;margin-top:12px">
        <button class="btn" data-action="finish-order">Back to Home</button>
        <button class="btn secondary" data-action="goto" data-route="home">Track Order (demo)</button>
      </div>
    </div>`;
}

function searchAll(query){
  const q = (query||"").trim().toLowerCase();
  if (!q) return [];
  const rows = [];
  for (const [cat,list] of Object.entries(categories)){
    for (const p of list){
      if (p.name.toLowerCase().includes(q)){
        rows.push({cat, product:p});
      }
    }
  }
  return rows;
}

function viewSearch(){
  const q = state.searchQuery;
  const rows = searchAll(q);
  let html = `<div class="container">
    <div class="section-title">Search results</div>
    <div class="subtitle">for “${(q||'').replace(/</g,'&lt;')}” — ${rows.length} match${rows.length===1?'':'es'}</div>
  </div>`;
  html += `<div class="container grid grid-2">`;
  for (const {cat,product:p} of rows){
    const key = `${cat}-${p.name}`;
    const qty = state.cart[key] ?? 0;
    html += `
      <div class="card">
        <div class="card-content">
          <div class="row" style="gap:10px">
            <img class="img" loading="lazy" decoding="async" width="200" height="200" src="${imgForProduct(p, cat)}" alt="${p.name}" />
            <div class="w-100">
              <div class="section-title" style="margin:0;font-size:15px">${p.name}</div>
              <div class="subtitle">${cat} • Base ${Z(p.price)}</div>
              <div class="row" style="gap:6px;margin-top:8px">
                <button class="icon-btn" data-action="dec" data-key="${enc(key)}" aria-label="Decrease ${p.name}">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/></svg>
                </button>
                <div style="width:28px;text-align:center">${qty}</div>
                <button class="btn" style="padding:8px 10px" data-action="add" data-key="${enc(key)}" aria-label="Increase ${p.name}">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="#fff" fill="none" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
                </button>
                <button class="btn secondary" style="padding:6px 10px;border-radius:999px" data-action="open-compare" data-category="${enc(cat)}" data-product="${enc(p.name)}">Compare</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
  html += `</div>`;
  return html;
}

/* -------- Render (FIXED: Focus Restoration) -------- */
function render(){
  // 1. Capture current focus
  const activeId = document.activeElement ? document.activeElement.id : null;
  const cursorStart = document.activeElement ? document.activeElement.selectionStart : 0;
  const cursorEnd = document.activeElement ? document.activeElement.selectionEnd : 0;

  const app = document.getElementById("app");
  let html = "";
  if (state.route==="home") html = viewHome();
  else if (state.route==="category") html = viewCategory();
  else if (state.route==="compare") html = viewCompare();
  else if (state.route==="cart") html = viewCart();
  else if (state.route==="checkout") html = viewCheckout();
  else if (state.route==="confirm") html = viewConfirm();
  else if (state.route==="search") html = viewSearch();
  app.innerHTML = html;

  headerAdjust();
  highlightActiveCat();

  // 2. Restore focus if valid
  if(activeId){
    const el = document.getElementById(activeId);
    if(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")){
      el.focus();
      // Restore cursor position
      if(typeof el.selectionStart === "number"){
        el.setSelectionRange(cursorStart, cursorEnd);
      }
    }
  }
}

/* ---------- Header search + categories ---------- */
const catsOrder = Object.keys(categoryImages);

function catIconSVG(cat){
  const stroke = 'currentColor';
  const icons = {
    'Staples': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2" aria-hidden="true"><path d="M4 7l8-4 8 4v10l-8 4-8-4V7z"/><path d="M4 7l8 4 8-4"/></svg>`,
    'Fresh Produce': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 3c2 3 2 6 0 9-2 3-5 3-8 3 0-3 1-6 3-8 2-2 5-3 8-4z"/><path d="M12 3c3 0 6 3 6 6 0 4-3 7-7 7"/></svg>`,
    'Fruits': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 7c2-4 7-3 8 1-1 4-5 7-8 7s-7-3-8-7c1-4 6-5 8-1z"/><path d="M12 7c0-2 2-4 4-4"/></svg>`,
    'Toiletries': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><rect x="4" y="6" width="8" height="14" rx="2"/><path d="M8 3h6v3H8z"/><path d="M14 8h4v12h-4z"/></svg>`,
    'Beverages': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M8 3h8l-1 5v9a3 3 0 0 1-6 0V8z"/><path d="M9 8h6"/></svg>`,
    'Cleaning': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M4 20h16"/><path d="M6 20l3-10h6l3 10"/><path d="M10 6h4"/></svg>`,
    'Bakery': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M3 12a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2H3z"/><path d="M7 16h10"/></svg>`,
    'Meat & Poultry': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M14 3c4 0 7 3 7 7 0 3-2 6-5 6-2 0-4-2-6-2S5 16 3 14s1-4 0-6c2 0 4 2 6 2 2 0 4-7 5-7z"/></svg>`,
    'Dairy & Eggs': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M7 14a5 7 0 1 0 10 0 5 7 0 1 0-10 0z"/><path d="M12 2l4 4-4 4-4-4 4-4z"/></svg>`,
    'Snacks': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="11" cy="15" r="1"/></svg>`,
    'Frozen': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 2v20"/><path d="M4 6l16 12"/><path d="M20 6L4 18"/></svg>`,
    'Household & Paper': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M7 5h10a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6z"/><path d="M7 11v8a2 2 0 0 0 2 2h6"/></svg>`,
    'Health & Beauty': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"/></svg>`,
    'Pet Care': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M6 14c2-2 10-2 12 0 1 1-1 4-6 4s-7-3-6-4z"/></svg>`,
    'Essentials': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><path d="M4 7h16v10H4z"/><path d="M7 10h10M7 14h6"/></svg>`
  };
  return icons[cat] || `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>`;
}

function buildCatsBar(){
  const bar = document.getElementById('catsBar');
  if (!bar) return;
  bar.innerHTML = catsOrder.map(cat => `
    <button class="catChip" data-action="open-category" data-category="${enc(cat)}" role="tab" aria-label="${cat}">
      <span class="catIcon">${catIconSVG(cat)}</span>${cat}
    </button>
  `).join('');
  bar.addEventListener('click', (e)=>{
    const btn = e.target.closest('.catChip');
    if (!btn) return;
    state.currentCategory = dec(btn.dataset.category);
    state.query = "";
    navigate('category');
  }, {passive:true});
}

function highlightActiveCat(){
  const all = document.querySelectorAll('.catChip');
  all.forEach(el=>el.classList.remove('active'));
  if (state.route==='category' && state.currentCategory){
    const active = Array.from(all).find(el => dec(el.dataset.category) === state.currentCategory);
    if (active) active.classList.add('active');
  }
}

/* ---------- Menu toggle + fill categories inside the menu ---------- */
const navPanel = document.getElementById('navPanel');
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-action="toggle-nav"]');
  if (btn){ navPanel.classList.toggle('show'); return; }
  if (navPanel.classList.contains('show') && !e.target.closest('#navPanel') && !btn){
    navPanel.classList.remove('show');
  }
}, {passive:true});

function buildMenuCats(){
  const wrap = document.getElementById('menuCats');
  if (!wrap) return;
  wrap.innerHTML = catsOrder.map(cat => `
    <button class="catChip" data-action="open-category-menu" data-category="${enc(cat)}" role="tab" aria-label="${cat}">
      <span class="catIcon">${catIconSVG(cat)}</span>${cat}
    </button>
  `).join('');
}

/* ---------- Header search + TYPEAHEAD + QUICK VIEW ---------- */
const headerInput = document.getElementById('globalSearchInputHeader');
const headerGo = document.getElementById('globalSearchGoHeader');
const typeaheadBox = document.getElementById('typeahead');

function suggest(q){
  const term = (q||"").trim().toLowerCase();
  if (!term) return [];
  const found = [];
  for (const [cat,list] of Object.entries(categories)){
    for (const p of list){
      if (p.name.toLowerCase().includes(term)){
        found.push({cat, product:p});
        if (found.length>=6) return found;
      }
    }
  }
  return found;
}

function renderTypeahead(list){
  if (!list.length){ typeaheadBox.innerHTML=''; typeaheadBox.classList.add('hidden'); return; }
  typeaheadBox.innerHTML = list.map(({cat,product:p},i)=>`
    <button role="option" data-action="typeahead-pick" data-cat="${enc(cat)}" data-name="${enc(p.name)}">
      <img alt="" width="28" height="28" style="width:28px;height:28px;border-radius:8px;border:1px solid var(--border)" src="${imgForProduct(p, cat)}"/>
      <span style="font-weight:700">${p.name}</span>
      <span class="subtitle" style="margin-left:auto">${cat}</span>
    </button>
  `).join('');
  typeaheadBox.classList.remove('hidden');
}

function quickView({cat, product:p}){
  const key = `${cat}-${p.name}`;
  const qty = state.cart[key] ?? 0;
  const html = `
    <div class="row" style="gap:10px">
      <img class="img" loading="lazy" decoding="async" width="200" height="200" src="${imgForProduct(p, cat)}" alt="${p.name}" />
      <div class="w-100">
        <div id="modalTitle" class="section-title" style="margin:0;font-size:17px">${p.name}</div>
        <div class="subtitle">${cat} • Base ${Z(p.price)}</div>
        <div class="row" style="gap:6px;margin-top:10px">
          <button class="icon-btn" data-action="dec" data-key="${enc(key)}" aria-label="Decrease ${p.name}">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/></svg>
          </button>
          <div style="width:28px;text-align:center">${qty}</div>
          <button class="btn" style="padding:8px 10px" data-action="add" data-key="${enc(key)}" aria-label="Increase ${p.name}">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="#fff" fill="none" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button class="btn secondary" style="padding:6px 10px;border-radius:999px" data-action="open-compare" data-category="${enc(cat)}" data-product="${enc(p.name)}">Compare</button>
        </div>
      </div>
    </div>`;
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modal').classList.add('show');
}

const runHeaderSearch = ()=>{
  const q = headerInput.value.trim();
  if (!q) return;
  const suggestions = suggest(q);
  const exact = suggestions.find(x => x.product.name.toLowerCase() === q.toLowerCase());
  const first = suggestions[0];
  if (exact || first){ quickView(exact || first); }
  state.searchQuery = q;
  navigate('search');
  typeaheadBox.classList.add('hidden');
};
headerGo.addEventListener('click', runHeaderSearch, {passive:true});
headerInput.addEventListener('keydown', (e)=>{ if (e.key==='Enter') runHeaderSearch(); }, {passive:true});
headerInput.addEventListener('input', debounce((e)=>{
  const list = suggest(e.target.value);
  renderTypeahead(list);
}, 120), {passive:true});

/* -------- Global events -------- */
document.addEventListener("click", (e)=>{
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const act = el.dataset.action;

  if (act==="goto"){ navigate(el.dataset.route); return; }
  if (act==="open-category"){ state.currentCategory = dec(el.dataset.category); state.query=""; navigate("category"); return; }
  if (act==="open-category-menu"){ // from menu, also close the panel
    state.currentCategory = dec(el.dataset.category); state.query=""; navPanel.classList.remove('show'); navigate("category"); return;
  }
  if (act==="open-compare"){
    const cat = dec(el.dataset.category); const name = dec(el.dataset.product);
    state.currentCategory = cat;
    state.selectedProduct = (categories[cat] || []).find(p=>p.name===name) || null;
    document.getElementById('modal').classList.remove('show'); // close modal if open
    navigate("compare"); return;
  }
  if (act==="add"){ addToCart(dec(el.dataset.key)); return; }
  if (act==="dec"){ decFromCart(dec(el.dataset.key)); return; }
  if (act==="add-offer"){ addToCart(dec(el.dataset.key), Number(el.dataset.price)); return; }
  if (act==="set-sort"){ state.compareSort = el.dataset.sort; render(); return; }
  if (act==="reset-weights"){ resetWeights(); render(); return; }
  if (act==="select-payment"){ state.payment = el.dataset.value; savePersisted(); render(); return; }
  if (act==="place-order"){
    if (!state.address || !state.payment || flatCount()===0) { toast("Add address + payment", "error"); return; }
    navigate("confirm"); return;
  }
  if (act==="finish-order"){ state.cart = {}; state.cartPriceOverrides = {}; savePersisted(); navigate("home"); return; }
  if (act==="typeahead-pick"){
    const cat = dec(el.dataset.cat); const name = dec(el.dataset.name);
    state.currentCategory = cat;
    state.selectedProduct = (categories[cat]||[]).find(p=>p.name===name) || null;
    typeaheadBox.classList.add('hidden');
    quickView({cat, product: state.selectedProduct});
    navigate("search"); // also show results
    return;
  }
  if (act==="close-modal"){ document.getElementById('modal').classList.remove('show'); return; }
}, {passive:true});

// Hide typeahead when clicking outside
document.addEventListener('click',(e)=>{
  if(!e.target.closest('.searchRow')) typeaheadBox.classList.add('hidden');
}, {passive:true});

// Debounced search rendering (category)
const searchDebounced = debounce(()=>render(), 120);
document.addEventListener("input", (e)=>{
  const el = e.target;
  if (el.dataset && el.dataset.model){
    state[el.dataset.model] = el.value;
    if (el.dataset.model==="query"){ searchDebounced(); return; }
    savePersisted();
  }
  if (el.dataset && el.dataset.weight){
    state.weightsPct[el.dataset.weight] = Number(el.value);
    savePersisted();
    render();
  }
}, {passive:true});

/* ---------- Floating nav “dimming” to reduce distraction ---------- */
(() => {
  const nav = document.getElementById('bottomNav');
  let lastY = window.scrollY;
  let dimT;
  function dimSoon(){
    clearTimeout(dimT);
    nav.classList.remove('dim');
    dimT = setTimeout(()=> nav.classList.add('dim'), 900);
  }
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if (y > lastY + 10) nav.classList.add('dim');       // scrolling down → dim
    else if (y < lastY - 10) nav.classList.remove('dim'); // scrolling up → brighten
    lastY = y;
    dimSoon();
  }, {passive:true});
  dimSoon();
})();

/* -------- Boot -------- */
function boot(){
  loadPersisted();
  applyHash();
  buildCatsBar();
  buildMenuCats();
  render();
}
boot();