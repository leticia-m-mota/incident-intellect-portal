
import React from 'react';
import { Incident } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { Clock, Users, AlertTriangle } from 'lucide-react';

interface IncidentImpactMetricsProps {
  incident: Incident;
  showDetailed?: boolean;
  className?: string;
}

export function IncidentImpactMetrics({ 
  incident, 
  showDetailed = true,
  className 
}: IncidentImpactMetricsProps) {
  if (!incident.metrics) {
    return (
      <div className={`text-center py-6 ${className}`}>
        <p className="text-muted-foreground">No impact metrics available for this incident</p>
      </div>
    );
  }
  
  const { metrics } = incident;
  
  // Function to determine impact level based on metrics
  const getUserImpactLevel = () => {
    if (!metrics.affectedUsers) return 'Unknown';
    if (metrics.affectedUsers > 10000) return 'High';
    if (metrics.affectedUsers > 1000) return 'Medium';
    return 'Low';
  };
  
  const getTimeToRestoreLevel = () => {
    if (!metrics.timeToResolve) return 'Unknown';
    if (metrics.timeToResolve > 240) return 'Slow';
    if (metrics.timeToResolve > 60) return 'Medium';
    return 'Fast';
  };
  
  const getBusinessImpactLevel = () => {
    if (incident.severity === 'critical') return 'Severe';
    if (incident.severity === 'high') return 'Significant';
    if (incident.severity === 'medium') return 'Moderate';
    return 'Low';
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      {showDetailed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Time to Acknowledge
              </h3>
              <p className="text-2xl font-semibold">
                {metrics.timeToAcknowledge} minutes
              </p>
            </div>
            
            {metrics.timeToResolve && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Time to Resolve
                </h3>
                <p className="text-2xl font-semibold">
                  {metrics.timeToResolve} minutes 
                  <span className="text-sm text-muted-foreground ml-2">
                    ({Math.round(metrics.timeToResolve / 60)} hours)
                  </span>
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {metrics.affectedUsers && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Affected Users
                </h3>
                <p className="text-2xl font-semibold">
                  {metrics.affectedUsers.toLocaleString()}
                </p>
              </div>
            )}
            
            {metrics.serviceDowntime && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Service Downtime
                </h3>
                <p className="text-2xl font-semibold">
                  {metrics.serviceDowntime} minutes
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium mb-3">Key Impact Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users size={20} className="text-muted-foreground" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">User Impact</h4>
                <p className="text-2xl font-bold">
                  {getUserImpactLevel()}
                </p>
                {metrics.affectedUsers && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {metrics.affectedUsers.toLocaleString()} users
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <AlertTriangle size={20} className="text-muted-foreground" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Business Impact</h4>
                <p className="text-2xl font-bold">
                  {getBusinessImpactLevel()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <IncidentSeverityBadge severity={incident.severity} />
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock size={20} className="text-muted-foreground" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Time to Restore</h4>
                <p className="text-2xl font-bold">
                  {getTimeToRestoreLevel()}
                </p>
                {metrics.timeToResolve && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.timeToResolve / 60)}h {metrics.timeToResolve % 60}m
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
