import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Linkedin, Github, Mail } from 'lucide-react';
import { socialLinks } from '../data';
import { useScrollProgress } from '../hooks';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6">
          <div
            className={`glass-strong ${scrolled ? 'py-3' : 'py-4'} px-6 rounded-2xl transition-all duration-300`}
            style={{
              transform: scrolled ? 'translateY(0)' : 'translateY(0)',
              boxShadow: scrolled
                ? '0 10px 40px rgba(0, 0, 0, 0.4)'
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    <span className="text-xs font-bold text-cyan-400">TM</span>
                  </div>
                </div>
                <span className="font-bold text-lg text-white">Tushar Malhotra</span>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 rounded-lg bg-cyan-500/10 opacity-0 transition-opacity hover:opacity-100" />
                  </button>
                ))}

                <div className="mx-2 h-5 w-px bg-gray-700" />

                <button
                  onClick={() => handleExternalLink(socialLinks.linkedin)}
                  className="p-2 text-gray-400 transition-colors hover:text-cyan-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleExternalLink(socialLinks.github)}
                  className="p-2 text-gray-400 transition-colors hover:text-cyan-400"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleExternalLink(socialLinks.email)}
                  className="p-2 text-gray-400 transition-colors hover:text-cyan-400"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white md:hidden"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gray-800/50">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="fixed inset-0 z-30 md:hidden"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={isOpen ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ backgroundColor: 'rgba(5, 5, 10, 0.98)' }}
      >
        <div className="container mx-auto flex h-full flex-col justify-center px-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => scrollToSection(item.href)}
                className="py-4 text-left text-2xl font-medium text-white hover:text-cyan-400"
              >
                {item.name}
              </motion.button>
            ))}

            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <button
                onClick={() => handleExternalLink(socialLinks.linkedin)}
                className="p-3 text-gray-300 hover:text-cyan-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleExternalLink(socialLinks.github)}
                className="p-3 text-gray-300 hover:text-cyan-400"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleExternalLink(socialLinks.email)}
                className="p-3 text-gray-300 hover:text-cyan-400"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
