
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, ArrowRight } from 'lucide-react';

export default function UtilitiesCard() {
  return (
    <Card className="bg-teal-50 border-teal-200 text-teal-900 transition-all hover:shadow-lg hover:-translate-y-1 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Utilities</CardTitle>
          <Smartphone className="h-5 w-5 text-teal-700" />
        </div>
        <CardDescription className="text-teal-800">
            Buy airtime, data, or electricity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-teal-800/90 mb-4">
            Conveniently top up your prepaid services directly from your dashboard.
        </p>
        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            <Link href="/utilities">
                Go to Utilities
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
