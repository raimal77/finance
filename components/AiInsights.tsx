import React from 'react';
import type { AnalysisResult } from '../types';
import { InsightPositiveIcon, InsightNegativeIcon, InsightNeutralIcon } from './icons';

interface AiInsightsProps {
  insights: AnalysisResult['insights'];
}

const insightConfig = {
    positive: {
        icon: <InsightPositiveIcon className="w-5 h-5 text-emerald-500" />,
        borderColor: 'border-emerald-500/30',
        bgColor: 'bg-emerald-50',
    },
    negative: {
        icon: <InsightNegativeIcon className="w-5 h-5 text-rose-500" />,
        borderColor: 'border-rose-500/30',
        bgColor: 'bg-rose-50',
    },
    neutral: {
        icon: <InsightNeutralIcon className="w-5 h-5 text-indigo-500" />,
        borderColor: 'border-indigo-500/30',
        bgColor: 'bg-indigo-50',
    }
}

const AiInsights: React.FC<AiInsightsProps> = ({ insights }) => {
  if (insights.length === 0) {
      return <div className="text-center text-gray-500 py-4">No insights available. Add more transactions for analysis.</div>
  }
  return (
    <div className="space-y-3">
      {insights.map((insight, index) => {
        const config = insightConfig[insight.type] || insightConfig.neutral;
        return (
          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
            <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">{insight.title}</h4>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AiInsights;
