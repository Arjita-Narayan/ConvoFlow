
'use client';

interface ChatHeaderProps {
  onClose?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl flex justify-between items-center">
      <div>
        <h2 className="text-white font-semibold text-lg">💬 Chat Assistance</h2>
        <p className="text-blue-100 text-sm">How can I help you today?</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
