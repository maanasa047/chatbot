import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [{ sender: 'bot', text: 'Hello! Ask me anything about Indian Government services like Aadhaar, PAN, Passport, etc.' }];
  });

  const [input, setInput] = useState('');
  const [queryCount, setQueryCount] = useState(0);
  const username = localStorage.getItem('username');
  const messagesEndRef = useRef(null);

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Unauthenticated limit
    if (!username && queryCount >= 10) {
      alert('Please login to continue chatting.');
      window.location.href = '/login';
      return;
    }

    setQueryCount((prev) => prev + 1);

    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chatbot Assistant</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          placeholder="Ask me about Aadhaar, PAN, Passport, etc..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <button className="chat-send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
