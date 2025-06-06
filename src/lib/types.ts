
export type SeverityLevel = 1 | 2 | 3 | 4 | 5;
export type IncidentStatus = 'open' | 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  impactedSystems: string[];
  ownerTeam: string;
  tags: string[];
  timeline: TimelineEvent[];
  metrics?: {
    timeToAcknowledge?: number; // in minutes
    timeToResolve?: number; // in minutes
    affectedUsers?: number;
    serviceDowntime?: number; // in minutes
    businessImpact?: 'critical' | 'significant' | 'moderate' | 'low';
    costImpact?: number; // estimated financial impact in USD
  };
  integrations?: {
    jiraTicket?: string;
    slackChannel?: string;
    opsgenieAlert?: string;
  };
  learnings?: IncidentLearning[];
}

export interface IncidentLearning {
  id: string;
  category: 'went_well' | 'to_improve' | 'action_item';
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'update' | 'action' | 'notification' | 'resolution';
  user: string;
}

export interface IncidentMetrics {
  totalIncidents: number;
  openIncidents: number;
  mttr: number; // Mean Time To Resolution in minutes
  mtbf: number; // Mean Time Between Failures in hours
  incidentsBySeverity: Record<SeverityLevel, number>;
  incidentsByStatus: Record<IncidentStatus, number>;
  incidentsOverTime: Array<{
    date: string;
    count: number;
  }>;
  impactedUsers?: number;
  totalDowntime?: number; // in minutes
  averageTimeToAcknowledge?: number; // in minutes
  averageTimeToResolve?: number; // in minutes
  costImpact?: number; // estimated financial impact in USD
  impactBySystem?: Record<string, number>; // incidents count by system
}

export interface UserNotification {
  id: string;
  relatedIncidentId?: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'incident_new' | 'incident_update' | 'incident_resolved' | 'system' | 'mention';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'incident_manager' | 'viewer';
  teams: string[];
  notificationPreferences: {
    severities: SeverityLevel[];
    systems: string[];
    teams: string[];
    channels: ('email' | 'slack' | 'sms')[];
  };
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  tags: string[];
  relatedIncidents: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface MockDataService {
  getIncidents: () => Promise<Incident[]>;
  getIncidentById: (id: string) => Promise<Incident>;
  getMetrics: () => Promise<IncidentMetrics>;
  getNotifications: () => Promise<UserNotification[]>;
  getKnowledgeArticles: () => Promise<KnowledgeArticle[]>;
  getUsers: () => Promise<User[]>;
  addIncidentLearning: (incidentId: string, learning: IncidentLearning) => Promise<Incident>;
  addIncidentTimelineEvent: (incidentId: string, event: TimelineEvent) => Promise<Incident>;
}
