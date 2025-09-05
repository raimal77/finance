import React, { useState, useEffect, useCallback } from 'react';
import type { Transaction, AnalysisResult } from './types';
import { analyzeFinancialData } from './services/geminiService';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { LogoIcon } from './components/icons';

// Sample data for initial state
const getInitialTransactions = (): Transaction[] => {
    return [
        { id: '1', date: new Date().toISOString().split('T')[0], description: 'Coffee with friend', amount: 5.50, category: 'Food' },
        { id: '2', date: new Date().toISOString().split('T')[0], description: 'Monthly streaming service', amount: 15.00, category: 'Entertainment' },
        { id: '3', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], description: 'Groceries', amount: 75.20, category: 'Food' },
    ];
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(getInitialTransactions);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const performAnalysis = useCallback(async (currentTransactions: Transaction[]) => {
    if (currentTransactions.length === 0) {
        setAnalysis(null);
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        const analysisResult = await analyzeFinancialData(currentTransactions);
        setAnalysis(analysisResult);
    } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
        setError(errorMessage);
        setAnalysis(null); // Clear previous analysis on error
    } finally {
        setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    performAnalysis(transactions);
  }, [transactions, performAnalysis]);


  const handleAddTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().getTime().toString(),
      date: new Date().toISOString().split('T')[0], // Use current date for new transactions
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const handleDeleteTransaction = (id: string) => {
      setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Aura AI Expense Tracker
          </h1>
        </div>
      </header>
      
      <main className="w-full max-w-7xl mx-auto flex-1">
        <Dashboard
            transactions={transactions}
            analysis={analysis}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            isLoadingAnalysis={isLoading}
            error={error}
        />
      </main>

      <footer className="w-full max-w-7xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Powered by Gemini AI. For illustrative purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
