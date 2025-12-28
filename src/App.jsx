import { useState, useRef, useEffect } from "react";

/* ================= MOCK BACKEND ================= */
let memory = {}; // keep memory outside to persist across calls

const mockBackend = async (userMessage) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const msg = userMessage.toLowerCase();

      // Calculator example
      if (msg.includes("calculate") || msg.includes("what is 10 plus 5")) {
        resolve("Result: 15");
      } 
      // Memory save example
      else if (msg.includes("remember my cat's name is")) {
        memory["cat_name"] = userMessage.split("is")[1].trim();
        resolve(`Saved memory: ${memory["cat_name"]}`);
      } 
      // Memory read example
      else if (msg.includes("what is my cat's name")) {
        if (memory["cat_name"]) {
          resolve(`Your cat's name is ${memory["cat_name"]}`);
        } else {
          resolve("I don't know your cat's name yet.");
        }
      } 
      // Greeting example
      else if (msg.includes("hello")) {
        resolve("Hi 👋 How can I help you?");
      } 
      // Weather example
      else if (msg.includes("weather")) {
        resolve("🌤️ The weather is sunny today.");
      } 
      // Fallback
      else {
        resolve("Sorry, I didn't understand that.");
      }
    }, 800); // fake API delay
  });
};

/* ================= APP ================= */
export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setError("");
    setLoading(true);

    // 1️⃣ Add user message immediately
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // 2️⃣ Call mocked backend
      const reply = await mockBackend(input);

      // 3️⃣ Add agent response
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: reply },
      ]);
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header */}
      <div className="p-4 text-xl font-semibold text-center border-b border-zinc-700">
        Mini AI Agent (Mock Backend)
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl break-words ${
                msg.sender === "user" ? "bg-violet-600" : "bg-zinc-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-zinc-400">Agent is typing...</p>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-5 py-2 bg-violet-600 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
