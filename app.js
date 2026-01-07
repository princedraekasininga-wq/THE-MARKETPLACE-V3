/* =====================
   Clean & Calm logic v3.5 (Mobile Optimized)
   ===================== */

/* -------- Image helpers -------- */
const imgForCategory = (cat) => `https://placehold.co/480x260/e2e8f0/16a34a?text=${encodeURIComponent(cat)}`;
const imgForProduct = (p, catName) => `https://placehold.co/300x300/f1f5f9/0f172a?text=${encodeURIComponent(p.name)}`;

/* Helper to recover category name */
const getCategoryFromBaseKey = (baseKey) => {
  for(const cat of Object.keys(categories)) {
    if(baseKey.startsWith(cat + "-")) return cat;
  }
  const idx = baseKey.indexOf("-");
  return idx === -1 ? baseKey : baseKey.slice(0, idx);
};

/* -------- Haptics Helper -------- */
const vibrate = () => {
  if (navigator.vibrate) navigator.vibrate(10);
};

/* -------- Data -------- */
const categoryImages = {
  "Staples":"grain", "Fresh Produce":"veg", "Fruits":"fruit", "Toiletries":"soap",
  "Beverages":"drinks", "Cleaning":"clean", "Bakery":"bread", "Meat & Poultry":"meat",
  "Dairy & Eggs":"milk", "Snacks":"chips", "Frozen":"freeze", "Household & Paper":"paper",
  "Health & Beauty":"beauty", "Pet Care":"dog", "Essentials":"home"
};

const stores = [
  { id:"shoprite-longacres", name:"Shoprite Longacres", distanceKm:4.1, baseEta:35, deliveryFee:20, rating:4.3 },
  { id:"picknpay-woodlands", name:"Pick n Pay Woodlands", distanceKm:6.0, baseEta:45, deliveryFee:25, rating:4.6 },
  { id:"choppies-levy", name:"Choppies Levy", distanceKm:7.8, baseEta:50, deliveryFee:18, rating:4.0 },
  { id:"foodlovers-eastpark", name:"Food Lover’s EastPark", distanceKm:2.8, baseEta:30, deliveryFee:28, rating:4.7 }
];

const categories = {
  "Staples":[
    { name:"Roller Meal 25kg", price:280 }, { name:"Breakfast Mealie Meal 25kg", price:320 },
    { name:"Kapenta (Dry Fish)", price:150 }, { name:"Dry Beans 5kg", price:120 },
    { name:"Groundnuts 5kg", price:140 }, { name:"Rice 5kg", price:110 },
    { name:"Cooking Oil 2L", price:85 }, { name:"Sugar 2kg", price:55 },
    { name:"Salt 1kg", price:15 }, { name:"Flour 5kg", price:95 }
  ],
  "Fresh Produce":[
    { name:"Tomatoes 1kg", price:25 }, { name:"Onions 1kg", price:20 },
    { name:"Rape Vegetables", price:15 }, { name:"Cabbage", price:20 },
    { name:"Spinach", price:18 }, { name:"Lettuce", price:15 },
    { name:"Carrots 1kg", price:22 }, { name:"Green Peppers 500g", price:24 }
  ],
  "Fruits":[
    { name:"Apples 1kg", price:45 }, { name:"Bananas (bunch)", price:30 },
    { name:"Oranges 1kg", price:25 }, { name:"Avocados 1kg", price:35 },
    { name:"Mangoes 1kg", price:28 }, { name:"Pineapple (whole)", price:40 },
    { name:"Watermelon (whole)", price:55 }, { name:"Lemons 1kg", price:22 }
  ],
  "Toiletries":[
    { name:"Geisha Soap 250g", price:15 }, { name:"Protex Soap", price:20 },
    { name:"Colgate Toothpaste", price:30 }, { name:"Toothbrush", price:10 },
    { name:"Always Pads (10)", price:35 }, { name:"Baby Diapers (20)", price:150 },
    { name:"Vaseline Jelly", price:50 }, { name:"Body Lotion", price:70 }
  ],
  "Beverages":[
    { name:"Coca Cola 2L", price:25 }, { name:"Fanta 2L", price:25 },
    { name:"Mineral Water 1.5L", price:10 }, { name:"Jungle Oats 1kg", price:45 },
    { name:"Rooibos Tea", price:65 }, { name:"Fresh Milk 1L", price:18 },
    { name:"Milo 500g", price:85 }, { name:"Instant Coffee", price:70 }
  ],
  "Cleaning":[
    { name:"Boom Powder 2kg", price:50 }, { name:"Dish Liquid 750ml", price:40 },
    { name:"Domestos Cleaner", price:55 }, { name:"Hand Wash", price:35 },
    { name:"Broom", price:25 }, { name:"Mop Set", price:95 },
    { name:"Floor Polish 1L", price:65 }, { name:"Bleach 1L", price:25 }
  ],
  "Bakery":[
    { name:"White Bread", price:25 }, { name:"Wholewheat Bread", price:30 },
    { name:"Burger Buns (6)", price:28 }, { name:"Croissants (4)", price:40 },
    { name:"Scones (6)", price:35 }, { name:"Cupcakes (6)", price:50 }
  ],
  "Meat & Poultry":[
    { name:"Beef Steak 1kg", price:160 }, { name:"Chicken Thighs 1kg", price:95 },
    { name:"Whole Chicken", price:120 }, { name:"Beef Mince 1kg", price:130 },
    { name:"Pork Chops 1kg", price:145 }, { name:"Boerewors 1kg", price:110 }
  ],
  "Dairy & Eggs":[
    { name:"Eggs Tray (30)", price:85 }, { name:"Cheddar Cheese 500g", price:95 },
    { name:"Butter 500g", price:75 }, { name:"Yogurt 500ml", price:40 },
    { name:"Fresh Milk 1L", price:18 }, { name:"Sour Milk (Mabisi)", price:25 }
  ],
  "Snacks":[
    { name:"Potato Crisps", price:25 }, { name:"Chocolate Bar", price:30 },
    { name:"Biscuits 200g", price:28 }, { name:"Popcorn Kernels", price:22 },
    { name:"Roasted Peanuts", price:18 }, { name:"Crackers", price:20 }
  ],
  "Frozen":[
    { name:"Mixed Veg 1kg", price:45 }, { name:"Chicken Nuggets", price:70 },
    { name:"Frozen Chips 1kg", price:40 }, { name:"Ice Cream 1L", price:65 },
    { name:"Fish Fingers", price:60 }, { name:"Berry Mix", price:80 }
  ],
  "Household & Paper":[
    { name:"Paper Towels 2pk", price:35 }, { name:"Toilet Paper 9pk", price:65 },
    { name:"Aluminium Foil", price:40 }, { name:"Bin Bags (20)", price:45 },
    { name:"Matches (10)", price:15 }, { name:"Batteries AA (4)", price:55 }
  ],
  "Health & Beauty":[
    { name:"Shampoo 400ml", price:55 }, { name:"Conditioner 400ml", price:55 },
    { name:"Deodorant 150ml", price:45 }, { name:"Hand Sanitizer", price:30 },
    { name:"Pads (10)", price:35 }, { name:"Body Wash 500ml", price:50 }
  ],
  "Pet Care":[
    { name:"Dog Food 2kg", price:120 }, { name:"Cat Food 2kg", price:115 },
    { name:"Cat Litter 10kg", price:95 }, { name:"Pet Shampoo", price:40 }
  ],
  "Essentials":[
    { name:"Mineral Water 1.5L", price:10 }, { name:"Cooking Oil 2L", price:85 },
    { name:"Sugar 2kg", price:55 }, { name:"Salt 1kg", price:15 },
    { name:"Charcoal 25kg", price:150 }, { name:"Gas Refill 6kg", price:190 }
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

/* -------- Helpers -------- */
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

/* -------- Offers Logic -------- */
const resetWeights = ()=>{ state.weightsPct = { price:45, distance:20, eta:15, fee:10, rating:10 }; savePersisted(); };
function makeOffers(product){
  const h = product.name.split("").reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0) >>> 0, 0);
  const base = product.price;
  return stores.map((s,i)=>{
    const factor = ((h + i*13) % 15 - 7) / 100;
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
const LS_KEY = 'marketplace_mobile_v35';
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
window.addEventListener('hashchange', ()=>{
  applyHash();
  // Scroll to top on navigation change, but NOT if hash change is just query param update for same view
  window.scrollTo(0,0);
  render();
}, {passive:true});

/* -------- Core Actions -------- */
function updateModalCount(key) {
  const modal = document.getElementById('modal');
  if (!modal || !modal.classList.contains('show')) return;
  const qtyDisplay = modal.querySelector('.card-content .row div[aria-live="polite"]')
                  || modal.querySelector('.w-100 div[style*="text-align:center"]');
  const matchingBtn = modal.querySelector(`button[data-key="${enc(key)}"]`);
  if (matchingBtn && qtyDisplay) {
    qtyDisplay.textContent = state.cart[key] ?? 0;
  }
}

function addToCart(key, priceOverride){
  vibrate();
  state.cart[key] = (state.cart[key] ?? 0) + 1;
  if (priceOverride != null) state.cartPriceOverrides[key] = priceOverride;
  popBubble();
  toast(`${getCatalogProduct(key).name} added`, "success");
  savePersisted();
  render(true); // true = preserve scroll
  updateModalCount(key);
}

function decFromCart(key){
  vibrate();
  state.cart[key] = Math.max(0,(state.cart[key] ?? 0) - 1);
  savePersisted();
  render(true); // true = preserve scroll
  updateModalCount(key);
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

/* -------- Toast -------- */
let toastT;
function toast(msg, kind="info"){
  clearTimeout(toastT);
  let node = document.getElementById('toaster');
  if(!node){
    node = document.createElement('div');
    node.id = 'toaster';
    node.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:100px;background:#1e293b;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.2);padding:10px 16px;border-radius:24px;z-index:70;font-weight:600;font-size:13px;pointer-events:none;transition:opacity 0.2s";
    document.body.appendChild(node);
  }
  node.textContent = msg;
  node.style.background = kind==="success" ? "#16a34a" : (kind==="error" ? "#ef4444" : "#1e293b");
  node.style.opacity = "1";
  toastT = setTimeout(()=>{ node.style.opacity="0"; }, 1500);
}

/* -------- Views -------- */
function headerAdjust(){
  document.querySelectorAll(".nav-btn").forEach(el=>el.classList.remove("active"));
  if (state.route==="home") document.getElementById("navHome").classList.add("active");
  if (state.route==="search") document.getElementById("navSearch").classList.add("active");
}

function viewHome(){
  let html = '<div class="container grid-2">';
  for (const cat of Object.keys(categoryImages)){
    const count = (categories[cat]||[]).length;
    html += `
      <div class="card" data-action="open-category" data-category="${enc(cat)}" style="cursor:pointer;display:flex;flex-direction:column;height:100%" aria-label="Open ${cat}">
        <div class="card-content" style="flex:1;display:flex;flex-direction:column">
          <img loading="lazy" width="100%" height="auto" class="img" src="${imgForCategory(cat)}" alt="${cat}"/>
          <div style="margin-top:10px;flex:1">
            <div class="section-title" style="font-size:14px;line-height:1.2">${cat}</div>
            <div class="subtitle" style="margin-top:2px">${count} items</div>
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
    <div class="container grid-2">`;
  for (const p of list){
    const key = `${cat}-${p.name}`;
    const qty = state.cart[key] ?? 0;
    html += `
      <div class="card">
        <div class="card-content center" style="display:flex;flex-direction:column;height:100%">
          <img loading="lazy" width="200" height="200" class="img" src="${imgForProduct(p, cat)}" alt="${p.name}"/>
          <div style="margin-top:8px;font-weight:800;font-size:13px;line-height:1.2;flex:1;text-align:center">${p.name}</div>
          <div class="subtitle" style="margin-top:4px">${Z(p.price)}</div>

          ${qty === 0 ? `
            <button class="btn w-100" style="margin-top:8px;padding:8px" data-action="add" data-key="${enc(key)}">Add</button>
          ` : `
            <div class="row" style="gap:6px;margin-top:8px;justify-content:center">
              <button class="icon-btn" style="background:#f1f5f9;border:0" data-action="dec" data-key="${enc(key)}">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2.5"><path d="M5 12h14"/></svg>
              </button>
              <div style="width:24px;text-align:center;font-weight:700">${qty}</div>
              <button class="icon-btn" style="background:#16a34a;color:#fff;border:0" data-action="add" data-key="${enc(key)}">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          `}

          <button class="btn secondary w-100" style="margin-top:8px;padding:6px;font-size:11px" data-action="open-compare" data-product="${enc(p.name)}" data-category="${enc(cat)}">Compare</button>
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
  const top      = offers[0];

  let html = `
    <div class="container">
      <div class="row">
        <img loading="lazy" width="56" height="56" class="img" style="width:56px;height:56px" src="${imgForProduct(p, state.currentCategory)}" alt="${p.name}"/>
        <div style="padding-left:10px">
          <div class="section-title" style="margin:0;font-family:Poppins">${p.name}</div>
          <div class="subtitle">Best Offer: ${Z(top.price)}</div>
        </div>
      </div>

      <div class="card" style="margin-top:12px">
        <div class="card-content">
          <div class="row-between">
            <strong style="font-family:Poppins">Preference Weights</strong>
            <button class="icon-btn" data-action="reset-weights" title="Reset">↺</button>
          </div>
          <div class="grid" style="grid-template-columns:1fr;gap:12px;margin-top:12px">
            ${[["Price","price"],["Distance","distance"],["ETA","eta"]].map(([label,key])=>`
              <div class="row">
                <label style="width:70px;color:#475569;font-size:12px;font-weight:600">${label}</label>
                <input type="range" min="0" max="100" value="${state.weightsPct[key]}" data-weight="${key}" class="w-100" style="margin:0 10px"/>
              </div>
            `).join("")}
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

    html += `
      <div class="card" style="${isTop?'border:1.5px solid #22c55e;background:#f0fdf4':''}">
        <div class="card-content row" style="gap:10px">
          <div class="w-100">
            <div class="row" style="gap:8px">
              <div style="font-weight:900;font-family:Poppins;font-size:14px">${o.storeName}</div>
              ${isTop?'<span class="badge" style="background:#22c55e;color:#fff;border:0">Best</span>':''}
            </div>
            <div class="grid" style="grid-template-columns:1fr 1fr;gap:4px;margin-top:6px;font-size:12px">
              <div>Price: <span class="price">${Z(o.price)}</span></div>
              <div>Total: <span class="price">${Z(estTotal)}</span></div>
              <div style="color:#64748b">${o.distanceKm.toFixed(1)} km</div>
              <div style="color:#64748b">${o.etaMin} min</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <button class="btn" data-action="add-offer" data-key="${enc(key)}" data-price="${o.price}" style="padding:10px 14px">Add</button>
          </div>
        </div>
      </div>`;
  }
  html += `</div>`;
  return html;
}

function dockCart(){
  if (flatCount()===0) return '';
  return `
  <div class="dock">
    <div class="dockCard">
      <div class="row-between" style="font-weight:900;margin-bottom:12px;font-size:16px"><span>Total</span><span>${Z(total())}</span></div>
      <div class="row" style="gap:12px">
        <button class="btn secondary" style="flex:1" data-action="goto" data-route="home">Shop</button>
        <button class="btn w-100" style="flex:2" data-action="goto" data-route="checkout">Checkout</button>
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
          <img loading="lazy" width="60" height="60" class="img" style="width:60px;height:60px" src="${imgForProduct(p, catName)}" alt="${p.name}"/>
          <div class="w-100">
            <div style="font-weight:900;font-family:Poppins;font-size:13px">${p.name}</div>
            <div class="subtitle" style="font-size:11px">${fmtStore(store)}</div>
            <div class="row" style="margin-top:6px;justify-content:space-between">
              <span style="font-weight:700">${Z(price*qty)}</span>
              <div class="row" style="gap:8px">
                <button class="icon-btn" style="width:28px;height:28px" data-action="dec" data-key="${enc(key)}">-</button>
                <div style="width:16px;text-align:center;font-size:13px">${qty}</div>
                <button class="icon-btn" style="width:28px;height:28px;background:#16a34a;color:#fff;border:0" data-action="add" data-key="${enc(key)}">+</button>
              </div>
            </div>
          </div>
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
        <div class="section-title" style="margin-bottom:8px;font-size:14px">Delivery Address</div>
        <input class="input" placeholder="House 12, Road..." value="${(state.address||'').replace(/"/g,'&quot;')}" data-model="address"/>
      </div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="card-content">
        <div class="section-title" style="margin-bottom:8px;font-size:14px">Payment</div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:8px">
          ${["MTN MoMo","Airtel Money","Zamtel","Cash"].map(m=>`
            <button class="btn secondary" data-action="select-payment" data-value="${m}" style="justify-self:stretch;text-align:center;padding:12px 4px;font-size:12px;border:${state.payment===m?'2px solid #16a34a':'1px solid var(--border)'};background:${state.payment===m?'#f0fdf4':'var(--panel)'}">${m}</button>
          `).join("")}
        </div>
      </div>
    </div>
  </div>

  <div class="dock">
    <div class="dockCard">
      <div class="row-between" style="font-weight:900;margin-bottom:8px"><span>Total</span><span>${Z(total())}</span></div>
      <button class="btn w-100" data-action="place-order" ${(!state.address || !state.payment || flatCount()===0)?'disabled':''}>Place Order</button>
    </div>
  </div>`;
  return html;
}

function viewConfirm(){
  return `
    <div class="container center" style="padding-top:40px">
      <div style="width:80px;height:80px;border-radius:999px;background:#ecfdf5;margin:0 auto;display:flex;align-items:center;justify-content:center">
        <svg viewBox="0 0 24 24" width="40" height="40" stroke="#16a34a" fill="none" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="section-title" style="font-size:24px;margin-top:16px">Confirmed!</div>
      <div class="subtitle">Thank you for shopping.</div>
      <div class="card" style="margin:20px auto 0">
        <div class="card-content">
          <div class="row-between"><span class="subtitle">Total Paid</span><span class="price">${Z(total())}</span></div>
        </div>
      </div>
      <button class="btn w-100" style="margin-top:24px" data-action="finish-order">Back Home</button>
    </div>`;
}

function searchAll(query){
  const q = (query||"").trim().toLowerCase();
  if (!q) return [];
  const rows = [];
  for (const [cat,list] of Object.entries(categories)){
    for (const p of list){
      if (p.name.toLowerCase().includes(q)) rows.push({cat, product:p});
    }
  }
  return rows;
}

function viewSearch(){
  const q = state.searchQuery;
  const rows = searchAll(q);
  let html = `<div class="container"><div class="section-title">Search: "${(q||'').replace(/</g,'&lt;')}"</div></div>`;
  html += `<div class="container grid-2">`;
  for (const {cat,product:p} of rows){
    const key = `${cat}-${p.name}`;
    html += `
      <div class="card" data-action="typeahead-pick" data-cat="${enc(cat)}" data-name="${enc(p.name)}">
        <div class="card-content center">
          <img class="img" width="100" height="100" src="${imgForProduct(p, cat)}" />
          <div style="margin-top:6px;font-weight:700">${p.name}</div>
          <div class="subtitle">${cat}</div>
        </div>
      </div>`;
  }
  html += `</div>`;
  return html;
}

/* -------- Render -------- */
function render(preserveScroll = false){
  // 1. Capture focus
  const activeId = document.activeElement ? document.activeElement.id : null;
  const scrollY = window.scrollY; // Capture scroll position

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

  // 2. Restore focus
  if(activeId){
    const el = document.getElementById(activeId);
    if(el && (el.tagName === "INPUT")) el.focus();
  }

  // 3. Smart scroll restore
  if (preserveScroll) {
    window.scrollTo(0, scrollY);
  }
}

/* ---------- Header search + categories ---------- */
const catsOrder = Object.keys(categoryImages);
function catIconSVG(cat){ return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>`; } // simplified for size

function buildCatsBar(){
  const bar = document.getElementById('catsBar');
  if (!bar) return;
  bar.innerHTML = catsOrder.map(cat => `
    <button class="catChip" data-action="open-category" data-category="${enc(cat)}">
      ${cat}
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
    if (active) {
      active.classList.add('active');
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }
}

/* ---------- Menu (Bottom Sheet) ---------- */
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
    <button class="catChip" data-action="open-category-menu" data-category="${enc(cat)}">
      ${cat}
    </button>
  `).join('');
}

/* ---------- Search Typeahead ---------- */
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
      <img width="32" height="32" style="border-radius:6px" src="${imgForProduct(p, cat)}"/>
      <div style="flex:1">
        <div style="font-weight:700;font-size:13px">${p.name}</div>
        <div class="subtitle">${cat}</div>
      </div>
    </button>
  `).join('');
  typeaheadBox.classList.remove('hidden');
}

function quickView({cat, product:p}){
  const key = `${cat}-${p.name}`;
  const qty = state.cart[key] ?? 0;
  const html = `
    <div class="row" style="gap:16px;align-items:flex-start">
      <img class="img" width="120" height="120" src="${imgForProduct(p, cat)}" />
      <div class="w-100">
        <div id="modalTitle" class="section-title" style="margin:0;font-size:18px">${p.name}</div>
        <div class="subtitle" style="margin-top:4px">${cat} • Base ${Z(p.price)}</div>

        <div class="row" style="gap:12px;margin-top:16px">
          ${qty>0 ? `
             <div class="row" style="gap:10px;background:#f1f5f9;border-radius:12px;padding:4px">
               <button class="icon-btn" data-action="dec" data-key="${enc(key)}">-</button>
               <span style="font-weight:700;padding:0 4px">${qty}</span>
               <button class="icon-btn" style="background:#fff" data-action="add" data-key="${enc(key)}">+</button>
             </div>
          ` : `
             <button class="btn" style="flex:1" data-action="add" data-key="${enc(key)}">Add to Cart</button>
          `}
        </div>
        <button class="btn secondary w-100" style="margin-top:12px" data-action="open-compare" data-category="${enc(cat)}" data-product="${enc(p.name)}">Compare Prices</button>
      </div>
    </div>`;
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modal').classList.add('show');
}

const runHeaderSearch = ()=>{
  const q = headerInput.value.trim();
  if (!q) return;
  const suggestions = suggest(q);
  const first = suggestions[0];
  if (first) quickView(first);
  state.searchQuery = q;
  navigate('search');
  typeaheadBox.classList.add('hidden');
};
headerGo.addEventListener('click', runHeaderSearch, {passive:true});
headerInput.addEventListener('keydown', (e)=>{ if (e.key==='Enter') runHeaderSearch(); }, {passive:true});
headerInput.addEventListener('input', debounce((e)=>{
  renderTypeahead(suggest(e.target.value));
}, 120), {passive:true});

/* -------- Events -------- */
document.addEventListener("click", (e)=>{
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const act = el.dataset.action;

  if (act==="goto"){ navigate(el.dataset.route); return; }
  if (act==="open-category"){ state.currentCategory = dec(el.dataset.category); state.query=""; navigate("category"); return; }
  if (act==="open-category-menu"){
    state.currentCategory = dec(el.dataset.category); state.query=""; navPanel.classList.remove('show'); navigate("category"); return;
  }
  if (act==="open-compare"){
    const cat = dec(el.dataset.category); const name = dec(el.dataset.product);
    state.currentCategory = cat;
    state.selectedProduct = (categories[cat] || []).find(p=>p.name===name) || null;
    document.getElementById('modal').classList.remove('show');
    navigate("compare"); return;
  }
  if (act==="add"){ addToCart(dec(el.dataset.key)); return; }
  if (act==="dec"){ decFromCart(dec(el.dataset.key)); return; }
  if (act==="add-offer"){ addToCart(dec(el.dataset.key), Number(el.dataset.price)); return; }
  if (act==="reset-weights"){ resetWeights(); render(true); return; }
  if (act==="select-payment"){ state.payment = el.dataset.value; savePersisted(); render(true); return; }
  if (act==="place-order"){
    if (!state.address || !state.payment || flatCount()===0) { toast("Add address & payment", "error"); return; }
    navigate("confirm"); return;
  }
  if (act==="finish-order"){ state.cart = {}; state.cartPriceOverrides = {}; savePersisted(); navigate("home"); return; }
  if (act==="typeahead-pick"){
    const cat = dec(el.dataset.cat); const name = dec(el.dataset.name);
    state.currentCategory = cat;
    state.selectedProduct = (categories[cat]||[]).find(p=>p.name===name) || null;
    typeaheadBox.classList.add('hidden');
    quickView({cat, product: state.selectedProduct});
    navigate("search");
    return;
  }
  if (act==="close-modal"){ document.getElementById('modal').classList.remove('show'); return; }
}, {passive:true});

document.addEventListener('click',(e)=>{ if(!e.target.closest('.searchRow')) typeaheadBox.classList.add('hidden'); }, {passive:true});
const searchDebounced = debounce(()=>render(true), 120); // true = keep focus
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
    render(true);
  }
}, {passive:true});

/* -------- Boot -------- */
function boot(){
  loadPersisted();
  applyHash();
  buildCatsBar();
  buildMenuCats();
  render();
}
boot();