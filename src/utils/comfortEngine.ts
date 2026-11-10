import { OutdoorSpace, WeatherCondition } from '../types';

export interface ComfortResult {
  matchScore: number; // 0 - 100
  badgeLabel: string;
  badgeColor: string; // Tailwind color classes
  perceivedTemp: number; // in °C
  comfortReason: string;
  isRecommended: boolean;
  alertNote?: string;
}

export function calculateSpaceComfort(
  space: OutdoorSpace,
  weather: WeatherCondition
): ComfortResult {
  let score = 70; // baseline

  // 1. Extreme Heat Calculation
  if (weather.id === 'extreme_heat') {
    // Shade impact
    if (space.shadePct >= 95) score += 20;
    else if (space.shadePct >= 85) score += 12;
    else if (space.shadePct >= 70) score += 0;
    else score -= 35; // direct sun is brutal in heatwave

    // Misting fans bonus
    if (space.mistingActive) score += 15;

    // Additional cooling features (waterfront, stone arches)
    if (space.tempDelta <= -5) score += 12;
    else if (space.tempDelta <= -3.5) score += 8;

    // Power outlets / hydration bonus for long refuge
    if (space.amenities.includes('water_station')) score += 4;
  } 
  // 2. Heavy Rain Calculation
  else if (weather.id === 'heavy_rain') {
    if (space.rainProtection === '100% Waterproof') {
      score += 28;
    } else if (space.rainProtection === 'Canopy Drizzle Shield') {
      score -= 25; // fails during downpour
    } else {
      score -= 60; // completely exposed to torrential rain
    }
    // High WiFi and covered seating bonus on rainy days
    if (space.amenities.includes('study_desks')) score += 5;
    if (space.amenities.includes('power_outlets')) score += 5;
  }
  // 3. Passing Drizzle Calculation
  else if (weather.id === 'passing_drizzle') {
    if (space.rainProtection === '100% Waterproof') {
      score += 24;
    } else if (space.rainProtection === 'Canopy Drizzle Shield') {
      score += 15; // cozy under tree canopy
    } else {
      score -= 40;
    }
  }
  // 4. Pleasant / Golden Hour
  else if (weather.id === 'breezy_pleasant') {
    score = 88;
    if (space.amenities.includes('hammock_posts')) score += 10;
    if (space.zone.includes('Lake')) score += 8;
    if (space.shadePct >= 70 && space.shadePct <= 95) score += 4;
  }
  // 5. Crisp Morning
  else {
    score = 82;
    if (space.shadePct < 90) score += 10; // morning sun is warm and welcoming
    if (space.amenities.includes('cafe_nearby')) score += 8;
  }

  // Factor in crowd comfort balance
  if (space.crowdPct > 90) score -= 8; // overcrowded
  if (space.rating >= 4.8) score += 4;

  // Clamp score
  const finalScore = Math.min(99, Math.max(15, Math.round(score)));

  // Calculate microclimate temperature
  const perceivedTemp = Math.round((weather.feelsLike + space.tempDelta) * 10) / 10;

  // Badges & Reason
  let badgeLabel = 'Comfortable ✨';
  let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let comfortReason = 'Balanced shade and pleasant micro-climate.';
  let isRecommended = finalScore >= 80;
  let alertNote: string | undefined = undefined;

  if (weather.id === 'extreme_heat') {
    if (finalScore >= 88) {
      badgeLabel = '🧊 Top Heat Oasis';
      badgeColor = 'bg-cyan-50 text-cyan-800 border-cyan-200';
      comfortReason = `Deep ${space.shadePct}% shade & cooling architecture reduces temp to ~${perceivedTemp}°C!`;
    } else if (finalScore < 60) {
      badgeLabel = '☀️ High Heat Warning';
      badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
      comfortReason = 'Insufficient shade for a 35°C afternoon. Sun exposure risk!';
      alertNote = 'Expect strong sun glare and high ambient heat.';
    }
  } else if (weather.id === 'heavy_rain' || weather.id === 'passing_drizzle') {
    if (space.rainProtection === '100% Waterproof') {
      badgeLabel = '☔ 100% Rainproof Nook';
      badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      comfortReason = 'Full architectural roof coverage keeps desks and seating bone-dry.';
    } else {
      badgeLabel = '🌧️ Wet / Exposed';
      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
      comfortReason = 'Leaves or open air will not shield your laptop or books from rain!';
      alertNote = 'Rain shelter not guaranteed; seating may be damp.';
    }
  } else {
    if (finalScore >= 90) {
      badgeLabel = '🌟 Prime Vibe';
      badgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
      comfortReason = 'Ideal atmospheric conditions for studying, resting, or catching up.';
    }
  }

  return {
    matchScore: finalScore,
    badgeLabel,
    badgeColor,
    perceivedTemp,
    comfortReason,
    isRecommended,
    alertNote,
  };
}

