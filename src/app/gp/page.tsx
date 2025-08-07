
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Video,
  User,
  Clock,
  Check,
  MoreVertical,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Consultation } from '@/lib/types';
import SafeDate from '@/components/safe-date';
import EPrescriptionManagement from '@/components/e-prescription-management';
import PatientCommunication from '@/components/patient-communication';
import ReportingAnalytics from '@/components/reporting-analytics';
import SystemComplianceCard from '@/components/system-compliance-card';

const consultations: Consultation[] = [
  {
    id: 'appt-1',
    patientName: 'John Mokoena',
    time: '14:00',
    date: '2024-08-15',
    status: 'Upcoming',
  },
  {
    id: 'appt-2',
    patientName: 'Sarah Williams',
    time: '16:00',
    date: '2024-08-15',
    status: 'Upcoming',
  },
    {
    id: 'appt-3',
    patientName: 'Peter Jones',
    time: '10:00',
    date: '2024-08-14',
    status: 'Completed',
  },
];


const StatusBadge = ({ status }: { status: Consultation['status'] }) => {
  const statusConfig: Record<typeof status, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
    Upcoming: { variant: 'default' },
    Completed: { variant: 'secondary' },
    Cancelled: { variant: 'destructive' },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{status}</Badge>;
};

export default function GpDashboardPage() {
  
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>GP Dashboard</CardTitle>
          <CardDescription>
            Manage your virtual medical consultations.
          </CardDescription>
        </CardHeader>
      </Card>

      <EPrescriptionManagement />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle>Scheduled Consultations</CardTitle>
                <CardDescription>
                A list of your upcoming and past appointments.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {consultations.map((consult) => (
                <div
                    key={consult.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4 gap-4"
                >
                    <div className="flex-1 grid gap-1">
                    <p className="font-semibold flex items-center gap-2">
                        <User className="h-4 w-4" /> {consult.patientName}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" /> <SafeDate dateString={consult.date} /> at {consult.time}
                    </p>
                    </div>
                    <div className="flex items-center gap-2">
                    <StatusBadge status={consult.status} />
                    {consult.status === 'Upcoming' && (
                        <Button size="sm">
                        <Video className="mr-2 h-4 w-4" /> Start Call
                        </Button>
                    )}
                    {consult.status === 'Completed' && (
                        <Button size="sm" variant="outline">
                        <Check className="mr-2 h-4 w-4" /> View Notes
                        </Button>
                    )}
                    <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
                ))}
            </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <PatientCommunication />
            <ReportingAnalytics />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            Access and manage your patient records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Patient records will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
      
      <SystemComplianceCard />
    </div>
  );
}
