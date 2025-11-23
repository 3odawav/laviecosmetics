'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { Bot, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  from: 'user' | 'ai';
  text: string;
}

// Basic AI logic (can be expanded)
function createAiReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('تساقط') || lower.includes('fall')) {
    return 'لمعالجة تساقط الشعر، ركزي على التغذية السليمة، صحة فروة الرأس، واستخدام منتجات مناسبة. الشامبو الخالي من السلفات والسيروم المقوي للجذور هما بداية ممتازة.';
  }
  if (lower.includes('هيشان') || lower.includes('frizz')) {
    return 'الهيشان عادة ما يكون سببه الجفاف. استخدمي ماسك ترطيب عميق مرة أسبوعيًا مع سيروم حماية من الحرارة. منتجاتنا بالكرياتين البرازيلي ممتازة للتحكم في الهيشان.';
  }
  if (lower.includes('سعر') || lower.includes('price')) {
    return 'يمكنك العثور على جميع الأسعار في صفحة التسوق الخاصة بنا. كل منتج له سعر محدد بناءً على حجمه وتركيبته.';
  }
  if (lower.includes('بروتين') || lower.includes('treatment')) {
    return 'علاجات البروتين لدينا مصممة لتقوية وإعادة بناء الشعر. للحصول على أفضل النتائج، نوصي باستشارة متخصص لتحديد العلاج الأنسب لنوع شعرك.';
  }
  return 'أهلاً بك في مساعد La Vie AI. كيف يمكنني مساعدتك اليوم في رحلتك للحصول على شعر صحي وجميل؟ اسألني عن المنتجات، مشاكل الشعر، أو الروتين المناسب لك.';
}

export default function LavieAIScrollWidget() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'ai',
      text: 'أهلاً بكِ في مساعد La Vie AI. أنا هنا لمساعدتك في العثور على أفضل المنتجات والحلول لشعرك. بماذا يمكنني خدمتك اليوم؟',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const translateY = Math.min(20, scrollY * 0.03);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { from: 'user', text: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = { from: 'ai', text: createAiReply(trimmed) };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating AI Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-20 h-20 bg-brand-pink dark:bg-brand-gold rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          style={{ transform: `translateY(-${translateY}px)` }}
          aria-label="Open AI Chat"
        >
          <div className="absolute -top-5 -left-5 w-32 h-32">
            <Image
              src="https://i.ibb.co/0pJwVG44/Untitled-design.png"
              alt="LAVIE AI"
              width={128}
              height={128}
              className="transform group-hover:rotate-12 transition-transform duration-300"
            />
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm uppercase"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              LAVIE AI
            </span>
          </div>
        </button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[70vh] border border-zinc-200 dark:border-zinc-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
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
                  <h3 className="font-bold text-lg text-zinc-800 dark:text-white">
                    LAVIE AI
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-start gap-3 ${
                      m.from === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {m.from === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0 p-1">
                        <Image
                          src="https://i.ibb.co/xSkmkymJ/9-1.png"
                          alt="La Vie AI Logo"
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.from === 'ai'
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-none'
                          : 'bg-brand-pink dark:bg-brand-gold text-white dark:text-black rounded-br-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.from === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                      <Image
                        src="https://i.ibb.co/xSkmkymJ/9-1.png"
                        alt="La Vie AI Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="rounded-2xl px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 flex items-center gap-2">
                      <span className="h-2 w-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-zinc-400 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex items-center gap-2"
              >
                <input
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-transparent focus:ring-2 focus:ring-brand-pink dark:focus:ring-brand-gold rounded-full px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
                  placeholder="اسأل عن شعرك..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-pink dark:bg-brand-gold text-white dark:text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
