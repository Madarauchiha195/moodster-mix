
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { ContentItemProps } from '@/components/ContentCard';
import Background from '@/components/Background';
import { getSharedPlaylist } from '@/services/mongodb/db';
import SharedPlaylistHeader from '@/components/shared-playlist/SharedPlaylistHeader';
import SharedPlaylistTabs from '@/components/shared-playlist/SharedPlaylistTabs';
import SharedPlaylistContent from '@/components/shared-playlist/SharedPlaylistContent';

const SharedPlaylist = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'music'>('all');
  const [activeItem, setActiveItem] = useState<ContentItemProps | null>(null);
  
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        if (id) {
          // Try to get the actual playlist from MongoDB
          const data = await getSharedPlaylist(id);
          setPlaylist(data);
        } else {
          throw new Error('Invalid playlist ID');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
        toast.error('Failed to load playlist');
        setLoading(false);
      }
    };
    
    fetchPlaylist();
  }, [id]);
  
  const handleOpenDetails = (item: ContentItemProps) => {
    setActiveItem(item);
  };
  
  const handleCloseDetails = () => {
    setActiveItem(null);
  };
  
  const filteredContent = () => {
    if (!playlist) return [];
    
    switch (activeTab) {
      case 'movies':
        return playlist.content.filter((item: ContentItemProps) => item.type === 'movie');
      case 'music':
        return playlist.content.filter((item: ContentItemProps) => item.type === 'song');
      default:
        return playlist.content;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-purple-600/20"></div>
          <div className="mt-4 h-4 w-48 bg-gray-600/20 rounded"></div>
          <div className="mt-2 h-3 w-32 bg-gray-600/20 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!playlist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Playlist Not Found</h2>
          <p className="text-gray-400 mb-6">This playlist might have been removed or is private.</p>
          <Link to="/">
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <Background>
      <div className="min-h-screen pb-16">
        <Header 
          gender="male" 
          activeStep={3} 
          username="" 
          showFullHeader={false}
          onOpenProfile={() => {}}
          onOpenMovies={() => {}}
          onOpenMusic={() => {}}
        />
        
        <div className="container mx-auto pt-24 px-4 text-white">
          <SharedPlaylistHeader playlist={playlist} />
          
          <div className="mb-6">
            <SharedPlaylistTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              playlistContent={playlist.content}
            />
          </div>
          
          <SharedPlaylistContent 
            filteredContent={filteredContent()}
            onOpenDetails={handleOpenDetails}
          />
        </div>
      </div>
    </Background>
  );
};

export default SharedPlaylist;
