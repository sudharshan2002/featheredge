import { motion } from 'motion/react';
import { Shield, Download, FileText, Moon, Sun } from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'logs' | 'report';

interface ReportPageProps {
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ReportPage({ onNavigate, isDarkMode, onToggleDarkMode }: ReportPageProps) {
  const reportTypes = [
    { 
      name: 'Daily Security Report', 
      description: 'Last 24 hours of security activity',
      size: '2.4 MB',
      date: 'Jan 15, 2025'
    },
    { 
      name: 'Weekly Summary', 
      description: 'Past 7 days threat analysis',
      size: '8.1 MB',
      date: 'Jan 15, 2025'
    },
    { 
      name: 'Monthly Analysis', 
      description: 'Comprehensive monthly security report',
      size: '24.7 MB',
      date: 'Jan 1, 2025'
    },
    { 
      name: 'Custom Report', 
      description: 'Generate report for specific date range',
      size: '-',
      date: 'Generate'
    },
  ];

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
                  active={false}
                  isDarkMode={isDarkMode}
                  onClick={() => onNavigate('logs')}
                />
                <TabButton
                  label="Reports"
                  active={true}
                  isDarkMode={isDarkMode}
                  onClick={() => {}}
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
                Reports Overview
              </h2>
              <p className={`section-description ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                Download comprehensive security reports and threat analysis for your IoT network
              </p>
            </div>

            {/* Report Cards - 32px horizontal gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reportTypes.map((report, index) => (
                <motion.div
                  key={report.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className={`card-padding rounded-2xl ${
                    isDarkMode 
                      ? 'bg-white/[0.02] border border-white/[0.06]' 
                      : 'bg-white border border-black/[0.04]'
                  }`}
                >
                  {/* Icon - 16px spacing */}
                  <div className={`spacing-group ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    <FileText size={20} strokeWidth={1.5} />
                  </div>

                  {/* Content - 24px spacing */}
                  <div className="spacing-card">
                    <h3 className={`text-base font-medium mb-2 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      {report.name}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-white/50' : 'text-black/50'
                    }`}>
                      {report.description}
                    </p>
                  </div>

                  {/* Meta info - 16px spacing */}
                  <div className="flex items-center justify-between spacing-group">
                    <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      {report.size}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      {report.date}
                    </span>
                  </div>

                  {/* Download button - Primary */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-primary ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-white/90' 
                        : 'bg-black text-white hover:bg-black/90'
                    }`}
                  >
                    <Download size={16} strokeWidth={1.5} />
                    {report.date === 'Generate' ? 'Generate' : 'Download'}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Info note - 80px top spacing (section spacing) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`spacing-section card-padding rounded-xl ${
                isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/10'
              }`}
            >
              <p className="text-sm text-blue-500 leading-relaxed">
                Reports are generated automatically at scheduled intervals and include detailed attack logs, threat classifications, and security recommendations.
              </p>
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
          layoutId="activeTabReports"
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.button>
  );
}