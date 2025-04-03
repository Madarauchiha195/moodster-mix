
import mongoose, { Document, Schema } from 'mongoose';
import { ContentItemProps } from '@/components/ContentCard';

// Define interfaces for MongoDB documents
export interface IUser extends Document {
  username: string;
  gender: 'male' | 'female';
  likedContent: ContentItemProps[];
  watchlist: ContentItemProps[];
  playlist: ContentItemProps[];
  sharedPlaylists: ISharedPlaylist[];
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
  username: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  likedContent: [ContentItemSchema],
  watchlist: [ContentItemSchema],
  playlist: [ContentItemSchema],
  sharedPlaylists: [{ type: Schema.Types.ObjectId, ref: 'SharedPlaylist' }]
});

// Create models
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const SharedPlaylistModel = mongoose.models.SharedPlaylist || 
  mongoose.model<ISharedPlaylist>('SharedPlaylist', SharedPlaylistSchema);
