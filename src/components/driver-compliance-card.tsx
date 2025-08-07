
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

const complianceItems = [
  { item: "Driver's License", expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'PrDP', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'Medical Certificate', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'First Aid', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'Firefighting', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'Dangerous Goods', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'Work Permit', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'Access Card', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
  { item: 'Criminal Clearance', expiry: 'N/A', renewal: 'N/A', status: 'N/A' },
];

export default function DriverComplianceCard() {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Driver Compliance</CardTitle>
          <ShieldCheck className="h-6 w-6" />
        </div>
        <CardDescription className="text-primary-foreground/80">
          Overview of your compliance status for essential documents, permits,
          and certificates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-semibold">Overall Compliance</h4>
              <span className="text-sm font-bold">100%</span>
            </div>
            <Progress value={100} className="h-2 bg-primary-foreground/20 [&>div]:bg-accent" />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Compliance Items</h4>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-primary-foreground/20 hover:bg-transparent">
                    <TableHead className="text-primary-foreground/80">ITEM</TableHead>
                    <TableHead className="text-primary-foreground/80">EXPIRY DATE</TableHead>
                    <TableHead className="text-primary-foreground/80">RENEWAL IN</TableHead>
                    <TableHead className="text-primary-foreground/80">STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceItems.map((compliance) => (
                    <TableRow key={compliance.item} className="border-b-primary-foreground/20 hover:bg-transparent">
                      <TableCell className="font-medium">{compliance.item}</TableCell>
                      <TableCell>{compliance.expiry}</TableCell>
                      <TableCell>{compliance.renewal}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                          {compliance.status}
                        </Badge>
                      </TableCell>
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
