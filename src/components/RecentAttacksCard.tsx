import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface RecentAttacksCardProps {
  isDarkMode: boolean;
}

interface Attack {
  type: string;
  count: number;
  trend: 'up' | 'down';
  percentage: number;
}

export function RecentAttacksCard({ isDarkMode }: RecentAttacksCardProps) {
  const attacks: Attack[] = [
    { type: 'SQL Injection', count: 342, trend: 'down', percentage: 8 },
    { type: 'XSS', count: 189, trend: 'up', percentage: 12 },
    { type: 'DDoS', count: 156, trend: 'down', percentage: 5 },
    { type: 'Port Scan', count: 98, trend: 'up', percentage: 15 },
  ];

  const maxCount = Math.max(...attacks.map(a => a.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl flex flex-col ${
        isDarkMode 
          ? 'bg-white/[0.02] border border-white/[0.08]' 
          : 'bg-white border border-black/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
      }`}
      style={{ padding: '24px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/[0.06]' : 'bg-black/[0.04]'}`}
        >
          <Activity size={18} strokeWidth={1.5} className={isDarkMode ? 'text-white/80' : 'text-black/80'} />
        </motion.div>
        <h3 className={`text-base font-medium tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Attack Summary
        </h3>
      </div>

      {/* Attack List */}
      <div className="space-y-6 mb-6">
        {attacks.map((attack, index) => (
          <motion.div
            key={attack.type}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Type and count */}
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-[13px] font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {attack.type}
              </span>
              <div className="flex items-center gap-2.5">
                <span className={`text-sm font-semibold tabular-nums ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {attack.count}
                </span>
                <span className={`text-[11px] font-medium ${
                  attack.trend === 'up' ? 'text-red-400' : 'text-emerald-500'
                }`}>
                  {attack.trend === 'up' ? '↑' : '↓'} {attack.percentage}%
                </span>
              </div>
            </div>

            {/* Progress bar - thin and elegant */}
            <div className={`h-[3px] rounded-full overflow-hidden ${
              isDarkMode ? 'bg-white/[0.06]' : 'bg-black/[0.06]'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(attack.count / maxCount) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full ${
                  attack.trend === 'up' 
                    ? 'bg-gradient-to-r from-red-500/80 to-red-400/80' 
                    : 'bg-gradient-to-r from-emerald-500/80 to-emerald-400/80'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <div className={`pt-6 border-t ${
        isDarkMode ? 'border-white/[0.08]' : 'border-black/[0.06]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs uppercase tracking-wide ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
            Total Attacks (24h)
          </span>
          <span className={`text-xl font-semibold tabular-nums ${isDarkMode ? 'text-white' : 'text-black'}`}>
            785
          </span>
        </div>
      </div>
    </motion.div>
  );
}