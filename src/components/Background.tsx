
import React from 'react';
import { Vortex } from '@/components/ui/vortex';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <Vortex
      backgroundColor="black"
      baseHue={220}
      particleCount={500}
      containerClassName="fixed inset-0 w-screen h-screen"
      className="min-h-screen w-full"
    >
      {children}
    </Vortex>
  );
};

export default Background;
