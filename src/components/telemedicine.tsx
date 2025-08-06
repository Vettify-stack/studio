
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
import { HeartPulse, Video, FileText, ClipboardList } from 'lucide-react';

export default function Telemedicine() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <CardTitle>Telemedicine</CardTitle>
        </div>
        <CardDescription>
          Access virtual healthcare services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consultation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultation">
              <Video className="mr-2 h-4 w-4" />
              Consult
            </TabsTrigger>
            <TabsTrigger value="prescriptions">
              <FileText className="mr-2 h-4 w-4" />
              Scripts
            </TabsTrigger>
            <TabsTrigger value="notes">
              <ClipboardList className="mr-2 h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="consultation" className="mt-4">
            <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-4">
                    Book a virtual consultation with a registered doctor.
                </p>
                <Button>Request Consultation</Button>
            </div>
          </TabsContent>
          <TabsContent value="prescriptions" className="mt-4">
            <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">
                    No e-prescriptions found.
                </p>
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">
                    No doctor's notes found.
                </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
