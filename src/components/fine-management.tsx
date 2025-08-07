
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
import { Button } from '@/components/ui/button';
import { AlertTriangle, CreditCard, Download, ShieldAlert } from 'lucide-react';

const fines = [
    {
        fineNumber: '123456789',
        date: '2025-06-06',
        offence: 'Drive right through stop Sign',
        amount: 150,
    }
]

export default function FineManagementCard() {
  return (
    <Card className="bg-destructive/80 text-destructive-foreground">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>Fine Management</CardTitle>
            <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <AlertTriangle className="h-4 w-4" />
            </div>
        </div>
        <CardDescription className="text-destructive-foreground/80">
          View and manage outstanding fines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Outstanding Fines</h4>
        <div className="border rounded-lg border-destructive-foreground/20">
            <Table>
                <TableHeader>
                    <TableRow className="border-b-destructive-foreground/20 hover:bg-transparent">
                        <TableHead className="text-destructive-foreground/80">FINE NUMBER</TableHead>
                        <TableHead className="text-destructive-foreground/80">DATE</TableHead>
                        <TableHead className="text-destructive-foreground/80">OFFENCE</TableHead>
                        <TableHead className="text-destructive-foreground/80 text-right">AMOUNT</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fines.map((fine, index) => (
                        <TableRow key={index} className="border-b-destructive-foreground/20 hover:bg-transparent">
                            <TableCell>{fine.fineNumber}</TableCell>
                            <TableCell>{fine.date}</TableCell>
                            <TableCell>{fine.offence}</TableCell>
                            <TableCell className="text-right">R {fine.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
            </Button>
            <Button variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <ShieldAlert className="mr-2 h-4 w-4" />
                Dispute Selected
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
