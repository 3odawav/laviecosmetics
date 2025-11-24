
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Globe, Menu, X, User, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHomePage ? 'bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
  }`;
  
  const linkColorClass = isScrolled || !isHomePage ? 'text-gray-800 dark:text-brand-gold' : 'text-white dark:text-brand-gold';
  const activeLinkClass = 'text-brand-pink dark:text-white font-bold';

  const NavLinks = () => (
    <>
      <Link href="/" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/' ? activeLinkClass : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>{t.header.home}</Link>
      <Link href="/shop" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors ${pathname.startsWith('/shop') ? activeLinkClass : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>{t.header.shop}</Link>
      <Link href="/about" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/about' ? activeLinkClass : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>{t.header.about}</Link>
      <Link href="/contact" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/contact' ? activeLinkClass : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>{t.header.contact}</Link>
      <Link href="/tracking" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/tracking' ? activeLinkClass : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>Track Order</Link>
    </>
  );

  const goldLogo = "https://i.ibb.co/xSkmkymJ/9-1.png";
  const whiteLogo = "https://i.ibb.co/xSkmkymJ/9-1.png";
  
  let logoSrc = whiteLogo;
  if (theme === 'dark') {
    logoSrc = goldLogo;
  } else if (isScrolled || !isHomePage) {
    logoSrc = goldLogo;
  }


  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Desktop Left Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8 w-1/3">
             <NavLinks />
          </nav>

          {/* Logo - Centered */}
          <div className="flex-1 flex justify-center md:w-1/3">
             <Link href="/">
              <Image
                src={logoSrc}
                alt="LAVIE Logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                priority
              />
            </Link>
          </div>

          {/* Icons & Actions - Right */}
          <div className="flex items-center justify-end space-x-3 md:space-x-4 w-1/3">
             <button onClick={toggleLanguage} className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors`}>
                <Globe size={20} />
              </button>
              <button onClick={toggleTheme} className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors`}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link href="/cart" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors`}>
                <ShoppingCart size={20} />
              </Link>
            {isMobile ? (
              <button onClick={toggleMenu} className={`${linkColorClass} z-50`}>
                 {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            ) : (
               <Link href="/login" className={`${linkColorClass} hover:text-brand-pink dark:hover:text-white transition-colors`}>
                 <User size={20}/>
               </Link>
            )}
          </div>
        </div>
      </div>
      
       {/* Mobile Menu */}
       {isMobile && (
        <div className={`fixed inset-0 bg-white dark:bg-black z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-xl pt-20">
               <Link href="/" className={`text-gray-800 dark:text-brand-gold hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/' ? activeLinkClass : ''}`} onClick={() => setIsMenuOpen(false)}>{t.header.home}</Link>
               <Link href="/shop" className={`text-gray-800 dark:text-brand-gold hover:text-brand-pink dark:hover:text-white transition-colors ${pathname.startsWith('/shop') ? activeLinkClass : ''}`} onClick={() => setIsMenuOpen(false)}>{t.header.shop}</Link>
               <Link href="/about" className={`text-gray-800 dark:text-brand-gold hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/about' ? activeLinkClass : ''}`} onClick={() => setIsMenuOpen(false)}>{t.header.about}</Link>
               <Link href="/contact" className={`text-gray-800 dark:text-brand-gold hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/contact' ? activeLinkClass : ''}`} onClick={() => setIsMenuOpen(false)}>{t.header.contact}</Link>
               <Link href="/tracking" className={`text-gray-800 dark:text-brand-gold hover:text-brand-pink dark:hover:text-white transition-colors ${pathname === '/tracking' ? activeLinkClass : ''}`} onClick={() => setIsMenuOpen(false)}>Track Order</Link>
               <Link href="/login" className="flex items-center gap-2 text-gray-800 dark:text-brand-gold hover:text-brand-pink dark:hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <User size={24}/>
                  <span>{t.header.login}</span>
               </Link>
            </div>
        </div>
      )}

    </header>
  );
}
