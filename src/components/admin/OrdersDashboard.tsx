
import { useState } from 'react';
import { Search, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrdersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'Saman Perera',
      item: 'Navy Blazer',
      staff: 'Kamal De Silva',
      status: 'processing',
      startDate: '2025-05-26',
      endDate: '2025-05-28',
      amount: 2000
    },
    {
      id: 'ORD-002',
      customer: 'Nimal Silva',
      item: 'Black Suit',
      staff: 'Sunil Perera',
      status: 'ready',
      startDate: '2025-05-27',
      endDate: '2025-05-30',
      amount: 4500
    },
    {
      id: 'ORD-003',
      customer: 'Kamala Fernando',
      item: 'White Dress Shirt',
      staff: 'Priya Kumari',
      status: 'ironing',
      startDate: '2025-05-25',
      endDate: '2025-05-27',
      amount: 1500
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'secondary';
      case 'ironing': return 'outline';
      case 'ready': return 'default';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Track and manage rental orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'processing').length}
              </p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'ready').length}
              </p>
              <p className="text-sm text-gray-600">Ready</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                LKR {orders.reduce((sum, o) => sum + o.amount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="ironing">Ironing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order ID</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Item</th>
                  <th className="text-left p-2">Staff</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Period</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-2 font-medium">{order.id}</td>
                    <td className="p-2">{order.customer}</td>
                    <td className="p-2">{order.item}</td>
                    <td className="p-2">{order.staff}</td>
                    <td className="p-2">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="text-sm">
                        <div>{order.startDate}</div>
                        <div className="text-gray-500">to {order.endDate}</div>
                      </div>
                    </td>
                    <td className="p-2 font-medium">LKR {order.amount}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersDashboard;
