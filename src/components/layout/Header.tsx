
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  BellRing, 
  Search, 
  Plus, 
  MessageSquare, 
  Bell,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border h-16 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text"
            placeholder="Search incidents, teams..."
            className="pl-8 pr-4 py-2 text-sm rounded-md border border-input w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex gap-2 items-center"
        >
          <Calendar size={16} />
          <span>Incident Calendar</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex gap-2 items-center"
          onClick={() => navigate('/incidents/new')}
        >
          <MessageSquare size={16} />
          <span>Status Updates</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="gap-2 items-center"
          onClick={() => navigate('/incidents/new')}
        >
          <Plus size={16} />
          <span>New Incident</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
