
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { IntegrationsTab } from '@/components/settings/IntegrationsTab';
import { PlaceholderTab } from '@/components/settings/PlaceholderTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <MainLayout>
      <div>
        <PageTitle 
          title="Settings" 
          description="Configure your account and system preferences" 
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 mt-6">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="space-y-6">
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
