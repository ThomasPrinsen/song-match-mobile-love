
import React, { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-music-dark to-purple-950 flex items-center justify-center">
      <div 
        className={`${
          isMobile ? "w-full h-full min-h-screen" : "w-[390px] h-[844px] rounded-3xl shadow-xl"
        } overflow-hidden relative bg-gradient-to-b from-music-dark to-purple-950`}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
