
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
import { BrainCircuit, Check, Loader2 } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

const demandTrendData = [
  { week: 'W1', drivers: 10, trucks: 8 },
  { week: 'W2', drivers: 12, trucks: 10 },
  { week: 'W3', drivers: 11, trucks: 9 },
  { week: 'W4', drivers: 14, trucks: 12 },
];

const initialRecommendations = [
    { id: 'rec-001', message: 'Reassign 2 drivers from Shaft B to C next week.', impact: 'high', status: 'open' },
    { id: 'rec-002', message: 'Reduce diesel order by 4% at Depot-1 this week.', impact: 'med', status: 'open' },
];

const chartConfig = {
    drivers: { label: 'Drivers', color: 'hsl(var(--chart-1))' },
    trucks: { label: 'Trucks', color: 'hsl(var(--chart-2))' },
    current: { label: 'Current Qty', color: 'hsl(var(--chart-1))' },
    reorder: { label: 'Reorder Point', color: 'hsl(var(--chart-4))' },
};

const impactConfig = {
    high: { text: 'High', color: 'bg-red-500' },
    med: { text: 'Medium', color: 'bg-yellow-500' },
    low: { text: 'Low', color: 'bg-green-500' },
}

export default function PredictiveAnalyticsCard() {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(initialRecommendations);
    const { toast } = useToast();

    const handleRunForecast = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast({
            title: "Forecast Generated",
            description: "The demand forecast for the next 4 weeks has been updated.",
        });
    }

    const handleApplyRecommendation = (recId: string, message: string) => {
        setRecommendations(prev => prev.map(rec => rec.id === recId ? {...rec, status: 'applied'} : rec));
        toast({
            title: "Recommendation Applied",
            description: `Action for: "${message}" has been initiated.`,
        });
    }

  return (
    <Card className="bg-blue-50 border-blue-200 text-blue-900 transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                    <BrainCircuit className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                    <CardTitle className="text-blue-900">Demand Forecast</CardTitle>
                </div>
            </div>
            <p className='text-xs font-semibold text-blue-800'>Next 4 Weeks</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 bg-blue-100 rounded">
                <p className="font-bold text-blue-800 text-lg">12</p>
                <p className="text-blue-700">Drivers Req.</p>
            </div>
             <div className="p-2 bg-blue-100 rounded">
                <p className="font-bold text-blue-800 text-lg">10</p>
                <p className="text-blue-700">Trucks Req.</p>
            </div>
             <div className="p-2 bg-blue-100 rounded">
                <p className="font-bold text-blue-800 text-lg">95k L</p>
                <p className="text-blue-700">Fuel Req.</p>
            </div>
             <div className="p-2 bg-blue-100 rounded">
                <p className="font-bold text-blue-800 text-lg">78%</p>
                <p className="text-blue-700">Inv. Health</p>
            </div>
        </div>

        <div>
            <h4 className="font-semibold text-sm text-blue-800 mb-2">Demand Trend</h4>
            <ChartContainer config={chartConfig} className="h-40 w-full">
                <BarChart data={demandTrendData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="drivers" fill="var(--color-drivers)" radius={4} />
                    <Bar dataKey="trucks" fill="var(--color-trucks)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>

        <div>
            <h4 className="font-semibold text-sm text-blue-800 mb-2">Top Recommendations</h4>
            <div className="border rounded-lg bg-white overflow-hidden">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60%]">Message</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recommendations.map(rec => (
                            <TableRow key={rec.id}>
                                <TableCell className="text-xs">{rec.message}</TableCell>
                                <TableCell>
                                    <Badge style={{ backgroundColor: impactConfig[rec.impact as keyof typeof impactConfig].color }} className="text-white">
                                       {impactConfig[rec.impact as keyof typeof impactConfig].text}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                     <Button size="sm" variant="outline" disabled={rec.status === 'applied'} onClick={() => handleApplyRecommendation(rec.id, rec.message)}>
                                        {rec.status === 'applied' ? <Check className="h-4 w-4" /> : 'Apply'}
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
        <Button onClick={handleRunForecast} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
            Run Forecast Now
        </Button>
      </CardFooter>
    </Card>
  );
}
