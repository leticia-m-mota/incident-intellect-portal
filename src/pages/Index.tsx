
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Clock, 
  BarChart, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentCard } from '@/components/incidents/IncidentCard';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

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
  
  // Get active incidents (open, investigating, identified, monitoring)
  const activeIncidents = incidents?.filter(
    incident => ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status)
  ).sort((a, b) => {
    // Sort by severity and then by creation date
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 4);
  
  // Get recently resolved incidents
  const recentlyResolved = incidents?.filter(
    incident => incident.status === 'resolved'
  ).sort((a, b) => 
    new Date(b.resolvedAt!).getTime() - new Date(a.resolvedAt!).getTime()
  ).slice(0, 2);
  
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
          description="Critical incident information and system status at a glance"
        />
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoadingMetrics ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[140px] w-full" />
            ))
          ) : (
            <>
              <StatCard
                title="Total Incidents"
                value={metrics?.totalIncidents || 0}
                description="Year to date"
                icon={<BarChart size={20} className="text-purple" />}
                trend={{ value: 8, direction: 'up' }}
              />
              <StatCard
                title="Open Incidents"
                value={metrics?.openIncidents || 0}
                description="Requiring attention"
                icon={<AlertCircle size={20} className="text-severity-critical" />}
                trend={{ value: 2, direction: 'down' }}
              />
              <StatCard
                title="Mean Time to Resolve"
                value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
                description="Average resolution time"
                icon={<Clock size={20} className="text-severity-medium" />}
                trend={{ value: 5, direction: 'down' }}
              />
              <StatCard
                title="Mean Time Between Failures"
                value={`${metrics?.mtbf || 0} hrs`}
                description="System stability metric"
                icon={<CheckCircle2 size={20} className="text-severity-low" />}
                trend={{ value: 12, direction: 'up' }}
              />
            </>
          )}
        </div>
        
        {/* Active Incidents & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Active Incidents</h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-purple hover:text-purple-dark"
                onClick={() => navigate('/incidents')}
              >
                View all <ArrowUpRight size={16} />
              </Button>
            </div>
            
            {isLoadingIncidents ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[200px] w-full" />
                ))}
              </div>
            ) : activeIncidents?.length === 0 ? (
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-severity-low mb-4" />
                <h3 className="text-lg font-medium mb-2">All Clear!</h3>
                <p className="text-muted-foreground">
                  There are no active incidents at this time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeIncidents?.map(incident => (
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
            
            <h2 className="text-lg font-semibold mt-6 mb-4">Recently Resolved</h2>
            {isLoadingIncidents ? (
              <div className="space-y-4">
                {Array(2).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[100px] w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recentlyResolved?.map(incident => (
                  <div 
                    key={incident.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => navigate(`/incidents/${incident.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm mb-1">{incident.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {incident.id}
                          </span>
                          <span className="text-xs text-severity-low flex items-center">
                            <CheckCircle2 size={12} className="mr-1" />
                            Resolved {formatDistanceToNow(new Date(incident.resolvedAt!), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
