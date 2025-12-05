import { Layout } from '@/components/layout/Layout';
import { DataTable } from '@/components/tables/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent';
import { useData } from '@/contexts/DataContext';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Crown, DollarSign } from 'lucide-react';
import { Customer } from '@/data/sampleData';

const Customers = () => {
  const { customers, customerSegments, ageDistribution } = useData();

  // Calculate metrics
  const premiumCustomers = customers.filter((c) => c.segment === 'Premium').length;
  const newCustomers = customers.filter((c) => c.segment === 'New').length;
  const avgSpent = Math.round(
    customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length
  );

  const columns = [
    {
      key: 'name' as keyof Customer,
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email' as keyof Customer,
      label: 'Email',
      sortable: true,
    },
    {
      key: 'age' as keyof Customer,
      label: 'Age',
      sortable: true,
    },
    {
      key: 'gender' as keyof Customer,
      label: 'Gender',
      sortable: true,
    },
    {
      key: 'location' as keyof Customer,
      label: 'Location',
      sortable: true,
    },
    {
      key: 'segment' as keyof Customer,
      label: 'Segment',
      sortable: true,
      render: (value: Customer[keyof Customer]) => {
        const segment = value as string;
        const variant = segment === 'Premium' ? 'premium' : segment === 'New' ? 'new' : 'regular';
        return <Badge variant={variant}>{segment}</Badge>;
      },
    },
    {
      key: 'totalSpent' as keyof Customer,
      label: 'Total Spent',
      sortable: true,
      render: (value: Customer[keyof Customer]) => `$${(value as number).toLocaleString()}`,
    },
    {
      key: 'ordersCount' as keyof Customer,
      label: 'Orders',
      sortable: true,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground">Customer Insights</h1>
          <p className="text-muted-foreground mt-1">
            Analyze your customer base, segments, and buying patterns.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Customers"
            value={customers.length.toLocaleString()}
            change={12.5}
            icon={<Users className="h-5 w-5" />}
            variant="primary"
          />
          <KPICard
            title="Premium Members"
            value={premiumCustomers.toLocaleString()}
            change={8.3}
            icon={<Crown className="h-5 w-5" />}
            variant="warning"
          />
          <KPICard
            title="New Customers"
            value={newCustomers.toLocaleString()}
            change={22.1}
            icon={<UserPlus className="h-5 w-5" />}
            variant="success"
          />
          <KPICard
            title="Avg. Lifetime Value"
            value={`$${avgSpent.toLocaleString()}`}
            change={5.8}
            icon={<DollarSign className="h-5 w-5" />}
            variant="purple"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <PieChartComponent
              title="Customer Segments"
              data={customerSegments.map((s) => ({ name: s.name, value: s.count }))}
              donut
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <BarChartComponent
              title="Age Distribution"
              data={ageDistribution}
              dataKey="count"
              xAxisKey="range"
              color="hsl(var(--chart-4))"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <DataTable
            title="All Customers"
            data={customers}
            columns={columns}
            searchKeys={['name', 'email', 'location', 'segment']}
            pageSize={10}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
