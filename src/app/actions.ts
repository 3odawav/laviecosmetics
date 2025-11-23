'use server';

import { getHairConsultation } from '@/services/geminiService';
import type { ChatMessage } from '@/lib/types';


export async function getHairConsultationAction(history: ChatMessage[]): Promise<string> {
    try {
      const result = await getHairConsultation(history);
      return result;
    } catch (error) {
      console.error('Error getting hair consultation:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
}
