
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Eye } from 'lucide-react';
import { Button } from './ui/button';

export default function CompanyFineManagement() {
  return (
    <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pending Fines</CardTitle>
          <DollarSign className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-3xl font-bold">R 450,750.00</p>
          <p className="text-sm opacity-80">Pending: 120 fines</p>
        </div>
        <Button
          variant="outline"
          className="w-full bg-white/20 border-white/30 hover:bg-white/30 text-white"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Fines Breakdown
        </Button>
      </CardContent>
    </Card>
  );
}
