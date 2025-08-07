
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Siren, Loader2 } from 'lucide-react';

const sosSchema = z.object({
  incidentType: z.string().min(1, 'Please select an incident type.'),
  description: z.string().min(10, 'Please provide a brief description (min. 10 characters).'),
});

export default function SosDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof sosSchema>>({
    resolver: zodResolver(sosSchema),
    defaultValues: {
      incidentType: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof sosSchema>) => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // The report will also be sent to the "Nosy Corner" on the super admin dashboard.
    console.log('SOS Report:', values);

    setIsSubmitting(false);
    setIsDialogOpen(false);
    form.reset();
    
    toast({
      title: 'SOS Report Sent',
      description: 'Your report has been successfully sent to your employer and super admin.',
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full justify-start bg-red-600 hover:bg-red-700 text-white">
          <Siren className="mr-2 h-4 w-4" />
          SOS Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                <DialogTitle>Emergency SOS Report</DialogTitle>
                <DialogDescription>
                    Use this form only in an emergency. Your employer will be notified immediately.
                </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <FormField
                    control={form.control}
                    name="incidentType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Type of Incident</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an incident type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="mechanical_failure">Mechanical Failure</SelectItem>
                            <SelectItem value="accident">Accident</SelectItem>
                            <SelectItem value="medical_emergency">Medical Emergency</SelectItem>
                            <SelectItem value="theft_or_hijacking">Theft or Hijacking</SelectItem>
                            <SelectItem value="unexpected_delay">Report Unexpected Delay</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Brief Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Briefly describe the situation. e.g., 'Engine overheating on N1 highway near Midrand.'"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="destructive" disabled={!form.formState.isValid || isSubmitting}>
                                Send SOS Report
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will immediately send an emergency alert to your employer. 
                                Use only in a genuine emergency.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Yes, send alert
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
