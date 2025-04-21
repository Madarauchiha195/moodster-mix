import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Plus } from 'lucide-react';
import { toast } from "sonner";
import { ContentItemProps } from './ContentCard';
import { createSharedPlaylist } from '@/services/mongodb/db';
import { MoodType } from './MoodSelection';
import { Link } from 'react-router-dom';

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
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createdPlaylistId, setCreatedPlaylistId] = useState<string | null>(null);
  
  const handleCreatePlaylist = async () => {
    if (!name) {
      toast.error('Please enter a name for your playlist');
      return;
    }
    
    try {
      setIsCreating(true);
      
      // Filter to only include the first 20 items to keep playlists reasonable
      const selectedContent = contentItems.slice(0, 20);
      
      // Create the shared playlist
      const playlistId = await createSharedPlaylist(
        name,
        description,
        'user_1', // Use test user for now
        username,
        selectedContent,
        currentMood
      );
      
      setCreatedPlaylistId(playlistId);
      
      if (onPlaylistCreated) {
        onPlaylistCreated(playlistId);
      }
      
      toast.success('Playlist created successfully!');
      
      // Reset form after successful creation
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error('Failed to create playlist. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-500/30 hover:from-purple-800 hover:to-indigo-800 text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(79,70,229,0.4)] mr-4"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Recommendations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Create Shared Playlist</DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your current recommendations with friends or save for later.
          </DialogDescription>
        </DialogHeader>
        
        {createdPlaylistId ? (
          <div className="space-y-4 py-4">
            <div className="bg-black/50 p-4 rounded-md border border-green-500/30">
              <h4 className="font-medium text-green-400 mb-2">Playlist Created Successfully!</h4>
              <p className="text-sm text-gray-300 mb-4">
                Your playlist is now available to share. Use the link below:
              </p>
              <div className="flex items-center justify-between bg-black/70 p-2 rounded border border-gray-700 mb-4">
                <code className="text-xs text-gray-400 truncate mr-2">
                  {window.location.origin}/shared/{createdPlaylistId}
                </code>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 px-2 hover:bg-gray-800"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/shared/${createdPlaylistId}`);
                    toast.success('Link copied to clipboard!');
                  }}
                >
                  Copy
                </Button>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Link to={`/shared/${createdPlaylistId}`} target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-purple-900/50 border-purple-500/30 hover:bg-purple-800/50"
                  >
                    View Playlist
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setCreatedPlaylistId(null);
                    setIsOpen(false);
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-name">Name</Label>
              <Input
                id="playlist-name"
                placeholder="My awesome playlist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playlist-description">Description (optional)</Label>
              <Textarea
                id="playlist-description"
                placeholder="Perfect movies and songs for a rainy day..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 min-h-[80px]"
              />
            </div>
            
            <div className="bg-black/50 p-3 rounded-md border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Content to include:</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                  {contentItems.length > 20 ? '20 of ' + contentItems.length + ' items' : contentItems.length + ' items'}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>• First 20 recommendations from your current view</p>
                <p>• Current mood: <span className="text-purple-400">{currentMood}</span></p>
              </div>
            </div>
          </div>
        )}
        
        {!createdPlaylistId && (
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleCreatePlaylist}
              disabled={!name || isCreating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isCreating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Playlist
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SharedPlaylistCreator;
