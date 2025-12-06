import { motion } from 'motion/react';
import { Activity, AlertTriangle, Shield, Zap } from 'lucide-react';

interface StatsCardsProps {
  isDarkMode: boolean;
}

export function StatsCards({ isDarkMode }: StatsCardsProps) {
  const stats = [
    { label: 'Threats Blocked', value: '847', icon: <Shield size={18} strokeWidth={1.5} />, change: '+12%', trend: 'up' },
    { label: 'Active Alerts', value: '23', icon: <AlertTriangle size={18} strokeWidth={1.5} />, change: '+5', trend: 'up' },
    { label: 'Network Traffic', value: '1.2k', icon: <Activity size={18} strokeWidth={1.5} />, change: '+8%', trend: 'up' },
    { label: 'Response Time', value: '12ms', icon: <Zap size={18} strokeWidth={1.5} />, change: '-3ms', trend: 'down' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-xl p-6 flex flex-col ${
            isDarkMode 
              ? 'bg-white/[0.02] border border-white/[0.08]' 
              : 'bg-white border border-black/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
          }`}
        >
          {/* Icon in corner */}
          <div className={`mb-5 p-1.5 rounded-lg self-start ${
            isDarkMode ? 'bg-white/[0.06]' : 'bg-black/[0.04]'
          }`}>
            <div className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
              {stat.icon}
            </div>
          </div>

          {/* Value - Large and prominent */}
          <div className={`text-[30px] font-semibold leading-none mb-3 tracking-tight tabular-nums ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            {stat.value}
          </div>

          {/* Label and change */}
          <div className="flex items-end justify-between mt-auto">
            <span className={`text-[13px] font-medium ${
              isDarkMode ? 'text-white/50' : 'text-black/50'
            }`}>
              {stat.label}
            </span>
            <span className={`text-[11px] font-medium ${
              stat.label === 'Response Time'
                ? stat.trend === 'down'
                  ? 'text-emerald-500'
                  : 'text-red-400'
                : stat.trend === 'up'
                  ? 'text-emerald-500'
                  : 'text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}