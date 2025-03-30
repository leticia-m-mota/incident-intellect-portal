
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
  Users,
  Calendar,
  Download,
  Filter,
  SlidersHorizontal
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

export default function Incidents() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterBusinessUnit, setFilterBusinessUnit] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [timeframe, setTimeframe] = useState('month');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  
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

  // Sample data for filters
  const incidentTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Dataset', value: 'dataset' },
    { label: 'Data Platform', value: 'data-platform' },
    { label: 'Data Model', value: 'data-model' },
    { label: 'Fraud', value: 'fraud' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Security', value: 'security' },
  ];
  
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
  
  const timeFrames = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
    { label: 'Custom', value: 'custom' },
  ];

  // Reset filters
  const resetFilters = () => {
    setFilterSeverity('all');
    setFilterStatus('all');
    setFilterType('all');
    setFilterBusinessUnit('all');
    setFilterTeam('all');
    setTimeframe('month');
    setDateRange({
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(),
    });
  };
  
  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'MMM dd, yyyy');
  };
  
  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterSeverity !== 'all') count++;
    if (filterStatus !== 'all') count++;
    if (filterType !== 'all') count++;
    if (filterBusinessUnit !== 'all') count++;
    if (filterTeam !== 'all') count++;
    if (timeframe !== 'month') count++;
    return count;
  };

  // Export data to CSV
  const exportToCSV = () => {
    // In a real application, this would generate a CSV file with the filtered data
    // For this example, we'll just show a toast message
    toast({
      title: "Export Started",
      description: "Your data is being exported to CSV format",
    });
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Incidents" 
          description="View and manage all system incidents" 
        />
        
        <div className="flex items-center gap-3">
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
            variant="outline"
            className="gap-2"
            onClick={exportToCSV}
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/incidents/new')}
            className="gap-2"
          >
            <Plus size={16} />
            <span>New Incident</span>
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
                <label className="text-sm font-medium mb-2 block">Incident Type</label>
                <Select
                  value={filterType}
                  onValueChange={setFilterType}
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
              
              <div>
                <label className="text-sm font-medium mb-2 block">Business Unit</label>
                <Select
                  value={filterBusinessUnit}
                  onValueChange={setFilterBusinessUnit}
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
                  value={filterTeam}
                  onValueChange={setFilterTeam}
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
                <label className="text-sm font-medium mb-2 block">Severity</label>
                <Select
                  value={filterSeverity}
                  onValueChange={setFilterSeverity}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical (SEV1)</SelectItem>
                    <SelectItem value="high">High (SEV2)</SelectItem>
                    <SelectItem value="medium">Medium (SEV3)</SelectItem>
                    <SelectItem value="low">Low (SEV4)</SelectItem>
                    <SelectItem value="info">Info (SEV5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="identified">Identified</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
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
