
'use client';

import MessageBubble from './MessageBubble';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 rounded-lg px-4 py-2">
            <span className="animate-pulse">●●●</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
