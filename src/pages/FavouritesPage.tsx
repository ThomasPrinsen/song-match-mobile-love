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
  // Add more genres as needed
];

const genreGrid = [
  [0, 1],
  [2, 3],
  [4, 5],
];

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
                placeholder="Zoeken"
                className="w-full rounded-full bg-gray-800/80 border-none pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
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
          <div className="grid grid-cols-2 gap-4">
            {filteredGenres.map((genre) => (
              <button
                key={genre.name}
                className={`relative group aspect-[1.2/1] rounded-2xl overflow-hidden flex flex-col justify-end p-4 shadow-xl bg-gradient-to-br ${genre.color} ${genre.border} border transition-transform hover:scale-105 active:scale-95`}
                onClick={() => navigate(`/charts/${genre.name.toLowerCase().replace(/\s|&/g, '-')}`)}
                style={{ minHeight: 140 }}
              >
                <span className="absolute top-4 right-4 text-4xl opacity-80 group-hover:scale-110 transition-transform">{genre.icon}</span>
                <span className="text-lg font-bold text-white drop-shadow-lg z-10">{genre.name}</span>
                <span className="absolute inset-0 pointer-events-none" style={{background: 'linear-gradient(180deg,transparent 60%,rgba(0,0,0,0.22) 100%)'}}></span>
              </button>
            ))}
          </div>
        </div>
        <NavBar />
      </div>
    </MobileLayout>
  );
};

export default FavouritesPage;
