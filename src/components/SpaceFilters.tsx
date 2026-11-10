import React from 'react';
import { Search, SlidersHorizontal, Sparkles, X, Filter } from 'lucide-react';

export type FilterCategory = 
  | 'all' 
  | 'heat_haven' 
  | 'dry_roof' 
  | 'power_wifi' 
  | 'nature_breeze' 
  | 'quiet_focus' 
  | 'social_cafe';

export type SortOption = 
  | 'comfort_match' 
  | 'coolest_temp' 
  | 'highest_shade' 
  | 'highest_rating' 
  | 'least_crowded';

interface SpaceFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  zones: string[];
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
}

export const SpaceFilters: React.FC<SpaceFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedZone,
  onZoneChange,
  zones,
  sortOption,
  onSortChange,
  totalCount,
}) => {
  const filterPills: { id: FilterCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Campus Nooks', icon: '✨' },
    { id: 'heat_haven', label: 'Heatwave Havens (90%+ Shade)', icon: '🧊' },
    { id: 'dry_roof', label: '100% Rainproof & Dry', icon: '☔' },
    { id: 'power_wifi', label: 'Outlets & Strong WiFi', icon: '⚡' },
    { id: 'nature_breeze', label: 'Lake Breeze & Hammocks', icon: '🍃' },
    { id: 'quiet_focus', label: 'Quiet Study Zones', icon: '🤫' },
    { id: 'social_cafe', label: 'Boba & Food Nearby', icon: '🧋' },
  ];

  return (
    <div className="space-y-3">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input with cute icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search nooks by name, zone, or keyword (e.g. misting, power, hammock, lake)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-slate-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 text-xs sm:text-sm text-slate-700 placeholder-slate-400 shadow-xs outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Zone & Sort Selectors */}
        <div className="flex items-center gap-2">
          {/* Zone dropdown */}
          <select
            value={selectedZone}
            onChange={(e) => onZoneChange(e.target.value)}
            aria-label="Filter by Campus Zone"
            className="px-3 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs focus:border-purple-300 outline-hidden transition-all"
          >
            <option value="all">📍 All Campus Zones</option>
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          {/* Sort dropdown */}
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort Spaces"
            className="px-3 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs focus:border-purple-300 outline-hidden transition-all"
          >
            <option value="comfort_match">🎯 Highest Comfort Match</option>
            <option value="coolest_temp">🧊 Coolest Perceived Temp</option>
            <option value="highest_shade">⛱️ Most Shaded First</option>
            <option value="highest_rating">⭐ Highest Rated</option>
            <option value="least_crowded">🟢 Least Crowded</option>
          </select>
        </div>
      </div>

      {/* Filter Chips Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterPills.map((pill) => {
          const isActive = selectedCategory === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => onCategoryChange(pill.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-soft scale-102'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
              )}
            </button>
          );
        })}

        <div className="ml-auto pl-2 text-xs text-slate-400 font-medium whitespace-nowrap">
          Showing <span className="font-bold text-slate-700">{totalCount}</span> spaces
        </div>
      </div>
    </div>
  );
};

