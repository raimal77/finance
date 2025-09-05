
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: { name:string; income: number; expenses: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-gray-700 border border-gray-600 rounded-md shadow-lg text-sm">
          <p className="label font-bold text-white">{label}</p>
          <p className="text-emerald-400">{`Income: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}`}</p>
          <p className="text-red-400">{`Expenses: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[1].value)}`}</p>
        </div>
      );
    }
    return null;
  };

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
          <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: '#a0aec0' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#a0aec0' }} />
          <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
