import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Check } from 'lucide-react';
import { socialLinks } from '../data';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mailtoLink = `mailto:${socialLinks.email.replace('mailto:', '')}?subject=${encodeURIComponent(
      formData.subject,
    )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;

    window.open(mailtoLink, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
    viewport: { once: true },
  };

  const contactMethods = [
    {
      id: 'email',
      title: 'Email',
      value: 'tusharmalhotra2007@gmail.com',
      icon: Mail,
      href: socialLinks.email,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/tushar-malhotra-293211257',
      icon: Linkedin,
      href: socialLinks.linkedin,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'github',
      title: 'GitHub',
      value: 'github.com/sharrymalhotra',
      icon: Github,
      href: socialLinks.github,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div className="mb-12 text-center" {...fadeInUp}>
          <span className="text-sm font-medium text-cyan-400">Contact</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s Build Something Intelligent
          </h2>
          <p className="mt-3 max-w-2xl text-gray-400">
            Interested in AI, Generative AI, Agentic Systems or intelligent automation? Let&apos;s
            connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                className="group glass-strong rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-xl bg-gradient-to-br ${method.color} bg-opacity-10 p-3`}>
                    <method.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{method.title}</h3>
                    <p className="text-sm text-gray-400">{method.value}</p>
                  </div>
                  <motion.a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-cyan-300"
                    whileHover={{ scale: 1.1 }}
                    aria-label={method.title}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-6m-4-10l-4 4m0 0l-4 4m4-4V2"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="glass-strong rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-xl font-bold text-white">Send a Message</h3>

            {isSubmitted && (
              <motion.div
                className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-500/10 p-4 text-emerald-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Check className="h-5 w-5" />
                <span className="text-sm">Thanks! Your message is ready to send.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-gray-900/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none ${errors.name ? 'border-red-500/50' : 'border-gray-700'}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-gray-900/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none ${errors.email ? 'border-red-500/50' : 'border-gray-700'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-gray-900/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none ${errors.subject ? 'border-red-500/50' : 'border-gray-700'}`}
                  placeholder="Project collaboration, job opportunity, etc."
                />
                {errors.subject && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full resize-none rounded-xl border bg-gray-900/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none ${errors.message ? 'border-red-500/50' : 'border-gray-700'}`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {!isSubmitting && (
                  <Send className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
