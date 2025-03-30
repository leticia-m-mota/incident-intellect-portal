
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';
import { NotificationChannels } from './NotificationChannels';
import { NotificationTypes } from './NotificationTypes';
import { NotificationFilters } from './NotificationFilters';
import { toast } from '@/hooks/use-toast';

interface NotificationsTabProps {
  form: UseFormReturn<NotificationSettings>;
  onSubmit: (data: NotificationSettings) => void;
  severityLevels: Array<{ id: string; name: string }>;
  incidentTypes: Array<{ id: string; name: string }>;
  businessUnits: Array<{ id: string; name: string }>;
  teams: Array<{ id: string; name: string }>;
  services: Array<{ id: string; name: string }>;
  keyword: string;
  setKeyword: (value: string) => void;
  addKeyword: () => void;
}

export function NotificationsTab({ 
  form,
  onSubmit,
  severityLevels,
  incidentTypes,
  businessUnits,
  teams,
  services,
  keyword,
  setKeyword,
  addKeyword
}: NotificationsTabProps) {
  return (
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
            <NotificationChannels form={form} />

            <Separator />

            <NotificationTypes form={form} />

            <Separator />

            <NotificationFilters 
              form={form}
              severityLevels={severityLevels}
              incidentTypes={incidentTypes}
              businessUnits={businessUnits}
              teams={teams}
              services={services}
              keyword={keyword}
              setKeyword={setKeyword}
              addKeyword={addKeyword}
            />

            <Button type="submit">Save Notification Preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
