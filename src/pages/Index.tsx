import { Layout } from '@/components/layout/Layout';
import { KPICard } from '@/components/dashboard/KPICard';
import { AreaChartComponent } from '@/components/charts/AreaChartComponent';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent';
import { ScatterChartComponent } from '@/components/charts/ScatterChartComponent';
import { HeatmapComponent } from '@/components/charts/HeatmapComponent';
import { useData } from '@/contexts/DataContext';
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Eye,
  MousePointer,
} from 'lucide-react';

const Index = () => {
  const {
    webActivity,
    marketTrends,
    categoryBreakdown,
    customerSegments,
    locationData,
    customers,
  } = useData();

  // Calculate KPIs
  const totalRevenue = marketTrends.reduce((sum, m) => sum + m.revenue, 0);
  const totalCustomers = customers.length;
  const avgOrderValue = marketTrends[marketTrends.length - 1]?.avgOrderValue || 0;
  const totalPageViews = webActivity.reduce((sum, w) => sum + w.pageViews, 0);
  const totalConversions = webActivity.reduce((sum, w) => sum + w.conversions, 0);
  const conversionRate = ((totalConversions / webActivity.reduce((sum, w) => sum + w.sessions, 0)) * 100).toFixed(1);

  // Prepare scatter data (age vs spending)
  const scatterData = customers.map((c) => ({
    age: c.age,
    totalSpent: c.totalSpent,
    orders: c.ordersCount,
  }));

  // Prepare heatmap data
  const heatmapData = locationData.map((l) => ({
    label: l.location,
    value: l.revenue,
  }));

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your business performance.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard
            title="Total Revenue"
            value={`$${(totalRevenue / 1000000).toFixed(2)}M`}
            change={12.5}
            icon={<DollarSign className="h-5 w-5" />}
            variant="primary"
          />
          <KPICard
            title="Customers"
            value={totalCustomers.toLocaleString()}
            change={8.2}
            icon={<Users className="h-5 w-5" />}
            variant="success"
          />
          <KPICard
            title="Avg Order Value"
            value={`$${avgOrderValue}`}
            change={3.1}
            icon={<ShoppingCart className="h-5 w-5" />}
            variant="warning"
          />
          <KPICard
            title="Page Views"
            value={`${(totalPageViews / 1000).toFixed(1)}K`}
            change={15.8}
            icon={<Eye className="h-5 w-5" />}
            variant="purple"
          />
          <KPICard
            title="Conversions"
            value={totalConversions.toLocaleString()}
            change={22.4}
            icon={<MousePointer className="h-5 w-5" />}
          />
          <KPICard
            title="Conv. Rate"
            value={`${conversionRate}%`}
            change={5.3}
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <AreaChartComponent
              title="Revenue Trend"
              data={marketTrends}
              dataKey="revenue"
              xAxisKey="month"
              color="hsl(var(--primary))"
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <LineChartComponent
              title="Website Activity"
              data={webActivity}
              xAxisKey="date"
              lines={[
                { dataKey: 'pageViews', color: 'hsl(var(--chart-1))', name: 'Page Views' },
                { dataKey: 'sessions', color: 'hsl(var(--chart-2))', name: 'Sessions' },
              ]}
            />
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <PieChartComponent
              title="Sales by Category"
              data={categoryBreakdown.map((c) => ({ name: c.name, value: c.value }))}
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <PieChartComponent
              title="Customer Segments"
              data={customerSegments.map((c) => ({ name: c.name, value: c.value }))}
              donut
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <BarChartComponent
              title="Top Locations"
              data={locationData.slice(0, 6)}
              dataKey="customers"
              xAxisKey="location"
              color="hsl(var(--chart-6))"
            />
          </div>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <ScatterChartComponent
              title="Age vs Spending"
              data={scatterData}
              xKey="age"
              yKey="totalSpent"
              zKey="orders"
              xLabel="Age"
              yLabel="Total Spent ($)"
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <HeatmapComponent
              title="Revenue by Location"
              data={heatmapData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
