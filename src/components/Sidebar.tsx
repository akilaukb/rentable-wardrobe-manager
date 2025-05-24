
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  List, 
  User, 
  Calendar, 
  Settings, 
  Book,
  ArrowRight 
} from 'lucide-react';

const Sidebar = ({ currentView }: { currentView: string }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: Home, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: List, label: 'Products' },
    { path: '/admin/customers', icon: User, label: 'Customers' },
    { path: '/admin/orders', icon: Calendar, label: 'Orders' },
    { path: '/admin/staff', icon: Settings, label: 'Staff Management' },
    { path: '/admin/ready', icon: Book, label: 'Ready to Go' },
    { path: '/admin/returns', icon: ArrowRight, label: 'Returns' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (currentView !== 'admin') return null;

  return (
    <div className="fixed left-0 top-16 w-64 h-full bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-navy-50 text-navy-700 border-l-4 border-navy-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
