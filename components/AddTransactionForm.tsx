import React, { useState } from 'react';
import type { Transaction, TransactionCategory } from '../types';

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const categories: TransactionCategory[] = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Other'];

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount);

    if (!description.trim() || !amount.trim() || isNaN(amountNumber) || amountNumber <= 0) {
      setError('Please enter a valid description and a positive amount.');
      return;
    }
    
    setError('');
    onAddTransaction({ description, amount: amountNumber, category });
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., Lunch with colleagues"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
