import Image from 'next/image';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  title: string;
  description?: string;
  size?: number;
}

export default function QRCodeDisplay({ 
  qrCodeUrl, 
  title, 
  description, 
  size = 200 
}: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-100 relative mb-4">
        {/* Decorative corners for QR code frame */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500"></div>
        
        {/* If we have an actual QR code URL, display with next/image */}
        {qrCodeUrl ? (
          <div className="p-2">
            <Image 
              src={qrCodeUrl} 
              alt={`QR code for ${title}`} 
              width={size} 
              height={size}
              className="mx-auto"
            />
          </div>
        ) : (
          // Placeholder display when no QR code is available
          <div 
            style={{ width: size, height: size }} 
            className="bg-gray-100 flex items-center justify-center text-gray-400"
          >
            QR Code Placeholder
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-lg text-center mb-1">{title}</h3>
      
      {description && (
        <p className="text-gray-600 text-center max-w-xs">{description}</p>
      )}
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Scan to complete mission
      </div>
    </div>
  );
}
