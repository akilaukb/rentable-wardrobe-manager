
import { useState } from 'react';
import { Calendar, Package, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomerDashboard = () => {
  const [activeBookings] = useState([
    {
      id: 1,
      item: 'Navy Blazer',
      startDate: '2025-05-26',
      endDate: '2025-05-28',
      status: 'confirmed',
      price: 1000
    },
    {
      id: 2,
      item: 'Black Suit',
      startDate: '2025-06-01',
      endDate: '2025-06-03',
      status: 'processing',
      price: 1500
    }
  ]);

  const [rentalHistory] = useState([
    {
      id: 3,
      item: 'White Dress Shirt',
      date: '2025-05-20',
      status: 'completed',
      price: 500
    },
    {
      id: 4,
      item: 'Gray Trousers',
      date: '2025-05-15',
      status: 'completed',
      price: 800
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your rentals and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-navy-100 rounded-lg">
                  <Package className="w-6 h-6 text-navy-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold">{activeBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Rentals</p>
                  <p className="text-2xl font-bold">{activeBookings.length + rentalHistory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Returns</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-2xl font-bold">2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="history">Rental History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.item}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.startDate} to {booking.endDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                        <span className="font-semibold">LKR {booking.price}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentalHistory.map((rental) => (
                    <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{rental.item}</h3>
                        <p className="text-sm text-gray-600">{rental.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{rental.status}</Badge>
                        <span className="font-semibold">LKR {rental.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Profile management features will be available once authentication is set up.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
