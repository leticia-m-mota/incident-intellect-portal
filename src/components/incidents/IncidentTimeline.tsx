
import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { TimelineEvent } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface IncidentTimelineProps {
  events: TimelineEvent[];
}

export function IncidentTimeline({ events }: IncidentTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'notification':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-600 text-lg">📢</span>
          </div>
        );
      case 'action':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-light/20 flex items-center justify-center">
            <span className="text-purple text-lg">🛠️</span>
          </div>
        );
      case 'update':
        return (
          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <span className="text-amber-600 text-lg">📝</span>
          </div>
        );
      case 'resolution':
        return (
          <div className="h-8 w-8 rounded-full bg-severity-low/20 flex items-center justify-center">
            <span className="text-severity-low text-lg">✅</span>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-lg">ℹ️</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="absolute left-4 top-8 bottom-0 w-px bg-border"></div>
      {sortedEvents.map((event, index) => (
        <div key={event.id} className="flex gap-4 relative">
          <div className="z-10">{getEventIcon(event.type)}</div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 gap-1">
              <p className="font-medium">
                {event.user}
              </p>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                <span>{format(new Date(event.timestamp), 'MMM d, yyyy')}</span>
                <span>•</span>
                <span>{format(new Date(event.timestamp), 'h:mm a')}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</span>
              </div>
            </div>
            <p className="text-sm">{event.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
