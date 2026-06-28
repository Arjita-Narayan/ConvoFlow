'use client';

import { useState } from 'react';

// Simple Chat Component (inline for now)
const ChatInterface = () => {
  const [messages, setMessages] = useState<{text: string, sender: string}[]>([
    {
      text: "👋 Welcome to Chat Assistance! How can I help you today?",
      sender: 'bot'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: option, sender: 'user' }]);
    setLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      let response = '';
      switch(option) {
        case 'Product Info':
          response = '📦 We have 3 amazing products:\n• Basic - $9/mo\n• Pro - $29/mo\n• Enterprise - Custom\n\nWhich one interests you?';
          break;
        case 'Get Support':
          response = '🆘 I can help you with:\n• Technical issues\n• Billing questions\n• Account management\n\nWhat do you need help with?';
          break;
        case 'Pricing':
          response = '💰 Our pricing plans:\n• Basic: $9/month\n• Pro: $29/month\n• Enterprise: Contact sales\n\nWould you like to see a demo?';
          break;
        default:
          response = `You selected: ${option}. How else can I assist you?`;
      }
      
      setMessages(prev => [...prev, { 
        text: response,
        sender: 'bot' 
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl">
        <h2 className="text-white font-semibold text-lg">💬 Chat Assistance</h2>
        <p className="text-blue-100 text-sm">How can I help you today?</p>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg px-4 py-2 whitespace-pre-wrap ${
              msg.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg px-4 py-2">
              <span className="animate-pulse">●●●</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Options - Always 3 buttons */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          {['Product Info', 'Get Support', 'Pricing'].map((opt) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-white hover:bg-blue-50 border-2 border-blue-200 rounded-lg transition disabled:opacity-50 text-sm font-medium"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Page
export default function Home() {
  const [showChat, setShowChat] = useState(false);

  // If chat is open, show the chat interface
  if (showChat) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <ChatInterface />
      </main>
    );
  }

  // Otherwise show the landing page
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Chat Assistance 💬
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          How can I help you today?
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button 
            onClick={() => setShowChat(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </button>
          <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
            Learn More
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Contact Us
          </button>
        </div>
      </div>
    </main>
  );
}