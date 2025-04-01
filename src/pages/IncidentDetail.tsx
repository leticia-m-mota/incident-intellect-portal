import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft,
  MessageSquare,
  AlertCircle,
  ListTodo,
  CheckCircle2,
  Users
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
import { IncidentLearning } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commAssignee, setCommAssignee] = useState<string>("");
  const [pointAssignee, setPointAssignee] = useState<string>("");
  
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Header - Simplified */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <IncidentSeverityBadge severity={incident.severity} />
                <IncidentStatusBadge status={incident.status} />
                <span className="text-sm text-muted-foreground ml-2 font-mono">
                  {incident.id}
                </span>
              </div>
              
              <h1 className="text-2xl font-bold mb-2">{incident.title}</h1>
              <p className="text-muted-foreground mb-4">{incident.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Systems: {incident.impactedSystems.join(', ')}
                </div>
                <div className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Owner: {incident.ownerTeam}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Different content based on incident status */}
          {isActiveIncident ? (
            /* Active Incident View */
            <>
              {/* Action Panel for Active Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Incident Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="default" size="sm" className="gap-2">
                      <ListTodo size={16} />
                      <span>Update Status</span>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageSquare size={16} />
                      <span>Slack Thread</span>
                    </Button>
                    
                    <Button variant="default" size="sm" className="gap-2 bg-severity-low hover:bg-severity-low/90">
                      <CheckCircle2 size={16} />
                      <span>Resolve Incident</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Assign Comms
                      </label>
                      <Select 
                        value={commAssignee} 
                        onValueChange={setCommAssignee}
                      >
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
                      <label className="block text-sm font-medium mb-2">
                        Assign Point
                      </label>
                      <Select 
                        value={pointAssignee} 
                        onValueChange={setPointAssignee}
                      >
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
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Add Update
                    </label>
                    <Textarea 
                      placeholder="Enter incident update or comment..."
                      className="mb-2"
                      rows={3}
                    />
                    <div className="flex justify-between">
                      <Select defaultValue="update">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Update type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="update">Status Update</SelectItem>
                          <SelectItem value="action">Action Taken</SelectItem>
                          <SelectItem value="investigation">Investigation</SelectItem>
                          <SelectItem value="resolution">Resolution</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button>Submit Update</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Resolved Incident View */
            <Tabs defaultValue="metrics">
              <TabsList>
                <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="learnings">Learnings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="metrics" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incident Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IncidentImpactMetrics incident={incident} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <IncidentTimeline events={incident.timeline} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="learnings" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <IncidentLearningsSection 
                      learnings={incident.learnings} 
                      onAddLearning={handleAddLearning}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Only show relevant cards based on incident status */}
          {isActiveIncident ? (
            <>
              {/* AI Assistant - Moved to top for active incidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle size={18} className="text-purple" />
                    <span>AI Assistance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AiAssistant />
                </CardContent>
              </Card>
              
              {/* Related Knowledge */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Knowledge</CardTitle>
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
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        No knowledge articles found related to this incident
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users size={18} className="text-purple" />
                    <span>Team Members</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">SJ</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">Incident Manager</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">MB</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Michael Brown</p>
                          <p className="text-xs text-muted-foreground">Systems Engineer</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">AC</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Alex Chen</p>
                          <p className="text-xs text-muted-foreground">Database Specialist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Impact Summary for Resolved Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Impact Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Severity</h3>
                      <div className="flex items-center mt-1">
                        <IncidentSeverityBadge severity={incident.severity} />
                        <span className="ml-2">{
                          incident.severity === 'critical' ? 'Critical Impact' :
                          incident.severity === 'high' ? 'Major Impact' :
                          incident.severity === 'medium' ? 'Moderate Impact' : 'Minor Impact'
                        }</span>
                      </div>
                    </div>
                    
                    {incident.metrics && (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Incident Duration</h3>
                          <p className="mt-1">
                            {incident.metrics.timeToResolve ? 
                              `${Math.floor(incident.metrics.timeToResolve / 60)}h ${incident.metrics.timeToResolve % 60}m` : 
                              'Not available'}
                          </p>
                        </div>
                        
                        {incident.metrics.affectedUsers && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">User Impact</h3>
                            <p className="mt-1">{incident.metrics.affectedUsers.toLocaleString()} affected users</p>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Impacted Systems</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {incident.impactedSystems.map(system => (
                          <span key={system} className="px-2 py-0.5 bg-secondary text-xs rounded-full">
                            {system}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            
              {/* Similar Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Similar Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  {similarIncidents && similarIncidents.length > 0 ? (
                    <div className="space-y-3">
                      {similarIncidents.map(inc => (
                        <SimplifiedIncidentCard key={inc.id} incident={inc} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        No similar incidents found
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
