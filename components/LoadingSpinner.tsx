
import React from 'react';

const LoadingSpinner: React.FC = () => {
    const messages = [
        "Analyzing spending patterns...",
        "Identifying savings opportunities...",
        "Generating financial insights...",
        "Consulting with digital economists...",
        "Forecasting market trends...",
        "Optimizing your financial future..."
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">AI is Processing Your Data</h3>
        <p className="text-gray-400 mt-2 transition-opacity duration-500">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
