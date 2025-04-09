import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden">
      <div className="absolute inset-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
