import { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Check, 
  Plus, 
  Minus, 
  Trash2, 
  Truck, 
  Smartphone, 
  Building2, 
  Download, 
  Zap, 
  Layers,
  ArrowRight,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';
import Badge from '../shared/Badge';
import { PRODUCTS } from '../../data/mockData';

export default function CheckoutView({ 
  cart, 
  user,
  onAddToCart, 
  onRemoveFromCart, 
  onUpdateQuantity,
  onClearCart, 
  onBackToShop,
  onNavigateToPlay
}) {
  // Checkout Steps: 1: 'review' (Order Review & Shipping) | 2: 'gateway' (Payment Gateway) | 3: 'confirmed' (Order Receipt)
  const [step, setStep] = useState('review');

  // Customer & Shipping Info
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || 'Alex Reed',
    email: 'alex.reed@founder-rsg.com',
    phone: '+1 (248) 555-0194',
    address: '7422 Grand River Ave',
    suite: 'Suite 4B - Sim Studio',
    city: 'Brighton',
    state: 'MI',
    zip: '48114',
    country: 'United States',
    roomType: 'Basement / Dedicated Bay',
    ceilingHeight: "10'2\" (Laser Verified)"
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('white-glove'); // 'white-glove' ($0) | 'express-calibration' ($350)

  // Promo code state
  const [promoCode, setPromoCode] = useState('BF20');
  const [appliedPromo, setAppliedPromo] = useState({ code: 'BF20', discountPercent: 0.2, active: true });
  const [promoError, setPromoError] = useState('');

  // Payment Gateway states
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple-pay' | 'affirm' | 'wire'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    rawCardNumber: '4242424242424242',
    cardHolder: (user?.name || 'Alex Reed').toUpperCase(),
    expDate: '08/29',
    cvv: '849',
    saveCard: true
  });
  const [cardBrand, setCardBrand] = useState('visa'); // 'visa' | 'mastercard' | 'amex'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [gatewayStatusText, setGatewayStatusText] = useState('');
  const [orderId, setOrderId] = useState('RSG-89421');
  const [orderDate, setOrderDate] = useState('');
  const [confirmedCart, setConfirmedCart] = useState([]);
  const [finalPaidTotal, setFinalPaidTotal] = useState(0);

  // Calculations
  const subtotal = cart.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + (item.price * qty);
  }, 0);

  const discountAmount = appliedPromo.active ? Math.round(subtotal * appliedPromo.discountPercent) : 0;
  const shippingCost = shippingMethod === 'express-calibration' ? 350 : 0;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.06); // 6% state tax
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  // Handling Promo Code Apply
  const handleApplyPromo = () => {
    const normalized = promoCode.trim().toUpperCase();
    if (normalized === 'BF20') {
      setAppliedPromo({ code: 'BF20', discountPercent: 0.2, active: true });
      setPromoError('');
    } else if (normalized === 'RSGPRO' || normalized === 'TOUR15') {
      setAppliedPromo({ code: normalized, discountPercent: 0.15, active: true });
      setPromoError('');
    } else if (normalized === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountPercent: 0.05, active: true });
      setPromoError('');
    } else {
      setPromoError('Invalid promotional code. Try BF20 for 20% off.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo({ code: '', discountPercent: 0, active: false });
    setPromoCode('');
    setPromoError('');
  };

  // Card input formatting & brand detection
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let brand = 'visa';
    if (val.startsWith('5')) brand = 'mastercard';
    else if (val.startsWith('34') || val.startsWith('37')) brand = 'amex';
    setCardBrand(brand);

    // format in 4-digit blocks
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardDetails(prev => ({
      ...prev,
      cardNumber: formatted,
      rawCardNumber: val
    }));
  };

  // Payment Execution & Simulation
  const handleAuthorizePayment = () => {
    setIsProcessingPayment(true);
    setGatewayStatusText('Connecting to 256-bit Secure Gateway...');

    setTimeout(() => {
      setGatewayStatusText('Validating Escrow Handshake & 3D Secure...');
    }, 900);

    setTimeout(() => {
      setGatewayStatusText(`Authorizing $${totalAmount.toLocaleString()} with Issuing Bank...`);
    }, 1800);

    setTimeout(() => {
      setGatewayStatusText('Payment Approved! Finalizing Order Manifest...');
    }, 2600);

    setTimeout(() => {
      const generatedOrderId = `RSG-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedOrderId);
      setOrderDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      setConfirmedCart([...cart]);
      setFinalPaidTotal(totalAmount);
      setIsProcessingPayment(false);
      setStep('confirmed');
      if (onClearCart) onClearCart();
    }, 3200);
  };

  // Empty cart fallback
  if (cart.length === 0 && step !== 'confirmed') {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[500px] animate-fade-in font-sans">
        <div className="w-16 h-16 rounded-3xl bg-[#141822] border border-white/10 flex items-center justify-center text-gray-400 mb-4 shadow-xl">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-black font-display text-white mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-gray-400 max-w-xs mb-6 font-mono leading-relaxed">
          Select an aerospace simulator suite or launch monitor from the Pro Shop to proceed with checkout.
        </p>
        <div className="flex flex-col gap-2.5 w-full max-w-xs">
          <button
            onClick={() => {
              if (onAddToCart) onAddToCart(PRODUCTS[0]);
            }}
            className="w-full py-3 px-4 bg-[#f61919] hover:bg-[#ff3b30] text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_16px_rgba(246,25,25,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            Add Flagship RSG Pro Studio ($13,200)
          </button>
          <button
            onClick={onBackToShop}
            className="w-full py-2.5 px-4 bg-[#181c24] hover:bg-[#222733] border border-white/10 text-gray-300 font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            Return to Pro Shop Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-28 text-left animate-fade-in relative min-h-full">
      {/* 1. Checkout Top Nav / Progress Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <button
          onClick={step === 'gateway' ? () => setStep('review') : onBackToShop}
          className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{step === 'gateway' ? 'Back to Order Review' : 'Back to Shop'}</span>
        </button>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-emerald-400">
          <Lock className="w-3 h-3" />
          <span className="text-[9px] font-mono font-bold tracking-wider">256-BIT SSL ESCROW</span>
        </div>
      </div>

      {/* Stepper Indicator */}
      <div className="grid grid-cols-3 gap-2">
        <div className={`py-1.5 px-2 rounded-lg text-center font-mono text-[10px] font-bold border transition-all ${
          step === 'review'
            ? 'bg-[#f61919]/20 border-[#f61919] text-white shadow-[0_0_10px_rgba(246,25,25,0.3)]'
            : step === 'gateway' || step === 'confirmed'
            ? 'bg-[#10b981]/15 border-[#10b981]/40 text-emerald-400'
            : 'bg-[#141822] border-white/5 text-gray-500'
        }`}>
          1. REVIEW & SHIP
        </div>
        <div className={`py-1.5 px-2 rounded-lg text-center font-mono text-[10px] font-bold border transition-all ${
          step === 'gateway'
            ? 'bg-[#f61919]/20 border-[#f61919] text-white shadow-[0_0_10px_rgba(246,25,25,0.3)]'
            : step === 'confirmed'
            ? 'bg-[#10b981]/15 border-[#10b981]/40 text-emerald-400'
            : 'bg-[#141822] border-white/5 text-gray-500'
        }`}>
          2. PAYMENT GATEWAY
        </div>
        <div className={`py-1.5 px-2 rounded-lg text-center font-mono text-[10px] font-bold border transition-all ${
          step === 'confirmed'
            ? 'bg-[#10b981]/20 border-[#10b981] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
            : 'bg-[#141822] border-white/5 text-gray-500'
        }`}>
          3. CONFIRMATION
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: ORDER REVIEW & SHIPPING ADDRESS                                  */}
      {/* ========================================================================= */}
      {step === 'review' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* Header Title */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-3.5 bg-[#f61919] rounded-full" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                HARDWARE ORDER REVIEW
              </span>
            </div>
            <h1 className="text-xl font-black font-display tracking-tight text-white">
              Studio Setup & Dispatch Details
            </h1>
          </div>

          {/* Cart Items List with Full Info & Quantity Adjustment */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#f61919]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  SELECTED HARDWARE ({cart.reduce((s, i) => s + (i.quantity || 1), 0)})
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">
                PGA TOUR TELEMETRY READY
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {cart.map((item) => {
                const qty = item.quantity || 1;
                const matchedProduct = PRODUCTS.find(p => p.id === item.id);
                const itemImage = matchedProduct?.image || '/images/pro_studio_club.png';
                const sensorBadge = matchedProduct?.sensorBadge || 'AEROSPACE SENSOR';
                const deliveryTime = matchedProduct?.deliveryStatus || 'SHIPS IN 48 HOURS';

                return (
                  <div key={item.id} className="py-3 flex gap-3 items-start">
                    {/* Item Image Thumb */}
                    <div className="w-18 h-18 rounded-xl bg-[#0c1017] border border-white/10 overflow-hidden shrink-0 relative">
                      <img src={itemImage} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] font-mono text-center text-gray-300 py-0.5">
                        {sensorBadge}
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="text-xs font-bold text-white font-display leading-tight">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-gray-500 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[9.5px] font-mono text-emerald-400 mt-0.5">
                          {deliveryTime}
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                        <div className="flex items-center gap-1.5 bg-[#0b0d10] border border-white/10 rounded-lg p-0.5">
                          <button
                            onClick={() => {
                              if (qty > 1 && onUpdateQuantity) {
                                onUpdateQuantity(item.id, qty - 1);
                              } else {
                                onRemoveFromCart(item.id);
                              }
                            }}
                            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="font-mono text-xs font-bold text-white px-1.5">
                            {qty}
                          </span>
                          <button
                            onClick={() => {
                              if (onUpdateQuantity) {
                                onUpdateQuantity(item.id, qty + 1);
                              } else if (onAddToCart) {
                                onAddToCart(item);
                              }
                            }}
                            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <div className="text-right font-mono">
                          <div className="text-xs font-bold text-white">
                            ${(item.price * qty).toLocaleString()}
                          </div>
                          {qty > 1 && (
                            <div className="text-[9px] text-gray-400">
                              (${item.price.toLocaleString()} ea)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Shipping / Installation Address Form */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                WHITE-GLOVE DELIVERY & STUDIO ADDRESS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              <div className="col-span-2">
                <label className="text-[10px] text-gray-400 block mb-1">Full Recipient / Founder Name</label>
                <input
                  type="text"
                  value={customerInfo.fullName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Email (Telemetry Sync)</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Mobile Phone (Logistics)</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] text-gray-400 block mb-1">Street Address</label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Apt / Bay / Suite</label>
                <input
                  type="text"
                  value={customerInfo.suite}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, suite: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">City</label>
                <input
                  type="text"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">State / Province</label>
                <input
                  type="text"
                  value={customerInfo.state}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  value={customerInfo.zip}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, zip: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] text-gray-400 block mb-1">Studio Space Classification</label>
                <select
                  value={customerInfo.roomType}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, roomType: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none"
                >
                  <option>Basement / Dedicated Simulator Bay</option>
                  <option>Residential Heated Garage Studio</option>
                  <option>Commercial Golf Club / Pro Fitting Lounge</option>
                  <option>Corporate Office Wellness Suite</option>
                </select>
              </div>
            </div>
          </div>

          {/* White-Glove Shipping Options */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Truck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                FREIGHT & SETUP LOGISTICS
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <label 
                onClick={() => setShippingMethod('white-glove')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'white-glove'
                    ? 'bg-[#181c26] border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'bg-[#141822] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    shippingMethod === 'white-glove' ? 'border-emerald-400 bg-emerald-500' : 'border-gray-500'
                  }`}>
                    {shippingMethod === 'white-glove' && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-bold text-white">White-Glove Freight & Room Staging</div>
                    <div className="text-[10px] text-gray-400 font-sans">Delivered, uncrated, and debris removed</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold uppercase text-[11px]">FREE ($850 Value)</span>
              </label>

              <label 
                onClick={() => setShippingMethod('express-calibration')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express-calibration'
                    ? 'bg-[#181c26] border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'bg-[#141822] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    shippingMethod === 'express-calibration' ? 'border-amber-400 bg-amber-500' : 'border-gray-500'
                  }`}>
                    {shippingMethod === 'express-calibration' && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-bold text-white">Express Delivery + Engineer Calibration</div>
                    <div className="text-[10px] text-gray-400 font-sans">RSG field tech performs laser alignment & camera sync</div>
                  </div>
                </div>
                <span className="text-white font-bold text-[11px]">+$350</span>
              </label>
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="p-3 rounded-xl bg-[#13171f] border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-300 font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#f61919]" />
                PROMO CODE / FOUNDER VOUCHER
              </span>
              {appliedPromo.active && (
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {appliedPromo.code} APPLIED (-{(appliedPromo.discountPercent * 100)}%)
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter BF20 or Voucher"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-xs font-mono uppercase text-white outline-none focus:border-[#f61919]"
              />
              {appliedPromo.active ? (
                <button
                  onClick={handleRemovePromo}
                  className="px-3 py-2 bg-[#1b222d] hover:bg-[#252f3f] text-gray-300 text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#f61919] hover:bg-[#ff3b30] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Apply
                </button>
              )}
            </div>
            {promoError && (
              <span className="text-[10px] font-mono text-red-400">{promoError}</span>
            )}
          </div>

          {/* Price Breakdown & Next Step Button */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Hardware Subtotal:</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>

              {appliedPromo.active && (
                <div className="flex justify-between text-emerald-400">
                  <span>Founder Promo ({appliedPromo.code} -{(appliedPromo.discountPercent * 100)}%):</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400">
                <span>White-Glove Freight & Logistics:</span>
                <span className={shippingCost === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                  {shippingCost === 0 ? 'FREE ($850 Value)' : `$${shippingCost.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Estimated State Hardware Tax (6%):</span>
                <span className="text-white">${estimatedTax.toLocaleString()}</span>
              </div>

              <div className="pt-2.5 border-t border-white/10 flex justify-between items-baseline font-bold text-white">
                <span className="text-sm font-display uppercase tracking-wider">Total Due:</span>
                <span className="text-xl font-mono text-emerald-400">
                  ${totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep('gateway')}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#f61919] via-[#e61414] to-[#c70000] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(246,25,25,0.5)] active:scale-[0.98] transition-all cursor-pointer mt-1"
            >
              <span>CONTINUE TO PAYMENT GATEWAY</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: PAYMENT GATEWAY                                                  */}
      {/* ========================================================================= */}
      {step === 'gateway' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* Header & Order Amount Summary Strip */}
          <div className="p-3.5 rounded-2xl bg-[#141822] border border-white/10 flex items-center justify-between shadow-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-gray-400 uppercase">AMOUNT TO AUTHORIZE</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400 block">
                {cart.reduce((s, i) => s + (i.quantity || 1), 0)} items • MI Studio Delivery
              </span>
              <button
                onClick={() => setStep('review')}
                className="text-[10px] font-mono text-[#ff3b30] hover:underline cursor-pointer"
              >
                Edit Order Details
              </button>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#0e121a] rounded-xl border border-white/5">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'bg-[#f61919] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>CARD</span>
            </button>

            <button
              onClick={() => setPaymentMethod('apple-pay')}
              className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === 'apple-pay'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>PAY</span>
            </button>

            <button
              onClick={() => setPaymentMethod('affirm')}
              className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === 'affirm'
                  ? 'bg-[#00d68f] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>FINANCE</span>
            </button>

            <button
              onClick={() => setPaymentMethod('wire')}
              className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === 'wire'
                  ? 'bg-[#1e293b] text-white border border-white/20 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>ESCROW</span>
            </button>
          </div>

          {/* METHOD 1: CREDIT / DEBIT CARD */}
          {paymentMethod === 'card' && (
            <div className="flex flex-col gap-3">
              {/* Interactive Virtual Card Hologram */}
              <div className="relative w-full aspect-[1.8/1] rounded-2xl p-4 overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-[#1c2230] via-[#10141d] to-[#080a0e] flex flex-col justify-between">
                {/* Background circuit lines glow */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f61919_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f61919]" />
                    <span className="font-display font-extrabold text-xs tracking-wider text-white">RED STAKES FOUNDER CARD</span>
                  </div>
                  <span className="font-mono text-xs font-black tracking-widest text-amber-400 uppercase">
                    {cardBrand.toUpperCase()}
                  </span>
                </div>

                {/* EMV Chip & Contactless */}
                <div className="flex items-center gap-3 relative z-10 my-1">
                  <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/50 shadow-inner" />
                  <div className="w-4 h-4 text-gray-400 rotate-90">
                    <span className="font-mono text-xs tracking-tighter">)))</span>
                  </div>
                </div>

                <div className="relative z-10 font-mono text-base tracking-[0.25em] font-bold text-white text-shadow">
                  {cardDetails.cardNumber || '•••• •••• •••• ••••'}
                </div>

                <div className="flex justify-between items-end relative z-10 font-mono text-[10px]">
                  <div>
                    <span className="text-[8px] text-gray-400 uppercase block">CARDHOLDER</span>
                    <span className="font-bold text-gray-200 tracking-wider">{cardDetails.cardHolder || 'ALEX REED'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-gray-400 uppercase block">EXPIRES</span>
                    <span className="font-bold text-gray-200">{cardDetails.expDate || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              {/* Card Inputs Form */}
              <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl font-mono text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] text-gray-400">Card Number</label>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase">Encrypted 256-Bit</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3 py-2.5 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919] font-mono tracking-wider"
                    />
                    <CreditCard className="w-4 h-4 text-gray-500 absolute right-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      value={cardDetails.expDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Security Code (CVV)</label>
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      maxLength={4}
                      placeholder="•••"
                      className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 block mb-1">Cardholder Full Name</label>
                  <input
                    type="text"
                    value={cardDetails.cardHolder}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value.toUpperCase() })}
                    placeholder="ALEX REED"
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                  />
                </div>

                <label className="flex items-center gap-2 pt-1 text-[11px] text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cardDetails.saveCard}
                    onChange={(e) => setCardDetails({ ...cardDetails, saveCard: e.target.checked })}
                    className="w-3.5 h-3.5 rounded accent-[#f61919]"
                  />
                  <span>Save encrypted token for RSG Tour Arena stakes</span>
                </label>
              </div>
            </div>
          )}

          {/* METHOD 2: APPLE PAY / GOOGLE PAY */}
          {paymentMethod === 'apple-pay' && (
            <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl animate-fade-in font-sans">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Smartphone className="w-4 h-4 text-white" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  BIOMETRIC 1-TAP CHECKOUT
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-black border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-gradient-to-r from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center font-mono text-[9px] text-white font-bold">
                    CARD
                  </div>
                  <div className="flex flex-col font-mono">
                    <span className="text-xs font-bold text-white">Apple Card (•••• 8841)</span>
                    <span className="text-[10px] text-gray-400">Alex Reed • 2% Unlimited Daily Cash</span>
                  </div>
                </div>
                <Badge variant="emerald" size="xs">READY</Badge>
              </div>

              <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-gray-400">
                  <span>Shipping Contact:</span>
                  <span className="text-white">{customerInfo.phone}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Address:</span>
                  <span className="text-white">{customerInfo.city}, {customerInfo.state}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                Confirm order authorization instantly using device Face ID / Touch ID. Zero manual card entry required.
              </p>
            </div>
          )}

          {/* METHOD 3: AFFIRM / KLARNA 0% APR FINANCING */}
          {paymentMethod === 'affirm' && (
            <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl animate-fade-in font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#00d68f]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    RSG 0% APR STUDIO FINANCING
                  </span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  PRE-APPROVED
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {/* 36 Months */}
                <div className="p-3 rounded-xl bg-[#181c26] border border-emerald-500/40 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="font-bold text-white text-sm">
                      ${Math.round(totalAmount / 36).toLocaleString()}/mo
                    </div>
                    <div className="text-[10px] text-emerald-400">36 Months • 0.0% APR • No Hidden Fees</div>
                  </div>
                  <Badge variant="emerald" size="xs">RECOMMENDED</Badge>
                </div>

                {/* 24 Months */}
                <div className="p-3 rounded-xl bg-[#141822] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      ${Math.round(totalAmount / 24).toLocaleString()}/mo
                    </div>
                    <div className="text-[10px] text-gray-400">24 Months • 0.0% APR</div>
                  </div>
                  <span className="text-gray-400 text-[10px]">Select</span>
                </div>

                {/* 12 Months */}
                <div className="p-3 rounded-xl bg-[#141822] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      ${Math.round(totalAmount / 12).toLocaleString()}/mo
                    </div>
                    <div className="text-[10px] text-gray-400">12 Months • 0.0% APR</div>
                  </div>
                  <span className="text-gray-400 text-[10px]">Select</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 flex items-center gap-2 text-xs text-gray-300 font-sans">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant decision with zero impact to your personal credit score.</span>
              </div>
            </div>
          )}

          {/* METHOD 4: WIRE / ESCROW */}
          {paymentMethod === 'wire' && (
            <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl animate-fade-in font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5 font-sans">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  COMMERCIAL ESCROW WIRE TRANSFER
                </span>
              </div>

              <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                Preferred for country clubs and multi-bay commercial commercial studio builds ($10k+). Funds held in insured escrow until installation is signed off.
              </p>

              <div className="p-3 rounded-xl bg-[#0b0d10] border border-white/10 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-gray-400">Escrow Beneficiary:</span>
                  <span className="text-white font-bold">Red Stakes Golf Technologies LLC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Escrow Depository:</span>
                  <span className="text-white">J.P. Morgan Chase & Co.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Routing (ABA):</span>
                  <span className="text-emerald-400 font-bold">072000326</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Escrow Account:</span>
                  <span className="text-emerald-400 font-bold">9834-8812-4091</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Escrow Reference:</span>
                  <span className="text-amber-300 font-bold">RSG-BAY-BUILD-AlexReed</span>
                </div>
              </div>
            </div>
          )}

          {/* Security & Guarantee Trust Seals */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[9px] text-gray-400">
            <div className="p-2 rounded-xl bg-[#13171f] border border-white/5 flex flex-col items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>365-Day Guarantee</span>
            </div>
            <div className="p-2 rounded-xl bg-[#13171f] border border-white/5 flex flex-col items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>PCI-DSS Level 1</span>
            </div>
            <div className="p-2 rounded-xl bg-[#13171f] border border-white/5 flex flex-col items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>3-Yr Hardware War.</span>
            </div>
          </div>

          {/* Payment Button & Processing Overlay */}
          <div className="relative pt-1">
            {isProcessingPayment ? (
              <div className="w-full py-5 rounded-2xl bg-[#141822] border border-emerald-500/40 flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse">
                <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {gatewayStatusText}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">Do not close this window</span>
              </div>
            ) : (
              <button
                onClick={handleAuthorizePayment}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#f61919] via-[#e61414] to-[#c70000] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(246,25,25,0.6)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {paymentMethod === 'apple-pay' 
                    ? `PAY $${totalAmount.toLocaleString()} WITH APPLE PAY`
                    : paymentMethod === 'affirm'
                    ? `SUBMIT FINANCING • $${Math.round(totalAmount / 36)}/MO`
                    : paymentMethod === 'wire'
                    ? `LOCK ESCROW INVOICE • $${totalAmount.toLocaleString()}`
                    : `AUTHORIZE & PLACE ORDER • $${totalAmount.toLocaleString()}`
                  }
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: ORDER CONFIRMED & OFFICIAL INVOICE RECEIPT                        */}
      {/* ========================================================================= */}
      {step === 'confirmed' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* Success Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#10b981]/20 via-[#13171f] to-[#13171f] border border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.25)] text-center flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-1 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              PAYMENT AUTHORIZED & ESCROW FUNDED
            </span>
            <h2 className="text-2xl font-black font-display text-white tracking-tight">
              Order Confirmed!
            </h2>
            <p className="text-xs text-gray-300 font-sans max-w-xs leading-relaxed">
              Thank you, <strong className="text-white">{customerInfo.fullName}</strong>. Your Red Stakes Golf simulator hardware has been committed for Brighton, MI laboratory bench calibration.
            </p>

            <div className="mt-2 py-2 px-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs flex items-center gap-3">
              <span className="text-gray-400">Order Manifest:</span>
              <span className="text-white font-bold">{orderId}</span>
              <span className="text-emerald-400 font-bold">• PAID (${finalPaidTotal.toLocaleString()})</span>
            </div>
          </div>

          {/* Live Logistics Timeline */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5 font-sans">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                LIVE DISPATCH & INSTALLATION TELEMETRY
              </span>
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-emerald-500/40 ml-2">
              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-[#13171f]" />
                <div className="font-bold text-white text-[11px]">Step 1: Escrow Authorized & Bay Reserved</div>
                <div className="text-[10px] text-emerald-400">Completed today • {orderDate}</div>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-amber-400 animate-ping ring-4 ring-[#13171f]" />
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#13171f]" />
                <div className="font-bold text-white text-[11px]">Step 2: Optical Dual-Vision Calibration</div>
                <div className="text-[10px] text-gray-300 font-sans">
                  Brighton, MI robotics lab verifies 3,200 FPS high-speed sub-millimeter sensors
                </div>
              </div>

              <div className="relative opacity-60">
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-gray-600 ring-4 ring-[#13171f]" />
                <div className="font-bold text-white text-[11px]">Step 3: White-Glove Dedicated Freight</div>
                <div className="text-[10px] text-gray-400">Estimated transit: 3 business days to {customerInfo.city}, {customerInfo.state}</div>
              </div>

              <div className="relative opacity-60">
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-gray-600 ring-4 ring-[#13171f]" />
                <div className="font-bold text-white text-[11px]">Step 4: On-Site Setup & Software Bay Lock</div>
                <div className="text-[10px] text-gray-400">White-glove team unboxes and pairs your club telemetry</div>
              </div>
            </div>
          </div>

          {/* Itemized Order Receipt Breakdown */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-2.5 shadow-xl font-mono text-xs">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5">
              ITEMIZED INVOICE SUMMARY
            </span>

            <div className="divide-y divide-white/5">
              {confirmedCart.map((item) => (
                <div key={item.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{item.title}</div>
                    <div className="text-[10px] text-gray-400">Qty: {item.quantity || 1} • Serial: RSG-{item.id.slice(0, 6).toUpperCase()}</div>
                  </div>
                  <div className="font-bold text-white">
                    ${((item.price * (item.quantity || 1))).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
              <div className="flex justify-between text-gray-400">
                <span>Shipping Address:</span>
                <span className="text-white text-right">{customerInfo.address}, {customerInfo.city} {customerInfo.state}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Payment Method:</span>
                <span className="text-emerald-400 uppercase font-bold">
                  {paymentMethod === 'apple-pay' ? 'Apple Pay (•••• 8841)' : 'Card (•••• 4242)'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-white/5">
                <span>Total Settled:</span>
                <span className="text-emerald-400">${finalPaidTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => {
                alert(`Receipt #${orderId} for $${finalPaidTotal.toLocaleString()} generated and sent to ${customerInfo.email}`);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1b222d] hover:bg-[#252f3f] border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Official Tax Invoice (PDF)</span>
            </button>

            <button
              onClick={onNavigateToPlay}
              className="w-full py-3.5 px-4 rounded-xl bg-[#f61919] hover:bg-[#ff3b30] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(246,25,25,0.4)]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Simulator Bay (Play Studio)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
