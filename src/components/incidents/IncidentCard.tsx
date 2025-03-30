
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
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <IncidentSeverityBadge severity={incident.severity} />
            <IncidentStatusBadge status={incident.status} />
          </div>
          
          <h3 className="font-semibold">{incident.title}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {incident.description}
          </p>
          
          <div className="flex flex-wrap mt-2 gap-1">
            {incident.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-3 border-t bg-muted/30 flex justify-between">
        <div className="text-xs text-muted-foreground">
          ID: {incident.id}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  );
}
