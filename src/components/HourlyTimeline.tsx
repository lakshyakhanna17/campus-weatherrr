import React from 'react';
import { Clock, Sun, Cloud, Sunset, Sunrise, AlertCircle } from 'lucide-react';

interface HourlyPoint {
  time: string;
  label: string;
  temp: number;
  shadeAdvice: string;
  comfortStatus: 'great' | 'caution' | 'danger';
  sunAngle: string;
  icon: React.ReactNode;
}

export const HourlyTimeline: React.FC = () => {
  const points: HourlyPoint[] = [
    {
      time: '09:00 AM',
      label: 'Morning Focus',
      temp: 22,
      shadeAdvice: 'Gentle east sunlight. Pleasant on any bench or terrace.',
      comfortStatus: 'great',
      sunAngle: 'Low East (30°)',
      icon: <Sunrise className="w-4 h-4 text-amber-500" />,
    },
    {
      time: '12:00 PM',
      label: 'Solar High Noon',
      temp: 33,
      shadeAdvice: 'Vertical overhead rays! Tree canopies cast narrow shadows. Use solid roofs.',
      comfortStatus: 'danger',
      sunAngle: 'Direct Overhead (85°)',
      icon: <Sun className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '14s' }} />,
    },
    {
      time: '03:00 PM',
      label: 'Peak Afternoon Heat',
      temp: 36,
      shadeAdvice: 'Deep west shadows. Head to East-facing Library Cloisters or Misting Pergola.',
      comfortStatus: 'danger',
      sunAngle: 'Angle West (55°)',
      icon: <Sun className="w-4 h-4 text-orange-500" />,
    },
    {
      time: '06:00 PM',
      label: 'Golden Hour Breeze',
      temp: 26,
      shadeAdvice: 'Thermal release off Lake Claire. Hammocks and lawns reach prime comfort!',
      comfortStatus: 'great',
      sunAngle: 'Horizon Sunset (15°)',
      icon: <Sunset className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-pink-100/70 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Campus Shade & Solar Shift</h3>
            <p className="text-[11px] text-slate-400">Plan your outdoor study session according to sun position & microclimate</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Live Solar Tracking
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {points.map((pt, idx) => (
          <div 
            key={idx} 
            className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-50/80 to-purple-50/20 border border-slate-100 hover:border-pink-200 transition-all hover:shadow-xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {pt.icon}
                {pt.time}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                pt.comfortStatus === 'great' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {pt.temp}°C
              </span>
            </div>

            <div className="text-xs font-semibold text-slate-700 mb-1">{pt.label}</div>
            <div className="text-[10px] font-medium text-purple-600 mb-1.5">☀️ {pt.sunAngle}</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">{pt.shadeAdvice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

