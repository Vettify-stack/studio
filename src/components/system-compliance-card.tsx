
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  CheckCircle,
  Lock,
  FileText,
  Info,
  Building,
} from 'lucide-react';

const complianceItems = [
  {
    icon: CheckCircle,
    text: 'Role-based access control active.',
  },
  {
    icon: Lock,
    text: 'Patient data encrypted (at rest & in transit).',
  },
  {
    icon: FileText,
    text: 'Audit logs maintained for all actions.',
  },
  {
    icon: Info,
    text: 'System designed for POPIA, GDPR, HIPAA considerations.',
  },
  {
    icon: Building,
    text: 'EHR/EMR Integration: API ready (placeholder).',
  },
];

export default function SystemComplianceCard() {
  return (
    <Card className="bg-emerald-600 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6" />
          <CardTitle>System & Compliance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {complianceItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 text-emerald-200 mt-0.5" />
              <span className="text-emerald-50">{item.text}</span>
            </li>
          ))}
        </ul>
        <Button variant="link" className="p-0 h-auto text-emerald-100 hover:text-white">
          View Compliance Details
        </Button>
      </CardContent>
    </Card>
  );
}
