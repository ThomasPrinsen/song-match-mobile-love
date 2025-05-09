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

    // Define credentials based on user type
    const credentials = {
      fan: { email: "musicfan@gmail.com", password: "test123" },
      artist: { email: "artist@gmail.com", password: "test123" }
    };

    const selectedCredentials = credentials[userType as keyof typeof credentials];

    // Check if entered credentials match the selected role
    if (email === selectedCredentials.email && password === selectedCredentials.password) {
      toast({
        title: "✅ Login successful!",
        description: `Welcome back, ${userType === 'artist' ? 'Artist' : 'Music Fan'}!`,
        className: "bg-gradient-to-r from-purple-700 to-purple-900 border-purple-500 text-white shadow-lg",
      });
      
      localStorage.setItem('userType', userType);
      navigate("/discover");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password",
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MobileLayout>
      <div className="min-h-full flex flex-col bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950">
        <div className="flex-grow flex flex-col justify-center items-center px-4 pt-10 pb-32">
          <div className="w-full max-w-md">
            <div className="bg-white/5 rounded-3xl p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <h1 className="text-3xl font-bold text-white">T</h1>
                </div>
                <h1 className="text-2xl font-extrabold text-white text-center mb-1 drop-shadow-lg">Thammy</h1>
                <p className="text-center text-white/60 text-sm">Where music breaks through</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userType" className="text-white">Who are you?</Label>
                    <RadioGroup
                      value={userType}
                      onValueChange={setUserType}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      <div className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-200 ${userType === 'fan' ? 'border-purple-500 bg-purple-500/20' : 'border-white/10 hover:bg-white/10'}`}>
                        <RadioGroupItem value="fan" id="fan" className="sr-only" />
                        <Music size={24} className={`mb-2 ${userType === 'fan' ? 'text-purple-400' : 'text-white/40'}`} />
                        <Label htmlFor="fan" className={`font-medium ${userType === 'fan' ? 'text-purple-400' : 'text-white/80'}`}>Music Fan</Label>
                      </div>
                      <div className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-200 ${userType === 'artist' ? 'border-purple-500 bg-purple-500/20' : 'border-white/10 hover:bg-white/10'}`}>
                        <RadioGroupItem value="artist" id="artist" className="sr-only" />
                        <Mic size={24} className={`mb-2 ${userType === 'artist' ? 'text-purple-400' : 'text-white/40'}`} />
                        <Label htmlFor="artist" className={`font-medium ${userType === 'artist' ? 'text-purple-400' : 'text-white/80'}`}>Artist</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/40"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <a 
                        href="#" 
                        className="text-xs text-purple-400 hover:underline"
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
                        className="pr-10 bg-white/10 border-white/20 text-white placeholder-white/40"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-white/40" />
                        ) : (
                          <Eye className="h-5 w-5 text-white/40" />
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
                      className="border-white/20"
                    />
                    <Label htmlFor="remember" className="text-white/80 text-sm">Remember me on this device</Label>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full py-3 text-lg shadow-md transition-colors">
                  Sign in
                </Button>
                <p className="text-center text-sm text-white/60">
                  Don't have an account?{" "}
                  <a 
                    href="#" 
                    className="text-purple-400 hover:underline"
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
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
