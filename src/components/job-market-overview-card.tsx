
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Briefcase } from 'lucide-react';
import SafeDate from './safe-date';

const pendingJobs = [
  {
    id: 'JP003',
    title: 'Fleet Manager',
    postedBy: 'XYZ Logistics',
    date: '2025-08-05',
  },
  {
    id: 'JP004',
    title: 'Cross-Border Driver',
    postedBy: 'XYZ Logistics',
    date: '2025-08-06',
  },
];

export default function JobMarketOverviewCard() {
  return (
    <Card className="bg-yellow-50 border-yellow-100 transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-yellow-900">Job Market Overview</CardTitle>
          <Briefcase className="h-5 w-5 text-yellow-700" />
        </div>
        <CardDescription className="text-yellow-800">
          Overview of pending jobs and successful placements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-2 bg-yellow-100">
            <TabsTrigger value="pending">Jobs Pending</TabsTrigger>
            <TabsTrigger value="placements">Job Placements</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4">
            <h3 className="font-semibold mb-2 text-yellow-900">Pending Jobs</h3>
            <div className="border rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>JOB ID</TableHead>
                    <TableHead>TITLE</TableHead>
                    <TableHead>POSTED BY</TableHead>
                    <TableHead>DATE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.postedBy}</TableCell>
                      <TableCell>
                        <SafeDate dateString={job.date} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="placements" className="mt-4">
            <div className="text-center p-8 border-2 border-dashed border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                Job placement data will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
