
'use client';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, Edit, Trash2 } from 'lucide-react';

const faqs = [
  {
    question: 'What is Vettify?',
    answer:
      "Vettify is South Africa's next-generation mobility compliance and driver vetting ...",
    keywords: 'what is vettify, about, platform info',
  },
  {
    question: 'Who is Vettify for?',
    answer:
      'Vettify is for Logistics Companies, Car Rental & Leasing Firms, Public Transport ...',
    keywords: 'who is it for, target audience, users',
  },
  {
    question: 'How much does it cost for drivers?',
    answer:
      'For drivers, the Basic plan is R149/month and the Pro plan is R199/month. The Pr...',
    keywords: 'driver pricing, cost for drivers, driver plans',
  },
  {
    question: 'What are the employer pricing plans?',
    answer:
      'For employers, the Standard plan is R1499/month for up to 20 drivers. The Prem...',
    keywords: 'employer pricing, cost for employers, employer plans, f...',
  },
  {
    question: 'What are AARTO Proxy Services?',
    answer:
      'Vettify provides official representation for infringement notices. This includes m...',
    keywords: 'aarto, proxy services, infringement, demerit',
  },
  {
    question: 'What is driver vetting?',
    answer:
      'Our driver vetting service includes comprehensive background checks, continu...',
    keywords: 'vetting, risk profiling, background check',
  },
  {
    question: 'How do document expiry alerts work?',
    answer:
      'The platform automatically tracks the expiry dates of critical documents for both...',
    keywords: 'expiry alerts, renewals, document tracking',
  },
  {
    question: 'Can I manage traffic fines through Vettify?',
    answer:
      'Yes. Drivers can view their fines on the Basic plan. The Driver Pro and all Emplo...',
    keywords: 'fines, traffic fines, manage fines',
  },
];

export default function AITrainerPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <CardTitle>Manage AI Trainer Knowledge Base</CardTitle>
            <CardDescription>
              Add, edit, or remove FAQs to train the AI assistant.
            </CardDescription>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions, answers, or keywords..."
                className="pl-8"
              />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New FAQ
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Question</TableHead>
                <TableHead className="w-[35%]">Answer</TableHead>
                <TableHead className="w-[25%]">Keywords</TableHead>
                <TableHead className="w-[15%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">
                    {faq.answer}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {faq.keywords}
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
  );
}
