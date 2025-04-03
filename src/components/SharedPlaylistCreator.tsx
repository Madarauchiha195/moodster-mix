
import React, { useState } from 'react';
import { ContentItemProps } from './ContentCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { MoodType } from './MoodSelection';
import { toast } from 'sonner';
import { Loader2, Share2, ListMusic, PlusCircle } from 'lucide-react';

interface SharedPlaylistCreatorProps {
  username: string;
  currentMood: MoodType;
  contentItems: ContentItemProps[];
  onPlaylistCreated?: (playlistId: string) => void;
}

const SharedPlaylistCreator: React.FC<SharedPlaylistCreatorProps> = ({
  username,
  currentMood,
  contentItems,
  onPlaylistCreated
}) => {
  const [name, setName] = useState<string>(`${username}'s ${currentMood || 'favorite'} mix`);
  const [description, setDescription] = useState<string>(`A collection of ${currentMood || 'my favorite'} content`);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  
  const handleCreatePlaylist = async () => {
    if (!name.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call for now - would connect to MongoDB in production
      // const response = await fetch('/api/playlists/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username,
      //     name,
      //     description,
      //     mood: currentMood,
      //     content: contentItems,
      //     isPublic
      //   })
      // });
      // const data = await response.json();
      
      // For demo purposes, simulate API response
      const mockShareId = generateMockShareId();
      const playlistUrl = `${window.location.origin}/shared/${mockShareId}`;
      
      setShareUrl(playlistUrl);
      
      toast.success('Playlist created successfully!', {
        description: 'Your playlist is now ready to share.'
      });
      
      if (onPlaylistCreated) {
        onPlaylistCreated(mockShareId);
      }
    } catch (error) {
      console.error('Failed to create playlist:', error);
      toast.error('Failed to create playlist', {
        description: 'Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };
  
  const generateMockShareId = () => {
    return Math.random().toString(36).substring(2, 10);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-black/50 hover:bg-black/80 text-white border-purple-600/30"
        >
          <ListMusic className="h-4 w-4" />
          Create Shareable Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create a Shareable Playlist</DialogTitle>
          <DialogDescription className="text-gray-400">
            Make a custom playlist to share with friends based on your current mood
          </DialogDescription>
        </DialogHeader>
        
        {!shareUrl ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Playlist Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public" className="text-white">Make playlist public</Label>
            </div>
            
            <div className="mt-2 p-3 bg-gray-800 rounded-md border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">This playlist will include:</p>
              <p className="text-sm text-white">{contentItems.length} items ({
                contentItems.filter(item => item.type === 'movie').length
              } movies, {
                contentItems.filter(item => item.type === 'song').length
              } songs)</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-md border border-gray-700">
              <h4 className="font-medium text-purple-400 mb-1">Playlist created successfully!</h4>
              <p className="text-sm text-gray-300 mb-3">Share this link with your friends:</p>
              <div className="flex items-center p-2 bg-black rounded border border-gray-600">
                <code className="text-xs flex-1 text-gray-300 overflow-hidden text-ellipsis">{shareUrl}</code>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                  className="ml-2 h-8 px-2 text-purple-400 hover:text-purple-300 hover:bg-gray-800"
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          {!shareUrl ? (
            <Button 
              onClick={handleCreatePlaylist} 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Playlist
                </>
              )}
            </Button>
          ) : (
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline" 
              className="w-full border-purple-500/30 text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SharedPlaylistCreator;
