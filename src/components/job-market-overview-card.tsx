
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Briefcase, Loader2 } from 'lucide-react';
import SafeDate from './safe-date';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const pendingJobs = [
  {
    id: 'JP003',
    title: 'Fleet Manager',
    postedBy: 'XYZ Logistics',
    date: '2025-08-05',
  },
  {
    id: 'JP004',
    title: 'Cross-Border Driver',
    postedBy: 'XYZ Logistics',
    date: '2025-08-06',
  },
];

const jobPostingSchema = z.object({
    title: z.string().min(1, 'Job title is required.'),
    company: z.string().min(1, 'Company name is required.'),
    location: z.string().min(1, 'Location is required.'),
    type: z.enum(['Full-time', 'Part-time', 'Contract']),
    description: z.string().min(20, 'Please provide a job description (min. 20 characters).'),
});

function JobPostingForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof jobPostingSchema>>({
        resolver: zodResolver(jobPostingSchema),
        defaultValues: {
            title: '',
            company: '',
            location: '',
            type: 'Full-time',
            description: ''
        }
    });

    const onSubmit = async (data: z.infer<typeof jobPostingSchema>) => {
        setIsLoading(true);
        console.log('Submitting new job:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        form.reset();
        toast({
            title: 'Job Posted Successfully!',
            description: `${data.title} at ${data.company} has been listed.`
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl><Input placeholder="e.g., Long-Haul Truck Driver" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl><Input placeholder="e.g., Mega Movers Inc." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl><Input placeholder="e.g., Johannesburg" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl><Textarea placeholder="Describe the job requirements, responsibilities, etc." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Post Job
                </Button>
            </form>
        </Form>
    )
}

export default function JobMarketOverviewCard() {
  return (
    <Card className="bg-yellow-50 border-yellow-100 transition-all hover:shadow-lg hover:-translate-y-1 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-yellow-900">Job Market Overview</CardTitle>
          <Briefcase className="h-5 w-5 text-yellow-700" />
        </div>
        <CardDescription className="text-yellow-800">
          Overview of pending jobs, successful placements, and job posting facility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Jobs Pending</TabsTrigger>
            <TabsTrigger value="placements">Job Placements</TabsTrigger>
            <TabsTrigger value="post_job">Post a Job</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4">
            <h3 className="font-semibold mb-2 text-yellow-900">Pending Jobs</h3>
            <div className="border rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>JOB ID</TableHead>
                    <TableHead>TITLE</TableHead>
                    <TableHead>POSTED BY</TableHead>
                    <TableHead>DATE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.postedBy}</TableCell>
                      <TableCell>
                        <SafeDate dateString={job.date} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="placements" className="mt-4">
            <div className="text-center p-8 border-2 border-dashed border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                Job placement data will be displayed here.
              </p>
            </div>
          </TabsContent>
           <TabsContent value="post_job" className="mt-4">
              <h3 className="font-semibold mb-2 text-yellow-900">Create a New Job Listing</h3>
               <div className="p-4 border rounded-lg bg-white">
                <JobPostingForm />
               </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
