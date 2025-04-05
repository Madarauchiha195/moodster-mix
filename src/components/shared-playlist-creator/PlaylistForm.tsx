
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PlaylistFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ 
  name, 
  setName, 
  description, 
  setDescription 
}) => {
  return (
    <>
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
    </>
  );
};

export default PlaylistForm;
