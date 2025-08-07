
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
import { ShieldCheck, Users, BarChart2, Loader2, FileUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import CoreDataIntegrationsCard from '@/components/core-data-integrations-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NosyCorner from '@/components/nosy-corner';
import AartoComplianceCard from '@/components/aarto-compliance-card';
import GpsTrackingCard from '@/components/gps-tracking-card';
import TrainingMatrix from '@/components/training-matrix';
import JobPostingCard from '@/components/job-posting-card';
import MatchingApplicantsCard from '@/components/matching-applicants-card';
import CompanyDocumentsCard from '@/components/company-documents-card';
import VehicleManagementCard from '@/components/vehicle-management-card';
import CompanyFineManagement from '@/components/company-fine-management';
import EmployeeAttendancePerformance from '@/components/employee-attendance-performance';
import DisciplinaryManagementCard from '@/components/disciplinary-management-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlatformOverviewCard from '@/components/platform-overview-card';
import OverallComplianceCard from '@/components/overall-compliance-card';
import AartoPointsTrackerCard from '@/components/aarto-points-tracker-card';
import VerificationsCenterCard from '@/components/verifications-center-card';

const FleetPage = dynamic(() => import('@/app/fleet/page'), {
  loading: () => <DashboardSkeleton />,
});
const DriverDashboardPage = dynamic(() => import('@/app/driver/page'), {
  loading: () => <DashboardSkeleton />,
});
const GpDashboardPage = dynamic(() => import('@/app/gp/page'), {
  loading: () => <DashboardSkeleton />,
});


const FadeIn = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="animate-in fade-in duration-500">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <PlatformOverviewCard />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <JobPostingCard />
                    <MatchingApplicantsCard />
                </div>
                <VerificationsCenterCard />
                <OverallComplianceCard />
                <TrainingMatrix />
                <CompanyDocumentsCard />
                <VehicleManagementCard />
                <CompanyFineManagement />
                <EmployeeAttendancePerformance />
                <DisciplinaryManagementCard />
                <CoreDataIntegrationsCard />
            </div>
             <div className="space-y-6">
                <NosyCorner />
                <AartoPointsTrackerCard />
                <GpsTrackingCard />
             </div>
        </div>
    )
}

const PlaceholderContent = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">{title} content will be displayed here.</p>
    </div>
);


export default function AdminDashboardPage() {
  const [view, setView] = useState('admin');
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (view) {
      case 'company':
        return <FadeIn key="company"><FleetPage /></FadeIn>;
      case 'driver':
        return <FadeIn key="driver"><DriverDashboardPage /></FadeIn>;
       case 'gp':
        return <FadeIn key="gp"><GpDashboardPage /></FadeIn>;
      case 'admin':
      default:
        return (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Platform Overview</TabsTrigger>
                    <TabsTrigger value="user_management">User Management</TabsTrigger>
                    <TabsTrigger value="referrals">Referrals</TabsTrigger>
                    <TabsTrigger value="ai_trainer">AI Trainer</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="services_insights">Services Insights</TabsTrigger>
                    <TabsTrigger value="medical_insights">Medical Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <FadeIn key="admin"><AdminView /></FadeIn>
                </TabsContent>
                <TabsContent value="user_management" className="mt-6">
                     <PlaceholderContent title="User Management" />
                </TabsContent>
                <TabsContent value="referrals" className="mt-6">
                     <PlaceholderContent title="Referrals" />
                </TabsContent>
                <TabsContent value="ai_trainer" className="mt-6">
                     <PlaceholderContent title="AI Trainer" />
                </TabsContent>
                <TabsContent value="documents" className="mt-6">
                     <PlaceholderContent title="Documents" />
                </TabsContent>
                <TabsContent value="services_insights" className="mt-6">
                     <PlaceholderContent title="Services Insights" />
                </TabsContent>
                <TabsContent value="medical_insights" className="mt-6">
                     <PlaceholderContent title="Medical Insights" />
                </TabsContent>
            </Tabs>
        )
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Platform-wide management and oversight.
            </p>
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
              <SelectItem value="gp">Medical GP View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {renderContent()}

    </div>
  );
}
