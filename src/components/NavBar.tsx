import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Music, BarChart2, User } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || (path === '/favourites' && location.pathname.startsWith('/charts'));
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg py-4 px-6">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link 
          to="/discover" 
          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
            isActive('/discover') ? 'text-purple-400' : 'text-white'
          }`}
        >
          <Music className="w-6 h-6" />
        </Link>
        <Link 
          to="/favourites" 
          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
            isActive('/favourites') ? 'text-purple-400' : 'text-white'
          }`}
        >
          <BarChart2 className="w-6 h-6" />
        </Link>
        <Link 
          to="/profile" 
          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
            isActive('/profile') ? 'text-purple-400' : 'text-white'
          }`}
        >
          <User className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
