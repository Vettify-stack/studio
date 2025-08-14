
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, AlertCircle, PlusCircle, Loader2 } from 'lucide-react';
import type { Notification } from '@/lib/types';
import SafeDate from './safe-date';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

const initialNotifications: Notification[] = [
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

interface NosyCornerProps {
  isAdmin?: boolean;
}

export default function NosyCorner({ isAdmin = false }: NosyCornerProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedNotifications = localStorage.getItem('nosyCornerNotifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        setNotifications(initialNotifications);
      }
    } catch (error) {
      console.error("Failed to parse notifications from localStorage", error);
      setNotifications(initialNotifications);
    }
  }, []);

  const handlePostNotification = async () => {
    if (!newTitle.trim() || !newDetails.trim()) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Title and details cannot be empty.',
        });
        return;
    }
    setIsLoading(true);

    const newNotification: Notification = {
        id: `nc-${Date.now()}`,
        title: newTitle,
        details: newDetails,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        status: 'New',
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    try {
      localStorage.setItem('nosyCornerNotifications', JSON.stringify(updatedNotifications));
    } catch(error) {
       console.error("Failed to save notifications to localStorage", error);
    }

    setIsLoading(false);
    setIsDialogOpen(false);
    setNewTitle('');
    setNewDetails('');
    toast({
        title: 'Notification Posted!',
        description: 'Your message has been broadcast.',
    });
  };
  
  if (!isMounted) {
    return (
       <Card className="bg-accent text-accent-foreground h-full">
         <CardHeader>
           <div className="flex items-center justify-between">
             <CardTitle>Nosy Corner</CardTitle>
           </div>
         </CardHeader>
         <CardContent>
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
         </CardContent>
       </Card>
    );
  }

  return (
    <Card className="bg-accent text-accent-foreground h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Nosy Corner</CardTitle>
          <div className="flex items-center gap-2">
             {isAdmin && (
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                       <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                           <PlusCircle className="mr-2 h-4 w-4"/>
                           New Post
                       </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Broadcast New Message</DialogTitle>
                            <DialogDescription>
                               This message will be posted to the Nosy Corner on all dashboards.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input 
                                placeholder="Notification Title" 
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                            <Textarea 
                                placeholder="Notification details..." 
                                value={newDetails}
                                onChange={(e) => setNewDetails(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handlePostNotification} disabled={isLoading}>
                               {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                               Post Notification
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                 </Dialog>
             )}
            <Newspaper className="h-5 w-5" />
          </div>
        </div>
        <CardDescription className="text-accent-foreground/80">
          Platform announcements, newsletters, and important updates from
          Super Admin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.length > 0 ? notifications.map((item) => (
            <div key={item.id} className="p-3 bg-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    {item.status === 'Urgent' ? (
                        <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {item.status}
                        </Badge>
                    ) : item.status === 'New' ? (
                         <Badge variant="secondary" className="bg-yellow-400 text-yellow-900">
                            {item.status}
                        </Badge>
                    ) : null }
                </div>
                 <p className="text-xs text-accent-foreground/80 mb-2">
                    <SafeDate dateString={item.date} />
                 </p>
                <p className="text-xs text-accent-foreground/90">{item.details}</p>
          </div>
        )) : (
            <div className="text-center p-8 border-2 border-dashed border-accent-foreground/20 rounded-lg">
                <p>No notifications yet.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
