
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserCircle, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface SharedPlaylistHeaderProps {
  playlist: {
    name: string;
    description: string;
    owner: string;
    views?: number;
    mood: string;
  };
}

const SharedPlaylistHeader: React.FC<SharedPlaylistHeaderProps> = ({ playlist }) => {
  const handleCopyShareLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard');
  };
  
  return (
    <>
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
    </>
  );
};

export default SharedPlaylistHeader;
