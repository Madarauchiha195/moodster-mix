
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Landing = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <div className="text-center max-w-3xl mx-auto z-10 animate-fade-in">
        <h1 className={cn(
          "font-bold tracking-tight text-gradient",
          "text-4xl md:text-6xl lg:text-7xl mb-6"
        )}>
          Moodster Mix
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover the perfect movies and music based on your current mood with our 
          state-of-the-art recommendation engine.
        </p>
        
        <div className="space-y-4 mb-12">
          <p className="text-base text-gray-300">
            Our AI-powered platform analyzes your mood and preferences to provide personalized content 
            recommendations that match exactly how you're feeling.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-6 text-lg hover-scale"
          >
            Get Started
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Mood Detection</h3>
            <p className="text-gray-300">Tell us how you're feeling and we'll tailor everything to match your current vibe.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-300">Our algorithm learns your preferences to suggest content you'll love.</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Media Variety</h3>
            <p className="text-gray-300">From movies to music, get recommendations across different media types.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
