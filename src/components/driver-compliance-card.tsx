
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
import type { Certificate } from '@/lib/types';
import { differenceInDays, parse } from 'date-fns';

interface DriverComplianceCardProps {
    certificates: Certificate[];
    requiredDocuments: string[];
}

export default function DriverComplianceCard({ certificates, requiredDocuments }: DriverComplianceCardProps) {
  
  const getStatusForDocument = (docName: string) => {
    const cert = certificates.find(c => c.name === docName);
    if (!cert) {
        return { text: 'Missing', color: 'bg-gray-100 text-gray-800' };
    }
    try {
        const expiry = parse(cert.expiry, 'dd MMM yyyy', new Date());
        const daysLeft = differenceInDays(expiry, new Date());

        if (daysLeft < 0) return { text: 'Expired', color: 'bg-red-100 text-red-800' };
        if (daysLeft <= 30) return { text: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
        return { text: 'Valid', color: 'bg-green-100 text-green-800' };
    } catch {
        return { text: 'Invalid Date', color: 'bg-gray-100 text-gray-800' };
    }
  }

  const validDocs = requiredDocuments.filter(doc => getStatusForDocument(doc).text === 'Valid').length;
  const compliancePercentage = Math.round((validDocs / requiredDocuments.length) * 100);

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
              <span className="text-sm font-bold">{compliancePercentage}%</span>
            </div>
            <Progress value={compliancePercentage} className="h-2 bg-primary-foreground/20 [&>div]:bg-accent" />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Compliance Items</h4>
            <div className="border rounded-lg max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-primary z-10">
                  <TableRow className="border-b-primary-foreground/20 hover:bg-transparent">
                    <TableHead className="text-primary-foreground/80">ITEM</TableHead>
                    <TableHead className="text-primary-foreground/80">EXPIRY DATE</TableHead>
                    <TableHead className="text-primary-foreground/80">STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requiredDocuments.map((docName) => {
                    const cert = certificates.find(c => c.name === docName);
                    const status = getStatusForDocument(docName);
                    return (
                        <TableRow key={docName} className="border-b-primary-foreground/20 hover:bg-transparent">
                        <TableCell className="font-medium">{docName}</TableCell>
                        <TableCell>{cert?.expiry || 'N/A'}</TableCell>
                        <TableCell>
                            <Badge variant="secondary" className={`${status.color} hover:${status.color}`}>
                            {status.text}
                            </Badge>
                        </TableCell>
                        </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
