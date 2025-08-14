
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
    title: 'Demand Anticipation & Trend Detection',
    details: [
      'Analyze historical driver dispatch data, seasonal mining output patterns, and transportation logs.',
      'Incorporate external factors (fuel price trends, commodity prices, weather patterns, port congestion, and strike history).',
      'Detect upcoming peaks in transport requirements weeks or months in advance.',
    ],
  },
  {
    title: 'Optimized Asset & Inventory Levels',
    details: [
      'Ensure mines always have the right number of compliant drivers and fuel tankers ready.',
      'Predict vehicle maintenance windows and prevent downtime during high-demand periods.',
      'Avoid underutilization of fleets while preventing overstocking of consumables (e.g., tires, safety gear, PPE).',
    ],
  },
  {
    title: 'Waste Reduction & Cost Control',
    details: [
      'Use AI to flag underperforming routes and fuel inefficiencies.',
      'Reduce overtime costs by smart driver scheduling.',
      'Prevent costly delays by predicting high-risk operational periods (e.g., rainy season road damage).',
    ],
  },
  {
    title: 'Cross-Sector Operational Insights',
    details: [
      'Benchmark performance against other mines and transport operators using anonymized industry-wide data.',
      'Identify best-performing mines/transporters and replicate their operational models.',
    ],
  },
  {
    title: 'Incident & Risk Prediction Layer',
    details: [
      'Predict potential compliance breaches before they occur (expired licenses, fatigue risk, unplanned breakdowns).',
      'Integrate AARTO demerit tracking to anticipate driver suspensions and reallocate shifts accordingly.',
    ],
  },
  {
    title: 'Sustainability & ESG Reporting',
    details: [
      'Track CO₂ emissions per trip and optimize loads/routes to reduce environmental impact.',
      'Provide automated ESG compliance reports for investors and regulators.',
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
              Leverage AI to anticipate operational demand, optimize asset
              utilization, and reduce waste.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {features.map((feature, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-indigo-800 font-semibold hover:no-underline">
                {feature.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-indigo-700/90">{detail}</span>
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
