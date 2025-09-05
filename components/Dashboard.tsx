import React from 'react';
import type { Transaction, AnalysisResult, TransactionCategory } from '../types';
import StatCard from './StatCard';
import SpendingChart from './SpendingChart';
import AiInsights from './AiInsights';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';
import LoadingSpinner from './LoadingSpinner';
import { ExpenseIcon, ChartBarIcon, ErrorIcon } from './icons';

interface DashboardProps {
  transactions: Transaction[];
  analysis: AnalysisResult | null;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  onDeleteTransaction: (id: string) => void;
  isLoadingAnalysis: boolean;
  error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ 
    transactions, 
    analysis, 
    onAddTransaction, 
    onDeleteTransaction,
    isLoadingAnalysis,
    error 
}) => {
  const { summary, spendingByCategory, insights } = analysis || {};

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Form and Transaction List */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <AddTransactionForm onAddTransaction={onAddTransaction} />
        <TransactionList transactions={transactions} onDeleteTransaction={onDeleteTransaction} />
      </div>
      
      {/* Right Column: Analysis */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard 
              title="Total Expenses" 
              value={summary?.totalExpenses ?? 0}
              icon={<ExpenseIcon />} 
              format="currency" 
              color="rose" 
          />
          <StatCard 
              title="Top Category" 
              value={summary?.topCategory ?? 'N/A'}
              icon={<ChartBarIcon />} 
              color="indigo"
          />
        </div>
        
        {/* Chart and Insights */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-xl font-semibold text-gray-800 mb-4">Analysis & Insights</h3>
           {isLoadingAnalysis && <LoadingSpinner />}
           {error && (
             <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <ErrorIcon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <h4 className="font-semibold text-red-700">Analysis Failed</h4>
                <p className="text-sm text-red-600">{error}</p>
             </div>
           )}
           {!isLoadingAnalysis && !error && analysis && (
               <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    <div className="md:col-span-2">
                        <h4 className="text-lg font-medium text-gray-700 mb-2 text-center">Spending Breakdown</h4>
                        <SpendingChart data={spendingByCategory ?? []} />
                    </div>
                    <div className="md:col-span-3">
                        <h4 className="text-lg font-medium text-gray-700 mb-2">AI-Powered Insights</h4>
                        <AiInsights insights={insights ?? []} />
                    </div>
               </div>
           )}
            {!isLoadingAnalysis && !error && !analysis && transactions.length > 0 && (
                <p className="text-center text-gray-500 py-8">Could not retrieve analysis.</p>
            )}
            {!isLoadingAnalysis && transactions.length === 0 && (
                 <p className="text-center text-gray-500 py-8">Add a transaction to get started!</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
