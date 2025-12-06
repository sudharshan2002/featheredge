import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

interface LoadingScreenProps {
  isDarkMode: boolean;
}

export function LoadingScreen({ isDarkMode }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? 'bg-[#0D0D0D]' : 'bg-[#FAFAFA]'
      }`}
    >
      {/* Minimal centered loader */}
      <div className="flex flex-col items-center gap-6">
        {/* Minimal shield icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Shield 
            className={isDarkMode ? 'text-white' : 'text-black'} 
            size={32} 
            strokeWidth={1.5} 
          />
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`text-2xl font-medium tracking-tight ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          FeatherEdge
        </motion.h1>

        {/* Minimal progress bar */}
        <motion.div
          className={`w-48 h-0.5 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-white/10' : 'bg-black/10'
          }`}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}
          />
        </motion.div>

        {/* Subtle status text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xs ${
            isDarkMode ? 'text-white/40' : 'text-black/40'
          }`}
        >
          Initializing security system
        </motion.p>
      </div>
    </motion.div>
  );
}