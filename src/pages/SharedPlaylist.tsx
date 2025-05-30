import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, Share2, UserCircle, Music, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { ContentItemProps } from '@/components/ContentCard';
import ContentCard from '@/components/ContentCard';
import Background from '@/components/Background';
import { getSharedPlaylist } from '@/services/mongodb/db';

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
  
  const handleCopyShareLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard');
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
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <Card className="bg-black/60 backdrop-blur-sm border-gray-800 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-48 h-48 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg flex items-center justify-center">
                {playlist.mood === 'happy' ? (
                  <span className="text-6xl">😊</span>
                ) : playlist.mood === 'sad' ? (
                  <span className="text-6xl">😢</span>
                ) : playlist.mood === 'confused' ? (
                  <span className="text-6xl">🤔</span>
                ) : (
                  <span className="text-6xl">😐</span>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{playlist.name}</h1>
                <p className="text-gray-400 mt-2">{playlist.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm inline-flex items-center">
                    <UserCircle className="h-3.5 w-3.5 mr-1.5" />
                    Created by {playlist.owner}
                  </div>
                  <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm inline-flex items-center">
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    {playlist.views || 0} views
                  </div>
                  <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm capitalize">
                    {playlist.mood} mood
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    className="gap-2 border-purple-500/30 text-white"
                    onClick={handleCopyShareLink}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="gap-2 border-pink-500/30 text-white"
                  >
                    <Heart className="h-4 w-4" />
                    Like
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
              <TabsList className="bg-black/40 border border-gray-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-purple-600/20">
                  All ({playlist.content.length})
                </TabsTrigger>
                <TabsTrigger value="movies" className="data-[state=active]:bg-purple-600/20">
                  <Film className="h-4 w-4 mr-1.5" />
                  Movies ({playlist.content.filter((item: ContentItemProps) => item.type === 'movie').length})
                </TabsTrigger>
                <TabsTrigger value="music" className="data-[state=active]:bg-purple-600/20">
                  <Music className="h-4 w-4 mr-1.5" />
                  Music ({playlist.content.filter((item: ContentItemProps) => item.type === 'song').length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
              {filteredContent().map((item: ContentItemProps) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  gender="male"
                  onOpenDetails={handleOpenDetails}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Background>
  );
};

export default SharedPlaylist;
