
"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ContentItemProps } from "@/components/ContentCard";
import { X, Star, ExternalLink, Heart, Clock, Calendar, Tag, Music, Film, Award } from "lucide-react";
import { Button } from "./button";
import { AspectRatio } from "./aspect-ratio";
import { ScrollArea } from "./scroll-area";
import { toast } from "sonner";

interface ExpandableCardProps {
  activeItem: ContentItemProps | null;
  onClose: () => void;
}

export function ExpandableCard({ activeItem, onClose }: ExpandableCardProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem, onClose]);

  useOutsideClick(ref, onClose);

  const handleExternalLink = () => {
    if (!activeItem) return;
    
    if (activeItem.url) {
      window.open(activeItem.url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback URLs based on content type
      if (activeItem.type === 'movie') {
        const platformUrl = activeItem.platform && activeItem.platform.length > 0 
          ? getPlatformUrl(activeItem.platform[0], activeItem.title)
          : `https://www.google.com/search?q=watch+${encodeURIComponent(activeItem.title)}`;
        window.open(platformUrl, '_blank', 'noopener,noreferrer');
      } else {
        const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(activeItem.title + ' ' + (activeItem.artist || ''))}`;
        window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const getPlatformUrl = (platform: string, title: string) => {
    const query = encodeURIComponent(title);
    switch (platform.toLowerCase()) {
      case 'netflix':
        return `https://www.netflix.com/search?q=${query}`;
      case 'amazon':
      case 'prime':
      case 'amazon prime':
        return `https://www.amazon.com/s?k=${query}&i=instant-video`;
      case 'hulu':
        return `https://www.hulu.com/search?q=${query}`;
      case 'disney+':
      case 'disney plus':
        return `https://www.disneyplus.com/search?q=${query}`;
      case 'hbo':
      case 'hbo max':
        return `https://www.max.com/search?q=${query}`;
      case 'apple tv':
      case 'apple tv+':
        return `https://tv.apple.com/search?term=${query}`;
      default:
        return `https://www.google.com/search?q=watch+${query}+on+${platform}`;
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success(`Added ${activeItem?.title} to favorites`);
    } else {
      toast.info(`Removed ${activeItem?.title} from favorites`);
    }
  };

  if (!activeItem) return null;

  return (
    <>
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-30"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 grid place-items-center z-40 p-4">
            <motion.button
              key={`button-${activeItem.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-black/60 border border-white/20 rounded-full h-10 w-10 text-white hover:bg-black/80 transition-colors"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </motion.button>
            
            <motion.div
              layoutId={`card-${activeItem.id}`}
              ref={ref}
              initial={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              className="w-full max-w-4xl h-auto max-h-[90vh] flex flex-col bg-black/90 border border-purple-500/30 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
              <div className="relative h-60">
                <motion.div layoutId={`image-${activeItem.id}`} className="h-full">
                  <img
                    src={activeItem.imageUrl || '/placeholder.svg'}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </motion.div>
                
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center">
                  <div>
                    <motion.h2
                      layoutId={`title-${activeItem.id}`}
                      className="text-3xl font-bold text-white mb-1"
                    >
                      {activeItem.title}
                    </motion.h2>
                    <motion.p className="text-gray-300 text-sm">
                      {activeItem.type === 'movie' 
                        ? `${activeItem.year} • ${activeItem.genre}`
                        : `${activeItem.artist} • ${activeItem.album}`
                      }
                    </motion.p>
                  </div>
                  
                  {activeItem.rating && (
                    <motion.div 
                      layoutId={`rating-${activeItem.id}`}
                      className="flex items-center bg-black/70 text-yellow-400 px-3 py-2 rounded-full text-sm"
                    >
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span>{activeItem.rating}/10</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl"
                  >
                    {activeItem.description}
                  </motion.p>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-10 w-10 rounded-full ${isFavorite ? "text-pink-500" : "text-gray-400 hover:text-pink-300"}`}
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                </div>
                
                <div className="border-t border-white/10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeItem.type === 'movie' ? (
                    <>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                          <Film className="h-4 w-4 mr-2 text-purple-400" />
                          Movie Details
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-gray-400 mr-2">Release Year:</span>
                            <span className="font-medium text-gray-200">{activeItem.year}</span>
                          </li>
                          <li className="flex items-center">
                            <Tag className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-gray-400 mr-2">Genre:</span>
                            <span className="font-medium text-gray-200">{activeItem.genre}</span>
                          </li>
                          <li className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-gray-400 mr-2">Rating:</span>
                            <span className="font-medium text-gray-200">{activeItem.rating}/10</span>
                          </li>
                          <li className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-gray-400 mr-2">Runtime:</span>
                            <span className="font-medium text-gray-200">2h 15min</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-3">Where to Watch</h4>
                        {activeItem.platform && activeItem.platform.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {activeItem.platform.map((p, idx) => (
                              <span 
                                key={idx} 
                                className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/20"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">Platform information not available</p>
                        )}
                        
                        <div className="mt-6">
                          <h4 className="text-base font-semibold text-white mb-3">Cast & Crew</h4>
                          <p className="text-gray-400 text-sm">Information not available</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                          <Music className="h-4 w-4 mr-2 text-purple-400" />
                          Song Details
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="text-gray-400 mr-2 w-16">Artist:</span>
                            <span className="font-medium text-gray-200">{activeItem.artist}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-gray-400 mr-2 w-16">Album:</span>
                            <span className="font-medium text-gray-200">{activeItem.album}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-gray-400 mr-2 w-16">Genre:</span>
                            <span className="font-medium text-gray-200">{activeItem.genre}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-gray-400 mr-2 w-16">Year:</span>
                            <span className="font-medium text-gray-200">{activeItem.year || "Unknown"}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-3">Mood</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/20">
                            Energetic
                          </span>
                          <span className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/20">
                            Uplifting
                          </span>
                          <span className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/20">
                            Relaxing
                          </span>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-base font-semibold text-white mb-3">Similar Artists</h4>
                          <p className="text-gray-400 text-sm">Information not available</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t border-white/10 flex justify-center sm:justify-end">
                <Button
                  variant="outline"
                  className="rounded-full bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 border-purple-500/30 text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(79,70,229,0.4)] w-full sm:w-auto"
                  onClick={handleExternalLink}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {activeItem.type === 'movie' ? 'Watch Now' : 'Listen Now'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
