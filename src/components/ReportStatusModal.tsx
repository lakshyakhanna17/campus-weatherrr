import React, { useState } from 'react';
import { X, Megaphone, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OutdoorSpace, LiveReport } from '../types';

interface ReportStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaces: OutdoorSpace[];
  initialSpaceId?: string;
  onSubmitReport: (report: Omit<LiveReport, 'id' | 'timestamp' | 'likes'>) => void;
}

export const ReportStatusModal: React.FC<ReportStatusModalProps> = ({
  isOpen,
  onClose,
  spaces,
  initialSpaceId,
  onSubmitReport,
}) => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(
    initialSpaceId || spaces[0]?.id || ''
  );
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('🌸');
  const [crowd, setCrowd] = useState<'Peaceful & Quiet' | 'Moderate Vibe' | 'Bustling & Social'>('Moderate Vibe');
  const [comfortRating, setComfortRating] = useState<'Heavenly 🪽' | 'Pretty Good ✨' | 'Getting Warm ☀️' | 'Too Hot 🥵' | 'Rainy / Damp 🌧️'>('Pretty Good ✨');
  const [shadeCondition, setShadeCondition] = useState<'Total Shade ☂️' | 'Flickering Sunlight ⛅' | 'Direct Sun 🔥' | 'Dry Under Roof 🏠'>('Total Shade ☂️');
  const [comment, setComment] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const space = spaces.find((s) => s.id === selectedSpaceId);
    if (!space) return;

    onSubmitReport({
      spaceId: space.id,
      spaceName: space.name,
      userName: userName.trim() || 'Anonymous Student 🎓',
      userAvatar,
      crowd,
      comfortRating,
      shadeCondition,
      comment: comment.trim() || 'Checked in! Spot feels great right now.',
    });

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#34D399', '#60A5FA', '#F472B6'],
    });

    onClose();
  };

  const avatars = ['🌸', '🦊', '🌿', '🧋', '🥑', '☕', '🐱', '✨'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-cute border border-pink-100 p-6 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Post Live Comfort Update</h3>
              <p className="text-[11px] text-slate-400">Help peers know if your spot has shade & seats!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5">
          {/* Target Space */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Campus Outdoor Space
            </label>
            <select
              value={selectedSpaceId}
              onChange={(e) => setSelectedSpaceId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:border-pink-300 outline-hidden"
            >
              {spaces.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.zone})
                </option>
              ))}
            </select>
          </div>

          {/* Student Tag & Avatar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Name / Major (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Maya (BioE '26)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:border-pink-300 outline-hidden"
              />
              {/* Avatar Selector */}
              <select
                value={userAvatar}
                onChange={(e) => setUserAvatar(e.target.value)}
                className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                {avatars.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comfort Feel */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              How does the temperature feel right now?
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {(['Heavenly 🪽', 'Pretty Good ✨', 'Too Hot 🥵', 'Rainy / Damp 🌧️'] as const).map((rating) => (
                <button
                  type="button"
                  key={rating}
                  onClick={() => setComfortRating(rating)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                    comfortRating === rating
                      ? 'bg-purple-100 border-purple-300 text-purple-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Shade Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current Shade / Sun Status
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {(['Total Shade ☂️', 'Flickering Sunlight ⛅', 'Direct Sun 🔥', 'Dry Under Roof 🏠'] as const).map((sh) => (
                <button
                  type="button"
                  key={sh}
                  onClick={() => setShadeCondition(sh)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                    shadeCondition === sh
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>
          </div>

          {/* Crowd Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Crowd Status
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {(['Peaceful & Quiet', 'Moderate Vibe', 'Bustling & Social'] as const).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCrowd(c)}
                  className={`py-1.5 px-2 rounded-xl border text-center transition-all ${
                    crowd === c
                      ? 'bg-pink-100 border-pink-300 text-pink-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {c.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Quick Live Note
            </label>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Misting fans active, open tables on the east side..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:border-pink-300 outline-hidden resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-soft flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Live Report 🚀</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

