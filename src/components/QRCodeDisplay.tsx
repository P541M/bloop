import Image from 'next/image';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  title: string;
  description?: string;
  size?: number;
  type?: 'mission' | 'party' | 'verification';
}

export default function QRCodeDisplay({ 
  qrCodeUrl, 
  title, 
  description, 
  size = 200,
  type = 'mission'
}: QRCodeDisplayProps) {
  const typeConfig = {
    mission: {
      icon: '🎯',
      gradient: 'from-purple-500 to-pink-500',
      text: 'Scan to complete mission'
    },
    party: {
      icon: '🎉',
      gradient: 'from-blue-500 to-violet-500',
      text: 'Scan to join the party'
    },
    verification: {
      icon: '✅',
      gradient: 'from-green-500 to-emerald-500',
      text: 'Scan to verify completion'
    }
  };

  const config = typeConfig[type];

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-purple-100 dark:border-purple-900 relative mb-4 transform hover:scale-105 transition-all">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r opacity-10 animate-gradient-x rounded-2xl"></div>
        
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>
        
        {/* QR Code */}
        {qrCodeUrl ? (
          <div className="p-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"></div>
            <Image 
              src={qrCodeUrl} 
              alt={`QR code for ${title}`} 
              width={size} 
              height={size}
              className="mx-auto relative z-10"
            />
          </div>
        ) : (
          <div 
            style={{ width: size, height: size }} 
            className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500"
          >
            <span className="text-4xl">{config.icon}</span>
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">{title}</h3>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 max-w-xs">{description}</p>
        )}
        
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm">
          <span className="text-2xl">{config.icon}</span>
          <span className="text-gray-500 dark:text-gray-400">{config.text}</span>
        </div>
      </div>
    </div>
  );
}
