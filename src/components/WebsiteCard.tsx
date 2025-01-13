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
    // Using a screenshot service to get real website previews
    return `https://api.screenshotmachine.com?key=YOUR_API_KEY&url=${encodeURIComponent(url)}&dimension=1024x768&delay=2000`;
  };

  return (
    <>
      <div 
        className={cn(
          "relative transition-all duration-300 ease-in-out",
          isExpanded 
            ? "fixed inset-0 z-50 bg-white" 
            : "group rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
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
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors duration-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
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
            className="relative h-48 w-full overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <img 
              src={getPreviewImage()} 
              alt="Website preview" 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
              <span className="text-white text-sm font-medium">Click to expand</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Remove website"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default WebsiteCard;