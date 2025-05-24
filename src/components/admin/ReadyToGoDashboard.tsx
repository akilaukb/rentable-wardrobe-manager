
import { useState } from 'react';
import { Search, CheckCircle, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReadyToGoDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [readyOrders] = useState([
    {
      id: 'ORD-002',
      customer: 'Nimal Silva',
      phone: '+94 71 234 5678',
      item: 'Black Suit',
      pickupDate: '2025-05-27',
      notified: true,
      timeReady: '2025-05-26 14:30'
    },
    {
      id: 'ORD-005',
      customer: 'Ravi Jayasinghe',
      phone: '+94 77 987 6543',
      item: 'Navy Blazer',
      pickupDate: '2025-05-28',
      notified: false,
      timeReady: '2025-05-26 16:15'
    },
    {
      id: 'ORD-007',
      customer: 'Amara Weerasinghe',
      phone: '+94 76 543 2109',
      item: 'Formal Dress',
      pickupDate: '2025-05-29',
      notified: true,
      timeReady: '2025-05-26 11:45'
    }
  ]);

  const filteredOrders = readyOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNotifyCustomer = (orderId: string) => {
    console.log(`Notifying customer for order ${orderId}`);
    // Here you would integrate with SMS/Email service
    alert(`Customer notified for order ${orderId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ready to Go</h1>
          <p className="text-gray-600">Items ready for customer pickup</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{readyOrders.length}</p>
              <p className="text-sm text-gray-600">Ready Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {readyOrders.filter(o => o.notified).length}
              </p>
              <p className="text-sm text-gray-600">Customers Notified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {readyOrders.filter(o => !o.notified).length}
              </p>
              <p className="text-sm text-gray-600">Pending Notification</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {readyOrders.filter(o => o.pickupDate === '2025-05-27').length}
              </p>
              <p className="text-sm text-gray-600">Due Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search ready orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Ready Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Items Ready for Pickup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order ID</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Item</th>
                  <th className="text-left p-2">Pickup Date</th>
                  <th className="text-left p-2">Ready Since</th>
                  <th className="text-left p-2">Notification</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-2 font-medium">{order.id}</td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {order.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{order.item}</td>
                    <td className="p-2">{order.pickupDate}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{order.timeReady}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant={order.notified ? 'default' : 'destructive'}>
                        {order.notified ? 'Notified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        {!order.notified && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleNotifyCustomer(order.id)}
                          >
                            Notify
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
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

export default ReadyToGoDashboard;
