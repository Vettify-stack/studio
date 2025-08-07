
'use client';

import React, { useState, useEffect } from 'react';
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
  History,
  CircleHelp,
  ArrowLeftRight,
  Replace,
  Siren,
  CreditCard,
  Receipt,
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
  SidebarSeparator,
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
import SosDialog from '@/components/sos-dialog';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getPageTitle = () => {
    if (pathname === '/' || pathname.startsWith('/admin')) {
      return 'Super Admin Dashboard';
    }
    if (pathname.startsWith('/driver')) {
      return 'Driver Dashboard';
    }

    switch (pathname) {
      case '/fleet':
        return 'Fleet Dashboard';
      case '/alerts':
        return 'Compliance Alerts';
      case '/disputes':
        return 'Dispute Management';
      case '/training':
        return 'Training & Jobs';
      case '/utilities':
        return 'Utilities';
      case '/gp':
        return 'GP Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const showSidebar = !['/login', '/register'].includes(pathname);

  if (!showSidebar) {
    return <>{children}</>;
  }

  if (!isMounted) {
    // Render a skeleton or null during SSR to avoid hydration mismatch
    return null;
  }

  const isDriverView = pathname.startsWith('/driver');

  return (
    <SidebarProvider defaultOpen>
       <Sidebar
        className={
          isDriverView
            ? 'bg-sidebar-background text-sidebar-foreground'
            : ''
        }
      >
        <SidebarHeader>
           <div className="flex items-center gap-2 p-2">
            <ShieldHalf className="w-8 h-8 text-primary" />
             <div className="flex flex-col">
              <h2 className={`text-lg font-semibold tracking-tight ${isDriverView ? 'text-sidebar-foreground' : 'text-primary'}`}>
                Vettify
              </h2>
               {!isDriverView && <p className="text-xs text-muted-foreground">MCI Platform</p>}
             </div>
           </div>
        </SidebarHeader>
        <SidebarContent
           className={
            isDriverView
              ? 'bg-sidebar-background text-sidebar-foreground'
              : ''
          }
        >
          {isDriverView ? (
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        isActive={isMounted && pathname === '/driver'}
                        tooltip={{ children: 'Driver' }}
                         variant="outline"
                        className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                    >
                        <Link href="/driver">
                        <LayoutDashboard />
                        Driver
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Profile' }} variant="ghost" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="#">
                        <User />
                        Profile
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Pay Subscription' }} variant="ghost" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="#">
                        <CreditCard />
                        Pay Subscription Now
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Payment History' }} variant="ghost" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="#">
                        <History />
                        Payment History
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Invoices' }} variant="ghost" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="#">
                        <Receipt />
                        Invoices
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Request Support' }} variant="ghost" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="#">
                        <CircleHelp />
                        Request Support
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenu className="mt-auto">
                    <SidebarSeparator className="my-2" />
                    <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip={{ children: 'Return to Super Admin' }}
                        variant="outline"
                        className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                    >
                        <Link href="/admin">
                        <ArrowLeftRight />
                        Return to Super Admin
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip={{ children: 'Viewing as Driver' }}
                        variant="ghost"
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <Link href="#">
                        <Replace />
                        Viewing as Driver
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarMenu>
           ) : (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isMounted && (pathname === '/' || pathname === '/admin')}
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
                  isActive={isMounted && pathname === '/alerts'}
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
                  isActive={isMounted && pathname === '/disputes'}
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
                  isActive={isMounted && pathname === '/training'}
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
                  isActive={isMounted && pathname === '/utilities'}
                  tooltip={{ children: 'Utilities' }}
                >
                  <Link href="/utilities">
                    <Smartphone />
                    Utilities
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarContent>
        <SidebarFooter
          className={
            isDriverView
              ? 'bg-sidebar-background text-sidebar-foreground p-2 flex flex-col gap-2'
              : ''
          }
        >
          {isDriverView ? (
            <>
                <SosDialog />
                <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </>
          ) : (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center justify-start gap-2 w-full px-2"
                >
                    <Avatar className="h-8 w-8">
                    <AvatarImage
                        src="https://placehold.co/100x100.png"
                        data-ai-hint="person portrait"
                    />
                    <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                    <p className="font-medium text-sm">Super Admin</p>
                    <p className="text-xs text-muted-foreground">admin@vettify.io</p>
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
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold hidden md:block">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-4">
            <DataUploadDialog />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
