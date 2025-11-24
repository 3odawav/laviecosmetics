'use server';

/**
 * @fileOverview Lavie AI Consultant - Haircare Expert.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { LAVIE_HAIR_EXPERT_SYSTEM_PROMPT } from '@/ai/lavieAiPrompt';

// 1. تعريف شكل البيانات (Input/Output Schemas)
const LavieConsultantInputSchema = z.object({
  userMessage: z.string().describe('The message sent by the customer'),
});

const LavieConsultantOutputSchema = z.object({
  reply: z.string().describe('The AI consultant response'),
});

// 2. تعريف البريموت (The Brain)
const consultantPrompt = ai.definePrompt({
  name: 'lavieConsultantPrompt',
  input: { schema: LavieConsultantInputSchema },
  output: { schema: LavieConsultantOutputSchema },
  prompt: `${LAVIE_HAIR_EXPERT_SYSTEM_PROMPT}

User Message:
{{userMessage}}
`,
});

// 3. تعريف الفلو (The Flow)
export const lavieConsultantFlow = ai.defineFlow(
  {
    name: 'lavieConsultantFlow',
    inputSchema: LavieConsultantInputSchema,
    outputSchema: LavieConsultantOutputSchema,
  },
  async (input) => {
    const { output } = await consultantPrompt(input);
    return output!;
  }
);

// 4. دالة التصدير للاستخدام الخارجي
export async function chatWithLavie(userMessage: string) {
  return lavieConsultantFlow({ userMessage });
}
