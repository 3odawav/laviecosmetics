'use server';
/**
 * @fileOverview A hair consultation AI agent.
 *
 * - getHairConsultation - A function that handles the hair consultation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  HairConsultationInputSchema,
  HairConsultationOutputSchema,
  type HairConsultationInput,
  type HairConsultationOutput,
} from './hair-consultant-flow-schemas';

export async function getHairConsultation(
  input: HairConsultationInput
): Promise<HairConsultationOutput> {
  return hairConsultantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hairConsultantPrompt',
  input: { schema: HairConsultationInputSchema },
  output: { schema: z.string() },
  prompt: `You are a friendly and professional hair consultant for LAVIE COSMETICS. Your goal is to help users find the perfect products for their hair type and concerns. Be conversational and helpful.

  Use the following conversation history to understand the user's needs and provide a recommendation.
  Do not repeat your initial greeting if the conversation has already started.

  History:
  {{#each history}}
  {{#if (eq role 'user')}}
  User: {{text}}
  {{/if}}
  {{#if (eq role 'model')}}
  AI: {{text}}
  {{/if}}
  {{/each}}
  
  AI:`,
});

const hairConsultantFlow = ai.defineFlow(
  {
    name: 'hairConsultantFlow',
    inputSchema: HairConsultationInputSchema,
    outputSchema: HairConsultationOutputSchema,
  },
  async input => {
    const response = await prompt(input);
    return { response: response.output! };
  }
);
