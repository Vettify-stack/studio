
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
import { UploadCloud, FileCheck2, FileClock, FileX2, FileWarning, ShieldCheck, ShieldAlert, ShieldX, MoreVertical, FileUp } from 'lucide-react';
import type { Document } from '@/lib/types';
import SafeDate from './safe-date';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const initialDocuments: Document[] = [
  {
    id: '1',
    name: "Driver's License",
    status: 'Verified',
    expiryDate: '2026-10-15',
    adminActions: ['Flag', 'Suspend'],
  },
  {
    id: '2',
    name: 'Professional Driving Permit (PrDP)',
    status: 'Expiring Soon',
    expiryDate: '2024-08-30',
    adminActions: ['Flag', 'Suspend'],
  },
  {
    id: '3',
    name: 'ID Document',
    status: 'Pending',
    adminActions: ['Approve', 'Flag'],
  },
  {
    id: '4',
    name: 'First-Aid Training Certificate',
    status: 'Expired',
    expiryDate: '2024-06-01',
    adminActions: ['Approve', 'Flag'],
  },
  {
    id: '5',
    name: 'Defensive Driving Certificate',
    status: 'Missing',
  },
   {
    id: '6',
    name: 'AARTO Infringement',
    status: 'Flagged',
    expiryDate: '2024-09-12',
    adminActions: ['Approve', 'Suspend'],
  },
];

const statusConfig = {
    Verified: { icon: FileCheck2, color: 'bg-green-100 text-green-800 border-green-200', text: 'Verified' },
    'Expiring Soon': { icon: FileClock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Expiring Soon' },
    Expired: { icon: FileX2, color: 'bg-red-100 text-red-800 border-red-200', text: 'Expired' },
    Missing: { icon: FileWarning, color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Missing' },
    Pending: { icon: FileClock, color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Pending Review' },
    Flagged: { icon: ShieldAlert, color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Flagged' },
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
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
        // Mock upload
        const target = e.target as HTMLInputElement;
        if(target.files) {
            console.log(`Uploading ${target.files[0].name} for document ${docId}`);
             setDocuments(docs => docs.map(d => d.id === docId ? {...d, status: 'Pending'} : d));
        }
    }
    input.click();
  }
  
  const handleAdminAction = (docId: string, action: string) => {
      console.log(`Admin action: ${action} on doc ${docId}`);
      // In a real app, this would trigger a backend API call.
      // For now, just update the local state to reflect the change.
      if(action === 'Approve') {
          setDocuments(docs => docs.map(d => d.id === docId ? {...d, status: 'Verified'} : d));
      } else if (action === 'Flag') {
          setDocuments(docs => docs.map(d => d.id === docId ? {...d, status: 'Flagged'} : d));
      } else if (action === 'Suspend') {
          setDocuments(docs => docs.map(d => d.id === docId ? {...d, status: 'Expired'} : d)); // Or a new "Suspended" status
      }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Timeline & Certificates</CardTitle>
        <CardDescription>
          Manage required documents to ensure compliance. Upload new certificates and monitor expiry dates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4 gap-4"
            >
              <div className="grid gap-1 flex-1">
                <p className="font-semibold">{doc.name}</p>
                <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge status={doc.status} />
                    {doc.expiryDate && (
                        <p className="text-xs text-muted-foreground">
                            Expires on <SafeDate dateString={doc.expiryDate} />
                        </p>
                    )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                 {doc.status !== 'Verified' && (
                    <Button size="sm" variant="outline" onClick={() => handleUploadClick(doc.id)}>
                        <FileUp className="mr-2 h-4 w-4" />
                        {doc.status === 'Missing' ? 'Upload' : 'Update'}
                    </Button>
                 )}
                {doc.adminActions && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {doc.adminActions.includes('Approve') && <DropdownMenuItem onClick={() => handleAdminAction(doc.id, 'Approve')}><ShieldCheck className="mr-2 h-4 w-4" />Approve</DropdownMenuItem>}
                            {doc.adminActions.includes('Flag') && <DropdownMenuItem onClick={() => handleAdminAction(doc.id, 'Flag')}><ShieldAlert className="mr-2 h-4 w-4" />Flag</DropdownMenuItem>}
                            {doc.adminActions.includes('Suspend') && <DropdownMenuItem onClick={() => handleAdminAction(doc.id, 'Suspend')}><ShieldX className="mr-2 h-4 w-4" />Suspend</DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
