
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, RefreshCw } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function LicenseRenewalCard() {
  const { plan } = usePlan();
  const { toast } = useToast();
  const canBook = plan === 'platinum';

  const handleBook = () => {
      toast({
          title: 'Booking Confirmed!',
          description: 'Your license renewal appointment has been booked.'
      })
  }

  return (
    <Card className="bg-primary/90 text-primary-foreground">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">License & PrDP Renewal Booking</CardTitle>
          <RefreshCw className="h-4 w-4" />
        </div>
        <CardDescription className="text-primary-foreground/80">
          Book your driver's license or PrDP renewal slot. {plan !== 'platinum' && 'Upgrade to Platinum to use this feature.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label>Renewal Type</Label>
            <Select disabled={!canBook}>
                <SelectTrigger className="bg-primary/80 border-primary-foreground/20">
                    <SelectValue placeholder="Driver's License Renewal" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="drivers_license">Driver's License Renewal</SelectItem>
                    <SelectItem value="prdp">PrDP Renewal</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Province</Label>
                <Select disabled={!canBook}>
                    <SelectTrigger className="bg-primary/80 border-primary-foreground/20">
                        <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gauteng">Gauteng</SelectItem>
                        <SelectItem value="western_cape">Western Cape</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>City</Label>
                <Select disabled={!canBook}>
                    <SelectTrigger className="bg-primary/80 border-primary-foreground/20">
                        <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="johannesburg">Johannesburg</SelectItem>
                        <SelectItem value="cape_town">Cape Town</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label>Testing Centre (DLTC)</Label>
            <Select disabled={!canBook}>
                <SelectTrigger className="bg-primary/80 border-primary-foreground/20">
                    <SelectValue placeholder="Select DLTC" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dltc1">DLTC 1</SelectItem>
                    <SelectItem value="dltc2">DLTC 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Available Date</Label>
                <Select disabled={!canBook}>
                    <SelectTrigger className="bg-primary/80 border-primary-foreground/20">
                        <SelectValue placeholder="Select Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date1">2024-09-15</SelectItem>
                        <SelectItem value="date2">2024-09-16</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Available Time Slot</Label>
                <Select disabled={!canBook}>
                    <SelectTrigger className="bg-primary/80 border-primary-foreground/20">
                        <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="time1">09:00</SelectItem>
                        <SelectItem value="time2">11:00</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label>Upload ID Document</Label>
            <Input type="file" className="bg-primary/80 border-primary-foreground/20" disabled={!canBook}/>
        </div>
         <div className="space-y-2">
            <Label>Cell Number for OTP/Confirmation</Label>
            <Input type="tel" placeholder="Enter cell number" className="bg-primary/80 border-primary-foreground/20" disabled={!canBook}/>
        </div>
        {canBook ? (
            <Button variant="secondary" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleBook}>
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
            </Button>
        ) : (
             <Button variant="secondary" asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/driver/subscriptions">
                    Upgrade to Platinum to Book
                </Link>
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
