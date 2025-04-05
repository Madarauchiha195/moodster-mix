
// Mock database service
// This simulates a MongoDB connection for development purposes

import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';

// Simulate database connection
console.info("Simulating MongoDB connection");

// Mock database collections
const collections = {
  users: [],
  content: [],
  playlists: []
};

// Mock user data
const mockUsers = [
  {
    id: 'user1',
    username: 'johnsmith',
    gender: 'male',
    preferences: { genre: ['action', 'comedy'] }
  },
  {
    id: 'user2',
    username: 'janedoe',
    gender: 'female',
    preferences: { genre: ['drama', 'romance'] }
  }
];

// Simulated delay for async operations
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Export connectToDatabase for App.tsx
export const connectToDatabase = async () => {
  await simulateDelay();
  console.log("Database connection established");
  return true;
};

// User-related functions
export const createUser = async (username: string, gender: 'male' | 'female') => {
  await simulateDelay();
  const newUser = {
    id: `user${Date.now()}`,
    username,
    gender,
    preferences: { genre: [] }
  };
  
  mockUsers.push(newUser);
  return newUser;
};

export const getUserById = async (userId: string) => {
  await simulateDelay();
  return mockUsers.find(user => user.id === userId) || null;
};

export const updateUserPreferences = async (
  userId: string, 
  preferences: { genre?: string[], mood?: MoodType }
) => {
  await simulateDelay();
  
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) return null;
  
  const updatedUser = {
    ...mockUsers[userIndex],
    preferences: {
      ...mockUsers[userIndex].preferences,
      ...preferences
    }
  };
  
  mockUsers[userIndex] = updatedUser;
  return updatedUser;
};

// Playlist-related functions
export const createPlaylist = async (
  name: string,
  description: string,
  userId: string,
  mood: MoodType,
  items: ContentItemProps[]
) => {
  await simulateDelay();
  
  const playlistId = `playlist_${Date.now()}`;
  const newPlaylist = {
    id: playlistId,
    name,
    description,
    userId,
    mood,
    items,
    shareCode: generateShareCode(),
    createdAt: new Date().toISOString()
  };
  
  collections.playlists.push(newPlaylist);
  return playlistId; // Return just the ID for consistency with component usage
};

// Alias createPlaylist as createSharedPlaylist for backward compatibility
export const createSharedPlaylist = async (
  name: string,
  description: string,
  userId: string,
  username: string,
  items: ContentItemProps[],
  mood: MoodType
) => {
  // Adapt parameters to match the original createPlaylist function
  return createPlaylist(name, description, userId, mood, items);
};

export const getPlaylistByShareCode = async (shareCode: string) => {
  await simulateDelay();
  
  // @ts-ignore - Mock implementation
  return collections.playlists.find(playlist => playlist.shareCode === shareCode) || null;
};

// Alias for getPlaylistById to support getSharedPlaylist
export const getSharedPlaylist = async (playlistId: string) => {
  return getPlaylistById(playlistId);
};

export const getUserPlaylists = async (userId: string) => {
  await simulateDelay();
  
  // @ts-ignore - Mock implementation
  return collections.playlists.filter(playlist => playlist.userId === userId) || [];
};

// Helper functions
const generateShareCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Content-related functions
export const getLikedContent = async (userId: string | null) => {
  await simulateDelay();
  
  // Default to empty array if userId is null
  if (!userId) return [];
  
  const user = await getUserById(userId);
  if (!user) return [];
  
  // Mock logic to get liked content
  // In a real database, you would query the liked content collection
  return [];
};

export const savePlaylist = async (
  name: string,
  description: string,
  userId: string | null,
  mood: MoodType,
  items: ContentItemProps[]
) => {
  await simulateDelay();
  
  // If userId is null, create an anonymous playlist
  const playlistId = `playlist_${Date.now()}`;
  const userIdToUse = userId || 'anonymous';
  
  const newPlaylist = {
    id: playlistId,
    name,
    description,
    userId: userIdToUse,
    mood,
    items,
    shareCode: generateShareCode(),
    createdAt: new Date().toISOString()
  };
  
  // @ts-ignore - Mock implementation
  collections.playlists.push(newPlaylist);
  return newPlaylist;
};

export const getPlaylistById = async (playlistId: string) => {
  await simulateDelay();
  
  // @ts-ignore - Mock implementation
  const playlist = collections.playlists.find(playlist => playlist.id === playlistId);
  
  if (!playlist) {
    // For demo purposes, return a mock playlist with some content
    return {
      id: playlistId,
      name: "Demo Playlist",
      description: "This is a demo playlist with sample content",
      owner: "Demo User",
      mood: "happy" as MoodType,
      views: 123,
      content: [
        {
          id: "movie1",
          title: "The Matrix",
          description: "A computer hacker learns about the true nature of reality",
          imageUrl: "https://via.placeholder.com/300x450",
          type: "movie",
          year: 1999,
          rating: 8.7,
          genre: "Sci-Fi"
        },
        {
          id: "song1",
          title: "Bohemian Rhapsody",
          description: "A classic rock song by Queen",
          imageUrl: "https://via.placeholder.com/300x300",
          type: "song",
          artist: "Queen",
          album: "A Night at the Opera",
          year: 1975,
          genre: "Rock"
        }
      ]
    };
  }
  
  return playlist;
};

// Export the mock collections for testing
export const getMockCollections = () => collections;
