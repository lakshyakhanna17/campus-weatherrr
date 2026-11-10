import React from 'react';
import { 
  CloudSun, 
  Sparkles, 
  Heart, 
  MapPin, 
  Megaphone, 
  SlidersHorizontal,
  ChevronDown,
  Sun,
  CloudRain,
  CloudDrizzle,
  Wind,
  Sunrise
} from 'lucide-react';
import { WeatherConditionType } from '../types';
import { WEATHER_PRESETS } from '../data/mockData';

interface NavbarProps {
  currentWeatherKey: WeatherConditionType;
  onWeatherChange: (key: WeatherConditionType) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenQuiz: () => void;
  onOpenReportModal: () => void;
  activeView: 'grid' | 'map';
  setActiveView: (view: 'grid' | 'map') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentWeatherKey,
  onWeatherChange,
  favoritesCount,
  onOpenFavorites,
  onOpenQuiz,
  onOpenReportModal,
  activeView,
  setActiveView,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const activePreset = WEATHER_PRESETS[currentWeatherKey];

  const weatherIcons: Record<WeatherConditionType, React.ReactNode> = {
    extreme_heat: <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />,
    heavy_rain: <CloudRain className="w-4 h-4 text-blue-500 animate-bounce" />,
    passing_drizzle: <CloudDrizzle className="w-4 h-4 text-teal-500" />,
    breezy_pleasant: <Wind className="w-4 h-4 text-indigo-500" />,
    crisp_morning: <Sunrise className="w-4 h-4 text-orange-400" />,
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-pink-100/70 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Logo & Campus Identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 flex items-center justify-center shadow-soft transform hover:rotate-6 transition-transform">
            <span className="text-2xl filter drop-shadow-sm select-none">🌤️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CampusBreeze
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200">
                ✨ Comfort Hub
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3 h-3 text-pink-400" />
              <span className="font-medium">Maplewood University</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Live Sensors Active
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Weather Simulation Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200/60 hover:border-pink-300 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:shadow hover:scale-[1.02]"
              title="Test how the comfort score adapts to weather extremes"
            >
              {weatherIcons[currentWeatherKey]}
              <span className="hidden md:inline text-slate-500 font-normal">Simulate:</span>
              <span className="max-w-[130px] sm:max-w-none truncate">{activePreset.name}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-white text-xs font-bold text-amber-700 shadow-xs border border-amber-100">
                {activePreset.temp}°C
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-cute border border-purple-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      🧪 Simulate Weather Scenarios
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      See how shade, rain shelters, and comfort scores recalculate!
                    </p>
                  </div>
                  {(Object.keys(WEATHER_PRESETS) as WeatherConditionType[]).map((key) => {
                    const preset = WEATHER_PRESETS[key];
                    const isSelected = key === currentWeatherKey;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onWeatherChange(key);
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors ${
                          isSelected 
                            ? 'bg-purple-50/80 text-purple-900 font-bold' 
                            : 'hover:bg-slate-50 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{preset.emoji}</span>
                          <div>
                            <div className="text-xs font-semibold">{preset.name}</div>
                            <div className="text-[10px] text-slate-400">
                              Feels {preset.feelsLike}°C • UV {preset.uvIndex} • Rain {preset.rainProbability}%
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Quick Quiz Match Button */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-cute hover:opacity-95 transition-all hover:scale-[1.03] active:scale-95"
            title="Answer 3 quick questions to find your best study spot"
          >
            <Sparkles className="w-4 h-4 text-yellow-200 animate-wiggle" />
            <span className="hidden sm:inline">Find My Spot</span>
            <span className="sm:hidden">Quiz</span>
          </button>

          {/* View Toggle: Grid vs Map */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveView('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'grid'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🎴 Cards
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'map'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🗺️ Campus Map
            </button>
          </div>

          {/* Live Student Report Button */}
          <button
            onClick={onOpenReportModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-all"
            title="Share crowd or weather condition from your spot"
          >
            <Megaphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Post Update</span>
          </button>

          {/* Favorites Button with Counter Badge */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-2xl bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 transition-all hover:scale-105 active:scale-95"
            aria-label="Saved Favorite Spaces"
          >
            <Heart className="w-4 h-4 fill-pink-400 text-pink-500" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-bounce-gentle">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
