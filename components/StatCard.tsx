
import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  // Fix: Use React.ReactElement for the icon prop to ensure it can be cloned with new props.
  icon: React.ReactElement;
  format?: 'currency';
  color: 'rose' | 'indigo';
}

const colorClasses = {
    rose: {
        bg: 'from-rose-500 to-red-500',
        text: 'text-rose-600',
    },
    indigo: {
        bg: 'from-indigo-500 to-violet-500',
        text: 'text-indigo-600',
    }
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, format, color }) => {
  const formattedValue = (format === 'currency' && typeof value === 'number')
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : value;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-5">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${colorClasses[color].bg} text-white shadow-lg`}>
            {/* Fix: Removed unnecessary type assertion after correcting the prop type */}
            {React.cloneElement(icon, { className: "w-6 h-6"})}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{formattedValue}</p>
        </div>
    </div>
  );
};

export default StatCard;