'use server';

import { complianceSummarizerForOwner } from '@/ai/flows/compliance-summarizer';
import { getEmployeeAnalytics } from '@/ai/flows/employee-analytics-flow';
import { ocrFlow } from '@/ai/flows/ocr-flow';
import { getDisciplinaryGuidance } from '@/ai/flows/disciplinary-management-flow';

export async function getComplianceSummary(complianceData: string) {
  try {
    const result = await complianceSummarizerForOwner({ complianceData });
    return result;
  } catch (error) {
    console.error('Error in getComplianceSummary:', error);
    throw new Error('Failed to get compliance summary from AI.');
  }
}

export async function extractTextFromImage(imageDataUri: string) {
  try {
    const result = await ocrFlow({ imageDataUri });
    return result;
  } catch (error) {
    console.error('Error in extractTextFromImage:', error);
    throw new Error('Failed to extract text from image using AI.');
  }
}

export async function getEmployeePerformanceInsights(performanceData: string) {
    try {
        const result = await getEmployeeAnalytics({ performanceData });
        return result;
    } catch (error) {
        console.error('Error in getEmployeePerformanceInsights:', error);
        throw new Error('Failed to get employee performance insights from AI.');
    }
}

export async function getDisciplinaryAdvice(
  employeeName: string,
  incidentDescription: string,
  previousIncidents: string
) {
  try {
    const result = await getDisciplinaryGuidance({
      employeeName,
      incidentDescription,
      previousIncidents,
    });
    return result;
  } catch (error) {
    console.error('Error in getDisciplinaryGuidance:', error);
    throw new Error('Failed to get disciplinary guidance from AI.');
  }
}
