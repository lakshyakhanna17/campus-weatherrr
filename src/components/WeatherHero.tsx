import React from 'react';
import { 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  ShieldAlert, 
  Sparkles, 
  Umbrella,
  TreeDeciduous,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { WeatherCondition } from '../types';

interface WeatherHeroProps {
  weather: WeatherCondition;
  onFilterHeatHavens?: () => void;
  onFilterRainHavens?: () => void;
}

export const WeatherHero: React.FC<WeatherHeroProps> = ({
  weather,
  onFilterHeatHavens,
  onFilterRainHavens,
}) => {
  // Determine mascot expression and theme colors based on comfort status
  const getComfortDetails = () => {
    switch (weather.comfortStatus) {
      case 'danger_heat':
        return {
          bannerBg: 'from-amber-100/90 via-rose-50/80 to-orange-50/90 border-amber-200/80',
          badgeBg: 'bg-amber-500 text-white shadow-amber-200',
          mascotEmoji: '🥵',
          mascotFace: 'cloud-sweat',
          statusText: 'Severe Heat Advisory',
          pillColor: 'bg-amber-100 text-amber-800 border-amber-300',
          advice: 'Direct sunlight is dangerous for laptops & hydration. Choose spaces with 90%+ tree canopy or architectural roof overhangs.',
          ctaLabel: 'Show Heatwave Oases 🧊',
          ctaAction: onFilterHeatHavens,
        };
      case 'danger_rain':
        return {
          bannerBg: 'from-blue-100/90 via-indigo-50/80 to-slate-100/90 border-blue-200/80',
          badgeBg: 'bg-blue-600 text-white shadow-blue-200',
          mascotEmoji: '🌧️',
          mascotFace: 'cloud-rainy',
          statusText: 'Heavy Rain & Wind Warning',
          pillColor: 'bg-blue-100 text-blue-800 border-blue-300',
          advice: 'Open lawns and tree canopies will soak through! Choose 100% waterproof cloisters, porticos, and covered pergolas.',
          ctaLabel: 'Show 100% Dry Havens ☔',
          ctaAction: onFilterRainHavens,
        };
      case 'warning':
        return {
          bannerBg: 'from-teal-100/80 via-emerald-50/70 to-sky-50/80 border-teal-200/70',
          badgeBg: 'bg-teal-600 text-white shadow-teal-200',
          mascotEmoji: '🌦️',
          mascotFace: 'cloud-chill',
          statusText: 'Passing Light Drizzle',
          pillColor: 'bg-teal-100 text-teal-800 border-teal-300',
          advice: 'Dappled trellises and botanical terraces offer magical rain watching without getting wet.',
          ctaLabel: 'Find Cozy Covered Nooks 🌿',
          ctaAction: onFilterRainHavens,
        };
      case 'ideal':
      default:
        return {
          bannerBg: 'from-pink-100/80 via-purple-50/70 to-indigo-50/80 border-purple-200/70',
          badgeBg: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-purple-200',
          mascotEmoji: '🌸',
          mascotFace: 'cloud-happy',
          statusText: 'Prime Comfort Conditions',
          pillColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          advice: 'Gentle breeze and safe UV levels! Hammocks, grass lawns, and outdoor amphitheater steps are all operating at peak comfort.',
          ctaLabel: 'Explore Top Rated Spots ✨',
          ctaAction: onFilterHeatHavens,
        };
    }
  };

  const details = getComfortDetails();

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${details.bannerBg} border shadow-soft p-5 sm:p-7 md:p-8 transition-all duration-300`}>
      {/* Decorative cute background elements */}
      <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute left-1/3 -top-12 w-48 h-48 bg-pink-200/30 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        {/* Left Section: Real-time Weather & Comfort Index */}
        <div className="flex-1">
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${details.badgeBg}`}>
              {weather.comfortStatus.includes('danger') ? (
                <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {details.statusText}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 text-slate-700 border border-slate-200 shadow-xs">
              <Activity className="w-3 h-3 text-indigo-500" />
              Comfort Score: <b className="text-slate-900">{weather.comfortScore}/100</b>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 text-slate-700 border border-slate-200">
              <TreeDeciduous className="w-3 h-3 text-emerald-600" />
              Shade Need: <b className="text-emerald-700">{weather.uvIndex >= 7 ? 'Critical' : 'Moderate'}</b>
            </span>
          </div>

          {/* Big Temperature & Headline */}
          <div className="flex items-baseline gap-3 mb-2">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-sans">
              {weather.temp}°C
            </div>
            <div className="text-slate-600">
              <span className="text-base sm:text-lg font-semibold block leading-tight">
                Feels like <span className="text-slate-900 font-bold">{weather.feelsLike}°C</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {weather.name}
              </span>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-snug mb-3">
            {weather.comfortHeadline}
          </h2>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
            <div className="bg-white/85 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">UV Index</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  {weather.uvIndex} <span className="text-[10px] text-slate-500 font-normal">({weather.uvIndex > 7 ? 'Very High' : 'Moderate'})</span>
                </div>
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Humidity</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">{weather.humidity}%</div>
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100/80 flex items-center justify-center text-indigo-600">
                <CloudRain className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Rain Risk</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">{weather.rainProbability}%</div>
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-100/80 flex items-center justify-center text-teal-600">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Breeze</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">{weather.windSpeed} km/h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Cute Mascot "Breezy the Campus Cloud" with advice bubble */}
        <div className="lg:w-80 flex flex-col justify-center items-start lg:items-end">
          <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-purple-100 shadow-soft relative transition-all hover:shadow-cute">
            
            {/* Mascot header */}
            <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-slate-100">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-200 to-indigo-200 flex items-center justify-center text-xl shadow-xs animate-float">
                  {weather.comfortStatus === 'danger_heat' ? '🫠' : weather.comfortStatus === 'danger_rain' ? '🌧️' : '☁️'}
                </div>
                <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  Breezy
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-700 font-semibold">
                    Campus Mascot
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Live Comfort Assistant</div>
              </div>
            </div>

            {/* Mascot Speech */}
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              "{weather.mascotTip}"
            </p>

            {/* Direct CTA button to filter the best matching spaces */}
            {details.ctaAction && (
              <button
                onClick={details.ctaAction}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.01] active:scale-98"
              >
                <span>{details.ctaLabel}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
