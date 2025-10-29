import * as readline from 'readline';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

// Create readline interface for user input
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask user for input
export const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Create conversation history manager
export class ConversationHistory {
  constructor(systemMessage = '', maxMessages = 10) {
    this.history = systemMessage ? [new SystemMessage(systemMessage)] : [];
    this.maxMessages = maxMessages;
  }

  // Add a human message
  addHumanMessage(content) {
    this.history.push(new HumanMessage(content));
  }

  // Add an AI message
  addAIMessage(content) {
    this.history.push(new AIMessage(content));
  }

  // Get the full history
  getHistory() {
    return this.history;
  }

  // Keep conversation history manageable
  trim() {
    if (this.history.length > this.maxMessages) {
      // Keep system message and remove oldest pairs
      const systemMessages = this.history.filter((msg) => msg instanceof SystemMessage);
      const otherMessages = this.history.filter((msg) => !(msg instanceof SystemMessage));
      
      // Remove oldest messages if needed
      const messagesToRemove = this.history.length - this.maxMessages;
      otherMessages.splice(0, messagesToRemove);
      
      this.history = [...systemMessages, ...otherMessages];
    }
  }

  // Check if user wants to exit
  static isExitCommand(input) {
    const normalized = String(input).toLowerCase().trim();
    return normalized === 'exit' || normalized === 'quit' || normalized === 'bye';
  }
}

// Clean up and exit
export const cleanup = () => {
  rl.close();
  process.exit(0);
};

// Main chat loop - handles user input and conversation flow
export async function runChatLoop(model, conversation, processResponse) {
  console.log('🤖 Welcome to the Interactive AI Chatbot!');
  console.log('💡 Type "exit", "quit", or "bye" to end the conversation.\n');

  while (true) {
    try {
      const userInput = await askQuestion('You: ');

      // Check for exit commands
      if (ConversationHistory.isExitCommand(userInput)) {
        console.log('\n🤖 AI: Goodbye! Have a great day! 👋');
        break;
      }

      // Skip empty inputs
      if (!String(userInput).trim()) {
        continue;
      }

      // Add user message to history
      conversation.addHumanMessage(userInput);

      // Show typing indicator
      process.stdout.write('🤖 AI: ');

      // Process the response (streaming or regular)
      await processResponse(model, conversation);

      // Trim history to keep it manageable
      conversation.trim();
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
      console.log('Please try again.\n');
    }
  }

  cleanup();
}
