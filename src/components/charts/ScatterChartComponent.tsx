import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScatterChartProps {
  title: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  zKey?: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
}

export function ScatterChartComponent({
  title,
  data,
  xKey,
  yKey,
  zKey,
  xLabel,
  yLabel,
  color = 'hsl(var(--primary))',
}: ScatterChartProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                type="number"
                dataKey={xKey}
                name={xLabel || xKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                type="number"
                dataKey={yKey}
                name={yLabel || yKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              {zKey && <ZAxis type="number" dataKey={zKey} range={[50, 400]} />}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter data={data} fill={color} fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
