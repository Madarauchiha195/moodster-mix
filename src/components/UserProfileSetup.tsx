
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { User, Phone, AtSign, Music, Moon, Sun } from 'lucide-react';
import { MoodType } from './MoodSelection';

interface UserProfileSetupProps {
  gender: 'male' | 'female' | null;
  mood: MoodType;
  onComplete: (username: string, themeChoice: 'male' | 'female') => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ gender, mood, onComplete }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');
  const [themeChoice, setThemeChoice] = useState<'male' | 'female'>(gender || 'female');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass both the username and theme choice to the parent component
    onComplete(username, themeChoice);
  };

  const darkMode = themeChoice === 'female';

  const inputClasses = cn(
    "transition-all duration-300 bg-gray-900 border-gray-700 text-white",
    darkMode 
      ? "focus:border-mood-female-primary focus:ring-mood-female-primary/10" 
      : "focus:border-mood-male-primary focus:ring-mood-male-primary/10"
  );

  const buttonClasses = cn(
    "w-full mt-6 transition-all duration-300",
    darkMode 
      ? "bg-mood-female-primary hover:bg-mood-female-secondary text-white" 
      : "bg-mood-male-primary hover:bg-mood-male-secondary"
  );

  return (
    <div className={cn(
      "w-full max-w-md mx-auto p-6 rounded-lg shadow-md animate-fade-in",
      darkMode ? "bg-gray-900/80" : "bg-gray-900/80"
    )}>
      <h2 className={cn(
        "text-2xl font-bold text-center mb-8",
        darkMode ? "text-mood-female-primary" : "text-mood-male-primary"
      )}>
        Create Your Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="mt-6">
          <Label className="flex items-center gap-2 text-white mb-3">
            Select Your Theme
          </Label>
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              variant="outline"
              className={cn(
                "flex flex-col items-center justify-center h-24 w-full transition-all duration-300 bg-gray-800",
                themeChoice === 'male' ? "border-mood-male-primary border-2" : ""
              )}
              onClick={() => setThemeChoice('male')}
            >
              <Sun size={24} className="mb-1 text-mood-male-primary" />
              <span className="text-white">Light Mode</span>
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className={cn(
                "flex flex-col items-center justify-center h-24 w-full transition-all duration-300 bg-gray-800",
                themeChoice === 'female' ? "border-mood-female-primary border-2" : ""
              )}
              onClick={() => setThemeChoice('female')}
            >
              <Moon size={24} className="mb-1 text-mood-female-primary" />
              <span className="text-white">Dark Mode</span>
            </Button>
          </div>
        </div>
        
        <Button type="submit" className={buttonClasses}>
          Complete Profile
        </Button>
      </form>
    </div>
  );
};

export default UserProfileSetup;
