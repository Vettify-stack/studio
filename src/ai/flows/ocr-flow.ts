'use server';

/**
 * @fileOverview AI tool to perform OCR on an image.
 *
 * - ocrFlow - A function that extracts text from an image.
 * - OcrFlowInput - The input type for the ocrFlow function.
 * - OcrFlowOutput - The return type for the ocrFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OcrFlowInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "An image of a document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OcrFlowInput = z.infer<typeof OcrFlowInputSchema>;

const OcrFlowOutputSchema = z.object({
  text: z.string().describe('The extracted text from the document.'),
});
export type OcrFlowOutput = z.infer<typeof OcrFlowOutputSchema>;

export async function ocrFlow(input: OcrFlowInput): Promise<OcrFlowOutput> {
  const prompt = ai.definePrompt({
    name: 'ocrPrompt',
    input: {schema: OcrFlowInputSchema},
    output: {schema: OcrFlowOutputSchema},
    prompt: `Extract the text from the following document image.

Document: {{media url=imageDataUri}}`,
  });

  const {output} = await prompt(input);
  return output!;
}
