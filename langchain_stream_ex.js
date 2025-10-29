import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ConversationHistory, runChatLoop } from './chatUtils.js';

// Initialize the model
const model = new ChatOpenAI({
  temperature: 1,
  modelName: process.env.OPENAI_MODEL,
  openAIApiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
    defaultHeaders: {
      'User-Agent': process.env.USER_AGENT_HEADER,
    },
  },
});

// Initialize conversation history
const conversation = new ConversationHistory(
  "Translate the following from English into Finnish, Don't translate any other language",
  10
);

// Streaming response handler
async function handleStreamingResponse(model, conversation) {
  const stream = await model.stream(conversation.getHistory());

  // Collect and display chunks in real-time
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    // Only print non-empty chunks
    if (chunk.content) {
      process.stdout.write(chunk.content);
    }
  }

  console.log('\n'); // New line after streaming

  // Add complete AI response to history
  const fullResponse = chunks.map((c) => c.content).join('');
  conversation.addAIMessage(fullResponse);
}

// Start the chat with streaming
runChatLoop(model, conversation, handleStreamingResponse).catch(console.error);
