
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
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-all hover:shadow-lg hover:-translate-y-1 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overall Compliance</CardTitle>
          <ShieldAlert className="h-5 w-5" />
        </div>
        <CardDescription className="text-blue-100">
          Compliance status of all companies & associations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Entity Compliance Scores</h3>
        <div className="border rounded-lg border-blue-400/50 bg-blue-500/50">
          <Table>
            <TableHeader>
              <TableRow className="border-b-blue-400/50 hover:bg-blue-400/30">
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
                  className="border-b-blue-400/50 last:border-b-0 hover:bg-blue-400/30"
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
