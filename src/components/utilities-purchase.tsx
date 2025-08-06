
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Smartphone,
  Wifi,
  Zap,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const airtimeSchema = z.object({
  network: z.string().min(1, 'Please select a network provider'),
  phoneNumber: z.string().regex(/^0\d{9}$/, 'Invalid phone number (e.g., 0821234567)'),
  amount: z.string().min(1, 'Please select an amount'),
});

const dataSchema = z.object({
  network: z.string().min(1, 'Please select a network provider'),
  phoneNumber: z.string().regex(/^0\d{9}$/, 'Invalid phone number'),
  bundle: z.string().min(1, 'Please select a bundle'),
});

const electricitySchema = z.object({
  meterNumber: z.string().min(6, 'Invalid meter number'),
  amount: z.string().min(2, 'Amount must be at least R50').refine(val => parseInt(val) >= 50, {message: 'Amount must be at least R50'}),
});

type PurchaseResult = {
  type: 'Airtime' | 'Data' | 'Electricity';
  message: string;
  token?: string;
}

export default function UtilitiesPurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null);
  const { toast } = useToast();
  
  const airtimeForm = useForm<z.infer<typeof airtimeSchema>>({
    resolver: zodResolver(airtimeSchema),
    defaultValues: { network: '', phoneNumber: '', amount: '' },
  });
  
  const dataForm = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    defaultValues: { network: '', phoneNumber: '', bundle: '' },
  });

  const electricityForm = useForm<z.infer<typeof electricitySchema>>({
    resolver: zodResolver(electricitySchema),
    defaultValues: { meterNumber: '', amount: '' },
  });

  const handlePurchase = async (type: 'Airtime' | 'Data' | 'Electricity', data: any) => {
    setIsLoading(true);
    setPurchaseResult(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: 'Purchase Successful!',
      description: `Your ${type} purchase was completed.`,
    });
    
    let result: PurchaseResult = {
      type,
      message: `Your ${type} purchase was successful! A confirmation has been sent.`
    };
    
    if (type === 'Electricity') {
      // Generate a random token for simulation
      const token = [
        Math.floor(Math.random() * 10000),
        Math.floor(Math.random() * 10000),
        Math.floor(Math.random() * 10000),
        Math.floor(Math.random() * 10000),
        Math.floor(Math.random() * 10000)
      ].join(' ').padStart(20, '0');
      result.token = token;
      result.message = 'Electricity purchase successful! Your token is displayed below.'
    }
    
    setPurchaseResult(result);

    // Reset forms
    airtimeForm.reset();
    dataForm.reset();
    electricityForm.reset();
  };

  const renderSuccessMessage = () => (
    <div className="text-center p-8 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
      <CheckCircle className="w-16 h-16 text-green-500" />
      <h3 className="text-xl font-bold">Purchase Complete</h3>
      <p className="text-muted-foreground">
        {purchaseResult?.message}
      </p>
      {purchaseResult?.type === 'Electricity' && purchaseResult.token && (
        <div className="w-full p-4 my-2 bg-muted rounded-lg">
          <p className="text-sm font-semibold text-muted-foreground">Your electricity token:</p>
          <p className="text-2xl font-mono tracking-widest text-primary">{purchaseResult.token}</p>
        </div>
      )}
      <Button onClick={() => setPurchaseResult(null)}>Make Another Purchase</Button>
    </div>
  )

  if (purchaseResult) {
    return renderSuccessMessage();
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <CardTitle>Utilities</CardTitle>
        </div>
        <CardDescription>
          Buy airtime, data, or electricity vouchers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="airtime" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="airtime">
              <Smartphone className="mr-2 h-4 w-4" /> Airtime
            </TabsTrigger>
            <TabsTrigger value="data">
              <Wifi className="mr-2 h-4 w-4" /> Data
            </TabsTrigger>
            <TabsTrigger value="electricity">
              <Zap className="mr-2 h-4 w-4" /> Electricity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="airtime" className="mt-4">
            <Form {...airtimeForm}>
              <form onSubmit={airtimeForm.handleSubmit((data) => handlePurchase('Airtime', data))} className="space-y-6">
                 <FormField
                  control={airtimeForm.control}
                  name="network"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a network provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vodacom">Vodacom</SelectItem>
                          <SelectItem value="mtn">MTN</SelectItem>
                          <SelectItem value="cellc">Cell C</SelectItem>
                          <SelectItem value="telkom">Telkom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={airtimeForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0821234567" {...field} />
                      </FormControl>
                      <FormDescription>Enter the number to top-up.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={airtimeForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an amount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10">R10</SelectItem>
                          <SelectItem value="20">R20</SelectItem>
                          <SelectItem value="50">R50</SelectItem>
                          <SelectItem value="100">R100</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Purchase Airtime
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="data" className="mt-4">
             <Form {...dataForm}>
              <form onSubmit={dataForm.handleSubmit((data) => handlePurchase('Data', data))} className="space-y-6">
                 <FormField
                  control={dataForm.control}
                  name="network"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a network provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vodacom">Vodacom</SelectItem>
                          <SelectItem value="mtn">MTN</SelectItem>
                          <SelectItem value="cellc">Cell C</SelectItem>
                          <SelectItem value="telkom">Telkom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={dataForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0821234567" {...field} />
                      </FormControl>
                       <FormDescription>Enter the number to send data to.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={dataForm.control}
                  name="bundle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Bundle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a data bundle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1GB">1GB - R85</SelectItem>
                          <SelectItem value="2GB">2GB - R149</SelectItem>
                          <SelectItem value="5GB">5GB - R349</SelectItem>
                          <SelectItem value="10GB">10GB - R599</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Purchase Data
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="electricity" className="mt-4">
             <Form {...electricityForm}>
              <form onSubmit={electricityForm.handleSubmit((data) => handlePurchase('Electricity', data))} className="space-y-6">
                <FormField
                  control={electricityForm.control}
                  name="meterNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meter Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your 11-digit meter number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={electricityForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (R)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 250" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Purchase Electricity
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
