import React from 'react';
import { 
  X, 
  Heart, 
  MapPin, 
  Wifi, 
  Zap, 
  Droplet, 
  Wind, 
  Sun, 
  Umbrella, 
  Check, 
  Sparkles, 
  Coffee, 
  Clock, 
  MessageSquare,
  ShieldCheck,
  Share2,
  Navigation,
  ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OutdoorSpace, WeatherCondition, LiveReport } from '../types';
import { calculateSpaceComfort } from '../utils/comfortEngine';

interface SpaceDetailModalProps {
  space: OutdoorSpace | null;
  weather: WeatherCondition;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  reports: LiveReport[];
  onOpenReportModal: (spaceId: string) => void;
}

export const SpaceDetailModal: React.FC<SpaceDetailModalProps> = ({
  space,
  weather,
  isFavorite,
  onToggleFavorite,
  onClose,
  reports,
  onOpenReportModal,
}) => {
  if (!space) return null;

  const comfort = calculateSpaceComfort(space, weather);
  const spaceReports = reports.filter((r) => r.spaceId === space.id);

  const handleHeadingHere = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-cute overflow-hidden z-10 my-8 border border-pink-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={space.image}
            alt={space.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/20" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-md flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-pink-500" />
              {space.zone}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(space.id)}
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-pink-500 hover:scale-110 active:scale-90 transition-all shadow-md"
                aria-label="Save to favorites"
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    isFavorite 
                      ? 'fill-pink-500 text-pink-500' 
                      : 'text-slate-400'
                  }`} 
                />
              </button>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-110 active:scale-90 transition-all shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Tagline in Hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border backdrop-blur-md ${comfort.badgeColor}`}>
                {comfort.badgeLabel} ({comfort.matchScore}% Match)
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-xs font-semibold">
                ⭐ {space.rating} ({space.reviewsCount} reviews)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {space.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
              {space.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Weather Match Reason Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">
                Current Comfort Assessment ({weather.name})
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                {comfort.comfortReason}
              </p>
            </div>
          </div>

          {/* Microclimate Deep Dive Stats */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Microclimate & Shelter Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold">Perceived Temp</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">
                  ~{comfort.perceivedTemp}°C
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">
                  {space.tempDelta}°C vs direct sun
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold">Shade Density</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">
                  {space.shadePct}% Covered
                </div>
                <div className="text-[10px] text-purple-600 font-semibold">
                  {space.shadeLevel.replace('_', ' ')}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold">Rain Defense</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">
                  {space.rainProtection}
                </div>
                <div className="text-[10px] text-blue-600 font-semibold">
                  {space.coveredSeatsCount} dry seats
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold">Live Crowd</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">
                  {space.crowdPct}% Full
                </div>
                <div className="text-[10px] text-indigo-600 font-semibold">
                  {space.currentCrowd}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              About this Space
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {space.description}
            </p>
          </div>

          {/* Student Secret Tip */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5">
            <span className="text-lg">💡</span>
            <div>
              <div className="text-xs font-bold text-amber-900">Student Pro-Tip</div>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed font-medium">
                {space.secretTip}
              </p>
            </div>
          </div>

          {/* Amenities & Best For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amenities */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Key Amenities
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span><b>Eduroam Campus WiFi</b> (High-speed signal)</span>
                </li>
                {space.powerPlugCount > 0 && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span><b>{space.powerPlugCount} Power Outlets</b> accessible</span>
                  </li>
                )}
                {space.mistingActive && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span><b>Automated Ultrasonic Misting Fans</b> active</span>
                  </li>
                )}
                {space.amenities.includes('water_station') && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span><b>Filtered Chilled Water Station</b> nearby</span>
                  </li>
                )}
                {space.amenities.includes('cushioned_seats') && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span><b>Ergonomic / Cushioned Seating</b></span>
                  </li>
                )}
              </ul>
            </div>

            {/* Best For Tags */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Best Suited For
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {space.bestFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium shadow-xs"
                  >
                    ✨ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Live Student Community Reports for this space */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Student Reports ({spaceReports.length})
                </h3>
                <p className="text-[11px] text-slate-500">Real-time status updates from students right on the ground</p>
              </div>
              <button
                onClick={() => onOpenReportModal(space.id)}
                className="px-3 py-1.5 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold hover:bg-pink-100 transition-all flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Add Report</span>
              </button>
            </div>

            {spaceReports.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                No reports submitted for this space yet today. Be the first to share! 🌸
              </div>
            ) : (
              <div className="space-y-2.5">
                {spaceReports.map((report) => (
                  <div 
                    key={report.id}
                    className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base shadow-xs shrink-0">
                      {report.userAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{report.userName}</span>
                        <span className="text-[10px] text-slate-400">{report.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 my-1 text-[11px]">
                        <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                          {report.comfortRating}
                        </span>
                        <span className="text-slate-500 font-medium">
                          {report.shadeCondition}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{report.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Bottom Fixed CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Estimated 3 min walk from Student Center 🚶‍♀️
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleHeadingHere}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-cute hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>I'm Heading Here! 🎉</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

