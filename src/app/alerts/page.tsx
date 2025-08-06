
import { Bell, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Alert as AlertType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import SafeDate from '@/components/safe-date';

const alerts: AlertType[] = [
  {
    id: '1',
    vehicle: 'GP 789-BCE',
    type: 'License Expiry',
    severity: 'High',
    date: '2024-07-15',
    message: 'Vehicle license is due to expire in 15 days.',
  },
  {
    id: '2',
    vehicle: 'KZN 555-LMN',
    type: 'Demerit Points',
    severity: 'Medium',
    date: '2024-07-10',
    message: 'Driver approaching demerit point threshold.',
  },
  {
    id: '3',
    vehicle: 'GP 789-BCE',
    type: 'Fine Overdue',
    severity: 'High',
    date: '2024-07-01',
    message: 'Outstanding fine of R500 is now overdue.',
  },
  {
    id: '4',
    vehicle: 'WP 987-ZYX',
    type: 'Service Due',
    severity: 'Low',
    date: '2024-06-25',
    message: 'Routine vehicle maintenance is due soon.',
  },
];

const SeverityBadge = ({
  severity,
}: {
  severity: 'High' | 'Medium' | 'Low';
}) => {
  const colorClass = {
    High: 'bg-destructive/20 text-destructive-foreground border-destructive/20',
    Medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/20',
    Low: 'bg-primary/20 text-primary border-primary/20',
  }[severity];

  return (
    <Badge variant="outline" className={`capitalize ${colorClass}`}>
      <AlertTriangle className="mr-1 h-3 w-3" />
      {severity}
    </Badge>
  );
};

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>
                Critical notifications regarding your fleet's compliance status.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 rounded-lg border p-4"
            >
              <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{alert.type}</p>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{alert.vehicle}</span> -{' '}
                  {alert.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  <SafeDate dateString={alert.date} />
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
