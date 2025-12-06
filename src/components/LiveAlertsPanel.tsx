import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LiveAlertsPanelProps {
  isDarkMode: boolean;
  onBlockIP: (ip: string) => void;
}

interface Alert {
  id: number;
  type: 'SQL Injection' | 'XSS' | 'DDoS' | 'Port Scan';
  ip: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
}

const mockAlerts: Alert[] = [
  { id: 1, type: 'SQL Injection', ip: '192.168.1.45', timestamp: '2 min ago', severity: 'high' },
  { id: 2, type: 'XSS', ip: '10.0.0.89', timestamp: '5 min ago', severity: 'medium' },
  { id: 3, type: 'DDoS', ip: '172.16.0.34', timestamp: '8 min ago', severity: 'high' },
  { id: 4, type: 'Port Scan', ip: '192.168.2.12', timestamp: '12 min ago', severity: 'low' },
];

export function LiveAlertsPanel({ isDarkMode, onBlockIP }: LiveAlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now(),
        type: ['SQL Injection', 'XSS', 'DDoS', 'Port Scan'][Math.floor(Math.random() * 4)] as Alert['type'],
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        timestamp: 'Just now',
        severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as Alert['severity'],
      };
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl flex flex-col ${
        isDarkMode 
          ? 'bg-white/[0.02] border border-white/[0.08]' 
          : 'bg-white border border-black/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
      }`}
      style={{ padding: '24px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/[0.06]' : 'bg-black/[0.04]'}`}
          >
            <AlertTriangle size={18} strokeWidth={1.5} className={isDarkMode ? 'text-white/80' : 'text-black/80'} />
          </motion.div>
          <h3 className={`text-base font-medium tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Live Alerts
          </h3>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-red-500"
        />
      </div>

      {/* Alerts List */}
      <div className="space-y-0 max-h-[420px] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative pl-4 pr-4 py-4 ${
                index !== alerts.length - 1 ? 'border-b' : ''
              } ${
                isDarkMode 
                  ? 'border-white/[0.04]' 
                  : 'border-black/[0.03]'
              }`}
            >
              {/* Severity Color Accent - left border */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                alert.severity === 'high'
                  ? 'bg-red-500'
                  : alert.severity === 'medium'
                    ? 'bg-amber-500'
                    : 'bg-blue-500'
              }`} />

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Type and severity */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {alert.type}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium uppercase tracking-wide ${
                      alert.severity === 'high'
                        ? 'bg-red-500/10 text-red-500'
                        : alert.severity === 'medium'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>

                  {/* IP and timestamp */}
                  <div className="flex items-center gap-2 text-xs">
                    <code className={`font-mono ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {alert.ip}
                    </code>
                    <span className={isDarkMode ? 'text-white/20' : 'text-black/20'}>
                      •
                    </span>
                    <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>
                      {alert.timestamp}
                    </span>
                  </div>
                </div>

                {/* Block button - smaller and cleaner */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onBlockIP(alert.ip)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    isDarkMode 
                      ? 'border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30' 
                      : 'border-red-500/20 text-red-600 hover:bg-red-500/5 hover:border-red-500/30'
                  }`}
                >
                  Block
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}