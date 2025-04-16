import React from 'react';
import PlaybackBar from './PlaybackBar';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="relative h-screen w-full max-w-md mx-auto bg-black overflow-hidden">
      <div className="absolute inset-0 flex flex-col">
        {children}
        <PlaybackBar />
      </div>
    </div>
  );
};

export default MobileLayout;
