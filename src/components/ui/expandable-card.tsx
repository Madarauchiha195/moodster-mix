
"use client";
import React, { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ContentItemProps } from "@/components/ContentCard";
import { X, Star, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { AspectRatio } from "./aspect-ratio";

interface ExpandableCardProps {
  activeItem: ContentItemProps | null;
  onClose: () => void;
}

export function ExpandableCard({ activeItem, onClose }: ExpandableCardProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

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

  if (!activeItem) return null;

  return (
    <>
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full z-30"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 grid place-items-center z-40">
            <motion.button
              key={`button-${activeItem.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-black/60 border border-white/20 rounded-full h-8 w-8 text-white hover:bg-black/80 transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </motion.button>
            
            <motion.div
              layoutId={`card-${activeItem.id}`}
              ref={ref}
              className="w-full max-w-3xl h-full md:h-fit md:max-h-[90%] flex flex-col bg-black/80 border border-purple-500/30 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
              <div className="relative">
                <motion.div layoutId={`image-${activeItem.id}`}>
                  <AspectRatio ratio={16/9}>
                    <img
                      src={activeItem.imageUrl || '/placeholder.svg'}
                      alt={activeItem.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </motion.div>
                
                {activeItem.rating && (
                  <motion.div 
                    layoutId={`rating-${activeItem.id}`}
                    className="absolute top-2 right-2 flex items-center bg-black/70 text-yellow-400 px-2 py-1 rounded-full text-xs"
                  >
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {activeItem.rating}
                  </motion.div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${activeItem.id}`}
                      className="text-2xl font-bold text-white mb-1"
                    >
                      {activeItem.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`genre-${activeItem.id}`}
                      className="text-sm text-gray-300"
                    >
                      {activeItem.genre} • {activeItem.type === 'movie' ? activeItem.year : activeItem.album}
                    </motion.p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/40 border-purple-500/30 text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(219,39,119,0.3)]"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {activeItem.type === 'movie' ? 'Watch' : 'Listen'}
                  </Button>
                </div>
                
                <div className="pt-4 relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-200 space-y-4"
                  >
                    <p>{activeItem.description}</p>
                    
                    <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeItem.type === 'movie' ? (
                        <>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-2">Details</h4>
                            <ul className="space-y-1 text-sm">
                              <li><span className="text-gray-400">Year:</span> {activeItem.year}</li>
                              <li><span className="text-gray-400">Genre:</span> {activeItem.genre}</li>
                              <li><span className="text-gray-400">Rating:</span> {activeItem.rating}/10</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-2">Where to Watch</h4>
                            {activeItem.platform && (
                              <div className="flex flex-wrap gap-2">
                                {activeItem.platform.map((p, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-2">Track Details</h4>
                            <ul className="space-y-1 text-sm">
                              <li><span className="text-gray-400">Artist:</span> {activeItem.artist}</li>
                              <li><span className="text-gray-400">Album:</span> {activeItem.album}</li>
                              <li><span className="text-gray-400">Genre:</span> {activeItem.genre}</li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
