import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebsiteCardProps {
  url: string;
  onRemove: () => void;
}

const WebsiteCard = ({ url, onRemove }: WebsiteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden",
        isExpanded ? "col-span-full h-[80vh]" : "h-48 cursor-pointer"
      )}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <div className="h-full flex flex-col">
          <div className="p-4 flex justify-between items-center border-b">
            <p className="text-sm text-gray-600 truncate">{url}</p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="p-2 hover:bg-red-100 text-red-600 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <iframe 
              src={url} 
              className="w-full h-full border-0"
              title={`Embedded view of ${url}`}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      ) : (
        <div className="p-4 h-full flex flex-col">
          <div className="flex-1">
            <p className="text-sm text-gray-600 truncate">{url}</p>
          </div>
          <div className="text-xs text-gray-400">Click to expand</div>
        </div>
      )}
    </div>
  );
};

export default WebsiteCard;