
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
      document.body.className = 'bg-gradient-to-br from-mood-female-secondary to-mood-female-light text-mood-male-dark';
    } else {
      document.body.className = '';
    }
  }, [gender]);

  // Set the title based on active step
  useEffect(() => {
    const titles = [
      'Choose Your Theme',
      'How are you feeling today?',
      'Create Your Profile',
      'Your Recommendations'
    ];
    document.title = `Moodster Mix - ${titles[activeStep - 1] || 'Welcome'}`;
  }, [activeStep]);

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
    setTimeout(() => {
      setActiveStep(2);
      toast({
        title: "Theme Selected",
        description: `${selectedGender === 'male' ? 'Male' : 'Female'} theme has been applied.`,
      });
    }, 500);
  };

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    setTimeout(() => {
      setActiveStep(3);
      toast({
        title: "Mood Selected",
        description: `Your ${selectedMood} mood has been recorded.`,
      });
    }, 500);
  };

  const handleProfileComplete = () => {
    // In a real app, we would save this data to a database
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
    <div className="min-h-screen pb-20">
      <Header gender={gender} activeStep={activeStep} username={username} />
      
      <main className={cn(
        "container mx-auto pt-24 px-4",
        gender === 'male' ? "text-white" : "",
        gender === 'female' ? "text-mood-male-dark" : ""
      )}>
        {activeStep === 1 && (
          <GenderSelection
            onSelectGender={handleGenderSelect}
            selectedGender={gender}
          />
        )}
        
        {activeStep === 2 && gender && (
          <MoodSelection
            onSelectMood={handleMoodSelect}
            selectedMood={mood}
            gender={gender}
          />
        )}
        
        {activeStep === 3 && gender && (
          <UserProfileSetup
            gender={gender}
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
      
      {/* Dynamic background elements */}
      {gender === 'male' && (
        <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-[-1]"></div>
      )}
      
      {gender === 'female' && (
        <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-mood-female-light/50 to-transparent z-[-1]"></div>
      )}
    </div>
  );
};

export default Index;
