
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
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
    <header className="border-b border-border h-14 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="relative w-60 hidden md:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground icon-sm" />
          <input 
            type="text"
            placeholder="Search..."
            className="pl-7 pr-3 py-1.5 text-sm rounded-md border border-input w-full h-8"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex gap-1.5 items-center h-8 text-xs"
        >
          <Calendar className="icon-sm" />
          <span>Calendar</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex gap-1.5 items-center h-8 text-xs"
          onClick={() => navigate('/incidents/new')}
        >
          <MessageSquare className="icon-sm" />
          <span>Updates</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="gap-1.5 items-center h-8 text-xs"
          onClick={() => navigate('/incidents/new')}
        >
          <Plus className="icon-sm" />
          <span>New</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="icon-sm" />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-purple text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
