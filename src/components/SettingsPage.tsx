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

const getGenreColor = (genre: string, selected: boolean): string => {
  const colors: { [key: string]: string } = {
    'Electronic': selected ? 'bg-blue-500/50' : 'bg-white/10',
    'Alternative': selected ? 'bg-purple-500/50' : 'bg-white/10',
    'Rock': selected ? 'bg-red-500/50' : 'bg-white/10',
    'Pop': selected ? 'bg-pink-500/50' : 'bg-white/10',
    'Hip Hop': selected ? 'bg-yellow-500/50' : 'bg-white/10',
    'R&B': selected ? 'bg-green-500/50' : 'bg-white/10',
    'Jazz': selected ? 'bg-orange-500/50' : 'bg-white/10',
    'Classical': selected ? 'bg-indigo-500/50' : 'bg-white/10',
    'Country': selected ? 'bg-amber-500/50' : 'bg-white/10',
    'Folk': selected ? 'bg-lime-500/50' : 'bg-white/10',
    'Metal': selected ? 'bg-slate-500/50' : 'bg-white/10',
    'Punk': selected ? 'bg-rose-500/50' : 'bg-white/10',
    'Blues': selected ? 'bg-cyan-500/50' : 'bg-white/10',
    'Reggae': selected ? 'bg-emerald-500/50' : 'bg-white/10',
    'Soul': selected ? 'bg-violet-500/50' : 'bg-white/10',
    'Funk': selected ? 'bg-fuchsia-500/50' : 'bg-white/10',
  };
  return colors[genre] || (selected ? 'bg-gray-500/50' : 'bg-white/10');
};

const SettingsPage = ({
  isOpen,
  onClose,
  selectedGenres,
  onGenreToggle,
}: SettingsPageProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-screen p-0 flex flex-col bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950">
        <DialogClose className="absolute right-4 top-4 rounded-full p-2 bg-white/20 hover:bg-white/40 transition-all">
          <X className="h-5 w-5 text-white" />
        </DialogClose>

        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none rounded-b-3xl" />
            <header className="px-6 pt-10 pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Settings2 className="w-7 h-7 text-white/90" />
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-white text-center mb-1 drop-shadow-lg">Settings</h2>
              <p className="text-center text-white/70 text-base">Customize your music preferences</p>
            </header>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="px-4 pb-24">
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-400/20 flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Music Genres</h3>
                      <p className="text-sm text-white/60">Select the genres you want to discover</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {allGenres.map((genre) => {
                      const selected = selectedGenres.includes(genre);
                      return (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => onGenreToggle(genre)}
                          className={`w-full px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 ${getGenreColor(genre, selected)} ${selected ? '' : 'opacity-60 hover:opacity-100'}`}
                          aria-pressed={selected}
                        >
                          {genre}
                        </button>
                      );
                    })}
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