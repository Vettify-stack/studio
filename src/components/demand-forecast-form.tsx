
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const formSchema = z.object({
  forecastPeriod: z.string().min(1, 'Forecast period is required.'),
  demandDataFile: z.any().optional(),
  driverAvailability: z.coerce.number().int().positive('Must be a positive number.'),
  truckAvailability: z.coerce.number().int().positive('Must be a positive number.'),
  fuelAvailability: z.coerce.number().int().positive('Must be a positive number.'),
  inventoryHealth: z.coerce.number().int().min(0).max(100, 'Must be between 0 and 100.'),
});

export default function DemandForecastForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        forecastPeriod: '4',
        driverAvailability: 120,
        truckAvailability: 95,
        fuelAvailability: 50000,
        inventoryHealth: 85,
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log('Demand Forecast Input:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: 'Forecast Generated',
      description: 'The Demand Forecast card has been updated with the new data.',
    });
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-900">1. Demand Forecast Input</CardTitle>
        <CardDescription className="text-blue-800">Provide data to generate a demand forecast.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="forecastPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forecast Period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Next 1 Week</SelectItem>
                        <SelectItem value="2">Next 2 Weeks</SelectItem>
                        <SelectItem value="3">Next 3 Weeks</SelectItem>
                        <SelectItem value="4">Next 4 Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="demandDataFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Demand Data (CSV/Excel)</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="driverAvailability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver Availability</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="truckAvailability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Truck Availability</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 95" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="fuelAvailability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Availability (Liters)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="inventoryHealth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inventory Health (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 85" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                Generate Forecast
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
