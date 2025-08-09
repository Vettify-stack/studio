
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function CommunicationsHub() {
  return (
    <Card className="bg-purple-600 text-white h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Communications Hub</CardTitle>
          <MessageSquare className="h-5 w-5" />
        </div>
        <CardDescription className="text-purple-200">
          Direct messaging and sick notes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full bg-white/20 border-white/30 hover:bg-white/30 text-white">
          <MessageSquare className="mr-2 h-4 w-4" />
          Open Hub
        </Button>
      </CardContent>
    </Card>
  );
}
