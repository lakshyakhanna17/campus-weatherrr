import React from 'react';
import { X, Heart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { OutdoorSpace, WeatherCondition } from '../types';
import { calculateSpaceComfort } from '../utils/comfortEngine';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  spaces: OutdoorSpace[];
  weather: WeatherCondition;
  onSelectSpace: (space: OutdoorSpace) => void;
  onRemoveFavorite: (id: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  spaces,
  weather,
  onSelectSpace,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  const favoriteSpaces = spaces.filter((s) => favorites.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white h-full shadow-cute flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">My Saved Nooks</h3>
              <p className="text-[11px] text-slate-400">
                {favoriteSpaces.length} {favoriteSpaces.length === 1 ? 'space' : 'spaces'} bookmarked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {favoriteSpaces.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <span className="text-4xl mb-3">🌸</span>
              <p className="text-xs font-bold text-slate-700">No favorite nooks saved yet</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                Click the heart icon on any campus spot to monitor its live shade & comfort score here!
              </p>
            </div>
          ) : (
            favoriteSpaces.map((space) => {
              const comfort = calculateSpaceComfort(space, weather);
              return (
                <div
                  key={space.id}
                  onClick={() => {
                    onClose();
                    onSelectSpace(space);
                  }}
                  className="p-3.5 rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50/40 to-purple-50/40 hover:shadow-soft transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${comfort.badgeColor}`}>
                        {comfort.matchScore}% Match • {comfort.badgeLabel}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {space.name}
                      </h4>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {space.shadePct}% Shade • Feels ~{comfort.perceivedTemp}°C
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(space.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-white transition-all"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Tip */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
          <span>Scores automatically adapt whenever weather switches!</span>
        </div>

      </div>
    </div>
  );
};

