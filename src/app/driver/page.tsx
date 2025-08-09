
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
import DocumentManagement from '@/components/document-management';
import ComplianceScore from '@/components/compliance-score';
import QRCodeCard from '@/components/qr-code-card';
import Telemedicine from '@/components/telemedicine';
import DriverComplianceCard from '@/components/driver-compliance-card';
import FineManagementCard from '@/components/fine-management';
import TrainingCertificatesCard from '@/components/training-certificates-card';
import AIDriverTrainer from '@/components/ai-driver-trainer';
import LicenseRenewalCard from '@/components/license-renewal-card';
import NosyCorner from '@/components/nosy-corner';
import MyPlanAndRewards from '@/components/my-plan-and-rewards';
import LivelinessCheckCard from '@/components/liveliness-check-card';

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
  complianceScore: 88,
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JohnMokoena-DriverID-12345',
};

const statusColors = {
  Verified: 'bg-green-100 text-green-800 border-green-200',
  Valid: 'bg-green-100 text-green-800 border-green-200',
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function DriverDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Primary Info Card */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
            <AvatarFallback>{driverData.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{driverData.name}</CardTitle>
            <CardDescription>{driverData.employmentStatus}</CardDescription>
            <Badge variant="outline" className={`mt-2 ${statusColors[driverData.idStatus]}`}>
              ID: {driverData.idStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <h3 className="font-semibold mb-4 text-lg">Compliance Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 rounded-md border p-4" style={{ backgroundColor: '#90A4AE', color: 'white' }}>
              <FileText className="h-6 w-6 text-white" />
              <div>
                <p className="font-bold text-lg">{driverData.outstandingFines}</p>
                <p className="text-sm text-white/80">Outstanding Fines</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border p-4" style={{ backgroundColor: '#FF7043', color: 'white' }}>
              <AlertTriangle className="h-6 w-6 text-white" />
              <div>
                <p className="font-bold text-lg">{driverData.demeritPoints}</p>
                <p className="text-sm text-white/80">AARTO Points</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border p-4" style={{ backgroundColor: '#7E57C2', color: 'white' }}>
              <BadgeCheck className="h-6 w-6 text-white" />
              <div>
                <p className={`font-bold text-lg`}>{driverData.licenseStatus}</p>
                <p className="text-sm text-white/80">License Status</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border p-4" style={{ backgroundColor: '#26A69A', color: 'white' }}>
              <Car className="h-6 w-6 text-white" />
              <div>
                <p className="font-bold text-lg">{driverData.vehicles.length}</p>
                <p className="text-sm text-white/80">Linked Vehicles</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <DriverComplianceCard />
            <FineManagementCard />
            <LivelinessCheckCard />
            <NosyCorner />
            <MyPlanAndRewards />
            <Telemedicine />
        </div>
        <div className="space-y-6">
            <ComplianceScore score={driverData.complianceScore} />
            <QRCodeCard qrCodeUrl={driverData.qrCodeUrl} />
            <LicenseRenewalCard />
            <AIDriverTrainer />
        </div>
      </div>
      
      {/* Full-width detailed cards */}
      <div className="grid grid-cols-1 gap-6">
        <DocumentManagement />
        <TrainingCertificatesCard />
      </div>

    </div>
  );
}
