
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { NotificationSettings } from '@/types/settings';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { NotificationsTab } from '@/components/settings/NotificationsTab';
import { IntegrationsTab } from '@/components/settings/IntegrationsTab';
import { PlaceholderTab } from '@/components/settings/PlaceholderTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [keyword, setKeyword] = useState('');
  
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
      teams: ['platform', 'frontend'],
      services: ['api-gateway', 'auth-service'],
      responsibleTeams: ['BU1 - Team 1'],
      impactedTeams: ['BU1 - Team 2'],
      incidentTypes: ['Data Platform', 'Security'],
      businessUnits: ['Business Unity 1'],
      keywords: ['urgent', 'outage'],
    },
  });

  const onSubmit = (data: NotificationSettings) => {
    console.log(data);
    // Save notification settings
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const addKeyword = () => {
    if (keyword.trim() && !form.getValues().keywords.includes(keyword.trim())) {
      const updatedKeywords = [...form.getValues().keywords, keyword.trim()];
      form.setValue('keywords', updatedKeywords);
      setKeyword('');
    }
  };

  // Mock data for selections
  const teams = [
    { id: 'BU1 - Team 1', name: 'BU1 - Team 1' },
    { id: 'BU1 - Team 2', name: 'BU1 - Team 2' },
    { id: 'BU2 - Team 4', name: 'BU2 - Team 4' },
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
    { id: 'critical', name: 'Critical' },
    { id: 'high', name: 'High' },
    { id: 'medium', name: 'Medium' },
    { id: 'low', name: 'Low' },
  ];

  const incidentTypes = [
    { id: 'Dataset', name: 'Dataset' },
    { id: 'Data Platform', name: 'Data Platform' },
    { id: 'Data Model', name: 'Data Model' },
    { id: 'Fraud', name: 'Fraud' },
    { id: 'Engineering', name: 'Engineering' },
    { id: 'Security', name: 'Security' },
  ];

  const businessUnits = [
    { id: 'Business Unity 1', name: 'Business Unity 1' },
    { id: 'BU 2', name: 'BU 2' },
  ];

  return (
    <MainLayout>
      <div>
        <PageTitle 
          title="Settings" 
          description="Configure your account, notifications, and system preferences" 
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 mt-6">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="space-y-6">
            {activeTab === 'notifications' && (
              <NotificationsTab 
                form={form}
                onSubmit={onSubmit}
                severityLevels={severityLevels}
                incidentTypes={incidentTypes}
                businessUnits={businessUnits}
                teams={teams}
                services={services}
                keyword={keyword}
                setKeyword={setKeyword}
                addKeyword={addKeyword}
              />
            )}

            {activeTab === 'integrations' && <IntegrationsTab />}

            {/* Placeholder tabs */}
            {activeTab === 'profile' && (
              <PlaceholderTab 
                title="Profile Settings" 
                description="Manage your account information and preferences" 
              />
            )}

            {activeTab === 'security' && (
              <PlaceholderTab 
                title="Security Settings" 
                description="Manage your account security and access controls" 
              />
            )}

            {activeTab === 'preferences' && (
              <PlaceholderTab 
                title="UI Preferences" 
                description="Customize your interface and display preferences" 
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
