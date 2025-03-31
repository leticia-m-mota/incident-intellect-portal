
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
    <Card className="md:h-fit">
      <CardContent className="p-4">
        <nav className="space-y-1">
          <Button 
            variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
            className="w-full justify-start" 
            onClick={() => setActiveTab('profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button 
            variant={activeTab === 'integrations' ? 'secondary' : 'ghost'} 
            className="w-full justify-start" 
            onClick={() => setActiveTab('integrations')}
          >
            <Link className="mr-2 h-4 w-4" />
            Integrations
          </Button>
          <Button 
            variant={activeTab === 'security' ? 'secondary' : 'ghost'} 
            className="w-full justify-start" 
            onClick={() => setActiveTab('security')}
          >
            <Lock className="mr-2 h-4 w-4" />
            Security
          </Button>
          <Button 
            variant={activeTab === 'preferences' ? 'secondary' : 'ghost'} 
            className="w-full justify-start" 
            onClick={() => setActiveTab('preferences')}
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
