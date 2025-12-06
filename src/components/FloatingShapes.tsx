import { motion } from 'motion/react';

interface FloatingShapesProps {
  isDarkMode: boolean;
}

export function FloatingShapes({ isDarkMode }: FloatingShapesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient blob 1 */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -100, 0],
          rotate: [0, 120, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-20 left-[15%] w-[600px] h-[600px] rounded-full blur-[150px] ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#4A66FF]/30 to-[#00D4FF]/20' 
            : 'bg-gradient-to-br from-blue-400/25 to-cyan-400/15'
        }`}
        style={{
          filter: 'blur(150px)',
          opacity: 0.6
        }}
      />

      {/* Gradient blob 2 */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 120, 0],
          rotate: [0, -120, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute bottom-20 right-[15%] w-[700px] h-[700px] rounded-full blur-[180px] ${
          isDarkMode 
            ? 'bg-gradient-to-br from-purple-500/25 to-fuchsia-500/20' 
            : 'bg-gradient-to-br from-purple-400/20 to-fuchsia-400/15'
        }`}
        style={{
          filter: 'blur(180px)',
          opacity: 0.5
        }}
      />

      {/* Accent blob 3 */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className={`absolute top-1/2 right-[25%] w-[450px] h-[450px] rounded-full blur-[140px] ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#00D4FF]/20 to-[#33EAFF]/15' 
            : 'bg-gradient-to-br from-cyan-400/15 to-emerald-400/10'
        }`}
        style={{
          filter: 'blur(140px)',
          opacity: 0.4
        }}
      />

      {/* Small floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
          className={`absolute w-2 h-2 rounded-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-[#4A66FF] to-[#00D4FF]' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + i * 10}%`,
            boxShadow: isDarkMode 
              ? '0 0 20px rgba(74, 102, 255, 0.6)' 
              : '0 0 20px rgba(59, 130, 246, 0.4)'
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <svg className={`absolute inset-0 w-full h-full ${isDarkMode ? 'opacity-[0.015]' : 'opacity-[0.02]'}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="premiumGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path 
              d="M 100 0 L 0 0 0 100" 
              fill="none" 
              stroke={isDarkMode ? "white" : "black"} 
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#premiumGrid)" />
      </svg>
    </div>
  );
}
