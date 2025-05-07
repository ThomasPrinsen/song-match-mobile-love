import React from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";

const allGenres = [
  { name: "Pop", color: "bg-pink-500 text-white" },
  { name: "Rock", color: "bg-red-500 text-white" },
  { name: "Electronic", color: "bg-blue-500 text-white" },
  { name: "Hip Hop", color: "bg-yellow-600 text-white" },
  { name: "R&B", color: "bg-green-500 text-white" },
  { name: "Indie", color: "bg-purple-400 text-white" },
  { name: "Jazz", color: "bg-purple-700 text-white" },
  { name: "Classical", color: "bg-gray-300 text-gray-800" },
  { name: "Country", color: "bg-yellow-800 text-white" },
  { name: "Folk", color: "bg-orange-300 text-gray-800" },
  { name: "Metal", color: "bg-gray-700 text-white" },
  { name: "Punk", color: "bg-pink-700 text-white" },
  { name: "Blues", color: "bg-blue-900 text-white" },
  { name: "Reggae", color: "bg-green-700 text-white" },
  { name: "Soul", color: "bg-purple-900 text-white" },
  { name: "Funk", color: "bg-yellow-400 text-gray-900" },
];

const TopChartsPage = () => {
  const navigate = useNavigate();
  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="h-full flex flex-col px-4 pt-10 pb-32">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-white text-center mb-2 drop-shadow-lg">Top Charts</h1>
            <p className="text-center text-white/80 text-base mb-6">Discover the top-rated songs in every genre</p>
            <div className="mx-auto max-w-md rounded-3xl bg-white/10 border border-white/20 shadow-xl p-4 flex flex-col items-center">
              <div className="flex flex-wrap gap-3 justify-center">
                {allGenres.map((genre) => (
                  <button
                    key={genre.name}
                    className={`px-5 py-2 rounded-full font-bold shadow-md text-base transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 ${genre.color} hover:scale-105 active:scale-95`}
                    onClick={() => navigate(`/charts/${genre.name.toLowerCase().replace(/\s/g, '-')}`)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </header>
        </div>
        <NavBar />
      </div>
    </MobileLayout>
  );
};

export default TopChartsPage;
