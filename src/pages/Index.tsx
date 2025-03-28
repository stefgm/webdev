import React, { useState, useEffect } from 'react';
import WebsiteCard from '@/components/WebsiteCard';

const TypewriterText = () => {
  const [text, setText] = useState('');
  const fullText = 'Development';
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && text !== fullText) {
        setText(fullText.slice(0, text.length + 1));
      } else if (isDeleting && text !== '') {
        setText(text.slice(0, -1));
      } else if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <span className="text-amber-300">{text}</span>
  );
};

const Index = () => {
  const [urls, setUrls] = useState<string[]>([]);

  const addUrl = (newUrl: string) => {
    try {
      const urlToAdd = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
      new URL(urlToAdd);
      setUrls(prev => [...prev, urlToAdd]);
    } catch {
      console.error('Invalid URL');
    }
  };

  useEffect(() => {
    const initialUrls = [
      'https://demo.yootheme.com/wordpress/themes/dennis-miller/',
      'https://cozystay.loftocean.com/mountain-chalet/',
      'https://websitedemos.net/home-stay-04/?customize=template',
      'https://gofo.peerduck.com/home-golf-club/',
      'https://websitedemos.net/real-estate-company-04/?customize=template',
      'https://websitedemos.net/flavio-restaurant-04/?customize=template'
    ];

    // Add each URL
    initialUrls.forEach(url => addUrl(url));
  }, []);

  const handleRemoveUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-center mb-4 tracking-tight">
            Luxury Website <TypewriterText />
          </h1>
          <p className="font-light text-gray-400 text-center text-lg max-w-2xl mx-auto mt-6 tracking-wide">
            Curated collection of premium hospitality experiences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {urls.map((url, index) => (
            <WebsiteCard
              key={index}
              url={url}
              onRemove={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="font-playfair text-2xl font-bold text-white mb-6">
              Mohamed Dev
            </h2>
            <div className="space-y-4">
              <p className="text-gray-400 flex items-center justify-center font-light">
                <svg className="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +212 641 327 994
              </p>
              <p className="text-gray-400 flex items-center justify-center font-light">
                <svg className="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                eiraimed@gmail.com
              </p>
            </div>
            <div className="mt-8 text-gray-600 text-sm font-light">
              {new Date().getFullYear()} Mohamed Dev. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
