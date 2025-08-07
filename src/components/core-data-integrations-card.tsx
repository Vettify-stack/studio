
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, DatabaseZap } from 'lucide-react';

const integrations = [
  {
    source: 'AARTO Integration',
    features: [
      'Offences & Fines',
      'Demerit Points',
      'License Suspensions',
      'Dispute Status',
    ],
  },
  {
    source: 'RTMC / eNaTIS',
    features: ['Vehicle Registration & License Status Verification'],
  },
  {
    source: 'HANIS / NPR (Planned Phase)',
    features: ['ID Verification', 'Facial Recognition Matching'],
    status: 'Planned Phase',
  },
  {
    source: 'SAMBRA / Insurance Databases (Future Scope)',
    features: ['Accident & Claims History Data'],
    status: 'Future Scope',
  },
];

export default function CoreDataIntegrationsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <DatabaseZap className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Data Integrations (Planned)</CardTitle>
            <CardDescription>
              Planned integrations to streamline driver compliance,
              verification, and risk insights.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <div key={integration.source} className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold">{integration.source}</h4>
              {integration.status && (
                <Badge variant="outline">{integration.status}</Badge>
              )}
            </div>
            <ul className="space-y-2">
              {integration.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
