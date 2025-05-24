
import { useState } from 'react';
import { Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CommissionPage = () => {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  
  const [commissions] = useState([
    {
      id: 1,
      orderId: 'ORD-001',
      customer: 'Saman Perera',
      item: 'Navy Blazer',
      amount: 1500,
      commission: 150,
      date: '2024-01-15',
      status: 'paid'
    },
    {
      id: 2,
      orderId: 'ORD-002',
      customer: 'Nimal Silva',
      item: 'Black Suit',
      amount: 2000,
      commission: 200,
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: 3,
      orderId: 'ORD-003',
      customer: 'Kumari Fernando',
      item: 'Dress Shirt',
      amount: 800,
      commission: 80,
      date: '2024-01-25',
      status: 'paid'
    }
  ]);

  const totalCommission = commissions.reduce((sum, c) => sum + c.commission, 0);
  const paidCommission = commissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commission, 0);
  const pendingCommission = commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commission, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Commissions</h1>
          <p className="text-gray-600">Track your earned commissions</p>
        </div>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Filter by Date Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Apply Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-600">LKR {totalCommission}</p>
                <p className="text-sm text-gray-600">Total Commission</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-blue-600">LKR {paidCommission}</p>
                <p className="text-sm text-gray-600">Paid Commission</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-orange-600">LKR {pendingCommission}</p>
                <p className="text-sm text-gray-600">Pending Commission</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Details */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Order Amount</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell className="font-medium">{commission.orderId}</TableCell>
                  <TableCell>{commission.customer}</TableCell>
                  <TableCell>{commission.item}</TableCell>
                  <TableCell>LKR {commission.amount}</TableCell>
                  <TableCell className="font-bold text-green-600">
                    LKR {commission.commission}
                  </TableCell>
                  <TableCell>{commission.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      commission.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {commission.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionPage;
