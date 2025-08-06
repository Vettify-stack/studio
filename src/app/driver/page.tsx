
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  BookOpen,
  Bell,
  Award,
  MessageSquare,
  BadgeCheck,
  Car,
} from 'lucide-react';
import type { DriverProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Telemedicine from '@/components/telemedicine';

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
      {/* Driver Profile Header */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
            <AvatarFallback>{driverData.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{driverData.name}</CardTitle>
            <CardDescription>{driverData.employmentStatus}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Compliance Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <CardTitle>Compliance Status</CardTitle>
            </div>
            <CardDescription>Your current compliance overview.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
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
          </CardContent>
        </Card>
        
        <Telemedicine />

        {/* Notifications & Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You have 2 new alerts.
            </p>
            <Button className="w-full">View Alerts</Button>
          </CardContent>
        </Card>

        {/* Learning & Certification */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle>Learning</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your next module is ready.
            </p>
            <Button variant="outline" className="w-full">
              Go to Learning
            </Button>
          </CardContent>
        </Card>

        {/* Referral & Rewards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <CardTitle>Refer & Earn</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Total Earned: R{driverData.referralEarnings.toFixed(2)}
            </p>
            <Button variant="outline" className="w-full">
              My Referrals
            </Button>
          </CardContent>
        </Card>

        {/* Support & Disputes */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle>Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Need help? Submit a dispute or contact support.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
