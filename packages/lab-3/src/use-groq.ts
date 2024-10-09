import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error('GROQ_API_KEY is required')
}

const client = new Groq({
  apiKey: process.env[apiKey],
});

async function useGroq(message: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'llama3-8b-8192',
  });

  return chatCompletion.choices[0].message.content;
}

export default useGroq;
