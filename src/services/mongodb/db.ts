
import { connectDB } from './connection';
import { IUser, ISharedPlaylist, initializeModels } from './models';
import { Types } from 'mongoose';
import { ContentItemProps } from '@/components/ContentCard';

// Database connection instance
let connection: any = null;

/**
 * Establishes a connection to MongoDB
 */
export const connectToDatabase = async () => {
  try {
    // This is a mock implementation for browser environment
    // In a real app, this would connect to a backend API
    console.log('Simulating MongoDB connection in browser');
    connection = true;
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

/**
 * Creates a new user or updates an existing one
 */
export const createOrUpdateUser = async (username: string, gender: 'male' | 'female') => {
  try {
    // Simulated user creation/update
    console.log(`User ${username} (${gender}) saved`);
    return { id: new Types.ObjectId().toString(), username, gender };
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
};

/**
 * Creates a new shared playlist
 */
export const createSharedPlaylist = async (
  username: string,
  mood: string,
  contentItems: ContentItemProps[],
  playlistName?: string
) => {
  try {
    const playlistId = new Types.ObjectId().toString();
    
    console.log('Created shared playlist:', {
      id: playlistId,
      name: playlistName || `${username}'s ${mood} Mix`,
      creator: username,
      mood,
      items: contentItems.length
    });
    
    return {
      shareId: playlistId,
      name: playlistName || `${username}'s ${mood} Mix`
    };
  } catch (error) {
    console.error('Error creating shared playlist:', error);
    throw error;
  }
};

/**
 * Gets a shared playlist by ID
 */
export const getSharedPlaylist = async (id: string) => {
  try {
    // In a real app, this would fetch from a database
    // This is mocked for demonstration
    console.log(`Fetching shared playlist with id: ${id}`);
    
    // Return mock data
    return {
      _id: id,
      name: "Sample Shared Playlist",
      creator: "SampleUser",
      mood: "happy",
      dateCreated: new Date(),
      items: [
        {
          id: 1,
          title: "Guardians of the Galaxy",
          description: "A group of intergalactic criminals must pull together to stop a fanatical warrior from taking control of the universe.",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
          rating: 8.0,
          platform: ["Netflix", "Disney+"],
          genre: "Action, Adventure, Comedy",
          year: 2014
        },
        {
          id: 201,
          title: "Blinding Lights",
          description: "A synth-pop, electropop song with new wave elements.",
          type: "song",
          artist: "The Weeknd",
          album: "After Hours",
          genre: "Synth-pop",
          year: 2020,
          imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching shared playlist:', error);
    throw error;
  }
};

/**
 * Gets all shared playlists created by a user
 */
export const getUserSharedPlaylists = async (userId: string) => {
  try {
    // Validate and convert userId to ObjectId if needed
    let userObjectId: Types.ObjectId;
    
    // Handle different types of userId inputs
    if (typeof userId === 'string') {
      try {
        userObjectId = new Types.ObjectId(userId);
      } catch (error) {
        console.error('Invalid user ID format:', error);
        return [];
      }
    } else if (userId instanceof Types.ObjectId) {
      userObjectId = userId;
    } else {
      console.error('Invalid user ID type:', typeof userId);
      return [];
    }
    
    console.log(`Fetching shared playlists for user: ${userObjectId.toString()}`);
    
    // Return mock data
    return [
      {
        _id: new Types.ObjectId().toString(),
        name: "My Happy Mix",
        creator: "User",
        mood: "happy",
        dateCreated: new Date(),
        itemCount: 10
      },
      {
        _id: new Types.ObjectId().toString(),
        name: "Chill Evening Playlist",
        creator: "User",
        mood: "neutral",
        dateCreated: new Date(),
        itemCount: 8
      }
    ];
  } catch (error) {
    console.error('Error fetching user shared playlists:', error);
    return [];
  }
};

/**
 * Saves a user's liked content
 */
export const saveLikedContent = async (userId: string, contentItems: ContentItemProps[]) => {
  try {
    console.log(`Saving ${contentItems.length} liked items for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error saving liked content:', error);
    return false;
  }
};

/**
 * Gets a user's liked content
 */
export const getLikedContent = async (userId: string) => {
  try {
    console.log(`Fetching liked content for user ${userId}`);
    
    // Return empty array as mock data
    return [];
  } catch (error) {
    console.error('Error fetching liked content:', error);
    return [];
  }
};

/**
 * Saves a user's watchlist
 */
export const saveWatchlist = async (userId: string, watchlist: ContentItemProps[]) => {
  try {
    console.log(`Saving watchlist with ${watchlist.length} items for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error saving watchlist:', error);
    return false;
  }
};

/**
 * Gets a user's watchlist
 */
export const getWatchlist = async (userId: string) => {
  try {
    console.log(`Fetching watchlist for user ${userId}`);
    
    // Return empty array as mock data
    return [];
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
};

/**
 * Adds an item to a user's watchlist
 */
export const addToWatchlist = async (userId: string, item: ContentItemProps) => {
  try {
    console.log(`Adding item ${item.id} to watchlist for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

/**
 * Removes an item from a user's watchlist
 */
export const removeFromWatchlist = async (userId: string, itemId: number) => {
  try {
    console.log(`Removing item ${itemId} from watchlist for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

/**
 * Saves a user's playlist
 */
export const savePlaylist = async (userId: string, playlist: ContentItemProps[]) => {
  try {
    console.log(`Saving playlist with ${playlist.length} items for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error saving playlist:', error);
    return false;
  }
};

/**
 * Gets a user's playlist
 */
export const getPlaylist = async (userId: string) => {
  try {
    console.log(`Fetching playlist for user ${userId}`);
    
    // Return empty array as mock data
    return [];
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return [];
  }
};

/**
 * Adds an item to a user's playlist
 */
export const addToPlaylist = async (userId: string, item: ContentItemProps) => {
  try {
    console.log(`Adding item ${item.id} to playlist for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error adding to playlist:', error);
    return false;
  }
};

/**
 * Removes an item from a user's playlist
 */
export const removeFromPlaylist = async (userId: string, itemId: number) => {
  try {
    console.log(`Removing item ${itemId} from playlist for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error removing from playlist:', error);
    return false;
  }
};
