
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PartyPopper } from 'lucide-react';
import AccessDenied from '@/components/access-denied';

export default function WelcomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AccessDenied />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                    <PartyPopper className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold">Welcome to Vettify, {user.displayName || 'User'}!</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                    You're all set up and ready to go.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-6">
                    Your account has been successfully created. You can now access your dashboard to manage your compliance, view fines, and explore all the features Vettify has to offer.
                </p>
                <Button size="lg" onClick={() => router.push('/admin')}>
                    Go to My Dashboard
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
