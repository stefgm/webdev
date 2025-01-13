import React, { useState } from 'react';
import { toast } from "sonner";
import WebsiteCard from '@/components/WebsiteCard';

const Index = () => {
  const [urls, setUrls] = useState<string[]>([]);

  // This function can be called programmatically to add new URLs
  const addUrl = (newUrl: string) => {
    try {
      new URL(newUrl);
      setUrls(prev => [...prev, newUrl]);
      toast.success('Website added successfully');
    } catch {
      toast.error('Please enter a valid URL');
    }
  };

  const handleRemoveUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
    toast.success('Website removed');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urls.map((url, index) => (
            <WebsiteCard
              key={index}
              url={url}
              onRemove={() => handleRemoveUrl(index)}
            />
          ))}
          {urls.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No websites added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;