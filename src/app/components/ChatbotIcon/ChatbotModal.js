"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, Bot, Loader2, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hi! I'm your AI learning assistant powered by SkillUp. I can help you with:\n\n" +
        "• Learning recommendations\n" +
        "• Course guidance\n" +
        "• Technical concepts\n" +
        "• Study strategies\n\n" +
        "What would you like to learn about?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    startNewChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewChat = async () => {
    const chatInstance = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });
    setChat(chatInstance);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chat) return;

    const userMessage = {
      type: "user",
      content: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const prompt = `You are a helpful assistant. Use Markdown formatting in your responses when appropriate (e.g., **bold** for emphasis, *italic* for terms, \`code\` for code snippets, etc.). Answer concisely based on the user's question.\n\nQuestion: ${userMessage.content}`;
      const result = await chat.sendMessage(prompt);
      const response = result.response;

      const botResponse = {
        type: "bot",
        content: response.text(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content:
            "Sorry, I encountered an error. Please try again. " + error.message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageContent = ({ content, type }) => {
    if (type === "user") {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }
    
    return (
      <ReactMarkdown
        className="markdown-content"
        components={{
          p: ({ children }) => <p className="mb-2">{children}</p>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-3 rounded-lg my-2 overflow-x-auto">
              {children}
            </pre>
          ),
          ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
          ol: ({ children }) => (
            <ol className="list-decimal ml-4 mb-2">{children}</ol>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-8 w-[45%] h-[550px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <Bot className="h-8 w-8" />
        <h2 className="text-xl font-semibold">AI Assistant</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : message.type === "error"
                  ? "bg-red-50 text-red-800"
                  : "bg-white text-gray-800 shadow-sm"
              } text-left`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.type === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {message.type === "user" ? "You" : "AI Assistant"}
                </span>
              </div>
              <MessageContent content={message.content} type={message.type} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 bg-gray-50"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;