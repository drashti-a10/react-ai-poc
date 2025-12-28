# React AI Chat UI – POC
This repository contains a **Proof of Concept (POC)** built as part of a Frontend Developer assignment for Baarez.
The project demonstrates a chat-style UI built using React with a clean and responsive layout.
 This UI will interact with a mocked backend API, simulating the experience of talking to the 
"Mini-Agent" from the backend POC. 

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

## Installation & Running
```bash
git clone https://github.com/drashti-a10/react-ai-poc.git
cd react-ai-poc
npm install
npm start
