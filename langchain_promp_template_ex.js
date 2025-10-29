import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { askQuestion, ConversationHistory, cleanup } from './chatUtils.js';

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

// Create the prompt template
const systemPrompt = 'Translate the following from English into {language}';

const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', systemPrompt],
  ['user', '{text}'],
]);

// Prompt template example
async function promptTemplateExample() {
  console.log('🤖 Prompt Template Translation Example');
  console.log('💡 Type "exit", "quit", or "bye" to end the conversation.\n');

  // Get target language once at the start
  const language = await askQuestion('Target language: ');

  if (ConversationHistory.isExitCommand(language)) {
    console.log('\n🤖 Goodbye! 👋');
    cleanup();
    return;
  }

  if (!String(language).trim()) {
    console.log('❌ Language is required!');
    cleanup();
    return;
  }

  console.log(`\n✅ Translating to: ${language}\n`);

  while (true) {
    try {
      // Get text to translate
      const text = await askQuestion('Text to translate: ');

      if (ConversationHistory.isExitCommand(text)) {
        console.log('\n🤖 Goodbye! 👋');
        break;
      }

      if (!String(text).trim()) {
        continue;
      }

      // Format the prompt
      const promptValue = await promptTemplate.invoke({
        language: language,
        text: text,
      });

      console.log('\n📝 Generated Prompt:');
      const messages = promptValue.toChatMessages();
      messages.forEach((msg) => {
        console.log(`  ${msg._getType()}: ${msg.content}`);
      });

      // Get AI response
      process.stdout.write('\n🤖 Translation: ');
      const response = await model.invoke(promptValue);
      console.log(response.content + '\n');
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
      console.log('Please try again.\n');
    }
  }

  cleanup();
}

// Start the example
promptTemplateExample().catch(console.error);