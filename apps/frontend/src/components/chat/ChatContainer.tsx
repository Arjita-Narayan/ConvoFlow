// src/components/chat/ChatContainer.tsx (Alternative)
'use client';

import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import { useGuidedChat } from '@/src/hooks/useGuidedChat';

export default function ChatContainer() {
  const {
    messages,
    isProcessing,
    getCurrentOptions,
    processOption,
    initializeChat
  } = useGuidedChat();

  const initialized = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initializeChat();
    }
  }, [initializeChat]);

  // Scroll to bottom on new messages
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const currentOptions = getCurrentOptions();

  return (
    <div className="bg-white flex flex-col mt-10 w-full max-w-2xl h-[700px] shadow-xl rounded-xl overflow-hidden border border-gray-200">
      <ChatHeader />
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p>Start your conversation!</p>
            <p className="text-sm">Choose an option below to begin</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {currentOptions.length > 0 && !isProcessing && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2 justify-center">
            {currentOptions.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => processOption(option)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:scale-105 active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isProcessing && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}
    </div>
  );
}