
import React from 'react';
import { Check, Film, Music } from 'lucide-react';
import { ContentItemProps } from '@/components/ContentCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface PlaylistContentSelectorProps {
  moviesContent: ContentItemProps[];
  musicContent: ContentItemProps[];
  selectedContent: ContentItemProps[];
  toggleItemSelection: (item: ContentItemProps) => void;
  activeTab: 'movies' | 'music';
  setActiveTab: (tab: 'movies' | 'music') => void;
  clearSelection: () => void;
}

const PlaylistContentSelector: React.FC<PlaylistContentSelectorProps> = ({
  moviesContent,
  musicContent,
  selectedContent,
  toggleItemSelection,
  activeTab,
  setActiveTab,
  clearSelection
}) => {
  return (
    <div className="bg-black/30 rounded-md border border-gray-800 p-3">
      <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value as 'movies' | 'music')}>
        <TabsList className="w-full bg-gray-800">
          <TabsTrigger value="movies" className="flex-1">
            <Film className="h-4 w-4 mr-2" />
            Movies ({selectedContent.filter(i => i.type === 'movie').length})
          </TabsTrigger>
          <TabsTrigger value="music" className="flex-1">
            <Music className="h-4 w-4 mr-2" />
            Music ({selectedContent.filter(i => i.type === 'song').length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="movies" className="h-[200px]">
          <ScrollArea className="h-[200px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
              {moviesContent.map(movie => (
                <ContentItem 
                  key={movie.id} 
                  item={movie} 
                  isSelected={selectedContent.some(i => i.id === movie.id)}
                  onSelect={() => toggleItemSelection(movie)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="music" className="h-[200px]">
          <ScrollArea className="h-[200px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
              {musicContent.map(song => (
                <ContentItem 
                  key={song.id} 
                  item={song} 
                  isSelected={selectedContent.some(i => i.id === song.id)}
                  onSelect={() => toggleItemSelection(song)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="mt-2 bg-black/50 p-2 rounded-md flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Selected: <span className="text-white">{selectedContent.length} items</span>
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs hover:bg-gray-800"
          onClick={clearSelection}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

interface ContentItemProps {
  item: ContentItemProps;
  isSelected: boolean;
  onSelect: () => void;
}

const ContentItem: React.FC<ContentItemProps> = ({ item, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-2 rounded-md cursor-pointer flex items-center text-sm hover:bg-gray-800 transition-colors ${
        isSelected ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-gray-900 border border-gray-800'
      }`}
      onClick={onSelect}
    >
      <div className={`w-8 h-${item.type === 'movie' ? '12' : '8'} rounded overflow-hidden mr-2 relative flex-shrink-0`}>
        <img src={item.imageUrl || '/placeholder.svg'} alt={item.title} className="object-cover w-full h-full" />
        {isSelected && (
          <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate">{item.title}</p>
        <p className="text-xs text-gray-400 truncate">
          {item.type === 'movie' ? item.year : item.artist}
        </p>
      </div>
    </div>
  );
};

export default PlaylistContentSelector;
