import React, { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { songs, Song } from "@/data/songs";
import { Music } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import StarRating from "@/components/StarRating";
import { type CarouselApi } from "@/components/ui/carousel";

const sampleSongs: Song[] = [
  {
    id: "song1",
    title: "Starlight Dreams",
    artist: "Cosmic Waves",
    coverImage: "https://picsum.photos/400/400?random=1",
    genre: "Electronic",
    previewUrl: "",
    duration: "3:45",
    releaseYear: 2024,
    rating: 0
  },
  {
    id: "song2",
    title: "Midnight Echo",
    artist: "Luna Valley",
    coverImage: "https://picsum.photos/400/400?random=2",
    genre: "Alternative",
    previewUrl: "",
    duration: "4:12",
    releaseYear: 2024,
    rating: 0
  },
  {
    id: "song3",
    title: "Electric Soul",
    artist: "Neon Pulse",
    coverImage: "https://picsum.photos/400/400?random=3",
    genre: "Electronic",
    previewUrl: "",
    duration: "3:24",
    releaseYear: 2024,
    rating: 0
  },
  {
    id: "song4",
    title: "Desert Wind",
    artist: "Sand Riders",
    coverImage: "https://picsum.photos/400/400?random=4",
    genre: "Rock",
    previewUrl: "",
    duration: "4:00",
    releaseYear: 2024,
    rating: 0
  },
  {
    id: "song5",
    title: "Ocean Breeze",
    artist: "Wave Makers",
    coverImage: "https://picsum.photos/400/400?random=5",
    genre: "Electronic",
    previewUrl: "",
    duration: "3:50",
    releaseYear: 2024,
    rating: 0
  }
];

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState(sampleSongs);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [ratedSongs, setRatedSongs] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  const filteredSongs = songs
    .filter(song => selectedGenres.length === 0 || selectedGenres.includes(song.genre))
    .filter(song => !ratedSongs.includes(parseInt(song.id.substring(4))));
  
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
      const songIdNumber = parseInt(currentSong.id.substring(4));
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

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
      setCurrentSongIndex(api.selectedScrollSnap());
      setRating(0);
    });
  }, [api]);

  const visibleSongs = filteredSongs.slice(0, 5);
  const isFavorite = favoriteSongs.some(song => song.id === currentSong?.id);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Add actual audio playback logic here
  };

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-music-dark to-purple-950 pb-20">
        <header className="pt-10 pb-4 px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center">
              <span className="text-xl font-bold text-white">T</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
              Thammy
            </h1>
          </div>
          <p className="text-center text-white text-sm mt-1 font-medium">
            Where music breaks through
          </p>
        </header>
        
        <div className="flex-grow flex flex-col justify-center items-center px-2">
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Music size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No more songs</h3>
              <p className="text-white max-w-xs">
                You've rated all available songs in this genre. Try selecting different genres in your profile.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <Carousel
                opts={{
                  align: "center",
                  loop: false,
                  dragFree: false,
                  containScroll: "trimSnaps",
                  skipSnaps: false
                }}
                className="w-full relative"
                setApi={setApi}
              >
                <CarouselContent>
                  {filteredSongs.slice(0, 5).map((song, index) => (
                    <CarouselItem 
                      key={song.id} 
                      className="basis-[70%] md:basis-[70%] pl-4"
                    >
                      <div className="mx-auto max-w-[90%]">
                        <div className="relative transform transition-transform duration-300 hover:scale-[1.02]">
                          <SongCard 
                            song={song}
                            isActive={index === currentSongIndex}
                            onFavorite={() => {
                              if (index === currentSongIndex) {
                                handleToggleFavorite();
                              }
                            }}
                            isFavorite={favoriteSongs.some(favSong => favSong.id === song.id)}
                            isPlaying={isPlaying && index === currentSongIndex}
                            onPlayPause={handlePlayPause}
                            rating={rating}
                          />
                          
                          <div className="star-rating mt-4 flex justify-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                className={`text-2xl transition-colors ${
                                  star <= (rating || 0)
                                    ? 'text-yellow-400'
                                    : 'text-gray-400 hover:text-yellow-200'
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="flex justify-center gap-2 mt-6">
                  {filteredSongs.slice(0, 5).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'w-8 bg-white' 
                          : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
          )}
        </div>
      </div>
      
      <NavBar />
    </MobileLayout>
  );
};

export default Index;
