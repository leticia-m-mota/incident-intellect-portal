
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AlertCircle,
  BarChart3,
  Bell,
  Book,
  Brain,
  Home,
  Layers,
  Settings,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    {
      title: 'Home',
      icon: Home,
      path: '/',
    },
    {
      title: 'Analytics & Metrics',
      icon: Layers,
      path: '/analytics',
    },
    {
      title: 'Incidents',
      icon: AlertCircle,
      path: '/incidents',
    },
    {
      title: 'Notifications',
      icon: Bell,
      path: '/notifications',
    },
  ];

  const supportMenuItems = [
    {
      title: 'AI Assistance',
      icon: Brain,
      path: '/knowledge',
    },
    {
      title: 'User Management',
      icon: Users,
      path: '/users',
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/knowledge' && location.pathname === '/knowledge') {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center py-6">
        <div className="flex items-center justify-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-light flex items-center justify-center">
            <AlertCircle size={18} className="text-white" />
          </div>
          <span className="text-white font-bold">IntelliResponse</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      isActive(item.path) && 
                      "bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      isActive(item.path) && 
                      "bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 rounded-full bg-purple-light/20">
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=6E59A5&color=fff" 
              alt="Admin" 
              className="rounded-full" 
            />
          </div>
          <div className="text-sm">
            <p className="text-white">Admin User</p>
            <p className="text-white/60 text-xs">Incident Manager</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
