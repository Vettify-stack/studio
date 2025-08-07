
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgePercent } from 'lucide-react';

interface ComplianceScoreProps {
  score: number;
}

export default function ComplianceScore({ score }: ComplianceScoreProps) {
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
        <BadgePercent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            {/* Progress circle */}
            <circle
              className="text-primary"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{score}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
