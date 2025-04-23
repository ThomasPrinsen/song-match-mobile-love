import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings2, Music2, X } from "lucide-react";
import NavBar from "./NavBar";

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

const allGenres = [
  "Pop", "Rock", "Electronic", "Hip Hop", "R&B", "Indie", "Jazz", "Classical",
  "Country", "Folk", "Metal", "Punk", "Blues", "Reggae", "Soul", "Funk"
];

const getGenreColor = (genre: string): string => {
  const colors: { [key: string]: string } = {
    'Electronic': 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50',
    'Alternative': 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50',
    'Rock': 'bg-red-500/20 hover:bg-red-500/30 border-red-500/50',
    'Pop': 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/50',
    'Hip Hop': 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/50',
    'R&B': 'bg-green-500/20 hover:bg-green-500/30 border-green-500/50',
    'Jazz': 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/50',
    'Classical': 'bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50',
    'Country': 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/50',
    'Folk': 'bg-lime-500/20 hover:bg-lime-500/30 border-lime-500/50',
    'Metal': 'bg-slate-500/20 hover:bg-slate-500/30 border-slate-500/50',
    'Punk': 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/50',
    'Blues': 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50',
    'Reggae': 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/50',
    'Soul': 'bg-violet-500/20 hover:bg-violet-500/30 border-violet-500/50',
    'Funk': 'bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border-fuchsia-500/50',
  };
  return colors[genre] || 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/50';
};

const SettingsPage = ({
  isOpen,
  onClose,
  selectedGenres,
  onGenreToggle,
}: SettingsPageProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-screen p-0 flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <DialogClose className="absolute right-4 top-4 rounded-full p-2 text-white opacity-70 hover:opacity-100 bg-white/10 hover:bg-white/20 transition-all">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <header className="px-6 pt-8 pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Settings2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-1">Settings</h2>
              <p className="text-center text-white/60">Customize your music preferences</p>
            </header>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="px-4 pb-24">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Music Genres</h3>
                      <p className="text-sm text-white/60">Select the genres you want to discover</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {allGenres.map((genre) => (
                      <div
                        key={genre}
                        className={`relative flex items-center rounded-lg border transition-all duration-200 ${
                          selectedGenres.includes(genre)
                            ? getGenreColor(genre)
                            : 'border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <button
                          onClick={() => onGenreToggle(genre)}
                          className="w-full p-4 flex items-center gap-3"
                          aria-label={`Toggle ${genre} genre`}
                        >
                          <Checkbox
                            id={genre}
                            checked={selectedGenres.includes(genre)}
                            className="h-4 w-4 shrink-0 rounded-sm border border-white/20 border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-500 data-[state=checked]:text-primary-foreground"
                          />
                          <span className="text-sm font-medium text-white">
                            {genre}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        <NavBar />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPage; 