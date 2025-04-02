
import React from 'react';
import { SimplifiedIncidentCard } from './SimplifiedIncidentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SampleIncidents() {
  // Sample incident data
  const sampleIncidents = [
    {
      id: 'INC-2023-007',
      title: 'Mobile App Crashing on Startup',
      description: 'Latest version of mobile app crashing immediately upon startup for iOS users on version 16 and above.',
      severity: 'high',
      status: 'resolved',
      createdAt: '2025-04-01T13:45:00Z',
      updatedAt: '2025-04-01T18:30:00Z',
      resolvedAt: '2025-04-01T18:30:00Z',
      impactedSystems: ['Mobile App', 'Client API'],
      ownerTeam: 'Mobile Team',
      tags: ['mobile', 'ios', 'crash', 'startup'],
      timeline: []
    },
    {
      id: 'INC-2023-008',
      title: 'Platform Service Degradation',
      description: 'Users experiencing slowness and occasional errors when using the platform services.',
      severity: 'high',
      status: 'investigating',
      createdAt: '2025-04-02T09:15:00Z',
      updatedAt: '2025-04-02T10:30:45Z',
      impactedSystems: ['Platform Service', 'API Gateway'],
      ownerTeam: 'Platform Team',
      tags: ['platform', 'degradation', 'latency'],
      timeline: []
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Sample Incident Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleIncidents.map(incident => (
            <SimplifiedIncidentCard 
              key={incident.id} 
              incident={incident as any} 
              showTeam={true}
              showDate={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
