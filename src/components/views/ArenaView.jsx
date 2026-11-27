import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Users, 
  Clock, 
  Zap, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Swords, 
  Wind, 
  DollarSign,
  TrendingDown,
  Sparkles,
  Search
} from 'lucide-react';
import Badge from '../shared/Badge';
import { ARENA_LEADERBOARD, MOCK_USER } from '../../data/mockData';

export default function ArenaView() {
  const [isEnteredTournament, setIsEnteredTournament] = useState(false);
  const [matchmakingState, setMatchmakingState] = useState('idle'); // 'idle' | 'searching' | 'matched'
  const [matchedOpponent, setMatchedOpponent] = useState(null);
  const [challengeModal, setChallengeModal] = useState(false);
  const [submitLeagueModal, setSubmitLeagueModal] = useState(false);
  const [selectedPlayerModal, setSelectedPlayerModal] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 18, mins: 42, secs: 9 });

  // Simulate countdown ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInstantMatch = () => {
    setMatchmakingState('searching');
    setTimeout(() => {
      setMatchedOpponent({
        name: "Jordan Miller",
        handicap: "+0.8",
        location: "Bay 07 • Chicago Club",
        avatar: "/images/lifestyle_1.png",
        rating: "2,180 RSG PTS"
      });
      setMatchmakingState('matched');
    }, 2200);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8 text-left animate-fade-in">
      {/* 1. Live Status Header */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141822] border border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f61919] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f61919]" />
          </span>
          <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
            TOURNAMENT LIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
          <Users className="w-3.5 h-3.5" />
          <span className="font-bold">3,412 GOLFERS IN-BAY</span>
        </div>
      </div>

      {/* 2. Spotlight Tournament Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#13171f] shadow-2xl group">
        <div className="relative h-44 w-full overflow-hidden bg-[#0d1117]">
          <img 
            src="/images/header_banner.png" 
            alt="Worldwide Invitational" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13171f] via-[#13171f]/70 to-transparent" />
          
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <Badge variant="red" size="xs" dot dotPulse>
              $25,000 GUARANTEED PURSE
            </Badge>
            <Badge variant="glass" size="xs">
              RSG OCEAN LINKS
            </Badge>
          </div>
        </div>

        <div className="p-4 -mt-10 relative flex flex-col gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1">
              <Trophy className="w-3 h-3" /> OFFICIAL RSG MAJORS
            </span>
            <h2 className="text-xl font-black font-display tracking-tight text-white mt-0.5">
              Worldwide Invitational Championship
            </h2>
          </div>

          {/* Split Stats: 1st Place Prize & Round Closes Countdown */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#181c24] border border-white/5 font-mono">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase font-semibold">1st Place Prize</span>
              <span className="text-xs font-bold text-amber-300 truncate">RSG Pro Enclosure + Gold Trophy</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] text-gray-400 uppercase font-semibold">Round Closes In</span>
              <span className="text-xs font-bold text-emerald-400">
                {String(countdown.hours).padStart(2, '0')}:{String(countdown.mins).padStart(2, '0')}:{String(countdown.secs).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Enter Tournament Button */}
          <button
            onClick={() => setIsEnteredTournament(!isEnteredTournament)}
            className={`w-full py-3.5 px-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              isEnteredTournament 
                ? 'bg-[#10b981] text-[#0a0e16] shadow-[0_0_16px_rgba(16,185,129,0.4)]' 
                : 'bg-[#f61919] hover:bg-[#ff3b30] text-white shadow-[0_0_20px_rgba(246,25,25,0.45)] active:scale-[0.98]'
            }`}
          >
            {isEnteredTournament ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                ENTERED • TEE TIME LOCKED
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 fill-white" />
                ENTER NEXT TOURNAMENT
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Live Leaderboard */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200 font-display">
              Live Tournament Leaderboard
            </h3>
          </div>
          <span className="text-[10px] font-mono text-gray-400 uppercase">
            ROUND 2 IN PROGRESS
          </span>
        </div>

        <div className="rounded-2xl bg-[#13171f] border border-white/10 overflow-hidden shadow-md divide-y divide-white/5">
          {ARENA_LEADERBOARD.map((player) => {
            const isUser = player.isUser;
            return (
              <div
                key={player.rank}
                onClick={() => setSelectedPlayerModal(player)}
                className={`p-3 flex items-center justify-between transition-colors cursor-pointer ${
                  isUser 
                    ? 'bg-[#f61919]/10 border-l-4 border-l-[#f61919] hover:bg-[#f61919]/15' 
                    : 'hover:bg-[#181c26]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <span className={`w-6 text-center font-mono text-sm font-bold ${
                    player.rank === 1 ? 'text-amber-400' :
                    player.rank === 2 ? 'text-gray-300' :
                    player.rank === 3 ? 'text-amber-600' : 'text-gray-400'
                  }`}>
                    {player.rank}
                  </span>

                  {/* Player Avatar & Details */}
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                      isUser ? 'bg-[#f61919] text-white ring-2 ring-white/20' : 'bg-[#1b222d] text-gray-300'
                    }`}>
                      {player.avatar}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold font-display ${isUser ? 'text-white' : 'text-gray-200'}`}>
                          {player.name}
                        </span>
                        {isUser && (
                          <Badge variant="red" size="xs">YOU</Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">
                        Thru {player.thru} • Projected: {player.prize}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 font-mono">
                  <span className={`text-base font-bold ${
                    player.score.startsWith('-') ? 'text-[#10b981]' : 'text-white'
                  }`}>
                    {player.score}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Instant Matchmaking & Wagers */}
      <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-[#ff3b30]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              INSTANT MATCHMAKING & WAGERS
            </span>
          </div>
          <Badge variant="red" size="xs">
            $20 POT / 200 PTS
          </Badge>
        </div>

        {/* Challenge Match Card */}
        <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white font-display">
                Closest to Pin (5 Holes)
              </span>
              <span className="text-[10px] text-gray-400">
                Pebble Bay #07 & Spyglass #12 Rotation
              </span>
            </div>
            <Badge variant="cyan" size="xs">
              ESCROW LOCKED
            </Badge>
          </div>

          {/* Target Conditions */}
          <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs py-1">
            <div className="p-1.5 rounded-lg bg-[#13171f] border border-white/5">
              <span className="text-[9px] text-gray-400 uppercase">Target</span>
              <div className="font-bold text-[#a3e635]">152 YD</div>
            </div>
            <div className="p-1.5 rounded-lg bg-[#13171f] border border-white/5">
              <span className="text-[9px] text-gray-400 uppercase">Elevation</span>
              <div className="font-bold text-white">-12 FT</div>
            </div>
            <div className="p-1.5 rounded-lg bg-[#13171f] border border-white/5">
              <span className="text-[9px] text-gray-400 uppercase">Wind</span>
              <div className="font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Wind className="w-3 h-3" /> 4 MPH ←
              </div>
            </div>
          </div>

          {/* Action Buttons: ⚡ INSTANT MATCH & + CHALLENGE */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleInstantMatch}
              disabled={matchmakingState === 'searching'}
              className="py-2.5 px-3 rounded-xl bg-[#f61919] hover:bg-[#ff3b30] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(246,25,25,0.4)] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              {matchmakingState === 'searching' ? 'Searching...' : '⚡ INSTANT MATCH'}
            </button>
            <button
              onClick={() => setChallengeModal(true)}
              className="py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              + CHALLENGE
            </button>
          </div>
        </div>
      </div>

      {/* 5. Sanctioned Handicap League & Club Perks */}
      <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              SANCTIONED HANDICAP LEAGUE
            </span>
          </div>
          <Badge variant="emerald" size="xs">
            USGA VERIFIED
          </Badge>
        </div>

        <p className="text-xs text-gray-300 font-sans">
          Post sanctioned indoor rounds directly from your RSG Studio. Optical machine vision validates ball spin, flight, and score authenticity.
        </p>

        <button
          onClick={() => setSubmitLeagueModal(true)}
          className="w-full py-2.5 rounded-xl bg-[#181c24] hover:bg-[#202735] border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          Submit Weekly League Round →
        </button>

        {/* Global Network Stat Row */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-center">
          <div className="p-2 rounded-xl bg-[#181c24]">
            <span className="text-[10px] text-gray-400 uppercase">Worldwide Network</span>
            <div className="text-sm font-bold text-white mt-0.5">18,000+ Members</div>
          </div>
          <div className="p-2 rounded-xl bg-[#181c24]">
            <span className="text-[10px] text-gray-400 uppercase">Software Promise</span>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">ZERO SUBSCRIPTIONS</div>
          </div>
        </div>
      </div>

      {/* --- ARENA MODALS --- */}

      {/* Matchmaking Status Modal */}
      {matchmakingState !== 'idle' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            {matchmakingState === 'searching' ? (
              <div className="flex flex-col items-center py-6 text-center space-y-4">
                <div className="relative flex items-center justify-center w-16 h-16">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f61919] opacity-50" />
                  <div className="w-12 h-12 rounded-full bg-[#f61919] flex items-center justify-center shadow-[0_0_20px_#f61919]">
                    <Search className="w-6 h-6 text-white animate-spin" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Searching Network Bays...</h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">Filtering players within ±1.5 Handicap Index</p>
                </div>
                <button
                  onClick={() => setMatchmakingState('idle')}
                  className="px-4 py-1.5 rounded-full bg-[#1b222d] text-gray-300 text-xs font-mono"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <Badge variant="emerald" size="xs">OPPONENT LOCKED</Badge>
                  <button onClick={() => setMatchmakingState('idle')} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-[#181c24] border border-emerald-500/30 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                    <img src={matchedOpponent?.avatar} alt={matchedOpponent?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm text-white">{matchedOpponent?.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{matchedOpponent?.location}</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">HCP {matchedOpponent?.handicap} • {matchedOpponent?.rating}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#1b222d] font-mono text-xs space-y-1">
                  <div className="flex justify-between text-gray-400">
                    <span>Wager Amount:</span>
                    <span className="text-white font-bold">$20.00 USD</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Match Format:</span>
                    <span className="text-white font-bold">Closest to Pin (5 Holes)</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Bay 04 target loaded! Step up to the stance mat.');
                    setMatchmakingState('idle');
                  }}
                  className="w-full py-3 bg-[#f61919] hover:bg-[#ff3b30] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(246,25,25,0.4)]"
                >
                  Accept & Launch Bay Session
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Challenge Custom Player Modal */}
      {challengeModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setChallengeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-lg text-white mb-2">Create Custom Wager</h3>
            <p className="text-xs text-gray-400 font-sans mb-3">Invite another RSG simulator owner or bay friend via gamer tag.</p>
            
            <div className="space-y-3 mb-4 font-mono text-xs">
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Gamer Handle or Member ID</label>
                <input 
                  type="text" 
                  placeholder="@tiger_woods_97" 
                  className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none focus:border-[#f61919]"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Stakes Pot</label>
                <select className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-white outline-none">
                  <option>$10 USD / 100 PTS</option>
                  <option selected>$25 USD / 250 PTS</option>
                  <option>$50 USD / 500 PTS</option>
                  <option>$100 USD / 1,000 PTS</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Challenge invitation broadcasted to RSG Network!');
                setChallengeModal(false);
              }}
              className="w-full py-2.5 bg-[#f61919] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
            >
              Send Challenge Invite
            </button>
          </div>
        </div>
      )}

      {/* Submit League Round Modal */}
      {submitLeagueModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setSubmitLeagueModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-lg text-white mb-2">Submit Weekly League Round</h3>
            <p className="text-xs text-gray-400 font-sans mb-3">Sync last completed 18-hole round from Bay 04 memory.</p>
            
            <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 space-y-2 mb-4 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Course:</span>
                <span className="text-white font-bold">Spyglass Dunes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gross Score:</span>
                <span className="text-white font-bold">70 (-2)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Net Differential:</span>
                <span className="text-emerald-400 font-bold">-3.4 (Adjusted)</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Scorecard submitted and verified via RSG Machine Vision hash!');
                setSubmitLeagueModal(false);
              }}
              className="w-full py-2.5 bg-[#10b981] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
            >
              Certify & Transmit Score
            </button>
          </div>
        </div>
      )}

      {/* Player Scorecard Modal */}
      {selectedPlayerModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedPlayerModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#f61919] flex items-center justify-center font-mono font-bold text-sm text-white">
                {selectedPlayerModal.avatar}
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">{selectedPlayerModal.name}</h3>
                <span className="text-[10px] text-gray-400 font-mono">Rank #{selectedPlayerModal.rank} • Score: {selectedPlayerModal.score}</span>
              </div>
            </div>

            <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 font-mono text-xs space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Holes Completed:</span>
                <span className="text-white font-bold">{selectedPlayerModal.thru}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Projected Prize:</span>
                <span className="text-amber-300 font-bold">{selectedPlayerModal.prize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ball Speed Avg:</span>
                <span className="text-emerald-400 font-bold">166.8 MPH</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlayerModal(null)}
              className="w-full py-2 bg-[#1b222d] text-white text-xs font-bold uppercase rounded-xl"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
