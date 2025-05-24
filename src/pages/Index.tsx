
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Homepage from '../components/public/Homepage';
import ProductListing from '../components/public/ProductListing';
import ProductDetail from '../components/public/ProductDetail';
import BookingPage from '../components/public/BookingPage';
import CustomerDashboard from '../components/public/CustomerDashboard';
import MainDashboard from '../components/admin/MainDashboard';
import ProductsDashboard from '../components/admin/ProductsDashboard';
import CustomersDashboard from '../components/admin/CustomersDashboard';
import OrdersDashboard from '../components/admin/OrdersDashboard';
import StaffDashboard from '../components/admin/StaffDashboard';
import ReadyToGoDashboard from '../components/admin/ReadyToGoDashboard';
import ReturnsDashboard from '../components/admin/ReturnsDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState('public');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('customer'); // customer, staff, admin

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userRole={userRole}
        setUserRole={setUserRole}
      />
      
      <div className="flex">
        {currentView === 'admin' && (
          <Sidebar currentView={currentView} />
        )}
        
        <main className={`flex-1 ${currentView === 'admin' ? 'ml-64' : ''} transition-all duration-300`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<MainDashboard />} />
            <Route path="/admin/products" element={<ProductsDashboard />} />
            <Route path="/admin/customers" element={<CustomersDashboard />} />
            <Route path="/admin/orders" element={<OrdersDashboard />} />
            <Route path="/admin/staff" element={<StaffDashboard />} />
            <Route path="/admin/ready" element={<ReadyToGoDashboard />} />
            <Route path="/admin/returns" element={<ReturnsDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Index;
