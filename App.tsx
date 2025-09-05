
import React, { useState, useCallback } from 'react';
import type { Transaction, AnalysisResult } from './types';
import { parseCSV } from './services/dataProcessor';
import { analyzeFinancialData } from './services/geminiService';
import Home from './components/Home';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import LoadingSpinner from './components/LoadingSpinner';
import { LogoIcon, ErrorIcon } from './components/icons';


const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'home' | 'csv' | 'chat'>('home');

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setTransactions(null);
    setAnalysis(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvText = e.target?.result as string;
        if (!csvText) {
            setError("File is empty or could not be read.");
            setIsLoading(false);
            return;
        }
        try {
            const parsedTransactions = parseCSV(csvText);
            setTransactions(parsedTransactions);

            const analysisResult = await analyzeFinancialData(parsedTransactions);
            setAnalysis(analysisResult);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during processing.";
            setError(`Failed to process data: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read the file.");
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setTransactions(null);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
    setMode('home');
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg max-w-lg mx-auto">
          <ErrorIcon className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <h3 className="text-xl font-semibold text-white mb-2">An Error Occurred</h3>
          <p className="text-red-300 mb-6">{error}</p>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    if (analysis && transactions) {
      return <Dashboard analysis={analysis} transactionsCount={transactions.length} onReset={handleReset} />;
    }
    
    switch (mode) {
        case 'csv':
            return <FileUpload onFileUpload={handleFileUpload} onBack={() => setMode('home')} />;
        case 'chat':
            return <Chat onBack={() => setMode('home')} />;
        case 'home':
        default:
            return <Home onSelectCsv={() => setMode('csv')} onSelectChat={() => setMode('chat')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-grid-white/[0.05] relative flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gray-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white tracking-tighter">
            Aura Finance AI
          </h1>
        </div>
      </header>
      
      <main className="w-full max-w-7xl mx-auto z-10 transition-all duration-500">
        {renderContent()}
      </main>

      <footer className="absolute bottom-4 text-center text-gray-500 text-sm">
        <p>Powered by Gemini AI. For illustrative purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
