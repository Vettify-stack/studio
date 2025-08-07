
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Gavel, Loader2, Sparkles, AlertTriangle, BookOpen } from 'lucide-react';
import { getDisciplinaryAdvice } from '@/app/actions';

const formSchema = z.object({
  employeeName: z.string().min(1, 'Employee name is required.'),
  incidentDescription: z.string().min(20, 'Please provide a detailed description (min. 20 characters).'),
  previousIncidents: z.string().optional(),
});

type DisciplinaryAdvice = {
  recommendation: string;
  riskAnalysis: string;
  communicationGuide: string;
};

export default function DisciplinaryManagementCard() {
  const [advice, setAdvice] = useState<DisciplinaryAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: '',
      incidentDescription: '',
      previousIncidents: '',
    },
  });

  const handleGetAdvice = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError('');
    setAdvice(null);
    try {
      const result = await getDisciplinaryAdvice(
        values.employeeName,
        values.incidentDescription,
        values.previousIncidents || 'None'
      );
      setAdvice(result);
    } catch (e) {
      setError('Failed to get disciplinary advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-purple-50 border border-purple-200 transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-md">
            <Gavel className="h-6 w-6 text-purple-700" />
          </div>
          <div>
            <CardTitle className="text-purple-900">AI Disciplinary Assistant</CardTitle>
            <CardDescription className="text-purple-700">
              Get AI-powered guidance for handling employee disciplinary issues.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {advice ? (
          <div className="space-y-4">
            <Alert variant="default" className="bg-white">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <AlertTitle className="font-semibold text-purple-900">AI Recommendation</AlertTitle>
              <AlertDescription className="text-purple-800">
                {advice.recommendation}
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-800 [&>svg]:text-orange-600">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-semibold text-orange-900">Risk & Legal Considerations</AlertTitle>
              <AlertDescription>
                {advice.riskAnalysis}
              </AlertDescription>
            </Alert>
            <Alert variant="default" className="bg-white">
              <BookOpen className="h-4 w-4 text-purple-600" />
              <AlertTitle className="font-semibold text-purple-900">Communication Guide</AlertTitle>
              <AlertDescription className="text-purple-800 whitespace-pre-wrap">
                {advice.communicationGuide}
              </AlertDescription>
            </Alert>
             <Button onClick={() => setAdvice(null)} variant="outline" className="w-full">
                Start New Case
             </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGetAdvice)} className="space-y-4">
              <FormField
                control={form.control}
                name="employeeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-800">Employee Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incidentDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-800">Incident Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the incident in detail: what happened, when, where, and who was involved."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previousIncidents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-800">Summary of Previous Incidents (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Verbal warning issued on 2024-05-15 for similar conduct."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get AI Guidance
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
