
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
import { Users, UploadCloud } from 'lucide-react';

const drivers = [
  {
    name: 'John Doe',
    license: '03-02-2026',
    prdp: '05-11-2025',
    medical: '06-09-2025',
    fire: '05-10-2024',
  },
  {
    name: 'Jane Smith',
    license: '03-06-2026',
    prdp: '14-04-2026',
    medical: '05-12-2025',
    fire: '28-09-2024',
  },
  {
    name: 'Mike Ross',
    license: '28-07-2025',
    prdp: '12-08-2025',
    medical: '02-08-2025',
    fire: '05-01-2025',
  },
  {
    name: 'Sarah Connor',
    license: '20-12-2026',
    prdp: '31-10-2026',
    medical: '23-06-2026',
    fire: '14-11-2024',
  },
];

export default function DriverComplianceOverview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Driver Compliance</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Key expiry dates for all drivers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Driver Status</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DRIVER</TableHead>
                  <TableHead>LICENSE</TableHead>
                  <TableHead>PRDP</TableHead>
                  <TableHead>MEDICAL</TableHead>
                  <TableHead>FIRE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.name}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.license}</TableCell>
                    <TableCell>{driver.prdp}</TableCell>
                    <TableCell>{driver.medical}</TableCell>
                    <TableCell>{driver.fire}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="font-semibold mb-1">
            Drag 'n' drop files here, or click to select
          </p>
          <p className="text-xs text-muted-foreground">
            Max 5 files. Accepted: PDF, DOCX, JPG, PNG (Max 5MB each)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
