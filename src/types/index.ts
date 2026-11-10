export type WeatherConditionType = 
  | 'extreme_heat' 
  | 'heavy_rain' 
  | 'passing_drizzle' 
  | 'breezy_pleasant' 
  | 'crisp_morning';

export interface WeatherCondition {
  id: WeatherConditionType;
  name: string;
  emoji: string;
  temp: number; // Celsius
  feelsLike: number;
  humidity: number; // %
  uvIndex: number;
  windSpeed: number; // km/h
  rainProbability: number; // %
  comfortHeadline: string;
  comfortStatus: 'danger_heat' | 'danger_rain' | 'warning' | 'ideal';
  comfortScore: number; // 0 - 100
  mascotTip: string;
  recommendedFilter: string;
}

export type ShadeLevel = 'full_covered' | 'dense_canopy' | 'dappled' | 'open_sky';
export type RainProtection = '100% Waterproof' | 'Canopy Drizzle Shield' | 'Exposed';
export type CrowdLevel = 'Peaceful & Quiet' | 'Moderate Vibe' | 'Bustling & Social';

export type Amenity = 
  | 'wifi' 
  | 'power_outlets' 
  | 'water_station' 
  | 'cushioned_seats' 
  | 'study_desks' 
  | 'misting_fans' 
  | 'hammock_posts' 
  | 'cafe_nearby' 
  | 'wheelchair_accessible'
  | 'night_lighting';

export interface OutdoorSpace {
  id: string;
  name: string;
  zone: string;
  tagline: string;
  description: string;
  image: string;
  shadeLevel: ShadeLevel;
  shadePct: number;
  rainProtection: RainProtection;
  currentCrowd: CrowdLevel;
  crowdPct: number; // 0-100% capacity
  tempDelta: number; // e.g. -4°C cooler due to shade/misters/stone
  amenities: Amenity[];
  bestFor: string[];
  coordinates: { x: number; y: number }; // Percentage on campus map
  rating: number;
  reviewsCount: number;
  secretTip: string;
  mistingActive?: boolean;
  powerPlugCount: number;
  coveredSeatsCount: number;
}

export interface LiveReport {
  id: string;
  spaceId: string;
  spaceName: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  crowd: CrowdLevel;
  comfortRating: 'Heavenly 🪽' | 'Pretty Good ✨' | 'Getting Warm ☀️' | 'Too Hot 🥵' | 'Rainy / Damp 🌧️';
  shadeCondition: 'Total Shade ☂️' | 'Flickering Sunlight ⛅' | 'Direct Sun 🔥' | 'Dry Under Roof 🏠';
  comment: string;
  likes: number;
}

