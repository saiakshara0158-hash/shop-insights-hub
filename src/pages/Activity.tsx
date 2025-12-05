import { Layout } from '@/components/layout/Layout';
import { KPICard } from '@/components/dashboard/KPICard';
import { AreaChartComponent } from '@/components/charts/AreaChartComponent';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Eye,
  MousePointer,
  Clock,
  TrendingUp,
  Monitor,
  Smartphone,
  Store,
} from 'lucide-react';

const Activity = () => {
  const { webActivity, marketTrends, channelPerformance } = useData();

  // Calculate totals
  const totalPageViews = webActivity.reduce((sum, w) => sum + w.pageViews, 0);
  const totalSessions = webActivity.reduce((sum, w) => sum + w.sessions, 0);
  const avgBounceRate = Math.round(
    webActivity.reduce((sum, w) => sum + w.bounceRate, 0) / webActivity.length
  );
  const avgSessionDuration = Math.round(
    webActivity.reduce((sum, w) => sum + w.avgSessionDuration, 0) / webActivity.length
  );

  // Channel icons
  const channelIcons: Record<string, React.ReactNode> = {
    Website: <Monitor className="h-4 w-4" />,
    'Mobile App': <Smartphone className="h-4 w-4" />,
    'In-Store': <Store className="h-4 w-4" />,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground">Activity & Market Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Monitor website activity, user engagement, and market trends.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Page Views"
            value={`${(totalPageViews / 1000).toFixed(1)}K`}
            change={18.5}
            icon={<Eye className="h-5 w-5" />}
            variant="primary"
          />
          <KPICard
            title="Total Sessions"
            value={`${(totalSessions / 1000).toFixed(1)}K`}
            change={15.2}
            icon={<MousePointer className="h-5 w-5" />}
            variant="success"
          />
          <KPICard
            title="Bounce Rate"
            value={`${avgBounceRate}%`}
            change={-4.5}
            icon={<TrendingUp className="h-5 w-5" />}
            variant="warning"
          />
          <KPICard
            title="Avg. Session"
            value={`${Math.floor(avgSessionDuration / 60)}m ${avgSessionDuration % 60}s`}
            change={8.3}
            icon={<Clock className="h-5 w-5" />}
            variant="purple"
          />
        </div>

        {/* Web Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <AreaChartComponent
              title="Page Views (Last 14 Days)"
              data={webActivity}
              dataKey="pageViews"
              xAxisKey="date"
              color="hsl(var(--chart-1))"
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <LineChartComponent
              title="User Engagement"
              data={webActivity}
              xAxisKey="date"
              lines={[
                { dataKey: 'sessions', color: 'hsl(var(--chart-2))', name: 'Sessions' },
                { dataKey: 'uniqueVisitors', color: 'hsl(var(--chart-3))', name: 'Unique Visitors' },
              ]}
            />
          </div>
        </div>

        {/* Market Trends & Channel Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <BarChartComponent
              title="Monthly Revenue Trend"
              data={marketTrends}
              dataKey="revenue"
              xAxisKey="month"
              color="hsl(var(--chart-1))"
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <PieChartComponent
              title="Sales by Channel"
              data={channelPerformance.map((c) => ({
                name: c.channel,
                value: c.revenue,
              }))}
              donut
            />
          </div>
        </div>

        {/* Channel Performance Details */}
        <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="text-base font-medium">Channel Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {channelPerformance.map((channel) => {
              const totalOrders = channelPerformance.reduce((sum, c) => sum + c.orders, 0);
              const percentage = Math.round((channel.orders / totalOrders) * 100);
              
              return (
                <div key={channel.channel} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {channelIcons[channel.channel]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{channel.channel}</p>
                        <p className="text-xs text-muted-foreground">
                          {channel.orders.toLocaleString()} orders • ${(channel.revenue / 1000).toFixed(0)}K revenue
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{channel.conversion}%</p>
                      <p className="text-xs text-muted-foreground">Conversion</p>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Market Trends Table */}
        <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.35s' }}>
          <CardHeader>
            <CardTitle className="text-base font-medium">Monthly Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {marketTrends.slice(-4).map((trend) => (
                <div key={trend.month} className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground mb-1">{trend.month}</p>
                  <p className="text-xl font-bold text-foreground">
                    ${(trend.revenue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {trend.customers.toLocaleString()} customers
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Activity;
