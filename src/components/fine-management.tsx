
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
import { Button } from '@/components/ui/button';
import { AlertTriangle, CreditCard, Download, ShieldAlert, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


const fines = [
    {
        fineNumber: '123456789',
        date: '2025-06-06',
        offence: 'Drive right through stop Sign',
        amount: 150,
    }
]

const disputeFormSchema = z.object({
    fineNumber: z.string().min(1, 'Fine number is required.'),
    reason: z.string().min(20, 'Please provide a detailed reason (min. 20 characters).'),
    evidence: z.custom<FileList>().optional(),
});


export default function FineManagementCard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof disputeFormSchema>>({
        resolver: zodResolver(disputeFormSchema),
        defaultValues: {
            fineNumber: fines[0]?.fineNumber || '',
            reason: '',
        }
    });

    const handleDisputeSubmit = async (values: z.infer<typeof disputeFormSchema>) => {
        setIsLoading(true);
        // Mock submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsDialogOpen(false);
        form.reset();

        toast({
            title: 'Dispute Submitted',
            description: `Your dispute for fine #${values.fineNumber} has been filed.`
        });
    }

  return (
    <Card className="bg-destructive/80 text-destructive-foreground h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>Fine Management</CardTitle>
            <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <AlertTriangle className="h-4 w-4" />
            </div>
        </div>
        <CardDescription className="text-destructive-foreground/80">
          View and manage outstanding fines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Outstanding Fines</h4>
        <div className="border rounded-lg border-destructive-foreground/20">
            <Table>
                <TableHeader>
                    <TableRow className="border-b-destructive-foreground/20 hover:bg-transparent">
                        <TableHead className="text-destructive-foreground/80">FINE NUMBER</TableHead>
                        <TableHead className="text-destructive-foreground/80">DATE</TableHead>
                        <TableHead className="text-destructive-foreground/80">OFFENCE</TableHead>
                        <TableHead className="text-destructive-foreground/80 text-right">AMOUNT</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fines.map((fine, index) => (
                        <TableRow key={index} className="border-b-destructive-foreground/20 hover:bg-transparent">
                            <TableCell>{fine.fineNumber}</TableCell>
                            <TableCell>{fine.date}</TableCell>
                            <TableCell>{fine.offence}</TableCell>
                            <TableCell className="text-right">R {fine.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Selected
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Dispute Fine
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit a Fine Dispute</DialogTitle>
                        <DialogDescription>
                            Please fill out the form below to submit a formal dispute for a traffic fine.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleDisputeSubmit)} className="space-y-4">
                             <FormField
                                control={form.control}
                                name="fineNumber"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fine Number</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter the fine number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason for Dispute</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="Explain in detail why you are disputing this fine..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="evidence"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Supporting Evidence (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit Dispute
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
