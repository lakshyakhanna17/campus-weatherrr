import React from 'react';
import { OutdoorSpace, WeatherCondition } from '../types';
import { calculateSpaceComfort } from '../utils/comfortEngine';
import { MapPin, Sparkles, Navigation, Layers, Info } from 'lucide-react';

interface InteractiveCampusMapProps {
  spaces: OutdoorSpace[];
  weather: WeatherCondition;
  selectedSpaceId: string | null;
  onSelectSpace: (space: OutdoorSpace) => void;
}

export const InteractiveCampusMap: React.FC<InteractiveCampusMapProps> = ({
  spaces,
  weather,
  selectedSpaceId,
  onSelectSpace,
}) => {
  const [hoveredSpace, setHoveredSpace] = React.useState<OutdoorSpace | null>(null);

  return (
    <div className="bg-white rounded-3xl border border-pink-100/80 shadow-soft p-4 sm:p-6 overflow-hidden">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span>🗺️</span> Maplewood University Campus Comfort Map
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
              Interactive GPS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any pin to inspect real-time microclimate, tree canopy, and crowd density.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-100">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs"></span> 90%+ Comfy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs"></span> Fair
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-xs"></span> Exposed
          </span>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#EBF4E8] rounded-2xl overflow-hidden border border-slate-200 select-none shadow-inner">
        {/* SVG Illustrated Campus Map Ground */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full object-cover pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lakeWater" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="lawnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9F99D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#BEF264" stopOpacity="0.3" />
            </linearGradient>
            <pattern id="brick" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 20 10 M 10 0 L 10 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Campus Grounds Background Grass */}
          <rect width="1000" height="600" fill="#F1F8EE" />

          {/* Organic Grass Lawns */}
          <path
            d="M 50 80 Q 250 50 420 120 T 520 280 Q 300 320 150 260 Z"
            fill="url(#lawnGrad)"
          />
          <path
            d="M 600 50 Q 800 40 920 160 T 850 350 Q 700 280 620 200 Z"
            fill="url(#lawnGrad)"
          />

          {/* Lake Claire Waterfront */}
          <path
            d="M 680 400 C 720 380, 850 360, 950 420 C 1000 450, 1000 600, 850 600 C 740 600, 640 520, 680 400 Z"
            fill="url(#lakeWater)"
          />
          {/* Lake Ripples */}
          <path d="M 750 450 Q 770 445 790 450" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 830 480 Q 850 475 870 480" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 720 500 Q 740 495 760 500" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* Paved Campus Walkways */}
          {/* Main Diagonal Walkway */}
          <path
            d="M 100 50 Q 400 300 900 300"
            stroke="#E2E8F0"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 100 50 Q 400 300 900 300"
            stroke="#CBD5E1"
            strokeWidth="28"
            fill="none"
            strokeLinecap="round"
          />

          {/* North-South Boulevard */}
          <path
            d="M 500 40 L 500 560"
            stroke="#CBD5E1"
            strokeWidth="24"
            fill="none"
            strokeLinecap="round"
          />

          {/* East Crossway to Lake */}
          <path
            d="M 450 380 Q 620 420 720 440"
            stroke="#CBD5E1"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />

          {/* Campus Building Footprints (Soft Pastel Slate) */}
          {/* Old Main Library */}
          <rect x="330" y="100" width="130" height="90" rx="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <text x="395" y="150" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="bold">Main Library</text>

          {/* Student Union */}
          <rect x="440" y="370" width="140" height="90" rx="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <text x="510" y="420" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="bold">Student Union</text>

          {/* Engineering Hall */}
          <rect x="150" y="300" width="120" height="90" rx="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <text x="210" y="350" textAnchor="middle" fill="#64748B" fontSize="12" fontWeight="bold">Engineering</text>

          {/* Botanical Conservatory Glasshouse */}
          <rect x="470" y="210" width="110" height="75" rx="14" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4" />
          <text x="525" y="252" textAnchor="middle" fill="#0284C7" fontSize="12" fontWeight="bold">Botanical Green</text>

          {/* Fine Arts Complex */}
          <rect x="730" y="150" width="110" height="85" rx="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <text x="785" y="198" textAnchor="middle" fill="#64748B" fontSize="12" fontWeight="bold">Arts Pavilion</text>

          {/* Cute Tree Clusters */}
          {/* North Oak cluster */}
          <circle cx="270" cy="120" r="28" fill="#86EFAC" opacity="0.8" />
          <circle cx="295" cy="140" r="22" fill="#4ADE80" opacity="0.8" />
          <circle cx="250" cy="145" r="20" fill="#22C55E" opacity="0.7" />

          {/* Lake Willow cluster */}
          <circle cx="740" cy="420" r="32" fill="#86EFAC" opacity="0.85" />
          <circle cx="780" cy="410" r="26" fill="#4ADE80" opacity="0.85" />
          <circle cx="730" cy="455" r="24" fill="#22C55E" opacity="0.8" />

          {/* Botanical Garden cluster */}
          <circle cx="560" cy="285" r="22" fill="#F472B6" opacity="0.6" />
          <circle cx="580" cy="305" r="18" fill="#FB7185" opacity="0.6" />

          {/* Campus Zone Labels */}
          <text x="350" y="55" fill="#64748B" fontSize="14" fontWeight="800" opacity="0.7">🏛️ NORTH ACADEMIC QUAD</text>
          <text x="780" y="570" fill="#0284C7" fontSize="14" fontWeight="800" opacity="0.8">⛵ LAKE CLAIRE</text>
          <text x="140" y="440" fill="#64748B" fontSize="13" fontWeight="800" opacity="0.7">⚙️ TECH COURTYARD</text>
        </svg>

        {/* Interactive Space Pins overlay */}
        {spaces.map((space) => {
          const comfort = calculateSpaceComfort(space, weather);
          const isSelected = selectedSpaceId === space.id;
          const isHovered = hoveredSpace?.id === space.id;

          // Color based on comfort match
          let pinBg = 'bg-emerald-500';
          let ringColor = 'ring-emerald-200';
          if (comfort.matchScore < 60) {
            pinBg = 'bg-rose-500';
            ringColor = 'ring-rose-200';
          } else if (comfort.matchScore < 80) {
            pinBg = 'bg-amber-400';
            ringColor = 'ring-amber-200';
          }

          return (
            <div
              key={space.id}
              style={{
                left: `${space.coordinates.x}%`,
                top: `${space.coordinates.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-200"
              onMouseEnter={() => setHoveredSpace(space)}
              onMouseLeave={() => setHoveredSpace(null)}
              onClick={() => onSelectSpace(space)}
            >
              {/* Pulse Ring for Top Recommended Spaces */}
              {comfort.matchScore >= 88 && (
                <span className="absolute -inset-2 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
              )}

              {/* Pin Bubble */}
              <div 
                className={`relative px-2.5 py-1 rounded-2xl flex items-center gap-1.5 shadow-md transition-all duration-200 border border-white text-white ${pinBg} ${
                  isSelected || isHovered 
                    ? 'scale-125 ring-4 ' + ringColor + ' z-30 shadow-cute' 
                    : 'hover:scale-115'
                }`}
              >
                <span className="text-xs">
                  {space.shadePct >= 90 ? '⛱️' : '🌿'}
                </span>
                <span className="text-[11px] font-extrabold tracking-tight">
                  {comfort.matchScore}%
                </span>
              </div>

              {/* Pin Label on Hover or Select */}
              {(isHovered || isSelected) && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white shadow-cute pointer-events-none z-40 animate-in fade-in zoom-in-95">
                  <div className="text-xs font-bold truncate">{space.name}</div>
                  <div className="text-[10px] text-pink-300 font-semibold mt-0.5">
                    {comfort.badgeLabel} • Feels ~{comfort.perceivedTemp}°C
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1 line-clamp-1">
                    {space.shadePct}% Shade • {space.currentCrowd}
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Space Preview Bar if any */}
      {hoveredSpace && (
        <div className="mt-3 p-3 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <img 
              src={hoveredSpace.image} 
              alt={hoveredSpace.name} 
              className="w-12 h-12 rounded-xl object-cover" 
            />
            <div>
              <div className="text-xs font-bold text-slate-800">{hoveredSpace.name}</div>
              <div className="text-[11px] text-slate-500">{hoveredSpace.tagline}</div>
            </div>
          </div>
          <button
            onClick={() => onSelectSpace(hoveredSpace)}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            Open Card ✨
          </button>
        </div>
      )}
    </div>
  );
};

