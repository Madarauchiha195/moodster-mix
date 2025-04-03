
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ContentCard, { ContentItemProps } from './ContentCard';
import { MoodType } from './MoodSelection';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ExpandableCard } from './ui/expandable-card';
import { ScrollArea } from './ui/scroll-area';
import SharedPlaylistCreator from './SharedPlaylistCreator';

// Sample data for recommendations
import { getRecommendedContent } from '@/data/recommendations';

interface ContentRecommendationsProps {
  mood: MoodType;
  gender: 'male' | 'female';
  onLikeContent?: (item: ContentItemProps) => void;
  likedContent: ContentItemProps[];
  username: string;
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({ 
  mood,
  gender,
  onLikeContent,
  likedContent = [],
  username
}) => {
  const [activeTab, setActiveTab] = React.useState<'movies' | 'music'>('movies');
  const [activeItem, setActiveItem] = useState<ContentItemProps | null>(null);
  
  // Get content recommendations based on mood
  const recommendedContent = getRecommendedContent(mood);
  
  const movies = recommendedContent.filter(item => item.type === 'movie');
  const music = recommendedContent.filter(item => item.type === 'song');

  // Organize movies by genres
  const movieGenres = [...new Set(movies.map(movie => movie.genre).filter(Boolean)
    .flatMap(genre => genre ? genre.split(', ') : []))];
  
  const moviesByGenre = movieGenres.reduce((acc, genre) => {
    if (genre) {
      acc[genre] = movies.filter(movie => movie.genre?.includes(genre));
    }
    return acc;
  }, {} as Record<string, ContentItemProps[]>);

  // Organize songs by artists
  const songArtists = [...new Set(music.map(song => song.artist).filter(Boolean))];
  const songsByArtist = songArtists.reduce((acc, artist) => {
    if (artist) {
      acc[artist] = music.filter(song => song.artist === artist);
    }
    return acc;
  }, {} as Record<string, ContentItemProps[]>);

  const handleOpenDetails = (item: ContentItemProps) => {
    setActiveItem(item);
  };

  const handleCloseDetails = () => {
    setActiveItem(null);
  };

  const handleLike = (item: ContentItemProps) => {
    if (onLikeContent) {
      onLikeContent(item);
    }
  };

  // Check if an item is liked
  const isItemLiked = (item: ContentItemProps) => {
    return likedContent.some(likedItem => likedItem.id === item.id);
  };
  
  const handlePlaylistCreated = (playlistId: string) => {
    console.log('Playlist created with ID:', playlistId);
  };

  return (
    <ScrollArea className="w-full h-[calc(100vh-120px)] overflow-y-auto">
      <div className="w-full px-2 pb-12">
        <div className="flex justify-between mb-4 sm:mb-6">
          <div className="flex rounded-full p-1 bg-black/40 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('movies')}
              className={cn(
                "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
                activeTab === 'movies' ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "",
                activeTab !== 'movies' ? "text-gray-300 hover:text-white" : ""
              )}
            >
              Movies & Shows
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={cn(
                "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
                activeTab === 'music' ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "",
                activeTab !== 'music' ? "text-gray-300 hover:text-white" : ""
              )}
            >
              Music
            </button>
          </div>
          
          {/* Add playlist creator */}
          <SharedPlaylistCreator 
            username={username}
            currentMood={mood}
            contentItems={recommendedContent}
            onPlaylistCreated={handlePlaylistCreated}
          />
        </div>
        
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pl-2 sm:pl-4 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
            {activeTab === 'movies' ? 'Recommended Movies & Shows' : 'Recommended Music'}
            <span className="text-xl sm:text-2xl ml-2 opacity-70 text-white">
              for your {mood} mood
            </span>
          </h2>
          
          {activeTab === 'movies' ? (
            <div className="space-y-12">
              {/* Featured section */}
              <div className="mb-8">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                  }}
                  className="w-full mx-auto relative px-4 md:px-8"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {movies.slice(0, 5).map((item) => (
                      <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                        <div className="px-1">
                          <ContentCard 
                            item={item} 
                            gender={gender} 
                            onOpenDetails={handleOpenDetails} 
                            onLike={handleLike}
                            isLiked={isItemLiked(item)} 
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-start z-10 pointer-events-none">
                    <CarouselPrevious className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                  </div>
                  <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end z-10 pointer-events-none">
                    <CarouselNext className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                  </div>
                </Carousel>
              </div>

              {/* Genre-based sections */}
              {movieGenres.map((genre) => genre && (
                <div key={genre} className="mb-10">
                  <h3 className="text-lg font-bold mb-3 pl-2 text-white tracking-wide">
                    {genre} <span className="text-sm text-gray-300">Movies</span>
                  </h3>
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                      dragFree: true,
                    }}
                    className="w-full mx-auto relative px-4 md:px-8"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {moviesByGenre[genre]?.map((item) => (
                        <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                          <div className="px-1">
                            <ContentCard 
                              item={item} 
                              gender={gender} 
                              onOpenDetails={handleOpenDetails} 
                              onLike={handleLike}
                              isLiked={isItemLiked(item)}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-start z-10 pointer-events-none">
                      <CarouselPrevious className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                    </div>
                    <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end z-10 pointer-events-none">
                      <CarouselNext className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                    </div>
                  </Carousel>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured music section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 pl-2 text-white tracking-wide">
                  Top Picks <span className="text-sm text-gray-300">for you</span>
                </h3>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                  }}
                  className="w-full mx-auto relative px-4 md:px-8"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {music.slice(0, 5).map((item) => (
                      <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                        <div className="px-1">
                          <ContentCard 
                            item={item} 
                            gender={gender} 
                            onOpenDetails={handleOpenDetails} 
                            onLike={handleLike}
                            isLiked={isItemLiked(item)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-start z-10 pointer-events-none">
                    <CarouselPrevious className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                  </div>
                  <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end z-10 pointer-events-none">
                    <CarouselNext className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                  </div>
                </Carousel>
              </div>

              {/* Artist-based sections */}
              {songArtists.map((artist) => artist && (
                <div key={artist} className="mb-10">
                  <h3 className="text-lg font-bold mb-3 pl-2 text-white tracking-wide">
                    {artist}
                  </h3>
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                      dragFree: true,
                    }}
                    className="w-full mx-auto relative px-4 md:px-8"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {songsByArtist[artist]?.map((item) => (
                        <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                          <div className="px-1">
                            <ContentCard 
                              item={item} 
                              gender={gender} 
                              onOpenDetails={handleOpenDetails} 
                              onLike={handleLike}
                              isLiked={isItemLiked(item)}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-start z-10 pointer-events-none">
                      <CarouselPrevious className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                    </div>
                    <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end z-10 pointer-events-none">
                      <CarouselNext className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
                    </div>
                  </Carousel>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Expandable Card */}
      <ExpandableCard 
        activeItem={activeItem} 
        onClose={handleCloseDetails} 
        onLike={handleLike}
        isLiked={activeItem ? isItemLiked(activeItem) : false}
      />
    </ScrollArea>
  );
};

export default ContentRecommendations;
