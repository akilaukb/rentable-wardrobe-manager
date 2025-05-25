
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  List, 
  User, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  TrendingDown 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const MainDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    totalCustomers: 0,
    activeOrders: 0,
    totalRevenue: 0,
    totalCommissions: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [staffPerformance, setStaffPerformance] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch products count
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        const { count: availableCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'available');

        // Fetch customers count
        const { count: customersCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        // Fetch active orders
        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .neq('status', 'completed');

        // Fetch orders for revenue calculation
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount');

        const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

        // Fetch staff commissions
        const { data: staff } = await supabase
          .from('staff')
          .select('commission_earned');

        const totalCommissions = staff?.reduce((sum, s) => sum + (s.commission_earned || 0), 0) || 0;

        setStats({
          totalProducts: productsCount || 0,
          availableProducts: availableCount || 0,
          totalCustomers: customersCount || 0,
          activeOrders: ordersCount || 0,
          totalRevenue,
          totalCommissions
        });

        // Fetch recent orders with customer and product details
        const { data: ordersData } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            status,
            total_amount,
            customers!inner(name),
            products!inner(name)
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentOrders(ordersData || []);

        // Fetch staff performance
        const { data: staffData } = await supabase
          .from('staff')
          .select('name, role, commission_earned')
          .order('commission_earned', { ascending: false });

        setStaffPerformance(staffData || []);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: List,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Available Items',
      value: stats.availableProducts,
      icon: List,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-2%',
      trend: 'down'
    },
    {
      title: 'Revenue (LKR)',
      value: stats.totalRevenue.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Staff Commissions',
      value: stats.totalCommissions.toLocaleString(),
      icon: ArrowRight,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+10%',
      trend: 'up'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to VENEE Rental Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendIcon className={`w-4 h-4 mr-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.order_number}</p>
                    <p className="text-sm text-gray-600">{order.customers?.name}</p>
                    <p className="text-sm text-gray-500">{order.products?.name}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'ready' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      LKR {order.total_amount?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Staff Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffPerformance.map((staff: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{staff.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      LKR {staff.commission_earned?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainDashboard;
