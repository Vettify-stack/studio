
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const trainingModules = [
    { title: 'Defensive Driving 101', duration: '45 mins', category: 'Safety' },
    { title: 'Customer Service Excellence', duration: '1 hour', category: 'Soft Skills' },
    { title: 'AARTO Regulations Update', duration: '30 mins', category: 'Compliance' },
]

const jobListings = [
    { title: 'Fleet Driver', company: 'Mega Movers Inc.', location: 'Johannesburg', type: 'Full-time' },
    { title: 'Delivery Associate', company: 'Quick Parcel Co.', location: 'Cape Town', type: 'Part-time' },
    { title: 'Taxi Operator', company: 'City Cabs', location: 'Durban', type: 'Contract' },
]

export default function TrainingAndJobsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training &amp; Jobs</h1>
        <p className="text-muted-foreground">
          Upskill yourself and find new opportunities in the industry.
        </p>
      </div>

      {/* Training Library */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle>Training Library</CardTitle>
          </div>
          <CardDescription>
            Browse our free modules to enhance your skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {trainingModules.map((mod, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4 gap-2">
                    <div className='grid gap-1'>
                        <p className="font-semibold">{mod.title}</p>
                        <p className="text-sm text-muted-foreground">{mod.category} - {mod.duration}</p>
                    </div>
                    <Button>Start Module</Button>
                </div>
            ))}
        </CardContent>
      </Card>

      {/* Job Board */}
      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <CardTitle>Job Board</CardTitle>
            </div>
          <CardDescription>
            Find your next role with our trusted partners.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
                <Input placeholder="Search jobs by title or location..." />
                <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
           {jobListings.map((job, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4 gap-2">
                    <div className='grid gap-1'>
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                         <Button variant="outline">View Details</Button>
                         <Button>Apply Now</Button>
                    </div>
                </div>
            ))}
        </CardContent>
      </Card>

       {/* Application Tracking */}
      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>My Applications</CardTitle>
            </div>
          <CardDescription>
            Track the status of your job applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">You haven't applied for any jobs yet.</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
