
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
      title: 'Analytics',
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
      title: 'Users',
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
      <SidebarHeader className="flex justify-center items-center py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-7 w-7 rounded-full bg-purple-light flex items-center justify-center">
            <AlertCircle size={15} className="text-white" />
          </div>
          <span className="text-white text-sm font-semibold">IntelliResponse</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      "py-2 text-sm",
                      isActive(item.path) && 
                      "bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="icon-sm" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium">Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      "py-2 text-sm",
                      isActive(item.path) && 
                      "bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="icon-sm" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="flex gap-2 items-center">
          <div className="h-7 w-7 rounded-full bg-purple-light/20">
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=6E59A5&color=fff" 
              alt="Admin" 
              className="rounded-full" 
            />
          </div>
          <div>
            <p className="text-white text-xs font-medium">Admin User</p>
            <p className="text-white/60 text-[10px]">Incident Manager</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
