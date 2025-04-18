interface MissionCardProps {
  description: string;
  status: 'pending' | 'completed' | 'failed';
  points: number;
  dueDate?: string;
  onClick?: () => void;
}

export default function MissionCard({ 
  description, 
  status, 
  points, 
  dueDate,
  onClick 
}: MissionCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    failed: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusLabels = {
    pending: 'In Progress',
    completed: 'Completed',
    failed: 'Failed'
  };

  return (
    <div 
      className={`rounded-lg shadow-md p-5 border-2 ${statusColors[status]} hover:shadow-lg transition-shadow cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{description}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {points} pts
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}>
          {statusLabels[status]}
        </span>
        
        {dueDate && (
          <span className="text-sm text-gray-500">
            Due: {dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
