// Sample B2C data for the analytics platform

export interface Customer {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: string;
  segment: 'Premium' | 'Regular' | 'New';
  totalSpent: number;
  ordersCount: number;
  lastPurchase: string;
  joinDate: string;
}

export interface Sale {
  id: string;
  customerId: string;
  product: string;
  category: string;
  amount: number;
  quantity: number;
  date: string;
  channel: 'Website' | 'Mobile App' | 'In-Store';
}

export interface WebActivity {
  date: string;
  pageViews: number;
  sessions: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

export interface MarketTrend {
  month: string;
  revenue: number;
  customers: number;
  avgOrderValue: number;
  returnRate: number;
}

// Generate sample customers
export const sampleCustomers: Customer[] = [
  { id: 'C001', name: 'Emma Wilson', email: 'emma.w@email.com', age: 28, gender: 'Female', location: 'New York', segment: 'Premium', totalSpent: 4520, ordersCount: 23, lastPurchase: '2024-01-15', joinDate: '2022-03-10' },
  { id: 'C002', name: 'James Chen', email: 'j.chen@email.com', age: 35, gender: 'Male', location: 'San Francisco', segment: 'Premium', totalSpent: 3890, ordersCount: 18, lastPurchase: '2024-01-18', joinDate: '2021-11-22' },
  { id: 'C003', name: 'Sofia Rodriguez', email: 's.rodriguez@email.com', age: 42, gender: 'Female', location: 'Miami', segment: 'Regular', totalSpent: 1250, ordersCount: 8, lastPurchase: '2024-01-10', joinDate: '2023-02-14' },
  { id: 'C004', name: 'Michael Brown', email: 'm.brown@email.com', age: 31, gender: 'Male', location: 'Chicago', segment: 'Regular', totalSpent: 980, ordersCount: 6, lastPurchase: '2024-01-12', joinDate: '2023-05-08' },
  { id: 'C005', name: 'Olivia Davis', email: 'o.davis@email.com', age: 26, gender: 'Female', location: 'Los Angeles', segment: 'New', totalSpent: 320, ordersCount: 2, lastPurchase: '2024-01-19', joinDate: '2024-01-05' },
  { id: 'C006', name: 'William Lee', email: 'w.lee@email.com', age: 45, gender: 'Male', location: 'Seattle', segment: 'Premium', totalSpent: 5200, ordersCount: 28, lastPurchase: '2024-01-17', joinDate: '2021-06-30' },
  { id: 'C007', name: 'Ava Martinez', email: 'a.martinez@email.com', age: 33, gender: 'Female', location: 'Denver', segment: 'Regular', totalSpent: 1650, ordersCount: 11, lastPurchase: '2024-01-14', joinDate: '2022-09-18' },
  { id: 'C008', name: 'Alexander Kim', email: 'a.kim@email.com', age: 29, gender: 'Male', location: 'Boston', segment: 'New', totalSpent: 450, ordersCount: 3, lastPurchase: '2024-01-16', joinDate: '2023-12-01' },
  { id: 'C009', name: 'Isabella Johnson', email: 'i.johnson@email.com', age: 38, gender: 'Female', location: 'Austin', segment: 'Premium', totalSpent: 3100, ordersCount: 15, lastPurchase: '2024-01-20', joinDate: '2022-01-25' },
  { id: 'C010', name: 'Daniel Garcia', email: 'd.garcia@email.com', age: 52, gender: 'Male', location: 'Phoenix', segment: 'Regular', totalSpent: 890, ordersCount: 5, lastPurchase: '2024-01-08', joinDate: '2023-07-12' },
  { id: 'C011', name: 'Mia Thompson', email: 'm.thompson@email.com', age: 24, gender: 'Female', location: 'Portland', segment: 'New', totalSpent: 280, ordersCount: 2, lastPurchase: '2024-01-18', joinDate: '2024-01-10' },
  { id: 'C012', name: 'Ethan White', email: 'e.white@email.com', age: 41, gender: 'Male', location: 'Atlanta', segment: 'Regular', totalSpent: 1420, ordersCount: 9, lastPurchase: '2024-01-11', joinDate: '2022-11-05' },
  { id: 'C013', name: 'Charlotte Harris', email: 'c.harris@email.com', age: 36, gender: 'Female', location: 'Dallas', segment: 'Premium', totalSpent: 2850, ordersCount: 14, lastPurchase: '2024-01-19', joinDate: '2021-08-20' },
  { id: 'C014', name: 'Benjamin Clark', email: 'b.clark@email.com', age: 48, gender: 'Male', location: 'Houston', segment: 'Regular', totalSpent: 1100, ordersCount: 7, lastPurchase: '2024-01-13', joinDate: '2023-03-28' },
  { id: 'C015', name: 'Amelia Lewis', email: 'a.lewis@email.com', age: 27, gender: 'Female', location: 'Nashville', segment: 'New', totalSpent: 520, ordersCount: 4, lastPurchase: '2024-01-17', joinDate: '2023-11-15' },
];

// Generate sample sales data
export const sampleSales: Sale[] = [
  { id: 'S001', customerId: 'C001', product: 'Premium Headphones', category: 'Electronics', amount: 299, quantity: 1, date: '2024-01-15', channel: 'Website' },
  { id: 'S002', customerId: 'C002', product: 'Smart Watch', category: 'Electronics', amount: 449, quantity: 1, date: '2024-01-18', channel: 'Mobile App' },
  { id: 'S003', customerId: 'C003', product: 'Running Shoes', category: 'Sports', amount: 129, quantity: 1, date: '2024-01-10', channel: 'In-Store' },
  { id: 'S004', customerId: 'C001', product: 'Wireless Charger', category: 'Electronics', amount: 59, quantity: 2, date: '2024-01-12', channel: 'Website' },
  { id: 'S005', customerId: 'C005', product: 'Yoga Mat', category: 'Sports', amount: 45, quantity: 1, date: '2024-01-19', channel: 'Mobile App' },
  { id: 'S006', customerId: 'C006', product: 'Laptop Stand', category: 'Office', amount: 89, quantity: 1, date: '2024-01-17', channel: 'Website' },
  { id: 'S007', customerId: 'C007', product: 'Coffee Maker', category: 'Home', amount: 199, quantity: 1, date: '2024-01-14', channel: 'In-Store' },
  { id: 'S008', customerId: 'C002', product: 'Bluetooth Speaker', category: 'Electronics', amount: 149, quantity: 1, date: '2024-01-16', channel: 'Website' },
  { id: 'S009', customerId: 'C009', product: 'Desk Lamp', category: 'Office', amount: 79, quantity: 2, date: '2024-01-20', channel: 'Mobile App' },
  { id: 'S010', customerId: 'C004', product: 'Water Bottle', category: 'Sports', amount: 35, quantity: 3, date: '2024-01-11', channel: 'In-Store' },
  { id: 'S011', customerId: 'C010', product: 'Plant Pot Set', category: 'Home', amount: 65, quantity: 1, date: '2024-01-08', channel: 'Website' },
  { id: 'S012', customerId: 'C011', product: 'Notebook Set', category: 'Office', amount: 28, quantity: 2, date: '2024-01-18', channel: 'Mobile App' },
  { id: 'S013', customerId: 'C013', product: 'Smart Speaker', category: 'Electronics', amount: 179, quantity: 1, date: '2024-01-19', channel: 'Website' },
  { id: 'S014', customerId: 'C014', product: 'Kitchen Scale', category: 'Home', amount: 49, quantity: 1, date: '2024-01-13', channel: 'In-Store' },
  { id: 'S015', customerId: 'C015', product: 'Fitness Tracker', category: 'Electronics', amount: 129, quantity: 1, date: '2024-01-17', channel: 'Mobile App' },
];

// Web activity data (last 14 days)
export const sampleWebActivity: WebActivity[] = [
  { date: '2024-01-07', pageViews: 12500, sessions: 4200, uniqueVisitors: 3100, bounceRate: 42, avgSessionDuration: 185, conversions: 156 },
  { date: '2024-01-08', pageViews: 14200, sessions: 4800, uniqueVisitors: 3500, bounceRate: 38, avgSessionDuration: 210, conversions: 189 },
  { date: '2024-01-09', pageViews: 13800, sessions: 4600, uniqueVisitors: 3400, bounceRate: 40, avgSessionDuration: 195, conversions: 172 },
  { date: '2024-01-10', pageViews: 15600, sessions: 5200, uniqueVisitors: 3900, bounceRate: 35, avgSessionDuration: 225, conversions: 215 },
  { date: '2024-01-11', pageViews: 14900, sessions: 5000, uniqueVisitors: 3700, bounceRate: 37, avgSessionDuration: 218, conversions: 198 },
  { date: '2024-01-12', pageViews: 16200, sessions: 5400, uniqueVisitors: 4100, bounceRate: 34, avgSessionDuration: 235, conversions: 245 },
  { date: '2024-01-13', pageViews: 18500, sessions: 6200, uniqueVisitors: 4800, bounceRate: 32, avgSessionDuration: 250, conversions: 298 },
  { date: '2024-01-14', pageViews: 17800, sessions: 5900, uniqueVisitors: 4500, bounceRate: 33, avgSessionDuration: 242, conversions: 278 },
  { date: '2024-01-15', pageViews: 15200, sessions: 5100, uniqueVisitors: 3800, bounceRate: 36, avgSessionDuration: 220, conversions: 205 },
  { date: '2024-01-16', pageViews: 14600, sessions: 4900, uniqueVisitors: 3600, bounceRate: 39, avgSessionDuration: 205, conversions: 185 },
  { date: '2024-01-17', pageViews: 16800, sessions: 5600, uniqueVisitors: 4200, bounceRate: 35, avgSessionDuration: 228, conversions: 235 },
  { date: '2024-01-18', pageViews: 19200, sessions: 6400, uniqueVisitors: 5000, bounceRate: 31, avgSessionDuration: 265, conversions: 320 },
  { date: '2024-01-19', pageViews: 21500, sessions: 7200, uniqueVisitors: 5600, bounceRate: 29, avgSessionDuration: 280, conversions: 385 },
  { date: '2024-01-20', pageViews: 20100, sessions: 6700, uniqueVisitors: 5200, bounceRate: 30, avgSessionDuration: 270, conversions: 352 },
];

// Market trends (last 12 months)
export const sampleMarketTrends: MarketTrend[] = [
  { month: 'Feb 2023', revenue: 125000, customers: 1200, avgOrderValue: 104, returnRate: 8.2 },
  { month: 'Mar 2023', revenue: 138000, customers: 1350, avgOrderValue: 102, returnRate: 7.8 },
  { month: 'Apr 2023', revenue: 142000, customers: 1400, avgOrderValue: 101, returnRate: 7.5 },
  { month: 'May 2023', revenue: 155000, customers: 1520, avgOrderValue: 102, returnRate: 7.2 },
  { month: 'Jun 2023', revenue: 168000, customers: 1650, avgOrderValue: 102, returnRate: 6.9 },
  { month: 'Jul 2023', revenue: 175000, customers: 1700, avgOrderValue: 103, returnRate: 6.5 },
  { month: 'Aug 2023', revenue: 182000, customers: 1750, avgOrderValue: 104, returnRate: 6.8 },
  { month: 'Sep 2023', revenue: 195000, customers: 1850, avgOrderValue: 105, returnRate: 6.2 },
  { month: 'Oct 2023', revenue: 210000, customers: 1980, avgOrderValue: 106, returnRate: 5.9 },
  { month: 'Nov 2023', revenue: 245000, customers: 2250, avgOrderValue: 109, returnRate: 5.5 },
  { month: 'Dec 2023', revenue: 285000, customers: 2580, avgOrderValue: 110, returnRate: 5.8 },
  { month: 'Jan 2024', revenue: 198000, customers: 1820, avgOrderValue: 109, returnRate: 6.1 },
];

// Category breakdown
export const categoryBreakdown = [
  { name: 'Electronics', value: 45, sales: 125000 },
  { name: 'Sports', value: 20, sales: 55000 },
  { name: 'Home', value: 18, sales: 50000 },
  { name: 'Office', value: 12, sales: 33000 },
  { name: 'Fashion', value: 5, sales: 14000 },
];

// Customer segments
export const customerSegments = [
  { name: 'Premium', value: 25, count: 375, avgSpent: 3850 },
  { name: 'Regular', value: 50, count: 750, avgSpent: 1200 },
  { name: 'New', value: 25, count: 375, avgSpent: 380 },
];

// Age distribution
export const ageDistribution = [
  { range: '18-24', count: 180, percentage: 12 },
  { range: '25-34', count: 450, percentage: 30 },
  { range: '35-44', count: 420, percentage: 28 },
  { range: '45-54', count: 270, percentage: 18 },
  { range: '55+', count: 180, percentage: 12 },
];

// Channel performance
export const channelPerformance = [
  { channel: 'Website', orders: 12500, revenue: 1850000, conversion: 3.2 },
  { channel: 'Mobile App', orders: 8200, revenue: 1120000, conversion: 4.1 },
  { channel: 'In-Store', orders: 4300, revenue: 680000, conversion: 8.5 },
];

// Location data for heatmap
export const locationData = [
  { location: 'New York', customers: 320, revenue: 485000 },
  { location: 'Los Angeles', customers: 280, revenue: 412000 },
  { location: 'Chicago', customers: 195, revenue: 285000 },
  { location: 'Houston', customers: 165, revenue: 238000 },
  { location: 'Phoenix', customers: 140, revenue: 198000 },
  { location: 'San Francisco', customers: 185, revenue: 312000 },
  { location: 'Seattle', customers: 155, revenue: 265000 },
  { location: 'Denver', customers: 120, revenue: 175000 },
  { location: 'Miami', customers: 145, revenue: 215000 },
  { location: 'Atlanta', customers: 130, revenue: 188000 },
];
