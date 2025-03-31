
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-border"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <IncidentSeverityBadge severity={incident.severity} className="badge-compact" />
            <IncidentStatusBadge status={incident.status} className="badge-compact" />
          </div>
          
          <h3 className="font-medium text-sm">{incident.title}</h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {incident.description}
          </p>
          
          {incident.tags.length > 0 && (
            <div className="flex flex-wrap mt-1 gap-1">
              {incident.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag} 
                  className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {incident.tags.length > 3 && (
                <span className="text-[10px] text-muted-foreground">
                  +{incident.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t bg-muted/20 flex justify-between">
        <div className="text-[10px] text-muted-foreground font-mono">
          {incident.id}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  );
}
