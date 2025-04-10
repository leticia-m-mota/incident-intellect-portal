
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { IncidentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface IncidentStatusBadgeProps {
  status: IncidentStatus;
  className?: string;
}

export function IncidentStatusBadge({ status, className }: IncidentStatusBadgeProps) {
  const badgeStyles = {
    open: 'bg-red-500/15 text-red-600 hover:bg-white hover:text-red-700',
    investigating: 'bg-orange-500/15 text-orange-600 hover:bg-white hover:text-orange-700',
    identified: 'bg-amber-500/15 text-amber-600 hover:bg-white hover:text-amber-700',
    monitoring: 'bg-cyan-500/15 text-cyan-600 hover:bg-white hover:text-cyan-700',
    resolved: 'bg-chart-green/15 text-chart-green hover:bg-white hover:text-chart-green',
    closed: 'bg-gray-500/15 text-gray-600 hover:bg-white hover:text-gray-700',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border-0 text-xs py-0.5 px-1.5 transition-colors',
        badgeStyles[status],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
