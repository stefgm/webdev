import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebsiteCardProps {
  url: string;
  onRemove: () => void;
}

const WebsiteCard = ({ url, onRemove }: WebsiteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to get a preview image based on the URL
  const getPreviewImage = () => {
    // For now, using a placeholder image. In a real app, you'd want to generate 
    // previews based on the actual website or use an API
    return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
  };

  return (
    <>
      <div 
        className={cn(
          "relative transition-all duration-300 overflow-hidden",
          isExpanded 
            ? "fixed inset-0 z-50 bg-white" 
            : "h-48 cursor-pointer hover:shadow-lg"
        )}
      >
        {isExpanded ? (
          <div className="h-full flex flex-col">
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 w-full h-full">
              <iframe 
                src={url} 
                className="w-full h-full border-0"
                title="Embedded website"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        ) : (
          <div 
            className="group relative h-full w-full overflow-hidden rounded-lg"
            onClick={() => setIsExpanded(true)}
          >
            <img 
              src={getPreviewImage()} 
              alt="Website preview" 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">Click to view</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Remove website"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default WebsiteCard;