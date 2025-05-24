
import { useState } from 'react';
import { Plus, Search, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CustomersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [customers] = useState([
    {
      id: 1,
      name: 'Saman Perera',
      email: 'saman@example.com',
      phone: '+94 77 123 4567',
      totalOrders: 5,
      status: 'active',
      lastOrder: '2025-05-20'
    },
    {
      id: 2,
      name: 'Nimal Silva',
      email: 'nimal@example.com',
      phone: '+94 71 234 5678',
      totalOrders: 3,
      status: 'active',
      lastOrder: '2025-05-18'
    },
    {
      id: 3,
      name: 'Kamala Fernando',
      email: 'kamala@example.com',
      phone: '+94 76 345 6789',
      totalOrders: 8,
      status: 'vip',
      lastOrder: '2025-05-22'
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage customer relationships</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {customers.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {customers.filter(c => c.status === 'vip').length}
              </p>
              <p className="text-sm text-gray-600">VIP</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Orders</p>
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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Contact</th>
                  <th className="text-left p-2">Orders</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Last Order</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="p-2 font-medium">{customer.name}</td>
                    <td className="p-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{customer.totalOrders}</td>
                    <td className="p-2">
                      <Badge variant={customer.status === 'vip' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="p-2">{customer.lastOrder}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
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

export default CustomersDashboard;
