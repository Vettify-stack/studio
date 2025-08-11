
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
import { Button } from './ui/button';
import { Calendar, CheckCircle, Clock, MapPin, XCircle, Building } from 'lucide-react';
  
const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
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

const bookingsByProvince = [
    { province: 'Gauteng', total: 180, confirmed: 150, rejected: 20, pending: 10 },
    { province: 'Western Cape', total: 90, confirmed: 70, rejected: 10, pending: 10 },
    { province: 'KwaZulu-Natal', total: 80, confirmed: 60, rejected: 10, pending: 10 },
];

const bookingsByDLTC = [
    { dltc: 'Alberton DLTC', province: 'Gauteng', total: 60, confirmed: 50 },
    { dltc: 'Langlaagte DLTC', province: 'Gauteng', total: 50, confirmed: 40 },
    { dltc: 'Gallows Hill DLTC', province: 'Western Cape', total: 40, confirmed: 30 },
    { dltc: 'Rossburgh DLTC', province: 'KZN', total: 35, confirmed: 25 },
];

const rejectionReasonsData = [
    { reason: 'Documentation Incomplete', count: 15, percentage: '37.5%' },
    { reason: 'Slot Unavailable (Post-Selection)', count: 10, percentage: '25%' },
    { reason: 'Payment Failed (Simulated)', count: 8, percentage: '20%' },
    { reason: 'User Cancelled', count: 5, percentage: '12.5%' },
    { reason: 'Other', count: 2, percentage: '5%' },
];

const monthlyTrendsData = [
    { month: 'Jan 2025', total: 50, confirmed: 40, rejected: 5 },
    { month: 'Feb 2025', total: 60, confirmed: 50, rejected: 5 },
    { month: 'Mar 2025', total: 75, confirmed: 60, rejected: 10 },
    { month: 'Apr 2025', total: 85, confirmed: 70, rejected: 10 },
    { month: 'May 2025', total: 80, confirmed: 60, rejected: 10 },
];

export default function LicensePrdpBookingAnalytics() {
    return (
        <div className="p-6 rounded-lg space-y-8" style={{ background: 'linear-gradient(to right, #26A69A, #00897B)' }}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">License & PrDP Booking Analytics</h1>
                    <p className="text-white/80">
                        Usage patterns and performance of the renewal booking system.
                    </p>
                </div>
                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Calendar className="h-6 w-6" />
                </Button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Bookings" value="350" icon={Calendar} />
                <StatCard title="Confirmed" value="280" icon={CheckCircle} />
                <StatCard title="Rejected" value="40" icon={XCircle} />
                <StatCard title="Pending" value="30" icon={Clock} />
                <StatCard title="Most Popular Province" value="Gauteng" icon={MapPin} />
                <StatCard title="Most Booked DLTC" value="Alberton DLTC" icon={Building} />
            </div>

            <Card className="bg-white/90">
                <CardHeader>
                    <CardTitle>Bookings by Province</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>PROVINCE</TableHead>
                                <TableHead>TOTAL BOOKINGS</TableHead>
                                <TableHead>CONFIRMED</TableHead>
                                <TableHead>REJECTED</TableHead>
                                <TableHead>PENDING</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookingsByProvince.map((item) => (
                                <TableRow key={item.province}>
                                    <TableCell className="font-medium">{item.province}</TableCell>
                                    <TableCell>{item.total}</TableCell>
                                    <TableCell>{item.confirmed}</TableCell>
                                    <TableCell>{item.rejected}</TableCell>
                                    <TableCell>{item.pending}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-white/90">
                <CardHeader>
                    <CardTitle>Bookings by DLTC (Top 4)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>DLTC</TableHead>
                                <TableHead>PROVINCE</TableHead>
                                <TableHead>TOTAL BOOKINGS</TableHead>
                                <TableHead>CONFIRMED</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {bookingsByDLTC.map((item) => (
                                <TableRow key={item.dltc}>
                                    <TableCell className="font-medium">{item.dltc}</TableCell>
                                    <TableCell>{item.province}</TableCell>
                                    <TableCell>{item.total}</TableCell>
                                    <TableCell>{item.confirmed}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <Card className="bg-white/90">
                <CardHeader>
                    <CardTitle>Rejection Reasons Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>REASON</TableHead>
                                <TableHead>COUNT</TableHead>
                                <TableHead>PERCENTAGE</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rejectionReasonsData.map((item) => (
                                <TableRow key={item.reason}>
                                    <TableCell className="font-medium">{item.reason}</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell>{item.percentage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <Card className="bg-white/90">
                <CardHeader>
                    <CardTitle>Monthly Booking Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>MONTH</TableHead>
                                <TableHead>TOTAL BOOKINGS</TableHead>
                                <TableHead>CONFIRMED</TableHead>
                                <TableHead>REJECTED</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {monthlyTrendsData.map((item) => (
                                <TableRow key={item.month}>
                                    <TableCell className="font-medium">{item.month}</TableCell>
                                    <TableCell>{item.total}</TableCell>
                                    <TableCell>{item.confirmed}</TableCell>
                                    <TableCell>{item.rejected}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
