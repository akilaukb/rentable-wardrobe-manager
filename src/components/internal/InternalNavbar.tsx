
import { Button } from '@/components/ui/button';
import { LogOut, Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InternalNavbarProps {
  userRole: string | null;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const InternalNavbar = ({ userRole, onLogout, onToggleSidebar }: InternalNavbarProps) => {
  const getRoleDisplayName = (role: string | null) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'sales': return 'Sales Staff';
      case 'ironing': return 'Processing Staff';
      case 'supervisor': return 'Supervisor';
      default: return 'User';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-5 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Rental Management System
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {getRoleDisplayName(userRole)}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>
                <User className="w-4 h-4 mr-2" />
                {getRoleDisplayName(userRole)}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default InternalNavbar;
