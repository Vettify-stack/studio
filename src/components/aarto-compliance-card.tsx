'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, AlertCircle } from 'lucide-react';

export default function AartoComplianceCard() {
  return (
    <Card className="bg-orange-500 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AARTO Compliance</CardTitle>
          <CheckSquare className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-semibold">Total Points: 12, At Risk Drivers: 2</p>
        <Button
          variant="outline"
          className="w-full bg-white/20 border-white/30 hover:bg-white/30 text-white"
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          View AARTO Report
        </Button>
      </CardContent>
    </Card>
  );
}
