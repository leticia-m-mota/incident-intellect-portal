
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Lock, Settings as SettingsIcon, Link } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  return (
    <Card className="md:h-fit border-border">
      <CardContent className="p-3">
        <nav className="space-y-0.5">
          <Button 
            variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
            className="w-full justify-start h-9" 
            onClick={() => setActiveTab('profile')}
          >
            <User className="icon-sm mr-2" />
            <span className="text-sm">Profile</span>
          </Button>
          <Button 
            variant={activeTab === 'integrations' ? 'secondary' : 'ghost'} 
            className="w-full justify-start h-9" 
            onClick={() => setActiveTab('integrations')}
          >
            <Link className="icon-sm mr-2" />
            <span className="text-sm">Integrations</span>
          </Button>
          <Button 
            variant={activeTab === 'security' ? 'secondary' : 'ghost'} 
            className="w-full justify-start h-9" 
            onClick={() => setActiveTab('security')}
          >
            <Lock className="icon-sm mr-2" />
            <span className="text-sm">Security</span>
          </Button>
          <Button 
            variant={activeTab === 'preferences' ? 'secondary' : 'ghost'} 
            className="w-full justify-start h-9" 
            onClick={() => setActiveTab('preferences')}
          >
            <SettingsIcon className="icon-sm mr-2" />
            <span className="text-sm">Preferences</span>
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
