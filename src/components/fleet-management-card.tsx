
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Check, AlertTriangle, Wrench, Calendar, List, PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import SafeDate from './safe-date';

const initialMaintenanceAlerts = [
    { id: 'maint-001', vehicle: 'VEH-102', reason: 'Brake wear predicted', dueDate: '2025-08-15', status: 'pending' },
    { id: 'maint-002', vehicle: 'VEH-105', reason: 'Engine oil service', dueDate: '2025-08-20', status: 'pending' },
];

const fleetStatusData = [
    { name: 'Active', value: 12, fill: 'var(--color-active)' },
    { name: 'Under Service', value: 2, fill: 'var(--color-service)' },
    { name: 'Suspended', value: 1, fill: 'var(--color-suspended)' },
];
  
const chartConfig = {
    active: { label: 'Active', color: 'hsl(var(--chart-2))' },
    service: { label: 'Under Service', color: 'hsl(var(--chart-4))' },
    suspended: { label: 'Suspended', color: 'hsl(var(--chart-5))' },
};


export default function FleetManagementCard() {
    const [alerts, setAlerts] = useState(initialMaintenanceAlerts);
    const { toast } = useToast();

    const handleScheduleService = (alertId: string) => {
        setAlerts(prev => prev.map(a => a.id === alertId ? {...a, status: 'scheduled'} : a));
        toast({
            title: "Service Scheduled",
            description: `Work order created for alert ${alertId}.`
        })
    }

  return (
    <Card className="bg-purple-50 border-purple-200 text-purple-900 transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-md">
                <Truck className="h-6 w-6 text-purple-700" />
            </div>
            <div>
                <CardTitle className="text-purple-900">Fleet Management (AI)</CardTitle>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
             <div className="p-2 bg-purple-100 rounded">
                <p className="font-bold text-purple-800 text-lg">12</p>
                <p className="text-purple-700">Vehicles Active</p>
            </div>
             <div className="p-2 bg-purple-100 rounded">
                <p className="font-bold text-purple-800 text-lg">85</p>
                <p className="text-purple-700">Behavior Score</p>
            </div>
             <div className="p-2 bg-purple-100 rounded">
                <p className="font-bold text-purple-800 text-lg">2</p>
                <p className="text-purple-700">Maint. Due</p>
            </div>
             <div className="p-2 bg-purple-100 rounded">
                <p className="font-bold text-purple-800 text-lg">8%</p>
                <p className="text-purple-700">Idle Time</p>
            </div>
        </div>
        
        <div>
            <h4 className="font-semibold text-sm text-purple-800 mb-2">Fleet Status</h4>
             <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-40"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                    data={fleetStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={30}
                    strokeWidth={5}
                    >
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>

        <div>
            <h4 className="font-semibold text-sm text-purple-800 mb-2">AI Maintenance Alerts</h4>
             <div className="border rounded-lg bg-white overflow-hidden">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Due</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {alerts.map(alert => (
                             <TableRow key={alert.id}>
                                <TableCell className="font-medium">{alert.vehicle}</TableCell>
                                <TableCell className="text-xs">{alert.reason}</TableCell>
                                <TableCell className="text-xs"><SafeDate dateString={alert.dueDate} /></TableCell>
                                <TableCell>
                                    <Button size="sm" variant="outline" disabled={alert.status === 'scheduled'} onClick={() => handleScheduleService(alert.id)}>
                                        {alert.status === 'scheduled' ? <Check className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

      </CardContent>
       <CardFooter className="pt-6">
        <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Work Order
        </Button>
      </CardFooter>
    </Card>
  );
}
