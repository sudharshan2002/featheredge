import { motion } from 'motion/react';
import { Shield, LayoutDashboard, FileText, Settings, Moon, Sun, Home } from 'lucide-react';
import { SystemStatusCard } from './SystemStatusCard';
import { LiveAlertsPanel } from './LiveAlertsPanel';
import { RecentAttacksCard } from './RecentAttacksCard';
import { StatsCards } from './StatsCards';
import { useState } from 'react';
import { BlockIPModal } from './BlockIPModal';

type Page = 'landing' | 'dashboard' | 'logs' | 'report';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Dashboard({ onNavigate, isDarkMode, onToggleDarkMode }: DashboardProps) {
  const [activeNav, setActiveNav] = useState<Page>('dashboard');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedThreatIP, setSelectedThreatIP] = useState<string>('');

  const handleBlockIP = (ip: string) => {
    setSelectedThreatIP(ip);
    setShowBlockModal(true);
  };

  const handleNavClick = (page: Page) => {
    setActiveNav(page);
    if (page !== 'dashboard') {
      onNavigate(page);
    }
  };

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
              <motion.button
                onClick={onToggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
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
              </motion.button>
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
            <div className="flex items-center gap-2 py-3 relative">
              <TabButton
                label="Alerts"
                active={activeNav === 'dashboard'}
                isDarkMode={isDarkMode}
                onClick={() => handleNavClick('dashboard')}
              />
              <TabButton
                label="Logs"
                active={activeNav === 'logs'}
                isDarkMode={isDarkMode}
                onClick={() => handleNavClick('logs')}
              />
              <TabButton
                label="Reports"
                active={activeNav === 'report'}
                isDarkMode={isDarkMode}
                onClick={() => handleNavClick('report')}
              />
            </div>
          </div>
        </div>

        {/* Content with consistent spacing */}
        <div className="dashboard-content">
          <div className="content-frame">
            {/* Section: Monitoring Status */}
            <div className="section-header">
              <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Monitoring Status
              </h2>
            </div>

            {/* Row 1: System Status (5 cols) + Stats (7 cols) */}
            <div className="grid-12 spacing-row items-start">
              <div className="col-span-5">
                <SystemStatusCard isDarkMode={isDarkMode} />
              </div>
              <div className="col-span-7">
                <StatsCards isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* Section: Security Activity */}
            <div className="section-header">
              <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Security Activity
              </h2>
            </div>

            {/* Row 2: Live Alerts (7 cols) + Recent Attacks (5 cols) */}
            <div className="grid-12 items-start">
              <div className="col-span-7">
                <LiveAlertsPanel isDarkMode={isDarkMode} onBlockIP={handleBlockIP} />
              </div>
              <div className="col-span-5">
                <RecentAttacksCard isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Block IP Modal */}
      {showBlockModal && (
        <BlockIPModal
          isDarkMode={isDarkMode}
          threatIP={selectedThreatIP}
          onClose={() => setShowBlockModal(false)}
        />
      )}
    </div>
  );
}

// Tab Button - Cleaner style with more spacing
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
          layoutId="activeTab"
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.button>
  );
}
