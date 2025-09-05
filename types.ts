
export interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string; // AI will populate this
}

export interface AnalysisResult {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netSavings: number;
    largestExpenseCategory: string;
    savingsRate: number;
  };
  spendingByCategory: { name: string; value: number }[];
  monthlyTrend: { name: string; income: number; expenses: number }[];
  insights: {
    title: string;
    description: string;
    type: 'positive' | 'negative' | 'neutral';
  }[];
}
