
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const guidelines = [
  { id: 'cpr', title: 'CPR & Basic Life Support' },
  { id: 'choking', title: 'Choking (Adult & Child)' },
  { id: 'bleeding', title: 'Severe Bleeding Control' },
];

export default function EmdGuidelinesCard() {
  const { toast } = useToast();

  const handleViewGuideline = (title: string) => {
    toast({
      title: 'Guideline Accessed',
      description: `Displaying guideline for: ${title}`,
    });
  };

  return (
    <Card className="bg-amber-50 border-amber-200 text-amber-900 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>EM Guidelines</CardTitle>
          <LifeBuoy className="h-5 w-5 text-amber-700" />
        </div>
        <CardDescription className="text-amber-800">
          Quick access to emergency medical dispatch protocols.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {guidelines.map((guideline) => (
          <div
            key={guideline.id}
            className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-amber-200"
          >
            <p className="font-semibold text-sm">{guideline.title}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewGuideline(guideline.title)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
