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

// Initialize conversation history with system message
const conversation = new ConversationHistory(
  "Translate the following from English into Finnish, Don't translate any other language",
  10
);

// Regular response handler (non-streaming)
async function handleRegularResponse(model, conversation) {
  const response = await model.invoke(conversation.getHistory());
  
  // Display AI response
  console.log(response.content + '\n');

  // Add AI response to history
  conversation.addAIMessage(response.content);
}

// Start the chat with regular (non-streaming) responses
runChatLoop(model, conversation, handleRegularResponse).catch(console.error);