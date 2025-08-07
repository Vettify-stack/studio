
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, User, Phone, Calendar, Stethoscope, FileText } from 'lucide-react';
import SafeDate from './safe-date';

interface Patient {
    id: string;
    patientId: string;
    name: string;
    lastSeen: string;
    totalConsults: number;
}

interface PatientProfileProps {
    patient: Patient;
    onBack: () => void;
}

export default function PatientProfile({ patient, onBack }: PatientProfileProps) {
    return (
        <div className="space-y-6">
            <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Patient List
            </Button>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="person portrait" />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{patient.name}</CardTitle>
                            <CardDescription>Patient ID: {patient.patientId}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.name}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>082 123 4567 (placeholder)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Last Seen: <SafeDate dateString={patient.lastSeen} /></span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                            <span>Total Consultations: {patient.totalConsults}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Appointment History</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">No appointment history to display.</p>
                   </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Doctor's Notes</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">No notes available.</p>
                   </div>
                </CardContent>
            </Card>
        </div>
    )
}
