
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, Music } from 'lucide-react';
import { ContentItemProps } from '@/components/ContentCard';

interface SharedPlaylistTabsProps {
  activeTab: 'all' | 'movies' | 'music';
  setActiveTab: (tab: 'all' | 'movies' | 'music') => void;
  playlistContent: ContentItemProps[];
}

const SharedPlaylistTabs: React.FC<SharedPlaylistTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  playlistContent
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
      <TabsList className="bg-black/40 border border-gray-800">
        <TabsTrigger value="all" className="data-[state=active]:bg-purple-600/20">
          All ({playlistContent.length})
        </TabsTrigger>
        <TabsTrigger value="movies" className="data-[state=active]:bg-purple-600/20">
          <Film className="h-4 w-4 mr-1.5" />
          Movies ({playlistContent.filter((item: ContentItemProps) => item.type === 'movie').length})
        </TabsTrigger>
        <TabsTrigger value="music" className="data-[state=active]:bg-purple-600/20">
          <Music className="h-4 w-4 mr-1.5" />
          Music ({playlistContent.filter((item: ContentItemProps) => item.type === 'song').length})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SharedPlaylistTabs;
