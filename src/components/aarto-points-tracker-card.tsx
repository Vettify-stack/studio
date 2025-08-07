
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ListChecks } from 'lucide-react';

export default function AartoPointsTrackerCard() {
  return (
    <Card className="bg-orange-500 text-white transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AARTO Points Tracker</CardTitle>
          <ListChecks className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-semibold text-lg">Total Points Tracked: 15020</p>
        <p className="text-sm">High Risk Entities: 5</p>
        <Button
          variant="outline"
          className="w-full bg-white/20 border-white/30 hover:bg-white/30 text-white"
        >
          <Eye className="mr-2 h-4 w-4" />
          View AARTO Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
