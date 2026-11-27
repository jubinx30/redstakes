import React, { createContext, useContext, useState, useEffect } from 'react';
import { TELEMETRY_SHOTS, MOCK_USER } from '../data/mockData';

const RangeSessionContext = createContext(null);

export function RangeSessionProvider({ children }) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeClubKey, setActiveClubKey] = useState('driver');
  const [targetDistance, setTargetDistance] = useState(250);
  const [sensorMode, setSensorMode] = useState('manual'); // 'manual' | 'auto'
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Initialize session shots from existing mock history
  const [sessionShots, setSessionShots] = useState([
    {
      shotNumber: 24,
      clubKey: 'driver',
      clubName: 'Driver (9.0°)',
      carry: 278,
      carryUnit: 'YD',
      total: 299,
      ballSpeed: 167.4,
      clubSpeed: 114.2,
      smash: 1.47,
      launch: 12.8,
      spin: 2420,
      offline: '2.1 R',
      shape: 'Baby Draw',
      tag: 'PURE FLUSH',
      time: '08:42 AM',
      offsetX: 14,
      offsetY: -6
    },
    {
      shotNumber: 23,
      clubKey: 'driver',
      clubName: 'Driver (9.0°)',
      carry: 275,
      carryUnit: 'YD',
      total: 295,
      ballSpeed: 166.1,
      clubSpeed: 113.8,
      smash: 1.46,
      launch: 13.1,
      spin: 2480,
      offline: '1.4 L',
      shape: 'Straight',
      tag: 'OPTIMAL',
      time: '08:40 AM',
      offsetX: 4,
      offsetY: -2
    },
    {
      shotNumber: 22,
      clubKey: '3wood',
      clubName: '3-Wood (15.0°)',
      carry: 252,
      carryUnit: 'YD',
      total: 268,
      ballSpeed: 157.8,
      clubSpeed: 108.2,
      smash: 1.46,
      launch: 11.6,
      spin: 3150,
      offline: '0.8 L',
      shape: 'Baby Draw',
      tag: 'TOUR GRADE',
      time: '08:38 AM',
      offsetX: 0,
      offsetY: 2
    },
    {
      shotNumber: 21,
      clubKey: '8iron',
      clubName: '8-Iron (37.0°)',
      carry: 167,
      carryUnit: 'YD',
      total: 169,
      ballSpeed: 121.9,
      clubSpeed: 89.2,
      smash: 1.37,
      launch: 19.4,
      spin: 7780,
      offline: '0.2 R',
      shape: 'Pin High',
      tag: 'FLUSH',
      time: '08:35 AM',
      offsetX: -2,
      offsetY: 4
    }
  ]);

  // Telemetry catalog mapped by clubKey - mutable so new shots update it
  const [telemetryCatalog, setTelemetryCatalog] = useState(TELEMETRY_SHOTS);
  const [lastShotFeedback, setLastShotFeedback] = useState(null);

  // Active session timer
  useEffect(() => {
    let interval = null;
    if (isSessionActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive]);

  // Auto-sensor mode periodic simulation (triggers a realistic shot every 6s when on)
  useEffect(() => {
    let autoInterval = null;
    if (isSessionActive && sensorMode === 'auto') {
      autoInterval = setInterval(() => {
        triggerSimulatedShot();
      }, 6000);
    }
    return () => {
      if (autoInterval) clearInterval(autoInterval);
    };
  }, [isSessionActive, sensorMode, activeClubKey]);

  const startSession = (initialClub = 'driver') => {
    setIsSessionActive(true);
    setActiveClubKey(initialClub);
    if (!sessionStartTime) {
      setSessionStartTime(Date.now());
    }
    setLastShotFeedback(null);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSensorMode('manual');
    setShowSummaryModal(true);
  };

  // Club aerodynamics profile database
  const CLUB_PROFILES = {
    driver: {
      name: 'Driver (9.0°)',
      shaft: 'Stealth 2 Plus • Ventus Black 6X',
      baseCarry: 278,
      carryVar: 14,
      baseClubSpeed: 114.2,
      baseSmash: 1.48,
      baseLaunch: 12.6,
      baseSpin: 2420,
      baseApex: 94,
      pgaSmash: '1.49',
      pgaBallSpeed: '168.0',
      pgaClubSpeed: '115.0',
      pgaSpin: '2,500',
      pgaLaunch: '11–14°'
    },
    '3wood': {
      name: '3-Wood (15.0°)',
      shaft: 'Qi10 Tour • Ventus TR Blue 7X',
      baseCarry: 252,
      carryVar: 10,
      baseClubSpeed: 108.5,
      baseSmash: 1.46,
      baseLaunch: 11.4,
      baseSpin: 3180,
      baseApex: 102,
      pgaSmash: '1.48',
      pgaBallSpeed: '157.0',
      pgaClubSpeed: '108.0',
      pgaSpin: '3,200',
      pgaLaunch: '10–13°'
    },
    '5iron': {
      name: '5-Iron (26.0°)',
      shaft: 'P770 • Dynamic Gold Tour Issue X100',
      baseCarry: 210,
      carryVar: 8,
      baseClubSpeed: 98.2,
      baseSmash: 1.41,
      baseLaunch: 14.8,
      baseSpin: 5420,
      baseApex: 112,
      pgaSmash: '1.41',
      pgaBallSpeed: '137.0',
      pgaClubSpeed: '97.0',
      pgaSpin: '5,500',
      pgaLaunch: '14–17°'
    },
    '8iron': {
      name: '8-Iron (37.0°)',
      shaft: 'P770 • Dynamic Gold Tour Issue X100',
      baseCarry: 168,
      carryVar: 6,
      baseClubSpeed: 89.6,
      baseSmash: 1.37,
      baseLaunch: 19.2,
      baseSpin: 7840,
      baseApex: 118,
      pgaSmash: '1.36',
      pgaBallSpeed: '120.0',
      pgaClubSpeed: '88.0',
      pgaSpin: '7,800',
      pgaLaunch: '18–21°'
    },
    pw: {
      name: 'Pitching Wedge (46.0°)',
      shaft: 'MG4 • Dynamic Gold Tour Issue S400',
      baseCarry: 136,
      carryVar: 5,
      baseClubSpeed: 83.1,
      baseSmash: 1.24,
      baseLaunch: 24.2,
      baseSpin: 9250,
      baseApex: 108,
      pgaSmash: '1.23',
      pgaBallSpeed: '102.0',
      pgaClubSpeed: '83.0',
      pgaSpin: '9,300',
      pgaLaunch: '23–26°'
    },
    '56w': {
      name: '56° Wedge (56.0°)',
      shaft: 'MG4 High Bounce • Tour Issue S400',
      baseCarry: 104,
      carryVar: 4,
      baseClubSpeed: 76.5,
      baseSmash: 1.16,
      baseLaunch: 29.8,
      baseSpin: 10180,
      baseApex: 96,
      pgaSmash: '1.15',
      pgaBallSpeed: '88.0',
      pgaClubSpeed: '76.0',
      pgaSpin: '10,200',
      pgaLaunch: '28–32°'
    }
  };

  const triggerSimulatedShot = (overrideClub = null) => {
    const clubKey = overrideClub || activeClubKey;
    const profile = CLUB_PROFILES[clubKey] || CLUB_PROFILES.driver;

    // Next shot number
    const nextShotNum = (sessionShots[0]?.shotNumber || 24) + 1;

    // Realistic physical variances
    const carryJitter = Math.round((Math.random() - 0.45) * profile.carryVar);
    const carry = profile.baseCarry + carryJitter;
    const total = Math.round(carry * 1.07);

    const clubSpeedJitter = ((Math.random() - 0.48) * 1.8).toFixed(1);
    const clubSpeed = (parseFloat(profile.baseClubSpeed) + parseFloat(clubSpeedJitter)).toFixed(1);

    const smashJitter = ((Math.random() - 0.45) * 0.03).toFixed(2);
    const smash = (parseFloat(profile.baseSmash) + parseFloat(smashJitter)).toFixed(2);

    const ballSpeed = (clubSpeed * smash).toFixed(1);

    const launchJitter = ((Math.random() - 0.48) * 1.4).toFixed(1);
    const launch = (profile.baseLaunch + parseFloat(launchJitter)).toFixed(1);

    const spinJitter = Math.round((Math.random() - 0.48) * 180);
    const spin = profile.baseSpin + spinJitter;

    // Flight shape and impact coordinates
    const shapeVariants = [
      { shape: 'Baby Draw', offline: '1.2 L', faceToPath: '-0.8', path: '1.6° In-to-Out', face: '0.8° Closed', tag: 'TOUR FLUSH', x: 2, y: -2, note: 'Groove 3 Center' },
      { shape: 'Straight Flush', offline: '0.2 R', faceToPath: '+0.1', path: '0.4° In-to-Out', face: '0.0° Square', tag: 'PURE FLUSH', x: 0, y: 1, note: 'Dead Center' },
      { shape: 'Power Fade', offline: '2.4 R', faceToPath: '+1.2', path: '1.2° Out-to-In', face: '0.9° Open', tag: 'CONTROLLED FADE', x: 8, y: -4, note: '+4mm Toe Strike' },
      { shape: 'High Draw', offline: '1.8 L', faceToPath: '-1.1', path: '2.0° In-to-Out', face: '0.9° Closed', tag: 'HIGH APEX', x: -3, y: 3, note: 'High Center' },
      { shape: 'Tour Dispersion', offline: '0.6 L', faceToPath: '-0.2', path: '0.8° In-to-Out', face: '0.6° Square', tag: 'TOUR GRADE', x: 4, y: 0, note: '+2mm Toe Sweet Spot' }
    ];
    const shapeChoice = shapeVariants[Math.floor(Math.random() * shapeVariants.length)];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newShotItem = {
      shotNumber: nextShotNum,
      clubKey,
      clubName: profile.name,
      carry,
      carryUnit: 'YD',
      total,
      ballSpeed: parseFloat(ballSpeed),
      clubSpeed: parseFloat(clubSpeed),
      smash: parseFloat(smash),
      launch: parseFloat(launch),
      spin,
      offline: shapeChoice.offline,
      shape: shapeChoice.shape,
      tag: shapeChoice.tag,
      time: timeStr,
      offsetX: shapeChoice.x,
      offsetY: shapeChoice.y
    };

    // Construct full Telemetry format
    const fullTelemetryObj = {
      shotNumber: nextShotNum,
      club: profile.name,
      shaft: profile.shaft,
      distance: `${carry} YD`,
      carryYardage: carry,
      totalYardage: total,
      pinYardage: `${targetDistance} YD (TARGET PIN)`,
      flightMicroStats: {
        apex: `${profile.baseApex + Math.round(launchJitter * 2)} FT`,
        curvature: `${shapeChoice.offline} ${shapeChoice.shape.toUpperCase()}`,
        offline: shapeChoice.offline
      },
      metrics: [
        { id: "ball-speed", label: "BALL SPEED", value: ballSpeed, unit: "MPH", baseline: profile.pgaBallSpeed, status: "OPTIMAL", color: "emerald", percentage: 99 },
        { id: "club-speed", label: "CLUB SPEED", value: clubSpeed, unit: "MPH", baseline: profile.pgaClubSpeed, status: "OPTIMAL", color: "emerald", percentage: 98 },
        { id: "smash-factor", label: "SMASH FACTOR", value: smash, unit: "", baseline: profile.pgaSmash, status: "OPTIMAL", color: "emerald", percentage: 98 },
        { id: "spin-rate", label: "SPIN RATE", value: spin.toLocaleString(), unit: "RPM", baseline: profile.pgaSpin, status: "IDEAL", note: `Axis: ${shapeChoice.offline}`, color: "emerald", percentage: 97 },
        { id: "launch-angle", label: "LAUNCH ANGLE", value: launch, unit: "°", baseline: profile.pgaLaunch, status: "IN WINDOW", color: "lime", percentage: 96 },
        { id: "face-to-path", label: "FACE-TO-PATH", value: shapeChoice.faceToPath, unit: "°", baseline: "0.0°", status: "SQUARE", color: "cyan", percentage: 96 },
        { id: "attack-angle", label: "ATTACK ANGLE", value: clubKey === 'driver' ? "+2.6" : "-4.2", unit: "°", baseline: clubKey === 'driver' ? "+2.0°" : "-4.5°", status: clubKey === 'driver' ? "ASCENDING" : "DESCENDING", color: "emerald", percentage: 98 }
      ],
      impactRadar: {
        point: shapeChoice.note,
        offsetX: shapeChoice.x,
        offsetY: shapeChoice.y,
        dynamicLoft: `${(parseFloat(launch) + 0.8).toFixed(1)}°`,
        faceAngle: shapeChoice.face,
        clubPath: shapeChoice.path
      },
      aiCoach: {
        score: `${93 + Math.floor(Math.random() * 6)}%`,
        recommendation: "Hold Follow-Through Balance",
        duration: "1 min 45 sec",
        analysis: `Peak machine vision tracking confirmed ${shapeChoice.tag}. Rotational speed generated optimal compression against the ${profile.name}.`
      }
    };

    // Update state
    setSessionShots((prev) => [newShotItem, ...prev]);
    setTelemetryCatalog((prev) => ({
      ...prev,
      [clubKey]: fullTelemetryObj
    }));
    setLastShotFeedback({
      carry: `${carry} YD`,
      total: `${total} YD`,
      ballSpeed: `${ballSpeed} MPH`,
      clubSpeed: `${clubSpeed} MPH`,
      smash,
      launch: `${launch}°`,
      spin: `${spin} RPM`,
      shape: shapeChoice.shape,
      tag: shapeChoice.tag,
      shotNumber: nextShotNum
    });

    return newShotItem;
  };

  const formatElapsed = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Aggregated session statistics
  const totalBallsHit = sessionShots.length;
  const avgCarry = Math.round(sessionShots.reduce((acc, s) => acc + (s.carry || 200), 0) / (totalBallsHit || 1));
  const avgBallSpeed = (sessionShots.reduce((acc, s) => acc + (parseFloat(s.ballSpeed) || 140), 0) / (totalBallsHit || 1)).toFixed(1);
  const avgSmash = (sessionShots.reduce((acc, s) => acc + (parseFloat(s.smash) || 1.4), 0) / (totalBallsHit || 1)).toFixed(2);
  const fairwayHits = sessionShots.filter(s => parseFloat(s.offline) <= 3.0).length;
  const accuracyPct = Math.round((fairwayHits / (totalBallsHit || 1)) * 100);

  return (
    <RangeSessionContext.Provider
      value={{
        isSessionActive,
        setIsSessionActive,
        startSession,
        endSession,
        activeClubKey,
        setActiveClubKey,
        targetDistance,
        setTargetDistance,
        sensorMode,
        setSensorMode,
        elapsedTimeFormatted: formatElapsed(elapsedSeconds),
        elapsedSeconds,
        sessionShots,
        telemetryCatalog,
        lastShotFeedback,
        triggerSimulatedShot,
        showSummaryModal,
        setShowSummaryModal,
        sessionStats: {
          totalBallsHit,
          avgCarry,
          avgBallSpeed,
          avgSmash,
          accuracyPct
        },
        CLUB_PROFILES
      }}
    >
      {children}
    </RangeSessionContext.Provider>
  );
}

export function useRangeSession() {
  const context = useContext(RangeSessionContext);
  if (!context) {
    throw new Error('useRangeSession must be used within a RangeSessionProvider');
  }
  return context;
}
