
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ListChecks } from 'lucide-react';
import SafeDate from './safe-date';

export default function CompanyComplianceCard() {
    const compliancePercentage = 85;
    
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Company Compliance</CardTitle>
          <ShieldCheck className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <p className="text-sm">Overall Compliance</p>
                <p className="text-2xl font-bold">{compliancePercentage}%</p>
            </div>
            <Progress value={compliancePercentage} className="h-2 bg-primary-foreground/20 [&>div]:bg-accent" />
        </div>
        <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
                <span>Status:</span>
                <Badge variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">Good</Badge>
            </div>
            <p>Last Audit: <SafeDate dateString={'2025-06-08'} /></p>
        </div>
        <Button variant="outline" className="w-full bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20">
            <ListChecks className="mr-2 h-4 w-4" />
            View Details
        </Button>
      </CardContent>
    </Card>
  );
}
