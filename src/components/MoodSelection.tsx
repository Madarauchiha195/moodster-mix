
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
      icon: <SmilePlus size={48} className="text-blue-400" />, 
      label: 'Happy', 
      description: 'Energetic & uplifting content',
      color: '#1E293B',
    },
    { 
      type: 'sad' as MoodType, 
      icon: <Frown size={48} className="text-blue-400" />, 
      label: 'Sad', 
      description: 'Relaxing & heartwarming content',
      color: '#1E293B',
    },
    { 
      type: 'neutral' as MoodType, 
      icon: <Smile size={48} className="text-blue-400" />, 
      label: 'Neutral', 
      description: 'Balanced & moderate content',
      color: '#1E293B',
    },
    { 
      type: 'confused' as MoodType, 
      icon: <HelpCircle size={48} className="text-blue-400" />, 
      label: 'Confused', 
      description: 'Random mix of content',
      color: '#1E293B',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
        How are you feeling today?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moods.map((mood) => (
          <CardSpotlight
            key={mood.type}
            onClick={() => onSelectMood(mood.type)}
            className={cn(
              "transition-all duration-300 h-full cursor-pointer",
              selectedMood === mood.type ? "border-blue-500 border-2" : ""
            )}
            color={mood.color}
          >
            <div className="flex flex-col items-center justify-center h-full py-6 relative z-10">
              <div className={cn(
                "text-center mb-4 transition-all duration-300",
                "text-blue-400",
                selectedMood === mood.type ? "scale-110" : ""
              )}>
                {mood.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{mood.label}</h3>
              <p className="text-sm text-gray-300 text-center">{mood.description}</p>
            </div>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
