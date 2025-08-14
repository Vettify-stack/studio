
'use client';

import { Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePlan, type PlanTier } from '@/contexts/PlanContext';
import { useRouter } from 'next/navigation';

export type Plan = {
  name: string;
  price: number;
  priceYearly: number;
  yearlySave: number;
  description: string;
  features: { text: string; included: boolean }[];
  tier: PlanTier;
};

const tierStyles = {
  silver: {
    card: 'border-gray-300',
    header: 'bg-gray-50',
    button: 'bg-gray-600 hover:bg-gray-700',
    icon: 'text-gray-500'
  },
  gold: {
    card: 'border-yellow-400',
    header: 'bg-yellow-50',
    button: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    icon: 'text-yellow-500'
  },
  platinum: {
    card: 'border-blue-500',
    header: 'bg-blue-50',
    button: 'bg-blue-600 hover:bg-blue-700',
    icon: 'text-blue-500'
  },
};

export function PricingCard({ plan }: { plan: Plan }) {
  const { toast } = useToast();
  const { setPlan } = usePlan();
  const router = useRouter();
  const styles = tierStyles[plan.tier];

  const handleChoosePlan = (type: 'Monthly' | 'Annual') => {
    setPlan(plan.tier);
    toast({
        title: 'Plan Updated!',
        description: `You are now on the ${plan.name} ${type} plan.`
    });
    router.push('/driver');
  }

  return (
    <Card className={cn("flex flex-col h-full shadow-lg", styles.card, plan.tier === 'gold' && 'border-2')}>
      <CardHeader className={cn(styles.header)}>
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", styles.icon, styles.header)}>
            <Check className="w-8 h-8"/>
        </div>
        <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
        <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold tracking-tight">R{plan.price}</span>
            <span className="text-muted-foreground">/month</span>
        </div>
        <CardDescription>
          or R{plan.priceYearly}/year (Save R{plan.yearlySave})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 py-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
              ) : (
                <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
              )}
              <span className={cn(!feature.included && 'text-muted-foreground line-through')}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-6 bg-gray-50/50">
        <Button className={cn("w-full", styles.button)} onClick={() => handleChoosePlan('Monthly')}>
            Choose Monthly Plan
        </Button>
        <Button className="w-full" variant="outline" onClick={() => handleChoosePlan('Annual')}>
            Choose Annual Plan & Save
        </Button>
      </CardFooter>
    </Card>
  );
}
