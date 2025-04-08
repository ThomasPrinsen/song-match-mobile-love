
export type Song = {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  genre: string;
  previewUrl: string;
  duration: string;
  releaseYear: number;
};

export const songs: Song[] = [
  {
    id: "song1",
    title: "Starlight Dreams",
    artist: "Cosmic Waves",
    coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop",
    genre: "Electronic",
    previewUrl: "",
    duration: "3:45",
    releaseYear: 2023,
  },
  {
    id: "song2",
    title: "Midnight Memories",
    artist: "Luna Echo",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop",
    genre: "Indie Pop",
    previewUrl: "",
    duration: "4:12",
    releaseYear: 2022,
  },
  {
    id: "song3",
    title: "Rhythm of You",
    artist: "The Heartbeats",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop",
    genre: "R&B",
    previewUrl: "",
    duration: "3:28",
    releaseYear: 2023,
  },
  {
    id: "song4",
    title: "Electric Soul",
    artist: "Neon Pulse",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
    genre: "Dance",
    previewUrl: "",
    duration: "3:55",
    releaseYear: 2024,
  },
  {
    id: "song5",
    title: "Desert Wind",
    artist: "Amber Sands",
    coverImage: "https://images.unsplash.com/photo-1446057468532-87b7525217d6?q=80&w=400&auto=format&fit=crop",
    genre: "Alternative",
    previewUrl: "",
    duration: "4:30",
    releaseYear: 2023,
  },
  {
    id: "song6",
    title: "Ocean Waves",
    artist: "Aqua Blue",
    coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop", 
    genre: "Ambient",
    previewUrl: "",
    duration: "5:17",
    releaseYear: 2022,
  },
  {
    id: "song7",
    title: "City Lights",
    artist: "Urban Beats",
    coverImage: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=400&auto=format&fit=crop",
    genre: "Hip Hop",
    previewUrl: "",
    duration: "3:21",
    releaseYear: 2024,
  },
  {
    id: "song8",
    title: "Golden Hour",
    artist: "Sunset Melody",
    coverImage: "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?q=80&w=400&auto=format&fit=crop",
    genre: "Folk",
    previewUrl: "",
    duration: "4:05",
    releaseYear: 2023,
  }
];
