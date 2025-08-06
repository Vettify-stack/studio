'use server';

import { complianceSummarizerForOwner } from '@/ai/flows/compliance-summarizer';

export async function getComplianceSummary(complianceData: string) {
  try {
    const result = await complianceSummarizerForOwner({ complianceData });
    return result;
  } catch (error) {
    console.error('Error in getComplianceSummary:', error);
    throw new Error('Failed to get compliance summary from AI.');
  }
}
