
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BarChart, DollarSign, Percent, ClipboardList, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const StatCard = ({
  title,
  value,
  icon: Icon,
  isMainStat = false,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  isMainStat?: boolean;
}) => (
  <Card className="bg-white/10 text-white border-white/20">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-white/80" />
    </CardHeader>
    <CardContent>
        {isMainStat ? (
            <div className="text-3xl font-bold">{value}</div>
        ) : (
            <div className="text-2xl font-bold">{value}</div>
        )}
    </CardContent>
  </Card>
);

const performanceData = [
  { category: 'Tire Shops', engagements: 113, partners: 1, revenue: 'R 2098.94', commission: 'R 409.40' },
  { category: 'Mobile Mechanics', engagements: 103, partners: 1, revenue: 'R 1954.61', commission: 'R 147.29' },
  { category: 'Haircutting Salons', engagements: 100, partners: 1, revenue: 'R 1420.15', commission: 'R 374.31' },
  { category: 'Mobile Tire Repair Techs', engagements: 70, partners: 1, revenue: 'R 1307.25', commission: 'R 130.09' },
  { category: 'Mobile Auto Electricians', engagements: 59, partners: 1, revenue: 'R 4324.83', commission: 'R 286.61' },
  { category: 'Workshops', engagements: 49, partners: 1, revenue: 'R 1312.63', commission: 'R 565.02' },
  { category: 'Breakdown Services', engagements: 47, partners: 1, revenue: 'R 2479.70', commission: 'R 264.62' },
  { category: 'Rest Stops/Truck Stops', engagements: 44, partners: 2, revenue: 'R 2126.02', commission: 'R 101.52' },
  { category: 'Insurance Companies', engagements: 41, partners: 1, revenue: 'R 1871.54', commission: 'R 304.81' },
  { category: 'Medical Practitioners/Wellness', engagements: 39, partners: 2, revenue: 'R 3502.02', commission: 'R 121.55' },
  { category: 'Diesel Depots', engagements: 38, partners: 1, revenue: 'R 613.59', commission: 'R 544.67' },
];

const initialTopPartners = [
    { id: 'partner-1', name: 'Tiger Wheel & Tyre Sandton', category: 'Tire Shops', engagements: 78, revenue: 'R 8929.55', commission: 'R 591.01' },
    { id: 'partner-2', name: 'Bosch Car Service - JHB South', category: 'Workshops', engagements: 74, revenue: 'R 4517.20', commission: 'R 214.84' },
    { id: 'partner-3', name: 'AutoZone Midrand', category: 'Retail Stores', engagements: 67, revenue: 'R 5061.58', commission: 'R 412.27' },
    { id: 'partner-4', name: 'Sorbet Man Village View', category: 'Haircutting Salons', engagements: 55, revenue: 'R 8009.72', commission: 'R 148.77' },
    { id: 'partner-5', name: 'Santam Insurance', category: 'Insurance Companies', engagements: 43, revenue: 'R 4394.66', commission: 'R 172.75' },
];

export default function PartnerNetworkAnalytics() {
    const [topPartners, setTopPartners] = useState(initialTopPartners);
    const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
    const { toast } = useToast();

    const handleAddPartner = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newPartner = {
            id: `partner-${Date.now()}`,
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            engagements: 0,
            revenue: 'R 0.00',
            commission: 'R 0.00'
        };
        setTopPartners(prev => [newPartner, ...prev]);
        setIsAddPartnerOpen(false);
        toast({
            title: 'Partner Added!',
            description: `"${newPartner.name}" has been added to the network.`
        });
    }

    const handleDeletePartner = (partnerId: string) => {
        const partnerName = topPartners.find(p => p.id === partnerId)?.name || 'The partner';
        setTopPartners(prev => prev.filter(p => p.id !== partnerId));
        toast({
            title: 'Partner Removed!',
            description: `${partnerName} has been removed from the network.`
        });
    }

  return (
    <div className="p-6 rounded-lg space-y-8" style={{ background: 'linear-gradient(to right, #22c55e, #16a34a)' }}>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-white">Partner Network Analytics</h1>
                <p className="text-white/80">
                    Insights into partner performance and member engagement.
                </p>
            </div>
            <Dialog open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Partner
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Add a New Partner</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new partner to the network.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPartner} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Partner Name</Label>
                            <Input id="name" name="name" placeholder="e.g., Tiger Wheel & Tyre" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" placeholder="e.g., Tire Shops" required />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="ghost" onClick={() => setIsAddPartnerOpen(false)}>Cancel</Button>
                            <Button type="submit">Add Partner</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Partners" value={String(topPartners.length)} icon={Users} />
            <StatCard title="Total Member Engagements" value="780" icon={Users} />
            <StatCard title="Most Engaged Category" value="Tire Shops" icon={BarChart} isMainStat={true} />
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Est. Member Savings" value="R 15600.00" icon={DollarSign} />
            <StatCard title="Vettify Commission" value="R 1560.00" icon={Percent} />
        </div>

        <Card className="bg-white/90">
            <CardHeader>
                <CardTitle>Performance by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>CATEGORY</TableHead>
                            <TableHead>ENGAGEMENTS</TableHead>
                            <TableHead>PARTNERS</TableHead>
                            <TableHead>EST. REVENUE</TableHead>
                            <TableHead>COMMISSION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {performanceData.map((item) => (
                            <TableRow key={item.category}>
                                <TableCell className="font-medium">{item.category}</TableCell>
                                <TableCell>{item.engagements}</TableCell>
                                <TableCell>{item.partners}</TableCell>
                                <TableCell>{item.revenue}</TableCell>
                                <TableCell>{item.commission}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

         <Card className="bg-white/90">
            <CardHeader>
                <CardTitle>Top Performing Partners</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>PARTNER NAME</TableHead>
                            <TableHead>CATEGORY</TableHead>
                            <TableHead>ENGAGEMENTS</TableHead>
                            <TableHead>EST. REVENUE</TableHead>
                            <TableHead>COMMISSION</TableHead>
                            <TableHead className="text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topPartners.map((partner) => (
                            <TableRow key={partner.id}>
                                <TableCell className="font-medium">{partner.name}</TableCell>
                                <TableCell>{partner.category}</TableCell>
                                <TableCell>{partner.engagements}</TableCell>
                                <TableCell>{partner.revenue}</TableCell>
                                <TableCell>{partner.commission}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={() => handleDeletePartner(partner.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
