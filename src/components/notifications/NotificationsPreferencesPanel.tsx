
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { NotificationChannels } from '@/components/settings/NotificationChannels';
import { NotificationTypes } from '@/components/settings/NotificationTypes';
import { NotificationFilters } from '@/components/settings/NotificationFilters';
import { X } from 'lucide-react';

interface NotificationsPreferencesPanelProps {
  form: UseFormReturn<NotificationSettings>;
  onSubmit: (data: NotificationSettings) => void;
  severityLevels: Array<{ id: string; name: string }>;
  incidentTypes: Array<{ id: string; name: string }>;
  businessUnits: Array<{ id: string; name: string }>;
  businessFlows: Array<{ id: string; name: string }>;
  teams: Array<{ id: string; name: string }>;
  services: Array<{ id: string; name: string }>;
  keyword: string;
  setKeyword: (value: string) => void;
  addKeyword: () => void;
  onClose: () => void;
}

export function NotificationsPreferencesPanel({
  form,
  onSubmit,
  severityLevels,
  incidentTypes,
  businessUnits,
  businessFlows,
  teams,
  services,
  keyword,
  setKeyword,
  addKeyword,
  onClose
}: NotificationsPreferencesPanelProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-card z-10 pb-2">
          <div>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure when and how you receive notifications for incidents</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
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
                businessFlows={businessFlows}
                teams={teams}
                services={services}
                keyword={keyword}
                setKeyword={setKeyword}
                addKeyword={addKeyword}
              />
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">Save Notification Preferences</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
