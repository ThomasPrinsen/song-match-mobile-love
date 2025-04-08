
import React, { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-music-accent to-white dark:from-music-dark dark:to-gray-900 flex items-center justify-center">
      <div 
        className={`${
          isMobile ? "w-full h-full" : "w-[390px] h-[844px] rounded-3xl shadow-xl"
        } overflow-hidden relative bg-white dark:bg-gray-950`}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
