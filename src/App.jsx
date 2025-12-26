import { useEffect, useRef, useState } from "react";
import "./App.css";
import Answer from "./components/Answers";

/* ================= MOCK BACKEND ================= */

// this acts like backend memory (stateful)
let memory = [];

const mockAgentResponse = (prompt) => {
  memory.push(prompt);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reply: `You said: "${prompt}". I remember ${memory.length} messages.`,
      });
    }, 1000); // 1 second delay
  });
};

/* ================================================ */

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const [loader, setLoader] = useState(false);
  const scrollToAns = useRef();

  const askQuestion = async () => {
    if (!question && !selectedHistory) return;

    const payloadData = question || selectedHistory;

    // save history
    if (question) {
      const history = recentHistory ? [question, ...recentHistory] : [question];
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    setLoader(true);

    //  MOCKED BACKEND CALL
    const response = await mockAgentResponse(payloadData);

    const dataString = [response.reply];

    setResult((prev) => [
      ...prev,
      { type: "q", text: payloadData },
      { type: "a", text: dataString },
    ]);

    setQuestion("");
    setSelectedHistory("");

    setTimeout(() => {
      scrollToAns.current.scrollTop =
        scrollToAns.current.scrollHeight;
    }, 300);

    setLoader(false);
  };

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const isEnter = (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
    }
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      {/* LEFT SIDEBAR */}
      <div className="col-span-1 bg-zinc-800 pt-3">
        <h1 className="text-xl text-white flex justify-center gap-2">
          Recent Search
          <button onClick={clearHistory} className="cursor-pointer">
            🗑️
          </button>
        </h1>

        <ul className="text-left overflow-auto m-5">
          {recentHistory.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedHistory(item)}
              className="p-2 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CHAT AREA */}
      <div className="col-span-4 p-10">
        <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
          How can I help you?
        </h1>

        {loader && (
          <p className="text-zinc-400 mt-3">Agent is typing...</p>
        )}

        <div
          ref={scrollToAns}
          className="container h-140 overflow-scroll mt-5"
        >
          <ul className="text-zinc-300">
            {result.map((item, index) => (
              <div
                key={index}
                className={item.type === "q" ? "flex justify-end" : ""}
              >
                {item.type === "q" ? (
                  <li className="p-3 bg-zinc-700 rounded-3xl w-fit">
                    <Answer ans={item.text} type="q" />
                  </li>
                ) : (
                  item.text.map((ansItem, ansIndex) => (
                    <li key={ansIndex} className="p-2 text-left">
                      <Answer ans={ansItem} type="a" />
                    </li>
                  ))
                )}
              </div>
            ))}
          </ul>
        </div>

        {/* INPUT */}
        <div className="bg-zinc-800 w-1/2 p-2 text-white m-auto rounded-full border border-zinc-700 flex mt-5">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={isEnter}
            className="w-full p-3 outline-none bg-transparent"
            placeholder="Ask me anything..."
          />
          <button onClick={askQuestion} className="px-4">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;