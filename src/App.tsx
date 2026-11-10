import React, { useState, useEffect, useMemo } from 'react';
import { 
  WeatherConditionType, 
  OutdoorSpace, 
  LiveReport 
} from './types';
import { WEATHER_PRESETS, CAMPUS_SPACES, INITIAL_LIVE_REPORTS } from './data/mockData';
import { calculateSpaceComfort } from './utils/comfortEngine';

// Components
import { Navbar } from './components/Navbar';
import { WeatherHero } from './components/WeatherHero';
import { HourlyTimeline } from './components/HourlyTimeline';
import { SpaceFilters, FilterCategory, SortOption } from './components/SpaceFilters';
import { SpaceCard } from './components/SpaceCard';
import { SpaceDetailModal } from './components/SpaceDetailModal';
import { InteractiveCampusMap } from './components/InteractiveCampusMap';
import { SpotQuizModal } from './components/SpotQuizModal';
import { ReportStatusModal } from './components/ReportStatusModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { LiveReportsFeed } from './components/LiveReportsFeed';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Current weather scenario (Defaults to Extreme Heat to address topic directly)
  const [currentWeatherKey, setCurrentWeatherKey] = useState<WeatherConditionType>('extreme_heat');
  const weather = WEATHER_PRESETS[currentWeatherKey];

  // Spaces & Reports
  const [spaces, setSpaces] = useState<OutdoorSpace[]>(CAMPUS_SPACES);
  const [reports, setReports] = useState<LiveReport[]>(() => {
    const saved = localStorage.getItem('campus_breeze_reports');
    return saved ? JSON.parse(saved) : INITIAL_LIVE_REPORTS;
  });

  // Saved Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('campus_breeze_favorites');
    return saved ? JSON.parse(saved) : ['space-library-portico', 'space-engineering-pergola'];
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('campus_breeze_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save reports to localStorage
  useEffect(() => {
    localStorage.setItem('campus_breeze_reports', JSON.stringify(reports));
  }, [reports]);

  // Filters & Views
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('comfort_match');
  const [activeView, setActiveView] = useState<'grid' | 'map'>('grid');

  // Modals & Drawers
  const [selectedSpace, setSelectedSpace] = useState<OutdoorSpace | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportTargetSpaceId, setReportTargetSpaceId] = useState<string | undefined>(undefined);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);

  // Available unique zones
  const zones = useMemo(() => {
    return Array.from(new Set(CAMPUS_SPACES.map((s) => s.zone)));
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedSpaces = useMemo(() => {
    return spaces
      .filter((space) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = space.name.toLowerCase().includes(q);
          const matchesZone = space.zone.toLowerCase().includes(q);
          const matchesTagline = space.tagline.toLowerCase().includes(q);
          const matchesAmenity = space.amenities.some((a) => a.toLowerCase().includes(q));
          const matchesBestFor = space.bestFor.some((b) => b.toLowerCase().includes(q));
          if (!matchesName && !matchesZone && !matchesTagline && !matchesAmenity && !matchesBestFor) {
            return false;
          }
        }

        // Zone Filter
        if (selectedZone !== 'all' && space.zone !== selectedZone) {
          return false;
        }

        // Category Filter
        if (selectedCategory === 'heat_haven') {
          return space.shadePct >= 85 || space.mistingActive || space.tempDelta <= -4;
        }
        if (selectedCategory === 'dry_roof') {
          return space.rainProtection === '100% Waterproof';
        }
        if (selectedCategory === 'power_wifi') {
          return space.powerPlugCount >= 4 && space.amenities.includes('wifi');
        }
        if (selectedCategory === 'nature_breeze') {
          return space.zone.includes('Lake') || space.amenities.includes('hammock_posts');
        }
        if (selectedCategory === 'quiet_focus') {
          return space.currentCrowd.includes('Peaceful');
        }
        if (selectedCategory === 'social_cafe') {
          return space.amenities.includes('cafe_nearby') || space.currentCrowd.includes('Social');
        }

        return true;
      })
      .sort((a, b) => {
        const comfortA = calculateSpaceComfort(a, weather);
        const comfortB = calculateSpaceComfort(b, weather);

        switch (sortOption) {
          case 'comfort_match':
            return comfortB.matchScore - comfortA.matchScore;
          case 'coolest_temp':
            return comfortA.perceivedTemp - comfortB.perceivedTemp;
          case 'highest_shade':
            return b.shadePct - a.shadePct;
          case 'highest_rating':
            return b.rating - a.rating;
          case 'least_crowded':
            return a.crowdPct - b.crowdPct;
          default:
            return 0;
        }
      });
  }, [spaces, searchQuery, selectedCategory, selectedZone, sortOption, weather]);

  // Handlers
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddReport = (newReportData: Omit<LiveReport, 'id' | 'timestamp' | 'likes'>) => {
    const newReport: LiveReport = {
      ...newReportData,
      id: `rep-${Date.now()}`,
      timestamp: 'Just now',
      likes: 1,
    };
    setReports((prev) => [newReport, ...prev]);

    // Also update space crowd if reported
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === newReport.spaceId) {
          return {
            ...s,
            currentCrowd: newReport.crowd,
          };
        }
        return s;
      })
    );
  };

  const handleLikeReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const openReportModalWithSpace = (spaceId?: string) => {
    setReportTargetSpaceId(spaceId);
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF9F5] text-slate-800">
      {/* Navigation Bar */}
      <Navbar
        currentWeatherKey={currentWeatherKey}
        onWeatherChange={(key) => setCurrentWeatherKey(key)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenReportModal={() => openReportModalWithSpace()}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        
        {/* Live Campus Weather Hero & Comfort Index */}
        <section aria-label="Campus Weather & Comfort Advisory">
          <WeatherHero
            weather={weather}
            onFilterHeatHavens={() => setSelectedCategory('heat_haven')}
            onFilterRainHavens={() => setSelectedCategory('dry_roof')}
          />
        </section>

        {/* Hourly Solar Shade Shift & Solar Tracking Timeline */}
        <section aria-label="Hourly Solar Shift & Shade Timeline">
          <HourlyTimeline />
        </section>

        {/* Interactive Filter Bar */}
        <section aria-label="Campus Space Search and Filters">
          <SpaceFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
            zones={zones}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalCount={filteredAndSortedSpaces.length}
          />
        </section>

        {/* View Switcher: Interactive Map vs Grid */}
        <section aria-label="Campus Spaces Explorer">
          {activeView === 'map' ? (
            <div className="space-y-6">
              <InteractiveCampusMap
                spaces={filteredAndSortedSpaces}
                weather={weather}
                selectedSpaceId={selectedSpace?.id || null}
                onSelectSpace={(space) => setSelectedSpace(space)}
              />
              {/* Also render cards below map for accessibility */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3">All Matching Spaces</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredAndSortedSpaces.map((space) => (
                    <SpaceCard
                      key={space.id}
                      space={space}
                      weather={weather}
                      isFavorite={favorites.includes(space.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelectSpace={(s) => setSelectedSpace(s)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {filteredAndSortedSpaces.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-soft max-w-md mx-auto">
                  <span className="text-4xl block mb-3">🔍🌸</span>
                  <h3 className="text-base font-bold text-slate-800">No matching spaces found</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    Try clearing your search query or selecting "All Campus Nooks".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedZone('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredAndSortedSpaces.map((space) => (
                    <SpaceCard
                      key={space.id}
                      space={space}
                      weather={weather}
                      isFavorite={favorites.includes(space.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelectSpace={(s) => setSelectedSpace(s)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Live Student Comfort Feed */}
        <section aria-label="Student Live Reports Feed">
          <LiveReportsFeed
            reports={reports}
            onLikeReport={handleLikeReport}
            onOpenReportModal={() => openReportModalWithSpace()}
          />
        </section>

      </main>

      {/* Modals & Drawers */}
      <SpaceDetailModal
        space={selectedSpace}
        weather={weather}
        isFavorite={selectedSpace ? favorites.includes(selectedSpace.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedSpace(null)}
        reports={reports}
        onOpenReportModal={(spaceId) => openReportModalWithSpace(spaceId)}
      />

      <SpotQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        spaces={spaces}
        weather={weather}
        onSelectSpace={(s) => setSelectedSpace(s)}
      />

      <ReportStatusModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        spaces={spaces}
        initialSpaceId={reportTargetSpaceId}
        onSubmitReport={handleAddReport}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favorites}
        spaces={spaces}
        weather={weather}
        onSelectSpace={(s) => setSelectedSpace(s)}
        onRemoveFavorite={toggleFavorite}
      />

      {/* Cute Footer */}
      <Footer />
    </div>
  );
};

export default App;
