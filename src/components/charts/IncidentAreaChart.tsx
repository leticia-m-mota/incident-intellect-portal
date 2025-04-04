
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

interface DataKey {
  key: string;
  color: string;
  name: string;
  strokeDasharray?: string;
}

interface IncidentAreaChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKeys: Array<DataKey>;
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
      <CardHeader className="pb-0 pt-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-1">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 25,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend 
                verticalAlign={legendPosition === 'top' || legendPosition === 'bottom' ? legendPosition : 'bottom'} 
                align={legendPosition === 'left' || legendPosition === 'right' ? legendPosition : 'center'} 
              />
              {dataKeys.map((dataKey, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={dataKey.key}
                  name={dataKey.name}
                  stackId={dataKey.key === 'lastYearCount' ? undefined : "1"}
                  stroke={dataKey.color}
                  fill={dataKey.key === 'lastYearCount' ? "transparent" : `${dataKey.color}80`}
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
