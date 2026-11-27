import React, { useState } from 'react';
import IPhoneFrame from './components/layout/IPhoneFrame';
import TopHeader from './components/layout/TopHeader';
import BottomNav from './components/layout/BottomNav';
import PlayStudioView from './components/views/PlayStudioView';
import TelemetryView from './components/views/TelemetryView';
import ArenaView from './components/views/ArenaView';
import ProShopView from './components/views/ProShopView';
import { MOCK_USER, PRODUCTS } from './data/mockData';
import { Crown, Wifi, BatteryMedium, Signal, X } from 'lucide-react';
import Badge from './components/shared/Badge';

export default function App() {
  const [activeTab, setActiveTab] = useState('play'); // 'play' | 'telemetry' | 'arena' | 'shop'
  const [user, setUser] = useState(MOCK_USER);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);

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
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <IPhoneFrame>
      {/* Top Header inside iPhone screen */}
      <TopHeader 
        user={user} 
        onOpenProfile={() => setShowProfileModal(true)} 
      />

      {/* Dynamic Main Views */}
      <main className="w-full">
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
          />
        )}
      </main>

      {/* Bottom Nav inside iPhone screen */}
      <BottomNav 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        cartCount={cartCount}
      />

      {/* Golfer Founder Profile Modal inside iPhone screen */}
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

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full py-2.5 bg-[#f61919] hover:bg-[#ff3b30] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </IPhoneFrame>
  );
}
