
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MoodSelection, { MoodType } from '@/components/MoodSelection';
import UserProfileSetup from '@/components/UserProfileSetup';
import ContentRecommendations from '@/components/ContentRecommendations';
import Header from '@/components/Header';
import { toast as sonnerToast } from "sonner";

const Index = () => {
  const [mood, setMood] = useState<MoodType>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [username, setUsername] = useState<string>('');
  const gender = 'male';

  // Set the title based on active step
  useEffect(() => {
    const titles = [
      'How are you feeling today?',
      'Create Your Profile',
      'Your Recommendations'
    ];
    document.title = `Moodster Mix - ${titles[activeStep - 1] || 'Welcome'}`;
  }, [activeStep]);

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    setTimeout(() => {
      setActiveStep(2);
      sonnerToast.success(`${selectedMood?.charAt(0).toUpperCase()}${selectedMood?.slice(1)} mood selected`, {
        description: `We'll customize your experience based on your ${selectedMood} mood.`,
      });
    }, 500);
  };

  const handleProfileComplete = (username: string) => {
    setUsername(username);
    setTimeout(() => {
      setActiveStep(3);
      sonnerToast.success("Profile Created", {
        description: `Welcome ${username}! Your profile has been created successfully.`,
      });
    }, 500);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header gender={gender} activeStep={activeStep} username={username} />
      
      <main className="container mx-auto pt-24 px-4 text-white">
        {activeStep === 1 && (
          <MoodSelection
            onSelectMood={handleMoodSelect}
            selectedMood={mood}
            gender={'male'} 
          />
        )}
        
        {activeStep === 2 && (
          <UserProfileSetup
            gender={gender}
            mood={mood}
            onComplete={handleProfileComplete}
          />
        )}
        
        {activeStep === 3 && mood && (
          <ContentRecommendations
            mood={mood}
            gender={gender}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
