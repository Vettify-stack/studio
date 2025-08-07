
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
  Search,
  PlusCircle,
  Download,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const drivers = [
  { name: 'John Doe', license: true, pdp: false, firstAid: false, firefighting: false },
  { name: 'Jane Smith', license: true, pdp: true, firstAid: false, firefighting: false },
  { name: 'Mike Ross', license: true, pdp: true, firstAid: false, firefighting: false },
  { name: 'Sarah Connor', license: true, pdp: true, firstAid: false, firefighting: false },
];

const StatusIcon = ({ completed }: { completed: boolean }) => {
  if (completed) {
    return <CheckCircle2 className="h-5 w-5 text-green-300" />;
  }
  return <XCircle className="h-5 w-5 text-red-300" />;
};

export default function TrainingMatrix() {
  return (
    <Card className="bg-green-600 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Training Matrix</CardTitle>
          <BarChartHorizontal className="h-5 w-5" />
        </div>
        <CardDescription className="text-green-100">
          Track driver training and certifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-200" />
            <Input
              placeholder="Search by driver name..."
              className="pl-8 bg-green-500/50 border-green-400 placeholder:text-green-200 text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent border-green-300 hover:bg-green-500">
              <PlusCircle className="mr-2 h-4 w-4" />
              Assign
            </Button>
            <Button variant="outline" className="bg-transparent border-green-300 hover:bg-green-500">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="border rounded-lg border-green-500">
          <Table>
            <TableHeader>
              <TableRow className="border-b-green-500 bg-green-700/80 hover:bg-green-700">
                <TableHead className="text-white">DRIVER</TableHead>
                <TableHead className="text-white">DRIVER'S LICENSE</TableHead>
                <TableHead className="text-white">PDP</TableHead>
                <TableHead className="text-white">FIRST AID</TableHead>
                <TableHead className="text-white">FIREFIGHTING</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.name} className="border-b-green-500 hover:bg-green-600/50">
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>
                    <StatusIcon completed={driver.license} />
                  </TableCell>
                  <TableCell>
                    <StatusIcon completed={driver.pdp} />
                  </TableCell>
                  <TableCell>
                    <StatusIcon completed={driver.firstAid} />
                  </TableCell>
                  <TableCell>
                    <StatusIcon completed={driver.firefighting} />
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
