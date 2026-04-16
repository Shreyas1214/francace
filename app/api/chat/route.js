import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { getSession } from '@/lib/session';

// Enable Edge runtime for better performance, but ensure compatibility with better-sqlite if we use DB here.
// Since we use the DB via getDb() which is Node.js only, we MUST NOT use the Edge runtime.
// export const runtime = 'edge';

export async function POST(req) {
  try {
    // Basic Auth Check
    const session = await getSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages, examType, clbLevel } = await req.json();

    // Give Claude prompt context instructions based on User's Exam Type and CLB
    const examContext = examType || 'TEF';
    const levelContext = clbLevel || 5;

    const systemPrompt = `You are evaluating a candidate for the "${examContext} Canada" French proficiency exam.
Your role is to act as the native French examiner representing evaluating expressions orales.
The candidate's current estimated level is CLB ${levelContext}.

RULES:
1. ONLY speak in French.
2. Keep your responses conversational, realistic, and moderate in length.
3. Depending on the user's level (CLB ${levelContext}), adjust your vocabulary and expectations.
4. Correct any MAJOR grammatical errors gently and naturally as a native speaker would in a conversation context, or proceed with the scenario.
5. In your first message, initiate a typical ${examContext} exam scenario (e.g., asking for advice, presenting a topic, convincing the examiner).

Start the simulation now.`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'), // Or latest claude-3-5 model available
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('An error occurred while communicating with the AI.', { status: 500 });
  }
}
