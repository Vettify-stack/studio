'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';
import { getComplianceSummary } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ComplianceAISummary() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const complianceData = JSON.stringify({
        fines: [
          {
            vehicle: 'GP 789-BCE',
            reason: 'Speeding violation on N1 Highway',
            amount: 500,
            status: 'Outstanding',
          },
          {
            vehicle: 'GP 789-BCE',
            reason: 'Expired license disc',
            amount: 1000,
            status: 'Outstanding',
          },
          {
            vehicle: 'KZN 555-LMN',
            reason: 'Illegal parking',
            amount: 250,
            status: 'In-Dispute',
          },
        ],
        demerits: 6,
        licenseStatus: 'Valid',
        vehicles: [
          { registration: 'GP 789-BCE', status: 'Non-Compliant' },
          { registration: 'KZN 555-LMN', status: 'At Risk' },
        ],
      });
      const result = await getComplianceSummary(complianceData);
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>AI Compliance Assistant</CardTitle>
            <CardDescription>Get a quick summary of issues.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
        {summary && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Compliance Summary</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">
              {summary}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Summary
        </Button>
      </CardFooter>
    </Card>
  );
}
