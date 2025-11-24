'use server';

import {
  chatWithLavie
} from '@/ai/flows/consultantFlow';
import { ChatMessage } from '@/lib/types';


export async function getHairConsultation(
  history: ChatMessage[]
): Promise<string> {
  try {
    // Get the last message from the user
    const userMessage = history.findLast(m => m.role === 'user')?.text || '';
    const result = await chatWithLavie(userMessage);
    return result.reply;
  } catch (error) {
    console.error('Error getting hair consultation:', error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
}
