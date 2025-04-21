import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Music, Film, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CreatePlaylistDialog from './CreatePlaylistDialog';

interface PlaylistItem {
  id: string;
  name: string;
  type: 'movie' | 'song';
  title: string;
  imageUrl: string;
}

interface Playlist {
  id: string;
  name: string;
  items: PlaylistItem[];
  createdAt: string;
}

interface UserPlaylistsProps {
  playlists: Playlist[];
  onCreatePlaylist: (name: string) => void;
  onPlaylistClick: (playlist: Playlist) => void;
}

const UserPlaylists: React.FC<UserPlaylistsProps> = ({ 
  playlists, 
  onCreatePlaylist,
  onPlaylistClick 
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreatePlaylist = (name: string) => {
    onCreatePlaylist(name);
    setIsCreateDialogOpen(false);
  };

  const handleCreateClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsCreateDialogOpen(true);
  };

  const handleCardClick = (playlist: Playlist) => (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onPlaylistClick(playlist);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Playlists</h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-500/30 hover:from-purple-800 hover:to-indigo-800 text-white hover:text-white"
          onClick={handleCreateClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Playlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={handleCardClick(playlist)}
          >
            <Card className="bg-black/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">{playlist.name}</CardTitle>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">
                  {playlist.items.length} items • Created {new Date(playlist.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {playlist.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          {item.type === 'song' ? (
                            <Music className="h-4 w-4 text-white" />
                          ) : (
                            <Film className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{item.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                      </div>
                    </div>
                  ))}
                  {playlist.items.length > 3 && (
                    <p className="text-sm text-gray-400 text-center">
                      +{playlist.items.length - 3} more items
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <CreatePlaylistDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </div>
  );
};

export default UserPlaylists; 