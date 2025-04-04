
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface IncidentBarChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKeys: Array<{ key: string, color: string, name: string }>;
  xAxisKey: string;
  className?: string;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
}

export function IncidentBarChart({ 
  title, 
  data, 
  dataKeys, 
  xAxisKey,
  className,
  legendPosition = 'bottom'
}: IncidentBarChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign={legendPosition === 'top' || legendPosition === 'bottom' ? legendPosition : 'bottom'} 
                     align={legendPosition === 'left' || legendPosition === 'right' ? legendPosition : 'center'} />
              {dataKeys.map((dataKey, index) => (
                <Bar
                  key={index}
                  dataKey={dataKey.key}
                  name={dataKey.name}
                  fill={dataKey.color}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
