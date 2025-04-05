
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2 } from 'lucide-react';
import { toast } from "sonner";
import { ContentItemProps } from './ContentCard';
import { createSharedPlaylist } from '@/services/mongodb/db';
import { MoodType } from './MoodSelection';

// Import the refactored components
import PlaylistForm from './shared-playlist-creator/PlaylistForm';
import PlaylistContentSelector from './shared-playlist-creator/PlaylistContentSelector';
import PlaylistSuccess from './shared-playlist-creator/PlaylistSuccess';
import PlaylistCreationButton from './shared-playlist-creator/PlaylistCreationButton';

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
  const [selectedContent, setSelectedContent] = useState<ContentItemProps[]>([]);
  const [activeTab, setActiveTab] = useState<'movies' | 'music'>('movies');
  
  const moviesContent = contentItems.filter(item => item.type === 'movie');
  const musicContent = contentItems.filter(item => item.type === 'song');
  
  const toggleItemSelection = (item: ContentItemProps) => {
    if (selectedContent.some(selected => selected.id === item.id)) {
      setSelectedContent(prev => prev.filter(i => i.id !== item.id));
    } else {
      setSelectedContent(prev => [...prev, item]);
    }
  };

  const clearSelection = () => {
    setSelectedContent([]);
  };
  
  const handleCreatePlaylist = async () => {
    if (!name) {
      toast.error('Please enter a name for your playlist');
      return;
    }
    
    if (selectedContent.length === 0) {
      toast.error('Please select at least one item for your playlist');
      return;
    }
    
    try {
      setIsCreating(true);
      
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
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error('Failed to create playlist. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDone = () => {
    setCreatedPlaylistId(null);
    setIsOpen(false);
    setSelectedContent([]);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full bg-black/40 border-purple-500/30 hover:bg-black/60 hover:border-purple-500/50 text-white"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Create & Share Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Create Shareable Playlist</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select your favorite content and share with friends or save for later.
          </DialogDescription>
        </DialogHeader>
        
        {createdPlaylistId ? (
          <div className="space-y-4 py-4">
            <PlaylistSuccess 
              playlistId={createdPlaylistId} 
              onDone={handleDone} 
            />
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <PlaylistForm 
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
            />
            
            <PlaylistContentSelector
              moviesContent={moviesContent}
              musicContent={musicContent}
              selectedContent={selectedContent}
              toggleItemSelection={toggleItemSelection}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              clearSelection={clearSelection}
            />
          </div>
        )}
        
        {!createdPlaylistId && (
          <DialogFooter>
            <PlaylistCreationButton 
              isCreating={isCreating}
              onClick={handleCreatePlaylist}
              disabled={!name || selectedContent.length === 0}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SharedPlaylistCreator;
