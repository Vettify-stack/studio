
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { MapPin } from 'lucide-react';

const employerData = [
  { region: 'Gauteng', count: 40 },
  { region: 'KZN', count: 25 },
  { region: 'Western Cape', count: 20 },
];

export default function RegionalDataCard() {
  return (
    <Card className="bg-green-50 border-green-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-900">Regional Data</CardTitle>
          <MapPin className="h-5 w-5 text-green-700" />
        </div>
        <CardDescription className="text-green-800">
          Distribution of employers and associations by region.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="employers">
          <TabsList className="grid w-full grid-cols-2 bg-green-100">
            <TabsTrigger value="employers">Employers</TabsTrigger>
            <TabsTrigger value="associations">Associations</TabsTrigger>
          </TabsList>
          <TabsContent value="employers" className="mt-4">
            <h3 className="font-semibold mb-2 text-green-900">
              Employer Distribution
            </h3>
            <div className="border rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>REGION</TableHead>
                    <TableHead className="text-right">COUNT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employerData.map((item) => (
                    <TableRow key={item.region}>
                      <TableCell className="font-medium">{item.region}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="associations" className="mt-4">
            <div className="text-center p-8 border-2 border-dashed border-green-200 rounded-lg">
              <p className="text-green-800">
                Association data will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
