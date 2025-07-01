import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  List, 
  LayoutGrid, 
  Plus,
  Search,
  CalendarIcon
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Incidents() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // Search and filter states - updated to arrays for multi-select
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterTeam, setFilterTeam] = useState<string[]>([]);
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
  
  // Handle search and filter execution
  const handleApplyFilters = () => {
    setCurrentSearchTerm(searchTerm);
  };
  
  // Handle enter key press in search input
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };
  
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
    { id: 'dataset', name: 'Dataset' },
    { id: 'data-platform', name: 'Data Platform' },
    { id: 'data-model', name: 'Data Model' },
    { id: 'fraud', name: 'Fraud' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'security', name: 'Security' },
  ];
  
  const severityOptions = [
    { id: '1', name: 'Severity 1 (Critical)' },
    { id: '2', name: 'Severity 2 (High)' },
    { id: '3', name: 'Severity 3 (Medium)' },
    { id: '4', name: 'Severity 4 (Low)' },
    { id: '5', name: 'Severity 5 (Minimal)' },
  ];
  
  const statusOptions = [
    { id: 'open', name: 'Open' },
    { id: 'investigating', name: 'Investigating' },
    { id: 'identified', name: 'Identified' },
    { id: 'monitoring', name: 'Monitoring' },
    { id: 'resolved', name: 'Resolved' },
    { id: 'closed', name: 'Closed' },
  ];
  
  const teams = [
    { id: 'bu1-team1', name: 'BU1 - Team 1' },
    { id: 'bu1-team2', name: 'BU1 - Team 2' },
    { id: 'bu2-team4', name: 'BU2 - Team 4' },
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
    setCurrentSearchTerm('');
    setFilterSeverity([]);
    setFilterStatus([]);
    setFilterType([]);
    setFilterTeam([]);
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
    if (currentSearchTerm.trim() !== '') count++;
    if (filterSeverity.length > 0) count++;
    if (filterStatus.length > 0) count++;
    if (filterType.length > 0) count++;
    if (filterTeam.length > 0) count++;
    if (timeframe !== 'month') count++;
    return count;
  };

  // Filter incidents - updated for multi-select arrays
  const filteredIncidents = incidents?.filter(incident => {
    const matchesSearch = currentSearchTerm === '' || 
      incident.id.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      incident.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      incident.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase()));
      
    const matchesSeverity = filterSeverity.length === 0 || filterSeverity.includes(incident.severity.toString());
    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(incident.status);
    const matchesType = filterType.length === 0 || 
                        incident.tags.some(tag => filterType.some(type => tag.toLowerCase() === type.toLowerCase()));
    const matchesTeam = filterTeam.length === 0 || filterTeam.some(team => incident.ownerTeam.includes(team));
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesType && matchesTeam;
  }).sort((a, b) => {
    if (a.severity !== b.severity) {
      return a.severity - b.severity;
    }
    return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
  }) || [];

  // Helper function to handle multi-select changes
  const handleMultiSelectChange = (
    value: string, 
    currentValues: string[], 
    setter: (values: string[]) => void
  ) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter(v => v !== value));
    } else {
      setter([...currentValues, value]);
    }
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Incidents" 
          description="View and manage system incidents" 
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
          >
            <Plus size={16} className="mr-2" />
            <span>New Incident</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview - Moved to top */}
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
      
      {/* Search and Filter Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search by Title */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search Incidents by Title</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search incidents by title, ID, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-9"
                />
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <div className="flex flex-col gap-2">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
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
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="mr-2 h-4 w-4" />
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
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status ({filterStatus.length} selected)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {filterStatus.length === 0 ? "All Statuses" : `${filterStatus.length} selected`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      {statusOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${option.id}`}
                            checked={filterStatus.includes(option.id)}
                            onCheckedChange={() => handleMultiSelectChange(option.id, filterStatus, setFilterStatus)}
                          />
                          <Label htmlFor={`status-${option.id}`} className="text-sm font-normal">
                            {option.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Severity ({filterSeverity.length} selected)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {filterSeverity.length === 0 ? "All Severities" : `${filterSeverity.length} selected`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      {severityOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`severity-${option.id}`}
                            checked={filterSeverity.includes(option.id)}
                            onCheckedChange={() => handleMultiSelectChange(option.id, filterSeverity, setFilterSeverity)}
                          />
                          <Label htmlFor={`severity-${option.id}`} className="text-sm font-normal">
                            {option.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Type ({filterType.length} selected)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {filterType.length === 0 ? "All Types" : `${filterType.length} selected`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      {incidentTypes.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${option.id}`}
                            checked={filterType.includes(option.id)}
                            onCheckedChange={() => handleMultiSelectChange(option.id, filterType, setFilterType)}
                          />
                          <Label htmlFor={`type-${option.id}`} className="text-sm font-normal">
                            {option.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Team ({filterTeam.length} selected)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {filterTeam.length === 0 ? "All Teams" : `${filterTeam.length} selected`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      {teams.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`team-${option.id}`}
                            checked={filterTeam.includes(option.id)}
                            onCheckedChange={() => handleMultiSelectChange(option.id, filterTeam, setFilterTeam)}
                          />
                          <Label htmlFor={`team-${option.id}`} className="text-sm font-normal">
                            {option.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" onClick={resetFilters} size="sm">
                Clear All Filters
              </Button>
              <Button onClick={handleApplyFilters} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Search size={16} className="mr-2" />
                Apply Search & Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
