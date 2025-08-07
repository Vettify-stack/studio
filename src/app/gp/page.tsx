
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
  CalendarCheck,
  FilePlus,
  Pencil,
  History,
  Users,
  Search,
  BookOpen,
  PlusCircle,
  Maximize2,
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
import { Input } from '@/components/ui/input';
import PatientProfile from '@/components/patient-profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PatientCommunication from '@/components/patient-communication';

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
    { id: 'p-1', patientId: 'PT-202408-001', name: 'John Mokoena', lastSeen: '2024-08-14', totalConsults: 3 },
    { id: 'p-2', patientId: 'PT-202407-002', name: 'Sarah Williams', lastSeen: '2024-07-22', totalConsults: 1 },
    { id: 'p-3', patientId: 'PT-202408-003', name: 'Peter Jones', lastSeen: '2024-08-14', totalConsults: 5 },
    { id: 'p-4', patientId: 'PT-202311-004', name: 'Mary Smith', lastSeen: '2023-11-01', totalConsults: 2 },
]

const recentNotes = [
  {
    date: '2025-08-02',
    patient: 'Emily Doe',
    type: 'SOAP',
    summary: 'Routine checkup, patient healthy.',
    status: 'Signed',
  },
  {
    date: '2025-07-26',
    patient: 'David Williams',
    type: 'Follow-up',
    summary: 'Condition improving, continue medication.',
    status: 'Signed',
  },
];

const StatusBadge = ({ status }: { status: Consultation['status'] | 'Signed' }) => {
  const statusConfig: Record<typeof status, { variant: "default" | "secondary" | "destructive" | "outline", className?: string }> = {
    Upcoming: { variant: 'default' },
    Completed: { variant: 'secondary' },
    Cancelled: { variant: 'destructive' },
    Signed: { variant: 'outline', className: 'bg-green-100 text-green-800 border-green-200' },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
};

export default function GpDashboardPage() {
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);

  if (selectedPatient) {
      return <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

        <div className="space-y-6">
            <PatientCommunication />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle>Clinical Notes & Documentation</CardTitle>
            </div>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              New SOAP Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent">
            <TabsList>
              <TabsTrigger value="recent">Recent Notes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="drafts">Drafts (0)</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentNotes.map((note, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <SafeDate dateString={note.date} />
                      </TableCell>
                      <TableCell>{note.patient}</TableCell>
                      <TableCell>{note.type}</TableCell>
                      <TableCell>{note.summary}</TableCell>
                      <TableCell>
                        <StatusBadge status={note.status as 'Signed'} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="templates" className="mt-4">
              <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No templates available.</p>
              </div>
            </TabsContent>
            <TabsContent value="drafts" className="mt-4">
              <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No drafts saved.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Patient Records</CardTitle>
                </div>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name or ID..." className="pl-8 sm:w-[300px]" />
                </div>
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
                <TableHead>Patient ID</TableHead>
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
                  <TableCell>{patient.patientId}</TableCell>
                  <TableCell>
                    <SafeDate dateString={patient.lastSeen} />
                  </TableCell>
                  <TableCell className="text-right">{patient.totalConsults}</TableCell>
                   <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                      View
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
