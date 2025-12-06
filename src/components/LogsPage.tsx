import { motion } from 'motion/react';
import { Shield, Search, Download, Filter, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

type Page = 'landing' | 'dashboard' | 'logs' | 'report';

interface LogsPageProps {
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'SQL Injection' | 'XSS' | 'DDoS' | 'Port Scan';
  ip: string;
  status: 'Blocked' | 'Monitored';
  severity: 'high' | 'medium' | 'low';
}

const mockLogs: LogEntry[] = [
  { id: 1, timestamp: '2025-01-15 14:23:45', type: 'SQL Injection', ip: '192.168.1.45', status: 'Blocked', severity: 'high' },
  { id: 2, timestamp: '2025-01-15 14:20:12', type: 'XSS', ip: '10.0.0.89', status: 'Blocked', severity: 'medium' },
  { id: 3, timestamp: '2025-01-15 14:18:33', type: 'DDoS', ip: '172.16.0.34', status: 'Monitored', severity: 'high' },
  { id: 4, timestamp: '2025-01-15 14:15:07', type: 'Port Scan', ip: '192.168.2.12', status: 'Monitored', severity: 'low' },
  { id: 5, timestamp: '2025-01-15 14:10:56', type: 'SQL Injection', ip: '10.1.1.88', status: 'Blocked', severity: 'high' },
  { id: 6, timestamp: '2025-01-15 14:05:22', type: 'XSS', ip: '192.168.1.99', status: 'Blocked', severity: 'medium' },
];

export function LogsPage({ onNavigate, isDarkMode, onToggleDarkMode }: LogsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-[#FAFAFA]'}`}>
      {/* FIXED HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
        isDarkMode 
          ? 'bg-[#0D0D0D]/80 border-white/[0.06]' 
          : 'bg-white/80 border-black/[0.06]'
      }`}>
        <div className="content-frame">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Shield size={20} strokeWidth={1.5} className={isDarkMode ? 'text-white' : 'text-black'} />
              <span className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                FeatherEdge
              </span>
            </div>

            {/* Navigation & Controls */}
            <div className="flex items-center gap-6">
              {/* Home Link */}
              <button
                onClick={() => onNavigate('landing')}
                className={`text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-white/70 hover:text-white' 
                    : 'text-black/70 hover:text-black'
                }`}
              >
                Home
              </button>

              {/* Small Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isDarkMode
                    ? 'bg-white/[0.08] hover:bg-white/[0.12]'
                    : 'bg-black/[0.04] hover:bg-black/[0.08]'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun size={16} strokeWidth={1.5} className="text-white" />
                ) : (
                  <Moon size={16} strokeWidth={1.5} className="text-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - with top padding for fixed header */}
      <main className="pt-16">
        {/* Tab Navigation Bar */}
        <div className={`sticky top-16 z-40 border-b ${
          isDarkMode 
            ? 'bg-[#0D0D0D]/80 backdrop-blur-xl border-white/[0.06]' 
            : 'bg-white/80 backdrop-blur-xl border-black/[0.06]'
        }`}>
          <div className="content-frame">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2 relative">
                <TabButton
                  label="Alerts"
                  active={false}
                  isDarkMode={isDarkMode}
                  onClick={() => onNavigate('dashboard')}
                />
                <TabButton
                  label="Logs"
                  active={true}
                  isDarkMode={isDarkMode}
                  onClick={() => {}}
                />
                <TabButton
                  label="Reports"
                  active={false}
                  isDarkMode={isDarkMode}
                  onClick={() => onNavigate('report')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content with consistent spacing - 32px padding */}
        <div className="dashboard-content">
          <div className="content-frame">
            {/* Section Header - 32px bottom spacing */}
            <div className="section-header spacing-heading">
              <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Logs Overview
              </h2>
              <p className={`section-description ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                View and search through security event logs
              </p>
            </div>

            {/* Controls Bar - Compact, 32px gap */}
            <div className="flex items-center gap-4 spacing-heading">
              {/* Search */}
              <div className="flex-1 relative">
                <Search size={16} strokeWidth={1.5} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDarkMode ? 'text-white/40' : 'text-black/40'
                }`} />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border transition-colors ${
                    isDarkMode 
                      ? 'bg-white/[0.02] border-white/[0.06] text-white placeholder:text-white/40 focus:border-white/20' 
                      : 'bg-white border-black/[0.06] text-black placeholder:text-black/40 focus:border-black/20'
                  } focus:outline-none`}
                />
              </div>

              {/* Filter button - Secondary */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-secondary ${
                  isDarkMode 
                    ? 'border-white/[0.06] text-white hover:bg-white/[0.04]' 
                    : 'border-black/[0.06] text-black hover:bg-black/[0.02]'
                }`}
              >
                <Filter size={16} strokeWidth={1.5} />
                Filter
              </motion.button>

              {/* Export button - Primary */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary ${
                  isDarkMode 
                    ? 'bg-white text-black' 
                    : 'bg-black text-white'
                }`}
              >
                <Download size={16} strokeWidth={1.5} />
                Export
              </motion.button>
            </div>

            {/* Logs Table - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl overflow-hidden border ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/[0.06]' 
                  : 'bg-white border-black/[0.04]'
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      isDarkMode ? 'border-white/[0.06]' : 'border-black/[0.04]'
                    }`}>
                      <th className={`px-6 py-3.5 text-left text-xs font-medium ${
                        isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}>
                        Timestamp
                      </th>
                      <th className={`px-6 py-3.5 text-left text-xs font-medium ${
                        isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}>
                        Type
                      </th>
                      <th className={`px-6 py-3.5 text-left text-xs font-medium ${
                        isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}>
                        IP Address
                      </th>
                      <th className={`px-6 py-3.5 text-left text-xs font-medium ${
                        isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}>
                        Severity
                      </th>
                      <th className={`px-6 py-3.5 text-left text-xs font-medium ${
                        isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLogs.map((log, index) => (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                        className={`border-b last:border-0 ${
                          isDarkMode 
                            ? 'border-white/[0.04] hover:bg-white/[0.02]' 
                            : 'border-black/[0.02] hover:bg-black/[0.01]'
                        } transition-colors`}
                      >
                        <td className={`px-6 py-3.5 text-xs ${
                          isDarkMode ? 'text-white/60' : 'text-black/60'
                        }`}>
                          {log.timestamp}
                        </td>
                        <td className={`px-6 py-3.5 text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                          {log.type}
                        </td>
                        <td className={`px-6 py-3.5 text-xs font-mono ${
                          isDarkMode ? 'text-white/70' : 'text-black/70'
                        }`}>
                          {log.ip}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            log.severity === 'high'
                              ? 'bg-red-500/10 text-red-500'
                              : log.severity === 'medium'
                                ? 'bg-amber-500/10 text-amber-500'
                                : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            log.status === 'Blocked'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Tab Button - Compact horizontal style with underline indicator
function TabButton({ label, active, isDarkMode, onClick }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-6 py-2.5 text-sm font-medium transition-colors ${
        active
          ? isDarkMode
            ? 'text-white'
            : 'text-black'
          : isDarkMode
            ? 'text-white/50 hover:text-white/80'
            : 'text-black/50 hover:text-black/80'
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeTabLogs"
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.button>
  );
}