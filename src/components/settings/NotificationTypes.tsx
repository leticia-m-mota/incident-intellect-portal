
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription, 
  FormControl 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';

interface NotificationTypesProps {
  form: UseFormReturn<NotificationSettings>;
}

export function NotificationTypes({ form }: NotificationTypesProps) {
  return (
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
  );
}
