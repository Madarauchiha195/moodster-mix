
// Default images for different content types
const DEFAULT_MOVIE_IMAGES = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Movie popcorn
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Theater
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Film reel
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" // Clapperboard
];

const DEFAULT_MUSIC_IMAGES = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Music studio
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Colorful music
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Vinyl record
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" // Concert
];

// Get a fallback image for content without images
export const getFallbackImage = (item: { id: number; type: string }) => {
  const seed = item.id.toString().charCodeAt(0) || 0;
  const defaultImages = item.type === 'movie' ? DEFAULT_MOVIE_IMAGES : DEFAULT_MUSIC_IMAGES;
  const index = seed % defaultImages.length;
  return defaultImages[index];
};

// Try to get a better image for the content
export const getEnhancedImageUrl = (item: { 
  imageUrl?: string; 
  id: number; 
  type: string; 
  artist?: string; 
  title?: string 
}) => {
  if (item.imageUrl && !item.imageUrl.includes('unsplash.com/random')) {
    return item.imageUrl;
  }
  
  // For movies, construct a potential movie poster URL
  if (item.type === 'movie') {
    // The actual implementation would ideally use a movie API
    return `https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`;
  } 
  
  // For music, try to get album art
  if (item.type === 'song' && item.artist && item.title) {
    // The actual implementation would ideally use a music API
    return `https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`;
  }
  
  // Fallback to a themed image if all else fails
  return getFallbackImage({ id: item.id, type: item.type });
};
