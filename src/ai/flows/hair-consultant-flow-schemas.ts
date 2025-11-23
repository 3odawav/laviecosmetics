/**
 * @fileOverview Schemas and types for the getHairConsultation flow.
 */
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

export const HairConsultationInputSchema = z.object({
  history: z.array(ChatMessageSchema),
});
export type HairConsultationInput = z.infer<typeof HairConsultationInputSchema>;

export const HairConsultationOutputSchema = z.object({
  response: z.string(),
});
export type HairConsultationOutput = z.infer<
  typeof HairConsultationOutputSchema
>;
