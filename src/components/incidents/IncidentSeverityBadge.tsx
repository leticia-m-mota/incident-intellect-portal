
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SeverityLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

interface IncidentSeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

export function IncidentSeverityBadge({ severity, className }: IncidentSeverityBadgeProps) {
  const badgeStyles = {
    critical: 'bg-severity-critical/15 text-severity-critical hover:bg-severity-critical/20',
    high: 'bg-severity-high/15 text-severity-high hover:bg-severity-high/20',
    medium: 'bg-severity-medium/15 text-severity-medium hover:bg-severity-medium/20',
    low: 'bg-severity-low/15 text-severity-low hover:bg-severity-low/20',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border-0',
        badgeStyles[severity],
        className
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}
