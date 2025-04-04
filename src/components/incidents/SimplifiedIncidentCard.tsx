
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident } from '@/lib/types';

interface SimplifiedIncidentCardProps {
  incident: Incident;
  compact?: boolean;
}

export function SimplifiedIncidentCard({ incident, compact = false }: SimplifiedIncidentCardProps) {
  const navigate = useNavigate();
  
  const createdDate = new Date(incident.createdAt);
  const formattedDate = format(createdDate, "MMMM d'th' yyyy");
  
  return (
    <Card 
      className="cursor-pointer hover:bg-muted/20 transition-colors border border-border"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <CardContent className={compact ? "p-2" : "p-3"}>
        <div className="flex items-start gap-2 mb-1">
          <IncidentSeverityBadge severity={incident.severity} className="badge-compact" />
          <IncidentStatusBadge status={incident.status} className="badge-compact" />
        </div>
        
        <h3 className={`font-medium ${compact ? "text-xs" : "text-sm"} mb-1 line-clamp-1`}>{incident.title}</h3>
        
        <div className="flex flex-col gap-0.5 mt-1">
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
