
import mongoose from 'mongoose';
import { ContentItemProps } from '@/components/ContentCard';
import { UserModel, SharedPlaylistModel, ISharedPlaylist } from './models';

// MongoDB connection string - replace with your actual connection string
// For development, you can use a local MongoDB instance or a free MongoDB Atlas cluster
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moodster-mix';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// User-related functions
export async function createOrUpdateUser(username: string, gender: 'male' | 'female') {
  try {
    await connectToDatabase();
    
    const user = await UserModel.findOneAndUpdate(
      { username },
      { username, gender },
      { upsert: true, new: true }
    );
    
    return user;
  } catch (error) {
    console.error('Failed to create/update user', error);
    throw error;
  }
}

export async function updateLikedContent(username: string, content: ContentItemProps) {
  try {
    await connectToDatabase();
    
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error('User not found');
    
    // Check if the content is already liked
    const existingIndex = user.likedContent.findIndex(item => item.id === content.id);
    
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
    
    const user = await UserModel.findOne({ username }).populate('sharedPlaylists');
    if (!user) throw new Error('User not found');
    
    return {
      likedContent: user.likedContent,
      watchlist: user.watchlist,
      playlist: user.playlist,
      sharedPlaylists: user.sharedPlaylists
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
    
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error('User not found');
    
    // Generate a unique share ID
    const shareId = generateShareId();
    
    const sharedPlaylist = await SharedPlaylistModel.create({
      name,
      description,
      mood,
      content,
      shareId,
      owner: username,
      isPublic
    });
    
    // Add reference to user's shared playlists
    user.sharedPlaylists.push(sharedPlaylist._id);
    await user.save();
    
    return sharedPlaylist;
  } catch (error) {
    console.error('Failed to create shared playlist', error);
    throw error;
  }
}

export async function getSharedPlaylist(shareId: string) {
  try {
    await connectToDatabase();
    
    const sharedPlaylist = await SharedPlaylistModel.findOne({ shareId, isPublic: true });
    if (!sharedPlaylist) throw new Error('Shared playlist not found or not public');
    
    return sharedPlaylist;
  } catch (error) {
    console.error('Failed to get shared playlist', error);
    throw error;
  }
}

export async function getUserSharedPlaylists(username: string) {
  try {
    await connectToDatabase();
    
    const user = await UserModel.findOne({ username }).populate('sharedPlaylists');
    if (!user) throw new Error('User not found');
    
    return user.sharedPlaylists;
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
