
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident } from '@/lib/types';

interface SimplifiedIncidentCardProps {
  incident: Incident;
}

export function SimplifiedIncidentCard({ incident }: SimplifiedIncidentCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="cursor-pointer hover:bg-muted/20 transition-colors"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <IncidentSeverityBadge severity={incident.severity} className="badge-compact" />
          <IncidentStatusBadge status={incident.status} className="badge-compact" />
        </div>
        
        <h3 className="font-medium text-sm mb-1">{incident.title}</h3>
        
        <p className="text-xs text-muted-foreground">
          {incident.id}
        </p>
      </CardContent>
    </Card>
  );
}
