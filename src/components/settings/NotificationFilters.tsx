
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';
import { FilterSection } from './FilterSection';
import { TeamOrServiceSelector } from './TeamOrServiceSelector';
import { KeywordSelector } from './KeywordSelector';

interface NotificationFiltersProps {
  form: UseFormReturn<NotificationSettings>;
  severityLevels: Array<{ id: string; name: string }>;
  incidentTypes: Array<{ id: string; name: string }>;
  businessUnits: Array<{ id: string; name: string }>;
  businessFlows?: Array<{ id: string; name: string }>;
  teams: Array<{ id: string; name: string }>;
  services: Array<{ id: string; name: string }>;
  keyword: string;
  setKeyword: (value: string) => void;
  addKeyword: () => void;
}

export function NotificationFilters({ 
  form, 
  severityLevels, 
  incidentTypes, 
  businessUnits,
  businessFlows = [],
  teams, 
  services, 
  keyword, 
  setKeyword, 
  addKeyword 
}: NotificationFiltersProps) {
  return (
    <div>
      <h3 className="text-lg font-medium">Notification Filters</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Customize which incidents you want to be notified about
      </p>
      
      <div className="space-y-6">
        <FilterSection 
          form={form}
          title="Severity Levels"
          description="Select which severity levels you want to be notified about"
          name="severityLevels"
          options={severityLevels}
        />

        <FilterSection 
          form={form}
          title="Incident Types"
          description="Select which types of incidents you want to be notified about"
          name="incidentTypes"
          options={incidentTypes}
        />

        <FilterSection 
          form={form}
          title="Business Units"
          description="Select which business units you want to be notified about"
          name="businessUnits"
          options={businessUnits}
        />

        {businessFlows.length > 0 && (
          <FilterSection 
            form={form}
            title="Business Flows"
            description="Select which business flows you want to be notified about"
            name="businessFlows"
            options={businessFlows}
          />
        )}

        <TeamOrServiceSelector 
          form={form}
          name="responsibleTeams"
          label="Responsible Teams"
          description="Be notified when these teams are responsible for incidents"
          options={teams}
          placeholder="Select responsible team"
        />

        <TeamOrServiceSelector 
          form={form}
          name="impactedTeams"
          label="Impacted Teams"
          description="Be notified when these teams are impacted by incidents"
          options={teams}
          placeholder="Select impacted team"
        />

        <TeamOrServiceSelector 
          form={form}
          name="services"
          label="Services"
          description="Select which services you want to follow for incident notifications"
          options={services}
          placeholder="Select service"
        />

        <KeywordSelector 
          form={form}
          keyword={keyword}
          setKeyword={setKeyword}
          addKeyword={addKeyword}
        />
      </div>
    </div>
  );
}
