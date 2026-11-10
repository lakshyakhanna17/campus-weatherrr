import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, CheckCircle, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OutdoorSpace, WeatherCondition } from '../types';
import { calculateSpaceComfort } from '../utils/comfortEngine';

interface SpotQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaces: OutdoorSpace[];
  weather: WeatherCondition;
  onSelectSpace: (space: OutdoorSpace) => void;
}

export const SpotQuizModal: React.FC<SpotQuizModalProps> = ({
  isOpen,
  onClose,
  spaces,
  weather,
  onSelectSpace,
}) => {
  const [step, setStep] = useState<number>(1);
  const [activity, setActivity] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [matchedSpaces, setMatchedSpaces] = useState<OutdoorSpace[]>([]);

  if (!isOpen) return null;

  const handleFinishQuiz = (selectedPriority: string) => {
    setPriority(selectedPriority);

    // Calculate smart match based on answers + current weather
    const scored = spaces.map((sp) => {
      let quizBonus = 0;
      if (activity === 'laptop' && sp.powerPlugCount > 0) quizBonus += 25;
      if (activity === 'laptop' && sp.amenities.includes('study_desks')) quizBonus += 20;
      if (activity === 'nap' && sp.amenities.includes('hammock_posts')) quizBonus += 35;
      if (activity === 'reading' && sp.currentCrowd.includes('Peaceful')) quizBonus += 25;
      if (activity === 'social' && sp.currentCrowd.includes('Social')) quizBonus += 25;

      if (selectedPriority === 'heat' && sp.shadePct >= 90) quizBonus += 30;
      if (selectedPriority === 'heat' && sp.mistingActive) quizBonus += 25;
      if (selectedPriority === 'rain' && sp.rainProtection === '100% Waterproof') quizBonus += 40;
      if (selectedPriority === 'power' && sp.powerPlugCount > 10) quizBonus += 35;
      if (selectedPriority === 'breeze' && sp.zone.includes('Lake')) quizBonus += 30;

      const comfort = calculateSpaceComfort(sp, weather);
      return { space: sp, totalScore: comfort.matchScore + quizBonus };
    });

    scored.sort((a, b) => b.totalScore - a.totalScore);
    const top2 = scored.slice(0, 2).map((s) => s.space);
    setMatchedSpaces(top2);
    setStep(3);

    // Trigger cute confetti
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#C084FC', '#60A5FA', '#34D399'],
    });
  };

  const resetQuiz = () => {
    setStep(1);
    setActivity('');
    setPriority('');
    setMatchedSpaces([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-cute border border-pink-100 p-6 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-wiggle" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Find My Comfort Nook</h3>
              <p className="text-[11px] text-slate-400">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="py-4">
          {step === 1 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-700 mb-2">
                What are you looking to do right now? 🎒
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: 'laptop', label: '💻 Serious Laptop Work & Coding', desc: 'Need desk, shade from screen glare, and outlets' },
                  { id: 'reading', label: '📖 Quiet Reading & Journaling', desc: 'Need tranquil silence, soft seating, and shade' },
                  { id: 'nap', label: '😴 Quick Power Nap or Relax', desc: 'Need hammock, tree canopy breeze, gentle vibes' },
                  { id: 'social', label: '🧋 Chatting & Lunch with Friends', desc: 'Food nearby, group table, lively energy' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivity(item.id);
                      setStep(2);
                    }}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 text-left transition-all hover:scale-[1.01] active:scale-98 flex flex-col"
                  >
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-700 mb-2">
                What weather element are you dodging? 🌦️
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: 'heat', label: '🔥 Extreme Heat & Glare', desc: 'Must have 90%+ shade, misting cooling, or stone cloisters' },
                  { id: 'rain', label: '☔ Rain & Downpours', desc: 'Must have 100% waterproof solid roof canopy' },
                  { id: 'power', label: '⚡ Low Battery Emergencies', desc: 'Prioritize charging stations and ultra-fast WiFi' },
                  { id: 'breeze', label: '🍃 Stuffy Air', desc: 'Need natural water breeze and open fresh air' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleFinishQuiz(item.id)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all hover:scale-[1.01] active:scale-98 flex flex-col"
                  >
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <span className="text-3xl animate-bounce inline-block">🎉</span>
                <h4 className="text-base font-bold text-slate-800 mt-1">
                  We found your best comfort match!
                </h4>
                <p className="text-xs text-slate-500">
                  Calculated against current campus conditions ({weather.name})
                </p>
              </div>

              <div className="space-y-3">
                {matchedSpaces.map((sp, idx) => {
                  const comf = calculateSpaceComfort(sp, weather);
                  return (
                    <div
                      key={sp.id}
                      onClick={() => {
                        onClose();
                        onSelectSpace(sp);
                      }}
                      className="p-3.5 rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50/60 to-purple-50/60 flex items-center justify-between gap-3 cursor-pointer hover:shadow-soft transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={sp.image}
                          alt={sp.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-purple-700 shadow-xs border border-purple-100">
                            #{idx + 1} Best Match ({comf.matchScore}%)
                          </span>
                          <h5 className="text-xs font-bold text-slate-800 mt-0.5">{sp.name}</h5>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{sp.tagline}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-600 shrink-0" />
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800"
                >
                  Close & Explore
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
