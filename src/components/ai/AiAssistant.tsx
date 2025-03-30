
import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, AlertCircle, User, Search, Clock, Calendar, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Suggestion type
interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your incident management assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Predefined prompt suggestions
  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: 'Find On-call',
      description: 'Who is on-call for the Platform team?',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: '2',
      title: 'Playbook',
      description: 'Show me the playbook for API outages',
      icon: <Search className="h-4 w-4" />,
    },
    {
      id: '3',
      title: 'Related Incidents',
      description: 'Find incidents related to payment processing',
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      id: '4',
      title: 'Find Documentation',
      description: 'Find Confluence docs for database failover',
      icon: <Search className="h-4 w-4" />,
    },
    {
      id: '5',
      title: 'Recent Incidents',
      description: 'Show me recent critical incidents',
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: '6',
      title: 'Get Help',
      description: 'How do I resolve a SEV1 incident?',
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ];
  
  // Mock AI responses based on keywords
  const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('on-call') && lowerQuery.includes('platform')) {
      return "The current on-call engineer for the Platform team is Alex Chen. Phone: +1 (555) 123-4567, Slack: @alexc. Backup: Maya Patel.";
    } else if (lowerQuery.includes('playbook') && lowerQuery.includes('api')) {
      return "**API Outage Playbook**\n\n1. Verify the outage using monitoring dashboards\n2. Check recent deployments in the API service\n3. Examine error logs in Datadog\n4. Check dependent services (Auth, Database)\n5. Roll back recent changes if needed\n6. Alert stakeholders through Slack channel #api-status\n\n[View complete playbook](https://confluence.example.com/playbooks/api-outage)";
    } else if (lowerQuery.includes('related') && lowerQuery.includes('payment')) {
      return "I found 5 incidents related to payment processing in the last 30 days:\n\n- INC-4829: Payment gateway timeout (SEV2, Oct 12)\n- INC-4801: Payment processor API latency (SEV3, Oct 8)\n- INC-4756: Payment authorization failures (SEV1, Oct 3)\n- INC-4732: Payment webhook delivery delays (SEV3, Sep 29)\n- INC-4701: Payment database connection issues (SEV2, Sep 25)\n\nWould you like more details on any of these incidents?";
    } else if (lowerQuery.includes('confluence') || lowerQuery.includes('documentation')) {
      return "Here are relevant Confluence pages for database failover:\n\n1. [Database Failover Procedures](https://confluence.example.com/db/failover)\n2. [Database Architecture Overview](https://confluence.example.com/db/architecture)\n3. [Emergency Response Checklist](https://confluence.example.com/emergency/db-checklist)\n4. [Post-Failover Verification Steps](https://confluence.example.com/db/post-failover)\n\nThe most recently updated document is 'Database Failover Procedures' (updated 3 days ago).";
    } else if (lowerQuery.includes('recent') && lowerQuery.includes('critical')) {
      return "Here are the 3 most recent critical (SEV1) incidents:\n\n1. INC-4874: Authentication service outage (Oct 15, 2023)\n2. INC-4756: Payment authorization failures (Oct 3, 2023)\n3. INC-4698: Global API gateway unreachable (Sep 24, 2023)\n\nAll incidents have been resolved. The average time to resolution was 3.2 hours.";
    } else if (lowerQuery.includes('resolve') && lowerQuery.includes('sev1')) {
      return "**SEV1 Incident Resolution Guide**\n\n1. Immediately acknowledge the incident and join the incident call\n2. Identify an Incident Commander to coordinate response\n3. Follow the appropriate playbook if available\n4. Prioritize service restoration over root cause analysis\n5. Keep stakeholders informed via status updates every 30 minutes\n6. Document all actions taken in the incident channel\n7. Once resolved, schedule a post-mortem within 24-48 hours\n\nRefer to the [complete incident response guide](https://confluence.example.com/incident/sev1-response) for detailed procedures.";
    } else {
      return "I'm not sure I understand your query. You can ask me about:\n\n- Who is on-call for a specific team\n- Finding incident playbooks\n- Looking up related incidents\n- Finding documentation\n- Checking recent incidents\n- How to handle specific incident types";
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };
  
  // Handle pressing Enter in the input field
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Handle clicking a suggestion
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.description);
    
    // Focus on the input
    setTimeout(() => {
      document.getElementById('message-input')?.focus();
    }, 100);
  };
  
  // Format message content with Markdown-like syntax
  const formatMessage = (content: string) => {
    // Replace URLs with links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let formattedContent = content.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-600 hover:underline">$1</a>');
    
    // Replace bold text
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic text
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace newlines with <br>
    formattedContent = formattedContent.replace(/\n/g, '<br />');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-purple" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get help with incident management, find resources, and access knowledge
        </CardDescription>
      </CardHeader>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === 'user'
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 mx-2 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                    <Avatar>
                      <AvatarFallback>
                        {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {formatMessage(message.content)}
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {messages.length === 1 && (
          <div className="px-4 pt-4 pb-2">
            <p className="text-sm font-medium mb-2">Suggested prompts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">{suggestion.icon}</div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{suggestion.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {suggestion.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <CardFooter className="border-t pt-4">
        <div className="flex w-full items-center space-x-2">
          <Input
            id="message-input"
            placeholder="Ask about incidents, playbooks, or documentation..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
