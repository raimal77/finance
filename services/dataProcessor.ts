

import type { Transaction, TransactionCategory } from '../types';

export const parseCSV = (csvText: string): Transaction[] => {
  const lines = csvText.trim().split('\n');
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const transactions: Transaction[] = [];

  const dateIndex = header.indexOf('date');
  const descriptionIndex = header.indexOf('description');
  const amountIndex = header.indexOf('amount');
  // Fix: The Transaction type uses 'category', not 'type'.
  const categoryIndex = header.indexOf('category');

  if (dateIndex === -1 || descriptionIndex === -1 || amountIndex === -1 || categoryIndex === -1) {
    // Fix: Update error message to reflect the 'category' requirement.
    throw new Error('Invalid CSV headers. Must include Date, Description, Amount, Category.');
  }
  
  const validCategories: TransactionCategory[] = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Other'];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < header.length) continue;

    const amount = parseFloat(values[amountIndex]);
    const categoryInput = values[categoryIndex]?.trim();
    // Case-insensitive category matching
    const category = validCategories.find(c => c.toLowerCase() === categoryInput?.toLowerCase());

    // Fix: Validate amount and category against the app's types.
    if (isNaN(amount) || amount <= 0 || !category) {
      console.warn(`Skipping invalid row: ${lines[i]}`);
      continue;
    }

    transactions.push({
      // Fix: The Transaction interface requires an 'id'.
      id: `${Date.now()}-${i}`,
      date: values[dateIndex].trim(),
      description: values[descriptionIndex].trim(),
      amount: Math.abs(amount),
      // Fix: The property is 'category', not 'type'.
      category: category,
    });
  }

  if (transactions.length === 0) {
      throw new Error('No valid transactions found in the CSV file.');
  }

  return transactions;
};
