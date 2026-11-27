// Mock data for Red Stakes Golf mobile app

export const MOCK_USER = {
  name: "Alex Reed",
  handle: "@alexreed_golf",
  handicap: "+1.4",
  membership: "RSG Founder #0412",
  avatar: "/images/lifestyle_1.png",
  avatarFallback: "AR",
  homeStudio: "Bay 04 • Detroit Metro Club",
  totalShots: "14,892",
  lifetimeSoftware: true,
  currentBag: [
    { id: "driver", name: "Driver", spec: "9.0° • Stealth 2 Plus • Ventus Black 6X", loft: 9.0, type: "wood" },
    { id: "3wood", name: "3-Wood", spec: "15.0° • Qi10 Tour • Ventus TR Blue 7X", loft: 15.0, type: "wood" },
    { id: "5iron", name: "5-Iron", spec: "26.0° • P770 • Dynamic Gold Tour Issue X100", loft: 26.0, type: "iron" },
    { id: "8iron", name: "8-Iron", spec: "37.0° • P770 • Dynamic Gold Tour Issue X100", loft: 37.0, type: "iron" },
    { id: "pw", name: "Pitching Wedge", spec: "46.0° • MG4 • Dynamic Gold Tour Issue S400", loft: 46.0, type: "wedge" },
    { id: "56w", name: "56° Wedge", spec: "56.12° SB • MG4 High Bounce • Tour Issue S400", loft: 56.0, type: "wedge" }
  ]
};

export const TELEMETRY_SHOTS = {
  driver: {
    shotNumber: 24,
    club: "Driver (9.0°)",
    shaft: "Stealth 2 Plus • Ventus Black 6X",
    distance: "278 YD",
    carryYardage: 278,
    totalYardage: 299,
    pinYardage: "241 YD (15.4 FT DOWNHILL)",
    flightMicroStats: {
      apex: "94 FT",
      curvature: "-1.4 DRAW",
      offline: "2.1 R"
    },
    metrics: [
      { id: "ball-speed", label: "BALL SPEED", value: "167.4", unit: "MPH", baseline: "168.0", pgaBaseline: 168, status: "OPTIMAL", color: "emerald", percentage: 99 },
      { id: "club-speed", label: "CLUB SPEED", value: "114.2", unit: "MPH", baseline: "115.0", pgaBaseline: 115, status: "OPTIMAL", color: "emerald", percentage: 98 },
      { id: "smash-factor", label: "SMASH FACTOR", value: "1.47", unit: "", baseline: "1.49", pgaBaseline: 1.49, status: "OPTIMAL", color: "emerald", percentage: 97 },
      { id: "spin-rate", label: "SPIN RATE", value: "2,420", unit: "RPM", baseline: "2,500", pgaBaseline: 2500, status: "IDEAL", note: "Axis: 3.2° L Draw", color: "emerald", percentage: 96 },
      { id: "launch-angle", label: "LAUNCH ANGLE", value: "12.8", unit: "°", baseline: "11–14°", status: "IN WINDOW", color: "lime", percentage: 92 },
      { id: "face-to-path", label: "FACE-TO-PATH", value: "-1.2", unit: "°", baseline: "0.0°", status: "CLOSED DRAW", color: "cyan", percentage: 88 },
      { id: "attack-angle", label: "ATTACK ANGLE", value: "+2.4", unit: "°", baseline: "+2.0°", status: "ASCENDING", color: "emerald", percentage: 94 }
    ],
    impactRadar: {
      point: "+2mm Toe • High Flush",
      offsetX: 14,
      offsetY: -6,
      dynamicLoft: "13.6°",
      faceAngle: "0.8° Open",
      clubPath: "2.0° In-to-Out"
    },
    aiCoach: {
      score: "94%",
      recommendation: "Gate Tee Face Centering",
      duration: "2 min 14 sec",
      analysis: "Kinematic sequence fired with 98% rotational efficiency. Slight heel drag avoided; clubface rotated square 0.8ms prior to impact."
    }
  },
  "3wood": {
    shotNumber: 18,
    club: "3-Wood (15.0°)",
    shaft: "Qi10 Tour • Ventus TR Blue 7X",
    distance: "254 YD",
    carryYardage: 246,
    totalYardage: 262,
    pinYardage: "248 YD (2.1 FT UPHILL)",
    flightMicroStats: {
      apex: "102 FT",
      curvature: "-0.8 BABY DRAW",
      offline: "1.2 L"
    },
    metrics: [
      { id: "ball-speed", label: "BALL SPEED", value: "158.1", unit: "MPH", baseline: "157.0", pgaBaseline: 157, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "club-speed", label: "CLUB SPEED", value: "108.5", unit: "MPH", baseline: "108.0", pgaBaseline: 108, status: "OPTIMAL", color: "emerald", percentage: 99 },
      { id: "smash-factor", label: "SMASH FACTOR", value: "1.46", unit: "", baseline: "1.48", pgaBaseline: 1.48, status: "OPTIMAL", color: "emerald", percentage: 96 },
      { id: "spin-rate", label: "SPIN RATE", value: "3,180", unit: "RPM", baseline: "3,200", pgaBaseline: 3200, status: "IDEAL", note: "Axis: 1.8° L", color: "emerald", percentage: 98 },
      { id: "launch-angle", label: "LAUNCH ANGLE", value: "11.4", unit: "°", baseline: "10–13°", status: "IN WINDOW", color: "lime", percentage: 95 },
      { id: "face-to-path", label: "FACE-TO-PATH", value: "-0.6", unit: "°", baseline: "0.0°", status: "SQUARE", color: "cyan", percentage: 95 },
      { id: "attack-angle", label: "ATTACK ANGLE", value: "-1.1", unit: "°", baseline: "-1.5°", status: "SWEEPING", color: "emerald", percentage: 96 }
    ],
    impactRadar: {
      point: "DEAD CENTER • PURE FLUSH",
      offsetX: 0,
      offsetY: 2,
      dynamicLoft: "14.2°",
      faceAngle: "0.2° Open",
      clubPath: "0.8° In-to-Out"
    },
    aiCoach: {
      score: "97%",
      recommendation: "Hold Finish Extension",
      duration: "1 min 45 sec",
      analysis: "Near flawless strike trajectory. Smash efficiency meets PGA tour baseline. Apex high enough for soft green landing."
    }
  },
  "8iron": {
    shotNumber: 31,
    club: "8-Iron (37.0°)",
    shaft: "P770 • Dynamic Gold Tour Issue X100",
    distance: "168 YD",
    carryYardage: 164,
    totalYardage: 168,
    pinYardage: "165 YD (FLAT)",
    flightMicroStats: {
      apex: "118 FT",
      curvature: "0.0 STRAIGHT",
      offline: "0.4 L"
    },
    metrics: [
      { id: "ball-speed", label: "BALL SPEED", value: "122.4", unit: "MPH", baseline: "120.0", pgaBaseline: 120, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "club-speed", label: "CLUB SPEED", value: "89.6", unit: "MPH", baseline: "88.0", pgaBaseline: 88, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "smash-factor", label: "SMASH FACTOR", value: "1.37", unit: "", baseline: "1.36", pgaBaseline: 1.36, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "spin-rate", label: "SPIN RATE", value: "7,840", unit: "RPM", baseline: "7,800", pgaBaseline: 7800, status: "IDEAL", note: "Axis: 0.1°", color: "emerald", percentage: 100 },
      { id: "launch-angle", label: "LAUNCH ANGLE", value: "19.2", unit: "°", baseline: "18–21°", status: "IN WINDOW", color: "lime", percentage: 98 },
      { id: "face-to-path", label: "FACE-TO-PATH", value: "+0.1", unit: "°", baseline: "0.0°", status: "SQUARE", color: "cyan", percentage: 99 },
      { id: "attack-angle", label: "ATTACK ANGLE", value: "-4.6", unit: "°", baseline: "-4.5°", status: "DESCENDING", color: "emerald", percentage: 99 }
    ],
    impactRadar: {
      point: "GROOVE 3 • HIGH CENTER",
      offsetX: -2,
      offsetY: 4,
      dynamicLoft: "28.4°",
      faceAngle: "0.0° Square",
      clubPath: "0.1° In-to-Out"
    },
    aiCoach: {
      score: "99%",
      recommendation: "Tempo Replication 3:1",
      duration: "1 min 10 sec",
      analysis: "Tour-grade compression and spin generation. Ball will check and bite within 3 feet of pitch mark."
    }
  },
  "5iron": {
    shotNumber: 19,
    club: "5-Iron (26.0°)",
    shaft: "P770 • Dynamic Gold Tour Issue X100",
    distance: "212 YD",
    carryYardage: 206,
    totalYardage: 212,
    pinYardage: "210 YD (BUNKER RIGHT)",
    flightMicroStats: {
      apex: "112 FT",
      curvature: "-0.4 SLIGHT DRAW",
      offline: "0.8 L"
    },
    metrics: [
      { id: "ball-speed", label: "BALL SPEED", value: "138.6", unit: "MPH", baseline: "137.0", pgaBaseline: 137, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "club-speed", label: "CLUB SPEED", value: "98.2", unit: "MPH", baseline: "97.0", pgaBaseline: 97, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "smash-factor", label: "SMASH FACTOR", value: "1.41", unit: "", baseline: "1.41", pgaBaseline: 1.41, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "spin-rate", label: "SPIN RATE", value: "5,420", unit: "RPM", baseline: "5,500", pgaBaseline: 5500, status: "IDEAL", note: "Axis: 1.1°", color: "emerald", percentage: 98 },
      { id: "launch-angle", label: "LAUNCH ANGLE", value: "14.8", unit: "°", baseline: "14–17°", status: "IN WINDOW", color: "lime", percentage: 97 },
      { id: "face-to-path", label: "FACE-TO-PATH", value: "-0.4", unit: "°", baseline: "0.0°", status: "SQUARE", color: "cyan", percentage: 98 },
      { id: "attack-angle", label: "ATTACK ANGLE", value: "-3.8", unit: "°", baseline: "-3.5°", status: "DESCENDING", color: "emerald", percentage: 99 }
    ],
    impactRadar: {
      point: "SWEET SPOT • FLUSH",
      offsetX: 2,
      offsetY: 1,
      dynamicLoft: "21.6°",
      faceAngle: "0.2° Closed",
      clubPath: "0.6° In-to-Out"
    },
    aiCoach: {
      score: "96%",
      recommendation: "Hold Spine Angle",
      duration: "1 min 25 sec",
      analysis: "Solid long-iron compression. Clean turf interaction simulation with optimal landing descent angle of 48 degrees."
    }
  },
  "pw": {
    shotNumber: 27,
    club: "Pitching Wedge (46.0°)",
    shaft: "MG4 • Dynamic Gold Tour Issue S400",
    distance: "136 YD",
    carryYardage: 134,
    totalYardage: 136,
    pinYardage: "135 YD (FRONT PIN)",
    flightMicroStats: {
      apex: "108 FT",
      curvature: "0.0 PIN HIGH",
      offline: "0.2 R"
    },
    metrics: [
      { id: "ball-speed", label: "BALL SPEED", value: "102.8", unit: "MPH", baseline: "102.0", pgaBaseline: 102, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "club-speed", label: "CLUB SPEED", value: "83.1", unit: "MPH", baseline: "83.0", pgaBaseline: 83, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "smash-factor", label: "SMASH FACTOR", value: "1.24", unit: "", baseline: "1.23", pgaBaseline: 1.23, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "spin-rate", label: "SPIN RATE", value: "9,250", unit: "RPM", baseline: "9,300", pgaBaseline: 9300, status: "IDEAL", note: "Axis: 0.0°", color: "emerald", percentage: 99 },
      { id: "launch-angle", label: "LAUNCH ANGLE", value: "24.2", unit: "°", baseline: "23–26°", status: "IN WINDOW", color: "lime", percentage: 99 },
      { id: "face-to-path", label: "FACE-TO-PATH", value: "0.0", unit: "°", baseline: "0.0°", status: "DEAD SQUARE", color: "cyan", percentage: 100 },
      { id: "attack-angle", label: "ATTACK ANGLE", value: "-5.2", unit: "°", baseline: "-5.0°", status: "TRAPPED", color: "emerald", percentage: 98 }
    ],
    impactRadar: {
      point: "DEAD CENTER SWEET SPOT",
      offsetX: 0,
      offsetY: 0,
      dynamicLoft: "34.2°",
      faceAngle: "0.0° Square",
      clubPath: "0.0° Square"
    },
    aiCoach: {
      score: "98%",
      recommendation: "Pinch & Hold Release",
      duration: "1 min 05 sec",
      analysis: "Laser accurate wedge flight. Clean zip spin with rapid check-and-release pattern."
    }
  },
  "56w": {
    shotNumber: 22,
    club: "56° Wedge (56.0°)",
    shaft: "MG4 High Bounce • Tour Issue S400",
    distance: "104 YD",
    carryYardage: 102,
    totalYardage: 104,
    pinYardage: "105 YD (ELEVATED)",
    flightMicroStats: {
      apex: "96 FT",
      curvature: "0.0 DROP & STOP",
      offline: "0.1 L"
    },
    metrics: [
      { id: "ball-speed", label: "BALL SPEED", value: "88.4", unit: "MPH", baseline: "88.0", pgaBaseline: 88, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "club-speed", label: "CLUB SPEED", value: "76.5", unit: "MPH", baseline: "76.0", pgaBaseline: 76, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "smash-factor", label: "SMASH FACTOR", value: "1.16", unit: "", baseline: "1.15", pgaBaseline: 1.15, status: "OPTIMAL", color: "emerald", percentage: 100 },
      { id: "spin-rate", label: "SPIN RATE", value: "10,180", unit: "RPM", baseline: "10,200", pgaBaseline: 10200, status: "TOUR MAXIMUM", note: "Axis: 0.1°", color: "emerald", percentage: 100 },
      { id: "launch-angle", label: "LAUNCH ANGLE", value: "29.8", unit: "°", baseline: "28–32°", status: "IN WINDOW", color: "lime", percentage: 98 },
      { id: "face-to-path", label: "FACE-TO-PATH", value: "+0.1", unit: "°", baseline: "0.0°", status: "SQUARE", color: "cyan", percentage: 99 },
      { id: "attack-angle", label: "ATTACK ANGLE", value: "-5.8", unit: "°", baseline: "-5.5°", status: "DESCENDING", color: "emerald", percentage: 99 }
    ],
    impactRadar: {
      point: "GROOVE 2 • LOW SWEET SPOT",
      offsetX: 1,
      offsetY: -3,
      dynamicLoft: "42.1°",
      faceAngle: "0.1° Open",
      clubPath: "0.1° In-to-Out"
    },
    aiCoach: {
      score: "99%",
      recommendation: "Low Flight Wedge Control",
      duration: "1 min 15 sec",
      analysis: "High spin generation with controlled apex window. Ball lands softly with immediate 2-foot backspin bite."
    }
  }
};

export const COURSES_CATALOG = [
  { id: "c1", name: "Pebble Bay Links", location: "Monterey, CA", par: 72, yardage: "7,075 YD", difficulty: "Championship", badge: "4K LiDAR", image: "/images/lifestyle_wide.png" },
  { id: "c2", name: "Spyglass Dunes Championship", location: "Carmel, CA", par: 72, yardage: "6,960 YD", difficulty: "Tour Pin", badge: "RSG Tour", image: "/images/simulator_bay.png" },
  { id: "c3", name: "Old Course St. Andrews", location: "Fife, Scotland", par: 72, yardage: "7,305 YD", difficulty: "Links Wind", badge: "LiDAR Ultra", image: "/images/lifestyle_2.png" },
  { id: "c4", name: "Pinehurst No. 2", location: "Pinehurst, NC", par: 70, yardage: "7,588 YD", difficulty: "Extreme Turtleback", badge: "Laser Mapped", image: "/images/lifestyle_1.png" },
  { id: "c5", name: "RSG Ocean Links Arena", location: "Brighton, MI", par: 71, yardage: "7,180 YD", difficulty: "High Stakes", badge: "Arena Hub", image: "/images/header_banner.png" }
];

export const ARENA_LEADERBOARD = [
  { rank: 1, name: "Marcus Vance", country: "US", avatar: "MV", score: "-8", total: 64, thru: "F", prize: "$10,000 + Trophy", isUser: false },
  { rank: 2, name: "Dave K.", country: "CA", avatar: "DK", score: "-7", total: 65, thru: "16", prize: "$5,000", isUser: false },
  { rank: 3, name: "Alex Reed", country: "US", avatar: "AR", score: "-5", total: 67, thru: "14", prize: "$3,500", isUser: true },
  { rank: 4, name: "Tyler H.", country: "UK", avatar: "TH", score: "-4", total: 68, thru: "F", prize: "$2,000", isUser: false },
  { rank: 5, name: "Cameron Diaz", country: "AU", avatar: "CD", score: "-3", total: 69, thru: "17", prize: "$1,500", isUser: false },
  { rank: 6, name: "Soren K.", country: "DK", avatar: "SK", score: "-2", total: 70, thru: "F", prize: "$1,000", isUser: false }
];

export const PRODUCTS = [
  {
    id: "pro-studio-club",
    title: "RSG Pro Studio | Club Edition",
    tagline: "FLAGSHIP TURN-KEY SIMULATOR",
    category: "STUDIO ENCLOSURES",
    price: 13200,
    regularPrice: 16500,
    savings: 3300,
    image: "/images/pro_studio_club.png",
    badge: "FLAGSHIP TURN-KEY",
    deliveryStatus: "IN STOCK • READY IN 30 DAYS",
    sensorBadge: "1,000 FPS SENSOR",
    sensorSub: "OVERHEAD DUAL-VISION",
    features: [
      "Dual-camera machine vision ceiling unit (3,200 FPS ball & club capture)",
      "9'H x 12'W x 5'D aerospace-grade acoustic impact enclosure",
      "High-density triple-layer premium woven polyester projection screen",
      "150+ LiDAR 4K courses included with lifetime free software updates",
      "Pro hitting turf with seamless flush stance mat integration",
      "High-spec 4K ultra-short throw laser projector package"
    ],
    inCart: true
  },
  {
    id: "pro-launch-monitor",
    title: "RSG Pro Launch Monitor",
    tagline: "CEILING MACHINE VISION",
    category: "LAUNCH MONITORS",
    price: 5600,
    regularPrice: 7000,
    savings: 1400,
    image: "/images/launch_monitor.png",
    badge: "PGA TOUR CALIBRATED",
    deliveryStatus: "SHIPS IN 48 HOURS",
    sensorBadge: "1,200 FPS CAPTURE",
    sensorSub: "DUAL HIGH-SPEED VISION",
    features: [
      "1,200 FPS high-speed optical tracking with sub-millimeter precision",
      "Zero marked ball requirement – tracks any standard golf ball",
      "Club path, face angle, impact location, dynamic loft & angle of attack",
      "Ethernet gigabit instant telemetry with <2ms display latency",
      "Mounting hardware & universal ceiling bracket included"
    ],
    inCart: false
  },
  {
    id: "rsg-one-portable",
    title: "RSG One Portable Monitor",
    tagline: "HYBRID INDOOR / RANGE UNIT",
    category: "LAUNCH MONITORS",
    price: 2400,
    regularPrice: 3000,
    savings: 600,
    image: "/images/rsg_one.png",
    badge: "PORTABLE TOUR TECH",
    deliveryStatus: "SAME DAY DISPATCH",
    sensorBadge: "8.5 HR BATTERY",
    sensorSub: "INDOOR / RANGE HYBRID",
    features: [
      "Rugged CNC milled aluminum chassis with all-weather water resistance",
      "Built-in 8.5 hour high-capacity lithium battery for driving range sessions",
      "Direct Wi-Fi 6 & Bluetooth 5.3 low-energy connectivity to iOS/Android",
      "High-visibility OLED sunlight display for standalone outdoor practice",
      "Compact footprint fits seamlessly into golf bag side pocket"
    ],
    inCart: false
  },
  {
    id: "pro-stance-mat-gear",
    title: "RSG Tour Stance Mat & Sensor Rig",
    tagline: "PRECISION TURF & CABLE SYSTEM",
    category: "STANCE MATS & GEAR",
    price: 1199,
    regularPrice: 1499,
    savings: 300,
    image: "/images/studio_included.png",
    badge: "TOUR STANCE TECH",
    deliveryStatus: "IN STOCK",
    sensorBadge: "5' X 5' SURFACE",
    sensorSub: "TRUE-TURF REAL FEEL",
    features: [
      "True-Turf dual pile realistic grass feel that accepts real wooden tees",
      "Prevents joint fatigue and elbow strain with medical shock dampening",
      "Engineered cable channels for seamless flush simulator floor routing",
      "Heavy duty non-slip rubber base resistant to indoor humidity"
    ],
    inCart: false
  }
];
