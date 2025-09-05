
import React from 'react';
import type { AnalysisResult } from '../types';
import { InsightPositiveIcon, InsightNegativeIcon, InsightNeutralIcon } from './icons';

interface AiInsightsProps {
  insights: AnalysisResult['insights'];
}

const insightConfig = {
    positive: {
        icon: <InsightPositiveIcon className="w-6 h-6 text-emerald-400" />,
        borderColor: 'border-emerald-500/50',
    },
    negative: {
        icon: <InsightNegativeIcon className="w-6 h-6 text-red-400" />,
        borderColor: 'border-red-500/50',
    },
    neutral: {
        icon: <InsightNeutralIcon className="w-6 h-6 text-cyan-400" />,
        borderColor: 'border-cyan-500/50',
    }
}

const AiInsights: React.FC<AiInsightsProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight, index) => {
        const config = insightConfig[insight.type] || insightConfig.neutral;
        return (
          <div key={index} className={`flex items-start gap-4 p-4 rounded-lg bg-gray-900/40 border-l-4 ${config.borderColor}`}>
            <div className="flex-shrink-0 mt-1">{config.icon}</div>
            <div>
              <h4 className="font-semibold text-white">{insight.title}</h4>
              <p className="text-sm text-gray-400">{insight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AiInsights;
