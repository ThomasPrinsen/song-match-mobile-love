
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ListMusic, Music, Settings, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("Music Lover");

  const handleClearMatches = () => {
    localStorage.removeItem("matchedSongs");
    toast({
      title: "Matches cleared",
      description: "All your song matches have been cleared",
    });
  };

  const genres = ["Pop", "Rock", "Electronic", "Hip Hop", "R&B", "Indie", "Jazz", "Classical"];

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
          {/* Profile info */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center mb-4">
              <Music size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">{userName}</h2>
            <p className="text-gray-500 text-sm">Music enthusiast</p>
          </div>

          {/* Music preferences */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Favorite Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <div 
                  key={genre} 
                  className="px-3 py-1 bg-music-accent/30 text-music-primary rounded-full text-sm"
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
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

          {/* Actions */}
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
              onClick={() => toast({
                title: "Sign Out",
                description: "You would be signed out in a full app",
              })}
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
