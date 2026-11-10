import React from 'react';
import { Heart, Droplet, Sun, Umbrella, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white/70 border-t border-pink-100/80 backdrop-blur-md py-10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cute Hydration & Sun Safety Tip Banner */}
        <div className="mb-8 p-4 rounded-3xl bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-100/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-xl shrink-0">
              💧
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Campus Wellness & Comfort Advisory</h4>
              <p className="text-[11px] text-slate-500">
                During temperatures above 32°C, carry a refillable water bottle and take shade breaks every 45 minutes!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 bg-white/90 px-3 py-1.5 rounded-2xl border border-purple-100 shadow-xs shrink-0">
            <span>🧴 12 Refill Stations Active</span>
          </div>
        </div>

        {/* Brand & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌤️</span>
            <span className="font-bold text-slate-800 text-sm">CampusBreeze</span>
            <span className="text-slate-300">•</span>
            <span>Maplewood University Outdoor Comfort Project</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span>Live Microclimate Sensors</span>
            <span className="text-slate-300">•</span>
            <span>Shade & Rain Tracking</span>
            <span className="text-slate-300">•</span>
            <span>Open Source Campus Initiative</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-500 mx-0.5" /> for college students
          </div>
        </div>

      </div>
    </footer>
  );
};
