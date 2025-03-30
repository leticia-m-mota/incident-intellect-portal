
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AiAssistant } from '@/components/ai/AiAssistant';
import { Search, Book, Filter, Calendar, Tag, User, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Sample knowledge articles
const articles = [
  {
    id: '1',
    title: 'API Gateway Troubleshooting Guide',
    description: 'A comprehensive guide to diagnosing and resolving common API Gateway issues.',
    tags: ['api', 'gateway', 'troubleshooting'],
    author: 'Alex Chen',
    date: '2023-10-15',
    views: 243,
  },
  {
    id: '2',
    title: 'Database Failover Procedures',
    description: 'Step-by-step guide for handling database failovers with minimal service disruption.',
    tags: ['database', 'failover', 'high-availability'],
    author: 'Maya Patel',
    date: '2023-09-28',
    views: 187,
  },
  {
    id: '3',
    title: 'Payment Service SEV1 Incident Response',
    description: 'Response playbook for critical incidents affecting the payment processing service.',
    tags: ['payment', 'sev1', 'incident-response'],
    author: 'Sam Wilson',
    date: '2023-10-03',
    views: 326,
  },
  {
    id: '4',
    title: 'Authentication System Outage Mitigation',
    description: 'Strategies and procedures for mitigating authentication service outages.',
    tags: ['authentication', 'outage', 'mitigation'],
    author: 'Jordan Lee',
    date: '2023-09-12',
    views: 154,
  },
  {
    id: '5',
    title: 'Incident Postmortem Template',
    description: 'Standardized template for conducting effective incident postmortems.',
    tags: ['postmortem', 'template', 'incident-management'],
    author: 'Taylor Kim',
    date: '2023-08-30',
    views: 412,
  },
  {
    id: '6',
    title: 'Infrastructure Scaling Playbook',
    description: 'Procedures for emergency scaling of infrastructure during traffic spikes.',
    tags: ['infrastructure', 'scaling', 'emergency-response'],
    author: 'Morgan Smith',
    date: '2023-10-10',
    views: 198,
  },
];

// Sample playbooks
const playbooks = [
  {
    id: '1',
    title: 'API Gateway Outage Response',
    description: 'Step-by-step response plan for API Gateway outages.',
    team: 'Platform',
    lastUpdated: '2023-10-12',
  },
  {
    id: '2',
    title: 'Database Performance Degradation',
    description: 'Response procedures for database performance issues.',
    team: 'Database',
    lastUpdated: '2023-09-24',
  },
  {
    id: '3',
    title: 'Payment Processing Failures',
    description: 'Troubleshooting steps for payment processing errors.',
    team: 'Payments',
    lastUpdated: '2023-10-05',
  },
  {
    id: '4',
    title: 'User Authentication Failures',
    description: 'Response plan for authentication service issues.',
    team: 'Identity',
    lastUpdated: '2023-09-18',
  },
  {
    id: '5',
    title: 'CDN Service Disruption',
    description: 'Procedures for handling CDN outages or performance issues.',
    team: 'Frontend',
    lastUpdated: '2023-10-01',
  },
];

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('assistant');
  
  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Filter playbooks based on search query
  const filteredPlaybooks = playbooks.filter(playbook => 
    playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playbook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playbook.team.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div>
        <PageTitle 
          title="Knowledge Base" 
          description="Access playbooks, documentation, and AI assistance for incident management" 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <Search size={16} />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <Book size={16} />
              <span>Articles</span>
            </TabsTrigger>
            <TabsTrigger value="playbooks" className="flex items-center gap-2">
              <Book size={16} />
              <span>Playbooks</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assistant" className="mt-6">
            <div className="grid grid-cols-1">
              <AiAssistant />
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="mt-6">
            <div className="mb-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArticles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your search criteria.</p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <Card key={article.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 h-6">
                          View Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="playbooks" className="mt-6">
            <div className="mb-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search playbooks..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Incident Response Playbooks</CardTitle>
                <CardDescription>
                  Step-by-step guides for handling various incident types
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredPlaybooks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No playbooks found matching your search criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPlaybooks.map((playbook) => (
                      <div key={playbook.id}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{playbook.title}</h3>
                            <p className="text-sm text-muted-foreground">{playbook.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <User size={14} className="text-muted-foreground" />
                                <span>{playbook.team} Team</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} className="text-muted-foreground" />
                                <span>Updated {new Date(playbook.lastUpdated).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">View Playbook</Button>
                        </div>
                        {playbook.id !== filteredPlaybooks[filteredPlaybooks.length - 1].id && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
