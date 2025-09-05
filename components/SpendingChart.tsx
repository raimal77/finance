import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SpendingChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-200 rounded-md shadow-lg">
        <p className="label text-gray-700">{`${payload[0].name} : ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};


const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-gray-400">
        No data to display
      </div>
    )
  }
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
