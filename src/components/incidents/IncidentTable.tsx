
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { IncidentSeverityBadge } from './IncidentSeverityBadge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { Incident, SeverityLevel, IncidentStatus } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface IncidentTableProps {
  incidents: Incident[];
}

export function IncidentTable({ incidents }: IncidentTableProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = 
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        
        <div className="flex gap-4">
          <Select
            value={filterSeverity}
            onValueChange={setFilterSeverity}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="identified">Identified</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
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
            {filteredIncidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No incidents found matching the filters
                </TableCell>
              </TableRow>
            ) : (
              filteredIncidents.map((incident) => (
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
    </div>
  );
}
