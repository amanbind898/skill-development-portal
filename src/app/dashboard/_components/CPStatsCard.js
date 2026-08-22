import React from "react";
import { Trophy, Code } from "lucide-react";

const StatItem = ({ icon: Icon, label, value, color }) => (
  <div className="group relative p-4 sm:p-6 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:translate-y-[-2px]">
    <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 group-hover:border-white/30">
      <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${color}`} />
    </div>
    <div className="space-y-1 sm:space-y-2">
      <p className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{value}</p>
      <p className="text-xs sm:text-sm text-white/50 tracking-wider uppercase">{label}</p>
    </div>
  </div>
);

const CPStatsCard = ({ stats }) => {
  const statsArray = Array.isArray(stats) ? stats : [];
  const cfStats = statsArray.find(s => s.platform === 'Codeforces');
  const ccStats = statsArray.find(s => s.platform === 'CodeChef');
  const totalSolved = parseInt(cfStats?.solvedCount || 0, 10) + parseInt(ccStats?.solvedCount || 0, 10);

  return (
    <div className="w-full max-w-3xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-black via-blue-950 to-indigo-950 border border-white/10 shadow-2xl">
      <div className="flex justify-between items-start mb-6 sm:mb-8">
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">CP Matrix</h1>
          <p className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">Performance Analytics</p>
        </div>
        <div className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        <StatItem
          icon={Code}
          label="CodeForces"
          value={cfStats?.solvedCount || "0"}
          color="text-blue-400"
        />
        <StatItem
          icon={Code}
          label="CodeChef"
          value={ccStats?.solvedCount || "0"}
          color="text-blue-400"
        />
        <StatItem
          icon={Trophy}
          label="Total Solved"
          value={totalSolved}
          color="text-blue-400"
        />
      </div>
    </div>
  );
};

export default CPStatsCard;