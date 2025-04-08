
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Music, Mic, User, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("fan");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login successful!",
      description: `Welcome back, ${userType === 'artist' ? 'Artist' : 'Music Fan'}!`,
    });
    
    // In a real app, we would handle authentication here
    localStorage.setItem('userType', userType);
    navigate("/discover");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MobileLayout>
      <div className="h-full flex flex-col items-center px-6 pt-10 pb-20">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-music-primary to-music-secondary flex items-center justify-center mb-4 animate-pulse-slow">
            <h1 className="text-3xl font-bold text-white">T</h1>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
            Thammy
          </h1>
          <p className="text-center text-gray-500 text-sm mt-1">
            Where music breaks through
          </p>
        </div>

        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="userType">Who are you?</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={setUserType}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  <div className={`flex flex-col items-center p-4 rounded-lg border ${userType === 'fan' ? 'border-music-primary bg-music-accent/30' : 'border-gray-200'}`}>
                    <RadioGroupItem value="fan" id="fan" className="sr-only" />
                    <Music size={24} className={`mb-2 ${userType === 'fan' ? 'text-music-primary' : 'text-gray-400'}`} />
                    <Label htmlFor="fan" className={`font-medium ${userType === 'fan' ? 'text-music-primary' : ''}`}>Music Fan</Label>
                  </div>
                  
                  <div className={`flex flex-col items-center p-4 rounded-lg border ${userType === 'artist' ? 'border-music-primary bg-music-accent/30' : 'border-gray-200'}`}>
                    <RadioGroupItem value="artist" id="artist" className="sr-only" />
                    <Mic size={24} className={`mb-2 ${userType === 'artist' ? 'text-music-primary' : 'text-gray-400'}`} />
                    <Label htmlFor="artist" className={`font-medium ${userType === 'artist' ? 'text-music-primary' : ''}`}>Artist</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-xs text-music-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Reset Password",
                        description: "Password reset would be implemented in a full app"
                      });
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative mt-1">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    setRememberMe(checked as boolean);
                  }}
                />
                <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a 
                href="#" 
                className="text-music-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Sign up",
                    description: "Sign up would be implemented in a full app"
                  });
                }}
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
