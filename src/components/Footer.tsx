import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';
import { socialLinks } from '../data';

const Footer: React.FC = () => {
  const socialItems = [
    { name: 'LinkedIn', icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { name: 'GitHub', icon: Github, href: socialLinks.github, label: 'GitHub' },
    { name: 'Email', icon: Mail, href: socialLinks.email, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-gray-800/50 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2 md:items-start"
          >
            <h3 className="text-xl font-bold text-white">Tushar Malhotra</h3>
            <p className="text-sm text-gray-400">AI Engineer</p>
            <p className="text-sm text-gray-500">
              Building intelligent systems with AI, automation and engineering.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 bg-gray-900/30 text-gray-400 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{item.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 border-t border-gray-800/50 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Tushar Malhotra. All rights reserved.
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
