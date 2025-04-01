
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentCard } from '@/components/incidents/IncidentCard';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';

export default function Index() {
  const navigate = useNavigate();
  
  const { data: incidents, isLoading: isLoadingIncidents } = useQuery({
    queryKey: ['incidents'],
    queryFn: mockDataService.getIncidents,
  });
  
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: mockDataService.getMetrics,
  });
  
  // Get only critical and high severity incidents that are open
  const criticalIncidents = incidents?.filter(
    incident => (incident.severity === 'critical' || incident.severity === 'high') && 
    ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status)
  ).sort((a, b) => {
    // Sort by severity and then by creation date
    const severityOrder = { critical: 0, high: 1 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 6);
  
  // Format trend data for chart
  const trendData = metrics?.incidentsOverTime.map(item => ({
    date: item.date,
    count: item.count,
  })) || [];
  
  return (
    <MainLayout>
      <div className="mb-8">
        <PageTitle 
          title="Incident Response Portal" 
          description="Critical incident information at a glance"
        />
        
        {/* Stats Overview - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {isLoadingMetrics ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[120px] w-full" />
            ))
          ) : (
            <>
              <StatCard
                title="Total Incidents"
                value={metrics?.totalIncidents || 0}
                description="Year to date"
              />
              <StatCard
                title="Open Critical & High"
                value={(criticalIncidents?.length || 0)}
                description="Requiring attention"
              />
              <StatCard
                title="Mean Time to Resolve"
                value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
                description="Average resolution time"
              />
            </>
          )}
        </div>
        
        {/* Critical Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Critical & High Incidents</h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-purple hover:text-purple-dark"
                onClick={() => navigate('/incidents')}
              >
                View all
              </Button>
            </div>
            
            {isLoadingIncidents ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[180px] w-full" />
                ))}
              </div>
            ) : criticalIncidents?.length === 0 ? (
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">All Clear!</h3>
                <p className="text-muted-foreground">
                  There are no critical or high severity incidents at this time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {criticalIncidents?.map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Incident Trends</h2>
            {isLoadingMetrics ? (
              <Skeleton className="h-[340px] w-full" />
            ) : (
              <IncidentAreaChart 
                title=""
                data={trendData}
                xAxisKey="date"
                dataKeys={[
                  { key: 'count', color: '#6E59A5', name: 'Incidents' }
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
