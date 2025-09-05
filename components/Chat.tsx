
import React, { useState, useEffect, useRef } from 'react';
import { createChatSession } from '../services/geminiService';
import type { Chat as ChatSession } from '@google/genai';
import { SendIcon, BackIcon, LogoIcon } from './icons';

interface ChatProps {
  onBack: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chat: React.FC<ChatProps> = ({ onBack }) => {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
        setIsLoading(true);
        const session = createChatSession();
        setChatSession(session);
        
        try {
            const response = await session.sendMessage({ message: "Introduce yourself and ask me about my primary financial goal." });
            setMessages([{ role: 'model', text: response.text }]);
        } catch(e) {
            console.error(e);
            setMessages([{ role: 'model', text: "Hello! I'm Aura, your AI finance assistant. Unfortunately, I'm having a little trouble connecting right now. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatSession) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userInput });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = { role: 'model', text: "I'm sorry, I encountered an error. Could you please try rephrasing your message?" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[80vh] bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
             <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <BackIcon className="w-5 h-5" />
                Back
            </button>
            <h2 className="text-lg font-semibold text-white">Chat with Aura AI</h2>
            <div/>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'model' && (
                         <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
                            <LogoIcon className="w-5 h-5"/>
                        </div>
                    )}
                    <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-br-lg' : 'bg-gray-700 text-gray-200 rounded-bl-lg'}`}>
                       <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                    </div>
                </div>
            ))}
            {isLoading && messages.length > 0 && (
                 <div className="flex items-start gap-3">
                     <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
                        <LogoIcon className="w-5 h-5"/>
                    </div>
                    <div className="max-w-md p-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-lg">
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-0"></span>
                           <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></span>
                           <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400"></span>
                        </div>
                    </div>
                 </div>
            )}
             <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700/50">
            <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about your finances..."
                    disabled={isLoading}
                    className="flex-1 w-full bg-transparent p-3 text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="p-2 rounded-full text-white bg-violet-600 hover:bg-violet-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
    </div>
  );
};

export default Chat;
