# Echo — Persona-Based AI Chatbot

A production-grade, persona-based AI chatbot built for **Scaler Academy**. Echo allows users to have high-fidelity conversations with three Scaler personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**, powered by **Google Gemini 2.5 Flash**.

> "An elite engineer isn't defined by what they know, but by the systems they architect and the outcomes they ship."

## 🚀 Live Demo
[Deployed App Link](https://echo-persona.vercel.app) *(Placeholder — replace with your actual link)*

## ✨ Key Features
- **Persona Switching**: Seamlessly toggle between three distinct personas with animated transitions.
- **Context Awareness**: Each persona maintains its own system prompt and conversation history.
- **Streaming Experience**: Real-time message streaming powered by Gemini 2.5 Flash.
- **Suggestion Chips**: Persona-specific quick-start prompts to lower the barrier to entry.
- **Premium UI/UX**: Built with a "SaaS-first" aesthetic using Framer Motion, Tailwind CSS, and ShadCN UI.
- **Mobile Responsive**: Fully optimized for all screen sizes.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **AI Provider**: [Google Gemini 2.5 Flash](https://ai.google.dev/gemini-api)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), [ShadCN UI](https://ui.shadcn.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org)

## 📦 Architecture
```text
/src
  /app
    /api/chat    -> Streaming Gemini AI API route
    layout.tsx   -> Global providers & layout
    page.tsx     -> Main landing & chat interface
  /components
    /chat        -> ChatContainer, MessageList, MessageInput, etc.
    /personas    -> PersonaSwitcher, PersonaCards
    /ui          -> Reusable ShadCN components
  /lib
    /personas    -> Persona definitions & system prompts
    utils.ts     -> Helper functions
```

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Spiritsfuse/Echo.git
cd Echo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Prompt Engineering
The system prompts are meticulously crafted using:
- **Role Priming**: Setting deep context for the persona's background.
- **Few-Shot Prompting**: Providing examples of tone and style.
- **Chain-of-Thought**: Instructing the model to reason before answering.
- **Constraints**: Enforcing brevity, formatting, and personality-specific rules.

Detailed annotations can be found in [prompts.md](prompts.md).

## 📄 Documentation
- [Assignment Details](Assignment%2001%20—%20Persona-Based%20AI%20Chatbot.md)
- [System Prompts](prompts.md)
- [Reflection](reflection.md)

---
Built with ❤️ for Scaler Academy.
