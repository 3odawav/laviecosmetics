'use server';

/**
 * @fileOverview Extracts keywords from a document using AI.
 *
 * - extractKeywordsFromDocument - A function that extracts keywords from a document.
 */

import {ai} from '@/ai/genkit';
import {
  ExtractKeywordsFromDocumentInputSchema,
  ExtractKeywordsFromDocumentOutputSchema,
  type ExtractKeywordsFromDocumentOutput,
  type ExtractKeywordsFromDocumentInput,
} from './extract-keywords-from-document-schemas';

export async function extractKeywordsFromDocument(
  input: ExtractKeywordsFromDocumentInput
): Promise<ExtractKeywordsFromDocumentOutput> {
  return extractKeywordsFromDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKeywordsFromDocumentPrompt',
  input: {schema: ExtractKeywordsFromDocumentInputSchema},
  output: {schema: ExtractKeywordsFromDocumentOutputSchema},
  prompt: `You are an expert in extracting keywords from text documents.

  Please extract the most important keywords and phrases from the following document.
  Return them as a JSON array.

  Document:
  {{documentText}}`,
});

const extractKeywordsFromDocumentFlow = ai.defineFlow(
  {
    name: 'extractKeywordsFromDocumentFlow',
    inputSchema: ExtractKeywordsFromDocumentInputSchema,
    outputSchema: ExtractKeywordsFromDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
