import React from 'react';
import type { Transaction } from '../types';
import { TrashIcon } from './icons';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const colors: { [key: string]: string } = {
        Food: 'bg-emerald-100 text-emerald-800',
        Transport: 'bg-blue-100 text-blue-800',
        Shopping: 'bg-pink-100 text-pink-800',
        Entertainment: 'bg-purple-100 text-purple-800',
        Utilities: 'bg-yellow-100 text-yellow-800',
        Health: 'bg-red-100 text-red-800',
        Other: 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[category] || colors.Other}`}>{category}</span>
}


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex-1">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
      <div className="space-y-3 h-96 overflow-y-auto pr-2">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <p className="font-medium text-gray-800">{t.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <CategoryBadge category={t.category} />
                        <span>•</span>
                        <span>{new Date(t.date).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-gray-900">
                       -${t.amount.toFixed(2)}
                    </p>
                </div>
                <button 
                    onClick={() => onDeleteTransaction(t.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete transaction"
                >
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 pt-8">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
