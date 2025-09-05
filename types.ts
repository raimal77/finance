export type TransactionCategory = 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Utilities' | 'Health' | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: TransactionCategory;
}

export interface AnalysisResult {
  summary: {
    totalExpenses: number;
    topCategory: string;
  };
  spendingByCategory: { name: string; value: number }[];
  insights: {
    title: string;
    description: string;
    type: 'positive' | 'negative' | 'neutral';
  }[];
}
