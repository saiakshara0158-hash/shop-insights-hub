import { Layout } from '@/components/layout/Layout';
import { FileUploader } from '@/components/upload/FileUploader';
import { DataTable } from '@/components/tables/DataTable';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSpreadsheet, Table2, Columns, Rows } from 'lucide-react';

const Upload = () => {
  const { uploadedData } = useData();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground">Upload Data</h1>
          <p className="text-muted-foreground mt-1">
            Import your CSV or Excel files to analyze your business data.
          </p>
        </div>

        {/* File Uploader */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <FileUploader />
        </div>

        {/* Upload Stats */}
        {uploadedData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">File Name</p>
                  <p className="font-medium truncate max-w-[150px]">{uploadedData.fileName}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Rows className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rows</p>
                  <p className="font-medium">{uploadedData.rows.length.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Columns className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Columns</p>
                  <p className="font-medium">{uploadedData.headers.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                  <Table2 className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded</p>
                  <p className="font-medium">{uploadedData.uploadedAt.toLocaleTimeString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Preview */}
        {uploadedData && uploadedData.rows.length > 0 && (
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <DataTable
              title="Data Preview"
              data={uploadedData.rows}
              columns={uploadedData.headers.map((header) => ({
                key: header as keyof Record<string, unknown>,
                label: header,
                sortable: true,
              }))}
              searchKeys={uploadedData.headers as (keyof Record<string, unknown>)[]}
              pageSize={10}
            />
          </div>
        )}

        {/* Instructions */}
        {!uploadedData && (
          <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <CardHeader>
              <CardTitle className="text-base font-medium">Supported File Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">CSV Files (.csv)</h4>
                  <p className="text-sm text-muted-foreground">
                    Comma-separated values files with headers in the first row. 
                    Each column represents a data field.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Excel Files (.xlsx, .xls)</h4>
                  <p className="text-sm text-muted-foreground">
                    Microsoft Excel spreadsheets. The first sheet will be imported 
                    with headers from the first row.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium text-foreground mb-2">Data Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• First row should contain column headers</li>
                  <li>• Each row should represent a single record</li>
                  <li>• Dates should be in a consistent format</li>
                  <li>• Numeric values should not contain currency symbols</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Upload;
