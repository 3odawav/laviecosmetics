'use server';

import {
  getHairConsultation as getHairConsultationFlow,
} from '@/ai/flows/hair-consultant-flow';
import { HairConsultationInput } from '@/ai/flows/hair-consultant-flow-schemas';

export async function getHairConsultation(
  history: HairConsultationInput['history']
): Promise<string> {
  try {
    const result = await getHairConsultationFlow({ history });
    return result.response;
  } catch (error) {
    console.error('Error getting hair consultation:', error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
}
