
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Car, Building, Stethoscope, ShieldHalf } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

const driverFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  idNumber: z.string().min(1, 'ID number is required.'),
  passportNumber: z.string().optional(),
  licenseNumber: z.string().min(1, 'Driver’s license number is required.'),
  prdpNumber: z.string().min(1, 'PrDP number is required.'),
  contactNumber: z.string().min(10, 'A valid contact number is required.'),
  email: z.string().email('Please enter a valid email address.'),
  lastMedicalCheck: z.date({
    required_error: 'Last medical check date is required.',
  }),
  medicalExpiryDate: z.date({
    required_error: 'Medical certificate expiry date is required.',
  }),
  complianceStatus: z.enum(['Valid', 'Suspended', 'Pending Renewal']),
  employer: z.string().min(1, 'Employer or association is required.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

const companyFormSchema = z.object({
    companyName: z.string().min(1, 'Company name is required.'),
    registrationNumber: z.string().min(1, 'Registration number is required.'),
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
});

const gpFormSchema = z.object({
    fullName: z.string().min(1, 'Full name is required.'),
    hpcsaNumber: z.string().min(1, 'HPCSA number is required.'),
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
});

function DriverForm() {
  const form = useForm<z.infer<typeof driverFormSchema>>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      fullName: '',
      idNumber: '',
      passportNumber: '',
      licenseNumber: '',
      prdpNumber: '',
      contactNumber: '',
      email: '',
      complianceStatus: 'Valid',
      employer: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof driverFormSchema>) {
    console.log(data);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your ID Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="For foreign drivers" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver's License Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your license number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="prdpNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PrDP Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your PrDP number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="082 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="lastMedicalCheck"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Last Medical Check Date</FormLabel>
                    <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                        <Button
                            variant={'outline'}
                            className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                            )}
                        >
                            {field.value ? (
                            format(field.value, 'PPP')
                            ) : (
                            <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="medicalExpiryDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Medical Certificate Expiry Date</FormLabel>
                    <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                        <Button
                            variant={'outline'}
                            className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                            )}
                        >
                            {field.value ? (
                            format(field.value, 'PPP')
                            ) : (
                            <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
                )}
            />
         </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="complianceStatus"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Driver Compliance Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Valid">Valid</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                        <SelectItem value="Pending Renewal">Pending Renewal</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="employer"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Employer or Taxi Association</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., FleetCo" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className="w-full">
          Create Driver Account
        </Button>
      </form>
    </Form>
  );
}

function CompanyForm() {
    const form = useForm<z.infer<typeof companyFormSchema>>({
        resolver: zodResolver(companyFormSchema),
        defaultValues: { companyName: "", registrationNumber: "", email: "", password: "" },
    });

    function onSubmit(data: z.infer<typeof companyFormSchema>) {
        console.log(data);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl><Input placeholder="e.g., ABC Transport" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Registration Number</FormLabel>
                            <FormControl><Input placeholder="Your company's registration number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="company@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Create Company Account</Button>
            </form>
        </Form>
    );
}

function GpForm() {
    const form = useForm<z.infer<typeof gpFormSchema>>({
        resolver: zodResolver(gpFormSchema),
        defaultValues: { fullName: "", hpcsaNumber: "", email: "", password: "" },
    });

     function onSubmit(data: z.infer<typeof gpFormSchema>) {
        console.log(data);
    }

    return (
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="Dr. Jane Smith" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="hpcsaNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>HPCSA Number</FormLabel>
                            <FormControl><Input placeholder="Your HPCSA registration number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="doctor@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Create GP Account</Button>
            </form>
        </Form>
    );
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Tabs defaultValue="driver" className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
             <div className="flex justify-center items-center gap-2 mb-4">
                <ShieldHalf className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Vettify</h1>
            </div>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Choose your role and fill in the details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="driver"><Car className="mr-2 h-4 w-4" />Driver</TabsTrigger>
              <TabsTrigger value="company"><Building className="mr-2 h-4 w-4" />Company</TabsTrigger>
              <TabsTrigger value="gp"><Stethoscope className="mr-2 h-4 w-4" />Medical GP</TabsTrigger>
            </TabsList>
            <TabsContent value="driver">
                <DriverForm />
            </TabsContent>
            <TabsContent value="company">
                <CompanyForm />
            </TabsContent>
            <TabsContent value="gp">
                <GpForm />
            </TabsContent>
          </CardContent>
          <CardFooter className="flex-col">
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
}
