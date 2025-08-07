'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill, PlusCircle } from 'lucide-react';

export default function EPrescriptionManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            <CardTitle>E-Prescription Management</CardTitle>
          </div>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Rx
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-center py-12">
        <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">
                Quickly create, sign, and send electronic prescriptions.
            </p>
            <Button size="lg">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New E-Prescription
            </Button>
            <p className="text-xs text-muted-foreground">
                Recent: Amoxicillin 250mg...
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
