import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
  const [loadingText, setLoadingText] = useState('Finding fresh angles…');
  const loadingPhrases = [
    'Finding fresh angles…',
    'Analyzing indie ideas…',
    'Remixing the best picks…',
  ];

  useEffect(() => {
    if (!isOpen) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingPhrases.length;
      setLoadingText(loadingPhrases[currentIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-500/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl relative">
        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center min-h-[200px] py-6">
          {/* Spinner */}
          <div className="animate-spin mb-6">
            <svg
              className="w-12 h-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          {/* Rotating Text */}
          <div className="text-center text-gray-700 font-medium text-lg transition-opacity duration-300">
            {loadingText}
          </div>
        </div>
      </div>
    </div>,
    typeof window !== 'undefined' ? document.body : (null as any)
  );
};

export default LoadingModal;
