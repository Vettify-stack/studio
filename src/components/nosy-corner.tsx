
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, AlertCircle } from 'lucide-react';
import type { Notification } from '@/lib/types';
import SafeDate from './safe-date';

const notifications: Notification[] = [
  {
    id: '1',
    title: 'SOS: Report Vehicle Issue by Super',
    date: '2025-07-18',
    details: 'Incident Report Details: Type: Report Vehicle Issue Description: The vehi...',
    status: 'Urgent',
  },
  {
    id: '2',
    title: 'SOS: Report Unexpected Delay by Super',
    date: '2025-07-18',
    details: 'Incident Report Details: Type: Report Unexpected Delay Description: The...',
    status: 'Urgent',
  },
    {
    id: '3',
    title: 'SOS: Report Vehicle Issue by Super',
    date: '2025-07-20',
    details: 'Incident Report Details: Type: Report Vehicle Issue Description: The vehi...',
    status: 'Urgent',
  },
];

export default function NosyCorner() {
  return (
    <Card className="bg-accent text-accent-foreground h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Nosy Corner</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-yellow-400 text-yellow-900">1 New</Badge>
            <Newspaper className="h-5 w-5" />
          </div>
        </div>
        <CardDescription className="text-accent-foreground/80">
          Platform announcements, newsletters, and important updates from
          Super Admin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((item) => (
            <div key={item.id} className="p-3 bg-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    {item.status === 'Urgent' && (
                        <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {item.status}
                        </Badge>
                    )}
                </div>
                 <p className="text-xs text-accent-foreground/80 mb-2">
                    <SafeDate dateString={item.date} />
                 </p>
                <p className="text-xs text-accent-foreground/90 truncate">{item.details}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
