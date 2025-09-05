

import React from 'react';
// Fix: Add imports for AnalyzeIcon and ChatIcon as they will be added to icons.tsx
import { AnalyzeIcon, ChatIcon } from './icons';

interface HomeProps {
    onSelectCsv: () => void;
    onSelectChat: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectCsv, onSelectChat }) => {
    return (
        <div className="w-full max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mb-4">
                Unlock Your Financial Future
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Choose your path to financial clarity. Get a detailed report from your transaction data or chat with our AI for personalized insights.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Analyze CSV Card */}
                <div 
                    onClick={onSelectCsv}
                    className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl cursor-pointer hover:border-cyan-500/80 hover:bg-gray-800/80 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4 p-4 bg-gray-900/50 rounded-full border border-gray-700 group-hover:border-cyan-500 transition-colors duration-300">
                            <AnalyzeIcon className="w-12 h-12 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Analyze CSV</h3>
                        <p className="text-gray-400">
                            Upload a CSV file of your transactions for a comprehensive, data-driven financial report with charts and summaries.
                        </p>
                    </div>
                </div>

                {/* Chat with AI Card */}
                <div 
                    onClick={onSelectChat}
                    className="group relative p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl cursor-pointer hover:border-violet-500/80 hover:bg-gray-800/80 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4 p-4 bg-gray-900/50 rounded-full border border-gray-700 group-hover:border-violet-500 transition-colors duration-300">
                            <ChatIcon className="w-12 h-12 text-violet-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Chat with AI</h3>
                        <p className="text-gray-400">
                           Talk directly with our AI assistant. Ask questions, describe your financial situation, and get instant, personalized insights.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;