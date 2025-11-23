/**
 * @fileOverview Schemas and types for the summarizeUploadedDocument flow.
 */
import {z} from 'genkit';

export const SummarizeUploadedDocumentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to summarize.'),
});
export type SummarizeUploadedDocumentInput = z.infer<
  typeof SummarizeUploadedDocumentInputSchema
>;

export const SummarizeUploadedDocumentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the document.'),
});
export type SummarizeUploadedDocumentOutput = z.infer<
  typeof SummarizeUploadedDocumentOutputSchema
>;
