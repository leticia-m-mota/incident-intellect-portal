
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface IncidentAreaChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKeys: Array<{ key: string, color: string, name: string, strokeDasharray?: string }>;
  xAxisKey: string;
  className?: string;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
}

export function IncidentAreaChart({ 
  title, 
  data, 
  dataKeys, 
  xAxisKey,
  className,
  legendPosition = 'bottom'
}: IncidentAreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #E4E4E4',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Legend 
                verticalAlign={legendPosition === 'top' || legendPosition === 'bottom' ? legendPosition : 'bottom'} 
                align={legendPosition === 'left' || legendPosition === 'right' ? legendPosition : 'center'} 
                wrapperStyle={{ 
                  paddingTop: legendPosition === 'bottom' ? '10px' : '0',
                  paddingBottom: legendPosition === 'top' ? '10px' : '0'
                }}
              />
              {dataKeys.map((dataKey, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={dataKey.key}
                  name={dataKey.name}
                  stroke={dataKey.color}
                  fill={dataKey.color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                  strokeDasharray={dataKey.strokeDasharray}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
