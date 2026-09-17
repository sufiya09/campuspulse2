
import React, { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

function CampusAI() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm Campus Pulse AI. How can I help you?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage = message.trim();

    if (!userMessage || loading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      console.log("Sending AI request...");

      const response = await fetch(
        "http://localhost:5001/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      console.log("AI response status:", response.status);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI request failed.");
      }

      setMessages((previous) => [
        ...previous,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI CONNECTION ERROR:", error);

      setMessages((previous) => [
        ...previous,
        {
          sender: "ai",
          text:
            "Sorry, I couldn't connect to the AI service. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* AI CHAT BUTTON */}

      {!open && (
        <button
          className="campus-ai-button"
          onClick={() => setOpen(true)}
          aria-label="Open Campus AI"
        >
          <MessageCircle size={24} />
          <span>Campus AI</span>
        </button>
      )}

      {/* AI CHAT WINDOW */}

      {open && (
        <div className="campus-ai-window">

          {/* HEADER */}

          <div className="campus-ai-header">
            <div className="campus-ai-title">

              <div className="campus-ai-icon">
                <Bot size={21} />
              </div>

              <div>
                <strong>Campus Pulse AI</strong>
                <span>Campus assistant</span>
              </div>

            </div>

            <button
              className="campus-ai-close"
              onClick={() => setOpen(false)}
              aria-label="Close AI"
            >
              <X size={20} />
            </button>
          </div>

          {/* MESSAGES */}

          <div className="campus-ai-messages">

            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.sender === "user"
                    ? "campus-ai-message user-message"
                    : "campus-ai-message ai-message"
                }
              >
                {item.text}
              </div>
            ))}

            {loading && (
              <div className="campus-ai-message ai-message">
                Thinking...
              </div>
            )}

          </div>

          {/* INPUT */}

          <div className="campus-ai-input-area">

            <input
              type="text"
              placeholder="Ask Campus AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="campus-ai-input"
            />

            <button
              onClick={sendMessage}
              className="campus-ai-send"
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default CampusAI;



