
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Bell, CheckCheck, Webhook } from 'lucide-react';

export function IntegrationsTab() {
  return (
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
  );
}
