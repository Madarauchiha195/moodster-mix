
import React from 'react';
import { cn } from '@/lib/utils';
import { SmilePlus, Frown, Smile, HelpCircle } from 'lucide-react';
import { CardSpotlight } from '@/components/ui/card-spotlight';

export type MoodType = 'happy' | 'sad' | 'neutral' | 'confused' | null;

interface MoodSelectionProps {
  onSelectMood: (mood: MoodType) => void;
  selectedMood: MoodType;
  gender: 'male' | 'female';
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ 
  onSelectMood, 
  selectedMood,
}) => {
  const moods = [
    { 
      type: 'happy' as MoodType, 
      icon: <SmilePlus size={42} className="text-white" />, 
      label: 'Happy', 
      description: 'Energetic & uplifting content',
      color: 'rgba(30, 41, 59, 0.6)',
    },
    { 
      type: 'sad' as MoodType, 
      icon: <Frown size={42} className="text-white" />, 
      label: 'Sad', 
      description: 'Relaxing & heartwarming content',
      color: 'rgba(30, 41, 59, 0.6)',
    },
    { 
      type: 'neutral' as MoodType, 
      icon: <Smile size={42} className="text-white" />, 
      label: 'Neutral', 
      description: 'Balanced & moderate content',
      color: 'rgba(30, 41, 59, 0.6)',
    },
    { 
      type: 'confused' as MoodType, 
      icon: <HelpCircle size={42} className="text-white" />, 
      label: 'Confused', 
      description: 'Random mix of content',
      color: 'rgba(30, 41, 59, 0.6)',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
        How are you feeling today?
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {moods.map((mood) => (
          <CardSpotlight
            key={mood.type}
            onClick={() => onSelectMood(mood.type)}
            className={cn(
              "transition-all duration-300 h-full cursor-pointer backdrop-blur-md bg-black/60",
              selectedMood === mood.type ? "border-purple-500 border-2" : ""
            )}
            color={mood.color}
          >
            <div className="flex flex-col items-center justify-center h-full py-4 relative z-10">
              <div className={cn(
                "text-center mb-3 transition-all duration-300",
                selectedMood === mood.type ? "scale-110" : ""
              )}>
                {mood.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-white">{mood.label}</h3>
              <p className="text-xs sm:text-sm text-gray-300 text-center">{mood.description}</p>
            </div>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
