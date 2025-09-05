import React from 'react';

const LoadingSpinner: React.FC = () => {
    const messages = [
        "Analyzing expenses...",
        "Categorizing spending...",
        "Generating insights...",
        "Looking for savings opportunities...",
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2000);

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">AI is Analyzing</h3>
        <p className="text-gray-500 mt-1 transition-opacity duration-500 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
