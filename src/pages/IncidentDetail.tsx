import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { 
  ArrowLeft,
  MessageSquare,
  AlertCircle,
  ListTodo,
  CheckCircle2,
  Users,
  Send,
  Clock,
  FileText,
  ExternalLink,
  Server
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { IncidentSeverityBadge } from '@/components/incidents/IncidentSeverityBadge';
import { IncidentStatusBadge } from '@/components/incidents/IncidentStatusBadge';
import { IncidentTimeline } from '@/components/incidents/IncidentTimeline';
import { IncidentLearningsSection } from '@/components/incidents/IncidentLearningsSection';
import { IncidentImpactMetrics } from '@/components/incidents/IncidentImpactMetrics';
import { AiAssistant } from '@/components/ai/AiAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { mockDataService } from '@/lib/mockData';
import { SimplifiedIncidentCard } from '@/components/incidents/SimplifiedIncidentCard';
import { IncidentLearning, TimelineEvent } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commAssignee, setCommAssignee] = useState<string>("");
  const [pointAssignee, setPointAssignee] = useState<string>("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateType, setUpdateType] = useState("update");
  
  const { data: incident, isLoading } = useQuery({
    queryKey: ['incident', id],
    queryFn: () => id ? mockDataService.getIncidentById(id) : Promise.resolve(null),
  });
  
  const { data: incidents } = useQuery({
    queryKey: ['incidents'],
    queryFn: mockDataService.getIncidents,
  });
  
  const { data: knowledgeArticles } = useQuery({
    queryKey: ['knowledgeArticles'],
    queryFn: mockDataService.getKnowledgeArticles,
  });

  // Add learning mutation
  const addLearningMutation = useMutation({
    mutationFn: async (learning: Omit<IncidentLearning, 'id' | 'createdAt'>) => {
      if (!id) throw new Error('No incident ID provided');
      
      // In a real app, this would be an API call
      const newLearning: IncidentLearning = {
        ...learning,
        id: `learning-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      
      return mockDataService.addIncidentLearning(id, newLearning);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incident', id] });
    },
    onError: () => {
      toast({
        title: 'Failed to add learning',
        description: 'There was an error adding your learning. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  // Add update mutation
  const addUpdateMutation = useMutation({
    mutationFn: async () => {
      if (!id || !updateMessage.trim()) throw new Error('No incident ID or message provided');
      
      const newUpdate: TimelineEvent = {
        id: `update-${Date.now()}`,
        timestamp: new Date().toISOString(),
        message: updateMessage.trim(),
        type: updateType as 'update' | 'action' | 'notification' | 'resolution',
        user: pointAssignee === 'user1' ? 'Sarah Johnson' : 
              pointAssignee === 'user2' ? 'Alex Chen' : 
              pointAssignee === 'user3' ? 'Michael Brown' : 'Anonymous User',
      };
      
      return mockDataService.addIncidentTimelineEvent(id, newUpdate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incident', id] });
      setUpdateMessage("");
      toast({
        title: 'Update submitted',
        description: 'Your incident update has been added to the timeline.',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to add update',
        description: 'There was an error adding your update. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  // Find similar incidents based on tags or impacted systems
  const similarIncidents = incidents?.filter(inc => 
    inc.id !== id && (
      inc.tags.some(tag => incident?.tags.includes(tag)) ||
      inc.impactedSystems.some(sys => incident?.impactedSystems.includes(sys))
    )
  ).slice(0, 2);
  
  // Find related knowledge articles
  const relatedArticles = knowledgeArticles?.filter(article =>
    article.tags.some(tag => incident?.tags.includes(tag)) ||
    article.relatedIncidents.includes(id || '')
  ).slice(0, 2);
  
  // Check if incident is active
  const isActiveIncident = incident && ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status);
  
  // Handle adding a new learning
  const handleAddLearning = (learning: Omit<IncidentLearning, 'id' | 'createdAt'>) => {
    addLearningMutation.mutate(learning);
  };
  
  // Handle adding a new update
  const handleAddUpdate = () => {
    if (!updateMessage.trim()) {
      toast({
        title: 'Empty update',
        description: 'Please enter an update message before submitting.',
        variant: 'destructive',
      });
      return;
    }
    
    addUpdateMutation.mutate();
  };
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate('/incidents')}
          >
            <ArrowLeft size={16} />
            <span>Back to Incidents</span>
          </Button>
        </div>
        
        <div className="space-y-6">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </MainLayout>
    );
  }
  
  if (!incident) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle size={48} className="text-severity-high mb-4" />
          <h2 className="text-2xl font-bold mb-2">Incident Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The incident you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/incidents')}>
            Return to Incidents
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={() => navigate('/incidents')}
        >
          <ArrowLeft size={16} />
          <span>Back to Incidents</span>
        </Button>
      </div>
      
      {/* Full-width incident header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{incident.title}</h1>
              <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                {incident.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IncidentSeverityBadge severity={incident.severity} />
              <IncidentStatusBadge status={incident.status} />
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 text-lg">{incident.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Systems: {incident.impactedSystems.join(', ')}
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
              Owner: {incident.ownerTeam}
            </div>
            {incident.resolvedAt && (
              <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Resolved: {format(new Date(incident.resolvedAt), 'MMM d, yyyy h:mm a')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isActiveIncident ? (
        // Active incident layout
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Team assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Team Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Communications Lead</label>
                    <Select value={commAssignee} onValueChange={setCommAssignee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign communications lead" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user1">Sarah Johnson</SelectItem>
                        <SelectItem value="user2">Alex Chen</SelectItem>
                        <SelectItem value="user3">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Resolution Lead</label>
                    <Select value={pointAssignee} onValueChange={setPointAssignee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign resolution lead" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user1">Sarah Johnson</SelectItem>
                        <SelectItem value="user2">Alex Chen</SelectItem>
                        <SelectItem value="user3">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action panel */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button variant="default" size="sm" className="gap-2">
                    <ListTodo size={16} />
                    Update Status
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare size={16} />
                    Slack Thread
                  </Button>
                  <Button variant="default" size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle2 size={16} />
                    Resolve Incident
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Send Update</h3>
                  <Textarea 
                    placeholder="Enter incident update or comment..."
                    className="mb-3"
                    rows={3}
                    value={updateMessage}
                    onChange={(e) => setUpdateMessage(e.target.value)}
                  />
                  <div className="flex gap-2 justify-between">
                    <Select value={updateType} onValueChange={setUpdateType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="update">Status Update</SelectItem>
                        <SelectItem value="action">Action Taken</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="resolution">Resolution</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleAddUpdate}
                      disabled={!updateMessage.trim() || !pointAssignee}
                      className="gap-2"
                    >
                      <Send size={16} />
                      Send Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <IncidentTimeline events={incident.timeline} />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <AiAssistant />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Related Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                {relatedArticles && relatedArticles.length > 0 ? (
                  <div className="space-y-3">
                    {relatedArticles.map(article => (
                      <div key={article.id} className="border rounded-lg p-3 hover:bg-muted/30">
                        <h3 className="font-medium mb-1">{article.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                          {article.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No knowledge articles found related to this incident
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Resolved incident layout - reorganized and optimized
        <div className="space-y-6">
          {/* First row: Impact Metrics and Documentation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Impact & Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time to acknowledge:</label>
                    <p className="mt-1 text-2xl font-bold text-blue-600">
                      {incident.metrics?.timeToAcknowledge ? `${incident.metrics.timeToAcknowledge} min` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time to resolve:</label>
                    <p className="mt-1 text-2xl font-bold text-green-600">
                      {incident.metrics?.timeToResolve ? `${incident.metrics.timeToResolve} min` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Affected Users:</label>
                    <p className="mt-1 text-2xl font-bold text-red-600">
                      {incident.metrics?.affectedUsers ? incident.metrics.affectedUsers.toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Service Downtime:</label>
                    <p className="mt-1 text-2xl font-bold text-orange-600">
                      {incident.metrics?.serviceDowntime ? `${incident.metrics.serviceDowntime} min` : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Affected business flows:</label>
                    <p className="mt-1">Authentication, Payment Processing, User Registration</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Shards impacted:</label>
                    <p className="mt-1">shard-001, shard-003, shard-007</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Service names:</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {incident.impactedSystems.map(system => (
                        <span key={system} className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={18} />
                  Documentation & Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Incident log filled:</label>
                    <p className="mt-1 text-green-600 font-medium">Yes</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Postmortem log filled:</label>
                    <p className="mt-1 text-green-600 font-medium">Yes</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button variant="link" size="sm" className="p-0 h-auto justify-start">
                    <ExternalLink size={14} className="mr-2" />
                    View Incident Log
                  </Button>
                  <Button variant="link" size="sm" className="p-0 h-auto justify-start">
                    <ExternalLink size={14} className="mr-2" />
                    View Postmortem
                  </Button>
                  <Button variant="link" size="sm" className="p-0 h-auto justify-start">
                    <MessageSquare size={14} className="mr-2" />
                    #incident-{incident.id.toLowerCase()}
                  </Button>
                  <Button variant="link" size="sm" className="p-0 h-auto justify-start">
                    <AlertCircle size={14} className="mr-2" />
                    View Related Alerts
                  </Button>
                </div>

                {similarIncidents && similarIncidents.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Similar Incidents</h4>
                    <div className="space-y-3">
                      {similarIncidents.map(inc => (
                        <SimplifiedIncidentCard key={inc.id} incident={inc} />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Second row: Participants & Teams, and Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} />
                  Participants & Teams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Participants</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Reporter:</span>
                      <span className="text-sm">Sarah Johnson</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Point:</span>
                      <span className="text-sm">Alex Chen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Comms:</span>
                      <span className="text-sm">Michael Brown</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Coordinator:</span>
                      <span className="text-sm">Emily Davis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Others:</span>
                      <span className="text-sm">David Wilson, Lisa Garcia, James Taylor</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Teams Involved</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Affected Squads - BUs:</span>
                      <p className="text-sm text-muted-foreground">Platform Engineering - Infrastructure, Data Engineering - Analytics</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Responsible Squad:</span>
                      <p className="text-sm text-muted-foreground">{incident.ownerTeam}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={18} />
                  Timeline Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Started:</span>
                    <span className="text-sm">{format(new Date(incident.createdAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Reported:</span>
                    <span className="text-sm">{format(new Date(incident.createdAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Acknowledged:</span>
                    <span className="text-sm">
                      {incident.metrics?.timeToAcknowledge 
                        ? format(new Date(new Date(incident.createdAt).getTime() + incident.metrics.timeToAcknowledge * 60000), 'MMM d, yyyy h:mm a')
                        : 'Not available'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Mitigated:</span>
                    <span className="text-sm">
                      {incident.resolvedAt 
                        ? format(new Date(new Date(incident.resolvedAt).getTime() - 30 * 60000), 'MMM d, yyyy h:mm a')
                        : 'Not available'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Resolved:</span>
                    <span className="text-sm">
                      {incident.resolvedAt 
                        ? format(new Date(incident.resolvedAt), 'MMM d, yyyy h:mm a')
                        : 'Not available'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Postmortem:</span>
                    <span className="text-sm">
                      {incident.resolvedAt 
                        ? format(new Date(new Date(incident.resolvedAt).getTime() + 24 * 60 * 60000), 'MMM d, yyyy h:mm a')
                        : 'Pending'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third row: Detailed Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <IncidentTimeline events={incident.timeline} />
            </CardContent>
          </Card>

          {/* Fourth row: Learnings section */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Learnings</CardTitle>
            </CardHeader>
            <CardContent>
              <IncidentLearningsSection 
                learnings={incident.learnings} 
                onAddLearning={handleAddLearning}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}
