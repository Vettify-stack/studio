'use server';

/**
 * @fileOverview AI tool to provide guidance on employee disciplinary processes.
 *
 * - getDisciplinaryGuidance - A function that returns AI-powered advice for handling employee disciplinary issues.
 * - DisciplinaryGuidanceInput - The input type for the getDisciplinaryGuidance function.
 * - DisciplinaryGuidanceOutput - The return type for the getDisciplinaryGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DisciplinaryGuidanceInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee.'),
  incidentDescription: z.string().describe('A detailed description of the incident or performance issue.'),
  previousIncidents: z.string().describe('A summary of any previous warnings or related incidents.'),
});
export type DisciplinaryGuidanceInput = z.infer<typeof DisciplinaryGuidanceInputSchema>;

const DisciplinaryGuidanceOutputSchema = z.object({
  recommendation: z.string().describe('The recommended next step (e.g., Verbal Warning, Written Warning, Disciplinary Hearing).'),
  riskAnalysis: z.string().describe('A brief analysis of potential risks or legal considerations based on the provided information.'),
  communicationGuide: z.string().describe('A template or guide for how to communicate the recommended action to the employee.'),
});
export type DisciplinaryGuidanceOutput = z.infer<typeof DisciplinaryGuidanceOutputSchema>;

export async function getDisciplinaryGuidance(input: DisciplinaryGuidanceInput): Promise<DisciplinaryGuidanceOutput> {
  return disciplinaryManagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'disciplinaryGuidancePrompt',
  input: {schema: DisciplinaryGuidanceInputSchema},
  output: {schema: DisciplinaryGuidanceOutputSchema},
  prompt: `You are an expert HR consultant specializing in South African Labour Law. Your role is to provide clear, actionable guidance for disciplinary issues.

Analyze the following employee case:
Employee Name: {{{employeeName}}}
Incident Description: {{{incidentDescription}}}
Previous Incidents: {{{previousIncidents}}}

Based on the principle of progressive discipline, provide a recommendation, a risk analysis, and a communication guide. Your response must be fair, legally sound, and aimed at corrective action rather than punishment.
`,
});

const disciplinaryManagementFlow = ai.defineFlow(
  {
    name: 'disciplinaryManagementFlow',
    inputSchema: DisciplinaryGuidanceInputSchema,
    outputSchema: DisciplinaryGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
