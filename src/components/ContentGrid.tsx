
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

interface ContentGridProps {
  items: ContentItem[];
  title: string;
  gender: 'male' | 'female';
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, title, gender }) => {
  return (
    <div className="mb-10 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card 
            key={item.id}
            className={cn(
              "overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-black",
              "border border-gray-800 hover:border-gray-600",
              "h-full flex flex-col"
            )}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-2 left-2 bg-black/60 text-xs px-2 py-1 rounded text-white">
                {item.category}
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 flex-grow">{item.description}</p>
              <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Learn more
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
