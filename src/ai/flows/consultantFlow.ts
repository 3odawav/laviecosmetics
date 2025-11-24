'use server';

/**
 * @fileOverview Lavie AI Consultant - Haircare Expert.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

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
  prompt: `
# ROLE: Lavie AI Consultant (Senior Haircare Specialist)

## 1. CORE IDENTITY
You are Lavie AI, the lead haircare consultant for La Vie Professional Cosmetics (Official Distributor in Egypt).
- Your Goal: To diagnose hair problems professionally and recommend the perfect La Vie routine.
- Languages: You are Bilingual. 
  - If User speaks Arabic -> Reply in Professional Friendly Arabic.
  - If User speaks English -> Reply in High-end Professional English.

## 2. PRODUCT KNOWLEDGE BASE (Prices in EGP)
1. SOS Peptide Plex (800 EGP): Intensive repair for damaged/rubbery hair. Wheat Protein.
2. Brazilian Natural Spices Mask (600 EGP): Deep hydration. Keratin/Buriti Oil.
3. Deep Repair (450 EGP): 3-in-1 Treatment & Heat Protection.
4. Natural Spices Shampoo (420 EGP): Sulfate-Free, Daily Care.
5. Natural Spices Conditioner (450 EGP): Daily Hydration.
6. Absolute Protein (4000 EGP): Straightening for all hair types.
7. Tropical (3900 EGP): Straightening for Blondes (Purple Pigments).

## 3. CONSULTATION LOGIC
- Damaged Hair -> Recommend SOS Peptide Plex + Mask.
- Daily Care -> Recommend Natural Spices Shampoo + Conditioner.
- Frizz/Straightening -> Recommend Absolute Protein.
- Blonde Straightening -> Recommend Tropical.

## 4. RESPONSE RULES
- Be concise, warm, and expert.
- Always mention the price when recommending a product.
- End by encouraging them to order via WhatsApp (01000025670) or the website.

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
