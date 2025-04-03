
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

// Mock data for shared playlist
const mockPlaylist = {
  id: '123',
  name: "Mood Lifters",
  description: "A collection of upbeat and happy content to brighten your day",
  mood: "happy",
  owner: "JohnDoe",
  isPublic: true,
  createdAt: new Date().toISOString(),
  views: 42,
  content: [
    {
      id: 1,
      title: "Guardians of the Galaxy",
      description: "A group of intergalactic criminals must pull together to stop a fanatical warrior from taking control of the universe.",
      type: "movie",
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      rating: 8.0,
      platform: ["Netflix", "Disney+"],
      genre: "Action, Adventure, Comedy",
      year: 2014
    },
    {
      id: 101,
      title: "Happy",
      description: "A neo soul and funk song written for the film Despicable Me 2, it became a global hit for its positive message.",
      type: "song",
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      rating: 4.5,
      genre: "Pop, Neo Soul",
      artist: "Pharrell Williams",
      album: "Girl"
    },
    {
      id: 106,
      title: "Good Vibrations",
      description: "The Beach Boys' masterpiece, featuring innovative use of instruments and recording techniques. Known for its uplifting, positive message.",
      type: "song",
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      rating: 4.9,
      genre: "Rock, Pop",
      artist: "The Beach Boys",
      album: "Smiley Smile"
    },
    {
      id: 6,
      title: "The Lego Movie",
      description: "An ordinary LEGO construction worker is recruited to join a quest to stop an evil tyrant from gluing the LEGO universe into eternal stasis.",
      type: "movie",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      rating: 7.7,
      platform: ["HBO Max", "Prime Video"],
      genre: "Animation, Action, Adventure",
      year: 2014
    },
  ]
};

const SharedPlaylist = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'music'>('all');
  const [activeItem, setActiveItem] = useState<ContentItemProps | null>(null);
  
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // In production, this would be a real API call to MongoDB
        // const response = await fetch(`/api/playlists/${id}`);
        // const data = await response.json();
        
        // For demo purposes, we'll use mock data
        setPlaylist(mockPlaylist);
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
                    {playlist.views} views
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
