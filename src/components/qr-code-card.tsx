
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import { QrCode, Download } from 'lucide-react';
import Image from 'next/image';

interface QRCodeCardProps {
    qrCodeUrl: string;
}

export default function QRCodeCard({ qrCodeUrl }: QRCodeCardProps) {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'Driver-Access-QR-Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Driver Access Card</CardTitle>
        </div>
        <CardDescription>
            Scan for quick verification.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="p-2 border rounded-md">
            <Image
                src={qrCodeUrl}
                alt="Driver QR Code"
                width={150}
                height={150}
                data-ai-hint="qr code"
            />
        </div>
        <Button onClick={handleDownload} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR
        </Button>
      </CardContent>
    </Card>
  );
}
