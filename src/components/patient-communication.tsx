
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Badge } from './ui/badge';

const communications = [
    {
        name: 'Emily Doe',
        status: 'Read',
        message: 'Thank you, Doctor!',
        time: '10:30 AM'
    },
    {
        name: 'John Wilson',
        status: 'Delivered',
        message: 'Appointment reminder: Tomorrow at 2 PM.',
        time: 'Yesterday'
    }
]


const StatusBadge = ({ status }: { status: string }) => {
    const colorClass = {
        Read: 'bg-green-100 text-green-800 border-green-200',
        Delivered: 'bg-gray-200 text-gray-800 border-gray-300'
    }[status];

    return (
        <Badge variant="outline" className={`capitalize ${colorClass}`}>
            {status}
        </Badge>
    );
};


export default function PatientCommunication() {
  return (
    <Card className="bg-rose-50 border-rose-200 text-rose-900">
      <CardHeader>
        <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <CardTitle>Patient Communication</CardTitle>
        </div>
        <CardDescription className="text-rose-800/90">
            Manage and respond to patient messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="whatsapp">
            <TabsList className="grid w-full grid-cols-2 bg-rose-100/80">
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="sms">SMS/Email</TabsTrigger>
            </TabsList>
            <TabsContent value="whatsapp" className="mt-4 space-y-6">
                <div className="space-y-4">
                    {communications.map((comm, index) => (
                        <div key={index} className="flex flex-col gap-1 border-b pb-4 last:border-b-0 border-rose-200">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{comm.name}</p>
                                <StatusBadge status={comm.status} />
                            </div>
                            <p className="text-sm text-rose-800/80">{comm.message} - {comm.time}</p>
                        </div>
                    ))}
                </div>
                 <Button variant="outline" className="w-full">Open WhatsApp Web</Button>
                 <p className="text-xs text-center text-rose-800/80">
                    Select a patient from 'Patient Records' to enable sick note forwarding.
                </p>
            </TabsContent>
            <TabsContent value="sms" className="mt-4">
                 <div className="text-center p-8 border-2 border-dashed rounded-lg border-rose-200">
                    <p className="text-rose-800/80">No SMS/Email messages.</p>
                </div>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
