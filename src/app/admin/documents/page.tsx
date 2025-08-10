
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { File, Download, Copy, UploadCloud, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const certificates = [
  { driver: 'Super Admin', name: 'Cutler Card', provider: 'Islandview Gate', certNo: 'MW85236', expiry: '06 Mar 2025', renewalIn: 'Expired' },
  { driver: 'Super Admin', name: 'First Aid Certificate', provider: 'Dantran', certNo: 'FA95124', expiry: '12 Apr 2025', renewalIn: 'Expired' },
  { driver: 'Super Admin', name: 'Induction', provider: 'Platinum Mine', certNo: '74125GF', expiry: '10 Jul 2025', renewalIn: 'Expired' },
  { driver: 'Super Admin', name: 'Acces Card', provider: 'Platinum Mine', certNo: '4568RFT', expiry: '25 Jul 2025', renewalIn: 'Expired' },
  { driver: 'Super Admin', name: 'PrDP', provider: 'DOT', certNo: 'PDP789654', expiry: '10 Sep 2025', renewalIn: '30 days' },
  { driver: 'Super Admin', name: 'Drivers License', provider: 'DOT', certNo: '12547H7UY52', expiry: '08 Aug 2029', renewalIn: '1458 days' },
  { driver: 'Super Admin', name: 'Medical Certificate', provider: 'Dr.Williams', certNo: 'MP8521', expiry: '07 Mar 2025', renewalIn: 'Expired' },
  { driver: 'Super Admin', name: 'Firefighting Certificate', provider: 'Hazchem', certNo: '9632', expiry: '07 Jul 2025', renewalIn: 'Expired' },
];

const documents = [
    { user: 'Super Admin', type: "Driver's License", uploaded: '25 Jun 2025', details: 'No additional details for this document type.'},
    { user: 'Super Admin', type: 'Traffic fine', uploaded: '21 Jun 2025', details: 'No details provided.'},
    { user: 'Super Admin', type: 'Resume', uploaded: '21 Jun 2025', details: 'No additional details for this document type.'},
    { user: 'Super Admin', type: 'ID Document', uploaded: '21 Jun 2025', details: 'ID Number: 9007... Type: SA ID'},
]

const DocumentCard = ({ doc }: { doc: typeof documents[0] }) => {
    return (
      <Card>
        <CardHeader className="pb-2">
            <div className='flex items-center gap-2'>
                <File className="h-5 w-5 text-muted-foreground" />
                <div>
                     <p className='text-sm'><Badge variant="secondary" className="mr-2">{doc.user}</Badge>{doc.type}</p>
                     <p className='text-xs text-muted-foreground'>Uploaded: {doc.uploaded}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className='text-sm text-muted-foreground min-h-[40px]'>{doc.details}</p>
        </CardContent>
        <CardFooter>
            <div className="flex items-center gap-2 text-sm">
                <Link href="#" className="text-primary hover:underline">View</Link>
                <Link href="#" className="text-primary hover:underline">Download</Link>
                <Link href="#" className="text-destructive hover:underline">Delete</Link>
            </div>
        </CardFooter>
      </Card>
    );
  };

export default function DocumentsPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Action: ${action}`,
            description: `This would trigger the ${action.toLowerCase()} functionality.`,
        })
    }
  
    return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Training & Certificates Management</CardTitle>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleAction('Download All')}>
                    <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleAction('Copy All')}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <CardDescription>
            Manage and verify all training certificates across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DRIVER</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>PROVIDER</TableHead>
                  <TableHead>CERTIFICATE NO.</TableHead>
                  <TableHead>EXPIRY DATE</TableHead>
                  <TableHead>RENEWAL IN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.certNo}>
                    <TableCell className="font-medium">{cert.driver}</TableCell>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>{cert.provider}</TableCell>
                    <TableCell>{cert.certNo}</TableCell>
                    <TableCell>{cert.expiry}</TableCell>
                    <TableCell className={cert.renewalIn === 'Expired' ? 'text-destructive font-medium' : ''}>
                        {cert.renewalIn}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
           <div className="flex items-center justify-between">
                <CardTitle>Documents Management</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleAction('Upload')}>
                        <UploadCloud className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction('Delete All')}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </div>
          <CardDescription>
            Manage all user documents across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
                <DocumentCard key={index} doc={doc} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
