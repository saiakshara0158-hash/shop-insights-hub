import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HeatmapProps {
  title: string;
  data: { label: string; value: number }[];
  maxValue?: number;
}

export function HeatmapComponent({ title, data, maxValue }: HeatmapProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  const getIntensity = (value: number) => {
    const intensity = value / max;
    if (intensity > 0.8) return 'bg-primary';
    if (intensity > 0.6) return 'bg-primary/80';
    if (intensity > 0.4) return 'bg-primary/60';
    if (intensity > 0.2) return 'bg-primary/40';
    return 'bg-primary/20';
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={cn(
                'aspect-square rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105',
                getIntensity(item.value)
              )}
              title={`${item.label}: ${item.value.toLocaleString()}`}
            >
              <span className="text-xs font-medium text-primary-foreground truncate px-1">
                {item.label.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-8 h-2 rounded bg-primary/20" />
            <div className="w-8 h-2 rounded bg-primary/40" />
            <div className="w-8 h-2 rounded bg-primary/60" />
            <div className="w-8 h-2 rounded bg-primary/80" />
            <div className="w-8 h-2 rounded bg-primary" />
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  );
}
