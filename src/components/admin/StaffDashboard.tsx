
import { useState } from 'react';
import { Plus, Search, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [staff] = useState([
    {
      id: 1,
      name: 'Kamal De Silva',
      role: 'sales',
      email: 'kamal@clothingrental.com',
      phone: '+94 77 888 1234',
      commission: 12500,
      orders: 8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sunil Perera',
      role: 'sales',
      email: 'sunil@clothingrental.com',
      phone: '+94 71 777 5678',
      commission: 15000,
      orders: 10,
      status: 'active'
    },
    {
      id: 3,
      name: 'Priya Kumari',
      role: 'ironing',
      email: 'priya@clothingrental.com',
      phone: '+94 76 666 9012',
      commission: 8000,
      orders: 15,
      status: 'active'
    }
  ]);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage team and track performance</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {staff.filter(s => s.role === 'sales').length}
              </p>
              <p className="text-sm text-gray-600">Sales Staff</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {staff.filter(s => s.role === 'ironing').length}
              </p>
              <p className="text-sm text-gray-600">Ironing Staff</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                LKR {staff.reduce((sum, s) => sum + s.commission, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Commissions</p>
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
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Contact</th>
                  <th className="text-left p-2">Orders</th>
                  <th className="text-left p-2">Commission</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="p-2 font-medium">{member.name}</td>
                    <td className="p-2">
                      <Badge variant={member.role === 'sales' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="text-sm">
                        <div>{member.email}</div>
                        <div className="text-gray-500">{member.phone}</div>
                      </div>
                    </td>
                    <td className="p-2">{member.orders}</td>
                    <td className="p-2 font-medium">LKR {member.commission}</td>
                    <td className="p-2">
                      <Badge variant="outline">{member.status}</Badge>
                    </td>
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

export default StaffDashboard;
