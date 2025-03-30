
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  Clock, 
  Calendar, 
  PieChart,
  BarChart,
  TrendingUp
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { IncidentBarChart } from '@/components/charts/IncidentBarChart';
import { IncidentPieChart } from '@/components/charts/IncidentPieChart';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { mockDataService } from '@/lib/mockData';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('year');
  
  const { data: metrics } = useQuery({
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
  
  // Mock data for charts
  const incidentsByTeam = [
    { team: 'Platform', count: 15 },
    { team: 'Frontend', count: 8 },
    { team: 'Backend', count: 12 },
    { team: 'Mobile', count: 7 },
    { team: 'DevOps', count: 10 },
    { team: 'Database', count: 6 },
  ];
  
  const resolutionTimes = [
    { severity: 'Critical', time: 3.5 },
    { severity: 'High', time: 5.2 },
    { severity: 'Medium', time: 8.1 },
    { severity: 'Low', time: 12.4 },
  ];
  
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
  
  const impactedServicesData = [
    { name: 'API Gateway', value: 12, color: '#6E59A5' },
    { name: 'Authentication', value: 8, color: '#9b87f5' },
    { name: 'Payment Service', value: 7, color: '#4A3B80' },
    { name: 'Database', value: 6, color: '#D6BCFA' },
    { name: 'Search', value: 5, color: '#8E9196' },
    { name: 'Other', value: 4, color: '#F6F6F7' },
  ];
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <PageTitle 
            title="Analytics & Metrics" 
            description="In-depth analysis of incident data and system performance"
          />
          
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart size={16} />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <PieChart size={16} />
              <span>Services</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <IncidentBarChart
                title="Incidents by Month"
                data={monthlyData}
                xAxisKey="month"
                dataKeys={[
                  { key: 'critical', color: '#E53E3E', name: 'Critical' },
                  { key: 'high', color: '#DD6B20', name: 'High' },
                  { key: 'medium', color: '#D69E2E', name: 'Medium' },
                  { key: 'low', color: '#38A169', name: 'Low' },
                ]}
              />
              <IncidentPieChart
                title="Incidents by Severity"
                data={severityData}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IncidentBarChart
                title="Incidents by Team"
                data={incidentsByTeam}
                xAxisKey="team"
                dataKeys={[
                  { key: 'count', color: '#6E59A5', name: 'Incidents' }
                ]}
              />
              <IncidentPieChart
                title="Incidents by Status"
                data={statusData}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Mean Time to Resolve</h3>
                    <p className="text-2xl font-bold mt-1">4.8 hrs</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Mean Time to Acknowledge</h3>
                    <p className="text-2xl font-bold mt-1">12 min</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Calendar size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Mean Time Between Failures</h3>
                    <p className="text-2xl font-bold mt-1">72 hrs</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <BarChart3 size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">SLA Compliance</h3>
                    <p className="text-2xl font-bold mt-1">95%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IncidentBarChart
                title="Average Resolution Time by Severity (hours)"
                data={resolutionTimes}
                xAxisKey="severity"
                dataKeys={[
                  { key: 'time', color: '#6E59A5', name: 'Hours' }
                ]}
              />
              <IncidentAreaChart
                title="Resolution Time Trend"
                data={[
                  { month: 'Jan', time: 5.2 },
                  { month: 'Feb', time: 4.8 },
                  { month: 'Mar', time: 5.5 },
                  { month: 'Apr', time: 6.0 },
                  { month: 'May', time: 5.2 },
                  { month: 'Jun', time: 4.5 },
                  { month: 'Jul', time: 4.2 },
                  { month: 'Aug', time: 3.9 },
                  { month: 'Sep', time: 4.5 },
                  { month: 'Oct', time: 4.8 },
                  { month: 'Nov', time: 4.1 },
                  { month: 'Dec', time: 3.6 },
                ]}
                xAxisKey="month"
                dataKeys={[
                  { key: 'time', color: '#6E59A5', name: 'Avg. Hours' }
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <IncidentAreaChart
                title="Incident Trends Over Time"
                data={metrics?.incidentsOverTime.map(item => ({
                  date: item.date,
                  count: item.count,
                })) || []}
                xAxisKey="date"
                dataKeys={[
                  { key: 'count', color: '#6E59A5', name: 'Incidents' }
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IncidentBarChart
                title="Incident Growth Rate (% Change MoM)"
                data={[
                  { month: 'Jan', rate: 0 },
                  { month: 'Feb', rate: 15 },
                  { month: 'Mar', rate: 22 },
                  { month: 'Apr', rate: -8 },
                  { month: 'May', rate: -12 },
                  { month: 'Jun', rate: 5 },
                  { month: 'Jul', rate: 10 },
                  { month: 'Aug', rate: -5 },
                  { month: 'Sep', rate: 18 },
                  { month: 'Oct', rate: 25 },
                  { month: 'Nov', rate: -18 },
                  { month: 'Dec', rate: 8 },
                ]}
                xAxisKey="month"
                dataKeys={[
                  { key: 'rate', color: '#6E59A5', name: 'Growth Rate %' }
                ]}
              />
              <IncidentAreaChart
                title="Critical Incidents vs. Total Incidents"
                data={monthlyData.map(item => ({
                  month: item.month,
                  critical: item.critical,
                  total: item.critical + item.high + item.medium + item.low,
                }))}
                xAxisKey="month"
                dataKeys={[
                  { key: 'critical', color: '#E53E3E', name: 'Critical' },
                  { key: 'total', color: '#6E59A5', name: 'Total' }
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <IncidentPieChart
                title="Most Impacted Services"
                data={impactedServicesData}
              />
              <IncidentBarChart
                title="Service Downtime (minutes)"
                data={[
                  { service: 'API Gateway', downtime: 120 },
                  { service: 'Auth Service', downtime: 85 },
                  { service: 'Payment', downtime: 140 },
                  { service: 'Database', downtime: 60 },
                  { service: 'Search', downtime: 45 },
                  { service: 'CDN', downtime: 30 },
                ]}
                xAxisKey="service"
                dataKeys={[
                  { key: 'downtime', color: '#E53E3E', name: 'Minutes' }
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Service Health Scores</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">API Gateway</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Authentication Service</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Payment Processing</span>
                        <span className="text-sm font-medium">79%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Cluster</span>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Search Service</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <IncidentBarChart
                title="Service Recovery Time (Average)"
                data={[
                  { service: 'API Gateway', recovery: 4.2 },
                  { service: 'Auth Service', recovery: 3.5 },
                  { service: 'Payment', recovery: 5.8 },
                  { service: 'Database', recovery: 6.2 },
                  { service: 'Search', recovery: 3.1 },
                  { service: 'CDN', recovery: 2.4 },
                ]}
                xAxisKey="service"
                dataKeys={[
                  { key: 'recovery', color: '#6E59A5', name: 'Hours' }
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
