
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

interface PlaylistSuccessProps {
  playlistId: string;
  onDone: () => void;
}

const PlaylistSuccess: React.FC<PlaylistSuccessProps> = ({ 
  playlistId, 
  onDone 
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shared/${playlistId}`);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-black/50 p-4 rounded-md border border-green-500/30">
      <h4 className="font-medium text-green-400 mb-2">Playlist Created Successfully!</h4>
      <p className="text-sm text-gray-300 mb-4">
        Your playlist is now available to share. Use the link below:
      </p>
      <div className="flex items-center justify-between bg-black/70 p-2 rounded border border-gray-700 mb-4">
        <code className="text-xs text-gray-400 truncate mr-2">
          {window.location.origin}/shared/{playlistId}
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
        <Link to={`/shared/${playlistId}`} target="_blank">
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
          onClick={onDone}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default PlaylistSuccess;
