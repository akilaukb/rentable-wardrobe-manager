
export const sampleProducts = [
  {
    id: 1,
    name: 'Navy Business Blazer',
    category: 'Blazers',
    stock: 5,
    status: 'available',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    description: 'Premium navy blazer perfect for business meetings and formal events.',
    sizes: ['S', 'M', 'L', 'XL'],
    adjustmentNotes: 'Minor sleeve adjustment possible'
  },
  {
    id: 2,
    name: 'Charcoal Wool Coat',
    category: 'Coats',
    stock: 3,
    status: 'available',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    description: 'Elegant charcoal wool coat for winter occasions.',
    sizes: ['M', 'L', 'XL'],
    adjustmentNotes: 'Length adjustment available'
  },
  {
    id: 3,
    name: 'Black Formal Trousers',
    category: 'Trousers',
    stock: 8,
    status: 'available',
    price: 600,
    image: 'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=400&h=500&fit=crop',
    description: 'Classic black formal trousers with perfect fit.',
    sizes: ['30', '32', '34', '36', '38'],
    adjustmentNotes: 'Hemming included'
  },
  {
    id: 4,
    name: 'Gray Wedding Suit',
    category: 'Suits',
    stock: 2,
    status: 'booked',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
    description: 'Complete gray wedding suit with vest.',
    sizes: ['M', 'L'],
    adjustmentNotes: 'Full tailoring service available'
  },
  {
    id: 5,
    name: 'White Dress Shirt',
    category: 'Shirts',
    stock: 12,
    status: 'available',
    price: 400,
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop',
    description: 'Crisp white dress shirt for formal occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    adjustmentNotes: 'Professional pressing included'
  }
];

export const sampleCustomers = [
  {
    id: 1,
    name: 'Saman Perera',
    email: 'saman@example.com',
    phone: '+94 77 123 4567',
    orderHistory: 5,
    notificationStatus: 'active',
    joinDate: '2024-01-15',
    totalSpent: 15000
  },
  {
    id: 2,
    name: 'Kasuni Silva',
    email: 'kasuni@example.com',
    phone: '+94 71 234 5678',
    orderHistory: 3,
    notificationStatus: 'active',
    joinDate: '2024-02-20',
    totalSpent: 8500
  },
  {
    id: 3,
    name: 'Nuwan Fernando',
    email: 'nuwan@example.com',
    phone: '+94 76 345 6789',
    orderHistory: 8,
    notificationStatus: 'inactive',
    joinDate: '2023-11-10',
    totalSpent: 22000
  }
];

export const sampleOrders = [
  {
    id: 'ORD-001',
    customerId: 1,
    customerName: 'Saman Perera',
    itemId: 1,
    itemName: 'Navy Business Blazer',
    staffId: 1,
    staffName: 'Chamari Sales',
    status: 'processing',
    rentalStart: '2025-05-25',
    rentalEnd: '2025-05-28',
    commission: 200,
    totalAmount: 3000,
    createdAt: '2025-05-20'
  },
  {
    id: 'ORD-002',
    customerId: 2,
    customerName: 'Kasuni Silva',
    itemId: 2,
    itemName: 'Charcoal Wool Coat',
    staffId: 2,
    staffName: 'Priya Processing',
    status: 'ready',
    rentalStart: '2025-05-26',
    rentalEnd: '2025-05-29',
    commission: 150,
    totalAmount: 4500,
    createdAt: '2025-05-21'
  },
  {
    id: 'ORD-003',
    customerId: 3,
    customerName: 'Nuwan Fernando',
    itemId: 4,
    itemName: 'Gray Wedding Suit',
    staffId: 1,
    staffName: 'Chamari Sales',
    status: 'ironing',
    rentalStart: '2025-06-01',
    rentalEnd: '2025-06-03',
    commission: 500,
    totalAmount: 7500,
    createdAt: '2025-05-22'
  }
];

export const sampleStaff = [
  {
    id: 1,
    name: 'Chamari Sales',
    role: 'sales',
    commissionEarned: 15000,
    ordersHandled: 25,
    joinDate: '2024-01-01',
    performance: 95
  },
  {
    id: 2,
    name: 'Priya Processing',
    role: 'ironing',
    commissionEarned: 12000,
    ordersHandled: 40,
    joinDate: '2024-02-01',
    performance: 92
  },
  {
    id: 3,
    name: 'Dinesh Supervisor',
    role: 'supervisor',
    commissionEarned: 8000,
    ordersHandled: 0,
    joinDate: '2023-12-01',
    performance: 98
  }
];

export const categories = ['All', 'Blazers', 'Coats', 'Trousers', 'Suits', 'Shirts'];
