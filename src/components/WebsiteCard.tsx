import React, { useRef, useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebsiteCardProps {
  url: string;
  onRemove: () => void;
}

const WebsiteCard = ({ url, onRemove }: WebsiteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPreviewLoaded(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observerRef.current.observe(cardRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
    removeUnwantedDiv();
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
  };

  const removeUnwantedDiv = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentDocument) {
        const unwantedDiv = iframe.contentDocument.querySelector('.row.pt-5');
        if (unwantedDiv) {
          unwantedDiv.remove();
        }
      }
    } catch (error) {
      console.error('Unable to remove div from iframe content:', error);
    }
  };

  const getPreviewImage = () => {
    return `https://api.screenshotmachine.com?key=150102&url=${encodeURIComponent(url)}&dimension=1024x768&delay=2000&cacheLimit=14&fresh=true`;
  };

  const getIframeUrl = (url: string) => {
    if (url.includes('themeforest.net') && url.includes('preview')) {
      return url.replace('preview.themeforest.net', 'themeforest.net');
    }
    return url;
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        isExpanded
          ? "fixed inset-0 z-50 bg-black/95"
          : "group rounded-xl bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      )}
    >
      {isExpanded ? (
        <div className="h-full flex flex-col relative">
          {/* Close Button only in Expanded State */}
          <div className="absolute right-4 top-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="p-2.5 rounded-full bg-white hover:bg-gray-200 text-black transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}

          {iframeError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center p-4">
                <p className="text-white mb-2">Unable to load preview</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={getIframeUrl(url)}
              className="w-full h-full"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts" // Updated sandbox attributes
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Website preview"
            />
          )}
        </div>
      ) : (
        <div
          onClick={() => setIsExpanded(true)}
          className="cursor-pointer relative aspect-video overflow-hidden rounded-xl"
        >
          {previewLoaded ? (
            <img
              src={getPreviewImage()}
              alt="Website preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-black/20 animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteCard;