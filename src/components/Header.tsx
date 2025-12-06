import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'logs' | 'report';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ isDarkMode, setIsDarkMode, currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'logs', label: 'Logs' },
    { id: 'report', label: 'Report' }
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 ${
        isDarkMode 
          ? 'bg-[#0D0D0D]/70 border-white/[0.05]' 
          : 'bg-white/70 border-black/[0.05]'
      } backdrop-blur-3xl border-b transition-all duration-700`}
      style={{
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' 
          : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
      }}
    >
      <div className="container-grid py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
              className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#4A66FF] to-[#00D4FF]' 
                  : 'bg-gradient-to-br from-blue-500 to-cyan-500'
              }`}
              style={{
                boxShadow: isDarkMode 
                  ? '0 8px 24px rgba(74, 102, 255, 0.5), inset 0 1px 2px rgba(255,255,255,0.2)' 
                  : '0 8px 24px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              <Shield className="w-5 h-5 text-white" />
            </motion.div>
            <span className={`text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
              iWall
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2 relative">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id as Page)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-3 rounded-[16px] transition-all duration-300 relative ${
                  currentPage === item.id
                    ? isDarkMode
                      ? 'text-white'
                      : 'text-black'
                    : isDarkMode
                    ? 'text-white/50 hover:text-white/80'
                    : 'text-black/50 hover:text-black/80'
                }`}
              >
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-[16px] ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-white/10 to-white/5' 
                        : 'bg-gradient-to-br from-black/[0.06] to-black/[0.03]'
                    }`}
                    style={{
                      boxShadow: isDarkMode 
                        ? '0 4px 20px rgba(74, 102, 255, 0.2), inset 0 1px 2px rgba(255,255,255,0.1)' 
                        : '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.5)'
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 380, 
                      damping: 30 
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative w-[80px] h-[44px] rounded-full transition-all duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                : 'bg-gradient-to-r from-amber-400 to-orange-400'
            }`}
            style={{
              boxShadow: isDarkMode 
                ? '0 8px 28px rgba(99, 102, 241, 0.5), inset 0 2px 4px rgba(255,255,255,0.15)' 
                : '0 8px 28px rgba(251, 146, 60, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-[5px] w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
              animate={{ 
                x: isDarkMode ? 41 : 5,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl"
              >
                {isDarkMode ? '🌙' : '☀️'}
              </motion.div>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
