
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  List, 
  User, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  TrendingDown 
} from 'lucide-react';
import { sampleProducts, sampleCustomers, sampleOrders, sampleStaff } from '../../data/sampleData';

const MainDashboard = () => {
  const totalProducts = sampleProducts.length;
  const availableProducts = sampleProducts.filter(p => p.status === 'available').length;
  const totalCustomers = sampleCustomers.length;
  const activeOrders = sampleOrders.filter(o => o.status !== 'completed').length;
  const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalCommissions = sampleStaff.reduce((sum, staff) => sum + staff.commissionEarned, 0);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: List,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Available Items',
      value: availableProducts,
      icon: List,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Active Orders',
      value: activeOrders,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-2%',
      trend: 'down'
    },
    {
      title: 'Revenue (LKR)',
      value: totalRevenue.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Staff Commissions',
      value: totalCommissions.toLocaleString(),
      icon: ArrowRight,
      color: 'text-navy-600',
      bgColor: 'bg-navy-100',
      change: '+10%',
      trend: 'up'
    }
  ];

  const recentOrders = sampleOrders.slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your rental business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.itemName}</p>
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
                      LKR {order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Staff Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleStaff.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{staff.role}</p>
                    <p className="text-sm text-gray-500">{staff.ordersHandled} orders handled</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {staff.performance}% Performance
                    </p>
                    <p className="text-sm text-gray-600">
                      LKR {staff.commissionEarned.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="p-4 bg-navy-50 rounded-lg text-left hover:bg-navy-100 transition-colors">
              <List className="w-6 h-6 text-navy-600 mb-2" />
              <p className="font-medium text-gray-900">Add Product</p>
              <p className="text-sm text-gray-600">Add new rental item</p>
            </button>
            
            <button className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
              <User className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">New Customer</p>
              <p className="text-sm text-gray-600">Register new customer</p>
            </button>
            
            <button className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
              <Calendar className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Create Order</p>
              <p className="text-sm text-gray-600">Process new rental</p>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors">
              <ArrowRight className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-sm text-gray-600">Business analytics</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainDashboard;
