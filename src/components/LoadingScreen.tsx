import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Globe, Code, Database, BarChart3 } from 'lucide-react';

type TimerRef = ReturnType<typeof setTimeout>;

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = useMemo(() => [
    { text: 'INITIALIZING AI PORTFOLIO...', icon: Brain, delay: 800 },
    { text: 'LOADING 3D ENGINE...', icon: Cpu, delay: 700 },
    { text: 'LOADING PROJECTS...', icon: Code, delay: 600 },
    { text: 'LOADING SKILLS...', icon: BarChart3, delay: 500 },
    { text: 'LOADING EXPERIENCE...', icon: Database, delay: 500 },
    { text: 'CONNECTING TO NETWORK...', icon: Globe, delay: 700 },
    { text: 'INITIALIZATION COMPLETE', icon: Brain, delay: 200 },
  ], []);

  useEffect(() => {
    let timeoutId: TimerRef;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        timeoutId = setTimeout(() => {
          if (currentStep === steps.length - 1) {
            setIsVisible(false);
            setTimeout(() => onComplete(), 800);
          }
        }, steps[currentStep].delay);
      } else {
        setIsVisible(false);
        setTimeout(() => onComplete(), 800);
      }
    }, steps[currentStep].delay);

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutId);
    };
  }, [currentStep, steps, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#05050a] via-[#0f0f23] to-[#05050a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative mb-12 flex h-32 w-32 items-center justify-center rounded-full border-2 border-cyan-500/50"
              animate={{
                rotate: [0, 360],
                boxShadow: [
                  '0 0 20px hsla(199, 100%, 60%, 0.5)',
                  '0 0 40px hsla(199, 100%, 60%, 0.8)',
                  '0 0 20px hsla(199, 100%, 60%, 0.5)',
                ],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              <div className="absolute -inset-2 rounded-full border border-purple-500/30" />
              <div className="absolute -inset-4 rounded-full border border-blue-500/20" />

              {steps.map((step, index) => (
                <motion.div
                  key={step.text}
                  className="absolute flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === currentStep ? 1 : index < currentStep ? 0.3 : 0,
                    scale: index === currentStep ? 1 : 0.8,
                  }}
                  exit={{ opacity: 0 }}
                >
                  <step.icon
                    className={`h-4 w-4 ${
                      index === currentStep
                        ? 'text-cyan-400'
                        : index < currentStep
                          ? 'text-cyan-400/50'
                          : 'text-transparent'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {steps.map((step, index) => {
                    if (index !== currentStep) return null;
                    return (
                      <motion.div
                        key={`icon-${step.text}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <step.icon className="h-5 w-5 text-cyan-400" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    className="font-mono text-sm font-medium text-cyan-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {steps[currentStep]?.text}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1.5">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 w-2 rounded-full ${
                      index < currentStep
                        ? 'bg-cyan-400'
                        : index === currentStep
                          ? 'bg-cyan-300'
                          : 'bg-gray-700'
                    }`}
                    animate={{
                      scale: index === currentStep ? [1, 1.5, 1] : 1,
                      opacity: index < currentStep ? 1 : index === currentStep ? 0.8 : 0.3,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
