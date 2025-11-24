import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-uploaded-document.ts';
import '@/ai/flows/extract-keywords-from-document.ts';
import '@/ai/flows/consultantFlow.ts';
// Schemas are not flows, so they don't need to be imported here.
