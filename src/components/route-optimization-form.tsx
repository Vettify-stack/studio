
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Map, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const formSchema = z.object({
  startLocation: z.string().min(1, 'Start location is required.'),
  endLocation: z.string().min(1, 'End location is required.'),
  avoidTolls: z.boolean().default(false),
  avoidUnrest: z.boolean().default(false),
  minimizeDistance: z.boolean().default(false),
  minimizeFuel: z.boolean().default(false),
  useRealTimeData: z.boolean().default(true),
});

export default function RouteOptimizationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: 'JHB Mine',
      endLocation: 'Richards Bay Port',
      avoidTolls: false,
      avoidUnrest: true,
      minimizeDistance: false,
      minimizeFuel: true,
      useRealTimeData: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log('Route Optimization Input:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: 'Route Optimized',
      description: 'The Route Optimization card has been updated with the new data.',
    });
  };

  return (
    <Card className="bg-teal-50 border-teal-200">
      <CardHeader>
        <CardTitle className="text-teal-900">2. AI Route Optimization Input</CardTitle>
        <CardDescription className="text-teal-800">Provide route details to generate an optimized plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., JHB Mine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Richards Bay Port" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Constraints</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="avoidTolls"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Avoid Tolls</FormLabel>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="avoidUnrest"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Avoid Unrest</FormLabel>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="minimizeDistance"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Minimize Distance</FormLabel>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="minimizeFuel"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Minimize Fuel</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="useRealTimeData"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                  <div className="space-y-0.5">
                    <FormLabel>Use Real-Time Data</FormLabel>
                    <FormDescription>Integrate weather, traffic, and road conditions.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Map className="mr-2 h-4 w-4" />}
                Optimize Route
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
