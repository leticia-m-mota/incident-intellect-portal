
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

interface NotificationChannelsProps {
  form: UseFormReturn<NotificationSettings>;
}

export function NotificationChannels({ form }: NotificationChannelsProps) {
  return (
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
          name="inAppNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">In-App Notifications</FormLabel>
                <FormDescription>
                  Receive notifications within the application
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
          name="opsgenieNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Opsgenie Notifications</FormLabel>
                <FormDescription>
                  Receive notifications via Opsgenie
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
  );
}
