'use server';

/**
 * @fileOverview Summarizes an uploaded document.
 *
 * - summarizeUploadedDocument - A function that summarizes the document.
 */

import {ai} from '@/ai/genkit';
import {
  SummarizeUploadedDocumentInputSchema,
  SummarizeUploadedDocumentOutputSchema,
  type SummarizeUploadedDocumentInput,
  type SummarizeUploadedDocumentOutput,
} from './summarize-uploaded-document-schemas';

export async function summarizeUploadedDocument(
  input: SummarizeUploadedDocumentInput
): Promise<SummarizeUploadedDocumentOutput> {
  return summarizeUploadedDocumentFlow(input);
}

const summarizeUploadedDocumentPrompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentPrompt',
  input: {schema: SummarizeUploadedDocumentInputSchema},
  output: {schema: SummarizeUploadedDocumentOutputSchema},
  prompt: `Summarize the following document content:\n\n{{{documentContent}}}`,
});

const summarizeUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentFlow',
    inputSchema: SummarizeUploadedDocumentInputSchema,
    outputSchema: SummarizeUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await summarizeUploadedDocumentPrompt(input);
    return output!;
  }
);
