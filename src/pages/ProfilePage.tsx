
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ListMusic, Music, Settings, LogOut, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("Music Lover");
  
  const allGenres = [
    "Pop", "Rock", "Electronic", "Hip Hop", "R&B", "Indie", "Jazz", "Classical",
    "Country", "Folk", "Metal", "Punk", "Blues", "Reggae", "Soul", "Funk"
  ];
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Pop", "Rock", "Electronic", "Hip Hop", "R&B"]);

  const handleClearMatches = () => {
    localStorage.removeItem("matchedSongs");
    toast({
      title: "Matches cleared",
      description: "All your song matches have been cleared",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/login");
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  // Save selected genres to localStorage
  useEffect(() => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
  }, [selectedGenres]);
  
  // Load selected genres from localStorage on initial render
  useEffect(() => {
    const savedGenres = localStorage.getItem("selectedGenres");
    if (savedGenres) {
      setSelectedGenres(JSON.parse(savedGenres));
    }
  }, []);

  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-4 pt-10 pb-20">
        <header className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <ListMusic size={24} className="text-music-primary" />
            <h1 className="text-2xl font-bold">Your Profile</h1>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center mb-4">
              <Music size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">{userName}</h2>
            <p className="text-gray-500 text-sm">Music enthusiast</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Genres You Want to See</h3>
            <div className="grid grid-cols-2 gap-2">
              {allGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`genre-${genre}`} 
                    checked={selectedGenres.includes(genre)} 
                    onCheckedChange={() => toggleGenre(genre)}
                  />
                  <label 
                    htmlFor={`genre-${genre}`} 
                    className="text-sm cursor-pointer"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-music-primary">12</p>
              <p className="text-sm text-gray-500">Total Matches</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-music-secondary">36</p>
              <p className="text-sm text-gray-500">Songs Discovered</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full flex justify-start"
              onClick={() => toast({
                title: "Settings",
                description: "Settings would open here in a full app",
              })}
            >
              <Settings size={18} className="mr-2" />
              Settings
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex justify-start text-amber-600"
              onClick={handleClearMatches}
            >
              <Heart size={18} className="mr-2" />
              Clear All Matches
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex justify-start text-red-500"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <NavBar />
    </MobileLayout>
  );
};

export default ProfilePage;
