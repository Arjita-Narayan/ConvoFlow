
'use client';

import { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import OptionButtons from './OptionButtons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatContainerProps {
  onClose?: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
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
      
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <ChatHeader onClose={onClose} />
      <MessageList messages={messages} loading={loading} />
      <OptionButtons onOptionClick={handleOptionClick} disabled={loading} />
    </div>
  );
};

export default ChatContainer;
