/**
 * @fileOverview Schemas and types for the extractKeywordsFromDocument flow.
 */
import {z} from 'genkit';

export const ExtractKeywordsFromDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the document.'),
});
export type ExtractKeywordsFromDocumentInput = z.infer<
  typeof ExtractKeywordsFromDocumentInputSchema
>;

export const ExtractKeywordsFromDocumentOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of keywords extracted from the document.'),
});
export type ExtractKeywordsFromDocumentOutput = z.infer<
  typeof ExtractKeywordsFromDocumentOutputSchema
>;
