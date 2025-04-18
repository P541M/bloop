interface LeaderboardEntry {
  username: string;
  points: number;
  rank?: number;
  avatarUrl?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
}

export default function Leaderboard({ entries, title = "Leaderboard" }: LeaderboardProps) {
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
        return <span className="text-yellow-500 text-xl">🥇</span>;
      case 2:
        return <span className="text-gray-400 text-xl">🥈</span>;
      case 3:
        return <span className="text-amber-700 text-xl">🥉</span>;
      default:
        return <span className="text-gray-600">{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-3 px-4">
        <h2 className="text-white font-bold text-xl">{title}</h2>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {rankedEntries.map((entry) => (
          <li 
            key={entry.username} 
            className={`flex items-center p-4 hover:bg-gray-50 transition-colors
              ${entry.rank === 1 ? 'bg-yellow-50' : ''}
              ${entry.rank === 2 ? 'bg-gray-50' : ''}
              ${entry.rank === 3 ? 'bg-amber-50' : ''}
            `}
          >
            <div className="w-8 text-center font-medium">
              {getRankDisplay(entry.rank || 0)}
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                {entry.avatarUrl && (
                  <img 
                    src={entry.avatarUrl} 
                    alt={`${entry.username}'s avatar`}
                    className="w-8 h-8 rounded-full mr-3" 
                  />
                )}
                <span className="font-medium">{entry.username}</span>
              </div>
            </div>
            
            <div className="font-bold text-blue-600">
              {entry.points} pts
            </div>
          </li>
        ))}
      </ul>
      
      {entries.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No entries yet
        </div>
      )}
    </div>
  );
}
