
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Heart, Play, Music } from "lucide-react";
import { Song } from "@/data/songs";

const FavouritesPage = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

  // Load favorite songs from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteSongs");
    if (savedFavorites) {
      setFavoriteSongs(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-4 pt-10 pb-20">
        <header className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <Heart size={24} className="text-music-secondary" />
            <h1 className="text-2xl font-bold">Your Favourites</h1>
          </div>
          <p className="text-center text-gray-500 text-sm mt-1">
            Songs you've added to favourites
          </p>
        </header>

        {favoriteSongs.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <Music size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No favourites yet</h3>
            <p className="text-gray-500 max-w-xs">
              Click the heart icon on songs you love to see them appear here
            </p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {favoriteSongs.map((song) => (
                <Card key={song.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                    {song.coverImage ? (
                      <img 
                        src={song.coverImage} 
                        alt={song.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-music-accent flex items-center justify-center">
                        <Music size={24} className="text-music-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium line-clamp-1">{song.title}</h3>
                    <p className="text-sm text-gray-500">{song.artist}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-400">
                      <span>{song.genre}</span>
                      <span className="mx-2">•</span>
                      <span>{song.duration}</span>
                    </div>
                  </div>
                  <button className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-music-accent text-music-primary hover:bg-music-primary hover:text-white transition-colors">
                    <Play size={18} />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <NavBar />
    </MobileLayout>
  );
};

export default FavouritesPage;
