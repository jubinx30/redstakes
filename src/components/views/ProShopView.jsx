import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Check, 
  Copy, 
  ShieldCheck, 
  Star, 
  Award, 
  Truck, 
  ArrowRight, 
  X, 
  Plus, 
  Minus, 
  CreditCard, 
  Sparkles,
  PhoneCall,
  Clock,
  MapPin,
  Zap
} from 'lucide-react';
import Badge from '../shared/Badge';
import { PRODUCTS } from '../../data/mockData';

export default function ProShopView({ 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onClearCart,
  onNavigateToCheckout 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL SYSTEMS');
  const [copiedPromo, setCopiedPromo] = useState(false);
  const [consultationModal, setConsultationModal] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const categories = ['ALL SYSTEMS', 'LAUNCH MONITORS', 'STUDIO ENCLOSURES', 'STANCE MATS & GEAR'];

  const filteredProducts = activeCategory === 'ALL SYSTEMS'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleCopyCode = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('BF20');
    }
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-28 text-left animate-fade-in relative">
      {/* 1. Promotion Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#f61919] via-[#d61313] to-[#990000] shadow-[0_0_24px_rgba(246,25,25,0.35)] border border-white/20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-black/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs tracking-tight">BLACK FRIDAY SPECIAL</span>
              <span className="bg-[#0b0d10] text-[#a3e635] font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">20% OFF</span>
            </div>
            <span className="text-[11px] text-white/90 font-mono">
              Use code <strong className="underline underline-offset-2">BF20</strong> • 365-Day Trial
            </span>
          </div>
        </div>

        <button
          onClick={handleCopyCode}
          className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
        >
          {copiedPromo ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
          {copiedPromo ? 'COPIED' : 'COPY'}
        </button>
      </div>

      {/* 2. Header & Telemetry Badges */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-[#f61919] rounded-full" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
              AEROSPACE HARDWARE SUITE
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#13171f] px-2 py-0.5 rounded-full border border-white/10 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[9px] font-mono font-bold">OFFICIAL RSG GEAR</span>
          </div>
        </div>

        <h1 className="text-2xl font-black font-display tracking-tight text-white">
          Studio Hardware & Pro Shop
        </h1>
        <p className="text-xs text-gray-400 font-sans leading-relaxed">
          Precision dual-camera machine vision, tour enclosures, and turn-key home simulators engineered in Brighton, MI.
        </p>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-display font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#f61919] text-white shadow-[0_0_12px_rgba(246,25,25,0.4)]'
                  : 'bg-[#141822] text-gray-400 hover:text-white hover:bg-[#1a202c] border border-white/5'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Cart Quick-Access Bar (Integrated into layout - no floating) */}
      {totalCartCount > 0 && (
        <div className="p-3 rounded-2xl bg-[#141822] border border-white/10 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f61919] flex items-center justify-center font-mono font-bold text-xs text-white">
              {totalCartCount}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white font-mono">
                {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'} in Bag • ${totalCartPrice.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Free White-Glove Freight Included
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              if (onNavigateToCheckout) onNavigateToCheckout();
              else setCheckoutModal(true);
            }}
            className="py-2 px-3 rounded-xl bg-[#f61919] hover:bg-[#ff3b30] text-white font-display font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(246,25,25,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <span>CHECKOUT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. Product Cards List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const isItemInCart = cart.some(item => item.id === product.id);

          return (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-[#13171f] overflow-hidden shadow-2xl flex flex-col group transition-all"
            >
              {/* Product Image Stage */}
              <div className="relative w-full aspect-[4/3] bg-[#0c1017] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13171f] via-transparent to-black/30" />

                {/* Overhead Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <Badge variant="redSolid" size="xs">
                    {product.badge}
                  </Badge>
                  <Badge variant="glass" size="xs" dot dotPulse className="text-emerald-400 border-white/10">
                    {product.deliveryStatus}
                  </Badge>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#0b0d10]/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-right font-mono">
                  <span className="block text-[8px] text-gray-400 uppercase">{product.sensorSub}</span>
                  <span className="text-xs font-bold text-white">{product.sensorBadge}</span>
                </div>
              </div>

              {/* Product Info & Pricing */}
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h2 className="text-lg font-black font-display text-white tracking-tight">
                    {product.title}
                  </h2>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    {product.tagline}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 py-1 border-y border-white/5 font-mono">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    ${product.regularPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    SAVE ${product.savings.toLocaleString()} (BF20)
                  </span>
                </div>

                {/* Specs & Features List */}
                <div className="space-y-1.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs: Buy Now & Add to Bag */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      if (onNavigateToCheckout) {
                        onNavigateToCheckout(product);
                      } else {
                        onAddToCart(product);
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.98] bg-gradient-to-r from-[#f61919] via-[#e61414] to-[#cc0000] hover:from-[#ff3b30] hover:to-[#f61919] text-white shadow-[0_0_20px_rgba(246,25,25,0.4)]"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>BUY NOW • ${product.price.toLocaleString()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        if (isItemInCart) {
                          onRemoveFromCart(product.id);
                        } else {
                          onAddToCart(product);
                        }
                      }}
                      className={`py-2 px-3 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        isItemInCart
                          ? 'bg-[#10b981]/20 border-[#10b981]/50 text-emerald-400'
                          : 'bg-[#181c24] hover:bg-[#222733] border-white/10 text-gray-300'
                      }`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{isItemInCart ? 'IN BAG • REMOVE' : 'ADD TO BAG'}</span>
                    </button>

                    <button
                      onClick={() => setConsultationModal(true)}
                      className="py-2 px-3 rounded-xl bg-[#181c24] hover:bg-[#222733] border border-white/10 text-gray-300 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>CONSULTATION</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. RSG Performance Promise Badges */}
      <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 shadow-xl flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">
            The Red Stakes Performance Promise
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Engineering Origin</span>
            <span className="font-bold text-white flex items-center gap-1">
              🇺🇸 Made in America
            </span>
            <span className="text-[9px] text-gray-500">Brighton, Michigan</span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Satisfaction</span>
            <span className="font-bold text-emerald-400">365-Day Guarantee</span>
            <span className="text-[9px] text-gray-500">100% Full Refund</span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Customer Trust</span>
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300" /> 4.8 / 5.0 Rating
            </span>
            <span className="text-[9px] text-gray-500">18,000+ Reviews</span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Honored Discount</span>
            <span className="font-bold text-[#ff3b30]">15% Military & First</span>
            <span className="text-[9px] text-gray-500">Responders Verified</span>
          </div>
        </div>
      </div>

      {/* 6. Order Summary & Checkout Section (Naturally integrated into page flow) */}
      {totalCartCount > 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#ff3b30]" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                CART ORDER SUMMARY
              </span>
            </div>
            <Badge variant="emerald" size="xs">
              {totalCartCount} {totalCartCount === 1 ? 'ITEM' : 'ITEMS'} IN BAG
            </Badge>
          </div>

          <div className="divide-y divide-white/5 font-mono text-xs">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-white font-bold truncate max-w-[210px]">{item.title}</span>
                  <span className="text-[10px] text-gray-400">${item.price.toLocaleString()} each</span>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-[10px] text-red-400 hover:text-red-300 underline underline-offset-2 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal:</span>
              <span className="text-white">${totalCartPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Black Friday Special (BF20):</span>
              <span>20% OFF INCLUDED</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>White-Glove Delivery:</span>
              <span className="text-emerald-400 font-bold">FREE ($850 Value)</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
              <span>Total Due:</span>
              <span className="text-emerald-400 font-mono">${totalCartPrice.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (onNavigateToCheckout) onNavigateToCheckout();
              else setCheckoutModal(true);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#f61919] to-[#d61313] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,25,25,0.45)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>PROCEED TO CHECKOUT • ${totalCartPrice.toLocaleString()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* --- PRO SHOP MODALS --- */}

      {/* Schedule Consultation Modal */}
      {consultationModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => {
                setConsultationModal(false);
                setConsultationSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {!consultationSubmitted ? (
              <div className="space-y-3 font-sans">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-bold text-lg text-white">Book 30-Min Engineering Consult</h3>
                </div>
                <p className="text-xs text-gray-400">
                  Speak directly with an RSG simulator architect in Brighton, MI about ceiling dimensions, room layout, and optical throw distance.
                </p>

                <div className="space-y-2.5 font-mono text-xs pt-1">
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex Reed"
                      className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Target Ceiling Height (Ft)</label>
                    <select className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none">
                      <option>9'0" to 9'6" (Standard Pro Enclosure)</option>
                      <option selected>9'7" to 10'6" (Optimal Dual-Vision Range)</option>
                      <option>10'7"+ (Commercial / Club Specification)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Preferred Consultation Time</label>
                    <select className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none">
                      <option>Tomorrow • 10:00 AM EST (Zoom & Phone)</option>
                      <option>Tomorrow • 02:30 PM EST (Zoom & Phone)</option>
                      <option>Friday • 11:00 AM EST (Zoom & Phone)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setConsultationSubmitted(true)}
                  className="w-full py-3 bg-[#f61919] hover:bg-[#ff3b30] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_16px_rgba(246,25,25,0.4)] mt-2"
                >
                  Confirm Appointment
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3 animate-fade-in font-sans">
                <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mx-auto text-[#10b981]">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Consultation Confirmed!</h3>
                <p className="text-xs text-gray-300">
                  Senior Architect Dave Miller has been assigned to your studio blueprint. Calendar invitation sent to your email.
                </p>
                <button
                  onClick={() => {
                    setConsultationModal(false);
                    setConsultationSubmitted(false);
                  }}
                  className="px-6 py-2 bg-[#1b222d] text-white text-xs font-bold uppercase rounded-xl"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Drawer / Modal */}
      {checkoutModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[400px] max-h-[90vh] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left flex flex-col">
            <button
              onClick={() => {
                setCheckoutModal(false);
                setOrderConfirmed(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderConfirmed ? (
              <>
                <div className="pb-3 border-b border-white/10 mb-3">
                  <h3 className="font-display font-bold text-lg text-white">Order Checkout</h3>
                  <span className="text-[10px] font-mono text-emerald-400">ENCRYPTED 256-BIT PRO SHOP ESCROW</span>
                </div>

                <div className="overflow-y-auto space-y-3 mb-4 pr-1 font-mono text-xs">
                  {/* Cart Items */}
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl bg-[#181c24] flex items-center justify-between border border-white/5">
                        <div className="flex flex-col">
                          <span className="font-bold text-white truncate max-w-[200px]">{item.title}</span>
                          <span className="text-[10px] text-gray-400">${item.price.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-[10px] text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Promo & Shipping Breakdown */}
                  <div className="p-3 rounded-xl bg-[#1b222d] space-y-1.5 border border-white/5">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal:</span>
                      <span className="text-white">${totalCartPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Black Friday Promo (BF20):</span>
                      <span>APPLIED (-20%)</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>White-Glove Freight:</span>
                      <span className="text-emerald-400 font-bold">FREE ($850 Value)</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                      <span>Total Due:</span>
                      <span className="text-emerald-400">${totalCartPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[10px] text-gray-300 font-sans">
                      Includes 365-day trial guarantee and lifetime free software updates.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderConfirmed(true);
                    onClearCart();
                  }}
                  className="w-full py-3.5 bg-[#f61919] hover:bg-[#ff3b30] text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(246,25,25,0.5)] cursor-pointer"
                >
                  Place Order • ${totalCartPrice.toLocaleString()}
                </button>
              </>
            ) : (
              <div className="py-6 text-center space-y-3 animate-fade-in font-sans">
                <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mx-auto text-[#10b981]">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Order Confirmed!</h3>
                <p className="text-xs text-gray-300">
                  Order #RSG-88492 placed. Brighton engineering team is preparing your hardware shipment. White-glove logistics will reach out to coordinate delivery.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModal(false);
                    setOrderConfirmed(false);
                  }}
                  className="px-6 py-2 bg-[#1b222d] text-white text-xs font-bold uppercase rounded-xl"
                >
                  Back to Pro Shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
