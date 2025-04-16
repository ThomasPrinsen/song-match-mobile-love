import React from "react";
import MobileLayout from "@/components/MobileLayout";
import NavBar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Settings, LogOut } from "lucide-react";

const ProfilePage = () => {
  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <ScrollArea className="h-full">
          <div className="h-full flex flex-col px-4 pt-10 pb-32">
            <header className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white text-center">Your Profile</h1>
            </header>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h2 className="text-lg font-medium text-white mb-2">Account Settings</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 text-white/80 hover:text-white">
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 text-white/80 hover:text-white">
                    <LogOut size={20} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h2 className="text-lg font-medium text-white mb-2">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">42</div>
                    <div className="text-sm text-white/60">Favorite Songs</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-sm text-white/60">5-Star Ratings</div>
                  </div>
                </div>
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
