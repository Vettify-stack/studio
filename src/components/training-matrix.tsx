
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
import {
  BarChartHorizontal,
  CheckCircle2,
  View,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const entities = [
  { name: 'ABC Transport', compliant: 48, total: 50, rate: 96 },
  { name: 'Metro Taxi Assoc', compliant: 150, total: 200, rate: 75 },
];


export default function TrainingMatrix() {
  return (
    <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Training & Certification Compliance</CardTitle>
          <BarChartHorizontal className="h-5 w-5" />
        </div>
        <CardDescription className="text-green-100">
          Training compliance rates across entities.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <h3 className="text-lg font-semibold mb-2">Training Rates</h3>
         <div className="border rounded-lg border-green-400/50 bg-green-500/50">
            <Table>
                <TableHeader>
                    <TableRow className="border-b-green-400/50 hover:bg-green-400/30">
                        <TableHead className="text-white">ENTITY</TableHead>
                        <TableHead className="text-white">COMPLIANT</TableHead>
                        <TableHead className="text-white">TOTAL</TableHead>
                        <TableHead className="text-white">RATE</TableHead>
                         <TableHead className="text-white">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {entities.map((entity) => (
                    <TableRow key={entity.name} className="border-b-green-400/50 last:border-b-0 hover:bg-green-400/30">
                        <TableCell className="font-medium">{entity.name}</TableCell>
                        <TableCell>{entity.compliant}</TableCell>
                        <TableCell>{entity.total}</TableCell>
                        <TableCell><Badge variant="outline" className="bg-white/20 border-white/30 text-white">{entity.rate}%</Badge></TableCell>
                         <TableCell>
                            <Button size="sm" variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30 text-white">
                                <View className="mr-2 h-4 w-4" />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
         </div>
      </CardContent>
    </Card>
  );
}
