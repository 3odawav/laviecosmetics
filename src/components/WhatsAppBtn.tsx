'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function WhatsAppBtn() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#C9A24F' : '#25D366'; // Dark mode: brand-gold, Light mode: green
  const iconColor = isDark ? 'black' : 'white';

  return (
    <Link
      href="https://wa.me/201000025670"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
      style={{ backgroundColor: bg }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp style={{ color: iconColor }} className="w-8 h-8" />
    </Link>
  );
}
