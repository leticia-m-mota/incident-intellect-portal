
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface IncidentTableProps {
  incidents: Incident[];
}

export function IncidentTable({ incidents }: IncidentTableProps) {
  const navigate = useNavigate();
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[120px]">Severity</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[180px]">Team</TableHead>
            <TableHead className="w-[150px]">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No incidents found matching the filters
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((incident) => (
              <TableRow 
                key={incident.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/incidents/${incident.id}`)}
              >
                <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                <TableCell className="font-medium">{incident.title}</TableCell>
                <TableCell>
                  <IncidentSeverityBadge severity={incident.severity} />
                </TableCell>
                <TableCell>
                  <IncidentStatusBadge status={incident.status} />
                </TableCell>
                <TableCell>{incident.ownerTeam}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
