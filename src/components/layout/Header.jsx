import React from "react";
import { Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import goiLogo from "@/assets/goi-logo.png";

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-background border-b">
      {/* Top header with logo and search */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src={goiLogo} alt="Government of India" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gov-blue">MINISTRY OF</h1>
              <h1 className="text-xl font-bold text-gov-blue">CORPORATE AFFAIRS</h1>
              <p className="text-xs text-muted-foreground mt-1">GOVERNMENT OF INDIA</p>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-lg font-semibold text-foreground">EMPOWERING BUSINESS, PROTECTING INVESTORS</h2>
            <div className="flex space-x-2 text-xs mt-1">
              <span className="text-gov-orange">REGULATOR</span>
              <span>•</span>
              <span className="text-gov-green">INTEGRATOR</span>
              <span>•</span>
              <span className="text-gov-red">FACILITATOR</span>
              <span>•</span>
              <span className="text-gov-blue">EDUCATOR</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10 w-64" 
                placeholder="Search"
              />
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Signed in
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="outline">
                Sign In / Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-gov-blue-dark">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-0">
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Home
              </a>
            </li>
            <li>
              <a href="/consultation-listing" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Consultation Listing
              </a>
            </li>
              <a href="https://ishaan145.github.io/Saaransh/" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Saaransh
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};