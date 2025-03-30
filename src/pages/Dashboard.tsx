
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  AlertCircle, 
  Clock, 
  BarChart, 
  CheckCircle2,
  Search,
  AlertTriangle,
  Clock4,
  Calendar,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentBarChart } from '@/components/charts/IncidentBarChart';
import { IncidentPieChart } from '@/components/charts/IncidentPieChart';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';

export default function Dashboard() {
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: mockDataService.getMetrics,
  });
  
  // Prepare data for charts
  const severityData = metrics ? [
    { name: 'Critical', value: metrics.incidentsBySeverity.critical, color: '#E53E3E' },
    { name: 'High', value: metrics.incidentsBySeverity.high, color: '#DD6B20' },
    { name: 'Medium', value: metrics.incidentsBySeverity.medium, color: '#D69E2E' },
    { name: 'Low', value: metrics.incidentsBySeverity.low, color: '#38A169' },
  ] : [];
  
  const statusData = metrics ? [
    { name: 'Open', value: metrics.incidentsByStatus.open, color: '#4299E1' },
    { name: 'Investigating', value: metrics.incidentsByStatus.investigating, color: '#9b87f5' },
    { name: 'Identified', value: metrics.incidentsByStatus.identified, color: '#F6AD55' },
    { name: 'Monitoring', value: metrics.incidentsByStatus.monitoring, color: '#4FD1C5' },
    { name: 'Resolved', value: metrics.incidentsByStatus.resolved, color: '#68D391' },
    { name: 'Closed', value: metrics.incidentsByStatus.closed, color: '#A0AEC0' },
  ] : [];
  
  const monthlyData = [
    { month: 'Jan', critical: 3, high: 5, medium: 2, low: 1 },
    { month: 'Feb', critical: 2, high: 4, medium: 4, low: 2 },
    { month: 'Mar', critical: 5, high: 7, medium: 3, low: 1 },
    { month: 'Apr', critical: 1, high: 3, medium: 5, low: 3 },
    { month: 'May', critical: 4, high: 2, medium: 1, low: 2 },
    { month: 'Jun', critical: 2, high: 5, medium: 3, low: 1 },
    { month: 'Jul', critical: 7, high: 3, medium: 2, low: 2 },
    { month: 'Aug', critical: 4, high: 4, medium: 3, low: 0 },
    { month: 'Sep', critical: 9, high: 5, medium: 2, low: 1 },
    { month: 'Oct', critical: 5, high: 9, medium: 6, low: 3 },
    { month: 'Nov', critical: 3, high: 4, medium: 2, low: 1 },
    { month: 'Dec', critical: 4, high: 6, medium: 3, low: 2 },
  ];
  
  // Mock weekly data
  const weeklyData = [
    { day: 'Mon', incidents: 5 },
    { day: 'Tue', incidents: 7 },
    { day: 'Wed', incidents: 9 },
    { day: 'Thu', incidents: 4 },
    { day: 'Fri', incidents: 6 },
    { day: 'Sat', incidents: 2 },
    { day: 'Sun', incidents: 1 },
  ];
  
  return (
    <MainLayout>
      <div className="mb-8">
        <PageTitle 
          title="Executive Dashboard" 
          description="High-level overview of incident metrics and system health"
        />
        
        {/* Time Range Tabs */}
        <Tabs defaultValue="monthly" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-6">
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
                    value="28"
                    description="This week"
                    icon={<BarChart size={20} className="text-purple" />}
                    trend={{ value: 8, direction: 'up' }}
                  />
                  <StatCard
                    title="Active Incidents"
                    value={metrics?.openIncidents || 0}
                    description="Requiring attention"
                    icon={<AlertCircle size={20} className="text-severity-critical" />}
                    trend={{ value: 2, direction: 'up' }}
                  />
                  <StatCard
                    title="Average Resolution Time"
                    value="4.5 hrs"
                    description="This week"
                    icon={<Clock size={20} className="text-severity-medium" />}
                    trend={{ value: 15, direction: 'down' }}
                  />
                  <StatCard
                    title="Resolution Rate"
                    value="92%"
                    description="Weekly target: 90%"
                    icon={<CheckCircle2 size={20} className="text-severity-low" />}
                    trend={{ value: 3, direction: 'up' }}
                  />
                </>
              )}
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <IncidentBarChart
                title="Incidents by Day"
                data={weeklyData}
                xAxisKey="day"
                dataKeys={[
                  { key: 'incidents', color: '#6E59A5', name: 'Incidents' }
                ]}
              />
              <IncidentPieChart
                title="Incidents by Severity"
                data={severityData}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-6">
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
                    description="This month"
                    icon={<BarChart size={20} className="text-purple" />}
                    trend={{ value: 12, direction: 'up' }}
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
                    icon={<Clock4 size={20} className="text-purple-light" />}
                    trend={{ value: 8, direction: 'up' }}
                  />
                  <StatCard
                    title="Incident SLA Compliance"
                    value="94%"
                    description="Monthly target: 95%"
                    icon={<CheckCircle2 size={20} className="text-severity-low" />}
                    trend={{ value: 1, direction: 'down' }}
                  />
                </>
              )}
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <IncidentBarChart
                  title="Monthly Incidents by Severity"
                  data={monthlyData}
                  xAxisKey="month"
                  dataKeys={[
                    { key: 'critical', color: '#E53E3E', name: 'Critical' },
                    { key: 'high', color: '#DD6B20', name: 'High' },
                    { key: 'medium', color: '#D69E2E', name: 'Medium' },
                    { key: 'low', color: '#38A169', name: 'Low' },
                  ]}
                />
              </div>
              <IncidentPieChart
                title="Incidents by Status"
                data={statusData}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Top Impacted Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-severity-critical" />
                        <span>API Gateway</span>
                      </div>
                      <span className="font-semibold">12 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-severity-high" />
                        <span>Authentication Service</span>
                      </div>
                      <span className="font-semibold">8 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-severity-high" />
                        <span>Payment Processing</span>
                      </div>
                      <span className="font-semibold">7 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Search size={16} className="text-severity-medium" />
                        <span>Search Service</span>
                      </div>
                      <span className="font-semibold">5 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Search size={16} className="text-severity-medium" />
                        <span>Mobile App</span>
                      </div>
                      <span className="font-semibold">4 incidents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Top Incident Root Causes</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple" />
                        <span>Deployment Issues</span>
                      </div>
                      <span className="font-semibold">35%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple" />
                        <span>Configuration Changes</span>
                      </div>
                      <span className="font-semibold">22%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple" />
                        <span>Infrastructure Failures</span>
                      </div>
                      <span className="font-semibold">18%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple" />
                        <span>Capacity Issues</span>
                      </div>
                      <span className="font-semibold">15%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple" />
                        <span>Third-party Dependencies</span>
                      </div>
                      <span className="font-semibold">10%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="quarterly" className="mt-6">
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
                    value="126"
                    description="This quarter"
                    icon={<BarChart size={20} className="text-purple" />}
                    trend={{ value: 5, direction: 'down' }}
                  />
                  <StatCard
                    title="Critical Incidents"
                    value="24"
                    description="This quarter"
                    icon={<AlertCircle size={20} className="text-severity-critical" />}
                    trend={{ value: 10, direction: 'down' }}
                  />
                  <StatCard
                    title="Quarterly MTTR"
                    value="5.2 hrs"
                    description="Target: 4 hrs"
                    icon={<Clock size={20} className="text-severity-medium" />}
                    trend={{ value: 3, direction: 'up' }}
                  />
                  <StatCard
                    title="SLA Compliance"
                    value="96%"
                    description="Quarterly target: 95%"
                    icon={<CheckCircle2 size={20} className="text-severity-low" />}
                    trend={{ value: 2, direction: 'up' }}
                  />
                </>
              )}
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <IncidentAreaChart
                title="Quarterly Incident Trend"
                data={[
                  { month: 'Jan', count: 9 },
                  { month: 'Feb', count: 12 },
                  { month: 'Mar', count: 15 },
                  { month: 'Apr', count: 10 },
                  { month: 'May', count: 8 },
                  { month: 'Jun', count: 12 },
                  { month: 'Jul', count: 14 },
                  { month: 'Aug', count: 11 },
                  { month: 'Sep', count: 17 },
                  { month: 'Oct', count: 23 },
                  { month: 'Nov', count: 9 },
                  { month: 'Dec', count: 15 },
                ]}
                xAxisKey="month"
                dataKeys={[
                  { key: 'count', color: '#6E59A5', name: 'Incidents' }
                ]}
              />
              <IncidentPieChart
                title="Quarterly Incident Distribution"
                data={[
                  { name: 'Q1', value: 36, color: '#9b87f5' },
                  { name: 'Q2', value: 30, color: '#6E59A5' },
                  { name: 'Q3', value: 42, color: '#4A3B80' },
                  { name: 'Q4', value: 47, color: '#D6BCFA' },
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
