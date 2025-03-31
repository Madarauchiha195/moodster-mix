
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import GenderSelection from '@/components/GenderSelection';
import MoodSelection, { MoodType } from '@/components/MoodSelection';
import UserProfileSetup from '@/components/UserProfileSetup';
import ContentRecommendations from '@/components/ContentRecommendations';
import Header from '@/components/Header';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [mood, setMood] = useState<MoodType>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [username, setUsername] = useState<string>('');
  const { toast } = useToast();

  // Set the background color based on the selected gender
  useEffect(() => {
    if (gender === 'male') {
      document.body.className = 'bg-mood-male-dark text-white';
    } else if (gender === 'female') {
      document.body.className = 'bg-black text-white'; // Dark theme
    } else {
      document.body.className = 'bg-black text-white'; // Default to dark theme
    }
  }, [gender]);

  // Set the title based on active step
  useEffect(() => {
    const titles = [
      'How are you feeling today?',
      'Create Your Profile',
      'Select Your Theme',
      'Your Recommendations'
    ];
    document.title = `Moodster Mix - ${titles[activeStep - 1] || 'Welcome'}`;
  }, [activeStep]);

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    setTimeout(() => {
      setActiveStep(2);
      toast({
        title: "Mood Selected",
        description: `Your ${selectedMood} mood has been recorded.`,
      });
    }, 500);
  };

  const handleProfileComplete = (themeChoice: 'male' | 'female') => {
    // Get theme choice from user profile
    setGender(themeChoice);
    setUsername('User');
    setTimeout(() => {
      setActiveStep(4);
      toast({
        title: "Profile Created",
        description: "Your profile has been created successfully.",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen pb-20 bg-black">
      <Header gender={gender} activeStep={activeStep} username={username} />
      
      <main className={cn(
        "container mx-auto pt-24 px-4",
        gender === 'male' ? "text-white" : "text-white"
      )}>
        {activeStep === 1 && (
          <MoodSelection
            onSelectMood={handleMoodSelect}
            selectedMood={mood}
            gender={gender || 'female'} // Use dark theme by default
          />
        )}
        
        {activeStep === 2 && (
          <UserProfileSetup
            gender={gender}
            mood={mood}
            onComplete={handleProfileComplete}
          />
        )}
        
        {activeStep === 4 && gender && mood && (
          <ContentRecommendations
            mood={mood}
            gender={gender}
          />
        )}
      </main>
      
      {/* Dark theme background elements */}
      <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-[-1]"></div>
    </div>
  );
};

export default Index;
