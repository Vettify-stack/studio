
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import DashboardLayout from '@/components/dashboard-layout';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';


// export const metadata: Metadata = {
//   title: 'Vettify MCI Compliance View',
//   description:
//     'A real-time compliance, behavioural intelligence, and operational insights platform tailored for the taxi and commercial transport industry.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const [activeView, setActiveView] = useState('admin');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showDashboardLayout = !['/login', '/register', '/landing', '/'].includes(pathname);

  if (!isMounted) {
    return (
       <html lang="en" suppressHydrationWarning>
        <body className="font-body antialiased" suppressHydrationWarning></body>
      </html>
    )
  }
  
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { setActiveView });
    }
    return child;
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Vettify MCI Compliance View</title>
        <meta
          name="description"
          content="A real-time compliance, behavioural intelligence, and operational insights platform tailored for the taxi and commercial transport industry."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
         <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {showDashboardLayout ? <DashboardLayout activeView={activeView}>{childrenWithProps}</DashboardLayout> : children}
            {isMounted && <Toaster />}
        </ThemeProvider>
      </body>
    </html>
  );
}
