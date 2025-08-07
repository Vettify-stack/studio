'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, UploadCloud, Users } from 'lucide-react';

const documents = [
  {
    name: 'CIPC Registration',
    issueDate: '07-09-2023',
    expiryDate: 'N/A',
  },
  {
    name: 'BBBEE Certificate',
    issueDate: '11-10-2024',
    expiryDate: '11-10-2025',
  },
  {
    name: 'Goods In Transit Insurance',
    issueDate: '19-01-2025',
    expiryDate: '19-01-2026',
  },
];

export default function CompanyDocumentsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Company Documents</CardTitle>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          CIPC, BBBEE, Additional Permits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Official Documents</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DOCUMENT</TableHead>
                  <TableHead>ISSUE DATE</TableHead>
                  <TableHead>EXPIRY DATE</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.name}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.issueDate}</TableCell>
                    <TableCell>{doc.expiryDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Users className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="font-semibold mb-1">
            Drag 'n' drop files here, or click to select
          </p>
          <p className="text-xs text-muted-foreground">
            Max 5 files. Accepted: PDF, DOCX, JPG, PNG (Max 5MB each)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
