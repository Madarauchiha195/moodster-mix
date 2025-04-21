import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Film, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface PlaylistDetailsProps {
  playlist: Playlist;
  onBack: () => void;
}

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({ playlist, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-white hover:bg-white/10"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-white">{playlist.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlist.items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-black/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {item.type === 'song' ? (
                    <Music className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Film className="h-5 w-5 text-purple-400" />
                  )}
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video rounded-md overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-400 capitalize">{item.type}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails; 