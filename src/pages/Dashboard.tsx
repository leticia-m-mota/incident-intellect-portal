
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentBarChart } from '@/components/charts/IncidentBarChart';
import { IncidentPieChart } from '@/components/charts/IncidentPieChart';
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
  
  // Prepare data for charts
  const severityData = metrics ? [
    { name: 'Severity 1', value: metrics.incidentsBySeverity.critical, color: '#E53E3E' },
    { name: 'Severity 2', value: metrics.incidentsBySeverity.high, color: '#DD6B20' },
    { name: 'Severity 3', value: metrics.incidentsBySeverity.medium, color: '#D69E2E' },
    { name: 'Severity 4', value: metrics.incidentsBySeverity.low, color: '#38A169' },
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
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Severity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentPieChart
                    title=""
                    data={severityData}
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
            {/* More Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {isLoadingMetrics ? (
                Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[140px] w-full" />
                ))
              ) : (
                <>
                  <StatCard
                    title="Mean Time to Acknowledge"
                    value="24 mins"
                    description="First response time"
                  />
                  <StatCard
                    title="Mean Time to Resolve"
                    value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
                    description="Resolution time"
                  />
                  <StatCard
                    title="Mean Time Between Failures"
                    value={`${metrics?.mtbf || 0} hrs`}
                    description="System stability"
                  />
                  <StatCard
                    title="Resolution Rate"
                    value="92%"
                    description="Same-day resolution"
                  />
                  <StatCard
                    title="Recurring Issues"
                    value="18%"
                    description="Repeat incidents"
                  />
                  <StatCard
                    title="Automated Recovery"
                    value="42%"
                    description="Self-healing rate"
                  />
                </>
              )}
            </div>
            
            {/* Detailed Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incidents by Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentBarChart
                    title=""
                    data={monthlyData}
                    xAxisKey="month"
                    dataKeys={[
                      { key: 'critical', color: '#E53E3E', name: 'Severity 1' },
                      { key: 'high', color: '#DD6B20', name: 'Severity 2' },
                      { key: 'medium', color: '#D69E2E', name: 'Severity 3' },
                      { key: 'low', color: '#38A169', name: 'Severity 4' },
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Incident Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentPieChart
                    title=""
                    data={statusData}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Impacted Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>API Gateway</span>
                      <span className="font-semibold">12 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Authentication Service</span>
                      <span className="font-semibold">8 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Payment Processing</span>
                      <span className="font-semibold">7 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Search Service</span>
                      <span className="font-semibold">5 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Mobile App</span>
                      <span className="font-semibold">4 incidents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Root Cause Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>Deployment Issues</span>
                      <span className="font-semibold">35%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Configuration Changes</span>
                      <span className="font-semibold">22%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Infrastructure Failures</span>
                      <span className="font-semibold">18%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Capacity Issues</span>
                      <span className="font-semibold">15%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Third-party Dependencies</span>
                      <span className="font-semibold">10%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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
