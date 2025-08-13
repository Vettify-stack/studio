
'use client';

import { useState, useEffect, useCallback } from 'react';
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
import type { DriverProfile, Certificate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import DocumentManagement from '@/components/document-management';
import ComplianceScore from '@/components/compliance-score';
import Telemedicine from '@/components/telemedicine';
import DriverComplianceCard from '@/components/driver-compliance-card';
import FineManagementCard from '@/components/fine-management';
import TrainingCertificatesCard from '@/components/training-certificates-card';
import AIDriverTrainer from '@/components/ai-driver-trainer';
import LicenseRenewalCard from '@/components/license-renewal-card';
import NosyCorner from '@/components/nosy-corner';
import MyPlanAndRewards from '@/components/my-plan-and-rewards';
import LivelinessCheckCard from '@/components/liveliness-check-card';
import UtilitiesPurchase from '@/components/utilities-purchase';
import { differenceInDays, parse } from 'date-fns';

const initialDriverData: DriverProfile = {
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

const initialCertificates: Certificate[] = [
  { id: '1', name: 'Cutler Card', provider: 'Islandview Gate', certNo: 'MW85236', expiry: '06 Mar 2025' },
  { id: '2', name: 'First Aid Certificate', provider: 'Dantran', certNo: 'FA95124', expiry: '12 Apr 2025' },
  { id: '3', name: 'Induction', provider: 'Platinum Mine', certNo: '74125GF', expiry: '10 Jul 2025' },
  { id: '4', name: 'Acces Card', provider: 'Platinum Mine', certNo: '4568RFT', expiry: '25 Jul 2025' },
  { id: '5', name: 'PrDP', provider: 'DOT', certNo: 'PDP789654', expiry: '10 Sep 2025' },
  { id: '6', name: "Driver's License", provider: 'DOT', certNo: '12547H7UY52', expiry: '08 Aug 2029' },
  { id: '7', name: 'Medical Certificate', provider: 'Dr.Williams', certNo: 'MP8521', expiry: '07 Mar 2025' },
  { id: '8', name: 'Firefighting Certificate', provider: 'Hazchem', certNo: '9632', expiry: '07 Jul 2025' },
];

const requiredDocuments = [
    "Driver's License", "PrDP", "Medical Certificate", "First Aid Certificate", "Firefighting Certificate", "Dangerous Goods", "Work Permit", "Criminal Clearance"
];

const statusColors = {
  Verified: 'bg-green-100 text-green-800 border-green-200',
  Valid: 'bg-green-100 text-green-800 border-green-200',
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function DriverDashboardPage() {
    const [driverData] = useState<DriverProfile>(initialDriverData);
    const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
    const [complianceScore, setComplianceScore] = useState(0);
    
    const calculateComplianceScore = useCallback(() => {
        let validDocs = 0;
        const totalRequired = requiredDocuments.length;

        requiredDocuments.forEach(requiredDocName => {
            const foundCert = certificates.find(cert => cert.name === requiredDocName);
            if (foundCert) {
                try {
                    const expiryDate = parse(foundCert.expiry, 'dd MMM yyyy', new Date());
                    if (differenceInDays(expiryDate, new Date()) >= 0) {
                        validDocs++;
                    }
                } catch (e) {
                    console.error("Could not parse date for score calculation:", foundCert.expiry);
                }
            }
        });

        const score = Math.round((validDocs / totalRequired) * 100);
        setComplianceScore(score);
    }, [certificates]);

    useEffect(() => {
        calculateComplianceScore();
    }, [certificates, calculateComplianceScore]);


    const handleCertificateAdd = (newCert: Certificate) => {
        setCertificates(prev => [newCert, ...prev]);
    }

  return (
    <div className="flex flex-col gap-6">
      {/* Primary Info Card & Compliance Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card className="transition-all hover:shadow-lg h-full">
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
                    <div className="flex items-center gap-2 rounded-md p-4" style={{ backgroundColor: '#90A4AE', color: 'white' }}>
                    <FileText className="h-6 w-6 text-white" />
                    <div>
                        <p className="font-bold text-lg">{driverData.outstandingFines}</p>
                        <p className="text-sm text-white/80">Outstanding Fines</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-4" style={{ backgroundColor: '#FF7043', color: 'white' }}>
                    <AlertTriangle className="h-6 w-6 text-white" />
                    <div>
                        <p className="font-bold text-lg">{driverData.demeritPoints}</p>
                        <p className="text-sm text-white/80">AARTO Points</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-4" style={{ backgroundColor: '#7E57C2', color: 'white' }}>
                    <BadgeCheck className="h-6 w-6 text-white" />
                    <div>
                        <p className={`font-bold text-lg`}>{driverData.licenseStatus}</p>
                        <p className="text-sm text-white/80">License Status</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-4" style={{ backgroundColor: '#26A69A', color: 'white' }}>
                    <Car className="h-6 w-6 text-white" />
                    <div>
                        <p className="font-bold text-lg">{driverData.vehicles.length}</p>
                        <p className="text-sm text-white/80">Linked Vehicles</p>
                    </div>
                    </div>
                </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <ComplianceScore score={complianceScore} />
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DriverComplianceCard certificates={certificates} requiredDocuments={requiredDocuments} />
            <FineManagementCard />
            <LicenseRenewalCard />
            <LivelinessCheckCard />
            <NosyCorner />
            <MyPlanAndRewards />
            <Telemedicine />
            <AIDriverTrainer />
            <UtilitiesPurchase />
      </div>
      
      {/* Full-width detailed cards */}
      <div className="grid grid-cols-1 gap-6">
        <DocumentManagement />
        <TrainingCertificatesCard certificates={certificates} onCertificateAdd={handleCertificateAdd} />
      </div>

    </div>
  );
}
