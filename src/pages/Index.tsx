
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, compareDesc } from 'date-fns';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageTitle } from '@/components/common/PageTitle';
import { StatCard } from '@/components/common/StatCard';
import { SimplifiedIncidentCard } from '@/components/incidents/SimplifiedIncidentCard';
import { IncidentAreaChart } from '@/components/charts/IncidentAreaChart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { mockDataService } from '@/lib/mockData';
import { ChartContainer } from '@/components/ui/chart';

export default function Index() {
  const navigate = useNavigate();
  
  const { data: incidents, isLoading: isLoadingIncidents } = useQuery({
    queryKey: ['incidents'],
    queryFn: mockDataService.getIncidents,
  });
  
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: mockDataService.getMetrics,
  });

  // Get year and month for display
  const today = new Date();
  const currentMonthStart = startOfMonth(today);
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const ytdText = `${format(yearStart, 'MMM d yyyy')} until today`;
  const currentMonthText = format(today, 'MMM yyyy');
  
  // Get critical and high severity incidents (severity 1 and 2), sorted by creation date (newest first)
  const recentCriticalHighIncidents = incidents
    ?.filter(incident => (incident.severity === 1 || incident.severity === 2))
    .sort((a, b) => {
      // Sort by creation date (newest first)
      return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
    })
    .slice(0, 5);
  
  // Get count of currently open critical and high incidents (severity 1 and 2)
  const openCriticalHighCount = incidents?.filter(
    incident => (incident.severity === 1 || incident.severity === 2) && 
      ['open', 'investigating', 'identified', 'monitoring'].includes(incident.status)
  ).length || 0;
  
  // Format trend data for chart with current and previous year
  const currentYearData = Array.from({ length: 12 }, (_, i) => ({
    month: format(new Date(today.getFullYear(), i), 'MMM'),
    count: Math.floor(Math.random() * 20) + 5, // Mock data for current year
    lastYearCount: Math.floor(Math.random() * 15) + 3 // Mock data for last year
  }));
  
  // Add forecast data for remaining months
  const trendDataWithForecast = currentYearData.map(item => {
    const monthIndex = new Date(Date.parse(`${item.month} 1, ${today.getFullYear()}`)).getMonth();
    const isFuture = monthIndex > today.getMonth();
    return {
      ...item,
      count: isFuture ? null : item.count,
      forecast: isFuture ? Math.floor(Math.random() * 18) + 8 : null // Forecast for future months
    };
  });
  
  return (
    <MainLayout>
      <div className="mb-6">
        <PageTitle 
          title="Incident Response Portal" 
          description="Critical incident information at a glance"
        />
        
        {/* Stats Overview - Reduced vertical margins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {isLoadingMetrics ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[100px] w-full" />
            ))
          ) : (
            <>
              <StatCard
                title="Total Incidents"
                value={metrics?.totalIncidents || 0}
                description={`YTD (${ytdText})`}
              />
              <StatCard
                title="Open Critical & High Incidents Right Now"
                value={openCriticalHighCount}
                className={openCriticalHighCount > 0 ? "bg-red-50 border-red-200" : ""}
              />
              <StatCard
                title="Mean Time to Resolve"
                value={`${Math.round((metrics?.mttr || 0) / 60)} hrs`}
                description={`(p.80 resolution time) YTD (${ytdText})`}
              />
            </>
          )}
        </div>
        
        {/* Recent Critical & High Incidents Section - Reduced vertical margins */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Recent Critical & High Incidents</h2>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-purple hover:text-purple-dark"
              onClick={() => navigate('/incidents')}
            >
              View all
            </Button>
          </div>
          
          {isLoadingIncidents ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[110px] w-full" />
              ))}
            </div>
          ) : recentCriticalHighIncidents?.length === 0 ? (
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-2">All Clear!</h3>
              <p className="text-muted-foreground">
                There are no critical or high severity incidents.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {recentCriticalHighIncidents?.map(incident => (
                <SimplifiedIncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </div>
        
        {/* Incident Trends Chart - With legend moved above the chart */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Incident Trends & Forecast ({today.getFullYear()})</h2>
          
          {/* Chart Legend moved ABOVE the chart */}
          <div className="flex justify-center mb-3">
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[#6E59A5] rounded-sm"></div>
                <span>Current Year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[#9B8DD4] rounded-sm"></div>
                <span>Forecast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[#CCBFED] rounded-sm"></div>
                <span>Last Year</span>
              </div>
            </div>
          </div>
          
          {isLoadingMetrics ? (
            <Skeleton className="h-[280px] w-full" />
          ) : (
            <ChartContainer 
              config={{
                count: { label: "Current Year", color: "#6E59A5" },
                forecast: { label: "Forecast", color: "#9B8DD4" },
                lastYearCount: { label: "Last Year", color: "#CCBFED" }
              }}
              className="h-[280px]" // Reduced height
            >
              <IncidentAreaChart 
                title=""
                data={trendDataWithForecast}
                xAxisKey="month"
                dataKeys={[
                  { key: 'count', color: '#6E59A5', name: 'Current Year' },
                  { key: 'forecast', color: '#9B8DD4', name: 'Forecast', strokeDasharray: "5 5" },
                  { key: 'lastYearCount', color: '#CCBFED', name: 'Last Year' }
                ]}
              />
            </ChartContainer>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
