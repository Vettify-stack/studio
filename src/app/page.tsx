
import {
  Car,
  ShieldCheck,
  AlertTriangle,
  FileWarning,
  Sigma,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/app/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Vehicle, OwnerStats } from '@/lib/types';
import ComplianceAISummary from '@/components/compliance-ai-summary';

const ownerStats: OwnerStats = {
  totalVehicles: 5,
  compliantVehicles: 3,
  totalFines: 1250.0,
  demeritPoints: 6,
};

const vehicles: Vehicle[] = [
  {
    id: '1',
    registration: 'CA 123-456',
    make: 'Toyota',
    model: 'Avanza',
    type: 'Taxi',
    status: 'Compliant',
    licenseExpiry: '2025-08-15',
    fines: 0,
  },
  {
    id: '2',
    registration: 'GP 789-BCE',
    make: 'Nissan',
    model: 'NV350',
    type: 'Taxi',
    status: 'Non-Compliant',
    licenseExpiry: '2024-02-20',
    fines: 2,
  },
  {
    id: '3',
    registration: 'KZN 555-LMN',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    type: 'Taxi',
    status: 'At Risk',
    licenseExpiry: '2024-07-30',
    fines: 1,
  },
  {
    id: '4',
    registration: 'WP 987-ZYX',
    make: 'Toyota',
    model: 'Quantum',
    type: 'Taxi',
    status: 'Compliant',
    licenseExpiry: '2026-01-10',
    fines: 0,
  },
  {
    id: '5',
    registration: 'FS 321-QRS',
    make: 'VW',
    model: 'Polo',
    type: 'Delivery',
    status: 'Compliant',
    licenseExpiry: '2025-11-05',
    fines: 0,
  },
];

const StatusBadge = ({
  status,
}: {
  status: 'Compliant' | 'At Risk' | 'Non-Compliant';
}) => {
  const variant = {
    Compliant: 'default',
    'At Risk': 'secondary',
    'Non-Compliant': 'destructive',
  }[status] as 'default' | 'secondary' | 'destructive';

  const text = {
    Compliant: 'Compliant',
    'At Risk': 'At Risk',
    'Non-Compliant': 'Non-Compliant',
  }[status];

  const icon = {
    Compliant: <ShieldCheck className="mr-1 h-3 w-3" />,
    'At Risk': <AlertTriangle className="mr-1 h-3 w-3" />,
    'Non-Compliant': <AlertTriangle className="mr-1 h-3 w-3" />,
  }[status];

  const colorClass = {
    Compliant: 'bg-green-100 text-green-800 border-green-200',
    'At Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Non-Compliant': 'bg-red-100 text-red-800 border-red-200',
  }[status];
  
  return (
    <Badge variant="outline" className={`capitalize ${colorClass}`}>
      {icon}
      {text}
    </Badge>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownerStats.totalVehicles}
            </div>
            <p className="text-xs text-muted-foreground">
              {ownerStats.compliantVehicles} compliant
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Compliance
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (ownerStats.compliantVehicles / ownerStats.totalVehicles) *
                100
              ).toFixed(0)}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {ownerStats.totalVehicles - ownerStats.compliantVehicles} vehicles with issues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Fines</CardTitle>
            <FileWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R {ownerStats.totalFines.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Across all vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Demerit Points
            </CardTitle>
            <Sigma className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownerStats.demeritPoints}
            </div>
            <p className="text-xs text-muted-foreground">
              Total points accumulated
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Vehicles</CardTitle>
            <CardDescription>
              An overview of your vehicle fleet and their compliance status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Vehicle
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    License Expiry
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.registration}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {vehicle.make} {vehicle.model}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(vehicle.licenseExpiry).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={vehicle.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <ComplianceAISummary />
        </div>
      </div>
    </div>
  );
}
