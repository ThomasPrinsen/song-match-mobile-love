import React from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Settings, LogOut, Pencil, Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayback } from "@/contexts/PlaybackContext";
import { useState, useRef, useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { resetPlayback } = usePlayback();
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) setAvatar(savedAvatar);
    // Load liked songs
    try {
      setLikedSongs(JSON.parse(localStorage.getItem('likedSongs') || '[]'));
    } catch {
      setLikedSongs([]);
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatar(result);
        localStorage.setItem('avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    resetPlayback();
    navigate('/login');
  };

  const handleRemoveLikedSong = (songId: string) => {
    const updated = likedSongs.filter((s) => s.id !== songId);
    setLikedSongs(updated);
    localStorage.setItem('likedSongs', JSON.stringify(updated));
  };

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950 w-full max-w-md mx-auto overflow-x-hidden">
        <ScrollArea className="h-full w-full">
          <div className="h-full flex flex-col px-4 pt-10 pb-32 w-full">
            <header className="mb-6">
              <div className="flex items-center justify-center mb-4 relative" style={{ overflow: 'visible' }}>
                <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center group cursor-pointer relative" onClick={handleAvatarClick} id="avatar-container" style={{ overflow: 'visible' }}>
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="h-full w-full object-cover rounded-full z-0 pointer-events-none" />
                  ) : (
                    <User size={40} className="text-white z-0 pointer-events-none" />
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-purple-600 p-1.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center z-50" style={{ pointerEvents: 'auto' }}>
                    <Pencil size={16} className="text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              <h1 className="text-2xl font-extrabold text-white text-center drop-shadow-lg">Your Profile</h1>
            </header>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-4">
                <h2 className="text-lg font-medium text-white mb-2">Account Settings</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 text-white/80 hover:text-white">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 text-white/80 hover:text-white" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                <h2 className="text-lg font-medium text-white mb-2">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">42</div>
                    <div className="text-sm text-white/60">Favorite Songs</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-sm text-white/60">5-Star Ratings</div>
                  </div>
                </div>
              </div>

              {/* Liked Songs Section */}
              <div className="bg-white/5 rounded-2xl p-4 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <h2 className="text-lg font-semibold text-white">Liked Songs</h2>
                </div>
                {likedSongs.length === 0 ? (
                  <div className="text-white/60 text-sm">No liked songs yet.</div>
                ) : (
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {likedSongs.map((song) => (
                      <div key={song.id} className="flex items-center gap-3 bg-white/10 rounded-xl p-2">
                        <img src={song.coverImage} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">{song.title}</div>
                          <div className="text-white/70 text-xs truncate">{song.artist}</div>
                        </div>
                        <button
                          className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-pink-500/80 transition-colors"
                          onClick={() => handleRemoveLikedSong(song.id)}
                          title="Remove from liked songs"
                        >
                          <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                          <X className="w-3 h-3 text-white absolute" style={{ marginLeft: '-10px', marginTop: '-10px' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <NavBar />
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
