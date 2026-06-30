// src/components/chat/MessageBubble.tsx
interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export default function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser 
            ? 'bg-emerald-600 text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <span className="text-xs opacity-70 mt-1 block">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}