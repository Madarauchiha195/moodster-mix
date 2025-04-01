
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { User, Phone, AtSign, Music } from 'lucide-react';
import { MoodType } from './MoodSelection';
import { CardSpotlight } from '@/components/ui/card-spotlight';

interface UserProfileSetupProps {
  gender: 'male' | 'female' | null;
  mood: MoodType;
  onComplete: (username: string) => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ mood, onComplete }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the username to the parent component
    onComplete(username);
  };

  const inputClasses = cn(
    "transition-all duration-300 bg-gray-900/80 border-gray-700 text-white mt-2",
    "focus:border-purple-500 focus:ring-purple-500/10"
  );

  return (
    <CardSpotlight className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md animate-fade-in backdrop-blur-md bg-black/60">
      <h2 className="text-2xl font-bold text-center mb-8 text-white relative z-10">
        Create Your Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div>
          <Label htmlFor="username" className="flex items-center gap-2 text-white">
            <User size={16} /> Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="userId" className="flex items-center gap-2 text-white">
            <AtSign size={16} /> User ID
          </Label>
          <Input
            id="userId"
            type="text"
            placeholder="Create a unique ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 text-white">
            <Phone size={16} /> Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="spotify" className="flex items-center gap-2 text-white">
            <Music size={16} /> Spotify Link
          </Label>
          <Input
            id="spotify"
            type="text"
            placeholder="Link your Spotify account (optional)"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
            className={inputClasses}
          />
        </div>
        
        <button
          type="submit"
          className="group/btn relative block h-10 w-full mt-6 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
        >
          Complete Profile
          <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
          <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </button>
      </form>
    </CardSpotlight>
  );
};

export default UserProfileSetup;
