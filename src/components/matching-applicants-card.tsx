
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
import { User } from 'lucide-react';

const matchedDrivers = [
  {
    name: 'Sarah Connor',
    experience: '5 Years Long-Haul',
    matchPercentage: 92,
    contact: 's.connor@example.com',
  },
  {
    name: 'Kyle Reese',
    experience: '3 Years Local Delivery',
    matchPercentage: 88,
    contact: 'k.reese@example.com',
  },
];

export default function MatchingApplicantsCard() {
  return (
    <Card className="bg-rose-50 border-rose-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Matched Drivers</CardTitle>
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Drivers matching your company requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-sm font-semibold mb-2">Potential Hires</h3>
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>EXPERIENCE</TableHead>
                <TableHead>MATCH %</TableHead>
                <TableHead>CONTACT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchedDrivers.map((driver) => (
                <TableRow key={driver.name}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.experience}</TableCell>
                  <TableCell>{driver.matchPercentage}%</TableCell>
                  <TableCell>{driver.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
