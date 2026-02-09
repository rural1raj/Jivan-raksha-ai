
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

interface Props {
  onBack: () => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const ChatbotView: React.FC<Props> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I am your AI Veterinary Assistant. How can I help you care for an animal today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'You are a world-class AI Veterinary Consultant and Animal Rescue Specialist. Provide expert, empathetic advice on animal health, emergency first aid, and rescue protocols. Keep responses concise but thorough. Always prioritize animal safety and professional veterinary care.',
        },
      });

      // Simple streaming simulation for smooth UI
      const responseStream = await chat.sendMessageStream({ message: userMessage });
      let fullResponse = '';
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        const textChunk = chunk.text || '';
        fullResponse += textChunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered a neural synchronization error. Please check your connectivity or try asking again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedPrompts = [
    "Signs of heatstroke in dogs?",
    "First aid for a bird with a broken wing",
    "How to safely approach a stray cat?",
    "Is chocolate toxic to all animals?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <button 
          onClick={onBack}
          className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tighter uppercase">VET-AI CONSULTANT</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-emerald-400 mono uppercase font-bold tracking-widest">Neural Link Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto glass-panel rounded-[2rem] p-6 space-y-6 mb-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-white/10'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-blue-400" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' 
                : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
              }`}>
                {msg.text || (isTyping && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : '')}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length < 3 && !isTyping && (
        <div className="flex gap-2 overflow-x-auto pb-4 shrink-0 no-scrollbar">
          {suggestedPrompts.map((prompt, i) => (
            <button 
              key={i}
              onClick={() => setInput(prompt)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="relative shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything about animal care..."
          className="w-full h-16 glass-panel rounded-2xl px-6 pr-16 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors shadow-2xl"
        />
        <button 
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="absolute right-3 top-3 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white disabled:opacity-50 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
