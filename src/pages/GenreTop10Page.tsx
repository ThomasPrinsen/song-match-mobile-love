import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Star, ArrowLeft, Music, Play, Pause, Heart } from "lucide-react";
import NavBar from "@/components/NavBar";
import { usePlayback } from "@/contexts/PlaybackContext";

const allGenres = [
  "Pop", "Rock", "Electronic", "Hip Hop", "R&B", "Indie", "Jazz", "Classical", "Country", "Folk", "Metal", "Punk", "Blues", "Reggae", "Soul", "Funk"
];

const getMockSongs = (genre: string) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `${genre}-${i + 1}`,
    title: `${genre} Song ${i + 1}`,
    artist: `${genre} Artist ${i + 1}`,
    rating: 5 - (i % 3),
    coverImage: `https://picsum.photos/seed/${genre.replace(/\s/g, '')}${i}/80/80`,
    previewUrl: "mock-preview-url"
  }));

const renderStars = (count: number) => (
  <div className="flex gap-0.5 mt-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < count ? "text-yellow-400" : "text-gray-400"} fill={i < count ? "#facc15" : "none"} />
    ))}
  </div>
);

const getLikedSongs = () => {
  try {
    return JSON.parse(localStorage.getItem("likedSongs") || "[]");
  } catch {
    return [];
  }
};

const setLikedSongs = (songs: any[]) => {
  localStorage.setItem("likedSongs", JSON.stringify(songs));
};

// Add genre color, image, and SVGs for backgrounds
const genreColors: { [key: string]: string } = {
  "Pop": "#fde68a",
  "Rock": "#f87171",
  "Electronic": "#f472b6",
  "Hip Hop": "#a78bfa",
  "Hip Hop & Rap": "#a78bfa",
  "R&B": "#2dd4bf",
  "Indie": "#4ade80",
  "Jazz": "#a16207",
  "Classical": "#d1d5db",
  "Country": "#a16207",
  "Folk": "#fdba74",
  "Metal": "#374151",
  "Punk": "#be185d",
  "Blues": "#1e3a8a",
  "Reggae": "#15803d",
  "Soul": "#581c87",
  "Funk": "#ca8a04",
};
const genreImages: { [key: string]: string } = {
  "Pop": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "Rock": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "Electronic": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "Hip Hop": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
  "Hip Hop & Rap": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
  "R&B": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "Indie": "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80",
  "Jazz": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "Classical": "https://images.unsplash.com/photo-1464989827065-1dba8bddf09b?auto=format&fit=crop&w=400&q=80",
  "Country": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "Folk": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
  "Metal": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "Punk": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "Blues": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "Reggae": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "Soul": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "Funk": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
};
const genreSVGs: { [key: string]: (color: string) => JSX.Element } = {
  "Hip Hop & Rap": (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(6)].map((_, i) => (
        <path key={i} d={`M${20 + i * 10} 180 Q100 ${60 + i * 10} ${180 - i * 10} 180`} stroke={color} strokeWidth="2" opacity={0.18 + i * 0.08} fill="none" />
      ))}
    </svg>
  ),
  "Electronic": (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(6)].map((_, i) => (
        <path key={i} d={`M${30 + i * 10} 170 Q100 ${40 + i * 10} ${170 - i * 10} 170`} stroke={color} strokeWidth="2" opacity={0.18 + i * 0.08} fill="none" />
      ))}
    </svg>
  ),
  "Pop": (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(6)].map((_, i) => (
        <path key={i} d={`M0 ${180 - i * 10} Q100 ${60 + i * 10} 200 ${180 - i * 10}`} stroke={color} strokeWidth="2" opacity={0.18 + i * 0.08} fill="none" />
      ))}
    </svg>
  ),
  // Add more as needed
};
const defaultSVG = (color: string) => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(5)].map((_, i) => (
      <rect
        key={i}
        x={20 + i * 20}
        y={20 + i * 20}
        width={160 - i * 40}
        height={160 - i * 40}
        stroke={color}
        strokeWidth="2"
        opacity={0.12 + i * 0.10}
        fill="none"
        rx={16}
      />
    ))}
  </svg>
);

const GenreTop10Page = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
  const { playSong, pauseSong, currentSong, isPlaying } = usePlayback();
  const genreName = allGenres.find(
    (g) => g.toLowerCase().replace(/\s/g, "-") === genre
  ) || "Genre";
  const songs = getMockSongs(genreName).sort((a, b) => b.rating - a.rating);

  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    setLiked(getLikedSongs().map((s: any) => s.id));
  }, [genre]);

  const handlePlayPause = (song: any) => {
    if (currentSong && currentSong.id === song.id && isPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };

  const handleLike = (song: any) => {
    let likedSongs = getLikedSongs();
    const isLiked = liked.includes(song.id);
    if (isLiked) {
      likedSongs = likedSongs.filter((s: any) => s.id !== song.id);
    } else {
      likedSongs = [...likedSongs, song];
    }
    setLikedSongs(likedSongs);
    setLiked(likedSongs.map((s: any) => s.id));
  };

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 px-4 pt-8 pb-4 -mx-4 flex flex-col gap-2 rounded-b-3xl" style={{position:'relative', overflow:'hidden'}}>
          {/* Genre background image */}
          {genreImages[genreName] && (
            <span className="absolute inset-0 z-0" style={{background: `url('${genreImages[genreName]}') center/cover no-repeat`}} />
          )}
          {/* Genre color overlay */}
          <span className="absolute inset-0 z-10" style={{background: `${genreColors[genreName] || '#fff'}CC`, mixBlendMode: 'multiply'}} />
          {/* SVG geometric pattern in genre color */}
          <span className="absolute inset-0 z-20 pointer-events-none">
            {(genreSVGs[genreName] ? genreSVGs[genreName](genreColors[genreName] || '#fff') : defaultSVG(genreColors[genreName] || '#fff'))}
          </span>
          {/* Black overlay for readability */}
          <span className="absolute inset-0 bg-black/40 z-30" />
          {/* Header content (icon, title, etc.) */}
          <div className="relative z-40 flex flex-col gap-2">
            <button
              className="flex items-center gap-2 text-white w-fit hover:bg-white/10 rounded-full px-3 py-1 transition"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex flex-col items-center justify-center mt-2">
              <div className="h-14 w-14 rounded-full bg-purple-600/20 flex items-center justify-center mb-2">
                <Music size={28} className="text-purple-300" />
              </div>
              <h1 className="text-2xl font-bold text-white text-center mb-1 drop-shadow-lg">Top {genreName} Songs</h1>
              <p className="text-center text-white/70 text-sm">Highest rated this month</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col px-4 pb-32 pt-4 overflow-y-auto">
          <div className="space-y-4">
            {songs.map((song, idx) => {
              const isCurrent = currentSong && currentSong.id === song.id;
              const isLiked = liked.includes(song.id);
              return (
                <div key={song.title} className={`flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 p-3 rounded-2xl ${isCurrent ? 'ring-2 ring-purple-400' : ''}`}>
                  <div className="relative group">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-white/10 shadow-sm cursor-pointer"
                      onClick={() => handlePlayPause(song)}
                    />
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                      onClick={() => handlePlayPause(song)}
                      tabIndex={-1}
                    >
                      {isCurrent && isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white" />
                      )}
                    </button>
                    <span className="absolute -top-2 -left-2 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">#{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate text-base">{song.title}</div>
                    <div className="text-white/70 text-sm truncate">{song.artist}</div>
                    {renderStars(song.rating)}
                  </div>
                  <button
                    className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-purple-500/80 transition-colors"
                    onClick={() => handleLike(song)}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-purple-500 text-purple-500' : 'text-white/60'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <NavBar />
      </div>
    </MobileLayout>
  );
};

export default GenreTop10Page; 