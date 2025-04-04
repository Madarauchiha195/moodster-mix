
import { connectDB, isConnected, closeConnection } from './connection';
import { IUser, ISharedPlaylist } from './models';
import { ObjectId } from 'mongodb';

// Simulated data storage for browser environment
let users: any[] = [];
let sharedPlaylists: any[] = [];

/**
 * Creates a new user
 */
export const createUser = async (username: string, gender: 'male' | 'female'): Promise<any> => {
  try {
    await connectDB();
    
    const userId = Date.now().toString();
    const newUser = {
      _id: userId,
      username,
      gender,
      createdAt: new Date(),
      updatedAt: new Date(),
      likedContent: []
    };
    
    users.push(newUser);
    console.log('User created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Retrieves a user by username
 */
export const getUserByUsername = async (username: string): Promise<any> => {
  try {
    await connectDB();
    
    const user = users.find(u => u.username === username);
    return user || null;
  } catch (error) {
    console.error('Error getting user by username:', error);
    throw error;
  }
};

/**
 * Updates a user's information
 */
export const updateUser = async (userId: string, updateData: any): Promise<any> => {
  try {
    await connectDB();
    
    const userIndex = users.findIndex(u => u._id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    users[userIndex] = updatedUser;
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Adds content to a user's liked content
 */
export const addLikedContent = async (userId: string, contentItem: any): Promise<any> => {
  try {
    await connectDB();
    
    const userIndex = users.findIndex(u => u._id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Check if content is already liked
    const isAlreadyLiked = users[userIndex].likedContent.some((item: any) => item.id === contentItem.id);
    
    if (!isAlreadyLiked) {
      users[userIndex].likedContent.push(contentItem);
      users[userIndex].updatedAt = new Date();
    }
    
    return users[userIndex];
  } catch (error) {
    console.error('Error adding liked content:', error);
    throw error;
  }
};

/**
 * Removes content from a user's liked content
 */
export const removeLikedContent = async (userId: string, contentId: number): Promise<any> => {
  try {
    await connectDB();
    
    const userIndex = users.findIndex(u => u._id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex].likedContent = users[userIndex].likedContent.filter(
      (item: any) => item.id !== contentId
    );
    users[userIndex].updatedAt = new Date();
    
    return users[userIndex];
  } catch (error) {
    console.error('Error removing liked content:', error);
    throw error;
  }
};

/**
 * Creates a shared playlist
 */
export const createSharedPlaylist = async (
  name: string, 
  description: string, 
  ownerId: string, 
  ownerName: string, 
  content: any[],
  mood: string
): Promise<string> => {
  try {
    await connectDB();
    
    const playlistId = `playlist_${Date.now()}`;
    const newPlaylist = {
      _id: playlistId,
      name,
      description,
      ownerId,
      owner: ownerName,
      content,
      mood,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0
    };
    
    sharedPlaylists.push(newPlaylist);
    console.log('Shared playlist created:', newPlaylist);
    
    return playlistId;
  } catch (error) {
    console.error('Error creating shared playlist:', error);
    throw error;
  }
};

/**
 * Retrieves a shared playlist by ID
 */
export const getSharedPlaylist = async (playlistId: string): Promise<any> => {
  try {
    await connectDB();
    
    const playlist = sharedPlaylists.find(p => p._id === playlistId);
    
    if (playlist) {
      // Increment view count
      playlist.views = (playlist.views || 0) + 1;
    }
    
    return playlist || null;
  } catch (error) {
    console.error('Error getting shared playlist:', error);
    throw error;
  }
};

/**
 * Gets all playlists shared by a user
 */
export const getUserSharedPlaylists = async (userId: string): Promise<any[]> => {
  try {
    await connectDB();
    
    // Ensure userId is a string for comparison
    const stringUserId = typeof userId === 'object' ? 
      (userId.toString ? userId.toString() : String(userId)) : 
      String(userId);
    
    return sharedPlaylists.filter(p => String(p.ownerId) === stringUserId);
  } catch (error) {
    console.error('Error getting user shared playlists:', error);
    throw error;
  }
};

// For development/testing purposes
export const clearAllData = () => {
  users = [];
  sharedPlaylists = [];
  console.log('All data cleared');
};

// Initialize with some data for development
export const initDevelopmentData = () => {
  // Add a test user if none exists
  if (users.length === 0) {
    const testUser = {
      _id: 'user_1',
      username: 'testuser',
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date(),
      likedContent: []
    };
    users.push(testUser);
  }
  
  // Add a test playlist if none exists
  if (sharedPlaylists.length === 0) {
    const testPlaylist = {
      _id: 'playlist_1',
      name: 'My Favorite Movies',
      description: 'A collection of my favorite movies and shows',
      ownerId: 'user_1',
      owner: 'testuser',
      content: [
        {
          id: 101,
          title: 'Inception',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
          type: 'movie',
          imageUrl: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          rating: 8.8,
          platform: ['Netflix', 'Amazon Prime'],
          genre: 'Sci-Fi',
          year: 2010
        },
        {
          id: 201,
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          album: 'A Night at the Opera',
          description: 'A British rock band formed in London in 1970, widely regarded as one of the greatest rock bands of all time.',
          type: 'song',
          imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          genre: 'Rock',
          year: 1975
        }
      ],
      mood: 'happy',
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 12
    };
    sharedPlaylists.push(testPlaylist);
  }
  
  console.log('Development data initialized');
};

// Initialize development data when imported
initDevelopmentData();
