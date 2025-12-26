# React AI Chat UI – POC
This repository contains a **Proof of Concept (POC)** built as part of a Frontend Developer assignment for Baarez.
The project demonstrates a chat-style UI built using React with a clean and responsive layout.

## How to Use the Application
1.Open the application in your browser using the live demo link or by running it locally.
2.You will see a chat window with an empty conversation area when you scroll.
3.At the bottom of the screen, there is a chat input box where the user can type a message.
4.Type your message in the input field and click the Send button (or press Enter).
5.Your message will immediately appear in the chat window as a user message bubble (right-aligned).
6.A loading indicator saying “Agent is typing…” will be displayed while the mock backend processes the request.
7.After a short delay, the agent’s response will appear as a left-aligned message bubble.
8.As the conversation grows, the chat window becomes scrollable, allowing you to scroll up and view previous messages.
9.The chat automatically scrolls to the latest message when a new response is added.

### React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### React Compiler
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

##### Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
