
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, Loader2, Sparkles, UserCheck, TrendingUp, BarChart as BarChartIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from 'recharts';
import { getEmployeePerformanceInsights } from '@/app/actions';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const attendanceData = [
  { month: 'Jan', attendance: 95 },
  { month: 'Feb', attendance: 92 },
  { month: 'Mar', attendance: 98 },
  { month: 'Apr', attendance: 94 },
  { month: 'May', attendance: 97 },
  { month: 'Jun', attendance: 96 },
];

const productivityData = [
  { day: 'Mon', tasks: 12 },
  { day: 'Tue', tasks: 15 },
  { day: 'Wed', tasks: 10 },
  { day: 'Thu', tasks: 18 },
  { day: 'Fri', tasks: 16 },
];

const chartConfig = {
    attendance: {
        label: "Attendance %",
        color: "hsl(var(--chart-1))",
    },
    tasks: {
        label: "Tasks Completed",
        color: "hsl(var(--chart-2))",
    },
};


export default function EmployeeAttendancePerformance() {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetInsights = async () => {
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const performanceData = JSON.stringify({ attendanceData, productivityData });
      const result = await getEmployeePerformanceInsights(performanceData);
      setInsights(result.insights);
    } catch (e) {
      setError('Failed to generate insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Employee Attendance & Performance</CardTitle>
        <CardDescription>
          Track, analyze, and report on employee attendance and productivity patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attendance">
          <TabsList>
            <TabsTrigger value="attendance"><UserCheck className="mr-2 h-4 w-4" />Attendance</TabsTrigger>
            <TabsTrigger value="productivity"><TrendingUp className="mr-2 h-4 w-4" />Productivity</TabsTrigger>
            <TabsTrigger value="performance"><BarChartIcon className="mr-2 h-4 w-4" />Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart accessibilityLayer data={attendanceData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="productivity" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Tasks Completed</CardTitle>
                </CardHeader>
                 <CardContent>
                     <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <LineChart accessibilityLayer data={productivityData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="tasks" stroke="var(--color-tasks)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="mt-4">
             <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Performance metrics coming soon.</p>
           </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center rounded-md border border-dashed p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {insights && (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>AI-Powered Insights</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap">
                  {insights}
                </AlertDescription>
              </Alert>
            )}
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleGetInsights} disabled={isLoading} className="w-full">
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            Generate AI Insights
        </Button>
      </CardFooter>
    </Card>
  );
}
