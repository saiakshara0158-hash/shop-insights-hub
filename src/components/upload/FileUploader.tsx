import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useData, UploadedData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onUploadComplete?: (data: UploadedData) => void;
}

export function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const { setUploadedData } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const processCSV = (file: File): Promise<UploadedData> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV file'));
            return;
          }
          const headers = results.meta.fields || [];
          resolve({
            headers,
            rows: results.data as Record<string, unknown>[],
            fileName: file.name,
            uploadedAt: new Date(),
          });
        },
        error: (error) => reject(error),
      });
    });
  };

  const processExcel = (file: File): Promise<UploadedData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];

          if (jsonData.length < 2) {
            reject(new Error('File is empty or has no data rows'));
            return;
          }

          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1).map((row) => {
            const obj: Record<string, unknown> = {};
            headers.forEach((header, index) => {
              obj[header] = (row as unknown[])[index];
            });
            return obj;
          });

          resolve({
            headers,
            rows,
            fileName: file.name,
            uploadedAt: new Date(),
          });
        } catch (err) {
          reject(new Error('Error parsing Excel file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsBinaryString(file);
    });
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      let result: UploadedData;

      if (file.name.endsWith('.csv')) {
        result = await processCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        result = await processExcel(file);
      } else {
        throw new Error('Unsupported file format. Please upload CSV or Excel files.');
      }

      if (result.rows.length === 0) {
        throw new Error('File contains no data rows');
      }

      setUploadedData(result);
      setSuccess(true);
      onUploadComplete?.(result);
      toast({
        title: 'File uploaded successfully',
        description: `${result.rows.length} rows imported from ${file.name}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
      toast({
        title: 'Upload failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      processFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  const clearFile = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-muted/50',
            isProcessing && 'pointer-events-none opacity-60',
            error && 'border-destructive/50',
            success && 'border-success/50'
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-4">
            {file && !error ? (
              <>
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-full',
                    success ? 'bg-success/10' : 'bg-primary/10'
                  )}
                >
                  {success ? (
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  ) : (
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {!isProcessing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    className="mt-2"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </>
            ) : error ? (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-destructive">Upload Failed</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Button variant="outline" size="sm" onClick={clearFile} className="mt-2">
                  Try Again
                </Button>
              </>
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {isDragActive ? 'Drop your file here' : 'Drag & drop your file'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse • CSV, XLSX supported
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
