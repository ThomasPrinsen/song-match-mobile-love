import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Heart, Play, Music, Search, ChevronDown, ChevronUp, Clock, Grid, List, Filter } from "lucide-react";
import { Song } from "@/data/songs";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayback } from "@/contexts/PlaybackContext";
import StarRating from "@/components/StarRating";

interface GenreGroup {
  genre: string;
  songs: Song[];
}

interface SortOption {
  label: string;
  value: 'recent' | 'title' | 'artist';
}

const sortOptions: SortOption[] = [
  { label: 'Recently Added', value: 'recent' },
  { label: 'Title', value: 'title' },
  { label: 'Artist', value: 'artist' },
];

const FavouritesPage = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [fiveStarSongs, setFiveStarSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedGenres, setExpandedGenres] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'artist'>('recent');
  const [activeTab, setActiveTab] = useState<'favorites' | 'five-stars'>('favorites');
  const { playSong } = usePlayback();
  const [allSongs, setAllSongs] = useState<Song[]>([]);

  // Load songs from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteSongs");
    const savedAllSongs = localStorage.getItem("allSongs");
    const savedFiveStarSongs = localStorage.getItem("fiveStarSongs");

    if (savedFavorites) {
      setFavoriteSongs(JSON.parse(savedFavorites));
    }
    
    if (savedAllSongs) {
      const allSongs = JSON.parse(savedAllSongs);
      setAllSongs(allSongs);
      
      // Filter songs with rating 5
      const fiveStarSongs = allSongs.filter((song: Song) => song.rating === 5);
      setFiveStarSongs(fiveStarSongs);
    } else if (savedFiveStarSongs) {
      // Fallback to the dedicated five star songs storage
      setFiveStarSongs(JSON.parse(savedFiveStarSongs));
    }
  }, []);

  const toggleGenreExpansion = (genre: string) => {
    setExpandedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredSongs = (activeTab === 'favorites' ? favoriteSongs : fiveStarSongs)
    .filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Group songs by genre
  const songsByGenre: GenreGroup[] = filteredSongs.reduce((acc: GenreGroup[], song) => {
    const existingGroup = acc.find(group => group.genre === song.genre);
    if (existingGroup) {
      existingGroup.songs.push(song);
    } else {
      acc.push({ genre: song.genre, songs: [song] });
    }
    return acc;
  }, []);

  // Sort songs based on selected option
  songsByGenre.forEach(group => {
    group.songs.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'recent':
        default:
          return 0; // Assuming songs are already in chronological order
      }
    });
  });

  const handlePlaySong = (song: Song) => {
    playSong(song);
  };

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <ScrollArea className="h-full">
          <div className="h-full flex flex-col px-4 pt-10 pb-32">
            <header className="mb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center">
                  {activeTab === 'favorites' ? (
                    <Heart size={24} className="text-white" />
                  ) : (
                    <div className="text-white font-bold text-xl">5★</div>
                  )}
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white text-center">
                {activeTab === 'favorites' ? 'Your Favourites' : '5-Star Collection'}
              </h1>
              <p className="text-center text-white/80 text-sm mt-1">
                {activeTab === 'favorites' 
                  ? 'Songs you\'ve added to favourites'
                  : 'Your highest rated tracks'}
              </p>
            </header>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value: 'favorites' | 'five-stars') => setActiveTab(value)} className="mb-4">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="favorites" className="text-white data-[state=active]:bg-white/20">
                  Favourites
                </TabsTrigger>
                <TabsTrigger value="five-stars" className="text-white data-[state=active]:bg-white/20">
                  5-Star Songs
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Controls */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search songs..." 
                  className="pl-10 bg-white/10 border-white/20 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'title' | 'artist')}
                  className="bg-white/10 border-white/20 text-white rounded-lg px-3 py-1 text-sm flex-1"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
                </button>
              </div>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center mt-10">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Music size={32} className="text-white/50" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {searchQuery ? "No matching songs" : activeTab === 'favorites' ? "No favourites yet" : "No 5-star songs yet"}
                </h3>
                <p className="text-white/70 max-w-xs">
                  {searchQuery 
                    ? "Try adjusting your search" 
                    : activeTab === 'favorites'
                      ? "Click the heart icon on songs you love to see them appear here"
                      : "Rate songs with 5 stars to see them appear here"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {songsByGenre.map(({ genre, songs }) => (
                  <motion.div
                    key={genre}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/10 border-white/10 overflow-hidden">
                      <button
                        onClick={() => toggleGenreExpansion(genre)}
                        className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                            <Music size={24} className="text-white/70" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium">{genre}</h3>
                            <p className="text-sm text-white/60">{songs.length} songs</p>
                          </div>
                        </div>
                        {expandedGenres.includes(genre) ? (
                          <ChevronUp size={20} className="text-white/60" />
                        ) : (
                          <ChevronDown size={20} className="text-white/60" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedGenres.includes(genre) && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}`}>
                              {songs.map((song) => (
                                <motion.div
                                  key={song.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <button
                                    onClick={() => handlePlaySong(song)}
                                    className="w-full group"
                                  >
                                    <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'items-center'} gap-3`}>
                                      <div className={`${viewMode === 'grid' ? 'w-full aspect-square' : 'w-12 h-12'} rounded-lg overflow-hidden relative group-hover:ring-2 ring-music-primary transition-all`}>
                                        <img 
                                          src={song.coverImage} 
                                          alt={song.title}
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Play size={24} className="text-white" />
                                        </div>
                                      </div>
                                      <div className={`flex-grow ${viewMode === 'grid' ? 'text-center mt-2' : 'text-left'}`}>
                                        <h4 className="font-medium text-white line-clamp-1">{song.title}</h4>
                                        <p className="text-sm text-white/60 line-clamp-1">{song.artist}</p>
                                        {song.rating > 0 && (
                                          <div className="mt-1">
                                            <StarRating rating={song.rating} readonly size="sm" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <NavBar />
      </div>
    </MobileLayout>
  );
};

export default FavouritesPage;
