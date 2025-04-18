interface LeaderboardEntry {
  username: string;
  points: number;
  rank?: number;
  avatarUrl?: string;
  completedMissions?: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
}

export default function Leaderboard({ entries, title = "Party Champions 🏆" }: LeaderboardProps) {
  // Sort entries by points (descending) and add rank
  const rankedEntries = entries
    .sort((a, b) => b.points - a.points)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

  // Helper function to get medal or rank display
  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-4xl animate-bounce">👑</span>;
      case 2:
        return <span className="text-3xl">🥈</span>;
      case 3:
        return <span className="text-3xl">🥉</span>;
      default:
        return <span className="text-gray-600 font-bold">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-purple-100 dark:border-purple-900">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-4 px-6">
        <h2 className="text-white font-bold text-2xl text-center">{title}</h2>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {rankedEntries.map((entry) => (
          <li 
            key={entry.username} 
            className={`flex items-center p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all
              ${entry.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' : ''}
              ${entry.rank === 2 ? 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20' : ''}
              ${entry.rank === 3 ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20' : ''}
            `}
          >
            <div className="w-12 text-center font-medium">
              {getRankDisplay(entry.rank || 0)}
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                {entry.avatarUrl ? (
                  <img 
                    src={entry.avatarUrl} 
                    alt={`${entry.username}'s avatar`}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-purple-200 dark:border-purple-800" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full mr-3 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                    {entry.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">{entry.username}</span>
                  {entry.completedMissions && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      {entry.completedMissions} missions completed ✨
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-lg">
              {entry.points} pts
            </div>
          </li>
        ))}
      </ul>
      
      {entries.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-4xl mb-2">🎮</div>
          <p className="text-gray-500 dark:text-gray-400">
            No champions yet! Be the first to complete missions and climb the ranks! 🚀
          </p>
        </div>
      )}
    </div>
  );
}
