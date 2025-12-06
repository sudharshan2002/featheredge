import { motion } from 'motion/react';
import { ArrowRight, Shield, Activity, Lock, FileText, Moon, Sun } from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'logs' | 'report';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function LandingPage({ onNavigate, isDarkMode, toggleDarkMode }: LandingPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-[#FAFAFA]'}`}>
      {/* MINIMAL HEADER - Fixed at top */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-[#0D0D0D]/80 border-b border-white/[0.06]' 
          : 'bg-white/80 border-b border-black/[0.06]'
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
              {/* Dashboard Link */}
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-white/70 hover:text-white' 
                    : 'text-black/70 hover:text-black'
                }`}
              >
                Dashboard
              </button>

              {/* Small Light Mode Switch */}
              <button
                onClick={toggleDarkMode}
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

      {/* MINIMAL HERO SECTION - 120px top padding + 64px for header */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden hero-section">
        {/* Subtle gradient */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#0D0D0D] via-[#0f0f10] to-[#0D0D0D]' 
            : 'bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F7] to-[#FAFAFA]'
        }`} />

        {/* New blinking dot pattern */}
        <BackgroundDotPattern isDarkMode={isDarkMode} />

        {/* Minimal floating dots - 40px away from content */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 rounded-full ${
              isDarkMode ? 'bg-white/20' : 'bg-black/20'
            }`}
            style={{
              left: `${10 + Math.random() * 30}%`,
              top: `${15 + Math.random() * 30}%`,
            }}
            animate={{
              y: [-4, 4, -4],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          />
        ))}

        {/* Hero Content - Content Frame Max 1180px */}
        <div className="content-frame relative z-10">
          <div style={{ maxWidth: '820px' }}>
            {/* Small shield icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="spacing-group"
            >
              <Shield 
                className={isDarkMode ? 'text-white/60' : 'text-black/60'} 
                size={28} 
                strokeWidth={1.5} 
              />
            </motion.div>

            {/* Compact headline - 48px spacing */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hero-text-spacing"
            >
              <h1 className={`text-4xl mb-4 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                IoT Intrusion Detection.
                <br />
                <span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
                  Sharp. Precise. Minimal.
                </span>
              </h1>

              {/* Compact description */}
              <p className={`text-base max-w-xl ${
                isDarkMode ? 'text-white/50' : 'text-black/50'
              }`}>
                AI-powered intrusion detection running on Raspberry Pi. Real-time threat monitoring for IoT networks with neural network classification.
              </p>
            </motion.div>

            {/* Primary CTA button - 40px top spacing */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hero-cta-spacing"
            >
              <motion.button
                onClick={() => onNavigate('dashboard')}
                className={`btn-primary inline-flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SLIM INFORMATION BLOCKS - 80px top and bottom spacing */}
      <section className={`spacing-section ${
        isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'
      }`}>
        <div className="content-frame">
          {/* Section header - 32px bottom spacing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="spacing-heading"
          >
            <h2 className={`text-2xl mb-3 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Enterprise Security
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              Real-time threat intelligence powered by neural networks
            </p>
          </motion.div>

          {/* 3 Slim horizontal cards - 32px horizontal gap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={<Activity size={20} strokeWidth={1.5} />}
              title="Real-Time Detection"
              description="Continuous IoT traffic monitoring with instant threat alerts."
              isDarkMode={isDarkMode}
              delay={0.1}
            />
            <InfoCard
              icon={<Lock size={20} strokeWidth={1.5} />}
              title="AI Classification"
              description="Neural network models identify attack patterns accurately."
              isDarkMode={isDarkMode}
              delay={0.2}
            />
            <InfoCard
              icon={<FileText size={20} strokeWidth={1.5} />}
              title="Smart Reporting"
              description="Comprehensive logs with exportable security reports."
              isDarkMode={isDarkMode}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className={`footer-section relative ${
        isDarkMode 
          ? 'bg-[#0D0D0D] border-t border-white/[0.06]' 
          : 'bg-white border-t border-black/[0.06]'
      }`}>
        <div className="content-frame relative z-10">
          {/* Footer Content Grid - 48px spacing between rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 spacing-row">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 spacing-card">
                <Shield size={20} strokeWidth={1.5} className={isDarkMode ? 'text-white' : 'text-black'} />
                <span className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  FeatherEdge
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-white/50' : 'text-black/50'
              }`}>
                Advanced IoT intrusion detection powered by Raspberry Pi and neural networks.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className={`text-sm spacing-group font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Navigation
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`block text-sm ${
                    isDarkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
                  } transition-colors`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('logs')}
                  className={`block text-sm ${
                    isDarkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
                  } transition-colors`}
                >
                  Logs
                </button>
                <button
                  onClick={() => onNavigate('report')}
                  className={`block text-sm ${
                    isDarkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
                  } transition-colors`}
                >
                  Reports
                </button>
              </div>
            </div>

            {/* Technology */}
            <div>
              <h3 className={`text-sm spacing-group font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Technology
              </h3>
              <div className="space-y-3 text-sm">
                <p className={isDarkMode ? 'text-white/50' : 'text-black/50'}>ANN-based Detection</p>
                <p className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Raspberry Pi 4</p>
                <p className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Real-time Analytics</p>
              </div>
            </div>
          </div>

          {/* Copyright - 48px top spacing */}
          <div className={`border-t pt-8 pb-4 text-xs ${
            isDarkMode ? 'border-white/[0.06] text-white/30' : 'border-black/[0.06] text-black/30'
          }`}>
            <p>© 2025 FeatherEdge. IoT Security System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Slim Info Card Component
function InfoCard({ icon, title, description, isDarkMode, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className={`card-padding rounded-2xl ${
        isDarkMode 
          ? 'bg-white/[0.02] border border-white/[0.06]' 
          : 'bg-black/[0.01] border border-black/[0.04]'
      }`}
    >
      {/* Small icon */}
      <div className={`mb-3 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
        {icon}
      </div>

      {/* Compact text */}
      <h3 className={`text-base mb-2 font-medium ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${
        isDarkMode ? 'text-white/50' : 'text-black/50'
      }`}>
        {description}
      </p>
    </motion.div>
  );
}

// Smooth blinking dot pattern in background
function BackgroundDotPattern({ isDarkMode }: { isDarkMode: boolean }) {
  const baseColour = isDarkMode
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.08)';

  return (
    <>
      {/* Main soft blinking grid */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${baseColour} 1px, transparent 0)`,
          backgroundSize: '26px 26px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.12, 0.28, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Second layer for subtle parallax and variation */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${baseColour} 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        animate={{
          opacity: [0.06, 0.2, 0.1],
          x: [-6, 0, 6, 0],
          y: [3, -3, 3]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
