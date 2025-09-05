
import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  format?: 'currency' | 'percent';
  color: 'emerald' | 'red' | 'cyan' | 'violet';
}

const colorClasses = {
    emerald: 'from-emerald-500 to-green-500',
    red: 'from-red-500 to-rose-500',
    cyan: 'from-cyan-500 to-blue-500',
    violet: 'from-violet-500 to-purple-500',
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, format = 'currency', color }) => {
  const formattedValue = format === 'currency'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : `${value.toFixed(2)}%`;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex items-center gap-6 relative overflow-hidden">
        <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${colorClasses[color]}`}></div>
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{formattedValue}</p>
        </div>
    </div>
  );
};

export default StatCard;
