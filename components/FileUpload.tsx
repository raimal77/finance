
import React, { useCallback, useState } from 'react';
import { UploadIcon, BackIcon } from './icons';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onBack: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  }, [onFileUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center relative animate-fade-in">
        <button 
            onClick={onBack}
            className="absolute top-0 left-0 -translate-y-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
            <BackIcon className="w-5 h-5" />
            Back
        </button>

        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mb-4">
            Upload Transaction Data
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Provide a CSV file of your transactions to generate a personalized, AI-powered financial analysis.
        </p>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative group p-8 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? 'border-cyan-400 bg-cyan-900/20' : 'border-gray-700 hover:border-cyan-500 hover:bg-gray-800/50'}`}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept=".csv"
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-800 group-hover:bg-gray-700 rounded-full transition-colors duration-300">
             <UploadIcon className={`w-12 h-12 transition-colors duration-300 ${isDragging ? 'text-cyan-300' : 'text-gray-500 group-hover:text-cyan-400'}`} />
          </div>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-cyan-400 font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">CSV file required (e.g., Date,Description,Amount,Type)</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
