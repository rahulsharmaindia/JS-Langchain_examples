# LangChain JavaScript Examples

A collection of practical LangChain JavaScript examples demonstrating various features and patterns for building AI-powered applications.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- OpenAI API key or compatible AI service

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4
OPENAI_BASE_URL=https://api.openai.com/v1
USER_AGENT_HEADER=langchain-examples/1.0
```

## 📁 Project Structure

```
├── README.md                      # This file
├── package.json                   # Project dependencies
├── chatUtils.js                   # Shared utilities for chat functionality
├── langchain_promp_template_ex.js # Prompt template examples
├── langchain_stream_ex.js         # Streaming response examples
├── langchain_sys_msg_ex.js        # System message examples
└── .env                          # Environment variables (create this)
```

## 📚 Examples

### Core Concepts

#### 1. System Messages (`langchain_sys_msg_ex.js`)
**Purpose:** Demonstrates how to use system messages to set AI behavior and context.

**Key Features:**
- System message initialization
- Conversation history management
- Regular (non-streaming) responses
- Interactive chat loop

**Run:**
```bash
node langchain_sys_msg_ex.js
```

**What you'll learn:**
- Setting up system prompts for consistent AI behavior
- Managing conversation context
- Handling user input/output in a chat interface

---

#### 2. Streaming Responses (`langchain_stream_ex.js`)
**Purpose:** Shows how to implement real-time streaming responses for better user experience.

**Key Features:**
- Real-time token streaming
- Chunk processing and display
- Conversation history with streaming
- Interactive chat interface

**Run:**
```bash
node langchain_stream_ex.js
```

**What you'll learn:**
- Implementing streaming for responsive UIs
- Processing and displaying chunks in real-time
- Managing conversation state with streaming responses

---

#### 3. Prompt Templates (`langchain_promp_template_ex.js`)
**Purpose:** Demonstrates dynamic prompt construction using templates with variables.

**Key Features:**
- Template-based prompt generation
- Variable substitution (`{language}`, `{text}`)
- Structured prompt formatting
- Translation use case example

**Run:**
```bash
node langchain_promp_template_ex.js
```

**What you'll learn:**
- Creating reusable prompt templates
- Dynamic content injection
- Structured prompt organization
- Template debugging and inspection

## 🛠 Shared Utilities (`chatUtils.js`)

The project includes a comprehensive utility module that provides:

### `ConversationHistory` Class
- **Purpose:** Manages chat history with automatic trimming
- **Features:** System message preservation, history size limits
- **Methods:** `addHumanMessage()`, `addAIMessage()`, `trim()`, `isExitCommand()`

### Helper Functions
- **`askQuestion()`:** Promise-based user input handling
- **`runChatLoop()`:** Main chat interface with error handling
- **`cleanup()`:** Graceful application shutdown

### Key Benefits
- **Reusable:** Consistent interface across all examples
- **Robust:** Built-in error handling and input validation
- **Flexible:** Supports both streaming and regular responses

## 🔧 Configuration

### Model Configuration
All examples use a consistent model setup:
```javascript
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
```

### Environment Variables
| Variable | Purpose | Default |
|----------|---------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `OPENAI_MODEL` | Model to use | `gpt-4` |
| `OPENAI_BASE_URL` | API endpoint | `https://api.openai.com/v1` |
| `USER_AGENT_HEADER` | Custom user agent | `langchain-examples/1.0` |

## 🏗 Dependencies

### Core Dependencies
- **`@langchain/openai`** - OpenAI integration for LangChain
- **`@langchain/core`** - Core LangChain functionality
- **`@langchain/langgraph`** - Graph-based workflows (for future examples)
- **`dotenv`** - Environment variable management
- **`uuid`** - Unique identifier generation

### Development Dependencies
- **`@types/node`** - Node.js type definitions

## 🎯 Usage Patterns

### Running Examples
Each example can be run independently:
```bash
node <example-file>.js
```

### Interactive Commands
All examples support these commands during execution:
- `exit` - Stop the program
- `quit` - Stop the program  
- `bye` - Stop the program
- Empty input - Continue without processing

### Error Handling
Examples include comprehensive error handling for:
- Network issues
- API errors
- Invalid input
- Environment configuration problems

## 📈 Future Examples

This repository is designed to be extensible. Future examples may include:

- **Chains & Workflows** - Complex multi-step AI operations
- **RAG (Retrieval Augmented Generation)** - Document-based AI responses
- **Function Calling** - AI-powered tool usage
- **Memory & Persistence** - Long-term conversation memory
- **Embeddings** - Vector similarity and search
- **Multi-Modal** - Text, image, and audio processing
- **Agent Patterns** - Autonomous AI decision making

## 🤝 Contributing

When adding new examples:

1. Follow the existing naming pattern: `langchain_<feature>_ex.js`
2. Use the shared `chatUtils.js` utilities for consistency
3. Include comprehensive error handling
4. Update this README with example documentation
5. Add appropriate dependencies to `package.json`

## 📝 License

This project is provided as educational examples. Please check the licenses of individual dependencies.

## 🐛 Troubleshooting

### Common Issues

**Environment Variables Not Loading**
- Ensure `.env` file is in the root directory
- Check that `dotenv/config` is imported at the top of files

**API Connection Issues**
- Verify your `OPENAI_API_KEY` is correct
- Check `OPENAI_BASE_URL` if using a custom endpoint
- Ensure network connectivity

**Module Import Errors**
- Run `npm install` to ensure all dependencies are installed
- Check that `"type": "module"` is set in `package.json`

**Need Help?**
- Check the console output for specific error messages
- Verify your environment configuration
- Ensure Node.js version compatibility (v18+)