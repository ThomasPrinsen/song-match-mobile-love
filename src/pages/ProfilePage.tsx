
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ListMusic, Music, Settings, LogOut, Heart, HelpCircle, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
      <ScrollArea className="h-full">
        <div className="h-full flex flex-col px-4 pt-10 pb-24">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-center text-white">Profile</h1>
          </header>

          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center mb-4 ring-4 ring-white/20">
              <Music size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{userName}</h2>
            <p className="text-white/70 text-sm">Music enthusiast</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-music-primary">12</p>
              <p className="text-sm text-white/70">Total Matches</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-music-secondary">36</p>
              <p className="text-sm text-white/70">Songs Discovered</p>
            </div>
          </div>

          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3 text-white">Your Music Genres</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedGenres.map(genre => (
                <Badge 
                  key={genre}
                  variant="secondary" 
                  className="bg-music-primary/20 text-white border-none hover:bg-music-primary/30"
                >
                  {genre}
                </Badge>
              ))}
              {selectedGenres.length === 0 && (
                <span className="text-white/60 text-sm">No genres selected</span>
              )}
            </div>
            
            <Separator className="my-3 bg-white/20" />
            
            <h4 className="text-sm font-medium text-white/80 mb-2">Select Genres</h4>
            <div className="grid grid-cols-2 gap-2">
              {allGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`genre-${genre}`} 
                    checked={selectedGenres.includes(genre)} 
                    onCheckedChange={() => toggleGenre(genre)}
                    className="data-[state=checked]:bg-music-primary data-[state=checked]:border-music-primary"
                  />
                  <label 
                    htmlFor={`genre-${genre}`} 
                    className="text-sm cursor-pointer text-white"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full flex justify-start border-white/20 text-white hover:bg-white/10 hover:text-white"
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
              className="w-full flex justify-start border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => toast({
                title: "Notifications",
                description: "Notification settings would open here",
              })}
            >
              <Bell size={18} className="mr-2" />
              Notifications
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex justify-start border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => toast({
                title: "Help & Support",
                description: "Help center would open here",
              })}
            >
              <HelpCircle size={18} className="mr-2" />
              Help & Support
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex justify-start border-white/20 text-amber-400 hover:bg-white/10 hover:text-amber-300"
              onClick={handleClearMatches}
            >
              <Heart size={18} className="mr-2" />
              Clear All Matches
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex justify-start border-white/20 text-red-400 hover:bg-white/10 hover:text-red-300"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </ScrollArea>
      <NavBar />
    </MobileLayout>
  );
};

export default ProfilePage;
