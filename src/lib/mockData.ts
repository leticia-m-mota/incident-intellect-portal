
import { 
  Incident, 
  IncidentMetrics, 
  KnowledgeArticle, 
  UserNotification, 
  User,
  TimelineEvent,
  IncidentLearning
} from './types';

// Mock incident data
export const mockIncidents: Incident[] = [
  {
    id: 'INC-2023-001',
    title: 'API Gateway Outage',
    description: 'The API Gateway service is experiencing high latency and intermittent 500 errors, affecting multiple downstream services.',
    severity: 'critical',
    status: 'resolved',
    createdAt: '2023-06-15T08:23:45Z',
    updatedAt: '2023-06-15T14:12:30Z',
    resolvedAt: '2023-06-15T14:12:30Z',
    impactedSystems: ['API Gateway', 'Payment Service', 'User Authentication'],
    ownerTeam: 'Platform Team',
    tags: ['api', 'gateway', 'outage', 'latency'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-06-15T08:23:45Z',
        message: 'Incident created and escalated to Platform Team',
        type: 'notification',
        user: 'Alert System',
      },
      {
        id: 't2',
        timestamp: '2023-06-15T08:30:15Z',
        message: 'Initial investigation started, looking at recent deployment',
        type: 'action',
        user: 'John Smith',
      },
      {
        id: 't3',
        timestamp: '2023-06-15T09:15:00Z',
        message: 'Root cause identified: CPU throttling due to recent config change',
        type: 'update',
        user: 'Jane Doe',
      },
      {
        id: 't4',
        timestamp: '2023-06-15T10:30:00Z',
        message: 'Config rolled back, monitoring for recovery',
        type: 'action',
        user: 'John Smith',
      },
      {
        id: 't5',
        timestamp: '2023-06-15T14:12:30Z',
        message: 'Service fully recovered, incident resolved',
        type: 'resolution',
        user: 'Jane Doe',
      },
    ],
    metrics: {
      timeToAcknowledge: 6, // minutes
      timeToResolve: 348, // minutes
      affectedUsers: 15420,
      serviceDowntime: 200, // minutes
    },
    integrations: {
      jiraTicket: 'PLAT-4321',
      slackChannel: '#incident-2023-001',
      opsgenieAlert: 'alert-12345',
    },
  },
  {
    id: 'INC-2023-002',
    title: 'Database Replication Lag',
    description: 'Read replicas are experiencing significant lag behind the primary database, causing stale data to be served to users.',
    severity: 'high',
    status: 'investigating',
    createdAt: '2023-07-22T14:35:12Z',
    updatedAt: '2023-07-22T15:05:22Z',
    impactedSystems: ['Database Cluster', 'Product Catalog', 'User Profiles'],
    ownerTeam: 'Database Team',
    tags: ['database', 'replication', 'lag', 'performance'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-07-22T14:35:12Z',
        message: 'Incident created and assigned to Database Team',
        type: 'notification',
        user: 'Alert System',
      },
      {
        id: 't2',
        timestamp: '2023-07-22T14:40:30Z',
        message: 'Initial investigation started, checking replication metrics',
        type: 'action',
        user: 'Mike Johnson',
      },
      {
        id: 't3',
        timestamp: '2023-07-22T15:05:22Z',
        message: 'Identified increased write load from new product launch',
        type: 'update',
        user: 'Sandra Torres',
      },
    ],
    metrics: {
      timeToAcknowledge: 5, // minutes
      affectedUsers: 8750,
    },
    integrations: {
      jiraTicket: 'DB-1234',
      slackChannel: '#incident-2023-002',
      opsgenieAlert: 'alert-54321',
    },
  },
  {
    id: 'INC-2023-003',
    title: 'CDN Cache Invalidation Issue',
    description: 'Content Delivery Network not properly invalidating cached content after updates, causing users to see outdated information.',
    severity: 'medium',
    status: 'identified',
    createdAt: '2023-08-05T10:12:30Z',
    updatedAt: '2023-08-05T11:45:15Z',
    impactedSystems: ['CDN', 'Website', 'Media Assets'],
    ownerTeam: 'Frontend Team',
    tags: ['cdn', 'cache', 'frontend', 'content'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-08-05T10:12:30Z',
        message: 'Incident reported by content team and assigned to Frontend Team',
        type: 'notification',
        user: 'Alex Wong',
      },
      {
        id: 't2',
        timestamp: '2023-08-05T10:20:45Z',
        message: 'Started investigating CDN configuration',
        type: 'action',
        user: 'Emily Johnson',
      },
      {
        id: 't3',
        timestamp: '2023-08-05T11:45:15Z',
        message: 'Identified issue with cache key generation in latest deployment',
        type: 'update',
        user: 'Daniel Martinez',
      },
    ],
    metrics: {
      timeToAcknowledge: 8, // minutes
      affectedUsers: 5200,
    },
    integrations: {
      jiraTicket: 'FE-5678',
      slackChannel: '#incident-2023-003',
    },
  },
  {
    id: 'INC-2023-004',
    title: 'Payment Processing Failures',
    description: 'Users are unable to complete payments through multiple payment gateways, resulting in failed transactions and checkout errors.',
    severity: 'critical',
    status: 'monitoring',
    createdAt: '2023-09-18T16:45:30Z',
    updatedAt: '2023-09-18T18:30:00Z',
    impactedSystems: ['Payment Gateway', 'Checkout Service', 'Order Management'],
    ownerTeam: 'Payments Team',
    tags: ['payments', 'transactions', 'checkout', 'gateway'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-09-18T16:45:30Z',
        message: 'Multiple alerts triggered for failed payments across payment providers',
        type: 'notification',
        user: 'Alert System',
      },
      {
        id: 't2',
        timestamp: '2023-09-18T16:50:15Z',
        message: 'Incident declared and bridge opened with Payments Team',
        type: 'action',
        user: 'Operations Team',
      },
      {
        id: 't3',
        timestamp: '2023-09-18T17:25:00Z',
        message: 'Identified issue with payment orchestration service',
        type: 'update',
        user: 'Rachel Green',
      },
      {
        id: 't4',
        timestamp: '2023-09-18T18:10:00Z',
        message: 'Deployed fix to orchestration service, monitoring transaction success rate',
        type: 'action',
        user: 'David Miller',
      },
      {
        id: 't5',
        timestamp: '2023-09-18T18:30:00Z',
        message: 'Success rates improving, continuing to monitor',
        type: 'update',
        user: 'Rachel Green',
      },
    ],
    metrics: {
      timeToAcknowledge: 5, // minutes
      affectedUsers: 12300,
      serviceDowntime: 105, // minutes
    },
    integrations: {
      jiraTicket: 'PAY-7890',
      slackChannel: '#incident-2023-004',
      opsgenieAlert: 'alert-67890',
    },
  },
  {
    id: 'INC-2023-005',
    title: 'Login Service Degradation',
    description: 'Users experiencing delayed login responses and occasional authentication failures.',
    severity: 'high',
    status: 'open',
    createdAt: '2023-10-12T09:15:00Z',
    updatedAt: '2023-10-12T09:30:45Z',
    impactedSystems: ['Authentication Service', 'User Portal', 'Mobile App'],
    ownerTeam: 'Identity Team',
    tags: ['login', 'auth', 'latency', 'identity'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-10-12T09:15:00Z',
        message: 'Increased latency detected in authentication service',
        type: 'notification',
        user: 'Alert System',
      },
      {
        id: 't2',
        timestamp: '2023-10-12T09:25:30Z',
        message: 'Investigating potential database connection issues',
        type: 'action',
        user: 'Sarah Johnson',
      },
      {
        id: 't3',
        timestamp: '2023-10-12T09:30:45Z',
        message: 'Observed increase in login attempts potentially related to promotional campaign launch',
        type: 'update',
        user: 'Omar Hassan',
      },
    ],
    metrics: {
      timeToAcknowledge: 10, // minutes
      affectedUsers: 7500,
    },
    integrations: {
      jiraTicket: 'AUTH-4567',
      slackChannel: '#incident-2023-005',
      opsgenieAlert: 'alert-78901',
    },
  },
  {
    id: 'INC-2023-006',
    title: 'Search Service Returning Incomplete Results',
    description: 'Product search not returning all relevant results, affecting user experience and potentially impacting sales.',
    severity: 'medium',
    status: 'closed',
    createdAt: '2023-10-05T11:30:00Z',
    updatedAt: '2023-10-05T16:45:00Z',
    resolvedAt: '2023-10-05T16:45:00Z',
    impactedSystems: ['Search Service', 'Product Recommendations', 'Search Analytics'],
    ownerTeam: 'Search Team',
    tags: ['search', 'results', 'indexing', 'relevance'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-10-05T11:30:00Z',
        message: 'Customer Support reported increased complaints about search results',
        type: 'notification',
        user: 'Customer Support Team',
      },
      {
        id: 't2',
        timestamp: '2023-10-05T11:45:30Z',
        message: 'Incident created and assigned to Search Team',
        type: 'action',
        user: 'Operations Team',
      },
      {
        id: 't3',
        timestamp: '2023-10-05T12:30:00Z',
        message: 'Identified issue with recent search index update',
        type: 'update',
        user: 'Lisa Brown',
      },
      {
        id: 't4',
        timestamp: '2023-10-05T14:15:00Z',
        message: 'Started rolling back index to previous version',
        type: 'action',
        user: 'Robert Chen',
      },
      {
        id: 't5',
        timestamp: '2023-10-05T16:30:00Z',
        message: 'Search index rollback complete, verification tests passing',
        type: 'update',
        user: 'Lisa Brown',
      },
      {
        id: 't6',
        timestamp: '2023-10-05T16:45:00Z',
        message: 'Search functionality fully restored, incident closed',
        type: 'resolution',
        user: 'Robert Chen',
      },
    ],
    metrics: {
      timeToAcknowledge: 15, // minutes
      timeToResolve: 315, // minutes
      affectedUsers: 9200,
    },
    integrations: {
      jiraTicket: 'SRCH-3456',
      slackChannel: '#incident-2023-006',
    },
  },
  {
    id: 'INC-2023-007',
    title: 'Mobile App Crashing on Startup',
    description: 'Latest version of mobile app crashing immediately upon startup for iOS users on version 16 and above.',
    severity: 'high',
    status: 'resolved',
    createdAt: '2023-10-20T13:45:00Z',
    updatedAt: '2023-10-20T18:30:00Z',
    resolvedAt: '2023-10-20T18:30:00Z',
    impactedSystems: ['Mobile App', 'Client API'],
    ownerTeam: 'Mobile Team',
    tags: ['mobile', 'ios', 'crash', 'startup'],
    timeline: [
      {
        id: 't1',
        timestamp: '2023-10-20T13:45:00Z',
        message: 'Multiple crash reports detected following recent app update',
        type: 'notification',
        user: 'App Monitoring',
      },
      {
        id: 't2',
        timestamp: '2023-10-20T14:00:15Z',
        message: 'Investigating crash reports for iOS users',
        type: 'action',
        user: 'Jennifer Lee',
      },
      {
        id: 't3',
        timestamp: '2023-10-20T15:20:00Z',
        message: 'Identified bug in camera permission handling on iOS 16+',
        type: 'update',
        user: 'Mark Wilson',
      },
      {
        id: 't4',
        timestamp: '2023-10-20T16:45:00Z',
        message: 'Prepared hotfix for submission to App Store',
        type: 'action',
        user: 'Jennifer Lee',
      },
      {
        id: 't5',
        timestamp: '2023-10-20T18:15:00Z',
        message: 'Expedited review approved, hotfix released',
        type: 'update',
        user: 'Mark Wilson',
      },
      {
        id: 't6',
        timestamp: '2023-10-20T18:30:00Z',
        message: 'Crash rates returned to normal levels, incident resolved',
        type: 'resolution',
        user: 'Jennifer Lee',
      },
    ],
    metrics: {
      timeToAcknowledge: 15, // minutes
      timeToResolve: 285, // minutes
      affectedUsers: 18500,
    },
    integrations: {
      jiraTicket: 'MOB-6789',
      slackChannel: '#incident-2023-007',
      opsgenieAlert: 'alert-89012',
    },
  },
];

// Mock metrics data
export const mockMetrics: IncidentMetrics = {
  totalIncidents: 42,
  openIncidents: 8,
  mttr: 280, // Mean Time To Resolution in minutes
  mtbf: 130, // Mean Time Between Failures in hours
  incidentsBySeverity: {
    critical: 12,
    high: 18,
    medium: 8,
    low: 4,
  },
  incidentsByStatus: {
    open: 5,
    investigating: 3,
    identified: 2,
    monitoring: 4,
    resolved: 20,
    closed: 8,
  },
  incidentsOverTime: [
    { date: '2023-05-01', count: 3 },
    { date: '2023-06-01', count: 5 },
    { date: '2023-07-01', count: 7 },
    { date: '2023-08-01', count: 4 },
    { date: '2023-09-01', count: 9 },
    { date: '2023-10-01', count: 14 },
  ],
};

// Mock notifications data
export const mockNotifications: UserNotification[] = [
  {
    id: 'n1',
    relatedIncidentId: 'INC-2023-005',
    title: 'New incident created',
    message: 'A new high severity incident has been created: Login Service Degradation',
    timestamp: '2023-10-12T09:15:00Z',
    read: false,
    type: 'incident_new',
  },
  {
    id: 'n2',
    relatedIncidentId: 'INC-2023-004',
    title: 'Incident status update',
    message: 'Payment Processing Failures incident has moved to monitoring status',
    timestamp: '2023-09-18T18:30:00Z',
    read: true,
    type: 'incident_update',
  },
  {
    id: 'n3',
    relatedIncidentId: 'INC-2023-007',
    title: 'Incident resolved',
    message: 'Mobile App Crashing incident has been resolved',
    timestamp: '2023-10-20T18:30:00Z',
    read: false,
    type: 'incident_resolved',
  },
  {
    id: 'n4',
    title: 'System maintenance',
    message: 'Planned maintenance for the Incident Response Portal scheduled for October 30, 2023',
    timestamp: '2023-10-23T14:00:00Z',
    read: false,
    type: 'system',
  },
  {
    id: 'n5',
    relatedIncidentId: 'INC-2023-005',
    title: 'You were mentioned',
    message: 'You were mentioned by Omar Hassan in the Login Service Degradation incident',
    timestamp: '2023-10-12T09:30:45Z',
    read: false,
    type: 'mention',
  },
];

// Mock knowledge articles
export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'ka1',
    title: 'Troubleshooting API Gateway Latency Issues',
    content: 'This article provides steps for investigating and resolving API Gateway performance problems...',
    tags: ['api', 'gateway', 'latency', 'performance'],
    relatedIncidents: ['INC-2023-001'],
    createdAt: '2023-06-20T10:00:00Z',
    updatedAt: '2023-06-20T10:00:00Z',
    author: 'Jane Doe',
  },
  {
    id: 'ka2',
    title: 'Database Replication Troubleshooting Guide',
    content: 'Follow these steps to diagnose and fix common database replication issues...',
    tags: ['database', 'replication', 'lag', 'performance'],
    relatedIncidents: ['INC-2023-002'],
    createdAt: '2023-07-25T15:45:00Z',
    updatedAt: '2023-08-02T11:30:00Z',
    author: 'Mike Johnson',
  },
  {
    id: 'ka3',
    title: 'Recommended CDN Cache Configuration',
    content: 'Best practices for configuring CDN caching to avoid stale content issues...',
    tags: ['cdn', 'cache', 'content', 'invalidation'],
    relatedIncidents: ['INC-2023-003'],
    createdAt: '2023-08-10T09:20:00Z',
    updatedAt: '2023-08-10T09:20:00Z',
    author: 'Emily Johnson',
  },
  {
    id: 'ka4',
    title: 'Payment Gateway Failure Recovery Playbook',
    content: 'Step-by-step guide to recover from payment processing failures across multiple providers...',
    tags: ['payments', 'gateway', 'transactions', 'recovery'],
    relatedIncidents: ['INC-2023-004'],
    createdAt: '2023-09-25T14:15:00Z',
    updatedAt: '2023-09-25T14:15:00Z',
    author: 'David Miller',
  },
  {
    id: 'ka5',
    title: 'Authentication Service Scaling Guidelines',
    content: 'Recommendations for scaling authentication services to handle peak traffic...',
    tags: ['authentication', 'scaling', 'login', 'performance'],
    relatedIncidents: ['INC-2023-005'],
    createdAt: '2023-10-15T11:30:00Z',
    updatedAt: '2023-10-15T11:30:00Z',
    author: 'Sarah Johnson',
  },
];

// Mock users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    teams: ['Platform Team', 'Operations'],
    notificationPreferences: {
      severities: ['critical', 'high', 'medium', 'low'],
      systems: ['All Systems'],
      teams: ['All Teams'],
      channels: ['email', 'slack', 'sms'],
    },
  },
  {
    id: 'u2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'incident_manager',
    teams: ['Platform Team'],
    notificationPreferences: {
      severities: ['critical', 'high'],
      systems: ['API Gateway', 'Authentication Service'],
      teams: ['Platform Team'],
      channels: ['email', 'slack'],
    },
  },
  {
    id: 'u3',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'incident_manager',
    teams: ['Platform Team'],
    notificationPreferences: {
      severities: ['critical', 'high'],
      systems: ['API Gateway', 'Database Cluster'],
      teams: ['Platform Team'],
      channels: ['email', 'slack'],
    },
  },
  {
    id: 'u4',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'incident_manager',
    teams: ['Database Team'],
    notificationPreferences: {
      severities: ['critical', 'high', 'medium'],
      systems: ['Database Cluster'],
      teams: ['Database Team'],
      channels: ['email', 'slack', 'sms'],
    },
  },
  {
    id: 'u5',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'incident_manager',
    teams: ['Identity Team'],
    notificationPreferences: {
      severities: ['critical', 'high'],
      systems: ['Authentication Service', 'User Portal'],
      teams: ['Identity Team'],
      channels: ['email', 'slack'],
    },
  },
  {
    id: 'u6',
    name: 'Alex Wong',
    email: 'alex.wong@example.com',
    role: 'viewer',
    teams: ['Customer Support Team'],
    notificationPreferences: {
      severities: ['critical'],
      systems: ['Website', 'Mobile App'],
      teams: [],
      channels: ['email'],
    },
  },
];

// Create a function to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDataService = {
  // Incidents
  getIncidents: async () => {
    await delay(800);
    return [...mockIncidents];
  },
  
  getIncidentById: async (id: string) => {
    await delay(500);
    const incident = mockIncidents.find(incident => incident.id === id);
    if (!incident) throw new Error(`Incident with ID ${id} not found`);
    return { ...incident };
  },
  
  // Metrics
  getMetrics: async () => {
    await delay(1000);
    return { ...mockMetrics };
  },
  
  // Notifications
  getNotifications: async () => {
    await delay(600);
    return [...mockNotifications];
  },
  
  // Knowledge Articles
  getKnowledgeArticles: async () => {
    await delay(700);
    return [...mockKnowledgeArticles];
  },
  
  getKnowledgeArticleById: async (id: string) => {
    await delay(400);
    return mockKnowledgeArticles.find(article => article.id === id);
  },
  
  // Users
  getUsers: async () => {
    await delay(800);
    return [...mockUsers];
  },
  
  getUserById: async (id: string) => {
    await delay(400);
    return mockUsers.find(user => user.id === id);
  },
  
  // Add incident learning
  addIncidentLearning: async (incidentId: string, learning: IncidentLearning) => {
    await delay(500);
    const incident = mockIncidents.find(inc => inc.id === incidentId);
    if (!incident) throw new Error(`Incident with ID ${incidentId} not found`);
    
    if (!incident.learnings) {
      incident.learnings = [];
    }
    
    incident.learnings.push(learning);
    return { ...incident };
  },
  
  // Add incident timeline event
  addIncidentTimelineEvent: async (incidentId: string, event: TimelineEvent) => {
    await delay(500);
    const incident = mockIncidents.find(inc => inc.id === incidentId);
    if (!incident) throw new Error(`Incident with ID ${incidentId} not found`);
    
    incident.timeline.push(event);
    incident.updatedAt = new Date().toISOString();
    
    return { ...incident };
  },
};
