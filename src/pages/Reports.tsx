import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import {
  FileSpreadsheet,
  Download,
  Users,
  ShoppingCart,
  Activity,
  TrendingUp,
  Calendar,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  dataKey: string;
}

const reportTypes: ReportType[] = [
  {
    id: 'customers',
    title: 'Customer Report',
    description: 'Export all customer data including demographics and purchase history',
    icon: <Users className="h-5 w-5" />,
    dataKey: 'customers',
  },
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'Detailed sales transactions with product and channel information',
    icon: <ShoppingCart className="h-5 w-5" />,
    dataKey: 'sales',
  },
  {
    id: 'activity',
    title: 'Web Activity Report',
    description: 'Website traffic, sessions, and user engagement metrics',
    icon: <Activity className="h-5 w-5" />,
    dataKey: 'webActivity',
  },
  {
    id: 'market',
    title: 'Market Trends Report',
    description: 'Monthly revenue, customer growth, and market performance',
    icon: <TrendingUp className="h-5 w-5" />,
    dataKey: 'marketTrends',
  },
];

const Reports = () => {
  const { customers, sales, webActivity, marketTrends } = useData();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getReportData = (dataKey: string) => {
    switch (dataKey) {
      case 'customers':
        return customers;
      case 'sales':
        return sales;
      case 'webActivity':
        return webActivity;
      case 'marketTrends':
        return marketTrends;
      default:
        return [];
    }
  };

  const generateReport = async (report: ReportType) => {
    setIsGenerating(true);
    setSelectedReport(report.id);

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 800));

      const data = getReportData(report.dataKey);
      
      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, report.title);

      // Generate filename with date
      const date = new Date().toISOString().split('T')[0];
      const filename = `${report.id}_report_${date}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, filename);

      toast({
        title: 'Report generated successfully',
        description: `${report.title} has been downloaded as ${filename}`,
      });
    } catch (error) {
      toast({
        title: 'Error generating report',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
      setSelectedReport(null);
    }
  };

  const generateAllReports = async () => {
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const workbook = XLSX.utils.book_new();

      // Add all sheets
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(customers), 'Customers');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(sales), 'Sales');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(webActivity), 'Web Activity');
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(marketTrends), 'Market Trends');

      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `full_analytics_report_${date}.xlsx`);

      toast({
        title: 'Full report generated',
        description: 'All analytics data has been exported to Excel',
      });
    } catch (error) {
      toast({
        title: 'Error generating report',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and download Excel reports for your analytics data.
            </p>
          </div>
          <Button
            onClick={generateAllReports}
            disabled={isGenerating}
            className="gradient-primary hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4 mr-2" />
            Export All Data
          </Button>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report, index) => (
            <Card
              key={report.id}
              className={cn(
                'shadow-card transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5 cursor-pointer animate-fade-up',
                selectedReport === report.id && 'ring-2 ring-primary'
              )}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {report.icon}
                  </div>
                  {selectedReport === report.id && isGenerating && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  )}
                </div>
                <CardTitle className="text-lg mt-4">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>
                      {getReportData(report.dataKey).length} records
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateReport(report)}
                    disabled={isGenerating}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Downloads */}
        <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="text-base font-medium">Export Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Excel Format</p>
                  <p className="text-sm text-muted-foreground">
                    Reports are exported in .xlsx format compatible with Excel
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10">
                  <Calendar className="h-4 w-4 text-info" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Date Stamped</p>
                  <p className="text-sm text-muted-foreground">
                    Each report includes the export date in the filename
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                  <FileSpreadsheet className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Full Data Export</p>
                  <p className="text-sm text-muted-foreground">
                    All columns and records are included in exports
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
