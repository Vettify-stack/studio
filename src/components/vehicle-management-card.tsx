
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
import { Truck, UploadCloud } from 'lucide-react';

const vehicles = [
  {
    regNo: 'ND 123-456',
    type: 'Freightliner Argosy',
    licenseDue: '21-09-2025',
    slpDue: '06-10-2025',
  },
  {
    regNo: 'CA 789-012',
    type: 'Volvo FH16',
    licenseDue: '05-12-2025',
    slpDue: '17-08-2025',
  },
  {
    regNo: 'GP 456-789',
    type: 'Scania R-Series',
    licenseDue: '23-02-2026',
    slpDue: '03-02-2026',
  },
];

export default function VehicleManagementCard() {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vehicle Management</CardTitle>
          <Truck className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>License, SLP, Service due dates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Fleet Status</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>REG NO.</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>LICENSE DUE</TableHead>
                  <TableHead>SLP DUE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.regNo}>
                    <TableCell className="font-medium">
                      {vehicle.regNo}
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.licenseDue}</TableCell>
                    <TableCell>{vehicle.slpDue}</TableCell>
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
