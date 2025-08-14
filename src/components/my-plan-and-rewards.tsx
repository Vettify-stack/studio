
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Star } from 'lucide-react';
import SafeDate from './safe-date';
import Link from 'next/link';
import { usePlan } from '@/contexts/PlanContext';

const planDetails = {
    silver: { name: 'Silver Plan', price: 'R99/month' },
    gold: { name: 'Gold Plan', price: 'R149/month' },
    platinum: { name: 'Platinum Plan', price: 'R199/month' },
}

export default function MyPlanAndRewards() {
  const { plan } = usePlan();
  const currentPlan = planDetails[plan];

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>My Plan & Rewards</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="subscription">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="refer">Refer & Earn</TabsTrigger>
            </TabsList>
            <TabsContent value="subscription" className="mt-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            <Star className="mr-1 h-3 w-3" />
                            Current Plan
                        </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">Status: <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge></div>
                        <p>Next Billing Date: <SafeDate dateString="2025-09-07" /></p>
                        <p>Price: <span className="font-semibold text-foreground">{currentPlan.price}</span></p>
                    </div>
                     <Button className="w-full" asChild>
                        <Link href="/driver/subscriptions">
                            Manage Subscription
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </TabsContent>
            <TabsContent value="refer" className="mt-6">
                 <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Refer a Friend, Earn Rewards!</h3>
                    <p className="text-muted-foreground mb-4">
                        Share your referral link and earn R50 for every friend who subscribes.
                    </p>
                    <Button asChild>
                        <Link href="/driver/referrals">
                            Go to Referral Page
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
