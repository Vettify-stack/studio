
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertTriangle, Car, Users } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import NosyCorner from '@/components/nosy-corner';
import CompanyComplianceCard from '@/components/company-compliance-card';
import DriverComplianceOverview from '@/components/driver-compliance-overview';
import CompanyPlanAndRewards from '@/components/company-plan-and-rewards';
import Telemedicine from '@/components/telemedicine';
import CommunicationsHub from '@/components/communications-hub';
import GpsTrackingCard from '@/components/gps-tracking-card';
import EmployeeAttendancePerformance from '@/components/employee-attendance-performance';
import VehicleManagementCard from '@/components/vehicle-management-card';
import DisciplinaryManagementCard from '@/components/disciplinary-management-card';
import TrainingMatrix from '@/components/training-matrix';
import CompanyDocumentsCard from '@/components/company-documents-card';
import AartoComplianceCard from '@/components/aarto-compliance-card';
import JobMarketOverviewCard from '@/components/job-market-overview-card';
import FineManagementCard from '@/components/fine-management';
import LivelinessCheckCard from '@/components/liveliness-check-card';
import DocumentCenterCard from '@/components/document-center-card';
import PredictiveAnalyticsCard from '@/components/predictive-analytics-card';

const fleetVehicles: Vehicle[] = [
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
  {
    id: '6',
    registration: 'EC 456-TUV',
    make: 'Isuzu',
    model: 'D-Max',
    type: 'Delivery',
    status: 'Non-compliant',
    licenseExpiry: '2023-12-01',
    fines: 3,
  },
  {
    id: '7',
    registration: 'LP 789-WXY',
    make: 'Ford',
    model: 'Ranger',
    type: 'Delivery',
    status: 'Compliant',
    licenseExpiry: '2025-06-22',
    fines: 0,
  },
  {
    id: '8',
    registration: 'NW 101-ABC',
    make: 'Hyundai',
    model: 'H1',
    type: 'Taxi',
    status: 'At Risk',
    licenseExpiry: '2024-08-01',
    fines: 1,
  },
];

const StatusBadge = ({
  status,
}: {
  status: 'Compliant' | 'At Risk' | 'Non-Compliant';
}) => {
  const colorClass = {
    Compliant: 'bg-green-100 text-green-800 border-green-200',
    'At Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Non-Compliant': 'bg-red-100 text-red-800 border-red-200',
  }[status];

  const icon = {
    Compliant: <ShieldCheck className="mr-1 h-3 w-3" />,
    'At Risk': <AlertTriangle className="mr-1 h-3 w-3" />,
    'Non-Compliant': <AlertTriangle className="mr-1 h-3 w-3" />,
  }[status];

  return (
    <Badge variant="outline" className={`capitalize ${colorClass}`}>
      {icon}
      {status}
    </Badge>
  );
};

export default function FleetPage() {
  const compliantCount = fleetVehicles.filter(
    (v) => v.status === 'Compliant'
  ).length;
  const atRiskCount = fleetVehicles.filter(
    (v) => v.status === 'At Risk'
  ).length;
  const nonCompliantCount = fleetVehicles.filter(
    (v) => v.status === 'Non-Compliant'
  ).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Section */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Fleet Compliance Overview</CardTitle>
              <CardDescription>
                A real-time look at your entire fleet's compliance status.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliant</CardTitle>
              <ShieldCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{compliantCount}</div>
              <p className="text-xs text-muted-foreground">
                Vehicles meeting all requirements
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{atRiskCount}</div>
              <p className="text-xs text-muted-foreground">
                Vehicles with upcoming expiries or issues
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Non-Compliant
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nonCompliantCount}</div>
              <p className="text-xs text-muted-foreground">
                Vehicles with violations or expired documents
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CompanyComplianceCard />
        <AartoComplianceCard />
        <FineManagementCard />
        <CommunicationsHub />
        <Telemedicine />
        <LivelinessCheckCard />
        <CompanyPlanAndRewards />
        <NosyCorner />
        <DocumentCenterCard />
      </div>

      {/* Detailed Component Sections */}
      <div className="grid grid-cols-1 gap-8">
        <PredictiveAnalyticsCard />
        <GpsTrackingCard />
        <JobMarketOverviewCard />
        <TrainingMatrix />
        <CompanyDocumentsCard />
        <VehicleManagementCard />
        <EmployeeAttendancePerformance />
        <DisciplinaryManagementCard />
        <DriverComplianceOverview />
      </div>

      {/* All Vehicles Table */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>All Vehicles</CardTitle>
          <CardDescription>
            Detailed list of all vehicles in your fleet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Fines</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fleetVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    {vehicle.registration}
                  </TableCell>
                  <TableCell>
                    {vehicle.make} {vehicle.model}
                  </TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell className="text-right">{vehicle.fines}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
