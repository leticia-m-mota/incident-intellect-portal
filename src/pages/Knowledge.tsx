
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BookOpen, 
  Search, 
  Tag, 
  FileText, 
  Plus,
  Clock,
  User,
  Filter
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';
import { format } from 'date-fns';

export default function Knowledge() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: articles, isLoading } = useQuery({
    queryKey: ['knowledgeArticles'],
    queryFn: mockDataService.getKnowledgeArticles,
  });
  
  const filteredArticles = articles?.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Group articles by tags
  const articlesByTag: Record<string, typeof articles> = {};
  
  filteredArticles?.forEach(article => {
    article.tags.forEach(tag => {
      if (!articlesByTag[tag]) {
        articlesByTag[tag] = [];
      }
      articlesByTag[tag]?.push(article);
    });
  });
  
  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageTitle 
            title="Knowledge Base" 
            description="Access articles, playbooks, and documented solutions" 
          />
          
          <Button className="gap-2">
            <Plus size={16} />
            <span>New Article</span>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search knowledge base..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="tagged">By Tag</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[220px] w-full" />
              ))}
            </div>
          ) : filteredArticles && filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                      <FileText size={16} />
                      <span className="text-sm">Article</span>
                    </div>
                    
                    <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {article.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map(tag => (
                        <div 
                          key={tag} 
                          className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1"
                        >
                          <Tag size={10} />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{format(new Date(article.updatedAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Articles Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? `No articles matching "${searchTerm}"` : "There are no knowledge articles yet"}
              </p>
              <Button className="gap-2">
                <Plus size={16} />
                <span>Create Article</span>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="playbooks" className="mt-6">
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Playbooks Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              This section will contain step-by-step playbooks for incident response
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="solutions" className="mt-6">
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Solutions Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              This section will contain documented solutions for common problems
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="tagged" className="mt-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full mb-6" />
            ))
          ) : Object.keys(articlesByTag).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(articlesByTag).map(([tag, tagArticles]) => (
                <div key={tag}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-lg flex items-center gap-1">
                      <Tag size={14} />
                      <span>{tag}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {tagArticles?.length} articles
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tagArticles?.map(article => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{article.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {article.content}
                          </p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{article.author}</span>
                            <span>{format(new Date(article.updatedAt), 'MMM d, yyyy')}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <Tag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Tags Found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? `No articles with tags matching "${searchTerm}"` : "There are no tagged articles yet"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
