
import React, { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { songs, Song } from "@/data/songs";
import { Music } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import StarRating from "@/components/StarRating";

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [ratedSongs, setRatedSongs] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const { toast } = useToast();
  
  const filteredSongs = songs
    .filter(song => selectedGenres.length === 0 || selectedGenres.includes(song.genre))
    .filter(song => !ratedSongs.includes(parseInt(song.id.replace('song', ''))));
  
  const currentSong = filteredSongs.length > 0 ? filteredSongs[currentSongIndex % filteredSongs.length] : null;
  
  const handleNextSong = () => {
    if (currentSongIndex < filteredSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (filteredSongs.length > 1) {
      setCurrentSongIndex(0);
    }
    setIsPlaying(false);
    setRating(0);
  };
  
  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (filteredSongs.length > 1) {
      setCurrentSongIndex(filteredSongs.length - 1);
    }
    setIsPlaying(false);
    setRating(0);
  };
  
  const handleRatingSubmit = (rating: number) => {
    if (currentSong && rating > 0) {
      const songIdNumber = parseInt(currentSong.id.replace('song', ''));
      setRatedSongs(prev => [...prev, songIdNumber]);
      
      toast({
        title: "Song Rated",
        description: `You gave "${currentSong.title}" ${rating} stars!`,
      });
      
      if (filteredSongs.length > 1) {
        handleNextSong();
      } else {
        setCurrentSongIndex(0);
      }
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (newRating > 0) {
      setTimeout(() => {
        handleRatingSubmit(newRating);
      }, 800);
    }
  };
  
  const handleToggleFavorite = () => {
    if (!currentSong) return;
    
    const isFavorite = favoriteSongs.some(song => song.id === currentSong.id);
    
    if (isFavorite) {
      setFavoriteSongs(favoriteSongs.filter(song => song.id !== currentSong.id));
      toast({
        title: "Removed from favorites",
        description: `"${currentSong.title}" has been removed from your favorites`,
      });
    } else {
      setFavoriteSongs([...favoriteSongs, currentSong]);
      toast({
        title: "Added to favorites",
        description: `"${currentSong.title}" has been added to your favorites`,
      });
    }
  };
  
  useEffect(() => {
    localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
    localStorage.setItem("ratedSongs", JSON.stringify(ratedSongs));
  }, [favoriteSongs, ratedSongs]);
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteSongs");
    if (savedFavorites) {
      setFavoriteSongs(JSON.parse(savedFavorites));
    }
    
    const savedRated = localStorage.getItem("ratedSongs");
    if (savedRated) {
      setRatedSongs(JSON.parse(savedRated));
    }
    
    const savedGenres = localStorage.getItem("selectedGenres");
    if (savedGenres) {
      setSelectedGenres(JSON.parse(savedGenres));
    }
  }, []);

  // Fixed carousel change handler to match expected ReactEventHandler type
  const handleCarouselChange = (api: any) => {
    const selectedIndex = api?.selectedScrollSnap();
    if (selectedIndex !== undefined) {
      setCurrentSongIndex(selectedIndex);
      setRating(0);
    }
  };

  const visibleSongs = filteredSongs.slice(0, 5);
  const isFavorite = currentSong ? favoriteSongs.some(song => song.id === currentSong.id) : false;
  
  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-4 pt-6 pb-20 bg-gradient-to-b from-music-dark to-purple-950">
        <header className="mb-4">
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
        
        <div className="flex-grow flex flex-col justify-center items-center">
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Music size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No more songs</h3>
              <p className="text-gray-300 max-w-xs">
                You've rated all available songs in this genre. Try selecting different genres in your profile.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="carousel-container relative w-full" style={{ height: "auto" }}>
                <Carousel 
                  className="w-full"
                  opts={{
                    align: "center",
                    containScroll: false,
                    dragFree: true
                  }}
                  setApi={handleCarouselChange}
                >
                  <CarouselContent className="h-full">
                    {visibleSongs.map((song, index) => (
                      <CarouselItem key={song.id} className="basis-full pl-0 flex justify-center">
                        <div className={`relative ${index === currentSongIndex % visibleSongs.length ? "z-10" : ""}`}>
                          <SongCard 
                            song={song}
                            isActive={index === currentSongIndex % visibleSongs.length}
                            zIndex={5 - Math.abs(index - (currentSongIndex % visibleSongs.length))}
                            position={index - (currentSongIndex % visibleSongs.length)}
                            swipeDirection="none"
                            onFavorite={handleToggleFavorite}
                            isFavorite={favoriteSongs.some(favSong => favSong.id === song.id)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              
              {currentSong && (
                <div className="mt-6 text-center animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h2>
                  <p className="text-md text-gray-300 mb-4">{currentSong.artist}</p>
                  <div className="flex justify-center">
                    <StarRating 
                      rating={rating} 
                      onRatingChange={handleRatingChange}
                      size="lg" 
                      className="justify-center" 
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-center gap-2 mt-6">
                {visibleSongs.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === (currentSongIndex % visibleSongs.length) 
                        ? "bg-white w-4" 
                        : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <NavBar />
    </MobileLayout>
  );
};

export default Index;
