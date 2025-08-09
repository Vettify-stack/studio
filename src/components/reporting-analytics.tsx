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
    <Card className="bg-[#7E57C2] text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6" />
          <CardTitle>Reporting & Analytics</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-purple-100 space-y-2">
            <p>Consults this month: <span className="font-bold text-white">110</span></p>
            <p>Avg. Consultation Time: <span className="font-bold text-white">15 mins</span></p>
        </div>
        <div>
            <h4 className="font-semibold text-white mb-2">Top Diagnoses:</h4>
            <ul className="list-disc list-inside text-sm text-purple-100 space-y-1">
                <li>Common Cold: <span className="font-medium text-white">33</span></li>
                <li>Hypertension Management: <span className="font-medium text-white">22</span></li>
                <li>Routine Checkup: <span className="font-medium text-white">36</span></li>
            </ul>
        </div>
        <Button variant="link" className="p-0 h-auto text-purple-100 hover:text-white">View Full Report</Button>
      </CardContent>
    </Card>
  );
}
