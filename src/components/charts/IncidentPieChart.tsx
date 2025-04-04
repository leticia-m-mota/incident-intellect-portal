
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface IncidentPieChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  className?: string;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
}

export function IncidentPieChart({ 
  title, 
  data,
  className,
  legendPosition = 'bottom'
}: IncidentPieChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [value, 'Count']}
              />
              <Legend 
                verticalAlign={legendPosition === 'top' || legendPosition === 'bottom' ? legendPosition : 'bottom'} 
                align={legendPosition === 'left' || legendPosition === 'right' ? legendPosition : 'center'} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
