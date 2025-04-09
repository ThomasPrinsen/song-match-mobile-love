
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Heart, Play, Music, Search } from "lucide-react";
import { Song } from "@/data/songs";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const FavouritesPage = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load favorite songs from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteSongs");
    if (savedFavorites) {
      setFavoriteSongs(JSON.parse(savedFavorites));
    }
  }, []);

  const filteredSongs = favoriteSongs.filter(
    song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <ScrollArea className="h-full">
        <div className="h-full flex flex-col px-4 pt-10 pb-24">
          <header className="mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">Your Favourites</h1>
            <p className="text-center text-white/80 text-sm mt-1">
              Songs you've added to favourites
            </p>
          </header>

          {/* Search input */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search your favourites..." 
                className="pl-10 bg-white/10 border-white/20 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredSongs.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center mt-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Music size={32} className="text-white/50" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                {searchQuery ? "No matching favourites" : "No favourites yet"}
              </h3>
              <p className="text-white/70 max-w-xs">
                {searchQuery 
                  ? "Try adjusting your search" 
                  : "Click the heart icon on songs you love to see them appear here"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-2">
              {filteredSongs.map((song) => (
                <Card key={song.id} className="bg-white/10 border-white/10 overflow-hidden hover:bg-white/15 transition-colors">
                  <div className="flex items-center p-3">
                    <div className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                      <AspectRatio ratio={1/1}>
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
                      </AspectRatio>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium line-clamp-1 text-white">{song.title}</h3>
                      <p className="text-sm text-white/70">{song.artist}</p>
                      <div className="flex items-center mt-1.5">
                        <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-white/10 text-white border-white/20 mr-2">
                          {song.genre}
                        </Badge>
                        <span className="text-xs text-white/60">{song.releaseYear}</span>
                      </div>
                    </div>
                    <button className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-music-primary/20 text-music-primary hover:bg-music-primary hover:text-white transition-colors">
                      <Play size={18} className="ml-1" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      <NavBar />
    </MobileLayout>
  );
};

export default FavouritesPage;
