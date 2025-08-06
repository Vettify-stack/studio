'use server';

/**
 * @fileOverview AI tool to summarize compliance violations based on available data to explain violation reasons in easy to understand language.
 *
 * - complianceSummarizerForOwner - A function that handles the compliance summarization process for a vehicle owner.
 * - ComplianceSummarizerForOwnerInput - The input type for the complianceSummarizerForOwner function.
 * - ComplianceSummarizerForOwnerOutput - The return type for the complianceSummarizerForOwner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComplianceSummarizerForOwnerInputSchema = z.object({
  complianceData: z.string().describe('The compliance data of the vehicle owner.'),
});
export type ComplianceSummarizerForOwnerInput = z.infer<typeof ComplianceSummarizerForOwnerInputSchema>;

const ComplianceSummarizerForOwnerOutputSchema = z.object({
  summary: z.string().describe('A plain language summary of any compliance violations or areas of concern.'),
});
export type ComplianceSummarizerForOwnerOutput = z.infer<typeof ComplianceSummarizerForOwnerOutputSchema>;

export async function complianceSummarizerForOwner(input: ComplianceSummarizerForOwnerInput): Promise<ComplianceSummarizerForOwnerOutput> {
  return complianceSummarizerForOwnerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'complianceSummarizerForOwnerPrompt',
  input: {schema: ComplianceSummarizerForOwnerInputSchema},
  output: {schema: ComplianceSummarizerForOwnerOutputSchema},
  prompt: `You are an AI compliance assistant for vehicle owners. Your goal is to summarize compliance violations or areas of concern in plain language so the owner can quickly understand what actions they need to take to ensure compliance.

Compliance Data: {{{complianceData}}}

Summary:`,
});

const complianceSummarizerForOwnerFlow = ai.defineFlow(
  {
    name: 'complianceSummarizerForOwnerFlow',
    inputSchema: ComplianceSummarizerForOwnerInputSchema,
    outputSchema: ComplianceSummarizerForOwnerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
