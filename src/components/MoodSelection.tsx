
import React from 'react';
import { cn } from '@/lib/utils';
import { SmilePlus, Frown, Smile, HelpCircle } from 'lucide-react';
import { PixelCard } from '@/components/ui/pixel-card';

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
      icon: <SmilePlus size={48} />, 
      label: 'Happy', 
      description: 'Energetic & uplifting content',
      color: 'from-green-900/80 to-green-700/80',
      accent: 'green-500'
    },
    { 
      type: 'sad' as MoodType, 
      icon: <Frown size={48} />, 
      label: 'Sad', 
      description: 'Relaxing & heartwarming content',
      color: 'from-blue-900/80 to-blue-700/80',
      accent: 'blue-500'
    },
    { 
      type: 'neutral' as MoodType, 
      icon: <Smile size={48} />, 
      label: 'Neutral', 
      description: 'Balanced & moderate content',
      color: 'from-purple-900/80 to-purple-700/80',
      accent: 'purple-500'
    },
    { 
      type: 'confused' as MoodType, 
      icon: <HelpCircle size={48} />, 
      label: 'Confused', 
      description: 'Random mix of content',
      color: 'from-amber-800/80 to-amber-700/80',
      accent: 'amber-500'
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <h2 className={cn(
        "text-4xl font-bold text-center mb-12 text-gradient",
        gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
      )}>
        How are you feeling today?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moods.map((mood) => (
          <PixelCard
            key={mood.type}
            onClick={() => onSelectMood(mood.type)}
            isSelected={selectedMood === mood.type}
            activeColor={gender === 'male' ? 'rgba(30,174,219,0.7)' : 'rgba(217,70,239,0.7)'}
            className={cn(
              "transition-all duration-300 h-full",
              `bg-gradient-to-br ${mood.color}`,
            )}
          >
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className={cn(
                "text-center mb-4 transition-all duration-300",
                gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary",
                selectedMood === mood.type ? "scale-110" : ""
              )}>
                {mood.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{mood.label}</h3>
              <p className="text-sm text-gray-300 text-center">{mood.description}</p>
            </div>
          </PixelCard>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
