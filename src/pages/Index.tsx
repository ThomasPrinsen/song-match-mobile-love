
import React, { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import MusicControls from "@/components/MusicControls";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { songs, Song } from "@/data/songs";
import { Music } from "lucide-react";

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [matchedSongs, setMatchedSongs] = useState<Song[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<"none" | "left" | "right">("none");
  
  const currentSong = songs[currentSongIndex];
  
  const handleSkip = () => {
    setSwipeDirection("left");
    
    // Small delay to allow animation to complete
    setTimeout(() => {
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        // Loop back to the first song when we reach the end
        setCurrentSongIndex(0);
      }
      setSwipeDirection("none");
      setIsPlaying(false);
    }, 300);
  };
  
  const handleLike = () => {
    setSwipeDirection("right");
    
    // Add to matches
    setMatchedSongs([...matchedSongs, currentSong]);
    
    // Small delay to allow animation to complete
    setTimeout(() => {
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        // Loop back to the first song when we reach the end
        setCurrentSongIndex(0);
      }
      setSwipeDirection("none");
      setIsPlaying(false);
    }, 300);
  };
  
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
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
  
  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-4 pt-10 pb-20">
        <header className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <Music size={28} className="text-music-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
              SongMatch
            </h1>
          </div>
          <p className="text-center text-gray-500 text-sm mt-1">
            Find your melody match
          </p>
        </header>
        
        <div className="flex-grow relative flex items-center justify-center">
          {/* Card stack - we only show one card but it gives the illusion of a stack */}
          <div className="relative w-full max-w-sm h-[70vh]">
            {/* Current song card */}
            {currentSong && (
              <SongCard 
                song={currentSong}
                isActive={true}
                swipeDirection={swipeDirection}
              />
            )}
            
            {/* Next song card (just for visual effect) */}
            {songs[currentSongIndex + 1 < songs.length ? currentSongIndex + 1 : 0] && (
              <SongCard 
                song={songs[currentSongIndex + 1 < songs.length ? currentSongIndex + 1 : 0]}
                isActive={false}
                swipeDirection="none"
              />
            )}
          </div>
        </div>
        
        <MusicControls 
          isPlaying={isPlaying}
          currentSong={currentSong}
          onLike={handleLike}
          onSkip={handleSkip}
          onTogglePlay={handleTogglePlay}
        />
      </div>
      
      <NavBar />
    </MobileLayout>
  );
};

export default Index;
