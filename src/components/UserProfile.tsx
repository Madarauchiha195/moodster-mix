
import React, { useState } from 'react';
import { X, Heart, Film, Music, Clock, Plus, UserIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { ContentItemProps } from './ContentCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  gender: 'male' | 'female';
  watchlist?: ContentItemProps[];
  playlist?: ContentItemProps[];
  likedContent?: ContentItemProps[];
  activeTab?: 'profile' | 'watchlist' | 'playlist' | 'liked' | 'movies' | 'music';
}

const UserProfile: React.FC<UserProfileProps> = ({
  isOpen,
  onClose,
  username,
  gender,
  watchlist = [],
  playlist = [],
  likedContent = [],
  activeTab: initialTab
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'watchlist' | 'playlist' | 'liked'>
    (initialTab === 'movies' ? 'watchlist' : 
     initialTab === 'music' ? 'playlist' : 
     initialTab || 'profile');
  
  const ref = React.useRef<HTMLDivElement>(null);
  
  useOutsideClick(ref, onClose);
  
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Handle changes to initialTab prop
  React.useEffect(() => {
    if (initialTab) {
      if (initialTab === 'movies') {
        setActiveTab('watchlist');
      } else if (initialTab === 'music') {
        setActiveTab('playlist');
      } else if (['profile', 'watchlist', 'playlist', 'liked'].includes(initialTab)) {
        setActiveTab(initialTab as 'profile' | 'watchlist' | 'playlist' | 'liked');
      }
    }
  }, [initialTab]);
  
  if (!isOpen) return null;
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full z-30"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              ref={ref}
              className="w-full max-w-3xl h-[80vh] flex flex-col bg-black/90 border border-purple-500/30 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">User Profile</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-transparent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex border-b border-white/10">
                <button
                  className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'liked' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('liked')}
                >
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    Liked
                  </span>
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'watchlist' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('watchlist')}
                >
                  <span className="flex items-center">
                    <Film className="h-4 w-4 mr-1" />
                    Watchlist
                  </span>
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'playlist' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('playlist')}
                >
                  <span className="flex items-center">
                    <Music className="h-4 w-4 mr-1" />
                    Playlist
                  </span>
                </button>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                {activeTab === 'profile' && (
                  <div className="flex flex-col items-center p-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`} />
                      <AvatarFallback className="bg-purple-700 text-lg">
                        {username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-xl font-semibold text-white">{username}</h3>
                    <p className="text-gray-400 mb-6">Member since {new Date().toLocaleDateString()}</p>
                    
                    <div className="w-full max-w-md grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-gray-400 text-sm">Liked</p>
                        <p className="text-xl font-semibold text-white">{likedContent?.length || 0}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-gray-400 text-sm">Watchlist</p>
                        <p className="text-xl font-semibold text-white">{watchlist.length}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-gray-400 text-sm">Playlist</p>
                        <p className="text-xl font-semibold text-white">{playlist.length}</p>
                      </div>
                    </div>
                    
                    <div className="w-full max-w-md">
                      <h4 className="text-white font-semibold mb-3">Account Information</h4>
                      <div className="bg-white/5 rounded-lg p-4 space-y-3">                        
                        <div className="flex justify-between">
                          <span className="text-gray-400">Language</span>
                          <span className="text-white">English</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-400">Dark Mode</span>
                          <span className="text-white">Enabled</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email notifications</span>
                          <span className="text-white">On</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'liked' && (
                  <div>
                    <h3 className="text-white font-semibold mb-4">Your Liked Content</h3>
                    {likedContent && likedContent.length > 0 ? (
                      <div>
                        <h4 className="text-purple-400 text-sm mb-2">Movies & Shows</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          {likedContent.filter(item => item.type === 'movie').map(item => (
                            <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                              <div className="h-24 overflow-hidden relative">
                                <img 
                                  src={item.imageUrl || '/placeholder.svg'} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <h4 className="text-purple-400 text-sm mb-2">Music</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {likedContent.filter(item => item.type === 'song').map(item => (
                            <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden flex items-center p-2 border border-white/10">
                              <div className="h-12 w-12 rounded overflow-hidden mr-3">
                                <img 
                                  src={item.imageUrl || '/placeholder.svg'} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm">{item.title}</p>
                                <p className="text-gray-400 text-xs">{item.artist}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                                <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Heart className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400">You haven't liked any content yet</p>
                        <Button variant="outline" className="mt-4 rounded-full bg-gradient-to-r from-indigo-900/40 to-purple-900/40 hover:from-indigo-800/60 hover:to-purple-800/60 border-purple-500/30">
                          <Plus className="h-4 w-4 mr-1" />
                          Explore Content
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'watchlist' && (
                  <div>
                    <h3 className="text-white font-semibold mb-4">Your Watchlist</h3>
                    {watchlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {watchlist.map(item => (
                          <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                            <div className="h-24 overflow-hidden relative">
                              <img 
                                src={item.imageUrl || '/placeholder.svg'} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                              <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Film className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400">Your watchlist is empty</p>
                        <Button variant="outline" className="mt-4 rounded-full bg-gradient-to-r from-indigo-900/40 to-purple-900/40 hover:from-indigo-800/60 hover:to-purple-800/60 border-purple-500/30">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Movies
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'playlist' && (
                  <div>
                    <h3 className="text-white font-semibold mb-4">Your Playlist</h3>
                    {playlist.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2">
                        {playlist.map(item => (
                          <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden flex items-center p-2 border border-white/10">
                            <div className="h-12 w-12 rounded overflow-hidden mr-3">
                              <img 
                                src={item.imageUrl || '/placeholder.svg'} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm">{item.title}</p>
                              <p className="text-gray-400 text-xs">{item.artist}</p>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-400">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Music className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400">Your playlist is empty</p>
                        <Button variant="outline" className="mt-4 rounded-full bg-gradient-to-r from-indigo-900/40 to-purple-900/40 hover:from-indigo-800/60 hover:to-purple-800/60 border-purple-500/30">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Songs
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfile;
