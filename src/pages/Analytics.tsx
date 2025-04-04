
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  Clock, 
  Calendar,
  PieChart,
  Filter,
  Download,
  SlidersHorizontal,
  Bell,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  Target
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [selectedSeverities, setSelectedSeverities] = useState([1, 2, 3, 4, 5]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: metrics } = useQuery({
    queryKey: ['metrics', timeframe, businessUnit, team, incidentType, selectedSeverities],
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
    { label: 'Business Unit 1', value: 'bu1' },
    { label: 'Business Unit 2', value: 'bu2' },
  ];
  
  const teams = [
    { label: 'All Teams', value: 'all' },
    { label: 'BU1 - Team 1', value: 'bu1-team1' },
    { label: 'BU1 - Team 2', value: 'bu1-team2' },
    { label: 'BU2 - Team 4', value: 'bu2-team4' },
  ];
  
  const incidentTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Dataset', value: 'dataset' },
    { label: 'Data Platform', value: 'data-platform' },
    { label: 'Data Model', value: 'data-model' },
    { label: 'Fraud', value: 'fraud' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Security', value: 'security' },
  ];
  
  const timeFrames = [
    { label: 'Last 7 Days', value: 'week' },
    { label: 'Last Month', value: 'month' },
    { label: 'Last Year', value: 'year' },
    { label: 'Custom', value: 'custom' },
  ];
  
  const severityLevels = [
    { id: 1, label: 'SEV1 (Critical)' },
    { id: 2, label: 'SEV2 (High)' },
    { id: 3, label: 'SEV3 (Medium)' },
    { id: 4, label: 'SEV4 (Low)' },
    { id: 5, label: 'SEV5 (Info)' },
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

  const acknowledgeTimeData = [
    { team: 'Platform', time: 5 },
    { team: 'Frontend', time: 8 },
    { team: 'Backend', time: 4 },
    { team: 'Mobile', time: 10 },
    { team: 'DevOps', time: 3 },
  ];

  const reportTimeData = [
    { severity: 'SEV1', time: 2 },
    { severity: 'SEV2', time: 5 },
    { severity: 'SEV3', time: 12 },
    { severity: 'SEV4', time: 45 },
    { severity: 'SEV5', time: 120 },
  ];

  const complianceData = [
    { slo: 'Uptime (99.9%)', compliance: 99.93 },
    { slo: 'Response Time (200ms)', compliance: 98.7 },
    { slo: 'Critical Resolution (4h)', compliance: 92.3 },
    { slo: 'P1 Acknowledgement (15m)', compliance: 95.1 },
    { slo: 'P2 Resolution (24h)', compliance: 97.8 },
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
    setSelectedSeverities([1, 2, 3, 4, 5]);
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
    if (selectedSeverities.length !== 5) count++;
    return count;
  };

  // Toggle severity selection
  const toggleSeverity = (severityId: number) => {
    setSelectedSeverities(prev => {
      if (prev.includes(severityId)) {
        return prev.filter(id => id !== severityId);
      } else {
        return [...prev, severityId].sort();
      }
    });
  };

  // Export data to CSV
  const exportToCSV = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being exported to CSV format",
    });
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

            <Button 
              variant="outline"
              className="gap-2"
              onClick={exportToCSV}
            >
              <Download size={16} />
              <span>Export</span>
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
                  <label className="text-sm font-medium mb-2 block">Severity Levels</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {severityLevels.map((severity) => (
                      <div key={severity.id} className="flex items-center gap-2">
                        <Checkbox 
                          id={`sev-${severity.id}`} 
                          checked={selectedSeverities.includes(severity.id)}
                          onCheckedChange={() => toggleSeverity(severity.id)}
                        />
                        <label 
                          htmlFor={`sev-${severity.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {severity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="executive">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span>Executive</span>
            </TabsTrigger>
            <TabsTrigger value="deep-dive" className="flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span>Deep Dive</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="executive">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <AlertCircle size={24} className="text-severity-critical mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Open Incidents</h3>
                    <p className="text-2xl font-bold mt-1">{metrics?.openIncidents || 0}</p>
                    <p className="text-xs text-muted-foreground">5 Critical, 8 High</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Mean Time to Ack</h3>
                    <p className="text-2xl font-bold mt-1">12 min</p>
                    <p className="text-xs text-muted-foreground">Target: 15 min (+20%)</p>
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
                    <Target size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">SLA Compliance</h3>
                    <p className="text-2xl font-bold mt-1">94%</p>
                    <p className="text-xs text-muted-foreground">Target: 95% (-1%)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Monthly Incidents by Severity</h3>
                    <IncidentBarChart
                      title=""
                      legendPosition="top"
                      data={monthlyData}
                      xAxisKey="month"
                      dataKeys={[
                        { key: 'critical', color: '#E53E3E', name: 'SEV1' },
                        { key: 'high', color: '#DD6B20', name: 'SEV2' },
                        { key: 'medium', color: '#D69E2E', name: 'SEV3' },
                        { key: 'low', color: '#38A169', name: 'SEV4' },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Incidents by Severity</h3>
                  <IncidentPieChart
                    title=""
                    legendPosition="top"
                    data={severityData}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Average Time to Acknowledge (minutes)</h3>
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
                    data={acknowledgeTimeData}
                    xAxisKey="team"
                    dataKeys={[
                      { key: 'time', color: '#6E59A5', name: 'Minutes' }
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Average Time to Report (minutes)</h3>
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
                    data={reportTimeData}
                    xAxisKey="severity"
                    dataKeys={[
                      { key: 'time', color: '#E53E3E', name: 'Minutes' }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">SLO Compliance %</h3>
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
                    data={complianceData}
                    xAxisKey="slo"
                    dataKeys={[
                      { key: 'compliance', color: '#9b87f5', name: 'Compliance %' }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Incidents by Team</h3>
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
                    data={incidentsByTeam}
                    xAxisKey="team"
                    dataKeys={[
                      { key: 'count', color: '#6E59A5', name: 'Incidents' }
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Resolution Times by Severity (hours)</h3>
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
                    data={resolutionTimes}
                    xAxisKey="severity"
                    dataKeys={[
                      { key: 'time', color: '#6E59A5', name: 'Hours' }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="deep-dive">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <BarChart3 size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Total Incidents</h3>
                    <p className="text-2xl font-bold mt-1">{metrics?.totalIncidents || 0}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowUp size={12} className="text-red-500" />
                      <span>12% vs Last Period</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Bell size={24} className="text-amber-500 mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Active Alerts</h3>
                    <p className="text-2xl font-bold mt-1">8</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowDown size={12} className="text-green-500" />
                      <span>3% vs Last Period</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Calendar size={24} className="text-purple mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">MTBF (hours)</h3>
                    <p className="text-2xl font-bold mt-1">72</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowUp size={12} className="text-green-500" />
                      <span>8% vs Last Period</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <CheckCircle size={24} className="text-green-500 mb-2" />
                    <h3 className="text-sm font-medium text-muted-foreground">Resolution Rate</h3>
                    <p className="text-2xl font-bold mt-1">87%</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowUp size={12} className="text-green-500" />
                      <span>4% vs Last Period</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Incident Trends Over Time</h3>
                  <IncidentAreaChart
                    title=""
                    legendPosition="top"
                    data={metrics?.incidentsOverTime.map(item => ({
                      date: item.date,
                      count: item.count,
                    })) || []}
                    xAxisKey="date"
                    dataKeys={[
                      { key: 'count', color: '#6E59A5', name: 'Incidents' }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Incidents by Status</h3>
                  <IncidentPieChart
                    title=""
                    legendPosition="top"
                    data={statusData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Most Impacted Services</h3>
                  <IncidentPieChart
                    title=""
                    legendPosition="top"
                    data={impactedServicesData}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Top Root Causes</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span>Deployment Issues</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full overflow-hidden h-2">
                          <div className="bg-purple h-2" style={{ width: '35%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">35%</span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Configuration Changes</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full overflow-hidden h-2">
                          <div className="bg-purple h-2" style={{ width: '22%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">22%</span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Infrastructure Failures</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full overflow-hidden h-2">
                          <div className="bg-purple h-2" style={{ width: '18%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">18%</span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Capacity Issues</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full overflow-hidden h-2">
                          <div className="bg-purple h-2" style={{ width: '15%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">15%</span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Third-party Dependencies</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full overflow-hidden h-2">
                          <div className="bg-purple h-2" style={{ width: '10%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">10%</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
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
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Critical Incidents Over Time</h3>
                  <IncidentAreaChart
                    title=""
                    legendPosition="top"
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
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Service Downtime (minutes)</h3>
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
