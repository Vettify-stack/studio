import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import DashboardLayout from '@/components/dashboard-layout';

export const metadata: Metadata = {
  title: 'Vettify MCI Compliance View',
  description:
    'A real-time compliance, behavioural intelligence, and operational insights platform tailored for the taxi and commercial transport industry.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster />
      </body>
    </html>
  );
}
