import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import WebsiteCard from '@/components/WebsiteCard';

const Index = () => {
  const [urls, setUrls] = useState<string[]>([]);

  // This function can be called programmatically to add new URLs
  const addUrl = (newUrl: string) => {
    try {
      // Add https:// if not present
      const urlToAdd = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
      new URL(urlToAdd);
      setUrls(prev => [...prev, urlToAdd]);
      toast.success('Website added successfully');
    } catch {
      toast.error('Please enter a valid URL');
    }
  };

  // Add initial URLs when the component mounts
  useEffect(() => {
    const initialUrls = [
      'github.com',
      'google.com',
      'twitter.com'
    ];

    // Add each URL
    initialUrls.forEach(url => addUrl(url));
  }, []); // Empty dependency array means this runs once on mount

  const handleRemoveUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
    toast.success('Website removed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-tight">
          Website Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urls.map((url, index) => (
            <WebsiteCard
              key={index}
              url={url}
              onRemove={() => handleRemoveUrl(index)}
            />
          ))}
          {urls.length === 0 && (
            <div className="col-span-full flex items-center justify-center py-16 text-gray-500 bg-white/50 rounded-lg backdrop-blur-sm">
              <p className="text-lg">No websites added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;