
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { NotificationsPreferencesPanel } from '@/components/notifications/NotificationsPreferencesPanel';
import { useForm } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';
import { toast } from '@/hooks/use-toast';
import { UserNotification } from '@/lib/types';
import { format, subDays } from 'date-fns';

const severityLevels = [
  { id: 'critical', name: 'Severity 1 (Critical)' },
  { id: 'high', name: 'Severity 2 (High)' },
  { id: 'medium', name: 'Severity 3 (Medium)' },
  { id: 'low', name: 'Severity 4 (Low)' },
  { id: 'info', name: 'Severity 5 (Info)' }
];

const incidentTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'dataset', name: 'Dataset' },
  { id: 'data-platform', name: 'Data Platform' },
  { id: 'data-model', name: 'Data Model' },
  { id: 'fraud', name: 'Fraud' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'security', name: 'Security' }
];

const businessUnits = [
  { id: 'all', name: 'All Business Units' },
  { id: 'bu1', name: 'Business Unit 1' },
  { id: 'bu2', name: 'Business Unit 2' },
  { id: 'bu3', name: 'Business Unit 3' },
  { id: 'bu4', name: 'Business Unit 4' }
];

const teams = [
  { id: 'all', name: 'All Teams' },
  { id: 'bu1-team1', name: 'BU1 - Team 1' },
  { id: 'bu1-team2', name: 'BU1 - Team 2' },
  { id: 'bu2-team4', name: 'BU2 - Team 4' },
  { id: 'bu3-team1', name: 'BU3 - Team 1' },
  { id: 'bu4-team2', name: 'BU4 - Team 2' }
];

const services = [
  { id: 'all', name: 'All Services' },
  { id: 'data-api', name: 'Data API' },
  { id: 'auth-service', name: 'Authentication Service' },
  { id: 'reporting', name: 'Reporting Service' },
  { id: 'data-processing', name: 'Data Processing' },
  { id: 'data-storage', name: 'Data Storage' }
];

const businessFlows = [
  { id: 'all', name: 'All Business Flows' },
  { id: 'user-onboarding', name: 'User Onboarding' },
  { id: 'payment-processing', name: 'Payment Processing' },
  { id: 'data-ingestion', name: 'Data Ingestion' },
  { id: 'reporting', name: 'Reporting' },
  { id: 'user-authentication', name: 'User Authentication' }
];

const generateRecentNotifications = (): UserNotification[] => {
  const now = new Date();
  
  return [
    {
      id: 'n001',
      relatedIncidentId: 'INC-2023-010',
      title: 'Critical Incident: Database Cluster Outage',
      message: 'A new critical incident has been created affecting the main database cluster. Your team has been assigned for investigation.',
      timestamp: subDays(now, 2).toISOString(),
      read: false,
      type: 'incident_new'
    },
    {
      id: 'n002',
      relatedIncidentId: 'INC-2023-009',
      title: 'Incident Update: Payment Processing Issue',
      message: 'The incident has been updated to "Monitoring" status. Root cause identified as API rate limiting.',
      timestamp: subDays(now, 4).toISOString(),
      read: true,
      type: 'incident_update'
    },
    {
      id: 'n003',
      relatedIncidentId: 'INC-2023-008',
      title: 'Incident Resolved: Authentication Service',
      message: 'The authentication service incident has been successfully resolved. Time to resolution: 3h 42m.',
      timestamp: subDays(now, 7).toISOString(),
      read: false,
      type: 'incident_resolved'
    },
    {
      id: 'n004',
      title: 'You were mentioned in incident discussion',
      message: 'Sarah Johnson mentioned you in a comment: "Can @user confirm if this issue is also affecting the backup systems?"',
      timestamp: subDays(now, 8).toISOString(),
      read: false,
      type: 'mention'
    },
    {
      id: 'n005',
      title: 'Planned Maintenance',
      message: 'Reminder: Scheduled maintenance for the API Gateway will take place tomorrow at 2:00 AM UTC.',
      timestamp: subDays(now, 10).toISOString(),
      read: true,
      type: 'system'
    },
    {
      id: 'n006',
      relatedIncidentId: 'INC-2023-007',
      title: 'Incident Update: CDN Performance Issues',
      message: 'Incident severity has been upgraded from Medium to High. Multiple regions are now impacted.',
      timestamp: subDays(now, 12).toISOString(),
      read: true,
      type: 'incident_update'
    },
    {
      id: 'n007',
      relatedIncidentId: 'INC-2023-006',
      title: 'Daily Incident Digest',
      message: 'There are 3 open incidents affecting your teams. 1 Critical, 1 High, and 1 Medium severity.',
      timestamp: subDays(now, 14).toISOString(),
      read: true,
      type: 'system'
    }
  ];
};

function NotificationsPage() {
  const [showPreferences, setShowPreferences] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [notifications] = useState<UserNotification[]>(generateRecentNotifications());
  
  const form = useForm<NotificationSettings>({
    defaultValues: {
      emailNotifications: true,
      slackNotifications: true,
      smsNotifications: false,
      inAppNotifications: true,
      opsgenieNotifications: false,
      newIncidents: true,
      incidentUpdates: true,
      incidentResolved: true,
      mentionsOnly: false,
      dailyDigest: true,
      severityLevels: ['critical', 'high'],
      teams: [],
      services: [],
      responsibleTeams: [],
      impactedTeams: [],
      incidentTypes: ['all'],
      businessUnits: ['all'],
      businessFlows: ['all'],
      keywords: []
    }
  });

  const handleSubmit = (data: NotificationSettings) => {
    console.log('Preferences saved:', data);
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated successfully.",
    });
    setShowPreferences(false);
  };

  const addKeyword = () => {
    if (keyword.trim() && !form.getValues().keywords.includes(keyword.trim())) {
      const currentKeywords = form.getValues().keywords || [];
      form.setValue('keywords', [...currentKeywords, keyword.trim()]);
      setKeyword('');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <PageTitle 
          title="Notifications" 
          description="Stay updated with your incident alerts" 
        />
        
        <div className="mt-6">
          {showPreferences ? (
            <NotificationsPreferencesPanel 
              form={form}
              onSubmit={handleSubmit}
              onClose={() => setShowPreferences(false)}
              severityLevels={severityLevels}
              incidentTypes={incidentTypes}
              businessUnits={businessUnits}
              teams={teams}
              services={services}
              businessFlows={businessFlows}
              keyword={keyword}
              setKeyword={setKeyword}
              addKeyword={addKeyword}
            />
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center text-sm font-medium text-primary hover:text-primary/80"
                >
                  Notification Preferences
                </button>
              </div>
              
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`bg-card border rounded-lg p-3 flex items-start gap-3 transition-colors ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          {format(new Date(notification.timestamp), 'MMM d, yyyy • h:mm a')}
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" aria-label="Unread notification"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-card text-card-foreground border rounded-lg p-6">
                    <p className="text-muted-foreground">No new notifications.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default NotificationsPage;
