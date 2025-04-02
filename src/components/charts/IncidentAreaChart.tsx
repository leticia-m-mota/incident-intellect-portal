
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
}

export function IncidentAreaChart({ 
  title, 
  data, 
  dataKeys, 
  xAxisKey,
  className 
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
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
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
