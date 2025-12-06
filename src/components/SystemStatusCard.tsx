import { motion } from 'motion/react';
import { Power, Shield, Wifi } from 'lucide-react';
import { useState } from 'react';

interface SystemStatusCardProps {
  isDarkMode: boolean;
}

export function SystemStatusCard({ isDarkMode }: SystemStatusCardProps) {
  const [systemStatus, setSystemStatus] = useState({
    protection: true,
    monitoring: true,
    firewall: true,
  });

  const toggleStatus = (key: keyof typeof systemStatus) => {
    setSystemStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl flex flex-col ${
        isDarkMode 
          ? 'bg-white/[0.02] border border-white/[0.08]' 
          : 'bg-white border border-black/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
      }`}
      style={{ padding: '24px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-7">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/[0.06]' : 'bg-black/[0.04]'}`}
        >
          <Shield size={18} strokeWidth={1.5} className={isDarkMode ? 'text-white/80' : 'text-black/80'} />
        </motion.div>
        <h3 className={`text-base font-medium tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
          System Status
        </h3>
      </div>

      {/* Status Items */}
      <div className="space-y-6 mb-6">
        <StatusItem
          icon={<Shield size={18} strokeWidth={1.5} />}
          label="Protection"
          status={systemStatus.protection}
          onToggle={() => toggleStatus('protection')}
          isDarkMode={isDarkMode}
        />
        <StatusItem
          icon={<Wifi size={18} strokeWidth={1.5} />}
          label="Monitoring"
          status={systemStatus.monitoring}
          onToggle={() => toggleStatus('monitoring')}
          isDarkMode={isDarkMode}
        />
        <StatusItem
          icon={<Power size={18} strokeWidth={1.5} />}
          label="Firewall"
          status={systemStatus.firewall}
          onToggle={() => toggleStatus('firewall')}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* System Info */}
      <div className={`pt-6 border-t space-y-5 ${
        isDarkMode ? 'border-white/[0.08]' : 'border-black/[0.06]'
      }`}>
        <div className="flex justify-between items-center">
          <span className={`text-xs uppercase tracking-wide ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
            Device
          </span>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Raspberry Pi 4
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-xs uppercase tracking-wide ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
            Model Version
          </span>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            ANN v2.1
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Status Item with cleaner design
function StatusItem({ icon, label, status, onToggle, isDarkMode }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className={isDarkMode ? 'text-white/50' : 'text-black/50'}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
          {label}
        </span>
      </div>

      {/* Slim toggle switch */}
      <motion.button
        onClick={onToggle}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          status 
            ? 'bg-emerald-500' 
            : isDarkMode 
              ? 'bg-white/[0.12]' 
              : 'bg-black/[0.12]'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: status ? 20 : 2 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.button>
    </div>
  );
}