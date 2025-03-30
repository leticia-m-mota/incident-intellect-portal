
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className 
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1 mb-1">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-xs font-medium flex items-center gap-1",
                  trend.direction === 'up' && "text-severity-high",
                  trend.direction === 'down' && "text-severity-low",
                  trend.direction === 'neutral' && "text-muted-foreground",
                )}>
                  {trend.direction === 'up' && '↑'}
                  {trend.direction === 'down' && '↓'}
                  {trend.direction === 'neutral' && '→'}
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-2 rounded-full bg-primary/10">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
