import mongoose, { Model } from 'mongoose';
import { ContentItemProps } from '@/components/ContentCard';
import { initializeModels, IUser, ISharedPlaylist, ObjectId } from './models';

// MongoDB connection string - use a fallback for development
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/moodster-mix';

// Mongoose connection cache - use globalThis instead of global for browser compatibility
const globalWithMongoose = globalThis as unknown as {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    initialized: boolean;
  };
};

// Initialize the cache if it doesn't exist
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
    initialized: false
  };
}

// Get the cached connection
const cached = globalWithMongoose.mongoose;

// Models - we'll initialize these after connection
let UserModel: Model<IUser>;
let SharedPlaylistModel: Model<ISharedPlaylist>;

export async function connectToDatabase() {
  if (cached?.conn && cached.initialized) {
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
    
    // Initialize models after successful connection
    if (!cached!.initialized) {
      const models = initializeModels();
      UserModel = models.UserModel!;
      SharedPlaylistModel = models.SharedPlaylistModel!;
      cached!.initialized = true;
      console.log('Mongoose models initialized');
    }
    
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
    const existingUser = await UserModel.findOne({ username }).lean().exec();
    
    if (existingUser) {
      // Update existing user
      const updatedUser = await UserModel.findOneAndUpdate(
        { username },
        { gender },
        { new: true }
      ).lean().exec();
      
      return updatedUser;
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
      .lean()
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
    
    // Create playlist
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
    })
    .lean()
    .exec();
    
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
    
    // Find the user first
    const user = await UserModel.findOne({ username }).exec();
    if (!user) throw new Error('User not found');
    
    // Fix: Type-safe conversion of shared playlist IDs to ObjectId type
    const playlistIds: mongoose.Types.ObjectId[] = [];
    
    // Safely convert each ID to an ObjectId
    if (user.sharedPlaylists && Array.isArray(user.sharedPlaylists)) {
      for (const idItem of user.sharedPlaylists) {
        try {
          // Handle string IDs
          if (typeof idItem === 'string') {
            playlistIds.push(new mongoose.Types.ObjectId(idItem));
          } 
          // Handle ObjectId instances
          else if (idItem instanceof mongoose.Types.ObjectId) {
            playlistIds.push(idItem);
          } 
          // Handle object references with explicit type checking and casting
          else if (idItem && typeof idItem === 'object') {
            // First, check if it's an object with _id property
            if ('_id' in idItem) {
              const objWithId = idItem as { _id: string | mongoose.Types.ObjectId };
              const idString = typeof objWithId._id === 'string' 
                ? objWithId._id 
                : objWithId._id.toString();
              playlistIds.push(new mongoose.Types.ObjectId(idString));
            }
            // If it has a toString method, use that
            else if (typeof (idItem as { toString?: () => string }).toString === 'function') {
              const stringifiable = idItem as { toString: () => string };
              playlistIds.push(new mongoose.Types.ObjectId(stringifiable.toString()));
            }
            // Last resort: try to stringify the object and extract an id
            else {
              const idString = String(idItem).replace(/[^0-9a-fA-F]/g, '');
              if (idString.length === 24) { // Valid ObjectId is 24 hex chars
                playlistIds.push(new mongoose.Types.ObjectId(idString));
              }
            }
          }
        } catch (err) {
          console.error('Error converting ID:', err);
          // Skip invalid IDs
        }
      }
    }
    
    // Then get their playlists using the ids stored in user.sharedPlaylists
    const playlists = await SharedPlaylistModel.find({
      _id: { $in: playlistIds }
    })
    .lean()
    .exec();
    
    return playlists || [];
  } catch (error) {
    console.error('Failed to get user shared playlists:', error);
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
