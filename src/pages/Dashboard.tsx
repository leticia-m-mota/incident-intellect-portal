
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentBarChart } from '@/components/charts/IncidentBarChart';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  Bell, 
  Clock,
  Users, 
  Activity,
  AlertCircle,
  BarChart3,
  CheckCircle,
  Shield,
  FileText,
  TrendingUp,
  ArrowUpRight,
  TrendingDown,
  AlertTriangle,
  PieChart,
  Database
} from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<string>('month');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: mockDataService.getMetrics,
  });
  
  // Mock data for charts
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
  
  // Mock alerts data
  const alertsByTeam = [
    { team: 'Platform', count: 38 },
    { team: 'Frontend', count: 22 },
    { team: 'Backend', count: 31 },
    { team: 'DevOps', count: 42 },
    { team: 'QA', count: 12 },
  ];
  
  const alertsByService = [
    { service: 'API Gateway', count: 45 },
    { service: 'Auth Service', count: 32 },
    { service: 'Payment', count: 39 },
    { service: 'Database', count: 27 },
    { service: 'Search', count: 19 },
    { service: 'CDN', count: 22 },
  ];

  const timeToAcknowledge = [
    { severity: 'SEV1', team: 'Platform', time: 3 },
    { severity: 'SEV1', team: 'Frontend', time: 5 },
    { severity: 'SEV1', team: 'Backend', time: 2 },
    { severity: 'SEV2', team: 'Platform', time: 7 },
    { severity: 'SEV2', team: 'Frontend', time: 8 },
    { severity: 'SEV2', team: 'Backend', time: 6 },
  ];
  
  const timeToAckByService = [
    { severity: 'SEV1', service: 'API Gateway', time: 2.5 },
    { severity: 'SEV1', service: 'Auth Service', time: 4.1 },
    { severity: 'SEV1', service: 'Payment', time: 3.3 },
    { severity: 'SEV2', service: 'API Gateway', time: 6.7 },
    { severity: 'SEV2', service: 'Auth Service', time: 7.9 },
    { severity: 'SEV2', service: 'Payment', time: 8.2 },
  ];
  
  // Mock incidents data
  const incidentsStatus = [
    { status: 'Open', count: metrics?.incidentsByStatus.open || 0 },
    { status: 'Investigating', count: metrics?.incidentsByStatus.investigating || 0 },
    { status: 'Identified', count: metrics?.incidentsByStatus.identified || 0 },
    { status: 'Monitoring', count: metrics?.incidentsByStatus.monitoring || 0 },
    { status: 'Resolved', count: metrics?.incidentsByStatus.resolved || 0 },
    { status: 'Closed', count: metrics?.incidentsByStatus.closed || 0 },
  ];
  
  const impactedServices = [
    { service: 'API Gateway', incidents: 12, downtime: 245 },
    { service: 'Authentication', incidents: 8, downtime: 180 },
    { service: 'Payment', incidents: 7, downtime: 320 },
    { service: 'Database', incidents: 6, downtime: 150 },
    { service: 'Search', incidents: 5, downtime: 90 },
    { service: 'CDN', incidents: 4, downtime: 60 },
  ];
  
  const rootCauses = [
    { cause: 'Deployment Issues', count: 14 },
    { cause: 'Configuration', count: 9 },
    { cause: 'Infrastructure', count: 7 },
    { cause: 'Capacity', count: 6 },
    { cause: 'Third-party Dependency', count: 4 },
    { cause: 'Code Bug', count: 10 },
  ];
  
  const serviceHealthScores = [
    { service: 'API Gateway', score: 85 },
    { service: 'Authentication', score: 92 },
    { service: 'Payment', score: 79 },
    { service: 'Database', score: 95 },
    { service: 'Search', score: 88 },
    { service: 'CDN', score: 91 },
  ];
  
  const impactedTeams = [
    { team: 'Platform', incidents: 15 },
    { team: 'Frontend', incidents: 8 },
    { team: 'Backend', incidents: 12 },
    { team: 'Mobile', incidents: 7 },
    { team: 'DevOps', incidents: 10 },
    { team: 'Database', incidents: 6 },
  ];
  
  const timeToResolve = [
    { severity: 'SEV1', time: 3.5 },
    { severity: 'SEV2', time: 5.2 },
    { severity: 'SEV3', time: 8.1 },
    { severity: 'SEV4', time: 12.4 },
    { severity: 'SEV5', time: 24.0 },
  ];
  
  const actionItems = [
    { status: 'Backlog', count: 24 },
    { status: 'Prioritized', count: 18 },
    { status: 'In Progress', count: 12 },
    { status: 'Review', count: 7 },
    { status: 'Done', count: 32 },
  ];
  
  // Mock trends data
  const incidentProjections = [
    { month: 'Jan', actual: 15, projected: 15 },
    { month: 'Feb', actual: 12, projected: 12 },
    { month: 'Mar', actual: 18, projected: 18 },
    { month: 'Apr', actual: 11, projected: 11 },
    { month: 'May', actual: 14, projected: 14 },
    { month: 'Jun', actual: 9, projected: 9 },
    { month: 'Jul', actual: null, projected: 10 },
    { month: 'Aug', actual: null, projected: 12 },
    { month: 'Sep', actual: null, projected: 15 },
    { month: 'Oct', actual: null, projected: 17 },
    { month: 'Nov', actual: null, projected: 14 },
    { month: 'Dec', actual: null, projected: 16 },
  ];
  
  const remediationTime = [
    { month: 'Jan', time: 120 },
    { month: 'Feb', time: 145 },
    { month: 'Mar', time: 130 },
    { month: 'Apr', time: 110 },
    { month: 'May', time: 95 },
    { month: 'Jun', time: 80 },
  ];
  
  const incidentTrends = [
    { quarter: 'Q1', frontend: 24, backend: 18, infrastructure: 32 },
    { quarter: 'Q2', frontend: 18, backend: 22, infrastructure: 27 },
    { quarter: 'Q3', frontend: 22, backend: 25, infrastructure: 24 },
    { quarter: 'Q4', frontend: 26, backend: 20, infrastructure: 30 },
  ];
  
  // Format date for display
  const formatDateRange = () => {
    if (timeFilter === '7days') return 'Last 7 Days';
    if (timeFilter === 'month') return 'Last Month';
    if (timeFilter === 'year') return 'Last Year';
    if (timeFilter === 'custom' && dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
    }
    return 'Select Date Range';
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <PageTitle 
          title="Analytics Dashboard" 
          description="Incident metrics and performance analysis"
        />
        
        {/* Date Range Filter */}
        <div className="flex justify-end items-center gap-4 mt-6 mb-4">
          <div className="flex items-center gap-2">
            <Select
              value={filterSeverity}
              onValueChange={setFilterSeverity}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Severity 1 (Critical)</SelectItem>
                <SelectItem value="high">Severity 2 (High)</SelectItem>
                <SelectItem value="medium">Severity 3 (Medium)</SelectItem>
                <SelectItem value="low">Severity 4 (Low)</SelectItem>
                <SelectItem value="info">Severity 5 (Info)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={timeFilter}
              onValueChange={setTimeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            {timeFilter === 'custom' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {formatDateRange()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        
        {/* Executive View & Deep Dive Tabs */}
        <Tabs defaultValue="executive">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="executive">Executive View</TabsTrigger>
            <TabsTrigger value="deepdive">Deep Dive Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="executive" className="mt-6">
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
                    description="This period"
                  />
                  <StatCard
                    title="Critical Incidents"
                    value={metrics?.incidentsBySeverity.critical || 0}
                    description="Severity 1 issues"
                  />
                  <StatCard
                    title="MTTR"
                    value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
                    description="Mean time to resolve"
                  />
                  <StatCard
                    title="SLA Compliance"
                    value="94%"
                    description="Target: 95%"
                  />
                </>
              )}
            </div>
            
            {/* Executive Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentAreaChart
                    title=""
                    data={trendData}
                    xAxisKey="month"
                    dataKeys={[
                      { key: 'count', color: '#6E59A5', name: 'Incidents' }
                    ]}
                    legendPosition="bottom"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Severity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentBarChart
                    title=""
                    data={[
                      { name: 'SEV1', count: metrics?.incidentsBySeverity.critical || 0 },
                      { name: 'SEV2', count: metrics?.incidentsBySeverity.high || 0 },
                      { name: 'SEV3', count: metrics?.incidentsBySeverity.medium || 0 },
                      { name: 'SEV4', count: metrics?.incidentsBySeverity.low || 0 },
                      { name: 'SEV5', count: 8 },
                    ]}
                    xAxisKey="name"
                    dataKeys={[
                      { key: 'count', color: '#9b87f5', name: 'Incidents' }
                    ]}
                    legendPosition="bottom"
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Unit Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Top Performing BUs</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <span>Business Unit 3</span>
                        <span className="font-semibold">98% SLA</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Business Unit 1</span>
                        <span className="font-semibold">96% SLA</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Business Unit 4</span>
                        <span className="font-semibold">93% SLA</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Incident Distribution</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <span>Business Unit 2</span>
                        <span className="font-semibold">32% of incidents</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Business Unit 1</span>
                        <span className="font-semibold">28% of incidents</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Business Unit 4</span>
                        <span className="font-semibold">24% of incidents</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Business Unit 3</span>
                        <span className="font-semibold">16% of incidents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deepdive" className="mt-6">
            {/* Alerts Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={20} className="text-amber-500" />
                <h2 className="text-xl font-semibold">Alerts</h2>
              </div>
              <Separator className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  title="Total Alerts"
                  value="142"
                  description="Last 30 days"
                  icon={<Bell size={20} className="text-amber-500" />}
                />
                
                <StatCard
                  title="Critical Alerts"
                  value="28"
                  description="19.7% of total"
                  icon={<AlertCircle size={20} className="text-red-500" />}
                  trend={{ value: 3, direction: 'down' }}
                />
                
                <StatCard
                  title="Mean Time to Acknowledge"
                  value="6.2 min"
                  description="Target: 5 min"
                  icon={<Clock size={20} className="text-purple" />}
                  trend={{ value: 8, direction: 'down' }}
                />
                
                <StatCard
                  title="Alert to Incident Conversion"
                  value="34%"
                  description="Alerts resulting in incidents"
                  icon={<ArrowUpRight size={20} className="text-purple" />}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alert Volume by Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={alertsByTeam}
                      xAxisKey="team"
                      dataKeys={[
                        { key: 'count', color: '#9b87f5', name: 'Alerts' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alert Volume by Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={alertsByService}
                      xAxisKey="service"
                      dataKeys={[
                        { key: 'count', color: '#6E59A5', name: 'Alerts' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time to Acknowledge by Team (minutes)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={timeToAcknowledge}
                      xAxisKey="severity"
                      dataKeys={[
                        { key: 'time', color: '#9b87f5', name: 'Minutes' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time to Acknowledge by Service (minutes)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={timeToAckByService}
                      xAxisKey="severity"
                      dataKeys={[
                        { key: 'time', color: '#6E59A5', name: 'Minutes' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* Incidents Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-red-500" />
                <h2 className="text-xl font-semibold">Incidents</h2>
              </div>
              <Separator className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  title="Total Incidents"
                  value={metrics?.totalIncidents || 0}
                  description="This period"
                  icon={<AlertCircle size={20} className="text-red-500" />}
                />
                
                <StatCard
                  title="Open Incidents"
                  value={metrics?.openIncidents || 0}
                  description="Requiring attention"
                  icon={<Activity size={20} className="text-amber-500" />}
                />
                
                <StatCard
                  title="Mean Time to Resolve"
                  value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
                  description="Average resolution time"
                  icon={<Clock size={20} className="text-purple" />}
                />
                
                <StatCard
                  title="System Resilience Score"
                  value="87/100"
                  description="Based on 6 key metrics"
                  icon={<Shield size={20} className="text-green-500" />}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incidents by Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={incidentsStatus}
                      xAxisKey="status"
                      dataKeys={[
                        { key: 'count', color: '#9b87f5', name: 'Incidents' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Most Impacted Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={impactedServices}
                      xAxisKey="service"
                      dataKeys={[
                        { key: 'incidents', color: '#6E59A5', name: 'Incidents' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Service Downtime (minutes)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={impactedServices}
                      xAxisKey="service"
                      dataKeys={[
                        { key: 'downtime', color: '#E53E3E', name: 'Minutes' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Root Causes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={rootCauses}
                      xAxisKey="cause"
                      dataKeys={[
                        { key: 'count', color: '#DD6B20', name: 'Incidents' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Service Health Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 pt-2">
                      {serviceHealthScores.map(item => (
                        <div key={item.service}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.service}</span>
                            <span className="text-sm font-medium">{item.score}/100</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.score >= 90 ? 'bg-green-500' : item.score >= 80 ? 'bg-amber-500' : 'bg-red-500'}`} 
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time to Resolve by Severity (hours)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={timeToResolve}
                      xAxisKey="severity"
                      dataKeys={[
                        { key: 'time', color: '#6E59A5', name: 'Hours' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Teams Impacted by Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={impactedTeams}
                      xAxisKey="team"
                      dataKeys={[
                        { key: 'incidents', color: '#9b87f5', name: 'Incidents' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Action Items by Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={actionItems}
                      xAxisKey="status"
                      dataKeys={[
                        { key: 'count', color: '#6E59A5', name: 'Items' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* Trends Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-blue-500" />
                <h2 className="text-xl font-semibold">Trends & Projections</h2>
              </div>
              <Separator className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  title="Projected Incidents"
                  value="+24%"
                  description="Next quarter forecast"
                  icon={<TrendingUp size={20} className="text-amber-500" />}
                />
                
                <StatCard
                  title="Remediation Time Trend"
                  value="-15%"
                  description="Month-over-month improvement"
                  icon={<TrendingDown size={20} className="text-green-500" />}
                  trend={{ value: 15, direction: 'down' }}
                />
                
                <StatCard
                  title="Recurring Issues"
                  value="18%"
                  description="Of total incidents"
                  icon={<FileText size={20} className="text-purple" />}
                  trend={{ value: 3, direction: 'down' }}
                />
                
                <StatCard
                  title="Technical Debt Progress"
                  value="37%"
                  description="Of critical items addressed"
                  icon={<Database size={20} className="text-blue-500" />}
                  trend={{ value: 12, direction: 'up' }}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incident Projections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentAreaChart
                      title=""
                      data={incidentProjections}
                      xAxisKey="month"
                      dataKeys={[
                        { key: 'actual', color: '#6E59A5', name: 'Actual Incidents' },
                        { key: 'projected', color: '#9b87f5', name: 'Projected Incidents', strokeDasharray: "5 5" }
                      ]}
                      legendPosition="top"
                    />
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertCircle size={16} className="text-amber-500" /> 
                        Key Insight
                      </h4>
                      <p className="text-sm mt-1">
                        The data projects a 24% increase in incidents for Q3, primarily affecting API Gateway and Authentication services. 
                        Recommended focus on these services for proactive maintenance and scaling.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time to Work on Remediations (hours)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentAreaChart
                      title=""
                      data={remediationTime}
                      xAxisKey="month"
                      dataKeys={[
                        { key: 'time', color: '#6E59A5', name: 'Hours' }
                      ]}
                      legendPosition="top"
                    />
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Positive Trend:</span> Remediation time has decreased by 33% over the last 6 months
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incident Type Distribution by Quarter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      data={incidentTrends}
                      xAxisKey="quarter"
                      dataKeys={[
                        { key: 'frontend', color: '#6E59A5', name: 'Frontend' },
                        { key: 'backend', color: '#9b87f5', name: 'Backend' },
                        { key: 'infrastructure', color: '#D6BCFA', name: 'Infrastructure' }
                      ]}
                      legendPosition="top"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emerging Trends & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Trend</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Recommendation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">API Gateway capacity issues</TableCell>
                        <TableCell>High (32% of recent incidents)</TableCell>
                        <TableCell>Implement auto-scaling and circuit breakers</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Authentication service reliability</TableCell>
                        <TableCell>Medium (15% of recent incidents)</TableCell>
                        <TableCell>Add redundancy and implement more comprehensive testing</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Database connection exhaustion</TableCell>
                        <TableCell>High (28% of recent incidents)</TableCell>
                        <TableCell>Implement connection pooling and optimize query patterns</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Deployment-related outages</TableCell>
                        <TableCell>Medium (18% of recent incidents)</TableCell>
                        <TableCell>Implement canary deployments and improved rollback procedures</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

// Helper function for trend data
const trendData = [
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
];
