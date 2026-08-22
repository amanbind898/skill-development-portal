import React, { useState } from "react";
import { Trophy, Circle, AlertTriangle, Target, Info } from "lucide-react";

const StatItem = ({ icon: Icon, label, value, color, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="group relative p-4 sm:p-6 bg-black/30 backdrop-blur-lg rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300">
      <div className="absolute -top-3 -right-3 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/40 rounded-lg border border-white/10">
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
      </div>
      <div className="space-y-1 sm:space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {value.toLocaleString()}
          </p>
          {tooltip && (
            <div className="relative">
              <Info 
                className="w-3 h-3 sm:w-4 sm:h-4 text-white/60 cursor-help hover:text-white/90 transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute -top-2 left-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs rounded-lg whitespace-nowrap z-10 shadow-xl">
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
};

const DsaStatsCard = ({ stats }) => {
  const statsArray = Array.isArray(stats) ? stats : [];

  const totalStats = statsArray.reduce(
    (acc, platform) => {
      acc.totalSolved += parseInt(platform.solvedCount || 0, 10);
      acc.easyCount += parseInt(platform.easyCount || 0, 10);
      acc.mediumCount += parseInt(platform.mediumCount || 0, 10);
      acc.hardCount += parseInt(platform.hardCount || 0, 10);
      acc.fundamentalCount = parseInt(
        statsArray.find(s => s.platform === 'GeeksforGeeks')?.fundamentalCount || 0,
        10
      );
      acc.totalDSASolved = parseInt(
        statsArray.find(s => s.platform === 'LeetCode')?.solvedCount || 0,
        10
      ) + parseInt(
        statsArray.find(s => s.platform === 'GeeksforGeeks')?.solvedCount || 0,
        10
      );
      return acc;
    },
    { totalSolved: 0, easyCount: 0, mediumCount: 0, hardCount: 0, fundamentalCount: 0, totalDSASolved: 0 }
  );

  return (
    <div className="w-full max-w-3xl p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 border border-white/10 shadow-2xl">
      <div className="flex justify-between items-start mb-6 sm:mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-fuchsia-200">
            DSA Matrix
          </h1>
          <p className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">LeetCode + GeeksforGeeks</p>
        </div>
        <div className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/5 border border-white/10">
          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-300" />
        </div>
      </div>

      <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-wider">Total Problems Solved</span>
          <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-fuchsia-200">
            {totalStats.totalDSASolved.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-4">
        <StatItem
          icon={Circle}
          label="Easy"
          value={totalStats.easyCount}
          color="text-emerald-400"
        />
        <StatItem
          icon={AlertTriangle}
          label="Medium"
          value={totalStats.mediumCount}
          color="text-amber-400"
        />
        <StatItem
          icon={Target}
          label="Hard"
          value={totalStats.hardCount}
          color="text-rose-400"
        />
        <StatItem
          icon={Info}
          label="Fundamentals"
          value={totalStats.fundamentalCount}
          color="text-violet-400"
          tooltip="GFG Fundamental Problems"
        />
      </div>
    </div>
  );
};

export default DsaStatsCard;