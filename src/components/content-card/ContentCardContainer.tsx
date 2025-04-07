
import React from 'react';

interface ContentCardContainerProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ContentCardContainer: React.FC<ContentCardContainerProps> = ({ 
  onClick, 
  children 
}) => {
  return (
    <div 
      className="content-card h-full w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-purple-500/50 cursor-pointer transition-all duration-300 flex flex-col transform hover:scale-105"
      style={{ minWidth: '180px', maxWidth: '280px' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ContentCardContainer;
