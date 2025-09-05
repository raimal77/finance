
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SpendingChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#ec4899', '#f97316', '#3b82f6'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
        <p className="label text-white">{`${payload[0].name} : ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};


const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
