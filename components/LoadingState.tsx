import React from 'react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...", 
  size = "xl" 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center h-48">
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-white border-t-transparent`}></div>
        <p className="text-white text-base font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
