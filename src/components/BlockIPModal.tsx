import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, AlertTriangle } from 'lucide-react';

interface BlockIPModalProps {
  isDarkMode: boolean;
  threatIP: string;
  onClose: () => void;
}

export function BlockIPModal({ isDarkMode, threatIP, onClose }: BlockIPModalProps) {
  const handleBlock = () => {
    // Simulate blocking action
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-md mx-4 modal-padding rounded-2xl ${
            isDarkMode 
              ? 'bg-[#0D0D0D] border border-white/[0.08]' 
              : 'bg-white border border-black/[0.06]'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                isDarkMode ? 'bg-red-500/10' : 'bg-red-500/10'
              }`}>
                <AlertTriangle size={20} strokeWidth={1.5} className="text-red-500" />
              </div>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Block IP Address
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/[0.08] text-white/60' 
                  : 'hover:bg-black/[0.04] text-black/60'
              }`}
            >
              <X size={18} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Content - 24px spacing */}
          <div className="spacing-card">
            <p className={`text-sm spacing-group ${
              isDarkMode ? 'text-white/60' : 'text-black/60'
            }`}>
              Are you sure you want to block this IP address? This will prevent all traffic from this source.
            </p>

            {/* IP Display */}
            <div className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-white/[0.04]' : 'bg-black/[0.02]'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-white/50' : 'text-black/50'
                }`}>
                  IP Address
                </span>
                <code className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  {threatIP}
                </code>
              </div>
            </div>
          </div>

          {/* Actions - Primary and Secondary buttons - 24px spacing */}
          <div className="flex items-center gap-3 spacing-card">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={`flex-1 btn-secondary ${
                isDarkMode 
                  ? 'border-white/[0.06] text-white hover:bg-white/[0.06]' 
                  : 'border-black/[0.06] text-black hover:bg-black/[0.04]'
              }`}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBlock}
              className="flex-1 btn-primary bg-red-500 text-white hover:bg-red-600"
            >
              Block IP
            </motion.button>
          </div>

          {/* Info note */}
          <div className={`p-3 rounded-xl flex items-start gap-2 ${
            isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/10'
          }`}>
            <Shield size={14} strokeWidth={1.5} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-500 leading-relaxed">
              You can unblock this IP later from the firewall settings.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}