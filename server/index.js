const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

const app = express();
app.use(cors());
app.use(express.json());

// Generate Mock E-commerce Data
const generateData = () => {
  const orders = Array.from({ length: 50 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customerName: faker.person.fullName(),
    email: faker.internet.email(),
    product: faker.commerce.productName(),
    amount: parseFloat(faker.commerce.price({ min: 15, max: 500 })),
    status: faker.helpers.arrayElement(['Delivered', 'Pending', 'Processing', 'Cancelled']),
    date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
  }));

  const stats = {
    totalRevenue: 48250.00,
    totalOrders: 1240,
    totalCustomers: 850,
    conversionRate: '3.2%'
  };

  const chartData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 8000 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 9500 },
  ];

  return { orders, stats, chartData };
};

let db = generateData();

// GET: Dashboard Stats & Charts
app.get('/api/dashboard/stats', (req, res) => {
  res.json({ stats: db.stats, chartData: db.chartData });
});

// GET: Paginated & Filtered Orders
app.get('/api/orders', (req, res) => {
  let { page = 1, limit = 8, search = '', status = '' } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = db.orders;

  if (search) {
    filtered = filtered.filter(o => 
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status) {
    filtered = filtered.filter(o => o.status.toLowerCase() === status.toLowerCase());
  }

  const total = filtered.length;
  const startIdx = (page - 1) * limit;
  const paginatedData = filtered.slice(startIdx, startIdx + limit);

  res.json({
    data: paginatedData,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// POST: Create a new order
app.post('/api/orders', (req, res) => {
  const { customerName, email, product, amount, status } = req.body;
  
  if (!customerName || !product || !amount) {
    return res.status(400).json({ error: 'Missing required order details.' });
  }

  const newOrder = {
    id: `ORD-${1000 + db.orders.length}`,
    customerName,
    email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
    product,
    amount: parseFloat(amount),
    status: status || 'Pending',
    date: new Date().toISOString().split('T')[0],
  };

  db.orders.unshift(newOrder); // Add to beginning of array
  res.status(201).json(newOrder);
});

// PUT: Update order status
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const orderIndex = db.orders.findIndex((o) => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  db.orders[orderIndex].status = status;
  res.json(db.orders[orderIndex]);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));