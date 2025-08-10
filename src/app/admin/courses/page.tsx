
'use client';

import { useState } from 'react';
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
import {
  BookOpen,
  PlusCircle,
  TrendingUp,
  Users,
  Percent,
  Trash2,
  Edit,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const initialCourses = [
  { id: 'crs-001', title: 'Advanced Defensive Driving', category: 'Safety', duration: '2 hours', enrollments: 125, status: 'Published' },
  { id: 'crs-002', title: 'AARTO & You: A Complete Guide', category: 'Compliance', duration: '1.5 hours', enrollments: 210, status: 'Published' },
  { id: 'crs-003', title: 'Professional Communication for Drivers', category: 'Professional Development', duration: '1 hour', enrollments: 75, status: 'Published' },
  { id: 'crs-004', title: 'Fatigue Management Strategies', category: 'Safety', duration: '45 mins', enrollments: 0, status: 'Draft' },
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

export default function CoursesPage() {
    const [courses, setCourses] = useState(initialCourses);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleAddCourse = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newCourse = {
            id: `crs-${String(courses.length + 1).padStart(3, '0')}`,
            title: formData.get('title') as string,
            category: formData.get('category') as string,
            duration: formData.get('duration') as string,
            enrollments: 0,
            status: 'Draft'
        };
        setCourses(prev => [...prev, newCourse]);
        setIsDialogOpen(false);
        toast({
            title: 'Course Added!',
            description: `"${newCourse.title}" has been created as a draft.`
        });
    }

    return (
        <div className="space-y-6">
             <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="Total Courses" value={String(courses.length)} icon={BookOpen} />
                <StatCard title="Total Active Enrollments" value="410" icon={Users} />
                <StatCard title="Average Completion Rate" value="82%" icon={Percent} />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle>Course Management</CardTitle>
                            <CardDescription>
                            Add, edit, or remove courses available to drivers.
                            </CardDescription>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add a New Course</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details below to create a new course. It will be saved as a draft.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddCourse} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Course Title</Label>
                                        <Input id="title" name="title" placeholder="e.g., Vehicle Inspection Checklist" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" name="description" placeholder="Briefly describe the course content..." required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select name="category" required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Safety">Safety</SelectItem>
                                                    <SelectItem value="Compliance">Compliance</SelectItem>
                                                    <SelectItem value="Professional Development">Professional Development</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input id="duration" name="duration" placeholder="e.g., 1 hour" required />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                        <Button type="submit">Create Course</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Enrollments</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell className="font-medium">{course.title}</TableCell>
                                        <TableCell>{course.category}</TableCell>
                                        <TableCell>{course.duration}</TableCell>
                                        <TableCell>{course.enrollments}</TableCell>
                                        <TableCell>
                                            <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                                                {course.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
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
