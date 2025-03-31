
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { NotificationsPreferencesPanel } from '@/components/notifications/NotificationsPreferencesPanel';
import { useForm } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';
import { toast } from '@/hooks/use-toast';

// Updating the severityLevels array to match the expected { id: string; name: string; } format
const severityLevels = [
  { id: 'critical', name: 'Critical (SEV1)' },
  { id: 'high', name: 'High (SEV2)' },
  { id: 'medium', name: 'Medium (SEV3)' },
  { id: 'low', name: 'Low (SEV4)' },
  { id: 'info', name: 'Info (SEV5)' }
];

// Updating the incidentTypes array to match the expected { id: string; name: string; } format
const incidentTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'dataset', name: 'Dataset' },
  { id: 'data-platform', name: 'Data Platform' },
  { id: 'data-model', name: 'Data Model' },
  { id: 'fraud', name: 'Fraud' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'security', name: 'Security' }
];

// Updating the businessUnits array to match the expected { id: string; name: string; } format
const businessUnits = [
  { id: 'all', name: 'All Business Units' },
  { id: 'bu1', name: 'Business Unit 1' },
  { id: 'bu2', name: 'Business Unit 2' },
  { id: 'bu3', name: 'Business Unit 3' },
  { id: 'bu4', name: 'Business Unit 4' }
];

// Updating the teams array to match the expected { id: string; name: string; } format
const teams = [
  { id: 'all', name: 'All Teams' },
  { id: 'bu1-team1', name: 'BU1 - Team 1' },
  { id: 'bu1-team2', name: 'BU1 - Team 2' },
  { id: 'bu2-team4', name: 'BU2 - Team 4' },
  { id: 'bu3-team1', name: 'BU3 - Team 1' },
  { id: 'bu4-team2', name: 'BU4 - Team 2' }
];

// Updating the services array to match the expected { id: string; name: string; } format
const services = [
  { id: 'all', name: 'All Services' },
  { id: 'data-api', name: 'Data API' },
  { id: 'auth-service', name: 'Authentication Service' },
  { id: 'reporting', name: 'Reporting Service' },
  { id: 'data-processing', name: 'Data Processing' },
  { id: 'data-storage', name: 'Data Storage' }
];

// Updating the businessFlows array to match the expected { id: string; name: string; } format
const businessFlows = [
  { id: 'all', name: 'All Business Flows' },
  { id: 'user-onboarding', name: 'User Onboarding' },
  { id: 'payment-processing', name: 'Payment Processing' },
  { id: 'data-ingestion', name: 'Data Ingestion' },
  { id: 'reporting', name: 'Reporting' },
  { id: 'user-authentication', name: 'User Authentication' }
];

// Create the NotificationsPage component with a default export
function NotificationsPage() {
  const [showPreferences, setShowPreferences] = useState(false);
  const [keyword, setKeyword] = useState('');
  
  // Initialize the form with default values
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

  // Handle form submission
  const handleSubmit = (data: NotificationSettings) => {
    console.log('Preferences saved:', data);
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated successfully.",
    });
    setShowPreferences(false);
  };

  // Function to add a keyword
  const addKeyword = () => {
    if (keyword.trim() && !form.getValues().keywords.includes(keyword.trim())) {
      const currentKeywords = form.getValues().keywords || [];
      form.setValue('keywords', [...currentKeywords, keyword.trim()]);
      setKeyword('');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <PageTitle 
          title="Notifications" 
          description="Stay updated with your incident alerts and configure notification preferences" 
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
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowPreferences(true)}
                className="flex items-center text-sm font-medium text-primary hover:text-primary/80"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-4 h-4 mr-1"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.93 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.455l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Notification Preferences
              </button>
            </div>
          )}
          
          {/* Notifications list would go here */}
          <div className="bg-card text-card-foreground border rounded-lg p-6">
            <p className="text-muted-foreground">No new notifications.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Add the default export to fix the error
export default NotificationsPage;
