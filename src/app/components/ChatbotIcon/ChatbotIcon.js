// app/components/ChatbotIcon/ChatbotIcon.js
"use client";
import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import ChatbotModal from './ChatbotModal';

const ChatbotIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="fixed bottom-8 right-8 w-16 h-16 cursor-pointer transition-transform hover:scale-110 z-50"
        onClick={handleChatbotClick}
      >
        <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
          <Bot className="h-8 w-8 text-white" />
        </div>
      </div>
      <ChatbotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ChatbotIcon;