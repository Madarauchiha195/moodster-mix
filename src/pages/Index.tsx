
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
      toast({
        title: "Mood Selected",
        description: `Your ${selectedMood} mood has been recorded.`,
      });
    }, 500);
  };

  const handleProfileComplete = (username: string, themeChoice: 'male' | 'female') => {
    setGender(themeChoice);
    setUsername(username);
    setTimeout(() => {
      setActiveStep(3);
      toast({
        title: "Profile Created",
        description: "Your profile has been created successfully.",
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
        
        {activeStep === 3 && gender && mood && (
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
