
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
  return newPlaylist;
};

export const getPlaylistByShareCode = async (shareCode: string) => {
  await simulateDelay();
  
  // @ts-ignore - Mock implementation
  return collections.playlists.find(playlist => playlist.shareCode === shareCode) || null;
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
  return collections.playlists.find(playlist => playlist.id === playlistId) || null;
};

// Export the mock collections for testing
export const getMockCollections = () => collections;
