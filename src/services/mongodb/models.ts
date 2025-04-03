
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { ContentItemProps } from '@/components/ContentCard';

// Define interfaces for MongoDB documents
export interface IUser extends Document {
  username: string;
  gender: 'male' | 'female';
  likedContent: ContentItemProps[];
  watchlist: ContentItemProps[];
  playlist: ContentItemProps[];
  sharedPlaylists: Types.ObjectId[];
}

export interface ISharedPlaylist extends Document {
  name: string;
  description: string;
  mood: string;
  content: ContentItemProps[];
  shareId: string;
  owner: string;
  isPublic: boolean;
  createdAt: Date;
}

// Define MongoDB schemas
const ContentItemSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  type: String,
  imageUrl: String,
  rating: Number,
  platform: [String],
  genre: String,
  year: Number,
  artist: String,
  album: String,
  url: String
}, { _id: false });

const SharedPlaylistSchema = new Schema({
  name: String,
  description: String,
  mood: String,
  content: [ContentItemSchema],
  shareId: { type: String, unique: true },
  owner: String,
  isPublic: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  likedContent: [ContentItemSchema],
  watchlist: [ContentItemSchema],
  playlist: [ContentItemSchema],
  sharedPlaylists: [{ type: Schema.Types.ObjectId, ref: 'SharedPlaylist' }]
});

// Create model variables with proper typing
let UserModel: Model<IUser> | null = null;
let SharedPlaylistModel: Model<ISharedPlaylist> | null = null;

// Function to initialize models - must be called after mongoose connects
export function initializeModels() {
  // Check if models already exist to prevent "Cannot overwrite model" errors
  try {
    UserModel = mongoose.models.User as Model<IUser> || 
      mongoose.model<IUser>('User', UserSchema);
    
    SharedPlaylistModel = mongoose.models.SharedPlaylist as Model<ISharedPlaylist> || 
      mongoose.model<ISharedPlaylist>('SharedPlaylist', SharedPlaylistSchema);
      
    return { UserModel, SharedPlaylistModel };
  } catch (error) {
    console.error("Error initializing models:", error);
    throw error;
  }
}

// Export the models
export { UserModel, SharedPlaylistModel };
