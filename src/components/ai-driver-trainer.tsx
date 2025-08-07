
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function AIDriverTrainer() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Driver Trainer</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>
          Ask our AI assistant about defensive driving, regulations, and best
          practices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <BrainCircuit className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 rounded-lg bg-muted p-3 text-sm">
            <p>
              Hello! I'm your AI Driver Trainer. Ask me anything about
              defensive driving, adverse conditions, vehicle inspections, and
              more!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
