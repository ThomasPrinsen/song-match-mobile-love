import React from 'react';
import PlaybackBar from './PlaybackBar';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="relative h-screen w-full w-screen max-w-md mx-auto bg-black overflow-hidden overflow-x-hidden">
      <div className="absolute inset-0 flex flex-col">
        {children}
        <PlaybackBar />
      </div>
    </div>
  );
};

export default MobileLayout;
