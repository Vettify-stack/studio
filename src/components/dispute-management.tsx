'use client';

import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

const disputes = [
  {
    id: '1',
    fineId: 'FN-12345',
    date: '2024-05-15',
    status: 'Submitted',
    vehicle: 'GP 789-BCE',
  },
  {
    id: '2',
    fineId: 'FN-67890',
    date: '2024-06-01',
    status: 'In Review',
    vehicle: 'KZN 555-LMN',
  },
];

export default function DisputeManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>My Disputes</CardTitle>
            <CardDescription>
              Track and manage your AARTO disputes.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Dispute
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fine ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell className="font-medium">{dispute.fineId}</TableCell>
                <TableCell>{dispute.vehicle}</TableCell>
                <TableCell>{dispute.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      dispute.status === 'Submitted' ? 'secondary' : 'default'
                    }
                  >
                    {dispute.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
