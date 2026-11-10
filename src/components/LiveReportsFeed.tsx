import React from 'react';
import { Megaphone, ThumbsUp, Sparkles, MessageSquare } from 'lucide-react';
import { LiveReport } from '../types';

interface LiveReportsFeedProps {
  reports: LiveReport[];
  onLikeReport: (id: string) => void;
  onOpenReportModal: () => void;
}

export const LiveReportsFeed: React.FC<LiveReportsFeedProps> = ({
  reports,
  onLikeReport,
  onOpenReportModal,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-pink-100/70 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              Live Student Comfort Feed
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-slate-400">Crowdsourced shade, misting, and outlet updates from fellow students</p>
          </div>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-xs transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Post Update</span>
        </button>
      </div>

      {/* Feed list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {reports.slice(0, 4).map((report) => (
          <div
            key={report.id}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-50/90 to-emerald-50/20 border border-slate-100 hover:border-emerald-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-sm border border-slate-100">
                    {report.userAvatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {report.userName}
                    </div>
                    <div className="text-[10px] text-slate-400">{report.timestamp}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100/70 text-purple-700">
                  {report.comfortRating}
                </span>
              </div>

              <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                📍 {report.spaceName}
              </div>

              <div className="text-[10px] font-semibold text-emerald-700 mb-1.5 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                {report.shadeCondition} • {report.crowd}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                "{report.comment}"
              </p>
            </div>

            <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Verified Student</span>
              <button
                onClick={() => onLikeReport(report.id)}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-pink-600 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{report.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
