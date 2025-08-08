
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase } from 'lucide-react';
import SafeDate from './safe-date';

const jobListings = [
  {
    title: 'Long-Haul Truck Driver',
    status: 'Open',
    applications: 15,
    postedDate: '2025-07-31',
  },
  {
    title: 'Local Delivery Driver',
    status: 'Closed',
    applications: 32,
    postedDate: '2025-07-08',
  },
];

const StatusBadge = ({ status }: { status: 'Open' | 'Closed' }) => {
  const colorClass = {
    Open: 'bg-green-100 text-green-800 border-green-200',
    Closed: 'bg-gray-100 text-gray-800 border-gray-200',
  }[status];

  return (
    <Badge variant="outline" className={`capitalize ${colorClass}`}>
      {status}
    </Badge>
  );
};

export default function JobPostingCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Jobs Posted/Posting</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
            <Button variant="ghost" size="icon">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <CardDescription>Manage current job openings.</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-2">Job Listings</h3>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TITLE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>APPLICATIONS</TableHead>
                <TableHead>POSTED</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobListings.map((job) => (
                <TableRow key={job.title}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>
                    <StatusBadge status={job.status} />
                  </TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell>
                    <SafeDate dateString={job.postedDate} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
