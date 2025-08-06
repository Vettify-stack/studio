
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShieldCheck, Users, BarChart2, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FleetPage = dynamic(() => import('@/app/fleet/page'), {
  loading: () => <DashboardSkeleton />,
});
const DriverDashboardPage = dynamic(() => import('@/app/driver/page'), {
  loading: () => <DashboardSkeleton />,
});

const FadeIn = ({ children, key }: { children: React.ReactNode, key: string }) => {
    return (
        <div key={key} className="animate-in fade-in duration-500">
            {children}
        </div>
    )
}

const DashboardSkeleton = () => (
    <div className="space-y-6">
        <div className="flex justify-center items-center p-10 border rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
    </div>
)


const AdminView = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">
                    +150 from last month
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Compliance Rate
                    </CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-xs text-muted-foreground">
                    Across all fleets and owners
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Open Disputes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">
                    Awaiting review
                    </p>
                </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>An overview of recent platform activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">No recent activity to display.</p>
                   </div>
                </CardContent>
             </Card>
        </div>
    )
}


export default function AdminDashboardPage() {
  const [view, setView] = useState('admin');

  const renderContent = () => {
    switch (view) {
      case 'company':
        return <FadeIn key="company"><FleetPage /></FadeIn>;
      case 'driver':
        return <FadeIn key="driver"><DriverDashboardPage /></FadeIn>;
      case 'admin':
      default:
        return <FadeIn key="admin"><AdminView /></FadeIn>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <div>
                <CardTitle>Vettify Super Admin</CardTitle>
                <CardDescription>
                  Platform-wide management and oversight.
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Switch View:
              </span>
              <Select value={view} onValueChange={setView}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Super Admin</SelectItem>
                  <SelectItem value="company">Company View</SelectItem>
                  <SelectItem value="driver">Driver View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {renderContent()}

    </div>
  );
}
