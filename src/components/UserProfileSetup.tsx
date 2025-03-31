
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { User, Phone, AtSign, Music } from 'lucide-react';

interface UserProfileSetupProps {
  gender: 'male' | 'female';
  onComplete: () => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ gender, onComplete }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save this data to a database
    // For now, we just move forward
    onComplete();
  };

  const inputClasses = cn(
    "transition-all duration-300",
    gender === 'male' 
      ? "focus:border-mood-male-primary focus:ring-mood-male-primary/10" 
      : "focus:border-mood-female-primary focus:ring-mood-female-primary/10"
  );

  const buttonClasses = cn(
    "w-full mt-6 transition-all duration-300",
    gender === 'male' 
      ? "bg-mood-male-primary hover:bg-mood-male-secondary" 
      : "bg-mood-female-primary hover:bg-mood-female-secondary text-white"
  );

  return (
    <div className={cn(
      "w-full max-w-md mx-auto p-6 rounded-lg shadow-md animate-fade-in",
      gender === 'male' ? "bg-mood-male-darkgray/10" : "bg-mood-female-secondary/10"
    )}>
      <h2 className={cn(
        "text-2xl font-bold text-center mb-8",
        gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
      )}>
        Create Your Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username" className="flex items-center gap-2">
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
          <Label htmlFor="userId" className="flex items-center gap-2">
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
          <Label htmlFor="phone" className="flex items-center gap-2">
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
          <Label htmlFor="spotify" className="flex items-center gap-2">
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
        
        <Button type="submit" className={buttonClasses}>
          Complete Profile
        </Button>
      </form>
    </div>
  );
};

export default UserProfileSetup;
