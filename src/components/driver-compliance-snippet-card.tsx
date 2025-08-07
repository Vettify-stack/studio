
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from './ui/button';
import { UploadCloud, Users } from 'lucide-react';

const complianceItems = [
  { driver: 'Macdonald Williams', item: 'Dangerous Goods Certificate', expiry: '01 Jan 2024' },
  { driver: 'Super Admin', item: 'Cutler Card', expiry: '06 Mar 2025' },
  { driver: 'Super Admin', item: 'Medical Certificate', expiry: '07 Mar 2025' },
  { driver: 'Super Admin', item: 'First Aid Certificate', expiry: '12 Apr 2025' },
  { driver: 'Macdonald Williams', item: 'Medical Certificate', expiry: '01 Jul 2025' },
];

export default function DriverComplianceSnippetCard() {
  const compliancePercentage = 38;

  return (
    <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Driver Compliance Snippet</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <UploadCloud className="h-5 w-5" />
            <Users className="h-5 w-5" />
          </div>
        </div>
        <CardDescription>
          Real-time compliance overview across all drivers and entities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-sm font-medium">Platform Compliance</p>
              <p className="text-lg font-bold">{compliancePercentage}%</p>
            </div>
            <Progress value={compliancePercentage} className="h-2 [&>div]:bg-red-500" />
          </div>
          <div>
            <h4 className="font-semibold text-muted-foreground mb-2">Driver Compliance Overview</h4>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DRIVER</TableHead>
                    <TableHead>ITEM</TableHead>
                    <TableHead>EXPIRY DATE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.driver}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
