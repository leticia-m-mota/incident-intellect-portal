
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
    open: 'bg-blue-500/15 text-blue-600 hover:bg-blue-500/20',
    investigating: 'bg-purple-light/15 text-purple hover:bg-purple-light/20',
    identified: 'bg-amber-500/15 text-amber-600 hover:bg-amber-500/20',
    monitoring: 'bg-cyan-500/15 text-cyan-600 hover:bg-cyan-500/20',
    resolved: 'bg-severity-low/15 text-severity-low hover:bg-severity-low/20',
    closed: 'bg-gray-500/15 text-gray-600 hover:bg-gray-500/20',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border-0',
        badgeStyles[status],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
