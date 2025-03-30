
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Bell,
  User,
  Lock,
  SettingsIcon,
  Link,
  CheckCheck,
  Webhook,
  MessageSquare,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type NotificationSettings = {
  emailNotifications: boolean;
  slackNotifications: boolean;
  smsNotifications: boolean;
  newIncidents: boolean;
  incidentUpdates: boolean;
  incidentResolved: boolean;
  mentionsOnly: boolean;
  dailyDigest: boolean;
  severityLevels: string[];
  teams: string[];
  services: string[];
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  
  const form = useForm<NotificationSettings>({
    defaultValues: {
      emailNotifications: true,
      slackNotifications: true,
      smsNotifications: false,
      newIncidents: true,
      incidentUpdates: true,
      incidentResolved: true,
      mentionsOnly: false,
      dailyDigest: true,
      severityLevels: ['sev1', 'sev2'],
      teams: ['platform', 'frontend'],
      services: ['api-gateway', 'auth-service']
    },
  });

  const onSubmit = (data: NotificationSettings) => {
    console.log(data);
    // Save notification settings
  };

  // Mock data for selections
  const teams = [
    { id: 'platform', name: 'Platform Team' },
    { id: 'frontend', name: 'Frontend Team' },
    { id: 'backend', name: 'Backend Team' },
    { id: 'mobile', name: 'Mobile Team' },
    { id: 'data', name: 'Data Team' },
    { id: 'devops', name: 'DevOps Team' },
    { id: 'sre', name: 'SRE Team' },
  ];

  const services = [
    { id: 'api-gateway', name: 'API Gateway' },
    { id: 'auth-service', name: 'Authentication Service' },
    { id: 'payment-service', name: 'Payment Service' },
    { id: 'database', name: 'Database Cluster' },
    { id: 'search-service', name: 'Search Service' },
    { id: 'cdn', name: 'CDN' },
    { id: 'mobile-api', name: 'Mobile API' },
  ];

  const severityLevels = [
    { id: 'sev1', name: 'SEV1 - Critical' },
    { id: 'sev2', name: 'SEV2 - High' },
    { id: 'sev3', name: 'SEV3 - Medium' },
    { id: 'sev4', name: 'SEV4 - Low' },
    { id: 'sev5', name: 'SEV5 - Informational' },
  ];

  return (
    <MainLayout>
      <div>
        <PageTitle 
          title="Settings" 
          description="Configure your account, notifications, and system preferences" 
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 mt-6">
          <Card className="md:h-fit">
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === 'notifications' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button 
                  variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={activeTab === 'integrations' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('integrations')}
                >
                  <Link className="mr-2 h-4 w-4" />
                  Integrations
                </Button>
                <Button 
                  variant={activeTab === 'security' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('security')}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button 
                  variant={activeTab === 'preferences' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('preferences')}
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
              </nav>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure when and how you receive notifications for incidents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium">Notification Channels</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose how you want to be notified
                        </p>
                        <div className="grid gap-4">
                          <FormField
                            control={form.control}
                            name="emailNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Email Notifications</FormLabel>
                                  <FormDescription>
                                    Receive notifications via email
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="slackNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Slack Notifications</FormLabel>
                                  <FormDescription>
                                    Receive notifications via Slack
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="smsNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">SMS Notifications</FormLabel>
                                  <FormDescription>
                                    Receive critical alerts via SMS
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium">Notification Types</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select which types of notifications you want to receive
                        </p>
                        <div className="grid gap-4">
                          <FormField
                            control={form.control}
                            name="newIncidents"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">New Incidents</FormLabel>
                                  <FormDescription>
                                    When new incidents are created
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="incidentUpdates"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Incident Updates</FormLabel>
                                  <FormDescription>
                                    When incidents are updated
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="incidentResolved"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Resolution Notifications</FormLabel>
                                  <FormDescription>
                                    When incidents are resolved
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mentionsOnly"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Mentions Only</FormLabel>
                                  <FormDescription>
                                    Only notify when you or your team is mentioned
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dailyDigest"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Daily Digest</FormLabel>
                                  <FormDescription>
                                    Receive a daily summary of incidents
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium">Notification Filters</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Customize which incidents you want to be notified about
                        </p>
                        
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="severityLevels"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel className="text-base">Severity Levels</FormLabel>
                                  <FormDescription>
                                    Select which severity levels you want to be notified about
                                  </FormDescription>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {severityLevels.map((level) => (
                                    <FormField
                                      key={level.id}
                                      control={form.control}
                                      name="severityLevels"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={level.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(level.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, level.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== level.id
                                                        )
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {level.name}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="teams"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Teams</FormLabel>
                                <FormDescription>
                                  Select which teams you want to follow for incident notifications
                                </FormDescription>
                                <div className="mt-2">
                                  <Select
                                    onValueChange={(value) => {
                                      if (value && !field.value.includes(value)) {
                                        field.onChange([...field.value, value]);
                                      }
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {teams
                                        .filter(team => !field.value.includes(team.id))
                                        .map(team => (
                                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                                        ))
                                      }
                                    </SelectContent>
                                  </Select>
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {field.value.map(teamId => {
                                      const team = teams.find(t => t.id === teamId);
                                      return (
                                        <Badge key={teamId} variant="secondary" className="flex items-center gap-1">
                                          {team?.name}
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-4 w-4 p-0 ml-1" 
                                            onClick={() => {
                                              field.onChange(field.value.filter(id => id !== teamId));
                                            }}
                                          >
                                            <span>×</span>
                                          </Button>
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Services</FormLabel>
                                <FormDescription>
                                  Select which services you want to follow for incident notifications
                                </FormDescription>
                                <div className="mt-2">
                                  <Select
                                    onValueChange={(value) => {
                                      if (value && !field.value.includes(value)) {
                                        field.onChange([...field.value, value]);
                                      }
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {services
                                        .filter(service => !field.value.includes(service.id))
                                        .map(service => (
                                          <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                        ))
                                      }
                                    </SelectContent>
                                  </Select>
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {field.value.map(serviceId => {
                                      const service = services.find(s => s.id === serviceId);
                                      return (
                                        <Badge key={serviceId} variant="secondary" className="flex items-center gap-1">
                                          {service?.name}
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-4 w-4 p-0 ml-1" 
                                            onClick={() => {
                                              field.onChange(field.value.filter(id => id !== serviceId));
                                            }}
                                          >
                                            <span>×</span>
                                          </Button>
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button type="submit">Save Notification Preferences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Manage connections to external services and tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Jira</h3>
                          <p className="text-sm text-muted-foreground">Issue tracking integration</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Connected</Badge>
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Opsgenie</h3>
                          <p className="text-sm text-muted-foreground">Alerting integration</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Connected</Badge>
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Slack</h3>
                          <p className="text-sm text-muted-foreground">Communication integration</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Connected</Badge>
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <CheckCheck className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">StatusPage</h3>
                          <p className="text-sm text-muted-foreground">Public status page integration</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Limited</Badge>
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">PagerDuty</h3>
                          <p className="text-sm text-muted-foreground">On-call management integration</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700">Disconnected</Badge>
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Webhook className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Custom Webhook</h3>
                          <p className="text-sm text-muted-foreground">HTTP webhook integration</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Placeholder for other settings tabs */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Profile settings content will be implemented here.</p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Security settings content will be implemented here.</p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>UI Preferences</CardTitle>
                  <CardDescription>
                    Customize your interface and display preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>UI preferences content will be implemented here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
