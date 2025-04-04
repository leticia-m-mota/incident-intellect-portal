
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident } from '@/lib/types';

interface SimplifiedIncidentCardProps {
  incident: Incident;
}

export function SimplifiedIncidentCard({ incident }: SimplifiedIncidentCardProps) {
  const navigate = useNavigate();
  
  const createdDate = new Date(incident.createdAt);
  const formattedDate = format(createdDate, "MMMM d'th' yyyy");
  
  return (
    <Card 
      className="cursor-pointer hover:bg-muted/20 transition-colors border border-border"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <IncidentSeverityBadge severity={incident.severity} className="badge-compact" />
          <IncidentStatusBadge status={incident.status} className="badge-compact" />
        </div>
        
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{incident.title}</h3>
        
        <div className="flex flex-col gap-1 mt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-mono">
              {incident.id}
            </p>
            <p className="text-xs text-muted-foreground">
              {incident.ownerTeam}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {formattedDate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
