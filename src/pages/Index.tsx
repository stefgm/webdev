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
      'https://cozystay.loftocean.com/mountain-chalet/',
      'https://websitedemos.net/home-stay-04/?customize=template',
      'https://themewant.com/products/wordpress/almaris/beach-resort/',
      'https://cozystay.loftocean.com/island-resort/'
    ];

    // Add each URL
    initialUrls.forEach(url => addUrl(url));
  }, []); // Empty dependency array means this runs once on mount

  const handleRemoveUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
    toast.success('Website removed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-center mb-8">
            Luxury Website Collection
          </h1>
          <p className="text-gray-400 text-center text-lg max-w-2xl mx-auto mb-12">
            Discover our curated collection of the finest luxury hospitality websites
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-6">
              XYZ YGGS
            </h2>
            <div className="space-y-4">
              <p className="text-gray-400 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +1 234 567 890
              </p>
              <p className="text-gray-400 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                contact@xyzyggs.com
              </p>
            </div>
            <div className="mt-8 text-gray-500 text-sm">
              {new Date().getFullYear()} XYZ YGGS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;