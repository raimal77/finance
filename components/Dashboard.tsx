
import React from 'react';
import type { AnalysisResult } from '../types';
import StatCard from './StatCard';
import SpendingChart from './SpendingChart';
import TrendChart from './TrendChart';
import AiInsights from './AiInsights';
import { IncomeIcon, ExpenseIcon, SavingsIcon, ChartBarIcon, ResetIcon } from './icons';

interface DashboardProps {
  analysis: AnalysisResult;
  transactionsCount: number;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, transactionsCount, onReset }) => {
  const { summary, spendingByCategory, monthlyTrend, insights } = analysis;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold text-white">AI Financial Report</h2>
                <p className="text-gray-400">Analysis based on {transactionsCount} transactions.</p>
            </div>
            <button 
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold rounded-md transition-colors"
            >
                <ResetIcon className="w-4 h-4" />
                New Report
            </button>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Income" 
            value={summary.totalIncome} 
            icon={<IncomeIcon />} 
            format="currency" 
            color="emerald" 
        />
        <StatCard 
            title="Total Expenses" 
            value={summary.totalExpenses} 
            icon={<ExpenseIcon />} 
            format="currency" 
            color="red"
        />
        <StatCard 
            title="Net Savings" 
            value={summary.netSavings} 
            icon={<SavingsIcon />} 
            format="currency" 
            color="cyan"
        />
        <StatCard 
            title="Savings Rate" 
            value={summary.savingsRate} 
            icon={<ChartBarIcon />} 
            format="percent" 
            color="violet"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
          <h3 className="text-xl font-semibold text-white mb-4">Spending by Category</h3>
          <SpendingChart data={spendingByCategory} />
        </div>
        <div className="lg:col-span-3 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
          <h3 className="text-xl font-semibold text-white mb-4">Income vs. Expense Trend</h3>
          <TrendChart data={monthlyTrend} />
        </div>
      </div>
      
      {/* AI Insights */}
       <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
           <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Insights</h3>
           <AiInsights insights={insights} />
       </div>

    </div>
  );
};

export default Dashboard;
