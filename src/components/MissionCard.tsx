interface MissionCardProps {
  description: string;
  status: 'pending' | 'completed' | 'failed';
  points: number;
  dueDate?: string;
  onClick?: () => void;
  category?: string;
}

export default function MissionCard({ 
  description, 
  status, 
  points, 
  dueDate,
  onClick,
  category = 'fun'
}: MissionCardProps) {
  const statusColors = {
    pending: 'bg-gradient-to-r from-yellow-400 to-orange-400',
    completed: 'bg-gradient-to-r from-green-400 to-emerald-400',
    failed: 'bg-gradient-to-r from-red-400 to-pink-400'
  };

  const statusIcons = {
    pending: '🎯',
    completed: '🎉',
    failed: '😅'
  };

  const statusLabels = {
    pending: 'In Progress',
    completed: 'Completed!',
    failed: 'Failed'
  };

  const categoryEmojis: { [key: string]: string } = {
    fun: '🎮',
    social: '👥',
    creative: '🎨',
    dance: '💃',
    photo: '📸',
    challenge: '🏆'
  };

  return (
    <div 
      className={`rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all transform hover:-translate-y-1 cursor-pointer bg-white dark:bg-gray-800`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{categoryEmojis[category] || '🎯'}</span>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{description}</h3>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
          {points} pts
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]} text-white shadow-sm`}>
          <span className="mr-2">{statusIcons[status]}</span>
          {statusLabels[status]}
        </span>
        
        {dueDate && (
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <span className="mr-1">⏰</span>
            {dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
