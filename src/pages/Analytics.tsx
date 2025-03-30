
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  Clock, 
  Calendar, 
  PieChart,
  BarChart,
  TrendingUp,
  Filter,
  SlidersHorizontal
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
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { IncidentBarChart } from '@/components/charts/IncidentBarChart';
import { IncidentPieChart } from '@/components/charts/IncidentPieChart';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { mockDataService } from '@/lib/mockData';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Analytics() {
  // Data filters
  const [timeframe, setTimeframe] = useState('month');
  const [businessUnit, setBusinessUnit] = useState('all');
  const [team, setTeam] = useState('all');
  const [incidentType, setIncidentType] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  const [severityRange, setSeverityRange] = useState([1, 5]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: metrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: mockDataService.getMetrics,
  });
  
  // Prepare data for charts
  const severityData = metrics ? [
    { name: 'Critical (SEV1)', value: metrics.incidentsBySeverity.critical, color: '#E53E3E' },
    { name: 'High (SEV2)', value: metrics.incidentsBySeverity.high, color: '#DD6B20' },
    { name: 'Medium (SEV3)', value: metrics.incidentsBySeverity.medium, color: '#D69E2E' },
    { name: 'Low (SEV4)', value: metrics.incidentsBySeverity.low, color: '#38A169' },
    { name: 'Info (SEV5)', value: 8, color: '#4299E1' },
  ] : [];
  
  const statusData = metrics ? [
    { name: 'Open', value: metrics.incidentsByStatus.open, color: '#4299E1' },
    { name: 'Investigating', value: metrics.incidentsByStatus.investigating, color: '#9b87f5' },
    { name: 'Identified', value: metrics.incidentsByStatus.identified, color: '#F6AD55' },
    { name: 'Monitoring', value: metrics.incidentsByStatus.monitoring, color: '#4FD1C5' },
    { name: 'Resolved', value: metrics.incidentsByStatus.resolved, color: '#68D391' },
    { name: 'Closed', value: metrics.incidentsByStatus.closed, color: '#A0AEC0' },
  ] : [];
  
  // Mock data for charts and filters
  const businessUnits = [
    { label: 'All Business Units', value: 'all' },
    { label: 'Commerce', value: 'commerce' },
    { label: 'Payments', value: 'payments' },
    { label: 'Logistics', value: 'logistics' },
    { label: 'Customer Service', value: 'customer-service' },
  ];
  
  const teams = [
    { label: 'All Teams', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Infrastructure', value: 'infrastructure' },
    { label: 'Data', value: 'data' },
    { label: 'DevOps', value: 'devops' },
    { label: 'SRE', value: 'sre' },
  ];
  
  const incidentTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Data', value: 'data' },
    { label: 'Fraud', value: 'fraud' },
    { label: 'Security', value: 'security' },
    { label: 'Performance', value: 'performance' },
  ];
  
  const timeFrames = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
    { label: 'Custom', value: 'custom' },
  ];
  
  const incidentsByTeam = [
    { team: 'Platform', count: 15 },
    { team: 'Frontend', count: 8 },
    { team: 'Backend', count: 12 },
    { team: 'Mobile', count: 7 },
    { team: 'DevOps', count: 10 },
    { team: 'Database', count: 6 },
  ];
  
  const resolutionTimes = [
    { severity: 'SEV1', time: 3.5 },
    { severity: 'SEV2', time: 5.2 },
    { severity: 'SEV3', time: 8.1 },
    { severity: 'SEV4', time: 12.4 },
    { severity: 'SEV5', time: 24.0 },
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
  
  // Reset filters
  const resetFilters = () => {
    setBusinessUnit('all');
    setTeam('all');
    setIncidentType('all');
    setTimeframe('month');
    setDateRange({
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(),
    });
    setSeverityRange([1, 5]);
  };
  
  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'MMM dd, yyyy');
  };
  
  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (businessUnit !== 'all') count++;
    if (team !== 'all') count++;
    if (incidentType !== 'all') count++;
    if (timeframe !== 'month') count++;
    if (severityRange[0] !== 1 || severityRange[1] !== 5) count++;
    return count;
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <PageTitle 
            title="Analytics & Metrics" 
            description="In-depth analysis of incident data and system performance"
          />
          
          <div className="flex items-center gap-2">
            <Select
              value={timeframe}
              onValueChange={setTimeframe}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeFrames.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {timeframe === 'custom' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
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
            
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-1">{getActiveFiltersCount()}</Badge>
              )}
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost" onClick={resetFilters} size="sm">Reset All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Business Unit</label>
                  <Select
                    value={businessUnit}
                    onValueChange={setBusinessUnit}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select business unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessUnits.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Team</label>
                  <Select
                    value={team}
                    onValueChange={setTeam}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Incident Type</label>
                  <Select
                    value={incidentType}
                    onValueChange={setIncidentType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {incidentTypes.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-3">
                  <label className="text-sm font-medium mb-2 block">Severity Range (SEV{severityRange[0]} - SEV{severityRange[1]})</label>
                  <div className="px-2">
                    <Slider
                      value={severityRange}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={setSeverityRange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Most Critical (SEV1)</span>
                      <span>Less Critical (SEV5)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="executive">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span>Executive</span>
            </TabsTrigger>
            <TabsTrigger value="deep-dive" className="flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span>Deep Dive</span>
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
          
          <TabsContent value="executive">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <BarChart3 size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Total Incidents</h3>
                    <p className="text-2xl font-bold mt-1">{metrics?.totalIncidents || 0}</p>
                    <p className="text-xs text-muted-foreground">YTD: 156 (+12%)</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-severity-critical mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Open Incidents</h3>
                    <p className="text-2xl font-bold mt-1">{metrics?.openIncidents || 0}</p>
                    <p className="text-xs text-muted-foreground">5 SEV1, 8 SEV2</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Mean Time to Resolve</h3>
                    <p className="text-2xl font-bold mt-1">{Math.round((metrics?.mttr || 0) / 60)} hrs</p>
                    <p className="text-xs text-muted-foreground">Target: 4 hrs (-8%)</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <BarChart3 size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">SLA Compliance</h3>
                    <p className="text-2xl font-bold mt-1">94%</p>
                    <p className="text-xs text-muted-foreground">Target: 95% (-1%)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <IncidentBarChart
                  title="Monthly Incidents by Severity"
                  data={monthlyData}
                  xAxisKey="month"
                  dataKeys={[
                    { key: 'critical', color: '#E53E3E', name: 'SEV1' },
                    { key: 'high', color: '#DD6B20', name: 'SEV2' },
                    { key: 'medium', color: '#D69E2E', name: 'SEV3' },
                    { key: 'low', color: '#38A169', name: 'SEV4' },
                  ]}
                />
              </div>
              <IncidentPieChart
                title="Incidents by Severity"
                data={severityData}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Top Impacted Systems</h3>
                  <ul className="space-y-3">
                    {impactedServicesData.map((service, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: service.color }}></div>
                          <span>{service.name}</span>
                        </div>
                        <span className="font-semibold">{service.value} incidents</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <IncidentBarChart
                title="Incidents by Team"
                data={incidentsByTeam}
                xAxisKey="team"
                dataKeys={[
                  { key: 'count', color: '#6E59A5', name: 'Incidents' }
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="deep-dive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <IncidentPieChart
                title="Incidents by Status"
                data={statusData}
              />
              <IncidentBarChart
                title="Average Resolution Time by Severity (hours)"
                data={resolutionTimes}
                xAxisKey="severity"
                dataKeys={[
                  { key: 'time', color: '#6E59A5', name: 'Hours' }
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Top Root Causes</h3>
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
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Incidents by Business Unit</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>Commerce</span>
                      <span className="font-semibold">42 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Payments</span>
                      <span className="font-semibold">38 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Logistics</span>
                      <span className="font-semibold">24 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Customer Service</span>
                      <span className="font-semibold">15 incidents</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Marketing</span>
                      <span className="font-semibold">7 incidents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
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
          
          <TabsContent value="trends">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <IncidentAreaChart
                title="Incident Trends Over Time"
                data={[
                  { date: 'Jan 2023', count: 15 },
                  { date: 'Feb 2023', count: 12 },
                  { date: 'Mar 2023', count: 18 },
                  { date: 'Apr 2023', count: 10 },
                  { date: 'May 2023', count: 14 },
                  { date: 'Jun 2023', count: 16 },
                  { date: 'Jul 2023', count: 12 },
                  { date: 'Aug 2023', count: 11 },
                  { date: 'Sep 2023', count: 14 },
                  { date: 'Oct 2023', count: 23 },
                  { date: 'Nov 2023', count: 19 },
                  { date: 'Dec 2023', count: 16 },
                  { date: 'Jan 2024', count: 21 },
                  { date: 'Feb 2024', count: 18 },
                  { date: 'Mar 2024', count: 15 },
                ]}
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
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Integration Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span>Jira</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Connected</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span>Opsgenie</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Connected</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span>Slack</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Connected</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span>StatusPage</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50">Limited</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span>PagerDuty</span>
                      </div>
                      <Badge variant="outline" className="bg-red-50">Disconnected</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
