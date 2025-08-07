
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCheck, Eye } from 'lucide-react';
import SafeDate from './safe-date';

const verifications = [
  {
    id: 'V001',
    type: 'ID Check',
    status: 'Verified',
    date: '2025-08-06',
  },
  {
    id: 'V002',
    type: 'Passport Check',
    status: 'Pending',
    date: '2025-08-07',
  },
];

const StatusBadge = ({ status }: { status: 'Verified' | 'Pending' }) => {
  const colorClass = {
    Verified: 'bg-green-100 text-green-800 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  }[status];

  return (
    <Badge variant="outline" className={`capitalize ${colorClass}`}>
      {status}
    </Badge>
  );
};

export default function VerificationsCenterCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Verifications Center</CardTitle>
          <UserCheck className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Central hub for all verification types.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hanis-npr">
          <TabsList>
            <TabsTrigger value="hanis-npr">HANIS/NPR</TabsTrigger>
            <TabsTrigger value="license-prdp">License/PrDP</TabsTrigger>
            <TabsTrigger value="work-permit">Work Permit</TabsTrigger>
          </TabsList>
          <TabsContent value="hanis-npr" className="mt-4">
            <h3 className="text-sm font-medium mb-2">ID/Passport Checks</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>TYPE/DRIVER</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>DATE</TableHead>
                    <TableHead className="text-right">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifications.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell>
                        <SafeDate dateString={item.date} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="license-prdp" className="mt-4">
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                License/PrDP verifications will be displayed here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="work-permit" className="mt-4">
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                Work Permit verifications will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
