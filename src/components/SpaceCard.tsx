import React from 'react';
import { 
  Heart, 
  MapPin, 
  Wifi, 
  Zap, 
  Droplet, 
  Users, 
  Wind, 
  Umbrella, 
  Sparkles,
  Info,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OutdoorSpace, WeatherCondition } from '../types';
import { calculateSpaceComfort } from '../utils/comfortEngine';

interface SpaceCardProps {
  space: OutdoorSpace;
  weather: WeatherCondition;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectSpace: (space: OutdoorSpace) => void;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({
  space,
  weather,
  isFavorite,
  onToggleFavorite,
  onSelectSpace,
}) => {
  const comfort = calculateSpaceComfort(space, weather);

  const handleConfetti = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF69B4', '#B197FC', '#63E6BE', '#FFD43B'],
    });
  };

  // Crowd indicator styling
  const getCrowdBadge = (crowd: string) => {
    if (crowd.includes('Peaceful')) {
      return { dot: 'bg-emerald-500', label: 'Peaceful (~' + space.crowdPct + '%)', bg: 'bg-emerald-50 text-emerald-700' };
    }
    if (crowd.includes('Moderate')) {
      return { dot: 'bg-amber-400', label: 'Moderate (~' + space.crowdPct + '%)', bg: 'bg-amber-50 text-amber-700' };
    }
    return { dot: 'bg-purple-500', label: 'Social & Lively (~' + space.crowdPct + '%)', bg: 'bg-purple-50 text-purple-700' };
  };

  const crowdInfo = getCrowdBadge(space.currentCrowd);

  return (
    <div 
      onClick={() => onSelectSpace(space)}
      className="group relative flex flex-col bg-white rounded-3xl border border-pink-100/70 shadow-soft hover:shadow-cute hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image & Header Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Zone Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
            <MapPin className="w-3 h-3 text-pink-500" />
            {space.zone}
          </span>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(space.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-pink-500 hover:scale-110 active:scale-90 transition-all shadow-xs"
            aria-label="Save to favorites"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isFavorite 
                  ? 'fill-pink-500 text-pink-500' 
                  : 'text-slate-400'
              }`} 
            />
          </button>
        </div>

        {/* Shade & Rain indicators at bottom of photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-[11px]">
              ⛱️ {space.shadePct}% Shade
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-[11px]">
              {space.rainProtection === '100% Waterproof' ? '☔ 100% Dry' : '🍃 Canopy'}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 text-slate-800 text-[11px] font-bold shadow-xs">
            ⭐ {space.rating}
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dynamic Comfort Match Header */}
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${comfort.badgeColor}`}>
              {comfort.badgeLabel}
            </span>

            {/* Microclimate perceived temperature */}
            <div className="text-right">
              <span className="text-xs font-bold text-slate-800">
                Feels ~{comfort.perceivedTemp}°C
              </span>
              <span className="block text-[10px] text-emerald-600 font-semibold">
                ({space.tempDelta > 0 ? `+${space.tempDelta}` : space.tempDelta}°C cooler!)
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1 mb-1">
            {space.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {space.tagline}
          </p>

          {/* Comfort Reason Callout */}
          <div className="mb-3 p-2.5 rounded-xl bg-purple-50/50 border border-purple-100/60 text-[11px] text-slate-600 font-medium">
            💡 {comfort.comfortReason}
          </div>

          {/* Amenities & Crowd Bar */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px] text-slate-600">
            {space.amenities.includes('wifi') && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                <Wifi className="w-3 h-3 text-indigo-500" /> Eduroam
              </span>
            )}
            {space.powerPlugCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                <Zap className="w-3 h-3 text-amber-500" /> {space.powerPlugCount} Plugs
              </span>
            )}
            {space.mistingActive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 font-semibold animate-pulse">
                💨 Misting ON
              </span>
            )}
            {space.amenities.includes('hammock_posts') && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                🌴 Hammocks
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions & Crowd Status */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Crowd pill */}
          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold ${crowdInfo.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${crowdInfo.dot}`}></span>
            {crowdInfo.label}
          </div>

          {/* Quick Confetti "Claim Spot" */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleConfetti}
              className="p-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              title="Heading here now! Celebrate claim"
            >
              🎉
            </button>
            <span className="text-xs font-semibold text-purple-600 group-hover:translate-x-0.5 transition-transform flex items-center">
              Details <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
