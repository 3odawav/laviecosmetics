
'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Sparkles, X } from 'lucide-react';
import { getHairConsultation } from '@/services/geminiService';
import { ChatMessage } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "أهلاً بكِ في مساعد La Vie AI. أنا هنا لمساعدتك في العثور على أفضل المنتجات والحلول لشعرك. بماذا يمكنني خدمتك اليوم؟" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    
    // Create the new history including the user's latest message
    const newHistory = [...messages, userMsg];
    
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    const historyForApi = newHistory.map(m => ({role: m.role, text: m.text}));

    // Pass the full history to the service
    const responseText = await getHairConsultation(historyForApi);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-brand-pink dark:bg-brand-gold text-white dark:text-black p-4 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          <Sparkles />
          <span className="font-bold text-sm">Hair AI</span>
        </motion.button>
      )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="bg-brand-pink/10 dark:bg-brand-gold/10 p-4 flex justify-between items-center border-b border-brand-pink/20 dark:border-brand-gold/20">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-brand-pink dark:bg-brand-gold flex items-center justify-center p-1">
                  <Image
                      src="https://i.ibb.co/xSkmkymJ/9-1.png"
                      alt="La Vie AI Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
               </div>
              <h3 className="font-serif font-bold text-brand-pink dark:text-brand-gold">Lavie AI Consultant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:opacity-70">
              <X className="w-5 h-5"/>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 dark:bg-black/50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-pink dark:bg-brand-gold text-white dark:text-black self-end rounded-br-none'
                    : 'bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 self-start rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-500 p-3 rounded-lg self-start rounded-bl-none text-xs italic"
               >
                 Thinking...
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your hair..."
                className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink dark:focus:ring-brand-gold border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-brand-pink dark:bg-brand-gold text-white dark:text-black rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};

export default AIConsultant;
