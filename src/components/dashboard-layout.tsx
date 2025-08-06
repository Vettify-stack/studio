
'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Car,
  User,
  ShieldHalf,
  Gavel,
  Bell,
  Users,
  Briefcase,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DataUploadDialog from '@/components/data-upload';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return 'Company Dashboard';
      case '/fleet':
        return 'Fleet Dashboard';
      case '/alerts':
        return 'Compliance Alerts';
      case '/disputes':
        return 'Dispute Management';
      case '/driver':
        return 'Driver Dashboard';
       case '/admin':
        return 'Admin Dashboard';
      case '/training':
        return 'Training & Jobs';
      case '/utilities':
        return 'Utilities';
      default:
        return 'Dashboard';
    }
  };

  const showSidebar = !['/login', '/register'].includes(pathname);

  if (!showSidebar) {
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <ShieldHalf className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-tight text-primary">
                Vettify
              </h2>
              <p className="text-xs text-muted-foreground">MCI Platform</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/admin'}
                tooltip={{ children: 'Super Admin' }}
              >
                <Link href="/admin">
                  <ShieldHalf />
                  <span>Super Admin</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip={{ children: 'Dashboard' }}
              >
                <Link href="/">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/driver'}
                tooltip={{ children: 'Driver' }}
              >
                <Link href="/driver">
                  <User />
                  Driver Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/fleet'}
                tooltip={{ children: 'Fleet' }}
              >
                <Link href="/fleet">
                  <Users />
                  Fleet View
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{ children: 'Vehicles' }}>
                <Link href="#">
                  <Car />
                  Vehicles
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/alerts'}
                tooltip={{ children: 'Alerts' }}
              >
                <Link href="/alerts">
                  <Bell />
                  Alerts
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{ children: 'Fines' }}>
                <Link href="#">
                  <FileText />
                  Fines
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/disputes'}
                tooltip={{ children: 'Disputes' }}
              >
                <Link href="/disputes">
                  <Gavel />
                  Disputes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/training'}
                tooltip={{ children: 'Training & Jobs' }}
              >
                <Link href="/training">
                  <Briefcase />
                  Training & Jobs
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/utilities'}
                tooltip={{ children: 'Utilities' }}
              >
                <Link href="/utilities">
                  <Smartphone />
                  Utilities
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 w-full px-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                  <AvatarFallback>VO</AvatarFallback>
                </Avatar>
                <div className="text-left group-data-[collapsible=icon]:hidden">
                  <p className="font-medium text-sm">Vehicle Owner</p>
                  <p className="text-xs text-muted-foreground">
                    owner@email.com
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold hidden md:block">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            <DataUploadDialog />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
