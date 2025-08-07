
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, FileCheck2, FileClock, FileX2, FileWarning, ShieldAlert, File, MoreVertical, Trash2, Download, Eye, FileUp } from 'lucide-react';
import type { Document } from '@/lib/types';
import SafeDate from './safe-date';

const initialDocuments: Document[] = [
  {
    id: '1',
    name: "Driver's License",
    status: 'Verified',
    expiryDate: '2026-10-15',
    uploadDate: '2024-06-25',
    details: 'No additional details for this document type.'
  },
  {
    id: '2',
    name: 'Traffic Fine',
    status: 'Pending',
    uploadDate: '2025-06-21',
    details: 'No details provided.'
  },
  {
    id: '3',
    name: 'Training Certificate',
    status: 'Expired',
    expiryDate: '2024-06-01',
    uploadDate: '2023-05-20',
    details: 'No additional details for this.'
  },
  {
    id: '4',
    name: 'Training Certificate',
    status: 'Expired',
    expiryDate: '2024-07-01',
    uploadDate: '2023-06-15',
    details: 'No additional details for this.'
  },
];

const statusConfig: { [key in Document['status']]: { icon: React.ElementType, color: string, text: string } } = {
    Verified: { icon: FileCheck2, color: 'bg-green-100 text-green-800 border-green-200', text: 'Verified' },
    'Expiring Soon': { icon: FileClock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Expiring Soon' },
    Expired: { icon: FileX2, color: 'bg-red-100 text-red-800 border-red-200', text: 'Expired' },
    Missing: { icon: FileWarning, color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Missing' },
    Pending: { icon: FileClock, color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Pending' },
    Flagged: { icon: ShieldAlert, color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Flagged' },
}


const StatusBadge = ({ status }: { status: Document['status'] }) => {
  const config = statusConfig[status];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`capitalize ${config.color}`}>
      <Icon className="mr-1 h-3 w-3" />
      {config.text}
    </Badge>
  );
};

const DocumentCard = ({ doc }: { doc: Document}) => {
    return (
        <Card>
            <CardHeader className='pb-2'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-2'>
                        <File className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <CardTitle className="text-base">{doc.name}</CardTitle>
                             <p className='text-xs text-muted-foreground'>Uploaded: {doc.uploadDate ? <SafeDate dateString={doc.uploadDate} /> : 'N/A'}</p>
                        </div>
                    </div>
                    <StatusBadge status={doc.status} />
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{doc.details}</p>
                 <div className="flex items-center gap-2">
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary">View</Button>
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary">Download</Button>
                    <Button variant="link" size="sm" className="p-0 h-auto text-destructive">Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Documents</CardTitle>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <UploadCloud className="h-5 w-5" />
                </Button>
                 <Button variant="ghost" size="icon">
                    <FileUp className="h-5 w-5" />
                </Button>
            </div>
        </div>
        <CardDescription>
          Upload CV, ID/Passport, Work Permit/Visa, Proof of address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
