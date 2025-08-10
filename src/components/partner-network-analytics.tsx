
'use client';

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
import { Users, BarChart, DollarSign, Percent, ClipboardList } from 'lucide-react';

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

export default function PartnerNetworkAnalytics() {
  return (
    <div className="p-6 rounded-lg" style={{ background: 'linear-gradient(to right, #22c55e, #16a34a)' }}>
        <div className="flex items-center justify-between mb-4">
            <div>
                <h1 className="text-2xl font-bold text-white">Partner Network Analytics</h1>
                <p className="text-white/80">
                    Insights into partner performance and member engagement.
                </p>
            </div>
            <ClipboardList className="h-6 w-6 text-white" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="Total Partners" value="14" icon={Users} />
            <StatCard title="Total Member Engagements" value="780" icon={Users} />
            <StatCard title="Most Engaged Category" value="Tire Shops" icon={BarChart} isMainStat={true} />
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
    </div>
  );
}
