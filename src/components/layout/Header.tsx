import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import goiLogo from "@/assets/goi-logo.png";

export const Header = () => {
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

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10 w-64" 
              placeholder="Search"
            />
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
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                About MCA
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Acts & Rules
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                My Workspace
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                My Application
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                MCA Services
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white bg-gov-blue text-sm font-medium">
                Additional Services
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Data & Reports
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Help & FAQs
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-white hover:bg-gov-blue text-sm">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};