import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  Home,
  User,
  Minus,
  Plus,
  MapPin,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Star,
  Clock,
  Sliders,
} from "lucide-react";
import { motion } from "framer-motion";

export default function GroceryAppWireframeClassic() {
  type Product = { name: string; price: number; imageUrl: string };
  type Offer = {
    storeId: string;
    storeName: string;
    price: number; // ZMW
    distanceKm: number; // demo distance from user
    etaMin: number; // estimated delivery minutes
    deliveryFee: number; // ZMW
    rating: number; // 1-5
    __score?: number;
  };
  type Weights = { price: number; distance: number; eta: number; fee: number; rating: number };

  const [query, setQuery] = useState("");
  const [route, setRoute] = useState<
    "home" | "category" | "compare" | "cart" | "checkout" | "confirm" | "admin"
  >("home");
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [compareSort, setCompareSort] = useState<"smart" | "price" | "distance" | "eta" | "rating">(
    "smart"
  );

  const [weightsPct, setWeightsPct] = useState<Weights>({
    price: 45,
    distance: 20,
    eta: 15,
    fee: 10,
    rating: 10,
  });
  const resetWeights = () => setWeightsPct({ price: 45, distance: 20, eta: 15, fee: 10, rating: 10 });
  const normalizedWeights: Weights = useMemo(() => {
    const sum = Object.values(weightsPct).reduce((a, b) => a + b, 0) || 1;
    return {
      price: weightsPct.price / sum,
      distance: weightsPct.distance / sum,
      eta: weightsPct.eta / sum,
      fee: weightsPct.fee / sum,
      rating: weightsPct.rating / sum,
    };
  }, [weightsPct]);

  const [cart, setCart] = useState<Record<string, number>>({}); // key: `${cat}-${product}@store?`
  const [cartPriceOverrides, setCartPriceOverrides] = useState<Record<string, number>>({});
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<
    "MTN MoMo" | "Airtel Money" | "Zamtel Kwacha" | "Cash on Delivery" | ""
  >("");
  const [note, setNote] = useState("");

  // Demo stores (Lusaka)
  const stores = [
    {
      id: "shoprite-longacres",
      name: "Shoprite Longacres",
      distanceKm: 4.1,
      baseEta: 35,
      deliveryFee: 20,
      rating: 4.3,
    },
    {
      id: "picknpay-woodlands",
      name: "Pick n Pay Woodlands",
      distanceKm: 6.0,
      baseEta: 45,
      deliveryFee: 25,
      rating: 4.6,
    },
    {
      id: "choppies-levy",
      name: "Choppies Levy",
      distanceKm: 7.8,
      baseEta: 50,
      deliveryFee: 18,
      rating: 4.0,
    },
    {
      id: "foodlovers-eastpark",
      name: "Food Lover’s EastPark",
      distanceKm: 2.8,
      baseEta: 30,
      deliveryFee: 28,
      rating: 4.7,
    },
  ];

  // Catalog (pre-image-fix) — uses dynamic Unsplash search endpoints
  const categories: Record<string, Product[]> = {
    Staples: [
      {
        name: "Roller Meal 25kg",
        price: 280,
        imageUrl: "https://source.unsplash.com/160x160/?maize,flour,grain",
      },
      {
        name: "Breakfast Mealie Meal 25kg",
        price: 320,
        imageUrl: "https://source.unsplash.com/160x160/?cornflour,maize",
      },
      { name: "Kapenta (Dry Fish)", price: 150, imageUrl: "https://source.unsplash.com/160x160/?dried,fish" },
      { name: "Dry Beans 5kg", price: 120, imageUrl: "https://source.unsplash.com/160x160/?beans,legumes" },
      { name: "Groundnuts 5kg", price: 140, imageUrl: "https://source.unsplash.com/160x160/?peanuts,nuts" },
      { name: "Rice 5kg", price: 110, imageUrl: "https://source.unsplash.com/160x160/?rice,grains" },
      { name: "Cooking Oil 2L", price: 85, imageUrl: "https://source.unsplash.com/160x160/?cooking,oil,bottle" },
      { name: "Salt 1kg", price: 15, imageUrl: "https://source.unsplash.com/160x160/?salt" },
      { name: "Sugar 2kg", price: 55, imageUrl: "https://source.unsplash.com/160x160/?sugar" },
      { name: "Flour 5kg", price: 95, imageUrl: "https://source.unsplash.com/160x160/?flour,baking" },
    ],
    "Fresh Produce": [
      { name: "Tomatoes 1kg", price: 25, imageUrl: "https://source.unsplash.com/160x160/?tomatoes" },
      { name: "Onions 1kg", price: 20, imageUrl: "https://source.unsplash.com/160x160/?onions" },
      { name: "Rape Vegetables", price: 15, imageUrl: "https://source.unsplash.com/160x160/?leafy,greens" },
      { name: "Cabbage", price: 20, imageUrl: "https://source.unsplash.com/160x160/?cabbage" },
      { name: "Spinach", price: 18, imageUrl: "https://source.unsplash.com/160x160/?spinach" },
      { name: "Bananas (bunch)", price: 30, imageUrl: "https://source.unsplash.com/160x160/?bananas" },
      { name: "Oranges 1kg", price: 25, imageUrl: "https://source.unsplash.com/160x160/?oranges" },
      { name: "Avocado", price: 10, imageUrl: "https://source.unsplash.com/160x160/?avocado" },
      { name: "Mango (seasonal)", price: 8, imageUrl: "https://source.unsplash.com/160x160/?mango" },
      { name: "Lettuce", price: 15, imageUrl: "https://source.unsplash.com/160x160/?lettuce" },
    ],
    Toiletries: [
      { name: "Geisha Soap 250g", price: 15, imageUrl: "https://source.unsplash.com/160x160/?soap,bar" },
      { name: "Protex Soap", price: 20, imageUrl: "https://source.unsplash.com/160x160/?soap,bath" },
      {
        name: "Colgate Toothpaste 100ml",
        price: 30,
        imageUrl: "https://source.unsplash.com/160x160/?toothpaste",
      },
      { name: "Toothbrush", price: 10, imageUrl: "https://source.unsplash.com/160x160/?toothbrush" },
      { name: "Always Pads (10 pack)", price: 35, imageUrl: "https://source.unsplash.com/160x160/?sanitary,pads" },
      { name: "Baby Diapers (Pack of 20)", price: 150, imageUrl: "https://source.unsplash.com/160x160/?diapers" },
      {
        name: "Vaseline Jelly 500ml",
        price: 50,
        imageUrl: "https://source.unsplash.com/160x160/?petroleum,jelly",
      },
      { name: "Body Lotion 400ml", price: 70, imageUrl: "https://source.unsplash.com/160x160/?body,lotion" },
      { name: "Toilet Tissue 4 pack", price: 35, imageUrl: "https://source.unsplash.com/160x160/?toilet,paper" },
      { name: "Sanitary Wipes", price: 45, imageUrl: "https://source.unsplash.com/160x160/?wet,wipes" },
    ],
    Beverages: [
      { name: "Coca Cola 2L", price: 25, imageUrl: "https://source.unsplash.com/160x160/?cola,drink" },
      { name: "Fanta 2L", price: 25, imageUrl: "https://source.unsplash.com/160x160/?orange,soda" },
      { name: "Sprite 2L", price: 25, imageUrl: "https://source.unsplash.com/160x160/?lemon,lime,drink" },
      { name: "Mineral Water 1.5L", price: 10, imageUrl: "https://source.unsplash.com/160x160/?bottled,water" },
      { name: "Jungle Oats 1kg", price: 45, imageUrl: "https://source.unsplash.com/160x160/?oats,breakfast" },
      { name: "Rooibos Tea 100 bags", price: 65, imageUrl: "https://source.unsplash.com/160x160/?tea,rooibos" },
      { name: "Fresh Milk 1L", price: 18, imageUrl: "https://source.unsplash.com/160x160/?milk,bottle" },
      { name: "Milo 500g", price: 85, imageUrl: "https://source.unsplash.com/160x160/?milo,cocoa" },
      { name: "Instant Coffee 100g", price: 70, imageUrl: "https://source.unsplash.com/160x160/?coffee,jar" },
      { name: "Maheu 2L", price: 20, imageUrl: "https://source.unsplash.com/160x160/?maheu,drink" },
    ],
    Cleaning: [
      {
        name: "Boom Washing Powder 2kg",
        price: 50,
        imageUrl: "https://source.unsplash.com/160x160/?detergent,powder",
      },
      {
        name: "Sunlight Dishwashing Liquid 750ml",
        price: 40,
        imageUrl: "https://source.unsplash.com/160x160/?dishwashing,liquid",
      },
      {
        name: "Domestos Toilet Cleaner 750ml",
        price: 55,
        imageUrl: "https://source.unsplash.com/160x160/?toilet,cleaner",
      },
      { name: "Hand Wash 500ml", price: 35, imageUrl: "https://source.unsplash.com/160x160/?hand,wash" },
      { name: "Broom", price: 25, imageUrl: "https://source.unsplash.com/160x160/?broom,cleaning" },
      { name: "Mop Set", price: 95, imageUrl: "https://source.unsplash.com/160x160/?mop,cleaning" },
      { name: "Floor Polish 1L", price: 65, imageUrl: "https://source.unsplash.com/160x160/?floor,polish" },
      { name: "Detergent Bar Soap", price: 20, imageUrl: "https://source.unsplash.com/160x160/?laundry,soap" },
      { name: "Toilet Brush", price: 30, imageUrl: "https://source.unsplash.com/160x160/?toilet,brush" },
      { name: "Bleach 1L", price: 25, imageUrl: "https://source.unsplash.com/160x160/?bleach,cleaning" },
    ],
  };

  // helpers ---------------------------------------------------------------
  const makeOffers = (product: Product): Offer[] => {
    const hash = product.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const base = product.price;
    return stores.map((s, i) => {
      const factor = ((hash + i * 13) % 15 - 7) / 100; // -0.07 .. +0.07
      const price = Math.max(5, Math.round(base * (1 + factor)));
      const etaMin = Math.max(15, Math.round(s.baseEta + ((hash % 7) - 3)));
      return {
        storeId: s.id,
        storeName: s.name,
        price,
        distanceKm: s.distanceKm,
        etaMin,
        deliveryFee: s.deliveryFee,
        rating: s.rating,
      };
    });
  };

  const scoreOffers = (offers: Offer[], w: Weights) => {
    if (offers.length === 0) return offers;
    const minPrice = Math.min(...offers.map((o) => o.price));
    const minDist = Math.min(...offers.map((o) => o.distanceKm));
    const minEta = Math.min(...offers.map((o) => o.etaMin));
    const minFee = Math.min(...offers.map((o) => o.deliveryFee));
    const maxRating = Math.max(...offers.map((o) => o.rating));

    const withScore = offers.map((o) => {
      const priceN = o.price / (minPrice || 1);
      const distN = o.distanceKm / (minDist || 1);
      const etaN = o.etaMin / (minEta || 1);
      const feeN = (o.deliveryFee || 1) / (minFee || 1);
      const ratingN = (maxRating || 5) / (o.rating || 1); // invert so lower is better
      const score =
        w.price * priceN +
        w.distance * distN +
        w.eta * etaN +
        w.fee * feeN +
        w.rating * ratingN;
      return { ...o, __score: score } as Offer;
    });

    return withScore.sort((a, b) => (a.__score! as number) - (b.__score! as number));
  };

  const sortOffers = (offers: Offer[]) => {
    if (compareSort === "price") return [...offers].sort((a, b) => a.price - b.price);
    if (compareSort === "distance") return [...offers].sort((a, b) => a.distanceKm - b.distanceKm);
    if (compareSort === "eta") return [...offers].sort((a, b) => a.etaMin - b.etaMin);
    if (compareSort === "rating") return [...offers].sort((a, b) => b.rating - a.rating);
    return [...offers].sort((a, b) => (a.__score! as number) - (b.__score! as number));
  };

  // Index for price lookups (base catalog)
  const productIndex = useMemo(() => {
    const idx: Record<string, Product> = {};
    Object.entries(categories).forEach(([cat, list]) => {
      list.forEach((p) => (idx[`${cat}-${p.name}`] = p));
    });
    return idx;
  }, []);

  const parseCartKey = (key: string) => {
    const [base, store] = key.split("@");
    return { base, store };
  };
  const getCatalogProduct = (key: string) => {
    const { base } = parseCartKey(key);
    return productIndex[base];
  };
  const getCartPrice = (key: string) => {
    return cartPriceOverrides[key] ?? getCatalogProduct(key)?.price ?? 0;
  };

  const flatCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const addToCart = (key: string, priceOverride?: number) => {
    setCart((c) => ({ ...c, [key]: (c[key] ?? 0) + 1 }));
    if (priceOverride != null) setCartPriceOverrides((m) => ({ ...m, [key]: priceOverride }));
  };
  const decFromCart = (key: string) =>
    setCart((c) => ({ ...c, [key]: Math.max(0, (c[key] ?? 0) - 1) }));

  const subtotal = useMemo(
    () => Object.entries(cart).reduce((sum, [key, qty]) => sum + getCartPrice(key) * qty, 0),
    [cart, cartPriceOverrides]
  );
  const deliveryFee = subtotal > 300 ? 0 : 25; // demo rule
  const total = subtotal + (flatCount > 0 ? deliveryFee : 0);

  const placeOrder = () => {
    if (!address || !payment || flatCount === 0) return;
    setRoute("confirm");
  };

  // UI --------------------------------------------------------------------
  const Header = ({ showBack = false }: { showBack?: boolean }) => (
    <header className="p-4 bg-white shadow flex justify-between items-center">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => {
              if (route === "category" || route === "compare") {
                setRoute("home");
                setQuery("");
                setSelectedProduct(null);
              } else if (route === "cart") setRoute("home");
              else if (route === "checkout") setRoute("cart");
              else if (route === "admin") setRoute("home");
            }}
            className="p-1 rounded-lg border border-gray-200"
          >
            <ArrowLeft className="text-gray-600" />
          </button>
        )}
        <div className="cursor-pointer" onClick={() => setRoute("home")}>
          <h1 className="text-xl font-bold text-green-700">THE MARKETPLACE</h1>
          <p className="text-xs text-gray-500">Lusaka</p>
        </div>
      </div>
      <div className="relative cursor-pointer" onClick={() => setRoute("cart")}>
        <ShoppingCart className="text-red-600" />
        {flatCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-700 text-white text-[10px] rounded-full px-1.5 py-0.5">
            {flatCount}
          </span>
        )}
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex flex-col pb-20">
      {/* HOME: categories */}
      {route === "home" && (
        <>
          <Header />
          <div className="p-4 pt-3">
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(categories).map((cat) => (
                <Card
                  key={cat}
                  className="rounded-2xl shadow border border-gray-300 cursor-pointer"
                  onClick={() => {
                    setCurrentCategory(cat);
                    setQuery("");
                    setRoute("category");
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-200 via-gray-200 to-red-200" />
                    <div>
                      <p className="font-semibold text-green-700">{cat}</p>
                      <p className="text-xs text-gray-500">{categories[cat].length} items</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CATEGORY PAGE */}
      {route === "category" && currentCategory && (
        <>
          <Header showBack />
          <div className="px-4 pt-4">
            <h2 className="text-lg font-bold text-green-700">{currentCategory}</h2>
            <div className="mt-2 flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search in ${currentCategory}…`}
                className="flex-1 border-gray-400 text-sm"
              />
              <Button className="bg-green-700 text-white">
                <Search size={18} />
              </Button>
            </div>
          </div>

          <div className="px-4 mt-4 grid grid-cols-2 gap-3">
            {(query
              ? categories[currentCategory].filter((p) =>
                  p.name.toLowerCase().includes(query.toLowerCase())
                )
              : categories[currentCategory]
            ).map((p) => {
              const key = `${currentCategory}-${p.name}`;
              const qty = cart[key] ?? 0;
              return (
                <Card key={p.name} className="rounded-2xl shadow border border-gray-300">
                  <CardContent className="p-3 flex flex-col items-center">
                    <img src={p.imageUrl} alt={p.name} className="h-24 w-24 rounded-xl object-cover" />
                    <p className="font-medium text-center mt-2 text-sm leading-tight">{p.name}</p>
                    <p className="text-xs text-gray-600">Base from ZMW {p.price}</p>
                    <div className="mt-2 w-full flex items-center gap-2">
                      <Button
                        variant="secondary"
                        className="h-8 w-8 p-0 border border-gray-300"
                        onClick={() => decFromCart(key)}
                      >
                        <Minus size={14} />
                      </Button>
                      <motion.span
                        key={qty}
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="flex-1 text-center text-sm"
                      >
                        {qty}
                      </motion.span>
                      <Button className="h-8 w-8 p-0 bg-red-600" onClick={() => addToCart(key)}>
                        <Plus size={14} />
                      </Button>
                    </div>
                    <Button
                      className="mt-2 w-full bg-green-700 text-white text-xs"
                      onClick={() => {
                        setSelectedProduct(p);
                        setRoute("compare");
                      }}
                    >
                      Compare prices across stores
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* COMPARE PAGE */}
      {route === "compare" && selectedProduct && (
        <>
          <Header showBack />
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-green-700 leading-tight">{selectedProduct.name}</h2>
                <p className="text-xs text-gray-600">
                  Compare offers by price, distance, delivery time, and ratings.
                </p>
              </div>
            </div>

            {/* Smart Weights Panel */}
            <div className="mt-3 border rounded-xl bg-white">
              <div className="p-3 flex items-center gap-2">
                <Sliders size={16} className="text-gray-700" />
                <p className="text-sm font-semibold text-gray-800">Smart ranking weights</p>
                <span className="text-[11px] text-gray-500 ml-auto">Sum auto-normalized</span>
                <Button variant="secondary" className="border h-7 px-2 text-xs" onClick={resetWeights}>
                  Reset
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-3 pb-3 text-xs">
                {([
                  ["Price", "price"],
                  ["Distance", "distance"],
                  ["ETA", "eta"],
                  ["Delivery fee", "fee"],
                  ["Rating", "rating"],
                ] as const).map(([label, key]) => (
                  <div key={key} className="flex items-center gap-2">
                    <label className="w-28 text-gray-700">{label}</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={weightsPct[key] as number}
                      onChange={(e) => setWeightsPct((w) => ({ ...w, [key]: Number(e.target.value) }))}
                      className="flex-1 accent-green-700"
                    />
                    <span className="w-10 text-right">{weightsPct[key]}%</span>
                  </div>
                ))}
                <div className="col-span-full text-[11px] text-gray-600">
                  Current mix → Price {(normalizedWeights.price * 100).toFixed(0)}% · Distance
                  {(normalizedWeights.distance * 100).toFixed(0)}% · ETA
                  {(normalizedWeights.eta * 100).toFixed(0)}% · Fee
                  {(normalizedWeights.fee * 100).toFixed(0)}% · Rating
                  {(normalizedWeights.rating * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-gray-600">Sort by:</span>
              {["smart", "price", "distance", "eta", "rating"].map((k) => (
                <button
                  key={k}
                  onClick={() => setCompareSort(k as any)}
                  className={`px-2 py-1 rounded border ${
                    compareSort === k ? "border-green-700 bg-green-50" : "border-gray-300"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {(() => {
            const offers = sortOffers(scoreOffers(makeOffers(selectedProduct), normalizedWeights));
            const cheapest = offers.reduce((a, b) => (a.price < b.price ? a : b));
            const closest = offers.reduce((a, b) => (a.distanceKm < b.distanceKm ? a : b));
            const fastest = offers.reduce((a, b) => (a.etaMin < b.etaMin ? a : b));
            const top = offers[0];

            return (
              <div className="px-4 mt-3 space-y-2">
                {/* Why recommended box */}
                <Card className="rounded-xl border border-green-200">
                  <CardContent className="p-3 text-[11px] text-gray-700">
                    <p className="font-semibold text-green-700 mb-1">Why this is recommended</p>
                    <p>
                      We weigh Price {(normalizedWeights.price * 100).toFixed(0)}%, Distance
                      {(normalizedWeights.distance * 100).toFixed(0)}%, ETA
                      {(normalizedWeights.eta * 100).toFixed(0)}%, Delivery fee
                      {(normalizedWeights.fee * 100).toFixed(0)}%, Rating
                      {(normalizedWeights.rating * 100).toFixed(0)}%.
                    </p>
                  </CardContent>
                </Card>

                {offers.map((o) => {
                  const key = `${currentCategory}-${selectedProduct.name}@${o.storeId}`;
                  const isTop = o.storeId === top.storeId;
                  const isCheapest = o.storeId === cheapest.storeId;
                  const isClosest = o.storeId === closest.storeId;
                  const isFastest = o.storeId === fastest.storeId;
                  const estTotal = o.price + o.deliveryFee;
                  return (
                    <Card
                      key={o.storeId}
                      className={`rounded-xl border ${isTop ? "border-green-700" : "border-gray-200"}`}
                    >
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{o.storeName}</p>
                            {isTop && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-700 text-white">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-700">
                            <div>
                              Price: <span className="font-semibold">ZMW {o.price}</span>
                            </div>
                            <div>
                              Est. Total: <span className="font-semibold">ZMW {estTotal}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={12} className="text-gray-500" /> {o.distanceKm.toFixed(1)} km
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-gray-500" /> {o.etaMin} min
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-500" /> {o.rating.toFixed(1)}
                            </div>
                            <div>Delivery fee: ZMW {o.deliveryFee}</div>
                          </div>
                          <div className="mt-1 text-[10px] text-gray-600 flex gap-2">
                            {isCheapest && (
                              <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-200">
                                Cheapest
                              </span>
                            )}
                            {isClosest && (
                              <span className="px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200">
                                Closest
                              </span>
                            )}
                            {isFastest && (
                              <span className="px-2 py-0.5 rounded-full bg-red-50 border border-red-200">
                                Fastest ETA
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button className="bg-green-700 text-white text-xs" onClick={() => addToCart(key, o.price)}>
                            Add from this store
                          </Button>
                          <div className="text-[10px] text-gray-500">Adds to cart at ZMW {o.price}</div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Tips */}
                <Card className="rounded-xl border">
                  <CardContent className="p-3 text-xs text-gray-700">
                    <p className="font-semibold text-green-700 mb-1">Tips for choosing a store</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        If the price difference is small (≤ ZMW 5), pick the <span className="font-medium">closer or faster</span> store to reduce delivery time.
                      </li>
                      <li>
                        For heavy items (e.g., sacks of mealie meal), shorter <span className="font-medium">distance</span> often saves on delivery handling and reduces risk of damage.
                      </li>
                      <li>
                        Consider <span className="font-medium">store rating</span> for freshness and reliability—even if it costs a few kwacha more.
                      </li>
                      <li>
                        Look at the <span className="font-medium">estimated total</span> (item + delivery) instead of item price alone.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        </>
      )}

      {/* CART */}
      {route === "cart" && (
        <>
          <Header showBack />
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-bold text-green-700 mb-1">Your Cart</h2>
            {flatCount === 0 && <p className="text-sm text-gray-600">Your cart is empty.</p>}

            {Object.entries(cart).map(([key, qty]) => {
              if (qty === 0) return null;
              const catalog = getCatalogProduct(key);
              const price = getCartPrice(key);
              const { store } = parseCartKey(key);
              return (
                <Card key={key} className="rounded-xl border border-gray-200">
                  <CardContent className="p-3 flex items-center gap-3">
                    <img src={catalog.imageUrl} alt={catalog.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight">{catalog.name}</p>
                      <p className="text-[11px] text-gray-500">
                        Store: {store ? store.replaceAll("-", " ") : "Marketplace"}
                      </p>
                      <p className="text-xs text-gray-500">ZMW {price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" className="h-7 w-7 p-0 border" onClick={() => decFromCart(key)}>
                        <Minus size={12} />
                      </Button>
                      <span className="text-sm w-6 text-center">{qty}</span>
                      <Button className="h-7 w-7 p-0 bg-red-600" onClick={() => addToCart(key)}>
                        <Plus size={12} />
                      </Button>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold">ZMW {price * qty}</div>
                  </CardContent>
                </Card>
              );
            })}

            {flatCount > 0 && (
              <div className="mt-2 bg-white rounded-xl border border-gray-200 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>ZMW {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryFee === 0 ? "text-green-700 font-semibold" : ""}>
                    {deliveryFee === 0 ? "FREE" : `ZMW ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold mt-1">
                  <span>Total</span>
                  <span>ZMW {total}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="secondary" className="border" onClick={() => setRoute("home")}>
                    Continue Shopping
                  </Button>
                  <Button className="bg-green-700 text-white flex-1" onClick={() => setRoute("checkout")}>
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* CHECKOUT */}
      {route === "checkout" && (
        <>
          <Header showBack />
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-bold text-green-700 mb-1">Checkout</h2>

            <Card className="rounded-xl border">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="text-green-700" />
                  <p className="font-semibold text-sm">Delivery Address</p>
                </div>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g., House 12, Great East Rd, Kabulonga"
                  className="text-sm"
                />
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add delivery note (gate code, landmark, etc.)"
                  className="text-sm mt-2"
                />
              </CardContent>
            </Card>

            <Card className="rounded-xl border">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="text-gray-700" />
                  <p className="font-semibold text-sm">Payment Method</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {["MTN MoMo", "Airtel Money", "Zamtel Kwacha", "Cash on Delivery"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPayment(m as any)}
                      className={`border rounded-lg px-3 py-2 text-left ${
                        payment === m ? "border-green-700 bg-green-50" : "border-gray-300"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border">
              <CardContent className="p-3 text-sm">
                {Object.entries(cart).map(([key, qty]) => {
                  if (qty === 0) return null;
                  const p = getCatalogProduct(key);
                  const price = getCartPrice(key);
                  const { store } = parseCartKey(key);
                  return (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-gray-700">
                        {p.name} × {qty}{" "}
                        <span className="text-[11px] text-gray-500">
                          ({store ? store.replaceAll("-", " ") : "Marketplace"})
                        </span>
                      </span>
                      <span>ZMW {price * qty}</span>
                    </div>
                  );
                })}
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">ZMW {total}</span>
                </div>
                <Button
                  className="mt-3 w-full bg-green-700 text-white"
                  disabled={!address || !payment || flatCount === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* CONFIRMATION */}
      {route === "confirm" && (
        <div className="p-6 text-center">
          <CheckCircle className="mx-auto mb-3 text-green-700" size={48} />
          <h2 className="text-xl font-bold text-green-700">Order Confirmed</h2>
          <p className="text-sm text-gray-600 mt-1">Thanks for shopping at THE MARKETPLACE.</p>
          <div className="mt-3 mx-auto max-w-sm bg-white border border-gray-200 rounded-xl p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order #</span>
              <span>TM-{Math.floor(Math.random() * 90000 + 10000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span>{deliveryFee === 0 ? "FREE" : `ZMW ${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1">
              <span>Total</span>
              <span>ZMW {total}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <Button
              className="bg-green-700 text-white"
              onClick={() => {
                setCart({});
                setRoute("home");
              }}
            >
              Back to Home
            </Button>
            <Button variant="secondary" className="border" onClick={() => setRoute("home")}>
              Track Order (demo)
            </Button>
          </div>
        </div>
      )}

      {/* ADMIN (simple demo) */}
      {route === "admin" && (
        <>
          <Header showBack />
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold text-green-700">Admin Dashboard</h2>
            <Card className="border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Products</p>
                  <Button className="bg-green-700 text-white text-sm">+ Add Product</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(categories).map(([cat, list]) => (
                    <div key={cat} className="border rounded-lg p-2">
                      <p className="font-semibold text-green-700 mb-1">{cat}</p>
                      {list.slice(0, 5).map((p) => (
                        <div key={p.name} className="flex items-center justify-between py-1">
                          <span className="truncate pr-2">{p.name}</span>
                          <span className="w-20 text-right">ZMW {p.price}</span>
                        </div>
                      ))}
                      <div className="text-xs text-gray-500 mt-1">…and more</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Orders</p>
                  <Button variant="secondary" className="border text-sm">
                    Export CSV
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {["TM-10342", "TM-10411", "TM-10485"].map((id, i) => (
                    <div key={id} className="flex items-center justify-between border rounded-lg p-2">
                      <span className="font-medium">{id}</span>
                      <span className="text-gray-600">2 items</span>
                      <span className="font-semibold">ZMW {240 + i * 35}</span>
                      <select className="border rounded px-2 py-1 text-xs">
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Customers</p>
                  <Input placeholder="Search customers…" className="max-w-xs text-sm" />
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {["Chileshe B.", "Mwansa K.", "Thandiwe M."].map((n, i) => (
                    <div key={n} className="flex items-center justify-between border rounded-lg p-2">
                      <span className="font-medium">{n}</span>
                      <span className="text-gray-600">+260 97{70 + i} • Kabulonga</span>
                      <span className="text-gray-600">Orders: {2 + i}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3">
        <button onClick={() => setRoute("home")}>
          <Home className={route === "home" ? "text-green-700" : "text-gray-400"} />
        </button>
        <Search className="text-gray-400" />
        <button onClick={() => setRoute("cart")}>
          <ShoppingCart className={route === "cart" ? "text-red-600" : "text-gray-400"} />
        </button>
        <button onClick={() => setRoute("admin")}>
          <User className={route === "admin" ? "text-green-700" : "text-gray-500"} />
        </button>
      </nav>
    </div>
  );
}
