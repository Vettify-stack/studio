
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
import { Truck } from 'lucide-react';

const vehicleSamples = [
  {
    regNo: 'ND 123-456',
    employer: 'Coastal Haulers',
    licenseDue: '21-09-2025',
    serviceDue: '06-09-2025',
  },
  {
    regNo: 'CA 789-012',
    employer: 'Coastal Haulers',
    licenseDue: '05-12-2025',
    serviceDue: '12-08-2025',
  },
];

export default function VehicleManagementSnippetCard() {
  return (
    <Card className="bg-rose-50 border-rose-100 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vehicle Management Snippet</CardTitle>
          <Truck className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Quick look at vehicle management across entities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-sm font-semibold mb-2">
          Vehicle Management Samples
        </h3>
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>REG NO.</TableHead>
                <TableHead>EMPLOYER</TableHead>
                <TableHead>LICENSE DUE</TableHead>
                <TableHead>SERVICE DUE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleSamples.map((vehicle) => (
                <TableRow key={vehicle.regNo}>
                  <TableCell className="font-medium">{vehicle.regNo}</TableCell>
                  <TableCell>{vehicle.employer}</TableCell>
                  <TableCell>{vehicle.licenseDue}</TableCell>
                  <TableCell>{vehicle.serviceDue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
