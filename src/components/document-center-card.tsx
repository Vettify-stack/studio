
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookMarked, Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const businessDocuments = [
  {
    id: 'doc-1',
    title: 'Disciplinary Notice Template',
    description: 'Standard template for issuing disciplinary notices.',
  },
  {
    id: 'doc-2',
    title: 'Employee Consultation Letter',
    description: 'Template for formal employee consultation meetings.',
  },
  {
    id: 'doc-3',
    title: 'Incident Report Form',
    description: 'Form for employees to report workplace incidents.',
  },
];

export default function DocumentCenterCard() {
    const { toast } = useToast();

    const handlePrint = () => {
        toast({
            title: "Print Action",
            description: "This would trigger the browser's print dialog.",
        });
    }
    const handleDownload = (docTitle: string) => {
         toast({
            title: "Download Started",
            description: `Downloading "${docTitle}"...`,
        });
    }

  return (
    <Card className="bg-sky-50 border-sky-200 text-sky-900 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Document Center</CardTitle>
          <BookMarked className="h-5 w-5 text-sky-700" />
        </div>
        <CardDescription className="text-sky-800">
          Useful business documents provided by Super Admin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {businessDocuments.map((doc) => (
          <div
            key={doc.id}
            className="p-3 bg-white/70 rounded-lg border border-sky-200"
          >
            <p className="font-semibold text-sm">{doc.title}</p>
            <p className="text-xs text-sky-800/80 mb-2">{doc.description}</p>
            <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleDownload(doc.title)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
                <Button size="sm" variant="ghost" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
