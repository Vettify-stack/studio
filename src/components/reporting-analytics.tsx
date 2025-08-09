'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart } from 'lucide-react';

export default function ReportingAnalytics() {
  return (
    <Card className="bg-blue-50 border-blue-200 text-blue-900">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6" />
          <CardTitle>Reporting & Analytics</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-blue-800/90 space-y-2">
            <p>Consults this month: <span className="font-bold text-blue-900">110</span></p>
            <p>Avg. Consultation Time: <span className="font-bold text-blue-900">15 mins</span></p>
        </div>
        <div>
            <h4 className="font-semibold text-blue-900 mb-2">Top Diagnoses:</h4>
            <ul className="list-disc list-inside text-sm text-blue-800/90 space-y-1">
                <li>Common Cold: <span className="font-medium text-blue-900">33</span></li>
                <li>Hypertension Management: <span className="font-medium text-blue-900">22</span></li>
                <li>Routine Checkup: <span className="font-medium text-blue-900">36</span></li>
            </ul>
        </div>
        <Button variant="link" className="p-0 h-auto text-blue-700 hover:text-blue-900">View Full Report</Button>
      </CardContent>
    </Card>
  );
}
