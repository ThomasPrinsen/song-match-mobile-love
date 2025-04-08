
import React, { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import MusicControls from "@/components/MusicControls";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import RatingDialog from "@/components/RatingDialog";
import { songs, Song } from "@/data/songs";
import { Music } from "lucide-react";

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [matchedSongs, setMatchedSongs] = useState<Song[]>([]);
  const [showRatingDialog, setShowRatingDialog] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  const filteredSongs = selectedGenres.length > 0 
    ? songs.filter(song => selectedGenres.includes(song.genre))
    : songs;
  
  const currentSong = filteredSongs.length > 0 ? filteredSongs[currentSongIndex % filteredSongs.length] : null;
  
  const handleNextSong = () => {
    if (currentSongIndex < filteredSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      // Loop back to the first song when we reach the end
      setCurrentSongIndex(0);
    }
    setIsPlaying(false);
  };
  
  const handleRate = () => {
    setShowRatingDialog(true);
  };
  
  const handleRatingSubmit = (rating: number) => {
    if (currentSong) {
      const ratedSong = { ...currentSong, userRating: rating };
      
      if (rating >= 3) {
        // Add to matches if rating is 3 stars or higher
        setMatchedSongs(prev => [...prev, ratedSong]);
      }
      
      // Continue to next song
      handleNextSong();
      setShowRatingDialog(false);
    }
  };
  
  // Save matched songs to localStorage
  useEffect(() => {
    localStorage.setItem("matchedSongs", JSON.stringify(matchedSongs));
  }, [matchedSongs]);
  
  // Load matched songs from localStorage on initial render
  useEffect(() => {
    const savedMatches = localStorage.getItem("matchedSongs");
    if (savedMatches) {
      setMatchedSongs(JSON.parse(savedMatches));
    }
  }, []);
  
  // Load selected genres from localStorage
  useEffect(() => {
    const savedGenres = localStorage.getItem("selectedGenres");
    if (savedGenres) {
      setSelectedGenres(JSON.parse(savedGenres));
    }
  }, []);

  // Limit the number of visible songs to 5 maximum
  const visibleSongs = filteredSongs.slice(0, 5);
  
  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-4 pt-10 pb-20 bg-gradient-to-b from-music-dark to-purple-950">
        <header className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
              Thammy
            </h1>
          </div>
          <p className="text-center text-gray-300 text-sm mt-1">
            Where music breaks through
          </p>
        </header>
        
        <div className="flex-grow relative flex items-center justify-center">
          {/* Card stack */}
          <div className="relative w-full max-w-sm h-[70vh]">
            {/* Current song card */}
            {currentSong && (
              <SongCard 
                song={currentSong}
                isActive={true}
                swipeDirection="none"
              />
            )}
          </div>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-4">
          {visibleSongs.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === (currentSongIndex % visibleSongs.length) 
                  ? "bg-white" 
                  : "bg-gray-500"
              }`}
            />
          ))}
        </div>
        
        <MusicControls 
          isPlaying={isPlaying}
          currentSong={currentSong}
          onRate={handleRate}
        />
      </div>
      
      <RatingDialog 
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        onRate={handleRatingSubmit}
        currentSong={currentSong}
      />
      
      <NavBar />
    </MobileLayout>
  );
};

export default Index;
