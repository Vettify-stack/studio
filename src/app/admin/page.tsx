
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
import RegionalDataCard from '@/components/regional-data-card';
import DriverComplianceSnippetCard from '@/components/driver-compliance-snippet-card';
import VehicleManagementSnippetCard from '@/components/vehicle-management-snippet-card';
import JobMarketOverviewCard from '@/components/job-market-overview-card';
import JobPostingCard from '@/components/job-posting-card';
import MatchingApplicantsCard from '@/components/matching-applicants-card';
import UserManagementPage from '@/app/admin/user-management/page';
import ReferralsPage from '@/app/admin/referrals/page';
import AITrainerPage from '@/app/admin/ai-trainer/page';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <PlatformOverviewCard />
            </div>
            <div className="lg:col-span-1">
                <OverallComplianceCard />
            </div>
             <div className="lg:col-span-1">
                <AartoPointsTrackerCard />
            </div>
            <div className="lg:col-span-1">
                <CompanyFineManagement />
            </div>
            <div className="lg:col-span-1">
                <TrainingMatrix />
            </div>
             <div className="lg:col-span-1">
                <RegionalDataCard />
            </div>
             <div className="lg:col-span-2">
                <DriverComplianceSnippetCard />
            </div>
            <div className="lg:col-span-1">
                <VehicleManagementSnippetCard />
            </div>
            <div className="lg:col-span-3">
                <VerificationsCenterCard />
            </div>
            <div className="lg:col-span-3">
                <JobMarketOverviewCard />
            </div>
             <div className="lg:col-span-2">
                <JobPostingCard />
            </div>
            <div className="lg:col-span-1">
                <MatchingApplicantsCard />
            </div>
            <div className="lg:col-span-3">
                <GpsTrackingCard />
            </div>
             <div className="lg:col-span-3">
                <CompanyDocumentsCard />
             </div>
             <div className="lg:col-span-3">
                <VehicleManagementCard />
             </div>
              <div className="lg:col-span-3">
                <EmployeeAttendancePerformance />
             </div>
             <div className="lg:col-span-3">
                <DisciplinaryManagementCard />
             </div>
            <div className="lg:col-span-3">
                 <CoreDataIntegrationsCard />
            </div>
             <div className="lg:col-span-3">
                <NosyCorner />
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
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="overview">Platform Overview</TabsTrigger>
                        <TabsTrigger value="user_management">User Management</TabsTrigger>
                        <TabsTrigger value="referrals">Referrals</TabsTrigger>
                        <TabsTrigger value="ai_trainer">AI Trainer</TabsTrigger>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="services_insights">Services Insights</TabsTrigger>
                        <TabsTrigger value="medical_insights">Medical Insights</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground hidden md:block">
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
                <TabsContent value="overview" className="mt-6">
                    <FadeIn key="admin"><AdminView /></FadeIn>
                </TabsContent>
                <TabsContent value="user_management" className="mt-6">
                     <FadeIn key="user-management"><UserManagementPage /></FadeIn>
                </TabsContent>
                <TabsContent value="referrals" className="mt-6">
                     <FadeIn key="referrals"><ReferralsPage /></FadeIn>
                </TabsContent>
                <TabsContent value="ai_trainer" className="mt-6">
                     <FadeIn key="ai-trainer"><AITrainerPage /></FadeIn>
                </TabsContent>
                 <TabsContent value="courses" className="mt-6">
                     <PlaceholderContent title="Courses" />
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
        
      </div>
      
      {renderContent()}

    </div>
  );
}
