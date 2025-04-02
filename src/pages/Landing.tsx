
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/app');
  };

  const metalicTextStyle = {
    textShadow: '0 0 10px rgba(255,255,255,0.3)',
    background: 'linear-gradient(to bottom, #fff, #999)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <div className="text-center max-w-3xl mx-auto z-10 animate-fade-in">
        <h1 className={cn(
          "font-bold tracking-tight",
          "text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6"
        )} style={metalicTextStyle}>
          Moodster Mix
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover the perfect movies and music based on your current mood with our 
          recommendation engine.
        </p>
        
        <div className="space-y-3 mb-8 md:mb-12">
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto">
            Our AI-powered platform analyzes your mood and preferences to provide personalized content 
            recommendations that match exactly how you're feeling.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 sm:px-8 py-2 sm:py-6 text-base sm:text-lg hover:scale-105 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div className="glass-card p-4 md:p-6 rounded-xl">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Mood Detection</h3>
            <p className="text-sm md:text-base text-gray-300">Tell us how you're feeling and we'll tailor everything to match your current vibe.</p>
          </div>
          
          <div className="glass-card p-4 md:p-6 rounded-xl">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-sm md:text-base text-gray-300">Our algorithm learns your preferences to suggest content you'll love.</p>
          </div>
          
          <div className="glass-card p-4 md:p-6 rounded-xl sm:col-span-2 md:col-span-1">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Media Variety</h3>
            <p className="text-sm md:text-base text-gray-300">From movies to music, get recommendations across different media types.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
