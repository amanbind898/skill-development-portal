import React, { useMemo } from 'react';
import { AlertCircle, TrendingUp, Award, Calendar, Globe2, Flag, Code, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const StatItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between p-2 sm:p-3" role="group" aria-label={`${label} stat`}>
    <div className="flex items-center gap-2">
      <div className="p-1.5 sm:p-2 rounded-lg bg-black/20 border border-white/10">
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
      </div>
      <span className="text-xs sm:text-sm font-medium text-white/70">{label}</span>
    </div>
    <span className="text-xs sm:text-sm font-bold text-white">{value || "N/A"}</span>
  </div>
);

const ProblemDistribution = ({ categories, stats, totalSolved }) => (
  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
    <h3 className="text-xs sm:text-sm font-medium text-white/70 mb-2 sm:mb-3">Problems</h3>
    <div className="space-y-2 sm:space-y-3">
      {Object.entries(categories).map(([level, { color }]) => {
        const count = level === "Fundamental" 
          ? parseInt(stats.fundamentalCount || 0)
          : parseInt(stats[`${level.toLowerCase()}Count`] || 0);
        const percentage = totalSolved > 0 ? (count / totalSolved) * 100 : 0;
        
        return (
          <div key={level} className="flex items-center gap-2" role="group" aria-label={`${level} problems`}>
            <span className="text-[10px] sm:text-xs text-white/60 w-16 sm:w-20">{level}</span>
            <div className="flex-1 h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-white min-w-[3rem] text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 border border-white/10">
    <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
    <div className="p-3 sm:p-4 bg-black/20">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
    </div>
  </div>
);

const PlatformCard = ({ platform, stats, isLoading }) => {
  if (isLoading) return <SkeletonCard />;
  if (!stats) return null;

  const platformConfig = useMemo(() => ({
    LeetCode: {
      logo: "/images/leetcode.png",
      bgGradient: "from-yellow-900 to-yellow-700",
      categories: {
        Easy: { color: "bg-emerald-500" },
        Medium: { color: "bg-amber-500" },
        Hard: { color: "bg-rose-500" }
      },
      rankLabel: "Global Rank"
    },
    Codeforces: {
      logo: "/images/codeforces.jpg",
      bgGradient: "from-blue-900 to-blue-700",
      totalOnly: true,
      rankLabel: "Rank"
    },
    CodeChef: {
      logo: "/images/codechef.jpg",
      bgGradient: "from-purple-900 to-purple-700",
      totalOnly: true,
      rankLabel: "Rank"
    },
    GeeksforGeeks: {
      logo: "/images/gfg.png",
      bgGradient: "from-green-900 to-green-700",
      categories: {
        Easy: { color: "bg-emerald-500" },
        Medium: { color: "bg-amber-500" },
        Hard: { color: "bg-rose-500" },
        Fundamental: { color: "bg-blue-500" }
      },
      rankLabel: "Coding Score"
    }
  }), []);

  const details = platformConfig[platform] || {
    bgGradient: "from-gray-900 to-gray-700",
    rankLabel: "Rank"
  };
  
  const { logo, bgGradient, categories, totalOnly, rankLabel } = details;

  const totalSolved = useMemo(() => {
    if (totalOnly) return parseInt(stats.solvedCount) || 0;
    
    if (platform === "GeeksforGeeks") {
      return parseInt(stats.easyCount || 0) + 
             parseInt(stats.mediumCount || 0) + 
             parseInt(stats.hardCount || 0) +
             parseInt(stats.fundamentalCount || 0);
    }
    return parseInt(stats.easyCount || 0) + 
           parseInt(stats.mediumCount || 0) + 
           parseInt(stats.hardCount || 0);
  }, [stats, totalOnly, platform]);

  return (
    <div 
      className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/20"
      role="article"
      aria-label={`${platform} statistics`}
    >
      <div className={`p-3 sm:p-4 bg-gradient-to-br ${bgGradient}`}>
        <div className="flex items-center gap-3">
          <div className="p-1.5 sm:p-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
            <img 
              src={logo} 
              alt={`${platform} Logo`} 
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-white">{platform}</h2>
            <p className="text-[10px] sm:text-xs text-white/60">{stats.lastUpdated}</p>
          </div>
          {stats.rating && (
            <div className="text-right">
              <div className="text-[10px] sm:text-xs text-white/60">Rating</div>
              <div className="text-sm sm:text-base font-bold text-white">{stats.rating}</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 bg-black/20">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <StatItem label="Problems" value={totalSolved} icon={Code} />
          <StatItem label="Contests" value={stats.totalcontest} icon={Award} />
          <StatItem label="Best" value={stats.highestRating} icon={TrendingUp} />
          <StatItem label={rankLabel} value={stats.globalRank} icon={Globe2} />
        </div>

        {!totalOnly && categories && (
          <ProblemDistribution 
            categories={categories} 
            stats={stats} 
            totalSolved={totalSolved} 
          />
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ message, isLoading }) => {
  if (isLoading) return <SkeletonCard />;
  
  return (
    <div className="w-full rounded-xl sm:rounded-2xl bg-gray-900 border border-white/10 p-4 sm:p-8">
      <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
        <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-white/40" />
        <div className="space-y-1 sm:space-y-2">
          <h3 className="font-semibold text-base sm:text-lg text-white">No Data Available</h3>
          <p className="text-xs sm:text-sm text-white/60">{message}</p>
        </div>
      </div>
    </div>
  );
};

const PlatformCards = ({ stats, isLoading }) => {
  const platforms = useMemo(() => [
    { id: "leetcode", name: "LeetCode" },
    { id: "geeksforgeeks", name: "GeeksforGeeks" },
    { id: "codeforces", name: "Codeforces" },
    { id: "codechef", name: "CodeChef" }
  ], []);

  const availableStats = useMemo(() => {
    const statsArray = Array.isArray(stats) ? stats : stats ? [stats] : [];
    return statsArray.filter(stat => platforms.map(p => p.name).includes(stat.platform));
  }, [stats, platforms]);

  if (!stats && !isLoading) {
    return <EmptyState message="Connect your coding platforms to see your stats" />;
  }

  if (availableStats.length === 0 && !isLoading) {
    return <EmptyState message="No platform data found" />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-2xl font-bold text-black">Coding Platforms</h2>
        <p className="text-xs sm:text-sm text-black/60">
          {availableStats.length} of {platforms.length} platforms connected
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {platforms.map(({ id, name }) => (
          <PlatformCard
            key={id}
            platform={name}
            stats={availableStats.find(stat => stat.platform === name)}
            isLoading={isLoading}
          />
        ))}
      </div>

      {!isLoading && availableStats.length > 0 && availableStats.length < platforms.length && (
        <Alert className="bg-white/5 border-white/10 text-white">
          <AlertDescription className="text-xs sm:text-sm">
            💡 Connect more coding platforms to track all your progress
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PlatformCards;