
import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReturnsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [returns] = useState([
    {
      id: 'ORD-001',
      customer: 'Saman Perera',
      item: 'Navy Blazer',
      returnDate: '2025-05-28',
      actualReturn: '2025-05-28',
      status: 'returned',
      condition: 'good',
      amount: 2000,
      lateFee: 0
    },
    {
      id: 'ORD-003',
      customer: 'Kamala Fernando',
      item: 'White Dress Shirt',
      returnDate: '2025-05-27',
      actualReturn: '2025-05-29',
      status: 'late',
      condition: 'good',
      amount: 1500,
      lateFee: 300
    },
    {
      id: 'ORD-006',
      customer: 'Tharaka Silva',
      item: 'Gray Trousers',
      returnDate: '2025-05-26',
      actualReturn: null,
      status: 'overdue',
      condition: 'pending',
      amount: 1200,
      lateFee: 600
    }
  ]);

  const filteredReturns = returns.filter(returnItem => {
    const matchesSearch = returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || returnItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'returned': return 'default';
      case 'late': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'good': return 'default';
      case 'damaged': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Returns</h1>
          <p className="text-gray-600">Track item returns and late fees</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{returns.length}</p>
              <p className="text-sm text-gray-600">Total Returns</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {returns.filter(r => r.status === 'returned').length}
              </p>
              <p className="text-sm text-gray-600">On Time</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {returns.filter(r => r.status === 'overdue').length}
              </p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                LKR {returns.reduce((sum, r) => sum + r.lateFee, 0)}
              </p>
              <p className="text-sm text-gray-600">Late Fees</p>
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
                  placeholder="Search returns..."
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
              <option value="returned">Returned</option>
              <option value="late">Late</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Returns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Return Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order ID</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Item</th>
                  <th className="text-left p-2">Due Date</th>
                  <th className="text-left p-2">Actual Return</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Condition</th>
                  <th className="text-left p-2">Late Fee</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReturns.map((returnItem) => (
                  <tr key={returnItem.id} className="border-b">
                    <td className="p-2 font-medium">{returnItem.id}</td>
                    <td className="p-2">{returnItem.customer}</td>
                    <td className="p-2">{returnItem.item}</td>
                    <td className="p-2">{returnItem.returnDate}</td>
                    <td className="p-2">
                      {returnItem.actualReturn || 'Not returned'}
                    </td>
                    <td className="p-2">
                      <Badge variant={getStatusColor(returnItem.status)}>
                        {returnItem.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant={getConditionColor(returnItem.condition)}>
                        {returnItem.condition}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <span className="font-medium">
                        LKR {returnItem.lateFee}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        {returnItem.status === 'overdue' && (
                          <Button variant="outline" size="sm">
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View
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

export default ReturnsDashboard;
