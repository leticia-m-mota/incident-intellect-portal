
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AlertCircle, 
  Bell, 
  Eye, 
  Filter, 
  MoreHorizontal, 
  Settings, 
  TrashIcon, 
  Users 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

export default function Notifications() {
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterBusinessUnit, setFilterBusinessUnit] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');
  
  // Sample data
  const notifications = [
    {
      id: '1',
      title: 'Critical incident reported',
      description: 'Payment processing service is experiencing downtime',
      severity: 'critical',
      type: 'incident',
      time: '2023-10-15T14:32:00',
      read: false,
      team: 'Payment Team',
      businessUnit: 'bu1',
      incidentType: 'engineering'
    },
    {
      id: '2',
      title: 'Incident update',
      description: 'Database service has been restored',
      severity: 'high',
      type: 'update',
      time: '2023-10-15T12:15:00',
      read: true,
      team: 'Database Team',
      businessUnit: 'bu2',
      incidentType: 'data-platform'
    },
    {
      id: '3',
      title: 'You were mentioned in incident #INC-2023-101',
      description: '@janesmith Please review the recent logs for auth service',
      severity: 'medium',
      type: 'mention',
      time: '2023-10-14T17:45:00',
      read: false,
      team: 'Authentication Team',
      businessUnit: 'bu1',
      incidentType: 'security'
    },
    {
      id: '4',
      title: 'Scheduled maintenance',
      description: 'The API gateway will be down for maintenance on Oct 20th',
      severity: 'low',
      type: 'maintenance',
      time: '2023-10-14T09:30:00',
      read: true,
      team: 'Infrastructure Team',
      businessUnit: 'bu2',
      incidentType: 'engineering'
    },
    {
      id: '5',
      title: 'New team member added',
      description: 'Alex Johnson has been added to your team',
      severity: 'info',
      type: 'team',
      time: '2023-10-13T15:20:00',
      read: true,
      team: 'Frontend Team',
      businessUnit: 'bu1',
      incidentType: 'dataset'
    },
  ];

  // Filter data
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

  // Reset filters
  const resetFilters = () => {
    setFilterType('all');
    setFilterBusinessUnit('all');
    setFilterTeam('all');
  };
  
  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterType !== 'all') count++;
    if (filterBusinessUnit !== 'all') count++;
    if (filterTeam !== 'all') count++;
    return count;
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };
  
  // Filter notifications based on current filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.incidentType === filterType;
    const matchesBusinessUnit = filterBusinessUnit === 'all' || notification.businessUnit === filterBusinessUnit;
    const matchesTeam = filterTeam === 'all' || notification.team.toLowerCase().includes(filterTeam.toLowerCase());
    
    return matchesType && matchesBusinessUnit && matchesTeam;
  });
  
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <PageTitle 
          title="Notifications" 
          description="View and manage your incident notifications"
        />
        
        <div className="flex items-center gap-2">
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
            size="sm"
            className="gap-2"
            onClick={() => {}}
          >
            <Eye size={16} />
            <span>Mark all as read</span>
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => {}}
          >
            <Settings size={18} />
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold">Notification Filters</h3>
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
      
      <Tabs defaultValue="all">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge className="ml-2" variant="secondary">
              {notifications.filter(n => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        
        <div className="mt-6 space-y-4">
          <TabsContent value="all">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Bell size={40} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No notifications match your filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="unread">
            {filteredNotifications.filter(n => !n.read).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Bell size={40} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No unread notifications match your filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications
                .filter(notification => !notification.read)
                .map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
            )}
          </TabsContent>
          
          <TabsContent value="incidents">
            {filteredNotifications.filter(n => n.type === 'incident').length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <AlertCircle size={40} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No incident notifications match your filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications
                .filter(notification => notification.type === 'incident')
                .map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
            )}
          </TabsContent>
          
          <TabsContent value="mentions">
            {filteredNotifications.filter(n => n.type === 'mention').length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Users size={40} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No mention notifications match your filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications
                .filter(notification => notification.type === 'mention')
                .map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
            )}
          </TabsContent>
          
          <TabsContent value="updates">
            {filteredNotifications.filter(n => n.type === 'update').length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Bell size={40} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No update notifications match your filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications
                .filter(notification => notification.type === 'update')
                .map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
            )}
          </TabsContent>
        </div>
      </Tabs>
    </MainLayout>
  );
}

type NotificationCardProps = {
  notification: {
    id: string;
    title: string;
    description: string;
    severity: string;
    type: string;
    time: string;
    read: boolean;
    team: string;
    businessUnit: string;
  };
};

function NotificationCard({ notification }: NotificationCardProps) {
  // Get severity-based styles
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'text-severity-critical',
          bg: 'bg-severity-critical/10',
          border: 'border-severity-critical/20',
        };
      case 'high':
        return {
          color: 'text-severity-high',
          bg: 'bg-severity-high/10',
          border: 'border-severity-high/20',
        };
      case 'medium':
        return {
          color: 'text-severity-medium',
          bg: 'bg-severity-medium/10',
          border: 'border-severity-medium/20',
        };
      case 'low':
        return {
          color: 'text-severity-low',
          bg: 'bg-severity-low/10',
          border: 'border-severity-low/20',
        };
      default:
        return {
          color: 'text-blue-500',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
        };
    }
  };
  
  // Get type-based badge styles
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'incident':
        return <Badge variant="destructive">Incident</Badge>;
      case 'update':
        return <Badge variant="outline">Update</Badge>;
      case 'mention':
        return <Badge variant="secondary">Mention</Badge>;
      case 'maintenance':
        return <Badge variant="default">Maintenance</Badge>;
      case 'team':
        return <Badge variant="outline">Team</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };
  
  // Format time
  const formatNotificationTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };
  
  const severityStyles = getSeverityStyles(notification.severity);
  
  return (
    <Card
      className={`
        ${notification.read ? 'bg-background' : 'bg-muted/30'}
        border-l-4 transition-colors ${severityStyles.border}
      `}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Checkbox id={`read-${notification.id}`} checked={notification.read} />
            <CardTitle className="text-base">{notification.title}</CardTitle>
            {getTypeBadge(notification.type)}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>Mark as {notification.read ? 'unread' : 'read'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{notification.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-2 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${notification.team.replace(' ', '+')}`} />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{notification.team}</span>
        </div>
        <span className="text-xs text-muted-foreground">{formatNotificationTime(notification.time)}</span>
      </CardFooter>
    </Card>
  );
}
