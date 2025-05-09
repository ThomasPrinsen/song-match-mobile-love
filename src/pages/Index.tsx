import React, { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { songs, Song } from "@/data/songs";
import { Music, Pause, Play, Settings, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import StarRating from "@/components/StarRating";
import { type CarouselApi } from "@/components/ui/carousel";
import SettingsPage from "@/components/SettingsPage";
import HistoryPage from "@/components/HistoryPage";
import { usePlayback } from "@/contexts/PlaybackContext";

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

const getGenreColor = (genre: string): string => {
  const colors: { [key: string]: string } = {
    'Electronic': 'bg-blue-500/50',
    'Alternative': 'bg-purple-500/50',
    'Rock': 'bg-red-500/50',
    'Pop': 'bg-pink-500/50',
    'Hip Hop': 'bg-yellow-500/50',
    'R&B': 'bg-green-500/50',
    'Jazz': 'bg-orange-500/50',
    'Classical': 'bg-indigo-500/50',
    // Add more genres and colors as needed
  };
  return colors[genre] || 'bg-gray-500/50'; // Default color if genre not found
};

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState(sampleSongs);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [ratedSongs, setRatedSongs] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [completedSlides, setCompletedSlides] = useState<number[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { playSong, pauseSong, currentSong: globalCurrentSong, isPlaying } = usePlayback();
  
  const filteredSongs = songs
    .filter(song => selectedGenres.length === 0 || selectedGenres.includes(song.genre))
    .filter(song => !ratedSongs.includes(parseInt(song.id.substring(4))));
  
  const currentSong = filteredSongs.length > 0 ? filteredSongs[currentSlide % filteredSongs.length] : null;
  
  const handleNextSong = () => {
    if (currentSongIndex < filteredSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (filteredSongs.length > 1) {
      setCurrentSongIndex(0);
    }
    setRating(0);
  };
  
  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (filteredSongs.length > 1) {
      setCurrentSongIndex(filteredSongs.length - 1);
    }
    setRating(0);
  };
  
  const handleRatingConfirm = (newRating: number) => {
    if (!currentSong) return;

    // Update the song's rating in the songs array
    const updatedSongs = songs.map(song => 
      song.id === currentSong.id 
        ? { ...song, rating: newRating }
        : song
    );
    setSongs(updatedSongs);

    // Store the updated songs in localStorage
    localStorage.setItem("allSongs", JSON.stringify(updatedSongs));

    // Add to rated songs
    const songIdNumber = parseInt(currentSong.id.substring(4));
    setRatedSongs(prev => [...prev, songIdNumber]);
    setCompletedSlides(prev => [...prev, currentSlide]);

    // If it's a 5-star rating, update the five star songs list
    if (newRating === 5) {
      const fiveStarSongs = JSON.parse(localStorage.getItem("fiveStarSongs") || "[]");
      fiveStarSongs.push(currentSong);
      localStorage.setItem("fiveStarSongs", JSON.stringify(fiveStarSongs));
    }

    // Move to next song if available
    if (filteredSongs.length > 1) {
      handleNextSong();
    } else {
      setCurrentSongIndex(0);
    }
    setRating(0);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
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
    localStorage.setItem("completedSlides", JSON.stringify(completedSlides));
  }, [favoriteSongs, ratedSongs, completedSlides]);
  
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
    
    const savedCompletedSlides = localStorage.getItem("completedSlides");
    if (savedCompletedSlides) {
      setCompletedSlides(JSON.parse(savedCompletedSlides));
    }
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setCurrentSlide(newIndex);
      setCurrentSongIndex(newIndex);
      setRating(0);

      const newSong = filteredSongs[newIndex];
      if (newSong) {
        if (isPlaying) {
          playSong(newSong);
        } else {
          playSong(newSong);
          pauseSong();
        }
      }
    });
  }, [api, filteredSongs, isPlaying, playSong, pauseSong]);

  // Add useEffect for autoplay
  useEffect(() => {
    if (filteredSongs.length > 0) {
      playSong(filteredSongs[0]);
    }
  }, []); // Empty dependency array means this runs once on mount

  const visibleSongs = filteredSongs.slice(0, 5);
  const isFavorite = favoriteSongs.some(song => song.id === currentSong?.id);
  
  const handlePlayPause = () => {
    if (currentSong) {
      if (globalCurrentSong?.id !== currentSong.id) {
        playSong(currentSong);
      } else {
        if (isPlaying) {
          pauseSong();
        } else {
          playSong(currentSong);
        }
      }
    }
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleRatingUpdate = (songId: string, newRating: number) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song.id === songId 
          ? { ...song, rating: newRating }
          : song
      )
    );
    
    toast({
      title: "Rating Updated",
      description: `Rating updated to ${newRating} stars`,
      duration: 2000,
    });
  };

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950">
        {/* Top Navigation Bar */}
        <header className="px-6 py-4 bg-black/20 backdrop-blur-lg rounded-b-3xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">
              Thammy
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              >
                <History className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Add pb-32 to account for playback bar */}
        <div className="flex-grow flex flex-col justify-center items-center px-4 pt-2 pb-32">
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Music size={64} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white/80 mb-2">No more songs</h3>
              <p className="text-white/50 max-w-xs">
                You've rated all available songs in this genre. Try selecting different genres in your profile.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <Carousel
                opts={{
                  align: "center",
                  loop: false,
                  containScroll: "trimSnaps",
                  skipSnaps: false
                }}
                className="w-full relative"
                setApi={setApi}
              >
                <CarouselContent className="-ml-2">
                  {filteredSongs.slice(0, 5).map((song, index) => (
                    <CarouselItem 
                      key={song.id} 
                      className="pl-2 basis-[95%]"
                    >
                      <div className="p-2">
                        <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-3xl p-6">
                          {/* Song Card Content */}
                          <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                            <img 
                              src={song.coverImage}
                              alt={song.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h2 className="text-3xl font-bold text-white mb-2">{song.title}</h2>
                              <p className="text-white/90 text-xl">{song.artist}</p>
                            </div>
                          </div>
                          {/* Tags - with colors based on genre */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-4 py-2 rounded-full text-white text-sm font-medium bg-purple-600/80">
                              {song.genre}
                            </span>
                          </div>
                          {/* Star Rating - smaller and more compact */}
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex justify-center gap-4">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className={`transform transition-all duration-200 ${
                                    star <= rating
                                      ? 'text-yellow-400 scale-110'
                                      : 'text-white/40 hover:text-yellow-200 hover:scale-105'
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-10 h-10"
                                  >
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              ))}
                            </div>
                            {/* Confirm Button - Always visible with disabled state */}
                            <button
                              onClick={() => handleRatingConfirm(rating)}
                              disabled={rating === 0}
                              className={`px-8 py-2 rounded-full font-medium transition-colors ${
                                rating > 0 
                                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              }`}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center gap-3 mt-6 mb-4">
                {filteredSongs.slice(0, 5).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-6 bg-white' // Current slide
                        : completedSlides.includes(index)
                        ? 'bg-green-500' // Completed slide
                        : 'bg-white/40' // Future slide
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* NavBar */}
        <NavBar />
      </div>
      <SettingsPage 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
      />
      <HistoryPage 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        ratedSongs={ratedSongs}
        allSongs={songs}
        onRatingUpdate={handleRatingUpdate}
      />
    </MobileLayout>
  );
};

export default Index;
