
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function GpsTrackingCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>GPS Vehicle Tracking</CardTitle>
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Real-time vehicle monitoring and history.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <div className="text-center p-8 border-2 border-dashed rounded-lg h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Map view will be displayed here.</p>
       </div>
      </CardContent>
    </Card>
  );
}
