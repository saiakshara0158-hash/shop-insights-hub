import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  sampleCustomers,
  sampleSales,
  sampleWebActivity,
  sampleMarketTrends,
  categoryBreakdown,
  customerSegments,
  ageDistribution,
  channelPerformance,
  locationData,
  Customer,
  Sale,
  WebActivity,
  MarketTrend,
} from '@/data/sampleData';

export interface UploadedData {
  headers: string[];
  rows: Record<string, unknown>[];
  fileName: string;
  uploadedAt: Date;
}

interface DataContextType {
  customers: Customer[];
  sales: Sale[];
  webActivity: WebActivity[];
  marketTrends: MarketTrend[];
  categoryBreakdown: typeof categoryBreakdown;
  customerSegments: typeof customerSegments;
  ageDistribution: typeof ageDistribution;
  channelPerformance: typeof channelPerformance;
  locationData: typeof locationData;
  uploadedData: UploadedData | null;
  setUploadedData: (data: UploadedData | null) => void;
  isDataLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);

  const value: DataContextType = {
    customers: sampleCustomers,
    sales: sampleSales,
    webActivity: sampleWebActivity,
    marketTrends: sampleMarketTrends,
    categoryBreakdown,
    customerSegments,
    ageDistribution,
    channelPerformance,
    locationData,
    uploadedData,
    setUploadedData,
    isDataLoaded: true,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
