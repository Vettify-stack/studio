
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, TrendingUp } from 'lucide-react';

export default function PlatformOverviewCard() {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1 h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Platform Overview</CardTitle>
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground">
          <p>Active Users: 1250, Companies: 85, Associations: 15, Verifications</p>
          <p>Today: 75, Overall Compliance Rate: 88%</p>
        </div>
        <Button variant="outline" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          View Full Platform Report
        </Button>
      </CardContent>
    </Card>
  );
}
