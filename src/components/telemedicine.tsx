
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
  HeartPulse,
  Video,
  FileText,
  ClipboardList,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Loader2,
  CreditCard,
  Banknote,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Appointment } from '@/lib/types';
import { cn } from '@/lib/utils';
import SafeDate from './safe-date';

const timeSlots = ['09:00', '11:00', '14:00', '16:00'];

const paymentSchema = z.object({
  cardName: z.string().min(1, 'Name on card is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3}$/, 'Invalid CVV'),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
});

export default function Telemedicine() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'selection' | 'payment' | 'confirmation'>(
    'selection'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const handlePaymentSubmit = async (values: z.infer<typeof paymentSchema>)=> {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Use dummy data check
    if (values.cardNumber === '4111111111111111' && values.expiryDate === '12/26' && values.cvv === '123') {
      const appointment: Appointment = {
        id: new Date().toISOString(),
        date: selectedDate!,
        time: selectedTime!,
        type: 'Virtual Consultation',
      };
      setBookedAppointment(appointment);
      setStep('confirmation');
      toast({
        title: 'Payment Successful!',
        description: 'Your booking is confirmed.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Payment Failed',
        description: 'Please check your card details and try again.',
      });
    }
  };

  const renderSelectionStep = () => (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
        />
      </div>
      {selectedDate && (
        <div>
          <h4 className="font-semibold mb-2 text-center">Select a time:</h4>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => setSelectedTime(time)}
              >
                <Clock className="mr-2 h-4 w-4" />
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
      {selectedDate && selectedTime && (
        <Button
          className="w-full mt-4"
          onClick={() => setStep('payment')}
        >
          Proceed to Payment
        </Button>
      )}
    </div>
  );

  const renderPaymentStep = () => (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Confirm Booking</CardTitle>
                <CardDescription>
                    Complete the payment for your consultation on <SafeDate dateString={selectedDate!.toISOString()}/> at {selectedTime}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-6 p-4 bg-muted rounded-lg">
                    <span className="font-semibold">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-primary">R350.00</span>
                </div>

                <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" />Card</TabsTrigger>
                        <TabsTrigger value="eft" disabled><Banknote className="mr-2 h-4 w-4" />EFT</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="cardName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name on Card</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                             <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="4111 1111 1111 1111" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                             <div className="flex gap-4">
                                <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                    <FormLabel>Expiry (MM/YY)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12/26" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                             </div>
                             <div className="flex justify-end gap-2 mt-6">
                                <Button variant="ghost" onClick={() => setStep('selection')}>Back</Button>
                                <Button type="submit" disabled={isLoading}>
                                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  Pay R350.00
                                </Button>
                             </div>
                          </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="text-center p-4 border rounded-lg flex flex-col items-center gap-4">
      <CheckCircle className="w-16 h-16 text-green-500" />
      <h3 className="text-xl font-bold">Booking Confirmed!</h3>
      <p className="text-muted-foreground">
        Your virtual consultation is scheduled.
      </p>
      <div className="p-4 bg-muted rounded-md text-left w-full">
        <p><strong>Type:</strong> {bookedAppointment?.type}</p>
        <p><strong>Date:</strong> <SafeDate dateString={bookedAppointment!.date.toISOString()} /></p>
        <p><strong>Time:</strong> {bookedAppointment?.time}</p>
      </div>
      <Button className="w-full" onClick={() => {
        setStep('selection');
        setSelectedTime(null);
        form.reset();
      }}>Book Another</Button>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <CardTitle>Telemedicine</CardTitle>
        </div>
        <CardDescription>
          Access virtual healthcare services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consultation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultation">
              <Video className="mr-2 h-4 w-4" />
              Consult
            </TabsTrigger>
            <TabsTrigger value="prescriptions">
              <FileText className="mr-2 h-4 w-4" />
              Scripts
            </TabsTrigger>
            <TabsTrigger value="notes">
              <ClipboardList className="mr-2 h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="consultation" className="mt-4">
            {step === 'selection' && renderSelectionStep()}
            {step === 'payment' && renderPaymentStep()}
            {step === 'confirmation' && renderConfirmationStep()}
          </TabsContent>
          <TabsContent value="prescriptions" className="mt-4">
            <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">
                    No e-prescriptions found.
                </p>
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">
                    No doctor's notes found.
                </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
