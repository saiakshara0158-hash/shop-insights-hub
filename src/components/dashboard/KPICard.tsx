import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'purple';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'gradient-primary text-primary-foreground',
  success: 'gradient-success text-success-foreground',
  warning: 'gradient-warning text-warning-foreground',
  purple: 'gradient-purple text-primary-foreground',
};

const iconBgStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  success: 'bg-success-foreground/20 text-success-foreground',
  warning: 'bg-warning-foreground/20 text-warning-foreground',
  purple: 'bg-primary-foreground/20 text-primary-foreground',
};

export function KPICard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  variant = 'default',
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        'rounded-xl p-5 shadow-card transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              'text-sm font-medium',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
            )}
          >
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                variant === 'default'
                  ? isPositive
                    ? 'text-success'
                    : 'text-destructive'
                  : 'opacity-90'
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change}% {changeLabel}
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg',
            iconBgStyles[variant]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
