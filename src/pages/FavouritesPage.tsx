import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";

const allGenres = [
  { name: "Hip Hop & Rap", color: "from-purple-600 to-purple-400", border: "border-purple-400", icon: "🎤" },
  { name: "Electronic", color: "from-pink-500 to-pink-300", border: "border-pink-400", icon: "🎛️" },
  { name: "Pop", color: "from-yellow-300 to-yellow-100", border: "border-yellow-300", icon: "🍭" },
  { name: "R&B", color: "from-teal-600 to-teal-300", border: "border-teal-400", icon: "🧢" },
  { name: "Party", color: "from-orange-400 to-orange-200", border: "border-orange-300", icon: "🦖" },
  { name: "Chill", color: "from-cyan-600 to-cyan-300", border: "border-cyan-400", icon: "😎" },
  { name: "Rock", color: "from-red-600 to-red-400", border: "border-red-400", icon: "🎸" },
  { name: "Indie", color: "from-green-600 to-green-400", border: "border-green-400", icon: "🌱" },
  { name: "Jazz", color: "from-yellow-700 to-yellow-500", border: "border-yellow-700", icon: "🎷" },
  { name: "Classical", color: "from-gray-400 to-gray-200", border: "border-gray-400", icon: "🎻" },
  { name: "Country", color: "from-yellow-800 to-yellow-600", border: "border-yellow-800", icon: "🤠" },
  { name: "Folk", color: "from-orange-400 to-orange-200", border: "border-orange-400", icon: "🪕" },
  { name: "Metal", color: "from-gray-700 to-gray-500", border: "border-gray-700", icon: "🤘" },
  { name: "Punk", color: "from-pink-700 to-pink-500", border: "border-pink-700", icon: "🧷" },
  { name: "Blues", color: "from-blue-900 to-blue-700", border: "border-blue-900", icon: "🎺" },
  { name: "Reggae", color: "from-green-700 to-green-500", border: "border-green-700", icon: "🦁" },
  { name: "Soul", color: "from-purple-900 to-purple-700", border: "border-purple-900", icon: "🕺" },
  { name: "Funk", color: "from-yellow-600 to-yellow-400", border: "border-yellow-600", icon: "🦶" },
  { name: "Disco", color: "from-pink-400 to-yellow-300", border: "border-pink-400", icon: "💃" },
];

const genreGrid = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const genreColors: { [key: string]: string } = {
  "Hip Hop & Rap": "#a78bfa",
  "Electronic": "#f472b6",
  "Pop": "#fde68a",
  "R&B": "#2dd4bf",
  "Party": "#fdba74",
  "Chill": "#22d3ee",
  "Rock": "#f87171",
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
  "Disco": "#f472b6",
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
  "R&B": (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(5)].map((_, i) => (
        <circle key={i} cx="100" cy="100" r={40 + i * 18} stroke={color} strokeWidth="2" opacity={0.18 + i * 0.10} fill="none" />
      ))}
    </svg>
  ),
  "Party": (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(5)].map((_, i) => (
        <ellipse key={i} cx="100" cy="100" rx={80 - i * 12} ry={40 - i * 5} stroke={color} strokeWidth="2" opacity={0.18 + i * 0.10} fill="none" />
      ))}
    </svg>
  ),
  "Chill": (color: string) => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(5)].map((_, i) => (
        <ellipse key={i} cx="100" cy={160 - i * 12} rx={80 - i * 15} ry={18 - i * 2} stroke={color} strokeWidth="2" opacity={0.18 + i * 0.10} fill="none" />
      ))}
    </svg>
  ),
};

const genreBg: { [key: string]: string } = {
  "Hip Hop & Rap": "bg-gradient-to-br from-purple-500 to-purple-700",
  "Electronic": "bg-gradient-to-br from-pink-400 to-pink-600",
  "Pop": "bg-gradient-to-br from-yellow-300 to-yellow-500",
  "R&B": "bg-gradient-to-br from-teal-400 to-teal-600",
  "Party": "bg-gradient-to-br from-orange-300 to-orange-500",
  "Chill": "bg-gradient-to-br from-cyan-300 to-cyan-500",
  "Rock": "bg-gradient-to-br from-red-400 to-red-600",
  "Indie": "bg-gradient-to-br from-green-400 to-green-600",
  "Jazz": "bg-gradient-to-br from-yellow-700 to-yellow-500",
  "Classical": "bg-gradient-to-br from-gray-200 to-gray-400",
  "Country": "bg-gradient-to-br from-yellow-800 to-yellow-600",
  "Folk": "bg-gradient-to-br from-orange-400 to-orange-200",
  "Metal": "bg-gradient-to-br from-gray-700 to-gray-500",
  "Punk": "bg-gradient-to-br from-pink-700 to-pink-500",
  "Blues": "bg-gradient-to-br from-blue-900 to-blue-700",
  "Reggae": "bg-gradient-to-br from-green-700 to-green-500",
  "Soul": "bg-gradient-to-br from-purple-900 to-purple-700",
  "Funk": "bg-gradient-to-br from-yellow-600 to-yellow-400",
  "Disco": "bg-gradient-to-br from-pink-400 to-yellow-300",
};

// Reorder and adjust row spans for even bottom alignment
const genreGridSpans: { [key: string]: string } = {
  "Hip Hop & Rap": "col-span-1 row-span-3",
  "Electronic": "col-span-1 row-span-2",
  "Pop": "col-span-1 row-span-2",
  "R&B": "col-span-1 row-span-1",
  "Party": "col-span-1 row-span-2",
  "Chill": "col-span-1 row-span-2",
  "Rock": "col-span-1 row-span-1",
  "Indie": "col-span-1 row-span-2",
  "Jazz": "col-span-1 row-span-1",
  "Classical": "col-span-1 row-span-3",
  "Country": "col-span-1 row-span-1",
  "Folk": "col-span-1 row-span-2",
  "Metal": "col-span-1 row-span-2",
  "Punk": "col-span-1 row-span-1",
  "Blues": "col-span-1 row-span-2",
  "Reggae": "col-span-1 row-span-2",
  "Soul": "col-span-1 row-span-1",
  "Funk": "col-span-1 row-span-1",
  "Disco": "col-span-1 row-span-1",
};

// Example artist/genre images for backgrounds
const genreImages: { [key: string]: string } = {
  "Hip Hop & Rap": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
  "Electronic": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "Pop": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "R&B": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "Party": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "Chill": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "Rock": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
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
  "Disco": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
};

// Define a unique border color for each genre
const genreBorderColors: { [key: string]: string } = {
  "Hip Hop & Rap": "border-purple-400",
  "Electronic": "border-pink-400",
  "Pop": "border-yellow-400",
  "R&B": "border-teal-400",
  "Party": "border-orange-400",
  "Chill": "border-cyan-400",
  "Rock": "border-red-400",
  "Indie": "border-green-400",
  "Jazz": "border-yellow-700",
  "Classical": "border-gray-400",
  "Country": "border-yellow-800",
  "Folk": "border-orange-400",
  "Metal": "border-gray-700",
  "Punk": "border-pink-700",
  "Blues": "border-blue-900",
  "Reggae": "border-green-700",
  "Soul": "border-purple-900",
  "Funk": "border-yellow-600",
  "Disco": "border-pink-400",
};

// Add a default SVG pattern for genres without a custom one
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

const FavouritesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filteredGenres = allGenres.filter((genre) =>
    genre.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950">
        <div className="h-full flex flex-col px-4 pt-8 pb-32">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-full bg-purple-900/70 border-none pl-12 pr-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
                style={{ fontSize: 18 }}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          <header className="mb-6 mt-2">
            <h1 className="text-3xl font-extrabold text-white text-left mb-2 drop-shadow-lg">Top lists</h1>
          </header>
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)] pb-4">
            <div className="grid grid-cols-2 auto-rows-[100px] gap-4">
              {filteredGenres.map((genre) => (
                <button
                  key={genre.name}
                  className={`relative group rounded-2xl overflow-hidden flex flex-col justify-end p-4 shadow-xl border-2 transition-transform hover:scale-105 active:scale-95 ${genreBg[genre.name]} ${genreGridSpans[genre.name] || ''} ${genreBorderColors[genre.name]}`}
                  onClick={() => navigate(`/charts/${genre.name.toLowerCase().replace(/\s|&/g, '-')}`)}
                  style={{ minHeight: 0, minWidth: 0, background: genreImages[genre.name] ? `url('${genreImages[genre.name]}') center/cover no-repeat` : undefined }}
                >
                  {/* Genre color overlay */}
                  <span
                    className="absolute inset-0 z-0"
                    style={{ background: `${genreColors[genre.name] || '#fff'}AA`, mixBlendMode: 'multiply' }}
                  />
                  {/* SVG geometric pattern in genre color (always show, use default if not custom) */}
                  <span className="absolute inset-0 z-10 pointer-events-none">
                    {(genreSVGs[genre.name] ? genreSVGs[genre.name](genreColors[genre.name] || '#fff') : defaultSVG(genreColors[genre.name] || '#fff'))}
                  </span>
                  {/* Black overlay for readability */}
                  <span className="absolute inset-0 bg-black/30 z-20" />
                  <span className="text-lg font-bold text-white drop-shadow-lg z-30">{genre.name}</span>
                  <span className="absolute inset-0 pointer-events-none z-20" style={{background: 'linear-gradient(180deg,transparent 60%,rgba(0,0,0,0.22) 100%)'}}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <NavBar />
      </div>
    </MobileLayout>
  );
};

export default FavouritesPage;
