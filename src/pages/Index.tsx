import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import WebsiteCard from '@/components/WebsiteCard';

const Index = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Basic URL validation
      new URL(newUrl);
      
      setUrls(prev => [...prev, newUrl]);
      setNewUrl('');
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
        <div className="bg-white rounded-lg shadow-sm p-4">
          <form onSubmit={handleAddUrl} className="flex gap-2">
            <Input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste website URL here..."
              className="flex-1"
            />
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Website
            </Button>
          </form>
        </div>

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
              No websites added yet. Paste a URL above to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;