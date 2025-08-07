
'use client';

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
  CalendarCheck,
  FilePlus,
  Pencil,
  History,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Consultation } from '@/lib/types';
import SafeDate from '@/components/safe-date';

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
  const variant = status === 'Upcoming' ? 'default' : 'secondary';
  return <Badge variant={variant}>{status}</Badge>;
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

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>A summary of your key activities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Appointments
                </CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  1 completed, 1 upcoming
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Notes
                </CardTitle>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                 <p className="text-xs text-muted-foreground">
                  From yesterday's consults
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Follow-ups Due
                </CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                 <p className="text-xs text-muted-foreground">
                  This week
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1">
              <FilePlus className="mr-2 h-4 w-4" /> New Note
            </Button>
            <Button variant="outline" className="flex-1">
              <History className="mr-2 h-4 w-4" /> Schedule Follow-up
            </Button>
          </div>
        </CardContent>
      </Card>


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
  );
}
