
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Gift, Copy, Users, UserCheck, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SafeDate from '@/components/safe-date';

const referralLink = 'https://vettify.co.za/register?ref=D12345';

const initialReferrals = [
  { name: 'Thabo Ndlovu', date: '2025-07-15', status: 'Subscribed' },
  { name: 'Sarah van Wyk', date: '2025-07-20', status: 'Signed Up' },
];

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
);

const StatusBadge = ({ status }: { status: 'Subscribed' | 'Signed Up' }) => {
    const colorClass = {
        Subscribed: 'bg-green-100 text-green-800 border-green-200',
        'Signed Up': 'bg-blue-100 text-blue-800 border-blue-200',
    }[status];

    return (
        <Badge variant="outline" className={`capitalize ${colorClass}`}>
            {status}
        </Badge>
    );
};

export default function ReferralsPage() {
    const { toast } = useToast();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast({
            title: 'Link Copied!',
            description: 'Your referral link has been copied to your clipboard.',
        });
    };
    
    const successfulReferrals = initialReferrals.filter(r => r.status === 'Subscribed').length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Gift className="h-6 w-6 text-primary" />
                        <CardTitle>Refer & Earn Program</CardTitle>
                    </div>
                    <CardDescription>
                        Share your unique link with friends. When they sign up and subscribe, you earn R50.00!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="font-semibold">Your Referral Link:</p>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <span className="text-sm text-muted-foreground flex-1 truncate">{referralLink}</span>
                        <Button size="sm" onClick={handleCopyLink}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="Total Referrals" value={String(initialReferrals.length)} icon={Users} />
                <StatCard title="Successful Referrals" value={String(successfulReferrals)} icon={UserCheck} />
                <StatCard title="Total Earnings" value={`R${(successfulReferrals * 50).toFixed(2)}`} icon={DollarSign} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Referrals</CardTitle>
                    <CardDescription>
                        Track the status of everyone you've referred.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date Joined</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Reward</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialReferrals.map((referral, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{referral.name}</TableCell>
                                        <TableCell><SafeDate dateString={referral.date} /></TableCell>
                                        <TableCell>
                                            <StatusBadge status={referral.status as any} />
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-green-600">
                                            {referral.status === 'Subscribed' ? 'R50.00' : 'Pending'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
