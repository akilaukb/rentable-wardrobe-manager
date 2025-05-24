
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InternalNavbar from './InternalNavbar';
import InternalSidebar from './InternalSidebar';
import MainDashboard from '../admin/MainDashboard';
import ProductsDashboard from '../admin/ProductsDashboard';
import CustomersDashboard from '../admin/CustomersDashboard';
import OrdersDashboard from '../admin/OrdersDashboard';
import StaffDashboard from '../admin/StaffDashboard';
import ReadyToGoDashboard from '../admin/ReadyToGoDashboard';
import ReturnsDashboard from '../admin/ReturnsDashboard';
import UserManagementPage from './UserManagementPage';
import CommissionPage from './CommissionPage';

interface InternalDashboardProps {
  userRole: string | null;
}

const InternalDashboard = ({ userRole }: InternalDashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InternalNavbar 
        userRole={userRole} 
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex">
        <InternalSidebar 
          userRole={userRole} 
          collapsed={sidebarCollapsed}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/products" element={<ProductsDashboard />} />
            <Route path="/customers" element={<CustomersDashboard />} />
            <Route path="/orders" element={<OrdersDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/ready" element={<ReadyToGoDashboard />} />
            <Route path="/returns" element={<ReturnsDashboard />} />
            
            {/* Admin-only routes */}
            {userRole === 'admin' && (
              <Route path="/users" element={<UserManagementPage />} />
            )}
            
            {/* Sales staff commission page */}
            {(userRole === 'sales' || userRole === 'admin') && (
              <Route path="/commissions" element={<CommissionPage />} />
            )}
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default InternalDashboard;
