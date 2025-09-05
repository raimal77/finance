
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { Transaction, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.OBJECT,
            properties: {
                totalIncome: { type: Type.NUMBER, description: "Total sum of all income transactions." },
                totalExpenses: { type: Type.NUMBER, description: "Total sum of all expense transactions." },
                netSavings: { type: Type.NUMBER, description: "Calculated as total income minus total expenses." },
                largestExpenseCategory: { type: Type.STRING, description: "The category with the highest spending." },
                savingsRate: { type: Type.NUMBER, description: "Calculated as (net savings / total income) * 100." },
            },
            required: ["totalIncome", "totalExpenses", "netSavings", "largestExpenseCategory", "savingsRate"]
        },
        spendingByCategory: {
            type: Type.ARRAY,
            description: "An array of objects, each representing a spending category and its total amount. Should contain top 5-6 categories.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                },
                required: ["name", "value"]
            }
        },
        monthlyTrend: {
            type: Type.ARRAY,
            description: "An array of objects summarizing income and expenses for each month found in the data.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Month name, e.g., 'Jan', 'Feb'." },
                    income: { type: Type.NUMBER },
                    expenses: { type: Type.NUMBER }
                },
                required: ["name", "income", "expenses"]
            }
        },
        insights: {
            type: Type.ARRAY,
            description: "An array of 3-4 actionable and insightful observations about the user's financial habits.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A short, catchy title for the insight." },
                    description: { type: Type.STRING, description: "A detailed explanation of the insight and what it means." },
                    type: { type: Type.STRING, description: "The type of insight: 'positive', 'negative', or 'neutral'." }
                },
                required: ["title", "description", "type"]
            }
        }
    },
    required: ["summary", "spendingByCategory", "monthlyTrend", "insights"]
};


export const analyzeFinancialData = async (transactions: Transaction[]): Promise<AnalysisResult> => {
  const transactionDataString = transactions
    .map(t => `${t.date},${t.description},${t.amount},${t.type}`)
    .join('\n');
  
  const prompt = `
    You are a world-class personal finance analyst AI named Aura.
    Your goal is to provide a clear, insightful, and futuristic financial report based on the user's transaction data.
    Analyze the following CSV data and provide a comprehensive summary.
    The data format is: Date,Description,Amount,Type

    Transaction Data:
    ${transactionDataString}

    Please perform the following analysis:
    1.  Calculate the summary metrics: total income, total expenses, net savings, the largest expense category, and the savings rate ((net savings / total income) * 100).
    2.  Categorize all expenses and provide a breakdown of spending by the top 5-6 categories (e.g., 'Food & Dining', 'Shopping', 'Utilities', 'Transport', 'Entertainment', 'Other'). Group similar items, like 'Uber' and 'Gas' into 'Transport'.
    3.  Analyze the monthly trend of income vs. expenses. Group transactions by month.
    4.  Generate 3-4 highly personalized and actionable insights based on the user's spending habits. These should be genuinely helpful.
    
    Return your analysis strictly in the JSON format defined by the provided schema.
    Do not include any introductory text or markdown formatting. The output must be a single, valid JSON object.
    `;
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: analysisSchema,
        },
    });

    const text = response.text;
    if (!text) {
        throw new Error('API returned an empty response.');
    }
    const result = JSON.parse(text);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI failed to analyze the financial data. Please ensure your CSV is formatted correctly and try again.");
  }
};


export const createChatSession = (): Chat => {
    const systemInstruction = `You are Aura, a friendly, expert, and encouraging AI personal finance assistant. Your goal is to help users understand and improve their financial health through conversation.
- Start by introducing yourself and asking a broad, open-ended question about their financial goals or concerns.
- Ask clarifying questions one at a time to understand their situation, such as their income, main expenses, savings habits, or any financial challenges they face.
- Keep your responses concise, easy to understand, and supportive.
- Use emojis where appropriate to maintain a friendly tone.
- Based on the user's input, provide actionable insights, tips, and encouragement.
- Do not give prescriptive financial advice (e.g., "buy this stock"), but rather offer general guidance and educational information.
- Structure your responses for readability (e.g., using bullet points for tips).
- Your personality is futuristic, smart, and empathetic.`;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        }
    });
    return chat;
}
