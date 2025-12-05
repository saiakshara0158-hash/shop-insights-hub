// Mock AI Analysis Engine for B2C Data Analysis
import { Customer, Sale, WebActivity, MarketTrend } from '@/data/sampleData';

export interface AnalysisResult {
  summary: string;
  tableData?: {
    headers: string[];
    rows: Record<string, unknown>[];
  };
  chartData?: {
    type: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
    data: Record<string, unknown>[];
    xKey: string;
    yKey: string;
    title: string;
  };
  suggestions?: string[];
  error?: string;
}

interface DataContext {
  customers: Customer[];
  sales: Sale[];
  webActivity: WebActivity[];
  marketTrends: MarketTrend[];
  uploadedData?: {
    headers: string[];
    rows: Record<string, unknown>[];
  } | null;
}

// Query patterns for matching
const queryPatterns = {
  topCustomers: /top\s*(\d+)?\s*customers?\s*(by)?\s*(total|purchase|spent|amount)?/i,
  salesTrend: /(sales?|revenue)\s*(trend|over|last|past)\s*(\d+)?\s*(months?|days?|weeks?)?/i,
  ageGroup: /(age\s*group|which\s*age|age\s*range)\s*(spend|purchase|buy)?/i,
  categoryRevenue: /(total|revenue|sales)\s*(for|by|per)?\s*(each|all)?\s*(product)?\s*categor/i,
  correlation: /correlation|relationship|relate|between.*and/i,
  topProducts: /top\s*(\d+)?\s*(products?|items?|selling)/i,
  channelPerformance: /(channel|platform)\s*(performance|comparison|sales)/i,
  customerSegment: /(customer)?\s*segment|premium|regular|new\s*customers?/i,
  locationAnalysis: /location|city|cities|region|where/i,
  webActivity: /(website?|web|traffic|visit|page\s*view|session|bounce)/i,
  averageOrder: /(average|avg|mean)\s*(order|purchase|transaction)\s*(value|amount)?/i,
  totalRevenue: /total\s*(revenue|sales|income)/i,
  customerCount: /(how\s*many|total|count)\s*customers?/i,
  recentPurchases: /(recent|latest|last)\s*(purchases?|orders?|transactions?)/i,
  genderAnalysis: /gender|male|female|men|women/i,
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function analyzeQuery(query: string, context: DataContext): Promise<AnalysisResult> {
  // Simulate AI processing delay
  await delay(800 + Math.random() * 700);

  const normalizedQuery = query.toLowerCase().trim();

  // Check for empty query
  if (!normalizedQuery) {
    return {
      summary: "Please enter a question about your data.",
      error: "Empty query",
      suggestions: getDefaultSuggestions(),
    };
  }

  // Top customers analysis
  if (queryPatterns.topCustomers.test(normalizedQuery)) {
    const match = normalizedQuery.match(/top\s*(\d+)?/);
    const count = match && match[1] ? parseInt(match[1]) : 5;
    return analyzeTopCustomers(context.customers, count);
  }

  // Sales trend analysis
  if (queryPatterns.salesTrend.test(normalizedQuery)) {
    const match = normalizedQuery.match(/(\d+)/);
    const months = match ? parseInt(match[1]) : 6;
    return analyzeSalesTrend(context.marketTrends, months);
  }

  // Age group spending analysis
  if (queryPatterns.ageGroup.test(normalizedQuery)) {
    return analyzeAgeGroupSpending(context.customers);
  }

  // Category revenue analysis
  if (queryPatterns.categoryRevenue.test(normalizedQuery)) {
    return analyzeCategoryRevenue(context.sales);
  }

  // Correlation analysis
  if (queryPatterns.correlation.test(normalizedQuery)) {
    return analyzeCorrelation(context.customers, normalizedQuery);
  }

  // Top products
  if (queryPatterns.topProducts.test(normalizedQuery)) {
    const match = normalizedQuery.match(/top\s*(\d+)?/);
    const count = match && match[1] ? parseInt(match[1]) : 5;
    return analyzeTopProducts(context.sales, count);
  }

  // Channel performance
  if (queryPatterns.channelPerformance.test(normalizedQuery)) {
    return analyzeChannelPerformance(context.sales);
  }

  // Customer segments
  if (queryPatterns.customerSegment.test(normalizedQuery)) {
    return analyzeCustomerSegments(context.customers);
  }

  // Location analysis
  if (queryPatterns.locationAnalysis.test(normalizedQuery)) {
    return analyzeLocationData(context.customers);
  }

  // Web activity
  if (queryPatterns.webActivity.test(normalizedQuery)) {
    return analyzeWebActivity(context.webActivity);
  }

  // Average order value
  if (queryPatterns.averageOrder.test(normalizedQuery)) {
    return analyzeAverageOrder(context.sales);
  }

  // Total revenue
  if (queryPatterns.totalRevenue.test(normalizedQuery)) {
    return analyzeTotalRevenue(context.sales, context.marketTrends);
  }

  // Customer count
  if (queryPatterns.customerCount.test(normalizedQuery)) {
    return analyzeCustomerCount(context.customers);
  }

  // Recent purchases
  if (queryPatterns.recentPurchases.test(normalizedQuery)) {
    return analyzeRecentPurchases(context.sales, context.customers);
  }

  // Gender analysis
  if (queryPatterns.genderAnalysis.test(normalizedQuery)) {
    return analyzeGenderDistribution(context.customers);
  }

  // Default: couldn't understand query
  return {
    summary: "I couldn't understand your question. Could you please rephrase it or try one of the suggested questions below?",
    error: "Query not understood",
    suggestions: getDefaultSuggestions(),
  };
}

function analyzeTopCustomers(customers: Customer[], count: number): AnalysisResult {
  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, count);

  const totalSpent = topCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpent = totalSpent / topCustomers.length;

  return {
    summary: `The top ${count} customers by total purchase amount have spent a combined $${totalSpent.toLocaleString()}. The average spending among these top customers is $${avgSpent.toLocaleString()}. ${topCustomers[0].name} leads with $${topCustomers[0].totalSpent.toLocaleString()} in total purchases.`,
    tableData: {
      headers: ['Rank', 'Customer', 'Location', 'Segment', 'Total Spent', 'Orders'],
      rows: topCustomers.map((c, i) => ({
        Rank: i + 1,
        Customer: c.name,
        Location: c.location,
        Segment: c.segment,
        'Total Spent': `$${c.totalSpent.toLocaleString()}`,
        Orders: c.ordersCount,
      })),
    },
    chartData: {
      type: 'bar',
      data: topCustomers.map(c => ({
        name: c.name.split(' ')[0],
        value: c.totalSpent,
      })),
      xKey: 'name',
      yKey: 'value',
      title: `Top ${count} Customers by Spending`,
    },
    suggestions: [
      'Show me customer segments breakdown',
      'Which age group spends the most?',
      'What are the recent purchases?',
    ],
  };
}

function analyzeSalesTrend(marketTrends: MarketTrend[], months: number): AnalysisResult {
  const recentTrends = marketTrends.slice(-months);
  const totalRevenue = recentTrends.reduce((sum, t) => sum + t.revenue, 0);
  const avgRevenue = totalRevenue / recentTrends.length;
  
  const firstMonth = recentTrends[0];
  const lastMonth = recentTrends[recentTrends.length - 1];
  const growthRate = ((lastMonth.revenue - firstMonth.revenue) / firstMonth.revenue * 100).toFixed(1);

  return {
    summary: `Over the last ${months} months, total revenue reached $${totalRevenue.toLocaleString()} with an average monthly revenue of $${avgRevenue.toLocaleString()}. Revenue ${parseFloat(growthRate) >= 0 ? 'grew' : 'declined'} by ${Math.abs(parseFloat(growthRate))}% from ${firstMonth.month} to ${lastMonth.month}. Peak performance was in ${recentTrends.reduce((max, t) => t.revenue > max.revenue ? t : max).month}.`,
    tableData: {
      headers: ['Month', 'Revenue', 'Customers', 'Avg Order Value', 'Return Rate'],
      rows: recentTrends.map(t => ({
        Month: t.month,
        Revenue: `$${t.revenue.toLocaleString()}`,
        Customers: t.customers.toLocaleString(),
        'Avg Order Value': `$${t.avgOrderValue}`,
        'Return Rate': `${t.returnRate}%`,
      })),
    },
    chartData: {
      type: 'area',
      data: recentTrends.map(t => ({
        name: t.month,
        value: t.revenue,
      })),
      xKey: 'name',
      yKey: 'value',
      title: `Revenue Trend (Last ${months} Months)`,
    },
    suggestions: [
      'What is the total revenue?',
      'Show channel performance comparison',
      'Analyze customer growth',
    ],
  };
}

function analyzeAgeGroupSpending(customers: Customer[]): AnalysisResult {
  const ageGroups: Record<string, { count: number; totalSpent: number }> = {
    '18-24': { count: 0, totalSpent: 0 },
    '25-34': { count: 0, totalSpent: 0 },
    '35-44': { count: 0, totalSpent: 0 },
    '45-54': { count: 0, totalSpent: 0 },
    '55+': { count: 0, totalSpent: 0 },
  };

  customers.forEach(c => {
    const group = c.age < 25 ? '18-24' : c.age < 35 ? '25-34' : c.age < 45 ? '35-44' : c.age < 55 ? '45-54' : '55+';
    ageGroups[group].count++;
    ageGroups[group].totalSpent += c.totalSpent;
  });

  const data = Object.entries(ageGroups).map(([range, stats]) => ({
    range,
    count: stats.count,
    totalSpent: stats.totalSpent,
    avgSpent: stats.count > 0 ? Math.round(stats.totalSpent / stats.count) : 0,
  }));

  const topGroup = data.reduce((max, g) => g.avgSpent > max.avgSpent ? g : max);

  return {
    summary: `The ${topGroup.range} age group has the highest average spending at $${topGroup.avgSpent.toLocaleString()} per customer. This group contains ${topGroup.count} customers with a total spend of $${topGroup.totalSpent.toLocaleString()}. Consider targeting marketing campaigns towards this demographic for maximum ROI.`,
    tableData: {
      headers: ['Age Range', 'Customers', 'Total Spent', 'Average Spent'],
      rows: data.map(g => ({
        'Age Range': g.range,
        Customers: g.count,
        'Total Spent': `$${g.totalSpent.toLocaleString()}`,
        'Average Spent': `$${g.avgSpent.toLocaleString()}`,
      })),
    },
    chartData: {
      type: 'bar',
      data: data.map(g => ({
        name: g.range,
        value: g.avgSpent,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Average Spending by Age Group',
    },
    suggestions: [
      'Show gender distribution analysis',
      'Which customers are premium?',
      'What are the top products?',
    ],
  };
}

function analyzeCategoryRevenue(sales: Sale[]): AnalysisResult {
  const categories: Record<string, { revenue: number; count: number }> = {};

  sales.forEach(s => {
    if (!categories[s.category]) {
      categories[s.category] = { revenue: 0, count: 0 };
    }
    categories[s.category].revenue += s.amount * s.quantity;
    categories[s.category].count += s.quantity;
  });

  const data = Object.entries(categories)
    .map(([category, stats]) => ({
      category,
      revenue: stats.revenue,
      count: stats.count,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return {
    summary: `Revenue breakdown by category shows ${data[0].category} leading with $${data[0].revenue.toLocaleString()} (${((data[0].revenue / totalRevenue) * 100).toFixed(1)}% of total). Total revenue across all categories is $${totalRevenue.toLocaleString()}. Consider expanding inventory in top-performing categories.`,
    tableData: {
      headers: ['Category', 'Revenue', 'Items Sold', '% of Total'],
      rows: data.map(d => ({
        Category: d.category,
        Revenue: `$${d.revenue.toLocaleString()}`,
        'Items Sold': d.count,
        '% of Total': `${((d.revenue / totalRevenue) * 100).toFixed(1)}%`,
      })),
    },
    chartData: {
      type: 'pie',
      data: data.map(d => ({
        name: d.category,
        value: d.revenue,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Revenue by Product Category',
    },
    suggestions: [
      'What are the top 5 products?',
      'Show sales trends for the last 6 months',
      'Which channel performs best?',
    ],
  };
}

function analyzeCorrelation(customers: Customer[], query: string): AnalysisResult {
  // Simple mock correlation between age and purchase frequency
  const data = customers.map(c => ({
    age: c.age,
    orders: c.ordersCount,
    spent: c.totalSpent,
  }));

  // Calculate simple correlation coefficient
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d.age, 0);
  const sumY = data.reduce((s, d) => s + d.orders, 0);
  const sumXY = data.reduce((s, d) => s + d.age * d.orders, 0);
  const sumX2 = data.reduce((s, d) => s + d.age * d.age, 0);
  const sumY2 = data.reduce((s, d) => s + d.orders * d.orders, 0);

  const correlation = (n * sumXY - sumX * sumY) / 
    Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  const correlationStrength = Math.abs(correlation) < 0.3 ? 'weak' : Math.abs(correlation) < 0.7 ? 'moderate' : 'strong';
  const correlationDirection = correlation > 0 ? 'positive' : 'negative';

  return {
    summary: `Analysis shows a ${correlationStrength} ${correlationDirection} correlation (r = ${correlation.toFixed(3)}) between customer age and purchase frequency. This suggests that ${correlation > 0 ? 'older customers tend to make more purchases' : 'younger customers tend to make more purchases'}. However, other factors like customer segment and location also significantly influence purchasing behavior.`,
    tableData: {
      headers: ['Age Group', 'Avg Orders', 'Avg Spending', 'Sample Size'],
      rows: [
        { 'Age Group': '18-24', 'Avg Orders': '2.5', 'Avg Spending': '$400', 'Sample Size': 2 },
        { 'Age Group': '25-34', 'Avg Orders': '8.5', 'Avg Spending': '$1,850', 'Sample Size': 4 },
        { 'Age Group': '35-44', 'Avg Orders': '13.0', 'Avg Spending': '$2,633', 'Sample Size': 4 },
        { 'Age Group': '45-54', 'Avg Orders': '13.3', 'Avg Spending': '$2,397', 'Sample Size': 3 },
        { 'Age Group': '55+', 'Avg Orders': '5.0', 'Avg Spending': '$890', 'Sample Size': 2 },
      ],
    },
    chartData: {
      type: 'scatter',
      data: data.map(d => ({
        name: `Age ${d.age}`,
        x: d.age,
        y: d.orders,
      })),
      xKey: 'x',
      yKey: 'y',
      title: 'Age vs Purchase Frequency Correlation',
    },
    suggestions: [
      'Which age group spends the most?',
      'Show customer segments breakdown',
      'What is the average order value?',
    ],
  };
}

function analyzeTopProducts(sales: Sale[], count: number): AnalysisResult {
  const products: Record<string, { revenue: number; quantity: number; category: string }> = {};

  sales.forEach(s => {
    if (!products[s.product]) {
      products[s.product] = { revenue: 0, quantity: 0, category: s.category };
    }
    products[s.product].revenue += s.amount * s.quantity;
    products[s.product].quantity += s.quantity;
  });

  const topProducts = Object.entries(products)
    .map(([product, stats]) => ({ product, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, count);

  return {
    summary: `The top ${count} products by revenue are led by "${topProducts[0].product}" in the ${topProducts[0].category} category, generating $${topProducts[0].revenue.toLocaleString()}. These top products account for a significant portion of total sales. Consider featuring these items prominently in marketing campaigns.`,
    tableData: {
      headers: ['Rank', 'Product', 'Category', 'Revenue', 'Qty Sold'],
      rows: topProducts.map((p, i) => ({
        Rank: i + 1,
        Product: p.product,
        Category: p.category,
        Revenue: `$${p.revenue.toLocaleString()}`,
        'Qty Sold': p.quantity,
      })),
    },
    chartData: {
      type: 'bar',
      data: topProducts.map(p => ({
        name: p.product.length > 15 ? p.product.substring(0, 15) + '...' : p.product,
        value: p.revenue,
      })),
      xKey: 'name',
      yKey: 'value',
      title: `Top ${count} Products by Revenue`,
    },
    suggestions: [
      'Show revenue by category',
      'Which channel has the most sales?',
      'What are the recent purchases?',
    ],
  };
}

function analyzeChannelPerformance(sales: Sale[]): AnalysisResult {
  const channels: Record<string, { revenue: number; count: number }> = {};

  sales.forEach(s => {
    if (!channels[s.channel]) {
      channels[s.channel] = { revenue: 0, count: 0 };
    }
    channels[s.channel].revenue += s.amount * s.quantity;
    channels[s.channel].count++;
  });

  const data = Object.entries(channels)
    .map(([channel, stats]) => ({ channel, ...stats }))
    .sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return {
    summary: `${data[0].channel} is the top-performing channel with $${data[0].revenue.toLocaleString()} in revenue (${((data[0].revenue / totalRevenue) * 100).toFixed(1)}% of total). The ${data[data.length - 1].channel} channel has the lowest performance. Consider investing more in ${data[0].channel} marketing and improving ${data[data.length - 1].channel} conversion strategies.`,
    tableData: {
      headers: ['Channel', 'Revenue', 'Orders', '% of Total'],
      rows: data.map(d => ({
        Channel: d.channel,
        Revenue: `$${d.revenue.toLocaleString()}`,
        Orders: d.count,
        '% of Total': `${((d.revenue / totalRevenue) * 100).toFixed(1)}%`,
      })),
    },
    chartData: {
      type: 'pie',
      data: data.map(d => ({
        name: d.channel,
        value: d.revenue,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Revenue by Sales Channel',
    },
    suggestions: [
      'Show sales trends',
      'What are the top products?',
      'Analyze customer locations',
    ],
  };
}

function analyzeCustomerSegments(customers: Customer[]): AnalysisResult {
  const segments: Record<string, { count: number; totalSpent: number }> = {};

  customers.forEach(c => {
    if (!segments[c.segment]) {
      segments[c.segment] = { count: 0, totalSpent: 0 };
    }
    segments[c.segment].count++;
    segments[c.segment].totalSpent += c.totalSpent;
  });

  const data = Object.entries(segments)
    .map(([segment, stats]) => ({
      segment,
      count: stats.count,
      totalSpent: stats.totalSpent,
      avgSpent: Math.round(stats.totalSpent / stats.count),
    }))
    .sort((a, b) => b.avgSpent - a.avgSpent);

  return {
    summary: `Customer segmentation analysis shows ${data[0].segment} customers have the highest average spending at $${data[0].avgSpent.toLocaleString()} per customer. This segment represents ${data[0].count} customers (${((data[0].count / customers.length) * 100).toFixed(1)}% of total). Focus on converting Regular customers to Premium status for revenue growth.`,
    tableData: {
      headers: ['Segment', 'Customers', 'Total Spent', 'Avg Spent'],
      rows: data.map(d => ({
        Segment: d.segment,
        Customers: d.count,
        'Total Spent': `$${d.totalSpent.toLocaleString()}`,
        'Avg Spent': `$${d.avgSpent.toLocaleString()}`,
      })),
    },
    chartData: {
      type: 'pie',
      data: data.map(d => ({
        name: d.segment,
        value: d.count,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Customer Segments Distribution',
    },
    suggestions: [
      'Who are the top customers?',
      'Show age group spending',
      'Analyze customer locations',
    ],
  };
}

function analyzeLocationData(customers: Customer[]): AnalysisResult {
  const locations: Record<string, { count: number; totalSpent: number }> = {};

  customers.forEach(c => {
    if (!locations[c.location]) {
      locations[c.location] = { count: 0, totalSpent: 0 };
    }
    locations[c.location].count++;
    locations[c.location].totalSpent += c.totalSpent;
  });

  const data = Object.entries(locations)
    .map(([location, stats]) => ({
      location,
      count: stats.count,
      totalSpent: stats.totalSpent,
      avgSpent: Math.round(stats.totalSpent / stats.count),
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent);

  return {
    summary: `Geographic analysis shows ${data[0].location} as the top market with ${data[0].count} customers and $${data[0].totalSpent.toLocaleString()} in total spending. Markets like ${data[data.length - 1].location} have growth potential. Consider regional marketing campaigns targeting high-value areas.`,
    tableData: {
      headers: ['Location', 'Customers', 'Total Spent', 'Avg Spent'],
      rows: data.map(d => ({
        Location: d.location,
        Customers: d.count,
        'Total Spent': `$${d.totalSpent.toLocaleString()}`,
        'Avg Spent': `$${d.avgSpent.toLocaleString()}`,
      })),
    },
    chartData: {
      type: 'bar',
      data: data.slice(0, 8).map(d => ({
        name: d.location,
        value: d.totalSpent,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Revenue by Location',
    },
    suggestions: [
      'Show customer segments',
      'Which age group spends the most?',
      'What is the total revenue?',
    ],
  };
}

function analyzeWebActivity(webActivity: WebActivity[]): AnalysisResult {
  const totalPageViews = webActivity.reduce((sum, w) => sum + w.pageViews, 0);
  const totalSessions = webActivity.reduce((sum, w) => sum + w.sessions, 0);
  const totalConversions = webActivity.reduce((sum, w) => sum + w.conversions, 0);
  const avgBounceRate = (webActivity.reduce((sum, w) => sum + w.bounceRate, 0) / webActivity.length).toFixed(1);
  const conversionRate = ((totalConversions / totalSessions) * 100).toFixed(2);

  return {
    summary: `Website performance over the analyzed period shows ${totalPageViews.toLocaleString()} page views across ${totalSessions.toLocaleString()} sessions. The average bounce rate is ${avgBounceRate}% with a conversion rate of ${conversionRate}%. Peak traffic occurred on ${webActivity.reduce((max, w) => w.pageViews > max.pageViews ? w : max).date}.`,
    tableData: {
      headers: ['Date', 'Page Views', 'Sessions', 'Bounce Rate', 'Conversions'],
      rows: webActivity.slice(-7).map(w => ({
        Date: w.date,
        'Page Views': w.pageViews.toLocaleString(),
        Sessions: w.sessions.toLocaleString(),
        'Bounce Rate': `${w.bounceRate}%`,
        Conversions: w.conversions,
      })),
    },
    chartData: {
      type: 'line',
      data: webActivity.map(w => ({
        name: w.date.slice(5),
        value: w.pageViews,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Daily Page Views Trend',
    },
    suggestions: [
      'Show sales trends',
      'What is the conversion rate?',
      'Analyze channel performance',
    ],
  };
}

function analyzeAverageOrder(sales: Sale[]): AnalysisResult {
  const totalAmount = sales.reduce((sum, s) => sum + s.amount * s.quantity, 0);
  const avgOrder = totalAmount / sales.length;

  const ordersByChannel = sales.reduce((acc, s) => {
    if (!acc[s.channel]) acc[s.channel] = { total: 0, count: 0 };
    acc[s.channel].total += s.amount * s.quantity;
    acc[s.channel].count++;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const channelData = Object.entries(ordersByChannel).map(([channel, stats]) => ({
    channel,
    avgOrder: Math.round(stats.total / stats.count),
    count: stats.count,
  }));

  return {
    summary: `The average order value across all transactions is $${avgOrder.toFixed(2)}. ${channelData.sort((a, b) => b.avgOrder - a.avgOrder)[0].channel} has the highest average order value. Implementing upselling strategies could help increase this metric.`,
    tableData: {
      headers: ['Channel', 'Avg Order Value', 'Total Orders'],
      rows: channelData.map(d => ({
        Channel: d.channel,
        'Avg Order Value': `$${d.avgOrder.toLocaleString()}`,
        'Total Orders': d.count,
      })),
    },
    chartData: {
      type: 'bar',
      data: channelData.map(d => ({
        name: d.channel,
        value: d.avgOrder,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Average Order Value by Channel',
    },
    suggestions: [
      'What is the total revenue?',
      'Show top products',
      'Analyze customer segments',
    ],
  };
}

function analyzeTotalRevenue(sales: Sale[], marketTrends: MarketTrend[]): AnalysisResult {
  const sampleRevenue = sales.reduce((sum, s) => sum + s.amount * s.quantity, 0);
  const yearlyRevenue = marketTrends.reduce((sum, t) => sum + t.revenue, 0);

  return {
    summary: `Total annual revenue from market trends data is $${yearlyRevenue.toLocaleString()}. Current sample data shows $${sampleRevenue.toLocaleString()} in transactions. Revenue has shown consistent growth with December 2023 being the peak month at $285,000.`,
    tableData: {
      headers: ['Period', 'Revenue', 'Growth'],
      rows: marketTrends.slice(-6).map((t, i, arr) => ({
        Period: t.month,
        Revenue: `$${t.revenue.toLocaleString()}`,
        Growth: i > 0 ? `${(((t.revenue - arr[i-1].revenue) / arr[i-1].revenue) * 100).toFixed(1)}%` : '-',
      })),
    },
    chartData: {
      type: 'area',
      data: marketTrends.map(t => ({
        name: t.month.slice(0, 3),
        value: t.revenue,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Monthly Revenue Trend',
    },
    suggestions: [
      'Show sales trends for the last 6 months',
      'What is the average order value?',
      'Analyze revenue by category',
    ],
  };
}

function analyzeCustomerCount(customers: Customer[]): AnalysisResult {
  const segmentCounts = customers.reduce((acc, c) => {
    acc[c.segment] = (acc[c.segment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(segmentCounts).map(([segment, count]) => ({
    segment,
    count,
    percentage: ((count / customers.length) * 100).toFixed(1),
  }));

  return {
    summary: `There are ${customers.length} total customers in the database. ${data.find(d => d.segment === 'Regular')?.count || 0} are Regular customers, ${data.find(d => d.segment === 'Premium')?.count || 0} are Premium, and ${data.find(d => d.segment === 'New')?.count || 0} are New customers.`,
    tableData: {
      headers: ['Segment', 'Count', 'Percentage'],
      rows: data.map(d => ({
        Segment: d.segment,
        Count: d.count,
        Percentage: `${d.percentage}%`,
      })),
    },
    chartData: {
      type: 'pie',
      data: data.map(d => ({
        name: d.segment,
        value: d.count,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Customer Distribution by Segment',
    },
    suggestions: [
      'Who are the top customers?',
      'Show customer locations',
      'Analyze age group spending',
    ],
  };
}

function analyzeRecentPurchases(sales: Sale[], customers: Customer[]): AnalysisResult {
  const recentSales = [...sales]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const customerMap = customers.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {} as Record<string, string>);

  return {
    summary: `The most recent transactions show active customer engagement. The latest purchase was on ${recentSales[0].date} for ${recentSales[0].product}. Electronics and Sports categories dominate recent purchases, indicating strong demand in these segments.`,
    tableData: {
      headers: ['Date', 'Customer', 'Product', 'Amount', 'Channel'],
      rows: recentSales.map(s => ({
        Date: s.date,
        Customer: customerMap[s.customerId] || s.customerId,
        Product: s.product,
        Amount: `$${(s.amount * s.quantity).toLocaleString()}`,
        Channel: s.channel,
      })),
    },
    chartData: {
      type: 'bar',
      data: recentSales.slice(0, 5).map(s => ({
        name: s.product.length > 12 ? s.product.substring(0, 12) + '...' : s.product,
        value: s.amount * s.quantity,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Recent Purchase Amounts',
    },
    suggestions: [
      'What are the top products?',
      'Show channel performance',
      'Analyze customer segments',
    ],
  };
}

function analyzeGenderDistribution(customers: Customer[]): AnalysisResult {
  const genderStats = customers.reduce((acc, c) => {
    if (!acc[c.gender]) acc[c.gender] = { count: 0, totalSpent: 0 };
    acc[c.gender].count++;
    acc[c.gender].totalSpent += c.totalSpent;
    return acc;
  }, {} as Record<string, { count: number; totalSpent: number }>);

  const data = Object.entries(genderStats).map(([gender, stats]) => ({
    gender,
    count: stats.count,
    totalSpent: stats.totalSpent,
    avgSpent: Math.round(stats.totalSpent / stats.count),
  }));

  const topGender = data.reduce((max, g) => g.avgSpent > max.avgSpent ? g : max);

  return {
    summary: `Gender analysis shows ${topGender.gender} customers have the highest average spending at $${topGender.avgSpent.toLocaleString()}. The customer base is ${data.map(d => `${((d.count / customers.length) * 100).toFixed(0)}% ${d.gender}`).join(', ')}. Consider gender-specific marketing strategies to increase engagement.`,
    tableData: {
      headers: ['Gender', 'Customers', 'Total Spent', 'Avg Spent'],
      rows: data.map(d => ({
        Gender: d.gender,
        Customers: d.count,
        'Total Spent': `$${d.totalSpent.toLocaleString()}`,
        'Avg Spent': `$${d.avgSpent.toLocaleString()}`,
      })),
    },
    chartData: {
      type: 'pie',
      data: data.map(d => ({
        name: d.gender,
        value: d.count,
      })),
      xKey: 'name',
      yKey: 'value',
      title: 'Customer Gender Distribution',
    },
    suggestions: [
      'Which age group spends the most?',
      'Show customer segments',
      'Analyze customer locations',
    ],
  };
}

function getDefaultSuggestions(): string[] {
  return [
    'What are the top 5 customers by total purchase amount?',
    'Show sales trends for the last 6 months',
    'Which age group spends the most?',
    'Give me the total revenue for each product category',
    'Is there a correlation between customer age and purchase frequency?',
  ];
}

export { getDefaultSuggestions };
