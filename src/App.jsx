import { useState } from 'react';
import IPhoneFrame from './components/layout/IPhoneFrame';
import TopHeader from './components/layout/TopHeader';
import BottomNav from './components/layout/BottomNav';
import PlayStudioView from './components/views/PlayStudioView';
import TelemetryView from './components/views/TelemetryView';
import ArenaView from './components/views/ArenaView';
import ProShopView from './components/views/ProShopView';
import CheckoutView from './components/views/CheckoutView';
import AuthModal from './components/auth/AuthModal';
import { MOCK_USER, PRODUCTS } from './data/mockData';
import { Crown, X, LogOut, UserCheck } from 'lucide-react';
import Badge from './components/shared/Badge';
import { RangeSessionProvider } from './context/RangeSessionContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('play'); // 'play' | 'telemetry' | 'arena' | 'shop' | 'checkout'
  const [user, setUser] = useState(MOCK_USER);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Cart state: initial item is the Flagship RSG Pro Studio Club Edition
  const [cart, setCart] = useState([
    {
      id: PRODUCTS[0].id,
      title: PRODUCTS[0].title,
      price: PRODUCTS[0].price,
      quantity: 1
    }
  ]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
    setActiveTab('checkout');
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <RangeSessionProvider>
      <IPhoneFrame>
        <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#0b0d10] text-white">
          {/* Top Header inside app screen */}
          <TopHeader 
            user={user} 
            onOpenProfile={() => setShowProfileModal(true)} 
            cartCount={cartCount}
            onOpenCheckout={() => setActiveTab('checkout')}
            onOpenAuth={() => setShowAuthModal(true)}
          />

          {/* Dynamic Main Views (Scrollable) */}
          <main className="flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar pb-28">
            {activeTab === 'play' && (
              <PlayStudioView 
                onNavigateToTelemetry={() => setActiveTab('telemetry')}
                onNavigateToArena={() => setActiveTab('arena')}
              />
            )}

            {activeTab === 'telemetry' && (
              <TelemetryView />
            )}

            {activeTab === 'arena' && (
              <ArenaView />
            )}

            {activeTab === 'shop' && (
              <ProShopView 
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onNavigateToCheckout={(product) => {
                  if (product) handleBuyNow(product);
                  else setActiveTab('checkout');
                }}
              />
            )}

            {activeTab === 'checkout' && (
              <CheckoutView 
                cart={cart}
                user={user}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onBackToShop={() => setActiveTab('shop')}
                onNavigateToPlay={() => setActiveTab('play')}
              />
            )}
          </main>

          {/* Bottom Nav inside app screen - Anchored permanently at bottom */}
          <BottomNav 
            activeTab={activeTab === 'checkout' ? 'shop' : activeTab} 
            onSelectTab={setActiveTab} 
            cartCount={cartCount}
          />

          {/* Golfer Founder Profile Modal inside app screen */}
          {showProfileModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
              <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-3xl p-5 shadow-2xl relative text-left">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="relative p-0.5 rounded-full border-2 border-amber-400 bg-[#181c26] shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 border border-[#0b0d10]">
                      <Crown className="w-3 h-3 text-black stroke-[3]" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-extrabold text-lg text-white">{user.name}</h3>
                      <Badge variant="emerald" size="xs">HCP {user.handicap}</Badge>
                    </div>
                    <span className="text-[11px] font-mono text-amber-300 font-semibold">{user.membership}</span>
                    <span className="text-[10px] text-gray-400 font-sans">{user.homeStudio}</span>
                  </div>
                </div>

                {/* Founder Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#181c24] border border-white/5">
                    <span className="text-[10px] text-gray-400 uppercase">Total Bay Shots</span>
                    <div className="text-base font-bold text-white mt-0.5">{user.totalShots}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#181c24] border border-white/5">
                    <span className="text-[10px] text-gray-400 uppercase">Software Plan</span>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">Lifetime Pro</div>
                  </div>
                </div>

                {/* Bag Quick-View */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">ACTIVE BAG CALIBRATION:</span>
                    <span className="text-white font-bold">14 Clubs Synced</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 font-mono text-[11px] text-gray-300 space-y-1">
                    <div>Driver: Stealth 2 Plus (9.0° Ventus Black 6X)</div>
                    <div>Putter: Scotty Cameron Phantom X 5.5</div>
                    <div>Sensors: Dual Machine Vision Auto-Recognize</div>
                  </div>
                </div>

                {/* Account Switcher & Sign Out Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setShowAuthModal(true);
                    }}
                    className="py-2.5 px-3 bg-[#181c24] hover:bg-[#222733] border border-white/10 text-white font-mono text-[11px] font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Switch / Login</span>
                  </button>
                  <button
                    onClick={() => {
                      setUser(null);
                      setShowProfileModal(false);
                    }}
                    className="py-2.5 px-3 bg-[#181c24] hover:bg-red-950/40 border border-white/10 hover:border-red-500/30 text-red-400 font-mono text-[11px] font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Auth Modal for Login & Signup with Prefilled Dummy Accounts */}
          <AuthModal 
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
          />
        </div>
      </IPhoneFrame>
    </RangeSessionProvider>
  );
}
