
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident } from '@/lib/types';
import { format } from 'date-fns';

interface SimplifiedIncidentCardProps {
  incident: Incident;
  showTeam?: boolean;
  showDate?: boolean;
}

export function SimplifiedIncidentCard({ incident, showTeam = true, showDate = true }: SimplifiedIncidentCardProps) {
  const navigate = useNavigate();
  const incidentDate = new Date(incident.createdAt);
  
  return (
    <Card 
      className="cursor-pointer hover:bg-muted/20 transition-colors"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <IncidentSeverityBadge severity={incident.severity} className="badge-compact" />
            <IncidentStatusBadge status={incident.status} className="badge-compact" />
          </div>
          {showDate && (
            <span className="text-xs text-muted-foreground">
              {format(incidentDate, 'MMM d, yyyy')}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-sm">{incident.title}</h3>
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground font-mono">
              {incident.id}
            </p>
            {showTeam && incident.ownerTeam && (
              <p className="text-xs text-muted-foreground">
                {incident.ownerTeam}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
