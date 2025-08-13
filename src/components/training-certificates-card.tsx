'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';
import { UploadCloud, User, PlusCircle, CalendarIcon, Loader2 } from 'lucide-react';
import { differenceInDays, format, parse } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

const initialCertificates = [
  { id: '1', name: 'Cutler Card', provider: 'Islandview Gate', certNo: 'MW85236', expiry: '06 Mar 2025' },
  { id: '2', name: 'First Aid Certificate', provider: 'Dantran', certNo: 'FA95124', expiry: '12 Apr 2025' },
  { id: '3', name: 'Induction', provider: 'Platinum Mine', certNo: '74125GF', expiry: '10 Jul 2025' },
  { id: '4', name: 'Acces Card', provider: 'Platinum Mine', certNo: '4568RFT', expiry: '25 Jul 2025' },
  { id: '5', name: 'PrDP', provider: 'DOT', certNo: 'PDP789654', expiry: '10 Sep 2025' },
  { id: '6', name: 'Drivers License', provider: 'DOT', certNo: '12547H7UY52', expiry: '08 Aug 2029' },
  { id: '7', name: 'Medical Certificate', provider: 'Dr.Williams', certNo: 'MP8521', expiry: '07 Mar 2025' },
  { id: '8', name: 'Firefighting Certificate', provider: 'Hazchem', certNo: '9632', expiry: '07 Jul 2025' },
  { id: '9', name: 'Dangerous Goods', provider: 'Dantran', certNo: '1452', expiry: '05 May 2026' },
];

const addCertificateSchema = z.object({
  name: z.string().min(1, 'Certificate name is required.'),
  provider: z.string().min(1, 'Provider is required.'),
  certNo: z.string().min(1, 'Certificate number is required.'),
  startDate: z.date({ required_error: 'Start date is required.' }),
  expiry: z.date({ required_error: 'Expiry date is required.' }),
}).refine(data => data.expiry > data.startDate, {
  message: 'Expiry date must be after the start date.',
  path: ['expiry'],
});

const RenewalCountdown = ({ expiryDate }: { expiryDate: string }) => {
  const [days, setDays] = useState<number | null>(null);

  useState(() => {
    try {
      const expiry = parse(expiryDate, 'dd MMM yyyy', new Date());
      const remainingDays = differenceInDays(expiry, new Date());
      setDays(remainingDays);
    } catch (error) {
      console.error("Error parsing date:", expiryDate, error);
      setDays(null);
    }
  });

  if (days === null) {
    return <TableCell>Invalid Date</TableCell>;
  }

  if (days < 0) {
    return <TableCell className="text-red-500 font-medium">Expired</TableCell>;
  }

  return <TableCell className="text-green-600 font-medium">{days} days</TableCell>;
};

function AddCertificateForm({ onCertificateAdd }: { onCertificateAdd: (newCert: typeof initialCertificates[0]) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addCertificateSchema>>({
    resolver: zodResolver(addCertificateSchema),
  });

  async function onSubmit(data: z.infer<typeof addCertificateSchema>) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCertificate = {
      id: `cert-${Date.now()}`,
      name: data.name,
      provider: data.provider,
      certNo: data.certNo,
      expiry: format(data.expiry, 'dd MMM yyyy'),
    };
    onCertificateAdd(newCertificate);

    setIsLoading(false);
    setIsOpen(false);
    form.reset();
    toast({
      title: 'Certificate Added!',
      description: `"${newCertificate.name}" has been added to your records.`,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Certificate</DialogTitle>
          <DialogDescription>
            Enter the details of your new training certificate.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Advanced Defensive Driving" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <FormControl><Input placeholder="e.g., Dantran" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="certNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate No.</FormLabel>
                      <FormControl><Input placeholder="e.g., AD12345" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Certificate
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function TrainingCertificatesCard() {
  const [certificates, setCertificates] = useState(initialCertificates);

  const handleCertificateAdd = (newCert: typeof initialCertificates[0]) => {
    setCertificates(prev => [newCert, ...prev]);
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Training & Certificates</CardTitle>
          <div className="flex items-center gap-2">
            <AddCertificateForm onCertificateAdd={handleCertificateAdd} />
            <Button variant="ghost" size="icon">
                <UploadCloud className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Manage and track your training certificates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>PROVIDER</TableHead>
                <TableHead>CERTIFICATE NO.</TableHead>
                <TableHead>EXPIRY DATE</TableHead>
                <TableHead>RENEWAL IN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.name}</TableCell>
                  <TableCell>{cert.provider}</TableCell>
                  <TableCell>{cert.certNo}</TableCell>
                  <TableCell>{cert.expiry}</TableCell>
                  <RenewalCountdown expiryDate={cert.expiry} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
