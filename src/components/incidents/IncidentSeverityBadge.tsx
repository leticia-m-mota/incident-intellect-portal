
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
    critical: 'bg-severity-critical/15 text-severity-critical hover:bg-white hover:text-severity-critical',
    high: 'bg-severity-high/15 text-severity-high hover:bg-white hover:text-severity-high',
    medium: 'bg-purple/15 text-purple hover:bg-white hover:text-purple', // Changed to purple for better contrast
    low: 'bg-severity-low/15 text-severity-low hover:bg-white hover:text-severity-low',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border-0 transition-colors',
        badgeStyles[severity],
        className
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}
