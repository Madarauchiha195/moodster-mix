
import React from 'react';
import { cn } from '@/lib/utils';
import { SmilePlus, Frown, Smile, HelpCircle } from 'lucide-react';

export type MoodType = 'happy' | 'sad' | 'neutral' | 'confused' | null;

interface MoodSelectionProps {
  onSelectMood: (mood: MoodType) => void;
  selectedMood: MoodType;
  gender: 'male' | 'female';
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ 
  onSelectMood, 
  selectedMood,
  gender
}) => {
  const iconColor = gender === 'male' ? '#1EAEDB' : '#D946EF';
  
  const moods = [
    { 
      type: 'happy' as MoodType, 
      icon: <SmilePlus size={38} />, 
      label: 'Happy', 
      description: 'Energetic & uplifting content',
      className: 'mood-card-happy'
    },
    { 
      type: 'sad' as MoodType, 
      icon: <Frown size={38} />, 
      label: 'Sad', 
      description: 'Relaxing & heartwarming content',
      className: 'mood-card-sad'
    },
    { 
      type: 'neutral' as MoodType, 
      icon: <Smile size={38} />, 
      label: 'Neutral', 
      description: 'Balanced & moderate content',
      className: 'mood-card-neutral'
    },
    { 
      type: 'confused' as MoodType, 
      icon: <HelpCircle size={38} />, 
      label: 'Confused', 
      description: 'Random mix of content',
      className: 'mood-card-confused'
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <h2 className={cn(
        "text-2xl font-bold text-center mb-8",
        gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
      )}>
        How are you feeling today?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {moods.map((mood) => (
          <div
            key={mood.type}
            className={cn(
              "mood-card",
              mood.className,
              selectedMood === mood.type && "ring-2",
              selectedMood === mood.type && gender === 'male' ? "ring-mood-male-primary" : "",
              selectedMood === mood.type && gender === 'female' ? "ring-mood-female-primary" : "",
            )}
            onClick={() => onSelectMood(mood.type)}
          >
            <div className="text-center">
              <div className={cn(
                "flex justify-center mb-2",
                gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
              )}>
                {mood.icon}
              </div>
              <h3 className="text-lg font-medium mb-1">{mood.label}</h3>
              <p className="text-sm text-gray-600">{mood.description}</p>
              
              {selectedMood === mood.type && (
                <div className={cn(
                  "absolute top-2 right-2 h-3 w-3 rounded-full",
                  gender === 'male' ? "bg-mood-male-primary" : "bg-mood-female-primary"
                )} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
