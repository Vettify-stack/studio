
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BrainCircuit, CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'A. Anticipate Demand',
    details: [
      {
        title: 'Dynamic demand forecasting',
        description:
          'Analyze seasonal mining output patterns, commodity prices, and transport schedules to predict driver, vehicle, and fuel requirements in advance.',
      },
      {
        title: 'Real-time event triggers',
        description:
          'Adjust forecasts automatically based on weather changes, labor strikes, port delays, or market demand spikes.',
      },
      {
        title: 'Integration with mine production systems',
        description:
          'Link directly to ERP and mine scheduling systems to anticipate transport needs as production ramps up or down.',
      },
    ],
  },
  {
    title: 'B. Optimize Inventory Levels',
    details: [
      {
        title: 'Fleet & fuel allocation optimization',
        description:
          'Determine the ideal number of vehicles and fuel loads needed for upcoming weeks, reducing idle assets.',
      },
      {
        title: 'Smart route allocation',
        description:
          'Predict peak transport demand for certain mine shafts or delivery routes, enabling optimized driver rosters and fuel dispatch plans.',
      },
      {
        title: 'Spare parts forecasting',
        description:
          'AI predicts wear-and-tear patterns to ensure critical spare parts and tires are stocked before breakdowns occur.',
      },
    ],
  },
  {
    title: 'C. Reduce Waste',
    details: [
      {
        title: 'Fuel usage efficiency',
        description:
          'AI flags underutilized trucks or excessive fuel consumption patterns, recommending consolidation of trips or driver retraining.',
      },
      {
        title: 'Idle time reduction',
        description:
          'Predict and prevent bottlenecks at loading/unloading points to cut wasted fuel and time.',
      },
      {
        title: 'Proactive compliance management',
        description:
          'Anticipate upcoming license, permit, and vetting renewals to avoid costly delays or downtime.',
      },
    ],
  },
  {
    title: 'Additional Value for Mines & Fuel Transport Sector',
    details: [
      {
        title: 'Safety Risk Prediction',
        description:
          'AI identifies high-risk driver behavior and schedules targeted refresher training before incidents occur.',
      },
      {
        title: 'Regulatory Compliance Alerts',
        description:
          'Automatic updates on AARTO, DOT, or mining safety regulation changes, ensuring all fleet operations remain compliant.',
      },
      {
        title: 'Environmental Impact Forecasting',
        description:
          'Predict fuel and emissions data to help mines meet ESG (Environmental, Social, Governance) goals.',
      },
      {
        title: 'Supplier Reliability Index',
        description:
          'AI ranks fuel suppliers or sub-haulage contractors based on past performance and reliability, reducing operational risk.',
      },
      {
        title: 'Incident Probability Mapping',
        description:
          'Based on historical accident and route hazard data, AI can forecast where accidents or delays are most likely to occur.',
      },
    ],
  },
];

export default function PredictiveAnalyticsCard() {
  return (
    <Card className="bg-indigo-50 border-indigo-200 transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-md">
            <BrainCircuit className="h-6 w-6 text-indigo-700" />
          </div>
          <div>
            <CardTitle className="text-indigo-900">
              Predictive Analytics for Demand Forecasting
            </CardTitle>
            <CardDescription className="text-indigo-700">
              Harness AI and historical operational data to forecast needs, reduce inefficiencies, and improve resource allocation.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {features.map((feature, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-indigo-800 font-semibold hover:no-underline text-left">
                {feature.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pl-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-indigo-800/90">{detail.title}</h4>
                        <p className="text-sm text-indigo-700/80">{detail.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
