'use server';

import { complianceSummarizerForOwner } from '@/ai/flows/compliance-summarizer';
import { getEmployeeAnalytics } from '@/ai/flows/employee-analytics-flow';
import { ocrFlow } from '@/ai/flows/ocr-flow';

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
