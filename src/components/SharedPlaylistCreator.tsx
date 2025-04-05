
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Plus, Music, Film, Check, Copy } from 'lucide-react';
import { toast } from "sonner";
import { ContentItemProps } from './ContentCard';
import { createSharedPlaylist } from '@/services/mongodb/db';
import { MoodType } from './MoodSelection';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  const copyToClipboard = () => {
    if (createdPlaylistId) {
      navigator.clipboard.writeText(`${window.location.origin}/shared/${createdPlaylistId}`);
      toast.success('Link copied to clipboard!');
    }
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
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-1" />
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
                    setSelectedContent([]);
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
              <Label htmlFor="playlist-name">Playlist Name</Label>
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
            
            <div className="bg-black/30 rounded-md border border-gray-800 p-3">
              <Label className="mb-2 block">Select Content for Playlist</Label>
              <Tabs defaultValue="movies" className="w-full" onValueChange={(value) => setActiveTab(value as 'movies' | 'music')}>
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
                        <div 
                          key={movie.id} 
                          className={`p-2 rounded-md cursor-pointer flex items-center text-sm hover:bg-gray-800 transition-colors ${
                            selectedContent.some(i => i.id === movie.id) ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-gray-900 border border-gray-800'
                          }`}
                          onClick={() => toggleItemSelection(movie)}
                        >
                          <div className="w-8 h-12 rounded overflow-hidden mr-2 relative flex-shrink-0">
                            <img src={movie.imageUrl || '/placeholder.svg'} alt={movie.title} className="object-cover w-full h-full" />
                            {selectedContent.some(i => i.id === movie.id) && (
                              <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{movie.title}</p>
                            <p className="text-xs text-gray-400 truncate">{movie.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="music" className="h-[200px]">
                  <ScrollArea className="h-[200px]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
                      {musicContent.map(song => (
                        <div 
                          key={song.id} 
                          className={`p-2 rounded-md cursor-pointer flex items-center text-sm hover:bg-gray-800 transition-colors ${
                            selectedContent.some(i => i.id === song.id) ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-gray-900 border border-gray-800'
                          }`}
                          onClick={() => toggleItemSelection(song)}
                        >
                          <div className="w-8 h-8 rounded overflow-hidden mr-2 relative flex-shrink-0">
                            <img src={song.imageUrl || '/placeholder.svg'} alt={song.title} className="object-cover w-full h-full" />
                            {selectedContent.some(i => i.id === song.id) && (
                              <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{song.title}</p>
                            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                          </div>
                        </div>
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
                  onClick={() => setSelectedContent([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {!createdPlaylistId && (
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleCreatePlaylist}
              disabled={!name || selectedContent.length === 0 || isCreating}
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
