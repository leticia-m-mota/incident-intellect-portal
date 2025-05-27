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
  Target,
  Activity,
  Database,
  FileText,
  Info,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { StatCard } from '@/components/common/StatCard';

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
    { name: 'Critical (SEV1)', value: metrics.incidentsBySeverity[1], color: '#E53E3E' },
    { name: 'High (SEV2)', value: metrics.incidentsBySeverity[2], color: '#DD6B20' },
    { name: 'Medium (SEV3)', value: metrics.incidentsBySeverity[3], color: '#D69E2E' },
    { name: 'Low (SEV4)', value: metrics.incidentsBySeverity[4], color: '#38A169' },
    { name: 'Info (SEV5)', value: metrics.incidentsBySeverity[5] || 8, color: '#4299E1' },
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
  
  // Action items by status
  const actionItemsByStatus = [
    { status: 'Backlog', count: 24 },
    { status: 'Prioritized', count: 18 },
    { status: 'In Progress', count: 12 },
    { status: 'Review', count: 7 },
    { status: 'Done', count: 32 },
  ];
  
  // Time to acknowledge by severity
  const timeToAckBySeverity = [
    { severity: 'SEV1', team: 'Platform', time: 3 },
    { severity: 'SEV1', team: 'Frontend', time: 5 },
    { severity: 'SEV1', team: 'Backend', time: 2 },
    { severity: 'SEV2', team: 'Platform', time: 7 },
    { severity: 'SEV2', team: 'Frontend', time: 8 },
    { severity: 'SEV2', team: 'Backend', time: 6 },
    { severity: 'SEV3', team: 'Platform', time: 12 },
    { severity: 'SEV3', team: 'Frontend', time: 15 },
    { severity: 'SEV3', team: 'Backend', time: 10 },
  ];
  
  // Time to resolve by service
  const timeToResolveByService = [
    { service: 'API Gateway', time: 240 },
    { service: 'Auth Service', time: 180 },
    { service: 'Payment', time: 320 },
    { service: 'Database', time: 150 },
    { service: 'Search', time: 90 },
    { service: 'CDN', time: 60 },
  ];
  
  // Monthly incident projections
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
  
  // Service health scores
  const serviceHealthScores = [
    { service: 'API Gateway', score: 85 },
    { service: 'Authentication', score: 92 },
    { service: 'Payment', score: 79 },
    { service: 'Database', score: 95 },
    { service: 'Search', score: 88 },
    { service: 'CDN', score: 91 },
  ];

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
  
  const incidentResolutionTime = [
    { month: 'Jan', time: 240 },
    { month: 'Feb', time: 210 },
    { month: 'Mar', time: 180 },
    { month: 'Apr', time: 195 },
    { month: 'May', time: 165 },
    { month: 'Jun', time: 150 },
  ];

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
                  <IncidentBarChart
                    title=""
                    legendPosition="top"
                    data={[
                      { name: 'SEV1', count: metrics?.incidentsBySeverity[1] || 0 },
                      { name: 'SEV2', count: metrics?.incidentsBySeverity[2] || 0 },
                      { name: 'SEV3', count: metrics?.incidentsBySeverity[3] || 0 },
                      { name: 'SEV4', count: metrics?.incidentsBySeverity[4] || 0 },
                      { name: 'SEV5', count: metrics?.incidentsBySeverity[5] || 8 },
                    ]}
                    xAxisKey="name"
                    dataKeys={[
                      { key: 'count', color: '#9b87f5', name: 'Incidents' }
                    ]}
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
            {/* Performance Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={20} className="text-purple" />
                <h2 className="text-xl font-semibold">Performance & Alerts</h2>
              </div>
              <Separator className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  title="Active Alerts"
                  value="8"
                  description="4 critical, 4 high"
                  icon={<Bell size={20} className="text-amber-500" />}
                  trend={{ value: 3, direction: 'down' }}
                />
                
                <StatCard
                  title="Mean Time Between Failures"
                  value="72 hrs"
                  description="Target: 60hrs"
                  icon={<Calendar size={20} className="text-purple" />}
                  trend={{ value: 8, direction: 'up' }}
                />
                
                <StatCard
                  title="Resolution Rate"
                  value="87%"
                  description="Target: 90%"
                  icon={<CheckCircle size={20} className="text-green-500" />}
                  trend={{ value: 4, direction: 'up' }}
                />
                
                <StatCard
                  title="Total Incidents"
                  value={metrics?.totalIncidents || 0}
                  icon={<BarChart3 size={20} className="text-purple" />}
                  trend={{ value: 12, direction: 'up' }}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alerts by Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      legendPosition="top"
                      data={alertsByTeam}
                      xAxisKey="team"
                      dataKeys={[
                        { key: 'count', color: '#D69E2E', name: 'Alerts' }
                      ]}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alerts by Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      legendPosition="top"
                      data={alertsByService}
                      xAxisKey="service"
                      dataKeys={[
                        { key: 'count', color: '#D69E2E', name: 'Alerts' }
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time to Acknowledge by Severity and Team (minutes)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentBarChart
                      title=""
                      legendPosition="top"
                      data={timeToAckBySeverity}
                      xAxisKey="severity"
                      dataKeys={[
                        { key: 'time', color: '#6E59A5', name: 'Minutes' }
                      ]}
                    />
                  </CardContent>
                </Card>
                
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
                            <span className="text-sm font-medium">{item.score}%</span>
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
              </div>

              {/* Incidents & Impact Section */}
              <div className="mb-8 mt-12">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={20} className="text-purple" />
                  <h2 className="text-xl font-semibold">Incidents & Impact</h2>
                </div>
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    title="Total Incidents"
                    value={metrics?.totalIncidents || 0}
                    description="Last 30 days"
                    icon={<AlertCircle size={20} className="text-purple" />}
                    trend={{ value: 8, direction: 'up' }}
                  />
                  
                  <StatCard
                    title="Services Impacted"
                    value="6"
                    description="3 critical services"
                    icon={<Database size={20} className="text-blue-500" />}
                    trend={{ value: 2, direction: 'up' }}
                  />
                  
                  <StatCard
                    title="Total Downtime"
                    value="14.5 hrs"
                    description="Business impact: High"
                    icon={<Clock size={20} className="text-amber-500" />}
                    trend={{ value: 23, direction: 'down' }}
                  />
                  
                  <StatCard
                    title="Action Items"
                    value="42"
                    description="18 in progress"
                    icon={<CheckCircle size={20} className="text-green-500" />}
                    trend={{ value: 12, direction: 'up' }}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Incident Status Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IncidentBarChart
                        title=""
                        legendPosition="top"
                        data={[
                          { status: 'Open', count: metrics?.incidentsByStatus.open || 0 },
                          { status: 'Investigating', count: metrics?.incidentsByStatus.investigating || 0 },
                          { status: 'Identified', count: metrics?.incidentsByStatus.identified || 0 },
                          { status: 'Monitoring', count: metrics?.incidentsByStatus.monitoring || 0 },
                          { status: 'Resolved', count: metrics?.incidentsByStatus.resolved || 0 },
                          { status: 'Closed', count: metrics?.incidentsByStatus.closed || 0 }
                        ]}
                        xAxisKey="status"
                        dataKeys={[
                          { key: 'count', color: '#6E59A5', name: 'Incidents' }
                        ]}
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
                        legendPosition="top"
                        data={impactedServicesData}
                        xAxisKey="name"
                        dataKeys={[
                          { key: 'value', color: '#6E59A5', name: 'Incidents' }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Action Items by Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IncidentBarChart
                        title=""
                        legendPosition="top"
                        data={actionItemsByStatus}
                        xAxisKey="status"
                        dataKeys={[
                          { key: 'count', color: '#4FD1C5', name: 'Items' }
                        ]}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Time to Resolve by Service (minutes)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IncidentBarChart
                        title=""
                        legendPosition="top"
                        data={timeToResolveByService}
                        xAxisKey="service"
                        dataKeys={[
                          { key: 'time', color: '#E53E3E', name: 'Minutes' }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Trends & Projections Section */}
              <div className="mb-8 mt-12">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-purple" />
                  <h2 className="text-xl font-semibold">Trends & Projections</h2>
                </div>
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Incident Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IncidentBarChart
                        title=""
                        legendPosition="top"
                        data={[
                          { month: 'Jan', count: 15, critical: 3 },
                          { month: 'Feb', count: 12, critical: 2 },
                          { month: 'Mar', count: 18, critical: 4 },
                          { month: 'Apr', count: 11, critical: 1 },
                          { month: 'May', count: 14, critical: 2 },
                          { month: 'Jun', count: 9, critical: 1 }
                        ]}
                        xAxisKey="month"
                        dataKeys={[
                          { key: 'count', color: '#6E59A5', name: 'Total Incidents' },
                          { key: 'critical', color: '#E53E3E', name: 'Critical Incidents' }
                        ]}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">MTTR Improvement (minutes)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <IncidentBarChart
                        title=""
                        legendPosition="top"
                        data={incidentResolutionTime}
                        xAxisKey="month"
                        dataKeys={[
                          { key: 'time', color: '#68D391', name: 'Minutes' }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 p-3 bg-muted/50 rounded-md">
                        <div className="mt-0.5">
                          <TrendingUp className="text-green-500" size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Resolution Time Improvement</h4>
                          <p className="text-sm text-muted-foreground mt-1">Resolution times have improved by 23% over the last quarter due to improved runbooks and automation.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 bg-muted/50 rounded-md">
                        <div className="mt-0.5">
                          <AlertCircle className="text-amber-500" size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Authentication Service Incidents</h4>
                          <p className="text-sm text-muted-foreground mt-1">Authentication service has had a 35% increase in incidents, primarily due to new deployments.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 bg-muted/50 rounded-md">
                        <div className="mt-0.5">
                          <CheckCircle className="text-blue-500" size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Acknowledgement Time</h4>
                          <p className="text-sm text-muted-foreground mt-1">Average acknowledgement time has decreased by 40% since implementing rotation schedules and PagerDuty integration.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
