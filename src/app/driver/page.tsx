
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertTriangle,
  FileText,
  BadgeCheck,
  Car,
} from 'lucide-react';
import type { DriverProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Telemedicine from '@/components/telemedicine';
import DocumentManagement from '@/components/document-management';

const driverData: DriverProfile = {
  name: 'John Mokoena',
  initials: 'JM',
  idStatus: 'Verified',
  licenseStatus: 'Valid',
  demeritPoints: 4,
  outstandingFines: 3,
  vehicles: ['CA 123-456', 'GP 789-BCE'],
  employmentStatus: 'Employed by FleetCo',
  lmsProgress: 45,
  referralEarnings: 250,
};

const statusColors = {
  Verified: 'bg-green-100 text-green-800 border-green-200',
  Valid: 'bg-green-100 text-green-800 border-green-200',
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function DriverDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Driver Profile & Compliance */}
        <Card className="md:col-span-2">
           <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                <AvatarFallback>{driverData.initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{driverData.name}</CardTitle>
                <CardDescription>{driverData.employmentStatus}</CardDescription>
                 <Badge variant="outline" className={`mt-2 ${statusColors[driverData.idStatus]}`}>ID: {driverData.idStatus}</Badge>
              </div>
            </CardHeader>
          <CardContent className="mt-4">
             <h3 className="font-semibold mb-4 text-lg">Compliance Status</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-md border p-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-bold text-lg">{driverData.outstandingFines}</p>
                    <p className="text-sm text-muted-foreground">Outstanding Fines</p>
                </div>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-4">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-bold text-lg">{driverData.demeritPoints}</p>
                    <p className="text-sm text-muted-foreground">AARTO Points</p>
                </div>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-4">
                <BadgeCheck className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className={`font-bold text-lg`}>
                    {driverData.licenseStatus}
                    </p>
                    <p className="text-sm text-muted-foreground">License Status</p>
                </div>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-4">
                <Car className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-bold text-lg">{driverData.vehicles.length}</p>
                    <p className="text-sm text-muted-foreground">Linked Vehicles</p>
                </div>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <Telemedicine />

        <div className="md:col-span-3">
            <DocumentManagement />
        </div>

      </div>
    </div>
  );
}
