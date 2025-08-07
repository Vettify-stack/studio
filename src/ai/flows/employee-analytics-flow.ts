'use server';

/**
 * @fileOverview AI tool to analyze employee performance data and generate insights.
 *
 * - getEmployeeAnalytics - A function that returns AI-powered analysis of employee performance.
 * - EmployeeAnalyticsInput - The input type for the getEmployeeAnalytics function.
 * - EmployeeAnalyticsOutput - The return type for the getEmployeeAnalytics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmployeeAnalyticsInputSchema = z.object({
  performanceData: z.string().describe('A JSON string representing employee performance data, including attendance and productivity metrics.'),
});
export type EmployeeAnalyticsInput = z.infer<typeof EmployeeAnalyticsInputSchema>;

const EmployeeAnalyticsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights and recommendations based on the performance data.'),
});
export type EmployeeAnalyticsOutput = z.infer<typeof EmployeeAnalyticsOutputSchema>;

export async function getEmployeeAnalytics(input: EmployeeAnalyticsInput): Promise<EmployeeAnalyticsOutput> {
  return employeeAnalyticsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'employeeAnalyticsPrompt',
  input: {schema: EmployeeAnalyticsInputSchema},
  output: {schema: EmployeeAnalyticsOutputSchema},
  prompt: `You are an expert HR analyst. Analyze the following employee performance data and provide actionable insights. Identify trends, potential issues, and areas for improvement.

Performance Data:
{{{performanceData}}}

Based on the data, provide a summary of key trends and actionable recommendations. For example, if attendance is dropping, suggest potential reasons and solutions. If productivity is high on certain days, point that out.
`,
});

const employeeAnalyticsFlow = ai.defineFlow(
  {
    name: 'employeeAnalyticsFlow',
    inputSchema: EmployeeAnalyticsInputSchema,
    outputSchema: EmployeeAnalyticsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
