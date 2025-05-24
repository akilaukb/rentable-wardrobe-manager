
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Settings, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
}

const Navbar = ({ currentView, setCurrentView, isLoggedIn, setIsLoggedIn, userRole, setUserRole }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Demo login - cycle through roles
    const roles = ['customer', 'staff', 'admin'];
    const currentIndex = roles.indexOf(userRole);
    const nextRole = roles[(currentIndex + 1) % roles.length];
    setUserRole(nextRole);
  };

  const handleViewSwitch = (view: string) => {
    setCurrentView(view);
    if (view === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ClothingRental</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant={currentView === 'public' ? 'default' : 'ghost'}
                onClick={() => handleViewSwitch('public')}
                className="text-sm"
              >
                Store
              </Button>
              {isLoggedIn && (userRole === 'admin' || userRole === 'staff') && (
                <Button
                  variant={currentView === 'admin' ? 'default' : 'ghost'}
                  onClick={() => handleViewSwitch('admin')}
                  className="text-sm"
                >
                  Admin Panel
                </Button>
              )}
            </div>
          </div>

          {/* Search Bar (only in public view) */}
          {currentView === 'public' && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search clothing items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600 capitalize">
                  {userRole} Mode
                </span>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={handleLogin} size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
