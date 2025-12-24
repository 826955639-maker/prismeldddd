
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, MessageCircle } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '您好，王爷爷！我是您的康养小助手小悦，今天感觉怎么样？', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await geminiService.getChatResponse(
      messages.map(m => ({ role: m.role, text: m.text })),
      input
    );

    const aiMsg: Message = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-all z-50 animate-bounce"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] max-w-[90vw] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h4 className="font-bold">AI 康养助手</h4>
                <p className="text-xs text-indigo-100">为您全天候待命</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-white shadow-sm text-indigo-600'}`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white shadow-sm text-gray-800 rounded-tl-none border border-gray-100'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center animate-pulse">
                    <Bot size={16} className="text-gray-400" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white shadow-sm text-gray-400 text-sm animate-pulse">
                    正在思考中...
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="问问您的健康助手..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
