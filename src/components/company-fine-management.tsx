
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
import { AlertTriangle, CreditCard, ShieldAlert, UploadCloud } from 'lucide-react';
import SafeDate from './safe-date';
import { Button } from './ui/button';

const fines = [
  {
    id: 'CF001',
    subject: 'John Doe',
    date: '2025-07-28',
    offence: 'Speeding',
    amount: 'R 500.00',
  },
  {
    id: 'CF002',
    subject: '-',
    date: '2025-07-18',
    offence: 'Overloading',
    amount: 'R 2500.00',
  },
];

export default function CompanyFineManagement() {
  return (
    <Card className="bg-destructive/80 text-destructive-foreground">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Fine Management</CardTitle>
          <AlertTriangle className="h-5 w-5" />
        </div>
        <CardDescription className="text-destructive-foreground/80">
          Company and driver fines.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Company & Driver Fines</h3>
          <div className="border rounded-lg border-destructive-foreground/20">
            <Table>
              <TableHeader>
                <TableRow className="border-b-destructive-foreground/20 hover:bg-transparent">
                  <TableHead className="text-destructive-foreground/80">
                    ID
                  </TableHead>
                  <TableHead className="text-destructive-foreground/80">
                    SUBJECT
                  </TableHead>
                  <TableHead className="text-destructive-foreground/80">
                    DATE
                  </TableHead>
                  <TableHead className="text-destructive-foreground/80">
                    OFFENCE
                  </TableHead>
                  <TableHead className="text-destructive-foreground/80 text-right">
                    AMOUNT
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fines.map((fine) => (
                  <TableRow
                    key={fine.id}
                    className="border-b-destructive-foreground/20 last:border-b-0 hover:bg-transparent"
                  >
                    <TableCell>{fine.id}</TableCell>
                    <TableCell>{fine.subject}</TableCell>
                    <TableCell>
                      <SafeDate dateString={fine.date} />
                    </TableCell>
                    <TableCell>{fine.offence}</TableCell>
                    <TableCell className="text-right">{fine.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
            </Button>
            <Button variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <ShieldAlert className="mr-2 h-4 w-4" />
                Dispute Selected
            </Button>
        </div>

        <div className="border-2 border-dashed border-destructive-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <UploadCloud className="h-10 w-10 text-destructive-foreground/80 mb-4" />
          <p className="font-semibold mb-1 text-destructive-foreground">
            Drag 'n' drop files here, or click to select
          </p>
          <p className="text-xs text-destructive-foreground/80">
            Max 5 files. Accepted: PDF, DOCX, JPG, PNG (Max 5MB each)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
