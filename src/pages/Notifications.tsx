
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Bell, 
  BellOff, 
  Check, 
  AlertCircle, 
  MessageSquare, 
  FileText,
  CheckCircle2,
  User,
  Search,
  Cog
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { mockDataService } from '@/lib/mockData';
import { format, formatDistanceToNow } from 'date-fns';

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: mockDataService.getNotifications,
  });
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'incident_new':
        return <AlertCircle size={18} className="text-severity-high" />;
      case 'incident_update':
        return <MessageSquare size={18} className="text-purple" />;
      case 'incident_resolved':
        return <CheckCircle2 size={18} className="text-severity-low" />;
      case 'system':
        return <Cog size={18} className="text-muted-foreground" />;
      case 'mention':
        return <User size={18} className="text-blue-500" />;
      default:
        return <Bell size={18} className="text-muted-foreground" />;
    }
  };
  
  const filteredNotifications = notifications?.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const unreadNotifications = notifications?.filter(notification => !notification.read);
  const readNotifications = notifications?.filter(notification => notification.read);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <PageTitle 
          title="Notifications" 
          description="Stay informed about system incidents and updates" 
        />
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell size={16} />
              <span>Mark all as read</span>
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Cog size={16} />
              <span>Notification Settings</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All
                {notifications && notifications.length > 0 && (
                  <Badge className="ml-2 bg-primary/90">{notifications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                {unreadNotifications && unreadNotifications.length > 0 && (
                  <Badge className="ml-2 bg-primary/90">{unreadNotifications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[80px] w-full" />
                ))
              ) : filteredNotifications && filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <Card 
                    key={notification.id} 
                    className={!notification.read ? "border-l-4 border-l-purple" : ""}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-base">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                              </span>
                              
                              {!notification.read && (
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Check size={14} />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          {notification.relatedIncidentId && (
                            <div className="mt-2">
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto text-purple"
                              >
                                View Incident {notification.relatedIncidentId}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Notifications</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? "No notifications match your search" : "You don't have any notifications at this time"}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-4 space-y-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[80px] w-full" />
                ))
              ) : unreadNotifications && unreadNotifications.length > 0 ? (
                unreadNotifications
                  .filter(notification => 
                    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(notification => (
                    <Card 
                      key={notification.id} 
                      className="border-l-4 border-l-purple"
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-base">{notification.title}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                </span>
                                
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Check size={14} />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            {notification.relatedIncidentId && (
                              <div className="mt-2">
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="p-0 h-auto text-purple"
                                >
                                  View Incident {notification.relatedIncidentId}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <Check className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground">
                    You've read all your notifications
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="read" className="mt-4 space-y-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[80px] w-full" />
                ))
              ) : readNotifications && readNotifications.length > 0 ? (
                readNotifications
                  .filter(notification => 
                    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(notification => (
                    <Card key={notification.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-base">{notification.title}</h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            {notification.relatedIncidentId && (
                              <div className="mt-2">
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="p-0 h-auto text-purple"
                                >
                                  View Incident {notification.relatedIncidentId}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <BellOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Read Notifications</h3>
                  <p className="text-muted-foreground">
                    You don't have any read notifications
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-severity-high" />
                      <span className="text-sm">New Incidents</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-purple" />
                      <span className="text-sm">Incident Updates</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-severity-low" />
                      <span className="text-sm">Resolved Incidents</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-blue-500" />
                      <span className="text-sm">Mentions</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="text-sm">System Announcements</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Severity Levels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-severity-critical"></span>
                      <span className="text-sm">Critical</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-severity-high"></span>
                      <span className="text-sm">High</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-severity-medium"></span>
                      <span className="text-sm">Medium</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-severity-low"></span>
                      <span className="text-sm">Low</span>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Delivery Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In-app Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS</span>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
