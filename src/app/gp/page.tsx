
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
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Consultation } from '@/lib/types';
import SafeDate from '@/components/safe-date';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

const patients = [
    { id: 'p-1', name: 'John Mokoena', lastSeen: '2024-08-14', totalConsults: 3 },
    { id: 'p-2', name: 'Sarah Williams', lastSeen: '2024-07-22', totalConsults: 1 },
    { id: 'p-3', name: 'Peter Jones', lastSeen: '2024-08-14', totalConsults: 5 },
    { id: 'p-4', name: 'Mary Smith', lastSeen: '2023-11-01', totalConsults: 2 },
]

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

      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>View Patients</CardTitle>
            </div>
          <CardDescription>
            Access and manage your patient records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead className="text-right">Consults</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                         <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="person portrait" />
                         <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{patient.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SafeDate dateString={patient.lastSeen} />
                  </TableCell>
                  <TableCell className="text-right">{patient.totalConsults}</TableCell>
                   <TableCell>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
