import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';

interface CreatePlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePlaylist: (name: string) => void;
}

const CreatePlaylistDialog: React.FC<CreatePlaylistDialogProps> = ({
  open,
  onOpenChange,
  onCreatePlaylist,
}) => {
  const [playlistName, setPlaylistName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName.trim());
      setPlaylistName('');
      onOpenChange(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setPlaylistName(''); // Reset the input when dialog closes
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-black/80 backdrop-blur-md border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Playlist</DialogTitle>
          <DialogDescription className="text-gray-400">
            Give your playlist a name and start adding your favorite content.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Playlist Name
              </Label>
              <Input
                id="name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="bg-black/50 border-white/10 text-white"
                placeholder="My Awesome Playlist"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-500/30 hover:from-purple-800 hover:to-indigo-800 text-white hover:text-white"
              disabled={!playlistName.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistDialog; 