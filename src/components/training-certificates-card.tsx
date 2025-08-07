
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
import { Button } from './ui/button';
import { UploadCloud, User } from 'lucide-react';

const certificates = [
  { name: 'Cutler Card', provider: 'Islandview Gate', certNo: 'MW85236', expiry: '06 Nov 2024' },
  { name: 'First Aid Certificate', provider: 'Dantran', certNo: 'FA95124', expiry: '12 Aug 2025' },
  { name: 'Induction', provider: 'Platinum Mine', certNo: '74125GF', expiry: '10 Jul 2024' },
  { name: 'Acces Card', provider: 'Platinum Mine', certNo: '4568RFT', expiry: '25 Jul 2024' },
  { name: 'PrDP', provider: 'DOT', certNo: 'PDP789654', expiry: '10 Sep 2025' },
  { name: 'Drivers License', provider: 'DOT', certNo: '12547H7UY52', expiry: '08 Aug 2026' },
  { name: 'Medical Certificate', provider: 'Dr.Williams', certNo: 'MP8521', expiry: '07 May 2025' },
  { name: 'Firefighting Certificate', provider: 'Hazchem', certNo: '9632', expiry: '07 Jul 2025' },
];

export default function TrainingCertificatesCard() {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Training & Certificates</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <UploadCloud className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Manage and track your training certificates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>PROVIDER</TableHead>
                <TableHead>CERTIFICATE NO.</TableHead>
                <TableHead>EXP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{cert.name}</TableCell>
                  <TableCell>{cert.provider}</TableCell>
                  <TableCell>{cert.certNo}</TableCell>
                  <TableCell>{cert.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
