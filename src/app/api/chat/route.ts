import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { PERSONAS, PersonaId } from '@/lib/personas/config';
import { z } from 'zod';

// Schema for the chat request
const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
  personaId: z.enum(['anshuman', 'abhimanyu', 'kshitij'] as const),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const { messages, personaId } = chatSchema.parse(body);
    
    const persona = PERSONAS[personaId as PersonaId];
    if (!persona) {
      return new Response('Persona not found', { status: 404 });
    }

    // Inject system prompt
    const fullMessages = [
      { role: 'system', content: persona.systemPrompt },
      ...messages,
    ];

    // Initialize Gemini stream
    const streamResult = await streamText({
      model: google('gemini-2.5-flash') as any,
      messages: fullMessages as any,
      temperature: 0.7,
    });

    return streamResult.toDataStreamResponse();
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Enhanced error handling
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request schema', details: error.errors }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const errorMessage = error.message || 'An unexpected error occurred';
    const status = error.status || 500;

    return new Response(JSON.stringify({ 
      error: errorMessage,
      type: 'gemini_error'
    }), { 
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
