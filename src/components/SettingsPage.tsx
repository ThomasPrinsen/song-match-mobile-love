import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
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

const SettingsPage = ({
  isOpen,
  onClose,
  selectedGenres,
  onGenreToggle,
}: SettingsPageProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[calc(100vh-2rem)] flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="flex-1 overflow-hidden">
          <header className="mb-6">
            <h2 className="text-2xl font-bold text-white text-center">Settings</h2>
            <p className="text-center text-white/60">Customize your music preferences</p>
          </header>

          <ScrollArea className="h-[calc(100%-8rem)]">
            <div className="px-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">Music Genres</h3>
                <div className="grid grid-cols-2 gap-3">
                  {allGenres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => onGenreToggle(genre)}
                        className="data-[state=checked]:bg-music-primary data-[state=checked]:border-music-primary"
                      />
                      <label
                        htmlFor={genre}
                        className="text-sm text-white cursor-pointer"
                      >
                        {genre}
                      </label>
                    </div>
                  ))}
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