
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SeverityLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

interface IncidentSeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

export function IncidentSeverityBadge({ severity, className }: IncidentSeverityBadgeProps) {
  const getSeverityConfig = (level: SeverityLevel) => {
    switch (level) {
      case 1:
        return {
          label: 'SEV 1 (Critical)',
          style: 'bg-severity-critical/15 text-severity-critical hover:bg-white hover:text-severity-critical'
        };
      case 2:
        return {
          label: 'SEV 2 (High)',
          style: 'bg-severity-high/15 text-severity-high hover:bg-white hover:text-severity-high'
        };
      case 3:
        return {
          label: 'SEV 3 (Medium)',
          style: 'bg-purple/15 text-purple hover:bg-white hover:text-purple'
        };
      case 4:
        return {
          label: 'SEV 4 (Low)',
          style: 'bg-severity-low/15 text-severity-low hover:bg-white hover:text-severity-low'
        };
      case 5:
        return {
          label: 'SEV 5 (Very Low)',
          style: 'bg-gray-500/15 text-gray-600 hover:bg-white hover:text-gray-700'
        };
      default:
        return {
          label: 'Unknown',
          style: 'bg-gray-500/15 text-gray-600 hover:bg-white hover:text-gray-700'
        };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border-0 transition-colors',
        config.style,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
