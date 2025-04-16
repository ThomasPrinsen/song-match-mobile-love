import React from "react";
import { X } from "lucide-react";

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

const availableGenres = [
  "Electronic",
  "Rock",
  "Pop",
  "Hip Hop",
  "R&B",
  "Jazz",
  "Classical",
  "Alternative",
  "Indie",
  "Metal",
  "Folk",
  "Blues"
];

const SettingsPage = ({ 
  isOpen, 
  onClose, 
  selectedGenres, 
  onGenreToggle 
}: SettingsPageProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-purple-950 z-50 animate-in slide-in-from-right">
      <div className="min-h-full flex flex-col">
        <header className="px-6 py-4 bg-black/20 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </header>

        <div className="flex-1 px-6 py-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Favorite Genres</h3>
            <p className="text-white/70 text-sm mb-4">
              Select the genres you're interested in. You'll see more songs from these genres.
            </p>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => onGenreToggle(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedGenres.includes(genre)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">App Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <span className="text-white">Auto-play songs</span>
                <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <span className="text-white">Show explicit content</span>
                <button className="w-12 h-6 bg-white/20 rounded-full relative">
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Account</h3>
            <button className="w-full py-3 bg-white/10 text-white rounded-xl hover:bg-white/20">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 