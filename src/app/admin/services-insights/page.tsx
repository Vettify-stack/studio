
'use client';

import {
  Card,
  CardContent,
  CardDescription,
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
import { ShoppingCart, DollarSign, TrendingUp, BarChart } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) => (
  <Card className="bg-white/10 text-white border-white/20">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-white/80" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const serviceTypeData = [
    { type: 'Airtime (Own Number)', transactions: 500, revenue: 'R 25000.00', commission: 2500 },
    { type: 'Data (Own Number)', transactions: 350, revenue: 'R 17500.00', commission: 1750 },
    { type: 'Electricity', transactions: 200, revenue: 'R 10000.00', commission: 1000 },
    { type: 'Airtime (Send to Other)', transactions: 150, revenue: 'R 7500.00', commission: 750 },
    { type: 'Data (Send to Other)', transactions: 50, revenue: 'R 2500.00', commission: 250 },
];

const networkProviderData = [
    { provider: 'Vodacom', transactions: 600, revenue: 'R 30000.00' },
    { provider: 'MTN', transactions: 400, revenue: 'R 20000.00' },
    { provider: 'Cell C', transactions: 150, revenue: 'R 7500.00' },
    { provider: 'Telkom Mobile', transactions: 100, revenue: 'R 5000.00' },
];


export default function ServicesInsightsPage() {
  return (
    <div className="p-6 rounded-lg" style={{ background: 'linear-gradient(to right, #6b21a8, #9d24a8)' }}>
        <div className="flex items-center justify-between mb-4">
            <div>
                <h1 className="text-2xl font-bold text-white">Value-Added Services Analytics</h1>
                <p className="text-white/80">
                    Performance and revenue from airtime, data, and electricity sales.
                </p>
            </div>
            <ShoppingCart className="h-6 w-6 text-white" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="Total Transactions" value="1250" icon={ShoppingCart} />
            <StatCard title="Total Revenue" value="R 62500.00" icon={DollarSign} />
            <StatCard title="Total Commission" value="R 6250.00" icon={TrendingUp} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white/10 text-white border-white/20">
                <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart className="h-4 w-4" /> Most Popular Service</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-2xl font-bold">Airtime (Own Number)</p>
                </CardContent>
            </Card>
             <Card className="bg-white/10 text-white border-white/20">
                <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart className="h-4 w-4" /> Most Popular Provider</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">Vodacom</p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card className="bg-white/90">
                <CardHeader>
                    <CardTitle>Breakdown by Service Type</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SERVICE TYPE</TableHead>
                                <TableHead>TRANSACTIONS</TableHead>
                                <TableHead>REVENUE</TableHead>
                                <TableHead>COMMISSION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceTypeData.map((item) => (
                                <TableRow key={item.type}>
                                    <TableCell className="font-medium">{item.type}</TableCell>
                                    <TableCell>{item.transactions}</TableCell>
                                    <TableCell>{item.revenue}</TableCell>
                                    <TableCell>R {item.commission.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="bg-white/90">
                <CardHeader>
                    <CardTitle>Breakdown by Network Provider</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NETWORK PROVIDER</TableHead>
                                <TableHead>TRANSACTIONS</TableHead>
                                <TableHead>REVENUE</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {networkProviderData.map((item) => (
                                <TableRow key={item.provider}>
                                    <TableCell className="font-medium">{item.provider}</TableCell>
                                    <TableCell>{item.transactions}</TableCell>
                                    <TableCell>{item.revenue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
