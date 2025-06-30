import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const KisaanSevaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं KisaanSeva का AI असिस्टेंट हूं। मैं पौधों की बीमारियों की पहचान में आपकी मदद कर सकता हूं। आप अपनी समस्या के बारे में पूछ सकते हैं।",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatbotId = "R89KxXiIWPIEb4Zf8-Ubj";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load Chatbase script when component mounts
    if (!window.chatbaseConfig) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.defer = true;
      script.onload = () => {
        // Initialize Chatbase
        if (window.chatbase) {
          window.chatbase("init", {
            chatbotId: chatbotId,
            domain: window.location.hostname,
          });
        }
      };
      document.body.appendChild(script);
      window.chatbaseConfig = true;
    }
  }, []);

  const sendToChatbase = async (message) => {
    try {
      // Send message to Chatbase API
      const response = await fetch("https://www.chatbase.co/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          chatbotId: chatbotId,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Chatbase");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text:
            data.text ||
            "क्षमा करें, मुझे समझने में कुछ समस्या हुई। कृपया फिर से कोशिश करें।",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Chatbase API error:", error);

      // Fallback responses if API fails
      const fallbackResponses = [
        "आपके पौधे की समस्या के बारे में और बताएं। क्या आप पत्तियों पर कोई धब्बे या रंग में बदलाव देख रहे हैं?",
        "यह पौधे की बीमारी हो सकती है। कृपया प्रभावित पत्तियों की तस्वीर अपलोड करें ताकि मैं बेहतर मदद कर सकूं।",
        "इस समस्या के लिए आप जैविक कवकनाशी का उपयोग कर सकते हैं। नीम का तेल भी प्रभावी हो सकता है।",
        "मैं आपकी मदद के लिए यहां हूं। कृषि से संबंधित कोई भी प्रश्न पूछ सकते हैं।",
      ];
      const fallbackResponse =
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: fallbackResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Send to Chatbase or your backend
    await sendToChatbase(inputMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const quickActions = [
    "पत्तियों पर धब्बे दिख रहे हैं",
    "पौधे की पत्तियां पीली हो रही हैं",
    "फसल में कीड़े लग गए हैं",
    "पौधे की वृद्धि रुक गई है",
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString("hi-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <span className="leaf-icon">🌿</span>
              </div>
              <div className="chat-header-text">
                <h3 className="chat-title">KisaanSetu AI</h3>
                <p className="chat-subtitle">Plant Disease Expert</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-button">
              <span className="close-icon">×</span>
            </button>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "message-user" : "message-bot"
                }`}
              >
                <div className="message-content">
                  <div
                    className={`message-avatar ${
                      message.sender === "user" ? "avatar-user" : "avatar-bot"
                    }`}
                  >
                    <span className="avatar-icon">
                      {message.sender === "user" ? "👤" : "🤖"}
                    </span>
                  </div>
                  <div
                    className={`message-bubble ${
                      message.sender === "user" ? "bubble-user" : "bubble-bot"
                    }`}
                  >
                    <p className="message-text">{message.text}</p>
                    <p className="message-time">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message message-bot">
                <div className="message-content">
                  <div className="message-avatar avatar-bot">
                    <span className="avatar-icon">🤖</span>
                  </div>
                  <div className="message-bubble bubble-bot">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="quick-actions">
              <p className="quick-actions-title">त्वरित प्रश्न:</p>
              <div className="quick-actions-buttons">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="quick-action-button"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="अपना प्रश्न लिखें..."
                className="chat-input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="send-button"
              >
                <span className="send-icon">➤</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      <button onClick={() => setIsOpen(!isOpen)} className="chat-bubble">
        {isOpen ? (
          <span className="bubble-icon">×</span>
        ) : (
          <>
            <span className="bubble-icon">💬</span>
            {/* Notification dot */}
            <div className="notification-dot"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default KisaanSevaChatbot;
