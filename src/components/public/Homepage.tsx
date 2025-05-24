
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { sampleProducts, categories } from '../../data/sampleData';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProducts = sampleProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-600 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Premium Clothing Rental
          </h1>
          <p className="text-xl text-navy-200 mb-8 max-w-2xl mx-auto">
            Rent high-quality formal wear for special occasions. 
            Perfect fit, professional service, affordable prices.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for clothing items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg bg-white"
              />
            </div>
          </div>

          <Link to="/products">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Browse Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Link key={category} to={`/products?category=${category}`}>
                <Button 
                  variant="outline" 
                  className="w-full py-6 text-lg hover:bg-navy-50 hover:border-navy-300"
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
            <p className="text-lg text-gray-600">Our most popular rental items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-navy-600">
                        LKR {product.price}/day
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <Button className="w-full mt-4">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
              <p className="text-gray-600">Expert fitting and professional preparation for your special occasion.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">Fast processing and same-day availability for urgent requirements.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect Fit</h3>
              <p className="text-gray-600">Professional alterations included to ensure the perfect fit.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
