import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  List, 
  LayoutGrid, 
  Plus,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { IncidentTable } from '@/components/incidents/IncidentTable';
import { IncidentCard } from '@/components/incidents/IncidentCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, compareDesc } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

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
    incident => incident.severity === 1
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
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last Month', value: 'month' },
    { label: 'Last Year', value: 'year' },
    { label: 'Custom', value: 'custom' },
  ];

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
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
  const formatDateRange = () => {
    if (timeframe === '7days') return 'Last 7 Days';
    if (timeframe === 'month') return 'Last Month';
    if (timeframe === 'year') return 'Last Year';
    if (timeframe === 'custom' && dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
    }
    return 'Select Date Range';
  };
  
  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm.trim() !== '') count++;
    if (filterSeverity !== 'all') count++;
    if (filterStatus !== 'all') count++;
    if (filterType !== 'all') count++;
    if (filterBusinessUnit !== 'all') count++;
    if (filterTeam !== 'all') count++;
    if (timeframe !== 'month') count++;
    return count;
  };

  // Filter incidents
  const filteredIncidents = incidents?.filter(incident => {
    const matchesSearch = searchTerm === '' || 
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesSeverity = filterSeverity === 'all' || incident.severity.toString() === filterSeverity;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    
    // Instead of incident.type, check for tag with the filtered type
    const matchesType = filterType === 'all' || 
                        incident.tags.some(tag => tag.toLowerCase() === filterType.toLowerCase());
    
    // Instead of incident.businessUnit, we'll assume that the business unit might be in ownerTeam or tags
    const matchesBusinessUnit = filterBusinessUnit === 'all' || 
                                incident.ownerTeam.toLowerCase().includes(filterBusinessUnit.toLowerCase()) ||
                                incident.tags.some(tag => tag.toLowerCase().includes(filterBusinessUnit.toLowerCase()));
    
    const matchesTeam = filterTeam === 'all' || incident.ownerTeam === filterTeam;
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesType && 
           matchesBusinessUnit && matchesTeam;
  }).sort((a, b) => {
    // Sort by severity first (1 is most critical), then by creation date
    if (a.severity !== b.severity) {
      return a.severity - b.severity;
    }
    return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
  }) || [];
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Incidents" 
          description="View and manage system incidents" 
        />
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Select
              value={timeframe}
              onValueChange={setTimeframe}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Timeframe" />
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
            
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
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
            onClick={() => navigate('/incidents/new')}
          >
            <Plus size={16} className="mr-2" />
            <span>New Incident</span>
          </Button>
        </div>
      </div>
      
      {/* Unified Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search incidents by ID, title, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
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
            
            <Select
              value={filterSeverity}
              onValueChange={setFilterSeverity}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="1">Severity 1 (Critical)</SelectItem>
                <SelectItem value="2">Severity 2 (High)</SelectItem>
                <SelectItem value="3">Severity 3 (Medium)</SelectItem>
                <SelectItem value="4">Severity 4 (Low)</SelectItem>
                <SelectItem value="5">Severity 5 (Minimal)</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Stats Overview - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Active Incidents"
          value={activeIncidents}
        />
        <StatCard
          title="Critical Incidents"
          value={criticalIncidents}
        />
        <StatCard
          title="Resolved This Month"
          value={resolvedThisMonth}
        />
      </div>
      
      {/* Main Incidents Display */}
      <div className="mt-6">
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
        ) : filteredIncidents.length === 0 ? (
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No incidents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="mt-4"
            >
              Reset All Filters
            </Button>
          </div>
        ) : viewMode === 'list' ? (
          <IncidentTable incidents={filteredIncidents} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIncidents.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
