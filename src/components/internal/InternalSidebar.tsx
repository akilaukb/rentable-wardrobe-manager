
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Users, 
  Calendar, 
  UserCog,
  CheckCircle,
  RotateCcw,
  UserPlus,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InternalSidebarProps {
  userRole: string | null;
  collapsed: boolean;
}

const InternalSidebar = ({ userRole, collapsed }: InternalSidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', icon: Home, label: 'Dashboard', roles: ['admin', 'supervisor', 'sales', 'ironing'] },
    { path: '/admin/orders', icon: Calendar, label: 'Orders', roles: ['admin', 'supervisor', 'sales', 'ironing'] },
    { path: '/admin/products', icon: Package, label: 'Products', roles: ['admin', 'supervisor', 'sales'] },
    { path: '/admin/customers', icon: Users, label: 'Customers', roles: ['admin', 'supervisor', 'sales'] },
    { path: '/admin/ready', icon: CheckCircle, label: 'Ready to Go', roles: ['admin', 'supervisor', 'sales'] },
    { path: '/admin/returns', icon: RotateCcw, label: 'Returns', roles: ['admin', 'supervisor', 'sales'] },
    { path: '/admin/staff', icon: UserCog, label: 'Staff', roles: ['admin', 'supervisor'] },
    { path: '/admin/users', icon: UserPlus, label: 'User Management', roles: ['admin'] },
    { path: '/admin/commissions', icon: DollarSign, label: 'Commissions', roles: ['admin', 'sales'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole || '')
  );

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`fixed left-0 top-16 h-full bg-white shadow-lg border-r border-gray-200 z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Management
          </h2>
        )}
        
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? 'bg-navy-50 text-navy-700 border-l-4 border-navy-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default InternalSidebar;
