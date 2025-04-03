
import mongoose from 'mongoose';
import { ContentItemProps } from '@/components/ContentCard';
import { UserModel, SharedPlaylistModel, IUser, ISharedPlaylist } from './models';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moodster-mix';

let cached = global.mongoose as { conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null } | undefined;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log('MongoDB connected successfully');
    return cached!.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// User-related functions
export async function createOrUpdateUser(username: string, gender: 'male' | 'female') {
  try {
    await connectToDatabase();
    
    // First check if user exists
    const existingUser = await UserModel.findOne({ username }).exec();
    
    if (existingUser) {
      // Update existing user
      existingUser.gender = gender;
      await existingUser.save();
      return existingUser.toObject();
    } else {
      // Create new user
      const newUser = new UserModel({ 
        username, 
        gender,
        likedContent: [],
        watchlist: [],
        playlist: [],
        sharedPlaylists: []
      });
      await newUser.save();
      return newUser.toObject();
    }
  } catch (error) {
    console.error('Failed to create/update user', error);
    throw error;
  }
}

export async function updateLikedContent(username: string, content: ContentItemProps) {
  try {
    await connectToDatabase();
    
    // Get user document
    const user = await UserModel.findOne({ username }).exec();
    if (!user) throw new Error('User not found');
    
    // Check if the content is already liked
    const existingIndex = user.likedContent.findIndex(
      (item: ContentItemProps) => item.id === content.id
    );
    
    if (existingIndex > -1) {
      // Remove if already liked
      user.likedContent.splice(existingIndex, 1);
    } else {
      // Add if not liked
      user.likedContent.push(content);
    }
    
    await user.save();
    return user.likedContent;
  } catch (error) {
    console.error('Failed to update liked content', error);
    throw error;
  }
}

export async function getUserContent(username: string) {
  try {
    await connectToDatabase();
    
    // Get user with populated shared playlists
    const user = await UserModel.findOne({ username })
      .populate('sharedPlaylists')
      .exec();
      
    if (!user) throw new Error('User not found');
    
    return {
      likedContent: user.likedContent || [],
      watchlist: user.watchlist || [],
      playlist: user.playlist || [],
      sharedPlaylists: user.sharedPlaylists || []
    };
  } catch (error) {
    console.error('Failed to get user content', error);
    throw error;
  }
}

// Shared Playlist functions
export async function createSharedPlaylist(
  username: string, 
  name: string, 
  description: string, 
  mood: string, 
  content: ContentItemProps[],
  isPublic: boolean = true
) {
  try {
    await connectToDatabase();
    
    // Find user
    const user = await UserModel.findOne({ username }).exec();
    if (!user) throw new Error('User not found');
    
    // Generate a unique share ID
    const shareId = generateShareId();
    
    // Create playlist as a model instance first
    const newPlaylist = new SharedPlaylistModel({
      name,
      description,
      mood,
      content,
      shareId,
      owner: username,
      isPublic
    });
    
    // Save the playlist
    const savedPlaylist = await newPlaylist.save();
    
    // Add reference to user's shared playlists
    user.sharedPlaylists.push(savedPlaylist._id);
    await user.save();
    
    return savedPlaylist.toObject();
  } catch (error) {
    console.error('Failed to create shared playlist', error);
    throw error;
  }
}

export async function getSharedPlaylist(shareId: string) {
  try {
    await connectToDatabase();
    
    const sharedPlaylist = await SharedPlaylistModel.findOne({ 
      shareId, 
      isPublic: true 
    }).exec();
    
    if (!sharedPlaylist) throw new Error('Shared playlist not found or not public');
    
    return sharedPlaylist.toObject();
  } catch (error) {
    console.error('Failed to get shared playlist', error);
    throw error;
  }
}

export async function getUserSharedPlaylists(username: string) {
  try {
    await connectToDatabase();
    
    const user = await UserModel.findOne({ username })
      .populate('sharedPlaylists')
      .exec();
      
    if (!user) throw new Error('User not found');
    
    return user.sharedPlaylists || [];
  } catch (error) {
    console.error('Failed to get user shared playlists', error);
    throw error;
  }
}

// Helper function to generate a unique share ID
function generateShareId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
