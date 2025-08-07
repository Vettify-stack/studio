
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
import { ShieldAlert } from 'lucide-react';

const entities = [
  {
    name: 'ABC Transport',
    type: 'Company',
    score: 95,
    region: 'Gauteng',
  },
  {
    name: 'Coastal Haulers',
    type: 'Company',
    score: 78,
    region: 'Western Cape',
  },
  {
    name: 'Metro Taxi Assoc',
    type: 'Association',
    score: 82,
    region: 'KZN',
  },
];

export default function OverallComplianceCard() {
  return (
    <Card className="bg-sky-500 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overall Compliance</CardTitle>
          <ShieldAlert className="h-5 w-5" />
        </div>
        <CardDescription className="text-sky-100">
          Compliance status of all companies & associations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Entity Compliance Scores</h3>
        <div className="border rounded-lg border-sky-300/50">
          <Table>
            <TableHeader>
              <TableRow className="border-b-sky-300/50 hover:bg-sky-400/50">
                <TableHead className="text-white">ENTITY</TableHead>
                <TableHead className="text-white">TYPE</TableHead>
                <TableHead className="text-white">SCORE (%)</TableHead>
                <TableHead className="text-white">REGION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entities.map((entity) => (
                <TableRow
                  key={entity.name}
                  className="border-b-sky-300/50 last:border-b-0 hover:bg-sky-400/50"
                >
                  <TableCell className="font-medium">{entity.name}</TableCell>
                  <TableCell>{entity.type}</TableCell>
                  <TableCell>{entity.score}</TableCell>
                  <TableCell>{entity.region}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
