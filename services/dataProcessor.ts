
import type { Transaction } from '../types';

export const parseCSV = (csvText: string): Transaction[] => {
  const lines = csvText.trim().split('\n');
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const transactions: Transaction[] = [];

  const dateIndex = header.indexOf('date');
  const descriptionIndex = header.indexOf('description');
  const amountIndex = header.indexOf('amount');
  const typeIndex = header.indexOf('type');

  if (dateIndex === -1 || descriptionIndex === -1 || amountIndex === -1 || typeIndex === -1) {
    throw new Error('Invalid CSV headers. Must include Date, Description, Amount, Type.');
  }

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < header.length) continue;

    const amount = parseFloat(values[amountIndex]);
    const type = values[typeIndex].trim().toLowerCase();

    if (isNaN(amount) || (type !== 'income' && type !== 'expense')) {
      console.warn(`Skipping invalid row: ${lines[i]}`);
      continue;
    }

    transactions.push({
      date: values[dateIndex].trim(),
      description: values[descriptionIndex].trim(),
      amount: Math.abs(amount),
      type: type as 'income' | 'expense',
    });
  }

  if (transactions.length === 0) {
      throw new Error('No valid transactions found in the CSV file.');
  }

  return transactions;
};
