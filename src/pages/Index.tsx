
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MoodSelection, { MoodType } from '@/components/MoodSelection';
import UserProfileSetup from '@/components/UserProfileSetup';
import ContentRecommendations from '@/components/ContentRecommendations';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import { ContentItemProps } from '@/components/ContentCard';
import { toast as sonnerToast } from "sonner";

// Sample data for user's saved content
const sampleWatchlist: ContentItemProps[] = [
  {
    id: 101,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    type: "movie",
    rating: 8.8,
    genre: "Sci-Fi",
    year: 2010,
    platform: ["Netflix", "HBO Max"],
    imageUrl: "https://source.unsplash.com/random/300x200/?inception"
  },
  {
    id: 102,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    type: "movie",
    rating: 9.3,
    genre: "Drama",
    year: 1994,
    platform: ["Netflix"],
    imageUrl: "https://source.unsplash.com/random/300x200/?prison"
  }
];

const samplePlaylist: ContentItemProps[] = [
  {
    id: 201,
    title: "Blinding Lights",
    description: "A synth-pop, electropop song with new wave elements.",
    type: "song",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Synth-pop",
    year: 2020,
    imageUrl: "https://source.unsplash.com/random/300x200/?lights"
  },
  {
    id: 202,
    title: "Bad Guy",
    description: "A dance-pop and electropop song with minimalist production and heavy bass.",
    type: "song",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    genre: "Electropop",
    year: 2019,
    imageUrl: "https://source.unsplash.com/random/300x200/?music"
  }
];

const Index = () => {
  const [mood, setMood] = useState<MoodType>(null);
  const [activeStep, setActiveStep] = useState(1); // Start with profile setup
  const [username, setUsername] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTabView, setActiveTabView] = useState<'movies' | 'music' | null>(null);

  // Set the title based on active step
  useEffect(() => {
    const titles = [
      'Create Your Profile',
      'How are you feeling today?',
      'Your Recommendations'
    ];
    document.title = `Moodster Mix - ${titles[activeStep - 1] || 'Welcome'}`;
  }, [activeStep]);

  const handleProfileComplete = (username: string, selectedGender: 'male' | 'female') => {
    setUsername(username);
    setGender(selectedGender);
    setTimeout(() => {
      setActiveStep(2);
      sonnerToast.success("Profile Created", {
        description: `Welcome ${username}! Your profile has been created successfully.`,
      });
    }, 500);
  };

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    setTimeout(() => {
      setActiveStep(3);
      sonnerToast.success(`${selectedMood?.charAt(0).toUpperCase()}${selectedMood?.slice(1)} mood selected`, {
        description: `We'll customize your experience based on your ${selectedMood} mood.`,
      });
    }, 500);
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const handleOpenMovies = () => {
    setActiveTabView('movies');
    sonnerToast.info("Movies Library", {
      description: "Your saved movies and shows would appear here.",
    });
  };

  const handleOpenMusic = () => {
    setActiveTabView('music');
    sonnerToast.info("Music Library", {
      description: "Your saved music and playlists would appear here.",
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <Header 
        gender={gender} 
        activeStep={activeStep} 
        username={username} 
        showFullHeader={activeStep === 3}
        onOpenProfile={handleOpenProfile}
        onOpenMovies={handleOpenMovies}
        onOpenMusic={handleOpenMusic}
      />
      
      <main className="container mx-auto pt-24 px-4 text-white">
        {activeStep === 1 && (
          <UserProfileSetup
            gender={gender}
            mood={mood}
            onComplete={handleProfileComplete}
          />
        )}
        
        {activeStep === 2 && (
          <MoodSelection
            onSelectMood={handleMoodSelect}
            selectedMood={mood}
            gender={gender} 
          />
        )}
        
        {activeStep === 3 && mood && (
          <ContentRecommendations
            mood={mood}
            gender={gender}
          />
        )}
      </main>

      {/* User Profile Modal */}
      <UserProfile
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
        username={username}
        gender={gender}
        watchlist={sampleWatchlist}
        playlist={samplePlaylist}
      />
    </div>
  );
};

export default Index;
