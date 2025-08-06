
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
import { UploadCloud, FileCheck2, FileClock, FileX2, FileWarning } from 'lucide-react';
import type { Document } from '@/lib/types';
import SafeDate from './safe-date';

const initialDocuments: Document[] = [
  {
    id: '1',
    name: "Driver's License",
    status: 'Verified',
    expiryDate: '2026-10-15',
  },
  {
    id: '2',
    name: 'Professional Driving Permit (PrDP)',
    status: 'Expiring Soon',
    expiryDate: '2024-08-30',
  },
  {
    id: '3',
    name: 'ID Document',
    status: 'Verified',
  },
  {
    id: '4',
    name: 'First-Aid Training Certificate',
    status: 'Expired',
    expiryDate: '2024-06-01',
  },
  {
    id: '5',
    name: 'Defensive Driving Certificate',
    status: 'Missing',
  },
];

const statusConfig = {
    Verified: {
        icon: FileCheck2,
        color: 'bg-green-100 text-green-800 border-green-200',
        text: 'Verified'
    },
    'Expiring Soon': {
        icon: FileClock,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        text: 'Expiring Soon'
    },
    Expired: {
        icon: FileX2,
        color: 'bg-red-100 text-red-800 border-red-200',
        text: 'Expired'
    },
    Missing: {
        icon: FileWarning,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        text: 'Missing'
    }
}


const StatusBadge = ({ status }: { status: Document['status'] }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`capitalize ${config.color}`}>
      <Icon className="mr-1 h-3 w-3" />
      {config.text}
    </Badge>
  );
};

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const handleUploadClick = (docId: string) => {
    // In a real app, this would open a file picker dialog.
    console.log(`Upload for document ${docId} clicked.`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>
          Keep your required documents up-to-date to ensure compliance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4"
            >
              <div className="grid gap-1 mb-4 sm:mb-0">
                <p className="font-semibold">{doc.name}</p>
                <div className="flex items-center gap-2">
                    <StatusBadge status={doc.status} />
                    {doc.expiryDate && (
                        <p className="text-xs text-muted-foreground">
                            Expires on <SafeDate dateString={doc.expiryDate} />
                        </p>
                    )}
                </div>
              </div>
              <Button size="sm" onClick={() => handleUploadClick(doc.id)} disabled={doc.status === 'Verified'}>
                <UploadCloud className="mr-2 h-4 w-4" />
                {doc.status === 'Missing' ? 'Upload Document' : 'Update Document'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
