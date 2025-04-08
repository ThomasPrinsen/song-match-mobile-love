
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Music4, ListMusic } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-2 px-4 z-50">
      <div className="flex justify-around items-center">
        <Link 
          to="/discover" 
          className={`flex flex-col items-center py-2 px-4 ${
            isActive("/discover") ? "text-music-primary" : "text-gray-500"
          }`}
        >
          <Music4 size={24} />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        
        <Link 
          to="/matches" 
          className={`flex flex-col items-center py-2 px-4 ${
            isActive("/matches") ? "text-music-primary" : "text-gray-500"
          }`}
        >
          <Heart size={24} />
          <span className="text-xs mt-1">Matches</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center py-2 px-4 ${
            isActive("/profile") ? "text-music-primary" : "text-gray-500"
          }`}
        >
          <ListMusic size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
