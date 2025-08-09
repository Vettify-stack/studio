
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
  Search,
  ArrowLeft,
  Pill,
  MessageSquare,
  BarChart,
  ShieldAlert,
  ClipboardCheck,
  PlusCircle,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Consultation } from '@/lib/types';
import SafeDate from '@/components/safe-date';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PatientProfile from '@/components/patient-profile';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import EPrescriptionManagement from '@/components/e-prescription-management';
import PatientCommunication from '@/components/patient-communication';
import ReportingAnalytics from '@/components/reporting-analytics';
import SystemComplianceCard from '@/components/system-compliance-card';
import NosyCorner from '@/components/nosy-corner';

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
    patientName: 'Thandi Ndlovu',
    time: '16:00',
    date: '2024-08-15',
    status: 'Upcoming',
  },
    {
    id: 'appt-3',
    patientName: 'Pieter van der Merwe',
    time: '10:00',
    date: '2024-08-14',
    status: 'Completed',
  },
];

const patients = [
    { id: '1', patientId: 'PT-20250807-001', name: 'John Mokoena', lastSeen: '2024-08-15', totalConsults: 5 },
    { id: '2', patientId: 'PT-20250807-002', name: 'Thandi Ndlovu', lastSeen: '2024-08-15', totalConsults: 2 },
    { id: '3', patientId: 'PT-20250807-003', name: 'Pieter van der Merwe', lastSeen: '2024-08-14', totalConsults: 8 },
    { id: '4', patientId: 'PT-20250807-004', name: 'Ayesha Patel', lastSeen: '2024-07-21', totalConsults: 3 },
]

const notes = [
    { id: '1', date: '2024-08-15', patient: 'John Mokoena', type: 'SOAP', summary: 'Follow-up for hypertension management...', status: 'Signed' },
    { id: '2', date: '2024-08-14', patient: 'Pieter van der Merwe', type: 'Consult', summary: 'Patient presents with flu-like symptoms...', status: 'Draft' },
]


const StatusBadge = ({ status }: { status: Consultation['status'] }) => {
  const statusConfig: Record<typeof status, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
    Upcoming: { variant: 'default' },
    Completed: { variant: 'secondary' },
    Cancelled: { variant: 'destructive' },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{status}</Badge>;
};

const NoteStatusBadge = ({ status }: { status: string }) => {
    const colorClass = {
        Signed: 'bg-green-100 text-green-800 border-green-200',
        Draft: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }[status];

    return (
        <Badge variant="outline" className={`capitalize ${colorClass}`}>
            {status}
        </Badge>
    );
};

export default function GpDashboardPage() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    
    if (selectedPatient) {
        return <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>GP Dashboard</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Manage your virtual medical consultations.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                        <h3 className="font-semibold text-2xl">2</h3>
                        <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    </div>
                     <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                        <h3 className="font-semibold text-2xl">1</h3>
                        <p className="text-sm text-muted-foreground">Pending Notes</p>
                    </div>
                     <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                        <h3 className="font-semibold text-2xl">3</h3>
                        <p className="text-sm text-muted-foreground">Follow-ups Due</p>
                    </div>
                </CardContent>
            </Card>
            <EPrescriptionManagement />
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ClipboardCheck className="h-6 w-6 text-primary" />
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
                            <TabsTrigger value="drafts">Drafts</TabsTrigger>
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
                                    {notes.map((note) => (
                                        <TableRow key={note.id}>
                                            <TableCell><SafeDate dateString={note.date} /></TableCell>
                                            <TableCell>{note.patient}</TableCell>
                                            <TableCell>{note.type}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{note.summary}</TableCell>
                                            <TableCell><NoteStatusBadge status={note.status} /></TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                        <TabsContent value="templates" className="mt-4 text-center text-muted-foreground p-8 border rounded-lg">
                            <p>No templates available.</p>
                        </TabsContent>
                        <TabsContent value="drafts" className="mt-4 text-center text-muted-foreground p-8 border rounded-lg">
                             <p>No drafts available.</p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Patient Records</CardTitle>
                        <div className="relative w-full max-w-xs">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search by name, ID, or Patient ID" className="pl-8" />
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
                                <TableHead>Patient ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Last Seen</TableHead>
                                <TableHead>Total Consults</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.patientId}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell><SafeDate dateString={patient.lastSeen}/></TableCell>
                                    <TableCell>{patient.totalConsults}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient as any)}>View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
        <div className="space-y-6">
            <NosyCorner />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <PatientCommunication />
          <ReportingAnalytics />
          <SystemComplianceCard />
      </div>
    </div>
  );
}
