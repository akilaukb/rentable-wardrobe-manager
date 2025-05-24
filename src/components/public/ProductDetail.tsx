
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleProducts } from '../../data/sampleData';

const ProductDetail = () => {
  const { id } = useParams();
  const product = sampleProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center text-navy-600 hover:text-navy-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-navy-600">
                  LKR {product.price}/day
                </span>
                <Badge variant={product.status === 'available' ? 'default' : 'destructive'}>
                  {product.status}
                </Badge>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Rental Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>Minimum rental: 1 day</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span>Professional fitting included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Link to="/booking" state={{ product }}>
                <Button 
                  size="lg" 
                  className="w-full"
                  disabled={product.status !== 'available'}
                >
                  {product.status === 'available' ? 'Book Now' : 'Currently Unavailable'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
