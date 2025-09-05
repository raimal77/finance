
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { Transaction, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.OBJECT,
            properties: {
                totalExpenses: { type: Type.NUMBER, description: "Total sum of all expense transactions." },
                topCategory: { type: Type.STRING, description: "The category with the highest spending." },
            },
            required: ["totalExpenses", "topCategory"]
        },
        spendingByCategory: {
            type: Type.ARRAY,
            description: "An array of objects, each representing a spending category and its total amount.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                },
                required: ["name", "value"]
            }
        },
        insights: {
            type: Type.ARRAY,
            description: "An array of 2-3 actionable and insightful observations about the user's spending habits.",
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
    required: ["summary", "spendingByCategory", "insights"]
};


export const analyzeFinancialData = async (transactions: Transaction[]): Promise<AnalysisResult> => {
  if (transactions.length === 0) {
      throw new Error("No transactions to analyze.");
  }

  const transactionDataString = transactions
    .map(t => `${t.date},${t.description},${t.amount},${t.category}`)
    .join('\n');
  
  const prompt = `
    You are an expert financial analyst AI named Aura. Your goal is to provide clear and helpful insights based on a user's list of recent expenses.
    Analyze the following list of transactions (formatted as Date,Description,Amount,Category):
    
    ${transactionDataString}

    Please perform the following analysis:
    1.  Calculate summary metrics: total expenses and the name of the top spending category.
    2.  Provide a breakdown of spending by category for all categories present.
    3.  Generate 2-3 actionable insights to help the user manage their spending better. For example, identify high spending areas, suggest potential savings, or comment on spending diversity.
    
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
    throw new Error("The AI failed to analyze the financial data. Please try again.");
  }
};

// Fix: Add and export a function to create a chat session.
export const createChatSession = (): Chat => {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are Aura, an expert financial analyst AI. Your goal is to provide clear, friendly, and helpful insights into a user's financial situation. Be conversational and ask clarifying questions to better understand their goals.",
        },
    });
    return chat;
};
