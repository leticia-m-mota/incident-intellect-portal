
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  List, 
  LayoutGrid, 
  ArrowUpDown, 
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentTable } from '@/components/incidents/IncidentTable';
import { IncidentCard } from '@/components/incidents/IncidentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';

export default function Incidents() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const { data: incidents, isLoading } = useQuery({
    queryKey: ['incidents'],
    queryFn: mockDataService.getIncidents,
  });
  
  const { data: metrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: mockDataService.getMetrics,
  });
  
  // Calculate incident stats
  const activeIncidents = incidents?.filter(
    incident => ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status)
  ).length || 0;
  
  const criticalIncidents = incidents?.filter(
    incident => incident.severity === 'critical'
  ).length || 0;
  
  const resolvedThisMonth = incidents?.filter(
    incident => {
      if (!incident.resolvedAt) return false;
      const resolvedDate = new Date(incident.resolvedAt);
      const now = new Date();
      return resolvedDate.getMonth() === now.getMonth() && 
             resolvedDate.getFullYear() === now.getFullYear();
    }
  ).length || 0;
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Incidents" 
          description="View and manage all system incidents" 
        />
        
        <div className="flex items-center gap-3">
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} />
            </Button>
          </div>
          
          <Button 
            onClick={() => navigate('/incidents/new')}
            className="gap-2"
          >
            <Plus size={16} />
            <span>New Incident</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Incidents"
          value={activeIncidents}
          icon={<AlertCircle size={20} className="text-severity-high" />}
        />
        <StatCard
          title="Critical Incidents"
          value={criticalIncidents}
          icon={<AlertCircle size={20} className="text-severity-critical" />}
        />
        <StatCard
          title="Resolved This Month"
          value={resolvedThisMonth}
          icon={<CheckCircle2 size={20} className="text-severity-low" />}
        />
        <StatCard
          title="Mean Time to Resolve"
          value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
          icon={<Clock size={20} className="text-purple" />}
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Incidents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="all">
            {isLoading ? (
              viewMode === 'list' ? (
                <Skeleton className="h-[500px] w-full" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[200px] w-full" />
                  ))}
                </div>
              )
            ) : viewMode === 'list' ? (
              <IncidentTable incidents={incidents || []} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incidents?.map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active">
            {isLoading ? (
              viewMode === 'list' ? (
                <Skeleton className="h-[500px] w-full" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[200px] w-full" />
                  ))}
                </div>
              )
            ) : viewMode === 'list' ? (
              <IncidentTable 
                incidents={incidents?.filter(incident => 
                  ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status)
                ) || []} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incidents?.filter(incident => 
                  ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status)
                ).map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resolved">
            {isLoading ? (
              viewMode === 'list' ? (
                <Skeleton className="h-[500px] w-full" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[200px] w-full" />
                  ))}
                </div>
              )
            ) : viewMode === 'list' ? (
              <IncidentTable 
                incidents={incidents?.filter(incident => 
                  ['resolved', 'closed'].includes(incident.status)
                ) || []} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incidents?.filter(incident => 
                  ['resolved', 'closed'].includes(incident.status)
                ).map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </MainLayout>
  );
}
