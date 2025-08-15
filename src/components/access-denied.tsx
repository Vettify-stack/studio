
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
                    <ShieldAlert className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-3xl font-bold">Access Denied</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                    You need to be logged in to view this page.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-6">
                    Please log in to your account to continue. If you don't have an account, you can create one for free.
                </p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => router.push('/login')}>
                        Log In
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/register')}>
                        Sign Up
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
