
export type NotificationSettings = {
  emailNotifications: boolean;
  slackNotifications: boolean;
  smsNotifications: boolean;
  inAppNotifications: boolean;
  opsgenieNotifications: boolean;
  newIncidents: boolean;
  incidentUpdates: boolean;
  incidentResolved: boolean;
  mentionsOnly: boolean;
  dailyDigest: boolean;
  severityLevels: string[];
  teams: string[];
  services: string[];
  responsibleTeams: string[];
  impactedTeams: string[];
  incidentTypes: string[];
  businessUnits: string[];
  businessFlows: string[];
  keywords: string[];
};
